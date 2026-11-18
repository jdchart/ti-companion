/**
 * <Term> — an inline keyword linked to a wiki entry.
 *
 * Desktop (hover-capable pointer): hovering shows a tooltip with the
 * entry's short summary; clicking navigates to the wiki page.
 * Touch: tapping opens a bottom sheet with the summary and an explicit
 * "Open in wiki" button (so a tap never navigates away unexpectedly).
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { entryPath, resolveRef, type WikiEntry } from '../wiki/registry'
import { useI18n } from '../i18n/i18n'
import { useCanHover } from '../lib/device'
import { RichText } from './RichText'
import { Icon } from './Icon'

export function Term({ to, children }: { to: string; children?: ReactNode }) {
  if (to.startsWith('kind:')) return <KindLink kind={to.slice(5)}>{children}</KindLink>
  return <EntryTerm to={to}>{children}</EntryTerm>
}

/** [[kind:tech|label]] → link to a wiki category listing (no tooltip). */
function KindLink({ kind, children }: { kind: string; children?: ReactNode }) {
  const { t } = useI18n()
  return (
    <Link className="term" to={`/wiki?kind=${kind}`}>
      {children ?? t(`kinds_${kind}` as 'kinds_concept')}
    </Link>
  )
}

function EntryTerm({ to, children }: { to: string; children?: ReactNode }) {
  const entry = resolveRef(to)
  const { l } = useI18n()
  const canHover = useCanHover()
  const navigate = useNavigate()
  const ref = useRef<HTMLAnchorElement>(null)
  const [open, setOpen] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const label = children ?? (entry ? l(entry.title) : to)
  if (!entry) {
    if (import.meta.env.DEV) console.warn('[Term] unknown wiki ref:', to)
    return <span className="term missing">{label}</span>
  }

  const show = () => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOpen(true), 180)
  }
  const hide = () => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOpen(false), 120)
  }

  return (
    <>
      <Link
        ref={ref}
        to={entryPath(entry)}
        className="term"
        onMouseEnter={canHover ? show : undefined}
        onMouseLeave={canHover ? hide : undefined}
        onFocus={canHover ? show : undefined}
        onBlur={canHover ? hide : undefined}
        onClick={(e) => {
          if (!canHover) {
            e.preventDefault()
            setOpen(true)
          } else {
            setOpen(false)
          }
        }}
      >
        {label}
      </Link>
      {open && (
        <TermPopup
          entry={entry}
          anchor={ref.current}
          sheet={!canHover}
          onEnter={() => window.clearTimeout(timer.current)}
          onLeave={hide}
          onClose={() => setOpen(false)}
          onOpen={() => {
            setOpen(false)
            navigate(entryPath(entry))
          }}
        />
      )}
    </>
  )
}

function TermPopup({
  entry,
  anchor,
  sheet,
  onEnter,
  onLeave,
  onClose,
  onOpen,
}: {
  entry: WikiEntry
  anchor: HTMLElement | null
  sheet: boolean
  onEnter: () => void
  onLeave: () => void
  onClose: () => void
  onOpen: () => void
}) {
  const { l, t } = useI18n()
  const tipRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null)

  const place = useCallback(() => {
    if (sheet || !anchor || !tipRef.current) return
    const a = anchor.getBoundingClientRect()
    const tip = tipRef.current.getBoundingClientRect()
    const margin = 8
    let left = a.left + a.width / 2 - tip.width / 2
    left = Math.max(margin, Math.min(left, window.innerWidth - tip.width - margin))
    let top = a.bottom + 6
    if (top + tip.height > window.innerHeight - margin) top = a.top - tip.height - 6
    setPos({ left, top: Math.max(margin, top) })
  }, [anchor, sheet])

  useLayoutEffect(place, [place])
  useEffect(() => {
    if (sheet) {
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
    window.addEventListener('scroll', onClose, { passive: true, once: true })
    return () => window.removeEventListener('scroll', onClose)
  }, [sheet, onClose])

  const body = (
    <div
      ref={tipRef}
      className={`tip${sheet ? ' sheet' : ''}`}
      role="tooltip"
      style={sheet ? undefined : { left: pos?.left ?? -9999, top: pos?.top ?? -9999 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="tip-head">
        <span className="tip-title">{l(entry.title)}</span>
        <span className="tip-kind">{t(`kind_${entry.kind}`)}</span>
      </div>
      {/* No nested tooltips inside a tooltip: render links as plain text. */}
      <RichText text={l(entry.summary)} plain />
      {sheet ? (
        <div className="row">
          <button className="btn primary grow" onClick={onOpen}>
            <Icon name="book" /> {t('openInWiki')}
          </button>
          <button className="btn" onClick={onClose}>
            {t('close')}
          </button>
        </div>
      ) : (
        <div className="tip-foot">{t('openInWiki')} ↵ click</div>
      )}
    </div>
  )

  return createPortal(
    sheet ? (
      <>
        <div className="sheet-backdrop" onClick={onClose} />
        {body}
      </>
    ) : (
      body
    ),
    document.body,
  )
}
