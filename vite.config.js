import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // './' makes every path relative, so the build works on GitHub Pages under /repo-name/ too.
  base: './',
  plugins: [react()],
});
