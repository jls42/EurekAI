import { Router } from 'express';
import multer from 'multer';
import { Mistral } from '@mistralai/mistralai';
import type {
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
import { textToSpeech } from '../generators/tts-provider.js';
import { validateFillBlankAnswer } from '../helpers/fill-blank-validate.js';
import { saveAudioFile } from '../helpers/audio-files.js';
import { concatMp3, generateSilence } from '../generators/tts.js';
import { withCostTracking } from '../helpers/cost-middleware.js';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// --- Read Aloud (TTS) — helpers ---

function sectionText(d: SummaryGeneration['data'], s: string): string {
  if (s === 'intro') return `${d.title}. ${d.summary}`;
  if (s === 'key_points') return d.key_points.join('. ');
  if (s === 'fun_fact') return d.fun_fact || '';
  if (s === 'vocabulary') return (d.vocabulary || []).map((v: { word: string; definition: string }) => `${v.word}: ${v.definition}`).join('. ');
  return '';
}

function readAloudText(gen: any, section: string): string | null {
  if (gen.type === 'summary') return sectionText((gen as SummaryGeneration).data, section); // NOSONAR(S4325) — type narrowing after gen.type check
  return null;
}

async function generateBatchAudio(
  gen: SummaryGeneration, voiceId: string, ttsOpts: any, projectDir: string, pid: string,
): Promise<{ audioUrls: Record<string, string>; failedSections: string[] }> {
  const d = gen.data;
  const sections = ['intro', 'key_points'];
  if (d.fun_fact) sections.push('fun_fact');
  if (d.vocabulary?.length) sections.push('vocabulary');
  const audioUrls: Record<string, string> = {};
  const failedSections: string[] = [];
  const baseId = gen.id.slice(0, 8);
  for (const s of sections) {
    const txt = sectionText(d, s);
    if (!txt) continue;
    try {
      const buf = await textToSpeech(txt.slice(0, 5000), voiceId, ttsOpts);
      audioUrls[s] = saveAudioFile(buf, projectDir, pid, `read-aloud-${baseId}-${s}`);
    } catch (err) {
      console.error(`TTS failed for section ${s}:`, err);
      failedSections.push(s);
    }
  }
  return { audioUrls, failedSections };
}

function handleBatchSummaryResult(
  audioUrls: Record<string, string>,
  failedSections: string[],
  summaryGen: SummaryGeneration,
  store: ProjectStore,
  pid: string,
  gid: string,
  res: any,
): void {
  if (Object.keys(audioUrls).length > 0) {
    const d = summaryGen.data;
    store.updateGeneration(pid, gid, { data: { ...d, audioUrls: { ...d.audioUrls, ...audioUrls } } } as any);
  }
  if (failedSections.length > 0 && Object.keys(audioUrls).length === 0) {
    res.status(500).json({ error: 'TTS failed for all sections' });
    return;
  }
  res.json({ audioUrls, ...(failedSections.length > 0 && { failedSections }) });
}

async function generateFlashcardsAudio(
  cards: Array<{ question: string; answer: string }>,
  voices: { host: string; guest: string },
  ttsOpts: any,
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
  gen: any; section: string; voiceId: string; ttsOpts: any;
  projectDir: string; pid: string; baseId: string; store: ProjectStore; gid: string;
}

async function generateSectionAudio(ctx: SectionAudioCtx, res: any): Promise<string | null> {
  const { gen, section, voiceId, ttsOpts, projectDir, pid, baseId, store, gid } = ctx;
  const text = readAloudText(gen, section);
  if (text === null) { res.status(400).json({ error: 'Type non supporte pour la lecture' }); return null; }
  if (!text.trim()) { res.status(400).json({ error: 'Texte vide pour cette section' }); return null; }

  const audioBuffer = await textToSpeech(text.slice(0, 5000), voiceId, ttsOpts);
  const audioUrl = saveAudioFile(audioBuffer, projectDir, pid, `read-aloud-${baseId}-${section}`);

  if (gen.type === 'summary') {
    const d = (gen as SummaryGeneration).data; // NOSONAR(S4325) — type narrowing after gen.type check
    store.updateGeneration(pid, gid, { data: { ...d, audioUrls: { ...d.audioUrls, [section]: audioUrl } } } as any);
  }
  return audioUrl;
}

function resolveReadAloudContext(store: ProjectStore, profileStore: ProfileStore, client: Mistral, pid: string, lang?: string) {
  const config = getConfig();
  const project = store.getProject(pid);
  const profileId = project?.meta?.profileId;
  const profile = profileId ? profileStore.get(profileId) : null;
  const voices = resolveVoices(config, profile?.mistralVoices, lang);
  const ttsOpts = { provider: config.ttsProvider, model: config.ttsModel, mistralClient: client } as const;
  return { config, profile, voices, voiceId: voices.host, ttsOpts, projectDir: store.getProjectDir(pid) };
}

export function generationCrudRoutes(store: ProjectStore, client: Mistral, profileStore: ProfileStore): Router {
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
      quizGen.stats ??= { attempts: [], questionStats: {} };

      let score = 0;
      const total = quizGen.data.length;
      for (const [qiStr, ci] of Object.entries(answers)) {
        const qi = Number(qiStr);
        const correct = quizGen.data[qi]?.correct === Number(ci);
        if (correct) score++;
        if (!quizGen.stats.questionStats[qi]) {
          quizGen.stats.questionStats[qi] = { correct: 0, wrong: 0 };
        }
        if (correct) quizGen.stats.questionStats[qi].correct++;
        else quizGen.stats.questionStats[qi].wrong++;
      }

      const attempt: QuizAttempt = {
        date: new Date().toISOString(),
        answers: answers as Record<number, number>,
        score,
        total,
      };
      quizGen.stats.attempts.push(attempt);

      store.updateGeneration(req.params.pid, req.params.gid, { stats: quizGen.stats } as any);
      res.json({ attempt, stats: quizGen.stats });
    } catch (e) {
      console.error('Quiz attempt error:', e);
      res.status(500).json({ error: String(e) });
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
      if (gen?.type !== 'fill-blank') {
        res.status(404).json({ error: 'Exercice a trous introuvable' });
        return;
      }

      const fbGen = gen as FillBlankGeneration; // NOSONAR(S4325) — type narrowing after gen?.type === 'fill-blank' guard
      fbGen.stats ??= { attempts: [], questionStats: {} };

      let score = 0;
      const total = fbGen.data.length;
      const results: Record<number, boolean> = {};

      for (const [qiStr, childAnswer] of Object.entries(answers)) {
        const qi = Number(qiStr);
        const correctAnswer = fbGen.data[qi]?.answer;
        if (!correctAnswer) continue;

        const { match } = validateFillBlankAnswer(String(childAnswer), correctAnswer);
        results[qi] = match;
        if (match) score++;

        if (!fbGen.stats.questionStats[qi]) {
          fbGen.stats.questionStats[qi] = { correct: 0, wrong: 0 };
        }
        if (match) fbGen.stats.questionStats[qi].correct++;
        else fbGen.stats.questionStats[qi].wrong++;
      }

      const attempt: FillBlankAttempt = {
        date: new Date().toISOString(),
        answers: answers as Record<number, string>,
        results,
        score,
        total,
      };
      fbGen.stats.attempts.push(attempt);

      store.updateGeneration(req.params.pid, req.params.gid, { stats: fbGen.stats } as any);
      res.json({ attempt, stats: fbGen.stats, results });
    } catch (e) {
      console.error('Fill-blank attempt error:', e);
      res.status(500).json({ error: String(e) });
    }
  });

  // --- Rename generation ---
  router.put('/:pid/generations/:gid', (req, res) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
      res.status(400).json({ error: 'title requis' });
      return;
    }
    const updated = store.updateGeneration(req.params.pid, req.params.gid, { title } as any);
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

      const lang = req.body.lang || 'fr';
      const config = getConfig();
      console.log('  Transcribing vocal answer...');
      const transcription = await transcribeAudio(client, req.file!.buffer, 'answer.webm', lang); // NOSONAR(S4325) — multer middleware guarantees req.file
      console.log(`  Transcription: '${transcription}'`);
      console.log('  Verifying answer...');
      const result = await verifyAnswer(
        client,
        question.question,
        question.choices,
        question.correct,
        transcription,
        config.models.quizVerify,
        lang,
      );
      console.log(`  Result: ${result.correct ? 'correct' : 'incorrect'} — ${result.feedback}`);

      res.json({ correct: result.correct, feedback: result.feedback, transcription });
    } catch (e) {
      console.error('Vocal answer error:', e);
      res.status(500).json({ error: String(e) });
    }
  });

  // --- Read Aloud (TTS) ---
  router.post('/:pid/generations/:gid/read-aloud', withCostTracking(store, async (req, res) => {
    try {
      const gen = store.getGeneration(req.params.pid, req.params.gid);
      if (!gen) { res.status(404).json({ error: 'Generation introuvable' }); return; }

      const section = req.body.section || 'all';
      const VALID_SECTIONS = new Set(['intro', 'key_points', 'fun_fact', 'vocabulary', 'all']);
      if (!VALID_SECTIONS.has(section)) { res.status(400).json({ error: 'Section invalide' }); return; }

      const { voiceId, voices, ttsOpts, projectDir } = resolveReadAloudContext(store, profileStore, client, req.params.pid, req.body.lang);
      const baseId = gen.id.slice(0, 8);

      // Batch mode: generate all sections individually for summaries
      if (section === 'all' && gen.type === 'summary') {
        const summaryGen = gen as SummaryGeneration; // NOSONAR(S4325) — narrow once for batch block
        const { audioUrls, failedSections } = await generateBatchAudio(summaryGen, voiceId, ttsOpts, projectDir, req.params.pid);
        handleBatchSummaryResult(audioUrls, failedSections, summaryGen, store, req.params.pid, req.params.gid, res);
        return;
      }

      // Dual-voice flashcards: host=questions, guest=answers, silence between cards
      if (gen.type === 'flashcards') {
        const cards = gen.data as Array<{ question: string; answer: string }>; // NOSONAR(S4325) — type narrowing after gen.type check
        const audioBuffer = await generateFlashcardsAudio(cards, voices, ttsOpts);
        const audioUrl = saveAudioFile(audioBuffer, projectDir, req.params.pid, `read-aloud-${baseId}-all`);
        res.json({ audioUrl });
        return;
      }

      // Single section (summary)
      const audioUrl = await generateSectionAudio({ gen, section, voiceId, ttsOpts, projectDir, pid: req.params.pid as string, baseId, store, gid: req.params.gid as string }, res);
      if (audioUrl) res.json({ audioUrl });
    } catch (e) {
      console.error('Read aloud error:', e);
      res.status(500).json({ error: String(e) });
    }
  }));

  return router;
}
