/**
 * Statut de modération EFFECTIF côté front, pour le profil courant. Module dédié, hors du
 * vi.mock('./helpers') des tests (cf. pending-utils.ts) : partagé par helpers.ts (badge) et
 * generate.ts (pré-contrôle des générations). Même calcul que le serveur, via le helper partagé
 * @helpers/moderation-http.
 */
import { gateModerationStatus, profileBlockedCategories } from '@helpers/moderation-http';
import type { ModerationStatus, Profile, Source } from '../../types';

interface ModerationViewState {
  currentProfile: Profile | null;
  moderationDefaults?: Record<string, string[]>;
}

/** Catégories bloquées du profil courant : sa liste, sinon les défauts de son âge (API). */
export const currentBlockedCategories = (state: ModerationViewState): readonly string[] =>
  profileBlockedCategories(state.currentProfile, state.moderationDefaults ?? {});

/**
 * Statut à afficher pour une source : statut de GARDE quand le profil courant est modéré (un `safe`
 * dont les catégories persistées signalent une catégorie bloquée s'affiche `unsafe` — pas de
 * bouclier vert sur une source que le serveur refuse ; une source jamais vérifiée s'affiche en
 * attente, comme le serveur la traite), statut persisté sinon (absent : pas de badge).
 */
export const displayedModerationStatus = (
  state: ModerationViewState,
  src: Source | null | undefined,
): ModerationStatus | undefined => {
  if (!src) return undefined;
  if (!state.currentProfile?.useModeration) return src.moderation?.status;
  return gateModerationStatus(src.moderation, currentBlockedCategories(state));
};
