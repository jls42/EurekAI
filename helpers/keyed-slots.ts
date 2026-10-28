/**
 * Places par clé : au plus `limit` appels de même clé en même temps, les suivants attendent dans
 * une file FIFO ; clés différentes en parallèle. Une place libérée passe directement au premier de
 * la file (jamais une place de plus) ; elle est toujours rendue, erreur comprise. Une clé quitte la
 * table dès que son dernier appel se termine. Sert aux étapes des lots Auto (3 par clé Mistral).
 */

// Alias plutôt qu'un type fonction écrit dans la signature : Lizard y couperait la fonction.
type AsyncThunk<T> = () => Promise<T>;
type Wake = () => void;

interface Slots {
  running: number;
  waiting: Wake[];
}

const slotsByKey = new Map<string, Slots>();

const acquire = (key: string, limit: number): Promise<void> => {
  const slots = slotsByKey.get(key) ?? { running: 0, waiting: [] };
  slotsByKey.set(key, slots);
  if (slots.running < limit) {
    slots.running++;
    return Promise.resolve();
  }
  return new Promise((resolve) => slots.waiting.push(resolve));
};

const release = (key: string): void => {
  const slots = slotsByKey.get(key);
  if (!slots) return;
  const next = slots.waiting.shift();
  if (next) {
    next();
    return;
  }
  slots.running--;
  if (slots.running === 0) slotsByKey.delete(key);
};

export const withKeyedSlots = async <T>(
  key: string,
  limit: number,
  fn: AsyncThunk<T>,
): Promise<T> => {
  await acquire(key, limit);
  try {
    return await fn();
  } finally {
    release(key);
  }
};

/** Nombre de clés qui ont un appel en cours ou en attente (observabilité et tests). */
export const slottedKeyCount = (): number => slotsByKey.size;
