import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { ProjectStore } from '../store.js';
import { generationCrudRoutes } from './generations.js';
import type {
  QuizGeneration,
  FillBlankGeneration,
  QuizVocalGeneration,
  SummaryGeneration,
  FlashcardsGeneration,
} from '../types.js';

// --- Mock external dependencies ---

vi.mock('../generators/tts-provider.js', () => ({
  textToSpeech: vi.fn().mockResolvedValue(Buffer.from('fake-audio')),
}));

vi.mock('../generators/quiz-vocal.js', () => ({
  transcribeAudio: vi.fn().mockResolvedValue('spoken answer'),
  verifyAnswer: vi.fn().mockResolvedValue({ correct: true, feedback: 'Bravo!' }),
}));

vi.mock('../generators/tts.js', () => ({
  concatMp3: vi.fn().mockResolvedValue(Buffer.from('fake-concat-audio')),
  generateSilence: vi.fn().mockResolvedValue(Buffer.from('fake-silence')),
}));

const MOCK_CONFIG = {
  models: {
    summary: 'm',
    flashcards: 'm',
    quiz: 'm',
    podcast: 'm',
    translate: 'm',
    ocr: 'm',
    quizVerify: 'm',
    chat: 'm',
  },
  ttsModel: 'voxtral-mini-tts-2603',
};

vi.mock('../config.js', () => ({
  getConfig: vi.fn(() => MOCK_CONFIG),
  resolveVoices: vi.fn(() => ({ host: 'mh', guest: 'mg' })),
}));

// --- Helpers ---

function getHandler(r: any, method: string, path: string) {
  for (const layer of r.stack) {
    if (layer.route?.path === path && layer.route.methods[method]) {
      return layer.route.stack[layer.route.stack.length - 1].handle;
    }
  }
  throw new Error(`No handler for ${method.toUpperCase()} ${path}`);
}

function mockReq(overrides: any = {}) {
  return { params: {}, query: {}, body: {}, ...overrides } as any;
}

function mockRes() {
  const res: any = {};
  res.status = vi.fn(() => res);
  res.json = vi.fn(() => res);
  return res;
}

// --- Test setup ---

let store: ProjectStore;
let tempDir: string;
let router: any;
let pid: string;
let quizGid: string;
let fillBlankGid: string;
let quizVocalGid: string;
let summaryGid: string;
let flashcardsGid: string;

