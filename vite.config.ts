import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Base public path when served in production
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    // Add this:
    environmentOptions: {
      jsdom: {
        pretendToBeVisual: true,
        url: 'http://localhost:3000/',
      }
    }
  },
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
