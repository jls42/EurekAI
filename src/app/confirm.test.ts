import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createConfirm } from './confirm';

// Mock document for activeElement
(globalThis as any).document = {
  activeElement: null,
};

function makeContext(overrides: any = {}) {
  return {
    confirmTarget: '',
    confirmCallback: null as (() => void) | null,
    confirmTrigger: null as any,
    abortControllers: {} as Record<string, AbortController>,
    abortControllersByGid: {} as Record<string, AbortController>,
    pendingById: {} as Record<string, any>,
    currentProjectId: 'pid-1',
    loading: {
      summary: false,
      flashcards: false,
      quiz: false,
      podcast: false,
      'quiz-vocal': false,
      image: false,
      'fill-blank': false,
      auto: false,
      all: false,
      voice: false,
      websearch: false,
    } as Record<string, boolean>,
    t: vi.fn((key: string, p?: any) => (p ? `${key}:${JSON.stringify(p)}` : key)),
    showToast: vi.fn(),
    $nextTick: vi.fn((cb: () => void) => cb()),
    $refs: {
      confirmDialog: { showModal: vi.fn(), close: vi.fn() },
    },
    ...overrides,
  };
}

describe('createConfirm', () => {
  let confirm: ReturnType<typeof createConfirm>;
  let ctx: ReturnType<typeof makeContext>;

  beforeEach(() => {
    confirm = createConfirm();
    ctx = makeContext();
    (globalThis as any).document.activeElement = null;
  });

  describe('confirmDelete', () => {
    it('sets target via t(), stores callback, opens dialog', () => {
      const callback = vi.fn();

      confirm.confirmDelete.call(ctx, 'projet', callback);

      expect(ctx.t).toHaveBeenCalledWith('confirm.project');
      expect(ctx.confirmTarget).toBe('confirm.project'); // t returns the key
      expect(ctx.confirmCallback).toBe(callback);
      expect(ctx.$refs.confirmDialog.showModal).toHaveBeenCalled();
    });

    it('uses raw target if not in confirmLabels', () => {
      const callback = vi.fn();

      confirm.confirmDelete.call(ctx, 'custom item', callback);

      expect(ctx.confirmTarget).toBe('custom item');
    });

    it('stores document.activeElement as confirmTrigger', () => {
      const fakeElement = { focus: vi.fn() };
      (globalThis as any).document.activeElement = fakeElement;

      confirm.confirmDelete.call(ctx, 'source', vi.fn());

      expect(ctx.confirmTrigger).toBe(fakeElement);
    });
  });

  describe('executeConfirm', () => {
    it('calls callback and closes dialog', () => {
      const callback = vi.fn();
      ctx.confirmCallback = callback;

      confirm.executeConfirm.call(ctx);

      expect(ctx.$refs.confirmDialog.close).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledOnce();
      expect(ctx.confirmCallback).toBeNull();
    });

    it('restores focus to trigger element', () => {
      const fakeButton = { focus: vi.fn() };
      ctx.confirmTrigger = fakeButton;
      ctx.confirmCallback = vi.fn();

      confirm.executeConfirm.call(ctx);

      expect(fakeButton.focus).toHaveBeenCalled();
      expect(ctx.confirmTrigger).toBeNull();
    });

    it('does nothing if no callback', () => {
      ctx.confirmCallback = null;
      confirm.executeConfirm.call(ctx);
      expect(ctx.$refs.confirmDialog.close).toHaveBeenCalled();
    });
  });

  describe('closeConfirmDialog', () => {
    it('clears callback and closes dialog', () => {
      ctx.confirmCallback = vi.fn();

      confirm.closeConfirmDialog.call(ctx);

      expect(ctx.$refs.confirmDialog.close).toHaveBeenCalled();
      expect(ctx.confirmCallback).toBeNull();
    });

    it('restores focus to trigger element', () => {
      const fakeButton = { focus: vi.fn() };
      ctx.confirmTrigger = fakeButton;

      confirm.closeConfirmDialog.call(ctx);

      expect(fakeButton.focus).toHaveBeenCalled();
      expect(ctx.confirmTrigger).toBeNull();
    });
  });

  describe('cancelOne', () => {
    it('aborts the controller for the given key and clears loading', () => {
      const ctrl = { abort: vi.fn() } as unknown as AbortController;
      ctx.abortControllers = { summary: ctrl };
      ctx.loading.summary = true;
      ctx.loading.quiz = true;

      confirm.cancelOne.call(ctx, 'summary');

      expect((ctrl as any).abort).toHaveBeenCalled();
      expect(ctx.abortControllers.summary).toBeUndefined();
      expect(ctx.loading.summary).toBe(false);
      expect(ctx.loading.quiz).toBe(true); // untouched
      expect(ctx.showToast).toHaveBeenCalledWith(
        expect.stringContaining('toast.cancelledOne'),
        'info',
      );
    });

    it('handles missing controller gracefully', () => {
      ctx.loading.summary = true;

      confirm.cancelOne.call(ctx, 'summary');

      expect(ctx.loading.summary).toBe(false);
      expect(ctx.showToast).toHaveBeenCalled();
    });

    it('cancels by gid: aborts byGid controller, POSTs /cancel, removes pendingById entry', () => {
      const ctrl = { abort: vi.fn() } as unknown as AbortController;
      const fetchMock = vi.fn().mockResolvedValue({ ok: true });
      (globalThis as any).fetch = fetchMock;
      ctx.abortControllersByGid = { 'gid-abc': ctrl };
      ctx.pendingById = {
        'gid-abc': { id: 'gid-abc', type: 'summary', status: 'pending' },
      };

      confirm.cancelOne.call(ctx, 'gid-abc');

      expect((ctrl as any).abort).toHaveBeenCalled();
      expect(ctx.abortControllersByGid['gid-abc']).toBeUndefined();
      expect(ctx.pendingById['gid-abc']).toBeUndefined();
      expect(fetchMock).toHaveBeenCalledWith('/api/projects/pid-1/generations/gid-abc/cancel', {
        method: 'POST',
      });
      expect(ctx.showToast).toHaveBeenCalledWith(
        expect.stringContaining('toast.cancelledOne'),
        'info',
      );
    });

    it('cancel by gid: silent when fetch rejects (best-effort backend)', async () => {
      const ctrl = { abort: vi.fn() } as unknown as AbortController;
      const fetchMock = vi.fn().mockRejectedValue(new Error('network down'));
      const warnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
      (globalThis as any).fetch = fetchMock;
      ctx.abortControllersByGid = { 'gid-x': ctrl };
      ctx.pendingById = { 'gid-x': { id: 'gid-x', type: 'quiz', status: 'pending' } };

      expect(() => confirm.cancelOne.call(ctx, 'gid-x')).not.toThrow();
      expect(ctx.pendingById['gid-x']).toBeUndefined();
      expect(ctx.showToast).toHaveBeenCalled();
      // Wait for catch handler to fire
      await new Promise((r) => setTimeout(r, 0));
      expect(warnMock).toHaveBeenCalledWith(
        '[cancel] POST /cancel failed',
        expect.objectContaining({ pid: 'pid-1', gid: 'gid-x' }),
      );
      warnMock.mockRestore();
    });

    it('cancels server-owned gid (no local controller): clears loading[type] explicitly', () => {
      // Scénario /generate/auto : le serveur génère le gid via runStepBody, le
      // tab reçoit le pending via SSE. abortControllersByGid[gid] est absent
      // (pas de fetch local pour ce gid) MAIS loading[type] a été set par
      // installPlanLoading. Sans clear explicite, le spinner persiste jusqu'à
      // fin du bulk auto fetch (60s+).
      const fetchMock = vi.fn().mockResolvedValue({ ok: true });
      (globalThis as any).fetch = fetchMock;
      ctx.abortControllersByGid = {}; // server-owned : pas de controller
      ctx.pendingById = {
        'gid-srv': { id: 'gid-srv', type: 'podcast', status: 'pending' },
      };
      ctx.loading.podcast = true;

      confirm.cancelOne.call(ctx, 'gid-srv');

      expect(ctx.pendingById['gid-srv']).toBeUndefined();
      expect(ctx.loading.podcast).toBe(false);
      expect(fetchMock).toHaveBeenCalledWith('/api/projects/pid-1/generations/gid-srv/cancel', {
        method: 'POST',
      });
    });

    it('cancel by gid leaves loading[type] untouched when local controller existed', () => {
      // Inverse du test précédent : si abortControllersByGid[gid] existait,
      // c'est state.generate() qui owne le finally → on n'écrase pas son
      // loading[type] ici (race possible si la finally bumpe entre-temps).
      const ctrl = { abort: vi.fn() } as unknown as AbortController;
      const fetchMock = vi.fn().mockResolvedValue({ ok: true });
      (globalThis as any).fetch = fetchMock;
      ctx.abortControllersByGid = { 'gid-loc': ctrl };
      ctx.pendingById = { 'gid-loc': { id: 'gid-loc', type: 'quiz', status: 'pending' } };
      ctx.loading.quiz = true;

      confirm.cancelOne.call(ctx, 'gid-loc');

      // loading.quiz reste true ici — le finally de state.generate le clear
      expect(ctx.loading.quiz).toBe(true);
    });
  });

  describe('cancelGeneration', () => {
    it('aborts all controllers, resets loading, shows toast', () => {
      const ctrl1 = { abort: vi.fn() } as unknown as AbortController;
      const ctrl2 = { abort: vi.fn() } as unknown as AbortController;
      ctx.abortControllers = { summary: ctrl1, quiz: ctrl2 };
      ctx.loading.summary = true;
      ctx.loading.quiz = true;

      confirm.cancelGeneration.call(ctx);

      expect((ctrl1 as any).abort).toHaveBeenCalled();
      expect((ctrl2 as any).abort).toHaveBeenCalled();
      expect(ctx.abortControllers).toEqual({});
      expect(ctx.loading.summary).toBe(false);
      expect(ctx.loading.quiz).toBe(false);
      expect(ctx.showToast).toHaveBeenCalledWith('toast.cancelledGeneration', 'info');
    });

    it('handles empty controllers gracefully', () => {
      ctx.abortControllers = {};
      confirm.cancelGeneration.call(ctx);
      expect(ctx.showToast).toHaveBeenCalledWith('toast.cancelledGeneration', 'info');
    });
  });
});
