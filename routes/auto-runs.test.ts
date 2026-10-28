/* eslint-disable
   @typescript-eslint/no-explicit-any,
   @typescript-eslint/no-non-null-assertion,
   @typescript-eslint/no-unsafe-argument,
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-return
   --
   Codacy lance ESLint sans les types Vitest/mocks; lint:ci local reste type-aware. */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { randomUUID } from 'node:crypto';
import { ProjectStore } from '../store.js';
import { ProfileStore } from '../profiles.js';
import {
  AUTO_RUN_MAX_MS,
  MAX_ACTIVE_AUTO_RUNS,
  activeAutoRunCount,
  autoRunRoutes,
} from './auto-runs.js';
import { routeRequest } from '../generators/router.js';
import { generateSummary } from '../generators/summary.js';
import { generateFlashcards } from '../generators/flashcards.js';
import { generateQuiz } from '../generators/quiz.js';
import { subscribeAutoRun } from '../helpers/event-bus.js';
import type { AutoRun, AutoRunEvent, AutoRunStatus } from '../types.js';

// Lot Auto côté serveur : lancement (202 immédiat), analyse puis étapes en arrière-plan, chacune par
// le cœur des générations simples. Générateurs simulés ; vrai store sur un dossier temporaire.

const { mockClient, authState } = vi.hoisted(() => ({
  mockClient: { id: 'client' } as unknown,
  authState: { override: null as { ok: false; status: number; error: string } | null },
}));
vi.mock('../helpers/mistral-client-factory.js', () => ({
  resolveClient: () =>
    authState.override ?? { ok: true, client: mockClient, fingerprint: 'fp-secret-key' },
  requireKeyMiddleware: (_req: unknown, _res: unknown, next: () => void) => next(),
}));

const SUMMARY_DATA = { title: 'T', summary: 'S', key_points: ['p'], vocabulary: [], fun_fact: '' };
vi.mock('../generators/summary.js', () => ({
  generateSummary: vi.fn(),
  generateRemediationSummary: vi.fn(),
}));
vi.mock('../generators/flashcards.js', () => ({ generateFlashcards: vi.fn() }));
vi.mock('../generators/quiz.js', () => ({
  QUIZ_DEFAULT_COUNT: 15,
  generateQuiz: vi.fn(),
  generateQuizVocal: vi.fn(),
  generateQuizReview: vi.fn(),
}));
vi.mock('../generators/podcast.js', () => ({
  generatePodcastScript: vi.fn().mockResolvedValue({
    script: [
      { speaker: 'host', text: 'Hello' },
      { speaker: 'guest', text: 'Hi' },
    ],
    sourceRefs: [],
    names: { host: 'Camille', guest: 'Sasha' },
  }),
  createPodcastGeneration: (fields: unknown) => fields,
}));
vi.mock('../generators/tts.js', () => ({
  generateAudio: vi.fn().mockResolvedValue(Buffer.from('fake-audio')),
}));
vi.mock('../generators/router.js', () => ({ routeRequest: vi.fn() }));
vi.mock('../generators/moderation.js', () => ({
  moderateContent: vi.fn(async () => ({ status: 'safe', categories: {} })),
}));
vi.mock('../config.js', () => ({
  getConfig: vi.fn(() => ({
    models: {
      summary: 'm',
      flashcards: 'm',
      quiz: 'm',
      podcast: 'm',
      translate: 'm',
      ocr: 'm',
      quizVerify: 'm',
      chat: 'm',
    },
    ttsModel: 'voxtral-mini-tts-3-0',
  })),
  resolveVoices: vi.fn(() => ({ host: 'mh', guest: 'mg' })),
  getModelLimits: vi.fn(() => ({})),
  getApiStatus: vi.fn(() => ({ mistral: true, ttsAvailable: true, voiceCacheReady: true })),
}));

