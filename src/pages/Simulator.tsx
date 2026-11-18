import { useEffect, useMemo, useState } from 'react'
import { useI18n } from '../i18n/i18n'
import { useExpansions } from '../lib/expansions'
import { FACTION_MODS, GROUND_TYPES, SHIP_TYPES, UPGRADABLE, simulate, unitFor, type Mode, type SideInput, type SimResult, type UnitType } from '../lib/combat'
import * as F from '../wiki/facts'
import { factionGuides } from '../content/factions'
import { Term } from '../components/Term'
import { Icon } from '../components/Icon'
import { Dice, FactionSigil } from '../components/Illustrations'

const TYPE_L: Record<UnitType, { en: string; fr: string }> = {
  fighter: { en: 'Fighter', fr: 'Chasseur' },
  destroyer: { en: 'Destroyer', fr: 'Destroyer' },
  cruiser: { en: 'Cruiser', fr: 'Croiseur' },
  carrier: { en: 'Carrier', fr: 'Porte-vaisseaux' },
  dreadnought: { en: 'Dreadnought', fr: 'Cuirassé' },
  flagship: { en: 'Flagship', fr: 'Vaisseau amiral' },
  warsun: { en: 'War sun', fr: 'Soleil de guerre' },
  infantry: { en: 'Infantry', fr: 'Infanterie' },
  mech: { en: 'Mech', fr: 'Méca' },
  pds: { en: 'PDS', fr: 'SDP' },
}

const emptySide = (): SideInput => ({ factionId: null, counts: {}, upgrades: {}, mod: 0 })

function MiniCounter({ value, onChange, min = 0, max = 30 }: { value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <span className="mini-counter">
      <button className="btn icon sm" aria-label="−" onClick={() => onChange(Math.max(min, value - 1))}>
        <Icon name="minus" />
      </button>
      <span className="val">{value}</span>
      <button className="btn icon sm" aria-label="+" onClick={() => onChange(Math.min(max, value + 1))}>
        <Icon name="plus" />
      </button>
    </span>
  )
}

function statLine(u: F.UnitFact | undefined, fr: boolean) {
  if (!u) return ''
  const parts: string[] = []
  if (u.combat) parts.push(`${fr ? 'Combat' : 'Combat'} ${u.combat}${(u.combatDice ?? 1) > 1 ? `×${u.combatDice}` : ''}`)
  if (u.sustain) parts.push('SD')
  if (u.afb) parts.push(`AFB ${u.afb}×${u.afbDice}`)
  if (u.bombard) parts.push(`B ${u.bombard}${(u.bombardDice ?? 1) > 1 ? `×${u.bombardDice}` : ''}`)
  if (u.spaceCannon) parts.push(`SC ${u.spaceCannon}${(u.spaceCannonDice ?? 1) > 1 ? `×${u.spaceCannonDice}` : ''}`)
  return parts.join(' · ')
}

