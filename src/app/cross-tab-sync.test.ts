/* eslint-disable @typescript-eslint/no-unsafe-call,
                  @typescript-eslint/no-unused-vars -- Codacy résout
   describe/it/beforeEach/afterEach (importés depuis vitest) en type `error`
   car son tsconfig racine exclut src/. Localement les types sont OK via
   projectService → ces directives sont inactives (cf. linterOptions).
   no-unused-vars : Codacy ignore notre `argsIgnorePattern: '^_'` et flag
   les rest params nommés dans les types (ex: `_args` dans la signature
   `(..._args: unknown[]) => R`). */
import { describe, it, beforeEach, afterEach } from 'vitest';
import { strict as assert } from 'node:assert';
import {
  CROSS_TAB_SYNC_BROKEN_EVENT,
  handleCrossTabStorageEvent,
  installCrossTabSync,
} from './cross-tab-sync.js';

// Stubs vanilla pour éviter le typed-linting cassé sur vi.* côté Codacy
// (tsconfig racine exclut src/ → vi/spyOn typés `error` → cascade unsafe-*).
// Le projet utilise quand même vitest pour describe/it ; les helpers ci-dessous
// reproduisent juste ce dont on a besoin pour stubs/spies sans toucher à `vi`.
type StubCalls = unknown[][];
interface Stub<R> {
  fn(...inputs: unknown[]): R;
  calls: StubCalls;
}
function makeStub<R>(impl?: () => R): Stub<R> {
  const calls: StubCalls = [];
  const fn = (...args: unknown[]): R => {
    calls.push(args);
    return impl ? impl() : (undefined as R);
  };
  return { fn, calls };
}

function makeStack(version = 0): { notificationsVersion?: number; crossTabSyncBroken?: boolean } {
  return { notificationsVersion: version, crossTabSyncBroken: false };
}

interface MockDocResult {
  doc: Document;
  dispatchCalls: StubCalls;
}

function makeDoc(
  stack: { notificationsVersion?: number; crossTabSyncBroken?: boolean } | null,
): MockDocResult {
  const dispatch = makeStub();
  const querySelector = makeStub(() =>
    stack === null ? null : ({ _x_dataStack: [stack] } as unknown as HTMLElement),
  );
  const doc = {
    querySelector: querySelector.fn,
    defaultView: { dispatchEvent: dispatch.fn },
  } as unknown as Document;
  return { doc, dispatchCalls: dispatch.calls };
}

describe('handleCrossTabStorageEvent', () => {
  let warned: { value: boolean };
  let warnCalls: StubCalls;
  let originalWarn: typeof console.warn;

  beforeEach(() => {
    warned = { value: false };
    warnCalls = [];
    originalWarn = console.warn;
    console.warn = ((...args: unknown[]) => {
      warnCalls.push(args);
    }) as typeof console.warn;
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  it('returns "wrong-key" and no-op when storage event key is not the notif slot', () => {
    const stack = makeStack(5);
    const { doc } = makeDoc(stack);
    const result = handleCrossTabStorageEvent({ key: 'sf-other-key' }, doc, warned);

    assert.equal(result, 'wrong-key');
    assert.equal(stack.notificationsVersion, 5);
    assert.equal(warnCalls.length, 0);
  });

  it('returns "wrong-key" when storage event key is null (whole storage cleared)', () => {
    const stack = makeStack(2);
    const { doc } = makeDoc(stack);
    const result = handleCrossTabStorageEvent({ key: null }, doc, warned);

    assert.equal(result, 'wrong-key');
    assert.equal(stack.notificationsVersion, 2);
  });

  it('bumps notificationsVersion when alpine stack is present and field is a number', () => {
    const stack = makeStack(3);
    const { doc } = makeDoc(stack);
    const result = handleCrossTabStorageEvent({ key: 'sf-profile-notifications' }, doc, warned);

    assert.equal(result, 'bumped');
    assert.equal(stack.notificationsVersion, 4);
    assert.equal(warnCalls.length, 0);
  });

  it('warns once when alpine root is missing (Alpine drift)', () => {
    const { doc, dispatchCalls } = makeDoc(null);
    const result = handleCrossTabStorageEvent({ key: 'sf-profile-notifications' }, doc, warned);

    assert.equal(result, 'drift');
    assert.equal(warnCalls.length, 1);
    assert.equal(warned.value, true);
    assert.equal(dispatchCalls.length, 1);
    const event = dispatchCalls[0][0] as Event;
    assert.equal(event.type, CROSS_TAB_SYNC_BROKEN_EVENT);
  });

  it('warns once when notificationsVersion is missing (field drift)', () => {
    const stack = { crossTabSyncBroken: false } as {
      notificationsVersion?: number;
      crossTabSyncBroken?: boolean;
    };
    const { doc } = makeDoc(stack);
    const result = handleCrossTabStorageEvent({ key: 'sf-profile-notifications' }, doc, warned);

    assert.equal(result, 'drift');
    assert.equal(warnCalls.length, 1);
    assert.equal(stack.crossTabSyncBroken, true);
  });

  it('does not warn twice on consecutive drifts (one warning per session)', () => {
    handleCrossTabStorageEvent({ key: 'sf-profile-notifications' }, makeDoc(null).doc, warned);
    handleCrossTabStorageEvent({ key: 'sf-profile-notifications' }, makeDoc(null).doc, warned);
    handleCrossTabStorageEvent({ key: 'sf-profile-notifications' }, makeDoc(null).doc, warned);

    assert.equal(warnCalls.length, 1);
  });
});

describe('installCrossTabSync', () => {
  it('attaches a storage listener that bumps version when fired', () => {
    const stack = makeStack(0);
    const { doc } = makeDoc(stack);
    const listeners = new Map<string, EventListener>();
    const addEventListener = (name: string, fn: EventListener) => {
      listeners.set(name, fn);
    };
    const target = { addEventListener } as unknown as EventTarget;

    installCrossTabSync(target, doc);

    assert.equal(listeners.has('storage'), true);
    const handler = listeners.get('storage');
    handler?.({ key: 'sf-profile-notifications' } as unknown as StorageEvent);

    assert.equal(stack.notificationsVersion, 1);
  });
});
