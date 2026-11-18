import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useI18n } from '../i18n/i18n'
import { useExpansions } from '../lib/expansions'
import { archetypeById, archetypes, type Archetype } from '../content/archetypes'
import { factionGuides } from '../content/factions'
import * as F from '../wiki/facts'
import { RichText } from '../components/RichText'
import { Term } from '../components/Term'
import { Icon } from '../components/Icon'
import { ArchetypeIcon, FactionSigil, FlowArrow } from '../components/Illustrations'
import { usePlans } from '../state/store'
import { planFromArchetype } from '../state/seed'

const short = (id: string) => F.factionById.get(id)?.name.replace(/^The /, '') ?? id

export function Fit({ n }: { n: number }) {
  return (
    <span className="fit" aria-label={`${n}/3`}>
      {[1, 2, 3].map((i) => (
        <i key={i} className={i <= n ? 'on' : ''} />
      ))}
    </span>
  )
}

function useFactions(a: Archetype | undefined) {
  const { factionOk } = useExpansions()
  if (!a) return []
  return a.factions.filter((f) => factionOk(f.id)).sort((x, y) => y.fit - x.fit)
}

function ArchCard({ a }: { a: Archetype }) {
  const { l } = useI18n()
  const fs = useFactions(a)
  return (
    <Link to={`/catalogue/${a.id}`} className="arch-card" style={{ ['--ac' as string]: a.color }}>
      <div className="row" style={{ gap: 10, flexWrap: 'nowrap' }}>
        <span style={{ color: a.color }}>
          <ArchetypeIcon id={a.id} size={34} />
        </span>
        <div style={{ minWidth: 0 }}>
          <div className="name">{l(a.name)}</div>
          <div className="tl">{l(a.tagline)}</div>
        </div>
      </div>
      <div className="fac-chips" style={{ marginTop: 'auto' }}>
        {fs.map((f) => (
          <span key={f.id} className={`fac-chip fit${f.fit}`}>
            <FactionSigil id={f.id} color={factionGuides[f.id]?.color} size={18} />
            {short(f.id)}
          </span>
        ))}
      </div>
    </Link>
  )
}

export function Catalogue() {
  const { lang } = useI18n()
  const { allows, factionOk } = useExpansions()
  const [fac, setFac] = useState<string>('')
  const list = archetypes.filter((a) => allows(a.needs)).filter((a) => !fac || a.factions.some((f) => f.id === fac))
  return (
    <div className="stack">
      <div className="page-head">
        <div>
          <div className="eyebrow">{lang === 'fr' ? 'Plans de jeu' : 'Game plans'}</div>
          <h1>{lang === 'fr' ? 'Catalogue de plans' : 'Plan catalogue'}</h1>
        </div>
        <div className="grow" />
        <select className="select" style={{ maxWidth: 240 }} value={fac} onChange={(e) => setFac(e.target.value)}>
          <option value="">{lang === 'fr' ? 'Toutes les factions' : 'All factions'}</option>
          {F.factions
            .filter((f) => factionOk(f.id))
            .sort((a, b) => short(a.id).localeCompare(short(b.id)))
            .map((f) => (
              <option key={f.id} value={f.id}>
                {short(f.id)}
              </option>
            ))}
        </select>
      </div>
      <p className="muted" style={{ margin: 0 }}>
        {lang === 'fr'
          ? 'Choisissez d’abord une façon de gagner, puis une faction qui s’y prête. Chaque plan peut devenir votre plan personnalisé.'
          : 'Pick a way to win first, then a faction that suits it. Any plan can become your own custom plan.'}
      </p>
      <div className="grid">
        {list.map((a) => (
          <ArchCard key={a.id} a={a} />
        ))}
      </div>
      <p className="faint">
        <Fit n={3} /> {lang === 'fr' ? 'faction emblématique' : 'signature faction'} · <Fit n={2} /> {lang === 'fr' ? 'très adaptée' : 'strong fit'} · <Fit n={1} />{' '}
        {lang === 'fr' ? 'jouable' : 'workable'}
      </p>
    </div>
  )
}

