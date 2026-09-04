import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/*
  GitHub Pages serves this repo as a *project* site, so the built site lives
  under https://cotty52.github.io/Website/ rather than at the domain root.
  `base` makes Vite emit asset URLs with that prefix, and it is exposed to the
  app as import.meta.env.BASE_URL, which App.jsx hands to the router as its
  basename — so routing follows the same setting automatically.

  Only the production build gets the prefix; `npm run dev` stays at the root.
  Override for a root deployment (custom domain, or a repo renamed to
  cotty52.github.io):  VITE_BASE=/ npm run build
*/
export default defineConfig(({ command }) => ({
  base: process.env.VITE_BASE ?? (command === 'build' ? '/Website/' : '/'),
  plugins: [
    react(),
    tailwindcss(),  // processes Tailwind CSS at build time (replaces postcss approach from v3)
  ],
}))
