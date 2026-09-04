import { useEffect, useRef, useState } from 'react'

/*
  Clamps its children to two lines and only offers a More/Less toggle when the
  text actually overflows.

  The original computed a max height from CSS custom properties
  (--lineHeight * --linesShown * root font size) and compared offsetHeight
  against it — which silently breaks if the font or line height changes.
  Observing the element itself is self-correcting and re-fires on resize,
  which also removes the need for the old debounced window resize listener.
*/
export default function MoreLessText({ children }) {
  const ref = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const [overflowing, setOverflowing] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const check = () => {
      // Only measurable while the clamp is applied; once we know it overflows
      // the answer stays true, so expanding does not hide the Less button.
      if (expanded) return
      setOverflowing(el.scrollHeight > el.clientHeight + 1)
    }

    check()
    const observer = new ResizeObserver(check)
    observer.observe(el)
    return () => observer.disconnect()
  }, [expanded])

  return (
    <div>
      <p ref={ref} className={expanded ? undefined : 'line-clamp-2'}>
        {children}
      </p>
      {overflowing && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="btn btn-xs btn-outline mt-2 text-primary-content"
        >
          {expanded ? 'Less' : 'More'}
        </button>
      )}
    </div>
  )
}
