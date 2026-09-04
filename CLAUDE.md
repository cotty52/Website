# Christian's Portfolio — Agent Instructions

## Project
Rebuilding the original vanilla HTML/CSS/JS portfolio (`old-reference/`) as a React app (`portfolio/`). Also a learning project for modern web dev — explain the *why* behind non-trivial decisions, not just the *what*, and flag opinionated choices vs. universal best practices.

## Rules
- Never modify `old-reference/` — it's read-only reference for the original site's intended behavior.
- Run all npm commands from `portfolio/` (`cd portfolio && npm run dev`).
- Functional components + hooks only, no class components.
- Prefer Tailwind utility classes over inline `style={{}}`.
- Don't add new dependencies without explaining why the existing stack can't do it.
- Tailwind v4 is CSS-first — no `tailwind.config.js`; config lives in the CSS `@import`/`@plugin` directives.

## Stack
React 19 · Vite · Tailwind CSS v4 · daisyUI 5 · React Router v7 · Framer Motion · tsParticles (`@tsparticles/react` + `@tsparticles/slim`)

## Reference docs
- `portfolio/daisyUI-llms.txt` — daisyUI 5 component/class reference; consult for daisyUI syntax instead of guessing from training data.
- `project-planner.md` — feature checklist, page content/copy, design conventions, and the original-site-to-React feature mapping. Keep it updated as work lands.
