import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { Mistral } from '@mistralai/mistralai';
import type { Source, Generation, QuizQuestion, AgeGroup } from '../types.js';
import type { ProjectStore } from '../store.js';
import type { ProfileStore } from '../profiles.js';
import { getConfig } from '../config.js';
import { generateSummary } from '../generators/summary.js';
import { generateFlashcards } from '../generators/flashcards.js';
import { generateQuiz, generateQuizVocal, generateQuizReview } from '../generators/quiz.js';
import { generatePodcastScript } from '../generators/podcast.js';
import { generateAudio } from '../generators/tts.js';
import { ttsQuestion } from '../generators/quiz-vocal.js';
import { generateImage } from '../generators/image.js';
import { generateFillBlank } from '../generators/fill-blank.js';
import { routeRequest } from '../generators/router.js';

export function getMarkdown(sources: Source[], sourceIds?: string[]): string {
  const selected =
    sourceIds && sourceIds.length > 0 ? sources.filter((s) => sourceIds.includes(s.id)) : sources;
  if (selected.length === 0) throw new Error('Aucune source disponible');
  return selected
    .map((s, i) => `# Source ${i + 1} — ${s.filename}\n\n${s.markdown}`)
    .join('\n\n---\n\n');
}

function applyConsigne(
  markdown: string,
  consigne?: { found: boolean; text: string; keyTopics: string[] },
): string {
  if (!consigne?.found || consigne.keyTopics.length === 0) return markdown;
  const header = `CONSIGNE DE REVISION DETECTEE : L'eleve doit reviser les points suivants :\n${consigne.keyTopics.map((t) => `- ${t}`).join('\n')}\n\nConcentre-toi PRIORITAIREMENT sur ces sujets. Le contenu hors-programme peut etre utilise en complement.\n\n---\n\n`;
  return header + markdown;
}

function autoTitle(type: string, data: any, lang = 'fr'): string {
  const en = lang === 'en';
  if (type === 'summary' && data?.title) return `${en ? 'Note' : 'Fiche'} — ${data.title}`;
  if (type === 'flashcards') return `Flashcards (${Array.isArray(data) ? data.length : '?'})`;
  if (type === 'quiz') return `Quiz (${Array.isArray(data) ? data.length : '?'} questions)`;
  if (type === 'quiz-vocal')
    return `${en ? 'Vocal Quiz' : 'Quiz Vocal'} (${Array.isArray(data) ? data.length : '?'} questions)`;
  if (type === 'podcast') return `Podcast`;
  if (type === 'image') return 'Illustration';
  if (type === 'fill-blank')
    return `${en ? 'Fill-in-the-blanks' : 'Textes à trous'} (${Array.isArray(data) ? data.length : '?'})`;
  return type;
}

function resolveSourceIds(body: any, sources: Source[]): string[] {
  const ids = body.sourceIds || [];
  return ids.length > 0 ? ids : sources.map((s) => s.id);
}

function checkModeration(
  store: ProjectStore,
  profileStore: ProfileStore,
  pid: string,
  sourceIds?: string[],
): string | null {
  const project = store.getProject(pid);
  if (!project) return null;
  const profileId = project.meta.profileId;
  if (!profileId) return null;
  const profile = profileStore.get(profileId);
  if (!profile || !profile.useModeration) return null;
  const selected =
    sourceIds && sourceIds.length > 0
      ? project.sources.filter((s) => sourceIds.includes(s.id))
      : project.sources;
  const blocked = selected.find((s) => s.moderation && s.moderation.status !== 'safe');
  if (blocked) return blocked.filename;
  return null;
}

interface GenContext {
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
  req: Request;
  res: Response;
}

