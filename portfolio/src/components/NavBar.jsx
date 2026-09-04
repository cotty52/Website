import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const TABS = [
  { to: '/home', label: 'Home' },
  { to: '/designs', label: 'Designs' },
  { to: '/coding', label: 'Coding' },
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
  return (
    <div className="sticky top-0 z-20 flex w-full justify-center bg-primary p-3 shadow-md">
      <div role="tablist" className="tabs rounded-full bg-base-300 p-1">
        {TABS.map(({ to, label }) => (
          <NavLink key={to} to={to} role="tab" className="tab relative w-20 md:w-24">
            {({ isActive }) => (
              <>
                {/*
                  One motion.span shared across tabs via layoutId: Framer Motion
                  measures the old and new positions itself and interpolates.
                  The original had to read offsetWidth and a CSS gap variable,
                  multiply by the tab index, and redo it on every resize.
                */}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-primary shadow"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    isActive
                      ? 'font-medium text-primary-content'
                      : 'text-base-content/70 hover:text-base-content'
                  }`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