const client = {} as any;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'eurekai-generations-route-'));
  store = new ProjectStore(tempDir);
  const profileStore = { get: vi.fn(() => null) } as any;
  router = generationCrudRoutes(store, client, profileStore);

  // Create a project and populate it with various generation types
  const project = store.createProject('Test Project');
  pid = project.meta.id;

  const now = new Date().toISOString();

  // Quiz generation
  const quizGen: QuizGeneration = {
    id: 'quiz-gen-1',
    title: 'Quiz test',
    createdAt: now,
    sourceIds: [],
    type: 'quiz',
    data: [
      { question: 'Q1', choices: ['a', 'b', 'c', 'd'], correct: 0, explanation: 'A is correct' },
      { question: 'Q2', choices: ['w', 'x', 'y', 'z'], correct: 2, explanation: 'Y is correct' },
      { question: 'Q3', choices: ['1', '2', '3', '4'], correct: 1, explanation: '2 is correct' },
    ],
  };
  store.addGeneration(pid, quizGen);
  quizGid = quizGen.id;

  // Fill-blank generation
  const fillBlankGen: FillBlankGeneration = {
    id: 'fb-gen-1',
    title: 'Fill blank test',
    createdAt: now,
    sourceIds: [],
    type: 'fill-blank',
    data: [
      { sentence: 'Le ___ est bleu', answer: 'ciel', hint: 'Au dessus', category: 'Nature' },
      { sentence: 'La ___ est ronde', answer: 'terre', hint: 'Planete', category: 'Science' },
      { sentence: 'Le ___ brille', answer: 'soleil', hint: 'Astre', category: 'Nature' },
    ],
  };
  store.addGeneration(pid, fillBlankGen);
  fillBlankGid = fillBlankGen.id;

  // Quiz-vocal generation
  const quizVocalGen: QuizVocalGeneration = {
    id: 'qv-gen-1',
    title: 'Quiz vocal test',
    createdAt: now,
    sourceIds: [],
    type: 'quiz-vocal',
    data: [
      {
        question: 'Quelle est la capitale ?',
        choices: ['Paris', 'Lyon', 'Marseille', 'Nice'],
        correct: 0,
        explanation: 'Paris',
      },
      {
        question: 'Combien font 2+2 ?',
        choices: ['3', '4', '5', '6'],
        correct: 1,
        explanation: '4',
      },
    ],
    audioUrls: ['/audio/q1.mp3', '/audio/q2.mp3'],
  };
  store.addGeneration(pid, quizVocalGen);
  quizVocalGid = quizVocalGen.id;

  // Summary generation
  const summaryGen: SummaryGeneration = {
    id: 'sum-gen-1',
    title: 'Summary test',
    createdAt: now,
    sourceIds: [],
    type: 'summary',
    data: {
      title: 'Mon resume',
      summary: 'Un resume du sujet',
      key_points: ['Point 1', 'Point 2'],
      fun_fact: 'Le saviez-vous ?',
      vocabulary: [{ word: 'mot', definition: 'definition' }],
    },
  };
  store.addGeneration(pid, summaryGen);
  summaryGid = summaryGen.id;

  // Flashcards generation
  const flashcardsGen: FlashcardsGeneration = {
    id: 'fc-gen-1',
    title: 'Flashcards test',
    createdAt: now,
    sourceIds: [],
    type: 'flashcards',
    data: [
      { question: 'Qu est-ce que le soleil ?', answer: 'Une etoile' },
      { question: 'Qu est-ce que la lune ?', answer: 'Un satellite' },
    ],
  };
  store.addGeneration(pid, flashcardsGen);
  flashcardsGid = flashcardsGen.id;
});

afterEach(() => {
  rmSync(tempDir, { recursive: true, force: true });
});

// ================================================================
// Quiz attempt: POST /:pid/generations/:gid/quiz-attempt
// ================================================================

describe('POST /:pid/generations/:gid/quiz-attempt', () => {
  it('retourne 400 quand answers est manquant', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/quiz-attempt');
    const req = mockReq({ params: { pid, gid: quizGid }, body: {} });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'answers requis' });
  });

  it('retourne 400 quand answers n est pas un objet', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/quiz-attempt');
    const req = mockReq({ params: { pid, gid: quizGid }, body: { answers: 'not-object' } });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'answers requis' });
  });

  it('retourne 404 quand la generation n existe pas', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/quiz-attempt');
    const req = mockReq({ params: { pid, gid: 'nonexistent' }, body: { answers: { 0: 1 } } });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Quiz introuvable' });
  });

  it('retourne 404 quand la generation n est pas un quiz', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/quiz-attempt');
    const req = mockReq({ params: { pid, gid: summaryGid }, body: { answers: { 0: 1 } } });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Quiz introuvable' });
  });

  it('calcule le score correctement (2 bonnes sur 3)', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/quiz-attempt');
    // Q1 correct=0, Q2 correct=2, Q3 correct=1
    const answers = { 0: 0, 1: 2, 2: 3 }; // Q1 correct, Q2 correct, Q3 wrong
    const req = mockReq({ params: { pid, gid: quizGid }, body: { answers } });
    const res = mockRes();

    await handler(req, res);

    const result = res.json.mock.calls[0][0];
    expect(result.attempt.score).toBe(2);
    expect(result.attempt.total).toBe(3);
    expect(result.attempt.date).toBeTruthy();
    expect(result.attempt.answers).toEqual(answers);
  });

  it('initialise les stats a la premiere tentative', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/quiz-attempt');
    const answers = { 0: 0, 1: 1, 2: 1 }; // Q1 correct, Q2 wrong, Q3 correct
    const req = mockReq({ params: { pid, gid: quizGid }, body: { answers } });
    const res = mockRes();

    await handler(req, res);

    const result = res.json.mock.calls[0][0];
    expect(result.stats.attempts).toHaveLength(1);
    expect(result.stats.questionStats[0]).toEqual({ correct: 1, wrong: 0 });
    expect(result.stats.questionStats[1]).toEqual({ correct: 0, wrong: 1 });
    expect(result.stats.questionStats[2]).toEqual({ correct: 1, wrong: 0 });
  });

  it('accumule les stats sur plusieurs tentatives', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/quiz-attempt');

    // Premiere tentative : Q1 correct, Q2 wrong
    const req1 = mockReq({ params: { pid, gid: quizGid }, body: { answers: { 0: 0, 1: 1 } } });
    const res1 = mockRes();
    await handler(req1, res1);

    // Deuxieme tentative : Q1 wrong, Q2 correct
    const req2 = mockReq({ params: { pid, gid: quizGid }, body: { answers: { 0: 3, 1: 2 } } });
    const res2 = mockRes();
    await handler(req2, res2);

    const result = res2.json.mock.calls[0][0];
    expect(result.stats.attempts).toHaveLength(2);
    expect(result.stats.questionStats[0]).toEqual({ correct: 1, wrong: 1 });
    expect(result.stats.questionStats[1]).toEqual({ correct: 1, wrong: 1 });
  });

  it('suit les stats par question (correct/wrong)', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/quiz-attempt');

    // Tout correct
    const req = mockReq({
      params: { pid, gid: quizGid },
      body: { answers: { 0: 0, 1: 2, 2: 1 } },
    });
    const res = mockRes();
    await handler(req, res);

    const result = res.json.mock.calls[0][0];
    expect(result.stats.questionStats[0].correct).toBe(1);
    expect(result.stats.questionStats[0].wrong).toBe(0);
    expect(result.stats.questionStats[1].correct).toBe(1);
    expect(result.stats.questionStats[1].wrong).toBe(0);
    expect(result.stats.questionStats[2].correct).toBe(1);
    expect(result.stats.questionStats[2].wrong).toBe(0);
  });
});

