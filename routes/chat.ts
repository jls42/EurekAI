/* eslint-disable
   @typescript-eslint/no-misused-promises,
   @typescript-eslint/no-redundant-type-constituents,
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-argument,
   @typescript-eslint/no-unsafe-member-access
   --
   Codacy lance ESLint sans notre project TS complet sur les handlers Express/Mistral;
   lint:ci local reste la couverture type-aware. */
import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { Mistral } from '@mistralai/mistralai';
import type { Request, Response } from 'express';
import type { ProjectStore } from '../store.js';
import type { ChatMessage, Consigne, Generation, AgeGroup } from '../types.js';
import { getConfig } from '../config.js';
import { chatWithSources } from '../generators/chat.js';
import { getMarkdown, applyConsigne } from './generate.js';
import { chatNoSourcesNotice } from '../prompts.js';
import { generateSummary } from '../generators/summary.js';
import { generateFlashcards } from '../generators/flashcards.js';
import { generateQuiz } from '../generators/quiz.js';
import { generateFillBlank } from '../generators/fill-blank.js';
import { ProfileStore } from '../profiles.js';
import { moderateContent } from '../generators/moderation.js';
import { consigneUsable, moderationRejection } from '../helpers/moderation-http.js';
import {
  activeModerationCategories,
  moderationProfileOf,
  type ModerationProfile,
} from '../helpers/moderation-profile.js';
import { autoTitle } from '../helpers/auto-title.js';
import { runWithUsageTracking } from '../helpers/usage-context.js';
import { persistUsage } from '../helpers/cost-persist.js';
import type { ApiUsage } from '../helpers/pricing.js';
import { logger } from '../helpers/logger.js';

const ERR_PROJECT_NOT_FOUND = 'Projet introuvable';
const CHAT_ROUTE_PATH = '/:pid/chat';
const FILL_BLANK = 'fill-blank';
import { extractErrorCode } from '../helpers/error-codes.js';
import { resolveClient } from '../helpers/mistral-client-factory.js';
import { selectChatSources } from '../helpers/chat-sources.js';
import {
  MODERATION_WAIT_MS,
  settleSourceModeration,
  type SettleDeps,
} from '../helpers/source-moderation.js';
import { INVALID_INPUT, readLocaleFields } from '../helpers/request-validation.js';

type ChatProject = NonNullable<ReturnType<ProjectStore['getProject']>>;

interface ChatRequestContext {
  pid: string;
  project: ChatProject;
  profile: ReturnType<ProfileStore['get']>;
  message: string;
  lang: string;
  ageGroup: AgeGroup;
  useConsigne: boolean;
}

class ChatValidationError {
  constructor(
    public status: number,
    public error: string,
  ) {}
}

type ResolvedProject = {
  pid: string;
  project: ChatProject;
  profile: ReturnType<ProfileStore['get']>;
};

const resolveProjectAndProfile = (
  req: { params: { pid: string } },
  store: ProjectStore,
  profileStore: ProfileStore,
): ResolvedProject | ChatValidationError => {
  const pid = req.params.pid;
  const project = store.getProject(pid);
  if (!project) return new ChatValidationError(404, ERR_PROJECT_NOT_FOUND);
  const profile = moderationProfileOf(project, profileStore);
  if (profile?.chatEnabled === false) return new ChatValidationError(403, 'chat.ageRestricted');
  return { pid, project, profile };
};

type ChatBody = { message: string; lang: string; ageGroup: AgeGroup; useConsigne: boolean };

interface RawChatBody {
  message?: unknown;
  lang?: unknown;
  ageGroup?: unknown;
  useConsigne?: unknown;
}

// Bascule « consigne » du projet (écartée par l'enfant, cf. front `useConsigne`) : absente = true
// (appelants antérieurs), booléen accepté tel quel, autre type → null (400 invalid_input, comme
// en génération).
const readUseConsigne = (value: unknown): boolean | null => {
  if (value === undefined) return true;
  return typeof value === 'boolean' ? value : null;
};

