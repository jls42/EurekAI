import dotenv from 'dotenv';
import express, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Mistral } from '@mistralai/mistralai';

import { trackClient } from './helpers/tracked-client.js';
import { logger } from './helpers/logger.js';
import { recordUsage } from './helpers/usage-context.js';
import { ProjectStore } from './store.js';
import {
  initConfig,
  getConfig,
  saveConfig,
  resetConfig,
  getApiStatus,
  setVoiceCache,
  setModelLimits,
} from './config.js';
import { listVoices } from './generators/tts-provider.js';
import { projectRoutes } from './routes/projects.js';
import { sourceRoutes } from './routes/sources.js';
import { generateRoutes } from './routes/generate.js';
import { generationCrudRoutes } from './routes/generations.js';
import { chatRoutes } from './routes/chat.js';
import { profileRoutes } from './routes/profiles.js';
import { ProfileStore, ALL_MODERATION_CATEGORIES, MODERATION_CATEGORIES } from './profiles.js';
import { aiLimiter, generalLimiter } from './helpers/rate-limit.js';
import { createHelmetOptions } from './helpers/security-headers.js';

dotenv.config({ override: true, quiet: true });

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Validation ---
if (!process.env.MISTRAL_API_KEY) {
  console.error('ERREUR: MISTRAL_API_KEY non defini dans .env');
  process.exit(1);
}

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
  timeoutMs: 120_000,
  retryConfig: {
    strategy: 'backoff',
    backoff: { initialInterval: 500, maxInterval: 10_000, exponent: 1.5, maxElapsedTime: 120_000 },
    retryConnectionErrors: true,
  },
});
trackClient(client, recordUsage);
const app = express();
app.disable('x-powered-by');
const PORT = Number(process.env.PORT) || 3000;

// Headers de securite : X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy, etc.
//
// CSP : active avec defaults Helmet + override 'unsafe-inline'/'unsafe-eval'
// requis par Alpine.js (x-data, x-text, x-on directives inline). En dev, on
// garde CSP actif avec exceptions localhost pour Vite HMR/WS et sans
// upgrade-insecure-requests, qui peut casser http://localhost. Un reverse-proxy
// prod (nginx/caddy) peut imposer un CSP plus strict en surcouche.
//
// Cross-origin embedder policy desactivee pour permettre l'integration iframe en
// dev outils Vite et l'embed de blobs audio/image generes.
const isProduction = process.env.NODE_ENV === 'production';
app.use(helmet(createHelmetOptions(isProduction)));

app.use(express.json({ limit: '5mb' }));

// body-parser SyntaxError handler : sans ce middleware, un payload JSON malforme
// expose la stack trace Node (paths absolus, versions deps) via le default handler
// Express. cf. CLAUDE.md "Codes d'erreur API (FailedStep)" — jamais err.message brut
// dans une reponse HTTP.
app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ error: 'invalid_json' });
    return;
  }
  next(err);
});

// Dev: Vite serves the frontend (proxy), Express = API only
// Prod: Express serves the built frontend from dist/
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, 'dist')));
} else {
  app.use(express.static(join(__dirname, 'public')));
}
app.use('/output', express.static(join(__dirname, 'output')));

// --- Init ---
const outputDir = join(__dirname, 'output');
mkdirSync(outputDir, { recursive: true });
const store = new ProjectStore(outputDir);
const profileStore = new ProfileStore(outputDir);
initConfig(outputDir);

// Migration from legacy sources.json
store.migrateFromLegacy(join(outputDir, 'sources.json'));

// Au boot, tout pendingTracker entry restant en status 'pending' est par
// construction d'un process précédent mort (le current process n'en a écrit
// aucun encore). Marque-les tous comme 'cancelled' pour ne pas laisser de
// bannière "génération en cours" coincée à l'infini après un crash serveur.
const cancelledAtBoot = store.cancelAllPendingsAtBoot();
if (cancelledAtBoot > 0) {
  logger.info(
    'store',
    `boot: cancelled ${cancelledAtBoot} pendings inherited from previous process`,
  );
}

