import { useMemo, useRef, useState, type ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useI18n } from '../i18n/i18n'
import { usePlans } from '../state/store'
import { downloadJson, parseFile, slugify, toFile, uid, type LeaderState, type Plan } from '../state/plan'
import { planFromFaction } from '../state/seed'
import * as F from '../wiki/facts'
import { factionGuides } from '../content/factions'
import { wikiByKey } from '../wiki/registry'
import { Icon } from '../components/Icon'
import { Term } from '../components/Term'
import { Combo, type ComboOption } from '../components/Combo'
import { PlanetValues, TechColorTag } from '../components/Facts'
import { RichText } from '../components/RichText'
import { useExpansions } from '../lib/expansions'
import { archetypeById, archetypes } from '../content/archetypes'
import { opponentTips } from '../content/factions/threats'
import { suggestObjectives, suggestTechs, techPathStatus } from '../state/suggest'
import { ArchetypeIcon, FactionSigil, PlanetArt, TechArt } from '../components/Illustrations'
import type { L } from '../content/types'

function useToast() {
  const [msg, setMsg] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const show = (m: string) => {
    setMsg(m)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMsg(null), 2600)
  }
  return { node: msg ? <div className="toast">{msg}</div> : null, show }
}

const fname = (base: string) => `ti-${slugify(base)}-${new Date().toISOString().slice(0, 10)}.json`

/** Shared hidden file input for "Load JSON". */
function ImportButton({ onLoaded }: { onLoaded: (plans: Plan[]) => void }) {
  const { t } = useI18n()
  const ref = useRef<HTMLInputElement>(null)
  const [err, setErr] = useState(false)
  return (
    <>
      <input
        ref={ref}
        type="file"
        accept="application/json,.json"
        hidden
        onChange={async (e) => {
          const file = e.target.files?.[0]
          e.target.value = ''
          if (!file) return
          try {
            onLoaded(parseFile(await file.text()))
            setErr(false)
          } catch {
            setErr(true)
            alert(t('importError'))
          }
        }}
      />
      <button className={`btn${err ? ' danger' : ''}`} onClick={() => ref.current?.click()}>
        <Icon name="upload" /> {t('importJson')}
      </button>
    </>
  )
}

export function PlanList() {
  const { t, lang } = useI18n()
  const { plans, create, importPlans, dirty, markSaved } = usePlans()
  const navigate = useNavigate()
  const toast = useToast()

  return (
    <div className="stack">
      <div className="page-head">
        <div>
          <div className="eyebrow">{t('navPlans')}</div>
          <h1>{t('plans')}</h1>
        </div>
        <div className="grow" />
        <div className="row">
          <ImportButton
            onLoaded={(ps) => {
              importPlans(ps)
              toast.show(t('importedN', { n: ps.length }))
              if (ps.length === 1) navigate(`/plans/${ps[0].id}`)
            }}
          />
          {plans.length > 0 && (
            <button
              className="btn"
              onClick={() => {
                downloadJson(fname(lang === 'fr' ? 'plans' : 'setup'), toFile(plans))
                markSaved()
                toast.show(t('exportedOk'))
              }}
            >
              <Icon name="download" /> {t('exportAll')}
            </button>
          )}
          <button className="btn primary" onClick={() => navigate(`/plans/${create().id}`)}>
            <Icon name="plus" /> {t('newPlan')}
          </button>
        </div>
      </div>
      <div className="banner info">
        <Icon name="info" /> {dirty ? t('unsaved') : t('savedNote')}
      </div>
      {plans.length === 0 ? (
        <div className="panel">
          <p className="muted" style={{ margin: 0 }}>
            {t('noPlans')}
          </p>
        </div>
      ) : (
        <div className="list">
          {plans.map((p) => {
            const f = p.factionId ? F.factionById.get(p.factionId) : null
            return (
              <Link key={p.id} to={`/plans/${p.id}`} className="list-item">
                <span className="dot" style={{ background: (p.factionId && factionGuides[p.factionId]?.color) || 'var(--line-strong)', width: 12, height: 12 }} />
                <div className="main">
                  <div className="title">{p.name}</div>
                  <div className="sub">
                    {f?.name ?? t('chooseFaction')} · {t('round')} {p.tracker.round}
                  </div>
                </div>
                <span className="tag gold">
                  {p.tracker.vp}/{p.tracker.vpGoal} {t('points')}
                </span>
              </Link>
            )
          })}
        </div>
      )}
      {toast.node}
    </div>
  )
}

// ---------------------------------------------------------------- editor

function Counter({
  label,
  value,
  onChange,
  min = 0,
  max = 99,
  big,
}: {
  label: ReactNode
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  big?: boolean
}) {
  return (
    <div className={`counter${big ? ' big' : ''}`}>
      <span className="label">{label}</span>
      <span className="ctl">
        <button className="btn icon sm" aria-label="−" onClick={() => onChange(Math.max(min, value - 1))}>
          <Icon name="minus" />
        </button>
        <span className="val">{value}</span>
        <button className="btn icon sm" aria-label="+" onClick={() => onChange(Math.min(max, value + 1))}>
          <Icon name="plus" />
        </button>
      </span>
    </div>
  )
}

