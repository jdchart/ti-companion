# TI Companion

Unofficial Twilight Imperium 4 companion (Base + Prophecy of Kings + Codex), EN/FR, light/dark, mobile-aware.
Vite + React + TypeScript, HashRouter (for GitHub Pages), no backend.

- Run: `npm run dev` · Build: `npm run build` · Content check: `npm run check:content` (must pass before committing content)
- Durable save/share = JSON download/upload of plans (`src/state/plan.ts`). While the user is on the site, the working copy is autosaved (`src/state/store.tsx`): sessionStorage for the tab (silent restore), plus a localStorage recovery draft only while there is unsaved work, offered back via a banner and cleared on JSON save/discard. Don't add any other plan storage (no cloud/backend). UI prefs live in localStorage under `ti-companion:`.
- Project docs for Claude live in `.claude/docs/`:
  - `licensing.md` — what data/text we may use (read before adding any content)
  - `data-pipeline.md` — how `src/data/facts/*.json` is regenerated
  - `content-authoring.md` — markup, `[[refs]]`, i18n conventions, where each kind of content lives
  - `architecture.md` — code map
