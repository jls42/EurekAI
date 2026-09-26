/**
 * Sources auxquelles le chat a accès : contexte du LLM ET générations par outil. Fonction pure.
 */
import type { Source } from '../types.js';
import { effectiveModerationStatus, moderationRejection } from './moderation-http.js';
import { activeModerationCategories, type ModerationProfile } from './moderation-profile.js';

/**
 * Modération du profil active (même condition et mêmes catégories que la modération du message,
 * activeModerationCategories) : ne garde que les sources que la génération accepterait, sans
 * statut (importées modération inactive) ou `safe` au sens du statut EFFECTIF (un `safe` dont les
 * catégories persistées signalent une catégorie bloquée par le profil compte comme `unsafe`).
 * `unsafe`, `error`, `pending` et tout statut inattendu (fail-closed) sont exclus, selon la même
 * notion de statut bloquant que moderationRejection — pas de seconde liste de statuts. Modération
 * inactive : toutes les sources. Ne refuse jamais la conversation : une liste vide mène à la
 * notice « pas de sources » et à une phase d'outils vide.
 */
export const selectChatSources = (
  sources: Source[],
  profile: ModerationProfile | null | undefined,
): Source[] => {
  const blocked = activeModerationCategories(profile);
  if (!blocked) return sources;
  return sources.filter(
    (s) => moderationRejection(effectiveModerationStatus(s.moderation, blocked)) === null,
  );
};
