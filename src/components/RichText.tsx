/**
 * Renders the tiny content markup described in src/content/types.ts:
 * paragraphs, "- " bullet lists, **bold**, and [[ref|label]] wiki terms.
 */
import { Fragment, type ReactNode } from 'react'
import { Term } from './Term'
import { resolveRef } from '../wiki/registry'
import { useI18n } from '../i18n/i18n'

const TOKEN = /(\[\[[^\]]+\]\]|\*\*[^*]+\*\*)/g

function Inline({ text, plain }: { text: string; plain?: boolean }) {
  const { l } = useI18n()
  const parts = text.split(TOKEN)
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('[[') && p.endsWith(']]')) {
          const [ref, label] = p.slice(2, -2).split('|')
          if (plain) {
            const e = resolveRef(ref)
            return <strong key={i}>{label ?? (e ? l(e.title) : ref)}</strong>
          }
          return (
            <Term key={i} to={ref}>
              {label}
            </Term>
          )
        }
        if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
        return <Fragment key={i}>{p}</Fragment>
      })}
    </>
  )
}

export function RichText({ text, plain, className }: { text: string; plain?: boolean; className?: string }) {
  if (!text) return null
  const blocks = text.trim().split(/\n\s*\n/)
  const out: ReactNode[] = []
  blocks.forEach((b, bi) => {
    const lines = b.split('\n')
    if (lines.every((ln) => ln.trim().startsWith('- '))) {
      out.push(
        <ul key={bi}>
          {lines.map((ln, li) => (
            <li key={li}>
              <Inline text={ln.trim().slice(2)} plain={plain} />
            </li>
          ))}
        </ul>,
      )
    } else {
      out.push(
        <p key={bi}>
          <Inline text={lines.join(' ')} plain={plain} />
        </p>,
      )
    }
  })
  return <div className={`rich ${className ?? ''}`}>{out}</div>
}
