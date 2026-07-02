/* eslint-disable
   @typescript-eslint/no-misused-promises,
   @typescript-eslint/no-non-null-assertion,
   @typescript-eslint/no-redundant-type-constituents,
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-argument,
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-member-access
   --
   Codacy lance ESLint sans notre project TS complet sur les handlers Express/Mistral;
   lint:ci local reste la couverture type-aware. */
import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import { Mistral } from '@mistralai/mistralai';
import type {
  AgeGroup,
  Generation,
  QuizGeneration,
  QuizAttempt,
  QuizVocalGeneration,
  SummaryGeneration,
  FillBlankGeneration,
  FillBlankAttempt,
  DictationGeneration,
  DictationAttempt,
  FailedSection,
} from '../types.js';
import type { ProjectStore } from '../store.js';
import type { ProfileStore } from '../profiles.js';
import { getConfig, resolveVoices } from '../config.js';
import { transcribeAudio, verifyAnswer } from '../generators/quiz-vocal.js';
import { textToSpeech, type TtsOptions } from '../generators/tts-provider.js';
import type { VoiceId } from '../helpers/voice-types.js';
import { validateFillBlankAnswer } from '../helpers/fill-blank-validate.js';
import { diffDictation } from '../helpers/dictation-diff.js';
import { saveAudioFile } from '../helpers/audio-files.js';
import { concatMp3, generateSilence } from '../generators/tts.js';
import { runWithUsageTracking } from '../helpers/usage-context.js';
import { persistUsage } from '../helpers/cost-persist.js';
import type { ApiUsage } from '../helpers/pricing.js';
import { logger } from '../helpers/logger.js';
import { extractErrorCode } from '../helpers/error-codes.js';
import { aiLimiter } from '../helpers/rate-limit.js';
import { resolveClient, requireKeyMiddleware } from '../helpers/mistral-client-factory.js';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } }); // NOSONAR(S5693) — limite bornée volontaire (10 Mo) anti-DoS

const FILL_BLANK = 'fill-blank';
const DICTATION = 'dictation';
const ERR_ANSWERS_REQUIRED = 'answers requis';
const LOG_ATTEMPT_ERROR = 'attempt error';

type QuestionStats = Record<number, { correct: number; wrong: number }>;

// Phase 1B.1 — figer lang + ageGroup sur la génération (cf. décisions produit #4, #7).
// - lang : best-effort partiel via req.body.lang pour les quiz legacy (cf. #9).
//   Limite : si la locale UI a changé depuis la génération, le fallback sera incorrect.
// - ageGroup : pas de fallback body (le frontend ne l'envoie pas). Régression assumée
//   vers 'enfant' pour les quiz legacy (cf. #9).
function resolveVocalAnswerLocale(
  quizGen: QuizVocalGeneration,
  req: Request,
): { lang: string; ageGroup: AgeGroup } {
  return {
    lang: quizGen.lang ?? req.body.lang ?? 'fr',
    ageGroup: quizGen.ageGroup ?? 'enfant',
  };
}

const bumpQuestionStat = (stats: QuestionStats, qi: number, correct: boolean): void => {
  stats[qi] ??= { correct: 0, wrong: 0 };
  if (correct) stats[qi].correct++;
  else stats[qi].wrong++;
};

const scoreQuizAttempt = (
  quizGen: QuizGeneration,
  answers: Record<string, unknown>,
): { score: number; stats: NonNullable<QuizGeneration['stats']> } => {
  const stats = (quizGen.stats ??= { attempts: [], questionStats: {} });
  let score = 0;
  for (const [qiStr, ci] of Object.entries(answers)) {
    const qi = Number(qiStr);
    const correct = quizGen.data[qi]?.correct === Number(ci);
    if (correct) score++;
    bumpQuestionStat(stats.questionStats, qi, correct);
  }
  return { score, stats };
};

const scoreFillBlankAttempt = (
  fbGen: FillBlankGeneration,
  answers: Record<string, unknown>,
): {
  score: number;
  results: Record<number, boolean>;
  stats: NonNullable<FillBlankGeneration['stats']>;
} => {
  const stats = (fbGen.stats ??= { attempts: [], questionStats: {} });
  let score = 0;
  const results: Record<number, boolean> = {};
  for (const [qiStr, childAnswer] of Object.entries(answers)) {
    const qi = Number(qiStr);
    const correctAnswer = fbGen.data[qi]?.answer;
    if (!correctAnswer) continue;
    const { match } = validateFillBlankAnswer(String(childAnswer), correctAnswer);
    results[qi] = match;
    if (match) score++;
    bumpQuestionStat(stats.questionStats, qi, match);
  }
  return { score, results, stats };
};

