import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useAnimate } from 'framer-motion'

const TRANSITION = { duration: 0.4, ease: [0.22, 1, 0.36, 1] }

/*
  A thumbnail that opens fullscreen, morphing between the two.

  This used to lean on Framer Motion's automatic `layoutId` crossfade (one
  `layoutId` shared between the thumbnail and a fullscreen copy). That looked
  right on open but not on close: because the thumbnail never unmounts, the
  crossfade path treats every close as two coexisting instances, and its
  built-in opacity crossfade finishes on its own fast schedule while the
  size/position tween settles far more slowly (and independently of whatever
  `transition` was passed in) — so the fullscreen image faded to invisible
  while still close to full size, and the small thumbnail underneath was
  simply revealed. What looked like a "shrink" was really a fade.

  This version drives the morph by hand instead: measure the thumbnail's and
  the fullscreen image's rects, express the gap as a translate+scale, and
  imperatively animate between that offset and identity with `useAnimate`.
  One tween, one clock, same easing both directions.
*/
function computeOrigin(thumbEl, fullEl) {
  const thumb = thumbEl.getBoundingClientRect()
  const full = fullEl.getBoundingClientRect()
  const scale = Math.min(thumb.width / full.width, thumb.height / full.height)
  return {
    x: thumb.left + thumb.width / 2 - (full.left + full.width / 2),
    y: thumb.top + thumb.height / 2 - (full.top + full.height / 2),
    scale,
  }
}

export default function ImageZoom({ src, alt, className = '' }) {
  const [open, setOpen] = useState(false)
  const thumbRef = useRef(null)
  const [scope, animate] = useAnimate()
  const previousOverflow = useRef('')
  const closingRef = useRef(false)

  const close = () => {
    if (closingRef.current || !scope.current) return
    closingRef.current = true

    const origin = computeOrigin(thumbRef.current, scope.current.querySelector('img'))
    Promise.all([
      animate(scope.current, { opacity: 0 }, TRANSITION),
      animate(
        scope.current.querySelector('img'),
        { x: origin.x, y: origin.y, scale: origin.scale },
        TRANSITION,
      ),
    ]).then(() => {
      document.body.style.overflow = previousOverflow.current
      closingRef.current = false
      setOpen(false)
    })
  }

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
    }

    previousOverflow.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useLayoutEffect(() => {
    if (!open || !scope.current) return

    const img = scope.current.querySelector('img')
    const origin = computeOrigin(thumbRef.current, img)
    animate(scope.current, { opacity: 1 }, TRANSITION)
    // Explicit [from, to] keyframes rather than a separate duration:0 "snap"
    // animate() call first: two animate() calls on the same values back to
    // back race (the second can start before the first's instant set has
    // taken effect), which silently no-oped the grow every time.
    animate(img, { x: [origin.x, 0], y: [origin.y, 0], scale: [origin.scale, 1] }, TRANSITION)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <>
      <img
        ref={thumbRef}
        src={src}
        alt={alt}
        onClick={() => setOpen(true)}
        className={`cursor-pointer rounded-lg bg-white object-cover shadow-md transition hover:shadow-xl ${className}`}
      />

      {open && (
        <div
          ref={scope}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={close}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/75 p-4 opacity-0"
        >
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg bg-white object-contain"
          />
        </div>
      )}
    </>
  )
}
