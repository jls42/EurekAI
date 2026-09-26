/* eslint-disable
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-argument
   --
   Codacy lance ESLint sans les types Vitest/Express (imports dynamiques de routeurs); lint:ci local reste type-aware. */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import express, { type Express } from 'express';
import { mkdtempSync, rmSync } from 'node:fs';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

vi.mock('./logger.js', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

// Vraies apps Express sur un port éphémère, vrais limiteurs : chaque test réimporte les modules
// (vi.resetModules) pour repartir de compteurs vierges (stockage mémoire par instance).

type Running = { base: string; server: Server };

let tmp: string;
let running: Running | null = null;

const stop = (server: Server): Promise<void> =>
  new Promise<void>((done) => {
    server.closeAllConnections();
    server.close(() => done());
  });

const start = async (app: Express): Promise<string> => {
  running = await new Promise<Running>((resolve) => {
    const server = app.listen(0, '127.0.0.1', () => {
      const { port } = server.address() as AddressInfo;
      resolve({ base: `http://127.0.0.1:${port}`, server });
    });
  });
  return running.base;
};

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv('MISTRAL_API_KEY', '');
  tmp = mkdtempSync(join(tmpdir(), 'eurekai-rate-limit-'));
});

afterEach(async () => {
  if (running) await stop(running.server);
  running = null;
  vi.unstubAllEnvs();
  rmSync(tmp, { recursive: true, force: true });
});

const PIN = '1234';
const WRONG_PIN = '0000';
const JSON_HEADERS = { 'content-type': 'application/json' };

// Profil mineur protégé par le PIN 1234, servi par les vraies routes /api/profiles.
const startProfilesApp = async (): Promise<{ base: string; id: string }> => {
  const { profileRoutes } = await import('../routes/profiles.js');
  const { ProjectStore } = await import('../store.js');
  const { ProfileStore } = await import('../profiles.js');
  const { id } = new ProfileStore(tmp).create('Léa', 9, '0', 'fr', PIN);
  const app = express();
  app.use(express.json());
  app.use('/api/profiles', profileRoutes(tmp, new ProjectStore(tmp)));
  return { base: await start(app), id };
};

// URL du serveur Express éphémère du test (127.0.0.1, port aléatoire) et d'un profil créé par le
// test : aucune entrée utilisateur (faux positif Opengrep rule-node-ssrf).
const putProfile = (base: string, id: string, body: Record<string, unknown>) =>
  // nosemgrep
  fetch(`${base}/api/profiles/${id}`, {
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  });

const deleteProfile = (base: string, id: string, pin?: string) =>
  // nosemgrep
  fetch(`${base}/api/profiles/${id}`, {
    method: 'DELETE',
    ...(pin === undefined ? {} : { headers: JSON_HEADERS, body: JSON.stringify({ pin }) }),
  });

// n PIN faux sur PUT : chacun refusé en 403 (sous la limite).
const failPins = async (base: string, id: string, n: number): Promise<void> => {
  for (let i = 0; i < n; i++) {
    expect((await putProfile(base, id, { pin: WRONG_PIN })).status).toBe(403);
  }
};

const expectRateLimited = async (res: Response): Promise<void> => {
  expect(res.status).toBe(429);
  expect(await res.json()).toEqual({ error: 'rate_limited' });
  expect(Number(res.headers.get('retry-after'))).toBeGreaterThan(0);
};

