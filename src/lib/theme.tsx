import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { prefs } from './prefs'

export type ThemePref = 'auto' | 'light' | 'dark'

const Ctx = createContext<{ theme: ThemePref; setTheme: (t: ThemePref) => void } | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePref>(() => {
    const s = prefs.get('theme')
    return s === 'light' || s === 'dark' ? s : 'auto'
  })
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'auto') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', theme)
  }, [theme])
  const setTheme = (t: ThemePref) => {
    setThemeState(t)
    prefs.set('theme', t)
  }
  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>
}

export function useTheme() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useTheme outside provider')
  return v
}
