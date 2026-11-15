import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base: './'` keeps asset paths relative so the build works on GitHub Pages
// (e.g. https://shrutigautam27.github.io/portfolio/) as well as at a root domain.
export default defineConfig({
  base: './',
  plugins: [react()],
})
