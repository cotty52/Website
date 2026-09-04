# Website Redesign Project Plan

## Project Overview
The goal is to redesign my portfolio website to better showcase my work and improve user experience. It will be re-created from scratch using modern frameworks and tools. The redesign also serves as a way to learn modern web development.

The original site (`old-reference/`) is read-only reference material — use it to understand intended behavior before building the React equivalent.

---

## Tech Stack

| Tool | Role |
|---|---|
| **React 18** | UI framework |
| **Vite** | Build tool + dev server |
| **Tailwind CSS** | Utility-first styling |
| **DaisyUI** | Tailwind component library |
| **React Router v6** | Client-side routing |
| **Framer Motion** | Animations |
| **tsParticles** (`@tsparticles/react` + `@tsparticles/slim`) | Particle background |

---

## Feature Checklist

### Foundation
- [x] Create `.github/copilot-instructions.md` agent file
- [ ] Bootstrap Vite + React project (`portfolio/`)
- [ ] Install all dependencies
- [ ] Configure Tailwind CSS + DaisyUI
- [ ] Set up `src/` folder structure

### Layout Shell (persistent across all pages)
- [ ] `Header.jsx` — portrait, name/title, LinkedIn + GitHub buttons
- [ ] `NavBar.jsx` — 3-tab nav with Framer Motion animated sliding pill
- [ ] `Footer.jsx` — copyright, social icons, blue decorative line
- [ ] `ParticlesBackground.jsx` — fixed full-screen particle animation

### Reusable UI Components
- [ ] `ProjectCard.jsx` — card wrapper with DaisyUI + hover shadow/scale
- [ ] `ImageSlider.jsx` — prev/next arrows, dot navigation, Framer Motion transitions
- [ ] `ImageZoom.jsx` — lightbox overlay with Framer Motion scale animation
- [ ] `MoreLessText.jsx` — 2-line clamp with show/hide toggle

### Pages
- [ ] `Home.jsx` — intro paragraph, Grand Canyon + Blender donut image sections
- [ ] `Coding.jsx` — intro, Idle Bounce Screen (video), Senior Project (static image)
- [ ] `Designs.jsx` — intro, BOTTY (3 imgs), Formula SAE (4 imgs + link), Arduino Simon Says (4 imgs + 1 video)

### Polish
- [ ] Responsive layout (`sm:` / `md:` breakpoints)
- [ ] Copy images/videos from `Images/` and `Extra_Images/` into `portfolio/src/assets/`
- [ ] Production build passes (`npm run build`)
- [ ] Deploy

---

## Design Conventions

- **Accent color**: `#6699cc` (soft blue) — add as a custom Tailwind color (`brand: '#6699cc'`) via the CSS `@theme` block (Tailwind v4 is CSS-first, no `tailwind.config.js`)
- **Border radius**: generous — `2rem` on project cards (`rounded-3xl` in Tailwind)
- **Shadows**: Tailwind's shadow scale (`shadow-md`, `shadow-xl`) + `hover:shadow-2xl` for hover elevation
- **Transitions**: all interactive elements get `transition` with `duration-200` or `duration-300`
- **Typography**: no custom font yet — Tailwind's default sans stack
- **daisyUI theme**: start with `"light"`, can be changed later

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
