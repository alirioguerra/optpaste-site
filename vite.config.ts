import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://alirioguerra.github.io/optpaste-site/
export default defineConfig({
  base: '/optpaste-site/',
  plugins: [react()],
})
