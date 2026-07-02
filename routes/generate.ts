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
  Source,
  Generation,
  QuizQuestion,
  QuizGeneration,
  AgeGroup,
  FailedStep,
  FailedStepCode,
  Consigne,
  TrackedGenerationType,
  PendingTrackerEntry,
  PromoteErrorOutcome,
  PromoteErrorResponse,
  SummaryRegister,
  DictationItem,
} from '../types.js';
import type { ProjectStore, PromoteResult } from '../store.js';
import type { ProfileStore } from '../profiles.js';
import type { VoiceId } from '../helpers/voice-types.js';
import { getConfig, resolveVoices, getModelLimits } from '../config.js';
import { resolveClient } from '../helpers/mistral-client-factory.js';
import { generateSummary, generateRemediationSummary } from '../generators/summary.js';
import { generateDictation, DICTATION_DEFAULT_WORDS } from '../generators/dictation.js';
import { textToSpeech } from '../generators/tts-provider.js';
import { generateFlashcards } from '../generators/flashcards.js';
import { generateQuiz, generateQuizVocal, generateQuizReview } from '../generators/quiz.js';
import { generatePodcastScript, createPodcastGeneration } from '../generators/podcast.js';
import { generateAudio } from '../generators/tts.js';
import { ttsQuestion, createQuizVocalGeneration } from '../generators/quiz-vocal.js';
import { generateImage } from '../generators/image.js';
import { generateFillBlank } from '../generators/fill-blank.js';
import { runWithUsageTracking } from '../helpers/usage-context.js';
import { persistUsage } from '../helpers/cost-persist.js';
import type { ApiUsage } from '../helpers/pricing.js';
import { routeRequest } from '../generators/router.js';
import { AUTO_AGENTS_SET, type AutoAgentType } from '../generators/auto-agents.js';
import { buildExclusionContext } from '../helpers/diversity.js';
import { autoTitle } from '../helpers/auto-title.js';
import { saveAudioFile } from '../helpers/audio-files.js';
import { logger } from '../helpers/logger.js';
import { extractErrorCode } from '../helpers/error-codes.js';

const assertNever = (x: never): never => {
  throw new Error('exhaustive check failed: ' + JSON.stringify(x));
};

// Centralise le remap PromoteResult (interne store) → PromoteErrorOutcome (wire).
// Source unique pour éviter la dérive entre les 2 dispatch sites (handleGeneration
// + runStep auto). Le switch sur `kind` force exhaustivité au compile-time : un
// nouveau arm de PromoteResult casse la build au lieu de tomber dans le default.
function classifyPromoteFailure(result: Exclude<PromoteResult, { kind: 'promoted' }>): {
  outcome: PromoteErrorOutcome;
  isMissing: boolean;
} {
  switch (result.kind) {
    case 'cancelled':
      return { outcome: 'cancelled', isMissing: false };
    case 'failed':
      return { outcome: 'failed', isMissing: false };
    case 'missing':
      return { outcome: 'failed', isMissing: true };
    default:
      return assertNever(result);
  }
}

const QUIZ_VOCAL = 'quiz-vocal' as const;
const FILL_BLANK = 'fill-blank' as const;
const ROUTER_MODEL = 'mistral-small-latest';
const ERR_PROJECT_NOT_FOUND = 'Projet introuvable';

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
  const header = `CONSIGNE DE REVISION DETECTEE : L'eleve doit reviser les points suivants :\n${topicsList}\n\nConcentre-toi PRIORITAIREMENT sur ces sujets. Le contenu hors-programme peut etre utilise en complement.\n\n---\n\n`;
  return header + markdown;
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

const findBlockedSource = (sources: Source[]): Source | undefined =>
  sources.find((s) => s.moderation?.status && s.moderation.status !== 'safe');

const checkModeration = (
  store: ProjectStore,
  profileStore: ProfileStore,
  pid: string,
  sourceIds?: string[],
): string | null => {
  const project = store.getProject(pid);
  if (!project) return null;
  const profileId = project.meta.profileId;
  if (!profileId) return null;
  const profile = profileStore.get(profileId);
  if (!profile?.useModeration) return null;
  const blocked = findBlockedSource(selectModeratedSources(project, sourceIds));
  return blocked ? blocked.filename : null;
};

interface GenContext {
  // Client Mistral résolu par requête (header `X-EurekAI-AI-Key` > env). Injecté
  // dans le handler après `resolveClient` (auth-first), jamais un singleton global.
  client: Mistral;
  project: ReturnType<ProjectStore['getProject']> & {};
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
  req: Request;
  res: Response;
}

function parseCount(raw: unknown): number | undefined {
  const n = raw ? Number(raw) : undefined;
  return n && Number.isFinite(n) ? Math.min(Math.max(Math.round(n), 1), 50) : undefined;
}

