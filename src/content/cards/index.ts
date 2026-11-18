import { abilitySummaries, leaderSummaries, promissorySummaries, factionUnitSummaries } from './factionBits'
import { techSummaries } from './techs'
import { strategySummaries, unitSummaries as genericUnits, type RichSummary } from './core'
import {
  publicSummaries,
  secretSummaries,
  agendaSummaries,
  actionSummaries,
  relicSummaries,
  explorationSummaries,
} from './decks'

const unitSummaries: Record<string, RichSummary> = { ...genericUnits }
for (const [id, s] of Object.entries(factionUnitSummaries)) unitSummaries[id] = { summary: s }

export {
  abilitySummaries,
  leaderSummaries,
  promissorySummaries,
  techSummaries,
  strategySummaries,
  unitSummaries,
  publicSummaries,
  secretSummaries,
  agendaSummaries,
  actionSummaries,
  relicSummaries,
  explorationSummaries,
}
export type { RichSummary }
