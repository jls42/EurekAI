/* eslint-disable
   @typescript-eslint/no-explicit-any,
   @typescript-eslint/no-unsafe-argument,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-call
   --
   Contexte Alpine partiel et fetch simulé. */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  AUTO_POLL_MS,
  beginAutoLaunch,
  cancelAutoLot,
  launchAutoLot,
  resumeAutoLot,
  watchAutoLot,
} from './auto-launch';
import { applyAutoRunUpdate, isCancelledRun } from './auto-runs';

// Réseau des lots Auto : lancement (hors file des requêtes longues), lot rejoint sur 409, refus,
// sondage de l'onglet lanceur quand un autre cours est affiché, annulation du lot entier.

let seq = 0;
const uuid = () => `aaaaaaaa-bbbb-4ccc-8ddd-${String(++seq).padStart(12, '0')}`;

const run = (id: string, status: string, steps: Array<[string, string]> = []) =>
  ({
    id,
    status,
    request: {},
    skipped: [],
    steps: steps.map(([agent, s], i) => ({ agent, gid: `${id}-g${i}`, status: s })),
  }) as any;

const makeCtx = (overrides: Record<string, unknown> = {}): any => ({
  currentProjectId: 'p1',
  currentProfile: { id: 'prof' },
  currentProject: { meta: { name: 'Histoire' }, totalCost: 0, costLog: [] },
  autoRuns: {},
  loading: {},
  showToast: vi.fn(),
  t: (key: string, params?: Record<string, unknown>) =>
    params ? `${key} ${JSON.stringify(params)}` : key,
  resolveError: (code: string) => `err:${code}`,
  goToView: vi.fn(),
  generateAuto: vi.fn(),
  ...overrides,
});

const launchOf = (runId: string) => ({
  projectId: 'p1',
  projectName: 'Histoire',
  runId,
  body: { lang: 'fr', ageGroup: 'enfant', useConsigne: true, count: 10 },
  key: 'sk-test-clé-du-clic'.replace('é', 'e'),
});

// Sans `<` (statut 2xx) : Lizard (Codacy) y lisait l'ouverture d'un type générique et comptait tout
// le reste du fichier dans cette fonction.
const reply = (status: number, body: unknown): any => {
  const ok = Math.trunc(status / 100) === 2;
  return { ok, status, statusText: 'x', json: () => Promise.resolve(body) };
};

beforeEach(() => {
  globalThis.fetch = vi.fn() as any;
});

afterEach(() => {
  vi.useRealTimers();
});

describe('launchAutoLot', () => {
  it('202 : corps et clé du clic, runId, lot suivi et sondé', async () => {
    vi.useFakeTimers();
    const ctx = makeCtx();
    const id = uuid();
    beginAutoLaunch(ctx, launchOf(id));
    vi.mocked(globalThis.fetch).mockResolvedValueOnce(reply(202, { run: run(id, 'analysing') }));
    await launchAutoLot(ctx, launchOf(id));
    const [url, init] = vi.mocked(globalThis.fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toBe('/api/projects/p1/generate/auto/start');
    expect(JSON.parse(String(init.body))).toEqual({ ...launchOf(id).body, runId: id });
    expect(new Headers(init.headers).get('X-EurekAI-AI-Key')).toBe('sk-test-cle-du-clic');
    expect(ctx.loading.auto).toBe(true);
    expect(ctx.autoRuns.p1).toMatchObject({ runId: id, launchedHere: true });
    expect(vi.getTimerCount()).toBe(1);
  });

  it('409 auto_busy : l’onglet rejoint le lot en cours, jamais un second lot', async () => {
    vi.useFakeTimers();
    const ctx = makeCtx();
    const mine = uuid();
    const theirs = uuid();
    beginAutoLaunch(ctx, launchOf(mine));
    vi.mocked(globalThis.fetch).mockResolvedValueOnce(
      reply(409, { error: 'auto_busy', run: run(theirs, 'running', [['quiz', 'pending']]) }),
    );
    await launchAutoLot(ctx, launchOf(mine));
    expect(ctx.autoRuns.p1.runId).toBe(theirs);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.autoJoined', 'info');
  });

  it('refus : lot oublié, erreur traduite avec « Réessayer », sauf un refus de modération', async () => {
    const ctx = makeCtx();
    const id = uuid();
    beginAutoLaunch(ctx, launchOf(id));
    vi.mocked(globalThis.fetch).mockResolvedValueOnce(reply(429, { error: 'rate_limited' }));
    await launchAutoLot(ctx, launchOf(id));
    expect(ctx.autoRuns.p1).toBeUndefined();
    expect(ctx.showToast.mock.calls[0][0]).toBe('toast.error {"error":"err:rate_limited"}');
    expect(typeof ctx.showToast.mock.calls[0][2]).toBe('function');

    beginAutoLaunch(ctx, launchOf(id));
    vi.mocked(globalThis.fetch).mockResolvedValueOnce(reply(400, { error: 'moderation.blocked' }));
    await launchAutoLot(ctx, launchOf(id));
    expect(ctx.showToast.mock.calls[1][2]).toBeNull();
  });

  it('cours quitté avant le refus : toast qui nomme le cours du lot', async () => {
    const ctx = makeCtx({ currentProjectId: 'p2' });
    const id = uuid();
    beginAutoLaunch(ctx, launchOf(id));
    vi.mocked(globalThis.fetch).mockResolvedValueOnce(reply(500, { error: 'internal_error' }));
    await launchAutoLot(ctx, launchOf(id));
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.autoFailedIn {"project":"Histoire"}',
      'error',
    );
  });
});