// lang/ageGroup partent dans le prompt système du chat et des outils, useConsigne décide de la
// consigne des outils : validés ici (400 invalid_input), AVANT la modération, qui ne lit que le
// message.
const parseChatBody = (body: RawChatBody | undefined): ChatBody | ChatValidationError => {
  const { message, lang, ageGroup } = body ?? {};
  // Un message fait d'espaces est refusé comme un message absent : il s'enregistrait vide (trim).
  if (typeof message !== 'string' || message.trim() === '')
    return new ChatValidationError(400, 'message requis');
  const locale = readLocaleFields(lang, ageGroup);
  const useConsigne = readUseConsigne(body?.useConsigne);
  if (!locale || useConsigne === null) return new ChatValidationError(400, INVALID_INPUT);
  return { message, ...locale, useConsigne };
};

// unsafe → 400 chat.moderationBlocked ; error (contrat rompu) → 503 moderation.error. Les
// exceptions de l'API se propagent : le catch de la route répond en 500 JSON (extractErrorCode).
// Message non vérifié si la modération est inactive OU sans catégorie bloquée (`[]`) : rien à
// bloquer, pas d'appel facturé.
const runChatModeration = async (
  client: Mistral,
  profile: ModerationProfile | null,
  message: string,
): Promise<ChatValidationError | null> => {
  const categories = activeModerationCategories(profile);
  if (!categories || categories.length === 0) return null;
  const modResult = await moderateContent(client, message.trim(), categories);
  const rejection = moderationRejection(modResult.status, 'chat.moderationBlocked');
  return rejection ? new ChatValidationError(rejection.status, rejection.error) : null;
};

async function validateChatRequest(
  req: { params: { pid: string }; body: RawChatBody | undefined },
  store: ProjectStore,
  profileStore: ProfileStore,
  client: Mistral,
): Promise<ChatRequestContext | ChatValidationError> {
  const resolved = resolveProjectAndProfile(req, store, profileStore);
  if (resolved instanceof ChatValidationError) return resolved;

  const body = parseChatBody(req.body);
  if (body instanceof ChatValidationError) return body;

  const modError = await runChatModeration(client, resolved.profile, body.message);
  if (modError) return modError;

  return { ...resolved, ...body };
}

interface ToolCallCtx {
  client: Mistral;
  markdown: string;
  config: ReturnType<typeof getConfig>;
  lang: string;
  ageGroup: AgeGroup;
  sourceIds: string[];
  hasConsigne: boolean;
}

type ChatToolExecutor = (ctx: ToolCallCtx) => Promise<Generation>; // eslint-disable-line no-unused-vars, @typescript-eslint/no-unused-vars -- Codacy compte le nom du parametre de type comme unused.

const CHAT_TOOL_EXECUTORS = new Map<string, ChatToolExecutor>([
  [
    'summary',
    async (ctx) => {
      const data = await generateSummary(ctx.client, ctx.markdown, {
        model: ctx.config.models.summary,
        hasConsigne: ctx.hasConsigne,
        lang: ctx.lang,
        ageGroup: ctx.ageGroup,
      });
      return {
        id: randomUUID(),
        title: autoTitle('summary', data, ctx.lang),
        createdAt: new Date().toISOString(),
        sourceIds: ctx.sourceIds,
        type: 'summary',
        data,
      };
    },
  ],
  [
    'flashcards',
    async (ctx) => {
      const data = await generateFlashcards(
        ctx.client,
        ctx.markdown,
        ctx.config.models.flashcards,
        ctx.lang,
        ctx.ageGroup,
      );
      return {
        id: randomUUID(),
        title: autoTitle('flashcards', data, ctx.lang),
        createdAt: new Date().toISOString(),
        sourceIds: ctx.sourceIds,
        type: 'flashcards',
        data,
      };
    },
  ],
  [
    'quiz',
    async (ctx) => {
      const data = await generateQuiz(
        ctx.client,
        ctx.markdown,
        ctx.config.models.quiz,
        ctx.lang,
        ctx.ageGroup,
      );
      return {
        id: randomUUID(),
        title: autoTitle('quiz', data, ctx.lang),
        createdAt: new Date().toISOString(),
        sourceIds: ctx.sourceIds,
        type: 'quiz',
        data,
      };
    },
  ],
  [
    FILL_BLANK,
    async (ctx) => {
      const data = await generateFillBlank(
        ctx.client,
        ctx.markdown,
        ctx.config.models.quiz,
        ctx.lang,
        ctx.ageGroup,
      );
      return {
        id: randomUUID(),
        title: autoTitle(FILL_BLANK, data, ctx.lang),
        createdAt: new Date().toISOString(),
        sourceIds: ctx.sourceIds,
        type: FILL_BLANK,
        data,
      };
    },
  ],
]);

