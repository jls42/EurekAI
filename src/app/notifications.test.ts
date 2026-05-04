/* eslint-disable @typescript-eslint/no-unsafe-call,
                  @typescript-eslint/no-unsafe-member-access -- Codacy applique
   tseslint.recommendedTypeChecked sur ce fichier. Notre tsconfig racine
   exclut src/, donc les types de vitest (describe/it/expect/beforeEach/vi)
   sont résolus en `error` → cascade unsafe-call / unsafe-member-access sur
   chaque expect(...).toBe(...). Localement les types sont OK via projectService.
   linterOptions.reportUnusedDisableDirectives off côté tests pour ne pas
   warn local quand projectService a déjà résolu les types correctement. */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  appendNotification,
  listProfileNotifications,
  markAllRead,
  markRead,
  clearNotifications,
  hasSeenEvent,
  getProjectLastSeen,
  setProjectLastSeen,
  renderNotificationMessage,
  type StorageLike,
  type PersistedNotification,
} from './notifications.js';
import type { EventKey } from '../../helpers/event-bus.js';

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

// Échappatoire test : les fixtures utilisent des strings arbitraires ('k1',
// 'evk-0') qui ne respectent pas le format canonique 'generation:gid:status'.
// En production, tous les eventKey passent par buildEventKey (helpers/event-key).
const E = (value: string): EventKey => value as EventKey;

type NotificationOverrides = Omit<
  Partial<Omit<PersistedNotification, 'createdAt' | 'read'>>,
  'eventKey'
> & { eventKey?: string };

const N = (overrides: NotificationOverrides = {}) => {
  const { eventKey = 'generation:gid-1:completed', ...rest } = overrides as Omit<
    Partial<Omit<PersistedNotification, 'createdAt' | 'read'>>,
    'eventKey'
  > & { eventKey?: string };
  return {
    eventKey: E(eventKey),
    message: 'Test',
    type: 'success' as const,
    ...rest,
  };
};

