import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import { readFile } from 'fs/promises';

// HTTPS dev optionnel (cf. scripts/gen-cert.sh) : si HTTPS_KEY/HTTPS_CERT sont définis,
// Vite sert en HTTPS → l'origine (https://IP-LAN:5173) est un secure context, donc
// WebCrypto/IndexedDB chiffrent la clé Mistral même sur tablette. Le backend Express
// passe aussi en HTTPS (mêmes env) → proxy en https + secure:false (cert local).
// Sans ces env : HTTP (localhost reste un secure context). Cf. CLAUDE.md.
export default defineConfig(async () => {
  const httpsKey = process.env.HTTPS_KEY;
  const httpsCert = process.env.HTTPS_CERT;
  const httpsOpts =
    httpsKey && httpsCert
      ? {
          // eslint-disable-next-line security/detect-non-literal-fs-filename -- HTTPS_* are trusted local dev certificate paths.
          key: await readFile(httpsKey),
          // eslint-disable-next-line security/detect-non-literal-fs-filename -- HTTPS_* are trusted local dev certificate paths.
          cert: await readFile(httpsCert),
        }
      : undefined;
  const proxyTarget = httpsOpts ? 'https://localhost:3000' : 'http://localhost:3000';

  return {
    plugins: [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- Codacy ne resout pas les types du plugin Vite.
      tailwindcss(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- Codacy ne resout pas les types du plugin Vite.
      handlebars({ partialDirectory: resolve(__dirname, 'src/partials') }),
    ],
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
  };
});
