import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { Mistral } from '@mistralai/mistralai';
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

const arrayLen = (data: any): string | number => (Array.isArray(data) ? data.length : '?');

const CHAT_TITLE_FORMATTERS: Record<string, (data: any, lang: string) => string> = {
  summary: (data, lang) => {
    const prefix = lang === 'en' ? 'Note' : 'Fiche';
    return data?.title ? `${prefix} — ${data.title}` : 'summary';
  },
  flashcards: (data) => `Flashcards (${arrayLen(data)})`,
  quiz: (data) => `Quiz (${arrayLen(data)} questions)`,
  'fill-blank': (data, lang) => `${lang === 'en' ? 'Fill-in-the-blanks' : 'Textes à trous'} (${arrayLen(data)})`,
};

function autoTitle(type: string, data: any, lang = 'fr'): string {
  const formatter = CHAT_TITLE_FORMATTERS[type];
  return formatter ? formatter(data, lang) : type;
}

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

async function validateChatRequest(
  req: { params: { pid: string }; body: any },
  store: ProjectStore,
  profileStore: ProfileStore,
  client: Mistral,
): Promise<ChatRequestContext | ChatValidationError> {
  const pid = req.params.pid;
  const project = store.getProject(pid);
  if (!project) return new ChatValidationError(404, 'Projet introuvable');

  const profileId = project.meta.profileId;
  const profile = profileId ? profileStore.get(profileId) : null;
  if (profile?.chatEnabled === false) return new ChatValidationError(403, 'chat.ageRestricted');

  const { message, lang: reqLang, ageGroup: reqAgeGroup } = req.body;
  const lang = reqLang || 'fr';
  const ageGroup: AgeGroup = reqAgeGroup || 'enfant';
  if (!message || typeof message !== 'string') return new ChatValidationError(400, 'message requis');

  if (profile?.useModeration) {
    const categories = MODERATION_CATEGORIES[profile.ageGroup] || [];
    if (categories.length > 0) {
      const modResult = await moderateContent(client, message.trim(), categories);
      if (modResult.status !== 'safe') return new ChatValidationError(400, 'chat.moderationBlocked');
    }
  }

  return { pid, project, profile, message, lang, ageGroup };
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
    const data = await generateSummary(ctx.client, ctx.markdown, ctx.config.models.summary, ctx.hasConsigne, ctx.lang, ctx.ageGroup);
    return { id: randomUUID(), title: autoTitle('summary', data, ctx.lang), createdAt: new Date().toISOString(), sourceIds: ctx.sourceIds, type: 'summary', data };
  },
  flashcards: async (ctx) => {
    const data = await generateFlashcards(ctx.client, ctx.markdown, ctx.config.models.flashcards, ctx.lang, ctx.ageGroup);
    return { id: randomUUID(), title: autoTitle('flashcards', data, ctx.lang), createdAt: new Date().toISOString(), sourceIds: ctx.sourceIds, type: 'flashcards', data };
  },
  quiz: async (ctx) => {
    const data = await generateQuiz(ctx.client, ctx.markdown, ctx.config.models.quiz, ctx.lang, ctx.ageGroup);
    return { id: randomUUID(), title: autoTitle('quiz', data, ctx.lang), createdAt: new Date().toISOString(), sourceIds: ctx.sourceIds, type: 'quiz', data };
  },
  'fill-blank': async (ctx) => {
    const data = await generateFillBlank(ctx.client, ctx.markdown, ctx.config.models.quiz, ctx.lang, ctx.ageGroup);
    return { id: randomUUID(), title: autoTitle('fill-blank', data, ctx.lang), createdAt: new Date().toISOString(), sourceIds: ctx.sourceIds, type: 'fill-blank', data };
  },
};

async function processChatToolCalls(
  toolCalls: string[],
  ctx: ToolCallCtx,
  store: ProjectStore,
  pid: string,
): Promise<{ generatedIds: string[]; generations: Generation[]; failedTools: string[] }> {
  const generatedIds: string[] = [];
  const generations: Generation[] = [];
  const failedTools: string[] = [];

  for (const call of toolCalls) {
    try {
      const type = call.replace('generate_', '');
      const executor = CHAT_TOOL_EXECUTORS[type];
      if (executor) {
        const gen = await executor(ctx);
        store.addGeneration(pid, gen);
        generatedIds.push(gen.id);
        generations.push(gen);
        console.log(`  Chat tool: ${type} generated`);
      }
    } catch (err) {
      console.error(`  Chat tool ${call} failed:`, err);
      failedTools.push(call);
    }
  }

  return { generatedIds, generations, failedTools };
}

export function chatRoutes(
  store: ProjectStore,
  client: Mistral,
  profileStore: ProfileStore,
): Router {
  const router = Router();

  // Send message
  router.post('/:pid/chat', async (req, res) => {
    try {
      const validated = await validateChatRequest(req as any, store, profileStore, client);
      if (validated instanceof ChatValidationError) {
        res.status(validated.status).json({ error: validated.error });
        return;
      }
      const { pid, project, message, lang, ageGroup } = validated;

      const existingMessages = project.chat?.messages ?? [];
      const userMsg: ChatMessage = {
        role: 'user',
        content: message.trim(),
        timestamp: new Date().toISOString(),
      };
      const historyForApi = [...existingMessages, userMsg].slice(-50).map((m) => ({
        role: m.role,
        content: m.content,
      }));
      store.appendChatMessage(pid, userMsg);

      const sourceContext =
        project.sources.length > 0
          ? getMarkdown(project.sources)
          : 'Aucune source ajoutee pour le moment.';

      const config = getConfig();

      const result = await chatWithSources(
        client,
        historyForApi,
        sourceContext,
        config.models.chat,
        lang,
        ageGroup,
      );

      // Process tool calls — generate content
      let generatedIds: string[] = [];
      let generatedGens: Generation[] = [];
      let failedTools: string[] = [];
      if (result.toolCalls.length > 0 && project.sources.length > 0) {
        const rawMarkdown = getMarkdown(project.sources);
        const markdown = applyConsigne(rawMarkdown, project.consigne);
        const hasConsigne = !!project.consigne?.found && (project.consigne.keyTopics?.length ?? 0) > 0;
        const sourceIds = project.sources.map((s) => s.id);
        const toolResult = await processChatToolCalls(
          result.toolCalls,
          { client, markdown, config, lang, ageGroup, sourceIds, hasConsigne },
          store,
          pid,
        );
        generatedIds = toolResult.generatedIds;
        generatedGens = toolResult.generations;
        failedTools = toolResult.failedTools;
      }

      // Add assistant message
      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: result.reply,
        timestamp: new Date().toISOString(),
        generatedIds: generatedIds.length > 0 ? generatedIds : undefined,
      };
      store.appendChatMessage(pid, assistantMsg);

      res.json({
        reply: result.reply,
        generatedIds,
        generations: generatedGens,
        ...(failedTools.length > 0 && { failedTools }),
      });
    } catch (e) {
      console.error('Chat error:', e);
      res.status(500).json({ error: String(e) });
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
