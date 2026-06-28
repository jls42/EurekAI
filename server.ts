import dotenv from 'dotenv';
import express, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { logger } from './helpers/logger.js';
import {
  getEnvClient,
  resolveClient,
  extractModelLimits,
} from './helpers/mistral-client-factory.js';
import { extractErrorCode } from './helpers/error-codes.js';
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

// --- Clé API ---
// `.env` peut être VIDE : l'app démarre quand même. La clé Mistral est résolue PAR
// REQUÊTE (header `X-EurekAI-AI-Key` fourni par le navigateur, fallback env pour
// ECS/k8s) via helpers/mistral-client-factory. Cf. CLAUDE.md "Clé Mistral navigateur".
if (!process.env.MISTRAL_API_KEY) {
  logger.warn(
    'boot',
    'MISTRAL_API_KEY absent — mode clé-utilisateur (le navigateur fournit sa clé par requête)',
  );
}

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
app.get('/api/config/voices', aiLimiter, async (req, res) => {
  const resolved = resolveClient(req);
  if (!resolved.ok) {
    // Header présent mais malformé → 400 actionnable. Pas de clé → [] (boot,
    // non-actionnable, le front ignore déjà) SANS setVoiceCache (ne pas écraser un warmup réussi).
    if (resolved.status === 400) {
      res.status(400).json({ error: resolved.error });
      return;
    }
    res.json([]);
    return;
  }
  try {
    const lang = typeof req.query.lang === 'string' ? req.query.lang : undefined;
    const voices = await listVoices(resolved.client, lang);
    if (!lang) setVoiceCache(voices);
    res.json(voices);
  } catch (e) {
    logger.error('config', 'List voices error', e);
    res.status(502).json({ error: 'Failed to fetch voices from Mistral API' });
  }
});

// Validation d'une clé (bouton « tester » des réglages ; clé brouillon via header).
// TOUJOURS 200 + { status } (jamais le 400 de resolveClient → le front gère un statut
// unique) ; allowEnv:false pour qu'une clé vide ne valide pas l'env de l'hôte.
const validateErrorStatus = (e: unknown): 'invalid' | 'quota' | 'network' => {
  const code = extractErrorCode(e, 'mistral');
  if (code === 'quota_exceeded') return 'quota';
  if (code === 'upstream_unavailable') return 'network';
  return 'invalid';
};
app.post('/api/providers/mistral/validate', aiLimiter, async (req, res) => {
  const resolved = resolveClient(req, { allowEnv: false });
  if (!resolved.ok) {
    res.json({ status: resolved.status === 401 ? 'missing' : 'invalid' });
    return;
  }
  try {
    await resolved.client.models.list();
    res.json({ status: 'ok' });
  } catch (e) {
    res.json({ status: validateErrorStatus(e) });
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
// detect-consigne + moderate sont sous /:pid/ (PAS sous /sources/) et appellent
// aussi Mistral → inclus dans la couverture aiLimiter (sinon oracle + appels facturants
// non protégés). /api/config/voices et /api/providers/* reçoivent aiLimiter en direct
// (cf. routes ci-dessus, définies avant ce middleware).
const AI_PATH_RE =
  /^\/api\/projects\/[^/]+\/(generate|sources|chat|detect-consigne|moderate)(\/|$)/;
app.use((req, res, next) => {
  if (AI_PATH_RE.test(req.path)) {
    aiLimiter(req, res, next);
    return;
  }
  next();
});

app.use('/api/profiles', profileRoutes(outputDir, store));
app.use(API_PROJECTS, projectRoutes(store));
app.use(API_PROJECTS, sourceRoutes(store, profileStore));
app.use(API_PROJECTS, generateRoutes(store, profileStore));
app.use(API_PROJECTS, generationCrudRoutes(store, profileStore));
app.use(API_PROJECTS, chatRoutes(store, profileStore));

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

  // Warmups optionnels : SEULEMENT si une clé d'env existe (sinon ils échoueraient).
  // Sans clé d'env, voiceCacheReady reste false (le front gère le fallback) et les
  // model-limits se chargent paresseusement au 1er client utilisateur (cf. factory).
  const envClient = getEnvClient();
  if (envClient) {
    listVoices(envClient)
      .then(setVoiceCache)
      .catch((e: Error) =>
        logger.warn('voice-cache', `warmup failed (lang fallback to FR active): ${e.message}`),
      );
    envClient.models
      .list()
      .then((models) => setModelLimits(extractModelLimits(models)))
      .catch((e: Error) => logger.warn('models', `limits not loaded: ${e.message}`));
  } else {
    logger.info('boot', 'no env key — warmups skipped (model limits loaded lazily per user key)');
  }
});
