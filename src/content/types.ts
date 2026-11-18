/**
 * Shared content types.
 *
 * Every user-facing string of game content is an `L` (localised text) with
 * an English and a French version. Long texts use a tiny markup:
 *   - blank line            → new paragraph
 *   - lines starting "- "   → bullet list
 *   - **bold**
 *   - [[id]] / [[id|label]] → wiki link with hover tooltip (see RichText)
 *     ids are "kind:slug" (e.g. "tech:gd", "faction:hacan"); a bare slug
 *     means a rules concept ("concept:<slug>").
 *
 * All prose in src/content is ORIGINAL writing (summaries / explanations),
 * not copied card text. Keep it that way — see .claude/docs/licensing.md.
 */
export interface L {
  en: string
  fr: string
}

export type Lang = keyof L

export type Expansion = 'base' | 'pok' | 'codex'

export type WikiKind =
  | 'concept'
  | 'strategy'
  | 'unit'
  | 'tech'
  | 'faction'
  | 'ability'
  | 'leader'
  | 'promissory'
  | 'public'
  | 'secret'
  | 'agenda'
  | 'action'
  | 'relic'
  | 'explore'
  | 'planet'

/** A concept / rules entry written by hand. */
export interface ConceptEntry {
  slug: string
  title: L
  /** One or two sentences, used by tooltips and search results. */
  summary: L
  /** Longer explanation (markup allowed). */
  body?: L
  /** Category used to group concepts in the wiki index. */
  group: ConceptGroup
  /** Extra search words (both languages). */
  aliases?: string[]
  related?: string[]
}

export type ConceptGroup =
  | 'core'
  | 'round'
  | 'actions'
  | 'combat'
  | 'movement'
  | 'map'
  | 'economy'
  | 'politics'
  | 'units'
  | 'pok'

/** Short hand-written summary for a card / item keyed by its data id. */
export type SummaryMap = Record<string, L>
