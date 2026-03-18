import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Ensures Cloudflare finds the right folder
    outDir: 'dist', 
    // Generates a source map for easier debugging in production
    sourcemap: true,
  }
})