import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/*
  The site is served from the root of the custom domain (christian-otty.com),
  so `base` is '/'. Vite uses it as the prefix for asset URLs and exposes it as
  import.meta.env.BASE_URL, which App.jsx hands to the router as its basename —
  so routing follows the same setting automatically.

  Override only if you ever serve from a sub-path again (e.g. the default
  cotty52.github.io/Website/ project URL):  VITE_BASE=/Website/ npm run build
*/
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [
    react(),
    tailwindcss(),  // processes Tailwind CSS at build time (replaces postcss approach from v3)
  ],
})
