import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/*
  `custom` feeds the current direction into the variants so the same set of
  variants covers both directions: a new slide enters from the side you are
  heading towards, and the outgoing one leaves the opposite way.
*/
const variants = {
  enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%' }),
  center: { x: 0 },
  exit: (direction) => ({ x: direction > 0 ? '-100%' : '100%' }),
}

function Media({ item }) {
  if (item.type === 'video') {
    return (
      <video muted loop controls className="h-full w-full object-cover">
        <source src={item.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )
  }
  return <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
}

export default function ImageSlider({ media, aspect = 'aspect-square' }) {
  const [[index, direction], setState] = useState([0, 0])
  const multiple = media.length > 1

  // Modulo wrap so next past the last slide returns to the first.
  const paginate = (step) =>
    setState(([current]) => [(current + step + media.length) % media.length, step])

  const goTo = (target) =>
    setState(([current]) => [target, target > current ? 1 : -1])

  return (
    <div
      className={`relative w-full overflow-hidden rounded-box bg-base-300 ${aspect} ${
        aspect === 'aspect-video' ? '' : 'mx-auto max-w-md'
      }`}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Media item={media[index]} />
        </motion.div>
      </AnimatePresence>

      {multiple && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => paginate(-1)}
            className="btn btn-circle btn-ghost absolute top-1/2 left-1 z-10 -translate-y-1/2 text-white hover:bg-black/60"
          >
            &#10094;
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => paginate(1)}
            className="btn btn-circle btn-ghost absolute top-1/2 right-1 z-10 -translate-y-1/2 text-white hover:bg-black/60"
          >
            &#10095;
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-4">
            {media.map((item, i) => (
              <button
                key={item.src}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`size-2.5 rounded-full bg-white shadow transition-opacity active:scale-90 ${
                  i === index ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
