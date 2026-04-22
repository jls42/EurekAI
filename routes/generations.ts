import { Router, type Response } from 'express';
import multer from 'multer';
import { Mistral } from '@mistralai/mistralai';
import type {
  Generation,
  QuizGeneration,
  QuizAttempt,
  QuizVocalGeneration,
  SummaryGeneration,
  FillBlankGeneration,
  FillBlankAttempt,
} from '../types.js';
import type { ProjectStore } from '../store.js';
import type { ProfileStore } from '../profiles.js';
import { getConfig, resolveVoices } from '../config.js';
import { transcribeAudio, verifyAnswer } from '../generators/quiz-vocal.js';
import { textToSpeech, type TtsOptions } from '../generators/tts-provider.js';
import type { VoiceId } from '../helpers/voice-types.js';
import { validateFillBlankAnswer } from '../helpers/fill-blank-validate.js';
import { saveAudioFile } from '../helpers/audio-files.js';
import { concatMp3, generateSilence } from '../generators/tts.js';
import { runWithUsageTracking } from '../helpers/usage-context.js';
import { persistUsage } from '../helpers/cost-persist.js';
import type { ApiUsage } from '../helpers/pricing.js';
import { logger } from '../helpers/logger.js';
import { extractErrorCode } from '../helpers/error-codes.js';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const FILL_BLANK = 'fill-blank';

type QuestionStats = Record<number, { correct: number; wrong: number }>;

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
): Promise<{ audioUrls: Record<string, string>; failedSections: string[] }> => {
  const d = gen.data;
  const audioUrls: Record<string, string> = {};
  const failedSections: string[] = [];
  const baseId = gen.id.slice(0, 8);
  for (const s of batchSectionsFor(d)) {
    const txt = sectionText(d, s);
    if (!txt) continue;
    try {
      const buf = await textToSpeech(txt.slice(0, 5000), voiceId, ttsOpts);
      audioUrls[s] = saveAudioFile(buf, projectDir, pid, `read-aloud-${baseId}-${s}`);
    } catch (err) {
      logger.error('tts', `section ${s} failed:`, err);
      failedSections.push(s);
    }
  }
  return { audioUrls, failedSections };
};

interface BatchSummaryCtx {
  audioUrls: Record<string, string>;
  failedSections: string[];
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
    } as Partial<SummaryGeneration>);
  }
  if (failedSections.length > 0 && Object.keys(audioUrls).length === 0) {
    res.status(500).json({ error: 'TTS failed for all sections' });
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
    } as Partial<SummaryGeneration>);
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
  const voices = resolveVoices(config, profile?.mistralVoices, lang, profileId, 'read-aloud');
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

