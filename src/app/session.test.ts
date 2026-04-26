import { describe, it, expect, vi } from 'vitest';
import { createSession } from './session.js';
import type { AppContext } from './app-context.js';
import type { PendingTrackerEntry } from '../../types.js';

function makeCtx(overrides: Partial<AppContext> = {}): AppContext {
  return {
    abortControllers: {},
    abortControllersByGid: {},
    loading: { auto: false, all: false, voice: false, websearch: false } as Record<string, boolean>,
    pendingById: {},
    toasts: [],
    toastCounter: 0,
    shownToastEventKeys: new Set<string>(),
    confirmCallback: null,
    confirmTrigger: null,
    ...overrides,
  } as AppContext;
}

const sessionMixin = createSession();

describe('resetSession', () => {
  it('abort tous les AbortControllers (par type ET par gid)', () => {
    const ctrl1 = new AbortController();
    const ctrl2 = new AbortController();
    const abortSpy1 = vi.spyOn(ctrl1, 'abort');
    const abortSpy2 = vi.spyOn(ctrl2, 'abort');

    const ctx = makeCtx({
      abortControllers: { summary: ctrl1 },
      abortControllersByGid: { 'gid-1': ctrl2 },
    });

    sessionMixin.resetSession.call(ctx);

    expect(abortSpy1).toHaveBeenCalled();
    expect(abortSpy2).toHaveBeenCalled();
    expect(ctx.abortControllers).toEqual({});
    expect(ctx.abortControllersByGid).toEqual({});
  });

  it('vide loading mais conserve la structure (pose tous les flags à false)', () => {
    const ctx = makeCtx({
      loading: { auto: true, voice: true, websearch: false } as Record<string, boolean>,
    });

    sessionMixin.resetSession.call(ctx);

    expect(ctx.loading).toEqual({ auto: false, voice: false, websearch: false });
  });

  it('vide pendingById', () => {
    const entry: PendingTrackerEntry = {
      id: 'gid-1',
      type: 'summary',
      status: 'pending',
      startedAt: new Date().toISOString(),
      sourceIds: [],
    };
    const ctx = makeCtx({ pendingById: { 'gid-1': entry } });

    sessionMixin.resetSession.call(ctx);

    expect(ctx.pendingById).toEqual({});
  });

  it('vide toasts + reset toastCounter + reset shownToastEventKeys', () => {
    const set = new Set(['generation:gid-1:completed']);
    const ctx = makeCtx({
      toasts: [{ id: 1, message: 'hello', type: 'info' }] as any,
      toastCounter: 42,
      shownToastEventKeys: set,
    });

    sessionMixin.resetSession.call(ctx);

    expect(ctx.toasts).toEqual([]);
    expect(ctx.toastCounter).toBe(0);
    expect(ctx.shownToastEventKeys.size).toBe(0);
  });

  it('reset le confirm dialog en vol', () => {
    const fakeButton = {} as HTMLElement;
    const ctx = makeCtx({
      confirmCallback: () => {},
      confirmTrigger: fakeButton,
    });

    sessionMixin.resetSession.call(ctx);

    expect(ctx.confirmCallback).toBeNull();
    expect(ctx.confirmTrigger).toBeNull();
  });

  it('ne throw pas si un controller est déjà aborté', () => {
    const ctrl = new AbortController();
    ctrl.abort();
    const ctx = makeCtx({ abortControllers: { summary: ctrl } });

    expect(() => sessionMixin.resetSession.call(ctx)).not.toThrow();
  });
});