// Comparaison STRICTE via diffDictation (accents significatifs) — le serveur reste
// la source de vérité du score, comme pour quiz/fill-blank.
const scoreDictationAttempt = (
  dGen: DictationGeneration,
  answers: Record<string, unknown>,
): {
  score: number;
  results: Record<number, boolean>;
  stats: NonNullable<DictationGeneration['stats']>;
} => {
  const stats = (dGen.stats ??= { attempts: [], questionStats: {} });
  let score = 0;
  // .at() + fromEntries plutôt que data[qi]/results[qi] : le plugin security de
  // Codacy flagge l'indexation dynamique en « Object Injection Sink » (faux
  // positif sur un index numérique, mais le fix structurel est aussi lisible).
  const entries: [number, boolean][] = [];
  for (const [qiStr, childAnswer] of Object.entries(answers)) {
    const qi = Number(qiStr);
    const expected = dGen.data.at(qi)?.word;
    if (!expected) continue;
    const { correct } = diffDictation(String(childAnswer), expected);
    entries.push([qi, correct]);
    if (correct) score++;
    bumpQuestionStat(stats.questionStats, qi, correct);
  }
  const results = Object.fromEntries(entries) as Record<number, boolean>;
  return { score, results, stats };
};

// --- Read Aloud (TTS) — helpers ---

function sectionText(d: SummaryGeneration['data'], s: string): string {
  if (s === 'intro') return `${d.title}. ${d.summary}`;
  if (s === 'key_points') return d.key_points.join('. ');
  if (s === 'fun_fact') return d.fun_fact || '';
  if (s === 'vocabulary')
    return (d.vocabulary || [])
      .map((v: { word: string; definition: string }) => `${v.word}: ${v.definition}`)
      .join('. ');
  return '';
}

// cf. CLAUDE.md "Pièges Lizard"
const readAloudText = (gen: Generation, section: string): string | null => {
  if (gen.type === 'summary') return sectionText(gen.data, section);
  return null;
};

const batchSectionsFor = (d: SummaryGeneration['data']): string[] => {
  const sections = ['intro', 'key_points'];
  if (d.fun_fact) sections.push('fun_fact');
  if (d.vocabulary?.length) sections.push('vocabulary');
  return sections;
};

const generateBatchAudio = async (
  gen: SummaryGeneration,
  voiceId: VoiceId,
  ttsOpts: TtsOptions,
  projectDir: string,
  pid: string,
): Promise<{ audioUrls: Record<string, string>; failedSections: FailedSection[] }> => {
  const d = gen.data;
  const audioUrls: Record<string, string> = {};
  const failedSections: FailedSection[] = [];
  const baseId = gen.id.slice(0, 8);
  for (const s of batchSectionsFor(d)) {
    const txt = sectionText(d, s);
    if (!txt) continue;
    try {
      const buf = await textToSpeech(txt.slice(0, 5000), voiceId, ttsOpts);
      audioUrls[s] = saveAudioFile(buf, projectDir, pid, `read-aloud-${baseId}-${s}`);
    } catch (err) {
      logger.error('tts', `section ${s} failed:`, err);
      failedSections.push({ section: s, code: extractErrorCode(err, 'tts') });
    }
  }
  return { audioUrls, failedSections };
};

interface BatchSummaryCtx {
  audioUrls: Record<string, string>;
  failedSections: FailedSection[];
  summaryGen: SummaryGeneration;
  store: ProjectStore;
  pid: string;
  gid: string;
  res: Response;
  costDelta?: number;
}

function handleBatchSummaryResult(ctx: BatchSummaryCtx): void {
  const { audioUrls, failedSections, summaryGen, store, pid, gid, res, costDelta } = ctx;
  if (Object.keys(audioUrls).length > 0) {
    const d = summaryGen.data;
    store.updateGeneration(pid, gid, {
      data: { ...d, audioUrls: { ...d.audioUrls, ...audioUrls } },
    });
  }
  if (failedSections.length > 0 && Object.keys(audioUrls).length === 0) {
    // All-fail: use the last captured error as the terminal batch failure code.
    // If codes diverge across sections (rare in practice since the pipeline is
    // sequential and a single upstream failure usually propagates), the last is
    // chosen as a convention, not a claim of superior representativeness.
    const lastCode = failedSections.at(-1)!.code;
    res.status(500).json({ error: lastCode });
    return;
  }
  res.json({
    audioUrls,
    ...(failedSections.length > 0 && { failedSections }),
    ...(costDelta && { costDelta }),
  });
}

