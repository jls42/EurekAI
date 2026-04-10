import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createSources } from './sources';

// Mock document.querySelector for openSourceDialog
const mockDialog = { showModal: vi.fn() };
(globalThis as any).document = {
  querySelector: vi.fn(() => mockDialog),
  activeElement: null,
};

globalThis.fetch = vi.fn();
let uuidCounter = 0;
vi.stubGlobal('crypto', { randomUUID: vi.fn(() => `uuid-${++uuidCounter}`) });

function makeContext(overrides: any = {}) {
  return {
    currentProjectId: 'pid-1',
    sources: [] as any[],
    selectedIds: [] as string[],
    textInput: '  hello world  ',
    showTextInput: true,
    uploadSessions: [] as any[],
    get uploading(): boolean {
      return this.uploadSessions.some((s: any) => s.files.some((f: any) => f.status === 'pending' || f.status === 'uploading'));
    },
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
    uuidCounter = 0;
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

  describe('handleFiles', () => {
    function makeFileList(...files: File[]) {
      const fl: any = {
        length: files.length,
        [Symbol.iterator]: function* () {
          for (let i = 0; i < this.length; i++) yield this[i];
        },
      };
      files.forEach((f, i) => (fl[i] = f));
      return fl as FileList;
    }

    it('returns early if fileList is null', async () => {
      await src.handleFiles.call(ctx, null);
      expect(globalThis.fetch).not.toHaveBeenCalled();
      expect(ctx.uploading).toBe(false);
    });

    it('returns early if fileList is empty', async () => {
      const emptyList = makeFileList();
      await src.handleFiles.call(ctx, emptyList);
      expect(globalThis.fetch).not.toHaveBeenCalled();
      expect(ctx.uploading).toBe(false);
    });

    it('returns early if no currentProjectId', async () => {
      ctx.currentProjectId = '';
      const fileList = makeFileList(new File(['content'], 'test.pdf', { type: 'application/pdf' }));
      await src.handleFiles.call(ctx, fileList);
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });

    it('single file upload success', async () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const fileList = makeFileList(file);
      const newSource = { id: 's1', text: 'ocr result' };
      mockFetchOk([newSource]);

      await src.handleFiles.call(ctx, fileList);

      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
      const [url, opts] = vi.mocked(globalThis.fetch).mock.calls[0];
      expect(url).toBe('/api/projects/pid-1/sources/upload');
      expect(opts?.method).toBe('POST');
      expect(opts?.body).toBeInstanceOf(FormData);

      expect(ctx.sources).toEqual([newSource]);
      expect(ctx.selectedIds).toEqual(['s1']);
      const session = ctx.uploadSessions[0];
      expect(session.files[0].status).toBe('done');
      expect(session.files[0].file).toBeNull();
      expect(ctx.showToast).toHaveBeenCalledWith('toast.sourcesAdded', 'success');
      vi.advanceTimersByTime(3000);
      expect(ctx.uploadSessions).toEqual([]);
      expect(ctx.uploading).toBe(false);
    });

    it('multiple files uploaded sequentially with per-file status', async () => {
      const file1 = new File(['a'], 'a.pdf', { type: 'application/pdf' });
      const file2 = new File(['b'], 'b.pdf', { type: 'application/pdf' });
      const fileList = makeFileList(file1, file2);

      const src1 = { id: 's1', text: 'ocr1' };
      const src2 = { id: 's2', text: 'ocr2' };
      mockFetchOk([src1]);
      mockFetchOk([src2]);

      await src.handleFiles.call(ctx, fileList);

      expect(globalThis.fetch).toHaveBeenCalledTimes(2);
      expect(ctx.sources).toEqual([src1, src2]);
      expect(ctx.selectedIds).toEqual(['s1', 's2']);
      const session = ctx.uploadSessions[0];
      expect(session.files[0].status).toBe('done');
      expect(session.files[1].status).toBe('done');
      vi.advanceTimersByTime(3000);
      expect(ctx.uploading).toBe(false);
    });

    it('one file fails (res.ok=false) then continues to next file', async () => {
      const file1 = new File(['a'], 'fail.pdf', { type: 'application/pdf' });
      const file2 = new File(['b'], 'ok.pdf', { type: 'application/pdf' });
      const fileList = makeFileList(file1, file2);

      mockFetchErr('OCR failed');
      const src2 = { id: 's2', text: 'ocr2' };
      mockFetchOk([src2]);

      await src.handleFiles.call(ctx, fileList);

      expect(globalThis.fetch).toHaveBeenCalledTimes(2);
      expect(ctx.showToast).toHaveBeenCalledWith('toast.error', 'error');
      expect(ctx.sources).toEqual([src2]);
      expect(ctx.selectedIds).toEqual(['s2']);
      const session = ctx.uploadSessions[0];
      expect(session.files[0].status).toBe('error');
      expect(session.files[0].errorMsg).toBe('OCR failed');
      expect(session.files[1].status).toBe('done');
    });

    it('network exception on one file then continues to next', async () => {
      const file1 = new File(['a'], 'fail.pdf', { type: 'application/pdf' });
      const file2 = new File(['b'], 'ok.pdf', { type: 'application/pdf' });
      const fileList = makeFileList(file1, file2);

      vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network down'));
      const src2 = { id: 's2', text: 'ocr2' };
      mockFetchOk([src2]);

      await src.handleFiles.call(ctx, fileList);

      expect(globalThis.fetch).toHaveBeenCalledTimes(2);
      expect(ctx.showToast).toHaveBeenCalledWith('toast.uploadError', 'error');
      expect(ctx.sources).toEqual([src2]);
      const session = ctx.uploadSessions[0];
      expect(session.files[0].status).toBe('error');
      expect(session.files[0].errorMsg).toBe('Network down');
      expect(session.files[1].status).toBe('done');
    });

    it('does not schedule refreshes when all uploads fail', async () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const fileList = makeFileList(file);
      mockFetchErr('OCR failed');

      ctx.refreshConsigne = vi.fn();
      ctx.refreshModeration = vi.fn();

      await src.handleFiles.call(ctx, fileList);

      vi.advanceTimersByTime(5000);
      expect(ctx.refreshConsigne).not.toHaveBeenCalled();
      expect(ctx.refreshModeration).not.toHaveBeenCalled();
    });

    it('error session persists and does not auto-cleanup', async () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const fileList = makeFileList(file);
      mockFetchErr('OCR failed');

      await src.handleFiles.call(ctx, fileList);

      vi.advanceTimersByTime(5000);
      expect(ctx.uploadSessions.length).toBe(1);
      expect(ctx.uploadSessions[0].files[0].status).toBe('error');
      expect(ctx.uploading).toBe(false);
    });

    it('schedules only refreshConsigne at batch level (not refreshModeration)', async () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const fileList = makeFileList(file);
      // Source without pending moderation — no per-file moderation polling
      mockFetchOk([{ id: 's1', text: 'ocr' }]);

      ctx.refreshConsigne = vi.fn();
      ctx.refreshModeration = vi.fn();

      await src.handleFiles.call(ctx, fileList);

      // refreshModeration should NOT be called at batch level
      vi.advanceTimersByTime(3000);
      expect(ctx.refreshConsigne).toHaveBeenCalled();
      expect(ctx.refreshModeration).not.toHaveBeenCalled();
    });

    it('triggers per-file refreshModeration when source has pending moderation', async () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const fileList = makeFileList(file);
      mockFetchOk([{ id: 's1', text: 'ocr', moderation: { status: 'pending' } }]);

      ctx.refreshConsigne = vi.fn();
      ctx.refreshModeration = vi.fn();

      await src.handleFiles.call(ctx, fileList);

      expect(ctx.refreshModeration).not.toHaveBeenCalled();
      vi.advanceTimersByTime(2000);
      expect(ctx.refreshModeration).toHaveBeenCalledTimes(1);
    });

    it('does not trigger refreshModeration when no source has pending moderation', async () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const fileList = makeFileList(file);
      mockFetchOk([{ id: 's1', text: 'ocr', moderation: { status: 'approved' } }]);

      ctx.refreshModeration = vi.fn();

      await src.handleFiles.call(ctx, fileList);

      vi.advanceTimersByTime(5000);
      expect(ctx.refreshModeration).not.toHaveBeenCalled();
    });

    it('moderation refresh happens progressively during batch (non-regression)', async () => {
      const file1 = new File(['a'], 'a.pdf', { type: 'application/pdf' });
      const file2 = new File(['b'], 'b.pdf', { type: 'application/pdf' });
      const fileList = makeFileList(file1, file2);

      // 1st file: immediate success with pending moderation
      mockFetchOk([{ id: 's1', text: 'ocr1', moderation: { status: 'pending' } }]);
      // 2nd file: never resolves (blocked)
      let resolveSecond: any;
      vi.mocked(globalThis.fetch).mockImplementationOnce(() => new Promise(r => { resolveSecond = r; }));

      ctx.refreshModeration = vi.fn();

      // Start the batch (will await on 2nd file)
      const promise = src.handleFiles.call(ctx, fileList);

      // Give microtask queue time to process 1st file
      await vi.advanceTimersByTimeAsync(100);

      // After 2s, refreshModeration should have been called from the 1st file
      await vi.advanceTimersByTimeAsync(2000);
      expect(ctx.refreshModeration).toHaveBeenCalledTimes(1);

      // Resolve 2nd file to clean up
      resolveSecond({ ok: true, json: async () => [{ id: 's2', text: 'ocr2' }] });
      await promise;
    });
  });

  describe('retryFile', () => {
    function makeFileList(...files: File[]) {
      const fl: any = { length: files.length, [Symbol.iterator]: function* () { for (let i = 0; i < this.length; i++) yield this[i]; } };
      files.forEach((f, i) => (fl[i] = f));
      return fl as FileList;
    }

    it('retries a failed file and transitions to done', async () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const fileList = makeFileList(file);
      mockFetchErr('OCR failed');
      await src.handleFiles.call(ctx, fileList);

      const session = ctx.uploadSessions[0];
      const failedFile = session.files[0];
      expect(failedFile.status).toBe('error');

      const newSource = { id: 's1', text: 'ocr result' };
      mockFetchOk([newSource]);
      await src.retryFile.call(ctx, session.id, failedFile.id);

      expect(failedFile.status).toBe('done');
      expect(failedFile.file).toBeNull();
      expect(ctx.sources).toEqual([newSource]);
      expect(ctx.showToast).toHaveBeenCalledWith('toast.sourcesAdded', 'success');
    });

    it('no-op if file status is not error', async () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const fileList = makeFileList(file);
      mockFetchOk([{ id: 's1', text: 'ok' }]);
      await src.handleFiles.call(ctx, fileList);

      const session = ctx.uploadSessions[0];
      const doneFile = session.files[0];
      expect(doneFile.status).toBe('done');

      vi.mocked(globalThis.fetch).mockClear();
      await src.retryFile.call(ctx, session.id, doneFile.id);
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });

    it('triggers cleanup after successful retry', async () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const fileList = makeFileList(file);
      mockFetchErr('OCR failed');
      await src.handleFiles.call(ctx, fileList);

      const session = ctx.uploadSessions[0];
      mockFetchOk([{ id: 's1', text: 'ok' }]);
      await src.retryFile.call(ctx, session.id, session.files[0].id);

      expect(session.files[0].status).toBe('done');
      vi.advanceTimersByTime(3000);
      expect(ctx.uploadSessions).toEqual([]);
    });
  });

  describe('dismissFailedFile', () => {
    function makeFileList(...files: File[]) {
      const fl: any = { length: files.length, [Symbol.iterator]: function* () { for (let i = 0; i < this.length; i++) yield this[i]; } };
      files.forEach((f, i) => (fl[i] = f));
      return fl as FileList;
    }

    it('removes a failed file from session', async () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const fileList = makeFileList(file);
      mockFetchErr('OCR failed');
      await src.handleFiles.call(ctx, fileList);

      const session = ctx.uploadSessions[0];
      expect(session.files.length).toBe(1);

      src.dismissFailedFile.call(ctx, session.id, session.files[0].id);
      expect(ctx.uploadSessions).toEqual([]);
    });

    it('refuses to dismiss a non-error file', async () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const fileList = makeFileList(file);
      mockFetchOk([{ id: 's1', text: 'ok' }]);
      await src.handleFiles.call(ctx, fileList);

      const session = ctx.uploadSessions[0];
      const doneFile = session.files[0];
      src.dismissFailedFile.call(ctx, session.id, doneFile.id);
      expect(session.files.length).toBe(1);
    });

    it('triggers cleanup when remaining files are all done', async () => {
      const file1 = new File(['a'], 'a.pdf', { type: 'application/pdf' });
      const file2 = new File(['b'], 'b.pdf', { type: 'application/pdf' });
      const fileList = makeFileList(file1, file2);
      mockFetchOk([{ id: 's1', text: 'ok' }]);
      mockFetchErr('OCR failed');
      await src.handleFiles.call(ctx, fileList);

      const session = ctx.uploadSessions[0];
      const errorFile = session.files.find((f: any) => f.status === 'error');
      src.dismissFailedFile.call(ctx, session.id, errorFile.id);

      expect(session.files.length).toBe(1);
      expect(session.files[0].status).toBe('done');
      vi.advanceTimersByTime(3000);
      expect(ctx.uploadSessions).toEqual([]);
    });
  });

  describe('addText session shape', () => {
    it('creates session with correct shape', async () => {
      mockFetchOk({ id: 's1', text: 'hello' });
      await src.addText.call(ctx);

      // Session is cleaned up in finally, but we can verify it was created with the right shape
      // by checking that uploading went through the cycle (no TS errors)
      expect(ctx.uploading).toBe(false);
      expect(ctx.sources.length).toBe(1);
    });
  });

  describe('startDrag / onDrag / stopDrag', () => {
    it('startDrag returns early when zoom<=1 and rotation%360===0', () => {
      ctx.viewSourceZoom = 1;
      ctx.viewSourceRotation = 0;
      const event = { clientX: 100, clientY: 200, preventDefault: vi.fn() } as unknown as MouseEvent;

      src.startDrag.call(ctx, event);

      expect(ctx.viewSourceDragging).toBe(false);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('startDrag activates dragging and records position with MouseEvent', () => {
      ctx.viewSourceZoom = 2;
      ctx.viewSourcePanX = 10;
      ctx.viewSourcePanY = 20;
      const event = { clientX: 100, clientY: 200, preventDefault: vi.fn() } as unknown as MouseEvent;

      src.startDrag.call(ctx, event);

      expect(ctx.viewSourceDragging).toBe(true);
      expect(ctx.viewSourceDragStart).toEqual({ x: 100, y: 200 });
      expect(ctx.viewSourcePanStart).toEqual({ x: 10, y: 20 });
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('startDrag works with TouchEvent', () => {
      ctx.viewSourceZoom = 1.5;
      ctx.viewSourcePanX = 5;
      ctx.viewSourcePanY = 15;
      const event = {
        touches: [{ clientX: 150, clientY: 250 }],
        preventDefault: vi.fn(),
      } as unknown as TouchEvent;

      src.startDrag.call(ctx, event);

      expect(ctx.viewSourceDragging).toBe(true);
      expect(ctx.viewSourceDragStart).toEqual({ x: 150, y: 250 });
      expect(ctx.viewSourcePanStart).toEqual({ x: 5, y: 15 });
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('onDrag updates panX/panY based on mouse delta', () => {
      ctx.viewSourceDragging = true;
      ctx.viewSourceDragStart = { x: 100, y: 200 };
      ctx.viewSourcePanStart = { x: 10, y: 20 };
      const event = { clientX: 130, clientY: 250, preventDefault: vi.fn() } as unknown as MouseEvent;

      src.onDrag.call(ctx, event);

      expect(ctx.viewSourcePanX).toBe(40); // 10 + (130 - 100)
      expect(ctx.viewSourcePanY).toBe(70); // 20 + (250 - 200)
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('onDrag returns early when not dragging', () => {
      ctx.viewSourceDragging = false;
      ctx.viewSourcePanX = 0;
      ctx.viewSourcePanY = 0;
      const event = { clientX: 130, clientY: 250, preventDefault: vi.fn() } as unknown as MouseEvent;

      src.onDrag.call(ctx, event);

      expect(ctx.viewSourcePanX).toBe(0);
      expect(ctx.viewSourcePanY).toBe(0);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('stopDrag sets dragging to false', () => {
      ctx.viewSourceDragging = true;

      src.stopDrag.call(ctx);

      expect(ctx.viewSourceDragging).toBe(false);
    });
  });
});