export function generationCrudRoutes(
  store: ProjectStore,
  client: Mistral,
  profileStore: ProfileStore,
): Router {
  const router = Router();

  // --- Quiz attempt (save score) ---
  router.post('/:pid/generations/:gid/quiz-attempt', async (req, res) => {
    try {
      const { answers } = req.body;
      if (!answers || typeof answers !== 'object') {
        res.status(400).json({ error: 'answers requis' });
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
      } as Partial<QuizGeneration>);
      res.json({ attempt, stats });
    } catch (e) {
      logger.error('quiz', 'attempt error:', e);
      res.status(500).json({ error: extractErrorCode(e, 'quiz') });
    }
  });

  // --- Fill-blank attempt (save score) ---
  router.post('/:pid/generations/:gid/fill-blank-attempt', async (req, res) => {
    try {
      const { answers } = req.body;
      if (!answers || typeof answers !== 'object') {
        res.status(400).json({ error: 'answers requis' });
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
      } as Partial<FillBlankGeneration>);
      res.json({ attempt, stats, results });
    } catch (e) {
      logger.error(FILL_BLANK, 'attempt error:', e);
      res.status(500).json({ error: extractErrorCode(e, FILL_BLANK) });
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
    } as Partial<Generation>);
    if (!updated) {
      res.status(404).json({ error: 'Generation introuvable' });
      return;
    }
    res.json(updated);
  });

  // --- Delete generation ---
  router.delete('/:pid/generations/:gid', (req, res) => {
    store.deleteGeneration(req.params.pid, req.params.gid);
    res.json({ ok: true });
  });

  // --- Quiz vocal: verify spoken answer ---
  router.post('/:pid/generations/:gid/vocal-answer', upload.single('audio'), async (req, res) => {
    try {
      const pid = String(req.params.pid);
      const gid = String(req.params.gid);
      const gen = store.getGeneration(pid, gid);
      if (gen?.type !== 'quiz-vocal') {
        res.status(404).json({ error: 'Quiz vocal introuvable' });
        return;
      }
      const questionIndex = Number(req.body.questionIndex ?? 0);
      const quizGen = gen as QuizVocalGeneration; // NOSONAR(S4325) — type narrowing after gen?.type === 'quiz-vocal' guard
      const question = quizGen.data[questionIndex];
      if (!question) {
        res.status(400).json({ error: 'Index de question invalide' });
        return;
      }

      if (!req.file) {
        res.status(400).json({ error: 'Fichier audio requis' });
        return;
      }

      // Phase 1B.1 — figer lang + ageGroup sur la génération (cf. décisions produit #4, #7).
      // - lang : best-effort partiel via req.body.lang pour les quiz legacy (cf. #9).
      //   Limite : si la locale UI a changé depuis la génération, le fallback sera incorrect.
      // - ageGroup : pas de fallback body (le frontend ne l'envoie pas). Régression assumée
      //   vers 'enfant' pour les quiz legacy (cf. #9).
      const lang = quizGen.lang ?? req.body.lang ?? 'fr';
      const ageGroup = quizGen.ageGroup ?? 'enfant';
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
  });

  // --- Read Aloud (TTS) ---
  router.post('/:pid/generations/:gid/read-aloud', async (req, res) => {
    const pid = String(req.params.pid);
    try {
      const gid = String(req.params.gid);
      const gen = store.getGeneration(pid, gid);
      if (!gen) {
        res.status(404).json({ error: 'Generation introuvable' });
        return;
      }

      const section = req.body.section || 'all';
      const VALID_SECTIONS = new Set(['intro', 'key_points', 'fun_fact', 'vocabulary', 'all']);
      if (!VALID_SECTIONS.has(section)) {
        res.status(400).json({ error: 'Section invalide' });
        return;
      }

      const { voiceId, voices, ttsOpts, projectDir } = resolveReadAloudContext(
        store,
        profileStore,
        client,
        pid,
        req.body.lang,
      );
      const baseId = gen.id.slice(0, 8);

      // Batch mode: generate all sections individually for summaries
      if (section === 'all' && gen.type === 'summary') {
        const summaryGen = gen as SummaryGeneration; // NOSONAR(S4325) — narrow once for batch block
        const { result: batchResult, usage: batchUsage } = await runWithUsageTracking(() =>
          generateBatchAudio(summaryGen, voiceId, ttsOpts, projectDir, pid),
        );
        const batchCost = persistUsage(
          store,
          pid,
          `POST /api/projects/${pid}/read-aloud/batch`,
          batchUsage,
        );
        handleBatchSummaryResult({
          audioUrls: batchResult.audioUrls,
          failedSections: batchResult.failedSections,
          summaryGen,
          store,
          pid,
          gid,
          res,
          costDelta: batchCost?.cost,
        });
        return;
      }

      // Dual-voice flashcards: host=questions, guest=answers, silence between cards
      if (gen.type === 'flashcards') {
        const cards = gen.data as Array<{ question: string; answer: string }>; // NOSONAR(S4325) — type narrowing after gen.type check
        const { result: audioBuffer, usage: fcUsage } = await runWithUsageTracking(() =>
          generateFlashcardsAudio(cards, voices, ttsOpts),
        );
        const fcCost = persistUsage(
          store,
          pid,
          `POST /api/projects/${pid}/read-aloud/flashcards`,
          fcUsage,
        );
        const audioUrl = saveAudioFile(audioBuffer, projectDir, pid, `read-aloud-${baseId}-all`);
        res.json({ audioUrl, ...(fcCost && { costDelta: fcCost.cost }) });
        return;
      }

      // Single section (summary)
      const { result: audioUrl, usage: secUsage } = await runWithUsageTracking(() =>
        generateSectionAudio(
          { gen, section, voiceId, ttsOpts, projectDir, pid, baseId, store, gid },
          res,
        ),
      );
      const secCost = persistUsage(
        store,
        pid,
        `POST /api/projects/${pid}/read-aloud/${section}`,
        secUsage,
      );
      if (audioUrl) res.json({ audioUrl, ...(secCost && { costDelta: secCost.cost }) });
    } catch (e) {
      const failedUsage = (e as { apiUsage?: ApiUsage[] }).apiUsage;
      if (failedUsage?.length) {
        persistUsage(store, pid, `POST /api/projects/${pid}/read-aloud/failed`, failedUsage);
      }
      logger.error('tts', 'read-aloud error:', e);
      res.status(500).json({ error: extractErrorCode(e, 'tts') });
    }
  });

  return router;
}