describe('appendNotification', () => {
  it('ajoute une notification visible et marque l event vu', () => {
    expect(appendNotification('p1', N(), storage)).toBe(true);
    const list = listProfileNotifications('p1', storage);
    expect(list).toHaveLength(1);
    expect(list[0].eventKey).toBe('generation:gid-1:completed');
    expect(list[0].read).toBe(false);
    expect(hasSeenEvent('p1', E('generation:gid-1:completed'), storage)).toBe(true);
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
    expect(hasSeenEvent('pA', E('generation:b:completed'), storage)).toBe(false);
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

  // Régression-lock CLAUDE.md "ledger LRU cap 1000/profil" : le ledger
  // seenEventKeys (qui sert à l'idempotence) ne doit pas grossir indéfiniment.
  // Si la slice est supprimée par erreur, après ~1001 events un même eventKey
  // ré-émis ne serait plus dédupliqué et recréerait la notif.
  it('ledger seenEventKeys : LRU cap 1000 — le 1001e event évince le 1er', () => {
    // Pousse 1001 events ; les events 0..49 doivent rester visibles dans la
    // notif list (cap 50) mais le ledger doit cap à 1000.
    for (let i = 0; i < 1001; i++) {
      appendNotification('p1', N({ eventKey: `evk-${i}` }), storage);
    }
    // Le 1er event (evk-0) doit avoir été évincé du ledger LRU.
    expect(hasSeenEvent('p1', E('evk-0'), storage)).toBe(false);
    // Les 1000 derniers (evk-1 → evk-1000 inclus, mais on a poussé 0..1000)
    // doivent toujours être présents dans le ledger.
    expect(hasSeenEvent('p1', E('evk-1000'), storage)).toBe(true);
    expect(hasSeenEvent('p1', E('evk-500'), storage)).toBe(true);
  });

  it('ledger LRU : un eventKey évincé peut être ré-ajouté (pas de blacklist permanente)', () => {
    for (let i = 0; i < 1001; i++) {
      appendNotification('p1', N({ eventKey: `evk-${i}` }), storage);
    }
    // evk-0 a été évincé ; le ré-appender doit créer une nouvelle notif
    // (le ledger LRU n'est pas une blacklist permanente, juste une fenêtre).
    expect(hasSeenEvent('p1', E('evk-0'), storage)).toBe(false);
    expect(appendNotification('p1', N({ eventKey: 'evk-0' }), storage)).toBe(true);
    expect(hasSeenEvent('p1', E('evk-0'), storage)).toBe(true);
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
    markRead('p1', E('a'), storage);
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
    expect(hasSeenEvent('p1', E('persisted-key'), storage)).toBe(true);
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
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    storage.setItem('sf-profile-notifications', 'not-json');
    expect(listProfileNotifications('p1', storage)).toEqual([]);
    expect(errorSpy).toHaveBeenCalledWith(
      '[notifications] corrupted slot',
      'sf-profile-notifications',
      expect.any(SyntaxError),
    );
    errorSpy.mockRestore();
  });

  it('absorbe un setItem qui throw (quota dépassé) sans casser la pipeline', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const failingStorage: StorageLike = {
      getItem: () => null,
      setItem: () => {
        throw new Error('QuotaExceededError');
      },
    };

    expect(() =>
      appendNotification('p1', N({ eventKey: 'k-quota' }), failingStorage),
    ).not.toThrow();
    expect(errorSpy).toHaveBeenCalledWith(
      '[notifications] storage write failed (likely quota)',
      expect.objectContaining({ key: expect.any(String), err: expect.any(Error) }),
    );
    errorSpy.mockRestore();
  });
});

describe('renderNotificationMessage (i18n-aware)', () => {
  // Faux t() qui simule un dictionnaire minimaliste avec interpolation.
  const dict: Record<string, string> = {
    'notif.generationDone': '{type} terminé',
    'gen.summary': 'Fiche',
    'gen.quiz': 'Quiz',
    'notif.errorWithCount': '{count} erreurs',
  };
  const t = (key: string, params?: Record<string, string | number>) => {
    let text = dict[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replaceAll(`{${k}}`, String(v));
      }
    }
    return text;
  };

  it('résout messageKey + paramKeys au render dans la langue courante', () => {
    const notif: PersistedNotification = {
      eventKey: E('k1'),
      messageKey: 'notif.generationDone',
      paramKeys: { type: 'gen.summary' },
      type: 'success',
      createdAt: '2026-04-28T10:00:00Z',
      read: false,
    };
    expect(renderNotificationMessage(notif, t)).toBe('Fiche terminé');
  });

  it('combine params scalaires et paramKeys (paramKeys traduit, params direct)', () => {
    const notif: PersistedNotification = {
      eventKey: E('k2'),
      messageKey: 'notif.errorWithCount',
      params: { count: 3 },
      type: 'error',
      createdAt: '2026-04-28T10:00:00Z',
      read: false,
    };
    expect(renderNotificationMessage(notif, t)).toBe('3 erreurs');
  });

  it('fallback sur message legacy si messageKey absent (notifs pré-refactor)', () => {
    const legacy: PersistedNotification = {
      eventKey: E('k3'),
      message: 'Message figé en français',
      type: 'info',
      createdAt: '2026-04-28T10:00:00Z',
      read: false,
    };
    expect(renderNotificationMessage(legacy, t)).toBe('Message figé en français');
  });

  it('chaîne vide si ni messageKey ni message', () => {
    const empty: PersistedNotification = {
      eventKey: E('k4'),
      type: 'info',
      createdAt: '2026-04-28T10:00:00Z',
      read: false,
    };
    expect(renderNotificationMessage(empty, t)).toBe('');
  });

  it('change de langue au render : la même notif persistée donne 2 sorties différentes', () => {
    const notif: PersistedNotification = {
      eventKey: E('k5'),
      messageKey: 'notif.generationDone',
      paramKeys: { type: 'gen.quiz' },
      type: 'success',
      createdAt: '2026-04-28T10:00:00Z',
      read: false,
    };
    // FR
    expect(renderNotificationMessage(notif, t)).toBe('Quiz terminé');
    // EN simulé (autre dictionnaire)
    const tEn = (key: string, params?: Record<string, string | number>) => {
      const enDict: Record<string, string> = {
        'notif.generationDone': '{type} complete',
        'gen.quiz': 'Quiz',
      };
      let text = enDict[key] ?? key;
      if (params) {
        for (const [k, v] of Object.entries(params)) {
          text = text.replaceAll(`{${k}}`, String(v));
        }
      }
      return text;
    };
    expect(renderNotificationMessage(notif, tEn)).toBe('Quiz complete');
  });
});