describe('pinLimiter : 10 PIN faux / 15 min, seuls les refus comptent', () => {
  it('10 PIN faux passent (403), le 11e reçoit 429 rate_limited avec Retry-After, bon PIN compris', async () => {
    const { base, id } = await startProfilesApp();

    await failPins(base, id, 10);

    await expectRateLimited(await putProfile(base, id, { pin: WRONG_PIN }));
    // Verrou : même le bon PIN est refusé jusqu'à la fin de la fenêtre.
    await expectRateLimited(await putProfile(base, id, { pin: PIN }));
    const retryAfter = Number(
      (await putProfile(base, id, { pin: PIN })).headers.get('retry-after'),
    );
    expect(retryAfter).toBeLessThanOrEqual(15 * 60);
  });

  it('un bon PIN n’est pas compté', async () => {
    const { base, id } = await startProfilesApp();

    await failPins(base, id, 9);
    for (let i = 0; i < 3; i++) {
      expect((await putProfile(base, id, { pin: PIN })).status).toBe(200);
    }
    // 10e échec : encore sous la limite (les 3 bons PIN ont été décomptés).
    expect((await putProfile(base, id, { pin: WRONG_PIN })).status).toBe(403);
    await expectRateLimited(await putProfile(base, id, { pin: WRONG_PIN }));
  });

  it('une requête sans PIN n’est ni comptée ni bloquée (PUT et DELETE)', async () => {
    const { base, id } = await startProfilesApp();

    await failPins(base, id, 10);

    // Limite atteinte : un enregistrement sans PIN passe toujours.
    const rename = await putProfile(base, id, { name: 'Léa B' });
    expect(rename.status).toBe(200);
    expect((await rename.json()).name).toBe('Léa B');
    // DELETE sans corps sur un profil protégé : 403 (plus de 500), non compté.
    const refused = await deleteProfile(base, id);
    expect(refused.status).toBe(403);
    await expectRateLimited(await putProfile(base, id, { pin: WRONG_PIN }));
  });

  it('PUT et DELETE partagent le même compteur', async () => {
    const { base, id } = await startProfilesApp();

    await failPins(base, id, 5);
    for (let i = 0; i < 5; i++) {
      expect((await deleteProfile(base, id, WRONG_PIN)).status).toBe(403);
    }

    await expectRateLimited(await deleteProfile(base, id, PIN));
  });

  it('GET /api/profiles n’est plus limité par authLimiter ; la création l’est toujours', async () => {
    const { base } = await startProfilesApp();

    // authLimiter valait 30 / 15 min sur TOUT /api/profiles, lecture comprise.
    for (let i = 0; i < 35; i++) {
      expect((await fetch(`${base}/api/profiles`)).status).toBe(200);
    }
    const create = () =>
      fetch(`${base}/api/profiles`, { method: 'POST', headers: JSON_HEADERS, body: '{}' });
    for (let i = 0; i < 30; i++) {
      expect((await create()).status).toBe(400);
    }
    await expectRateLimited(await create());
  });
});

// Routes IA et non IA réellement montées : aiPathLimiter au niveau de l'app, puis les routeurs
// generationCrud et chat dans l'ordre de server.ts. Aucune clé (MISTRAL_API_KEY vide) : aucun appel.
const startAiApp = async (): Promise<string> => {
  const { aiPathLimiter } = await import('./rate-limit.js');
  const { generationCrudRoutes } = await import('../routes/generations.js');
  const { chatRoutes } = await import('../routes/chat.js');
  const { ProjectStore } = await import('../store.js');
  const { ProfileStore } = await import('../profiles.js');
  const store = new ProjectStore(tmp);
  const profileStore = new ProfileStore(tmp);
  const app = express();
  app.use(express.json());
  app.use(aiPathLimiter);
  app.use('/api/projects', generationCrudRoutes(store, profileStore));
  app.use('/api/projects', chatRoutes(store, profileStore));
  return start(app);
};

const GEN = '/api/projects/p1/generations/g1';

// Requêtes restantes annoncées par l'en-tête RateLimit (draft-7) ; null = limiteur non traversé.
const remaining = (res: Response): number | null => {
  const match = /remaining=(\d+)/.exec(res.headers.get('ratelimit') ?? '');
  return match ? Number(match[1]) : null;
};