const VALID_AGE_GROUPS: ReadonlySet<AgeGroup> = new Set(['enfant', 'ado', 'etudiant', 'adulte']);

// Predicates individuels (arrow) — evitent le piege Lizard d'agglomeration des
// `function foo()` top-level consecutives, et gardent chaque check sous CCN 8.
const isNonEmptyString = (v: unknown): boolean => typeof v === 'string' && v.length > 0;
const isOptionalNonEmptyString = (v: unknown): boolean => v === undefined || isNonEmptyString(v);
const isOptionalAgeGroup = (v: unknown): boolean =>
  v === undefined || VALID_AGE_GROUPS.has(v as AgeGroup);
const isOptionalNullableString = (v: unknown): boolean =>
  v === undefined || v === null || typeof v === 'string';
const isOptionalBoolean = (v: unknown): boolean => v === undefined || typeof v === 'boolean';
const isOptionalStringArray = (v: unknown): boolean =>
  v === undefined || (Array.isArray(v) && v.every((s) => typeof s === 'string'));
const isOptionalFiniteNumberish = (v: unknown): boolean =>
  v === undefined || v === null || Number.isFinite(Number(v));
const isOptionalRegister = (v: unknown): boolean =>
  v === undefined || v === 'standard' || v === 'falc';

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

const INVALID: ValidateResult = { ok: false, error: 'invalid_input' };
const OK: ValidateResult = { ok: true };

// Validation primitive des inputs de /generate/*. Sans ce check, un payload
// avec types incorrects (lang: 12345, ageGroup: [], profileId: null) etait
// silencieusement accepte et fallback sur les defaults — consommation Mistral
// sans validation, et impossible de distinguer un bug client d'une vraie demande.
// Appele EN AMONT de buildGenContext / addPendingEntry pour rejet 400 propre
// (cf. CLAUDE.md "Validations early extraites des generators").
const allChecksPass = (b: Record<string, unknown>): boolean =>
  isOptionalNonEmptyString(b.lang) &&
  isOptionalAgeGroup(b.ageGroup) &&
  isOptionalNullableString(b.profileId) &&
  isOptionalBoolean(b.useConsigne) &&
  isOptionalStringArray(b.sourceIds) &&
  isOptionalFiniteNumberish(b.count) &&
  isOptionalRegister(b.register) &&
  (b.gid === undefined || typeof b.gid === 'string');

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

function buildGenContext(
  store: ProjectStore,
  profileStore: ProfileStore,
  pid: string,
  body: GenRequestBody,
  modelId?: string,
  options?: { skipContextCheck?: boolean; checkRawMarkdown?: boolean },
):
  | { ok: true; ctx: Omit<GenContext, 'req' | 'res' | 'client'> }
  | { ok: false; error: string; status: number } {
  const validation = validateGenRequestBody(body);
  if (!validation.ok) return { ok: false, error: validation.error, status: 400 };

  const project = store.getProject(pid);
  if (!project) return { ok: false, error: ERR_PROJECT_NOT_FOUND, status: 404 };

  const unsafeSource = checkModeration(store, profileStore, pid, body.sourceIds);
  if (unsafeSource) return { ok: false, error: 'moderation.blocked', status: 400 };

  const rawMarkdown = getMarkdownOrNull(project.sources, body.sourceIds);
  if (rawMarkdown === null) return { ok: false, error: 'no_sources', status: 400 };
  const useConsigne = body.useConsigne !== false;
  const markdown = useConsigne ? applyConsigne(rawMarkdown, project.consigne) : rawMarkdown;
  const hasConsigne =
    useConsigne && !!project.consigne?.found && project.consigne.keyTopics.length > 0;
  const config = getConfig();
  const resolvedModel = configuredModel(config.models, modelId);
  const ctxMarkdown = options?.checkRawMarkdown ? rawMarkdown : markdown;
  const ctxError = options?.skipContextCheck ? null : checkContextLimit(ctxMarkdown, resolvedModel);
  if (ctxError) return { ok: false, error: ctxError, status: 400 };

  const profileId = project.meta?.profileId;
  const profile = profileId ? profileStore.get(profileId) : null;

  return {
    ok: true as const,
    ctx: {
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
    },
  };
}

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

