/* eslint-disable
   @typescript-eslint/array-type,
   @typescript-eslint/no-misused-promises,
   @typescript-eslint/no-redundant-type-constituents,
   @typescript-eslint/no-unnecessary-condition,
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-argument,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/restrict-template-expressions
   --
   Codacy lance ESLint sans notre project TS complet sur les handlers Express/Mistral;
   lint:ci local reste la couverture type-aware. */
import { Router, Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { Mistral } from '@mistralai/mistralai';
import type {
  AgeGroup,
  Consigne,
  DictationItem,
  FailedStepCode,
  FillBlankItem,
  Generation,
  ModerationStatus,
  PendingTrackerEntry,
  PromoteErrorOutcome,
  PromoteErrorResponse,
  QuizGeneration,
  QuizQuestion,
  Source,
  SummaryRegister,
  TrackedGenerationType,
} from '../types.js';
import type { ProjectStore, PromoteResult } from '../store.js';
import type { ProfileStore } from '../profiles.js';
import type { VoiceId } from '../helpers/voice-types.js';
import { getConfig, resolveVoices, getModelLimits } from '../config.js';
import { resolveClient } from '../helpers/mistral-client-factory.js';
import { generateSummary, generateRemediationSummary } from '../generators/summary.js';
import { generateDictation, DICTATION_DEFAULT_WORDS } from '../generators/dictation.js';
import { textToSpeech, ttsOptionsFor } from '../generators/tts-provider.js';
import { generateFlashcards } from '../generators/flashcards.js';
import {
  generateQuiz,
  generateQuizVocal,
  generateQuizReview,
  QUIZ_DEFAULT_COUNT,
} from '../generators/quiz.js';
import { generatePodcastScript, createPodcastGeneration } from '../generators/podcast.js';
import { generateAudio } from '../generators/tts.js';
import { ttsQuestion, createQuizVocalGeneration } from '../generators/quiz-vocal.js';
import { generateImage } from '../generators/image.js';
import { generateFillBlank, FILL_BLANK_DEFAULT_COUNT } from '../generators/fill-blank.js';
import { runWithUsageTracking } from '../helpers/usage-context.js';
import { runWithMediaLedger } from '../helpers/media-ledger.js';
import { deleteMediaFiles } from '../helpers/generation-media.js';
import { persistUsage } from '../helpers/cost-persist.js';
import type { ApiUsage } from '../helpers/pricing.js';
import { routeRequest } from '../generators/router.js';
import {
  AUTO_AGENT_TYPES,
  AUTO_AGENTS_SET,
  type AutoAgentType,
} from '../generators/auto-agents.js';
import {
  answerKey,
  buildExclusionContext,
  hasExclusionContext,
  preferUnseenQuestions,
  preferUnusedAnswers,
  previousItems,
} from '../helpers/diversity.js';
import { withKeyedLock } from '../helpers/keyed-lock.js';
import { consigneMarkdownHeader } from '../prompts.js';
import { autoTitle } from '../helpers/auto-title.js';
import { saveAudioFile } from '../helpers/audio-files.js';
import { logger } from '../helpers/logger.js';
import { extractErrorCode } from '../helpers/error-codes.js';
import {
  INVALID_INPUT,
  isOptionalAgeGroup,
  isOptionalLangCode,
  isUuidV4,
} from '../helpers/request-validation.js';
import {
  blockingModerationStatus,
  consigneUsable,
  moderationRejection,
} from '../helpers/moderation-http.js';
import { activeModerationCategories, moderationProfileOf } from '../helpers/moderation-profile.js';
import { MODERATION_WAIT_MS, settleSourceModeration } from '../helpers/source-moderation.js';

const assertNever = (x: never): never => {
  throw new Error('exhaustive check failed: ' + JSON.stringify(x));
};

// Centralise le remap PromoteResult (interne store) → PromoteErrorOutcome (wire) : `missing`
// part en `failed` (journalisé par notPromoted, jamais un code client). Le switch sur `kind` force
// exhaustivité au compile-time : un nouveau arm de PromoteResult casse la build au lieu de tomber
// dans le default.
function classifyPromoteFailure(
  result: Exclude<PromoteResult, { kind: 'promoted' }>,
): PromoteErrorOutcome {
  switch (result.kind) {
    case 'cancelled':
      return 'cancelled';
    case 'failed':
    case 'missing':
      return 'failed';
    default:
      return assertNever(result);
  }
}

const QUIZ_VOCAL = 'quiz-vocal' as const;
const FILL_BLANK = 'fill-blank' as const;
const ROUTER_MODEL = 'mistral-small-latest';
const ERR_PROJECT_NOT_FOUND = 'project_not_found';

// Variante non-throw : retourne null quand aucune source ne matche, pour permettre aux
// call sites internes (`buildGenContext`, `quiz-review`, `route` analysis) de répondre
// 400 'no_sources' explicite plutôt que de retomber sur 500/'internal_error'. Le helper
// public `getMarkdown` (utilisé par routes/chat.ts et routes/sources.ts) garde sa
// sémantique throw pour ne pas changer leur contrat externe.
export function getMarkdownOrNull(sources: Source[], sourceIds?: string[]): string | null {
  const selected =
    sourceIds && sourceIds.length > 0 ? sources.filter((s) => sourceIds.includes(s.id)) : sources;
  if (selected.length === 0) return null;
  return selected
    .map((s, i) => `# Source ${i + 1} — ${s.filename}\n\n${s.markdown}`)
    .join('\n\n---\n\n');
}

export function getMarkdown(sources: Source[], sourceIds?: string[]): string {
  const md = getMarkdownOrNull(sources, sourceIds);
  if (md === null) throw new Error('Aucune source disponible');
  return md;
}

export function applyConsigne(markdown: string, consigne?: Consigne): string {
  if (!consigne?.found || consigne.keyTopics.length === 0) return markdown;
  const topicsList = consigne.keyTopics.map((t) => `- ${t}`).join('\n');
  return consigneMarkdownHeader(topicsList) + markdown;
}

interface GenRequestBody {
  sourceIds?: string[];
  useConsigne?: boolean;
  lang?: string;
  ageGroup?: AgeGroup;
  count?: number | string;
  // Registre d'écriture des fiches (falc = « très facile à lire ») — accepté
  // par validateGenRequestBody sur toutes les routes, consommé par summary seul.
  register?: SummaryRegister;
}

const resolveSourceIds = (body: GenRequestBody, sources: Source[]): string[] => {
  const ids = body.sourceIds ?? [];
  return ids.length > 0 ? ids : sources.map((s) => s.id);
};

const contextLimitFor = (limits: Record<string, number>, modelId: string): number => {
  const descriptor = Object.getOwnPropertyDescriptor(limits, modelId);
  return typeof descriptor?.value === 'number' ? descriptor.value : 128_000;
};

const checkContextLimit = (markdown: string, modelId: string): string | null => {
  const limits = getModelLimits();
  const limit = contextLimitFor(limits, modelId);
  const estimatedTokens = Math.ceil(markdown.length / 2);
  if (estimatedTokens > limit * 0.8) {
    const pct = Math.round((estimatedTokens / limit) * 100);
    return `context_too_large:${pct}`;
  }
  return null;
};

const selectModeratedSources = (project: { sources: Source[] }, sourceIds?: string[]): Source[] =>
  sourceIds && sourceIds.length > 0
    ? project.sources.filter((s) => sourceIds.includes(s.id))
    : project.sources;

// Statut EFFECTIF qui bloque la génération sur les sources sélectionnées (un `safe` dont les
// catégories persistées signalent une catégorie bloquée par le profil compte comme `unsafe`),
// priorité unsafe > error > pending ; undefined si la modération est inactive ou si rien ne
// bloque. Reçoit le projet déjà chargé par l'appelant : pas de relecture de project.json.
const checkModeration = (
  project: { meta: { profileId?: string }; sources: Source[] },
  profileStore: ProfileStore,
  sourceIds?: string[],
): ModerationStatus | undefined => {
  const blocked = activeModerationCategories(moderationProfileOf(project, profileStore));
  if (!blocked) return undefined;
  return blockingModerationStatus(selectModeratedSources(project, sourceIds), blocked);
};

type LoadedProject = NonNullable<ReturnType<ProjectStore['getProject']>>;

interface GenContext {
  // Client Mistral résolu par requête (header `X-EurekAI-AI-Key` > env). Injecté
  // dans le handler après `resolveClient` (auth-first), jamais un singleton global.
  client: Mistral;
  project: LoadedProject;
  markdown: string;
  rawMarkdown: string;
  lang: string;
  ageGroup: AgeGroup;
  config: ReturnType<typeof getConfig>;
  hasConsigne: boolean;
  sourceIds: string[];
  count?: number;
  pid: string;
  profileVoices?: { host?: VoiceId; guest?: VoiceId };
  // Propagé pour que resolveVoices() applique la rotation déterministe par profil
  // (cf. helpers/voice-selection.ts) sur les routes dédiées podcast/quiz-vocal.
  profileId?: string;
  register?: SummaryRegister;
}

function parseCount(raw: unknown): number | undefined {
  const n = raw ? Number(raw) : undefined;
  return n && Number.isFinite(n) ? Math.min(Math.max(Math.round(n), 1), 50) : undefined;
}

// Predicates individuels (arrow) — evitent le piege Lizard d'agglomeration des
// `function foo()` top-level consecutives, et gardent chaque check sous CCN 8.
// lang/ageGroup : predicats partages avec le chat, la recherche web et les sources
// (helpers/request-validation.ts) — un code de langue, jamais du texte libre.
const isOptionalNullableString = (v: unknown): boolean =>
  v === undefined || v === null || typeof v === 'string';
const isOptionalBoolean = (v: unknown): boolean => v === undefined || typeof v === 'boolean';
const isOptionalStringArray = (v: unknown): boolean =>
  v === undefined || (Array.isArray(v) && v.every((s) => typeof s === 'string'));
const isOptionalFiniteNumberish = (v: unknown): boolean =>
  v === undefined || v === null || Number.isFinite(Number(v));
const isOptionalRegister = (v: unknown): boolean =>
  v === undefined || v === 'standard' || v === 'falc';
const isOptionalString = (v: unknown): boolean => v === undefined || typeof v === 'string';

type BodyCheck = (b: Record<string, unknown>) => boolean; // eslint-disable-line no-unused-vars, @typescript-eslint/no-unused-vars -- Codacy compte le nom du parametre de type comme unused.

// Un contrôle par champ, dans l'ordre historique ; `every` s'arrête au premier échec comme
// la chaîne de && qu'il remplace (Lizard ne mesurait pas ce corps d'expression multi-lignes).
const BODY_CHECKS: readonly BodyCheck[] = [
  (b) => isOptionalLangCode(b.lang),
  (b) => isOptionalAgeGroup(b.ageGroup),
  (b) => isOptionalNullableString(b.profileId),
  (b) => isOptionalBoolean(b.useConsigne),
  (b) => isOptionalStringArray(b.sourceIds),
  (b) => isOptionalFiniteNumberish(b.count),
  (b) => isOptionalRegister(b.register),
  (b) => isOptionalString(b.gid),
];

type ModelConfig = ReturnType<typeof getConfig>['models'];
type ModelSelector = (models: ModelConfig) => string; // eslint-disable-line no-unused-vars, @typescript-eslint/no-unused-vars -- Codacy compte le nom du parametre de type comme unused.

const MODEL_SELECTORS = new Map<string, ModelSelector>([
  ['summary', (models) => models.summary],
  ['flashcards', (models) => models.flashcards],
  ['quiz', (models) => models.quiz],
  ['podcast', (models) => models.podcast],
  ['translate', (models) => models.translate],
  ['quizVerify', (models) => models.quizVerify],
  ['chat', (models) => models.chat],
  ['ocr', (models) => models.ocr],
]);

const configuredModel = (models: ModelConfig, modelId?: string): string => {
  if (!modelId) return models.summary;
  return MODEL_SELECTORS.get(modelId)?.(models) ?? modelId;
};

type ValidateResult = { ok: true } | { ok: false; error: string };

const INVALID: ValidateResult = { ok: false, error: INVALID_INPUT };
const OK: ValidateResult = { ok: true };

// Validation primitive des inputs de /generate/*. Sans ce check, un payload
// avec types incorrects (lang: 12345, ageGroup: [], profileId: null) etait
// silencieusement accepte et fallback sur les defaults — consommation Mistral
// sans validation, et impossible de distinguer un bug client d'une vraie demande.
// `lang` doit etre un code de langue : une chaine libre finissait telle quelle dans
// langInstruction (injection de consignes que la moderation ne voit pas).
// Appele en tete de buildGenContext, donc EN AMONT de addPendingEntry, pour rejet 400 propre
// (cf. CLAUDE.md "Validations early extraites des generators").
const allChecksPass = (b: Record<string, unknown>): boolean => BODY_CHECKS.every((c) => c(b));

const validateGenRequestBody = (body: unknown): ValidateResult => {
  if (!body || typeof body !== 'object') return INVALID;
  return allChecksPass(body as Record<string, unknown>) ? OK : INVALID;
};

const AUTO_EXECUTABLE = AUTO_AGENTS_SET;

// Narrow `agent: string` vers `AutoAgentType` côté executable après le check runtime
// sur AUTO_EXECUTABLE.has — permet à FailedStep.agent de rester typé sans cast ailleurs.
type WithAgent<T, A> = Omit<T, 'agent'> & { agent: A };

const splitByAutoExecutable = <T extends { agent: string }>(
  plan: T[],
): { executable: Array<WithAgent<T, AutoAgentType>>; skipped: T[] } => {
  const executable: Array<WithAgent<T, AutoAgentType>> = [];
  const skipped: T[] = [];
  for (const step of plan) {
    if (AUTO_EXECUTABLE.has(step.agent)) {
      executable.push(step as WithAgent<T, AutoAgentType>);
    } else {
      skipped.push(step);
    }
  }
  return { executable, skipped };
};

// Contexte d'une génération avant le client (exporté pour le lancement d'un lot Auto).
export type GenContextBase = Omit<GenContext, 'client'>;
type GenFailure = { ok: false; status: number; error: string };
// Alias plutôt qu'une union écrite sur plusieurs lignes en type de retour : Lizard ne
// mesurerait que la signature (cf. CLAUDE.md « Type de retour union multi-lignes »).
type GenContextResult = { ok: true; ctx: GenContextBase } | GenFailure;
type ProjectLoad = { ok: true; project: LoadedProject } | GenFailure;
type ContextCheckOptions = { skipContextCheck?: boolean; checkRawMarkdown?: boolean };

// Gardes d'entrée, dans cet ordre : corps (400 invalid_input), projet (404), puis modération
// des sources sélectionnées : 400 moderation.blocked (signalée) / 503 moderation.error (panne)
// / 409 moderation.pending.
const loadGenProject = (
  store: ProjectStore,
  profileStore: ProfileStore,
  pid: string,
  body: GenRequestBody,
): ProjectLoad => {
  const validation = validateGenRequestBody(body);
  if (!validation.ok) return { ok: false, status: 400, error: validation.error };
  const project = store.getProject(pid);
  if (!project) return { ok: false, status: 404, error: ERR_PROJECT_NOT_FOUND };
  const rejection = moderationRejection(checkModeration(project, profileStore, body.sourceIds));
  if (rejection) return { ok: false, status: rejection.status, error: rejection.error };
  return { ok: true, project };
};

// Point UNIQUE d'application de la consigne dans ce fichier (routes dédiées, auto et analyse
// de route) : toute garde future sur la consigne s'ajoute ici. Hors de ce point, seuls les
// outils du chat l'appliquent (routes/chat.ts, via applyConsigne), avec la même garde.
// Appliquée seulement si elle est utilisable pour le profil PROPRIÉTAIRE (consigneUsable) : une
// consigne tirée d'une source signalée, en attente, en erreur, jamais vérifiée ou supprimée
// n'entre dans aucun prompt.
const resolveConsigne = (
  rawMarkdown: string,
  project: LoadedProject,
  useConsigne: boolean,
  profileStore: ProfileStore,
): { markdown: string; hasConsigne: boolean } => {
  const { consigne } = project;
  const blocked = activeModerationCategories(moderationProfileOf(project, profileStore));
  if (!useConsigne || !consigneUsable(consigne, project.sources, blocked)) {
    return { markdown: rawMarkdown, hasConsigne: false };
  }
  return { markdown: applyConsigne(rawMarkdown, consigne), hasConsigne: true };
};

// Limite de contexte du modèle résolu (400 context_too_large:<pct>) : ignorée si
// skipContextCheck, mesurée sur le markdown brut si checkRawMarkdown (image), sinon sur le
// markdown avec consigne.
const contextErrorFor = (
  rawMarkdown: string,
  markdown: string,
  model: string,
  options?: ContextCheckOptions,
): string | null => {
  if (options?.skipContextCheck) return null;
  return checkContextLimit(options?.checkRawMarkdown ? rawMarkdown : markdown, model);
};

interface AssembleGenContextArgs {
  profileStore: ProfileStore;
  pid: string;
  body: GenRequestBody;
  project: LoadedProject;
  markdown: string;
  rawMarkdown: string;
  hasConsigne: boolean;
  config: ReturnType<typeof getConfig>;
}

// Contexte final, sans aucun contrôle (tous les refus sont en amont) : défauts lang/ageGroup,
// sources retenues, count borné, voix et identifiant du profil du projet.
const assembleGenContext = (args: AssembleGenContextArgs): GenContextBase => {
  const { profileStore, pid, body, project, markdown, rawMarkdown, hasConsigne, config } = args;
  const profileId = project.meta?.profileId;
  const profile = profileId ? profileStore.get(profileId) : null;
  return {
    project,
    markdown,
    rawMarkdown,
    lang: body.lang || 'fr',
    ageGroup: body.ageGroup || 'enfant',
    config,
    hasConsigne,
    sourceIds: resolveSourceIds(body, project.sources),
    count: parseCount(body.count),
    register: body.register,
    pid,
    profileVoices: profile?.mistralVoices,
    profileId: profileId || undefined,
  };
};

// Reprise des modérations en attente ou en erreur des sources visées, attendue au plus
// MODERATION_WAIT_MS.request, APRÈS resolveClient (auth-first) et AVANT buildGenContext, qui relit
// alors le projet (statuts frais). Corps invalide : aucune modération (400 de buildGenContext,
// règle lang/ageGroup) ; projet absent ou profil propriétaire non modéré : rien n'est lancé
// (settleSourceModeration), buildGenContext répond 404 ou génère. Ne lève jamais.
const settleGenerationSources = async (
  store: ProjectStore,
  profileStore: ProfileStore,
  client: Mistral,
  pid: string,
  body: unknown,
): Promise<void> => {
  if (!validateGenRequestBody(body).ok) return;
  const { sourceIds } = body as GenRequestBody;
  const deps = { store, profileStore, client };
  await settleSourceModeration(deps, pid, { sourceIds, waitMs: MODERATION_WAIT_MS.request });
};

// Contexte commun à toutes les générations ET à l'analyse de route. Ordre des refus : gardes
// d'entrée (loadGenProject), sources (400 no_sources), limite de contexte. N'écrit ni dans le
// projet ni dans le tracker : appelé AVANT addPendingEntry, un refus ne laisse aucune entrée
// orpheline. Les modérations en attente sont reprises juste avant (settleGenerationSources).
const buildGenContext = (
  store: ProjectStore,
  profileStore: ProfileStore,
  pid: string,
  body: GenRequestBody,
  modelId?: string,
  options?: ContextCheckOptions,
): GenContextResult => {
  const loaded = loadGenProject(store, profileStore, pid, body);
  if (!loaded.ok) return loaded;
  const { project } = loaded;
  const rawMarkdown = getMarkdownOrNull(project.sources, body.sourceIds);
  if (rawMarkdown === null) return { ok: false, status: 400, error: 'no_sources' };
  const useConsigne = body.useConsigne !== false;
  const { markdown, hasConsigne } = resolveConsigne(
    rawMarkdown,
    project,
    useConsigne,
    profileStore,
  );
  const config = getConfig();
  const model = configuredModel(config.models, modelId);
  const ctxError = contextErrorFor(rawMarkdown, markdown, model, options);
  if (ctxError) return { ok: false, status: 400, error: ctxError };
  const ctx = assembleGenContext({
    profileStore,
    pid,
    body,
    project,
    markdown,
    rawMarkdown,
    hasConsigne,
    config,
  });
  return { ok: true, ctx };
};

// Pré-validation des inputs de quiz-review. Sortie en amont de handleGeneration
// pour éviter qu'un pending tracker entry (ajouté au commit pending lifecycle)
// ne reste orphelin quand une validation échoue. Toutes les erreurs de cette
// validation produisent un 400/404 sans avoir touché le tracker.
interface QuizReviewValidated {
  originalGen: QuizGeneration;
  weakQuestions: QuizQuestion[];
  markdown: string;
  reviewLabel: string;
}

type ValidationResult<T> = { ok: true; data: T } | { ok: false; status: number; error: string };

const reviewLabelForLang = (lang: string): string => (lang === 'en' ? 'Review' : 'Revision');

// Préfixe titre de la fiche de remédiation — même précédent fr/en que reviewLabelForLang.
const remediationLabelForLang = (lang: string): string => (lang === 'en' ? 'Recap' : 'Rappel');

// Préfixe titre des fiches en registre falc — distingue la version simplifiée de
// la fiche d'origine dans la liste (le LLM ne connaît pas le mot « facile »,
// anti-leak : le préfixe est posé côté serveur, jamais dans le prompt).
const falcLabelForLang = (lang: string): string =>
  lang === 'en' ? 'Easy version' : 'Version facile';

// quiz-review et remediation-summary : la garde de modération (buildGenContext → checkModeration)
// et le tracker portent sur les sources que reçoit le LLM, celles du quiz d'origine ([] legacy =
// toutes, comme getMarkdownOrNull) — jamais sur body.sourceIds : absent dans l'UI (toutes les
// sources : sur-blocage par une source signalée sans rapport), et libre pour un appel API direct
// (d'autres sources passaient la garde). Réassigné, pas muté : le corps reçu reste intact.
const scopeToOriginalQuizSources = (req: Request, originalGen: QuizGeneration): void => {
  req.body = { ...req.body, sourceIds: originalGen.sourceIds };
};

function validateQuizReviewInputs(
  store: ProjectStore,
  pid: string,
  body: { generationId?: string; weakQuestions?: unknown; lang?: string },
): ValidationResult<QuizReviewValidated> {
  if (!body.generationId || !Array.isArray(body.weakQuestions)) {
    return { ok: false, status: 400, error: INVALID_INPUT };
  }
  const originalGen = store.getGeneration(pid, body.generationId);
  if (originalGen?.type !== 'quiz') {
    return { ok: false, status: 404, error: 'generation_not_found' };
  }
  const project = store.getProject(pid);
  if (!project) {
    return { ok: false, status: 404, error: ERR_PROJECT_NOT_FOUND };
  }
  const markdown = getMarkdownOrNull(project.sources, originalGen.sourceIds);
  if (markdown === null) {
    return { ok: false, status: 400, error: 'no_sources' };
  }
  const ctxError = checkContextLimit(markdown, getConfig().models.quiz);
  if (ctxError) {
    return { ok: false, status: 400, error: ctxError };
  }
  return {
    ok: true,
    data: {
      // type-narrowed via `originalGen?.type !== 'quiz'` early-return ci-dessus
      originalGen,
      weakQuestions: body.weakQuestions as QuizQuestion[],
      markdown,
      reviewLabel: reviewLabelForLang(body.lang || 'fr'),
    },
  };
}

interface GenerationOptions {
  skipContextCheck?: boolean;
  checkRawMarkdown?: boolean;
  // Agent dont les règles d'erreur s'appliquent (extractErrorCode).
  agentName: string;
  // Type de l'entrée du tracker : addPendingEntry au début (409 duplicate_gid si gid déjà pris),
  // promoteToGeneration au succès (409 si annulation ou échec ont gagné), markPendingFailed sur
  // une exception.
  trackedType: TrackedGenerationType;
}

// Lit le gid envoyé par le client (body.gid), UUID v4 strict (isUuidV4) ou retombe sur randomUUID :
// toute autre valeur (UUID v1/v3/v5, forme hexadécimale non v4) ne se propage pas. Le client génère
// son propre gid avant le fetch pour avoir abortControllersByGid[gid] immédiatement opérationnel +
// identifiant stable utilisable au moment du payload 200 fallback ou de l'event SSE.
const readClientGid = (req: Request): string => {
  const candidate = (req.body as { gid?: unknown })?.gid;
  return isUuidV4(candidate) ? candidate : randomUUID();
};

const makeTrackerEntry = (
  type: TrackedGenerationType,
  gid: string,
  sourceIds: string[],
): PendingTrackerEntry => {
  return {
    id: gid,
    type,
    status: 'pending',
    startedAt: new Date().toISOString(),
    sourceIds,
  };
};

interface PersistedCostFields {
  usage?: NonNullable<Generation['usage']>;
  cost?: number;
  costBreakdown?: string[];
}

const buildFinalGeneration = (
  gid: string,
  gen: Generation,
  persisted: PersistedCostFields | null,
): Generation => {
  const final: Generation = { ...gen, id: gid };
  if (persisted) {
    final.usage = persisted.usage;
    final.estimatedCost = persisted.cost;
    final.costBreakdown = persisted.costBreakdown;
  }
  return final;
};

// Alias plutôt qu'un type fonction en ligne dans une signature : Lizard y coupe la fonction
// (signature seule mesurée, corps perdu ou détaché en anonyme) — runGeneratorAndPersist et
// handleGeneration échappaient ainsi au plafond CCN.
type GeneratorFn = (ctx: GenContext) => Promise<Generation | null>; // eslint-disable-line no-unused-vars, @typescript-eslint/no-unused-vars -- Codacy compte le nom du parametre de type comme unused.
type AsyncThunk<T> = () => Promise<T>;
type UsageAndMediaRun<T> = { result: T; mediaUrls: string[]; usage: ApiUsage[] };
type NotPromoted = Exclude<PromoteResult, { kind: 'promoted' }>;

// Une génération suivie : son générateur, le modèle dont la limite de contexte s'applique
// (configuredModel) et ses options.
interface GenerationDef {
  build: GeneratorFn;
  modelId?: string;
  options: GenerationOptions;
}

// Issue d'une génération suivie, sans réponse HTTP : les routes /generate/<type> la traduisent
// (sendGenerationOutcome), et elle reste lisible hors requête. Le tracker, les médias et le coût
// sont déjà à jour quand elle est rendue.
type GenerationOutcome =
  | { kind: 'refused'; status: number; error: string }
  | { kind: 'duplicate_gid' }
  | { kind: 'promoted'; generation: Generation }
  | { kind: 'not_promoted'; result: NotPromoted }
  | { kind: 'failed'; code: FailedStepCode };

// Une génération dont l'entrée du tracker est posée : tout ce qu'il faut pour la produire.
interface TrackedRun {
  store: ProjectStore;
  pid: string;
  gid: string;
  def: GenerationDef;
  ctx: GenContext;
}

// Coûts ET médias écrits d'une génération ou d'une étape auto, chacune dans son propre contexte
// (étapes auto parallèles comprises). Si `fn` lève, runWithMediaLedger a déjà supprimé les médias
// écrits (quiz vocal en échec à la question N) ; le coût partiel reste attaché à l'erreur.
const runWithUsageAndMedia = async <T>(
  projectDir: string,
  pid: string,
  fn: AsyncThunk<T>,
): Promise<UsageAndMediaRun<T>> => {
  const { result: run, usage } = await runWithUsageTracking(() =>
    runWithMediaLedger(projectDir, pid, fn),
  );
  return { result: run.result, mediaUrls: run.mediaUrls, usage };
};

// Race : annulation ou échec a gagné pendant que Mistral travaillait (ou pendant l'attente de la
// file). Pas de réponse 200 fantôme — le client relit le projet pour voir l'état réel.
const notPromoted = (pid: string, gid: string, result: NotPromoted): GenerationOutcome => {
  if (result.kind === 'missing') {
    // Tracker entry retirée entre addPendingEntry et promote (race deleteProject
    // ou corruption tracker). logger.error pour Sentry — jamais user-visible.
    logger.error('generate', `tracker entry vanished: pid=${pid} gid=${gid}`);
  }
  return { kind: 'not_promoted', result };
};

// Defense en profondeur : aucune closure ne devrait return null après le commit d'extraction des
// validations early. Logger UNCONDITIONAL pour Sentry.
const nullGeneration = (run: TrackedRun): GenerationOutcome => {
  const { store, pid, gid } = run;
  logger.error(
    'generate',
    `generator returned null: type=${run.def.options.trackedType} pid=${pid} gid=${gid}`,
  );
  store.markPendingFailed(pid, gid, 'internal_error');
  return { kind: 'failed', code: 'internal_error' };
};

const runGeneratorAndPersist = async (run: TrackedRun): Promise<GenerationOutcome> => {
  const { store, pid, gid } = run;
  const projectDir = store.getProjectDir(pid);
  const generated = await runWithUsageAndMedia(projectDir, pid, () => run.def.build(run.ctx));
  const gen = generated.result;
  if (!gen) {
    deleteMediaFiles(projectDir, pid, generated.mediaUrls);
    return nullGeneration(run);
  }
  const route = `POST /api/projects/${pid}/generate/${gen.type}`;
  const finalGen = buildFinalGeneration(gid, gen, persistUsage(store, pid, route, generated.usage));
  const promoteResult = store.promoteToGeneration(pid, gid, finalGen);
  if (promoteResult.kind === 'promoted') {
    return { kind: 'promoted', generation: promoteResult.generation };
  }
  // Annulation ou échec gagnant la course : aucune génération ne référencera ces médias.
  deleteMediaFiles(projectDir, pid, generated.mediaUrls);
  return notPromoted(pid, gid, promoteResult);
};

// Même projet, même type (avec bloc d'exclusions) : une génération après l'autre. Lancées ensemble,
// aucune ne voyait l'autre dans son bloc et elles reprenaient le même 1er élément (mesuré le
// 2026-10-07, output/parallele-corpus/, hors git). Les types différents restent en parallèle.
const withSameTypeQueue = <T>(pid: string, type: string, fn: AsyncThunk<T>): Promise<T> => {
  if (!hasExclusionContext(type)) return fn();
  return withKeyedLock(`generate:${pid}:${type}`, fn);
};

// Tour d'une génération mise en file : annulée pendant l'attente → aucun appel à Mistral ; sinon
// projet relu, pour que le bloc d'exclusions voie les générations terminées entre-temps.
const runQueuedGeneration = async (run: TrackedRun): Promise<GenerationOutcome> => {
  const status = run.store.pendingStatus(run.pid, run.gid);
  if (status !== 'pending') {
    return notPromoted(run.pid, run.gid, {
      kind: status === 'cancelled' ? 'cancelled' : 'missing',
    });
  }
  const project = run.store.getProject(run.pid) ?? run.ctx.project;
  return runGeneratorAndPersist({ ...run, ctx: { ...run.ctx, project } });
};

const failedGeneration = (run: TrackedRun, e: unknown): GenerationOutcome => {
  const { store, pid, gid } = run;
  const code = extractErrorCode(e, run.def.options.agentName);
  store.markPendingFailed(pid, gid, code);
  const failedUsage = (e as { apiUsage?: ApiUsage[] }).apiUsage;
  if (failedUsage?.length) {
    persistUsage(store, pid, `POST /api/projects/${pid}/generate/failed`, failedUsage);
  }
  logger.error('generate', 'error:', e);
  return { kind: 'failed', code };
};

interface GenerationRequest {
  store: ProjectStore;
  profileStore: ProfileStore;
  // Client déjà résolu par l'appelant (auth-first : avant toute validation ou écriture).
  client: Mistral;
  pid: string;
  gid: string;
  body: unknown;
  def: GenerationDef;
  // Entrée du tracker déjà posée (étape d'un lot Auto, store.startAutoRunSteps) : pas
  // d'addPendingEntry, et un refus des gardes passe cette entrée en échec `refused`.
  preTracked?: boolean;
}

type GenContextFailure = Extract<GenContextResult, { ok: false }>;

// Refus des gardes. Génération simple : aucune écriture (rien n'est encore suivi). Étape d'un lot :
// son entrée passe `failed` / `refused` avec le code exact du refus, et le lot continue.
const refusedGeneration = (r: GenerationRequest, failure: GenContextFailure): GenerationOutcome => {
  if (r.preTracked) r.store.markPendingFailed(r.pid, r.gid, 'refused', failure.error);
  return { kind: 'refused', status: failure.status, error: failure.error };
};

// Pose l'entrée du tracker d'une génération simple ; faux si ce gid est déjà suivi.
const trackGeneration = (r: GenerationRequest, sourceIds: string[]): boolean => {
  if (r.preTracked) return true;
  const entry = makeTrackerEntry(r.def.options.trackedType, r.gid, sourceIds);
  return r.store.addPendingEntry(r.pid, entry);
};

// Cœur d'une génération suivie, sans réponse HTTP. Ordre : reprise des modérations en attente,
// gardes (buildGenContext : refus sans aucune écriture), entrée du tracker, file par type,
// générateur, coût, promotion. Ne lève que si la reprise ou les gardes lèvent (avant le tracker).
export const runTrackedGeneration = async (r: GenerationRequest): Promise<GenerationOutcome> => {
  const { store, profileStore, client, pid, gid, def } = r;
  await settleGenerationSources(store, profileStore, client, pid, r.body);
  const body = r.body as GenRequestBody;
  const built = buildGenContext(store, profileStore, pid, body, def.modelId, def.options);
  if (!built.ok) return refusedGeneration(r, built);
  if (!trackGeneration(r, built.ctx.sourceIds)) return { kind: 'duplicate_gid' };
  const run: TrackedRun = { store, pid, gid, def, ctx: { ...built.ctx, client } };
  try {
    return await withSameTypeQueue(pid, def.options.trackedType, () => runQueuedGeneration(run));
  } catch (e) {
    return failedGeneration(run, e);
  }
};

const sendGenerationOutcome = (res: Response, gid: string, outcome: GenerationOutcome): void => {
  switch (outcome.kind) {
    case 'refused':
      res.status(outcome.status).json({ error: outcome.error });
      return;
    case 'duplicate_gid':
      res.status(409).json({ error: 'duplicate_gid', gid });
      return;
    case 'promoted':
      res.json(outcome.generation);
      return;
    case 'not_promoted': {
      const body: PromoteErrorResponse = { error: classifyPromoteFailure(outcome.result), gid };
      res.status(409).json(body);
      return;
    }
    case 'failed':
      res.status(500).json({ error: outcome.code });
      return;
    default:
      assertNever(outcome);
  }
};

const handleGeneration = (store: ProjectStore, profileStore: ProfileStore, def: GenerationDef) => {
  return async (req: Request, res: Response) => {
    // Auth-first : résoudre la clé AVANT toute validation/IO (et donc avant
    // addPendingEntry → aucun pending tracker orphelin si pas de clé).
    const resolved = resolveClient(req);
    if (!resolved.ok) {
      res.status(resolved.status).json({ error: resolved.error });
      return;
    }
    const gid = readClientGid(req);
    const pid = req.params.pid as string;
    const request = { store, profileStore, client: resolved.client, pid, gid, body: req.body, def };
    sendGenerationOutcome(res, gid, await runTrackedGeneration(request));
  };
};

const makeGen = (
  type: string,
  data: Generation['data'],
  ctx: Pick<GenContext, 'lang' | 'sourceIds'>,
): Generation =>
  ({
    id: randomUUID(),
    title: autoTitle(type, data, ctx.lang),
    createdAt: new Date().toISOString(),
    sourceIds: ctx.sourceIds,
    type,
    data,
  }) as Generation;

const buildSummaryGeneration = async (ctx: GenContext): Promise<Generation> => {
  logger.info(
    'summary',
    `sources: ${ctx.project.sources.length}, markdown: ${ctx.markdown.length} chars, model: ${ctx.config.models.summary}, consigne: ${ctx.hasConsigne}, lang: ${ctx.lang}, ageGroup: ${ctx.ageGroup}, register: ${ctx.register ?? 'standard'}`,
  );
  const isFalc = ctx.register === 'falc';
  // FALC : on simplifie le MÊME contenu — les exclusions de diversité pousseraient
  // le modèle à éviter les points déjà couverts par la fiche d'origine.
  const exclusions = isFalc
    ? ''
    : buildExclusionContext(ctx.project.results.generations, 'summary');
  const data = await generateSummary(ctx.client, ctx.markdown, {
    model: ctx.config.models.summary,
    hasConsigne: ctx.hasConsigne,
    lang: ctx.lang,
    ageGroup: ctx.ageGroup,
    exclusions,
    register: ctx.register,
  });
  logger.info(
    'summary',
    `result keys: [${Object.keys(data)}], title: "${data.title?.slice(0, 60)}", key_points: ${data.key_points?.length}`,
  );
  const gen = makeGen('summary', data, ctx);
  if (isFalc) gen.title = `${falcLabelForLang(ctx.lang)} — ${data.title}`;
  return gen;
};

const buildFlashcardsGeneration = async (ctx: GenContext): Promise<Generation> => {
  const exclusions = buildExclusionContext(ctx.project.results.generations, 'flashcards');
  const data = await generateFlashcards(
    ctx.client,
    ctx.markdown,
    ctx.config.models.flashcards,
    ctx.lang,
    ctx.ageGroup,
    ctx.count,
    exclusions,
  );
  return makeGen('flashcards', data, ctx);
};

// Quiz et textes à trous, quand des séries du même type existent : quelques éléments de plus, puis
// les inédits d'abord, coupés au nombre demandé (generateFreshQuiz, generateFreshFillBlank).
const EXTRA_WHEN_PREVIOUS = { quiz: 10, [FILL_BLANK]: 5 } as const;

interface FreshRequest {
  client: Mistral;
  markdown: string;
  model: string;
  lang: string;
  ageGroup: AgeGroup;
  count?: number;
  generations: Generation[];
}

// Alias plutôt que des types fonction écrits dans la signature : Lizard y couperait generateFresh.
type GenerateCount<T> = (count: number) => Promise<T[]>; // eslint-disable-line no-unused-vars, @typescript-eslint/no-unused-vars -- Codacy compte le nom du parametre de type comme unused.
type FreshFirst<T> = (items: T[]) => T[]; // eslint-disable-line no-unused-vars, @typescript-eslint/no-unused-vars -- Codacy compte le nom du parametre de type comme unused.

const generateFresh = async <T>(
  count: number,
  extra: number,
  generate: GenerateCount<T>,
  freshFirst: FreshFirst<T>,
): Promise<T[]> => {
  if (extra === 0) return generate(count);
  const items = await generate(count + extra);
  return freshFirst(items).slice(0, count);
};

// Quiz : même l'un après l'autre, une consigne concentre les questions sur ses points et le 2e quiz
// reprenait les mêmes (4 sur 8 avec la même 1re question, recouvrement 0,76 ; mesuré le 2026-10-07,
// output/parallele-corpus/, hors git). Quand des quiz existent : 10 questions de plus, les inédites
// d'abord, puis coupe au nombre demandé → en direct, 0 sur 8 et recouvrement 0,06 (0,45 avec 5 de
// plus : avec une consigne, le modèle repose surtout les mêmes questions sur ses points).
const generateFreshQuiz = (r: FreshRequest): Promise<QuizQuestion[]> => {
  const previous = previousItems(r.generations, 'quiz');
  const exclusions = buildExclusionContext(r.generations, 'quiz');
  return generateFresh(
    r.count ?? QUIZ_DEFAULT_COUNT,
    previous.length > 0 ? EXTRA_WHEN_PREVIOUS.quiz : 0,
    (n) => generateQuiz(r.client, r.markdown, r.model, r.lang, r.ageGroup, n, exclusions),
    (items) => preferUnseenQuestions(items, previous),
  );
};

const buildQuizGeneration = async (ctx: GenContext): Promise<Generation> => {
  const data = await generateFreshQuiz({
    client: ctx.client,
    markdown: ctx.markdown,
    model: ctx.config.models.quiz,
    lang: ctx.lang,
    ageGroup: ctx.ageGroup,
    count: ctx.count,
    generations: ctx.project.results.generations,
  });
  return makeGen('quiz', data, ctx);
};

const buildPodcastGeneration = async (
  store: ProjectStore,
  ctx: GenContext,
): Promise<Generation> => {
  logger.info('podcast', 'Generating script...');
  const exclusions = buildExclusionContext(ctx.project.results.generations, 'podcast');
  const podcastResult = await generatePodcastScript(
    ctx.client,
    ctx.markdown,
    ctx.config.models.podcast,
    ctx.lang,
    ctx.ageGroup,
    exclusions,
  );
  logger.info('podcast', `Script OK: ${podcastResult.script.length} lines`);
  logger.info('podcast', 'Generating audio...');
  const ttsOpts = ttsOptionsFor(ctx.config, ctx.client);
  const audioBuffer = await generateAudio(
    podcastResult.script,
    resolveVoices({
      profileVoices: ctx.profileVoices,
      lang: ctx.lang,
      profileId: ctx.profileId,
      flow: 'podcast',
      model: ttsOpts.model,
    }),
    ttsOpts,
  );
  const audioUrl = saveAudioFile(audioBuffer, store.getProjectDir(ctx.pid), ctx.pid, 'podcast');
  logger.info('podcast', `Audio OK: ${(audioBuffer.length / 1024).toFixed(0)} KB`);
  return createPodcastGeneration({
    id: randomUUID(),
    title: autoTitle('podcast', null, ctx.lang),
    createdAt: new Date().toISOString(),
    sourceIds: ctx.sourceIds,
    type: 'podcast',
    data: {
      script: podcastResult.script,
      audioUrl,
      sourceRefs: podcastResult.sourceRefs,
      speakers: podcastResult.names,
    },
    lang: ctx.lang,
  });
};

const buildQuizVocalGeneration = async (
  store: ProjectStore,
  ctx: GenContext,
): Promise<Generation> => {
  logger.info(QUIZ_VOCAL, 'Generating quiz (TTS-friendly)...');
  const exclusions = buildExclusionContext(ctx.project.results.generations, QUIZ_VOCAL);
  const data = await generateQuizVocal(
    ctx.client,
    ctx.markdown,
    ctx.config.models.quiz,
    ctx.lang,
    ctx.ageGroup,
    ctx.count,
    exclusions,
  );
  logger.info(QUIZ_VOCAL, `Quiz OK: ${data.length} questions`);
  const audioUrls = await buildQuizVocalAudioUrls(store, ctx, data);
  return createQuizVocalGeneration({
    id: randomUUID(),
    title: autoTitle(QUIZ_VOCAL, data),
    createdAt: new Date().toISOString(),
    sourceIds: ctx.sourceIds,
    type: 'quiz-vocal',
    data,
    audioUrls,
    lang: ctx.lang,
    ageGroup: ctx.ageGroup,
  });
};

const buildQuizVocalAudioUrls = async (
  store: ProjectStore,
  ctx: Pick<GenContext, 'config' | 'client' | 'profileVoices' | 'lang' | 'profileId' | 'pid'>,
  data: QuizQuestion[],
): Promise<string[]> => {
  logger.info(QUIZ_VOCAL, 'Generating TTS for each question...');
  const audioUrls: string[] = [];
  const projectDir = store.getProjectDir(ctx.pid);
  const ttsOpts = ttsOptionsFor(ctx.config, ctx.client);
  const hostVoice = resolveVoices({
    profileVoices: ctx.profileVoices,
    lang: ctx.lang,
    profileId: ctx.profileId,
    flow: QUIZ_VOCAL,
    model: ttsOpts.model,
  }).host;
  // Un appel TTS à la fois : limite de débit de la clé Mistral ; et sur un échec, plus rien ne
  // tourne quand runWithMediaLedger supprime les MP3 déjà écrits (avec un Promise.all, les autres
  // appels en écriraient encore après ce nettoyage).
  for (const [i, question] of data.entries()) {
    // eslint-disable-next-line no-await-in-loop -- un appel TTS à la fois, cf. ci-dessus
    const audioBuffer = await ttsQuestion(question, hostVoice, ttsOpts, ctx.lang); // NOSONAR(S9382) — un appel TTS à la fois
    audioUrls.push(saveAudioFile(audioBuffer, projectDir, ctx.pid, `quiz-vocal-q${i}`));
    logger.info(QUIZ_VOCAL, `Q${i + 1} audio OK: ${(audioBuffer.length / 1024).toFixed(0)} KB`);
  }
  return audioUrls;
};

const DICTATION = 'dictation';

// 1 MP3 par mot (pattern buildQuizVocalAudioUrls) — la répétition et les pauses
// sont orchestrées côté client (Voxtral TTS n'a ni vitesse ni SSML), donc pas de
// concat/silence ffmpeg côté serveur.
const buildDictationAudioUrls = async (
  store: ProjectStore,
  ctx: Pick<GenContext, 'config' | 'client' | 'profileVoices' | 'lang' | 'profileId' | 'pid'>,
  data: DictationItem[],
): Promise<string[]> => {
  logger.info(DICTATION, 'Generating TTS for each word...');
  const audioUrls: string[] = [];
  const projectDir = store.getProjectDir(ctx.pid);
  const ttsOpts = ttsOptionsFor(ctx.config, ctx.client);
  const hostVoice = resolveVoices({
    profileVoices: ctx.profileVoices,
    lang: ctx.lang,
    profileId: ctx.profileId,
    flow: DICTATION,
    model: ttsOpts.model,
  }).host;
  // Un appel TTS à la fois, pour les mêmes raisons que buildQuizVocalAudioUrls.
  for (const [i, item] of data.entries()) {
    // eslint-disable-next-line no-await-in-loop -- un appel TTS à la fois, cf. buildQuizVocalAudioUrls
    const audioBuffer = await textToSpeech(item.word, hostVoice, ttsOpts); // NOSONAR(S9382) — un appel TTS à la fois
    audioUrls.push(saveAudioFile(audioBuffer, projectDir, ctx.pid, `dictation-w${i}`));
  }
  return audioUrls;
};

const buildDictationGeneration = async (
  store: ProjectStore,
  ctx: GenContext,
): Promise<Generation> => {
  logger.info(
    DICTATION,
    `sources: ${ctx.project.sources.length}, markdown: ${ctx.markdown.length} chars, lang: ${ctx.lang}, ageGroup: ${ctx.ageGroup}, count: ${ctx.count ?? DICTATION_DEFAULT_WORDS}`,
  );
  const exclusions = buildExclusionContext(ctx.project.results.generations, DICTATION);
  const data = await generateDictation(
    ctx.client,
    ctx.markdown,
    ctx.config.models.summary,
    ctx.lang,
    ctx.ageGroup,
    ctx.count ?? DICTATION_DEFAULT_WORDS,
    exclusions,
  );
  logger.info(DICTATION, `items OK: ${data.length} mots`);
  const audioUrls = await buildDictationAudioUrls(store, ctx, data);
  return {
    id: randomUUID(),
    title: autoTitle(DICTATION, data, ctx.lang),
    createdAt: new Date().toISOString(),
    sourceIds: ctx.sourceIds,
    type: DICTATION,
    data,
    audioUrls,
    lang: ctx.lang,
    ageGroup: ctx.ageGroup,
  };
};

const buildImageGeneration = async (store: ProjectStore, ctx: GenContext): Promise<Generation> => {
  logger.info('image', `Generating via agent... lang: ${ctx.lang}, ageGroup: ${ctx.ageGroup}`);
  const data = await generateImage(
    ctx.client,
    ctx.rawMarkdown,
    store.getProjectDir(ctx.pid),
    ctx.pid,
    ctx.lang,
    ctx.ageGroup,
  );
  logger.info('image', 'OK');
  return makeGen('image', data, ctx);
};

// Textes à trous : même l'un après l'autre, le bloc d'exclusions laissait reprendre les mêmes
// réponses — le prompt veut les termes CLE du cours, du plus simple au plus difficile, et le terme
// central de la leçon revenait en tête (mesuré le 2026-10-07, output/parallele-corpus/, hors git).
// Quand des séries existent : EXTRA_WHEN_PREVIOUS exercices de plus, ceux dont la réponse n'a pas
// encore servi d'abord, puis coupe au nombre demandé.
const generateFreshFillBlank = (r: FreshRequest): Promise<FillBlankItem[]> => {
  const used = new Set(previousItems(r.generations, FILL_BLANK).map(answerKey));
  const exclusions = buildExclusionContext(r.generations, FILL_BLANK);
  return generateFresh(
    r.count ?? FILL_BLANK_DEFAULT_COUNT,
    used.size > 0 ? EXTRA_WHEN_PREVIOUS[FILL_BLANK] : 0,
    (n) => generateFillBlank(r.client, r.markdown, r.model, r.lang, r.ageGroup, n, exclusions),
    (items) => preferUnusedAnswers(items, used),
  );
};

const buildFillBlankGeneration = async (ctx: GenContext): Promise<Generation> => {
  logger.info(
    FILL_BLANK,
    `sources: ${ctx.project.sources.length}, markdown: ${ctx.markdown.length} chars, lang: ${ctx.lang}, ageGroup: ${ctx.ageGroup}`,
  );
  const data = await generateFreshFillBlank({
    client: ctx.client,
    markdown: ctx.markdown,
    model: ctx.config.models.quiz,
    lang: ctx.lang,
    ageGroup: ctx.ageGroup,
    count: ctx.count,
    generations: ctx.project.results.generations,
  });
  return makeGen(FILL_BLANK, data, ctx);
};

const runAutoRouting = async (
  store: ProjectStore,
  client: Mistral,
  markdown: string,
  lang: string,
  ageGroup: AgeGroup,
  pid: string,
) => {
  logger.info('auto', 'Smart routing: analyzing content...');
  const { result: route, usage } = await runWithUsageTracking(() =>
    routeRequest(client, markdown, ROUTER_MODEL, lang, ageGroup),
  );
  const persisted = persistUsage(
    store,
    pid,
    `POST /api/projects/${pid}/generate/auto/route`,
    usage,
  );
  logger.info('route', `plan: [${route.plan.map((s) => s.agent).join(', ')}]`);
  const { executable, skipped } = splitByAutoExecutable(route.plan);
  if (skipped.length > 0) {
    logger.warn(
      'auto',
      `skipped (non-auto-executable): [${skipped.map((s) => s.agent).join(', ')}]`,
    );
  }
  return { executable, skipped, cost: persisted?.cost };
};

const trackedAs = (type: AutoAgentType, extra?: ContextCheckOptions): GenerationOptions => ({
  ...extra,
  agentName: type,
  trackedType: type,
});

// Les 8 générations suivies, une par type : source unique des routes /generate/<type>. Record (et
// non Map) : un type ajouté à AUTO_AGENT_TYPES sans sa définition casse la compilation.
export const buildGenerationDefs = (store: ProjectStore): Record<AutoAgentType, GenerationDef> => {
  return {
    summary: { build: buildSummaryGeneration, options: trackedAs('summary') },
    flashcards: {
      build: buildFlashcardsGeneration,
      modelId: 'flashcards',
      options: trackedAs('flashcards'),
    },
    quiz: { build: buildQuizGeneration, modelId: 'quiz', options: trackedAs('quiz') },
    [FILL_BLANK]: {
      build: buildFillBlankGeneration,
      modelId: 'quiz',
      options: trackedAs(FILL_BLANK),
    },
    podcast: {
      build: (ctx) => buildPodcastGeneration(store, ctx),
      modelId: 'podcast',
      options: trackedAs('podcast'),
    },
    [QUIZ_VOCAL]: {
      build: (ctx) => buildQuizVocalGeneration(store, ctx),
      modelId: 'quiz',
      options: trackedAs(QUIZ_VOCAL),
    },
    image: {
      build: (ctx) => buildImageGeneration(store, ctx),
      modelId: 'mistral-large-latest',
      options: trackedAs('image', { checkRawMarkdown: true }),
    },
    // Dictée : auto-routable et TTS-dépendante (TTS_DEPENDENT_AGENTS, generators/auto-agents.ts).
    [DICTATION]: {
      build: (ctx) => buildDictationGeneration(store, ctx),
      modelId: 'summary',
      options: trackedAs(DICTATION),
    },
  };
};

// --- Lot Auto côté serveur (routes/auto-runs.ts) ---

// Gardes du lancement d'un lot : celles de l'analyse de route (modèle routeur), dans le même ordre
// (reprise des modérations, corps, projet, modération, sources, consigne, limite de contexte).
export const prepareAutoLaunch = async (
  store: ProjectStore,
  profileStore: ProfileStore,
  client: Mistral,
  pid: string,
  body: unknown,
): Promise<GenContextResult> => {
  await settleGenerationSources(store, profileStore, client, pid, body);
  return buildGenContext(store, profileStore, pid, body as GenRequestBody, ROUTER_MODEL);
};

// Analyse d'un lot : routage facturé et persisté, plan scindé en étapes exécutables et ignorées.
export const planAutoRun = (store: ProjectStore, client: Mistral, ctx: GenContextBase) => {
  return runAutoRouting(store, client, ctx.markdown, ctx.lang, ctx.ageGroup, ctx.pid);
};

const registerGenerationRoutes = (
  router: Router,
  store: ProjectStore,
  profileStore: ProfileStore,
): void => {
  const defs = buildGenerationDefs(store);
  for (const type of AUTO_AGENT_TYPES) {
    router.post(`/:pid/generate/${type}`, handleGeneration(store, profileStore, defs[type]));
  }
};

const registerQuizReviewRoute = (
  router: Router,
  store: ProjectStore,
  profileStore: ProfileStore,
): void => {
  router.post('/:pid/generate/quiz-review', async (req, res) => {
    const resolved = resolveClient(req);
    if (!resolved.ok) {
      res.status(resolved.status).json({ error: resolved.error });
      return;
    }
    const validation = validateQuizReviewInputs(store, req.params.pid, req.body);
    if (!validation.ok) {
      res.status(validation.status).json({ error: validation.error });
      return;
    }
    const { originalGen, weakQuestions, markdown, reviewLabel } = validation.data;
    scopeToOriginalQuizSources(req, originalGen);
    await handleGeneration(store, profileStore, {
      build: async (ctx) => {
        const data = await generateQuizReview(
          ctx.client,
          markdown,
          weakQuestions,
          ctx.config.models.quiz,
          ctx.lang,
          ctx.ageGroup,
        );
        return {
          id: randomUUID(),
          title: `${reviewLabel} — ${originalGen.title}`,
          createdAt: new Date().toISOString(),
          sourceIds: originalGen.sourceIds,
          type: 'quiz' as const,
          data,
        };
      },
      modelId: 'quiz',
      options: { skipContextCheck: true, agentName: 'quiz-review', trackedType: 'quiz' },
    })(req, res);
  });
};

// Remédiation post-quiz : mêmes inputs que quiz-review (generationId + weakQuestions,
// validés par validateQuizReviewInputs AVANT addPendingEntry), mais produit une fiche
// summary ciblée sur les notions ratées. Le client appelle les deux routes en parallèle
// (cf. src/components/quiz.ts remediate).
const registerRemediationSummaryRoute = (
  router: Router,
  store: ProjectStore,
  profileStore: ProfileStore,
): void => {
  router.post('/:pid/generate/remediation-summary', async (req, res) => {
    const resolved = resolveClient(req);
    if (!resolved.ok) {
      res.status(resolved.status).json({ error: resolved.error });
      return;
    }
    const validation = validateQuizReviewInputs(store, req.params.pid, req.body);
    if (!validation.ok) {
      res.status(validation.status).json({ error: validation.error });
      return;
    }
    const { originalGen, weakQuestions, markdown } = validation.data;
    const remediationLabel = remediationLabelForLang(req.body.lang || 'fr');
    scopeToOriginalQuizSources(req, originalGen);
    await handleGeneration(store, profileStore, {
      build: async (ctx) => {
        const data = await generateRemediationSummary(
          ctx.client,
          markdown,
          weakQuestions,
          ctx.config.models.summary,
          ctx.lang,
          ctx.ageGroup,
        );
        return {
          id: randomUUID(),
          title: `${remediationLabel} — ${originalGen.title}`,
          createdAt: new Date().toISOString(),
          sourceIds: originalGen.sourceIds,
          type: 'summary' as const,
          data,
        };
      },
      modelId: 'summary',
      options: { skipContextCheck: true, agentName: 'remediation-summary', trackedType: 'summary' },
    })(req, res);
  });
};

const registerRouteAnalysisRoute = (
  router: Router,
  store: ProjectStore,
  profileStore: ProfileStore,
): void => {
  router.post('/:pid/generate/route', async (req, res) => {
    try {
      const resolved = resolveClient(req);
      if (!resolved.ok) {
        res.status(resolved.status).json({ error: resolved.error });
        return;
      }
      // Même contexte que les générations (modèle routeur) : validation, projet, garde de
      // modération, sources, consigne et limite de contexte AVANT l'appel au routeur LLM —
      // sinon l'analyse est facturée et ses `reason` rédigées sur du contenu non vérifié.
      const pid = String(req.params.pid);
      await settleGenerationSources(store, profileStore, resolved.client, pid, req.body);
      const built = buildGenContext(store, profileStore, pid, req.body, ROUTER_MODEL);
      if (!built.ok) {
        res.status(built.status).json({ error: built.error });
        return;
      }
      const { ctx } = built;
      const { result: route, usage: routeUsage } = await runWithUsageTracking(() =>
        routeRequest(resolved.client, ctx.markdown, ROUTER_MODEL, ctx.lang, ctx.ageGroup),
      );
      const routeCost = persistUsage(
        store,
        pid,
        `POST /api/projects/${pid}/generate/route`,
        routeUsage,
      );
      logger.info('route', `plan: [${route.plan.map((s) => s.agent).join(', ')}]`);
      res.json({ ...route, ...(routeCost && { costDelta: routeCost.cost }) });
    } catch (e) {
      const failedUsage = (e as { apiUsage?: ApiUsage[] }).apiUsage;
      if (failedUsage?.length) {
        persistUsage(
          store,
          String(req.params.pid),
          `POST /api/projects/${req.params.pid}/generate/route/failed`,
          failedUsage,
        );
      }
      logger.error('route', 'analysis error:', e);
      res.status(500).json({ error: extractErrorCode(e, 'route') });
    }
  });
};

export function generateRoutes(store: ProjectStore, profileStore: ProfileStore): Router {
  const router = Router();
  registerGenerationRoutes(router, store, profileStore);
  registerQuizReviewRoute(router, store, profileStore);
  registerRemediationSummaryRoute(router, store, profileStore);
  registerRouteAnalysisRoute(router, store, profileStore);
  return router;
}