export function PlanEditor() {
  const { id } = useParams()
  const { t, l, lang } = useI18n()
  const { plans, update, remove, duplicate, dirty, markSaved } = usePlans()
  const { factionOk, allows } = useExpansions()
  const navigate = useNavigate()
  const toast = useToast()
  type Tab = 'strategy' | 'table' | 'tracker' | 'planets'
  // Remember the open tab per plan for this browser tab (survives reloads).
  const tabKey = `ti-companion:tab:${id}`
  const [tab, setTabState] = useState<Tab>(() => {
    try {
      return (sessionStorage.getItem(tabKey) as Tab) || 'strategy'
    } catch {
      return 'strategy'
    }
  })
  const setTab = (k: Tab) => {
    setTabState(k)
    try {
      sessionStorage.setItem(tabKey, k)
    } catch {
      /* ignore */
    }
  }
  const plan = plans.find((p) => p.id === id)

  if (!plan) {
    return (
      <div className="panel">
        <p className="muted">{t('noPlans')}</p>
        <Link to="/plans" className="btn">
          <Icon name="back" /> {t('plans')}
        </Link>
      </div>
    )
  }
  const set = (fn: (p: Plan) => Plan) => update(plan.id, fn)
  const guide = plan.factionId ? factionGuides[plan.factionId] : undefined
  const arch = plan.archetypeId ? archetypeById.get(plan.archetypeId) : undefined

  return (
    <div className="stack">
      <div className="row">
        <Link className="btn ghost sm" to="/plans">
          <Icon name="back" /> {t('plans')}
        </Link>
        <div className="grow" />
        <button
          className="btn sm"
          onClick={() => {
            downloadJson(fname(plan.name), toFile([plan]))
            markSaved()
            toast.show(t('exportedOk'))
          }}
        >
          <Icon name="download" /> {t('exportJson')}
        </button>
        <button
          className="btn sm icon"
          title={t('duplicate')}
          aria-label={t('duplicate')}
          onClick={() => {
            const c = duplicate(plan.id)
            if (c) navigate(`/plans/${c.id}`)
          }}
        >
          <Icon name="copy" />
        </button>
        <button
          className="btn sm icon danger"
          title={t('delete')}
          aria-label={t('delete')}
          onClick={() => {
            if (confirm(t('confirmDelete'))) {
              remove(plan.id)
              navigate('/plans')
            }
          }}
        >
          <Icon name="trash" />
        </button>
      </div>

      <section className="faction-hero" style={{ ['--fc' as string]: guide?.color ?? 'var(--gold)' }}>
        <div className="cols-2" style={{ alignItems: 'end' }}>
          <label>
            <div className="faint">{t('planName')}</div>
            <input className="input" value={plan.name} onChange={(e) => set((p) => ({ ...p, name: e.target.value }))} />
          </label>
          <label>
            <div className="faint">{t('faction')}</div>
            <select
              className="select"
              value={plan.factionId ?? ''}
              onChange={(e) => {
                const fid = e.target.value || null
                set((p) => {
                  if (!fid) return { ...p, factionId: null }
                  // Fresh plans adopt the faction's home planets & starting techs.
                  const fresh = p.tracker.planets.length === 0 && p.tracker.techs.length === 0
                  const seed = planFromFaction(fid, undefined, lang)
                  return {
                    ...p,
                    factionId: fid,
                    tracker: fresh ? { ...p.tracker, planets: seed.tracker!.planets, techs: seed.tracker!.techs } : p.tracker,
                  }
                })
              }}
            >
              <option value="">{t('chooseFaction')}</option>
              {[...F.factions]
                .filter((f) => factionOk(f.id) || f.id === plan.factionId)
                .sort((a, b) => a.name.replace(/^The /, '').localeCompare(b.name.replace(/^The /, '')))
                .map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name.replace(/^The /, '')}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div className="row" style={{ marginTop: 8, alignItems: 'center' }}>
          {plan.factionId && <FactionSigil id={plan.factionId} color={guide?.color} size={28} />}
          {plan.factionId && <Term to={`faction:${plan.factionId}`} />}
          <div className="grow" />
          {arch && (
            <span style={{ color: arch.color }}>
              <ArchetypeIcon id={arch.id} size={22} />
            </span>
          )}
          <select
            className="select"
            style={{ maxWidth: 230 }}
            aria-label={lang === 'fr' ? 'Type de plan' : 'Plan type'}
            value={plan.archetypeId ?? ''}
            onChange={(e) => set((p) => ({ ...p, archetypeId: e.target.value || null }))}
          >
            <option value="">{lang === 'fr' ? 'Type de plan : libre' : 'Plan type: free-form'}</option>
            {archetypes
              .filter((a) => allows(a.needs) || a.id === plan.archetypeId)
              .map((a) => (
                <option key={a.id} value={a.id}>
                  {l(a.name)}
                </option>
              ))}
          </select>
          {arch && (
            <Link className="btn ghost sm" to={`/catalogue/${arch.id}`}>
              <Icon name="external" />
            </Link>
          )}
        </div>
      </section>

      {dirty && (
        <div className="banner">
          <Icon name="info" /> {t('unsaved')}
        </div>
      )}

      <div className="tabs" role="tablist">
        {(['strategy', 'table', 'tracker', 'planets'] as const).map((k) => (
          <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>
            {k === 'table'
              ? `${lang === 'fr' ? 'Table' : 'Table'}${plan.opponents.length ? ` · ${plan.opponents.length}` : ''}`
              : t(k === 'strategy' ? 'tabStrategy' : k === 'tracker' ? 'tabTracker' : 'tabPlanets')}
          </button>
        ))}
      </div>

      {tab === 'strategy' && <StrategyTab plan={plan} set={set} />}
      {tab === 'table' && <TableTab plan={plan} set={set} />}
      {tab === 'tracker' && <TrackerTab plan={plan} set={set} />}
      {tab === 'planets' && <PlanetsTab plan={plan} set={set} />}
      {toast.node}
    </div>
  )
}

type Setter = (fn: (p: Plan) => Plan) => void

