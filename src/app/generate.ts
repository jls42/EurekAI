import { getLocale } from '../i18n/index';
import { normalizeSummaryData } from './helpers';
import { pendingOfTypeExists } from './pending-utils';
import { addCostDelta } from './cost-utils';
import { withAiHeaders } from './ai-fetch';
import { AUTO_AGENTS_SET, AUTO_AGENT_TYPES } from '../../generators/auto-agents';
import { SINGLE_GENERATE_SET, SINGLE_GENERATE_TYPES } from '../../generators/generation-types';
import type { AppContext } from './app-context';
import type { FailedStepCode, Generation, Source } from '../../types';
import { buildEventKey } from '../../helpers/event-key';

const TOAST_GENERATION_ERROR = 'toast.generationError';
const TOAST_ERROR = 'toast.error';
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

export async function aggregateGenerateResults(
  responses: Response[],
  state: AppContext,
): Promise<number> {
  let failures = 0;
  for (const r of responses) {
    if (r.ok) {
      registerGeneration(state, await r.json());
    } else {
      failures++;
      const err = await r.json().catch(() => ({}));
      console.error(`generateAll failed (${r.status}):`, err.error || r.statusText);
    }
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
  const ttsTypes = new Set(['podcast', 'quiz-vocal']);
  state.loading.auto = false;
  delete state.abortControllers.auto;
  for (const step of plan) {
    if (ttsTypes.has(step.agent) && !state.ttsReady()) continue;
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
    state.$nextTick(() => state.refreshIcons());
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

export function handleGenerateHttpError(
  state: AppContext,
  type: string,
  res: Response,
  err: { error?: string },
): void {
  state.showToast(
    state.t(TOAST_ERROR, { error: state.resolveError(err.error || res.statusText) }),
    'error',
    () => state.generate(type),
  );
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

/** Pre-flight check for generate / generateAll / generateAuto. Returns false
 * (with optional moderation toast) when the action cannot proceed. Caller
 * reads `this.currentProjectId` directly afterwards — keeping the projectId
 * source as a literal property access avoids re-tainting the URL flow for
 * Codacy `rule-node-ssrf`. */
export function canStartGenerate(state: AppContext): boolean {
  if (!state.currentProjectId) return false;
  // Plus de verrou `loading[type]` : N générations du même type en parallèle sont autorisées —
  // re-cliquer le bouton lance une génération de plus (un pending de plus, annulable
  // individuellement). Un double-clic produit donc 2 générations, comportement voulu par la feature.
  const moderationStatus = state.blockedModerationStatus();
  if (state.currentProfile?.useModeration && moderationStatus) {
    state.showToast(state.moderationBlockedMessage(moderationStatus), 'error');
    return false;
  }
  return true;
}

export function handleGenerateError(state: AppContext, type: string, e: unknown): void {
  if (e instanceof Error && e.name === 'AbortError') return;
  console.error('[generate]', type, e);
  state.showToast(state.t(TOAST_GENERATION_ERROR), 'error', () => state.generate(type));
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
  state.$nextTick(() => {
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

const setupGeneratePending = function (
  state: AppContext,
  type: string,
  gid: string,
  controller: AbortController,
): void {
  state.loading[type] = true;
  state.abortControllers[type] = controller;
  state.abortControllersByGid[gid] = controller;
  state.pendingById[gid] = {
    id: gid,
    type: type as TrackedType,
    status: 'pending',
    startedAt: new Date().toISOString(),
    sourceIds: [...state.selectedIds],
  };
};

const dispatchGenerateResponse = async function (
  state: AppContext,
  type: string,
  gid: string,
  res: Response,
): Promise<void> {
  if (!res.ok) {
    // Validation early serveur (no_sources, context_too_large, moderation,
    // duplicate_gid, race cancel/fail = 409). Aucun event SSE ne nettoiera
    // le pending optimiste — cleanup local ici.
    delete state.pendingById[gid];
    handleGenerateHttpError(state, type, res, await res.json().catch(() => ({})));
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
  state.$nextTick(() => state.refreshIcons());
};

const fetchSingleGenerate = async function (
  projectId: string,
  type: string,
  body: AutoBody,
  gid: string,
  signal: AbortSignal,
): Promise<Response | null> {
  const safeProjectId = encodeURIComponent(projectId);
  // SINGLE_GENERATE_TYPES (superset des agents auto + dictée) : la dictée est
  // générable par bouton mais reste hors de l'auto-router (cf. generation-types.ts).
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
  state.$nextTick(() => state.refreshIcons());
};

const runGenerateAll = async function (state: AppContext): Promise<void> {
  if (!canStartGenerate(state)) return;
  const projectId = state.currentProjectId;
  if (!projectId) return;
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
  state.$nextTick(() => state.refreshIcons());
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

const runGenerateAuto = async function (state: AppContext): Promise<void> {
  if (!canStartGenerate(state)) return;
  const projectId = state.currentProjectId;
  if (!projectId) return;
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

const runSingleGenerate = async function (
  state: AppContext,
  type: string,
  extraBody?: Record<string, unknown>,
): Promise<void> {
  if (!canStartGenerate(state)) return;
  const projectId = state.currentProjectId;
  if (!projectId) return;
  if (!isSingleGenerateTargetSafe(projectId, type)) return;
  // gid généré côté client = identifiant stable utilisable IMMÉDIATEMENT par
  // pendingById, abortControllersByGid et l'eventKey de la notif fallback.
  const gid = crypto.randomUUID();
  const controller = new AbortController();
  setupGeneratePending(state, type, gid, controller);
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
    await dispatchGenerateResponse(state, type, gid, res);
  } catch (e: unknown) {
    if (state.currentProjectId !== projectId) return;
    delete state.pendingById[gid];
    handleGenerateError(state, type, e);
  } finally {
    cleanupGenerateState(state, type, gid, projectId);
  }
};

export function createGenerate() {
  return {
    blockedModerationSource(this: AppContext) {
      const selected =
        this.selectedIds.length > 0
          ? this.sources.filter((s: Source) => this.selectedIds.includes(s.id))
          : this.sources;
      return selected.find((s: Source) => s.moderation && s.moderation.status !== 'safe') ?? null;
    },

    blockedModerationStatus(this: AppContext): string | null {
      return this.blockedModerationSource()?.moderation?.status ?? null;
    },

    moderationBlockedMessage(this: AppContext, status: string | null): string {
      if (status === 'pending') return this.t('moderation.pending');
      if (status === 'error') return this.t('moderation.error');
      const src = this.blockedModerationSource();
      const cats = src ? this.flaggedCategoryLabels(src) : '';
      return this.t('moderation.blocked') + (cats ? ` (${cats})` : '');
    },

    async generate(this: AppContext, type: string, extraBody?: Record<string, unknown>) {
      await runSingleGenerate(this, type, extraBody);
    },

    // « Version très facile à lire » : régénère la MÊME fiche (mêmes sources)
    // en registre falc. Nouvelle génération standard (gid/pending/SSE/coût) —
    // pas de mutation in-place. Si la fiche d'origine porte une langue (pas le
    // cas des summaries aujourd'hui), elle prime sur la langue UI courante.
    async generateSimplified(this: AppContext, gen: Generation) {
      const extraBody: Record<string, unknown> = {
        sourceIds: gen.sourceIds,
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
          this.$nextTick(() => {
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
        this.generateVoice(gen, section || undefined);
        return;
      }
      this.$nextTick(() => {
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
          const err = await res.json().catch(() => ({}));
          this.showToast(this.t(TOAST_ERROR, { error: err.error || res.statusText }), 'error', () =>
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