type Deferred = { promise: Promise<void>; resolve: () => void };
const deferred = (): Deferred => {
  let resolve = () => undefined as void;
  const promise = new Promise<void>((r) => (resolve = r));
  return { promise, resolve };
};

const plan = (...agents: string[]) => ({
  plan: agents.map((agent) => ({ agent, reason: 'r' })),
  context: 'c',
});

function getHandler(router: any, method: string, path: string) {
  for (const layer of router.stack) {
    if (layer.route?.path === path && layer.route.methods[method]) {
      return layer.route.stack[layer.route.stack.length - 1].handle;
    }
  }
  throw new Error(`No handler for ${method.toUpperCase()} ${path}`);
}

function mockRes() {
  const res: any = { headers: {} };
  res.status = vi.fn(() => res);
  res.json = vi.fn(() => res);
  res.setHeader = vi.fn((k: string, v: string) => (res.headers[k] = v));
  return res;
}

let tmpDir: string;
let store: ProjectStore;
let profileStore: ProfileStore;
let router: any;

const projectWithSource = (): string => {
  const pid = store.createProject('Cours').meta.id;
  store.addSource(pid, {
    id: 'src-1',
    filename: 'lecon.txt',
    markdown: 'Les volcans crachent de la lave.',
    uploadedAt: new Date().toISOString(),
  });
  return pid;
};

const start = async (pid: string, body: Record<string, unknown> = {}) => {
  const runId = (body.runId as string | undefined) ?? randomUUID();
  const res = mockRes();
  const handler = getHandler(router, 'post', '/:pid/generate/auto/start');
  await handler({ params: { pid }, body: { lang: 'fr', ageGroup: 'enfant', runId, ...body } }, res);
  return { res, runId, status: res.status.mock.calls[0]?.[0], json: res.json.mock.calls[0]?.[0] };
};

const runOf = (pid: string, runId: string): AutoRun => store.getAutoRun(pid, runId)!;

const waitForStatus = async (pid: string, runId: string, ...statuses: AutoRunStatus[]) => {
  await vi.waitFor(() => expect(statuses).toContain(store.getAutoRun(pid, runId)?.status));
};

const stepsOf = (pid: string, runId: string) =>
  runOf(pid, runId).steps.map((s) => [s.agent, s.status, s.failureCode ?? null]);

beforeEach(() => {
  tmpDir = mkdtempSync(join(tmpdir(), 'auto-runs-'));
  store = new ProjectStore(tmpDir);
  profileStore = new ProfileStore(tmpDir);
  router = autoRunRoutes(store, profileStore);
  vi.clearAllMocks();
  vi.mocked(routeRequest).mockResolvedValue(plan('summary', 'flashcards') as any);
  vi.mocked(generateSummary).mockResolvedValue(SUMMARY_DATA as any);
  vi.mocked(generateFlashcards).mockResolvedValue([{ question: 'Q', answer: 'A' }] as any);
  vi.mocked(generateQuiz).mockResolvedValue([
    { question: 'Q', choices: ['a', 'b', 'c', 'd'], correct: 0, explanation: 'E' },
  ] as any);
});

afterEach(async () => {
  await vi.waitFor(() => expect(activeAutoRunCount()).toBe(0));
  rmSync(tmpDir, { recursive: true, force: true });
  authState.override = null;
});

describe('POST /:pid/generate/auto/start — gardes', () => {
  it('auth-first : clé refusée → 401 avant tout, aucun lot', async () => {
    authState.override = { ok: false, status: 401, error: 'auth_required' };
    const pid = projectWithSource();
    const { status, json } = await start(pid, { runId: 'pas-un-uuid' });
    expect([status, json]).toEqual([401, { error: 'auth_required' }]);
    expect(store.getProject(pid)!.results.autoRuns ?? []).toHaveLength(0);
  });

  it('runId absent ou non UUID v4 → 400 invalid_input ; cours absent → 404', async () => {
    const pid = projectWithSource();
    expect((await start(pid, { runId: 'abc' })).status).toBe(400);
    const missing = await start('00000000-0000-4000-8000-000000000000');
    expect([missing.status, missing.json]).toEqual([404, { error: 'project_not_found' }]);
    expect(routeRequest).not.toHaveBeenCalled();
  });

  it('langue invalide → 400 avant tout appel facturé ; aucune source → 400 no_sources', async () => {
    const pid = projectWithSource();
    const bad = await start(pid, { lang: 'pas une langue' });
    expect([bad.status, bad.json]).toEqual([400, { error: 'invalid_input' }]);
    const empty = store.createProject('Vide').meta.id;
    expect((await start(empty)).json).toEqual({ error: 'no_sources' });
    expect(routeRequest).not.toHaveBeenCalled();
  });
});

