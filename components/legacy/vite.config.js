import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const rootDirectory = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: path.resolve(rootDirectory, 'app'),
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000',
      '/health': 'http://localhost:3000',
      '/webhooks': 'http://localhost:3000'
    }
  },
  build: {
    emptyOutDir: true,
    outDir: path.resolve(rootDirectory, 'public')
  }
});