function handleGeneration(
  store: ProjectStore,
  profileStore: ProfileStore,
  generatorFn: (ctx: GenContext) => Promise<Generation | null>,
) {
  return async (req: Request, res: Response) => {
    try {
      const pid = req.params.pid as string;
      const project = store.getProject(pid);
      if (!project) {
        res.status(404).json({ error: 'Projet introuvable' });
        return;
      }
      const unsafeSource = checkModeration(store, profileStore, pid, req.body.sourceIds);
      if (unsafeSource) {
        res.status(400).json({ error: `moderation.blocked` });
        return;
      }
      const lang = req.body.lang || 'fr';
      const ageGroup: AgeGroup = req.body.ageGroup || 'enfant';
      const rawMarkdown = getMarkdown(project.sources, req.body.sourceIds);
      const useConsigne = req.body.useConsigne !== false;
      const markdown = useConsigne ? applyConsigne(rawMarkdown, project.consigne) : rawMarkdown;
      const hasConsigne = useConsigne && !!project.consigne?.found && project.consigne.keyTopics.length > 0;
      const config = getConfig();
      const sourceIds = resolveSourceIds(req.body, project.sources);
      const rawCount = req.body.count ? Number(req.body.count) : undefined;
      const count = rawCount && Number.isFinite(rawCount) ? Math.min(Math.max(Math.round(rawCount), 1), 50) : undefined;

      const gen = await generatorFn({
        project,
        markdown,
        rawMarkdown,
        lang,
        ageGroup,
        config,
        hasConsigne,
        sourceIds,
        count,
        pid,
        req,
        res,
      });

      if (gen) {
        store.addGeneration(pid, gen);
        res.json(gen);
      }
    } catch (e) {
      console.error('Generate error:', e);
      res.status(500).json({ error: String(e) });
    }
  };
}