// ================================================================
// Fill-blank attempt: POST /:pid/generations/:gid/fill-blank-attempt
// ================================================================

describe('POST /:pid/generations/:gid/fill-blank-attempt', () => {
  it('retourne 400 quand answers est manquant', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/fill-blank-attempt');
    const req = mockReq({ params: { pid, gid: fillBlankGid }, body: {} });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'answers requis' });
  });

  it('retourne 400 quand answers n est pas un objet', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/fill-blank-attempt');
    const req = mockReq({ params: { pid, gid: fillBlankGid }, body: { answers: 'string' } });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'answers requis' });
  });

  it('retourne 404 quand la generation n existe pas', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/fill-blank-attempt');
    const req = mockReq({ params: { pid, gid: 'nonexistent' }, body: { answers: { 0: 'test' } } });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Exercice a trous introuvable' });
  });

  it('retourne 404 quand la generation n est pas fill-blank', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/fill-blank-attempt');
    const req = mockReq({ params: { pid, gid: quizGid }, body: { answers: { 0: 'test' } } });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Exercice a trous introuvable' });
  });

  it('calcule le score avec validateFillBlankAnswer', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/fill-blank-attempt');
    // answer[0]='ciel' (exact match), answer[1]='mar' (wrong), answer[2]='soleil' (exact match)
    const answers = { 0: 'ciel', 1: 'mar', 2: 'soleil' };
    const req = mockReq({ params: { pid, gid: fillBlankGid }, body: { answers } });
    const res = mockRes();

    await handler(req, res);

    const result = res.json.mock.calls[0][0];
    expect(result.attempt.score).toBe(2);
    expect(result.attempt.total).toBe(3);
  });

  it('retourne les resultats par question', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/fill-blank-attempt');
    const answers = { 0: 'ciel', 1: 'terre', 2: 'lune' };
    const req = mockReq({ params: { pid, gid: fillBlankGid }, body: { answers } });
    const res = mockRes();

    await handler(req, res);

    const result = res.json.mock.calls[0][0];
    expect(result.results[0]).toBe(true); // ciel matches ciel
    expect(result.results[1]).toBe(true); // terre matches terre
    expect(result.results[2]).toBe(false); // lune does not match soleil
  });

  it('accepte les reponses approximatives (tolerance levenshtein)', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/fill-blank-attempt');
    // 'ciell' is distance 1 from 'ciel' (len<=5 => threshold 1) -> match
    const answers = { 0: 'ciell' };
    const req = mockReq({ params: { pid, gid: fillBlankGid }, body: { answers } });
    const res = mockRes();

    await handler(req, res);

    const result = res.json.mock.calls[0][0];
    expect(result.results[0]).toBe(true);
  });

  it('accumule les stats fill-blank sur plusieurs tentatives', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/fill-blank-attempt');

    // Premiere tentative
    const req1 = mockReq({
      params: { pid, gid: fillBlankGid },
      body: { answers: { 0: 'ciel', 1: 'mauvais' } },
    });
    const res1 = mockRes();
    await handler(req1, res1);

    // Deuxieme tentative
    const req2 = mockReq({
      params: { pid, gid: fillBlankGid },
      body: { answers: { 0: 'faux', 1: 'terre' } },
    });
    const res2 = mockRes();
    await handler(req2, res2);

    const result = res2.json.mock.calls[0][0];
    expect(result.stats.attempts).toHaveLength(2);
    expect(result.stats.questionStats[0]).toEqual({ correct: 1, wrong: 1 });
    expect(result.stats.questionStats[1]).toEqual({ correct: 1, wrong: 1 });
  });
});

