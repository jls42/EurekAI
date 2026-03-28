import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createSources } from './sources';

// Mock document.querySelector for openSourceDialog
const mockDialog = { showModal: vi.fn() };
(globalThis as any).document = {
  querySelector: vi.fn(() => mockDialog),
  activeElement: null,
};

globalThis.fetch = vi.fn();

function makeContext(overrides: any = {}) {
  return {
    currentProjectId: 'pid-1',
    sources: [] as any[],
    selectedIds: [] as string[],
    textInput: '  hello world  ',
    showTextInput: true,
    uploading: false,
    uploadProgress: { current: 0, total: 0, filename: '' },
    dragging: false,
    locale: 'fr',
    viewSource: null as any,
    viewSourceMode: 'ocr',
    viewSourceZoom: 1,
    viewSourceRotation: 0,
    viewSourceRotations: {} as Record<string, number>,
    viewSourcePanX: 0,
    viewSourcePanY: 0,
    viewSourceDragging: false,
    viewSourceDragStart: { x: 0, y: 0 },
    viewSourcePanStart: { x: 0, y: 0 },
    t: vi.fn((key: string) => key),
    showToast: vi.fn(),
    refreshIcons: vi.fn(),
    refreshConsigne: vi.fn(),
    refreshModeration: vi.fn(),
    resolveError: vi.fn((e: string) => e),
    $nextTick: vi.fn((cb: () => void) => cb()),
    $refs: {
      sourceDialog: { showModal: vi.fn(), close: vi.fn() },
    },
    apiBase: vi.fn(() => '/api/projects/pid-1'),
    handleFiles: vi.fn(),
    ...overrides,
  };
}

function mockFetchOk(data: any) {
  return vi.mocked(globalThis.fetch).mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  } as any);
}

function mockFetchErr(error: string) {
  return vi.mocked(globalThis.fetch).mockResolvedValueOnce({
    ok: false,
    statusText: 'Bad Request',
    json: async () => ({ error }),
  } as any);
}

