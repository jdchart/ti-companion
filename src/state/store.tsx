/**
 * Plan store.
 *
 * The real, durable save is still the JSON file (download / load). On top of
 * that, the working copy is autosaved so a game in progress survives what
 * happens on a phone during play — reloads, the browser discarding a
 * background tab, the screen locking, switching apps or tabs:
 *
 *   - sessionStorage  (primary): the copy for this tab; restored silently.
 *   - localStorage    (fallback): a recovery draft, used only when the tab was
 *     fully closed. It is offered back with a "restore" banner, never loaded
 *     silently, and cleared when the user saves JSON or discards it.
 *
 * Writes happen on every change (debounced) and are flushed immediately when
 * the page is hidden (`visibilitychange` / `pagehide`), which is the last
 * reliable moment on mobile.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { newPlan, parseFile, toFile, type Plan, uid } from './plan'

interface Draft {
  plans: Plan[]
  dirty: boolean
  savedAt: string
}

interface Store {
  plans: Plan[]
  dirty: boolean
  /** A draft from a previous, closed session waiting to be restored. */
  recovery: Draft | null
  restoreRecovery: () => void
  discardRecovery: () => void
  create: (p?: Partial<Plan>) => Plan
  update: (id: string, fn: (p: Plan) => Plan) => void
  remove: (id: string) => void
  duplicate: (id: string) => Plan | undefined
  importPlans: (plans: Plan[]) => void
  markSaved: () => void
}

const KEY = 'ti-companion:working-copy'
const Ctx = createContext<Store | null>(null)

function read(storage: () => Storage): Draft | null {
  try {
    const raw = storage().getItem(KEY)
    if (!raw) return null
    const d = JSON.parse(raw)
    // Reuse the file parser so drafts get the same validation + migrations.
    const plans = parseFile(JSON.stringify({ ...toFile([]), version: d.version, plans: d.plans }))
    return { plans, dirty: !!d.dirty, savedAt: d.savedAt ?? '' }
  } catch {
    return null
  }
}
function write(storage: () => Storage, d: Draft | null) {
  try {
    if (!d || (!d.plans.length && !d.dirty)) storage().removeItem(KEY)
    else storage().setItem(KEY, JSON.stringify({ ...d, version: toFile([]).version }))
  } catch {
    /* storage unavailable (private mode, quota) — JSON export still works */
  }
}
const session = () => window.sessionStorage
const local = () => window.localStorage

export function PlanStoreProvider({ children }: { children: ReactNode }) {
  const initial = useRef<Draft | null>(read(session))
  const [plans, setPlans] = useState<Plan[]>(() => initial.current?.plans ?? [])
  const [dirty, setDirty] = useState(() => initial.current?.dirty ?? false)
  const [recovery, setRecovery] = useState<Draft | null>(() => {
    if (initial.current) return null
    const d = read(local)
    return d && d.plans.length && d.dirty ? d : null
  })

  // ---- autosave
  const latest = useRef<Draft>({ plans, dirty, savedAt: '' })
  latest.current = { plans, dirty, savedAt: new Date().toISOString() }
  const flush = useCallback(() => {
    const d = latest.current
    write(session, d)
    // Only keep a cross-session draft while there is unsaved work.
    if (d.dirty) write(local, d)
    else if (!recovery) write(local, null)
  }, [recovery])

  useEffect(() => {
    const id = window.setTimeout(flush, 250)
    return () => window.clearTimeout(id)
  }, [plans, dirty, flush])

  useEffect(() => {
    const onHide = () => document.visibilityState === 'hidden' && flush()
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('pagehide', flush)
    return () => {
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('pagehide', flush)
    }
  }, [flush])

  useEffect(() => {
    if (!dirty) return
    const h = (e: BeforeUnloadEvent) => {
      flush()
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', h)
    return () => window.removeEventListener('beforeunload', h)
  }, [dirty, flush])

  // ---- actions
  const create = useCallback((p?: Partial<Plan>) => {
    const plan = newPlan(p)
    setPlans((ps) => [...ps, plan])
    setDirty(true)
    return plan
  }, [])

  const update = useCallback((id: string, fn: (p: Plan) => Plan) => {
    setPlans((ps) => ps.map((p) => (p.id === id ? { ...fn(p), updatedAt: new Date().toISOString() } : p)))
    setDirty(true)
  }, [])

  const remove = useCallback((id: string) => {
    setPlans((ps) => ps.filter((p) => p.id !== id))
    setDirty(true)
  }, [])

  const duplicate = useCallback(
    (id: string) => {
      const src = plans.find((p) => p.id === id)
      if (!src) return
      const copy: Plan = { ...structuredClone(src), id: uid(), name: src.name + ' (2)' }
      setPlans((ps) => [...ps, copy])
      setDirty(true)
      return copy
    },
    [plans],
  )

  const importPlans = useCallback((incoming: Plan[]) => {
    setPlans((ps) => {
      const byId = new Map(ps.map((p) => [p.id, p]))
      for (const p of incoming) byId.set(p.id, p) // same id → replace with loaded version
      return [...byId.values()]
    })
  }, [])

  const restoreRecovery = useCallback(() => {
    if (!recovery) return
    importPlans(recovery.plans)
    setDirty(true)
    setRecovery(null)
  }, [recovery, importPlans])

  const discardRecovery = useCallback(() => {
    setRecovery(null)
    write(local, null)
  }, [])

  const markSaved = useCallback(() => {
    setDirty(false)
    write(local, null)
  }, [])

  const value = useMemo<Store>(
    () => ({ plans, dirty, recovery, restoreRecovery, discardRecovery, create, update, remove, duplicate, importPlans, markSaved }),
    [plans, dirty, recovery, restoreRecovery, discardRecovery, create, update, remove, duplicate, importPlans, markSaved],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function usePlans() {
  const v = useContext(Ctx)
  if (!v) throw new Error('usePlans outside provider')
  return v
}
