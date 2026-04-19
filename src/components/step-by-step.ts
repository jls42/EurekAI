import type { Generation } from '../../types';

/**
 * Generic step-by-step mixin for Alpine.js exercise components.
 * Provides navigation, progress tracking, score, and retry/reset logic.
 * Each consumer adds its own answer verification and submission.
 */
export interface StepByStepBase {
  gen: Generation;
  currentQ: number;
  highWaterMark: number;
  score: number;
  finished: boolean;
  feedback: { correct: boolean } | null;
  queue: number[] | null;
  items(): unknown[];
  activeIndices(): number[];
  total(): number;
  currentIndex(): number | undefined;
  progress(): number;
  isReviewing(): boolean;
  canGoPrev(): boolean;
  canGoNext(): boolean;
  prevQuestion(): void;
  nextQuestion(): void;
  retryWrong(wrongIndices: number[]): void;
  resetAll(): void;
  onPrevReady?(): void;
  onNextReady?(): void;
  onFinish?(): void;
}

export function stepByStep(gen: Generation) {
  return {
    gen,
    currentQ: 0,
    highWaterMark: 0,
    score: 0,
    finished: false,
    feedback: null as { correct: boolean } | null,
    queue: null as number[] | null,

    items(this: StepByStepBase): unknown[] {
      return ((this.gen as { data?: unknown[] }).data as unknown[]) || [];
    },

    activeIndices(this: StepByStepBase): number[] {
      return this.queue || this.items().map((_, i) => i);
    },

    total(this: StepByStepBase) {
      return this.activeIndices().length;
    },

    currentIndex(this: StepByStepBase) {
      return this.activeIndices()[this.currentQ];
    },

    progress(this: StepByStepBase) {
      const t = this.total();
      if (t === 0) return 0;
      return ((this.currentQ + (this.finished ? 1 : 0)) / t) * 100;
    },

    isReviewing(this: StepByStepBase) {
      return this.currentQ < this.highWaterMark;
    },

    canGoPrev(this: StepByStepBase) {
      return this.currentQ > 0;
    },

    canGoNext(this: StepByStepBase) {
      return this.currentQ < this.highWaterMark;
    },

    prevQuestion(this: StepByStepBase) {
      if (this.currentQ <= 0) return;
      this.feedback = null;
      this.currentQ--;
      this.onPrevReady?.();
    },

    nextQuestion(this: StepByStepBase) {
      this.feedback = null;
      this.currentQ++;
      if (this.currentQ >= this.total()) {
        this.finished = true;
        this.onFinish?.();
      } else {
        if (this.currentQ > this.highWaterMark) {
          this.highWaterMark = this.currentQ;
        }
        this.onNextReady?.();
      }
    },

    retryWrong(this: StepByStepBase, wrongIndices: number[]) {
      if (wrongIndices.length === 0) return;
      this.queue = wrongIndices;
      this.currentQ = 0;
      this.highWaterMark = 0;
      this.score = 0;
      this.finished = false;
      this.feedback = null;
    },

    resetAll(this: StepByStepBase) {
      this.queue = null;
      this.currentQ = 0;
      this.highWaterMark = 0;
      this.score = 0;
      this.finished = false;
      this.feedback = null;
    },
  };
}
