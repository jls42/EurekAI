import type { AppContext } from './app-context';
import { withAiHeaders } from './ai-fetch';
import { addCostDelta } from './cost-utils';
import { consigneVisibleFor, currentBlockedCategories } from './effective-moderation';
import { openingProfileQuery } from './project-snapshot';
import { gateModerationStatus } from '@helpers/moderation-http';
import type { Consigne, ProjectData } from '../../types';

// Refus de modération (source signalée) : réessayer produirait le même refus, pas de bouton.
const MODERATION_BLOCKED = 'moderation.blocked';

// Relectures de la consigne après la vérification des sources (followConsigneDetection) : la
// première aussitôt, puis au plus CONSIGNE_FOLLOW_UP_RETRIES, espacées de CONSIGNE_FOLLOW_UP_DELAY_MS.
const CONSIGNE_FOLLOW_UP_RETRIES = 4;
const CONSIGNE_FOLLOW_UP_DELAY_MS = 3000;

// Réponse 200 de POST /detect-consigne : consigne persistée (null si aucune), coût de l'appel.
interface DetectConsigneResponse {
  consigne?: Consigne | null;
  costDelta?: number;
}

// Corps JSON d'une réponse, null s'il est absent ou illisible (corps vide, page HTML d'un proxy).
const readJsonBody = async (res: Response): Promise<unknown> => {
  try {
    const body: unknown = await res.json();
    return body;
  } catch {
    return null;
  }
};

// Consigne restante d'une réponse DELETE /sources/:sid (`{ ok, consigne }`), undefined si le corps
// n'en porte pas (corps illisible, serveur antérieur) : la consigne locale reste alors inchangée.
const remainingConsigneOf = (body: unknown): Consigne | null | undefined => {
  if (!body || typeof body !== 'object' || !('consigne' in body)) return undefined;
  return (body as { consigne: Consigne | null }).consigne ?? null;
};

/** Après la suppression d'une source : consigne resynchronisée sur celle que garde le serveur. */
export const syncConsigneAfterDelete = async (state: AppContext, res: Response): Promise<void> => {
  if (!res.ok) return;
  const consigne = remainingConsigneOf(await readJsonBody(res));
  if (consigne !== undefined) state.consigne = consigne;
};

// Code d'erreur stable renvoyé par le serveur (`{ error }`), sinon le statut HTTP.
const errorCodeOf = (body: unknown, res: Response): string => {
  const code = (body as { error?: unknown } | null)?.error;
  return typeof code === 'string' ? code : res.statusText;
};

// Consigne reçue : coût ajouté au total du projet, puis toast et dialogue selon ce qui est
// MONTRABLE (consigneVisibleFor, même garde que le serveur), jamais sur le seul `found`.
const applyDetectedConsigne = (state: AppContext, body: unknown): void => {
  const payload = (body ?? {}) as DetectConsigneResponse;
  addCostDelta(state, payload.costDelta, 'detect-consigne');
  state.consigne = payload.consigne ?? null;
  const visible = consigneVisibleFor(state);
  state.showToast(
    state.t(visible ? 'toast.consigneDetected' : 'toast.noConsigne'),
    visible ? 'success' : 'info',
  );
  if (!visible) return;
  void state.$nextTick(() => {
    (state.$refs.consigneDialog as HTMLDialogElement | undefined)?.showModal();
    state.refreshIcons();
  });
};

// Refus du serveur traduit comme pour une génération (resolveError : codes de modération,
// no_sources, erreurs de l'API) ; « Réessayer » sauf sur un contenu signalé.
const showConsigneError = (state: AppContext, res: Response, body: unknown): void => {
  const code = errorCodeOf(body, res);
  const retry = code === MODERATION_BLOCKED ? null : () => void state.detectConsigne();
  state.showToast(state.t('toast.error', { error: state.resolveError(code) }), 'error', retry);
};

// Sources que la détection de fond lit pour le profil courant : statut de garde `safe` si le
// profil est modéré (mêmes que selectChatSources côté serveur), toutes sinon.
const detectableSourceIds = (state: AppContext): string[] => {
  if (!state.currentProfile?.useModeration) return state.sources.map((s) => s.id);
  const blocked = currentBlockedCategories(state);
  return state.sources
    .filter((s) => gateModerationStatus(s.moderation, blocked) === 'safe')
    .map((s) => s.id);
};

// Consigne à jour : sa provenance couvre toutes les sources détectables (aucune : rien à attendre).
const consigneCoversSources = (state: AppContext): boolean => {
  const ids = detectableSourceIds(state);
  const provenance = state.consigne?.sourceIds;
  if (ids.length === 0) return true;
  return Array.isArray(provenance) && ids.every((id) => provenance.includes(id));
};

export function createConsigne() {
  // Jeton de la relecture en cours : une nouvelle demande la remplace (une seule à la fois), la
  // précédente s'arrête à sa prochaine étape.
  let followToken = 0;

  const pollConsigne = async (
    state: AppContext,
    projectId: string,
    token: number,
    retries: number,
  ): Promise<void> => {
    if (token !== followToken || state.currentProjectId !== projectId) return;
    await state.refreshConsigne();
    if (token !== followToken || retries <= 0 || consigneCoversSources(state)) return;
    setTimeout(() => {
      void pollConsigne(state, projectId, token, retries - 1);
    }, CONSIGNE_FOLLOW_UP_DELAY_MS);
  };

  return {
    async refreshConsigne(this: AppContext) {
      if (!this.currentProjectId) return;
      try {
        const res = await fetch(
          '/api/projects/' + this.currentProjectId + openingProfileQuery(this.currentProfile?.id),
        );
        if (res.ok) {
          // Corps typé par une variable : `(await res.json()) as …` coupait la mesure Lizard.
          const snapshot: unknown = await res.json();
          const project = snapshot as ProjectData;
          if (project.consigne) {
            this.consigne = project.consigne;
            void this.$nextTick(() => this.refreshIcons());
          }
        }
      } catch {
        /* silent: offline fallback, consigne absent OK */
      }
    },

    /**
     * Consigne relue après la vérification des sources (runRefreshModeration, plus de source en
     * attente) : la détection de fond ATTEND la modération, puis appelle le LLM ; elle aboutit donc
     * après la dernière modération. Relectures bornées, arrêtées dès que la provenance de la
     * consigne couvre les sources détectables ou quand le projet change.
     */
    followConsigneDetection(this: AppContext, projectId: string) {
      followToken++;
      void pollConsigne(this, projectId, followToken, CONSIGNE_FOLLOW_UP_RETRIES);
    },

    async detectConsigne(this: AppContext) {
      const projectId = this.currentProjectId;
      if (!projectId) return;
      (this.$refs.consigneDialog as HTMLDialogElement | undefined)?.close();
      this.consigneLoading = true;
      this.showToast(this.t('toast.consigneAnalyzing'), 'info');
      try {
        const res = await fetch(
          this.apiBase() + '/detect-consigne',
          withAiHeaders({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lang: this.locale }),
          }),
        );
        const body = await readJsonBody(res);
        // Projet changé pendant la détection (attente de la modération comprise) : réponse ignorée.
        if (this.currentProjectId !== projectId) return;
        if (res.ok) applyDetectedConsigne(this, body);
        else showConsigneError(this, res, body);
      } catch {
        this.showToast(this.t('toast.consigneError'), 'error');
      } finally {
        this.consigneLoading = false;
        void this.$nextTick(() => this.refreshIcons());
      }
    },
  };
}
