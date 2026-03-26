import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
  plugins: [tailwindcss(), handlebars({ partialDirectory: resolve(__dirname, 'src/partials') })],
  root: 'src',
  resolve: { alias: { '@helpers': resolve(__dirname, 'helpers') } },
  publicDir: resolve(__dirname, 'public/assets'),
  build: { outDir: '../dist' },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000',
      '/output': 'http://localhost:3000',
    },
  },
});
