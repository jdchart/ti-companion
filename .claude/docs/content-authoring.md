# Content authoring

All text is `L = { en, fr }` — both languages are required (`check:content` enforces summaries).

Markup (rendered by `src/components/RichText.tsx`): paragraphs separated by blank lines, `- ` bullets, `**bold**`,
`[[ref]]` / `[[ref|label]]`. A ref is `kind:slug` (e.g. `tech:gd`, `faction:hacan`, `planet:mr`); a bare slug = concept (`[[sustain-damage]]`).
`[[kind:tech]]` links to a wiki category. Refs render as hover tooltips (desktop) / tap sheets (touch).

Where things live:
- Rules concepts: `src/content/concepts.ts` (slug, group, aliases, related)
- Card summaries: `src/content/cards/*.ts` keyed by fact id (techs, units, decks, faction abilities/leaders/promissories)
- Faction guides + game plans: `src/content/factions/{base,pok}.ts` (`FactionGuide`)
- UI strings: `src/i18n/strings.ts` (same keys in en and fr)
- Registry assembling the wiki: `src/wiki/registry.ts`

Always paraphrase (see licensing.md). Keep summaries to one or two sentences; details go in `body`.

- Catalogue archetypes: `src/content/archetypes.ts` — every faction must appear in at least one (checked).
- Opponent tips: `src/content/factions/threats.ts` — one per faction (checked).
- To illustrate a new concept, add an entry to `CONCEPT_ART` in `src/components/Illustrations.tsx` (own SVG only — never trace official art).
