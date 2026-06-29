import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import { readFileSync } from 'fs';

// HTTPS dev optionnel (cf. scripts/gen-cert.sh) : si HTTPS_KEY/HTTPS_CERT sont définis,
// Vite sert en HTTPS → l'origine (https://IP-LAN:5173) est un secure context, donc
// WebCrypto/IndexedDB chiffrent la clé Mistral même sur tablette. Le backend Express
// passe aussi en HTTPS (mêmes env) → proxy en https + secure:false (cert local).
// Sans ces env : HTTP (localhost reste un secure context). Cf. CLAUDE.md.
const httpsKey = process.env.HTTPS_KEY;
const httpsCert = process.env.HTTPS_CERT;
const httpsOpts =
  httpsKey && httpsCert
    ? {
        // nosemgrep
        key: readFileSync(httpsKey),
        // nosemgrep
        cert: readFileSync(httpsCert),
      }
    : undefined;
const proxyTarget = httpsOpts ? 'https://localhost:3000' : 'http://localhost:3000';

export default defineConfig({
  plugins: [tailwindcss(), handlebars({ partialDirectory: resolve(__dirname, 'src/partials') })],
  root: 'src',
  resolve: { alias: { '@helpers': resolve(__dirname, 'helpers') } },
  publicDir: resolve(__dirname, 'public/assets'),
  build: { outDir: '../dist' },
  server: {
    port: 5173,
    ...(httpsOpts && { https: httpsOpts }),
    proxy: {
      '/api': { target: proxyTarget, secure: false },
      '/output': { target: proxyTarget, secure: false },
    },
  },
});
