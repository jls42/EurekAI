import { getLocale } from '../i18n/index';
import { normalizeSummaryData } from './helpers';
import { countPendingOfType, MAX_PARALLEL_PER_TYPE, pendingOfTypeExists } from './pending-utils';
import { addCostDelta } from './cost-utils';
import { withAiHeaders } from './ai-fetch';
import {
  AUTO_AGENTS_SET,
  AUTO_AGENT_TYPES,
  TTS_DEPENDENT_AGENTS,
} from '../../generators/auto-agents';
import { SINGLE_GENERATE_SET, SINGLE_GENERATE_TYPES } from '../../generators/generation-types';
import type { AppContext, GenerateExtraBody } from './app-context';
import type { FailedStepCode, Generation } from '../../types';
import { buildEventKey } from '../../helpers/event-key';
import { blockingModerationStatus, pickBlockingSource } from '@helpers/moderation-http';
import { currentBlockedCategories } from './effective-moderation';
import { ensureGenerationAllowed, generationSources } from './moderation-gate';

const TOAST_GENERATION_ERROR = 'toast.generationError';
// Refus de modération (contenu signalé) : réessayer produirait le même refus, pas de bouton.
const MODERATION_BLOCKED = 'moderation.blocked';
const TOAST_ERROR = 'toast.error';
const TOAST_TYPED_ERROR = 'toast.typedError';
const TOAST_GENERATION_BUSY = 'toast.generationBusy';
const TOAST_VIEW = 'toast.view';
const TOAST_PARTIAL_GENERATED = 'toast.partialGenerated';
const I18N_GEN_PREFIX = 'gen.';
const NOTIF_GENERATION_DONE = 'toast.generationDone';
const PROJECT_ID_SAFE = /^[a-zA-Z0-9_-]{1,64}$/;

type GenerationUI = Generation & {
  _playlistMode?: boolean;
  _activeAudioSection?: string;
  [key: string]: unknown;
};

type FailedSection = {
  section: string;
  code: string;
};

type VoiceResult = {
  audioUrl?: string;
  audioUrls?: Record<string, string>;
  failedSections?: FailedSection[];
  costDelta?: number;
};

export function postJson(body: unknown, signal: AbortSignal): RequestInit {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  };
}

export function registerGeneration(state: AppContext, gen: Generation): void {
  normalizeSummaryData(gen);
  state.initGenProps(gen);
  // openGens AVANT upsert : invariant doc dans helpers.ts applyGenerationEvent
  // (transition undefined→true ferait auto-play du quiz vocal). Idempotent par
  // gid via upsertGenerationById (payload 200 fallback + SSE 'completed' dans
  // le même onglet absorbés sans doublon).
  state.openGens[gen.id] = true;
  state.upsertGenerationById(gen);
  addCostDelta(state, gen.estimatedCost, `generate/${gen.type}`);
}

// Corps d'une réponse de generateAll : la génération sur un succès, sinon null (échec journalisé).
const readGenerateResponse = async (r: Response): Promise<Generation | null> => {
  if (r.ok) {
    const gen: Generation = await r.json();
    return gen;
  }
  const err = await r.json().catch(() => ({}));
  console.error(`generateAll failed (${r.status}):`, err.error || r.statusText);
  return null;
};

// Corps indépendants, lus en parallèle ; générations enregistrées dans l'ordre des réponses.
export async function aggregateGenerateResults(
  responses: Response[],
  state: AppContext,
): Promise<number> {
  const generations = await Promise.all(responses.map(readGenerateResponse));
  let failures = 0;
  for (const gen of generations) {
    if (gen) registerGeneration(state, gen);
    else failures++;
  }
  return failures;
}

export function showGenerateAllResult(failures: number, total: number, state: AppContext): void {
  if (failures > 0 && failures < total) {
    state.showToast(state.t(TOAST_PARTIAL_GENERATED, { count: total - failures }), 'warning');
  } else if (failures >= total) {
    state.showToast(state.t(TOAST_GENERATION_ERROR), 'error');
  } else {
    state.showToast(state.t('toast.allGenerated'), 'success', null, {
      label: state.t(TOAST_VIEW),
      fn: () => state.goToView('dashboard'),
    });
  }
}

type AutoBody = {
  sourceIds?: string[];
  lang: string;
  ageGroup: string;
  useConsigne: boolean;
  count: number;
};

type AutoRoute = { plan: Array<{ agent: string }>; costDelta?: number };