export function generateRoutes(
  store: ProjectStore,
  client: Mistral,
  profileStore: ProfileStore,
): Router {
  const router = Router();

  router.post(
    '/:pid/generate/summary',
    handleGeneration(store, profileStore, async (ctx) => {
      console.log(
        `[summary] sources: ${ctx.project.sources.length}, markdown: ${ctx.markdown.length} chars, model: ${ctx.config.models.summary}, consigne: ${ctx.hasConsigne}, lang: ${ctx.lang}, ageGroup: ${ctx.ageGroup}`,
      );
      const data = await generateSummary(
        client,
        ctx.markdown,
        ctx.config.models.summary,
        ctx.hasConsigne,
        ctx.lang,
        ctx.ageGroup,
      );
      console.log(
        `[summary] result keys: [${Object.keys(data)}], title: "${data.title?.slice(0, 60)}", key_points: ${data.key_points?.length}`,
      );
      return {
        id: randomUUID(),
        title: autoTitle('summary', data, ctx.lang),
        createdAt: new Date().toISOString(),
        sourceIds: ctx.sourceIds,
        type: 'summary',
        data,
      };
    }),
  );

  router.post(
    '/:pid/generate/flashcards',
    handleGeneration(store, profileStore, async (ctx) => {
      const data = await generateFlashcards(
        client,
        ctx.markdown,
        ctx.config.models.flashcards,
        ctx.lang,
        ctx.ageGroup,
        ctx.count,
      );
      return {
        id: randomUUID(),
        title: autoTitle('flashcards', data, ctx.lang),
        createdAt: new Date().toISOString(),
        sourceIds: ctx.sourceIds,
        type: 'flashcards',
        data,
      };
    }),
  );

  router.post(
    '/:pid/generate/quiz',
    handleGeneration(store, profileStore, async (ctx) => {
      const data = await generateQuiz(
        client,
        ctx.markdown,
        ctx.config.models.quiz,
        ctx.lang,
        ctx.ageGroup,
        ctx.count,
      );
      return {
        id: randomUUID(),
        title: autoTitle('quiz', data, ctx.lang),
        createdAt: new Date().toISOString(),
        sourceIds: ctx.sourceIds,
        type: 'quiz',
        data,
      };
    }),
  );

  router.post(
    '/:pid/generate/podcast',
    handleGeneration(store, profileStore, async (ctx) => {
      console.log('  Generating podcast script...');
      const podcastResult = await generatePodcastScript(
        client,
        ctx.markdown,
        ctx.config.models.podcast,
        ctx.lang,
        ctx.ageGroup,
      );
      console.log(`  Script OK: ${podcastResult.script.length} lines`);

      console.log('  Generating audio...');
      const audioBuffer = await generateAudio(
        podcastResult.script,
        ctx.config.ttsModel,
        ctx.config.voices,
      );
      const audioFilename = `podcast-${Date.now()}.mp3`;
      const projectDir = store.getProjectDir(ctx.pid);
      writeFileSync(join(projectDir, audioFilename), audioBuffer);
      console.log(`  Audio OK: ${(audioBuffer.length / 1024).toFixed(0)} KB`);

      const audioUrl = `/output/projects/${ctx.pid}/${audioFilename}`;
      return {
        id: randomUUID(),
        title: autoTitle('podcast', null, ctx.lang),
        createdAt: new Date().toISOString(),
        sourceIds: ctx.sourceIds,
        type: 'podcast',
        data: { script: podcastResult.script, audioUrl, sourceRefs: podcastResult.sourceRefs },
      };
    }),
  );

  router.post(
    '/:pid/generate/quiz-review',
    handleGeneration(store, profileStore, async (ctx) => {
      const { generationId, weakQuestions } = ctx.req.body;
      if (!generationId || !weakQuestions || !Array.isArray(weakQuestions)) {
        ctx.res.status(400).json({ error: 'generationId et weakQuestions requis' });
        return null;
      }
      const originalGen = store.getGeneration(ctx.pid, generationId);
      if (!originalGen || originalGen.type !== 'quiz') {
        ctx.res.status(404).json({ error: 'Quiz original introuvable' });
        return null;
      }
      const markdown = getMarkdown(ctx.project.sources, originalGen.sourceIds);
      const data = await generateQuizReview(
        client,
        markdown,
        weakQuestions as QuizQuestion[],
        ctx.config.models.quiz,
        ctx.lang,
        ctx.ageGroup,
      );
      const reviewLabel = ctx.lang === 'en' ? 'Review' : 'Revision';
      return {
        id: randomUUID(),
        title: `${reviewLabel} — ${originalGen.title}`,
        createdAt: new Date().toISOString(),
        sourceIds: originalGen.sourceIds,
        type: 'quiz' as const,
        data,
      };
    }),
  );

  router.post(
    '/:pid/generate/quiz-vocal',
    handleGeneration(store, profileStore, async (ctx) => {
      console.log('  Generating quiz for vocal (TTS-friendly)...');
      const data = await generateQuizVocal(
        client,
        ctx.rawMarkdown,
        ctx.config.models.quiz,
        ctx.lang,
        ctx.ageGroup,
        ctx.count,
      );
      console.log(`  Quiz OK: ${data.length} questions`);

      console.log('  Generating TTS for each question...');
      const audioUrls: string[] = [];
      const projectDir = store.getProjectDir(ctx.pid);
      for (let i = 0; i < data.length; i++) {
        const audioBuffer = await ttsQuestion(
          data[i],
          ctx.config.voices.host.id,
          ctx.config.ttsModel,
        );
        const audioFilename = `quiz-vocal-q${i}-${Date.now()}.mp3`;
        writeFileSync(join(projectDir, audioFilename), audioBuffer);
        audioUrls.push(`/output/projects/${ctx.pid}/${audioFilename}`);
        console.log(`  Q${i + 1} audio OK: ${(audioBuffer.length / 1024).toFixed(0)} KB`);
      }

      return {
        id: randomUUID(),
        title: autoTitle('quiz-vocal', data),
        createdAt: new Date().toISOString(),
        sourceIds: ctx.sourceIds,
        type: 'quiz-vocal',
        data,
        audioUrls,
      };
    }),
  );

  router.post(
    '/:pid/generate/image',
    handleGeneration(store, profileStore, async (ctx) => {
      console.log(`  Generating image via agent... lang: ${ctx.lang}, ageGroup: ${ctx.ageGroup}`);
      const projectDir = store.getProjectDir(ctx.pid);
      const data = await generateImage(
        client,
        ctx.rawMarkdown,
        projectDir,
        ctx.pid,
        ctx.lang,
        ctx.ageGroup,
      );
      console.log(`  Image OK`);

      return {
        id: randomUUID(),
        title: autoTitle('image', data),
        createdAt: new Date().toISOString(),
        sourceIds: ctx.sourceIds,
        type: 'image',
        data,
      };
    }),
  );

  // --- Fill-in-the-blanks ---
  router.post(
    '/:pid/generate/fill-blank',
    handleGeneration(store, profileStore, async (ctx) => {
      console.log(
        `[fill-blank] sources: ${ctx.project.sources.length}, markdown: ${ctx.markdown.length} chars, lang: ${ctx.lang}, ageGroup: ${ctx.ageGroup}`,
      );
      const data = await generateFillBlank(
        client,
        ctx.markdown,
        ctx.config.models.quiz,
        ctx.lang,
        ctx.ageGroup,
        ctx.count,
      );
      return {
        id: randomUUID(),
        title: autoTitle('fill-blank', data, ctx.lang),
        createdAt: new Date().toISOString(),
        sourceIds: ctx.sourceIds,
        type: 'fill-blank',
        data,
      };
    }),
  );

  // --- Smart Routing (Auto) — structure multi-generation, non factorisable ---
  router.post('/:pid/generate/auto', async (req, res) => {
    try {
      const project = store.getProject(req.params.pid);
      if (!project) {
        res.status(404).json({ error: 'Projet introuvable' });
        return;
      }
      const unsafeSource = checkModeration(store, profileStore, req.params.pid, req.body.sourceIds);
      if (unsafeSource) {
        res.status(400).json({ error: `moderation.blocked` });
        return;
      }
      const lang = req.body.lang || 'fr';
      const ageGroup: AgeGroup = req.body.ageGroup || 'enfant';
      const useConsigneAuto = req.body.useConsigne !== false;
      const rawAutoMarkdown = getMarkdown(project.sources, req.body.sourceIds);
      const markdown = useConsigneAuto ? applyConsigne(rawAutoMarkdown, project.consigne) : rawAutoMarkdown;
      const hasConsigne = useConsigneAuto && !!project.consigne?.found && project.consigne.keyTopics.length > 0;
      const config = getConfig();
      const rawCount = req.body.count ? Number(req.body.count) : undefined;
      const count = rawCount && Number.isFinite(rawCount) ? Math.min(Math.max(Math.round(rawCount), 1), 50) : undefined;

      console.log('  Smart routing: analyzing content...');
      const route = await routeRequest(client, markdown);
      console.log(`  Route plan: [${route.plan.map((s) => s.agent).join(', ')}]`);

      const generations: Generation[] = [];
      const failedSteps: string[] = [];
      const sourceIds = resolveSourceIds(req.body, project.sources);

      for (const step of route.plan) {
        try {
          let gen: Generation | null = null;
          if (step.agent === 'summary') {
            const data = await generateSummary(
              client,
              markdown,
              config.models.summary,
              hasConsigne,
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
          } else if (step.agent === 'flashcards') {
            const data = await generateFlashcards(
              client,
              markdown,
              config.models.flashcards,
              lang,
              ageGroup,
              count,
            );
            gen = {
              id: randomUUID(),
              title: autoTitle('flashcards', data, lang),
              createdAt: new Date().toISOString(),
              sourceIds,
              type: 'flashcards',
              data,
            };
          } else if (step.agent === 'quiz') {
            const data = await generateQuiz(client, markdown, config.models.quiz, lang, ageGroup, count);
            gen = {
              id: randomUUID(),
              title: autoTitle('quiz', data, lang),
              createdAt: new Date().toISOString(),
              sourceIds,
              type: 'quiz',
              data,
            };
          } else if (step.agent === 'fill-blank') {
            const data = await generateFillBlank(
              client,
              markdown,
              config.models.quiz,
              lang,
              ageGroup,
              count,
            );
            gen = {
              id: randomUUID(),
              title: autoTitle('fill-blank', data, lang),
              createdAt: new Date().toISOString(),
              sourceIds,
              type: 'fill-blank',
              data,
            };
          } else if (step.agent === 'podcast') {
            const podcastResult = await generatePodcastScript(
              client,
              markdown,
              config.models.podcast,
              lang,
              ageGroup,
            );
            const audioBuffer = await generateAudio(
              podcastResult.script,
              config.ttsModel,
              config.voices,
            );
            const audioFilename = `podcast-${Date.now()}.mp3`;
            const projectDir = store.getProjectDir(req.params.pid);
            writeFileSync(join(projectDir, audioFilename), audioBuffer);
            const audioUrl = `/output/projects/${req.params.pid}/${audioFilename}`;
            gen = {
              id: randomUUID(),
              title: autoTitle('podcast', null, lang),
              createdAt: new Date().toISOString(),
              sourceIds,
              type: 'podcast',
              data: {
                script: podcastResult.script,
                audioUrl,
                sourceRefs: podcastResult.sourceRefs,
              },
            };
          }
          if (gen) {
            store.addGeneration(req.params.pid, gen);
            generations.push(gen);
            console.log(`  Auto: ${step.agent} OK`);
          }
        } catch (err) {
          console.error(`  Auto: ${step.agent} FAILED:`, err);
          failedSteps.push(step.agent);
        }
      }

      res.json({ route: route.plan, generations, ...(failedSteps.length > 0 && { failedSteps }) });
    } catch (e) {
      console.error('Generate auto error:', e);
      res.status(500).json({ error: String(e) });
    }
  });

  return router;
}
