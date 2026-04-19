import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { Mistral } from '@mistralai/mistralai';
import type { Request, Response } from 'express';
import type { ProjectStore } from '../store.js';
import type { ChatMessage, Generation, AgeGroup } from '../types.js';
import { getConfig } from '../config.js';
import { chatWithSources } from '../generators/chat.js';
import { getMarkdown, applyConsigne } from './generate.js';
import { generateSummary } from '../generators/summary.js';
import { generateFlashcards } from '../generators/flashcards.js';
import { generateQuiz } from '../generators/quiz.js';
import { generateFillBlank } from '../generators/fill-blank.js';
import { ProfileStore, MODERATION_CATEGORIES } from '../profiles.js';
import { moderateContent } from '../generators/moderation.js';
import { autoTitle } from '../helpers/auto-title.js';
import { runWithUsageTracking } from '../helpers/usage-context.js';
import { persistUsage } from '../helpers/cost-persist.js';
import type { ApiUsage } from '../helpers/pricing.js';
import { logger } from '../helpers/logger.js';
import { extractErrorCode } from '../helpers/error-codes.js';

interface ChatRequestContext {
  pid: string;
  project: ReturnType<ProjectStore['getProject']> & {};
  profile: ReturnType<ProfileStore['get']>;
  message: string;
  lang: string;
  ageGroup: AgeGroup;
}

class ChatValidationError {
  constructor(
    public status: number,
    public error: string,
  ) {}
}

type ResolvedProject = {
  pid: string;
  project: ReturnType<ProjectStore['getProject']> & {};
  profile: ReturnType<ProfileStore['get']>;
};

const resolveProjectAndProfile = (
  req: { params: { pid: string } },
  store: ProjectStore,
  profileStore: ProfileStore,
): ResolvedProject | ChatValidationError => {
  const pid = req.params.pid;
  const project = store.getProject(pid);
  if (!project) return new ChatValidationError(404, 'Projet introuvable');
  const profileId = project.meta.profileId;
  const profile = profileId ? profileStore.get(profileId) : null;
  if (profile?.chatEnabled === false) return new ChatValidationError(403, 'chat.ageRestricted');
  return { pid, project, profile };
};

type ChatBody = { message: string; lang: string; ageGroup: AgeGroup };

interface RawChatBody {
  message?: unknown;
  lang?: string;
  ageGroup?: AgeGroup;
}

const parseChatBody = (body: RawChatBody | undefined): ChatBody | ChatValidationError => {
  const { message, lang: reqLang, ageGroup: reqAgeGroup } = body ?? {};
  if (!message || typeof message !== 'string')
    return new ChatValidationError(400, 'message requis');
  return {
    message,
    lang: reqLang || 'fr',
    ageGroup: reqAgeGroup || 'enfant',
  };
};

const runChatModeration = async (
  client: Mistral,
  profile: ReturnType<ProfileStore['get']>,
  message: string,
): Promise<ChatValidationError | null> => {
  if (!profile?.useModeration) return null;
  const categories = profile.moderationCategories ?? MODERATION_CATEGORIES[profile.ageGroup] ?? [];
  if (categories.length === 0) return null;
  const modResult = await moderateContent(client, message.trim(), categories);
  if (modResult.status !== 'safe') return new ChatValidationError(400, 'chat.moderationBlocked');
  return null;
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

const CHAT_TOOL_EXECUTORS: Record<string, (ctx: ToolCallCtx) => Promise<Generation>> = {
  summary: async (ctx) => {
    const data = await generateSummary(
      ctx.client,
      ctx.markdown,
      ctx.config.models.summary,
      ctx.hasConsigne,
      ctx.lang,
      ctx.ageGroup,
    );
    return {
      id: randomUUID(),
      title: autoTitle('summary', data, ctx.lang),
      createdAt: new Date().toISOString(),
      sourceIds: ctx.sourceIds,
      type: 'summary',
      data,
    };
  },
  flashcards: async (ctx) => {
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
  quiz: async (ctx) => {
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
  'fill-blank': async (ctx) => {
    const data = await generateFillBlank(
      ctx.client,
      ctx.markdown,
      ctx.config.models.quiz,
      ctx.lang,
      ctx.ageGroup,
    );
    return {
      id: randomUUID(),
      title: autoTitle('fill-blank', data, ctx.lang),
      createdAt: new Date().toISOString(),
      sourceIds: ctx.sourceIds,
      type: 'fill-blank',
      data,
    };
  },
};

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
      const executor = CHAT_TOOL_EXECUTORS[type];
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

type ChatProject = ReturnType<ProjectStore['getProject']> & {};

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
  const history = [...existing, userMsg].slice(-50).map((m) => ({
    role: m.role,
    content: m.content,
  }));
  store.appendChatMessage(pid, userMsg);
  return history;
};

const buildSourceContext = (sources: ChatProject['sources']): string =>
  sources.length > 0 ? getMarkdown(sources) : 'Aucune source ajoutee pour le moment.';

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

const runToolCallPhase = async (
  toolCalls: string[],
  project: ChatProject,
  lang: string,
  ageGroup: AgeGroup,
  config: ReturnType<typeof getConfig>,
  client: Mistral,
  store: ProjectStore,
  pid: string,
): Promise<ToolPhaseResult> => {
  if (toolCalls.length === 0 || project.sources.length === 0) return EMPTY_TOOL_PHASE;
  const rawMarkdown = getMarkdown(project.sources);
  const markdown = applyConsigne(rawMarkdown, project.consigne);
  const hasConsigne = !!project.consigne?.found && (project.consigne.keyTopics?.length ?? 0) > 0;
  const sourceIds = project.sources.map((s) => s.id);
  return processChatToolCalls(
    toolCalls,
    { client, markdown, config, lang, ageGroup, sourceIds, hasConsigne },
    store,
    pid,
  );
};

const appendAssistantMessage = (
  store: ProjectStore,
  pid: string,
  reply: string,
  generatedIds: string[],
): void => {
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

export function chatRoutes(
  store: ProjectStore,
  client: Mistral,
  profileStore: ProfileStore,
): Router {
  const router = Router();

  // Send message
  router.post('/:pid/chat', async (req, res) => {
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
      const { project, message, lang, ageGroup } = validated;
      const historyForApi = appendUserAndBuildHistory(store, pid, project, message);
      const sourceContext = buildSourceContext(project.sources);
      const config = getConfig();

      const { result, usage: chatUsage } = await runWithUsageTracking(() =>
        chatWithSources(client, historyForApi, sourceContext, config.models.chat, lang, ageGroup),
      );
      const chatCost = persistUsage(store, pid, `POST /api/projects/${pid}/chat`, chatUsage);

      const tools = await runToolCallPhase(
        result.toolCalls,
        project,
        lang,
        ageGroup,
        config,
        client,
        store,
        pid,
      );

      appendAssistantMessage(store, pid, result.reply, tools.generatedIds);

      res.json(buildChatResponseBody(result.reply, tools, chatCost));
    } catch (e) {
      handleChatError(e, store, pid, res);
    }
  });

  // Get chat history
  router.get('/:pid/chat', (req, res) => {
    const project = store.getProject(req.params.pid);
    if (!project) {
      res.status(404).json({ error: 'Projet introuvable' });
      return;
    }
    res.json(project.chat || { messages: [] });
  });

  // Clear chat
  router.delete('/:pid/chat', (req, res) => {
    const project = store.getProject(req.params.pid);
    if (!project) {
      res.status(404).json({ error: 'Projet introuvable' });
      return;
    }
    store.clearChat(req.params.pid);
    res.json({ ok: true });
  });

  return router;
}
