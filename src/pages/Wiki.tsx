import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useI18n } from '../i18n/i18n'
import { KIND_ORDER, entryPath, resolveRef, wiki, wikiByKey, type WikiEntry } from '../wiki/registry'
import { searchWiki } from '../wiki/search'
import type { WikiKind } from '../content/types'
import { RichText } from '../components/RichText'
import { Term } from '../components/Term'
import { Icon } from '../components/Icon'
import { ExpTag, PlanetValues, TechColorTag, TechFacts, UnitStats } from '../components/Facts'
import type { PlanetFact, TechFact, UnitFact } from '../wiki/facts'
import { factionById } from '../wiki/facts'
import { useExpansions } from '../lib/expansions'
import { ConceptArt, PlanetArt, TechArt, UnitArt } from '../components/Illustrations'


const GROUP_ORDER: Record<string, string[]> = {
  concept: ['core', 'round', 'actions', 'combat', 'movement', 'units', 'map', 'economy', 'politics', 'pok'],
  tech: ['biotic', 'propulsion', 'cybernetic', 'warfare', 'unitupgrade', 'none'],
  public: ['stage1', 'stage2'],
  leader: ['agent', 'commander', 'hero'],
}

function groupLabel(kind: WikiKind, g: string, t: ReturnType<typeof useI18n>['t'], lang: string): string {
  if (kind === 'concept') return t(`grp_${g}` as 'grp_core')
  if (kind === 'public') return `${t('stage')} ${g === 'stage1' ? 'I' : 'II'}`
  if (kind === 'leader') return t(g as 'agent')
  const fr: Record<string, string> = {
    biotic: 'Biotique', propulsion: 'Propulsion', cybernetic: 'Cybernétique', warfare: 'Guerre', unitupgrade: 'Améliorations d’unité', none: 'Spéciales',
    law: 'Lois', directive: 'Directives', status: 'Phase de statut', action: 'Phase d’action', agenda: 'Phase d’ordre du jour', any: 'N’importe quand',
    cultural: 'Culturelles', hazardous: 'Hostiles', industrial: 'Industrielles', frontier: 'Frontière', home: 'Systèmes d’origine',
  }
  const en: Record<string, string> = {
    biotic: 'Biotic', propulsion: 'Propulsion', cybernetic: 'Cybernetic', warfare: 'Warfare', unitupgrade: 'Unit upgrades', none: 'Special',
    law: 'Laws', directive: 'Directives', status: 'Status phase', action: 'Action phase', agenda: 'Agenda phase', any: 'Any time',
    cultural: 'Cultural', hazardous: 'Hazardous', industrial: 'Industrial', frontier: 'Frontier', home: 'Home systems',
  }
  return (lang === 'fr' ? fr : en)[g] ?? g
}

