# Website Redesign Project Plan

## Project Overview
The goal is to redesign my portfolio website to better showcase my work and improve user experience. It will be re-created from scratch using modern frameworks and tools. The redesign also serves as a way to learn modern web development.

The original site (`old-reference/`) is read-only reference material — use it to understand intended behavior before building the React equivalent.

---

## Tech Stack

| Tool | Role |
|---|---|
| **React 19** | UI framework |
| **Vite** | Build tool + dev server |
| **Tailwind CSS v4** | Utility-first styling (CSS-first config) |
| **daisyUI 5** | Tailwind component library |
| **React Router v7** | Client-side routing |
| **Framer Motion** | Animations |
| **tsParticles** (`@tsparticles/react` + `@tsparticles/slim`) | Particle background |

---

## Feature Checklist

### Foundation
- [x] Create `.github/copilot-instructions.md` agent file
- [x] Bootstrap Vite + React project (`portfolio/`)
- [x] Install all dependencies
- [x] Configure Tailwind CSS + daisyUI (custom `mytheme`, brand blue as `--color-primary`)
- [x] Set up `src/` folder structure

### Layout Shell (persistent across all pages)
- [x] `Header.jsx` — portrait, name/title, LinkedIn + GitHub buttons
- [x] `NavBar.jsx` — 3-tab nav with Framer Motion animated sliding pill
- [x] `Footer.jsx` — copyright, social icons, blue decorative line
- [x] `ParticlesBackground.jsx` — fixed full-screen particle animation

### Reusable UI Components
- [x] `ProjectCard.jsx` — daisyUI `card` + hover shadow
- [x] `ImageSlider.jsx` — prev/next arrows, dot navigation, Framer Motion transitions
- [x] `ImageZoom.jsx` — lightbox overlay, shared-element `layoutId`, Escape + backdrop close
- [x] `MoreLessText.jsx` — 2-line clamp with show/hide toggle

### Pages
- [x] `Home.jsx` — intro paragraph, Grand Canyon + Blender donut image sections
- [x] `Coding.jsx` — intro, Idle Bounce Screen (video), Senior Project (static image)
- [x] `Designs.jsx` — intro, BOTTY (3 imgs), Formula SAE (4 imgs + link), Arduino Simon Says (4 imgs + 1 video)

### Polish
- [x] Responsive layout (`md:` breakpoints; verified at 375px)
- [x] Copy images/videos from `Images/` into `portfolio/src/assets/`
- [x] Production build passes (`npm run build`) — lint clean too
- [ ] Deploy

---

## Design Conventions

- **Accent color**: `#6699cc` (soft blue) — add as a custom Tailwind color (`brand: '#6699cc'`) via the CSS `@theme` block (Tailwind v4 is CSS-first, no `tailwind.config.js`)
- **Border radius**: generous — `2rem` on project cards (`rounded-3xl` in Tailwind)
- **Shadows**: Tailwind's shadow scale (`shadow-md`, `shadow-xl`) + `hover:shadow-2xl` for hover elevation
- **Transitions**: all interactive elements get `transition` with `duration-200` or `duration-300`
- **Typography**: no custom font yet — Tailwind's default sans stack
- **daisyUI theme**: custom `mytheme` declared via `@plugin "daisyui/theme"` in `index.css`.
  `--color-primary: #6699cc` so every daisyUI component inherits the brand blue;
  `--radius-box: 1.5rem` gives project cards their rounding without per-card utilities

---

## Original Site — Feature Mapping

Reference implementation lives in `old-reference/` (read-only). Use it to understand intended behavior before building the React equivalent.

| Feature | Original implementation | React equivalent |
|---|---|---|
| Animated nav pill | Manual `translateX` calc in JS | Framer Motion `layoutId` on the pill |
| Page navigation | `fetch()` + `innerHTML` injection | React Router `<Routes>` + `<Link>` |
| Image slider | OOP `Slider` class with CSS `@keyframes` | `ImageSlider.jsx` with Framer Motion `AnimatePresence` |
| Image zoom overlay | DOM manipulation, `z-index` overlay | `ImageZoom.jsx` with Framer Motion scale animation |
| More/Less text clamp | `-webkit-line-clamp` + overflow check | `MoreLessText.jsx` with `useRef` + `ResizeObserver` |
| Particles background | `particles.js` + JSON config | `ParticlesBackground.jsx` via `@tsparticles/react` |
| Responsive layout | Raw `@media` queries in CSS | Tailwind responsive prefixes (`sm:`, `md:`) |

---

## Pages and Content

### `/` — Home
- Intro paragraph about Christian (senior Computer Engineering student, Binghamton University, May 2026 graduation)
- Two image+caption sections: Grand Canyon photo (national parks trip) and Blender 3D donut render

### `/coding` — Coding Projects
- Intro paragraph about project stack (Python primary, Java/C; internship with SQL, PowerShell, .NET 6 Razor Pages)
- Project: **Idle Bounce Screen** — Python bouncing image script; has a demo video (16:9 container)
- Project: **Senior Project — Solar Power Station Display** — ESP32 SPI display for battery stats; static image

### `/designs` — Design Projects
- Intro paragraph about creative/physical design work
- Project: **BOTTY** — 3D-printed battlebot; 3-image carousel
- Project: **Formula SAE** — race car, CAD + welding; 4-image carousel; external link
- Project: **Arduino Simon Says** — alien-themed Simon Says device; 4 images + 1 video carousel

> Note: the `fixing` git branch (unmerged) restructured the old vanilla site into `projects.html`/`contact.html`/`formula.html`/`senior-project.html` with more content than what's captured above — worth mining for copy/details when fleshing out these pages.

---

## Draft status (first full pass)

All three pages are built and browsable. Copy is verbatim from `old-reference/`;
styling is daisyUI-based rather than a port of `old-reference/style.css`.

Known follow-ups:
- **SPA routing on GitHub Pages — done.** Pages has no rewrite rules, so
  `npm run build` also writes `dist/404.html` as a copy of `index.html`; Pages
  serves it for any unmatched path and the SPA boots and reads the real
  `location.pathname`. Note the HTTP status on a deep link is 404 even though
  the page renders correctly — fine for a portfolio, but it does mean crawlers
  see a 404 for `/Website/designs`.
- **Project-site sub-path.** The repo is `cotty52/Website`, so Pages serves it
  at `cotty52.github.io/Website/`. `vite.config.js` sets `base` to `/Website/`
  for production builds only (dev stays at the root), and `App.jsx` passes
  `import.meta.env.BASE_URL` to `BrowserRouter` as its basename so routing
  follows the same setting. For a custom domain or a repo renamed to
  `cotty52.github.io`, build with `VITE_BASE=/ npm run build`.
- **Still to do for deploy:** a GitHub Actions workflow to build and publish
  `dist/` to Pages (nothing exists in `.github/` yet).
- **Asset weight.** `Arduino_Video.mp4` is 33 MB and `Poster.png` 4.5 MB, which
  dominate the build. Worth compressing before deploying.
- **Bundle size.** The JS chunk is ~513 KB (161 KB gzipped), mostly tsParticles
  and Framer Motion. Fine for now; code-splitting the particles is the easy win.
- Not yet done: mining the `fixing` branch for expanded copy, the Contact page,
  and the deploy workflow.
