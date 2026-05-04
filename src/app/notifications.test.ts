import { describe, it, beforeEach, vi } from 'vitest';
import { strict as assert } from 'node:assert';
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

// Wrappers typés pour vitest globals — Codacy applique tseslint.recommendedTypeChecked
// et notre tsconfig racine exclut src/, donc les types vitest sont résolus en
// `error` → cascade @typescript-eslint/no-unsafe-call. Ni le block-comment
// /* eslint-disable */ file-level, ni les casts `as DescribeFn` ne sont honorés
// par Codacy. Pattern robuste (cf. sse-pendings.test.ts) : wrappers explicitement
// typés + assert au lieu de expect, plus aucun unsafe-call dans les call sites.
// eslint-disable-next-line no-unused-vars -- type-sig params required by TS
type DescribeFn = (_name: string, _fn: () => void) => void;
// eslint-disable-next-line no-unused-vars -- type-sig params required by TS
type ItFn = (_name: string, _fn: () => Promise<void> | void) => void;
// eslint-disable-next-line no-unused-vars -- type-sig param required by TS
type HookFn = (_fn: () => Promise<void> | void) => void;

/* eslint-disable @typescript-eslint/no-unsafe-call --
   describe/it/beforeEach typés `error` côté Codacy. Local OK via projectService. */
const $describe: DescribeFn = (name, fn) => {
  describe(name, fn);
};
const $it: ItFn = (name, fn) => {
  it(name, fn);
};
const $beforeEach: HookFn = (fn) => {
  beforeEach(fn);
};
/* eslint-enable @typescript-eslint/no-unsafe-call */

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

