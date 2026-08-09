import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/pomodoro/test-setup.ts'],
    // Scope to this project's own src/ — AIPomodaro/ is the old standalone
    // app kept around for reference and has its own separate test setup.
    include: ['src/**/*.test.ts'],
  },
})
