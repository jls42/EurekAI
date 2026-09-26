/**
 * Modération d'un texte fourni par l'utilisateur AVANT tout traitement, source unique côté
 * serveur : texte libre et requête de recherche web (routes/sources.ts), réponse orale d'un quiz
 * vocal une fois transcrite (routes/generations.ts). Ne répond pas lui-même : l'appelant traduit le
 * refus en réponse HTTP. Les exceptions de l'API se propagent (codes actionnables conservés) :
 * l'appelant répond 500 extractErrorCode(e, 'moderation').
 */
import type { Mistral } from '@mistralai/mistralai';
import type { ModerationResult } from '../types.js';
import { moderateContent } from '../generators/moderation.js';
import { moderationRejection, type ModerationRejection } from './moderation-http.js';

/** Issue : accepté (résultat de modération, absent sans vérification) ou refus à renvoyer. */
export type TextScreening =
  | { ok: true; moderation?: ModerationResult }
  | { ok: false; rejection: ModerationRejection };

/**
 * `categories` null : aucune vérification (modération inactive), accepté sans appel. Sinon
 * moderateContent sur le texte nettoyé : `unsafe` → 400 `unsafeKey` (moderation.blocked par
 * défaut), `error` → 503 moderation.error (moderationRejection) ; `safe` → accepté avec le
 * résultat, que l'appelant peut conserver (catégories d'une source).
 */
export const screenUserText = async (
  client: Mistral,
  text: string,
  categories: readonly string[] | null,
  unsafeKey?: string,
): Promise<TextScreening> => {
  if (!categories) return { ok: true };
  const moderation = await moderateContent(client, text.trim(), [...categories]);
  const rejection = moderationRejection(moderation.status, unsafeKey);
  return rejection ? { ok: false, rejection } : { ok: true, moderation };
};
