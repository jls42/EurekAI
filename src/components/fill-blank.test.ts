import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fillBlankComponent } from './fill-blank';

vi.mock('./fill-blank-validate', () => ({
  validateAnswer: vi.fn((userAnswer: string, correctAnswer: string) => {
    return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
  }),
}));

import { validateAnswer } from './fill-blank-validate';

function createFillBlank(exercises: any[]) {
  const gen = {
    id: 'gen-fb-1',
    data: exercises,
  };
  const comp = fillBlankComponent(gen) as any;
  comp.currentProjectId = 'proj-1';
  comp.showToast = vi.fn();
  comp.t = vi.fn((key: string) => key);
  comp.$nextTick = vi.fn((cb: () => void) => cb());
  comp.$refs = { blankInput: { focus: vi.fn() } };
  return comp;
}

const sampleExercises = [
  { sentence: 'Le ___ est bleu.', answer: 'ciel', hint: 'Au-dessus de nous' },
  { sentence: 'La ___ est verte.', answer: 'herbe', hint: 'Sous nos pieds' },
  { sentence: 'Le ___ brille.', answer: 'soleil', hint: 'Astre du jour' },
];

describe('fillBlankComponent', () => {
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
    it('answer commence vide', () => {
      const comp = createFillBlank(sampleExercises);
      expect(comp.answer).toBe('');
    });

    it('answers commence vide', () => {
      const comp = createFillBlank(sampleExercises);
      expect(comp.answers).toEqual({});
    });

    it('results commence vide', () => {
      const comp = createFillBlank(sampleExercises);
      expect(comp.results).toEqual({});
    });

    it('showHint commence a false', () => {
      const comp = createFillBlank(sampleExercises);
      expect(comp.showHint).toBe(false);
    });

    it('herite des proprietes du mixin stepByStep', () => {
      const comp = createFillBlank(sampleExercises);
      expect(comp.currentQ).toBe(0);
      expect(comp.score).toBe(0);
      expect(comp.finished).toBe(false);
      expect(comp.feedback).toBeNull();
      expect(comp.queue).toBeNull();
    });
  });

  describe('currentExercise()', () => {
    it('retourne le premier exercice au debut', () => {
      const comp = createFillBlank(sampleExercises);
      expect(comp.currentExercise()).toEqual(sampleExercises[0]);
    });

    it('retourne l exercice courant apres navigation', () => {
      const comp = createFillBlank(sampleExercises);
      comp.currentQ = 1;
      expect(comp.currentExercise()).toEqual(sampleExercises[1]);
    });

    it('retourne l exercice correct avec une queue', () => {
      const comp = createFillBlank(sampleExercises);
      comp.queue = [2, 0];
      expect(comp.currentExercise()).toEqual(sampleExercises[2]);
    });
  });

  describe('checkAnswer()', () => {
    it('bonne reponse incremente le score', () => {
      const comp = createFillBlank(sampleExercises);
      comp.answer = 'ciel';
      comp.checkAnswer();
      expect(comp.score).toBe(1);
      expect(comp.results[0]).toBe(true);
      expect(comp.answers[0]).toBe('ciel');
      expect(comp.feedback).toEqual({ correct: true, correctAnswer: 'ciel' });
    });

    it('mauvaise reponse ne incremente pas le score', () => {
      const comp = createFillBlank(sampleExercises);
      comp.answer = 'mer';
      comp.checkAnswer();
      expect(comp.score).toBe(0);
      expect(comp.results[0]).toBe(false);
      expect(comp.answers[0]).toBe('mer');
      expect(comp.feedback).toEqual({ correct: false, correctAnswer: 'ciel' });
    });

    it('appelle validateAnswer avec la bonne reponse', () => {
      const comp = createFillBlank(sampleExercises);
      comp.answer = 'Ciel';
      comp.checkAnswer();
      expect(validateAnswer).toHaveBeenCalledWith('Ciel', 'ciel');
    });

    it('enregistre la reponse au bon index avec queue', () => {
      const comp = createFillBlank(sampleExercises);
      comp.queue = [2, 1];
      comp.answer = 'soleil';
      comp.checkAnswer();
      expect(comp.answers[2]).toBe('soleil');
      expect(comp.results[2]).toBe(true);
    });
  });

  describe('handleKey()', () => {
    it('checkAnswer sur Enter quand reponse non vide et pas de feedback', () => {
      const comp = createFillBlank(sampleExercises);
      comp.answer = 'ciel';
      comp.handleKey({ key: 'Enter' } as KeyboardEvent);
      expect(comp.feedback).not.toBeNull();
    });

    it('nextQuestion sur Enter quand feedback existe', () => {
      const comp = createFillBlank(sampleExercises);
      comp.answer = 'ciel';
      comp.checkAnswer();
      comp.handleKey({ key: 'Enter' } as KeyboardEvent);
      expect(comp.currentQ).toBe(1);
      expect(comp.feedback).toBeNull();
    });

    it('ne fait rien pour une touche autre que Enter', () => {
      const comp = createFillBlank(sampleExercises);
      comp.answer = 'test';
      comp.handleKey({ key: 'a' } as KeyboardEvent);
      expect(comp.feedback).toBeNull();
    });

    it('ne fait rien si answer est vide et pas de feedback', () => {
      const comp = createFillBlank(sampleExercises);
      comp.answer = '   ';
      comp.handleKey({ key: 'Enter' } as KeyboardEvent);
      expect(comp.feedback).toBeNull();
    });
  });

  describe('onNextReady()', () => {
    it('reset answer et showHint', () => {
      const comp = createFillBlank(sampleExercises);
      comp.answer = 'test';
      comp.showHint = true;
      comp.onNextReady();
      expect(comp.answer).toBe('');
      expect(comp.showHint).toBe(false);
    });

    it('appelle focus sur blankInput via $nextTick', () => {
      const comp = createFillBlank(sampleExercises);
      comp.onNextReady();
      expect(comp.$nextTick).toHaveBeenCalled();
      expect(comp.$refs.blankInput.focus).toHaveBeenCalled();
    });
  });

  describe('retryWrongExercises()', () => {
    it('filtre les exercices incorrects et relance', () => {
      const comp = createFillBlank(sampleExercises);
      comp.results = { 0: true, 1: false, 2: false };
      comp.answers = { 0: 'ciel', 1: 'gazon', 2: 'lune' };
      comp.retryWrongExercises();
      expect(comp.queue).toEqual([1, 2]);
      expect(comp.answers).toEqual({});
      expect(comp.results).toEqual({});
      expect(comp.answer).toBe('');
      expect(comp.showHint).toBe(false);
      expect(comp.currentQ).toBe(0);
      expect(comp.score).toBe(0);
    });

    it('ne fait rien si tout est correct', () => {
      const comp = createFillBlank(sampleExercises);
      comp.results = { 0: true, 1: true, 2: true };
      comp.finished = true;
      comp.retryWrongExercises();
      // retryWrong([]) is a no-op, so queue stays null
      expect(comp.queue).toBeNull();
    });
  });

  describe('resetExercise()', () => {
    it('remet tout a zero', () => {
      const comp = createFillBlank(sampleExercises);
      comp.answers = { 0: 'ciel' };
      comp.results = { 0: true };
      comp.answer = 'test';
      comp.showHint = true;
      comp.currentQ = 2;
      comp.score = 1;
      comp.finished = true;
      comp.queue = [1];
      comp.resetExercise();
      expect(comp.answers).toEqual({});
      expect(comp.results).toEqual({});
      expect(comp.answer).toBe('');
      expect(comp.showHint).toBe(false);
      expect(comp.currentQ).toBe(0);
      expect(comp.score).toBe(0);
      expect(comp.finished).toBe(false);
      expect(comp.queue).toBeNull();
    });
  });

  describe('submitFullAttempt()', () => {
    it('appelle fetch avec les bons parametres', async () => {
      const comp = createFillBlank(sampleExercises);
      comp.answers = { 0: 'ciel', 1: 'herbe' };
      await comp.submitFullAttempt();
      expect(fetchSpy).toHaveBeenCalledWith(
        '/api/projects/proj-1/generations/gen-fb-1/fill-blank-attempt',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: { 0: 'ciel', 1: 'herbe' } }),
        },
      );
    });

    it('met a jour gen.stats sur succes', async () => {
      const comp = createFillBlank(sampleExercises);
      comp.answers = { 0: 'ciel' };
      await comp.submitFullAttempt();
      expect(comp.gen.stats).toEqual({ attempts: 1 });
      expect(comp.showToast).toHaveBeenCalledWith('toast.scoreSaved', 'success');
    });

    it('affiche erreur si fetch echoue (res.ok=false)', async () => {
      global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 })) as any;
      const comp = createFillBlank(sampleExercises);
      await comp.submitFullAttempt();
      expect(comp.showToast).toHaveBeenCalledWith('toast.scoreError', 'error');
    });

    it('affiche erreur si fetch leve une exception', async () => {
      global.fetch = vi.fn(() => Promise.reject(new Error('network'))) as any;
      const comp = createFillBlank(sampleExercises);
      await comp.submitFullAttempt();
      expect(comp.showToast).toHaveBeenCalledWith('toast.scoreError', 'error');
    });
  });

  describe('onFinish()', () => {
    it('appelle submitFullAttempt', async () => {
      const comp = createFillBlank(sampleExercises);
      comp.submitFullAttempt = vi.fn();
      comp.onFinish();
      expect(comp.submitFullAttempt).toHaveBeenCalledOnce();
    });
  });
});
