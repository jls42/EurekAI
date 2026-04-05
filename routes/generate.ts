import { Router, Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { Mistral } from '@mistralai/mistralai';
import type { Source, Generation, QuizQuestion, AgeGroup } from '../types.js';
import type { ProjectStore } from '../store.js';
import type { ProfileStore } from '../profiles.js';
import { getConfig, resolveVoices, getModelLimits } from '../config.js';
import { generateSummary } from '../generators/summary.js';
import { generateFlashcards } from '../generators/flashcards.js';
import { generateQuiz, generateQuizVocal, generateQuizReview } from '../generators/quiz.js';
import { generatePodcastScript } from '../generators/podcast.js';
import { generateAudio } from '../generators/tts.js';
import { ttsQuestion } from '../generators/quiz-vocal.js';
import { generateImage } from '../generators/image.js';
import { generateFillBlank } from '../generators/fill-blank.js';
import { runWithUsageTracking } from '../helpers/usage-context.js';
import { persistUsage } from '../helpers/cost-persist.js';
import type { ApiUsage } from '../helpers/pricing.js';
import { routeRequest } from '../generators/router.js';
import { buildExclusionContext } from '../helpers/diversity.js';
import { autoTitle } from '../helpers/auto-title.js';
import { saveAudioFile } from '../helpers/audio-files.js';
import { logger } from '../helpers/logger.js';

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

function checkContextLimit(markdown: string, modelId: string): string | null {
  const limits = getModelLimits();
  const limit = limits[modelId] ?? 128_000;
  const estimatedTokens = Math.ceil(markdown.length / 2);
  if (estimatedTokens > limit * 0.8) {
    const pct = Math.round((estimatedTokens / limit) * 100);
    return `context_too_large:${pct}`;
  }
  return null;
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
  profileVoices?: { host: string; guest: string };
  req: Request;
  res: Response;
}

function parseCount(raw: unknown): number | undefined {
  const n = raw ? Number(raw) : undefined;
  return n && Number.isFinite(n) ? Math.min(Math.max(Math.round(n), 1), 50) : undefined;
}

function buildGenContext(
  store: ProjectStore,
  profileStore: ProfileStore,
  pid: string,
  body: any,
  modelId?: string,
  options?: { skipContextCheck?: boolean; checkRawMarkdown?: boolean },
): { ok: true; ctx: Omit<GenContext, 'req' | 'res'> } | { ok: false; error: string; status: number } {
  const project = store.getProject(pid);
  if (!project) return { ok: false, error: 'Projet introuvable', status: 404 };

  const unsafeSource = checkModeration(store, profileStore, pid, body.sourceIds);
  if (unsafeSource) return { ok: false, error: 'moderation.blocked', status: 400 };

  const rawMarkdown = getMarkdown(project.sources, body.sourceIds);
  const useConsigne = body.useConsigne !== false;
  const markdown = useConsigne ? applyConsigne(rawMarkdown, project.consigne) : rawMarkdown;
  const hasConsigne = useConsigne && !!project.consigne?.found && project.consigne.keyTopics.length > 0;
  const config = getConfig();
  const models = config.models as Record<string, string>;
  const resolvedModel = modelId ? (models[modelId] || modelId) : models.summary;
  const ctxMarkdown = options?.checkRawMarkdown ? rawMarkdown : markdown;
  const ctxError = options?.skipContextCheck ? null : checkContextLimit(ctxMarkdown, resolvedModel);
  if (ctxError) return { ok: false, error: ctxError, status: 400 };

  const profileId = project.meta?.profileId;
  const profile = profileId ? profileStore.get(profileId) : null;

  return {
    ok: true as const,
    ctx: {
      project, markdown, rawMarkdown,
      lang: body.lang || 'fr',
      ageGroup: body.ageGroup || 'enfant',
      config, hasConsigne,
      sourceIds: resolveSourceIds(body, project.sources),
      count: parseCount(body.count),
      pid,
      profileVoices: profile?.mistralVoices,
    },
  };
}

function handleGeneration(
  store: ProjectStore,
  profileStore: ProfileStore,
  generatorFn: (ctx: GenContext) => Promise<Generation | null>,
  modelId?: string,
  options?: { skipContextCheck?: boolean; checkRawMarkdown?: boolean },
) {
  return async (req: Request, res: Response) => {
    const pid = req.params.pid as string;
    try {
      const result = buildGenContext(store, profileStore, pid, req.body, modelId, options);
      if (!result.ok) {
        res.status(result.status).json({ error: result.error });
        return;
      }
      const { result: gen, usage } = await runWithUsageTracking(() => generatorFn({ ...result.ctx, req, res }));
      if (gen) {
        const persisted = persistUsage(store, pid, `POST /api/projects/${pid}/generate/${gen.type}`, usage);
        if (persisted) {
          gen.usage = persisted.usage;
          gen.estimatedCost = persisted.cost;
          gen.costBreakdown = persisted.costBreakdown;
        }
        store.addGeneration(pid, gen);
        res.json(gen);
      }
    } catch (e) {
      const failedUsage = (e as any).apiUsage as ApiUsage[] | undefined;
      if (failedUsage?.length) {
        persistUsage(store, pid, `POST /api/projects/${pid}/generate/failed`, failedUsage);
      }
      logger.error('generate', 'error:', e);
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
      logger.info('summary', `sources: ${ctx.project.sources.length}, markdown: ${ctx.markdown.length} chars, model: ${ctx.config.models.summary}, consigne: ${ctx.hasConsigne}, lang: ${ctx.lang}, ageGroup: ${ctx.ageGroup}`);
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
      logger.info('summary', `result keys: [${Object.keys(data)}], title: "${data.title?.slice(0, 60)}", key_points: ${data.key_points?.length}`);
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
    }, 'flashcards'),
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
    }, 'quiz'),
  );

  router.post(
    '/:pid/generate/podcast',
    handleGeneration(store, profileStore, async (ctx) => {
      logger.info('podcast', 'Generating script...');
      const exclusions = buildExclusionContext(ctx.project.results.generations, 'podcast');
      const podcastResult = await generatePodcastScript(
        client,
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
        resolveVoices(ctx.config, ctx.profileVoices, ctx.lang),
        { provider: ctx.config.ttsProvider, model: ctx.config.ttsModel, mistralClient: client },
      );
      const audioUrl = saveAudioFile(audioBuffer, store.getProjectDir(ctx.pid), ctx.pid, 'podcast');
      logger.info('podcast', `Audio OK: ${(audioBuffer.length / 1024).toFixed(0)} KB`);

      return {
        id: randomUUID(),
        title: autoTitle('podcast', null, ctx.lang),
        createdAt: new Date().toISOString(),
        sourceIds: ctx.sourceIds,
        type: 'podcast',
        data: { script: podcastResult.script, audioUrl, sourceRefs: podcastResult.sourceRefs },
      };
    }, 'podcast'),
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
      const ctxError = checkContextLimit(markdown, ctx.config.models.quiz);
      if (ctxError) {
        ctx.res.status(400).json({ error: ctxError });
        return null;
      }
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
    }, 'quiz', { skipContextCheck: true }),
  );

  router.post(
    '/:pid/generate/quiz-vocal',
    handleGeneration(store, profileStore, async (ctx) => {
      logger.info('quiz-vocal', 'Generating quiz (TTS-friendly)...');
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
      logger.info('quiz-vocal', `Quiz OK: ${data.length} questions`);

      logger.info('quiz-vocal', 'Generating TTS for each question...');
      const audioUrls: string[] = [];
      const projectDir = store.getProjectDir(ctx.pid);
      const hostVoice = resolveVoices(ctx.config, ctx.profileVoices, ctx.lang).host;
      const ttsOpts = { provider: ctx.config.ttsProvider, model: ctx.config.ttsModel, mistralClient: client } as const;
      for (let i = 0; i < data.length; i++) {
        const audioBuffer = await ttsQuestion(
          data[i],
          hostVoice,
          ttsOpts,
        );
        audioUrls.push(saveAudioFile(audioBuffer, projectDir, ctx.pid, `quiz-vocal-q${i}`));
        logger.info('quiz-vocal', `Q${i + 1} audio OK: ${(audioBuffer.length / 1024).toFixed(0)} KB`);
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
    }, 'quiz'),
  );

  router.post(
    '/:pid/generate/image',
    handleGeneration(store, profileStore, async (ctx) => {
      logger.info('image', `Generating via agent... lang: ${ctx.lang}, ageGroup: ${ctx.ageGroup}`);
      const projectDir = store.getProjectDir(ctx.pid);
      const data = await generateImage(
        client,
        ctx.rawMarkdown,
        projectDir,
        ctx.pid,
        ctx.lang,
        ctx.ageGroup,
      );
      logger.info('image', 'OK');

      return {
        id: randomUUID(),
        title: autoTitle('image', data),
        createdAt: new Date().toISOString(),
        sourceIds: ctx.sourceIds,
        type: 'image',
        data,
      };
    }, 'mistral-large-latest', { checkRawMarkdown: true }),
  );

  // --- Fill-in-the-blanks ---
  router.post(
    '/:pid/generate/fill-blank',
    handleGeneration(store, profileStore, async (ctx) => {
      logger.info('fill-blank', `sources: ${ctx.project.sources.length}, markdown: ${ctx.markdown.length} chars, lang: ${ctx.lang}, ageGroup: ${ctx.ageGroup}`);
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
    }, 'quiz'),
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
    profileVoices?: { host: string; guest: string };
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
      const audioBuffer = await generateAudio(podcastResult.script, resolveVoices(ctx.config, ctx.profileVoices, ctx.lang), { provider: ctx.config.ttsProvider, model: ctx.config.ttsModel, mistralClient: ctx.client });
      const audioUrl = saveAudioFile(audioBuffer, ctx.store.getProjectDir(ctx.pid), ctx.pid, 'podcast');
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
      const ctxError = checkContextLimit(markdown, 'mistral-small-latest');
      if (ctxError) {
        res.status(400).json({ error: ctxError });
        return;
      }
      const pid = String(req.params.pid);
      const { result: route, usage: routeUsage } = await runWithUsageTracking(
        () => routeRequest(client, markdown, 'mistral-small-latest', lang, ageGroup),
      );
      const routeCost = persistUsage(store, pid, `POST /api/projects/${pid}/generate/route`, routeUsage);
      logger.info('route', `plan: [${route.plan.map((s) => s.agent).join(', ')}]`);
      res.json({ ...route, ...(routeCost && { costDelta: routeCost.cost }) });
    } catch (e) {
      const failedUsage = (e as any).apiUsage as ApiUsage[] | undefined;
      if (failedUsage?.length) {
        persistUsage(store, String(req.params.pid), `POST /api/projects/${req.params.pid}/generate/route/failed`, failedUsage);
      }
      logger.error('route', 'analysis error:', e);
      res.status(500).json({ error: String(e) });
    }
  });

  async function executePlan(plan: Array<{ agent: string }>, autoCtx: AutoCtx, st: ProjectStore, pid: string, generations: Generation[], failedSteps: string[]) {
    for (const step of plan) {
      try {
        const executor = AUTO_EXECUTORS[step.agent];
        if (executor) {
          const { result: gen, usage } = await runWithUsageTracking(() => executor(autoCtx));
          const persisted = persistUsage(st, pid, `POST /api/projects/${pid}/generate/auto/${step.agent}`, usage);
          if (persisted) {
            gen.usage = persisted.usage;
            gen.estimatedCost = persisted.cost;
            gen.costBreakdown = persisted.costBreakdown;
          }
          st.addGeneration(pid, gen);
          generations.push(gen);
          logger.info('auto', `${step.agent} OK`);
        } else {
          logger.warn('auto', `Unknown agent "${step.agent}", skipping`);
          failedSteps.push(step.agent);
        }
      } catch (err) {
        const failedUsage = (err as any).apiUsage as ApiUsage[] | undefined;
        if (failedUsage?.length) {
          persistUsage(st, pid, `POST /api/projects/${pid}/generate/auto/${step.agent}/failed`, failedUsage);
        }
        logger.error('auto', `${step.agent} FAILED:`, err);
        failedSteps.push(step.agent);
      }
    }
  }

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
      // Check context limit against the routing model
      const autoCtxError = checkContextLimit(markdown, 'mistral-small-latest');
      if (autoCtxError) {
        res.status(400).json({ error: autoCtxError });
        return;
      }
      const rawCount = req.body.count ? Number(req.body.count) : undefined;
      const count = rawCount && Number.isFinite(rawCount) ? Math.min(Math.max(Math.round(rawCount), 1), 50) : undefined;

      logger.info('auto', 'Smart routing: analyzing content...');
      const autoPid = String(req.params.pid);
      const { result: route, usage: autoRouteUsage } = await runWithUsageTracking(
        () => routeRequest(client, markdown, 'mistral-small-latest', lang, ageGroup),
      );
      persistUsage(store, autoPid, `POST /api/projects/${autoPid}/generate/auto/route`, autoRouteUsage);
      logger.info('route', `plan: [${route.plan.map((s) => s.agent).join(', ')}]`);

      const generations: Generation[] = [];
      const failedSteps: string[] = [];
      const sourceIds = resolveSourceIds(req.body, project.sources);
      const autoProfileId = project.meta?.profileId;
      const autoProfile = autoProfileId ? profileStore.get(autoProfileId) : null;
      const autoCtx: AutoCtx = { client, markdown, config, hasConsigne, lang, ageGroup, sourceIds, count, pid: req.params.pid, store, generations: project.results.generations, profileVoices: autoProfile?.mistralVoices };

      await executePlan(route.plan, autoCtx, store, req.params.pid, generations, failedSteps);

      res.json({ route: route.plan, generations, ...(failedSteps.length > 0 && { failedSteps }) });
    } catch (e) {
      const failedUsage = (e as any).apiUsage as ApiUsage[] | undefined;
      if (failedUsage?.length) {
        persistUsage(store, String(req.params.pid), `POST /api/projects/${req.params.pid}/generate/auto/failed`, failedUsage);
      }
      logger.error('auto', 'error:', e);
      res.status(500).json({ error: String(e) });
    }
  });

  return router;
}
