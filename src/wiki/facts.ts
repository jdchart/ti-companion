/**
 * Typed access to the generated FACT files (src/data/facts/*.json).
 * Regenerate with scripts/extract-facts.py — never hand-edit those JSON files.
 */
import type { Expansion } from '../content/types'
import planetsJson from '../data/facts/planets.json'
import factionsJson from '../data/facts/factions.json'
import abilitiesJson from '../data/facts/abilities.json'
import techJson from '../data/facts/technologies.json'
import unitsJson from '../data/facts/units.json'
import scJson from '../data/facts/strategy_cards.json'
import publicJson from '../data/facts/public_objectives.json'
import secretJson from '../data/facts/secret_objectives.json'
import agendaJson from '../data/facts/agendas.json'
import actionJson from '../data/facts/action_cards.json'
import relicJson from '../data/facts/relics.json'
import exploreJson from '../data/facts/exploration.json'
import leaderJson from '../data/facts/leaders.json'
import pnJson from '../data/facts/promissory_notes.json'

export interface PlanetFact {
  id: string
  name: string
  tile: string
  res: number
  inf: number
  trait: 'cultural' | 'hazardous' | 'industrial' | 'none' | string
  skip: string[]
  legendary: boolean
  home: string | null
  exp: Expansion
}
export interface FactionFact {
  id: string
  name: string
  exp: Expansion
  commodities: number
  homePlanets: string[]
  factionTech: string[]
  startingTech: string[]
  startingTechOptions: string[]
  startingTechAmount: number | null
  startingFleet: string
  abilities: string[]
  leaders: string[]
  promissory: string[]
  units: string[]
  complexity: string | null
}
export interface TechFact {
  id: string
  name: string
  types: string[]
  req: string
  faction: string | null
  upgradeOf: string | null
  exp: Expansion
}
export interface UnitFact {
  id: string
  name: string
  type: string
  faction: string | null
  exp: Expansion
  cost?: number
  combat?: number
  combatDice?: number
  move?: number
  capacity?: number
  sustain?: boolean
  afb?: number
  afbDice?: number
  bombard?: number
  bombardDice?: number
  spaceCannon?: number
  spaceCannonDice?: number
  deepSpaceCannon?: boolean
  planetaryShield?: boolean
  production?: number
  upgradesTo?: string
  requiredTech?: string
}
export interface NamedFact {
  id: string
  name: string
  exp: Expansion
  faction?: string | null
}

export const planets = (planetsJson as PlanetFact[]).filter((p) => !p.home?.startsWith('keleres'))
export const factions = factionsJson as FactionFact[]
export const abilities = abilitiesJson as { id: string; name: string; faction: string }[]
export const techs = techJson as TechFact[]
export const units = unitsJson as UnitFact[]
export const strategyCards = scJson as { id: string; initiative: number; name: string; color: string }[]
export const publicObjectives = publicJson as (NamedFact & { points: number; stage: 1 | 2 | null })[]
export const secretObjectives = secretJson as (NamedFact & { phase: string })[]
export const agendas = agendaJson as (NamedFact & { type: string; target: string })[]
export const actionCards = actionJson as (NamedFact & { phase: string; copies: number })[]
export const relics = relicJson as NamedFact[]
export const explorations = exploreJson as (NamedFact & { deck: string; resolution: string; copies: number })[]
export const leaders = leaderJson as (NamedFact & { type: 'agent' | 'commander' | 'hero'; faction: string })[]
export const promissoryNotes = pnJson as NamedFact[]

export const planetById = new Map(planets.map((p) => [p.id, p]))
export const techById = new Map(techs.map((t) => [t.id, t]))
export const unitById = new Map(units.map((u) => [u.id, u]))
export const factionById = new Map(factions.map((f) => [f.id, f]))

/** Requirement string like "GGY" → { biotic: 2, cybernetic: 1 } */
export function parseReq(req: string): Record<string, number> {
  const map: Record<string, string> = { G: 'biotic', B: 'propulsion', Y: 'cybernetic', R: 'warfare' }
  const out: Record<string, number> = {}
  for (const ch of req || '') {
    const k = map[ch]
    if (k) out[k] = (out[k] ?? 0) + 1
  }
  return out
}
