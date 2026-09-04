import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

/*
  initParticlesEngine registers plugins on a global engine, so it must run once
  per page rather than once per mount — and React 19's StrictMode deliberately
  double-invokes effects in dev. Caching the promise at module scope (outside
  any component instance) means every caller awaits the same initialization,
  and later mounts resolve immediately instead of re-registering.
*/
let enginePromise = null

function startEngine() {
  enginePromise ??= initParticlesEngine((engine) => loadSlim(engine))
  return enginePromise
}

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let active = true
    // setState lands in the promise callback, never synchronously in the
    // effect body, so it cannot trigger a cascading render.
    startEngine().then(() => {
      if (active) setReady(true)
    })
    return () => {
      active = false
    }
  }, [])

  /*
    Ported from old-reference/particlesjs-config.json. tsParticles v3 renamed
    most of the v1 snake_case keys: line_linked -> links, onhover -> onHover,
    out_mode -> outModes, density.value_area -> density.area,
    retina_detect -> detectRetina.
  */
  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      detectRetina: true,
      particles: {
        number: { value: 200, density: { enable: true, area: 1920 } },
        color: { value: '#6699cc' },
        shape: { type: 'circle' },
        opacity: { value: { min: 0.2, max: 1 } },
        size: { value: { min: 0.2, max: 4 } },
        links: {
          enable: true,
          distance: 150,
          color: '#6699cc',
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: false,
          straight: false,
          outModes: { default: 'out' },
        },
      },
      interactivity: {
        detectsOn: 'window',
        events: {
          onHover: { enable: true, mode: 'grab' },
          onClick: { enable: false },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 200, links: { opacity: 0.4 } },
        },
      },
    }),
    [],
  )

  if (!ready) return null

  return (
    <Particles
      id="particles-js"
      options={options}
      className="pointer-events-none fixed inset-0 -z-10"
    />
  )
}
