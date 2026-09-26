import { describe, it, expect } from 'vitest';
import { lockedKeyCount, withKeyedLock } from './keyed-lock.js';

// Promesse résolue à la demande : le test décide quand chaque appel se termine.
const gate = () => {
  let open: () => void = () => {};
  const opened = new Promise<void>((r) => (open = r));
  return { opened, open };
};

const flush = () => new Promise((r) => setTimeout(r, 0));

describe('withKeyedLock', () => {
  it('même clé : les appels s’exécutent l’un après l’autre, dans l’ordre d’arrivée', async () => {
    const events: string[] = [];
    const first = gate();

    const a = withKeyedLock('k', async () => {
      events.push('a:start');
      await first.opened;
      events.push('a:end');
      return 'a';
    });
    const b = withKeyedLock('k', async () => {
      events.push('b:start');
      return 'b';
    });
    const c = withKeyedLock('k', async () => {
      events.push('c:start');
      return 'c';
    });

    await flush();
    expect(events).toEqual(['a:start']);
    first.open();

    expect(await Promise.all([a, b, c])).toEqual(['a', 'b', 'c']);
    expect(events).toEqual(['a:start', 'a:end', 'b:start', 'c:start']);
  });

  it('clés différentes : exécution en parallèle', async () => {
    const blocked = gate();
    const events: string[] = [];

    const slow = withKeyedLock('k1', async () => {
      events.push('k1:start');
      await blocked.opened;
      events.push('k1:end');
    });
    await withKeyedLock('k2', async () => {
      events.push('k2');
    });

    expect(events).toEqual(['k1:start', 'k2']);
    blocked.open();
    await slow;
  });

  it('une erreur est propagée à son appelant sans bloquer la file', async () => {
    const failing = withKeyedLock('k-err', async () => {
      throw new Error('boom');
    });
    const next = withKeyedLock('k-err', async () => 'suivant');

    await expect(failing).rejects.toThrow('boom');
    await expect(next).resolves.toBe('suivant');
  });

  it('une exception synchrone de fn est aussi propagée, la file continue', async () => {
    const failing = withKeyedLock('k-sync', () => {
      throw new Error('sync boom');
    });
    await expect(failing).rejects.toThrow('sync boom');
    await expect(withKeyedLock('k-sync', async () => 1)).resolves.toBe(1);
  });

  it('nettoie la table quand le dernier appel d’une clé se termine', async () => {
    const before = lockedKeyCount();
    const blocked = gate();

    const a = withKeyedLock('k-clean', async () => blocked.opened);
    const b = withKeyedLock('k-clean', async () => 'b');
    expect(lockedKeyCount()).toBe(before + 1);

    blocked.open();
    await Promise.all([a, b]);
    expect(lockedKeyCount()).toBe(before);

    await expect(withKeyedLock('k-clean', async () => 'encore')).resolves.toBe('encore');
    expect(lockedKeyCount()).toBe(before);
  });

  it('nettoie aussi après une erreur', async () => {
    const before = lockedKeyCount();
    await expect(
      withKeyedLock('k-clean-err', async () => {
        throw new Error('boom');
      }),
    ).rejects.toThrow('boom');
    expect(lockedKeyCount()).toBe(before);
  });
});