export function buildGenerateBody(state: AppContext): AutoBody {
  return {
    sourceIds: state.selectedIds.length > 0 ? state.selectedIds : undefined,
    lang: getLocale(),
    ageGroup: state.currentProfile?.ageGroup || 'enfant',
    useConsigne: state.useConsigne,
    count: state.generateCount,
  };
}

export async function runAutoRoute(
  state: AppContext,
  projectId: string,
  body: AutoBody,
  controller: AbortController,
): Promise<AutoRoute | null> {
  const routeRes = await fetch(
    // eslint-disable-next-line sonarjs/no-duplicate-string -- required: SSRF taint analysis needs literal inline near fetch
    '/api/projects/' + projectId + '/generate/route',
    withAiHeaders(postJson(body, controller.signal)),
  );
  if (!routeRes.ok) {
    const err = await routeRes.json().catch(() => ({}));
    state.showToast(
      state.t(TOAST_ERROR, { error: state.resolveError(err.error || routeRes.statusText) }),
      'error',
      () => state.generateAuto(),
    );
    return null;
  }
  const route = (await routeRes.json()) as AutoRoute;
  if (route.costDelta) addCostDelta(state, route.costDelta, 'generate/route');
  return route;
}

export function populateAutoPlan(
  state: AppContext,
  plan: Array<{ agent: string }>,
  plannedTypes: string[],
  controller: AbortController,
): void {
  state.loading.auto = false;
  delete state.abortControllers.auto;
  for (const step of plan) {
    // Sans TTS, les générations audio (podcast, quiz vocal, dictée) sont écartées du plan.
    if (TTS_DEPENDENT_AGENTS.has(step.agent) && !state.ttsReady()) continue;
    // Whitelist defense-in-depth : rejette tout agent hors contrat serveur
    // (AUTO_AGENTS_SET, source unique dans generators/auto-agents.ts).
    if (!AUTO_AGENTS_SET.has(step.agent)) continue;
    plannedTypes.push(step.agent);
    state.loading[step.agent] = true;
    state.abortControllers[step.agent] = controller;
  }
}

type StepResult = 'success' | 'aborted' | { kind: 'failed'; code: FailedStepCode };

// Le serveur garantit que les codes renvoyés (FailedStepCode) sont stables
// (cf. types.ts). Source de vérité côté client pour normaliser les valeurs
// inattendues vers 'internal_error' avant qu'elles ne polluent les codes[]
// que pickAutoFailToast inspecte.
const KNOWN_FAILED_STEP_CODES: ReadonlySet<FailedStepCode> = new Set<FailedStepCode>([
  'llm_invalid_json',
  'quota_exceeded',
  'upstream_unavailable',
  'auth_required',
  'tts_upstream_error',
  'context_length_exceeded',
  'internal_error',
  'cancelled',
]);

const normalizeFailedStepCode = (raw: unknown): FailedStepCode => {
  if (typeof raw !== 'string') return 'internal_error';
  if (KNOWN_FAILED_STEP_CODES.has(raw as FailedStepCode)) return raw as FailedStepCode;
  // Drift visible : un code non-vide non-listé = backend a déployé un nouveau
  // FailedStepCode avant qu'il ne soit ajouté ici. Le user verra "internal_error"
  // (toast générique) au lieu d'un toast actionnable. Logger en dev pour
  // signaler aux opérateurs qu'il faut sync KNOWN_FAILED_STEP_CODES + types.ts.
  if (raw.length > 0) {
    console.warn('[generate] unknown FailedStepCode coerced to internal_error', raw);
  }
  return 'internal_error';
};

// Parse le body d'une réponse !ok pour extraire un code FailedStepCode normalisé
// + un détail brut séparé. Le code reste typé (utilisable par pickAutoFailToast),
// le détail est uniquement loggé en console pour diagnostic — sans polluer le
// flux UI avec des blobs HTML 502 proxy.
const parseStepErrorDetail = async (
  res: Response,
  fallback: string,
): Promise<{ code: FailedStepCode; detail: string }> => {
  const raw = await res.text().catch(() => '');
  try {
    const errorCode = JSON.parse(raw)?.error;
    if (typeof errorCode === 'string' && errorCode.length > 0) {
      return { code: normalizeFailedStepCode(errorCode), detail: errorCode };
    }
  } catch {
    /* non-JSON body, fallback raw snippet */
  }
  return { code: 'internal_error', detail: raw.slice(0, 200) || fallback };
};