async function processChatToolCalls(
  toolCalls: string[],
  ctx: ToolCallCtx,
  store: ProjectStore,
  pid: string,
): Promise<{
  generatedIds: string[];
  generations: Generation[];
  failedTools: string[];
  failedCost: number;
}> {
  const generatedIds: string[] = [];
  const generations: Generation[] = [];
  const failedTools: string[] = [];
  let failedCost = 0;

  for (const call of toolCalls) {
    try {
      const type = call.replace('generate_', '');
      const executor = CHAT_TOOL_EXECUTORS.get(type);
      if (executor) {
        const { result: gen, usage } = await runWithUsageTracking(() => executor(ctx));
        const persisted = persistUsage(
          store,
          pid,
          `POST /api/projects/${pid}/chat/tool/${type}`,
          usage,
        );
        if (persisted) {
          gen.usage = persisted.usage;
          gen.estimatedCost = persisted.cost;
          gen.costBreakdown = persisted.costBreakdown;
        }
        store.addGeneration(pid, gen);
        generatedIds.push(gen.id);
        generations.push(gen);
        logger.info('chat', `tool ${type} generated`);
      }
    } catch (err) {
      const failedUsage = (err as { apiUsage?: ApiUsage[] }).apiUsage;
      if (failedUsage?.length) {
        const persisted = persistUsage(
          store,
          pid,
          `POST /api/projects/${pid}/chat/tool/${call}/failed`,
          failedUsage,
        );
        if (persisted) failedCost += persisted.cost;
      }
      logger.error('chat', `tool ${call} failed:`, err);
      failedTools.push(call);
    }
  }

  return { generatedIds, generations, failedTools, failedCost };
}

// Tour enregistré au contenu vide : réponse vide d'avant le correctif, ou réponse vide qui a lancé
// une génération (gardée pour ses generatedIds).
const hasContent = (m: { content?: unknown }): boolean => {
  return typeof m.content === 'string' && m.content.trim() !== '';
};

// Les tours vides ne partent jamais à l'API : elle refuse un tour assistant vide (400 « Assistant
// message must have either content or tool_calls », mesuré), et un seul tour vide enregistré
// bloquait tout le chat du projet. Deux tours `user` consécutifs, eux, sont acceptés (mesuré).
const appendUserAndBuildHistory = (
  store: ProjectStore,
  pid: string,
  project: ChatProject,
  message: string,
): Array<{ role: string; content: string }> => {
  const existing = project.chat?.messages ?? [];
  const userMsg: ChatMessage = {
    role: 'user',
    content: message.trim(),
    timestamp: new Date().toISOString(),
  };
  const history = [...existing.filter(hasContent), userMsg].slice(-50).map((m) => ({
    role: m.role,
    content: m.content,
  }));
  store.appendChatMessage(pid, userMsg);
  return history;
};

