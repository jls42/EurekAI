/**
 * Traduction des statuts de modération en refus HTTP. Fonctions pures, sans dépendance Node :
 * partagées par les routes (sources, chat, generate) ET le front (src/app/generate.ts,
 * src/app/effective-moderation.ts), pour que la priorité entre sources bloquantes et le statut
 * effectif soient les mêmes des deux côtés.
 */
import type { ModerationStatus } from '../types.js';
import { expandLegacyModerationCategories } from './moderation-model.js';

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

/**
 * Catégories bloquées d'un profil : sa liste, sinon les défauts de son âge, sinon aucune — même
 * résolution que la modération des messages (runChatModeration). `defaults` = MODERATION_CATEGORIES
 * côté serveur, `moderationDefaults` (/api/moderation-categories) côté front. Object.hasOwn : un
 * ageGroup hostile (`constructor`, `__proto__`) ne remonte pas au prototype.
 */
export const profileBlockedCategories = (
  profile: { moderationCategories?: string[]; ageGroup?: string } | null | undefined,
  defaults: Readonly<Record<string, readonly string[]>>,
): readonly string[] => {
  if (profile?.moderationCategories) return profile.moderationCategories;
  const group = profile?.ageGroup;
  return group && Object.hasOwn(defaults, group) ? defaults[group] : [];
};

type PersistedModeration = { status: ModerationStatus; categories?: Record<string, boolean> };

// Catégories signalées (true) d'une modération persistée ; une clé legacy stockée (2411) compte
// pour ses successeurs, via la même table que la migration des profils.
const flaggedCategoriesOf = (categories: Record<string, boolean> | undefined): string[] =>
  expandLegacyModerationCategories(
    Object.entries(categories ?? {})
      .filter(([, flagged]) => flagged === true)
      .map(([category]) => category),
  );

/**
 * Statut EFFECTIF d'une source pour un profil modéré, uniquement dans le sens fail-closed : un
 * `safe` persisté devient `unsafe` si ses catégories persistées signalent (true) au moins une
 * catégorie bloquée (étendue legacy des deux côtés). Cas visé : les sources modérées de v1.5.4 à
 * v1.7.1, persistées `safe` alors qu'elles portaient `dangerous`/`criminal` à true (le profil
 * bloquait la clé 2411, que 2603 ne renvoie jamais) ; plus généralement, le statut n'est plus figé
 * à l'import. Jamais de déclassement : `unsafe`/`error`/`pending` (et tout statut inattendu) sont
 * rendus tels quels ; sans objet `moderation` (import modération inactive) → undefined.
 */
export const effectiveModerationStatus = (
  moderation: PersistedModeration | undefined,
  blockedCategories: readonly string[],
): ModerationStatus | undefined => {
  if (moderation?.status !== 'safe') return moderation?.status;
  const blocked = expandLegacyModerationCategories(blockedCategories);
  const flagsBlocked = flaggedCategoriesOf(moderation.categories).some((c) => blocked.includes(c));
  return flagsBlocked ? 'unsafe' : 'safe';
};

// Un contenu déjà signalé prime sur une panne, qui prime sur une vérification en cours : sinon
// « Modération en cours » masquerait une source signalée.
const BLOCKING_PRIORITY: readonly ModerationStatus[] = ['unsafe', 'error', 'pending'];

interface ModeratedSource {
  moderation?: PersistedModeration;
}

/**
 * Source qui bloque, par priorité `unsafe` > `error` > `pending` de son statut EFFECTIF
 * (effectiveModerationStatus avec les catégories bloquées du profil) ; undefined si aucune ne
 * bloque. Un statut inattendu bloque en dernier recours (fail-closed).
 */
export const pickBlockingSource = <T extends ModeratedSource>(
  sources: readonly T[],
  blockedCategories: readonly string[],
): T | undefined => {
  const statusOf = (s: T) => effectiveModerationStatus(s.moderation, blockedCategories);
  for (const status of BLOCKING_PRIORITY) {
    const match = sources.find((s) => statusOf(s) === status);
    if (match) return match;
  }
  return sources.find((s) => moderationRejection(statusOf(s)) !== null);
};

/**
 * Statut EFFECTIF de la source bloquante (pickBlockingSource) ; undefined si rien ne bloque. À
 * passer tel quel à moderationRejection : relire `source.moderation.status` rendrait `safe` pour
 * une source promue `unsafe` et laisserait passer la génération (fail-open).
 */
export const blockingModerationStatus = (
  sources: readonly ModeratedSource[],
  blockedCategories: readonly string[],
): ModerationStatus | undefined =>
  effectiveModerationStatus(
    pickBlockingSource(sources, blockedCategories)?.moderation,
    blockedCategories,
  );
