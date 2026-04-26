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
