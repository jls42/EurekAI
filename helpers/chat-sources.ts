/**
 * Sources auxquelles le chat a accès : contexte du LLM ET générations par outil. Fonction pure.
 */
import type { Profile, Source } from '../types.js';
import { MODERATION_CATEGORIES } from '../profiles.js';
import {
  effectiveModerationStatus,
  moderationRejection,
  profileBlockedCategories,
} from './moderation-http.js';

// ageGroup/moderationCategories optionnels : sans eux, aucune catégorie bloquée (statut persisté).
type ChatProfile = Pick<Profile, 'useModeration'> &
  Partial<Pick<Profile, 'moderationCategories' | 'ageGroup'>>;

/**
 * Modération du profil active (même condition que la modération du message) : ne garde que les
 * sources que la génération accepterait, sans statut (importées modération inactive) ou `safe`
 * au sens du statut EFFECTIF (un `safe` dont les catégories persistées signalent une catégorie
 * bloquée par le profil compte comme `unsafe`). `unsafe`, `error`, `pending` et tout statut
 * inattendu (fail-closed) sont exclus, selon la même notion de statut bloquant que
 * moderationRejection — pas de seconde liste de statuts. Modération inactive : toutes les
 * sources. Ne refuse jamais la conversation : une liste vide mène à la notice « pas de sources »
 * et à une phase d'outils vide.
 */
export const selectChatSources = (
  sources: Source[],
  profile: ChatProfile | null | undefined,
): Source[] => {
  if (!profile?.useModeration) return sources;
  const blocked = profileBlockedCategories(profile, MODERATION_CATEGORIES);
  return sources.filter(
    (s) => moderationRejection(effectiveModerationStatus(s.moderation, blocked)) === null,
  );
};
