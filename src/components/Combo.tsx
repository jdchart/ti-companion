/** Searchable picker used by the plan editor (planets, techs, objectives…). */
import { useMemo, useRef, useState, type ReactNode } from 'react'

export interface ComboOption {
  value: string
  label: string
  hint?: ReactNode
  search?: string
}

const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export function Combo({
  options,
  placeholder,
  onPick,
}: {
  options: ComboOption[]
  placeholder: string
  onPick: (value: string) => void
}) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [sel, setSel] = useState(0)
  const ref = useRef<HTMLInputElement>(null)
  const list = useMemo(() => {
    const f = fold(q.trim())
    const r = f ? options.filter((o) => fold(o.label + ' ' + (o.search ?? '')).includes(f)) : options
    return r.slice(0, 60)
  }, [q, options])

  const pick = (o?: ComboOption) => {
    if (!o) return
    onPick(o.value)
    setQ('')
    setSel(0)
    ref.current?.focus()
  }

  return (
    <div className="combo">
      <input
        ref={ref}
        className="input"
        placeholder={placeholder}
        value={q}
        onChange={(e) => {
          setQ(e.target.value)
          setSel(0)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSel((s) => Math.min(s + 1, list.length - 1))
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSel((s) => Math.max(0, s - 1))
          } else if (e.key === 'Enter') {
            e.preventDefault()
            pick(list[sel])
          } else if (e.key === 'Escape') setOpen(false)
        }}
      />
      {open && list.length > 0 && (
        <div className="combo-list" role="listbox">
          {list.map((o, i) => (
            <button
              key={o.value}
              type="button"
              className={i === sel ? 'sel' : ''}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pick(o)}
            >
              <span className="grow">{o.label}</span>
              {o.hint}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
