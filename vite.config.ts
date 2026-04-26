import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// NOTE: Set 'base' to your GitHub repo name for GitHub Pages.
// If deploying to a custom domain at root, change this to '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
