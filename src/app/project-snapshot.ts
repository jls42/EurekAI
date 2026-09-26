/**
 * Suffixe `?profileId=` du snapshot d'un projet (GET /api/projects/:pid) : le profil courant qui
 * l'ouvre. Le serveur rattache à ce profil un projet encore orphelin (sans profil), dont la
 * modération devient celle de ce profil. Sans profil courant : aucun suffixe (simple lecture).
 * Module dédié, hors du vi.mock('./helpers') des tests : partagé par projects.ts (ouverture),
 * consigne.ts (rafraîchissement) et helpers.ts (réconciliation des générations en cours).
 */
export const openingProfileQuery = (profileId: string | undefined): string => {
  return profileId ? '?profileId=' + encodeURIComponent(profileId) : '';
};
