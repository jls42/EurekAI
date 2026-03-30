import { stepByStep } from './step-by-step';

export function flashcardsComponent(gen: any) {
  return {
    ...stepByStep(gen),
    flipped: false,
    results: {} as Record<number, boolean>,

    currentCard() {
      return this.items()[this.currentIndex()];
    },

    flip(this: any) {
      this.flipped = !this.flipped;
      if (!this.flipped) this.feedback = null;
    },

    isCurrentAnswered(this: any): boolean {
      return this.currentIndex() in this.results;
    },

    rate(this: any, correct: boolean) {
      if (this.isReviewing()) return;
      this.results[this.currentIndex()] = correct;
      if (correct) this.score++;
      this.feedback = { correct };
      setTimeout(() => this.nextQuestion(), 600);
    },

    onNextReady(this: any) {
      this.restoreState();
    },

    onPrevReady(this: any) {
      this.restoreState();
    },

    restoreState(this: any) {
      const idx = this.currentIndex();
      if (idx in this.results) {
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
