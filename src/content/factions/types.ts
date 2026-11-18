import type { L } from '../types'

export interface GamePlan {
  name: L
  summary: L
  /** Bullet lists ("- " lines) — also used to seed custom plan priorities. */
  opening: L
  mid: L
  late: L
}

export interface FactionGuide {
  /** Accent colour used on cards/hero (our own choice, not official art). */
  color: string
  blurb: L
  aliases?: string[]
  playstyle: L
  strengths: L
  weaknesses: L
  keyTechs: string[]
  /** Strategy card initiative numbers that suit the faction. */
  goodSC: number[]
  plans: GamePlan[]
  beware?: L
}