describe('POST /:pid/generate/auto/start — déroulé', () => {
  it('202 immédiat, puis analyse, étapes et fin ; état complet diffusé à chaque changement', async () => {
    const pid = projectWithSource();
    const events: AutoRunEvent[] = [];
    const unsubscribe = subscribeAutoRun(pid, (e) => events.push(e));
    const { status, json, runId } = await start(pid, { count: 5 });
    expect(status).toBe(202);
    expect(json.run).toMatchObject({ id: runId, status: 'analysing' });
    expect(json.run.request).toEqual({
      lang: 'fr',
      ageGroup: 'enfant',
      sourceIds: ['src-1'],
      useConsigne: true,
      count: 5,
    });
    await waitForStatus(pid, runId, 'completed');
    unsubscribe();
    expect(stepsOf(pid, runId)).toEqual([
      ['summary', 'completed', null],
      ['flashcards', 'completed', null],
    ]);
    const { results } = store.getProject(pid)!;
    expect(results.generations.map((g) => g.id)).toEqual(runOf(pid, runId).steps.map((s) => s.gid));
    expect(results.pendingTracker ?? []).toHaveLength(0);
    expect(events[0].run.status).toBe('analysing');
    expect(events.at(-1)!.run.status).toBe('completed');
    expect(generateFlashcards).toHaveBeenCalledWith(
      mockClient,
      expect.any(String),
      'm',
      'fr',
      'enfant',
      5,
      expect.any(String),
    );
  });

  it('clé jamais écrite : ni dans le lot, ni dans project.json', async () => {
    const pid = projectWithSource();
    const { runId } = await start(pid);
    await waitForStatus(pid, runId, 'completed');
    const onDisk = readFileSync(join(tmpDir, 'projects', pid, 'project.json'), 'utf-8');
    expect(onDisk).not.toContain('fp-secret-key');
    expect(Object.keys(runOf(pid, runId)).sort((a, b) => a.localeCompare(b))).toEqual([
      'completedAt',
      'id',
      'request',
      'skipped',
      'startedAt',
      'status',
      'steps',
      'updatedAt',
    ]);
  });

  it('même runId renvoyé → 202 avec le même lot, une seule analyse', async () => {
    const pid = projectWithSource();
    const gate = deferred();
    vi.mocked(routeRequest).mockImplementationOnce(async () => {
      await gate.promise;
      return plan('summary') as any;
    });
    const first = await start(pid);
    const again = await start(pid, { runId: first.runId });
    expect([again.status, again.json.run.id]).toEqual([202, first.runId]);
    gate.resolve();
    await waitForStatus(pid, first.runId, 'completed');
    expect(routeRequest).toHaveBeenCalledTimes(1);
  });

  it('autre lancement pendant un lot actif → 409 auto_busy avec le lot en cours', async () => {
    const pid = projectWithSource();
    const gate = deferred();
    vi.mocked(routeRequest).mockImplementationOnce(async () => {
      await gate.promise;
      return plan('summary') as any;
    });
    const first = await start(pid);
    const second = await start(pid);
    expect(second.status).toBe(409);
    expect(second.json).toMatchObject({ error: 'auto_busy', run: { id: first.runId } });
    gate.resolve();
    await waitForStatus(pid, first.runId, 'completed');
  });

  it(`plus de ${MAX_ACTIVE_AUTO_RUNS} lots en cours → 429 rate_limited avec Retry-After`, async () => {
    const gate = deferred();
    vi.mocked(routeRequest).mockImplementation(async () => {
      await gate.promise;
      return plan() as any;
    });
    const runs = [];
    for (let i = 0; i < MAX_ACTIVE_AUTO_RUNS; i++) {
      const pid = projectWithSource();
      runs.push({ pid, runId: (await start(pid)).runId });
    }
    const over = await start(projectWithSource());
    expect([over.status, over.json]).toEqual([429, { error: 'rate_limited' }]);
    expect(over.res.headers['Retry-After']).toBe('30');
    gate.resolve();
    for (const r of runs) await waitForStatus(r.pid, r.runId, 'completed');
  });

  it('analyse en échec → lot failed avec un code stable, aucune étape', async () => {
    const pid = projectWithSource();
    vi.mocked(routeRequest).mockRejectedValueOnce(new Error('boom'));
    const { runId } = await start(pid);
    await waitForStatus(pid, runId, 'failed');
    expect(runOf(pid, runId)).toMatchObject({ failureCode: 'internal_error', steps: [] });
  });

  it('sources retenues au lancement : une source ajoutée pendant le lot n’y entre pas', async () => {
    const pid = projectWithSource();
    const gate = deferred();
    vi.mocked(routeRequest).mockImplementationOnce(async () => {
      await gate.promise;
      return plan('summary') as any;
    });
    const { runId } = await start(pid);
    store.addSource(pid, {
      id: 'src-2',
      filename: 'autre.txt',
      markdown: 'Ajoutée pendant le lot',
      uploadedAt: new Date().toISOString(),
    });
    gate.resolve();
    await waitForStatus(pid, runId, 'completed');
    const markdown = vi.mocked(generateSummary).mock.calls[0][1];
    expect(markdown).not.toContain('Ajoutée pendant le lot');
    expect(store.getProject(pid)!.results.generations[0].sourceIds).toEqual(['src-1']);
  });
});

