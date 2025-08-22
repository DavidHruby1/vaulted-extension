import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true, // Clear dist/ before each build
    rollupOptions: {
      input: {
        // HTML entry point for React sidepanel
        sidepanel: 'sidepanel.html',
        
        // Background script (runs in Chrome background)
        background: 'src/background.ts',
        
        // Content script (injected into web pages)
        content: 'src/content/content.ts',
      },
      output: {
        // Main files (background.js, content.js, sidepanel.js) - directly in dist/
        entryFileNames: '[name].js',
        
        // Automatically split chunks (React chunks) - in assets/ for organization  
        chunkFileNames: 'assets/[name]-[hash].js',
        
        // CSS, images, fonts - in assets/
        assetFileNames: 'assets/[name][extname]'
      }
    }
  }
});