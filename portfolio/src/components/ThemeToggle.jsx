import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'
const LIGHT = 'mytheme'
const DARK = 'mytheme-dark'

function getInitialTheme() {
  return localStorage.getItem(STORAGE_KEY) === LIGHT ? LIGHT : DARK
}

/*
  daisyUI's `swap swap-rotate` pattern: a hidden checkbox drives which of the
  two SVGs is shown, with the icon itself rotating on toggle. The checked
  state is mirrored to data-theme + localStorage here rather than relying on
  daisyUI's CSS-only `theme-controller` class, since the choice needs to
  survive a reload (index.html reads the same localStorage key before React
  mounts, so there's no flash of the wrong theme).
*/
export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme)
  const isDark = theme === DARK

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return (
    <label className="swap swap-rotate text-base-content shrink-0 cursor-pointer">
      <input
        type="checkbox"
        checked={isDark}
        onChange={() => setTheme(isDark ? LIGHT : DARK)}
        aria-label="Toggle dark mode"
      />
      {/*
        Sun: a filled center circle plus 8 rays, each a 2-unit-long <line> at
        45° increments running from radius 9 to radius 11. Every ray is the
        same length at the same distance from center, so the result is
        symmetric by construction — easier to keep that way than the earlier
        version, which hand-copied one bezier ray per direction and had a
        typo'd endpoint that left the right-hand ray 2 units short.
      */}
      <svg
        className="swap-off size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      </svg>
      {/* Moon: Heroicons' solid "moon" outline — a crescent, so it's not meant to be symmetric. */}
      <svg className="swap-on size-5 fill-current" viewBox="0 0 24 24">
        <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73 8.15 8.15 0 01-8.14-8.1c0-.68.09-1.35.25-2A1 1 0 008 2.36a10.14 10.14 0 1014 11.69 1 1 0 00-.36-1.05z" />
      </svg>
    </label>
  )
}