describe('étapes', () => {
  it('au plus 3 étapes en vol par clé, dans l’ordre du plan, deux lots compris', async () => {
    vi.mocked(routeRequest).mockResolvedValue(plan('summary', 'flashcards', 'quiz') as any);
    const gates: Deferred[] = [];
    let inFlight = 0;
    let maxInFlight = 0;
    const gated = async (value: unknown) => {
      inFlight++;
      maxInFlight = Math.max(maxInFlight, inFlight);
      const g = deferred();
      gates.push(g);
      await g.promise;
      inFlight--;
      return value;
    };
    vi.mocked(generateSummary).mockImplementation(() => gated(SUMMARY_DATA) as any);
    vi.mocked(generateFlashcards).mockImplementation(() => gated([]) as any);
    vi.mocked(generateQuiz).mockImplementation(() => gated([]) as any);
    const a = projectWithSource();
    const b = projectWithSource();
    const runA = (await start(a)).runId;
    const runB = (await start(b)).runId;
    await vi.waitFor(() => expect(gates).toHaveLength(3));
    // Les 3 étapes du premier lot tiennent les 3 places ; celles du second attendent.
    expect(vi.mocked(generateSummary).mock.calls).toHaveLength(1);
    // Une place libérée : l'étape suivante part, jamais une 4e en même temps.
    gates[0].resolve();
    await vi.waitFor(() => expect(gates).toHaveLength(4));
    expect(inFlight).toBe(3);
    for (let i = 0; i < 20 && activeAutoRunCount() > 0; i++) {
      gates.splice(0).forEach((g) => g.resolve());
      await new Promise((r) => setTimeout(r, 5));
    }
    await waitForStatus(a, runA, 'completed');
    await waitForStatus(b, runB, 'completed');
    expect(maxInFlight).toBe(3);
  });

  it('une étape en échec n’arrête pas les autres ; code stable sur l’étape', async () => {
    const pid = projectWithSource();
    vi.mocked(generateSummary).mockRejectedValueOnce(new Error('boom'));
    const { runId } = await start(pid);
    await waitForStatus(pid, runId, 'completed');
    expect(stepsOf(pid, runId)).toEqual([
      ['summary', 'failed', 'internal_error'],
      ['flashcards', 'completed', null],
    ]);
  });

  it('refus des gardes pendant le lot : étapes refused avec le code exact, lot terminé', async () => {
    const profile = profileStore.create('Kid', 9, '0', 'fr');
    const pid = store.createProject('Cours', profile.id).meta.id;
    store.addSource(pid, {
      id: 'src-1',
      filename: 'lecon.txt',
      markdown: 'Contenu',
      uploadedAt: new Date().toISOString(),
      moderation: { status: 'safe', categories: {} },
    });
    const gate = deferred();
    vi.mocked(routeRequest).mockImplementationOnce(async () => {
      await gate.promise;
      return plan('summary', 'flashcards') as any;
    });
    const { runId } = await start(pid);
    // Source signalée entre le lancement et les étapes : chaque étape refait la garde.
    const data = store.getProject(pid)!;
    data.sources[0].moderation = { status: 'unsafe', categories: { violence_and_threats: true } };
    store.saveProject(pid, data);
    gate.resolve();
    await waitForStatus(pid, runId, 'completed');
    expect(runOf(pid, runId).steps.map((s) => [s.status, s.failureCode, s.refusal])).toEqual([
      ['failed', 'refused', 'moderation.blocked'],
      ['failed', 'refused', 'moderation.blocked'],
    ]);
    expect(generateSummary).not.toHaveBeenCalled();
  });

  it('étape annulée par sa puce pendant l’attente : rien ne part, le lot continue', async () => {
    const pid = projectWithSource();
    vi.mocked(routeRequest).mockResolvedValueOnce(
      plan('summary', 'flashcards', 'quiz', 'fill-blank') as any,
    );
    const gate = deferred();
    vi.mocked(generateSummary).mockImplementation(async () => {
      await gate.promise;
      return SUMMARY_DATA as any;
    });
    vi.mocked(generateFlashcards).mockImplementation(async () => {
      await gate.promise;
      return [] as any;
    });
    vi.mocked(generateQuiz).mockImplementation(async () => {
      await gate.promise;
      return [] as any;
    });
    const { runId } = await start(pid);
    await vi.waitFor(() => expect(runOf(pid, runId).steps).toHaveLength(4));
    const fillBlank = runOf(pid, runId).steps[3];
    store.markPendingCancelled(pid, fillBlank.gid);
    gate.resolve();
    await waitForStatus(pid, runId, 'completed');
    expect(stepsOf(pid, runId).map(([agent, status]) => [agent, status])).toEqual([
      ['summary', 'completed'],
      ['flashcards', 'completed'],
      ['quiz', 'completed'],
      ['fill-blank', 'cancelled'],
    ]);
  });

  it('étape podcast : modèle TTS des Réglages normalisé, comme une génération simple', async () => {
    const { resolveVoices } = await import('../config.js');
    const { generateAudio } = await import('../generators/tts.js');
    vi.mocked(routeRequest).mockResolvedValueOnce(plan('podcast') as any);
    const pid = projectWithSource();
    const { runId } = await start(pid);
    await waitForStatus(pid, runId, 'completed');
    expect(vi.mocked(resolveVoices).mock.calls.map(([args]) => args.model)).toEqual([
      'voxtral-mini-tts-3-0',
    ]);
    expect(vi.mocked(generateAudio).mock.calls[0][2]).toEqual({
      model: 'voxtral-mini-tts-3-0',
      mistralClient: mockClient,
    });
  });
});

