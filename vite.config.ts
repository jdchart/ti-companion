import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// `base: './'` keeps asset URLs relative so the build works from any
// GitHub Pages sub-path (https://<user>.github.io/<repo>/). Routing uses
// HashRouter, so no server-side rewrites are needed.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1000 },
})
