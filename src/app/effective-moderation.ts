/**
 * Statut de modération EFFECTIF côté front, pour le profil courant. Module dédié, hors du
 * vi.mock('./helpers') des tests (cf. pending-utils.ts) : partagé par helpers.ts (badge) et
 * generate.ts (pré-contrôle des générations). Même calcul que le serveur, via le helper partagé
 * @helpers/moderation-http.
 */
import { effectiveModerationStatus, profileBlockedCategories } from '@helpers/moderation-http';
import type { ModerationStatus, Profile, Source } from '../../types';

interface ModerationViewState {
  currentProfile: Profile | null;
  moderationDefaults?: Record<string, string[]>;
}

/** Catégories bloquées du profil courant : sa liste, sinon les défauts de son âge (API). */
export const currentBlockedCategories = (state: ModerationViewState): readonly string[] =>
  profileBlockedCategories(state.currentProfile, state.moderationDefaults ?? {});

/**
 * Statut à afficher pour une source : EFFECTIF quand le profil courant est modéré (un `safe`
 * dont les catégories persistées signalent une catégorie bloquée s'affiche `unsafe` — pas de
 * bouclier vert sur une source que le serveur refuse), statut persisté sinon.
 */
export const displayedModerationStatus = (
  state: ModerationViewState,
  src: Source | null | undefined,
): ModerationStatus | undefined =>
  state.currentProfile?.useModeration
    ? effectiveModerationStatus(src?.moderation, currentBlockedCategories(state))
    : src?.moderation?.status;
