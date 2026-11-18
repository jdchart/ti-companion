import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchWiki } from '../wiki/search'
import { useExpansions } from '../lib/expansions'
import { entryPath } from '../wiki/registry'
import { useI18n } from '../i18n/i18n'
import { Icon } from './Icon'
import { RichText } from './RichText'

export function SearchBox() {
  const { t, l } = useI18n()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [sel, setSel] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { entryOk } = useExpansions()
  const results = useMemo(() => searchWiki(q, 80).filter(entryOk).slice(0, 25), [q, entryOk])

  // "/" or Ctrl/Cmd+K focuses search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if ((e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') || ((e.metaKey || e.ctrlKey) && e.key === 'k')) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onDown)
    }
  }, [])

  const go = (i: number) => {
    const e = results[i]
    if (!e) return
    navigate(entryPath(e))
    setOpen(false)
    setQ('')
    inputRef.current?.blur()
  }

  return (
    <div className="searchbox" ref={boxRef}>
      <Icon name="search" />
      <input
        ref={inputRef}
        value={q}
        type="search"
        placeholder={t('searchPlaceholder')}
        aria-label={t('search')}
        onChange={(e) => {
          setQ(e.target.value)
          setSel(0)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSel((s) => Math.min(s + 1, results.length - 1))
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSel((s) => Math.max(s - 1, 0))
          } else if (e.key === 'Enter') go(sel)
          else if (e.key === 'Escape') {
            setOpen(false)
            inputRef.current?.blur()
          }
        }}
      />
      {!q && <kbd>/</kbd>}
      {open && q.trim() && (
        <div className="search-results list" role="listbox">
          {results.length === 0 && <div className="list-item faint">{t('noResults')}</div>}
          {results.map((e, i) => (
            <a
              key={e.key}
              href={'#' + entryPath(e)}
              className={`list-item${i === sel ? ' sel' : ''}`}
              onMouseEnter={() => setSel(i)}
              onClick={(ev) => {
                ev.preventDefault()
                go(i)
              }}
            >
              <div className="main">
                <div className="title">{l(e.title)}</div>
                <div className="sub">
                  <RichText text={l(e.summary)} plain />
                </div>
              </div>
              <span className="tag gold">{t(`kind_${e.kind}`)}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