// Sous-helper extrait : si res.ok, register + toast success + return 'success'.
// Sinon parse le code d'erreur normalisé. Sépare la branche succès/échec du
// runAutoStep orchestrateur pour rester sous CCN 8.
const handleAutoStepResponse = async function (
  state: AppContext,
  type: string,
  res: Response,
): Promise<StepResult> {
  if (!res.ok) {
    const { code, detail } = await parseStepErrorDetail(res, res.statusText);
    console.error(`auto: ${type} failed (${res.status}):`, detail);
    // Threader le code FailedStepCode normalisé permet à showAutoResult de
    // dispatcher un toast actionnable (auth_required → settings,
    // quota_exceeded → wait, etc.) au lieu d'un générique 'partialGenerated'.
    return { kind: 'failed', code };
  }
  const gen = await res.json();
  registerGeneration(state, gen);
  // eventKey idempotent avec l'event SSE 'completed' (cf. helpers.ts
  // applyGenerationEvent) : dédup tab-locale du toast UI + persistance
  // notif via showToast → appendNotification (toast.ts). Le HTTP
  // devient un chemin de persistance complet quand SSE est down.
  state.showToast(
    state.t(NOTIF_GENERATION_DONE, { type: state.t(I18N_GEN_PREFIX + type) }),
    'success',
    null,
    { label: state.t(TOAST_VIEW), fn: () => state.goToView(type) },
    buildEventKey(gen.id, 'completed'),
  );
  return 'success';
};

export async function runAutoStep(
  state: AppContext,
  type: string,
  projectId: string,
  body: AutoBody,
  controller: AbortController,
  allowedUrls: string[],
): Promise<StepResult> {
  if (!AUTO_AGENTS_SET.has(type)) return { kind: 'failed', code: 'internal_error' };
  // eslint-disable-next-line sonarjs/no-duplicate-string -- required: SSRF taint analysis needs literal inline near fetch
  const url = '/api/projects/' + encodeURIComponent(projectId) + '/generate/' + type;
  try {
    // Shape exact `if (whitelist.includes(url)) { fetch(url, ...) }` reconnu
    // par Codacy `rule-node-ssrf` ; AUTO_AGENT_TYPES borne la liste finie de routes.
    if (allowedUrls.includes(url)) {
      const res = await fetch(url, withAiHeaders(postJson(body, controller.signal)));
      if (state.currentProjectId !== projectId) return 'aborted';
      return await handleAutoStepResponse(state, type, res);
    }
    return { kind: 'failed', code: 'internal_error' };
  } catch (e: unknown) {
    if (e instanceof Error && e.name === 'AbortError') return 'aborted';
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`auto: ${type} error:`, msg);
    return { kind: 'failed', code: 'internal_error' };
  } finally {
    state.loading[type] = false;
    delete state.abortControllers[type];
    void state.$nextTick(() => state.refreshIcons());
  }
}

export async function runAutoSteps(
  state: AppContext,
  plannedTypes: string[],
  projectId: string,
  body: AutoBody,
  controller: AbortController,
): Promise<{ failures: number; codes: FailedStepCode[] }> {
  const safeProjectId = encodeURIComponent(projectId);
  const allowedUrls = AUTO_AGENT_TYPES.map(
    (t) => '/api/projects/' + safeProjectId + '/generate/' + t,
  );
  let failures = 0;
  const codes: FailedStepCode[] = [];
  const promises = plannedTypes.map(async (type) => {
    const result = await runAutoStep(state, type, projectId, body, controller, allowedUrls);
    if (typeof result === 'object' && result.kind === 'failed') {
      failures++;
      codes.push(result.code);
    }
  });
  await Promise.all(promises);
  return { failures, codes };
}

// Sélection priorisée du toast partial-fail : un code actionnable utilisateur
// (auth_required > quota_exceeded) prime sur 'partial' générique. Évite de
// noyer un user "clé API absente" dans un toast warning sans piste d'action.
const pickAutoFailToast = (codes: FailedStepCode[]): { key: string; type: 'error' | 'warning' } => {
  const set = new Set(codes);
  if (set.has('auth_required')) return { key: 'toast.audioAuthRequired', type: 'error' };
  if (set.has('quota_exceeded')) return { key: 'toast.audioQuotaExceeded', type: 'warning' };
  return { key: TOAST_PARTIAL_GENERATED, type: 'warning' };
};

export function showAutoResult(
  state: AppContext,
  failures: number,
  plannedCount: number,
  codes: FailedStepCode[] = [],
): void {
  if (failures > 0 && failures < plannedCount) {
    const { key, type } = pickAutoFailToast(codes);
    if (key === TOAST_PARTIAL_GENERATED) {
      state.showToast(state.t(key, { count: plannedCount - failures }), type);
    } else {
      state.showToast(state.t(key), type);
    }
  } else if (failures >= plannedCount) {
    state.showToast(state.t(TOAST_GENERATION_ERROR), 'error');
  } else {
    state.showToast(state.t('toast.magicDone'), 'success', null, {
      label: state.t(TOAST_VIEW),
      fn: () => state.goToView('dashboard'),
    });
  }
}

