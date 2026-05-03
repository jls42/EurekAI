/* eslint-disable
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-return,
   @typescript-eslint/no-explicit-any,
   @typescript-eslint/no-empty-function
   --
   Codacy applique tseslint.recommendedTypeChecked avec son propre tsconfig
   qui exclut les test files → vitest globals (`vi`, `expect`, `describe`,
   `it`...) sont typés `error`, cascadant en 50+ unsafe-* sur les fixtures.
   Localement `eslint.config.js` (projectService: true) résout les types
   correctement et `npm run lint:ci --max-warnings 0` couvre ce fichier.
   Cf. store.lifecycle.test.ts qui applique le même pattern. */
// nosemgrep: xss-no-mixed-html -- fakeButton n'est pas du HTML, juste un cast typé
// HTMLElement pour passer un dummy à confirm.dismissConfirm en test.
import { describe, it, expect, vi } from 'vitest';
import { createSession } from './session.js';
import type { AppContext } from './app-context.js';
import type { PendingTrackerEntry } from '../../types.js';
import type { EventKey } from '../../helpers/event-bus.js';
import { appendNotification, hasSeenEvent, listProfileNotifications } from './notifications.js';

function makeCtx(overrides: Partial<AppContext> = {}): AppContext {
  return {
    abortControllers: {},
    abortControllersByGid: {},
    loading: { auto: false, all: false, voice: false, websearch: false } as Record<string, boolean>,
    pendingById: {},
    toasts: [],
    toastCounter: 0,
    shownToastEventKeys: new Set<EventKey>(),
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

  it('appelle stopPendingsStream si la méthode est présente', () => {
    const stopPendingsStream = vi.fn();
    const ctx = makeCtx({ stopPendingsStream } as Partial<AppContext>);

    sessionMixin.resetSession.call(ctx);

    expect(stopPendingsStream).toHaveBeenCalledOnce();
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
    const set = new Set(['generation:gid-1:completed' as EventKey]);
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

// Régression-lock invariant CLAUDE.md "Pending generations & notifications" :
// resetSession NE TOUCHE PAS au ledger seenEventKeys ni aux notifications
// persistées. Sinon une réconciliation future recréerait des notifs
// supprimées et les badges unread spammeraient le user après chaque switch.
function makeStorage() {
  const data = new Map<string, string>();
  return {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => {
      data.set(k, v);
    },
    snapshot: () => Object.fromEntries(data),
  };
}

describe('resetSession — invariants persistés (négatif)', () => {
  it('PRÉSERVE le ledger seenEventKeys (LRU localStorage)', () => {
    const storage = makeStorage();
    appendNotification(
      'profile-A',
      {
        eventKey: 'generation:gid-X:completed' as EventKey,
        message: 'Test',
        type: 'success',
      },
      storage,
    );
    const before = storage.snapshot();
    expect(hasSeenEvent('profile-A', 'generation:gid-X:completed' as EventKey, storage)).toBe(true);

    const ctx = makeCtx();
    sessionMixin.resetSession.call(ctx);

    // Le storage n'a pas été touché par resetSession (resetSession ne reçoit
    // pas le storage en argument et n'a aucun chemin légitime vers lui).
    expect(storage.snapshot()).toEqual(before);
    expect(hasSeenEvent('profile-A', 'generation:gid-X:completed' as EventKey, storage)).toBe(true);
  });

  it('PRÉSERVE les notifications persistées par profil', () => {
    const storage = makeStorage();
    appendNotification(
      'profile-A',
      {
        eventKey: 'generation:gid-Y:completed' as EventKey,
        message: 'Visible notif',
        type: 'success',
      },
      storage,
    );
    expect(listProfileNotifications('profile-A', storage)).toHaveLength(1);

    const ctx = makeCtx();
    sessionMixin.resetSession.call(ctx);

    // Les notifs cloche restent visibles après resetSession.
    expect(listProfileNotifications('profile-A', storage)).toHaveLength(1);
  });

  it('le ledger reste opérant après resetSession (idempotence eventKey conservée)', () => {
    const storage = makeStorage();
    appendNotification(
      'profile-A',
      {
        eventKey: 'generation:gid-Z:completed' as EventKey,
        message: 'First',
        type: 'success',
      },
      storage,
    );

    const ctx = makeCtx();
    sessionMixin.resetSession.call(ctx);

    // Tente un nouveau push avec le MÊME eventKey : doit être rejeté car
    // le ledger persiste à travers le reset.
    const created = appendNotification(
      'profile-A',
      {
        eventKey: 'generation:gid-Z:completed' as EventKey,
        message: 'Duplicate would create here if ledger was wiped',
        type: 'success',
      },
      storage,
    );
    expect(created).toBe(false);
    expect(listProfileNotifications('profile-A', storage)).toHaveLength(1);
  });
});
