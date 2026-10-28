import { describe, it, expect } from 'vitest';
import { slottedKeyCount, withKeyedSlots } from './keyed-slots.js';

type Gate = { promise: Promise<void>; open: () => void };
const gate = (): Gate => {
  let open = () => undefined as void;
  const promise = new Promise<void>((resolve) => (open = resolve));
  return { promise, open };
};
const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('withKeyedSlots', () => {
  it('au plus `limit` appels en même temps par clé, les suivants dans l’ordre d’arrivée', async () => {
    const gates = Array.from({ length: 5 }, gate);
    const started: number[] = [];
    const runs = gates.map((g, i) =>
      withKeyedSlots('k', 3, async () => {
        started.push(i);
        await g.promise;
        return i;
      }),
    );
    await tick();
    expect(started).toEqual([0, 1, 2]);
    gates[1].open();
    await tick();
    expect(started).toEqual([0, 1, 2, 3]);
    gates.forEach((g) => g.open());
    expect(await Promise.all(runs)).toEqual([0, 1, 2, 3, 4]);
    expect(slottedKeyCount()).toBe(0);
  });

  it('place rendue sur une erreur ; clés différentes en parallèle', async () => {
    const blocker = gate();
    const failing = withKeyedSlots('a', 1, () => Promise.reject(new Error('boom')));
    await expect(failing).rejects.toThrow('boom');
    const other = withKeyedSlots('b', 1, async () => {
      await blocker.promise;
      return 'b';
    });
    expect(await withKeyedSlots('a', 1, async () => 'a')).toBe('a');
    blocker.open();
    expect(await other).toBe('b');
    expect(slottedKeyCount()).toBe(0);
  });
});