// Échec d'une génération nommé par son type (« Quiz : … ») : les toasts identiques étant regroupés,
// deux types en échec restent deux toasts, chacun avec son « Réessayer ».
const typedErrorMessage = (state: AppContext, type: string, error: string): string => {
  return state.t(TOAST_TYPED_ERROR, { type: state.t(I18N_GEN_PREFIX + type), error });
};

// Réessai = même génération, surcharges comprises (version facile à lire : registre et sources
// de la fiche d'origine) ; aucun sur un refus de modération.
export function handleGenerateHttpError(
  state: AppContext,
  type: string,
  res: Response,
  err: { error?: string },
  extraBody?: GenerateExtraBody,
): void {
  const retry = err.error === MODERATION_BLOCKED ? null : () => state.generate(type, extraBody);
  const error = state.resolveError(err.error || res.statusText);
  state.showToast(typedErrorMessage(state, type, error), 'error', retry);
}

export function handleGenerateSuccess(state: AppContext, type: string, gen: Generation): void {
  registerGeneration(state, gen);
  // showToast avec eventKey idempotent : si l'event SSE 'completed' arrive en
  // premier (peu probable mais possible), le toast UI ne sera pas dupliqué et
  // la notif persistée n'aura qu'une seule entrée pour ce gid.
  state.showToast(
    state.t(NOTIF_GENERATION_DONE, { type: state.t(I18N_GEN_PREFIX + type) }),
    'success',
    null,
    { label: state.t(TOAST_VIEW), fn: () => state.goToView(type) },
    buildEventKey(gen.id, 'completed'),
    { messageKey: NOTIF_GENERATION_DONE, paramKeys: { type: I18N_GEN_PREFIX + type } },
  );
}

export function handleGenerateError(
  state: AppContext,
  type: string,
  e: unknown,
  extraBody?: GenerateExtraBody,
): void {
  if (e instanceof Error && e.name === 'AbortError') return;
  console.error('[generate]', type, e);
  const message = typedErrorMessage(state, type, state.t(TOAST_GENERATION_ERROR));
  state.showToast(message, 'error', () => state.generate(type, extraBody));
}

// Toast dispatché par code pour les partial-fails (action user vs warning vs partial générique),
// sinon success final. Pas de double toast (warning + success) sur partial — ambigu pour l'user.
const showVoiceToast = (state: AppContext, failed?: FailedSection[]): void => {
  if (!failed?.length) {
    state.showToast(state.t('toast.audioDone'), 'success');
    return;
  }
  const codes = new Set(failed.map((f) => f.code));
  if (codes.has('auth_required')) state.showToast(state.t('toast.audioAuthRequired'), 'error');
  else if (codes.has('quota_exceeded'))
    state.showToast(state.t('toast.audioQuotaExceeded'), 'warning');
  else state.showToast(state.t('toast.audioPartial'), 'warning');
};

