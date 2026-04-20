import type { Generation } from '../../types';

export type DataItemOf<G extends Generation> = G extends { data: (infer U)[] } ? U : never;

export interface StepByStepBase<T = unknown> {
  gen: Generation;
  currentQ: number;
  highWaterMark: number;
  score: number;
  finished: boolean;
  feedback: { correct: boolean } | null;
  queue: number[] | null;
  items(): T[];
  currentItem(): T | undefined;
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

export function stepByStep<G extends Generation, T = DataItemOf<G>>(gen: G) {
  return {
    gen,
    currentQ: 0,
    highWaterMark: 0,
    score: 0,
    finished: false,
    feedback: null as { correct: boolean } | null,
    queue: null as number[] | null,

    items(this: StepByStepBase<T>): T[] {
      return ((this.gen as unknown as { data?: T[] }).data as T[]) || [];
    },

    currentItem(this: StepByStepBase<T>): T | undefined {
      const idx = this.currentIndex();
      return idx === undefined ? undefined : this.items()[idx];
    },

    activeIndices(this: StepByStepBase<T>): number[] {
      return this.queue || this.items().map((_, i) => i);
    },

    total(this: StepByStepBase<T>) {
      return this.activeIndices().length;
    },

    currentIndex(this: StepByStepBase<T>) {
      return this.activeIndices()[this.currentQ];
    },

    progress(this: StepByStepBase<T>) {
      const t = this.total();
      if (t === 0) return 0;
      return Math.min(100, ((this.currentQ + (this.finished ? 1 : 0)) / t) * 100);
    },

    isReviewing(this: StepByStepBase<T>) {
      return this.currentQ < this.highWaterMark;
    },

    canGoPrev(this: StepByStepBase<T>) {
      return this.currentQ > 0;
    },

    canGoNext(this: StepByStepBase<T>) {
      return this.currentQ < this.highWaterMark;
    },

    prevQuestion(this: StepByStepBase<T>) {
      if (this.currentQ <= 0) return;
      this.feedback = null;
      this.currentQ--;
      this.onPrevReady?.();
    },

    nextQuestion(this: StepByStepBase<T>) {
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

    retryWrong(this: StepByStepBase<T>, wrongIndices: number[]) {
      if (wrongIndices.length === 0) return;
      this.queue = wrongIndices;
      this.currentQ = 0;
      this.highWaterMark = 0;
      this.score = 0;
      this.finished = false;
      this.feedback = null;
    },

    resetAll(this: StepByStepBase<T>) {
      this.queue = null;
      this.currentQ = 0;
      this.highWaterMark = 0;
      this.score = 0;
      this.finished = false;
      this.feedback = null;
    },
  };
}