// --- Config API ---
app.get('/api/config', (_req, res) => res.json(getConfig()));
app.put('/api/config', (req, res) => {
  try {
    res.json(saveConfig(req.body));
  } catch (e) {
    logger.error('config', 'Config save error', e);
    res.status(500).json({ error: 'Failed to save configuration' });
  }
});
app.get('/api/config/status', (_req, res) => res.json(getApiStatus()));
app.post('/api/config/reset', (_req, res) => {
  try {
    res.json(resetConfig());
  } catch (e) {
    logger.error('config', 'Config reset error', e);
    res.status(500).json({ error: 'Failed to reset configuration' });
  }
});
app.get('/api/config/voices', async (req, res) => {
  try {
    const lang = typeof req.query.lang === 'string' ? req.query.lang : undefined;
    const voices = await listVoices(client, lang);
    if (!lang) setVoiceCache(voices);
    res.json(voices);
  } catch (e) {
    logger.error('config', 'List voices error', e);
    res.status(502).json({ error: 'Failed to fetch voices from Mistral API' });
  }
});

// --- Moderation categories API ---
app.get('/api/moderation-categories', (_req, res) =>
  res.json({ all: [...ALL_MODERATION_CATEGORIES], defaults: MODERATION_CATEGORIES }),
);

// --- Routes ---
const API_PROJECTS = '/api/projects';
const NON_CONFIGURE = 'NON CONFIGURE';

// Rate-limit general anti-flood sur toutes les routes /api. authLimiter
// (sur /profiles) et aiLimiter (sur paths cher) s'empilent par-dessus.
app.use('/api', generalLimiter);

// aiLimiter sur les paths qui declenchent un appel LLM/TTS/OCR (generate,
// sources scrape/upload, chat). Empile sur generalLimiter ci-dessus. Le
// regex match les sous-paths sous /api/projects/:pid/{generate|sources|chat}.
// /events (SSE) n'est pas dans ces prefix donc reste non-affecte.
const AI_PATH_RE = /^\/api\/projects\/[^/]+\/(generate|sources|chat)(\/|$)/;
app.use((req, res, next) => {
  if (AI_PATH_RE.test(req.path)) {
    aiLimiter(req, res, next);
    return;
  }
  next();
});

app.use('/api/profiles', profileRoutes(outputDir, store));
app.use(API_PROJECTS, projectRoutes(store));
app.use(API_PROJECTS, sourceRoutes(store, client, profileStore));
app.use(API_PROJECTS, generateRoutes(store, client, profileStore));
app.use(API_PROJECTS, generationCrudRoutes(store, client, profileStore));
app.use(API_PROJECTS, chatRoutes(store, client, profileStore));

// --- Start ---
app.listen(PORT, () => {
  const projects = store.listProjects();
  const status = getApiStatus();
  console.log(`\n  EurekAI — http://localhost:${PORT}`);
  console.log(`  API Mistral: ${status.mistral ? 'OK' : NON_CONFIGURE}`);
  console.log(`  TTS Mistral Voxtral: ${status.ttsAvailable ? 'OK' : NON_CONFIGURE}`);
  console.log(`  Projets: ${projects.length}`);
  projects.forEach((p) => console.log(`    - ${p.name} (${p.id.slice(0, 8)}...)`));
  console.log();

  // Non-blocking cache warmup (optional, app works without)
  // Catch en logger structuré — le frontend lit voiceCacheReady via /api/config/status
  // pour griser les sélecteurs de voix et alerter les users non-FR du fallback.
  listVoices(client)
    .then(setVoiceCache)
    .catch((e: Error) =>
      logger.warn('voice-cache', `warmup failed (lang fallback to FR active): ${e.message}`),
    );
  client.models
    .list()
    .then((models) => {
      const limits: Record<string, number> = {};
      for (const m of models.data ?? []) {
        const card = m as { id: string; maxContextLength?: number; aliases?: string[] };
        if (!card.maxContextLength) continue;
        limits[card.id] = card.maxContextLength;
        for (const alias of card.aliases ?? []) limits[alias] = card.maxContextLength;
      }
      setModelLimits(limits);
    })
    .catch((e: Error) => logger.warn('models', `limits not loaded: ${e.message}`));
});