// ================================================================
// Rename generation: PUT /:pid/generations/:gid
// ================================================================

describe('PUT /:pid/generations/:gid', () => {
  it('retourne 400 quand title est manquant', () => {
    const handler = getHandler(router, 'put', '/:pid/generations/:gid');
    const req = mockReq({ params: { pid, gid: quizGid }, body: {} });
    const res = mockRes();

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'title requis' });
  });

  it('retourne 400 quand title n est pas une string', () => {
    const handler = getHandler(router, 'put', '/:pid/generations/:gid');
    const req = mockReq({ params: { pid, gid: quizGid }, body: { title: 123 } });
    const res = mockRes();

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'title requis' });
  });

  it('retourne 400 quand title est une chaine vide', () => {
    const handler = getHandler(router, 'put', '/:pid/generations/:gid');
    const req = mockReq({ params: { pid, gid: quizGid }, body: { title: '' } });
    const res = mockRes();

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'title requis' });
  });

  it('retourne 404 quand la generation n existe pas', () => {
    const handler = getHandler(router, 'put', '/:pid/generations/:gid');
    const req = mockReq({ params: { pid, gid: 'nonexistent' }, body: { title: 'Nouveau titre' } });
    const res = mockRes();

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Generation introuvable' });
  });

  it('met a jour le titre avec succes', () => {
    const handler = getHandler(router, 'put', '/:pid/generations/:gid');
    const req = mockReq({ params: { pid, gid: quizGid }, body: { title: 'Nouveau titre' } });
    const res = mockRes();

    handler(req, res);

    const result = res.json.mock.calls[0][0];
    expect(result.title).toBe('Nouveau titre');
    expect(result.type).toBe('quiz');

    // Verify persisted in store
    const gen = store.getGeneration(pid, quizGid);
    expect(gen!.title).toBe('Nouveau titre');
  });
});

// ================================================================
// Delete generation: DELETE /:pid/generations/:gid
// ================================================================

describe('DELETE /:pid/generations/:gid', () => {
  it('supprime la generation et retourne ok', () => {
    const handler = getHandler(router, 'delete', '/:pid/generations/:gid');
    const req = mockReq({ params: { pid, gid: quizGid } });
    const res = mockRes();

    handler(req, res);

    expect(res.json).toHaveBeenCalledWith({ ok: true });

    // Verify deleted from store
    const gen = store.getGeneration(pid, quizGid);
    expect(gen).toBeNull();
  });

  it('ne plante pas si la generation n existe pas', () => {
    const handler = getHandler(router, 'delete', '/:pid/generations/:gid');
    const req = mockReq({ params: { pid, gid: 'nonexistent' } });
    const res = mockRes();

    handler(req, res);

    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });
});

// ================================================================
// Vocal answer: POST /:pid/generations/:gid/vocal-answer
// ================================================================

