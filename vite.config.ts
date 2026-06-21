/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// The base path is configurable so the same build works on GitHub Pages
// (served from /mork-matters/) and on Netlify/Vercel (served from /).
// Set VITE_BASE=/mork-matters/ in the GitHub Pages workflow.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