function validateQuizReviewInputs(
  store: ProjectStore,
  pid: string,
  body: { generationId?: string; weakQuestions?: unknown; lang?: string },
): ValidationResult<QuizReviewValidated> {
  if (!body.generationId || !Array.isArray(body.weakQuestions)) {
    return { ok: false, status: 400, error: 'generationId et weakQuestions requis' };
  }
  const originalGen = store.getGeneration(pid, body.generationId);
  if (originalGen?.type !== 'quiz') {
    return { ok: false, status: 404, error: 'Quiz original introuvable' };
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

interface HandleGenerationOptions {
  skipContextCheck?: boolean;
  checkRawMarkdown?: boolean;
  agentName?: string;
  // Si défini, active le pending lifecycle :
  // 1. addPendingEntry au début (409 duplicate_gid si gid déjà pris)
  // 2. promoteToGeneration au succès (PromoteResult dispatch ou 409 si race cancel/fail)
  // 3. markPendingFailed au catch
  // Si absent, fallback comportement legacy (addGeneration direct).
  trackedType?: TrackedGenerationType;
}

// UUID v4 strict : version nibble = '4', variant nibble dans [89ab].
// Aligné sur la regex client (src/app/confirm.ts GID_UUID_V4) — assure que le
// gid produit par crypto.randomUUID() côté client (RFC 4122 v4) traverse
// inchangé et que toute autre valeur (UUID v1/v3/v5, hex shape valide non-v4)
// retombe sur randomUUID() au lieu de propager un gid non conforme.
const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Lit le gid envoyé par le client (body.gid), valide UUID v4 ou retombe sur
// randomUUID. Le client génère son propre gid avant le fetch pour avoir
// abortControllersByGid[gid] immédiatement opérationnel + identifiant stable
// utilisable au moment du payload 200 fallback ou de l'event SSE.
function readClientGid(req: Request): string {
  const candidate = (req.body as { gid?: unknown })?.gid;
  return typeof candidate === 'string' && UUID_V4_REGEX.test(candidate) ? candidate : randomUUID();
}

function makeTrackerEntry(
  type: TrackedGenerationType,
  gid: string,
  sourceIds: string[],
): PendingTrackerEntry {
  return {
    id: gid,
    type,
    status: 'pending',
    startedAt: new Date().toISOString(),
    sourceIds,
  };
}

interface PersistedCostFields {
  usage?: NonNullable<Generation['usage']>;
  cost?: number;
  costBreakdown?: string[];
}

function buildFinalGeneration(
  gid: string,
  gen: Generation,
  persisted: PersistedCostFields | null,
): Generation {
  const final: Generation = { ...gen, id: gid };
  if (persisted) {
    final.usage = persisted.usage;
    final.estimatedCost = persisted.cost;
    final.costBreakdown = persisted.costBreakdown;
  }
  return final;
}

async function runGeneratorAndPersist(
  store: ProjectStore,
  generatorFn: (ctx: GenContext) => Promise<Generation | null>,
  ctx: GenContext,
  pid: string,
  gid: string,
  options: HandleGenerationOptions | undefined,
  res: Response,
): Promise<void> {
  const { result: gen, usage } = await runWithUsageTracking(() => generatorFn(ctx));
  if (!gen) {
    // Defense en profondeur : aucune closure ne devrait return null après le commit
    // d'extraction des validations early. Logger UNCONDITIONAL pour Sentry (la
    // surface de bug doit être visible même si trackedType absent).
    logger.error(
      'generate',
      `generator returned null: type=${options?.trackedType ?? 'unknown'} pid=${pid} gid=${gid}`,
    );
    if (options?.trackedType) store.markPendingFailed(pid, gid, 'internal_error');
    res.status(500).json({ error: 'internal_error' });
    return;
  }
  const persisted = persistUsage(
    store,
    pid,
    `POST /api/projects/${pid}/generate/${gen.type}`,
    usage,
  );
  const finalGen = buildFinalGeneration(gid, gen, persisted);
  if (options?.trackedType) {
    const promoteResult = store.promoteToGeneration(pid, gid, finalGen);
    if (promoteResult.kind === 'promoted') {
      res.json(promoteResult.generation);
      return;
    }
    // Race : cancel/fail a gagné pendant que Mistral travaillait. Pas de réponse
    // 200 fantôme — le client refresh le projet pour voir l'état réel.
    const { outcome, isMissing } = classifyPromoteFailure(promoteResult);
    if (isMissing) {
      // Tracker entry retirée entre addPendingEntry et promote (race deleteProject
      // ou corruption tracker). logger.error pour Sentry — jamais user-visible.
      logger.error('generate', `tracker entry vanished: pid=${pid} gid=${gid}`);
    }
    const body: PromoteErrorResponse = { error: outcome, gid };
    res.status(409).json(body);
    return;
  }
  store.addGeneration(pid, finalGen);
  res.json(finalGen);
}

function handleGenerationFailure(
  store: ProjectStore,
  pid: string,
  gid: string,
  e: unknown,
  options: HandleGenerationOptions | undefined,
  res: Response,
): void {
  const code = extractErrorCode(e, options?.agentName);
  if (options?.trackedType) store.markPendingFailed(pid, gid, code);
  const failedUsage = (e as { apiUsage?: ApiUsage[] }).apiUsage;
  if (failedUsage?.length) {
    persistUsage(store, pid, `POST /api/projects/${pid}/generate/failed`, failedUsage);
  }
  logger.error('generate', 'error:', e);
  res.status(500).json({ error: code });
}

function handleGeneration(
  store: ProjectStore,
  profileStore: ProfileStore,
  generatorFn: (ctx: GenContext) => Promise<Generation | null>,
  modelId?: string,
  options?: HandleGenerationOptions,
) {
  return async (req: Request, res: Response) => {
    const pid = req.params.pid as string;
    // Auth-first : résoudre la clé AVANT toute validation/IO (et donc avant
    // addPendingEntry → aucun pending tracker orphelin si pas de clé).
    const resolved = resolveClient(req);
    if (!resolved.ok) {
      res.status(resolved.status).json({ error: resolved.error });
      return;
    }
    const result = buildGenContext(store, profileStore, pid, req.body, modelId, options);
    if (!result.ok) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    const gid = readClientGid(req);
    if (options?.trackedType) {
      const added = store.addPendingEntry(
        pid,
        makeTrackerEntry(options.trackedType, gid, result.ctx.sourceIds),
      );
      if (!added) {
        res.status(409).json({ error: 'duplicate_gid', gid });
        return;
      }
    }
    try {
      await runGeneratorAndPersist(
        store,
        generatorFn,
        { ...result.ctx, req, res, client: resolved.client },
        pid,
        gid,
        options,
        res,
      );
    } catch (e) {
      handleGenerationFailure(store, pid, gid, e, options, res);
    }
  };
}

interface AutoCtx {
  client: Mistral;
  markdown: string;
  rawMarkdown: string;
  config: ReturnType<typeof getConfig>;
  hasConsigne: boolean;
  lang: string;
  ageGroup: AgeGroup;
  sourceIds: string[];
  count?: number;
  pid: string;
  store: ProjectStore;
  generations: Generation[];
  profileVoices?: { host?: VoiceId; guest?: VoiceId };
  profileId?: string;
}

type StepOutcome =
  | { ok: true; gen: Generation }
  | { ok: false; agent: AutoAgentType; code: FailedStepCode };

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
  const data = await generateSummary(
    ctx.client,
    ctx.markdown,
    ctx.config.models.summary,
    ctx.hasConsigne,
    ctx.lang,
    ctx.ageGroup,
    exclusions,
    ctx.register,
  );
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

const buildQuizGeneration = async (ctx: GenContext): Promise<Generation> => {
  const exclusions = buildExclusionContext(ctx.project.results.generations, 'quiz');
  const data = await generateQuiz(
    ctx.client,
    ctx.markdown,
    ctx.config.models.quiz,
    ctx.lang,
    ctx.ageGroup,
    ctx.count,
    exclusions,
  );
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
  const audioBuffer = await generateAudio(
    podcastResult.script,
    resolveVoices({
      profileVoices: ctx.profileVoices,
      lang: ctx.lang,
      profileId: ctx.profileId,
      flow: 'podcast',
    }),
    { model: ctx.config.ttsModel, mistralClient: ctx.client },
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
  const hostVoice = resolveVoices({
    profileVoices: ctx.profileVoices,
    lang: ctx.lang,
    profileId: ctx.profileId,
    flow: QUIZ_VOCAL,
  }).host;
  const ttsOpts = { model: ctx.config.ttsModel, mistralClient: ctx.client } as const;
  for (const [i, question] of data.entries()) {
    const audioBuffer = await ttsQuestion(question, hostVoice, ttsOpts, ctx.lang);
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
  const hostVoice = resolveVoices({
    profileVoices: ctx.profileVoices,
    lang: ctx.lang,
    profileId: ctx.profileId,
    flow: DICTATION,
  }).host;
  const ttsOpts = { model: ctx.config.ttsModel, mistralClient: ctx.client } as const;
  for (const [i, item] of data.entries()) {
    const audioBuffer = await textToSpeech(item.word, hostVoice, ttsOpts);
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

const buildFillBlankGeneration = async (ctx: GenContext): Promise<Generation> => {
  logger.info(
    FILL_BLANK,
    `sources: ${ctx.project.sources.length}, markdown: ${ctx.markdown.length} chars, lang: ${ctx.lang}, ageGroup: ${ctx.ageGroup}`,
  );
  const exclusions = buildExclusionContext(ctx.project.results.generations, FILL_BLANK);
  const data = await generateFillBlank(
    ctx.client,
    ctx.markdown,
    ctx.config.models.quiz,
    ctx.lang,
    ctx.ageGroup,
    ctx.count,
    exclusions,
  );
  return makeGen(FILL_BLANK, data, ctx);
};

type AutoExecutor = (ctx: AutoCtx) => Promise<Generation>; // eslint-disable-line no-unused-vars, @typescript-eslint/no-unused-vars -- Codacy compte le nom du parametre de type comme unused.

const AUTO_EXECUTORS = new Map<string, AutoExecutor>([
  ['summary', async (ctx) => buildAutoSummary(ctx)],
  ['flashcards', async (ctx) => buildAutoFlashcards(ctx)],
  ['quiz', async (ctx) => buildAutoQuiz(ctx)],
  [FILL_BLANK, async (ctx) => buildAutoFillBlank(ctx)],
  ['podcast', async (ctx) => buildAutoPodcast(ctx)],
  [QUIZ_VOCAL, async (ctx) => buildAutoQuizVocal(ctx)],
  ['image', async (ctx) => buildAutoImage(ctx)],
  [DICTATION, async (ctx) => buildAutoDictation(ctx)],
]);

const buildAutoSummary = async (ctx: AutoCtx): Promise<Generation> => {
  const data = await generateSummary(
    ctx.client,
    ctx.markdown,
    ctx.config.models.summary,
    ctx.hasConsigne,
    ctx.lang,
    ctx.ageGroup,
    buildExclusionContext(ctx.generations, 'summary'),
  );
  return makeGen('summary', data, ctx);
};

const buildAutoFlashcards = async (ctx: AutoCtx): Promise<Generation> => {
  const data = await generateFlashcards(
    ctx.client,
    ctx.markdown,
    ctx.config.models.flashcards,
    ctx.lang,
    ctx.ageGroup,
    ctx.count,
    buildExclusionContext(ctx.generations, 'flashcards'),
  );
  return makeGen('flashcards', data, ctx);
};

const buildAutoQuiz = async (ctx: AutoCtx): Promise<Generation> => {
  const data = await generateQuiz(
    ctx.client,
    ctx.markdown,
    ctx.config.models.quiz,
    ctx.lang,
    ctx.ageGroup,
    ctx.count,
    buildExclusionContext(ctx.generations, 'quiz'),
  );
  return makeGen('quiz', data, ctx);
};

const buildAutoFillBlank = async (ctx: AutoCtx): Promise<Generation> => {
  const data = await generateFillBlank(
    ctx.client,
    ctx.markdown,
    ctx.config.models.quiz,
    ctx.lang,
    ctx.ageGroup,
    ctx.count,
    buildExclusionContext(ctx.generations, FILL_BLANK),
  );
  return makeGen(FILL_BLANK, data, ctx);
};

const buildAutoPodcast = async (ctx: AutoCtx): Promise<Generation> => {
  const podcastResult = await generatePodcastScript(
    ctx.client,
    ctx.markdown,
    ctx.config.models.podcast,
    ctx.lang,
    ctx.ageGroup,
    buildExclusionContext(ctx.generations, 'podcast'),
  );
  const audioBuffer = await generateAudio(
    podcastResult.script,
    resolveVoices({
      profileVoices: ctx.profileVoices,
      lang: ctx.lang,
      profileId: ctx.profileId,
      flow: 'podcast',
    }),
    { model: ctx.config.ttsModel, mistralClient: ctx.client },
  );
  const audioUrl = saveAudioFile(audioBuffer, ctx.store.getProjectDir(ctx.pid), ctx.pid, 'podcast');
  return {
    ...makeGen(
      'podcast',
      {
        script: podcastResult.script,
        audioUrl,
        sourceRefs: podcastResult.sourceRefs,
        speakers: podcastResult.names,
      },
      ctx,
    ),
    lang: ctx.lang,
  } as Generation;
};

const buildAutoQuizVocal = async (ctx: AutoCtx): Promise<Generation> => {
  const data = await generateQuizVocal(
    ctx.client,
    ctx.markdown,
    ctx.config.models.quiz,
    ctx.lang,
    ctx.ageGroup,
    ctx.count,
    buildExclusionContext(ctx.generations, QUIZ_VOCAL),
  );
  const audioUrls = await buildQuizVocalAudioUrls(ctx.store, ctx, data);
  return {
    ...makeGen(QUIZ_VOCAL, data, ctx),
    audioUrls,
    lang: ctx.lang,
    ageGroup: ctx.ageGroup,
  } as Generation;
};

const buildAutoDictation = async (ctx: AutoCtx): Promise<Generation> => {
  const data = await generateDictation(
    ctx.client,
    ctx.markdown,
    ctx.config.models.summary,
    ctx.lang,
    ctx.ageGroup,
    ctx.count ?? DICTATION_DEFAULT_WORDS,
    buildExclusionContext(ctx.generations, DICTATION),
  );
  const audioUrls = await buildDictationAudioUrls(ctx.store, ctx, data);
  return {
    ...makeGen(DICTATION, data, ctx),
    audioUrls,
    lang: ctx.lang,
    ageGroup: ctx.ageGroup,
  } as Generation;
};

const buildAutoImage = async (ctx: AutoCtx): Promise<Generation> => {
  const data = await generateImage(
    ctx.client,
    ctx.rawMarkdown,
    ctx.store.getProjectDir(ctx.pid),
    ctx.pid,
    ctx.lang,
    ctx.ageGroup,
  );
  return makeGen('image', data, ctx);
};

const prepareRouteRequest = (
  store: ProjectStore,
  req: Request,
  res: Response,
): { markdown: string; lang: string; ageGroup: AgeGroup } | null => {
  const validation = validateGenRequestBody(req.body);
  if (!validation.ok) {
    res.status(400).json({ error: validation.error });
    return null;
  }
  const project = store.getProject(String(req.params.pid));
  if (!project) {
    res.status(404).json({ error: ERR_PROJECT_NOT_FOUND });
    return null;
  }
  const rawMarkdown = getMarkdownOrNull(project.sources, req.body.sourceIds);
  if (rawMarkdown === null) {
    res.status(400).json({ error: 'no_sources' });
    return null;
  }
  const useConsigne = req.body.useConsigne !== false;
  const markdown = useConsigne ? applyConsigne(rawMarkdown, project.consigne) : rawMarkdown;
  const ctxError = checkContextLimit(markdown, ROUTER_MODEL);
  if (ctxError) {
    res.status(400).json({ error: ctxError });
    return null;
  }
  return { markdown, lang: req.body.lang || 'fr', ageGroup: req.body.ageGroup || 'enfant' };
};

const pickAutoStepFailureCode = (
  result: Exclude<PromoteResult, { kind: 'promoted' }>,
): FailedStepCode => {
  switch (result.kind) {
    case 'failed':
      return result.code;
    case 'cancelled':
      return 'cancelled';
    case 'missing':
      return 'internal_error';
    default:
      return assertNever(result);
  }
};

const runStepBody = async (
  step: { agent: AutoAgentType },
  executor: AutoExecutor,
  autoCtx: AutoCtx,
  st: ProjectStore,
  pid: string,
  gid: string,
): Promise<StepOutcome> => {
  const { result: gen, usage } = await runWithUsageTracking(() => executor(autoCtx));
  const persisted = persistUsage(
    st,
    pid,
    `POST /api/projects/${pid}/generate/auto/${step.agent}`,
    usage,
  );
  const promoteResult = st.promoteToGeneration(pid, gid, buildFinalGeneration(gid, gen, persisted));
  if (promoteResult.kind === 'promoted') {
    logger.info('auto', `${step.agent} OK`);
    return { ok: true, gen: promoteResult.generation };
  }
  const code = pickAutoStepFailureCode(promoteResult);
  if (promoteResult.kind === 'missing')
    logger.error('auto', `${step.agent} tracker entry vanished: gid=${gid}`);
  else logger.info('auto', `${step.agent} terminal status: ${promoteResult.kind}`);
  return { ok: false, agent: step.agent, code };
};

const runStepCatch = (
  err: unknown,
  step: { agent: AutoAgentType },
  st: ProjectStore,
  pid: string,
  gid: string,
): StepOutcome => {
  const failedUsage = (err as { apiUsage?: ApiUsage[] }).apiUsage;
  if (failedUsage?.length) {
    persistUsage(
      st,
      pid,
      `POST /api/projects/${pid}/generate/auto/${step.agent}/failed`,
      failedUsage,
    );
  }
  const code = extractErrorCode(err, step.agent);
  st.markPendingFailed(pid, gid, code);
  logger.error('auto', `${step.agent} FAILED:`, err);
  return { ok: false, agent: step.agent, code };
};

const runStep = async (
  step: { agent: AutoAgentType },
  autoCtx: AutoCtx,
  st: ProjectStore,
  pid: string,
): Promise<StepOutcome> => {
  const executor = AUTO_EXECUTORS.get(step.agent);
  if (!executor) {
    logger.warn('auto', `Unknown agent "${step.agent}", skipping`);
    return { ok: false, agent: step.agent, code: 'internal_error' };
  }
  const gid = randomUUID();
  const added = st.addPendingEntry(pid, makeTrackerEntry(step.agent, gid, autoCtx.sourceIds));
  if (!added) {
    logger.error('auto', `unexpected duplicate gid for ${step.agent}, skipping`);
    return { ok: false, agent: step.agent, code: 'internal_error' };
  }
  try {
    return await runStepBody(step, executor, autoCtx, st, pid, gid);
  } catch (err) {
    return runStepCatch(err, step, st, pid, gid);
  }
};

const pushStepOutcome = (
  outcome: StepOutcome,
  generations: Generation[],
  failedSteps: FailedStep[],
): void => {
  if (outcome.ok) generations.push(outcome.gen);
  else failedSteps.push({ agent: outcome.agent, code: outcome.code });
};

const pushRejectedStep = (
  reason: unknown,
  step: { agent: AutoAgentType },
  st: ProjectStore,
  pid: string,
  failedSteps: FailedStep[],
): void => {
  logger.error('auto', `${step.agent} unexpected rejection:`, reason);
  const failedUsage = (reason as { apiUsage?: ApiUsage[] })?.apiUsage;
  if (failedUsage?.length) {
    persistUsage(
      st,
      pid,
      `POST /api/projects/${pid}/generate/auto/${step.agent}/failed`,
      failedUsage,
    );
  }
  failedSteps.push({ agent: step.agent, code: extractErrorCode(reason, step.agent) });
};

const executePlan = async (
  plan: Array<{ agent: AutoAgentType }>,
  autoCtx: AutoCtx,
  st: ProjectStore,
  pid: string,
  generations: Generation[],
  failedSteps: FailedStep[],
): Promise<void> => {
  const settled = await Promise.all(
    plan.map(async (step) => {
      try {
        return { step, outcome: await runStep(step, autoCtx, st, pid) } as const;
      } catch (reason) {
        return { step, reason } as const;
      }
    }),
  );
  settled.forEach((result) => {
    if ('reason' in result) pushRejectedStep(result.reason, result.step, st, pid, failedSteps);
    else pushStepOutcome(result.outcome, generations, failedSteps);
  });
};

const TTS_DEPENDENT_AGENTS: ReadonlySet<AutoAgentType> = new Set<AutoAgentType>([
  'podcast',
  QUIZ_VOCAL,
  DICTATION,
]);

const splitByTtsAvailability = <T extends { agent: AutoAgentType }>(
  plan: T[],
  ttsAvailable: boolean,
): { runnable: T[]; ttsSkipped: T[] } => {
  if (ttsAvailable) return { runnable: plan, ttsSkipped: [] };
  const runnable: T[] = [];
  const ttsSkipped: T[] = [];
  for (const step of plan) {
    if (TTS_DEPENDENT_AGENTS.has(step.agent)) ttsSkipped.push(step);
    else runnable.push(step);
  }
  return { runnable, ttsSkipped };
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
  persistUsage(store, pid, `POST /api/projects/${pid}/generate/auto/route`, usage);
  logger.info('route', `plan: [${route.plan.map((s) => s.agent).join(', ')}]`);
  const { executable, skipped } = splitByAutoExecutable(route.plan);
  const { runnable, ttsSkipped } = splitByTtsAvailability(executable, true);
  if (ttsSkipped.length > 0) {
    logger.warn(
      'auto',
      `skipped (tts unavailable): [${ttsSkipped.map((s) => s.agent).join(', ')}]`,
    );
  }
  if (skipped.length > 0) {
    logger.warn(
      'auto',
      `skipped (non-auto-executable): [${skipped.map((s) => s.agent).join(', ')}]`,
    );
  }
  return { executable: runnable, skipped: [...skipped, ...ttsSkipped] };
};

const toAutoCtx = (
  store: ProjectStore,
  baseCtx: Omit<GenContext, 'req' | 'res' | 'client'>,
  client: Mistral,
): AutoCtx => ({
  client,
  markdown: baseCtx.markdown,
  rawMarkdown: baseCtx.rawMarkdown,
  config: baseCtx.config,
  hasConsigne: baseCtx.hasConsigne,
  lang: baseCtx.lang,
  ageGroup: baseCtx.ageGroup,
  sourceIds: baseCtx.sourceIds,
  count: baseCtx.count,
  pid: baseCtx.pid,
  store,
  generations: baseCtx.project.results.generations,
  profileVoices: baseCtx.profileVoices,
  profileId: baseCtx.profileId,
});

const registerCoreGenerationRoutes = (
  router: Router,
  store: ProjectStore,
  profileStore: ProfileStore,
): void => {
  router.post(
    '/:pid/generate/summary',
    handleGeneration(store, profileStore, buildSummaryGeneration, undefined, {
      agentName: 'summary',
      trackedType: 'summary',
    }),
  );
  router.post(
    '/:pid/generate/flashcards',
    handleGeneration(store, profileStore, buildFlashcardsGeneration, 'flashcards', {
      agentName: 'flashcards',
      trackedType: 'flashcards',
    }),
  );
  router.post(
    '/:pid/generate/quiz',
    handleGeneration(store, profileStore, buildQuizGeneration, 'quiz', {
      agentName: 'quiz',
      trackedType: 'quiz',
    }),
  );
};

const registerMediaGenerationRoutes = (
  router: Router,
  store: ProjectStore,
  profileStore: ProfileStore,
): void => {
  router.post(
    '/:pid/generate/podcast',
    handleGeneration(store, profileStore, (ctx) => buildPodcastGeneration(store, ctx), 'podcast', {
      agentName: 'podcast',
      trackedType: 'podcast',
    }),
  );
  router.post(
    '/:pid/generate/quiz-vocal',
    handleGeneration(store, profileStore, (ctx) => buildQuizVocalGeneration(store, ctx), 'quiz', {
      agentName: QUIZ_VOCAL,
      trackedType: QUIZ_VOCAL,
    }),
  );
  router.post(
    '/:pid/generate/image',
    handleGeneration(
      store,
      profileStore,
      (ctx) => buildImageGeneration(store, ctx),
      'mistral-large-latest',
      { checkRawMarkdown: true, agentName: 'image', trackedType: 'image' },
    ),
  );
  router.post(
    '/:pid/generate/fill-blank',
    handleGeneration(store, profileStore, buildFillBlankGeneration, 'quiz', {
      agentName: FILL_BLANK,
      trackedType: FILL_BLANK,
    }),
  );
  // Dictée : auto-routable (AUTO_AGENT_TYPES) et TTS-dépendante (référencée
  // dans TTS_DEPENDENT_AGENTS).
  router.post(
    '/:pid/generate/dictation',
    handleGeneration(
      store,
      profileStore,
      (ctx) => buildDictationGeneration(store, ctx),
      'summary',
      {
        agentName: DICTATION,
        trackedType: DICTATION,
      },
    ),
  );
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
    await handleGeneration(
      store,
      profileStore,
      async (ctx) => {
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
      'quiz',
      { skipContextCheck: true, agentName: 'quiz-review', trackedType: 'quiz' },
    )(req, res);
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
    await handleGeneration(
      store,
      profileStore,
      async (ctx) => {
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
      'summary',
      { skipContextCheck: true, agentName: 'remediation-summary', trackedType: 'summary' },
    )(req, res);
  });
};

const registerRouteAnalysisRoute = (router: Router, store: ProjectStore): void => {
  router.post('/:pid/generate/route', async (req, res) => {
    try {
      const resolved = resolveClient(req);
      if (!resolved.ok) {
        res.status(resolved.status).json({ error: resolved.error });
        return;
      }
      const prepared = prepareRouteRequest(store, req, res);
      if (!prepared) return;
      const pid = String(req.params.pid);
      const { result: route, usage: routeUsage } = await runWithUsageTracking(() =>
        routeRequest(
          resolved.client,
          prepared.markdown,
          ROUTER_MODEL,
          prepared.lang,
          prepared.ageGroup,
        ),
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

const sendAutoRouteResponse = (
  res: Response,
  executablePlan: Array<{ agent: AutoAgentType }>,
  skippedSteps: Array<{ agent: string }>,
  generations: Generation[],
  failedSteps: FailedStep[],
): void => {
  const allFailed = generations.length === 0 && failedSteps.length > 0;
  res.status(allFailed ? 502 : 200).json({
    route: executablePlan,
    generations,
    ...(failedSteps.length > 0 && { failedSteps }),
    ...(skippedSteps.length > 0 && { skippedSteps }),
    ...(allFailed && { error: 'all_steps_failed' }),
  });
};

const handleAutoRouteError = (
  store: ProjectStore,
  req: Request,
  res: Response,
  e: unknown,
): void => {
  const failedUsage = (e as { apiUsage?: ApiUsage[] }).apiUsage;
  if (failedUsage?.length) {
    persistUsage(
      store,
      String(req.params.pid),
      `POST /api/projects/${req.params.pid}/generate/auto/failed`,
      failedUsage,
    );
  }
  logger.error('auto', 'error:', e);
  res.status(500).json({ error: extractErrorCode(e) });
};

const registerAutoRoute = (
  router: Router,
  store: ProjectStore,
  profileStore: ProfileStore,
): void => {
  router.post('/:pid/generate/auto', async (req, res) => {
    try {
      const resolved = resolveClient(req);
      if (!resolved.ok) {
        res.status(resolved.status).json({ error: resolved.error });
        return;
      }
      const built = buildGenContext(store, profileStore, req.params.pid, req.body, ROUTER_MODEL);
      if (!built.ok) {
        res.status(built.status).json({ error: built.error });
        return;
      }
      const { ctx } = built;
      const { executable: executablePlan, skipped: skippedSteps } = await runAutoRouting(
        store,
        resolved.client,
        ctx.markdown,
        ctx.lang,
        ctx.ageGroup,
        ctx.pid,
      );
      const generations: Generation[] = [];
      const failedSteps: FailedStep[] = [];
      await executePlan(
        executablePlan,
        toAutoCtx(store, ctx, resolved.client),
        store,
        ctx.pid,
        generations,
        failedSteps,
      );
      sendAutoRouteResponse(res, executablePlan, skippedSteps, generations, failedSteps);
    } catch (e) {
      handleAutoRouteError(store, req, res, e);
    }
  });
};

export function generateRoutes(store: ProjectStore, profileStore: ProfileStore): Router {
  const router = Router();
  registerCoreGenerationRoutes(router, store, profileStore);
  registerQuizReviewRoute(router, store, profileStore);
  registerRemediationSummaryRoute(router, store, profileStore);
  registerMediaGenerationRoutes(router, store, profileStore);
  registerRouteAnalysisRoute(router, store);
  registerAutoRoute(router, store, profileStore);
  return router;
}
