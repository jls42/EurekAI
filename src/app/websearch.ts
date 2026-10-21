import { addCostDelta } from './cost-utils';
import { withAiHeaders } from './ai-fetch';
import type { AppContext } from './app-context';
import type { Source } from '../../types';

type WebsearchSource = Source & { estimatedCost?: number };
type WebsearchFailure = { label: string; code: string };
type WebsearchResponse =
  | WebsearchSource
  | WebsearchSource[]
  | { sources: WebsearchSource[]; failures: WebsearchFailure[] };
// Refus : `error` global (url_blocked 422, all_sources_failed 502, rate_limited 429…) et, quand
// aucune source n'a été créée, le détail des échecs `{ label, code }`.
type WebsearchErrorBody = { error?: unknown; failures?: unknown };

function _extractSources(result: WebsearchResponse): {
  sources: WebsearchSource[];
  failures: WebsearchFailure[];
} {
  if (Array.isArray(result)) return { sources: result, failures: [] };
  if ('sources' in result) return { sources: result.sources, failures: result.failures ?? [] };
  return { sources: [result], failures: [] };
}

// Code commun à tous les échecs quand il est unique et parlant (quota_exceeded, auth_required,
// url_blocked…) ; null sinon (codes différents, internal_error, liste absente).
const sharedFailureCode = (failures: unknown): string | null => {
  if (!Array.isArray(failures)) return null;
  const codes = new Set(failures.map((f) => (f as { code?: unknown } | null)?.code));
  const [only] = codes;
  if (codes.size !== 1 || typeof only !== 'string') return null;
  return only === 'internal_error' ? null : only;
};

/**
 * Code affiché pour un refus de la recherche web : celui que partagent tous les échecs s'il est
 * parlant (un 502 all_sources_failed dû au quota montre le quota), sinon le code global du serveur
 * (url_blocked, all_sources_failed, rate_limited…), sinon le statut HTTP.
 */
export const websearchErrorCode = (body: unknown, res: Response): string => {
  const { error, failures } = (body ?? {}) as WebsearchErrorBody;
  const shared = sharedFailureCode(failures);
  if (shared) return shared;
  return typeof error === 'string' && error ? error : res.statusText;
};

// Refus du serveur : toast traduit (resolveError), requête gardée pour que l'enfant la corrige.
const showWebsearchError = (state: AppContext, res: Response, body: unknown): void => {
  const error = state.resolveError(websearchErrorCode(body, res));
  state.showToast(state.t('toast.error', { error }), 'error');
};

// Corps d'une réponse : celui d'un succès doit se lire (sinon exception, toast d'erreur), celui
// d'un refus peut manquer (page HTML d'un proxy).
const readWebsearchBody = async (res: Response): Promise<unknown> => {
  if (!res.ok) return res.json().catch(() => null);
  const body: unknown = await res.json();
  return body;
};

// Corps de la requête : lang et ageGroup toujours envoyés (âge par défaut sans profil courant).
const websearchPayload = (state: AppContext, query: string) => ({
  query,
  lang: state.locale,
  ageGroup: state.currentProfile?.ageGroup ?? 'enfant',
  scrapeMode: state.scrapeMode,
});

// Sources ajoutées et sélectionnées (coût compté), sans doublon si le cours a été rouvert pendant
// la recherche (sources déjà relues du serveur) ; requête vidée, toast de succès ; les échecs d'un
// succès partiel restent en console.
const applyWebsearchResult = (
  state: AppContext,
  result: WebsearchResponse,
  projectId: string,
): void => {
  const { sources, failures } = _extractSources(result);
  const fresh = sources.filter((n) => !state.sources.some((s: Source) => s.id === n.id));
  for (const source of fresh) {
    state.sources.push(source);
    state.selectedIds.push(source.id);
    addCostDelta(state, source.estimatedCost, 'sources/websearch');
  }
  state.webQuery = '';
  state.showWebInput = false;
  const msg =
    sources.length > 1
      ? state.t('toast.webSearchAddedMulti', { count: sources.length })
      : state.t('toast.webSearchAdded');
  state.showToast(msg, 'success');
  if (failures.length > 0) {
    console.warn('[websearch] partial failures:', failures);
  }
  void state.$nextTick(() => state.refreshIcons());
  setTimeout(() => {
    if (state.currentProjectId === projectId) void state.refreshModeration();
  }, 2000);
};

// Réponse appliquée au cours de la recherche seulement : changé entre-temps, le serveur a enregistré
// les sources (relues au retour sur ce cours) ; ni sources, ni sélection, ni coût, ni toast dans le
// cours affiché.
const handleWebsearchResponse = async (
  state: AppContext,
  projectId: string,
  res: Response,
): Promise<void> => {
  const body = await readWebsearchBody(res);
  if (state.currentProjectId !== projectId) return;
  if (res.ok) applyWebsearchResult(state, body as WebsearchResponse, projectId);
  else showWebsearchError(state, res, body);
};

const reportWebsearchException = (state: AppContext, projectId: string, e: unknown): void => {
  if (state.currentProjectId !== projectId) return;
  const error = e instanceof Error ? e.message : String(e);
  state.showToast(state.t('toast.webSearchError', { error }), 'error', () => state.searchWeb());
};

export function createWebsearch() {
  return {
    async searchWeb(this: AppContext) {
      const query = this.webQuery.trim();
      const projectId = this.currentProjectId;
      if (!query || !projectId) return;
      this.loading.websearch = true;
      try {
        const res = await fetch(
          this.apiBase() + '/sources/websearch',
          withAiHeaders({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(websearchPayload(this, query)),
          }),
        );
        await handleWebsearchResponse(this, projectId, res);
      } catch (e) {
        reportWebsearchException(this, projectId, e);
      } finally {
        // Un autre cours affiché peut avoir sa propre recherche en cours.
        if (this.currentProjectId === projectId) this.loading.websearch = false;
      }
    },
  };
}
