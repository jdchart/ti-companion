# Deployment (GitHub Pages)

Live site: https://jdchart.github.io/ti-companion/ (repo: github.com/jdchart/ti-companion, public).

- `npm run deploy` → runs `predeploy` (content check + build), then `gh-pages -d dist --nojekyll`,
  which force-pushes the contents of `dist/` to the `gh-pages` branch. GitHub Pages serves that branch (root).
- Source lives on `main`; `gh-pages` only ever holds built files — never edit it by hand.
- Works under the `/ti-companion/` sub-path because `vite.config.ts` uses `base: './'` and the app uses
  HashRouter (`/#/wiki/...`), so no 404.html rewrite is needed.
- Pages was enabled automatically when the `gh-pages` branch first appeared. If it is ever disabled:
  repo Settings → Pages → Build and deployment → Deploy from a branch → `gh-pages` / `(root)`.
- Expect ~1 min after a deploy before the new version is served (CDN cache).
- Visitors' saved plans are per-browser (JSON files + autosave) and unaffected by redeploys.
