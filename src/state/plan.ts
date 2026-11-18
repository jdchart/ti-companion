/**
 * Game-plan data model + JSON file format.
 *
 * File format (versioned so old saves keep loading):
 *   { "app": "ti-companion", "type": "setup", "version": 1,
 *     "exportedAt": ISO, "plans": Plan[] }
 * A single exported plan uses the same envelope with one plan.
 * Bump FILE_VERSION and add a migration in `migrate()` when changing Plan.
 */
export const FILE_VERSION = 2

export type LeaderState = 'ready' | 'exhausted' | 'locked' | 'unlocked' | 'purged'

export interface Priority {
  id: string
  text: string
  done: boolean
}

export interface OwnedPlanet {
  id: string
  exhausted: boolean
}

export interface Opponent {
  id: string
  name: string
  factionId: string | null
  vp: number
  notes: string
}

export interface Plan {
  id: string
  name: string
  factionId: string | null
  /** Catalogue archetype this plan follows (content/archetypes.ts), if any. */
  archetypeId: string | null
  /** The other players at the table. */
  opponents: Opponent[]
  createdAt: string
  updatedAt: string
  strategy: {
    summary: string
    priorities: Priority[]
    targetObjectives: string[] // wiki keys: "public:x" | "secret:y"
    techPath: string[] // tech ids, in intended order
    preferredSC: number[] // initiative numbers 1..8
    notes: string
    /** Free "things to look out for" checklist. */
    watchFor: Priority[]
  }
  tracker: {
    vp: number
    vpGoal: number
    round: number
    tokens: { tactic: number; fleet: number; strategy: number }
    tradeGoods: number
    commodities: number
    actionCards: number
    planets: OwnedPlanet[]
    techs: string[]
    relics: string[]
    scored: string[] // wiki keys of scored objectives
    leaders: { agent: LeaderState; commander: LeaderState; hero: LeaderState }
  }
}

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)

export function newPlan(partial?: Partial<Plan>): Plan {
  const now = new Date().toISOString()
  return {
    id: uid(),
    name: 'New plan',
    factionId: null,
    archetypeId: null,
    opponents: [],
    createdAt: now,
    updatedAt: now,
    strategy: { summary: '', priorities: [], targetObjectives: [], techPath: [], preferredSC: [], notes: '', watchFor: [] },
    tracker: {
      vp: 0,
      vpGoal: 10,
      round: 1,
      tokens: { tactic: 3, fleet: 3, strategy: 2 },
      tradeGoods: 0,
      commodities: 0,
      actionCards: 0,
      planets: [],
      techs: [],
      relics: [],
      scored: [],
      leaders: { agent: 'ready', commander: 'locked', hero: 'locked' },
    },
    ...partial,
  }
}

export interface SetupFile {
  app: 'ti-companion'
  type: 'setup'
  version: number
  exportedAt: string
  plans: Plan[]
}

export function toFile(plans: Plan[]): SetupFile {
  return { app: 'ti-companion', type: 'setup', version: FILE_VERSION, exportedAt: new Date().toISOString(), plans }
}

/** Deep-merge loaded data over defaults so missing fields never crash the UI. */
function normalise(p: Partial<Plan>): Plan {
  const base = newPlan()
  return {
    ...base,
    ...p,
    id: typeof p.id === 'string' ? p.id : base.id,
    archetypeId: typeof p.archetypeId === 'string' ? p.archetypeId : null,
    opponents: Array.isArray(p.opponents)
      ? p.opponents.map((o: Partial<Opponent>) => ({ id: uid(), name: '', factionId: null, vp: 0, notes: '', ...o }))
      : [],
    strategy: { ...base.strategy, ...(p.strategy ?? {}) },
    tracker: {
      ...base.tracker,
      ...(p.tracker ?? {}),
      tokens: { ...base.tracker.tokens, ...(p.tracker?.tokens ?? {}) },
      leaders: { ...base.tracker.leaders, ...(p.tracker?.leaders ?? {}) },
    },
  }
}

function migrate(data: { version?: number; plans?: unknown[] }): Plan[] {
  // v1 → v2: added archetypeId, opponents and strategy.watchFor;
  // normalise() fills them with defaults, so no explicit step is needed.
  return (data.plans ?? []).filter((x): x is Partial<Plan> => !!x && typeof x === 'object').map(normalise)
}

export function parseFile(text: string): Plan[] {
  const data = JSON.parse(text)
  if (!data || data.app !== 'ti-companion' || !Array.isArray(data.plans)) throw new Error('invalid')
  if (typeof data.version === 'number' && data.version > FILE_VERSION) throw new Error('newer')
  return migrate(data)
}

export function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase() || 'plan'
