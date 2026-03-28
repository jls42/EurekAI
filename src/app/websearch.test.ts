import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createWebsearch } from './websearch';

globalThis.fetch = vi.fn();

function makeContext(overrides: any = {}) {
  return {
    currentProjectId: 'pid-1',
    webQuery: '  photosynthesis  ',
    showWebInput: true,
    sources: [] as any[],
    selectedIds: [] as string[],
    loading: { websearch: false } as Record<string, boolean>,
    currentProfile: { ageGroup: 'enfant' },
    t: vi.fn((key: string) => key),
    showToast: vi.fn(),
    refreshIcons: vi.fn(),
    refreshModeration: vi.fn(),
    resolveError: vi.fn((e: string) => e),
    $nextTick: vi.fn((cb: () => void) => cb()),
    apiBase: vi.fn(() => '/api/projects/pid-1'),
    ...overrides,
  };
}

describe('createWebsearch', () => {
  let ws: ReturnType<typeof createWebsearch>;
  let ctx: ReturnType<typeof makeContext>;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.mocked(globalThis.fetch).mockClear();
    ws = createWebsearch();
    ctx = makeContext();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('searchWeb', () => {
    it('returns early if query is empty', async () => {
      ctx.webQuery = '   ';
      await ws.searchWeb.call(ctx);
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });

    it('returns early if no projectId', async () => {
      ctx.currentProjectId = '';
      await ws.searchWeb.call(ctx);
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });

    it('fetches, adds source, resets query on success', async () => {
      const source = { id: 's1', type: 'websearch', text: 'Results about photosynthesis' };
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => source,
      } as any);

      await ws.searchWeb.call(ctx);

      expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/pid-1/sources/websearch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'photosynthesis', ageGroup: 'enfant' }),
      });
      expect(ctx.sources).toEqual([source]);
      expect(ctx.selectedIds).toEqual(['s1']);
      expect(ctx.webQuery).toBe('');
      expect(ctx.showWebInput).toBe(false);
      expect(ctx.showToast).toHaveBeenCalledWith('toast.webSearchAdded', 'success');
      expect(ctx.loading.websearch).toBe(false);
    });

    it('shows error toast on failed response', async () => {
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: false,
        statusText: 'Server Error',
        json: async () => ({ error: 'Search failed' }),
      } as any);

      await ws.searchWeb.call(ctx);

      expect(ctx.showToast).toHaveBeenCalledWith('toast.error', 'error');
      expect(ctx.sources).toEqual([]);
      expect(ctx.loading.websearch).toBe(false);
    });

    it('shows network error toast on exception', async () => {
      vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network timeout'));

      await ws.searchWeb.call(ctx);

      expect(ctx.showToast).toHaveBeenCalledWith('toast.webSearchError', 'error', expect.any(Function));
      expect(ctx.loading.websearch).toBe(false);
    });

    it('sets loading.websearch during execution', async () => {
      let resolvePromise: (v: any) => void;
      vi.mocked(globalThis.fetch).mockReturnValueOnce(
        new Promise((resolve) => {
          resolvePromise = resolve;
        }) as any,
      );

      const promise = ws.searchWeb.call(ctx);
      expect(ctx.loading.websearch).toBe(true);

      resolvePromise!({
        ok: true,
        json: async () => ({ id: 's1' }),
      });
      await promise;
      expect(ctx.loading.websearch).toBe(false);
    });
  });
});
