/**
 * Content integrity check: every [[ref]] in content must resolve, and every
 * wiki entry should have a hand-written summary (EN + FR).
 * Run: npm run check:content
 */
import { wiki, resolveRef } from '../src/wiki/registry'
import { KIND_ORDER } from '../src/wiki/registry'
import { factionGuides } from '../src/content/factions'
import { factions, techById, factionById } from '../src/wiki/facts'
import { archetypes } from '../src/content/archetypes'
import { opponentTips } from '../src/content/factions/threats'
import { wikiByKey } from '../src/wiki/registry'

const REF = /\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g
const problems: string[] = []
const check = (where: string, text: string | undefined) => {
  if (!text) return
  for (const m of text.matchAll(REF)) {
    const ref = m[1]
    if (ref.startsWith('kind:')) {
      if (!KIND_ORDER.includes(ref.slice(5) as never)) problems.push(`${where}: bad kind link ${ref}`)
    } else if (!resolveRef(ref)) problems.push(`${where}: broken link [[${ref}]]`)
  }
}

for (const e of wiki) {
  for (const lang of ['en', 'fr'] as const) {
    check(`${e.key} summary.${lang}`, e.summary[lang])
    check(`${e.key} body.${lang}`, e.body?.[lang])
    if (!e.summary[lang] || /not written yet|pas encore rédigé/.test(e.summary[lang])) problems.push(`${e.key}: missing ${lang} summary`)
  }
  for (const r of e.related ?? []) if (!r.startsWith('kind:') && !resolveRef(r)) problems.push(`${e.key}: bad related ${r}`)
}
for (const f of factions) {
  const g = factionGuides[f.id]
  if (!g) {
    problems.push(`faction ${f.id}: no guide`)
    continue
  }
  for (const [k, v] of Object.entries(g)) {
    if (v && typeof v === 'object' && 'en' in v) for (const lang of ['en', 'fr'] as const) check(`faction ${f.id}.${k}.${lang}`, (v as Record<string, string>)[lang])
  }
  for (const p of g.plans) for (const part of [p.summary, p.opening, p.mid, p.late]) for (const lang of ['en', 'fr'] as const) check(`faction ${f.id} plan`, part[lang])
  for (const t of g.keyTechs) if (!techById.has(t)) problems.push(`faction ${f.id}: unknown key tech ${t}`)
}

for (const a of archetypes) {
  for (const k of ['name', 'tagline', 'summary', 'opening', 'mid', 'late', 'risks'] as const)
    for (const lang of ['en', 'fr'] as const) {
      if (!a[k][lang]) problems.push(`archetype ${a.id}.${k}: missing ${lang}`)
      check(`archetype ${a.id}.${k}.${lang}`, a[k][lang])
    }
  for (const o of a.objectives) if (!wikiByKey.has(o)) problems.push(`archetype ${a.id}: unknown objective ${o}`)
  for (const t of a.techs) if (!techById.has(t)) problems.push(`archetype ${a.id}: unknown tech ${t}`)
  for (const f of a.factions) if (!factionById.has(f.id)) problems.push(`archetype ${a.id}: unknown faction ${f.id}`)
}
for (const f of factions) {
  if (!archetypes.some((a) => a.factions.some((x) => x.id === f.id))) problems.push(`faction ${f.id}: in no catalogue archetype`)
  const tip = opponentTips[f.id]
  if (!tip) problems.push(`faction ${f.id}: no opponent tips`)
  else for (const lang of ['en', 'fr'] as const) check(`opponentTips ${f.id}.${lang}`, tip[lang])
}

const counts = KIND_ORDER.map((k) => `${k}=${wiki.filter((e) => e.kind === k).length}`).join(' ')
console.log(`wiki entries: ${wiki.length} (${counts})`)
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`)
  for (const p of problems) console.log(' - ' + p)
  process.exit(1)
}
console.log('content OK')