describe('resumeAutoLot (« Reprendre »)', () => {
  const resumeOf = (runId: string, retry = vi.fn()) => ({ ...launchOf(runId), body: {}, retry });

  // Bilan « interrompu » déjà affiché par cet onglet : le lot est tenu pour terminé.
  const interruptedHere = (ctx: any, id: string) => {
    applyAutoRunUpdate(ctx, 'p1', run(id, 'interrupted', [['quiz', 'interrupted']]));
    ctx.showToast.mockClear();
  };

  it('202 : runId seul et clé du clic, lot repris suivi de nouveau et sondé', async () => {
    vi.useFakeTimers();
    const ctx = makeCtx();
    const id = uuid();
    interruptedHere(ctx, id);
    beginAutoLaunch(ctx, resumeOf(id));
    const resumed = { ...run(id, 'running', [['quiz', 'pending']]), resumedAt: 'x' };
    vi.mocked(globalThis.fetch).mockResolvedValueOnce(reply(202, { run: resumed }));
    await resumeAutoLot(ctx, resumeOf(id));
    const [url, init] = vi.mocked(globalThis.fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toBe('/api/projects/p1/generate/auto/resume');
    expect(JSON.parse(String(init.body))).toEqual({ runId: id });
    expect(new Headers(init.headers).get('X-EurekAI-AI-Key')).toBe('sk-test-cle-du-clic');
    expect(ctx.autoRuns.p1).toMatchObject({ runId: id, launchedHere: true, run: resumed });
    expect(vi.getTimerCount()).toBe(1);
    expect(ctx.showToast).not.toHaveBeenCalled();
  });

  it('200 (lot terminé entre-temps) : lot oublié, aucun sondage, aucun message', async () => {
    vi.useFakeTimers();
    const ctx = makeCtx();
    const id = uuid();
    interruptedHere(ctx, id);
    beginAutoLaunch(ctx, resumeOf(id));
    const done = reply(200, { run: run(id, 'completed', [['quiz', 'completed']]) });
    vi.mocked(globalThis.fetch).mockResolvedValueOnce(done);
    await resumeAutoLot(ctx, resumeOf(id));
    expect(ctx.autoRuns.p1).toBeUndefined();
    expect(vi.getTimerCount()).toBe(0);
    expect(ctx.showToast).not.toHaveBeenCalled();
  });

  it('refus : lot oublié, « Réessayer » refait la même reprise (jamais un nouveau lot)', async () => {
    const ctx = makeCtx();
    const id = uuid();
    const retry = vi.fn();
    beginAutoLaunch(ctx, resumeOf(id, retry));
    vi.mocked(globalThis.fetch).mockResolvedValueOnce(reply(400, { error: 'no_sources' }));
    await resumeAutoLot(ctx, resumeOf(id, retry));
    expect(ctx.autoRuns.p1).toBeUndefined();
    expect(ctx.showToast.mock.calls[0][0]).toBe('toast.error {"error":"err:no_sources"}');
    ctx.showToast.mock.calls[0][2]();
    expect(retry).toHaveBeenCalled();
    expect(ctx.generateAuto).not.toHaveBeenCalled();
  });

  it('runId non UUID : aucune requête, lot oublié', async () => {
    const ctx = makeCtx();
    beginAutoLaunch(ctx, resumeOf('pas-un-uuid'));
    await resumeAutoLot(ctx, resumeOf('pas-un-uuid'));
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(ctx.autoRuns.p1).toBeUndefined();
  });
});

describe('sondage de l’onglet lanceur', () => {
  const tracked = (ctx: any, id: string) => {
    beginAutoLaunch(ctx, launchOf(id));
    ctx.autoRuns.p1.run = run(id, 'running', [['quiz', 'pending']]);
  };

  it('autre cours affiché : état relu toutes les 4 s, bilan qui nomme le cours, puis arrêt', async () => {
    vi.useFakeTimers();
    const ctx = makeCtx({ currentProjectId: 'p2' });
    const id = uuid();
    tracked(ctx, id);
    vi.mocked(globalThis.fetch).mockResolvedValueOnce(
      reply(200, { run: run(id, 'completed', [['quiz', 'completed']]) }),
    );
    watchAutoLot(ctx, 'p1');
    await vi.advanceTimersByTimeAsync(AUTO_POLL_MS);
    expect(vi.mocked(globalThis.fetch).mock.calls[0][0]).toBe(`/api/projects/p1/auto-runs/${id}`);
    expect(ctx.showToast.mock.calls[0][0]).toBe('toast.autoDoneIn {"project":"Histoire"}');
    expect(ctx.autoRuns.p1).toBeUndefined();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('cours du lot affiché : rien n’est lu (le flux SSE le suit), le sondage continue', async () => {
    vi.useFakeTimers();
    const ctx = makeCtx();
    tracked(ctx, uuid());
    watchAutoLot(ctx, 'p1');
    await vi.advanceTimersByTimeAsync(AUTO_POLL_MS * 2);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(1);
  });

  it('lot introuvable (cours supprimé) : oublié, sondage arrêté ; erreur réseau : nouvel essai', async () => {
    vi.useFakeTimers();
    const ctx = makeCtx({ currentProjectId: 'p2' });
    tracked(ctx, uuid());
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new TypeError('offline'));
    vi.mocked(globalThis.fetch).mockResolvedValueOnce(reply(404, { error: 'auto_run_not_found' }));
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    watchAutoLot(ctx, 'p1');
    await vi.advanceTimersByTimeAsync(AUTO_POLL_MS);
    expect(ctx.autoRuns.p1).toBeDefined();
    await vi.advanceTimersByTimeAsync(AUTO_POLL_MS);
    expect(ctx.autoRuns.p1).toBeUndefined();
    expect(vi.getTimerCount()).toBe(0);
    warn.mockRestore();
  });
});

describe('cancelAutoLot', () => {
  it('lancement pas encore parti : marqué annulé, aucune requête', async () => {
    const ctx = makeCtx();
    beginAutoLaunch(ctx, launchOf(uuid()));
    expect(await cancelAutoLot(ctx, 'p1')).toBe(true);
    expect(ctx.autoRuns.p1.cancelledHere).toBe(true);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('lot en cours : une requête, étapes reconnues annulées, aucun second message', async () => {
    const ctx = makeCtx();
    const id = uuid();
    beginAutoLaunch(ctx, launchOf(id));
    ctx.autoRuns.p1.run = run(id, 'running', [['quiz', 'pending']]);
    vi.mocked(globalThis.fetch).mockResolvedValueOnce(
      reply(200, { run: run(id, 'cancelled', [['quiz', 'cancelled']]) }),
    );
    expect(await cancelAutoLot(ctx, 'p1')).toBe(true);
    expect(vi.mocked(globalThis.fetch).mock.calls[0][0]).toBe(
      `/api/projects/p1/auto-runs/${id}/cancel`,
    );
    expect(isCancelledRun(id)).toBe(true);
    expect(ctx.autoRuns.p1).toBeUndefined();
    expect(ctx.showToast).not.toHaveBeenCalled();
  });
});
