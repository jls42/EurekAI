import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createConsigne, syncConsigneAfterDelete } from './consigne';

globalThis.fetch = vi.fn();

function makeContext(overrides: any = {}) {
  return {
    currentProjectId: 'pid-1',
    currentProject: { totalCost: 0, costLog: [] as any[] },
    currentProfile: null as any,
    moderationDefaults: {} as Record<string, string[]>,
    sources: [{ id: 's1' }] as any[],
    consigne: null as any,
    consigneLoading: false,
    locale: 'fr',
    t: vi.fn((key: string) => key),
    showToast: vi.fn(),
    refreshIcons: vi.fn(),
    resolveError: vi.fn((code: string) => `resolved:${code}`),
    detectConsigne: vi.fn(),
    $nextTick: vi.fn((cb: () => void) => cb()),
    $refs: {
      consigneDialog: { showModal: vi.fn(), close: vi.fn() },
    },
    apiBase: vi.fn(() => '/api/projects/pid-1'),
    ...overrides,
  };
}

// Consigne montrable pour un profil non modéré : trouvée, avec des points.
const FOUND = { found: true, text: 'Do exercises 1-5', keyTopics: ['ex 1-5'], sourceIds: ['s1'] };

describe('createConsigne', () => {
  let consigne: ReturnType<typeof createConsigne>;
  let ctx: ReturnType<typeof makeContext>;

  beforeEach(() => {
    consigne = createConsigne();
    ctx = makeContext();
    vi.mocked(globalThis.fetch).mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('refreshConsigne', () => {
    it('fetches project and updates consigne', async () => {
      const projectConsigne = { found: true, text: 'Do exercise 1-5' };
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ consigne: projectConsigne }),
      } as any);

      await consigne.refreshConsigne.call(ctx);

      expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/pid-1');
      expect(ctx.consigne).toEqual(projectConsigne);
    });

    it('rafraîchit avec le profil courant qui ouvre le projet', async () => {
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as any);
      const withProfile = makeContext({ currentProfile: { id: 'profile-A' } });

      await consigne.refreshConsigne.call(withProfile);

      expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/pid-1?profileId=profile-A');
    });

    it('returns early if no projectId', async () => {
      ctx.currentProjectId = '';
      await consigne.refreshConsigne.call(ctx);
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });

    it('does not update consigne if project has none', async () => {
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as any);

      await consigne.refreshConsigne.call(ctx);
      expect(ctx.consigne).toBeNull();
    });

    it('silently catches errors', async () => {
      vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network'));
      await consigne.refreshConsigne.call(ctx);
      // Should not throw
      expect(ctx.consigne).toBeNull();
    });
  });

  describe('detectConsigne', () => {
    it('posts, updates consigne on success, shows modal if found', async () => {
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ consigne: FOUND, costDelta: 0 }),
      } as any);

      await consigne.detectConsigne.call(ctx);

      expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/pid-1/detect-consigne', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang: 'fr' }),
      });
      expect(ctx.consigne).toEqual(FOUND);
      expect(ctx.showToast).toHaveBeenCalledWith('toast.consigneDetected', 'success');
      expect(ctx.$refs.consigneDialog.showModal).toHaveBeenCalled();
      expect(ctx.consigneLoading).toBe(false);
    });

    it('shows info toast when not found', async () => {
      const detected = { found: false, text: '', keyTopics: [], sourceIds: ['s1'] };
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ consigne: detected, costDelta: 0 }),
      } as any);

      await consigne.detectConsigne.call(ctx);

      expect(ctx.consigne).toEqual(detected);
      expect(ctx.showToast).toHaveBeenCalledWith('toast.noConsigne', 'info');
      // showModal should NOT have been called after the close in setup
      // It was called once at close, but showModal for the found case should not happen
      expect(ctx.$refs.consigneDialog.showModal).not.toHaveBeenCalled();
      expect(ctx.consigneLoading).toBe(false);
    });

    it('shows error toast on exception', async () => {
      vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Server down'));

      await consigne.detectConsigne.call(ctx);

      expect(ctx.showToast).toHaveBeenCalledWith('toast.consigneError', 'error');
      expect(ctx.consigneLoading).toBe(false);
    });

    it('returns early if no projectId', async () => {
      ctx.currentProjectId = '';
      await consigne.detectConsigne.call(ctx);
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });

    it('closes consigne dialog before starting', async () => {
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ consigne: null, costDelta: 0 }),
      } as any);

      await consigne.detectConsigne.call(ctx);

      expect(ctx.$refs.consigneDialog.close).toHaveBeenCalled();
    });

    it('shows analyzing toast at start', async () => {
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ consigne: null, costDelta: 0 }),
      } as any);

      await consigne.detectConsigne.call(ctx);

      expect(ctx.showToast).toHaveBeenCalledWith('toast.consigneAnalyzing', 'info');
    });

    it('ajoute le costDelta au total du projet (libellé detect-consigne)', async () => {
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ consigne: FOUND, costDelta: 0.0123 }),
      } as any);

      await consigne.detectConsigne.call(ctx);

      expect(ctx.currentProject.totalCost).toBeCloseTo(0.0123, 6);
      expect(ctx.currentProject.costLog).toEqual([
        expect.objectContaining({ route: 'detect-consigne', cost: 0.0123 }),
      ]);
    });

    it('consigne non montrable (profil modéré, provenance non vérifiée) : pas de dialogue', async () => {
      const moderated = makeContext({
        currentProfile: { id: 'p', useModeration: true, ageGroup: 'enfant' },
        sources: [{ id: 's1' }],
      });
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ consigne: FOUND, costDelta: 0 }),
      } as any);

      await consigne.detectConsigne.call(moderated);

      expect(moderated.consigne).toEqual(FOUND);
      expect(moderated.showToast).toHaveBeenCalledWith('toast.noConsigne', 'info');
      expect(moderated.$refs.consigneDialog.showModal).not.toHaveBeenCalled();
    });

    it.each([
      ['moderation.pending', 409],
      ['moderation.error', 503],
      ['no_sources', 400],
      ['quota_exceeded', 500],
    ])('refus %s : toast traduit par resolveError, avec « Réessayer »', async (code, status) => {
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: false,
        status,
        statusText: 'HTTP',
        json: async () => ({ error: code }),
      } as any);

      await consigne.detectConsigne.call(ctx);

      expect(ctx.resolveError).toHaveBeenCalledWith(code);
      expect(ctx.t).toHaveBeenCalledWith('toast.error', { error: `resolved:${code}` });
      const [, type, retry] = ctx.showToast.mock.calls.at(-1)!;
      expect(type).toBe('error');
      expect(retry).toEqual(expect.any(Function));
      retry();
      expect(ctx.detectConsigne).toHaveBeenCalled();
      expect(ctx.consigne).toBeNull();
      expect(ctx.consigneLoading).toBe(false);
    });

    it('refus moderation.blocked : toast sans « Réessayer » (même refus assuré)', async () => {
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: async () => ({ error: 'moderation.blocked' }),
      } as any);

      await consigne.detectConsigne.call(ctx);

      expect(ctx.showToast).toHaveBeenLastCalledWith('toast.error', 'error', null);
      expect(ctx.$refs.consigneDialog.showModal).not.toHaveBeenCalled();
    });

    it('refus sans corps JSON : statut HTTP traduit', async () => {
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: false,
        status: 502,
        statusText: 'Bad Gateway',
        json: async () => {
          throw new SyntaxError('Unexpected token <');
        },
      } as any);

      await consigne.detectConsigne.call(ctx);

      expect(ctx.resolveError).toHaveBeenCalledWith('Bad Gateway');
      expect(ctx.showToast).toHaveBeenLastCalledWith('toast.error', 'error', expect.any(Function));
    });

    it('projet changé pendant la détection : réponse ignorée', async () => {
      vi.mocked(globalThis.fetch).mockImplementationOnce(async () => {
        ctx.currentProjectId = 'pid-2';
        return { ok: true, json: async () => ({ consigne: FOUND, costDelta: 0.5 }) } as any;
      });

      await consigne.detectConsigne.call(ctx);

      expect(ctx.consigne).toBeNull();
      expect(ctx.currentProject.totalCost).toBe(0);
      expect(ctx.showToast).toHaveBeenCalledTimes(1); // seulement « analyse en cours »
      expect(ctx.consigneLoading).toBe(false);
    });
  });

  // Relecture de la consigne après la vérification des sources : la détection de fond attend la
  // modération puis appelle le LLM, elle aboutit donc après la fin du suivi des modérations.
  describe('followConsigneDetection', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("relit aussitôt, puis toutes les 3 s jusqu'à une consigne qui couvre les sources", async () => {
      let reads = 0;
      ctx.refreshConsigne = vi.fn(async () => {
        reads++;
        if (reads === 3) ctx.consigne = FOUND;
      });

      consigne.followConsigneDetection.call(ctx, 'pid-1');
      await vi.advanceTimersByTimeAsync(0);
      expect(ctx.refreshConsigne).toHaveBeenCalledTimes(1);
      await vi.advanceTimersByTimeAsync(3000);
      expect(ctx.refreshConsigne).toHaveBeenCalledTimes(2);
      await vi.advanceTimersByTimeAsync(3000);
      expect(ctx.refreshConsigne).toHaveBeenCalledTimes(3);
      await vi.advanceTimersByTimeAsync(30_000);
      expect(ctx.refreshConsigne).toHaveBeenCalledTimes(3);
    });

    it('consigne dont la provenance ne couvre pas la nouvelle source : relectures bornées (1 + 4)', async () => {
      ctx.sources = [{ id: 's1' }, { id: 'nouvelle' }];
      ctx.consigne = FOUND; // provenance ['s1'] : détection de fond pas encore passée
      ctx.refreshConsigne = vi.fn(async () => {});

      consigne.followConsigneDetection.call(ctx, 'pid-1');
      await vi.advanceTimersByTimeAsync(60_000);

      expect(ctx.refreshConsigne).toHaveBeenCalledTimes(5);
    });

    it('profil modéré : seules les sources vérifiées sûres sont attendues', async () => {
      ctx.currentProfile = { id: 'p', useModeration: true, ageGroup: 'enfant' };
      ctx.sources = [
        { id: 's1', moderation: { status: 'safe', categories: {} } },
        { id: 'signalee', moderation: { status: 'unsafe', categories: {} } },
      ];
      ctx.consigne = FOUND;
      ctx.refreshConsigne = vi.fn(async () => {});

      consigne.followConsigneDetection.call(ctx, 'pid-1');
      await vi.advanceTimersByTimeAsync(60_000);

      expect(ctx.refreshConsigne).toHaveBeenCalledTimes(1);
    });

    it("projet changé : la relecture s'arrête", async () => {
      ctx.refreshConsigne = vi.fn(async () => {
        ctx.currentProjectId = 'pid-2';
      });

      consigne.followConsigneDetection.call(ctx, 'pid-1');
      await vi.advanceTimersByTimeAsync(60_000);

      expect(ctx.refreshConsigne).toHaveBeenCalledTimes(1);
    });

    it('une nouvelle demande remplace la relecture en cours (une seule à la fois)', async () => {
      ctx.refreshConsigne = vi.fn(async () => {});

      consigne.followConsigneDetection.call(ctx, 'pid-1');
      await vi.advanceTimersByTimeAsync(0);
      consigne.followConsigneDetection.call(ctx, 'pid-1');
      await vi.advanceTimersByTimeAsync(0);
      expect(ctx.refreshConsigne).toHaveBeenCalledTimes(2);

      await vi.advanceTimersByTimeAsync(60_000);
      // 2 relectures immédiates + 4 de la seule relecture restante.
      expect(ctx.refreshConsigne).toHaveBeenCalledTimes(6);
    });
  });

  describe('syncConsigneAfterDelete', () => {
    it.each([
      ['consigne effacée par le serveur', { ok: true, consigne: null }, null],
      ['consigne restante', { ok: true, consigne: FOUND }, FOUND],
    ])('%s → consigne locale resynchronisée', async (_label, body, expected) => {
      ctx.consigne = { found: true, text: 'ancienne', keyTopics: ['x'] };

      await syncConsigneAfterDelete(ctx as any, { ok: true, json: async () => body } as any);

      expect(ctx.consigne).toEqual(expected);
    });

    it.each([
      ['réponse en échec', { ok: false, json: async () => ({ consigne: null }) }],
      ['corps sans champ consigne', { ok: true, json: async () => ({ ok: true }) }],
      ['corps illisible', { ok: true }],
    ])('%s → consigne locale inchangée', async (_label, res) => {
      const before = { found: true, text: 'ancienne', keyTopics: ['x'] };
      ctx.consigne = before;

      await syncConsigneAfterDelete(ctx as any, res as any);

      expect(ctx.consigne).toBe(before);
    });
  });
});
