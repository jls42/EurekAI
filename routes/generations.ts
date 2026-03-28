import { Router } from 'express';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
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
import { getConfig, resolveVoices } from '../config.js';
import { transcribeAudio, verifyAnswer } from '../generators/quiz-vocal.js';
import { textToSpeech } from '../generators/tts-provider.js';
import { validateFillBlankAnswer } from '../helpers/fill-blank-validate.js';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

export function generationCrudRoutes(store: ProjectStore, client: Mistral): Router {
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
  router.post('/:pid/generations/:gid/read-aloud', async (req, res) => {
    try {
      const gen = store.getGeneration(req.params.pid, req.params.gid);
      if (!gen) {
        res.status(404).json({ error: 'Generation introuvable' });
        return;
      }

      let text = '';
      if (gen.type === 'summary') {
        const d = (gen as SummaryGeneration).data; // NOSONAR(S4325) — type narrowing after gen.type === 'summary' check
        text = `${d.title}. ${d.summary}. Points cles: ${d.key_points.join('. ')}.`;
        if (d.fun_fact) text += ` Le savais-tu ? ${d.fun_fact}`;
      } else if (gen.type === 'flashcards') {
        const cards = gen.data as Array<{ question: string; answer: string }>; // NOSONAR(S4325) — type narrowing after gen.type === 'flashcards' check
        text = cards
          .map((c, i) => `Question ${i + 1}: ${c.question}. Reponse: ${c.answer}.`)
          .join(' ');
      } else {
        res.status(400).json({ error: 'Type non supporte pour la lecture' });
        return;
      }

      const config = getConfig();
      const voiceId = resolveVoices(config).host;
      const audioBuffer = await textToSpeech(text.slice(0, 5000), voiceId, {
        provider: config.ttsProvider,
        model: config.ttsModel,
        mistralClient: client,
      });

      const audioFilename = `read-aloud-${gen.id.slice(0, 8)}-${Date.now()}.mp3`;
      const projectDir = store.getProjectDir(req.params.pid);
      writeFileSync(join(projectDir, audioFilename), audioBuffer);
      const audioUrl = `/output/projects/${req.params.pid}/${audioFilename}`;

      if (gen.type === 'summary') {
        store.updateGeneration(req.params.pid, req.params.gid, {
          data: { ...(gen as SummaryGeneration).data, audioUrl }, // NOSONAR(S4325) — type narrowing after gen.type === 'summary' check
        } as any);
      }

      res.json({ audioUrl });
    } catch (e) {
      console.error('Read aloud error:', e);
      res.status(500).json({ error: String(e) });
    }
  });

  return router;
}
