import { Router, Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { Mistral } from '@mistralai/mistralai';
import type { Source, Generation, QuizQuestion, AgeGroup } from '../types.js';
import type { ProjectStore } from '../store.js';
import type { ProfileStore } from '../profiles.js';
import { getConfig, resolveVoices } from '../config.js';
import { generateSummary } from '../generators/summary.js';
import { generateFlashcards } from '../generators/flashcards.js';
import { generateQuiz, generateQuizVocal, generateQuizReview } from '../generators/quiz.js';
import { generatePodcastScript } from '../generators/podcast.js';
import { generateAudio } from '../generators/tts.js';
import { ttsQuestion } from '../generators/quiz-vocal.js';
import { generateImage } from '../generators/image.js';
import { generateFillBlank } from '../generators/fill-blank.js';
import { routeRequest } from '../generators/router.js';
import { buildExclusionContext } from '../helpers/diversity.js';
import { autoTitle } from '../helpers/auto-title.js';

export function getMarkdown(sources: Source[], sourceIds?: string[]): string {
  const selected =
    sourceIds && sourceIds.length > 0 ? sources.filter((s) => sourceIds.includes(s.id)) : sources;
  if (selected.length === 0) throw new Error('Aucune source disponible');
  return selected
    .map((s, i) => `# Source ${i + 1} — ${s.filename}\n\n${s.markdown}`)
    .join('\n\n---\n\n');
}

export function applyConsigne(
  markdown: string,
  consigne?: { found: boolean; text: string; keyTopics: string[] },
): string {
  if (!consigne?.found || consigne.keyTopics.length === 0) return markdown;
  const topicsList = consigne.keyTopics.map((t) => `- ${t}`).join('\n');
  const header = `CONSIGNE DE REVISION DETECTEE : L'eleve doit reviser les points suivants :\n${topicsList}\n\nConcentre-toi PRIORITAIREMENT sur ces sujets. Le contenu hors-programme peut etre utilise en complement.\n\n---\n\n`;
  return header + markdown;
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
  if (!profile?.useModeration) return null;
  const selected =
    sourceIds && sourceIds.length > 0
      ? project.sources.filter((s) => sourceIds.includes(s.id))
      : project.sources;
  const blocked = selected.find((s) => s.moderation?.status && s.moderation.status !== 'safe');
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
      const exclusions = buildExclusionContext(ctx.project.results.generations, 'summary');
      const data = await generateSummary(
        client,
        ctx.markdown,
        ctx.config.models.summary,
        ctx.hasConsigne,
        ctx.lang,
        ctx.ageGroup,
        exclusions,
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
      const exclusions = buildExclusionContext(ctx.project.results.generations, 'flashcards');
      const data = await generateFlashcards(
        client,
        ctx.markdown,
        ctx.config.models.flashcards,
        ctx.lang,
        ctx.ageGroup,
        ctx.count,
        exclusions,
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
      const exclusions = buildExclusionContext(ctx.project.results.generations, 'quiz');
      const data = await generateQuiz(
        client,
        ctx.markdown,
        ctx.config.models.quiz,
        ctx.lang,
        ctx.ageGroup,
        ctx.count,
        exclusions,
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
      const exclusions = buildExclusionContext(ctx.project.results.generations, 'podcast');
      const podcastResult = await generatePodcastScript(
        client,
        ctx.markdown,
        ctx.config.models.podcast,
        ctx.lang,
        ctx.ageGroup,
        exclusions,
      );
      console.log(`  Script OK: ${podcastResult.script.length} lines`);

      console.log('  Generating audio...');
      const audioBuffer = await generateAudio(
        podcastResult.script,
        resolveVoices(ctx.config),
        { provider: ctx.config.ttsProvider, model: ctx.config.ttsModel, mistralClient: client },
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
      if (originalGen?.type !== 'quiz') {
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
      const exclusions = buildExclusionContext(ctx.project.results.generations, 'quiz-vocal');
      const data = await generateQuizVocal(
        client,
        ctx.markdown,
        ctx.config.models.quiz,
        ctx.lang,
        ctx.ageGroup,
        ctx.count,
        exclusions,
      );
      console.log(`  Quiz OK: ${data.length} questions`);

      console.log('  Generating TTS for each question...');
      const audioUrls: string[] = [];
      const projectDir = store.getProjectDir(ctx.pid);
      const hostVoice = resolveVoices(ctx.config).host;
      const ttsOpts = { provider: ctx.config.ttsProvider, model: ctx.config.ttsModel, mistralClient: client } as const;
      for (let i = 0; i < data.length; i++) {
        const audioBuffer = await ttsQuestion(
          data[i],
          hostVoice,
          ttsOpts,
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
      const exclusions = buildExclusionContext(ctx.project.results.generations, 'fill-blank');
      const data = await generateFillBlank(
        client,
        ctx.markdown,
        ctx.config.models.quiz,
        ctx.lang,
        ctx.ageGroup,
        ctx.count,
        exclusions,
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

  // --- Smart Routing (Auto) — structure multi-generation ---
  interface AutoCtx {
    client: Mistral;
    markdown: string;
    config: ReturnType<typeof getConfig>;
    hasConsigne: boolean;
    lang: string;
    ageGroup: AgeGroup;
    sourceIds: string[];
    count?: number;
    pid: string;
    store: ProjectStore;
    generations: Generation[];
  }

  function makeGen(type: string, data: any, ctx: AutoCtx): Generation {
    return {
      id: randomUUID(),
      title: autoTitle(type, data, ctx.lang),
      createdAt: new Date().toISOString(),
      sourceIds: ctx.sourceIds,
      type,
      data,
    } as Generation;
  }

  const AUTO_EXECUTORS: Record<string, (ctx: AutoCtx) => Promise<Generation>> = {
    summary: async (ctx) => {
      const excl = buildExclusionContext(ctx.generations, 'summary');
      const data = await generateSummary(ctx.client, ctx.markdown, ctx.config.models.summary, ctx.hasConsigne, ctx.lang, ctx.ageGroup, excl);
      return makeGen('summary', data, ctx);
    },
    flashcards: async (ctx) => {
      const excl = buildExclusionContext(ctx.generations, 'flashcards');
      const data = await generateFlashcards(ctx.client, ctx.markdown, ctx.config.models.flashcards, ctx.lang, ctx.ageGroup, ctx.count, excl);
      return makeGen('flashcards', data, ctx);
    },
    quiz: async (ctx) => {
      const excl = buildExclusionContext(ctx.generations, 'quiz');
      const data = await generateQuiz(ctx.client, ctx.markdown, ctx.config.models.quiz, ctx.lang, ctx.ageGroup, ctx.count, excl);
      return makeGen('quiz', data, ctx);
    },
    'fill-blank': async (ctx) => {
      const excl = buildExclusionContext(ctx.generations, 'fill-blank');
      const data = await generateFillBlank(ctx.client, ctx.markdown, ctx.config.models.quiz, ctx.lang, ctx.ageGroup, ctx.count, excl);
      return makeGen('fill-blank', data, ctx);
    },
    podcast: async (ctx) => {
      const excl = buildExclusionContext(ctx.generations, 'podcast');
      const podcastResult = await generatePodcastScript(ctx.client, ctx.markdown, ctx.config.models.podcast, ctx.lang, ctx.ageGroup, excl);
      const audioBuffer = await generateAudio(podcastResult.script, resolveVoices(ctx.config), { provider: ctx.config.ttsProvider, model: ctx.config.ttsModel, mistralClient: ctx.client });
      const audioFilename = `podcast-${Date.now()}.mp3`;
      const projectDir = ctx.store.getProjectDir(ctx.pid);
      writeFileSync(join(projectDir, audioFilename), audioBuffer);
      const audioUrl = `/output/projects/${ctx.pid}/${audioFilename}`;
      return makeGen('podcast', { script: podcastResult.script, audioUrl, sourceRefs: podcastResult.sourceRefs }, ctx);
    },
  };

  // --- Route analysis only (for 2-phase auto) ---
  router.post('/:pid/generate/route', async (req, res) => {
    try {
      const project = store.getProject(req.params.pid);
      if (!project) {
        res.status(404).json({ error: 'Projet introuvable' });
        return;
      }
      const lang = req.body.lang || 'fr';
      const ageGroup: AgeGroup = req.body.ageGroup || 'enfant';
      const rawMarkdown = getMarkdown(project.sources, req.body.sourceIds);
      const useConsigneRoute = req.body.useConsigne !== false;
      const markdown = useConsigneRoute ? applyConsigne(rawMarkdown, project.consigne) : rawMarkdown;
      const route = await routeRequest(client, markdown, 'mistral-small-latest', lang, ageGroup);
      console.log(`  Route plan: [${route.plan.map((s) => s.agent).join(', ')}]`);
      res.json(route);
    } catch (e) {
      console.error('Route analysis error:', e);
      res.status(500).json({ error: String(e) });
    }
  });

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
      const route = await routeRequest(client, markdown, 'mistral-small-latest', lang, ageGroup);
      console.log(`  Route plan: [${route.plan.map((s) => s.agent).join(', ')}]`);

      const generations: Generation[] = [];
      const failedSteps: string[] = [];
      const sourceIds = resolveSourceIds(req.body, project.sources);
      const autoCtx: AutoCtx = { client, markdown, config, hasConsigne, lang, ageGroup, sourceIds, count, pid: req.params.pid, store, generations: project.results.generations };

      for (const step of route.plan) {
        try {
          const executor = AUTO_EXECUTORS[step.agent];
          if (executor) {
            const gen = await executor(autoCtx);
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
