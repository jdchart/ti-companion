import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/i18n'
import { useTheme } from '../lib/theme'
import { BrandMark, Icon, type IconName } from './Icon'
import { SearchBox } from './SearchBox'
import { usePlans } from '../state/store'
import type { StringKey } from '../i18n/strings'
import type { L } from '../content/types'

/**
 * ONE navigation list for desktop and mobile, same order and labels.
 * `main` items: sidebar top / mobile bottom bar.
 * `more` items: sidebar below a divider / mobile "More" sheet.
 */
type NavItem = { to: string; icon: IconName; label: StringKey | L; end?: boolean; group: 'main' | 'more' }
const NAV: NavItem[] = [
  { to: '/', icon: 'home', label: 'navHome', end: true, group: 'main' },
  { to: '/wiki', icon: 'book', label: 'navWiki', group: 'main' },
  { to: '/factions', icon: 'flag', label: 'navFactions', group: 'main' },
  { to: '/plans', icon: 'target', label: 'navPlans', group: 'main' },
  { to: '/catalogue', icon: 'layers', label: { en: 'Plan catalogue', fr: 'Catalogue de plans' }, group: 'more' },
  { to: '/simulator', icon: 'dice', label: { en: 'Combat sim', fr: 'Simulateur' }, group: 'more' },
  { to: '/settings', icon: 'gear', label: 'navSettings', group: 'more' },
]
const MAIN = NAV.filter((n) => n.group === 'main')
const MORE = NAV.filter((n) => n.group === 'more')
const MORE_L: L = { en: 'More', fr: 'Plus' }

export function Layout() {
  const { t, l, lang, setLang } = useI18n()
  const label = (x: StringKey | L) => (typeof x === 'string' ? t(x) : l(x))
  const { theme, setTheme } = useTheme()
  const { pathname } = useLocation()
  const { recovery, restoreRecovery, discardRecovery } = usePlans()

  const [moreOpen, setMoreOpen] = useState(false)
  const moreActive = MORE.some((n) => pathname.startsWith(n.to))

  useEffect(() => {
    window.scrollTo(0, 0)
    setMoreOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!moreOpen) return
    const h = (e: KeyboardEvent) => e.key === 'Escape' && setMoreOpen(false)
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [moreOpen])

  const isDark =
    theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <div className="shell">
      <aside className="sidenav">
        <NavLink to="/" className="brand">
          <BrandMark className="brand-mark" />
          <div>
            <div className="brand-name">{t('appName')}</div>
            <div className="brand-sub">Twilight Imperium 4</div>
          </div>
        </NavLink>
        <ul className="navlist">
          {MAIN.map((n) => (
            <li key={n.to}>
              <NavLink to={n.to} end={n.end} className="navlink">
                <Icon name={n.icon} /> {label(n.label)}
              </NavLink>
            </li>
          ))}
          <li className="nav-divider" role="separator" />
          {MORE.map((n) => (
            <li key={n.to}>
              <NavLink to={n.to} end={n.end} className="navlink">
                <Icon name={n.icon} /> {label(n.label)}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="sidenav-foot">{t('unofficialTitle')}</div>
      </aside>

      <header className="topbar">
        <NavLink to="/" className="brand-mobile" aria-label={t('appName')}>
          <BrandMark className="brand-mark" />
        </NavLink>
        <SearchBox />
        <div className="grow" />
        <button
          className="btn ghost sm"
          onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
          aria-label={t('language')}
          title={t('language')}
        >
          {lang === 'en' ? 'FR' : 'EN'}
        </button>
        <button
          className="btn ghost icon"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          aria-label={t('theme')}
          title={t('theme')}
        >
          <Icon name={isDark ? 'sun' : 'moon'} />
        </button>
      </header>

      <main className="content">
        {recovery && (
          <div className="banner" role="status" style={{ marginBottom: 12, flexWrap: 'wrap' }}>
            <Icon name="info" />
            <span className="grow">
              {l({
                en: `Unsaved work from your last visit: ${recovery.plans.length} plan(s)`,
                fr: `Travail non enregistré de votre dernière visite : ${recovery.plans.length} plan(s)`,
              })}
              {recovery.savedAt ? ` · ${new Date(recovery.savedAt).toLocaleString(lang)}` : ''}
            </span>
            <button className="btn sm primary" onClick={restoreRecovery}>
              <Icon name="refresh" /> {l({ en: 'Restore', fr: 'Restaurer' })}
            </button>
            <button className="btn sm ghost" onClick={discardRecovery}>
              {l({ en: 'Discard', fr: 'Ignorer' })}
            </button>
          </div>
        )}
        <Outlet />
      </main>

      {moreOpen && (
        <>
          <div className="sheet-backdrop more-backdrop" onClick={() => setMoreOpen(false)} />
          <div className="more-sheet" role="menu" aria-label={l(MORE_L)}>
            {MORE.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} role="menuitem" className="more-item" onClick={() => setMoreOpen(false)}>
                <Icon name={n.icon} size={20} />
                <span>{label(n.label)}</span>
                <Icon name="chevron" size={16} />
              </NavLink>
            ))}
          </div>
        </>
      )}
      <nav className="bottomnav">
        {MAIN.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end}>
            <Icon name={n.icon} />
            {label(n.label)}
          </NavLink>
        ))}
        <button
          type="button"
          className={moreActive || moreOpen ? 'active' : ''}
          aria-expanded={moreOpen}
          aria-haspopup="menu"
          onClick={() => setMoreOpen((o) => !o)}
        >
          <Icon name="grid" />
          {l(MORE_L)}
        </button>
      </nav>
    </div>
  )
}
