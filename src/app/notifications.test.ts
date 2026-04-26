import { describe, it, expect, beforeEach } from 'vitest';
import {
  appendNotification,
  listProfileNotifications,
  markAllRead,
  markRead,
  clearNotifications,
  hasSeenEvent,
  getProjectLastSeen,
  setProjectLastSeen,
  type StorageLike,
  type PersistedNotification,
} from './notifications.js';

function makeStorage(): StorageLike {
  const data = new Map<string, string>();
  return {
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => {
      data.set(k, v);
    },
  };
}

let storage: StorageLike;

beforeEach(() => {
  storage = makeStorage();
});

const N = (overrides: Partial<Omit<PersistedNotification, 'createdAt' | 'read'>> = {}) => ({
  eventKey: 'generation:gid-1:completed',
  message: 'Test',
  type: 'success' as const,
  ...overrides,
});

describe('appendNotification', () => {
  it('ajoute une notification visible et marque l event vu', () => {
    expect(appendNotification('p1', N(), storage)).toBe(true);
    const list = listProfileNotifications('p1', storage);
    expect(list).toHaveLength(1);
    expect(list[0].eventKey).toBe('generation:gid-1:completed');
    expect(list[0].read).toBe(false);
    expect(hasSeenEvent('p1', 'generation:gid-1:completed', storage)).toBe(true);
  });

  it('est idempotent par eventKey (no-op si déjà vu)', () => {
    expect(appendNotification('p1', N(), storage)).toBe(true);
    expect(appendNotification('p1', N({ message: 'Ignored' }), storage)).toBe(false);
    expect(listProfileNotifications('p1', storage)).toHaveLength(1);
  });

  it('isole les notifs par profileId', () => {
    appendNotification('pA', N({ eventKey: 'generation:a:completed' }), storage);
    appendNotification('pB', N({ eventKey: 'generation:b:completed' }), storage);
    expect(listProfileNotifications('pA', storage)).toHaveLength(1);
    expect(listProfileNotifications('pB', storage)).toHaveLength(1);
    expect(hasSeenEvent('pA', 'generation:b:completed', storage)).toBe(false);
  });

  it('cap à MAX_PER_PROFILE (50) avec FIFO drop', () => {
    for (let i = 0; i < 60; i++) {
      appendNotification('p1', N({ eventKey: `gen:${i}:completed` }), storage);
    }
    const list = listProfileNotifications('p1', storage);
    expect(list).toHaveLength(50);
    // Les plus anciens (0-9) sont droppés, on garde 10-59
    expect(list[0].eventKey).toBe('gen:10:completed');
    expect(list[49].eventKey).toBe('gen:59:completed');
  });
});

describe('markAllRead / markRead', () => {
  it('markAllRead flippe read=true pour toutes les notifs du profil', () => {
    appendNotification('p1', N({ eventKey: 'a' }), storage);
    appendNotification('p1', N({ eventKey: 'b' }), storage);
    markAllRead('p1', storage);
    const list = listProfileNotifications('p1', storage);
    expect(list.every((n) => n.read)).toBe(true);
  });

  it('markRead cible une notif par eventKey', () => {
    appendNotification('p1', N({ eventKey: 'a' }), storage);
    appendNotification('p1', N({ eventKey: 'b' }), storage);
    markRead('p1', 'a', storage);
    const list = listProfileNotifications('p1', storage);
    expect(list.find((n) => n.eventKey === 'a')!.read).toBe(true);
    expect(list.find((n) => n.eventKey === 'b')!.read).toBe(false);
  });
});

describe('clearNotifications', () => {
  it('supprime les notifs visibles MAIS PRÉSERVE le ledger seenEventKeys', () => {
    appendNotification('p1', N({ eventKey: 'persisted-key' }), storage);
    expect(listProfileNotifications('p1', storage)).toHaveLength(1);

    clearNotifications('p1', storage);
    expect(listProfileNotifications('p1', storage)).toHaveLength(0);

    // Le ledger reste : un appendNotification avec le même eventKey est rejeté
    expect(hasSeenEvent('p1', 'persisted-key', storage)).toBe(true);
    expect(appendNotification('p1', N({ eventKey: 'persisted-key' }), storage)).toBe(false);
    expect(listProfileNotifications('p1', storage)).toHaveLength(0);
  });
});

describe('lastSeenAt par projet (watermark réconciliation)', () => {
  it('getProjectLastSeen retourne null si jamais set', () => {
    expect(getProjectLastSeen('p1', 'proj-a', storage)).toBeNull();
  });

  it('setProjectLastSeen / getProjectLastSeen round-trip', () => {
    const iso = '2026-04-26T10:00:00.000Z';
    setProjectLastSeen('p1', 'proj-a', iso, storage);
    expect(getProjectLastSeen('p1', 'proj-a', storage)).toBe(iso);
  });

  it('isole par profileId et projectId', () => {
    setProjectLastSeen('pA', 'proj-1', '2026-01-01T00:00:00Z', storage);
    setProjectLastSeen('pA', 'proj-2', '2026-02-01T00:00:00Z', storage);
    setProjectLastSeen('pB', 'proj-1', '2026-03-01T00:00:00Z', storage);

    expect(getProjectLastSeen('pA', 'proj-1', storage)).toBe('2026-01-01T00:00:00Z');
    expect(getProjectLastSeen('pA', 'proj-2', storage)).toBe('2026-02-01T00:00:00Z');
    expect(getProjectLastSeen('pB', 'proj-1', storage)).toBe('2026-03-01T00:00:00Z');
  });
});

describe('storage corrompu', () => {
  it('retourne fallback vide si JSON invalide', () => {
    storage.setItem('sf-profile-notifications', 'not-json');
    expect(listProfileNotifications('p1', storage)).toEqual([]);
  });
});
