/**
 * The wiki registry: merges generated FACTS with hand-written CONTENT into
 * one flat list of entries addressable by key "kind:slug".
 *
 * Adding a new kind of entry = add facts (optional) + a summary map in
 * src/content, then push entries here. Everything else (search, tooltips,
 * wiki pages) picks it up automatically.
 */
import type { Expansion, L, WikiKind } from '../content/types'
import { concepts } from '../content/concepts'
import {
  abilitySummaries,
  actionSummaries,
  agendaSummaries,
  explorationSummaries,
  leaderSummaries,
  promissorySummaries,
  publicSummaries,
  relicSummaries,
  secretSummaries,
  strategySummaries,
  techSummaries,
  unitSummaries,
} from '../content/cards'
import { factionGuides } from '../content/factions'
import * as F from './facts'

export interface WikiEntry {
  key: string
  kind: WikiKind
  slug: string
  title: L
  summary: L
  body?: L
  exp?: Expansion
  /** Concept grouping (concepts only) or sub-type (e.g. agenda law/directive). */
  group?: string
  faction?: string | null
  aliases?: string[]
  related?: string[]
  /** Raw fact record for kind-specific rendering. */
  fact?: unknown
  /** Optional expansions this entry requires (base is always on). Filled in below. */
  needs: Expansion[]
}

const same = (s: string): L => ({ en: s, fr: s })
const TODO: L = {
  en: 'Summary not written yet.',
  fr: 'Résumé pas encore rédigé.',
}

const entries: WikiEntry[] = []
const add = (e: Omit<WikiEntry, 'needs'>) => entries.push({ ...e, needs: [] })

// ---- rules concepts
for (const c of concepts) {
  add({
    key: `concept:${c.slug}`,
    kind: 'concept',
    slug: c.slug,
    title: c.title,
    summary: c.summary,
    body: c.body,
    group: c.group,
    aliases: c.aliases,
    related: c.related,
  })
}

// ---- strategy cards
for (const s of F.strategyCards) {
  const slug = s.name.toLowerCase()
  const c = strategySummaries[slug]
  add({
    key: `strategy:${slug}`,
    kind: 'strategy',
    slug,
    title: c?.title ?? same(s.name),
    summary: c?.summary ?? TODO,
    body: c?.body,
    exp: 'base',
    fact: s,
    related: c?.related,
  })
}

// ---- units (generic + faction)
for (const u of F.units) {
  const s = unitSummaries[u.id]
  add({
    key: `unit:${u.id}`,
    kind: 'unit',
    slug: u.id,
    title: s?.title ?? same(u.name),
    summary: s?.summary ?? TODO,
    body: s?.body,
    exp: u.exp,
    faction: u.faction,
    group: u.type,
    fact: u,
  })
}

// ---- technologies
for (const t of F.techs) {
  add({
    key: `tech:${t.id}`,
    kind: 'tech',
    slug: t.id,
    title: same(t.name),
    summary: techSummaries[t.id] ?? TODO,
    exp: t.exp,
    faction: t.faction,
    group: t.types[0],
    fact: t,
  })
}

// ---- factions
for (const f of F.factions) {
  const g = factionGuides[f.id]
  add({
    key: `faction:${f.id}`,
    kind: 'faction',
    slug: f.id,
    title: same(f.name),
    summary: g?.blurb ?? TODO,
    exp: f.exp,
    faction: f.id,
    aliases: g?.aliases,
    fact: f,
  })
}

// ---- faction abilities, leaders, promissory notes
for (const a of F.abilities) {
  add({
    key: `ability:${a.id}`,
    kind: 'ability',
    slug: a.id,
    title: same(a.name),
    summary: abilitySummaries[a.id] ?? TODO,
    faction: a.faction,
    fact: a,
  })
}
for (const l of F.leaders) {
  add({
    key: `leader:${l.id}`,
    kind: 'leader',
    slug: l.id,
    title: same(l.name),
    summary: leaderSummaries[l.id] ?? TODO,
    faction: l.faction,
    group: l.type,
    exp: l.exp,
    fact: l,
  })
}
for (const p of F.promissoryNotes) {
  if (/^rider[amx]$/.test(p.id)) continue // Keleres variants → single "rider"
  add({
    key: `promissory:${p.id}`,
    kind: 'promissory',
    slug: p.id,
    title: same(p.name),
    summary: promissorySummaries[p.id] ?? TODO,
    faction: p.faction ?? null,
    exp: p.exp,
    fact: p,
  })
}