// Modérations en attente ou en erreur reprises AVANT le filtre des sources (attente de
// MODERATION_WAIT_MS.chat au plus), puis projet relu : une source vérifiée entre dans le contexte
// au lieu d'en être exclue. Profil propriétaire non modéré : rien n'est lancé. Repli sur le projet
// déjà chargé s'il n'est plus lisible.
const settleChatProject = async (
  deps: SettleDeps,
  pid: string,
  project: ChatProject,
): Promise<ChatProject> => {
  await settleSourceModeration(deps, pid, { waitMs: MODERATION_WAIT_MS.chat });
  return deps.store.getProject(pid) ?? project;
};

// Sources du chat (contexte ET outils), calculées une fois par message : sans ce filtre, une source
// que la génération refuse (unsafe/error/pending) partait quand même au LLM et dans les générations
// par outil. Seul le NOMBRE de sources exclues est journalisé, jamais leur contenu ni leur nom.
const resolveChatSources = (
  project: ChatProject,
  profile: ChatRequestContext['profile'],
): ChatProject['sources'] => {
  const sources = selectChatSources(project.sources, profile);
  const excluded = project.sources.length - sources.length;
  if (excluded > 0) {
    logger.info('chat', `moderation: ${excluded} source(s) excluded from chat context and tools`);
  }
  return sources;
};

// `lang` obligatoire (pas de défaut) : le typechecker casse tout call site qui
// oublierait de propager la langue du placeholder.
const buildSourceContext = (sources: ChatProject['sources'], lang: string): string =>
  sources.length > 0 ? getMarkdown(sources) : chatNoSourcesNotice(lang);

type ToolPhaseResult = {
  generatedIds: string[];
  generations: Generation[];
  failedTools: string[];
  failedCost: number;
};

const EMPTY_TOOL_PHASE: ToolPhaseResult = {
  generatedIds: [],
  generations: [],
  failedTools: [],
  failedCost: 0,
};

// Consigne des générations par outil : celle du projet si l'enfant ne l'a pas écartée
// (useConsigne) et si elle est utilisable pour le profil propriétaire (consigneUsable, même
// garde que la génération) ; null sinon. Le prompt système du chat ne la reçoit jamais (seules
// les sources autorisées y entrent) : ce point est le seul usage de la consigne dans le chat.
const resolveChatConsigne = (
  project: ChatProject,
  profile: ChatRequestContext['profile'],
  useConsigne: boolean,
): Consigne | null => {
  const { consigne } = project;
  if (!useConsigne || !consigne) return null;
  const blocked = activeModerationCategories(profile);
  return consigneUsable(consigne, project.sources, blocked) ? consigne : null;
};

interface RunToolCallPhaseArgs {
  toolCalls: string[];
  // Sources autorisées (resolveChatSources) : jamais project.sources, qui contient aussi les
  // sources que la modération exclut.
  sources: ChatProject['sources'];
  // Consigne déjà gardée (resolveChatConsigne), null = aucune.
  consigne: Consigne | null;
  lang: string;
  ageGroup: AgeGroup;
  config: ReturnType<typeof getConfig>;
  client: Mistral;
  store: ProjectStore;
  pid: string;
}

const runToolCallPhase = async (args: RunToolCallPhaseArgs): Promise<ToolPhaseResult> => {
  const { toolCalls, sources, consigne, lang, ageGroup, config, client, store, pid } = args;
  if (toolCalls.length === 0 || sources.length === 0) return EMPTY_TOOL_PHASE;
  const rawMarkdown = getMarkdown(sources);
  const markdown = consigne ? applyConsigne(rawMarkdown, consigne) : rawMarkdown;
  const hasConsigne = consigne !== null;
  const sourceIds = sources.map((s) => s.id);
  return processChatToolCalls(
    toolCalls,
    { client, markdown, config, lang, ageGroup, sourceIds, hasConsigne },
    store,
    pid,
  );
};

// Réponse vide qui n'a rien lancé : rien à afficher ni à rejouer (le front montre un repli). Avec
// une génération, le tour est gardé pour ses generatedIds ; l'historique l'écarte de l'API.
const appendAssistantMessage = (
  store: ProjectStore,
  pid: string,
  reply: string,
  generatedIds: string[],
): void => {
  if (reply.trim() === '' && generatedIds.length === 0) return;
  const assistantMsg: ChatMessage = {
    role: 'assistant',
    content: reply,
    timestamp: new Date().toISOString(),
    generatedIds: generatedIds.length > 0 ? generatedIds : undefined,
  };
  store.appendChatMessage(pid, assistantMsg);
};

