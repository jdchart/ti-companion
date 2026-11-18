import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/i18n'
import { Icon } from '../components/Icon'
import { Term } from '../components/Term'
import { entryPath, wiki, type WikiEntry } from '../wiki/registry'
import { RichText } from '../components/RichText'
import { ConceptArt, FactionSigil, PlanetArt, TechArt, UnitArt } from '../components/Illustrations'
import { factionGuides } from '../content/factions'
import type { PlanetFact, TechFact, UnitFact } from '../wiki/facts'
import { useExpansions } from '../lib/expansions'

const PHASES = [
  { ref: 'strategy-phase', d: { en: 'Pick strategy cards', fr: 'Choisir les cartes stratégie' } },
  { ref: 'action-phase', d: { en: 'Tactical, strategic & component actions', fr: 'Actions tactiques, stratégiques et de composant' } },
  { ref: 'status-phase', d: { en: 'Score, gain tokens, ready everything', fr: 'Marquer, gagner des jetons, tout redresser' } },
  { ref: 'agenda-phase', d: { en: 'Vote on laws & directives', fr: 'Voter lois et directives' } },
]

function EntryArt({ e }: { e: WikiEntry }) {
  if (e.kind === 'concept') return <ConceptArt slug={e.slug} />
  if (e.kind === 'planet') return <div className="illu-box square"><PlanetArt p={e.fact as PlanetFact} size={140} /></div>
  if (e.kind === 'tech') return <div className="illu-box square"><TechArt tech={e.fact as TechFact} size={140} /></div>
  if (e.kind === 'unit') return <div className="illu-box square"><UnitArt type={(e.fact as UnitFact).type} upgraded={!!(e.fact as UnitFact).requiredTech} size={140} /></div>
  if (e.kind === 'faction') return <div className="illu-box square"><FactionSigil id={e.slug} color={factionGuides[e.slug]?.color} size={120} spin /></div>
  return null
}

/** "Did you know?" — a random wiki entry, re-rollable. */
function RandomEntry() {
  const { t, l, lang } = useI18n()
  const { entryOk } = useExpansions()
  const pool = wiki.filter(entryOk)
  const [i, setI] = useState(() => Math.floor(Math.random() * pool.length))
  const e = pool[i % pool.length]
  if (!e) return null
  return (
    <section className="panel random-entry">
      <div className="panel-title">
        <span className="grow">{lang === 'fr' ? 'Au hasard dans le wiki' : 'Random from the wiki'}</span>
        <button className="btn sm ghost" onClick={() => setI(Math.floor(Math.random() * pool.length))}>
          <Icon name="refresh" /> {lang === 'fr' ? 'Une autre' : 'Another'}
        </button>
      </div>
      <EntryArt e={e} />
      <div className="eyebrow">{t(`kind_${e.kind}`)}</div>
      <h2 style={{ margin: '4px 0 6px' }}>{l(e.title)}</h2>
      <RichText text={l(e.summary)} />
      <Link className="btn sm" to={entryPath(e)} style={{ marginTop: 8 }}>
        <Icon name="book" /> {lang === 'fr' ? 'Ouvrir dans le wiki' : 'Open in wiki'}
      </Link>
      <div style={{ clear: 'both' }} />
    </section>
  )
}

export default function Home() {
  const { t, l, lang } = useI18n()
  const { entryOk } = useExpansions()
  const count = wiki.filter(entryOk).length
  return (
    <div className="stack">
      <section className="panel plated hero-home">
        <svg className="orbit home-orbit" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="90" fill="none" stroke="var(--gold)" strokeWidth="1" strokeDasharray="2 6" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="var(--accent)" strokeWidth="1" />
          <circle cx="100" cy="100" r="30" fill="none" stroke="var(--gold)" strokeWidth="1.5" />
          <circle cx="160" cy="100" r="5" fill="var(--accent)" />
          <circle cx="100" cy="10" r="4" fill="var(--gold)" />
        </svg>
        <div className="eyebrow">{t('tagline')}</div>
        <h1 style={{ marginTop: 6 }}>{t('welcome')}</h1>
        <p className="muted" style={{ maxWidth: 620 }}>
          {t('homeIntro')}
        </p>
        <p className="faint">{t('tooltipHint')}</p>
      </section>

      <section>
        <div className="panel-title">{t('quickLinks')}</div>
        <div className="grid">
          <Link className="qlink" to="/wiki">
            <Icon name="book" />
            <div>
              <div className="t">{t('navWiki')}</div>
              <div className="d">
                {count} {t('entries')}
              </div>
            </div>
          </Link>
          <Link className="qlink" to="/factions">
            <Icon name="flag" />
            <div>
              <div className="t">{t('navFactions')}</div>
              <div className="d">{lang === 'fr' ? 'Profils et plans de jeu' : 'Profiles & game plans'}</div>
            </div>
          </Link>
          <Link className="qlink" to="/plans">
            <Icon name="target" />
            <div>
              <div className="t">{t('navPlans')}</div>
              <div className="d">{lang === 'fr' ? 'Préparer et suivre une partie' : 'Prepare and track a game'}</div>
            </div>
          </Link>
          <Link className="qlink" to="/catalogue">
            <Icon name="layers" />
            <div>
              <div className="t">{lang === 'fr' ? 'Catalogue de plans' : 'Plan catalogue'}</div>
              <div className="d">{lang === 'fr' ? 'Choisir une stratégie, puis une faction' : 'Pick a strategy, then a faction'}</div>
            </div>
          </Link>
          <Link className="qlink" to="/simulator">
            <Icon name="dice" />
            <div>
              <div className="t">{lang === 'fr' ? 'Simulateur de combat' : 'Combat simulator'}</div>
              <div className="d">{lang === 'fr' ? 'Vos chances avant d’attaquer' : 'Your odds before you attack'}</div>
            </div>
          </Link>
        </div>
      </section>

      <section className="panel">
        <div className="panel-title">{t('roundOverview')}</div>
        <div className="phase-steps">
          {PHASES.map((p, i) => (
            <div className="phase-step" key={p.ref}>
              <div className="n">0{i + 1}</div>
              <div className="t">
                <Term to={p.ref} />
              </div>
              <div className="d">{l(p.d)}</div>
            </div>
          ))}
        </div>
        <p className="faint" style={{ marginTop: 10, marginBottom: 0 }}>
          <Term to="tactical-action" /> · <Term to="command-tokens" /> · <Term to="objectives" /> ·{' '}
          <Term to="custodians-token" /> · <Term to="transactions" />
        </p>
      </section>

      <RandomEntry />

      <p className="faint">{t('disclaimer')}</p>
    </div>
  )
}
