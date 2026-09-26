/**
 * Traduction des statuts de modération en refus HTTP. Fonctions pures, sans dépendance Node :
 * partagées par les routes (sources, chat, generate) ET le front (src/app/generate.ts), pour que
 * la priorité entre sources bloquantes soit la même des deux côtés.
 */
import type { ModerationStatus } from '../types.js';

export interface ModerationRejection {
  status: 400 | 409 | 503;
  error: string;
}

/**
 * Refus à renvoyer pour un statut de modération, ou null s'il ne bloque pas (absent ou `safe`) :
 * - `unsafe` → 400 `unsafeKey` (contenu signalé ; le chat passe sa propre clé) ;
 * - `pending` → 409 `moderation.pending` (vérification en cours, réessayer plus tard) ;
 * - `error` → 503 `moderation.error` (modération indisponible). Une valeur inattendue (donnée
 *   disque corrompue) suit ce chemin : fail-closed, jamais laissée passer.
 */
export const moderationRejection = (
  status: ModerationStatus | undefined,
  unsafeKey = 'moderation.blocked',
): ModerationRejection | null => {
  if (!status || status === 'safe') return null;
  if (status === 'unsafe') return { status: 400, error: unsafeKey };
  if (status === 'pending') return { status: 409, error: 'moderation.pending' };
  return { status: 503, error: 'moderation.error' };
};

// Un contenu déjà signalé prime sur une panne, qui prime sur une vérification en cours : sinon
// « Modération en cours » masquerait une source signalée.
const BLOCKING_PRIORITY: readonly ModerationStatus[] = ['unsafe', 'error', 'pending'];

interface ModeratedSource {
  moderation?: { status: ModerationStatus };
}

/**
 * Source qui bloque, par priorité `unsafe` > `error` > `pending` ; undefined si aucune ne bloque
 * (statut absent ou `safe`). Un statut inattendu bloque en dernier recours (fail-closed).
 */
export const pickBlockingSource = <T extends ModeratedSource>(
  sources: readonly T[],
): T | undefined => {
  for (const status of BLOCKING_PRIORITY) {
    const match = sources.find((s) => s.moderation?.status === status);
    if (match) return match;
  }
  return sources.find((s) => moderationRejection(s.moderation?.status) !== null);
};
