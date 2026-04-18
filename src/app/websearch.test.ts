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
    locale: 'fr',
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
        body: JSON.stringify({ query: 'photosynthesis', lang: 'fr', ageGroup: 'enfant' }),
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

      expect(ctx.showToast).toHaveBeenCalledWith(
        'toast.webSearchError',
        'error',
        expect.any(Function),
      );
      expect(ctx.loading.websearch).toBe(false);
    });

    it('retry callback in error toast re-invokes searchWeb', async () => {
      // Bind searchWeb to the context so `this.searchWeb()` works in the retry callback
      ctx.searchWeb = ws.searchWeb.bind(ctx);

      vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network timeout'));

      await ctx.searchWeb();

      // Extract the retry callback (3rd argument to showToast)
      const retryCallback = ctx.showToast.mock.calls[0][2];
      expect(typeof retryCallback).toBe('function');

      // When called, the retry callback should invoke searchWeb again
      const source = { id: 's1', type: 'websearch', text: 'Results' };
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => source,
      } as any);

      // Reset query since it was preserved on error
      ctx.webQuery = 'photosynthesis';
      await retryCallback();

      expect(globalThis.fetch).toHaveBeenCalledTimes(2);
      expect(ctx.sources).toEqual([source]);
    });

    it('uses fallback ageGroup when currentProfile is null', async () => {
      ctx.currentProfile = null;
      const source = { id: 's1', type: 'websearch', text: 'Results' };
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => source,
      } as any);

      await ws.searchWeb.call(ctx);

      expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/pid-1/sources/websearch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'photosynthesis', lang: 'fr', ageGroup: 'enfant' }),
      });
    });

    it('passes locale from context', async () => {
      ctx.locale = 'en';
      const source = { id: 's1', type: 'websearch', text: 'Results' };
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => source,
      } as any);

      await ws.searchWeb.call(ctx);

      expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/pid-1/sources/websearch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'photosynthesis', lang: 'en', ageGroup: 'enfant' }),
      });
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
