import { describe, it, expect } from 'vitest';
import { flashcardsComponent } from './flashcards';

function createFlashcards(cards: any[]) {
  const gen = {
    id: 'gen-fc-1',
    data: cards,
  };
  const comp = flashcardsComponent(gen) as any;
  return comp;
}

const sampleCards = [
  { front: 'Capitale de la France', back: 'Paris' },
  { front: 'Couleur du ciel', back: 'Bleu' },
  { front: '2 + 2', back: '4' },
  { front: 'Plus grand ocean', back: 'Pacifique' },
];

describe('flashcardsComponent', () => {
  describe('etat initial', () => {
    it('flipped commence a false', () => {
      const comp = createFlashcards(sampleCards);
      expect(comp.flipped).toBe(false);
    });

    it('results commence vide', () => {
      const comp = createFlashcards(sampleCards);
      expect(comp.results).toEqual({});
    });

    it('herite des proprietes du mixin stepByStep', () => {
      const comp = createFlashcards(sampleCards);
      expect(comp.currentQ).toBe(0);
      expect(comp.score).toBe(0);
      expect(comp.finished).toBe(false);
      expect(comp.feedback).toBeNull();
      expect(comp.queue).toBeNull();
    });
  });

  describe('currentCard()', () => {
    it('retourne la premiere carte au debut', () => {
      const comp = createFlashcards(sampleCards);
      expect(comp.currentCard()).toEqual(sampleCards[0]);
    });

    it('retourne la carte courante apres navigation', () => {
      const comp = createFlashcards(sampleCards);
      comp.currentQ = 2;
      expect(comp.currentCard()).toEqual(sampleCards[2]);
    });

    it('retourne la carte correcte avec une queue', () => {
      const comp = createFlashcards(sampleCards);
      comp.queue = [3, 1];
      expect(comp.currentCard()).toEqual(sampleCards[3]);
    });
  });

  describe('flip()', () => {
    it('met flipped a true', () => {
      const comp = createFlashcards(sampleCards);
      expect(comp.flipped).toBe(false);
      comp.flip();
      expect(comp.flipped).toBe(true);
    });

    it('toggle entre true et false a chaque appel', () => {
      const comp = createFlashcards(sampleCards);
      comp.flip();
      expect(comp.flipped).toBe(true);
      comp.flip();
      expect(comp.flipped).toBe(false);
      comp.flip();
      expect(comp.flipped).toBe(true);
    });
  });

  describe('rate()', () => {
    it('rate(true) incremente le score et enregistre le resultat', () => {
      const comp = createFlashcards(sampleCards);
      comp.rate(true);
      expect(comp.score).toBe(1);
      expect(comp.results[0]).toBe(true);
      expect(comp.feedback).toEqual({ correct: true });
    });

    it('rate(false) ne incremente pas le score et enregistre le resultat', () => {
      const comp = createFlashcards(sampleCards);
      comp.rate(false);
      expect(comp.score).toBe(0);
      expect(comp.results[0]).toBe(false);
      expect(comp.feedback).toEqual({ correct: false });
    });

    it('enregistre au bon index apres navigation', () => {
      const comp = createFlashcards(sampleCards);
      comp.currentQ = 2;
      comp.rate(true);
      expect(comp.results[2]).toBe(true);
      expect(comp.score).toBe(1);
    });

    it('enregistre au bon index avec queue', () => {
      const comp = createFlashcards(sampleCards);
      comp.queue = [3, 1];
      comp.rate(false);
      expect(comp.results[3]).toBe(false);
    });
  });

  describe('isCurrentAnswered()', () => {
    it('returns false when no result for current index', () => {
      const comp = createFlashcards(sampleCards);
      expect(comp.isCurrentAnswered()).toBe(false);
    });

    it('returns true when result exists for current index', () => {
      const comp = createFlashcards(sampleCards);
      comp.results[0] = true;
      expect(comp.isCurrentAnswered()).toBe(true);
    });
  });

  describe('rate() with reviewing guard', () => {
    it('does not rate when reviewing', () => {
      const comp = createFlashcards(sampleCards);
      comp.highWaterMark = 1;
      comp.currentQ = 0; // reviewing (< highWaterMark)
      comp.rate(true);
      expect(comp.score).toBe(0);
      expect(comp.results[0]).toBeUndefined();
    });
  });

  describe('restoreState()', () => {
    it('restores answered state (flipped + feedback)', () => {
      const comp = createFlashcards(sampleCards);
      comp.results[0] = true;
      comp.restoreState();
      expect(comp.flipped).toBe(true);
      expect(comp.feedback).toEqual({ correct: true });
    });

    it('resets to unanswered state', () => {
      const comp = createFlashcards(sampleCards);
      comp.flipped = true;
      comp.feedback = { correct: false };
      comp.restoreState();
      expect(comp.flipped).toBe(false);
      expect(comp.feedback).toBeNull();
    });
  });

  describe('onNextReady / onPrevReady', () => {
    it('onNextReady calls restoreState', () => {
      const comp = createFlashcards(sampleCards);
      comp.flipped = true;
      comp.onNextReady();
      expect(comp.flipped).toBe(false);
    });

    it('onPrevReady restores answered state', () => {
      const comp = createFlashcards(sampleCards);
      comp.results[0] = false;
      comp.onPrevReady();
      expect(comp.flipped).toBe(true);
      expect(comp.feedback).toEqual({ correct: false });
    });
  });

  describe('onFinish()', () => {
    it('ne fait rien (pas de persistence backend)', () => {
      const comp = createFlashcards(sampleCards);
      // onFinish exists and does nothing — just verify no error
      expect(() => comp.onFinish()).not.toThrow();
    });
  });

  describe('retryWrongCards()', () => {
    it('filtre les cartes incorrectes et relance', () => {
      const comp = createFlashcards(sampleCards);
      comp.results = { 0: true, 1: false, 2: true, 3: false };
      comp.finished = true;
      comp.score = 2;
      comp.retryWrongCards();
      expect(comp.queue).toEqual([1, 3]);
      expect(comp.results).toEqual({});
      expect(comp.flipped).toBe(false);
      expect(comp.currentQ).toBe(0);
      expect(comp.score).toBe(0);
      expect(comp.finished).toBe(false);
    });

    it('ne fait rien si tout est correct', () => {
      const comp = createFlashcards(sampleCards);
      comp.results = { 0: true, 1: true, 2: true, 3: true };
      comp.finished = true;
      comp.retryWrongCards();
      // retryWrong([]) is a no-op
      expect(comp.queue).toBeNull();
    });

    it('total() reflete la queue apres retry', () => {
      const comp = createFlashcards(sampleCards);
      comp.results = { 0: false, 1: true, 2: false, 3: true };
      comp.retryWrongCards();
      expect(comp.total()).toBe(2);
    });
  });

  describe('resetCards()', () => {
    it('remet tout a zero', () => {
      const comp = createFlashcards(sampleCards);
      comp.results = { 0: true, 1: false };
      comp.flipped = true;
      comp.currentQ = 3;
      comp.score = 1;
      comp.finished = true;
      comp.queue = [1];
      comp.feedback = { correct: false };
      comp.resetCards();
      expect(comp.results).toEqual({});
      expect(comp.flipped).toBe(false);
      expect(comp.currentQ).toBe(0);
      expect(comp.score).toBe(0);
      expect(comp.finished).toBe(false);
      expect(comp.queue).toBeNull();
      expect(comp.feedback).toBeNull();
    });

    it('total() revient a la taille complete apres reset', () => {
      const comp = createFlashcards(sampleCards);
      comp.queue = [1];
      comp.resetCards();
      expect(comp.total()).toBe(4);
    });
  });

  describe('integration avec stepByStep navigation', () => {
    it('nextQuestion avance et reset flipped via onNextReady', () => {
      const comp = createFlashcards(sampleCards);
      comp.flipped = true;
      comp.feedback = { correct: true };
      comp.nextQuestion();
      expect(comp.currentQ).toBe(1);
      expect(comp.flipped).toBe(false);
      expect(comp.feedback).toBeNull();
    });

    it('nextQuestion met finished=true a la derniere carte', () => {
      const comp = createFlashcards(sampleCards);
      comp.currentQ = 3; // derniere carte (index 3 sur 4)
      comp.nextQuestion();
      expect(comp.finished).toBe(true);
    });

    it('parcours complet: flip, rate, next pour chaque carte', () => {
      const comp = createFlashcards(sampleCards);

      // Carte 0: correcte
      comp.flip();
      comp.rate(true);
      comp.nextQuestion();

      // Carte 1: incorrecte
      comp.flip();
      comp.rate(false);
      comp.nextQuestion();

      // Carte 2: correcte
      comp.flip();
      comp.rate(true);
      comp.nextQuestion();

      // Carte 3: correcte
      comp.flip();
      comp.rate(true);
      comp.nextQuestion();

      expect(comp.finished).toBe(true);
      expect(comp.score).toBe(3);
      expect(comp.results).toEqual({ 0: true, 1: false, 2: true, 3: true });
    });
  });
});
