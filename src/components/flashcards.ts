import { stepByStep } from './step-by-step';

export function flashcardsComponent(gen: any) {
  return {
    ...stepByStep(gen),
    flipped: false,
    results: {} as Record<number, boolean>,

    currentCard() {
      return this.items()[this.currentIndex()];
    },

    flip() {
      this.flipped = true;
    },

    rate(this: any, correct: boolean) {
      this.results[this.currentIndex()] = correct;
      if (correct) this.score++;
      this.feedback = { correct };
    },

    onNextReady(this: any) {
      this.flipped = false;
    },

    onFinish() {
      // No backend persistence for flashcard scores (self-evaluation)
    },

    retryWrongCards(this: any) {
      const wrong = Object.entries(this.results)
        .filter(([, v]) => !v)
        .map(([k]) => Number(k));
      this.results = {};
      this.flipped = false;
      this.retryWrong(wrong);
    },

    resetCards(this: any) {
      this.results = {};
      this.flipped = false;
      this.resetAll();
    },
  };
}