async function generateFlashcardsAudio(
  cards: Array<{ question: string; answer: string }>,
  voices: { host: VoiceId; guest: VoiceId },
  ttsOpts: TtsOptions,
): Promise<Buffer> {
  const silenceBuffer = cards.length > 1 ? await generateSilence(1200) : null;
  const segments: Buffer[] = [];
  for (let i = 0; i < cards.length; i++) {
    const q = await textToSpeech(cards[i].question.slice(0, 5000), voices.host, ttsOpts);
    const a = await textToSpeech(cards[i].answer.slice(0, 5000), voices.guest, ttsOpts);
    const cardSegments = silenceBuffer && i < cards.length - 1 ? [q, a, silenceBuffer] : [q, a];
    segments.push(...cardSegments);
  }
  return concatMp3(segments);
}

interface SectionAudioCtx {
  gen: Generation;
  section: string;
  voiceId: VoiceId;
  ttsOpts: TtsOptions;
  projectDir: string;
  pid: string;
  baseId: string;
  store: ProjectStore;
  gid: string;
}

async function generateSectionAudio(ctx: SectionAudioCtx, res: Response): Promise<string | null> {
  const { gen, section, voiceId, ttsOpts, projectDir, pid, baseId, store, gid } = ctx;
  const text = readAloudText(gen, section);
  if (text === null) {
    res.status(400).json({ error: 'Type non supporte pour la lecture' });
    return null;
  }
  if (!text.trim()) {
    res.status(400).json({ error: 'Texte vide pour cette section' });
    return null;
  }

  const audioBuffer = await textToSpeech(text.slice(0, 5000), voiceId, ttsOpts);
  const audioUrl = saveAudioFile(audioBuffer, projectDir, pid, `read-aloud-${baseId}-${section}`);

  if (gen.type === 'summary') {
    const d = gen.data;
    store.updateGeneration(pid, gid, {
      data: { ...d, audioUrls: { ...d.audioUrls, [section]: audioUrl } },
    });
  }
  return audioUrl;
}

function resolveReadAloudContext(
  store: ProjectStore,
  profileStore: ProfileStore,
  client: Mistral,
  pid: string,
  lang?: string,
) {
  const config = getConfig();
  const project = store.getProject(pid);
  const profileId = project?.meta?.profileId;
  const profile = profileId ? profileStore.get(profileId) : null;
  // Passe profileId + flow='read-aloud' pour que la rotation déterministe par profil
  // s'applique aussi ici et que les logs de fallback soient contextualisés.
  const voices = resolveVoices({
    profileVoices: profile?.mistralVoices,
    lang: lang || profile?.locale || 'fr',
    profileId,
    flow: 'read-aloud',
  });
  const ttsOpts = {
    model: config.ttsModel,
    mistralClient: client,
  } as const;
  return {
    config,
    profile,
    voices,
    voiceId: voices.host,
    ttsOpts,
    projectDir: store.getProjectDir(pid),
  };
}

