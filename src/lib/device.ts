import { useEffect, useState } from 'react'

function useMedia(query: string): boolean {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    mq.addEventListener('change', on)
    on()
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}

/** True on phones / narrow windows: switches to bottom tab bar layout. */
export const useIsMobile = () => useMedia('(max-width: 760px)')

/**
 * True when the primary pointer can hover (mouse / trackpad).
 * Tooltips open on hover there; on touch devices a tap opens a popover
 * with an explicit "Open in wiki" button instead of navigating directly.
 */
export const useCanHover = () => useMedia('(hover: hover) and (pointer: fine)')