describe('createSources', () => {
  let src: ReturnType<typeof createSources>;
  let ctx: ReturnType<typeof makeContext>;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.mocked(globalThis.fetch).mockClear();
    src = createSources();
    ctx = makeContext();
    // Bind refreshModeration from the module itself so it can be called
    (ctx as any).refreshModeration = src.refreshModeration.bind(ctx);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('addText', () => {
    it('returns early if text is empty', async () => {
      ctx.textInput = '   ';
      await src.addText.call(ctx);
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });

    it('returns early if no projectId', async () => {
      ctx.currentProjectId = '';
      await src.addText.call(ctx);
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });

    it('makes fetch, adds source on success', async () => {
      const source = { id: 's1', text: 'hello world' };
      mockFetchOk(source);
      await src.addText.call(ctx);

      expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/pid-1/sources/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: 'hello world', lang: 'fr' }),
      });
      expect(ctx.sources).toEqual([source]);
      expect(ctx.selectedIds).toEqual(['s1']);
      expect(ctx.textInput).toBe('');
      expect(ctx.showTextInput).toBe(false);
      expect(ctx.showToast).toHaveBeenCalledWith('toast.textAdded', 'success');
      expect(ctx.uploading).toBe(false);
    });

    it('shows error on failure', async () => {
      mockFetchErr('Invalid text');
      await src.addText.call(ctx);

      expect(ctx.sources).toEqual([]);
      expect(ctx.showToast).toHaveBeenCalledWith('toast.error', 'error');
      expect(ctx.uploading).toBe(false);
    });

    it('shows network error on exception', async () => {
      vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network down'));
      await src.addText.call(ctx);

      expect(ctx.showToast).toHaveBeenCalledWith('toast.error', 'error', expect.any(Function));
      expect(ctx.uploading).toBe(false);
    });
  });

  describe('deleteSource', () => {
    it('deletes via fetch, removes from sources and selectedIds', async () => {
      ctx.sources = [
        { id: 's1', text: 'a' },
        { id: 's2', text: 'b' },
      ];
      ctx.selectedIds = ['s1', 's2'];
      vi.mocked(globalThis.fetch).mockResolvedValueOnce({ ok: true } as any);

      await src.deleteSource.call(ctx, 's1');

      expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/pid-1/sources/s1', {
        method: 'DELETE',
      });
      expect(ctx.sources).toEqual([{ id: 's2', text: 'b' }]);
      expect(ctx.selectedIds).toEqual(['s2']);
      expect(ctx.showToast).toHaveBeenCalledWith('toast.sourceDeleted', 'info');
    });
  });

  describe('openSourceDialog', () => {
    it('sets viewSource and opens dialog', () => {
      const mockSrc = { id: 's1', text: 'hello' };
      mockDialog.showModal.mockClear();

      src.openSourceDialog.call(ctx, mockSrc);

      expect(ctx.viewSource).toBe(mockSrc);
      expect(ctx.viewSourceMode).toBe('ocr');
      expect(ctx.viewSourceZoom).toBe(1);
      expect(mockDialog.showModal).toHaveBeenCalled();
    });

    it('uses stored rotation for source', () => {
      ctx.viewSourceRotations = { s1: 180 };
      const mockSrc = { id: 's1', text: 'hello' };

      src.openSourceDialog.call(ctx, mockSrc);

      expect(ctx.viewSourceRotation).toBe(180);
    });
  });

  describe('zoomIn / zoomOut / resetZoom', () => {
    it('zoomIn increases zoom by 0.25', () => {
      ctx.viewSourceZoom = 1;
      src.zoomIn.call(ctx);
      expect(ctx.viewSourceZoom).toBe(1.25);
    });

    it('zoomIn caps at 3', () => {
      ctx.viewSourceZoom = 2.9;
      src.zoomIn.call(ctx);
      expect(ctx.viewSourceZoom).toBe(3);
    });

    it('zoomOut decreases zoom by 0.25', () => {
      ctx.viewSourceZoom = 1.5;
      src.zoomOut.call(ctx);
      expect(ctx.viewSourceZoom).toBe(1.25);
    });

    it('zoomOut caps at 0.5', () => {
      ctx.viewSourceZoom = 0.6;
      src.zoomOut.call(ctx);
      expect(ctx.viewSourceZoom).toBe(0.5);
    });

    it('resetZoom resets zoom, rotation, and pan', () => {
      ctx.viewSourceZoom = 2;
      ctx.viewSourceRotation = 90;
      ctx.viewSourcePanX = 50;
      ctx.viewSourcePanY = 50;
      ctx.viewSource = { id: 's1' };
      ctx.viewSourceRotations = { s1: 90 };

      src.resetZoom.call(ctx);

      expect(ctx.viewSourceZoom).toBe(1);
      expect(ctx.viewSourceRotation).toBe(0);
      expect(ctx.viewSourcePanX).toBe(0);
      expect(ctx.viewSourcePanY).toBe(0);
      expect(ctx.viewSourceRotations.s1).toBeUndefined();
    });
  });

  describe('rotateLeft / rotateRight', () => {
    it('rotateLeft subtracts 90', () => {
      ctx.viewSource = { id: 's1' };
      ctx.viewSourceRotation = 0;
      src.rotateLeft.call(ctx);
      expect(ctx.viewSourceRotation).toBe(-90);
      expect(ctx.viewSourceRotations.s1).toBe(-90);
    });

    it('rotateRight adds 90', () => {
      ctx.viewSource = { id: 's1' };
      ctx.viewSourceRotation = 0;
      src.rotateRight.call(ctx);
      expect(ctx.viewSourceRotation).toBe(90);
      expect(ctx.viewSourceRotations.s1).toBe(90);
    });

    it('stores rotation per source', () => {
      ctx.viewSource = { id: 's1' };
      ctx.viewSourceRotation = 0;
      src.rotateRight.call(ctx);
      src.rotateRight.call(ctx);
      expect(ctx.viewSourceRotations.s1).toBe(180);
    });
  });

  describe('closeSourceDialog', () => {
    it('closes dialog and resets viewSource', () => {
      ctx.viewSource = { id: 's1' };
      src.closeSourceDialog.call(ctx);

      expect(ctx.$refs.sourceDialog.close).toHaveBeenCalled();
      expect(ctx.viewSource).toBeNull();
    });
  });

  describe('handleDrop', () => {
    it('calls handleFiles with dataTransfer files', () => {
      const files = [new File(['test'], 'test.txt')];
      const event = { dataTransfer: { files } } as unknown as DragEvent;
      src.handleDrop.call(ctx, event);

      expect(ctx.dragging).toBe(false);
      expect(ctx.handleFiles).toHaveBeenCalledWith(files);
    });
  });

  describe('refreshModeration', () => {
    it('fetches project and updates source moderation', async () => {
      ctx.sources = [
        { id: 's1', text: 'a', moderation: null },
        { id: 's2', text: 'b', moderation: null },
      ];
      mockFetchOk({
        sources: [
          { id: 's1', moderation: { flagged: false } },
          { id: 's2', moderation: { flagged: true } },
        ],
      });

      await src.refreshModeration.call(ctx);

      expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/pid-1');
      expect(ctx.sources[0].moderation).toEqual({ flagged: false });
      expect(ctx.sources[1].moderation).toEqual({ flagged: true });
    });

    it('returns early if no projectId', async () => {
      ctx.currentProjectId = '';
      vi.mocked(globalThis.fetch).mockClear();
      await src.refreshModeration.call(ctx);
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });
  });
});
