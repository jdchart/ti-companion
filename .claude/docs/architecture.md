# Architecture

- `src/main.tsx` fonts + CSS; `src/App.tsx` providers (Theme → I18n → PlanStore) + HashRouter routes.
- `src/components/Layout.tsx` sidenav (desktop) / bottom nav (≤760px, `useIsMobile`), top bar with search, FR/EN, theme.
- `src/components/Term.tsx` keyword tooltip/sheet (`useCanHover` decides hover vs tap). `SearchBox.tsx` (`/` or ⌘K) uses MiniSearch (`src/wiki/search.ts`).
- Pages: Home, Wiki (`WikiIndex`, `WikiEntryPage`), Factions (`FactionList`, `FactionPage`), Plans (`PlanList`, `PlanEditor` with Strategy/Tracker/Planets tabs), Settings.
- State: `src/state/plan.ts` (model, `toFile`/`parseFile` with versioning — bump `version` and add a migration when the model changes), `store.tsx` (in-memory + dirty flag + beforeunload), `seed.ts` (plan from faction guide).
- Styles: single design system in `src/styles/app.css`, tokens on `:root` / `[data-theme]`.
- Verification: puppeteer-core with mobile emulation (headless Chrome CLI clamps width to 500px, so use real emulation for mobile checks).

## Added in round 2
- Expansions: `src/lib/expansions.tsx` (pref `ti-companion:expansions`). Every wiki entry has computed `needs` (registry.ts, bottom): Codex action cards need PoK, Codex techs are base, Keleres needs PoK+Codex, leaders/relics/exploration/mechs need PoK. Filter with `entryOk` / `keyOk` / `factionOk`; direct links still open, with a banner.
- Catalogue: `src/content/archetypes.ts` (generic plans → factions with fit 1–3) + `pages/Catalogue.tsx` (/catalogue, /catalogue/:id).
- Plans v2 (`FILE_VERSION = 2`): `archetypeId`, `opponents[]`, `strategy.watchFor`. v1 files load via `normalise()`.
- Suggestions + tech path checks: `src/state/suggest.ts` (`suggestObjectives`, `suggestTechs`, `techPathStatus`, `orderTechPath`).
- Opponent tips: `src/content/factions/threats.ts` (shown on the plan Table tab and faction pages).
- Combat simulator: engine `src/lib/combat.ts` (Monte Carlo, pure), UI `pages/Simulator.tsx`. Models space cannon, AFB, sustain, bombardment vs planetary shield, space cannon defence; only Sardakk +1 / Jol-Nar −1 faction mods.
- Illustrations: `src/components/Illustrations.tsx` — original SVG (concept art keyed by concept slug in `CONCEPT_ART`, archetype icons, generated `FactionSigil`, expansion badges, `FlowArrow`). CSS classes `i-*` in app.css; animations off under prefers-reduced-motion.

## Added in round 3
- Animations: rotate/scale SVG with the `Spin` / `Pulse` helpers (SMIL `animateTransform` around an explicit centre). Never put a CSS transform animation on an element that also has a `transform` attribute — CSS overrides it (this caused the drifting sigil and Action-phase node). Simple CSS translate/opacity animations are fine on elements without a transform attribute.
- Art: `PlanetArt` (from planet facts), `TechArt` (colour emblem / unit glyph for upgrades), `UnitGlyph` + `UnitArt`.
- Plan Table tab = seated game table (seat order = opponents order, you at the bottom; neighbours = adjacent seats).
- Autosave: see CLAUDE.md. The open editor tab is remembered per plan in sessionStorage.
- Home: random wiki entry card (respects expansions).