function Side({ title, color, side, set, types, mode, role }: { title: string; color: string; side: SideInput; set: (s: SideInput) => void; types: UnitType[]; mode: Mode; role: 'att' | 'def' }) {
  const { l, lang } = useI18n()
  const { factionOk } = useExpansions()
  const fm = side.factionId ? FACTION_MODS[side.factionId] : undefined
  const groupLabel = (t: UnitType) =>
    SHIP_TYPES.includes(t)
      ? mode === 'ground'
        ? lang === 'fr'
          ? 'Vaisseaux en orbite (bombardement)'
          : 'Ships in orbit (bombardment)'
        : lang === 'fr'
          ? 'Vaisseaux'
          : 'Ships'
      : t === 'pds'
        ? role === 'def'
          ? lang === 'fr'
            ? 'Défenses planétaires'
            : 'Planetary defences'
          : lang === 'fr'
            ? 'SDP à portée'
            : 'PDS in range'
        : lang === 'fr'
          ? 'Forces terrestres'
          : 'Ground forces'
  let last = ''
  return (
    <section className="panel sim-side" style={{ ['--sc' as string]: color }}>
      <div className="row" style={{ marginBottom: 8 }}>
        {side.factionId ? <FactionSigil id={side.factionId} color={factionGuides[side.factionId]?.color} size={28} /> : null}
        <h3 className="grow" style={{ margin: 0, color }}>
          {title}
        </h3>
        <select className="select" style={{ maxWidth: 190 }} value={side.factionId ?? ''} onChange={(e) => set({ ...side, factionId: e.target.value || null })}>
          <option value="">{lang === 'fr' ? 'Unités génériques' : 'Generic units'}</option>
          {F.factions
            .filter((f) => factionOk(f.id))
            .sort((a, b) => a.name.replace(/^The /, '').localeCompare(b.name.replace(/^The /, '')))
            .map((f) => (
              <option key={f.id} value={f.id}>
                {f.name.replace(/^The /, '')}
              </option>
            ))}
        </select>
      </div>
      {types.map((t) => {
        const u = unitFor(t, side.factionId, !!side.upgrades[t])
        const base = unitFor(t, side.factionId, false)
        const canUp = UPGRADABLE.includes(t) && !!base?.upgradesTo
        const g = groupLabel(t)
        const head = g !== last
        last = g
        return (
          <div key={t}>
            {head && <div className="group-title" style={{ marginTop: 8 }}>{g}</div>}
            <div className="unit-row">
              <div style={{ minWidth: 0 }}>
                <div className="un">{u ? <Term to={`unit:${u.id}`}>{u.faction ? u.name : l(TYPE_L[t])}</Term> : l(TYPE_L[t])}</div>
                <div className="us">{statLine(u, lang === 'fr')}</div>
              </div>
              {canUp ? (
                <button className={`btn up${side.upgrades[t] ? ' on' : ''}`} onClick={() => set({ ...side, upgrades: { ...side.upgrades, [t]: !side.upgrades[t] } })} title={lang === 'fr' ? 'Amélioration II' : 'Upgrade II'}>
                  II
                </button>
              ) : (
                <span />
              )}
              <MiniCounter value={side.counts[t] ?? 0} max={t === 'flagship' ? 1 : t === 'warsun' ? 2 : t === 'mech' ? 4 : t === 'pds' ? 6 : 30} onChange={(v) => set({ ...side, counts: { ...side.counts, [t]: v } })} />
            </div>
          </div>
        )
      })}
      <div className="unit-row" style={{ marginTop: 8 }}>
        <div>
          <div className="un">{lang === 'fr' ? 'Modificateur de combat' : 'Combat modifier'}</div>
          <div className="us">{lang === 'fr' ? 'Cartes action, capacités…' : 'Action cards, abilities…'}</div>
        </div>
        <span />
        <MiniCounter value={side.mod} min={-3} max={3} onChange={(v) => set({ ...side, mod: v })} />
      </div>
      {fm && <p className="faint" style={{ margin: '6px 0 0' }}>✓ {l(fm.note)}</p>}
    </section>
  )
}

const pct = (x: number) => `${(x * 100).toFixed(x > 0 && x < 0.01 ? 1 : 0)}%`

