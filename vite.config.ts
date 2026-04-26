import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base must match the GitHub Pages repo sub-path: punit461.github.io/toolzonex/
// If you ever move to a custom domain (toolzonex.com), change this back to '/'.
export default defineConfig({
  plugins: [react()],
  base: '/toolzonex/',
})
