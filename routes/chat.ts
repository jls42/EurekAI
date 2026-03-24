import { Router } from 'express';
import { randomUUID } from 'crypto';
import { Mistral } from '@mistralai/mistralai';
import type { ProjectStore } from '../store.js';
import type { ChatMessage, Generation, AgeGroup } from '../types.js';
import { getConfig } from '../config.js';
import { chatWithSources } from '../generators/chat.js';
import { getMarkdown } from './generate.js';
import { generateSummary } from '../generators/summary.js';
import { generateFlashcards } from '../generators/flashcards.js';
import { generateQuiz } from '../generators/quiz.js';
import { ProfileStore, MODERATION_CATEGORIES } from '../profiles.js';
import { moderateContent } from '../generators/moderation.js';

function autoTitle(type: string, data: any, lang = 'fr'): string {
  const en = lang === 'en';
  if (type === 'summary' && data?.title) return `${en ? 'Note' : 'Fiche'} — ${data.title}`;
  if (type === 'flashcards') return `Flashcards (${Array.isArray(data) ? data.length : '?'})`;
  if (type === 'quiz') return `Quiz (${Array.isArray(data) ? data.length : '?'} questions)`;
  return type;
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
      const pid = req.params.pid;
      const project = store.getProject(pid);
      if (!project) {
        res.status(404).json({ error: 'Projet introuvable' });
        return;
      }

      // Age restriction: get profile and check age
      const profileId = project.meta.profileId;
      const profile = profileId ? profileStore.get(profileId) : null;
      if (profile && profile.chatEnabled === false) {
        res.status(403).json({ error: 'chat.ageRestricted' });
        return;
      }

      const { message, lang: reqLang, ageGroup: reqAgeGroup } = req.body;
      const lang = reqLang || 'fr';
      const ageGroup: AgeGroup = reqAgeGroup || 'enfant';
      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'message requis' });
        return;
      }

      // Moderation check
      if (profile && profile.useModeration) {
        const categories = MODERATION_CATEGORIES[profile.ageGroup] || [];
        if (categories.length > 0) {
          const modResult = await moderateContent(client, message.trim(), categories);
          if (modResult.status !== 'safe') {
            res.status(400).json({ error: 'chat.moderationBlocked' });
            return;
          }
        }
      }

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

      // Build context
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
      const generatedIds: string[] = [];
      const generatedGens: Generation[] = [];
      const failedTools: string[] = [];
      if (result.toolCalls.length > 0 && project.sources.length > 0) {
        const markdown = getMarkdown(project.sources);
        const sourceIds = project.sources.map((s) => s.id);

        for (const call of result.toolCalls) {
          try {
            const type = call.replace('generate_', '');
            let gen: Generation | null = null;

            if (type === 'summary') {
              const data = await generateSummary(
                client,
                markdown,
                config.models.summary,
                false,
                lang,
                ageGroup,
              );
              gen = {
                id: randomUUID(),
                title: autoTitle('summary', data, lang),
                createdAt: new Date().toISOString(),
                sourceIds,
                type: 'summary',
                data,
              };
            } else if (type === 'flashcards') {
              const data = await generateFlashcards(
                client,
                markdown,
                config.models.flashcards,
                lang,
                ageGroup,
              );
              gen = {
                id: randomUUID(),
                title: autoTitle('flashcards', data, lang),
                createdAt: new Date().toISOString(),
                sourceIds,
                type: 'flashcards',
                data,
              };
            } else if (type === 'quiz') {
              const data = await generateQuiz(client, markdown, config.models.quiz, lang, ageGroup);
              gen = {
                id: randomUUID(),
                title: autoTitle('quiz', data, lang),
                createdAt: new Date().toISOString(),
                sourceIds,
                type: 'quiz',
                data,
              };
            }

            if (gen) {
              store.addGeneration(pid, gen);
              generatedIds.push(gen.id);
              generatedGens.push(gen);
              console.log(`  Chat tool: ${type} generated`);
            }
          } catch (err) {
            console.error(`  Chat tool ${call} failed:`, err);
            failedTools.push(call);
          }
        }
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
