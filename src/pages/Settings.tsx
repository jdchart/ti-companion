import { useI18n } from '../i18n/i18n'
import { useTheme, type ThemePref } from '../lib/theme'
import { useExpansions } from '../lib/expansions'
import { ExpansionArt } from '../components/Illustrations'
import { wiki } from '../wiki/registry'
import * as F from '../wiki/facts'

const EXPS = [
  {
    id: 'base' as const,
    name: { en: 'Base game', fr: 'Jeu de base' },
    d: { en: '17 factions, the core rules and decks. Always on.', fr: '17 factions, les règles et paquets de base. Toujours actif.' },
  },
  {
    id: 'pok' as const,
    name: { en: 'Prophecy of Kings', fr: 'Prophecy of Kings' },
    d: {
      en: '7 factions, leaders, mechs, exploration, relics, new objectives and 14-point games.',
      fr: '7 factions, dirigeants, mécas, exploration, reliques, nouveaux objectifs et parties en 14 points.',
    },
  },
  {
    id: 'codex' as const,
    name: { en: 'Codex (I–IV)', fr: 'Codex (I–IV)' },
    d: {
      en: 'Free official updates: the Council Keleres faction and reworked cards. Needs Prophecy of Kings.',
      fr: 'Mises à jour officielles gratuites : la faction Council Keleres et des cartes retravaillées. Nécessite Prophecy of Kings.',
    },
  },
]

export default function Settings() {
  const { t, l, lang, setLang } = useI18n()
  const { theme, setTheme } = useTheme()
  const { exp, setExp, entryOk, factionOk } = useExpansions()
  const on = (id: 'base' | 'pok' | 'codex') => id === 'base' || exp[id]
  return (
    <div className="stack" style={{ maxWidth: 720 }}>
      <div className="page-head">
        <div>
          <div className="eyebrow">{t('appName')}</div>
          <h1>{t('navSettings')}</h1>
        </div>
      </div>
      <section className="panel">
        <div className="panel-title">{lang === 'fr' ? 'Extensions jouées' : 'Expansions in play'}</div>
        <p className="faint" style={{ marginTop: 0 }}>
          {lang === 'fr'
            ? 'Le wiki, les factions, le catalogue, le simulateur et les listes des plans n’affichent que ce que votre groupe utilise.'
            : 'The wiki, factions, catalogue, simulator and plan pickers only show what your group plays with.'}
        </p>
        <div className="exp-grid">
          {EXPS.map((x) => (
            <button
              key={x.id}
              className={`exp-opt${on(x.id) ? ' on' : ''}`}
              disabled={x.id === 'base' || (x.id === 'codex' && !exp.pok)}
              aria-pressed={on(x.id)}
              onClick={() => x.id !== 'base' && setExp({ [x.id]: !exp[x.id] })}
            >
              <ExpansionArt id={x.id} />
              <span>
                <span className="t">{l(x.name)}</span>
                <br />
                <span className="d">{l(x.d)}</span>
              </span>
              <span className="sw" aria-hidden="true" />
            </button>
          ))}
          <div className="exp-opt" aria-disabled="true" style={{ opacity: 0.55, cursor: 'default' }}>
            <ExpansionArt id="te" />
            <span>
              <span className="t">Thunder’s Edge</span>
              <br />
              <span className="d">{lang === 'fr' ? 'Pas encore intégrée à l’application.' : 'Not in the app yet.'}</span>
            </span>
          </div>
        </div>
        <p className="faint" style={{ marginBottom: 0 }}>
          {F.factions.filter((f) => factionOk(f.id)).length} {lang === 'fr' ? 'factions' : 'factions'} · {wiki.filter(entryOk).length}{' '}
          {t('entries')}
        </p>
      </section>
      <section className="panel">
        <div className="panel-title">{t('language')}</div>
        <div className="seg">
          <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>
            English
          </button>
          <button className={lang === 'fr' ? 'on' : ''} onClick={() => setLang('fr')}>
            Français
          </button>
        </div>
      </section>
      <section className="panel">
        <div className="panel-title">{t('theme')}</div>
        <div className="seg">
          {(['auto', 'light', 'dark'] as ThemePref[]).map((k) => (
            <button key={k} className={theme === k ? 'on' : ''} onClick={() => setTheme(k)}>
              {t(k === 'auto' ? 'themeAuto' : k === 'light' ? 'themeLight' : 'themeDark')}
            </button>
          ))}
        </div>
      </section>
      <section className="panel">
        <div className="panel-title">{t('unofficialTitle')}</div>
        <p className="muted">{t('disclaimer')}</p>
        <p className="faint" style={{ marginBottom: 0 }}>
          {lang === 'fr'
            ? 'Données factuelles (valeurs des planètes, caractéristiques, noms de cartes) recoupées avec le bot AsyncTI4 (logiciel sous licence Unlicense). Polices : Inter, Rajdhani, Orbitron (SIL Open Font License).'
            : 'Factual data (planet values, unit stats, card names) cross-checked against the AsyncTI4 bot data (software released under the Unlicense). Fonts: Inter, Rajdhani, Orbitron (SIL Open Font License).'}
        </p>
      </section>
    </div>
  )
}
