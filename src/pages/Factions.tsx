import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useI18n } from '../i18n/i18n'
import { factionGuides, type GamePlan } from '../content/factions'
import * as F from '../wiki/facts'
import { wikiByKey } from '../wiki/registry'
import { RichText } from '../components/RichText'
import { Term } from '../components/Term'
import { Icon } from '../components/Icon'
import { ExpTag, PlanetValues, TechColorTag, UnitStats } from '../components/Facts'
import { usePlans } from '../state/store'
import { planFromFaction } from '../state/seed'
import { useExpansions } from '../lib/expansions'
import { FactionSigil, ArchetypeIcon } from '../components/Illustrations'
import { archetypesForFaction } from '../content/archetypes'
import { Fit } from './Catalogue'
import { opponentTips } from '../content/factions/threats'

const COMPLEXITY: Record<string, number> = { Low: 1, Moderate: 2, Medium: 2, High: 3, 'Very High': 4 }

function Meter({ n, max = 4 }: { n: number; max?: number }) {
  return (
    <span className="meter" aria-label={`${n}/${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <i key={i} className={i < n ? 'on' : ''} />
      ))}
    </span>
  )
}

export function FactionList() {
  const { t, l } = useI18n()
  const [exp, setExp] = useState<'all' | 'base' | 'pok' | 'codex'>('all')
  const { factionOk, exp: enabled } = useExpansions()
  const list = useMemo(
    () => F.factions.filter((f) => factionOk(f.id) && (exp === 'all' || f.exp === exp)).sort((a, b) => a.name.replace(/^The /, '').localeCompare(b.name.replace(/^The /, ''))),
    [exp, factionOk],
  )
  return (
    <div>
      <div className="page-head">
        <div>
          <div className="eyebrow">{t('navFactions')}</div>
          <h1>{t('kinds_faction')}</h1>
        </div>
        <div className="grow" />
        <div className="seg">
          {(['all', 'base', 'pok', 'codex'] as const).filter((e) => e === 'all' || e === 'base' || enabled[e]).map((e) => (
            <button key={e} className={exp === e ? 'on' : ''} onClick={() => setExp(e)}>
              {e === 'all' ? t('all') : e === 'pok' ? 'PoK' : t(`exp_${e}`)}
            </button>
          ))}
        </div>
      </div>
      <div className="grid">
        {list.map((f) => {
          const g = factionGuides[f.id]
          return (
            <Link key={f.id} to={`/factions/${f.id}`} className="fcard" style={{ ['--fc' as string]: g?.color }}>
              <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}>
                <FactionSigil id={f.id} color={g?.color} size={30} />
                <span className="name grow">{f.name.replace(/^The /, '')}</span>
                <Meter n={COMPLEXITY[f.complexity ?? ''] ?? 2} />
              </div>
              <div className="blurb">{l(g?.blurb)}</div>
              <div className="row" style={{ marginTop: 'auto' }}>
                <ExpTag exp={f.exp} />
                <span className="tag">
                  {t('commodities')} {f.commodities}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function PlanCard({ plan, onUse }: { plan: GamePlan; onUse: () => void }) {
  const { t, l } = useI18n()
  return (
    <div className="plan-card">
      <div className="row">
        <h3 className="grow" style={{ margin: 0 }}>
          {l(plan.name)}
        </h3>
        <button className="btn sm" onClick={onUse}>
          <Icon name="plus" /> {t('newPlan')}
        </button>
      </div>
      <p className="muted" style={{ marginTop: 6 }}>
        {l(plan.summary)}
      </p>
      <div className="phases">
        <div>
          <h4>{t('openingTips')}</h4>
          <RichText text={l(plan.opening)} />
        </div>
        <div>
          <h4>{t('midGame')}</h4>
          <RichText text={l(plan.mid)} />
        </div>
        <div>
          <h4>{t('lateGame')}</h4>
          <RichText text={l(plan.late)} />
        </div>
      </div>
    </div>
  )
}

export function FactionPage() {
  const { id } = useParams()
  const { t, l, lang } = useI18n()
  const navigate = useNavigate()
  const { create } = usePlans()
  const { exp: enabled, keyOk } = useExpansions()
  const f = id ? F.factionById.get(id) : undefined
  const g = id ? factionGuides[id] : undefined
  if (!f || !g) return <p className="muted">{t('noResults')}</p>

  const homePlanets = f.homePlanets.map((p) => F.planetById.get(p)).filter((p): p is F.PlanetFact => !!p)
  const special = f.units
    .map((u) => F.unitById.get(u))
    .filter((u): u is F.UnitFact => !!u && !!u.faction && keyOk(`unit:${u.id}`))
  const fTechs = f.factionTech.map((x) => F.techById.get(x)).filter((x): x is F.TechFact => !!x)
  const startTechs = (f.startingTech.length ? f.startingTech : f.startingTechOptions)
    .map((x) => F.techById.get(x))
    .filter((x): x is F.TechFact => !!x)
  const leaders = enabled.pok ? F.leaders.filter((x) => f.leaders.includes(x.id)) : []
  const fits = archetypesForFaction(f.id)
  const promissory = f.id === 'keleres' ? ['rider'] : f.promissory

  const usePlan = (plan?: GamePlan) => {
    const p = create(planFromFaction(f.id, plan, lang))
    navigate(`/plans/${p.id}`)
  }

  return (
    <div className="stack">
      <div className="row">
        <Link className="btn ghost sm" to="/factions">
          <Icon name="back" /> {t('kinds_faction')}
        </Link>
      </div>
      <section className="faction-hero" style={{ ['--fc' as string]: g.color }}>
        <div className="row">
          <span className="eyebrow">{t('kind_faction')}</span>
          <ExpTag exp={f.exp} />
          <span className="faint">
            {t('complexity')} <Meter n={COMPLEXITY[f.complexity ?? ''] ?? 2} />
          </span>
        </div>
        <div className="row" style={{ flexWrap: 'nowrap', gap: 14 }}>
          <FactionSigil id={f.id} color={g.color} size={64} spin />
          <h1 style={{ margin: 0 }}>{f.name}</h1>
        </div>
        <p className="muted" style={{ maxWidth: 700 }}>
          {l(g.blurb)}
        </p>
        <div className="row">
          <button className="btn primary" onClick={() => usePlan(g.plans[0])}>
            <Icon name="target" /> {t('useFactionPlan')}
          </button>
        </div>
      </section>

      <div className="cols-2">
        <section className="panel">
          <div className="panel-title">{t('playstyle')}</div>
          <RichText text={l(g.playstyle)} />
          <div className="cols-2" style={{ marginTop: 8 }}>
            <div>
              <h4 style={{ color: 'var(--ok)' }}>{t('strengths')}</h4>
              <RichText text={l(g.strengths)} />
            </div>
            <div>
              <h4 style={{ color: 'var(--danger)' }}>{t('weaknesses')}</h4>
              <RichText text={l(g.weaknesses)} />
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-title">{lang === 'fr' ? 'Fiche' : 'Sheet'}</div>
          <dl className="kv">
            <dt>{t('commodities')}</dt>
            <dd>{f.commodities}</dd>
            <dt>{t('homePlanets')}</dt>
            <dd>
              {f.id === 'keleres' ? (
                <span className="muted">
                  {lang === 'fr' ? 'Selon la faction empruntée (Mentak, Xxcha ou Argent)' : 'Depends on the borrowed faction (Mentak, Xxcha or Argent)'}
                </span>
              ) : (
                <div className="row">
                  {homePlanets.map((p) => (
                    <span key={p.id} className="row" style={{ gap: 4 }}>
                      <Term to={`planet:${p.id}`} /> <PlanetValues p={p} />
                    </span>
                  ))}
                </div>
              )}
            </dd>
            <dt>{t('startingTech')}</dt>
            <dd>
              {startTechs.length ? (
                <div className="row">
                  {startTechs.map((x) => (
                    <Term key={x.id} to={`tech:${x.id}`} />
                  ))}
                  {f.startingTechOptions.length > 0 && f.startingTechAmount && (
                    <span className="faint">
                      ({lang === 'fr' ? 'choisir' : 'choose'} {f.startingTechAmount})
                    </span>
                  )}
                </div>
              ) : (
                <span className="muted">{t('none')}</span>
              )}
            </dd>
            <dt>{t('startingFleet')}</dt>
            <dd className="faint" style={{ fontSize: 13 }}>
              <StartingFleet code={f.startingFleet} />
            </dd>
            <dt>{t('goodCards')}</dt>
            <dd className="row">
              {g.goodSC.map((n) => {
                const sc = F.strategyCards.find((s) => s.initiative === n)
                return sc ? <Term key={n} to={`strategy:${sc.name.toLowerCase()}`}>{`${n}. ${sc.name}`}</Term> : null
              })}
            </dd>
          </dl>
        </section>
      </div>

      <section className="panel">
        <div className="panel-title">{t('gamePlans')}</div>
        <div className="stack">
          {g.plans.map((p, i) => (
            <PlanCard key={i} plan={p} onUse={() => usePlan(p)} />
          ))}
        </div>
        <div className="row" style={{ marginTop: 12 }}>
          <span className="faint">{t('keyTechs')}:</span>
          {g.keyTechs.map((x) => (
            <Term key={x} to={`tech:${x}`} />
          ))}
        </div>
        {g.beware && (
          <div className="banner" style={{ marginTop: 12 }}>
            <Icon name="info" />
            <span>
              <strong>{t('beware')}:</strong> {l(g.beware)}
            </span>
          </div>
        )}
      </section>

      <div className="cols-2">
        {fits.length > 0 && (
          <section className="panel">
            <div className="panel-title">{lang === 'fr' ? 'Plans du catalogue adaptés' : 'Catalogue plans that suit them'}</div>
            <div className="list">
              {fits.map(({ a, fit }) => (
                <Link key={a.id} to={`/catalogue/${a.id}`} className="list-item">
                  <span style={{ color: a.color }}>
                    <ArchetypeIcon id={a.id} size={24} />
                  </span>
                  <div className="main">
                    <div className="title">{l(a.name)}</div>
                    <div className="sub">{l(a.tagline)}</div>
                  </div>
                  <Fit n={fit} />
                </Link>
              ))}
            </div>
          </section>
        )}
        {opponentTips[f.id] && (
          <section className="panel">
            <div className="panel-title">{lang === 'fr' ? 'Les affronter' : 'Playing against them'}</div>
            <RichText text={l(opponentTips[f.id])} />
          </section>
        )}
      </div>

      <section className="panel">
        <div className="panel-title">{t('abilities')}</div>
        <div className="list">
          {f.abilities.map((a) => {
            const e = wikiByKey.get(`ability:${a}`)
            return e ? (
              <div className="list-item" key={a}>
                <div className="main">
                  <div className="title">
                    <Term to={`ability:${a}`} />
                  </div>
                  <div className="sub" style={{ WebkitLineClamp: 'unset' }}>
                    <RichText text={l(e.summary)} />
                  </div>
                </div>
              </div>
            ) : null
          })}
        </div>
      </section>

      <div className="cols-2">
        <section className="panel">
          <div className="panel-title">{t('factionTech')}</div>
          <div className="list">
            {fTechs.map((x) => (
              <div className="list-item" key={x.id}>
                <div className="main">
                  <div className="title">
                    <Term to={`tech:${x.id}`} />
                  </div>
                  <div className="sub">
                    <RichText text={l(wikiByKey.get(`tech:${x.id}`)?.summary)} plain />
                  </div>
                </div>
                <TechColorTag type={x.types[0]} />
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-title">{leaders.length ? t('leaders') : t('kinds_promissory')}</div>
          <div className="list">
            {leaders.map((x) => (
              <div className="list-item" key={x.id}>
                <div className="main">
                  <div className="title">
                    <Term to={`leader:${x.id}`} />
                  </div>
                  <div className="sub">
                    <RichText text={l(wikiByKey.get(`leader:${x.id}`)?.summary)} plain />
                  </div>
                </div>
                <span className="tag gold">{t(x.type)}</span>
              </div>
            ))}
            {promissory.map((p) => (
              <div className="list-item" key={p}>
                <div className="main">
                  <div className="title">
                    <Term to={`promissory:${p}`} />
                  </div>
                  <div className="sub">
                    <RichText text={l(wikiByKey.get(`promissory:${p}`)?.summary)} plain />
                  </div>
                </div>
                <span className="tag">{t('kind_promissory')}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-title">{t('units')}</div>
        <div className="grid">
          {special.map((u) => (
            <div key={u.id} className="plan-card">
              <div className="row">
                <strong className="grow">
                  <Term to={`unit:${u.id}`} />
                </strong>
                <span className="tag">{u.type}</span>
              </div>
              <p className="faint" style={{ margin: '6px 0' }}>
                {l(wikiByKey.get(`unit:${u.id}`)?.summary)}
              </p>
              <UnitStats u={u} />
            </div>
          ))}
        </div>
      </section>
      <p className="faint">{t('disclaimer')}</p>
    </div>
  )
}

const UNIT_CODES: Record<string, [string, string]> = {
  cv: ['carrier', 'Carrier'],
  ca: ['cruiser', 'Cruiser'],
  cr: ['cruiser', 'Cruiser'],
  dd: ['destroyer', 'Destroyer'],
  dn: ['dreadnought', 'Dreadnought'],
  ff: ['fighter', 'Fighter'],
  inf: ['infantry', 'Infantry'],
  gf: ['infantry', 'Infantry'],
  mf: ['mech', 'Mech'],
  pds: ['pds', 'PDS'],
  sd: ['spacedock', 'Space dock'],
  ws: ['warsun', 'War sun'],
  fs: ['flagship', 'Flagship'],
}

/** Turns the compact "cv, cr, 2 ff, 4 inf n" fleet code into readable chips. */
function StartingFleet({ code }: { code: string }) {
  const parts = code
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const counts = new Map<string, number>()
  for (const p of parts) {
    const m = p.match(/^(\d+)?\s*([a-z]+)/i)
    if (!m) continue
    const key = UNIT_CODES[m[2].toLowerCase()]
    if (!key) continue
    counts.set(key[0], (counts.get(key[0]) ?? 0) + Number(m[1] ?? 1))
  }
  return (
    <span className="row" style={{ gap: 4 }}>
      {[...counts.entries()].map(([id, n]) => (
        <span key={id} className="tag">
          {n}× <Term to={`unit:${id}`} />
        </span>
      ))}
    </span>
  )
}