export function generationCrudRoutes(store: ProjectStore, profileStore: ProfileStore): Router {
  const router = Router();

  router.use(aiLimiter);

  // Auth-first : résout le client (header > env) ou répond 4xx stable.
  const resolveOr4xx = (req: Request, res: Response): Mistral | null => {
    const r = resolveClient(req);
    if (r.ok) return r.client;
    res.status(r.status).json({ error: r.error });
    return null;
  };

  // --- Quiz attempt (save score) ---
  router.post('/:pid/generations/:gid/quiz-attempt', async (req, res) => {
    try {
      const { answers } = req.body;
      if (!answers || typeof answers !== 'object') {
        res.status(400).json({ error: ERR_ANSWERS_REQUIRED });
        return;
      }
      const gen = store.getGeneration(req.params.pid, req.params.gid);
      if (gen?.type !== 'quiz') {
        res.status(404).json({ error: 'Quiz introuvable' });
        return;
      }

      const quizGen = gen as QuizGeneration; // NOSONAR(S4325) — type narrowing after gen?.type === 'quiz' guard
      const { score, stats } = scoreQuizAttempt(quizGen, answers);
      const attempt: QuizAttempt = {
        date: new Date().toISOString(),
        answers: answers as Record<number, number>,
        score,
        total: quizGen.data.length,
      };
      stats.attempts.push(attempt);

      store.updateGeneration(req.params.pid, req.params.gid, {
        stats,
      });
      res.json({ attempt, stats });
    } catch (e) {
      logger.error('quiz', LOG_ATTEMPT_ERROR, { pid: req.params.pid, gid: req.params.gid }, e);
      res.status(500).json({ error: extractErrorCode(e, 'quiz') });
    }
  });

  // --- Fill-blank attempt (save score) ---
  router.post('/:pid/generations/:gid/fill-blank-attempt', async (req, res) => {
    try {
      const { answers } = req.body;
      if (!answers || typeof answers !== 'object') {
        res.status(400).json({ error: ERR_ANSWERS_REQUIRED });
        return;
      }
      const gen = store.getGeneration(req.params.pid, req.params.gid);
      if (gen?.type !== FILL_BLANK) {
        res.status(404).json({ error: 'Exercice a trous introuvable' });
        return;
      }

      const fbGen = gen as FillBlankGeneration; // NOSONAR(S4325) — type narrowing after gen?.type === 'fill-blank' guard
      const { score, results, stats } = scoreFillBlankAttempt(fbGen, answers);
      const attempt: FillBlankAttempt = {
        date: new Date().toISOString(),
        answers: answers as Record<number, string>,
        results,
        score,
        total: fbGen.data.length,
      };
      stats.attempts.push(attempt);

      store.updateGeneration(req.params.pid, req.params.gid, {
        stats,
      });
      res.json({ attempt, stats, results });
    } catch (e) {
      logger.error(FILL_BLANK, LOG_ATTEMPT_ERROR, { pid: req.params.pid, gid: req.params.gid }, e);
      res.status(500).json({ error: extractErrorCode(e, FILL_BLANK) });
    }
  });

  router.post('/:pid/generations/:gid/dictation-attempt', (req, res) => {
    try {
      const { answers } = req.body;
      if (!answers || typeof answers !== 'object') {
        res.status(400).json({ error: ERR_ANSWERS_REQUIRED });
        return;
      }
      const gen = store.getGeneration(req.params.pid, req.params.gid);
      if (gen?.type !== DICTATION) {
        res.status(404).json({ error: 'Entrainement introuvable' });
        return;
      }

      const { score, results, stats } = scoreDictationAttempt(gen, answers);
      const attempt: DictationAttempt = {
        date: new Date().toISOString(),
        answers: answers as Record<number, string>,
        results,
        score,
        total: gen.data.length,
      };
      stats.attempts.push(attempt);

      store.updateGeneration(req.params.pid, req.params.gid, { stats });
      res.json({ attempt, stats, results });
    } catch (e) {
      logger.error(DICTATION, LOG_ATTEMPT_ERROR, { pid: req.params.pid, gid: req.params.gid }, e);
      res.status(500).json({ error: extractErrorCode(e, DICTATION) });
    }
  });

  // --- Rename generation ---
  router.put('/:pid/generations/:gid', (req, res) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
      res.status(400).json({ error: 'title requis' });
      return;
    }
    const updated = store.updateGeneration(req.params.pid, req.params.gid, {
      title,
    });
    if (!updated) {
      res.status(404).json({ error: 'Generation introuvable' });
      return;
    }
    res.json(updated);
  });

  // --- Delete generation ---
  router.delete('/:pid/generations/:gid', (req, res) => {
    // 404 si aucune génération n'a effectivement été retirée (project missing
    // OU gid inconnu). Sinon double-delete (race entre 2 onglets) renvoie 200
    // sur la 2e tentative et le user voit un toast "supprimé" trompeur.
    const ok = store.deleteGeneration(req.params.pid, req.params.gid);
    if (!ok) {
      res.status(404).json({ error: 'generation_not_found' });
      return;
    }
    res.json({ ok: true });
  });

  // --- Cancel pending generation ---
  // Marque le pending tracker entry comme 'cancelled'. Émet un event SSE pour
  // que les clients connectés mettent à jour leur UI. Limite acceptée : la
  // requête Mistral en cours côté serveur n'est PAS interruptible (SDK ne le
  // permet pas), donc la facturation peut continuer. Le cancel signifie "on
  // ignore la réponse quand elle arrive" — promoteToGeneration retournera
  // {kind: 'cancelled'} et le handler initial répondra 409 (sans 200 fantôme).
  router.post('/:pid/generations/:gid/cancel', (req, res) => {
    const ok = store.markPendingCancelled(req.params.pid, req.params.gid);
    if (!ok) {
      // Code stable pour mapping i18n côté UI (cf. CLAUDE.md "Codes d'erreur API").
      res.status(404).json({ error: 'pending_not_found' });
      return;
    }
    res.json({ ok: true, status: 'cancelled' });
  });

  // Sous-helper : valide la cible vocal-answer (gen quiz-vocal + question +
  // file). Retourne le triplet validé, ou null après envoi de la réponse 4xx.
  function validateVocalAnswerTarget(
    req: Request,
    res: Response,
  ): { quizGen: QuizVocalGeneration; question: QuizVocalGeneration['data'][number] } | null {
    const pid = String(req.params.pid);
    const gid = String(req.params.gid);
    const gen = store.getGeneration(pid, gid);
    if (gen?.type !== 'quiz-vocal') {
      res.status(404).json({ error: 'Quiz vocal introuvable' });
      return null;
    }
    const quizGen = gen as QuizVocalGeneration; // NOSONAR(S4325) — type narrowing
    const questionIndex = Number(req.body.questionIndex ?? 0);
    const question = quizGen.data[questionIndex];
    if (!question) {
      res.status(400).json({ error: 'Index de question invalide' });
      return null;
    }
    if (!req.file) {
      res.status(400).json({ error: 'Fichier audio requis' });
      return null;
    }
    return { quizGen, question };
  }

  // --- Quiz vocal: verify spoken answer ---
  // requireKeyMiddleware AVANT multer → pas d'upload audio écrit en mémoire sans clé.
  router.post(
    '/:pid/generations/:gid/vocal-answer',
    requireKeyMiddleware,
    upload.single('audio'),
    async (req, res) => {
      const client = resolveOr4xx(req, res);
      if (!client) return;
      try {
        const target = validateVocalAnswerTarget(req, res);
        if (!target) return;
        const { quizGen, question } = target;
        const { lang, ageGroup } = resolveVocalAnswerLocale(quizGen, req);
        const config = getConfig();
        const transcription = await transcribeAudio(client, req.file!.buffer, 'answer.webm', lang); // NOSONAR(S4325) — multer middleware guarantees req.file
        const result = await verifyAnswer(
          client,
          question.question,
          question.choices,
          question.correct,
          transcription,
          { model: config.models.quizVerify, lang, ageGroup },
        );

        res.json({ correct: result.correct, feedback: result.feedback, transcription });
      } catch (e) {
        logger.error('quiz-vocal', 'vocal answer error:', e);
        // Agent 'stt' : le chemin passe par transcribeAudio en premier ; les erreurs upstream
        // côté transcription doivent pouvoir matcher tts_upstream_error via TTS_AGENTS.
        res.status(500).json({ error: extractErrorCode(e, 'stt') });
      }
    },
  );

  const VALID_READ_ALOUD_SECTIONS = new Set([
    'intro',
    'key_points',
    'fun_fact',
    'vocabulary',
    'all',
  ]);

  // Sous-helper extrait : valide la cible read-aloud (gen + section). Retourne
  // null après envoi d'une réponse 4xx si invalide.
  function validateReadAloudTarget(
    pid: string,
    req: Request,
    res: Response,
  ): { gen: NonNullable<ReturnType<typeof store.getGeneration>>; section: string } | null {
    const gid = String(req.params.gid);
    const gen = store.getGeneration(pid, gid);
    if (!gen) {
      res.status(404).json({ error: 'Generation introuvable' });
      return null;
    }
    const section = req.body.section || 'all';
    if (!VALID_READ_ALOUD_SECTIONS.has(section)) {
      res.status(400).json({ error: 'Section invalide' });
      return null;
    }
    return { gen, section };
  }

  // Contexte commun aux 3 pipelines read-aloud (batch summary / flashcards /
  // section unique). Bundle les 7 valeurs résolues en amont (resolveReadAloud
  // Context + identifiants gén/projet) en un seul argument structuré pour
  // rester sous la limite Codacy "max 8 paramètres" par helper.
  type ReadAloudCtx = {
    pid: string;
    gid: string;
    gen: NonNullable<ReturnType<typeof store.getGeneration>>;
    voiceId: VoiceId;
    voices: { host: VoiceId; guest: VoiceId };
    ttsOpts: TtsOptions;
    projectDir: string;
    baseId: string;
  };

  // Sous-helper : pipeline batch summary all-sections.
  async function runBatchSummaryReadAloud(
    ctx: ReadAloudCtx,
    summaryGen: SummaryGeneration,
    res: Response,
  ): Promise<void> {
    const { result: batchResult, usage: batchUsage } = await runWithUsageTracking(() =>
      generateBatchAudio(summaryGen, ctx.voiceId, ctx.ttsOpts, ctx.projectDir, ctx.pid),
    );
    const batchCost = persistUsage(
      store,
      ctx.pid,
      `POST /api/projects/${ctx.pid}/read-aloud/batch`,
      batchUsage,
    );
    handleBatchSummaryResult({
      audioUrls: batchResult.audioUrls,
      failedSections: batchResult.failedSections,
      summaryGen,
      store,
      pid: ctx.pid,
      gid: ctx.gid,
      res,
      costDelta: batchCost?.cost,
    });
  }

  // Sous-helper : pipeline dual-voice flashcards.
  async function runFlashcardsReadAloud(ctx: ReadAloudCtx, res: Response): Promise<void> {
    const cards = ctx.gen.data as Array<{ question: string; answer: string }>; // NOSONAR(S4325) — type narrowing
    const { result: audioBuffer, usage: fcUsage } = await runWithUsageTracking(() =>
      generateFlashcardsAudio(cards, ctx.voices, ctx.ttsOpts),
    );
    const fcCost = persistUsage(
      store,
      ctx.pid,
      `POST /api/projects/${ctx.pid}/read-aloud/flashcards`,
      fcUsage,
    );
    const audioUrl = saveAudioFile(
      audioBuffer,
      ctx.projectDir,
      ctx.pid,
      `read-aloud-${ctx.baseId}-all`,
    );
    res.json({ audioUrl, ...(fcCost && { costDelta: fcCost.cost }) });
  }

  // Sous-helper : pipeline section unique.
  async function runSingleSectionReadAloud(
    ctx: ReadAloudCtx,
    section: string,
    res: Response,
  ): Promise<void> {
    const { result: audioUrl, usage: secUsage } = await runWithUsageTracking(() =>
      generateSectionAudio(
        {
          gen: ctx.gen,
          section,
          voiceId: ctx.voiceId,
          ttsOpts: ctx.ttsOpts,
          projectDir: ctx.projectDir,
          pid: ctx.pid,
          baseId: ctx.baseId,
          store,
          gid: ctx.gid,
        },
        res,
      ),
    );
    const secCost = persistUsage(
      store,
      ctx.pid,
      `POST /api/projects/${ctx.pid}/read-aloud/${section}`,
      secUsage,
    );
    if (audioUrl) res.json({ audioUrl, ...(secCost && { costDelta: secCost.cost }) });
  }

  // Sous-helper extrait : dispatche entre les 3 pipelines selon (gen.type, section).
  async function runReadAloudPipeline(
    ctx: ReadAloudCtx,
    section: string,
    res: Response,
  ): Promise<void> {
    if (section === 'all' && ctx.gen.type === 'summary') {
      await runBatchSummaryReadAloud(ctx, ctx.gen as SummaryGeneration, res); // NOSONAR(S4325) — narrow after gen.type === 'summary'
      return;
    }
    if (ctx.gen.type === 'flashcards') {
      await runFlashcardsReadAloud(ctx, res);
      return;
    }
    await runSingleSectionReadAloud(ctx, section, res);
  }

  // --- Read Aloud (TTS) ---
  router.post('/:pid/generations/:gid/read-aloud', async (req, res) => {
    const client = resolveOr4xx(req, res);
    if (!client) return;
    const pid = String(req.params.pid);
    try {
      const validated = validateReadAloudTarget(pid, req, res);
      if (!validated) return;
      const { gen, section } = validated;
      const gid = String(req.params.gid);
      const { voiceId, voices, ttsOpts, projectDir } = resolveReadAloudContext(
        store,
        profileStore,
        client,
        pid,
        req.body.lang,
      );
      const baseId = gen.id.slice(0, 8);
      const ctx: ReadAloudCtx = { pid, gid, gen, voiceId, voices, ttsOpts, projectDir, baseId };
      await runReadAloudPipeline(ctx, section, res);
    } catch (e) {
      const failedUsage = (e as { apiUsage?: ApiUsage[] }).apiUsage;
      if (failedUsage?.length) {
        persistUsage(store, pid, `POST /api/projects/${pid}/read-aloud/failed`, failedUsage);
      }
      logger.error('tts', 'read-aloud error', { pid: req.params.pid, gid: req.params.gid }, e);
      res.status(500).json({ error: extractErrorCode(e, 'tts') });
    }
  });

  return router;
}
