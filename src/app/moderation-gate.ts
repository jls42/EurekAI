/**
 * Pré-contrôle de modération des générations côté front, et vérification des sources à la demande
 * (POST /sources/moderate). Module dédié, hors du vi.mock('./helpers') des tests (cf.
 * effective-moderation.ts) : partagé par generate.ts (génération simple, tout générer, auto et son
 * analyse de route), components/quiz.ts (remédiation) et sources.ts (« Revérifier »).
 */
import { awaitsModeration, blockingModerationStatus } from '@helpers/moderation-http';
import { withAiHeaders } from './ai-fetch';
import { currentBlockedCategories } from './effective-moderation';
import type { AppContext } from './app-context';
import type { ModerationResult, Source } from '../../types';

// Plafond de sourceIds de la route (400 invalid_input au-delà).
const MAX_VERIFIED_SOURCE_IDS = 50;
const PROJECT_ID_SAFE = /^[a-zA-Z0-9_-]{1,64}$/;

type ModerationEntry = { id?: unknown; moderation?: ModerationResult };

/**
 * Sources visées par une génération : `sourceIds` explicites (version facile à lire : les sources
 * de la fiche d'origine ; remédiation : celles du quiz), sinon la sélection ; une liste vide vaut
 * toutes les sources, même règle que le serveur (getMarkdownOrNull, checkModeration).
 */
export const generationSources = (state: AppContext, sourceIds?: readonly string[]): Source[] => {
  const ids = sourceIds ?? state.selectedIds;
  return ids.length > 0 ? state.sources.filter((s: Source) => ids.includes(s.id)) : state.sources;
};

/**
 * Pré-contrôle synchrone, sur l'état local : false (avec le toast de modération) quand la
 * génération ne peut pas partir. Plus de verrou `loading[type]` : N générations du même type en
 * parallèle sont autorisées (un pending de plus, annulable individuellement).
 */
export const canStartGenerate = (state: AppContext, sourceIds?: readonly string[]): boolean => {
  if (!state.currentProjectId) return false;
  const moderationStatus = state.blockedModerationStatus(sourceIds);
  if (state.currentProfile?.useModeration && moderationStatus) {
    state.showToast(state.moderationBlockedMessage(moderationStatus, sourceIds), 'error');
    return false;
  }
  return true;
};

/** Statuts renvoyés par le serveur fusionnés dans state.sources (entrée sans `moderation` ignorée). */
export const mergeSourceModerations = (
  state: { sources: Source[] },
  entries: readonly (ModerationEntry | null)[],
): void => {
  for (const entry of entries) {
    const local = entry?.moderation && state.sources.find((s: Source) => s.id === entry.id);
    if (local) local.moderation = entry.moderation;
  }
};

const applyModerationResponse = async (
  state: AppContext,
  projectId: string,
  res: Response,
): Promise<boolean> => {
  if (!res.ok) return false;
  const body: unknown = await res.json();
  if (state.currentProjectId !== projectId) return false;
  const entries = (body as { sources?: unknown } | null)?.sources;
  mergeSourceModerations(state, Array.isArray(entries) ? (entries as ModerationEntry[]) : []);
  void state.$nextTick(() => state.refreshIcons());
  return true;
};

/**
 * Vérifie des sources (toutes si `sourceIds` est absent) : POST /sources/moderate, qui reprend les
 * modérations en attente ou en erreur et répond au plus tard après 10 s, puis fusion des statuts
 * dans state.sources. false si la requête échoue (réseau, HTTP) ou si le projet courant a changé
 * entre-temps : rien n'est fusionné.
 */
export const requestSourceModeration = async (
  state: AppContext,
  projectId: string,
  sourceIds?: readonly string[],
): Promise<boolean> => {
  if (!PROJECT_ID_SAFE.test(projectId)) return false;
  // Seul le projet ouvert peut être vérifié : forme `if (allowedUrls.includes(url)) { fetch(url,
  // …) }` reconnue par Codacy rule-node-ssrf (cf. src/components/quiz.ts).
  const allowedUrls = ['/api/projects/' + state.currentProjectId + '/sources/moderate'];
  const url = '/api/projects/' + projectId + '/sources/moderate';
  try {
    if (allowedUrls.includes(url)) {
      const res = await fetch(
        url,
        withAiHeaders({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sourceIds ? { sourceIds } : {}),
        }),
      );
      return await applyModerationResponse(state, projectId, res);
    }
    return false;
  } catch (e) {
    console.warn('[moderation] vérification des sources impossible', e);
    return false;
  }
};

// Sources à vérifier avant de refuser : en attente, en erreur, au statut inattendu ou jamais
// vérifiées (awaitsModeration), profil modéré seulement. Aucune si une source visée est signalée
// (statut effectif) : le refus est assuré, sans appel.
const sourcesToVerify = (state: AppContext, sourceIds?: readonly string[]): string[] => {
  if (!state.currentProfile?.useModeration) return [];
  const sources = generationSources(state, sourceIds);
  if (blockingModerationStatus(sources, currentBlockedCategories(state)) === 'unsafe') return [];
  return sources
    .filter((s) => awaitsModeration(s.moderation))
    .map((s) => s.id)
    .slice(0, MAX_VERIFIED_SOURCE_IDS);
};

/**
 * Pré-contrôle ASYNCHRONE d'une génération, à appeler AVANT tout pending optimiste (sinon un
 * cancel pendant l'attente serveur trouverait 404 et la génération partirait quand même). Source
 * signalée : refus immédiat (même toast). Source en attente, en erreur ou jamais vérifiée : toast
 * « Vérification des sources… », vérification (requestSourceModeration), puis pré-contrôle sur
 * les statuts fusionnés (canStartGenerate) ; un échec réseau laisse l'état local, donc le toast en
 * attente/erreur. true si la génération peut partir sur le projet courant, inchangé pendant la
 * vérification.
 */
export const ensureGenerationAllowed = async (
  state: AppContext,
  sourceIds?: readonly string[],
): Promise<boolean> => {
  const projectId = state.currentProjectId;
  if (!projectId) return false;
  const toVerify = sourcesToVerify(state, sourceIds);
  if (toVerify.length > 0) {
    state.showToast(state.t('moderation.checking'), 'info');
    await requestSourceModeration(state, projectId, toVerify);
    if (state.currentProjectId !== projectId) return false;
  }
  return canStartGenerate(state, sourceIds);
};

/**
 * Ouverture d'un projet : profil courant modéré et au moins une source qui attend sa vérification
 * (en attente, en erreur ou jamais vérifiée) → POST /sources/moderate en arrière-plan, sur toutes
 * les sources (le serveur en lance au plus 10 par appel), sans bloquer l'ouverture ; statuts
 * fusionnés au retour, si le projet est toujours ouvert.
 */
export const resumeProjectModeration = (state: AppContext, projectId: string): void => {
  if (!state.currentProfile?.useModeration) return;
  if (!state.sources.some((s: Source) => awaitsModeration(s.moderation))) return;
  void requestSourceModeration(state, projectId);
};
