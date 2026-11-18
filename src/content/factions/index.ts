import { baseGuides } from './base'
import { pokGuides } from './pok'
import type { FactionGuide } from './types'

export const factionGuides: Record<string, FactionGuide> = { ...baseGuides, ...pokGuides }
export type { FactionGuide, GamePlan } from './types'