export function applyVoiceResult(
  state: AppContext,
  gen: GenerationUI,
  result: VoiceResult,
  section?: string,
): void {
  if (result.audioUrls) {
    const audioUrls = result.audioUrls;
    const sectionOrder = state._audioSectionOrder;
    for (const [s, url] of Object.entries(audioUrls)) {
      gen[`_audioUrl_${s}`] = url;
    }
    gen._activeAudioSection = sectionOrder.find((s: string) => audioUrls[s]) || 'intro';
    gen._playlistMode = true;
  } else {
    gen[`_audioUrl_${section || 'all'}`] = result.audioUrl;
    gen._activeAudioSection = section || 'intro';
    gen._playlistMode = false;
  }
  if (result.costDelta) addCostDelta(state, result.costDelta, 'read-aloud');
  showVoiceToast(state, result.failedSections);
  void state.$nextTick(() => {
    const audioEl = document.querySelector(`audio[data-gen-id="${gen.id}"]`) as HTMLAudioElement;
    if (audioEl) {
      audioEl.load();
      audioEl.play().catch((e: unknown) => {
        const msg = e instanceof Error ? e.message : String(e);
        console.warn('Auto-play blocked:', msg);
      });
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers extraits des méthodes async generate*/runSingleGenerate de la
// factory createGenerate, pour rester sous CCN 8 par fonction (Lizard strict).
// ─────────────────────────────────────────────────────────────────────────────

type TrackedType =
  | 'summary'
  | 'flashcards'
  | 'quiz'
  | 'podcast'
  | 'quiz-vocal'
  | 'image'
  | 'fill-blank';

// Pending optimiste : mêmes sources que la génération envoyée (celles de la fiche pour la
// version facile à lire, sinon la sélection).
const setupGeneratePending = function (
  state: AppContext,
  type: string,
  gid: string,
  controller: AbortController,
  sourceIds?: readonly string[],
): void {
  state.loading[type] = true;
  state.abortControllers[type] = controller;
  state.abortControllersByGid[gid] = controller;
  state.pendingById[gid] = {
    id: gid,
    type: type as TrackedType,
    status: 'pending',
    startedAt: new Date().toISOString(),
    sourceIds: [...(sourceIds ?? state.selectedIds)],
  };
};

const dispatchGenerateResponse = async function (
  state: AppContext,
  type: string,
  gid: string,
  res: Response,
  extraBody?: GenerateExtraBody,
): Promise<void> {
  if (!res.ok) {
    // Validation early serveur (no_sources, context_too_large, moderation,
    // duplicate_gid, race cancel/fail = 409). Aucun event SSE ne nettoiera
    // le pending optimiste — cleanup local ici.
    delete state.pendingById[gid];
    const err: { error?: string } = await res.json().catch(() => ({}));
    handleGenerateHttpError(state, type, res, err, extraBody);
    return;
  }
  // Payload 200 fallback IDEMPOTENT avec SSE : si SSE down au moment du
  // retour, cette branche garantit le feedback. SSE rejouera mais
  // upsertGenerationById + showToast(eventKey) sont idempotents.
  delete state.pendingById[gid];
  handleGenerateSuccess(state, type, await res.json());
};

const cleanupGenerateState = function (
  state: AppContext,
  type: string,
  gid: string,
  projectId: string,
): void {
  // Guard projectId au cleanup pour ne pas effacer un nouveau pending si
  // l'utilisateur a switché de projet entre temps.
  if (state.currentProjectId === projectId) {
    // N en parallèle : ne libère le bouton/spinner que s'il ne reste AUCUN autre pending de ce type
    // (le pending courant est déjà retiré de pendingById ici).
    if (!pendingOfTypeExists(state.pendingById, type)) state.loading[type] = false;
    delete state.abortControllers[type];
    delete state.abortControllersByGid[gid];
  }
  void state.$nextTick(() => state.refreshIcons());
};

const fetchSingleGenerate = async function (
  projectId: string,
  type: string,
  body: AutoBody,
  gid: string,
  signal: AbortSignal,
): Promise<Response | null> {
  const safeProjectId = encodeURIComponent(projectId);
  // SINGLE_GENERATE_TYPES (= agents auto, dictée incluse) : chaque type a son
  // endpoint de génération unitaire /generate/<type> (cf. generation-types.ts).
  const allowedUrls = SINGLE_GENERATE_TYPES.map(
    (t) => '/api/projects/' + safeProjectId + '/generate/' + t,
  );
  const url = '/api/projects/' + safeProjectId + '/generate/' + type;
  // Shape exact `if (whitelist.includes(url)) { fetch(url, ...) }` reconnu
  // par Codacy `rule-node-ssrf` (même pattern que confirm.ts).
  if (allowedUrls.includes(url)) {
    return await fetch(url, withAiHeaders(postJson({ ...body, gid }, signal)));
  }
  return null;
};

const isSingleGenerateTargetSafe = function (projectId: string, type: string): boolean {
  return PROJECT_ID_SAFE.test(projectId) && SINGLE_GENERATE_SET.has(type);
};

const GENERATE_ALL_TYPES = ['summary', 'flashcards', 'quiz'] as const;

const setupGenerateAllPending = function (state: AppContext, controller: AbortController): void {
  for (const type of GENERATE_ALL_TYPES) {
    state.loading[type] = true;
    state.abortControllers[type] = controller;
  }
};

const cleanupGenerateAllPending = function (state: AppContext): void {
  for (const type of GENERATE_ALL_TYPES) {
    if (!pendingOfTypeExists(state.pendingById, type)) state.loading[type] = false;
    delete state.abortControllers[type];
  }
  void state.$nextTick(() => state.refreshIcons());
};

// Pré-contrôle (ensureGenerationAllowed) AVANT tout état de chargement. projectId lu ici, en accès
// direct à la propriété : pas de re-taint du flux d'URL pour Codacy `rule-node-ssrf`.
const runGenerateAll = async function (state: AppContext): Promise<void> {
  const projectId = state.currentProjectId;
  if (!projectId || !(await ensureGenerationAllowed(state))) return;
  const controller = new AbortController();
  setupGenerateAllPending(state, controller);
  try {
    const body = buildGenerateBody(state);
    const base = '/api/projects/' + projectId;
    const responses = await Promise.all([
      fetch(base + '/generate/summary', withAiHeaders(postJson(body, controller.signal))),
      fetch(base + '/generate/flashcards', withAiHeaders(postJson(body, controller.signal))),
      fetch(base + '/generate/quiz', withAiHeaders(postJson(body, controller.signal))),
    ]);
    if (state.currentProjectId !== projectId) return;
    const failures = await aggregateGenerateResults(responses, state);
    showGenerateAllResult(failures, responses.length, state);
  } catch (e: unknown) {
    if (e instanceof Error && e.name === 'AbortError') return;
    console.error('[generate:all]', e);
    state.showToast(state.t(TOAST_GENERATION_ERROR), 'error', () => state.generateAll());
  } finally {
    cleanupGenerateAllPending(state);
  }
};

const cleanupGenerateAutoPending = function (state: AppContext, plannedTypes: string[]): void {
  state.loading.auto = false;
  delete state.abortControllers.auto;
  // Les types individuels se nettoient dans leurs propres finally ; ceci
  // attrape les cas d'abort précoce avant que les promises démarrent.
  for (const type of plannedTypes) {
    if (!pendingOfTypeExists(state.pendingById, type)) state.loading[type] = false;
    delete state.abortControllers[type];
  }
  void state.$nextTick(() => state.refreshIcons());
};

// Sous-helper d'orchestration : route → plan → steps. Sépare la logique métier
// du try/catch/finally de runGenerateAuto pour rester sous CCN 8.
const orchestrateAutoSteps = async function (
  state: AppContext,
  projectId: string,
  controller: AbortController,
  plannedTypes: string[],
): Promise<void> {
  const body = buildGenerateBody(state);
  const route = await runAutoRoute(state, projectId, body, controller);
  if (!route) return;
  if (state.currentProjectId !== projectId) return;
  populateAutoPlan(state, route.plan, plannedTypes, controller);
  const { failures, codes } = await runAutoSteps(state, plannedTypes, projectId, body, controller);
  if (state.currentProjectId !== projectId) return;
  showAutoResult(state, failures, plannedTypes.length, codes);
};

// Pré-contrôle AVANT l'analyse de route et les étapes (ensureGenerationAllowed).
const runGenerateAuto = async function (state: AppContext): Promise<void> {
  const projectId = state.currentProjectId;
  if (!projectId || !(await ensureGenerationAllowed(state))) return;
  state.loading.auto = true;
  const controller = new AbortController();
  state.abortControllers.auto = controller;
  const plannedTypes: string[] = [];
  try {
    await orchestrateAutoSteps(state, projectId, controller, plannedTypes);
  } catch (e: unknown) {
    if (e instanceof Error && e.name === 'AbortError') return;
    console.error('[generate:auto]', e);
    state.showToast(state.t('toast.autoError'), 'error', () => state.generateAuto());
  } finally {
    cleanupGenerateAutoPending(state, plannedTypes);
  }
};

// Cible sûre, puis pré-contrôle de modération asynchrone (sources en attente ou en erreur
// vérifiées), AVANT le pending optimiste : un cancel pendant la vérification ne peut pas manquer
// sa cible.
const singleGenerateAllowed = async function (
  state: AppContext,
  projectId: string,
  type: string,
  sourceIds?: readonly string[],
): Promise<boolean> {
  if (!isSingleGenerateTargetSafe(projectId, type)) return false;
  return ensureGenerationAllowed(state, sourceIds);
};

// Anti-flood (MAX_PARALLEL_PER_TYPE, pending-utils.ts) : pendings du type dans le projet (cet
// onglet, autres onglets et appareils via SSE) + lancements déjà réservés. La réservation est prise
// AVANT le pré-contrôle de modération, qui attend jusqu'à 8 s avant le pending optimiste : sans
// elle, tous les appuis d'une rafale passeraient avant que le premier pending existe.
const reserveLaunch = function (state: AppContext, type: string): boolean {
  const reserved = state.launchingByType[type] ?? 0;
  if (countPendingOfType(state.pendingById, type) + reserved >= MAX_PARALLEL_PER_TYPE) {
    const params = { type: state.t(I18N_GEN_PREFIX + type), count: MAX_PARALLEL_PER_TYPE };
    state.showToast(state.t(TOAST_GENERATION_BUSY, params), 'info');
    return false;
  }
  state.launchingByType[type] = reserved + 1;
  return true;
};

// Tolère la remise à zéro de resetSession pendant l'attente : jamais de compteur négatif.
const releaseLaunch = function (state: AppContext, type: string): void {
  const left = (state.launchingByType[type] ?? 1) - 1;
  if (left > 0) state.launchingByType[type] = left;
  else delete state.launchingByType[type];
};

// Rend true en GARDANT la réservation : l'appelant la rend juste avant de créer son pending
// optimiste, dans le même bloc synchrone (aucun appui ne peut s'intercaler entre les deux).
// Refus ou exception : réservation rendue ici.
const acquireSingleLaunch = async function (
  state: AppContext,
  projectId: string,
  type: string,
  sourceIds?: readonly string[],
): Promise<boolean> {
  if (!reserveLaunch(state, type)) return false;
  let allowed = false;
  try {
    allowed = await singleGenerateAllowed(state, projectId, type, sourceIds);
  } finally {
    if (!allowed) releaseLaunch(state, type);
  }
  return allowed;
};

const runSingleGenerate = async function (
  state: AppContext,
  type: string,
  extraBody?: GenerateExtraBody,
): Promise<void> {
  // Sources de la fiche d'origine pour la version facile à lire : c'est sur elles que portent le
  // pré-contrôle de modération et le pending, comme la garde serveur (body.sourceIds).
  const sourceIds = extraBody?.sourceIds;
  const projectId = state.currentProjectId;
  if (!projectId || !(await acquireSingleLaunch(state, projectId, type, sourceIds))) return;
  // Le pending optimiste prend le relais de la réservation anti-flood, sans intervalle.
  releaseLaunch(state, type);
  // gid généré côté client = identifiant stable utilisable IMMÉDIATEMENT par
  // pendingById, abortControllersByGid et l'eventKey de la notif fallback.
  const gid = crypto.randomUUID();
  const controller = new AbortController();
  setupGeneratePending(state, type, gid, controller, sourceIds);
  try {
    const res = await fetchSingleGenerate(
      projectId,
      type,
      // extraBody surcharge le body standard (ex: register/sourceIds pour la
      // version FALC d'une fiche existante) sans dupliquer le lifecycle.
      { ...buildGenerateBody(state), ...extraBody },
      gid,
      controller.signal,
    );
    if (!res) return;
    if (state.currentProjectId !== projectId) return;
    await dispatchGenerateResponse(state, type, gid, res, extraBody);
  } catch (e: unknown) {
    if (state.currentProjectId !== projectId) return;
    delete state.pendingById[gid];
    handleGenerateError(state, type, e, extraBody);
  } finally {
    cleanupGenerateState(state, type, gid, projectId);
  }
};

export function createGenerate() {
  return {
    // Même priorité que le serveur (unsafe > error > pending, helper partagé) : sinon « Modération
    // en cours » masquerait une source déjà signalée. Statut EFFECTIF, avec les catégories
    // bloquées du profil courant : un `safe` qui signale une catégorie bloquée compte `unsafe`.
    // `sourceIds` (version facile à lire) : sources visées explicitement, sinon la sélection.
    blockedModerationSource(this: AppContext, sourceIds?: readonly string[]) {
      const sources = generationSources(this, sourceIds);
      return pickBlockingSource(sources, currentBlockedCategories(this)) ?? null;
    },

    // Statut effectif de la source bloquante : relire son `moderation.status` rendrait `safe` pour
    // une source promue (cf. blockingModerationStatus).
    blockedModerationStatus(this: AppContext, sourceIds?: readonly string[]): string | null {
      const blocked = currentBlockedCategories(this);
      return blockingModerationStatus(generationSources(this, sourceIds), blocked) ?? null;
    },

    moderationBlockedMessage(
      this: AppContext,
      status: string | null,
      sourceIds?: readonly string[],
    ): string {
      if (status === 'pending') return this.t('moderation.pending');
      if (status === 'error') return this.t('moderation.error');
      const src = this.blockedModerationSource(sourceIds);
      const cats = src ? this.flaggedCategoryLabels(src) : '';
      return this.t(MODERATION_BLOCKED) + (cats ? ` (${cats})` : '');
    },

    async generate(this: AppContext, type: string, extraBody?: GenerateExtraBody) {
      await runSingleGenerate(this, type, extraBody);
    },

    // « Version très facile à lire » : régénère la MÊME fiche (mêmes sources)
    // en registre falc. Nouvelle génération standard (gid/pending/SSE/coût) —
    // pas de mutation in-place. Si la fiche d'origine porte une langue (pas le
    // cas des summaries aujourd'hui), elle prime sur la langue UI courante.
    // Fiche legacy sans `sourceIds` : [] (toutes les sources), pour que le pré-contrôle vise les
    // mêmes sources que le serveur au lieu de retomber sur la sélection.
    async generateSimplified(this: AppContext, gen: Generation) {
      const extraBody: GenerateExtraBody = {
        sourceIds: (gen.sourceIds as string[] | undefined) ?? [],
        register: 'falc',
      };
      const lang = (gen as { lang?: string }).lang;
      if (lang) extraBody.lang = lang;
      await runSingleGenerate(this, 'summary', extraBody);
    },

    async generateAll(this: AppContext) {
      await runGenerateAll(this);
    },

    async generateAuto(this: AppContext) {
      await runGenerateAuto(this);
    },

    _audioSectionOrder: ['intro', 'key_points', 'fun_fact', 'vocabulary'],

    isBatchComplete(gen: GenerationUI): boolean {
      if (!gen._audioUrl_intro || !gen._audioUrl_key_points) return false;
      const d = gen.data as { fun_fact?: string; vocabulary?: unknown[] } | undefined;
      if (d?.fun_fact && !gen._audioUrl_fun_fact) return false;
      if (d?.vocabulary?.length && !gen._audioUrl_vocabulary) return false;
      return true;
    },

    playNextSection(this: AppContext, gen: GenerationUI) {
      if (!gen._playlistMode) return;
      const order = this._audioSectionOrder;
      const idx = order.indexOf(gen._activeAudioSection ?? 'intro');
      for (let i = idx + 1; i < order.length; i++) {
        if (gen[`_audioUrl_${order[i]}`]) {
          gen._activeAudioSection = order[i];
          void this.$nextTick(() => {
            const a = document.querySelector(`audio[data-gen-id="${gen.id}"]`) as HTMLAudioElement;
            if (a) {
              a.load();
              a.play().catch((e: unknown) => {
                const msg = e instanceof Error ? e.message : String(e);
                console.warn('Audio play failed:', msg);
              });
            }
          });
          return;
        }
      }
      gen._playlistMode = false;
    },

    initSummaryAudio(gen: GenerationUI) {
      const d = gen.data as { audioUrls?: Record<string, string>; audioUrl?: string } | undefined;
      if (!d) return;
      if (d.audioUrls) {
        for (const [s, url] of Object.entries(d.audioUrls)) {
          gen[`_audioUrl_${s}`] = url;
        }
        gen._activeAudioSection = Object.keys(d.audioUrls)[0];
      } else if (d.audioUrl) {
        gen._audioUrl_intro = d.audioUrl;
        gen._activeAudioSection = 'intro';
      }
    },

    playSection(this: AppContext, gen: GenerationUI, section: string | null) {
      if (section && gen[`_audioUrl_${section}`]) {
        gen._playlistMode = false;
        gen._activeAudioSection = section;
      } else if (!section && this.isBatchComplete(gen)) {
        gen._playlistMode = true;
        gen._activeAudioSection =
          this._audioSectionOrder.find((s: string) => gen[`_audioUrl_${s}`]) || 'intro';
      } else {
        void this.generateVoice(gen, section || undefined);
        return;
      }
      void this.$nextTick(() => {
        const a = document.querySelector(`audio[data-gen-id="${gen.id}"]`) as HTMLAudioElement;
        if (a) {
          a.load();
          a.play().catch((e: unknown) => {
            const msg = e instanceof Error ? e.message : String(e);
            console.warn('Audio play failed:', msg);
          });
        }
      });
    },

    async generateVoice(this: AppContext, gen: GenerationUI, section?: string) {
      const key = section || 'all';
      const busyKey = `_generatingVoice_${key}`;
      if (gen[busyKey]) return;
      gen[busyKey] = true;
      try {
        const body: Record<string, unknown> = { lang: getLocale() };
        if (section) body.section = section;
        const res = await fetch(
          this.apiBase() + '/generations/' + gen.id + '/read-aloud',
          withAiHeaders({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          }),
        );
        if (res.ok) {
          applyVoiceResult(this, gen, await res.json(), section);
        } else {
          // Code stable traduit (rate_limited, auth_required, tts_upstream_error…), jamais brut.
          const err = await res.json().catch(() => ({}));
          const error = this.resolveError(err.error || res.statusText);
          this.showToast(this.t(TOAST_ERROR, { error }), 'error', () =>
            this.generateVoice(gen, section),
          );
        }
      } catch (e) {
        console.error('Voice generation error:', e);
        this.showToast(this.t('toast.audioError'), 'error', () => this.generateVoice(gen, section));
      } finally {
        gen[busyKey] = false;
      }
    },
  };
}