// ---- objectives, agendas, action cards, relics, exploration
for (const o of F.publicObjectives) {
  add({
    key: `public:${o.id}`,
    kind: 'public',
    slug: o.id,
    title: same(o.name),
    summary: publicSummaries[o.id] ?? TODO,
    exp: o.exp,
    group: `stage${o.stage}`,
    fact: o,
  })
}
for (const o of F.secretObjectives) {
  add({
    key: `secret:${o.id}`,
    kind: 'secret',
    slug: o.id,
    title: same(o.name),
    summary: secretSummaries[o.id] ?? TODO,
    exp: o.exp,
    group: o.phase,
    fact: o,
  })
}
for (const a of F.agendas) {
  add({
    key: `agenda:${a.id}`,
    kind: 'agenda',
    slug: a.id,
    title: same(a.name),
    summary: agendaSummaries[a.id] ?? TODO,
    exp: a.exp,
    group: a.type,
    fact: a,
  })
}
for (const a of F.actionCards) {
  add({
    key: `action:${a.id}`,
    kind: 'action',
    slug: a.id,
    title: same(a.name),
    summary: actionSummaries[a.id] ?? TODO,
    exp: a.exp,
    group: a.phase,
    fact: a,
  })
}
for (const r of F.relics) {
  add({
    key: `relic:${r.id}`,
    kind: 'relic',
    slug: r.id,
    title: same(r.name),
    summary: relicSummaries[r.id] ?? TODO,
    exp: r.exp,
    fact: r,
  })
}
for (const x of F.explorations) {
  const slug = `${x.deck}-${x.id}`
  add({
    key: `explore:${slug}`,
    kind: 'explore',
    slug,
    title: same(x.name),
    summary: explorationSummaries[x.id] ?? TODO,
    exp: 'pok',
    group: x.deck,
    fact: x,
  })
}

// ---- planets (facts only, summary generated)
for (const p of F.planets) {
  if (p.home?.startsWith('keleres')) continue // duplicates of Mentak/Xxcha/Argent homes
  const traitL: Record<string, L> = {
    cultural: { en: 'cultural', fr: 'culturelle' },
    hazardous: { en: 'hazardous', fr: 'hostile' },
    industrial: { en: 'industrial', fr: 'industrielle' },
  }
  const tr = traitL[p.trait]
  const home = p.home ? F.factionById.get(p.home)?.name : null
  add({
    key: `planet:${p.id}`,
    kind: 'planet',
    slug: p.id,
    title: same(p.name),
    summary: {
      en: `${p.res} resource${p.res === 1 ? '' : 's'}, ${p.inf} influence${tr ? `, ${tr.en} planet` : ''}${p.skip.length ? `, ${p.skip.join('/')} tech specialty` : ''}${p.legendary ? ', legendary' : ''}${home ? ` — home of ${home}` : ''}.`,
      fr: `${p.res} ressource${p.res > 1 ? 's' : ''}, ${p.inf} influence${tr ? `, planète ${tr.fr}` : ''}${p.skip.length ? `, spécialité ${p.skip.join('/')}` : ''}${p.legendary ? ', légendaire' : ''}${home ? ` — origine : ${home}` : ''}.`,
    },
    exp: p.exp,
    faction: p.home,
    group: p.home ? 'home' : p.trait,
    fact: p,
  })
}

// ---- expansion requirements
// Codex is a set of reworked cards, not a standalone box: its action cards are
// PoK cards, its two techs are reworked base techs, and the Council Keleres
// (Codex III) needs PoK components. So requirements are computed, not copied.
export function factionNeeds(id: string | null | undefined): Expansion[] {
  if (!id) return []
  if (id === 'keleres') return ['pok', 'codex']
  return F.factionById.get(id)?.exp === 'pok' ? ['pok'] : []
}
for (const e of entries) {
  const n = new Set<Expansion>(factionNeeds(e.faction))
  if (e.exp === 'pok') n.add('pok')
  if (e.exp === 'codex' && e.kind === 'action') n.add('pok')
  if (e.kind === 'concept' && e.group === 'pok') n.add('pok')
  if (['leader', 'relic', 'explore'].includes(e.kind)) n.add('pok')
  if (e.kind === 'unit' && (e.fact as F.UnitFact).type === 'mech') n.add('pok')
  e.needs = [...n]
}

export const wiki: WikiEntry[] = entries
export const wikiByKey = new Map(entries.map((e) => [e.key, e]))

/** Resolve a markup reference: "tech:gd", or a bare concept slug. */
export function resolveRef(ref: string): WikiEntry | undefined {
  const key = ref.includes(':') ? ref : `concept:${ref}`
  return wikiByKey.get(key)
}

export function entryPath(e: WikiEntry): string {
  if (e.kind === 'faction') return `/factions/${e.slug}`
  return `/wiki/${e.kind}/${e.slug}`
}

export const KIND_ORDER: WikiKind[] = [
  'concept',
  'strategy',
  'unit',
  'tech',
  'faction',
  'ability',
  'leader',
  'promissory',
  'public',
  'secret',
  'agenda',
  'action',
  'relic',
  'explore',
  'planet',
]
