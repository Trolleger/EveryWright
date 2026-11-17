import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Builds the React site into site/dist, which is what Cloudflare Pages publishes.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
