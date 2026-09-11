import { useLayoutEffect, useRef, useState } from 'react'
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const TABS = [
  { to: '/home', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

/*
  Plain `tabs` rather than `tabs-box`: daisyUI only styles an active tab under
  the tabs-box / tabs-lift / tabs-border variants, and tabs-box would paint its
  own instant pill on [aria-current=page] (which NavLink sets) right over the
  animated one. Without that variant the active indicator is ours alone, so no
  daisyUI internals need overriding — `tab` still supplies the sizing, padding
  and cursor. The container look is two utilities.
*/
export default function NavBar() {
  const { pathname } = useLocation()
  const tabRefs = useRef({})
  const [pill, setPill] = useState(null)

  const activeTo = TABS.find(({ to }) => matchPath({ path: to, end: false }, pathname))?.to

  /*
    Framer Motion's `layoutId` shared-layout animation bakes the window scroll
    offset into its FLIP math, but this pill lives under a `sticky` navbar —
    which doesn't actually move with scroll. Scroll down, click a tab, and
    Motion computes a bogus delta and animates the pill through that scrolled
    distance before landing (a known, unfixed upstream limitation: see
    framer/motion issues #1445, #1535, #1828). Measuring the target tab's
    offsetLeft/offsetTop ourselves sidesteps it entirely — those are relative
    to the nearest positioned ancestor and never change with scroll — and we
    just animate x/width/y/height to it instead of asking Motion to diff DOM
    positions across renders.
  */
  useLayoutEffect(() => {
    const measure = () => {
      const node = activeTo && tabRefs.current[activeTo]
      if (!node) {
        setPill(null)
        return
      }
      setPill({ x: node.offsetLeft, y: node.offsetTop, width: node.offsetWidth, height: node.offsetHeight })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [activeTo])

  return (
    <div className="sticky top-0 z-20 flex w-full justify-center bg-primary p-3 shadow-md shadow-black/20 dark:shadow-black/50">
      <div
        role="tablist"
        className="tabs relative rounded-full bg-base-300 p-1 shadow-[inset_0_2px_5px_0_rgba(0,0,0,0.18)]"
      >
        {pill && (
          <motion.span
            className="absolute top-0 left-0 rounded-full bg-primary shadow shadow-black/25 dark:shadow-black/55"
            animate={{ x: pill.x, y: pill.y, width: pill.width, height: pill.height }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          />
        )}
        {TABS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            role="tab"
            ref={(node) => {
              tabRefs.current[to] = node
            }}
            className="tab relative w-20 md:w-24"
          >
            {({ isActive }) => (
              <span
                className={`relative z-10 transition-colors ${
                  isActive
                    ? 'font-medium text-primary-content'
                    : 'text-base-content hover:text-primary'
                }`}
              >
                {label}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