export function WikiIndex() {
  const { t, l, lang } = useI18n()
  const [params, setParams] = useSearchParams()
  const kind = (params.get('kind') as WikiKind) || 'concept'
  const [filter, setFilter] = useState('')
  const { entryOk } = useExpansions()
  const counts = useMemo(
    () => KIND_ORDER.reduce((acc, k) => ({ ...acc, [k]: wiki.filter((e) => e.kind === k && entryOk(e)).length }), {} as Record<WikiKind, number>),
    [entryOk],
  )

  const list = useMemo(() => {
    if (filter.trim()) return searchWiki(filter, 400).filter((e) => e.kind === kind && entryOk(e))
    return wiki.filter((e) => e.kind === kind && entryOk(e))
  }, [kind, filter, entryOk])

  const groups = useMemo(() => {
    const m = new Map<string, WikiEntry[]>()
    for (const e of list) {
      // generic units vs faction units; faction-specific techs grouped by faction
      let g = e.group ?? ''
      if (kind === 'tech' && e.faction) g = 'faction'
      if (kind === 'unit') g = e.faction ? 'faction' : 'generic'
      if (['ability', 'promissory', 'faction'].includes(kind)) g = ''
      if (!m.has(g)) m.set(g, [])
      m.get(g)!.push(e)
    }
    const order = GROUP_ORDER[kind] ?? []
    const sorted = [...m.entries()].sort((a, b) => {
      const ia = order.indexOf(a[0])
      const ib = order.indexOf(b[0])
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a[0].localeCompare(b[0])
    })
    if (!filter.trim()) for (const [, arr] of sorted) arr.sort((a, b) => l(a.title).localeCompare(l(b.title)))
    return sorted
  }, [list, kind, filter, l])

  const label = (g: string) => {
    if (g === 'faction') return lang === 'fr' ? 'De faction' : 'Faction-specific'
    if (g === 'generic') return lang === 'fr' ? 'Unités de base' : 'Standard units'
    return g ? groupLabel(kind, g, t, lang) : ''
  }

  const setKind = (k: WikiKind) => {
    setParams({ kind: k })
    setFilter('')
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <div className="eyebrow">{t('navWiki')}</div>
          <h1>{t(`kinds_${kind}`)}</h1>
        </div>
        <div className="grow" />
        <input
          className="input"
          style={{ maxWidth: 260 }}
          placeholder={t('filter') + '…'}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <nav className="chips" aria-label={t('browse')}>
        {KIND_ORDER.map((k) => (
          <a key={k} href={`#/wiki?kind=${k}`} className={k === kind ? 'active' : ''} onClick={(e) => (e.preventDefault(), setKind(k))}>
            {t(`kinds_${k}`)}
          </a>
        ))}
      </nav>
      <div className="wiki-layout">
        <nav className="wiki-cats" aria-label={t('browse')}>
          {KIND_ORDER.map((k) => (
            <a key={k} href={`#/wiki?kind=${k}`} className={k === kind ? 'active' : ''} onClick={(e) => (e.preventDefault(), setKind(k))}>
              <span>{t(`kinds_${k}`)}</span>
              <span className="n">{counts[k]}</span>
            </a>
          ))}
        </nav>
        <div>
          {kind === 'action' || kind === 'agenda' || kind === 'public' || kind === 'secret' || kind === 'relic' || kind === 'explore' ? (
            <p className="faint">{t('cardNamesNote')}</p>
          ) : null}
          {list.length === 0 && <p className="muted">{t('noResults')}</p>}
          {groups.map(([g, arr]) => (
            <section key={g || 'all'}>
              {label(g) && <div className="group-title">{label(g)}</div>}
              <div className="list">
                {arr.map((e) => (
                  <Link key={e.key} to={entryPath(e)} className="list-item">
                    <div className="main">
                      <div className="title">{l(e.title)}</div>
                      <div className="sub">
                        <RichText text={l(e.summary)} plain />
                      </div>
                    </div>
                    <EntryBadge e={e} />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

function EntryBadge({ e }: { e: WikiEntry }) {
  const { t } = useI18n()
  if (e.kind === 'tech') return <TechColorTag type={(e.fact as TechFact).types[0]} />
  if (e.kind === 'planet') return <PlanetValues p={e.fact as PlanetFact} />
  if (e.kind === 'public') return <span className="tag gold">{(e.fact as { points: number }).points} {t('points')}</span>
  if (e.faction && e.kind !== 'faction') {
    const f = factionById.get(e.faction)
    return f ? <span className="tag">{f.name.replace(/^The /, '')}</span> : null
  }
  if (e.exp && e.exp !== 'base') return <ExpTag exp={e.exp} />
  return null
}

export function WikiEntryPage() {
  const { kind, slug } = useParams()
  const { t, l } = useI18n()
  const navigate = useNavigate()
  const { entryOk } = useExpansions()
  const e = wikiByKey.get(`${kind}:${slug}`)

  if (!e) {
    return (
      <div className="panel">
        <p>{t('noResults')}</p>
        <Link to="/wiki">{t('back')}</Link>
      </div>
    )
  }

  const related = (e.related ?? []).filter((r) => r.startsWith('kind:') || resolveRef(r))
  const siblings = e.faction && e.kind !== 'faction' ? `faction:${e.faction}` : null

  return (
    <article className="stack" style={{ maxWidth: 820 }}>
      <div className="row">
        <button className="btn ghost sm" onClick={() => navigate(-1)}>
          <Icon name="back" /> {t('back')}
        </button>
        <Link className="btn ghost sm" to={`/wiki?kind=${e.kind}`}>
          {t(`kinds_${e.kind}`)}
        </Link>
      </div>
      <div className="panel plated">
        <div className="entry-head">
          <span className="eyebrow">{t(`kind_${e.kind}`)}</span>
          <ExpTag exp={e.exp} />
          {siblings && <Term to={siblings} />}
        </div>
        {!entryOk(e) && (
          <div className="banner" style={{ margin: '6px 0 10px' }}>
            <Icon name="info" />
            <span>
              {t('navSettings')}: {e.needs.map((n) => t(`exp_${n}` as 'exp_base')).join(' + ')} —{' '}
              {l({ en: 'not enabled for your group.', fr: 'non activée(s) pour votre groupe.' })}
            </span>
          </div>
        )}
        {e.kind === 'concept' && <ConceptArt slug={e.slug} />}
        {e.kind === 'planet' && (
          <div className="illu-box square">
            <PlanetArt p={e.fact as PlanetFact} size={150} />
          </div>
        )}
        {e.kind === 'tech' && (
          <div className="illu-box square">
            <TechArt tech={e.fact as TechFact} size={150} />
          </div>
        )}
        {e.kind === 'unit' && (
          <div className="illu-box square">
            <UnitArt type={(e.fact as UnitFact).type} size={150} upgraded={!!(e.fact as UnitFact).requiredTech} label={l(e.title)} />
          </div>
        )}
        <h1>{l(e.title)}</h1>
        <div className="entry-summary">
          <RichText text={l(e.summary)} />
        </div>
        <KindFacts e={e} />
        {e.body && <RichText text={l(e.body)} />}
        {related.length > 0 && (
          <>
            <div className="divider" />
            <div className="row">
              <span className="faint">{t('seeAlso')}:</span>
              {related.map((r) => (
                <Term key={r} to={r} />
              ))}
            </div>
          </>
        )}
      </div>
      {e.kind === 'action' || e.kind === 'agenda' || e.kind === 'public' || e.kind === 'secret' ? (
        <p className="faint">{t('disclaimer')}</p>
      ) : null}
    </article>
  )
}

function KindFacts({ e }: { e: WikiEntry }) {
  const { t, lang } = useI18n()
  const f = e.fact as Record<string, unknown> | undefined
  if (!f) return null
  switch (e.kind) {
    case 'tech':
      return (
        <div style={{ marginBottom: 12 }}>
          <TechFacts tech={f as unknown as TechFact} />
        </div>
      )
    case 'unit':
      return (
        <div style={{ marginBottom: 12 }}>
          <UnitStats u={f as unknown as UnitFact} />
        </div>
      )
    case 'planet': {
      const p = f as unknown as PlanetFact
      return (
        <div className="stats" style={{ marginBottom: 12 }}>
          <div className="stat">
            <div className="k">{t('resources')}</div>
            <div className="v" style={{ color: 'var(--gold)' }}>{p.res}</div>
          </div>
          <div className="stat">
            <div className="k">{t('influence')}</div>
            <div className="v" style={{ color: 'var(--accent)' }}>{p.inf}</div>
          </div>
          {['cultural', 'hazardous', 'industrial'].includes(p.trait) && (
            <div className="stat">
              <div className="k">{t('trait')}</div>
              <div className="v" style={{ fontSize: 15 }}>
                <Term to="planet-traits">{p.trait}</Term>
              </div>
            </div>
          )}
          {p.skip.length > 0 && (
            <div className="stat">
              <div className="k">{t('techSkip')}</div>
              <div className="v">
                {p.skip.map((s) => (
                  <span key={s} className={`dot ${s}`} />
                ))}
              </div>
            </div>
          )}
        </div>
      )
    }
    case 'public':
      return (
        <div className="row" style={{ marginBottom: 12 }}>
          <span className="tag gold">
            {t('stage')} {f.stage === 1 ? 'I' : 'II'} · {String(f.points)} {t('points')}
          </span>
        </div>
      )
    case 'secret':
      return (
        <div className="row" style={{ marginBottom: 12 }}>
          <span className="tag gold">1 {t('points')}</span>
          <span className="tag">
            {t('phase')}: {String(f.phase)}
          </span>
        </div>
      )
    case 'agenda':
      return (
        <div className="row" style={{ marginBottom: 12 }}>
          <Term to={f.type === 'law' ? 'laws' : 'directives'} />
          <span className="tag">{String(f.target)}</span>
        </div>
      )
    case 'action':
      return (
        <div className="row" style={{ marginBottom: 12 }}>
          <span className="tag">
            {t('phase')}: {String(f.phase)}
          </span>
          <span className="tag">
            {t('copies')}: {String(f.copies)}
          </span>
        </div>
      )
    case 'explore':
      return (
        <div className="row" style={{ marginBottom: 12 }}>
          <span className="tag">{String(f.deck)}</span>
          <span className="tag">
            {t('copies')}: {String(f.copies)}
          </span>
        </div>
      )
    case 'leader':
      return (
        <div className="row" style={{ marginBottom: 12 }}>
          <Term to={f.type === 'agent' ? 'agents' : f.type === 'commander' ? 'commanders' : 'heroes'} />
          {lang && null}
        </div>
      )
    default:
      return null
  }
}
