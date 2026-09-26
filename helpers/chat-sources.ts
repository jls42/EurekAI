/**
 * Sources auxquelles le chat a accès : contexte du LLM ET générations par outil. Fonction pure.
 */
import type { Profile, Source } from '../types.js';
import { moderationRejection } from './moderation-http.js';

/**
 * Modération du profil active (même condition que la modération du message) : ne garde que les
 * sources que la génération accepterait, sans statut (importées modération inactive) ou `safe`.
 * `unsafe`, `error`, `pending` et tout statut inattendu (fail-closed) sont exclus, selon la même
 * notion de statut bloquant que moderationRejection — pas de seconde liste de statuts.
 * Modération inactive : toutes les sources. Ne refuse jamais la conversation : une liste vide
 * mène à la notice « pas de sources » et à une phase d'outils vide.
 */
export const selectChatSources = (
  sources: Source[],
  profile: Pick<Profile, 'useModeration'> | null | undefined,
): Source[] =>
  profile?.useModeration
    ? sources.filter((s) => moderationRejection(s.moderation?.status) === null)
    : sources;
