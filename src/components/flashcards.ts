import { stepByStep, type StepByStepBase } from './step-by-step';
import type { Generation, Flashcard } from '../../types';

interface FlashcardsContext extends StepByStepBase {
  flipped: boolean;
  results: Record<number, boolean>;
  currentCard(): Flashcard | undefined;
  flip(): void;
  isCurrentAnswered(): boolean;
  rate(correct: boolean): void;
  restoreState(): void;
  retryWrongCards(): void;
  resetCards(): void;
}

export function flashcardsComponent(gen: Generation) {
  return {
    ...stepByStep(gen),
    flipped: false,
    results: {} as Record<number, boolean>,

    currentCard(this: FlashcardsContext): Flashcard | undefined {
      const idx = this.currentIndex();
      return idx === undefined ? undefined : (this.items()[idx] as Flashcard);
    },

    flip(this: FlashcardsContext) {
      this.flipped = !this.flipped;
      if (!this.flipped) this.feedback = null;
    },

    isCurrentAnswered(this: FlashcardsContext): boolean {
      const idx = this.currentIndex();
      return idx !== undefined && idx in this.results;
    },

    rate(this: FlashcardsContext, correct: boolean) {
      if (this.isReviewing()) return;
      const idx = this.currentIndex();
      if (idx === undefined) return;
      this.results[idx] = correct;
      if (correct) this.score++;
      this.feedback = { correct };
      setTimeout(() => this.nextQuestion(), 600);
    },

    onNextReady(this: FlashcardsContext) {
      this.restoreState();
    },

    onPrevReady(this: FlashcardsContext) {
      this.restoreState();
    },

    restoreState(this: FlashcardsContext) {
      const idx = this.currentIndex();
      if (idx !== undefined && idx in this.results) {
        this.flipped = true;
        this.feedback = { correct: this.results[idx] };
      } else {
        this.flipped = false;
        this.feedback = null;
      }
    },

    onFinish() {
      // No backend persistence for flashcard scores (self-evaluation)
    },

    retryWrongCards(this: FlashcardsContext) {
      const wrong = Object.entries(this.results)
        .filter(([, v]) => !v)
        .map(([k]) => Number(k));
      this.results = {};
      this.flipped = false;
      this.retryWrong(wrong);
    },

    resetCards(this: FlashcardsContext) {
      this.results = {};
      this.flipped = false;
      this.resetAll();
    },
  };
}
