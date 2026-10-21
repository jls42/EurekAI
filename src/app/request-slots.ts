/**
 * Requêtes longues de l'onglet : générations envoyées au serveur (étapes des Auto, générations
 * simples, remédiation), qui gardent leur connexion de 30 à 90 s. Au plus MAX_LONG_REQUESTS en même
 * temps pour tout l'onglet, quels que soient le cours et le profil affichés ; les suivantes attendent
 * leur tour dans une file FIFO et partent dès qu'une place se libère. L'attente s'annule par
 * l'AbortSignal de la requête : elle sort de la file sans être envoyée (rejet AbortError, comme un
 * fetch aborté) et n'a jamais pris de place. Une place prise est toujours rendue (`finally`), que la
 * requête réussisse, échoue, lève ou soit abortée.
 * Hors file : l'ouverture d'un cours, le flux SSE et les appels courts (vérification de modération,
 * annulation…), qui ne doivent jamais attendre derrière une génération ; l'analyse de route d'un
 * Auto, le chat, la lecture à voix haute, l'import et la recherche web n'y passent pas non plus.
 */

// Le serveur parle HTTP/1.1 : le navigateur n'ouvre que 6 connexions par hôte, et le flux SSE du
// cours ouvert en garde une. SSE + 3 requêtes longues = 4 connexions : il en reste 2 pour la
// navigation et les appels courts. Mesuré le 2026-10-21 sur l'instance du propriétaire : deux Auto
// lancés sur deux cours, limités à 4 étapes chacun, envoyaient 8 requêtes longues, qui avec le SSE
// prenaient les 6 connexions ; le `GET /api/projects/:pid` de chaque cours ouvert restait en file
// derrière des étapes de 30 à 90 s (bloc « Chargement... » affiché très longtemps).
export const MAX_LONG_REQUESTS = 3;

type Waiter = {
  resolve: () => void;
  signal?: AbortSignal;
  onAbort: () => void;
};

// Places occupées et requêtes en attente, dans l'ordre de leurs demandes.
type SlotPool = { inFlight: number; waiting: Waiter[] };

let pool: SlotPool = { inFlight: 0, waiting: [] };

const abortError = (): DOMException => {
  return new DOMException('Aborted', 'AbortError');
};

const dropWaiter = (slots: SlotPool, waiter: Waiter): void => {
  const index = slots.waiting.indexOf(waiter);
  if (index !== -1) slots.waiting.splice(index, 1);
};

// Place prise tout de suite seulement si elle est libre ET que personne n'attend : jamais de
// passe-droit sur la file. Sinon en file, jusqu'à ce qu'une place lui soit transmise (releaseSlot)
// ou que son signal l'annule.
const acquireSlot = (slots: SlotPool, signal?: AbortSignal): Promise<void> => {
  if (signal?.aborted) return Promise.reject(abortError());
  if (slots.inFlight < MAX_LONG_REQUESTS && slots.waiting.length === 0) {
    slots.inFlight++;
    return Promise.resolve();
  }
  return new Promise<void>((resolve, reject) => {
    const waiter: Waiter = {
      resolve,
      signal,
      onAbort: () => {
        dropWaiter(slots, waiter);
        reject(abortError());
      },
    };
    slots.waiting.push(waiter);
    signal?.addEventListener('abort', waiter.onAbort, { once: true });
  });
};

// Place rendue : transmise au premier en file sans repasser par le compteur (aucune demande arrivée
// entre-temps ne peut la lui prendre), sinon libérée.
const releaseSlot = (slots: SlotPool): void => {
  const next = slots.waiting.shift();
  if (!next) {
    slots.inFlight--;
    return;
  }
  next.signal?.removeEventListener('abort', next.onAbort);
  next.resolve();
};

type LongRequest<T> = () => Promise<T>;

/**
 * Envoie `request` quand une place est libre (tout de suite, ou à son tour dans la file) et rend la
 * place à sa fin, quelle qu'elle soit. `signal` aborté pendant l'attente : rejet AbortError, rien
 * n'est envoyé. Aborté après l'obtention de la place : c'est la requête elle-même qui s'arrête (son
 * fetch reçoit le même signal) ; la place est rendue à sa fin.
 */
export const withLongRequestSlot = async <T>(
  request: LongRequest<T>,
  signal?: AbortSignal,
): Promise<T> => {
  // File capturée à l'appel : après une remise à zéro (tests), une requête d'avant rend sa place à
  // la file qu'elle a prise.
  const slots = pool;
  await acquireSlot(slots, signal);
  try {
    return await request();
  } finally {
    releaseSlot(slots);
  }
};

/** Requêtes longues en cours et en attente (tests : aucune place ne fuit). */
export const longRequestSlots = (): { inFlight: number; waiting: number } => {
  return { inFlight: pool.inFlight, waiting: pool.waiting.length };
};

/** Tests seulement : file neuve, sans requête en cours ni en attente. */
export const _resetLongRequestSlots = (): void => {
  pool = { inFlight: 0, waiting: [] };
};
