/**
 * Profil de modération d'un projet et catégories actives, côté serveur : source unique des routes
 * (génération, analyse de route, chat, sources) et du filtre des sources du chat. Le front résout
 * les mêmes catégories via profileBlockedCategories (helpers/moderation-http.ts, partagé), avec
 * les défauts servis par /api/moderation-categories.
 */
import type { Profile } from '../types.js';
import { type ProfileStore, MODERATION_CATEGORIES } from '../profiles.js';
import { profileBlockedCategories } from './moderation-http.js';

/** Champs du profil lus par la modération (liste et âge optionnels : profils partiels). */
export type ModerationProfile = Pick<Profile, 'useModeration'> &
  Partial<Pick<Profile, 'moderationCategories' | 'ageGroup'>>;

/**
 * Profil propriétaire du projet (`meta.profileId`), ou null : projet sans profil ou profil
 * supprimé. C'est lui qui décide de la modération du projet, jamais le profil courant du
 * navigateur (l'API n'a pas d'authentification).
 */
export const moderationProfileOf = (
  project: { meta: { profileId?: string } },
  profileStore: Pick<ProfileStore, 'get'>,
): Profile | null => {
  const profileId = project.meta.profileId;
  return profileId ? profileStore.get(profileId) : null;
};

/**
 * Catégories bloquées quand la modération du profil est active, null sinon (aucune source
 * modérée, aucun message vérifié). Résolution : sa liste, sinon les défauts de son âge, sinon
 * ceux d'`enfant` — protection maximale pour un profil illisible (âge inconnu ou hostile, liste
 * qui n'est pas un tableau), même règle que la migration des profils ; jamais de lecture du
 * prototype. `[]` reste `[]` (modération active sans catégorie bloquée) : le chat ne vérifie pas
 * le message, mais les sources sont modérées et leurs catégories stockées, ce qui sert au statut
 * effectif si le parent coche une catégorie plus tard. Copie : l'appelant peut la transmettre
 * sans exposer MODERATION_CATEGORIES.
 */
export const activeModerationCategories = (
  profile: ModerationProfile | null | undefined,
): string[] | null => {
  if (!profile?.useModeration) return null;
  return [
    ...profileBlockedCategories(profile, MODERATION_CATEGORIES, MODERATION_CATEGORIES.enfant),
  ];
};
