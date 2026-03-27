import { describe, it, expect, vi } from 'vitest';
import { createConfirm } from './confirm';

const confirm = createConfirm();

function callWith<T>(method: Function, ctx: any, ...args: any[]): T {
  return method.call(ctx, ...args);
}

describe('cancelOne', () => {
  it('aborts the controller for the given key and clears loading', () => {
    const abort = vi.fn();
    const ctx = {
      abortControllers: { summary: { abort } },
      loading: { summary: true, quiz: true },
      t: (k: string, p?: any) => (p ? `${k}:${JSON.stringify(p)}` : k),
      showToast: vi.fn(),
    };

    callWith<void>(confirm.cancelOne, ctx, 'summary');

    expect(abort).toHaveBeenCalled();
    expect(ctx.abortControllers.summary).toBeUndefined();
    expect(ctx.loading.summary).toBe(false);
    expect(ctx.loading.quiz).toBe(true); // untouched
    expect(ctx.showToast).toHaveBeenCalledWith(
      expect.stringContaining('toast.cancelledOne'),
      'info',
    );
  });

  it('handles missing controller gracefully', () => {
    const ctx = {
      abortControllers: {},
      loading: { summary: true },
      t: (k: string) => k,
      showToast: vi.fn(),
    };

    callWith<void>(confirm.cancelOne, ctx, 'summary');

    expect(ctx.loading.summary).toBe(false);
    expect(ctx.showToast).toHaveBeenCalled();
  });
});

describe('cancelGeneration', () => {
  it('aborts all controllers and resets all loading flags', () => {
    const abort1 = vi.fn();
    const abort2 = vi.fn();
    const ctx = {
      abortControllers: { summary: { abort: abort1 }, quiz: { abort: abort2 } },
      loading: { summary: true, quiz: true, flashcards: false },
      t: (k: string) => k,
      showToast: vi.fn(),
    };

    callWith<void>(confirm.cancelGeneration, ctx);

    expect(abort1).toHaveBeenCalled();
    expect(abort2).toHaveBeenCalled();
    expect(ctx.loading.summary).toBe(false);
    expect(ctx.loading.quiz).toBe(false);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.cancelledGeneration', 'info');
  });
});
