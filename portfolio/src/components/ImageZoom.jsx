import { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/*
  A thumbnail that opens fullscreen. The thumbnail and the zoomed image share a
  layoutId, so Framer Motion morphs one into the other.

  The original moved the real <img> node into document.body and left a sized
  placeholder div behind so the layout would not collapse. Here the thumbnail
  never leaves the DOM — Framer Motion animates a projection of it — so there
  is no DOM surgery, no placeholder, and no stuck body overflow.
*/
export default function ImageZoom({ src, alt, className = '' }) {
  const [open, setOpen] = useState(false)
  const layoutId = useId()

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <motion.img
        layoutId={layoutId}
        src={src}
        alt={alt}
        onClick={() => setOpen(true)}
        className={`cursor-pointer rounded-lg object-cover shadow-md transition hover:shadow-xl ${className}`}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/75 p-4"
          >
            <motion.img
              layoutId={layoutId}
              src={src}
              alt={alt}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
