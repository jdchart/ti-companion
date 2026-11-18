/**
 * Suggestions for a custom plan, derived from the catalogue archetypes,
 * the faction guide and the plan's planets. Pure functions — no UI.
 */
import type { L } from '../content/types'
import { archetypeById, archetypesForFaction } from '../content/archetypes'
import { factionGuides } from '../content/factions'
import * as F from '../wiki/facts'
import type { Plan } from './plan'

export interface Suggestion {
  key: string
  score: number
  why: L[]
}

const add = (m: Map<string, Suggestion>, key: string, score: number, why: L) => {
  const s = m.get(key) ?? { key, score: 0, why: [] }
  s.score += score
  if (!s.why.some((w) => w.en === why.en)) s.why.push(why)
  m.set(key, s)
}

function sources(plan: Plan) {
  const out: { id: string; weight: number }[] = []
  if (plan.archetypeId) out.push({ id: plan.archetypeId, weight: 4 })
  if (plan.factionId) for (const { a, fit } of archetypesForFaction(plan.factionId)) if (a.id !== plan.archetypeId) out.push({ id: a.id, weight: fit })
  return out
}

export function suggestObjectives(plan: Plan, allowed: (key: string) => boolean, limit = 8): Suggestion[] {
  const m = new Map<string, Suggestion>()
  for (const { id, weight } of sources(plan)) {
    const a = archetypeById.get(id)!
    a.objectives.forEach((k, i) => add(m, k, weight * (1 - i * 0.03), a.name))
  }
  // Objectives the faction guide mentions explicitly
  const g = plan.factionId ? factionGuides[plan.factionId] : undefined
  if (g) {
    const text = [g.playstyle.en, g.strengths.en, ...g.plans.flatMap((p) => [p.opening.en, p.mid.en, p.late.en])].join(' ')
    for (const o of [...F.publicObjectives, ...F.secretObjectives]) {
      if (text.includes(o.name)) add(m, `${'stage' in o ? 'public' : 'secret'}:${o.id}`, 3, { en: 'Faction guide', fr: 'Guide de faction' })
    }
  }
  // Trait objectives that match the planets you already own
  const traits: Record<string, number> = {}
  for (const op of plan.tracker.planets) {
    const t = F.planetById.get(op.id)?.trait
    if (t) traits[t] = (traits[t] ?? 0) + 1
  }
  const traitSecret: Record<string, string> = { cultural: 'secret:faa', hazardous: 'secret:mrm', industrial: 'secret:mp' }
  for (const [t, n] of Object.entries(traits)) {
    if (n >= 2 && traitSecret[t]) add(m, traitSecret[t], n, { en: `You own ${n} ${t} planets`, fr: `${n} planètes ${t}` })
  }
  return [...m.values()]
    .filter((s) => !plan.strategy.targetObjectives.includes(s.key) && !plan.tracker.scored.includes(s.key) && allowed(s.key))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

export function suggestTechs(plan: Plan, allowed: (key: string) => boolean, limit = 6): Suggestion[] {
  const m = new Map<string, Suggestion>()
  const g = plan.factionId ? factionGuides[plan.factionId] : undefined
  g?.keyTechs.forEach((t, i) => add(m, t, 6 - i * 0.2, { en: 'Faction guide', fr: 'Guide de faction' }))
  for (const { id, weight } of sources(plan)) {
    const a = archetypeById.get(id)!
    a.techs.forEach((t, i) => add(m, t, weight * (1 - i * 0.05), a.name))
  }
  return [...m.values()]
    .filter((s) => {
      const t = F.techById.get(s.key)
      if (!t) return false
      if (t.faction && t.faction !== plan.factionId) return false
      return !plan.strategy.techPath.includes(s.key) && !plan.tracker.techs.includes(s.key) && allowed(`tech:${s.key}`)
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

export type TechStatus = { state: 'owned' | 'ok' | 'skip' | 'blocked'; missing: Record<string, number> }

/**
 * Walk the planned path in order: a tech is researchable when the techs owned
 * plus those earlier in the path cover its prerequisites. Owned planets with a
 * tech specialty can each skip one prerequisite of their colour.
 */
export function techPathStatus(plan: Plan): Map<string, TechStatus> {
  const have: Record<string, number> = {}
  const count = (id: string) => {
    const t = F.techById.get(id)
    const c = t?.types[0]
    if (c && c !== 'unitupgrade' && c !== 'none') have[c] = (have[c] ?? 0) + 1
  }
  plan.tracker.techs.forEach(count)
  const skips: Record<string, number> = {}
  for (const op of plan.tracker.planets) for (const s of F.planetById.get(op.id)?.skip ?? []) skips[s] = (skips[s] ?? 0) + 1

  const out = new Map<string, TechStatus>()
  for (const id of plan.strategy.techPath) {
    const t = F.techById.get(id)
    if (!t) continue
    if (plan.tracker.techs.includes(id)) {
      out.set(id, { state: 'owned', missing: {} })
      continue
    }
    const req = F.parseReq(t.req)
    const missing: Record<string, number> = {}
    let skipNeeded = false
    for (const [c, n] of Object.entries(req)) {
      const gap = n - (have[c] ?? 0)
      if (gap <= 0) continue
      if ((skips[c] ?? 0) >= gap) skipNeeded = true
      else missing[c] = gap - (skips[c] ?? 0)
    }
    const state = Object.keys(missing).length ? 'blocked' : skipNeeded ? 'skip' : 'ok'
    out.set(id, { state, missing })
    count(id) // later steps may rely on this one
  }
  return out
}

/**
 * Order techs so each one's prerequisites are as satisfied as possible by the
 * techs before it (greedy: repeatedly take the tech with the fewest missing
 * prerequisites; ties keep the original order). Starting techs count as owned.
 */
export function orderTechPath(ids: string[], starting: string[]): string[] {
  const have: Record<string, number> = {}
  const count = (id: string) => {
    const c = F.techById.get(id)?.types[0]
    if (c && c !== 'unitupgrade' && c !== 'none') have[c] = (have[c] ?? 0) + 1
  }
  starting.forEach(count)
  const left = ids.filter((id) => !starting.includes(id))
  const out: string[] = ids.filter((id) => starting.includes(id))
  while (left.length) {
    let best = 0
    let bestMissing = Infinity
    left.forEach((id, i) => {
      const req = F.parseReq(F.techById.get(id)?.req ?? '')
      const missing = Object.entries(req).reduce((s, [c, n]) => s + Math.max(0, n - (have[c] ?? 0)), 0)
      if (missing < bestMissing) {
        bestMissing = missing
        best = i
      }
    })
    const [id] = left.splice(best, 1)
    out.push(id)
    count(id)
  }
  return out
}
