import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    // Build config files run in Node, not the browser, so they need Node
    // globals (`process`) rather than the browser set applied below.
    files: ['*.config.js'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // The pattern exempts JSX components, which are capitalized by convention.
      // `motion` breaks that convention: it is only ever used as a namespace
      // (`motion.div`), and core ESLint does not treat a JSX member expression
      // as a reference, so it reads as unused. Adding eslint-plugin-react for
      // its `jsx-uses-vars` rule would fix this properly, at the cost of a new
      // dependency; naming the one exception is cheaper.
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]|^motion$' }],
    },
  },
])