const buildChatResponseBody = (
  reply: string,
  tools: ToolPhaseResult,
  chatCost: { cost: number } | null | undefined,
) => {
  const totalCostDelta = (chatCost?.cost ?? 0) + tools.failedCost;
  return {
    reply,
    generatedIds: tools.generatedIds,
    generations: tools.generations,
    ...(tools.failedTools.length > 0 && { failedTools: tools.failedTools }),
    ...(totalCostDelta > 0 && { costDelta: totalCostDelta }),
  };
};

const handleChatError = (e: unknown, store: ProjectStore, pid: string, res: Response): void => {
  const failedUsage = (e as { apiUsage?: ApiUsage[] }).apiUsage;
  if (failedUsage?.length) {
    persistUsage(store, pid, `POST /api/projects/${pid}/chat/failed`, failedUsage);
  }
  logger.error('chat', 'error:', e);
  res.status(500).json({ error: extractErrorCode(e, 'chat') });
};

export function chatRoutes(store: ProjectStore, profileStore: ProfileStore): Router {
  const router = Router();

  // Auth-first : résout le client (header > env) ou répond 4xx stable.
  const resolveOr4xx = (req: Request, res: Response): Mistral | null => {
    const r = resolveClient(req);
    if (r.ok) return r.client;
    res.status(r.status).json({ error: r.error });
    return null;
  };

  // Send message
  router.post(CHAT_ROUTE_PATH, async (req, res) => {
    const client = resolveOr4xx(req, res);
    if (!client) return;
    const pid = String(req.params.pid);
    try {
      const validated = await validateChatRequest(
        req as Request<{ pid: string }, unknown, RawChatBody | undefined>,
        store,
        profileStore,
        client,
      );
      if (validated instanceof ChatValidationError) {
        res.status(validated.status).json({ error: validated.error });
        return;
      }
      const { profile, message, lang, ageGroup } = validated;
      const deps = { store, profileStore, client };
      const project = await settleChatProject(deps, pid, validated.project);
      const sources = resolveChatSources(project, profile);
      const consigne = resolveChatConsigne(project, profile, validated.useConsigne);
      const historyForApi = appendUserAndBuildHistory(store, pid, project, message);
      const sourceContext = buildSourceContext(sources, lang);
      const config = getConfig();

      const { result, usage: chatUsage } = await runWithUsageTracking(() =>
        chatWithSources(client, historyForApi, sourceContext, config.models.chat, lang, ageGroup),
      );
      const chatCost = persistUsage(store, pid, `POST /api/projects/${pid}/chat`, chatUsage);

      const tools = await runToolCallPhase({
        toolCalls: result.toolCalls,
        sources,
        consigne,
        lang,
        ageGroup,
        config,
        client,
        store,
        pid,
      });

      appendAssistantMessage(store, pid, result.reply, tools.generatedIds);

      res.json(buildChatResponseBody(result.reply, tools, chatCost));
    } catch (e) {
      handleChatError(e, store, pid, res);
    }
  });

  // Get chat history
  router.get(CHAT_ROUTE_PATH, (req, res) => {
    const project = store.getProject(req.params.pid);
    if (!project) {
      res.status(404).json({ error: ERR_PROJECT_NOT_FOUND });
      return;
    }
    res.json(project.chat || { messages: [] });
  });

  // Clear chat
  router.delete(CHAT_ROUTE_PATH, (req, res) => {
    const project = store.getProject(req.params.pid);
    if (!project) {
      res.status(404).json({ error: ERR_PROJECT_NOT_FOUND });
      return;
    }
    store.clearChat(req.params.pid);
    res.json({ ok: true });
  });

  return router;
}
