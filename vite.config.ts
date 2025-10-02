import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',

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
