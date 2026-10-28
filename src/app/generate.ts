import { getLocale } from '../i18n/index';
import { normalizeSummaryData } from './helpers';
import { countPendingOfType, MAX_PARALLEL_PER_TYPE, pendingOfTypeExists } from './pending-utils';
import { addCostDelta } from './cost-utils';
import { captureAiKey, withAiHeaders } from './ai-fetch';
import { forgetAutoRun, isLaunchCancelled } from './auto-runs';
import { beginAutoLaunch, launchAutoLot, resumeAutoLot, type AutoLaunch } from './auto-launch';
import { withLongRequestSlot } from './request-slots';
import { endSingleRun, registerSingleRun } from './single-runs';
import { SINGLE_GENERATE_SET, SINGLE_GENERATE_TYPES } from '../../generators/generation-types';
import type { AppContext, GenerateExtraBody } from './app-context';
import type { Generation } from '../../types';
import { buildEventKey } from '../../helpers/event-key';
import { blockingModerationStatus, pickBlockingSource } from '@helpers/moderation-http';
import { currentBlockedCategories } from './effective-moderation';
import {
  checkGenerationAllowed,
  ensureGenerationAllowed,
  generationSources,
  type GenerationCheck,
  PROJECT_ID_SAFE,
} from './moderation-gate';

const TOAST_GENERATION_ERROR = 'toast.generationError';
// Refus de modération (contenu signalé) : réessayer produirait le même refus, pas de bouton.
const MODERATION_BLOCKED = 'moderation.blocked';
const TOAST_ERROR = 'toast.error';
const TOAST_TYPED_ERROR = 'toast.typedError';
const TOAST_GENERATION_BUSY = 'toast.generationBusy';
const TOAST_VIEW = 'toast.view';
const TOAST_PARTIAL_GENERATED = 'toast.partialGenerated';
// Bilan partiel d'un Auto : « {count} sur {total} ». `toast.partialGenerated` (« {count}/3 ») est
// réservé à « Tout générer » (3 types) ; l'Auto l'affichait « 7/3 générations réussies »
// (release-test du 2026-10-24).
const TOAST_AUTO_FAILED_IN = 'toast.autoFailedIn';
const I18N_GEN_PREFIX = 'gen.';
const NOTIF_GENERATION_DONE = 'toast.generationDone';

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

