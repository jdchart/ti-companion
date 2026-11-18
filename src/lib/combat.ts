/**
 * Monte-Carlo combat simulator (space combat, ground combat, or a full
 * invasion). Unit stats come from the fact data, using faction-specific units
 * when a faction is chosen. Only generic rules are modelled; faction abilities
 * other than flat combat modifiers are not.
 */
import * as F from '../wiki/facts'

export type UnitType = 'fighter' | 'destroyer' | 'cruiser' | 'carrier' | 'dreadnought' | 'flagship' | 'warsun' | 'infantry' | 'mech' | 'pds'
export const SHIP_TYPES: UnitType[] = ['fighter', 'destroyer', 'cruiser', 'carrier', 'dreadnought', 'flagship', 'warsun']
export const GROUND_TYPES: UnitType[] = ['infantry', 'mech']
/** Units that have a II version (techs). */
export const UPGRADABLE: UnitType[] = ['fighter', 'destroyer', 'cruiser', 'carrier', 'dreadnought', 'infantry', 'pds']

export type Mode = 'space' | 'ground' | 'invasion'

export interface SideInput {
  factionId: string | null
  counts: Partial<Record<UnitType, number>>
  upgrades: Partial<Record<UnitType, boolean>>
  /** + improves every combat roll (e.g. +1 means hitting on one less) */
  mod: number
}

/** Flat combat modifiers from faction abilities that we can model. */
export const FACTION_MODS: Record<string, { mod: number; note: { en: string; fr: string } }> = {
  sardakk: { mod: 1, note: { en: '+1 to all combat rolls (Unrelenting)', fr: '+1 à tous les jets de combat (Unrelenting)' } },
  jolnar: { mod: -1, note: { en: '−1 to all combat rolls (Fragile)', fr: '−1 à tous les jets de combat (Fragile)' } },
}

export function unitFor(type: UnitType, factionId: string | null, upgraded: boolean): F.UnitFact | undefined {
  const own = factionId ? F.units.find((u) => u.faction === factionId && u.type === type && !F.units.some((x) => x.upgradesTo === u.id)) : undefined
  const generic = F.units.find((u) => !u.faction && u.type === type && u.id !== 'nowarsun' && !u.id.startsWith('cavalry') && !F.units.some((x) => x.upgradesTo === u.id))
  const base = own ?? generic
  if (!base) return undefined
  if (upgraded && base.upgradesTo) return F.unitById.get(base.upgradesTo) ?? base
  return base
}

interface Inst {
  type: UnitType
  cost: number
  combat: number
  dice: number
  sustain: boolean
  damaged: boolean
  afb: number
  afbDice: number
  bombard: number
  bombardDice: number
  cannon: number
  cannonDice: number
  shield: boolean
}

function build(side: SideInput, types: UnitType[]): Inst[] {
  const out: Inst[] = []
  for (const t of types) {
    const n = side.counts[t] ?? 0
    if (!n) continue
    const u = unitFor(t, side.factionId, !!side.upgrades[t])
    if (!u) continue
    for (let i = 0; i < n; i++)
      out.push({
        type: t,
        cost: u.cost ?? 0,
        combat: u.combat ?? 11,
        dice: u.combatDice ?? 1,
        sustain: !!u.sustain,
        damaged: false,
        afb: u.afb ?? 0,
        afbDice: u.afbDice ?? 0,
        bombard: u.bombard ?? 0,
        bombardDice: u.bombardDice ?? 0,
        cannon: u.spaceCannon ?? 0,
        cannonDice: u.spaceCannonDice ?? 0,
        shield: !!u.planetaryShield,
      })
  }
  return out
}

const d10 = () => 1 + Math.floor(Math.random() * 10)
function roll(value: number, dice: number, mod: number) {
  let h = 0
  const target = Math.max(1, value - mod)
  for (let i = 0; i < dice; i++) if (d10() >= target) h++
  return h
}

/** Order in which hits destroy units (cheapest / least useful first). */
const LOSS_ORDER: UnitType[] = ['fighter', 'infantry', 'destroyer', 'carrier', 'cruiser', 'mech', 'dreadnought', 'flagship', 'warsun']

/** Assign hits: sustain damage first (free), then lose cheapest units. */
function assign(units: Inst[], hits: number, onlyFighters = false) {
  if (onlyFighters) {
    while (hits > 0) {
      const i = units.findIndex((u) => u.type === 'fighter')
      if (i < 0) return
      units.splice(i, 1)
      hits--
    }
    return
  }
  for (const u of units) {
    if (hits <= 0) return
    if (u.sustain && !u.damaged) {
      u.damaged = true
      hits--
    }
  }
  while (hits > 0 && units.length) {
    let best = 0
    for (let i = 1; i < units.length; i++) {
      if (LOSS_ORDER.indexOf(units[i].type) < LOSS_ORDER.indexOf(units[best].type)) best = i
    }
    units.splice(best, 1)
    hits--
  }
}

const fire = (units: Inst[], mod: number) => units.reduce((h, u) => h + roll(u.combat, u.dice, mod), 0)

type Outcome = 'attacker' | 'defender' | 'draw'