function StrategyTab({ plan, set }: { plan: Plan; set: Setter }) {
  const { t, l, lang } = useI18n()
  const [newPrio, setNewPrio] = useState('')
  const s = plan.strategy
  const setS = (patch: Partial<Plan['strategy']>) => set((p) => ({ ...p, strategy: { ...p.strategy, ...patch } }))
  const guide = plan.factionId ? factionGuides[plan.factionId] : undefined
  const { keyOk } = useExpansions()

  const techOptions = useMemo<ComboOption[]>(
    () =>
      F.techs
        .filter((x) => !x.faction || x.faction === plan.factionId)
        .filter((x) => !s.techPath.includes(x.id) && keyOk(`tech:${x.id}`))
        .map((x) => ({ value: x.id, label: x.name, hint: <TechColorTag type={x.types[0]} /> })),
    [plan.factionId, s.techPath, keyOk],
  )
  const objOptions = useMemo<ComboOption[]>(
    () =>
      [
        ...F.publicObjectives.map((o) => ({ value: `public:${o.id}`, label: o.name, hint: <span className="tag gold">{o.stage === 1 ? 'I' : 'II'}</span> })),
        ...F.secretObjectives.map((o) => ({ value: `secret:${o.id}`, label: o.name, hint: <span className="tag">{lang === 'fr' ? 'Secret' : 'Secret'}</span> })),
      ].filter((o) => !s.targetObjectives.includes(o.value) && keyOk(o.value)),
    [s.targetObjectives, lang, keyOk],
  )
  const objSuggest = suggestObjectives(plan, keyOk)
  const techSuggest = suggestTechs(plan, keyOk)

  return (
    <div className="cols-2">
      <div className="stack">
        <section className="panel">
          <div className="panel-title">{t('summary')}</div>
          <textarea className="textarea" placeholder={t('summaryPh')} value={s.summary} onChange={(e) => setS({ summary: e.target.value })} />
          {guide && guide.plans.length > 0 && !s.summary && (
            <p className="faint" style={{ marginTop: 6, marginBottom: 0 }}>
              💡 {l(guide.plans[0].summary)}
            </p>
          )}
        </section>

        <section className="panel">
          <div className="panel-title">
            <span className="grow">{t('priorities')}</span>
            <span className="faint">
              {s.priorities.filter((x) => x.done).length}/{s.priorities.length}
            </span>
          </div>
          {s.priorities.map((pr) => (
            <div key={pr.id} className={`check${pr.done ? ' done' : ''}`}>
              <input
                type="checkbox"
                checked={pr.done}
                onChange={() => setS({ priorities: s.priorities.map((x) => (x.id === pr.id ? { ...x, done: !x.done } : x)) })}
              />
              <input
                className="input txt"
                style={{ border: 0, background: 'transparent', padding: 0, height: 26 }}
                value={pr.text}
                onChange={(e) => setS({ priorities: s.priorities.map((x) => (x.id === pr.id ? { ...x, text: e.target.value } : x)) })}
              />
              <button className="btn ghost icon sm" aria-label={t('remove')} onClick={() => setS({ priorities: s.priorities.filter((x) => x.id !== pr.id) })}>
                <Icon name="x" />
              </button>
            </div>
          ))}
          <form
            className="row"
            style={{ marginTop: 6 }}
            onSubmit={(e) => {
              e.preventDefault()
              if (!newPrio.trim()) return
              setS({ priorities: [...s.priorities, { id: uid(), text: newPrio.trim(), done: false }] })
              setNewPrio('')
            }}
          >
            <input className="input grow" placeholder={t('addPriority')} value={newPrio} onChange={(e) => setNewPrio(e.target.value)} />
            <button className="btn icon" aria-label={t('addPriority')}>
              <Icon name="plus" />
            </button>
          </form>
        </section>

        <section className="panel">
          <div className="panel-title">{t('notes')}</div>
          <textarea className="textarea" value={s.notes} onChange={(e) => setS({ notes: e.target.value })} />
        </section>
      </div>

      <div className="stack">
        <section className="panel">
          <div className="panel-title">{t('preferredSC')}</div>
          <div className="sc-grid">
            {F.strategyCards.map((sc) => {
              const on = s.preferredSC.includes(sc.initiative)
              return (
                <button
                  key={sc.id}
                  className={`sc-btn${on ? ' on' : ''}`}
                  onClick={() =>
                    setS({ preferredSC: on ? s.preferredSC.filter((n) => n !== sc.initiative) : [...s.preferredSC, sc.initiative].sort() })
                  }
                >
                  <span className="num" style={{ background: sc.color }}>
                    {sc.initiative}
                  </span>
                  {sc.name}
                </button>
              )
            })}
          </div>
        </section>

        <section className="panel">
          <div className="panel-title">{t('targetObjectives')}</div>
          <div className="pill-list" style={{ marginBottom: 8 }}>
            {s.targetObjectives.map((k) => {
              const scored = plan.tracker.scored.includes(k)
              return (
                <div key={k} className="pill">
                  <input
                    type="checkbox"
                    checked={scored}
                    title={t('scoredObjectives')}
                    style={{ accentColor: 'var(--gold)' }}
                    onChange={() =>
                      set((p) => ({
                        ...p,
                        tracker: { ...p.tracker, scored: scored ? p.tracker.scored.filter((x) => x !== k) : [...p.tracker.scored, k] },
                      }))
                    }
                  />
                  <span className="grow">
                    <Term to={k} />
                  </span>
                  <button className="btn ghost icon sm" aria-label={t('remove')} onClick={() => setS({ targetObjectives: s.targetObjectives.filter((x) => x !== k) })}>
                    <Icon name="x" />
                  </button>
                </div>
              )
            })}
          </div>
          <Combo options={objOptions} placeholder={t('addObjective')} onPick={(v) => setS({ targetObjectives: [...s.targetObjectives, v] })} />
          <Suggestions items={objSuggest} onAdd={(k) => setS({ targetObjectives: [...s.targetObjectives, k] })} empty={!plan.factionId && !plan.archetypeId} />
        </section>

        <section className="panel">
          <div className="panel-title">{t('techPath')}</div>
          <TechFlow plan={plan} set={set} />
          <Combo options={techOptions} placeholder={t('addTech')} onPick={(v) => setS({ techPath: [...s.techPath, v] })} />
          <Suggestions items={techSuggest.map((x) => ({ ...x, key: `tech:${x.key}` }))} onAdd={(k) => setS({ techPath: [...s.techPath, k.slice(5)] })} empty={!plan.factionId && !plan.archetypeId} />
        </section>
      </div>
    </div>
  )
}

