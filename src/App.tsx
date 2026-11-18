import { HashRouter, Route, Routes } from 'react-router-dom'
import { I18nProvider } from './i18n/i18n'
import { ThemeProvider } from './lib/theme'
import { ExpansionsProvider } from './lib/expansions'
import { PlanStoreProvider } from './state/store'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import { WikiEntryPage, WikiIndex } from './pages/Wiki'
import { FactionList, FactionPage } from './pages/Factions'
import { PlanEditor, PlanList } from './pages/Plans'
import Settings from './pages/Settings'
import { ArchetypePage, Catalogue } from './pages/Catalogue'
import Simulator from './pages/Simulator'

/**
 * HashRouter keeps every route working on GitHub Pages without a 404
 * rewrite (URLs look like …/#/wiki/tech/gd).
 */
export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <ExpansionsProvider>
        <PlanStoreProvider>
          <HashRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="wiki" element={<WikiIndex />} />
                <Route path="wiki/:kind/:slug" element={<WikiEntryPage />} />
                <Route path="factions" element={<FactionList />} />
                <Route path="factions/:id" element={<FactionPage />} />
                <Route path="plans" element={<PlanList />} />
                <Route path="plans/:id" element={<PlanEditor />} />
                <Route path="catalogue" element={<Catalogue />} />
                <Route path="catalogue/:id" element={<ArchetypePage />} />
                <Route path="simulator" element={<Simulator />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<Home />} />
              </Route>
            </Routes>
          </HashRouter>
        </PlanStoreProvider>
        </ExpansionsProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}
