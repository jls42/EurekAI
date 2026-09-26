/**
 * Verrou asynchrone par clé : les appels de même clé s'exécutent l'un après l'autre (file FIFO),
 * ceux de clés différentes en parallèle. Une erreur est propagée à son appelant sans bloquer la
 * file ; une clé quitte la table dès que son dernier appel se termine.
 */

// Alias plutôt qu'un type fonction écrit dans la signature : Lizard y couperait la fonction.
type AsyncThunk<T> = () => Promise<T>;

// Dernier maillon de chaque file. Il ne rejette jamais : l'échec d'un appel ne bloque pas la suite.
const tails = new Map<string, Promise<unknown>>();

export const withKeyedLock = async <T>(key: string, fn: AsyncThunk<T>): Promise<T> => {
  // Variable intermédiaire : `(tails.get(key) ?? …).then(…)` coupait la mesure Lizard.
  const previous = tails.get(key) ?? Promise.resolve();
  const run = previous.then(() => fn());
  const tail = run.then(
    () => undefined,
    () => undefined,
  );
  tails.set(key, tail);
  try {
    return await run;
  } finally {
    if (tails.get(key) === tail) tails.delete(key);
  }
};

/** Nombre de clés dont une file est en cours (observabilité et tests). */
export const lockedKeyCount = (): number => tails.size;