function spaceBattle(A: Inst[], D: Inst[], aPds: Inst[], dPds: Inst[], aMod: number, dMod: number) {
  // Space cannon offense (both sides' PDS / space cannon units)
  const aCannon = [...aPds, ...A].reduce((h, u) => h + (u.cannon ? roll(u.cannon, u.cannonDice, 0) : 0), 0)
  const dCannon = [...dPds, ...D].reduce((h, u) => h + (u.cannon ? roll(u.cannon, u.cannonDice, 0) : 0), 0)
  assign(D, aCannon)
  assign(A, dCannon)
  let rounds = 0
  if (A.length && D.length) {
    // Anti-fighter barrage (first round only)
    const aAfb = A.reduce((h, u) => h + (u.afb ? roll(u.afb, u.afbDice, 0) : 0), 0)
    const dAfb = D.reduce((h, u) => h + (u.afb ? roll(u.afb, u.afbDice, 0) : 0), 0)
    assign(D, aAfb, true)
    assign(A, dAfb, true)
  }
  while (A.length && D.length && rounds < 60) {
    rounds++
    const ha = fire(A, aMod)
    const hd = fire(D, dMod)
    assign(D, ha)
    assign(A, hd)
  }
  return rounds
}

function groundBattle(A: Inst[], D: Inst[], bombarders: Inst[], dPds: Inst[], aMod: number, dMod: number) {
  // Bombardment is blocked by planetary shield unless a war sun is present.
  const shield = dPds.some((p) => p.shield)
  const warsun = bombarders.some((u) => u.type === 'warsun')
  if (!shield || warsun) {
    const h = bombarders.reduce((s, u) => s + (u.bombard ? roll(u.bombard, u.bombardDice, 0) : 0), 0)
    assign(D, h)
  }
  // Space cannon defense against landing ground forces
  const sc = dPds.reduce((s, u) => s + (u.cannon ? roll(u.cannon, u.cannonDice, 0) : 0), 0)
  assign(A, sc)
  let rounds = 0
  while (A.length && D.length && rounds < 60) {
    rounds++
    const ha = fire(A, aMod)
    const hd = fire(D, dMod)
    assign(D, ha)
    assign(A, hd)
  }
  return rounds
}

export interface SimResult {
  n: number
  attacker: number
  defender: number
  draw: number
  avgRounds: number
  /** average survivors per unit type for each side (across all simulations) */
  survA: Partial<Record<UnitType, number>>
  survD: Partial<Record<UnitType, number>>
  /** invasion only: share of runs where the attacker won space but lost on the ground */
  lostOnGround?: number
}

export function simulate(mode: Mode, att: SideInput, def: SideInput, n = 6000): SimResult {
  const aMod = att.mod + (att.factionId ? FACTION_MODS[att.factionId]?.mod ?? 0 : 0)
  const dMod = def.mod + (def.factionId ? FACTION_MODS[def.factionId]?.mod ?? 0 : 0)
  const shipsA = build(att, SHIP_TYPES)
  const shipsD = build(def, SHIP_TYPES)
  const groundA = build(att, GROUND_TYPES)
  const groundD = build(def, GROUND_TYPES)
  const pdsA = build(att, ['pds'])
  const pdsD = build(def, ['pds'])
  const clone = (xs: Inst[]) => xs.map((x) => ({ ...x }))

  let a = 0,
    d = 0,
    dr = 0,
    rounds = 0,
    lostOnGround = 0
  const survA: Partial<Record<UnitType, number>> = {}
  const survD: Partial<Record<UnitType, number>> = {}
  const tally = (m: typeof survA, xs: Inst[]) => xs.forEach((x) => (m[x.type] = (m[x.type] ?? 0) + 1))

  for (let i = 0; i < n; i++) {
    let out: Outcome
    if (mode === 'space') {
      const A = clone(shipsA)
      const D = clone(shipsD)
      rounds += spaceBattle(A, D, pdsA, pdsD, aMod, dMod)
      out = A.length && !D.length ? 'attacker' : D.length && !A.length ? 'defender' : !A.length && !D.length ? 'draw' : 'defender'
      tally(survA, A)
      tally(survD, D)
    } else {
      let A = clone(shipsA)
      const D = clone(shipsD)
      // Invasion: the planet's PDS fire at arriving ships, then any space combat.
      if (mode === 'invasion') rounds += spaceBattle(A, D, [], pdsD, aMod, dMod)
      if (mode === 'invasion' && (D.length || (shipsA.length && !A.length))) {
        // attacker failed to clear space: no landing
        out = !A.length && !D.length ? 'draw' : 'defender'
        tally(survA, A)
        tally(survD, D)
      } else {
        const GA = clone(groundA)
        const GD = clone(groundD)
        if (mode === 'ground') A = clone(shipsA) // bombardment from ships listed on the attacker side
        rounds += groundBattle(GA, GD, A, pdsD, aMod, dMod)
        out = GA.length && !GD.length ? 'attacker' : GD.length && !GA.length ? 'defender' : !GA.length && !GD.length ? 'draw' : 'defender'
        if (mode === 'invasion' && out !== 'attacker') lostOnGround++
        tally(survA, [...(mode === 'invasion' ? A : []), ...GA])
        tally(survD, [...D, ...GD])
      }
    }
    if (out === 'attacker') a++
    else if (out === 'defender') d++
    else dr++
  }
  const avg = (m: typeof survA) => Object.fromEntries(Object.entries(m).map(([k, v]) => [k, (v as number) / n]))
  return {
    n,
    attacker: a / n,
    defender: d / n,
    draw: dr / n,
    avgRounds: rounds / n,
    survA: avg(survA),
    survD: avg(survD),
    lostOnGround: mode === 'invasion' ? lostOnGround / n : undefined,
  }
}
