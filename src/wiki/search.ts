import MiniSearch from 'minisearch'
import { wiki, type WikiEntry } from './registry'

/** Strip accents so "regle" finds "règle" and markup so links don't pollute. */
const fold = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_m, a, b) => b || a)
    .toLowerCase()

const index = new MiniSearch<{ id: string; title: string; summary: string; extra: string }>({
  fields: ['title', 'summary', 'extra'],
  storeFields: [],
  processTerm: (t) => fold(t),
  searchOptions: {
    boost: { title: 4, extra: 2 },
    prefix: true,
    fuzzy: 0.2,
    combineWith: 'AND',
  },
})

index.addAll(
  wiki.map((e) => ({
    id: e.key,
    title: `${e.title.en} ${e.title.fr}`,
    summary: `${e.summary.en} ${e.summary.fr}`,
    extra: [...(e.aliases ?? []), e.slug.replace(/-/g, ' ')].join(' '),
  })),
)

const byKey = new Map(wiki.map((e) => [e.key, e]))

export function searchWiki(q: string, limit = 30): WikiEntry[] {
  const query = q.trim()
  if (!query) return []
  let res = index.search(query)
  if (!res.length) res = index.search(query, { combineWith: 'OR' })
  return res
    .slice(0, limit)
    .map((r) => byKey.get(r.id as string))
    .filter((e): e is WikiEntry => !!e)
}
