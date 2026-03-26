/**
 * Generic step-by-step mixin for Alpine.js exercise components.
 * Provides navigation, progress tracking, score, and retry/reset logic.
 * Each consumer adds its own answer verification and submission.
 */
export function stepByStep(gen: any) {
  return {
    gen,
    currentQ: 0,
    score: 0,
    finished: false,
    feedback: null as { correct: boolean } | null,
    queue: null as number[] | null,

    items() {
      return this.gen.data || [];
    },

    activeIndices(): number[] {
      return this.queue || this.items().map((_: any, i: number) => i);
    },

    total() {
      return this.activeIndices().length;
    },

    currentIndex() {
      return this.activeIndices()[this.currentQ];
    },

    progress() {
      const t = this.total();
      if (t === 0) return 0;
      return ((this.currentQ + (this.finished ? 1 : 0)) / t) * 100;
    },

    nextQuestion(this: any) {
      this.feedback = null;
      this.currentQ++;
      if (this.currentQ >= this.total()) {
        this.finished = true;
        this.onFinish?.();
      } else {
        this.onNextReady?.();
      }
    },

    retryWrong(wrongIndices: number[]) {
      if (wrongIndices.length === 0) return;
      this.queue = wrongIndices;
      this.currentQ = 0;
      this.score = 0;
      this.finished = false;
      this.feedback = null;
    },

    resetAll() {
      this.queue = null;
      this.currentQ = 0;
      this.score = 0;
      this.finished = false;
      this.feedback = null;
    },
  };
}
