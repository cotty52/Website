# Copilot Instructions — Christian's Portfolio Website

## Project Purpose
This is a portfolio website redesign built from scratch. The owner is **new to modern web development** and is using this project as a **hands-on learning vehicle**. The original site used only vanilla HTML, CSS, and JavaScript.

**Your primary goals as an assistant:**
1. Help implement features correctly using modern patterns and best practices.
2. **Explain the "why"** behind every decision — not just what to do, but why it's done that way.
3. Flag when something is an opinionated choice vs. a universal best practice, and briefly explain the tradeoff.
4. Point to relevant official documentation when introducing a new concept.
5. Prefer clear, readable code over clever one-liners — this is a learning environment.
6. When fixing bugs, explain the root cause so the pattern is understood, not just patched.

---

## Tech Stack

| Tool | Role | Why it was chosen |
|---|---|---|
| **React 18** | UI framework | Component model, ecosystem, industry standard |
| **Vite** | Build tool + dev server | Much faster than CRA, modern standard for React apps |
| **Tailwind CSS** | Utility-first styling | Eliminates context-switching between CSS files; responsive via prefixes (`sm:`, `md:`) |
| **DaisyUI** | Tailwind component library | Pre-built accessible components (cards, buttons, etc.) as Tailwind classes |
| **React Router v6** | Client-side routing | Standard routing library; handles `/`, `/coding`, `/designs` routes |
| **Framer Motion** | Animations | Declarative, composable; replaces hand-rolled CSS `@keyframes` + JS timing from original site |
| **tsParticles** (`@tsparticles/react` + `@tsparticles/slim`) | Particle background | Actively maintained successor to the original `particles.js` used on the old site |

All packages are installed in the `portfolio/` subdirectory.

---

## Repository Layout

```
/media/christian/Drive/GitHub/Website/
├── .github/
│   └── copilot-instructions.md   ← this file
├── portfolio/                    ← the Vite + React app (run all npm commands here)
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/           ← Header, NavBar, Footer (persistent across all pages)
│   │   │   └── ui/               ← ProjectCard, ImageSlider, ImageZoom, MoreLessText
│   │   ├── pages/                ← Home, Coding, Designs
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── videos/
│   │   ├── hooks/                ← custom React hooks (e.g. useWindowSize)
│   │   ├── App.jsx               ← router + persistent layout
│   │   └── main.jsx              ← entry point
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── project-planner.md            ← feature tracker (keep up to date)
├── old-reference/                ← original site source (read-only reference)
└── Images/ + Extra_Images/       ← original media assets
```

---

## Original Site — Key Features to Recreate

The original site (`old-reference/`) is the reference implementation. Use it to understand the intended behavior of each feature before building it in React.

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

## Design Conventions

- **Accent color**: `#6699cc` (soft blue). Add this as a custom Tailwind color: `brand: '#6699cc'`
- **Border radius**: generous — `2rem` on project cards (`rounded-3xl` in Tailwind)
- **Shadows**: use Tailwind's shadow scale (`shadow-md`, `shadow-xl`) + `hover:shadow-2xl` for hover elevation
- **Transitions**: all interactive elements should have `transition` with `duration-200` or `duration-300`
- **Typography**: no custom font yet — use Tailwind's default sans stack
- **DaisyUI theme**: start with `"light"` theme; can be changed in `tailwind.config.js`

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

---

## Development Workflow

```bash
# start dev server (run from portfolio/ directory)
cd portfolio && npm run dev

# build for production
cd portfolio && npm run build
```

---

## What NOT to Do

- Do not modify anything in `old-reference/` — it is read-only reference material.
- Do not use inline `style={{ }}` for things expressible as Tailwind classes.
- Do not install additional libraries without explaining why they're better than the existing stack.
- Do not use class components — always use functional components with hooks.
