import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { L, Lang } from '../content/types'
import { strings, type StringKey } from './strings'
import { prefs } from '../lib/prefs'

interface I18n {
  lang: Lang
  setLang: (l: Lang) => void
  /** UI string, with optional {placeholders}. */
  t: (key: StringKey, vars?: Record<string, string | number>) => string
  /** Pick the current language from a localised content string. */
  l: (text: L | undefined) => string
}

const Ctx = createContext<I18n | null>(null)

function initialLang(): Lang {
  const saved = prefs.get('lang')
  if (saved === 'en' || saved === 'fr') return saved
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    prefs.set('lang', l)
  }, [])

  const value = useMemo<I18n>(
    () => ({
      lang,
      setLang,
      t: (key, vars) => {
        let s: string = strings[lang][key] ?? strings.en[key] ?? key
        if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v))
        return s
      },
      l: (text) => (text ? text[lang] || text.en : ''),
    }),
    [lang, setLang],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n(): I18n {
  const v = useContext(Ctx)
  if (!v) throw new Error('useI18n outside provider')
  return v
}