describe('annulation, suppression, délai', () => {
  it('lot annulé pendant l’analyse : aucune étape ne part', async () => {
    const pid = projectWithSource();
    const gate = deferred();
    vi.mocked(routeRequest).mockImplementationOnce(async () => {
      await gate.promise;
      return plan('summary') as any;
    });
    const { runId } = await start(pid);
    const res = mockRes();
    getHandler(router, 'post', '/:pid/auto-runs/:runId/cancel')({ params: { pid, runId } }, res);
    expect(res.json.mock.calls[0][0].run.status).toBe('cancelled');
    gate.resolve();
    await vi.waitFor(() => expect(activeAutoRunCount()).toBe(0));
    expect(runOf(pid, runId)).toMatchObject({ status: 'cancelled', steps: [] });
    expect(generateSummary).not.toHaveBeenCalled();
  });

  it('lot annulé pendant les étapes : l’étape en vol n’est pas promue, ses médias non plus', async () => {
    const pid = projectWithSource();
    vi.mocked(routeRequest).mockResolvedValueOnce(plan('podcast') as any);
    const { generatePodcastScript } = await import('../generators/podcast.js');
    const gate = deferred();
    const original = vi.mocked(generatePodcastScript).getMockImplementation();
    vi.mocked(generatePodcastScript).mockImplementationOnce(async (...args) => {
      await gate.promise;
      return original!(...args);
    });
    const { runId } = await start(pid);
    await vi.waitFor(() => expect(generatePodcastScript).toHaveBeenCalled());
    store.cancelAutoRun(pid, runId);
    gate.resolve();
    await vi.waitFor(() => expect(activeAutoRunCount()).toBe(0));
    expect(store.getProject(pid)!.results.generations).toHaveLength(0);
    const media = readdirSync(join(tmpDir, 'projects', pid)).filter((f) => f.endsWith('.mp3'));
    expect(media).toEqual([]);
  });

  it('GET et cancel : lot inconnu → 404 auto_run_not_found', async () => {
    const pid = projectWithSource();
    for (const [method, path] of [
      ['get', '/:pid/auto-runs/:runId'],
      ['post', '/:pid/auto-runs/:runId/cancel'],
    ]) {
      const res = mockRes();
      getHandler(router, method, path)({ params: { pid, runId: randomUUID() } }, res);
      expect([res.status.mock.calls[0][0], res.json.mock.calls[0][0]]).toEqual([
        404,
        { error: 'auto_run_not_found' },
      ]);
    }
  });

  it('cours supprimé pendant le lot : le lot s’arrête sans erreur non gérée', async () => {
    const pid = projectWithSource();
    const gate = deferred();
    vi.mocked(routeRequest).mockImplementationOnce(async () => {
      await gate.promise;
      return plan('summary', 'flashcards') as any;
    });
    await start(pid);
    store.deleteProject(pid);
    gate.resolve();
    await vi.waitFor(() => expect(activeAutoRunCount()).toBe(0));
    expect(generateSummary).not.toHaveBeenCalled();
  });

  it('délai maximal : étapes encore en cours en échec upstream_unavailable, clé oubliée', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    try {
      const pid = projectWithSource();
      const gate = deferred();
      vi.mocked(generateSummary).mockImplementation(async () => {
        await gate.promise;
        return SUMMARY_DATA as any;
      });
      const { runId } = await start(pid);
      await vi.waitFor(() => expect(generateSummary).toHaveBeenCalled());
      await vi.advanceTimersByTimeAsync(AUTO_RUN_MAX_MS);
      expect(activeAutoRunCount()).toBe(0);
      expect(stepsOf(pid, runId)).toEqual([
        ['summary', 'failed', 'upstream_unavailable'],
        ['flashcards', 'completed', null],
      ]);
      expect(runOf(pid, runId).status).toBe('completed');
      gate.resolve();
      await vi.waitFor(() => expect(store.getProject(pid)!.results.generations).toHaveLength(1));
    } finally {
      vi.useRealTimers();
    }
  });
});
