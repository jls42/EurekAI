import { stepByStep, type StepByStepBase } from './step-by-step';
import { validateAnswer } from './fill-blank-validate';
import type { AppContext } from '../app/app-context';
import type { FillBlankItem, FillBlankStats, Generation } from '../../types';

type FillBlankFeedback = { correct: boolean; correctAnswer?: string };

interface FillBlankContext extends Omit<StepByStepBase, 'feedback'>, Partial<AppContext> {
  answer: string;
  answers: Record<number, string>;
  results: Record<number, boolean>;
  showHint: boolean;
  feedback: FillBlankFeedback | null;
  currentExercise(): FillBlankItem | undefined;
  isCurrentAnswered(): boolean;
  checkAnswer(): void;
  restoreState(): void;
  submitFullAttempt(): Promise<void>;
  retryWrongExercises(): void;
  resetExercise(): void;
  handleKey(e: KeyboardEvent): void;
}

export function fillBlankComponent(gen: Generation) {
  return {
    ...stepByStep(gen),
    answer: '',
    answers: {} as Record<number, string>,
    results: {} as Record<number, boolean>,
    showHint: false,

    currentExercise(this: FillBlankContext): FillBlankItem | undefined {
      const idx = this.currentIndex();
      return idx === undefined ? undefined : (this.items()[idx] as FillBlankItem);
    },

    isCurrentAnswered(this: FillBlankContext): boolean {
      const idx = this.currentIndex();
      return idx !== undefined && idx in this.results;
    },

    checkAnswer(this: FillBlankContext) {
      if (this.isReviewing()) return;
      const idx = this.currentIndex();
      const ex = this.currentExercise();
      if (idx === undefined || !ex) return;
      const correct = validateAnswer(this.answer, ex.answer);
      this.answers[idx] = this.answer;
      this.results[idx] = correct;
      if (correct) this.score++;
      this.feedback = { correct, correctAnswer: ex.answer };
    },

    onNextReady(this: FillBlankContext) {
      this.restoreState();
    },

    onPrevReady(this: FillBlankContext) {
      this.restoreState();
    },

    restoreState(this: FillBlankContext) {
      const idx = this.currentIndex();
      this.showHint = false;
      if (idx !== undefined && idx in this.answers) {
        this.answer = this.answers[idx];
        const ex = this.items()[idx] as FillBlankItem | undefined;
        this.feedback = { correct: this.results[idx], correctAnswer: ex?.answer };
      } else {
        this.answer = '';
        this.feedback = null;
        this.$nextTick?.(() => {
          (this.$refs?.blankInput as HTMLInputElement | undefined)?.focus();
        });
      }
    },

    onFinish(this: FillBlankContext) {
      this.submitFullAttempt();
    },

    async submitFullAttempt(this: FillBlankContext) {
      const pid = this.currentProjectId;
      try {
        const res = await fetch(
          '/api/projects/' + pid + '/generations/' + this.gen.id + '/fill-blank-attempt',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: this.answers }),
          },
        );
        if (res.ok) {
          const result = (await res.json()) as { stats: FillBlankStats };
          (this.gen as Generation & { stats?: FillBlankStats }).stats = result.stats;
          this.showToast?.(this.t?.('toast.scoreSaved') ?? '', 'success');
        } else {
          console.error('Fill-blank attempt failed:', res.status);
          this.showToast?.(this.t?.('toast.scoreError') ?? '', 'error');
        }
      } catch {
        this.showToast?.(this.t?.('toast.scoreError') ?? '', 'error');
      }
    },

    retryWrongExercises(this: FillBlankContext) {
      const wrong = Object.entries(this.results)
        .filter(([, v]) => !v)
        .map(([k]) => Number(k));
      this.answers = {};
      this.results = {};
      this.answer = '';
      this.showHint = false;
      this.retryWrong(wrong);
      this.$nextTick?.(() => {
        (this.$refs?.blankInput as HTMLInputElement | undefined)?.focus();
      });
    },

    resetExercise(this: FillBlankContext) {
      this.answers = {};
      this.results = {};
      this.answer = '';
      this.showHint = false;
      this.resetAll();
      this.$nextTick?.(() => {
        (this.$refs?.blankInput as HTMLInputElement | undefined)?.focus();
      });
    },

    handleKey(this: FillBlankContext, e: KeyboardEvent) {
      if (e.key !== 'Enter') return;
      if (this.isReviewing()) return;
      if (this.feedback) {
        this.nextQuestion();
      } else if (this.answer.trim()) {
        this.checkAnswer();
      }
    },
  };
}
