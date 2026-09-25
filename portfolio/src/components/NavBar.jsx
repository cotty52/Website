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

  // end: false mirrors NavLink's own matching, so /projects/formula keeps the
  // pill on Projects.
  const activeIndex = TABS.findIndex(({ to }) => matchPath({ path: to, end: false }, pathname))

  return (
    <div className="sticky top-0 z-20 flex w-full justify-center bg-primary p-3 shadow-md shadow-black/20 dark:shadow-black/50">
      <div
        role="tablist"
        className="tabs relative rounded-full bg-base-300 p-1 shadow-[inset_0_2px_5px_0_rgba(0,0,0,0.18)]"
      >
        {/*
          One persistent pill that only ever animates `x`. A percentage
          translate is relative to the pill's own width — one tab, since tabs
          are fixed-width and daisyUI's `tabs` has no gap — so index * 100%
          lands on the right tab at every breakpoint with nothing measured.

          This replaced a layoutId pill that remounted inside the active tab.
          Framer measures layoutId handoffs in page coordinates, and the nav is
          sticky: scrolled down, it sits at page Y ~1500, then lands back at
          ~350 when the next page resets scroll, so the pill flew up from below
          to meet it. (layoutRoot doesn't help — it's skipped for layoutId
          handoffs.) Trade-off: this relies on equal-width tabs.

          initial={false} places it without animating on first load.
        */}
        {activeIndex !== -1 && (
          <motion.span
            aria-hidden
            initial={false}
            animate={{ x: `${activeIndex * 100}%` }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="absolute inset-y-1 left-1 w-20 rounded-full bg-primary shadow shadow-black/25 md:w-24 dark:shadow-black/55"
          />
        )}
        {TABS.map(({ to, label }) => (
          <NavLink key={to} to={to} role="tab" className="tab w-20 md:w-24">
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
