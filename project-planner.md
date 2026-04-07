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