export function ArchetypePage() {
  const { id } = useParams()
  const { t, l, lang } = useI18n()
  const { keyOk } = useExpansions()
  const { create } = usePlans()
  const navigate = useNavigate()
  const a = id ? archetypeById.get(id) : undefined
  const fs = useFactions(a)
  const [pick, setPick] = useState<string | null>(null)
  if (!a) return <p className="muted">{t('noResults')}</p>

  const start = () => {
    const p = create(planFromArchetype(a, pick, lang))
    navigate(`/plans/${p.id}`)
  }
  const objectives = a.objectives.filter(keyOk)

  return (
    <div className="stack">
      <div className="row">
        <Link className="btn ghost sm" to="/catalogue">
          <Icon name="back" /> {lang === 'fr' ? 'Catalogue' : 'Catalogue'}
        </Link>
      </div>
      <section className="faction-hero" style={{ ['--fc' as string]: a.color }}>
        <div className="row" style={{ gap: 14, flexWrap: 'nowrap', alignItems: 'flex-start' }}>
          <span style={{ color: a.color }}>
            <ArchetypeIcon id={a.id} size={52} />
          </span>
          <div style={{ minWidth: 0 }}>
            <div className="eyebrow">{lang === 'fr' ? 'Plan de jeu' : 'Game plan'}</div>
            <h1>{l(a.name)}</h1>
            <div className="muted" style={{ maxWidth: 720 }}>
              <RichText text={l(a.summary)} />
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-title">{lang === 'fr' ? 'Factions adaptées' : 'Factions that suit it'}</div>
        <div className="fac-chips" style={{ gap: 6 }}>
          <button className={`fac-chip${pick === null ? ' on' : ''}`} style={{ paddingLeft: 8 }} onClick={() => setPick(null)}>
            {lang === 'fr' ? 'Pas encore de faction' : 'No faction yet'}
          </button>
          {fs.map((f) => (
            <button key={f.id} className={`fac-chip fit${f.fit}${pick === f.id ? ' on' : ''}`} onClick={() => setPick(f.id)}>
              <FactionSigil id={f.id} color={factionGuides[f.id]?.color} size={20} />
              {short(f.id)} <Fit n={f.fit} />
            </button>
          ))}
        </div>
        {pick && (
          <p className="faint" style={{ marginBottom: 0 }}>
            <Term to={`faction:${pick}`} /> — {l(factionGuides[pick]?.blurb)}{' '}
            {factionGuides[pick]?.plans[0] && (
              <>
                · {lang === 'fr' ? 'Plan de faction' : 'Faction plan'} : <strong>{l(factionGuides[pick].plans[0].name)}</strong>
              </>
            )}
          </p>
        )}
        <div className="row" style={{ marginTop: 12 }}>
          <button className="btn primary" onClick={start}>
            <Icon name="target" /> {lang === 'fr' ? 'Créer mon plan' : 'Create my plan'}
            {pick ? ` · ${short(pick)}` : ''}
          </button>
        </div>
      </section>

      <section className="panel">
        <div className="phases">
          <div>
            <h4>{t('openingTips')}</h4>
            <RichText text={l(a.opening)} />
          </div>
          <div>
            <h4>{t('midGame')}</h4>
            <RichText text={l(a.mid)} />
          </div>
          <div>
            <h4>{t('lateGame')}</h4>
            <RichText text={l(a.late)} />
          </div>
        </div>
      </section>

      <div className="cols-2">
        <section className="panel">
          <div className="panel-title">{lang === 'fr' ? 'Objectifs à viser' : 'Objectives to aim for'}</div>
          <div className="pill-list">
            {objectives.map((k) => (
              <div key={k} className="pill">
                <span className="grow">
                  <Term to={k} />
                </span>
                <span className={`tag${k.startsWith('public') ? ' gold' : ''}`}>{k.startsWith('public') ? 'Public' : 'Secret'}</span>
              </div>
            ))}
          </div>
        </section>
        <div className="stack">
          <section className="panel">
            <div className="panel-title">{lang === 'fr' ? 'Parcours technologique type' : 'Typical tech path'}</div>
            <div className="tech-flow">
              {a.techs.map((tid, i) => {
                const tech = F.techById.get(tid)
                return (
                  <span key={tid} className="tech-step">
                    {i > 0 && <FlowArrow />}
                    <div className="tech-node" style={{ ['--tc' as string]: `var(--t-${tech?.types[0] === 'unitupgrade' ? 'unit' : tech?.types[0]})`, minWidth: 0 }}>
                      <span className="tn-name">
                        <Term to={`tech:${tid}`} />
                      </span>
                    </div>
                  </span>
                )
              })}
            </div>
          </section>
          <section className="panel">
            <div className="panel-title">{t('goodCards')}</div>
            <div className="row">
              {a.sc.map((n) => {
                const sc = F.strategyCards.find((s) => s.initiative === n)
                return sc ? <Term key={n} to={`strategy:${sc.name.toLowerCase()}`}>{`${n}. ${sc.name}`}</Term> : null
              })}
            </div>
          </section>
          <section className="panel">
            <div className="panel-title">{lang === 'fr' ? 'Ce qui le contre' : 'What beats it'}</div>
            <RichText text={l(a.risks)} />
          </section>
        </div>
      </div>
    </div>
  )
}
