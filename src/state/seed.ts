import type { Lang } from '../content/types'
import { factionGuides, type GamePlan } from '../content/factions'
import { archetypeById, archetypesForFaction, type Archetype } from '../content/archetypes'
import { factionById } from '../wiki/facts'
import { newPlan, uid, type Plan } from './plan'
import { resolveRef } from '../wiki/registry'
import { orderTechPath } from './suggest'

/** Flatten [[ref|label]] / [[ref]] markup to plain text (wiki title for bare refs). */
const plain = (s: string, lang: Lang) =>
  s
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, (_, ref: string) => resolveRef(ref)?.title[lang] ?? ref.replace(/^[a-z]+:/, '').replace(/-/g, ' '))

/** "- a\n- b" → ["a", "b"] with [[ref|label]] markup flattened to its label. */
const bullets = (s: string, lang: Lang) =>
  s
    .split('\n')
    .map((x) => x.trim())
    .filter((x) => x.startsWith('- '))
    .map((x) => plain(x.slice(2), lang))

function phased(gp: Pick<GamePlan, 'opening' | 'mid' | 'late'>, lang: Lang) {
  const tag = lang === 'fr' ? ['Ouverture', 'Milieu', 'Fin'] : ['Opening', 'Mid', 'Late']
  return [
    ...bullets(gp.opening[lang], lang).map((t) => `[${tag[0]}] ${t}`),
    ...bullets(gp.mid[lang], lang).map((t) => `[${tag[1]}] ${t}`),
    ...bullets(gp.late[lang], lang).map((t) => `[${tag[2]}] ${t}`),
  ].map((text) => ({ id: uid(), text, done: false }))
}

function factionTracker(factionId: string | null, base: Plan) {
  const f = factionId ? factionById.get(factionId) : undefined
  return {
    ...base.tracker,
    planets: !f || f.id === 'keleres' ? [] : f.homePlanets.map((id) => ({ id, exhausted: false })),
    techs: f?.startingTech ?? [],
  }
}

/**
 * Build a custom plan pre-filled from a faction's suggested game plan.
 * Text is copied in the current UI language and becomes the user's own,
 * freely editable content.
 */
export function planFromFaction(factionId: string, gp: GamePlan | undefined, lang: Lang): Partial<Plan> {
  const f = factionById.get(factionId)
  const g = factionGuides[factionId]
  const base = newPlan()
  const short = f?.name.replace(/^The /, '') ?? factionId
  const arch = archetypesForFaction(factionId)[0]?.a
  return {
    name: gp ? `${short} — ${gp.name[lang]}` : short,
    factionId,
    archetypeId: arch?.id ?? null,
    strategy: {
      ...base.strategy,
      summary: gp ? gp.summary[lang] : '',
      priorities: gp ? phased(gp, lang) : [],
      techPath: orderTechPath(g?.keyTechs ?? [], f?.startingTech ?? []),
      preferredSC: g?.goodSC ?? [],
    },
    tracker: factionTracker(factionId, base),
  }
}

/** Plan from a catalogue archetype, optionally with a faction chosen. */
export function planFromArchetype(a: Archetype | string, factionId: string | null, lang: Lang): Partial<Plan> {
  const arch = typeof a === 'string' ? archetypeById.get(a)! : a
  const base = newPlan()
  const f = factionId ? factionById.get(factionId) : undefined
  const g = factionId ? factionGuides[factionId] : undefined
  // Faction's own key techs first, then the archetype's, without duplicates.
  const techPath = orderTechPath([...new Set([...(g?.keyTechs ?? []).slice(0, 2), ...arch.techs])].slice(0, 6), f?.startingTech ?? [])
  return {
    name: f ? `${f.name.replace(/^The /, '')} — ${arch.name[lang]}` : arch.name[lang],
    factionId,
    archetypeId: arch.id,
    strategy: {
      ...base.strategy,
      summary: plain(arch.summary[lang], lang),
      priorities: phased(arch, lang),
      techPath,
      preferredSC: [...new Set([...arch.sc, ...(g?.goodSC ?? [])])].slice(0, 3),
      targetObjectives: arch.objectives.slice(0, 4),
    },
    tracker: factionTracker(factionId, base),
  }
}
