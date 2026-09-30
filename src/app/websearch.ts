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
const showWebsearchError = async (state: AppContext, res: Response): Promise<void> => {
  const body: unknown = await res.json().catch(() => null);
  const error = state.resolveError(websearchErrorCode(body, res));
  state.showToast(state.t('toast.error', { error }), 'error');
};

// Corps de la requête : lang et ageGroup toujours envoyés (âge par défaut sans profil courant).
const websearchPayload = (state: AppContext, query: string) => ({
  query,
  lang: state.locale,
  ageGroup: state.currentProfile?.ageGroup ?? 'enfant',
  scrapeMode: state.scrapeMode,
});

// Sources ajoutées et sélectionnées (coût compté), requête vidée, toast de succès ; les échecs
// d'un succès partiel restent en console.
const applyWebsearchResult = (state: AppContext, result: WebsearchResponse): void => {
  const { sources, failures } = _extractSources(result);
  for (const source of sources) {
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
  setTimeout(() => state.refreshModeration(), 2000);
};

export function createWebsearch() {
  return {
    async searchWeb(this: AppContext) {
      const query = this.webQuery.trim();
      if (!query || !this.currentProjectId) return;
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
        if (!res.ok) {
          await showWebsearchError(this, res);
          return;
        }
        // Corps typé par une variable : `(await res.json()) as …` coupait la mesure Lizard.
        const result: unknown = await res.json();
        applyWebsearchResult(this, result as WebsearchResponse);
      } catch (e) {
        const error = e instanceof Error ? e.message : String(e);
        this.showToast(this.t('toast.webSearchError', { error }), 'error', () => this.searchWeb());
      } finally {
        this.loading.websearch = false;
      }
    },
  };
}
