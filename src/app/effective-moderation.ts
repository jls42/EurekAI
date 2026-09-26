/**
 * Statut de modération EFFECTIF côté front, pour le profil courant. Module dédié, hors du
 * vi.mock('./helpers') des tests (cf. pending-utils.ts) : partagé par helpers.ts (badge,
 * consigneVisible), generate.ts (pré-contrôle des générations) et consigne.ts. Même calcul que le
 * serveur, via le helper partagé @helpers/moderation-http.
 */
import {
  consigneUsable,
  gateModerationStatus,
  profileBlockedCategories,
} from '@helpers/moderation-http';
import type { Consigne, ModerationStatus, Profile, Source } from '../../types';

interface ModerationViewState {
  currentProfile: Profile | null;
  moderationDefaults?: Record<string, string[]>;
}

interface ConsigneViewState extends ModerationViewState {
  consigne: Consigne | null;
  sources: Source[];
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

/**
 * Consigne montrée à l'enfant (dialogue, bandeau active/écartée) pour le profil courant : même
 * garde que le serveur avant les prompts (consigneUsable) — profil modéré : chaque source de sa
 * provenance vérifiée `safe` et toujours présente ; non modéré : dès qu'elle a des points. Sinon
 * le bouton « Détecter la consigne » reste proposé.
 */
export const consigneVisibleFor = (state: ConsigneViewState): boolean => {
  const blocked = state.currentProfile?.useModeration ? currentBlockedCategories(state) : null;
  return consigneUsable(state.consigne, state.sources, blocked);
};
