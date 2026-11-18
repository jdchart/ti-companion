/**
 * Which expansions the group plays with. A viewer preference (localStorage),
 * used to filter the wiki, factions, catalogue and plan pickers.
 * Base game is always on.
 */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Expansion } from '../content/types'
import { prefs } from './prefs'
import { factionNeeds, wikiByKey, type WikiEntry } from '../wiki/registry'

export type ExpSet = { pok: boolean; codex: boolean }
const DEFAULT: ExpSet = { pok: true, codex: true }

interface Ctx {
  exp: ExpSet
  setExp: (patch: Partial<ExpSet>) => void
  /** true when every expansion in `needs` is enabled */
  allows: (needs: readonly Expansion[] | undefined) => boolean
  entryOk: (e: WikiEntry | undefined) => boolean
  keyOk: (key: string) => boolean
  factionOk: (id: string) => boolean
}
const C = createContext<Ctx | null>(null)

function load(): ExpSet {
  try {
    const v = JSON.parse(prefs.get('expansions') ?? 'null')
    if (v && typeof v === 'object') return { pok: v.pok !== false, codex: v.codex !== false }
  } catch {
    /* ignore */
  }
  return DEFAULT
}

export function ExpansionsProvider({ children }: { children: ReactNode }) {
  const [exp, setState] = useState<ExpSet>(load)
  const setExp = useCallback((patch: Partial<ExpSet>) => {
    setState((cur) => {
      const next = { ...cur, ...patch }
      // Codex content (Keleres, reworked PoK cards) depends on PoK.
      if (!next.pok) next.codex = false
      prefs.set('expansions', JSON.stringify(next))
      return next
    })
  }, [])
  const value = useMemo<Ctx>(() => {
    const allows = (needs: readonly Expansion[] | undefined) => !needs || needs.every((n) => n === 'base' || exp[n as keyof ExpSet])
    return {
      exp,
      setExp,
      allows,
      entryOk: (e) => !!e && allows(e.needs),
      keyOk: (k) => allows(wikiByKey.get(k)?.needs),
      factionOk: (id) => allows(factionNeeds(id)),
    }
  }, [exp, setExp])
  return <C.Provider value={value}>{children}</C.Provider>
}

export function useExpansions() {
  const v = useContext(C)
  if (!v) throw new Error('useExpansions outside provider')
  return v
}
