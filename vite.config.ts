import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    __BUILD_YEAR__: JSON.stringify(process.env.BUILD_YEAR || new Date().getFullYear().toString()),
  },
  resolve: {
    alias: {
      '~bootstrap': 'bootstrap',
    },
  },
})