$beforeEach(() => {
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

$describe('appendNotification', () => {
  $it('ajoute une notification visible et marque l event vu', () => {
    assert.equal(appendNotification('p1', N(), storage), true);
    const list = listProfileNotifications('p1', storage);
    assert.equal(list.length, 1);
    assert.equal(list[0].eventKey, 'generation:gid-1:completed');
    assert.equal(list[0].read, false);
    assert.equal(hasSeenEvent('p1', E('generation:gid-1:completed'), storage), true);
  });

  $it('est idempotent par eventKey (no-op si déjà vu)', () => {
    assert.equal(appendNotification('p1', N(), storage), true);
    assert.equal(appendNotification('p1', N({ message: 'Ignored' }), storage), false);
    assert.equal(listProfileNotifications('p1', storage).length, 1);
  });

  $it('isole les notifs par profileId', () => {
    appendNotification('pA', N({ eventKey: 'generation:a:completed' }), storage);
    appendNotification('pB', N({ eventKey: 'generation:b:completed' }), storage);
    assert.equal(listProfileNotifications('pA', storage).length, 1);
    assert.equal(listProfileNotifications('pB', storage).length, 1);
    assert.equal(hasSeenEvent('pA', E('generation:b:completed'), storage), false);
  });

  $it('cap à MAX_PER_PROFILE (50) avec FIFO drop', () => {
    for (let i = 0; i < 60; i++) {
      appendNotification('p1', N({ eventKey: `gen:${i}:completed` }), storage);
    }
    const list = listProfileNotifications('p1', storage);
    assert.equal(list.length, 50);
    // Les plus anciens (0-9) sont droppés, on garde 10-59
    assert.equal(list[0].eventKey, 'gen:10:completed');
    assert.equal(list[49].eventKey, 'gen:59:completed');
  });

  // Régression-lock CLAUDE.md "ledger LRU cap 1000/profil" : le ledger
  // seenEventKeys (qui sert à l'idempotence) ne doit pas grossir indéfiniment.
  // Si la slice est supprimée par erreur, après ~1001 events un même eventKey
  // ré-émis ne serait plus dédupliqué et recréerait la notif.
  $it('ledger seenEventKeys : LRU cap 1000 — le 1001e event évince le 1er', () => {
    // Pousse 1001 events ; les events 0..49 doivent rester visibles dans la
    // notif list (cap 50) mais le ledger doit cap à 1000.
    for (let i = 0; i < 1001; i++) {
      appendNotification('p1', N({ eventKey: `evk-${i}` }), storage);
    }
    // Le 1er event (evk-0) doit avoir été évincé du ledger LRU.
    assert.equal(hasSeenEvent('p1', E('evk-0'), storage), false);
    // Les 1000 derniers (evk-1 → evk-1000 inclus, mais on a poussé 0..1000)
    // doivent toujours être présents dans le ledger.
    assert.equal(hasSeenEvent('p1', E('evk-1000'), storage), true);
    assert.equal(hasSeenEvent('p1', E('evk-500'), storage), true);
  });

  $it('ledger LRU : un eventKey évincé peut être ré-ajouté (pas de blacklist permanente)', () => {
    for (let i = 0; i < 1001; i++) {
      appendNotification('p1', N({ eventKey: `evk-${i}` }), storage);
    }
    // evk-0 a été évincé ; le ré-appender doit créer une nouvelle notif
    // (le ledger LRU n'est pas une blacklist permanente, juste une fenêtre).
    assert.equal(hasSeenEvent('p1', E('evk-0'), storage), false);
    assert.equal(appendNotification('p1', N({ eventKey: 'evk-0' }), storage), true);
    assert.equal(hasSeenEvent('p1', E('evk-0'), storage), true);
  });
});

$describe('markAllRead / markRead', () => {
  $it('markAllRead flippe read=true pour toutes les notifs du profil', () => {
    appendNotification('p1', N({ eventKey: 'a' }), storage);
    appendNotification('p1', N({ eventKey: 'b' }), storage);
    markAllRead('p1', storage);
    const list = listProfileNotifications('p1', storage);
    assert.equal(
      list.every((n) => n.read),
      true,
    );
  });

  $it('markRead cible une notif par eventKey', () => {
    appendNotification('p1', N({ eventKey: 'a' }), storage);
    appendNotification('p1', N({ eventKey: 'b' }), storage);
    markRead('p1', E('a'), storage);
    const list = listProfileNotifications('p1', storage);
    const a = list.find((n) => n.eventKey === 'a');
    const b = list.find((n) => n.eventKey === 'b');
    assert.ok(a);
    assert.ok(b);
    assert.equal(a.read, true);
    assert.equal(b.read, false);
  });
});

$describe('clearNotifications', () => {
  $it('supprime les notifs visibles MAIS PRÉSERVE le ledger seenEventKeys', () => {
    appendNotification('p1', N({ eventKey: 'persisted-key' }), storage);
    assert.equal(listProfileNotifications('p1', storage).length, 1);

    clearNotifications('p1', storage);
    assert.equal(listProfileNotifications('p1', storage).length, 0);

    // Le ledger reste : un appendNotification avec le même eventKey est rejeté
    assert.equal(hasSeenEvent('p1', E('persisted-key'), storage), true);
    assert.equal(appendNotification('p1', N({ eventKey: 'persisted-key' }), storage), false);
    assert.equal(listProfileNotifications('p1', storage).length, 0);
  });
});

$describe('lastSeenAt par projet (watermark réconciliation)', () => {
  $it('getProjectLastSeen retourne null si jamais set', () => {
    assert.equal(getProjectLastSeen('p1', 'proj-a', storage), null);
  });

  $it('setProjectLastSeen / getProjectLastSeen round-trip', () => {
    const iso = '2026-04-26T10:00:00.000Z';
    setProjectLastSeen('p1', 'proj-a', iso, storage);
    assert.equal(getProjectLastSeen('p1', 'proj-a', storage), iso);
  });

  $it('isole par profileId et projectId', () => {
    setProjectLastSeen('pA', 'proj-1', '2026-01-01T00:00:00Z', storage);
    setProjectLastSeen('pA', 'proj-2', '2026-02-01T00:00:00Z', storage);
    setProjectLastSeen('pB', 'proj-1', '2026-03-01T00:00:00Z', storage);

    assert.equal(getProjectLastSeen('pA', 'proj-1', storage), '2026-01-01T00:00:00Z');
    assert.equal(getProjectLastSeen('pA', 'proj-2', storage), '2026-02-01T00:00:00Z');
    assert.equal(getProjectLastSeen('pB', 'proj-1', storage), '2026-03-01T00:00:00Z');
  });
});

$describe('storage corrompu', () => {
  $it('retourne fallback vide si JSON invalide', () => {
    /* eslint-disable @typescript-eslint/no-unsafe-call,
                      @typescript-eslint/no-unsafe-member-access --
       vi.spyOn typé `error` côté Codacy. Local OK via projectService. */
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    storage.setItem('sf-profile-notifications', 'not-json');
    assert.deepEqual(listProfileNotifications('p1', storage), []);
    assert.equal(errorSpy.mock.calls.length, 1);
    const call = errorSpy.mock.calls[0];
    assert.equal(call[0], '[notifications] corrupted slot');
    assert.equal(call[1], 'sf-profile-notifications');
    assert.ok(call[2] instanceof SyntaxError);
    errorSpy.mockRestore();
    /* eslint-enable @typescript-eslint/no-unsafe-call,
                     @typescript-eslint/no-unsafe-member-access */
  });

  $it('absorbe un setItem qui throw (quota dépassé) sans casser la pipeline', () => {
    /* eslint-disable @typescript-eslint/no-unsafe-call,
                      @typescript-eslint/no-unsafe-member-access --
       vi.spyOn typé `error` côté Codacy. Local OK via projectService. */
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const failingStorage: StorageLike = {
      getItem: () => null,
      setItem: () => {
        throw new Error('QuotaExceededError');
      },
    };

    assert.doesNotThrow(() => {
      appendNotification('p1', N({ eventKey: 'k-quota' }), failingStorage);
    });
    assert.equal(errorSpy.mock.calls.length, 1);
    const call = errorSpy.mock.calls[0];
    assert.equal(call[0], '[notifications] storage write failed (likely quota)');
    const payload = call[1] as { key: unknown; err: unknown };
    assert.equal(typeof payload.key, 'string');
    assert.ok(payload.err instanceof Error);
    errorSpy.mockRestore();
    /* eslint-enable @typescript-eslint/no-unsafe-call,
                     @typescript-eslint/no-unsafe-member-access */
  });
});

$describe('renderNotificationMessage (i18n-aware)', () => {
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

  $it('résout messageKey + paramKeys au render dans la langue courante', () => {
    const notif: PersistedNotification = {
      eventKey: E('k1'),
      messageKey: 'notif.generationDone',
      paramKeys: { type: 'gen.summary' },
      type: 'success',
      createdAt: '2026-04-28T10:00:00Z',
      read: false,
    };
    assert.equal(renderNotificationMessage(notif, t), 'Fiche terminé');
  });

  $it('combine params scalaires et paramKeys (paramKeys traduit, params direct)', () => {
    const notif: PersistedNotification = {
      eventKey: E('k2'),
      messageKey: 'notif.errorWithCount',
      params: { count: 3 },
      type: 'error',
      createdAt: '2026-04-28T10:00:00Z',
      read: false,
    };
    assert.equal(renderNotificationMessage(notif, t), '3 erreurs');
  });

  $it('fallback sur message legacy si messageKey absent (notifs pré-refactor)', () => {
    const legacy: PersistedNotification = {
      eventKey: E('k3'),
      message: 'Message figé en français',
      type: 'info',
      createdAt: '2026-04-28T10:00:00Z',
      read: false,
    };
    assert.equal(renderNotificationMessage(legacy, t), 'Message figé en français');
  });

  $it('chaîne vide si ni messageKey ni message', () => {
    const empty: PersistedNotification = {
      eventKey: E('k4'),
      type: 'info',
      createdAt: '2026-04-28T10:00:00Z',
      read: false,
    };
    assert.equal(renderNotificationMessage(empty, t), '');
  });

  $it('change de langue au render : la même notif persistée donne 2 sorties différentes', () => {
    const notif: PersistedNotification = {
      eventKey: E('k5'),
      messageKey: 'notif.generationDone',
      paramKeys: { type: 'gen.quiz' },
      type: 'success',
      createdAt: '2026-04-28T10:00:00Z',
      read: false,
    };
    // FR
    assert.equal(renderNotificationMessage(notif, t), 'Quiz terminé');
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
    assert.equal(renderNotificationMessage(notif, tEn), 'Quiz complete');
  });
});
