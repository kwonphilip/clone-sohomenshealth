import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Base public path when deployed to GitHub Pages at /clone-testsite/.
  // Vite injects this into all asset URLs at build time so CSS, JS,
  // and images load correctly from the subdirectory.
  base: '/clone-testsite/',

  build: {
    // Match the CRA default so `gh-pages -d build` still works unchanged.
    outDir: 'build',
  },
});