function TrackerTab({ plan, set }: { plan: Plan; set: Setter }) {
  const { t } = useI18n()
  const tr = plan.tracker
  const setT = (patch: Partial<Plan['tracker']>) => set((p) => ({ ...p, tracker: { ...p.tracker, ...patch } }))
  const totals = planetTotals(plan)
  const f = plan.factionId ? F.factionById.get(plan.factionId) : null

  const { exp, keyOk } = useExpansions()
  const relicOptions = useMemo<ComboOption[]>(
    () => F.relics.filter((r) => !tr.relics.includes(r.id)).map((r) => ({ value: r.id, label: r.name })),
    [tr.relics],
  )
  const techOptions = useMemo<ComboOption[]>(
    () =>
      F.techs
        .filter((x) => (!x.faction || x.faction === plan.factionId) && !tr.techs.includes(x.id) && keyOk(`tech:${x.id}`))
        .map((x) => ({ value: x.id, label: x.name, hint: <TechColorTag type={x.types[0]} /> })),
    [plan.factionId, tr.techs, keyOk],
  )

  const leaderCycle: Record<'agent' | 'commander' | 'hero', LeaderState[]> = {
    agent: ['ready', 'exhausted'],
    commander: ['locked', 'unlocked'],
    hero: ['locked', 'unlocked', 'purged'],
  }

  return (
    <div className="stack">
      <p className="faint" style={{ margin: 0 }}>
        {t('trackerHint')}
      </p>
      <section className="panel">
        <div className="row">
          <div className="grow">
            <Counter big label={t('victoryPoints')} value={tr.vp} max={tr.vpGoal + 4} onChange={(v) => setT({ vp: v })} />
          </div>
          <div style={{ minWidth: 150 }}>
            <Counter label={t('round')} value={tr.round} min={1} onChange={(v) => setT({ round: v })} />
          </div>
          <div className="seg" title={t('vpGoal')}>
            {(exp.pok ? [10, 14] : [10]).map((g) => (
              <button key={g} className={tr.vpGoal === g ? 'on' : ''} onClick={() => setT({ vpGoal: g })}>
                {g} {t('points')}
              </button>
            ))}
          </div>
        </div>
        <div className="vp-track" style={{ ['--n' as string]: tr.vpGoal + 1 }}>
          {Array.from({ length: tr.vpGoal + 1 }, (_, i) => (
            <button key={i} className={i <= tr.vp && i > 0 ? 'on' : ''} onClick={() => setT({ vp: i })}>
              {i}
            </button>
          ))}
        </div>
      </section>

      <div className="cols-2">
        <section className="panel">
          <div className="panel-title">
            <Term to="command-tokens">{t('commandTokens')}</Term>
          </div>
          <div className="stack" style={{ gap: 6 }}>
            <Counter label={<Term to="tactic-pool">{t('tactic')}</Term>} value={tr.tokens.tactic} max={16} onChange={(v) => setT({ tokens: { ...tr.tokens, tactic: v } })} />
            <Counter label={<Term to="fleet-pool">{t('fleet')}</Term>} value={tr.tokens.fleet} max={16} onChange={(v) => setT({ tokens: { ...tr.tokens, fleet: v } })} />
            <Counter label={<Term to="strategy-pool">{t('strategy')}</Term>} value={tr.tokens.strategy} max={16} onChange={(v) => setT({ tokens: { ...tr.tokens, strategy: v } })} />
          </div>
        </section>

        <section className="panel">
          <div className="panel-title">{t('resources')} &amp; {t('influence')}</div>
          <div className="stats" style={{ marginBottom: 8 }}>
            <div className="stat">
              <div className="k">{t('resources')}</div>
              <div className="v" style={{ color: 'var(--gold)' }}>
                {totals.readyRes}
                <span className="faint"> / {totals.res}</span>
              </div>
            </div>
            <div className="stat">
              <div className="k">{t('influence')}</div>
              <div className="v" style={{ color: 'var(--accent)' }}>
                {totals.readyInf}
                <span className="faint"> / {totals.inf}</span>
              </div>
            </div>
          </div>
          <div className="stack" style={{ gap: 6 }}>
            <Counter label={<Term to="trade-goods">{t('tradeGoods')}</Term>} value={tr.tradeGoods} onChange={(v) => setT({ tradeGoods: v })} />
            <Counter
              label={
                <>
                  <Term to="commodities">{t('commodities')}</Term>
                  {f ? <span className="faint"> (max {f.commodities})</span> : null}
                </>
              }
              value={tr.commodities}
              max={f?.commodities ?? 10}
              onChange={(v) => setT({ commodities: v })}
            />
            <Counter label={<Term to="action-cards">{t('actionCards')}</Term>} value={tr.actionCards} max={30} onChange={(v) => setT({ actionCards: v })} />
          </div>
        </section>
      </div>

      {exp.pok && (
      <div className="cols-2">
        <section className="panel">
          <div className="panel-title">
            <Term to="leaders">{t('leadersStatus')}</Term>
          </div>
          <div className="stack" style={{ gap: 6 }}>
            {(['agent', 'commander', 'hero'] as const).map((k) => (
              <div className="counter" key={k}>
                <span className="label">{t(k)}</span>
                <div className="seg">
                  {leaderCycle[k].map((st) => (
                    <button key={st} className={tr.leaders[k] === st ? 'on' : ''} onClick={() => setT({ leaders: { ...tr.leaders, [k]: st } })}>
                      {t(st === 'ready' ? 'ready' : st)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-title">{t('relics')}</div>
          <div className="pill-list" style={{ marginBottom: 8 }}>
            {tr.relics.map((r) => (
              <div className="pill" key={r}>
                <span className="grow">
                  <Term to={`relic:${r}`} />
                </span>
                <button className="btn ghost icon sm" aria-label={t('remove')} onClick={() => setT({ relics: tr.relics.filter((x) => x !== r) })}>
                  <Icon name="x" />
                </button>
              </div>
            ))}
          </div>
          <Combo options={relicOptions} placeholder={t('addRelic')} onPick={(v) => setT({ relics: [...tr.relics, v] })} />
        </section>
      </div>
      )}

      <section className="panel">
        <div className="panel-title">
          <span className="grow">{t('ownedTechs')}</span>
          <span className="faint">{tr.techs.length}</span>
        </div>
        <div className="row" style={{ marginBottom: 8 }}>
          {tr.techs.map((x) => {
            const tech = F.techById.get(x)
            return (
              <span key={x} className="pill" style={{ padding: '2px 4px 2px 8px' }}>
                {tech && <span className={`dot ${tech.types[0]}`} />}
                <Term to={`tech:${x}`} />
                <button className="btn ghost icon sm" aria-label={t('remove')} onClick={() => setT({ techs: tr.techs.filter((y) => y !== x) })}>
                  <Icon name="x" />
                </button>
              </span>
            )
          })}
        </div>
        <TechColorSummary techs={tr.techs} />
        <Combo options={techOptions} placeholder={t('addTech')} onPick={(v) => setT({ techs: [...tr.techs, v] })} />
      </section>

      <section className="panel">
        <div className="panel-title">{t('scoredObjectives')}</div>
        <div className="row">
          {tr.scored.length === 0 && <span className="faint">—</span>}
          {tr.scored.map((k) => (
            <span key={k} className="pill" style={{ padding: '2px 4px 2px 8px' }}>
              <Term to={k} />
              <span className="tag gold">{(wikiByKey.get(k)?.fact as { points?: number })?.points ?? 1}</span>
              <button className="btn ghost icon sm" aria-label={t('remove')} onClick={() => setT({ scored: tr.scored.filter((x) => x !== k) })}>
                <Icon name="x" />
              </button>
            </span>
          ))}
        </div>
        <div style={{ marginTop: 8 }}>
          <Combo
            options={[
              ...F.publicObjectives.map((o) => ({ value: `public:${o.id}`, label: o.name, hint: <span className="tag gold">{o.points}</span> })),
              ...F.secretObjectives.map((o) => ({ value: `secret:${o.id}`, label: o.name, hint: <span className="tag">S</span> })),
            ].filter((o) => !tr.scored.includes(o.value) && keyOk(o.value))}
            placeholder={t('addObjective')}
            onPick={(v) => {
              const pts = (wikiByKey.get(v)?.fact as { points?: number })?.points ?? 1
              setT({ scored: [...tr.scored, v], vp: tr.vp + pts })
            }}
          />
        </div>
      </section>

      <div className="row">
        <button
          className="btn"
          onClick={() =>
            set((p) => ({
              ...p,
              tracker: {
                ...p.tracker,
                round: p.tracker.round + 1,
                planets: p.tracker.planets.map((x) => ({ ...x, exhausted: false })),
                leaders: { ...p.tracker.leaders, agent: p.tracker.leaders.agent === 'exhausted' ? 'ready' : p.tracker.leaders.agent },
                actionCards: p.tracker.actionCards + 1,
              },
            }))
          }
        >
          <Icon name="refresh" /> {t('newRound')}
        </button>
        <span className="faint">
          {t('readyAll')} · {t('agent')} {t('ready').toLowerCase()} · +1 {t('actionCards').toLowerCase()}
        </span>
      </div>
    </div>
  )
}

function TechColorSummary({ techs }: { techs: string[] }) {
  const counts: Record<string, number> = {}
  for (const id of techs) {
    const x = F.techById.get(id)
    if (x) counts[x.types[0]] = (counts[x.types[0]] ?? 0) + 1
  }
  const order = ['biotic', 'propulsion', 'cybernetic', 'warfare', 'unitupgrade']
  return (
    <div className="row" style={{ marginBottom: 8 }}>
      {order.map((k) => (
        <span key={k} className={`tag t-${k}`}>
          {counts[k] ?? 0}
        </span>
      ))}
    </div>
  )
}

function planetTotals(plan: Plan) {
  let res = 0,
    inf = 0,
    readyRes = 0,
    readyInf = 0
  for (const op of plan.tracker.planets) {
    const p = F.planetById.get(op.id)
    if (!p) continue
    res += p.res
    inf += p.inf
    if (!op.exhausted) {
      readyRes += p.res
      readyInf += p.inf
    }
  }
  return { res, inf, readyRes, readyInf }
}

function PlanetsTab({ plan, set }: { plan: Plan; set: Setter }) {
  const { t } = useI18n()
  const tr = plan.tracker
  const setPlanets = (planets: Plan['tracker']['planets']) => set((p) => ({ ...p, tracker: { ...p.tracker, planets } }))
  const totals = planetTotals(plan)
  const owned = new Set(tr.planets.map((p) => p.id))
  const { keyOk } = useExpansions()
  const options = useMemo<ComboOption[]>(
    () =>
      F.planets
        .filter((p) => !owned.has(p.id) && keyOk(`planet:${p.id}`))
        .map((p) => ({
          value: p.id,
          label: p.name,
          search: `${p.trait} ${p.home ?? ''}`,
          hint: <PlanetValues p={p} />,
        })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tr.planets, keyOk],
  )
  const traitCount = (tr.planets.map((x) => F.planetById.get(x.id)?.trait).filter(Boolean) as string[]).reduce<Record<string, number>>(
    (a, k) => ((a[k] = (a[k] ?? 0) + 1), a),
    {},
  )
  const skipCount = tr.planets.reduce<Record<string, number>>((a, x) => {
    for (const s of F.planetById.get(x.id)?.skip ?? []) a[s] = (a[s] ?? 0) + 1
    return a
  }, {})

  return (
    <div className="stack">
      <section className="panel">
        <div className="stats">
          <div className="stat">
            <div className="k">{t('resources')}</div>
            <div className="v" style={{ color: 'var(--gold)' }}>{totals.readyRes}</div>
          </div>
          <div className="stat">
            <div className="k">{t('influence')}</div>
            <div className="v" style={{ color: 'var(--accent)' }}>{totals.readyInf}</div>
          </div>
          <div className="stat">
            <div className="k">{t('totalTotals')}</div>
            <div className="v" style={{ fontSize: 16 }}>
              {totals.res} / {totals.inf}
            </div>
          </div>
          <div className="stat">
            <div className="k">{t('planets')}</div>
            <div className="v">{tr.planets.length}</div>
          </div>
        </div>
        <div className="row" style={{ marginTop: 8 }}>
          {Object.entries(traitCount)
            .filter(([k]) => ['cultural', 'hazardous', 'industrial'].includes(k))
            .map(([k, n]) => (
              <span key={k} className="tag">
                {k} {n}
              </span>
            ))}
          {Object.entries(skipCount).map(([k, n]) => (
            <span key={k} className={`tag t-${k}`}>
              <span className={`dot ${k}`} /> {n}
            </span>
          ))}
        </div>
      </section>

      <section className="panel" style={{ padding: 0, overflow: 'visible' }}>
        <div style={{ padding: 12 }}>
          <Combo options={options} placeholder={t('addPlanet')} onPick={(v) => setPlanets([...tr.planets, { id: v, exhausted: false }])} />
        </div>
        <div>
          {tr.planets.map((op) => {
            const p = F.planetById.get(op.id)
            if (!p) return null
            return (
              <div key={op.id} className={`planet-row${op.exhausted ? ' ex' : ''}`}>
                <div className="pname" style={{ minWidth: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <PlanetArt p={p} size={30} detail={false} />
                  <Term to={`planet:${p.id}`} />{' '}
                  {p.skip.map((s) => (
                    <span key={s} className={`dot ${s}`} />
                  ))}
                  {['cultural', 'hazardous', 'industrial'].includes(p.trait) && <span className="faint"> · {p.trait}</span>}
                </div>
                <PlanetValues p={p} />
                <button
                  className="btn sm"
                  onClick={() => setPlanets(tr.planets.map((x) => (x.id === op.id ? { ...x, exhausted: !x.exhausted } : x)))}
                >
                  {op.exhausted ? t('ready_verb') : t('exhaust')}
                </button>
                <button className="btn ghost icon sm" aria-label={t('remove')} onClick={() => setPlanets(tr.planets.filter((x) => x.id !== op.id))}>
                  <Icon name="x" />
                </button>
              </div>
            )
          })}
        </div>
        {tr.planets.some((x) => x.exhausted) && (
          <div style={{ padding: 12 }}>
            <button className="btn sm" onClick={() => setPlanets(tr.planets.map((x) => ({ ...x, exhausted: false })))}>
              <Icon name="refresh" /> {t('readyAll')}
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

// ---------------------------------------------------------------- suggestions

function Suggestions({ items, onAdd, empty }: { items: { key: string; why: L[] }[]; onAdd: (key: string) => void; empty?: boolean }) {
  const { l, lang } = useI18n()
  if (empty)
    return (
      <p className="faint" style={{ margin: '8px 0 0' }}>
        {lang === 'fr' ? 'Choisissez une faction ou un type de plan pour obtenir des suggestions.' : 'Pick a faction or a plan type to get suggestions.'}
      </p>
    )
  if (!items.length) return null
  return (
    <div style={{ marginTop: 10 }}>
      <div className="faint" style={{ marginBottom: 6, fontSize: 12 }}>
        {lang === 'fr' ? 'Suggestions' : 'Suggested'}
      </div>
      <div className="suggest">
        {items.map((s) => {
          const e = wikiByKey.get(s.key)
          return (
            <button key={s.key} onClick={() => onAdd(s.key)} title={s.why.map(l).join(' · ')}>
              <Icon name="plus" size={12} />
              {e ? l(e.title) : s.key}
              <span className="why">{l(s.why[0])}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const COLOR_NAME: Record<string, L> = {
  biotic: { en: 'biotic', fr: 'biotique' },
  propulsion: { en: 'propulsion', fr: 'propulsion' },
  cybernetic: { en: 'cybernetic', fr: 'cybernétique' },
  warfare: { en: 'warfare', fr: 'guerre' },
}

/** The planned tech path: a compact vertical stack joined by arrows, with prerequisite checks. */
function TechFlow({ plan, set }: { plan: Plan; set: Setter }) {
  const { t, l, lang } = useI18n()
  const path = plan.strategy.techPath
  const status = techPathStatus(plan)
  const setPath = (techPath: string[]) => set((p) => ({ ...p, strategy: { ...p.strategy, techPath } }))
  const move = (i: number, d: number) => {
    const j = i + d
    if (j < 0 || j >= path.length) return
    const next = [...path]
    ;[next[i], next[j]] = [next[j], next[i]]
    setPath(next)
  }
  if (!path.length) return <p className="faint" style={{ marginTop: 0 }}>{lang === 'fr' ? 'Aucune technologie prévue.' : 'No technologies planned yet.'}</p>
  return (
    <ol className="tech-stack">
      {path.map((k, i) => {
        const tech = F.techById.get(k)
        const st = status.get(k)
        const owned = plan.tracker.techs.includes(k)
        const label =
          st?.state === 'owned'
            ? lang === 'fr' ? 'Acquise' : 'Owned'
            : st?.state === 'ok'
              ? lang === 'fr' ? 'Prête' : 'Ready'
              : st?.state === 'skip'
                ? lang === 'fr' ? 'Avec spécialité' : 'Needs a skip'
                : `${lang === 'fr' ? 'Manque' : 'Needs'} ${Object.entries(st?.missing ?? {})
                    .map(([c, n]) => `${n} ${l(COLOR_NAME[c])}`)
                    .join(', ')}`
        return (
          <li key={k} className={`ts-item ${st?.state ?? ''}`}>
            {i > 0 && <span className={`ts-arrow${st?.state === 'blocked' ? ' warn' : ''}`} aria-hidden="true" />}
            <div className="ts-row">
              {tech && <TechArt tech={tech} size={34} />}
              <div className="ts-main">
                <div className="ts-name">
                  <span className="faint">{i + 1}.</span> <Term to={`tech:${k}`} />
                </div>
                <div className={`ts-status ${st?.state === 'blocked' ? 'bad' : st?.state === 'skip' ? 'skip' : st?.state === 'owned' ? 'own' : 'ok'}`}>{label}</div>
              </div>
              <div className="ts-ctl">
                <button
                  className={`btn icon sm${owned ? ' primary' : ' ghost'}`}
                  title={t('ownedTechs')}
                  aria-label={t('ownedTechs')}
                  aria-pressed={owned}
                  onClick={() =>
                    set((p) => ({
                      ...p,
                      tracker: { ...p.tracker, techs: owned ? p.tracker.techs.filter((x) => x !== k) : [...p.tracker.techs, k] },
                    }))
                  }
                >
                  <Icon name="check" size={13} />
                </button>
                <button className="btn ghost icon sm" aria-label="↑" disabled={i === 0} onClick={() => move(i, -1)}>
                  <Icon name="chevron" size={13} />
                </button>
                <button className="btn ghost icon sm" aria-label={t('remove')} onClick={() => setPath(path.filter((x) => x !== k))}>
                  <Icon name="x" size={13} />
                </button>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

// ---------------------------------------------------------------- table (opponents)

const plainBullets = (s: string) =>
  s
    .split('\n')
    .filter((x) => x.startsWith('- '))
    .map((x) => x.slice(2).replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2').replace(/\[\[(?:[a-z]+:)?([^\]]+)\]\]/g, (_, y: string) => y.replace(/-/g, ' ')))

function TableTab({ plan, set }: { plan: Plan; set: Setter }) {
  const { t, l, lang } = useI18n()
  const { factionOk } = useExpansions()
  const [newWatch, setNewWatch] = useState('')
  const [sel, setSel] = useState<string>('me')
  const opps = plan.opponents
  const setOpps = (opponents: Plan['opponents']) => set((p) => ({ ...p, opponents }))
  const patch = (id: string, x: Partial<Plan['opponents'][number]>) => setOpps(opps.map((o) => (o.id === id ? { ...o, ...x } : o)))
  const watch = plan.strategy.watchFor
  const setWatch = (watchFor: Plan['strategy']['watchFor']) => set((p) => ({ ...p, strategy: { ...p.strategy, watchFor } }))
  const short = (id: string | null) => (id ? F.factionById.get(id)?.name.replace(/^The /, '') ?? id : '')
  const goal = plan.tracker.vpGoal
  const colorOf = (fid: string | null) => (fid && factionGuides[fid]?.color) || 'var(--line-strong)'

  // Seats clockwise, starting with you at the bottom.
  const seats = [
    { id: 'me', name: lang === 'fr' ? 'Moi' : 'Me', factionId: plan.factionId, vp: plan.tracker.vp },
    ...opps.map((o) => ({ id: o.id, name: o.name || short(o.factionId) || '?', factionId: o.factionId, vp: o.vp })),
  ]
  const n = seats.length
  const neighbours = n > 2 ? new Set([seats[1].id, seats[n - 1].id]) : new Set(seats.slice(1).map((x) => x.id))
  const leaderVp = Math.max(...seats.map((x) => x.vp))
  const selected = opps.find((o) => o.id === sel)
  const selIndex = opps.findIndex((o) => o.id === sel)

  const addPlayer = () => {
    const o = { id: uid(), name: '', factionId: null, vp: 0, notes: '' }
    setOpps([...opps, o])
    setSel(o.id)
  }
  const moveSeat = (d: number) => {
    const j = selIndex + d
    if (selIndex < 0 || j < 0 || j >= opps.length) return
    const next = [...opps]
    ;[next[selIndex], next[j]] = [next[j], next[selIndex]]
    setOpps(next)
  }

  const watchSuggest = opps
    .filter((o) => o.factionId && opponentTips[o.factionId])
    .flatMap((o) => plainBullets(opponentTips[o.factionId!][lang]).map((txt) => `${o.name || short(o.factionId)}: ${txt}`))
    .filter((txt) => !watch.some((w) => w.text === txt))
    .slice(0, 4)

  return (
    <div className="stack">
      <div className="table-wrap">
        <div className="game-table" style={{ ['--n' as string]: n }}>
          <div className="felt">
            <div className="felt-inner">
              <div className="eyebrow">
                {t('round')} {plan.tracker.round}
              </div>
              <div className="felt-goal">
                {goal} {t('points')}
              </div>
              <button className="btn sm" disabled={opps.length >= 7} onClick={addPlayer}>
                <Icon name="plus" /> {lang === 'fr' ? 'Joueur' : 'Player'}
              </button>
            </div>
          </div>
          {seats.map((x, i) => {
            // seat 0 at the bottom, then clockwise
            const a = Math.PI / 2 + (2 * Math.PI * i) / n
            const left = 50 + 41 * Math.cos(a)
            const top = 50 + 41 * Math.sin(a)
            const lead = x.vp === leaderVp && x.vp > 0
            return (
              <button
                key={x.id}
                className={`seat${sel === x.id ? ' on' : ''}${x.id === 'me' ? ' me' : ''}`}
                style={{ left: `${left}%`, top: `${top}%`, ['--fc' as string]: colorOf(x.factionId) }}
                onClick={() => setSel(x.id)}
                aria-pressed={sel === x.id}
              >
                {x.factionId ? (
                  <FactionSigil id={x.factionId} color={factionGuides[x.factionId]?.color} size={34} />
                ) : (
                  <span className="seat-empty">?</span>
                )}
                <span className="seat-name">{x.name}</span>
                <span className={`seat-vp${lead ? ' lead' : ''}`}>{x.vp}</span>
                {x.id !== 'me' && neighbours.has(x.id) && <span className="seat-tag">{lang === 'fr' ? 'voisin' : 'neighbour'}</span>}
              </button>
            )
          })}
        </div>
      </div>

      {sel === 'me' || !selected ? (
        <section className="panel seat-detail" style={{ ['--fc' as string]: colorOf(plan.factionId) }}>
          <div className="row">
            <strong className="grow">{lang === 'fr' ? 'Votre place' : 'Your seat'}</strong>
            <span className="mini-counter" title={t('victoryPoints')}>
              <button className="btn icon sm" aria-label="−" onClick={() => set((p) => ({ ...p, tracker: { ...p.tracker, vp: Math.max(0, p.tracker.vp - 1) } }))}>
                <Icon name="minus" />
              </button>
              <span className="val">{plan.tracker.vp}</span>
              <button className="btn icon sm" aria-label="+" onClick={() => set((p) => ({ ...p, tracker: { ...p.tracker, vp: p.tracker.vp + 1 } }))}>
                <Icon name="plus" />
              </button>
            </span>
          </div>
          <p className="faint" style={{ margin: '6px 0 0' }}>
            {opps.length === 0
              ? lang === 'fr'
                ? 'Ajoutez les autres joueurs dans l’ordre où ils sont assis, puis touchez une place pour voir ce qu’il faut surveiller.'
                : 'Add the other players in seating order, then tap a seat to see what to look out for.'
              : lang === 'fr'
                ? 'Touchez une place pour voir le joueur. Vos voisins sont ceux assis à côté de vous.'
                : 'Tap a seat to see that player. Your neighbours are the seats next to yours.'}
          </p>
        </section>
      ) : (
        <section className="panel seat-detail" style={{ ['--fc' as string]: colorOf(selected.factionId) }}>
          <div className="seat-form">
            <input className="input" placeholder={lang === 'fr' ? 'Nom du joueur' : 'Player name'} value={selected.name} onChange={(e) => patch(selected.id, { name: e.target.value })} />
            <select className="select" value={selected.factionId ?? ''} onChange={(e) => patch(selected.id, { factionId: e.target.value || null })}>
              <option value="">{t('chooseFaction')}</option>
              {[...F.factions]
                .filter((f) => factionOk(f.id) || f.id === selected.factionId)
                .sort((a, b) => short(a.id).localeCompare(short(b.id)))
                .map((f) => (
                  <option key={f.id} value={f.id}>
                    {short(f.id)}
                  </option>
                ))}
            </select>
            <span className="mini-counter" title={t('victoryPoints')}>
              <button className="btn icon sm" aria-label="−" onClick={() => patch(selected.id, { vp: Math.max(0, selected.vp - 1) })}>
                <Icon name="minus" />
              </button>
              <span className="val">{selected.vp}</span>
              <button className="btn icon sm" aria-label="+" onClick={() => patch(selected.id, { vp: Math.min(goal + 4, selected.vp + 1) })}>
                <Icon name="plus" />
              </button>
            </span>
          </div>
          <div className="row" style={{ marginTop: 8 }}>
            <button className="btn sm ghost" disabled={selIndex <= 0} onClick={() => moveSeat(-1)} title={lang === 'fr' ? 'Place précédente' : 'Previous seat'}>
              <Icon name="back" size={13} /> {lang === 'fr' ? 'Place' : 'Seat'}
            </button>
            <button className="btn sm ghost" disabled={selIndex >= opps.length - 1} onClick={() => moveSeat(1)} title={lang === 'fr' ? 'Place suivante' : 'Next seat'}>
              {lang === 'fr' ? 'Place' : 'Seat'} <Icon name="chevron" size={13} />
            </button>
            <div className="grow" />
            <button
              className="btn sm ghost danger"
              onClick={() => {
                setOpps(opps.filter((x) => x.id !== selected.id))
                setSel('me')
              }}
            >
              <Icon name="trash" size={13} /> {t('remove')}
            </button>
          </div>
          {selected.factionId && opponentTips[selected.factionId] && (
            <details className="seat-tips" open>
              <summary>
                {lang === 'fr' ? 'À surveiller' : 'Look out for'} · {short(selected.factionId)}
              </summary>
              <RichText text={l(opponentTips[selected.factionId])} />
            </details>
          )}
          <textarea
            className="textarea"
            style={{ minHeight: 40, marginTop: 8 }}
            placeholder={lang === 'fr' ? 'Notes : alliances, menaces, promesses…' : 'Notes: deals, threats, promises…'}
            value={selected.notes}
            onChange={(e) => patch(selected.id, { notes: e.target.value })}
          />
        </section>
      )}

      <section className="panel">
        <div className="panel-title">
          <span className="grow">{lang === 'fr' ? 'Points de vigilance' : 'Things to look out for'}</span>
          <span className="faint">
            {watch.filter((x) => x.done).length}/{watch.length}
          </span>
        </div>
        {watch.map((w) => (
          <div key={w.id} className={`check${w.done ? ' done' : ''}`}>
            <input type="checkbox" checked={w.done} onChange={() => setWatch(watch.map((x) => (x.id === w.id ? { ...x, done: !x.done } : x)))} />
            <input
              className="input txt"
              style={{ border: 0, background: 'transparent', padding: 0, height: 26 }}
              value={w.text}
              onChange={(e) => setWatch(watch.map((x) => (x.id === w.id ? { ...x, text: e.target.value } : x)))}
            />
            <button className="btn ghost icon sm" aria-label={t('remove')} onClick={() => setWatch(watch.filter((x) => x.id !== w.id))}>
              <Icon name="x" />
            </button>
          </div>
        ))}
        <form
          className="row"
          style={{ marginTop: 6 }}
          onSubmit={(e) => {
            e.preventDefault()
            if (!newWatch.trim()) return
            setWatch([...watch, { id: uid(), text: newWatch.trim(), done: false }])
            setNewWatch('')
          }}
        >
          <input
            className="input grow"
            placeholder={lang === 'fr' ? 'Ex. : Mentak à côté — garder peu de biens commerciaux' : 'e.g. Mentak next door — keep trade goods low'}
            value={newWatch}
            onChange={(e) => setNewWatch(e.target.value)}
          />
          <button className="btn icon" aria-label="+">
            <Icon name="plus" />
          </button>
        </form>
        {watchSuggest.length > 0 && (
          <div className="suggest" style={{ marginTop: 8 }}>
            {watchSuggest.map((txt) => (
              <button key={txt} onClick={() => setWatch([...watch, { id: uid(), text: txt, done: false }])}>
                <Icon name="plus" size={12} />
                {txt}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
