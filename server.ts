import dotenv from 'dotenv';
import express from 'express';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Mistral } from '@mistralai/mistralai';

import { trackClient } from './helpers/tracked-client.js';
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

app.use(express.json({ limit: '5mb' }));

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

// --- Config API ---
app.get('/api/config', (_req, res) => res.json(getConfig()));
app.put('/api/config', (req, res) => {
  try {
    res.json(saveConfig(req.body));
  } catch (e) {
    console.error('Config save error:', e);
    res.status(500).json({ error: 'Failed to save configuration' });
  }
});
app.get('/api/config/status', (_req, res) => res.json(getApiStatus()));
app.post('/api/config/reset', (_req, res) => {
  try {
    res.json(resetConfig());
  } catch (e) {
    console.error('Config reset error:', e);
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
    console.error('List voices error:', e);
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
  listVoices(client)
    .then(setVoiceCache)
    .catch((e: Error) => console.warn('Voice cache not loaded:', e.message));
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
    .catch((e: Error) => console.warn('Model limits not loaded:', e.message));
});
