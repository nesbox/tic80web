import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

// Get the current git commit hash
const getCommitHash = () => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim()
  } catch (error) {
    console.warn('Could not get git commit hash, using fallback')
    return 'unknown'
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    __BUILD_YEAR__: JSON.stringify(process.env.BUILD_YEAR || new Date().getFullYear().toString()),
    __COMMIT_HASH__: JSON.stringify(getCommitHash()),
  },
  resolve: {
    alias: {
      '~bootstrap': 'bootstrap',
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
  }
})
