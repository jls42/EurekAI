import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  CROSS_TAB_SYNC_BROKEN_EVENT,
  handleCrossTabStorageEvent,
  installCrossTabSync,
} from './cross-tab-sync.js';

function makeStack(version = 0): { notificationsVersion?: number; crossTabSyncBroken?: boolean } {
  return { notificationsVersion: version, crossTabSyncBroken: false };
}

function makeDoc(
  stack: { notificationsVersion?: number; crossTabSyncBroken?: boolean } | null,
  dispatchEvent = vi.fn(),
): Document {
  return {
    querySelector: vi.fn(() =>
      stack === null ? null : ({ _x_dataStack: [stack] } as unknown as HTMLElement),
    ),
    defaultView: { dispatchEvent },
  } as unknown as Document;
}

describe('handleCrossTabStorageEvent', () => {
  let warned: { value: boolean };
  let warnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warned = { value: false };
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('returns "wrong-key" and no-op when storage event key is not the notif slot', () => {
    const stack = makeStack(5);
    const result = handleCrossTabStorageEvent({ key: 'sf-other-key' }, makeDoc(stack), warned);

    expect(result).toBe('wrong-key');
    expect(stack.notificationsVersion).toBe(5);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('returns "wrong-key" when storage event key is null (whole storage cleared)', () => {
    const stack = makeStack(2);
    const result = handleCrossTabStorageEvent({ key: null }, makeDoc(stack), warned);

    expect(result).toBe('wrong-key');
    expect(stack.notificationsVersion).toBe(2);
  });

  it('bumps notificationsVersion when alpine stack is present and field is a number', () => {
    const stack = makeStack(3);
    const result = handleCrossTabStorageEvent(
      { key: 'sf-profile-notifications' },
      makeDoc(stack),
      warned,
    );

    expect(result).toBe('bumped');
    expect(stack.notificationsVersion).toBe(4);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('warns once when alpine root is missing (Alpine drift)', () => {
    const dispatchEvent = vi.fn();
    const result = handleCrossTabStorageEvent(
      { key: 'sf-profile-notifications' },
      makeDoc(null, dispatchEvent),
      warned,
    );

    expect(result).toBe('drift');
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warned.value).toBe(true);
    expect(dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: CROSS_TAB_SYNC_BROKEN_EVENT }),
    );
  });

  it('warns once when notificationsVersion is missing (field drift)', () => {
    const stack = { crossTabSyncBroken: false } as {
      notificationsVersion?: number;
      crossTabSyncBroken?: boolean;
    };
    const result = handleCrossTabStorageEvent(
      { key: 'sf-profile-notifications' },
      makeDoc(stack),
      warned,
    );

    expect(result).toBe('drift');
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(stack.crossTabSyncBroken).toBe(true);
  });

  it('does not warn twice on consecutive drifts (one warning per session)', () => {
    handleCrossTabStorageEvent({ key: 'sf-profile-notifications' }, makeDoc(null), warned);
    handleCrossTabStorageEvent({ key: 'sf-profile-notifications' }, makeDoc(null), warned);
    handleCrossTabStorageEvent({ key: 'sf-profile-notifications' }, makeDoc(null), warned);

    expect(warnSpy).toHaveBeenCalledTimes(1);
  });
});

describe('installCrossTabSync', () => {
  it('attaches a storage listener that bumps version when fired', () => {
    const stack = makeStack(0);
    const doc = makeDoc(stack);
    const listeners = new Map<string, EventListener>();
    const target = {
      addEventListener: vi.fn((name: string, fn: EventListener) => {
        listeners.set(name, fn);
      }),
    } as unknown as EventTarget;

    installCrossTabSync(target, doc);

    expect(target.addEventListener).toHaveBeenCalledWith('storage', expect.any(Function));
    const handler = listeners.get('storage');
    handler?.({ key: 'sf-profile-notifications' } as any);

    expect(stack.notificationsVersion).toBe(1);
  });
});