describe('POST /:pid/generations/:gid/vocal-answer', () => {
  it('retourne 404 quand la generation n est pas quiz-vocal', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/vocal-answer');
    const req = mockReq({
      params: { pid, gid: quizGid },
      body: { questionIndex: 0 },
      file: { buffer: Buffer.from('audio') },
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Quiz vocal introuvable' });
  });

  it('retourne 400 quand l index de question est invalide', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/vocal-answer');
    const req = mockReq({
      params: { pid, gid: quizVocalGid },
      body: { questionIndex: 99 },
      file: { buffer: Buffer.from('audio') },
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Index de question invalide' });
  });

  it('retourne 400 quand le fichier audio est manquant', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/vocal-answer');
    const req = mockReq({
      params: { pid, gid: quizVocalGid },
      body: { questionIndex: 0 },
      // no file
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Fichier audio requis' });
  });

  it('transcrit et verifie la reponse vocale avec succes', async () => {
    const { transcribeAudio, verifyAnswer } = await import('../generators/quiz-vocal.js');
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/vocal-answer');
    const audioBuffer = Buffer.from('fake-audio-data');
    const req = mockReq({
      params: { pid, gid: quizVocalGid },
      body: { questionIndex: 0, lang: 'fr' },
      file: { buffer: audioBuffer },
    });
    const res = mockRes();

    await handler(req, res);

    expect(transcribeAudio).toHaveBeenCalledWith(client, audioBuffer, 'answer.webm', 'fr');
    // Phase 1B.1 — verifyAnswer reçoit maintenant ageGroup (fallback 'enfant' pour quiz legacy sans ageGroup persisté).
    expect(verifyAnswer).toHaveBeenCalledWith(
      client,
      'Quelle est la capitale ?',
      ['Paris', 'Lyon', 'Marseille', 'Nice'],
      0,
      'spoken answer',
      { model: 'm', lang: 'fr', ageGroup: 'enfant' },
    );

    const result = res.json.mock.calls[0][0];
    expect(result.correct).toBe(true);
    expect(result.feedback).toBe('Bravo!');
    expect(result.transcription).toBe('spoken answer');
  });

  it('utilise lang par defaut "fr" quand non specifie', async () => {
    const { verifyAnswer } = await import('../generators/quiz-vocal.js');
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/vocal-answer');
    const req = mockReq({
      params: { pid, gid: quizVocalGid },
      body: { questionIndex: 0 },
      file: { buffer: Buffer.from('audio') },
    });
    const res = mockRes();

    await handler(req, res);

    // 6ème arg = options object avec lang/ageGroup par défaut.
    expect(verifyAnswer).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.objectContaining({ lang: 'fr', ageGroup: 'enfant' }),
    );
  });

  // Phase 1B.1 — Tests legacy critiques (cf. décision produit #9)
  it('LEGACY: utilise ageGroup "enfant" par défaut pour quiz vocaux sans ageGroup persisté (régression assumée)', async () => {
    const { verifyAnswer } = await import('../generators/quiz-vocal.js');
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/vocal-answer');
    // La fixture quizVocalGen ne contient PAS ageGroup (cas legacy).
    // Même si le profil UI était "adulte", verifyAnswer doit recevoir "enfant".
    const req = mockReq({
      params: { pid, gid: quizVocalGid },
      body: { questionIndex: 0, ageGroup: 'adulte' }, // simulate UI sending adulte
      file: { buffer: Buffer.from('audio') },
    });
    const res = mockRes();

    await handler(req, res);

    // ageGroup figé sur la génération > body → 'enfant' (fallback car quizGen.ageGroup === undefined)
    const lastCall = (verifyAnswer as any).mock.calls[(verifyAnswer as any).mock.calls.length - 1];
    expect(lastCall[5]).toEqual(expect.objectContaining({ ageGroup: 'enfant' }));
  });

  it('LEGACY: utilise req.body.lang en fallback pour quiz vocaux sans lang persisté (best-effort)', async () => {
    const { transcribeAudio, verifyAnswer } = await import('../generators/quiz-vocal.js');
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/vocal-answer');
    const req = mockReq({
      params: { pid, gid: quizVocalGid },
      body: { questionIndex: 0, lang: 'en' },
      file: { buffer: Buffer.from('audio') },
    });
    const res = mockRes();

    await handler(req, res);

    // Quiz legacy sans lang persisté → fallback sur req.body.lang = 'en'
    expect(transcribeAudio).toHaveBeenCalledWith(client, expect.anything(), 'answer.webm', 'en');
    const lastCall = (verifyAnswer as any).mock.calls[(verifyAnswer as any).mock.calls.length - 1];
    expect(lastCall[5]).toEqual(expect.objectContaining({ lang: 'en' }));
  });

  it('retourne 404 quand la generation n existe pas', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/vocal-answer');
    const req = mockReq({
      params: { pid, gid: 'nonexistent' },
      body: { questionIndex: 0 },
      file: { buffer: Buffer.from('audio') },
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Quiz vocal introuvable' });
  });

  it('retourne un code FailedStep stable en catch (pas le message brut avec clés/URLs)', async () => {
    // Régression à prévenir : `res.json({ error: String(e) })` fuitait err.message
    // (potentiellement clés API ou URLs internes) au client.
    const { transcribeAudio } = await import('../generators/quiz-vocal.js');
    (transcribeAudio as any).mockRejectedValueOnce(
      new Error('sk-1234-SECRET leak via https://api.internal/v1/audio'),
    );

    const handler = getHandler(router, 'post', '/:pid/generations/:gid/vocal-answer');
    const req = mockReq({
      params: { pid, gid: quizVocalGid },
      body: { questionIndex: 0 },
      file: { buffer: Buffer.from('audio') },
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    const body = res.json.mock.calls[0][0];
    const serialized = JSON.stringify(body);
    expect(serialized).not.toContain('sk-1234');
    expect(serialized).not.toContain('api.internal');
    // 'stt' agent → matchAudio détecte la signature 'audio' dans le message.
    expect(body.error).toBe('tts_upstream_error');
  });
});

// ================================================================
// Read aloud: POST /:pid/generations/:gid/read-aloud
// ================================================================

describe('POST /:pid/generations/:gid/read-aloud', () => {
  it('retourne 404 quand la generation n existe pas', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/read-aloud');
    const req = mockReq({ params: { pid, gid: 'nonexistent' }, body: {} });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Generation introuvable' });
  });

  it('genere le TTS batch pour un summary (toutes sections)', async () => {
    const { textToSpeech } = await import('../generators/tts-provider.js');
    (textToSpeech as any).mockClear();

    const handler = getHandler(router, 'post', '/:pid/generations/:gid/read-aloud');
    const req = mockReq({ params: { pid, gid: summaryGid }, body: {} });
    const res = mockRes();

    await handler(req, res);

    // Batch mode: generates each section individually
    expect(textToSpeech).toHaveBeenCalledTimes(4); // intro + key_points + fun_fact + vocabulary
    const result = res.json.mock.calls[0][0];
    expect(result.audioUrls).toBeDefined();
    expect(result.audioUrls.intro).toContain('read-aloud-');
    expect(result.audioUrls.key_points).toContain('read-aloud-');
    expect(result.audioUrls.fun_fact).toContain('read-aloud-');
    expect(result.audioUrls.vocabulary).toContain('read-aloud-');
  });

  it('genere le TTS dual-voice pour des flashcards', async () => {
    const { textToSpeech } = await import('../generators/tts-provider.js');
    const { concatMp3, generateSilence } = await import('../generators/tts.js');
    const { resolveVoices } = await import('../config.js');
    (textToSpeech as any).mockClear();
    (concatMp3 as any).mockClear();
    (generateSilence as any).mockClear();
    (resolveVoices as any).mockClear();

    const handler = getHandler(router, 'post', '/:pid/generations/:gid/read-aloud');
    const req = mockReq({ params: { pid, gid: flashcardsGid }, body: { lang: 'fr' } });
    const res = mockRes();

    await handler(req, res);

    // 4 TTS calls: 2 questions (host) + 2 answers (guest)
    expect(textToSpeech).toHaveBeenCalledTimes(4);
    const calls = (textToSpeech as any).mock.calls;
    expect(calls[0][0]).toContain('Qu est-ce que le soleil ?');
    expect(calls[0][1]).toBe('mh');
    expect(calls[1][0]).toContain('Une etoile');
    expect(calls[1][1]).toBe('mg');

    expect(generateSilence).toHaveBeenCalledWith(1200);
    expect(concatMp3).toHaveBeenCalledTimes(1);
    expect((concatMp3 as any).mock.calls[0][0]).toHaveLength(5);

    const result = res.json.mock.calls[0][0];
    expect(result.audioUrl).toMatch(/^\/output\/projects\/.+\/read-aloud-.+\.mp3$/);
  });

  it('retourne 400 pour un type non supporte (quiz)', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/read-aloud');
    const req = mockReq({ params: { pid, gid: quizGid }, body: {} });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Type non supporte pour la lecture' });
  });

  it('retourne 400 pour un type non supporte (fill-blank)', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/read-aloud');
    const req = mockReq({ params: { pid, gid: fillBlankGid }, body: {} });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Type non supporte pour la lecture' });
  });

  it('genere une seule section quand section=intro', async () => {
    const { textToSpeech } = await import('../generators/tts-provider.js');
    (textToSpeech as any).mockClear();

    const handler = getHandler(router, 'post', '/:pid/generations/:gid/read-aloud');
    const req = mockReq({ params: { pid, gid: summaryGid }, body: { section: 'intro' } });
    const res = mockRes();

    await handler(req, res);

    expect(textToSpeech).toHaveBeenCalledTimes(1);
    const result = res.json.mock.calls[0][0];
    expect(result.audioUrl).toContain('read-aloud-');
    expect(result.audioUrl).toContain('-intro');
  });

  it('ne met pas a jour la generation flashcards avec audioUrl', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/read-aloud');
    const req = mockReq({ params: { pid, gid: flashcardsGid }, body: {} });
    const res = mockRes();

    await handler(req, res);

    // Flashcards generation should NOT be updated (only summary gets audioUrl persisted)
    const gen = store.getGeneration(pid, flashcardsGid) as FlashcardsGeneration;
    expect((gen.data as any).audioUrl).toBeUndefined();
  });

  it('passe les bons parametres TTS (provider, model, voice)', async () => {
    const { textToSpeech } = await import('../generators/tts-provider.js');
    (textToSpeech as any).mockClear();

    const handler = getHandler(router, 'post', '/:pid/generations/:gid/read-aloud');
    const req = mockReq({ params: { pid, gid: summaryGid }, body: {} });
    const res = mockRes();

    await handler(req, res);

    expect(textToSpeech).toHaveBeenCalledWith(
      expect.any(String),
      'mh', // resolveVoices returns { host: 'mh', guest: 'mg' }
      {
        model: 'voxtral-mini-tts-2603',
        mistralClient: client,
      },
    );
  });

  it('truncates text to 5000 chars for TTS', async () => {
    const { textToSpeech } = await import('../generators/tts-provider.js');
    (textToSpeech as any).mockClear();

    const longText = 'A'.repeat(6000);
    const longSummaryGen: SummaryGeneration = {
      id: 'sum-long',
      title: 'Long summary',
      createdAt: new Date().toISOString(),
      sourceIds: [],
      type: 'summary',
      data: {
        title: 'Titre',
        summary: longText,
        key_points: [],
        vocabulary: [],
      },
    };
    store.addGeneration(pid, longSummaryGen);

    const handler = getHandler(router, 'post', '/:pid/generations/:gid/read-aloud');
    const req = mockReq({ params: { pid, gid: 'sum-long' }, body: { section: 'intro' } });
    const res = mockRes();

    await handler(req, res);

    const callArgs = (textToSpeech as any).mock.calls[0];
    expect(callArgs[0].length).toBeLessThanOrEqual(5000);
  });

  it('retourne 400 pour une section invalide', async () => {
    const handler = getHandler(router, 'post', '/:pid/generations/:gid/read-aloud');
    const req = mockReq({ params: { pid, gid: summaryGid }, body: { section: 'bogus' } });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Section invalide' });
  });

  it('retourne des resultats partiels quand certaines sections TTS echouent', async () => {
    const { textToSpeech } = await import('../generators/tts-provider.js');
    (textToSpeech as any).mockClear();
    let callCount = 0;
    (textToSpeech as any).mockImplementation(() => {
      callCount++;
      if (callCount === 2) throw new Error('TTS failure');
      return Buffer.from('fake-audio');
    });

    const handler = getHandler(router, 'post', '/:pid/generations/:gid/read-aloud');
    const req = mockReq({ params: { pid, gid: summaryGid }, body: {} });
    const res = mockRes();

    await handler(req, res);

    const result = res.json.mock.calls[0][0];
    expect(result.audioUrls).toBeDefined();
    expect(result.failedSections).toBeDefined();
    expect(result.failedSections.length).toBeGreaterThan(0);
    // At least some sections should have succeeded
    expect(Object.keys(result.audioUrls).length).toBeGreaterThan(0);
    // Contrat enrichi : chaque entrée est {section, code} avec un FailedStepCode stable.
    // Sans ça, l'UI ne peut pas dispatcher des toasts actionnables (auth_required, etc.).
    for (const fs of result.failedSections) {
      expect(typeof fs.section).toBe('string');
      expect(typeof fs.code).toBe('string');
      expect(fs.code.length).toBeGreaterThan(0);
    }

    // Restore default mock
    (textToSpeech as any).mockResolvedValue(Buffer.from('fake-audio'));
  });

  it('partial-fail : code auth_required propagé via extractErrorCode', async () => {
    // Vérifie que le code stable du failedSections permet à l'UI de dispatcher un toast
    // actionnable (action requise vs simple warning). Cas auth_required = clé invalide
    // sur une section, autres OK.
    const { textToSpeech } = await import('../generators/tts-provider.js');
    (textToSpeech as any).mockClear();
    let callCount = 0;
    (textToSpeech as any).mockImplementation(() => {
      callCount++;
      if (callCount === 2) {
        const err: any = new Error('Unauthorized');
        err.status = 401;
        throw err;
      }
      return Buffer.from('fake-audio');
    });

    const handler = getHandler(router, 'post', '/:pid/generations/:gid/read-aloud');
    const req = mockReq({ params: { pid, gid: summaryGid }, body: {} });
    const res = mockRes();

    await handler(req, res);

    const result = res.json.mock.calls[0][0];
    expect(result.failedSections).toBeDefined();
    expect(result.failedSections.some((f: any) => f.code === 'auth_required')).toBe(true);

    (textToSpeech as any).mockResolvedValue(Buffer.from('fake-audio'));
  });

  it('retourne un code FailedStep stable en catch read-aloud (pas le message brut)', async () => {
    // Vérifie que le catch externe (hors "all sections failed") utilise extractErrorCode.
    // Cas trigger : resolveVoices jette — chemin atteint avant la boucle section.
    const { resolveVoices } = await import('../config.js');
    (resolveVoices as any).mockImplementationOnce(() => {
      throw new Error('MISTRAL_API_KEY non defini — https://api.internal/key');
    });

    const handler = getHandler(router, 'post', '/:pid/generations/:gid/read-aloud');
    const req = mockReq({ params: { pid, gid: summaryGid }, body: { section: 'intro' } });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    const body = res.json.mock.calls[0][0];
    expect(JSON.stringify(body)).not.toContain('api.internal');
    // Agent 'tts' + message "API_KEY non defini" → auth_required (action user).
    expect(body.error).toBe('auth_required');

    // Restore default mock pour les tests suivants.
    (resolveVoices as any).mockImplementation(() => ({ host: 'mh', guest: 'mg' }));
  });

  it('retourne 500 quand toutes les sections TTS echouent', async () => {
    const { textToSpeech } = await import('../generators/tts-provider.js');
    (textToSpeech as any).mockClear();
    (textToSpeech as any).mockRejectedValue(new Error('TTS down'));

    const handler = getHandler(router, 'post', '/:pid/generations/:gid/read-aloud');
    const req = mockReq({ params: { pid, gid: summaryGid }, body: {} });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    // All-fail : on retourne le FailedStepCode du dernier échec (terminal batch failure code),
    // pas un message libre. Cohérence avec le catch global qui utilise déjà extractErrorCode.
    expect(res.json.mock.calls[0][0].error).toBe('tts_upstream_error');

    // Restore default mock
    (textToSpeech as any).mockResolvedValue(Buffer.from('fake-audio'));
  });
});
