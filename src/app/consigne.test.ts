import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createConsigne } from './consigne';

globalThis.fetch = vi.fn();

function makeContext(overrides: any = {}) {
  return {
    currentProjectId: 'pid-1',
    consigne: null as any,
    consigneLoading: false,
    locale: 'fr',
    t: vi.fn((key: string) => key),
    showToast: vi.fn(),
    refreshIcons: vi.fn(),
    $nextTick: vi.fn((cb: () => void) => cb()),
    $refs: {
      consigneDialog: { showModal: vi.fn(), close: vi.fn() },
    },
    apiBase: vi.fn(() => '/api/projects/pid-1'),
    ...overrides,
  };
}

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
      const detected = { found: true, text: 'Do exercises 1-5', type: 'exercises' };
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => detected,
      } as any);

      await consigne.detectConsigne.call(ctx);

      expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/pid-1/detect-consigne', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang: 'fr' }),
      });
      expect(ctx.consigne).toEqual(detected);
      expect(ctx.showToast).toHaveBeenCalledWith('toast.consigneDetected', 'success');
      expect(ctx.$refs.consigneDialog.showModal).toHaveBeenCalled();
      expect(ctx.consigneLoading).toBe(false);
    });

    it('shows info toast when not found', async () => {
      const detected = { found: false };
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => detected,
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
        json: async () => ({ found: false }),
      } as any);

      await consigne.detectConsigne.call(ctx);

      expect(ctx.$refs.consigneDialog.close).toHaveBeenCalled();
    });

    it('shows analyzing toast at start', async () => {
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ found: false }),
      } as any);

      await consigne.detectConsigne.call(ctx);

      expect(ctx.showToast).toHaveBeenCalledWith('toast.consigneAnalyzing', 'info');
    });
  });
});
