import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { quizComponent } from './quiz';

function createQuiz(questions: any[]) {
  const gen = {
    id: 'gen-quiz-1',
    data: questions,
  };
  const comp = quizComponent(gen) as any;
  comp.currentProjectId = 'proj-1';
  comp.showToast = vi.fn();
  comp.t = vi.fn((key: string) => key);
  comp.generations = [];
  comp.openGens = {};
  return comp;
}

const sampleQuestions = [
  { question: 'Couleur du ciel?', choices: ['Rouge', 'Bleu', 'Vert'], correct: 1 },
  { question: 'Capitale de la France?', choices: ['Lyon', 'Marseille', 'Paris'], correct: 2 },
  { question: '2 + 2 = ?', choices: ['3', '4', '5'], correct: 1 },
];

describe('quizComponent', () => {
  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchSpy = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({ stats: { attempts: 1 } }) }),
    );
    global.fetch = fetchSpy as any;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('etat initial', () => {
    it('selectedChoice commence a null', () => {
      const comp = createQuiz(sampleQuestions);
      expect(comp.selectedChoice).toBeNull();
    });

    it('answers commence vide', () => {
      const comp = createQuiz(sampleQuestions);
      expect(comp.answers).toEqual({});
    });

    it('reviewing commence a false', () => {
      const comp = createQuiz(sampleQuestions);
      expect(comp.reviewing).toBe(false);
    });

    it('herite des proprietes du mixin stepByStep', () => {
      const comp = createQuiz(sampleQuestions);
      expect(comp.currentQ).toBe(0);
      expect(comp.score).toBe(0);
      expect(comp.finished).toBe(false);
      expect(comp.feedback).toBeNull();
      expect(comp.queue).toBeNull();
    });
  });

  describe('currentQuestion()', () => {
    it('retourne la premiere question au debut', () => {
      const comp = createQuiz(sampleQuestions);
      expect(comp.currentQuestion()).toEqual(sampleQuestions[0]);
    });

    it('retourne la question courante apres navigation', () => {
      const comp = createQuiz(sampleQuestions);
      comp.currentQ = 2;
      expect(comp.currentQuestion()).toEqual(sampleQuestions[2]);
    });

    it('retourne la question correcte avec une queue', () => {
      const comp = createQuiz(sampleQuestions);
      comp.queue = [2, 0];
      expect(comp.currentQuestion()).toEqual(sampleQuestions[2]);
    });
  });

  describe('selectChoice()', () => {
    it('bonne reponse incremente le score', () => {
      const comp = createQuiz(sampleQuestions);
      comp.selectChoice(1); // correct pour question 0
      expect(comp.score).toBe(1);
      expect(comp.selectedChoice).toBe(1);
      expect(comp.answers[0]).toBe(1);
      expect(comp.feedback).toEqual({ correct: true });
    });

    it('mauvaise reponse ne incremente pas le score', () => {
      const comp = createQuiz(sampleQuestions);
      comp.selectChoice(0); // incorrect pour question 0
      expect(comp.score).toBe(0);
      expect(comp.selectedChoice).toBe(0);
      expect(comp.answers[0]).toBe(0);
      expect(comp.feedback).toEqual({ correct: false });
    });

    it('ne fait rien si feedback existe deja', () => {
      const comp = createQuiz(sampleQuestions);
      comp.selectChoice(1);
      expect(comp.score).toBe(1);
      // Tenter de re-selectionner
      comp.selectChoice(0);
      expect(comp.score).toBe(1);
      expect(comp.selectedChoice).toBe(1);
    });

    it('enregistre au bon index avec queue', () => {
      const comp = createQuiz(sampleQuestions);
      comp.queue = [2, 1];
      comp.selectChoice(1); // correct pour question index 2
      expect(comp.answers[2]).toBe(1);
      expect(comp.score).toBe(1);
    });
  });

  describe('onNextReady()', () => {
    it('reset selectedChoice a null', () => {
      const comp = createQuiz(sampleQuestions);
      comp.selectedChoice = 2;
      comp.onNextReady();
      expect(comp.selectedChoice).toBeNull();
    });
  });

  describe('retryWrongQuestions()', () => {
    it('filtre les questions incorrectes et relance', () => {
      const comp = createQuiz(sampleQuestions);
      // Simuler des reponses: q0 correct (ci=1), q1 incorrect (ci=0), q2 incorrect (ci=0)
      comp.answers = { 0: 1, 1: 0, 2: 0 };
      comp.retryWrongQuestions();
      expect(comp.queue).toEqual([1, 2]);
      expect(comp.answers).toEqual({});
      expect(comp.selectedChoice).toBeNull();
      expect(comp.currentQ).toBe(0);
      expect(comp.score).toBe(0);
    });

    it('ne fait rien si tout est correct', () => {
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 1, 1: 2, 2: 1 };
      comp.finished = true;
      comp.retryWrongQuestions();
      // retryWrong([]) is a no-op
      expect(comp.queue).toBeNull();
    });
  });

  describe('resetQuiz()', () => {
    it('remet tout a zero', () => {
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 1, 1: 2 };
      comp.selectedChoice = 1;
      comp.currentQ = 2;
      comp.score = 2;
      comp.finished = true;
      comp.queue = [0, 1];
      comp.feedback = { correct: true };
      comp.resetQuiz();
      expect(comp.answers).toEqual({});
      expect(comp.selectedChoice).toBeNull();
      expect(comp.currentQ).toBe(0);
      expect(comp.score).toBe(0);
      expect(comp.finished).toBe(false);
      expect(comp.queue).toBeNull();
      expect(comp.feedback).toBeNull();
    });
  });

  describe('submitAttempt()', () => {
    it('appelle fetch avec les bons parametres', async () => {
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 1, 1: 2 };
      await comp.submitAttempt();
      expect(fetchSpy).toHaveBeenCalledWith(
        '/api/projects/proj-1/generations/gen-quiz-1/quiz-attempt',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: { 0: 1, 1: 2 } }),
        },
      );
    });

    it('met a jour gen.stats sur succes', async () => {
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 1 };
      await comp.submitAttempt();
      expect(comp.gen.stats).toEqual({ attempts: 1 });
      expect(comp.showToast).toHaveBeenCalledWith('toast.scoreSaved', 'success');
    });

    it('affiche erreur si fetch echoue (res.ok=false)', async () => {
      global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 })) as any;
      const comp = createQuiz(sampleQuestions);
      await comp.submitAttempt();
      expect(comp.showToast).toHaveBeenCalledWith('toast.scoreError', 'error');
    });

    it('affiche erreur si fetch leve une exception', async () => {
      global.fetch = vi.fn(() => Promise.reject(new Error('network'))) as any;
      const comp = createQuiz(sampleQuestions);
      await comp.submitAttempt();
      expect(comp.showToast).toHaveBeenCalledWith('toast.scoreError', 'error');
    });
  });

  describe('reviewErrors()', () => {
    it('appelle fetch quiz-review avec les questions faibles', async () => {
      const newGen = { id: 'gen-review-1', type: 'quiz', data: [] };
      global.fetch = vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve(newGen) }),
      ) as any;

      const comp = createQuiz(sampleQuestions);
      // q0 correct (ci=1), q1 incorrect (ci=0)
      comp.answers = { 0: 1, 1: 0 };
      await comp.reviewErrors();

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/projects/proj-1/generate/quiz-review',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            generationId: 'gen-quiz-1',
            weakQuestions: [sampleQuestions[1]],
          }),
        },
      );
    });

    it('ajoute la generation et montre toast sur succes', async () => {
      const newGen = { id: 'gen-review-1', type: 'quiz', data: [] };
      global.fetch = vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve(newGen) }),
      ) as any;

      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 0 }; // q0 incorrect
      await comp.reviewErrors();

      expect(comp.generations).toContainEqual(newGen);
      expect(comp.openGens['gen-review-1']).toBe(true);
      expect(comp.showToast).toHaveBeenCalledWith('toast.reviewGenerated', 'success');
    });

    it('ne fait rien si tout est correct', async () => {
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 1, 1: 2, 2: 1 }; // all correct
      await comp.reviewErrors();
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('reviewing passe a true puis false', async () => {
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 0 };

      let resolvePromise: (v: any) => void;
      global.fetch = vi.fn(
        () =>
          new Promise((resolve) => {
            resolvePromise = resolve;
          }),
      ) as any;

      const promise = comp.reviewErrors();
      expect(comp.reviewing).toBe(true);

      resolvePromise!({ ok: true, json: () => Promise.resolve({ id: 'r1' }) });
      await promise;
      expect(comp.reviewing).toBe(false);
    });

    it('affiche erreur si fetch echoue', async () => {
      global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 })) as any;
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 0 };
      await comp.reviewErrors();
      expect(comp.showToast).toHaveBeenCalledWith('toast.reviewError', 'error');
      expect(comp.reviewing).toBe(false);
    });

    it('affiche erreur si fetch leve une exception', async () => {
      global.fetch = vi.fn(() => Promise.reject(new Error('network'))) as any;
      const comp = createQuiz(sampleQuestions);
      comp.answers = { 0: 0 };
      await comp.reviewErrors();
      expect(comp.showToast).toHaveBeenCalledWith('toast.reviewError', 'error');
      expect(comp.reviewing).toBe(false);
    });
  });

  describe('onFinish()', () => {
    it('appelle submitAttempt', () => {
      const comp = createQuiz(sampleQuestions);
      comp.submitAttempt = vi.fn();
      comp.onFinish();
      expect(comp.submitAttempt).toHaveBeenCalledOnce();
    });
  });
});