export function postJson(body: unknown, signal?: AbortSignal): RequestInit {
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
  // le même onglet absorbés sans doublon) ; coût compté une fois, à l'insertion
  // (l'événement SSE, souvent reçu avant la réponse, le compte déjà).
  state.openGens[gen.id] = true;
  if (state.upsertGenerationById(gen)) {
    addCostDelta(state, gen.estimatedCost, `generate/${gen.type}`);
  }
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

// Corps d'une génération, lu AU CLIC (avant le pré-contrôle de modération) : la sélection est
// copiée, une case cochée ou un cours changé pendant l'attente ne modifie plus la demande.
export function buildGenerateBody(state: AppContext): AutoBody {
  return {
    sourceIds: state.selectedIds.length > 0 ? [...state.selectedIds] : undefined,
    lang: getLocale(),
    ageGroup: state.currentProfile?.ageGroup || 'enfant',
    useConsigne: state.useConsigne,
    count: state.generateCount,
  };
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
  'summary' | 'flashcards' | 'quiz' | 'podcast' | 'quiz-vocal' | 'image' | 'fill-blank';

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

// Génération lancée : cours, type, corps (sélection, consigne, nombre, langue, âge, surcharges de la
// version facile à lire) et clé capturés AU CLIC, avant le pré-contrôle de modération (jusqu'à
// 10 s) : un changement de cours pendant l'attente n'abandonne plus la génération.
type SingleLaunch = {
  projectId: string;
  type: string;
  body: AutoBody & GenerateExtraBody;
  // Sources du pending optimiste : celles de la fiche d'origine (version facile à lire), sinon la
  // sélection au clic.
  pendingSourceIds: string[];
  extraBody?: GenerateExtraBody;
  key: string;
  // Pour le toast d'une génération finie pendant qu'un autre cours est affiché.
  projectName: string;
  profileId: string | null;
};

const captureSingleLaunch = (
  state: AppContext,
  projectId: string,
  type: string,
  extraBody?: GenerateExtraBody,
): SingleLaunch => {
  return {
    projectId,
    type,
    // extraBody surcharge le body standard (ex: register/sourceIds pour la version FALC d'une
    // fiche existante) sans dupliquer le lifecycle.
    body: { ...buildGenerateBody(state), ...extraBody },
    pendingSourceIds: [...(extraBody?.sourceIds ?? state.selectedIds)],
    projectName: state.currentProject?.meta.name ?? '',
    profileId: state.currentProfile?.id ?? null,
    extraBody,
    key: captureAiKey(),
  };
};

const fetchSingleGenerate = async function (
  launch: SingleLaunch,
  gid: string,
  signal?: AbortSignal,
): Promise<Response | null> {
  const safeProjectId = encodeURIComponent(launch.projectId);
  // SINGLE_GENERATE_TYPES (= agents auto, dictée incluse) : chaque type a son
  // endpoint de génération unitaire /generate/<type> (cf. generation-types.ts).
  const allowedUrls = SINGLE_GENERATE_TYPES.map(
    // eslint-disable-next-line sonarjs/no-duplicate-string -- required: SSRF taint analysis needs literal inline near fetch
    (t) => '/api/projects/' + safeProjectId + '/generate/' + t,
  );
  const url = '/api/projects/' + safeProjectId + '/generate/' + launch.type;
  // Shape exact `if (whitelist.includes(url)) { fetch(url, ...) }` reconnu
  // par Codacy `rule-node-ssrf` (même pattern que confirm.ts).
  if (allowedUrls.includes(url)) {
    const init = postJson({ ...launch.body, gid }, signal);
    return await fetch(url, withAiHeaders(init, { keyOverride: launch.key }));
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

// Lot Auto lancé sur le serveur (auto-launch.ts, auto-runs.ts) : cours, nom, corps et clé capturés
// AU CLIC, runId choisi ici. Le lot est inscrit tout de suite : un second clic pendant le
// pré-contrôle est sans effet, comme sur un cours dont le lot tourne déjà (autre onglet compris :
// le serveur répond 409 et l'onglet le rejoint).
const captureAutoLaunch = (state: AppContext, projectId: string): AutoLaunch => {
  return {
    projectId,
    projectName: state.currentProject?.meta.name ?? '',
    runId: crypto.randomUUID(),
    body: buildGenerateBody(state),
    key: captureAiKey(),
  };
};

const reportAutoException = (state: AppContext, launch: AutoLaunch, e: unknown): void => {
  console.error('[generate:auto]', e);
  if (state.currentProjectId === launch.projectId) {
    const retry = launch.retry ?? (() => state.generateAuto());
    state.showToast(state.t('toast.autoError'), 'error', retry);
  } else {
    state.showToast(state.t(TOAST_AUTO_FAILED_IN, { project: launch.projectName }), 'error');
  }
};

// Pré-contrôle (checkGenerationAllowed) AVANT le lancement : cours changé pendant la vérification →
// le lot part quand même vers son cours (le serveur refait la garde). Annulé pendant la
// vérification (« Tout annuler ») : rien ne part.
const runGenerateAuto = async function (state: AppContext): Promise<void> {
  const projectId = state.currentProjectId;
  if (!projectId || state.autoRuns[projectId]) return;
  const launch = captureAutoLaunch(state, projectId);
  beginAutoLaunch(state, launch);
  try {
    const outcome = await checkGenerationAllowed(state);
    if (outcome === 'refused' || isLaunchCancelled(state, projectId)) {
      forgetAutoRun(state, projectId);
      return;
    }
    await launchAutoLot(state, launch);
  } catch (e: unknown) {
    forgetAutoRun(state, projectId);
    reportAutoException(state, launch, e);
  }
};

// « Reprendre » un lot interrompu (bilan, auto-runs.ts) : clé capturée au clic, lot inscrit tout de
// suite comme un lancement (sans pré-contrôle : le serveur refait les gardes). Sans effet si un lot
// est déjà suivi sur ce cours ; « Réessayer » refait la même reprise.
const runResumeAuto = async function (
  state: AppContext,
  projectId: string,
  runId: string,
  projectName: string,
): Promise<void> {
  if (state.autoRuns[projectId]) return;
  const retry = () => {
    void state.resumeAuto(projectId, runId, projectName);
  };
  const launch: AutoLaunch = {
    projectId,
    projectName,
    runId,
    body: {},
    key: captureAiKey(),
    retry,
  };
  beginAutoLaunch(state, launch);
  try {
    await resumeAutoLot(state, launch);
  } catch (e: unknown) {
    forgetAutoRun(state, projectId);
    reportAutoException(state, launch, e);
  }
};

// Cible sûre, puis pré-contrôle de modération asynchrone (sources en attente ou en erreur
// vérifiées), AVANT le pending optimiste : un cancel pendant la vérification ne peut pas manquer
// sa cible.
const singleGenerateCheck = async function (
  state: AppContext,
  launch: SingleLaunch,
): Promise<GenerationCheck> {
  if (!isSingleGenerateTargetSafe(launch.projectId, launch.type)) return 'refused';
  return checkGenerationAllowed(state, launch.extraBody?.sourceIds);
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

// Rend `allowed` ou `moved` en GARDANT la réservation : l'appelant la rend juste avant de créer son
// pending optimiste, dans le même bloc synchrone (aucun appui ne peut s'intercaler entre les deux).
// Refus ou exception : réservation rendue ici.
const acquireSingleLaunch = async function (
  state: AppContext,
  launch: SingleLaunch,
): Promise<GenerationCheck> {
  if (!reserveLaunch(state, launch.type)) return 'refused';
  let outcome: GenerationCheck = 'refused';
  try {
    outcome = await singleGenerateCheck(state, launch);
  } finally {
    if (outcome === 'refused') releaseLaunch(state, launch.type);
  }
  return outcome;
};

// Cours changé pendant le pré-contrôle, ou pendant l'attente d'une place : la génération part quand
// même vers son cours, à son tour parmi les requêtes longues de l'onglet (request-slots.ts), sans
// rien poser sur l'écran affiché (pending, chargement, toast) ; le serveur refait la garde de
// modération et enregistre le résultat, visible au retour sur le cours. Jusqu'en v1.7.11 : perdue
// sans un mot. Gère ses erreurs : lançable sans l'attendre (`void`).
// Génération simple terminée pendant qu'un autre cours est affiché : un toast nomme son cours, comme
// l'Auto et l'import en arrière-plan (jusqu'au 2026-10-24 : rien). Sans eventKey : avec une clé,
// showToast enregistrerait la notification sous le cours AFFICHÉ, et la réconciliation du retour
// (backfillCompletedNotifs) serait dédoublonnée sous ce mauvais cours. Rien si l'on est revenu sur
// le cours (le SSE prend le relais), si le profil a changé, ni après une annulation (autre onglet).
const notifySingleElsewhere = async (
  state: AppContext,
  launch: SingleLaunch,
  res: Response,
): Promise<void> => {
  if (state.currentProjectId === launch.projectId) return;
  if ((state.currentProfile?.id ?? null) !== launch.profileId) return;
  const params = { type: state.t(I18N_GEN_PREFIX + launch.type), project: launch.projectName };
  if (res.ok) {
    state.showToast(state.t('toast.generationDoneIn', params), 'success');
    return;
  }
  const err = (await res.json().catch(() => ({}))) as { error?: string };
  if (err.error === 'cancelled') return;
  const error = state.resolveError(err.error || res.statusText);
  state.showToast(state.t('toast.generationFailedIn', { ...params, error }), 'error');
};

const sendGenerateInBackground = async function (
  state: AppContext,
  launch: SingleLaunch,
): Promise<void> {
  try {
    const res = await withLongRequestSlot(() => fetchSingleGenerate(launch, crypto.randomUUID()));
    if (res) await notifySingleElsewhere(state, launch, res);
  } catch (e: unknown) {
    console.warn('[generate] envoi vers un cours quitté impossible', launch.type, e);
  }
};

// Génération affichée par son pending. gid généré côté client = identifiant stable utilisable
// IMMÉDIATEMENT par pendingById, abortControllersByGid et l'eventKey de la notif fallback. `sent` :
// la requête est partie (le serveur la terminera même si son fetch est aborté ensuite).
type SingleFlight = { gid: string; controller: AbortController; sent: boolean };

// Envoi une fois la place obtenue. Partie, la requête continue si l'on change de cours (inscrite
// dans singleRuns, épargnée par resetSession) : sa réponse s'applique au cours s'il est affiché,
// sinon un toast nomme ce cours.
const requestWithPending = async (
  state: AppContext,
  launch: SingleLaunch,
  flight: SingleFlight,
): Promise<void> => {
  flight.sent = true;
  registerSingleRun(state, flight.gid, launch.projectId, flight.controller);
  try {
    const res = await fetchSingleGenerate(launch, flight.gid, flight.controller.signal);
    if (!res) return;
    if (state.currentProjectId !== launch.projectId) {
      await notifySingleElsewhere(state, launch, res);
      return;
    }
    await dispatchGenerateResponse(state, launch.type, flight.gid, res, launch.extraBody);
  } finally {
    endSingleRun(state, flight.gid);
  }
};

// Génération sur le cours affiché : pending optimiste (puce annulable) dès le clic, envoi quand une
// place se libère parmi les requêtes longues de l'onglet ; partie, elle continue même si l'on change
// de cours (single-runs.ts), et sa réponse nomme le cours s'il n'est plus affiché. Pendant l'attente :
// annulée par sa puce ou « Tout annuler » (cours affiché), rien n'est envoyé et la file avance ;
// cours ou profil quitté (resetSession aborte aussi son contrôleur ; selectProject, selectProfile et
// deleteProject changent le cours affiché dans le même bloc synchrone, et ce catch s'exécute après),
// jamais partie, elle repart en arrière-plan.
const sendGenerateWithPending = async function (
  state: AppContext,
  launch: SingleLaunch,
): Promise<void> {
  const { projectId, type, extraBody } = launch;
  const flight: SingleFlight = {
    gid: crypto.randomUUID(),
    controller: new AbortController(),
    sent: false,
  };
  setupGeneratePending(state, type, flight.gid, flight.controller, launch.pendingSourceIds);
  try {
    const request = () => requestWithPending(state, launch, flight);
    await withLongRequestSlot(request, flight.controller.signal);
  } catch (e: unknown) {
    if (state.currentProjectId !== projectId) {
      if (!flight.sent) void sendGenerateInBackground(state, launch);
      return;
    }
    delete state.pendingById[flight.gid];
    handleGenerateError(state, type, e, extraBody);
  } finally {
    cleanupGenerateState(state, type, flight.gid, projectId);
  }
};

const runSingleGenerate = async function (
  state: AppContext,
  type: string,
  extraBody?: GenerateExtraBody,
): Promise<void> {
  const projectId = state.currentProjectId;
  if (!projectId) return;
  // Sources de la fiche d'origine pour la version facile à lire : c'est sur elles que portent le
  // pré-contrôle de modération et le pending, comme la garde serveur (body.sourceIds).
  const launch = captureSingleLaunch(state, projectId, type, extraBody);
  const outcome = await acquireSingleLaunch(state, launch);
  if (outcome === 'refused') return;
  // Le pending optimiste prend le relais de la réservation anti-flood, sans intervalle.
  releaseLaunch(state, type);
  if (outcome === 'moved') await sendGenerateInBackground(state, launch);
  else await sendGenerateWithPending(state, launch);
};

// Lectures à voix haute en cours, par cours, génération et section : un retour sur le cours (objet
// génération neuf, relu du serveur) ne relance pas une lecture déjà demandée (TTS facturé deux fois).
const readAloudInFlight = new Set<string>();

type ReadAloudFlight = { projectId: string | null; busyKey: string; id: string };

const readAloudFlight = (state: AppContext, gen: GenerationUI, key = 'all'): ReadAloudFlight => {
  const projectId = state.currentProjectId;
  return { projectId, busyKey: `_generatingVoice_${key}`, id: `${projectId}:${gen.id}:${key}` };
};

// Génération à mettre à jour à la réponse : celle du cours affiché qui porte cet id (objet neuf
// après un retour sur le cours), null si ce cours n'est plus affiché. L'audio est de toute façon
// enregistré dans la génération côté serveur (relu à l'ouverture du cours).
const readAloudTarget = (
  state: AppContext,
  gen: GenerationUI,
  flight: ReadAloudFlight,
): GenerationUI | null => {
  if (state.currentProjectId !== flight.projectId) return null;
  const current = state.generations.find((g) => g.id === gen.id) as GenerationUI | undefined;
  return current ?? gen;
};

// Réponse appliquée au cours affiché seulement : audio, coût, toast (jamais sur l'écran d'un autre
// cours). Code d'un refus traduit (rate_limited, auth_required, tts_upstream_error…), jamais brut.
const handleReadAloudResponse = async function (
  state: AppContext,
  gen: GenerationUI,
  flight: ReadAloudFlight,
  res: Response,
  section?: string,
): Promise<void> {
  if (res.ok) {
    const result: unknown = await res.json();
    const target = readAloudTarget(state, gen, flight);
    if (target) applyVoiceResult(state, target, result as VoiceResult, section);
    return;
  }
  const err: { error?: string } = await res.json().catch(() => ({}));
  const target = readAloudTarget(state, gen, flight);
  if (!target) return;
  const error = state.resolveError(err.error || res.statusText);
  state.showToast(state.t(TOAST_ERROR, { error }), 'error', () =>
    state.generateVoice(target, section),
  );
};

const reportReadAloudException = (
  state: AppContext,
  gen: GenerationUI,
  flight: ReadAloudFlight,
  e: unknown,
  section?: string,
): void => {
  console.error('Voice generation error:', e);
  const target = readAloudTarget(state, gen, flight);
  if (!target) return;
  state.showToast(state.t('toast.audioError'), 'error', () => state.generateVoice(target, section));
};

// Indicateur « en cours » retiré de l'objet de départ ET de celui du cours affiché (même id).
const endReadAloud = (state: AppContext, gen: GenerationUI, flight: ReadAloudFlight): void => {
  gen[flight.busyKey] = false;
  const current = readAloudTarget(state, gen, flight);
  if (current) current[flight.busyKey] = false;
};

const readAloudIdsSafe = (flight: ReadAloudFlight, gen: GenerationUI): boolean => {
  return PROJECT_ID_SAFE.test(flight.projectId ?? '') && PROJECT_ID_SAFE.test(gen.id);
};

const runGenerateVoice = async function (
  state: AppContext,
  gen: GenerationUI,
  section?: string,
): Promise<void> {
  const flight = readAloudFlight(state, gen, section);
  if (gen[flight.busyKey]) return;
  gen[flight.busyKey] = true;
  // Déjà demandée avant un retour sur le cours : l'indicateur suffit, la réponse attendue l'appliquera.
  if (readAloudInFlight.has(flight.id)) return;
  readAloudInFlight.add(flight.id);
  try {
    const body: Record<string, unknown> = { lang: getLocale() };
    if (section) body.section = section;
    const url = '/api/projects/' + flight.projectId + '/generations/' + gen.id + '/read-aloud';
    // Barrière taint de Codacy rule-node-ssrf (cf. runAutoRoute) : ids validés avant l'URL.
    const allowedUrls = readAloudIdsSafe(flight, gen) ? [url] : [];
    if (allowedUrls.includes(url)) {
      const res = await fetch(
        url,
        withAiHeaders({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }),
      );
      await handleReadAloudResponse(state, gen, flight, res, section);
    }
  } catch (e) {
    reportReadAloudException(state, gen, flight, e, section);
  } finally {
    readAloudInFlight.delete(flight.id);
    endReadAloud(state, gen, flight);
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

    async resumeAuto(this: AppContext, projectId: string, runId: string, projectName: string) {
      await runResumeAuto(this, projectId, runId, projectName);
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
      await runGenerateVoice(this, gen, section);
    },
  };
}