export default function Simulator() {
  const { l, lang } = useI18n()
  const { exp } = useExpansions()
  const [mode, setMode] = useState<Mode>('space')
  const [att, setAtt] = useState<SideInput>(() => ({ ...emptySide(), counts: { dreadnought: 2, carrier: 1, fighter: 3, infantry: 4 } }))
  const [def, setDef] = useState<SideInput>(() => ({ ...emptySide(), counts: { cruiser: 2, destroyer: 2, fighter: 2, infantry: 3, pds: 1 } }))
  const [res, setRes] = useState<SimResult | null>(null)
  const [busy, setBusy] = useState(false)

  const ships = SHIP_TYPES
  const ground = GROUND_TYPES.filter((t) => t !== 'mech' || exp.pok)
  const typesFor = (role: 'att' | 'def'): UnitType[] =>
    mode === 'space' ? [...ships, 'pds'] : mode === 'ground' ? (role === 'att' ? [...ships, ...ground] : [...ground, 'pds']) : role === 'att' ? [...ships, ...ground] : [...ships, ...ground, 'pds']

  // Only count units relevant to the current mode.
  const scoped = (s: SideInput, role: 'att' | 'def'): SideInput => {
    const allowed = typesFor(role)
    return { ...s, counts: Object.fromEntries(Object.entries(s.counts).filter(([k]) => allowed.includes(k as UnitType))) }
  }
  const key = JSON.stringify([mode, scoped(att, 'att'), scoped(def, 'def')])

  useEffect(() => {
    setBusy(true)
    const id = window.setTimeout(() => {
      setRes(simulate(mode, scoped(att, 'att'), scoped(def, 'def'), 6000))
      setBusy(false)
    }, 120)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const dice = useMemo(() => [2 + Math.floor(Math.random() * 8), 1 + Math.floor(Math.random() * 10), 3 + Math.floor(Math.random() * 8)], [key])
  const empty = (m: Partial<Record<UnitType, number>>) => !Object.values(m).some((v) => v && v >= 0.05)
  const surv = (m: Partial<Record<UnitType, number>>) => (
    <div className="surv">
      {empty(m) && <span className="faint">—</span>}
      {Object.entries(m)
        .filter(([, v]) => (v as number) >= 0.05)
        .map(([k, v]) => (
          <span key={k} className="tag">
            {(v as number).toFixed(1)} × {l(TYPE_L[k as UnitType])}
          </span>
        ))}
    </div>
  )

  return (
    <div className="stack">
      <div className="page-head">
        <div>
          <div className="eyebrow">{lang === 'fr' ? 'Outils' : 'Tools'}</div>
          <h1>{lang === 'fr' ? 'Simulateur de combat' : 'Combat simulator'}</h1>
        </div>
        <div className="grow" />
        <div className="seg">
          {(['space', 'ground', 'invasion'] as Mode[]).map((m) => (
            <button key={m} className={mode === m ? 'on' : ''} onClick={() => setMode(m)}>
              {m === 'space' ? (lang === 'fr' ? 'Spatial' : 'Space') : m === 'ground' ? (lang === 'fr' ? 'Terrestre' : 'Ground') : lang === 'fr' ? 'Invasion' : 'Invasion'}
            </button>
          ))}
        </div>
      </div>

      <section className="panel plated">
        <div className="row" style={{ alignItems: 'center', gap: 16 }}>
          <div style={{ width: 150, flex: 'none' }} aria-hidden="true" key={key}>
            <Dice values={dice} />
          </div>
          <div className="grow" style={{ minWidth: 220 }}>
            {res && (
              <>
                <div className="odds-bar" style={{ opacity: busy ? 0.6 : 1 }}>
                  <div className="a" style={{ flexGrow: res.attacker }}>{res.attacker > 0.08 ? pct(res.attacker) : ''}</div>
                  <div className="d" style={{ flexGrow: res.draw }}>{res.draw > 0.08 ? pct(res.draw) : ''}</div>
                  <div className="b" style={{ flexGrow: res.defender }}>{res.defender > 0.08 ? pct(res.defender) : ''}</div>
                </div>
                <div className="row" style={{ marginTop: 8, gap: 16 }}>
                  <span>
                    <strong style={{ color: 'var(--gold)' }}>{pct(res.attacker)}</strong> {lang === 'fr' ? 'victoire attaquant' : 'attacker wins'}
                  </span>
                  <span>
                    <strong>{pct(res.draw)}</strong> {lang === 'fr' ? 'égalité (tous détruits)' : 'draw (mutual wipe)'}
                  </span>
                  <span>
                    <strong style={{ color: 'var(--accent)' }}>{pct(res.defender)}</strong> {lang === 'fr' ? 'défenseur tient' : 'defender holds'}
                  </span>
                </div>
                <div className="faint" style={{ marginTop: 4 }}>
                  {res.n.toLocaleString()} {lang === 'fr' ? 'simulations' : 'simulations'} · {res.avgRounds.toFixed(1)} {lang === 'fr' ? 'rounds en moyenne' : 'rounds on average'}
                  {res.lostOnGround != null && res.lostOnGround > 0.01 && (
                    <>
                      {' '}
                      · {pct(res.lostOnGround)} {lang === 'fr' ? 'des échecs au sol' : 'fail on the ground'}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        {res && (
          <div className="cols-2" style={{ marginTop: 12 }}>
            <div>
              <div className="faint" style={{ marginBottom: 4 }}>{lang === 'fr' ? 'Survivants moyens (toutes simulations) — attaquant' : 'Average survivors (all runs) — attacker'}</div>
              {surv(res.survA)}
            </div>
            <div>
              <div className="faint" style={{ marginBottom: 4 }}>{lang === 'fr' ? 'Survivants moyens — défenseur' : 'Average survivors — defender'}</div>
              {surv(res.survD)}
            </div>
          </div>
        )}
      </section>

      <div className="row">
        <button
          className="btn sm"
          onClick={() => {
            setAtt(def)
            setDef(att)
          }}
        >
          <Icon name="refresh" /> {lang === 'fr' ? 'Inverser les camps' : 'Swap sides'}
        </button>
        <button
          className="btn sm ghost"
          onClick={() => {
            setAtt(emptySide())
            setDef(emptySide())
          }}
        >
          <Icon name="trash" /> {lang === 'fr' ? 'Vider' : 'Clear'}
        </button>
      </div>

      <div className="sim-grid">
        <Side title={lang === 'fr' ? 'Attaquant' : 'Attacker'} color="var(--gold)" side={att} set={setAtt} types={typesFor('att')} mode={mode} role="att" />
        <Side title={lang === 'fr' ? 'Défenseur' : 'Defender'} color="var(--accent)" side={def} set={setDef} types={typesFor('def')} mode={mode} role="def" />
      </div>

      <section className="panel">
        <div className="panel-title">{lang === 'fr' ? 'Ce qui est simulé' : 'What is simulated'}</div>
        <ul className="faint" style={{ margin: 0, paddingLeft: 18 }}>
          {lang === 'fr' ? (
            <>
              <li>Spatial : <Term to="space-cannon" /> (offensif, les deux camps), <Term to="anti-fighter-barrage" /> au premier round, puis rounds de combat jusqu’à ce qu’un camp n’ait plus de vaisseaux.</li>
              <li>Terrestre : <Term to="bombardment" /> (bloqué par <Term to="planetary-shield" /> sauf soleil de guerre), canon spatial défensif contre les troupes qui débarquent, puis combat terrestre.</li>
              <li>Touches : <Term to="sustain-damage" /> d’abord, puis perte des unités les moins chères (chasseurs, infanterie, destroyers…).</li>
              <li>Non simulés : capacités de faction (sauf +1 Sardakk / −1 Jol-Nar), vaisseaux amiraux spéciaux, cartes action, retraites, technologies comme Duranium Armor. Utilisez le modificateur pour approcher.</li>
            </>
          ) : (
            <>
              <li>Space: <Term to="space-cannon" /> offense (both sides), <Term to="anti-fighter-barrage" /> in round one, then combat rounds until one side has no ships.</li>
              <li>Ground: <Term to="bombardment" /> (blocked by <Term to="planetary-shield" /> unless a war sun is present), space cannon defence against landing troops, then ground combat.</li>
              <li>Hits: <Term to="sustain-damage" /> first, then the cheapest units are lost (fighters, infantry, destroyers…).</li>
              <li>Not modelled: faction abilities (except Sardakk +1 / Jol-Nar −1), special flagship effects, action cards, retreats, techs like Duranium Armor. Use the modifier to approximate.</li>
            </>
          )}
        </ul>
      </section>
    </div>
  )
}
