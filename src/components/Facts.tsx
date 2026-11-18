/** Small presentational helpers for factual data (tech colours, unit stats…). */
import type { ReactNode } from 'react'
import { useI18n } from '../i18n/i18n'
import type { TechFact, UnitFact, PlanetFact } from '../wiki/facts'
import { parseReq } from '../wiki/facts'
import { Term } from './Term'

const COLOR_L = {
  biotic: { en: 'Biotic', fr: 'Biotique' },
  propulsion: { en: 'Propulsion', fr: 'Propulsion' },
  cybernetic: { en: 'Cybernetic', fr: 'Cybernétique' },
  warfare: { en: 'Warfare', fr: 'Guerre' },
  unitupgrade: { en: 'Unit upgrade', fr: 'Amélioration d’unité' },
  none: { en: 'Faction', fr: 'Faction' },
} as const

export function TechColorTag({ type }: { type: string }) {
  const { l } = useI18n()
  const label = COLOR_L[type as keyof typeof COLOR_L] ?? COLOR_L.none
  return <span className={`tag t-${type}`}>{l(label)}</span>
}

export function Prereqs({ req }: { req: string }) {
  const { t } = useI18n()
  const p = parseReq(req)
  const keys = Object.keys(p)
  if (!keys.length) return <span className="muted">{t('none')}</span>
  return (
    <span className="row" style={{ gap: 4 }}>
      {keys.flatMap((k) => Array.from({ length: p[k] }, (_, i) => <span key={k + i} className={`dot ${k}`} title={k} />))}
    </span>
  )
}

export function TechFacts({ tech }: { tech: TechFact }) {
  const { t } = useI18n()
  return (
    <dl className="kv">
      <dt>{t('type')}</dt>
      <dd>
        <TechColorTag type={tech.types[0]} />
      </dd>
      <dt>{t('prerequisites')}</dt>
      <dd>
        <Prereqs req={tech.req} />
      </dd>
      {tech.faction && (
        <>
          <dt>{t('faction')}</dt>
          <dd>
            <Term to={`faction:${tech.faction}`} />
          </dd>
        </>
      )}
    </dl>
  )
}

function Stat({ k, v }: { k: ReactNode; v: ReactNode }) {
  return (
    <div className="stat">
      <div className="k">{k}</div>
      <div className="v">{v}</div>
    </div>
  )
}

export function UnitStats({ u }: { u: UnitFact }) {
  const { t } = useI18n()
  const dice = (hit?: number, n?: number) => (hit ? `${hit}${n && n > 1 ? ` ×${n}` : ''}` : null)
  return (
    <>
      <div className="stats">
        {u.cost != null && <Stat k={t('cost')} v={u.cost} />}
        {u.combat != null && <Stat k={t('combat')} v={dice(u.combat, u.combatDice)} />}
        {u.move != null && <Stat k={t('move')} v={u.move} />}
        {u.capacity != null && <Stat k={t('capacity')} v={u.capacity} />}
        {u.production != null && <Stat k="Production" v={u.production} />}
      </div>
      <div className="row" style={{ marginTop: 8 }}>
        {u.sustain && <Term to="sustain-damage" />}
        {u.afb && (
          <span>
            <Term to="anti-fighter-barrage" /> {dice(u.afb, u.afbDice)}
          </span>
        )}
        {u.bombard && (
          <span>
            <Term to="bombardment" /> {dice(u.bombard, u.bombardDice)}
          </span>
        )}
        {u.spaceCannon && (
          <span>
            <Term to="space-cannon" /> {dice(u.spaceCannon, u.spaceCannonDice)}
          </span>
        )}
        {u.planetaryShield && <Term to="planetary-shield" />}
      </div>
    </>
  )
}

export function PlanetValues({ p }: { p: PlanetFact }) {
  return (
    <span className="ri" title={`${p.res} / ${p.inf}`}>
      <span className="r">{p.res}</span>
      <span className="faint">/</span>
      <span className="i">{p.inf}</span>
    </span>
  )
}

export function ExpTag({ exp }: { exp?: string }) {
  const { t } = useI18n()
  if (!exp) return null
  return <span className="tag">{t(`exp_${exp}` as 'exp_base')}</span>
}