describe('aiPathLimiter : routes IA seulement, une seule passe par requête', () => {
  it('le chat n’est compté qu’une fois (GET et DELETE)', async () => {
    const base = await startAiApp();

    expect(remaining(await fetch(`${base}/api/projects/p1/chat`))).toBe(59);
    expect(remaining(await fetch(`${base}/api/projects/p1/chat`, { method: 'DELETE' }))).toBe(58);
  });

  it('tentatives, renommage, suppression et annulation ne passent pas par aiLimiter', async () => {
    const base = await startAiApp();
    const post = (path: string) =>
      fetch(`${base}${GEN}/${path}`, { method: 'POST', headers: JSON_HEADERS, body: '{}' });

    for (const res of [
      await post('quiz-attempt'),
      await post('fill-blank-attempt'),
      await post('dictation-attempt'),
      await post('cancel'),
      await fetch(`${base}${GEN}`, { method: 'PUT', headers: JSON_HEADERS, body: '{}' }),
      await fetch(`${base}${GEN}`, { method: 'DELETE' }),
    ]) {
      expect(res.headers.get('ratelimit')).toBeNull();
    }
    expect(remaining(await fetch(`${base}/api/projects/p1/chat`))).toBe(59);
  });

  it('vocal-answer et read-aloud comptés AVANT la clé, casse et barre finale comprises', async () => {
    const base = await startAiApp();

    const vocal = await fetch(`${base}${GEN}/vocal-answer`, { method: 'POST' });
    expect(vocal.status).toBe(401);
    expect(remaining(vocal)).toBe(59);
    const readAloud = await fetch(`${base}${GEN}/read-aloud`, { method: 'POST' });
    expect(readAloud.status).toBe(401);
    expect(remaining(readAloud)).toBe(58);
    // Express 5 route sans tenir compte de la casse ni de la barre finale (mesuré).
    const variant = await fetch(`${base}${GEN}/READ-ALOUD/`, { method: 'POST' });
    expect(variant.status).toBe(401);
    expect(remaining(variant)).toBe(57);
  });

  it('au-delà de 60 requêtes IA : 429 rate_limited, avant la clé et multer', async () => {
    const base = await startAiApp();

    for (let i = 0; i < 60; i++) {
      expect((await fetch(`${base}/api/projects/p1/chat`)).status).toBe(404);
    }
    const form = new FormData();
    form.append('audio', new Blob(['x'], { type: 'audio/webm' }), 'answer.webm');

    await expectRateLimited(
      await fetch(`${base}${GEN}/vocal-answer`, { method: 'POST', body: form }),
    );
  });
});

describe('AI_PATH_RE', () => {
  it.each([
    '/api/projects/p1/generate/summary',
    '/api/projects/p1/sources/upload',
    '/api/projects/p1/sources/s1',
    '/api/projects/p1/chat',
    '/api/projects/p1/detect-consigne',
    '/api/projects/p1/moderate',
    '/api/projects/p1/generations/g1/vocal-answer',
    '/api/projects/p1/generations/g1/read-aloud',
    '/api/projects/p1/generations/g1/read-aloud/',
    '/API/Projects/p1/GENERATE/summary',
  ])('limite %s', async (path) => {
    const { AI_PATH_RE } = await import('./rate-limit.js');
    expect(AI_PATH_RE.test(path)).toBe(true);
  });

  it.each([
    '/api/projects',
    '/api/projects/p1',
    '/api/projects/p1/events',
    '/api/projects/p1/generations/g1',
    '/api/projects/p1/generations/g1/quiz-attempt',
    '/api/projects/p1/generations/g1/cancel',
    '/api/projects/p1/generations/g1/read-aloud/extra',
    '/api/profiles/p1',
  ])('ne limite pas %s', async (path) => {
    const { AI_PATH_RE } = await import('./rate-limit.js');
    expect(AI_PATH_RE.test(path)).toBe(false);
  });
});

describe('generalLimiter', () => {
  it('répond 429 rate_limited au-delà de 300 requêtes par minute', async () => {
    const { generalLimiter } = await import('./rate-limit.js');
    const app = express();
    app.use('/api', generalLimiter);
    app.get('/api/ping', (_req, res) => {
      res.json({ ok: true });
    });
    const base = await start(app);

    for (let i = 0; i < 300; i++) {
      expect((await fetch(`${base}/api/ping`)).status).toBe(200);
    }

    await expectRateLimited(await fetch(`${base}/api/ping`));
  });
});
