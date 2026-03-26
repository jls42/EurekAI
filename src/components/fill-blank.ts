import { stepByStep } from './step-by-step';
import { validateAnswer } from './fill-blank-validate';

export function fillBlankComponent(gen: any) {
  return {
    ...stepByStep(gen),
    answer: '',
    answers: {} as Record<number, string>,
    results: {} as Record<number, boolean>,
    showHint: false,

    currentExercise() {
      return this.items()[this.currentIndex()];
    },

    checkAnswer(this: any) {
      const idx = this.currentIndex();
      const ex = this.currentExercise();
      const correct = validateAnswer(this.answer, ex.answer);
      this.answers[idx] = this.answer;
      this.results[idx] = correct;
      if (correct) this.score++;
      this.feedback = { correct, correctAnswer: ex.answer };
    },

    onNextReady(this: any) {
      this.answer = '';
      this.showHint = false;
      this.$nextTick(() => {
        this.$refs.blankInput?.focus();
      });
    },

    onFinish(this: any) {
      this.submitFullAttempt();
    },

    async submitFullAttempt(this: any) {
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
          const result = await res.json();
          this.gen.stats = result.stats;
          this.showToast(this.t('toast.scoreSaved'), 'success');
        }
      } catch {
        this.showToast(this.t('toast.scoreError'), 'error');
      }
    },

    retryWrongExercises(this: any) {
      const wrong = Object.entries(this.results)
        .filter(([, v]) => !v)
        .map(([k]) => Number(k));
      this.answers = {};
      this.results = {};
      this.answer = '';
      this.showHint = false;
      this.retryWrong(wrong);
      this.$nextTick(() => {
        this.$refs.blankInput?.focus();
      });
    },

    resetExercise(this: any) {
      this.answers = {};
      this.results = {};
      this.answer = '';
      this.showHint = false;
      this.resetAll();
      this.$nextTick(() => {
        this.$refs.blankInput?.focus();
      });
    },

    handleKey(this: any, e: KeyboardEvent) {
      if (e.key !== 'Enter') return;
      if (this.feedback) {
        this.nextQuestion();
      } else if (this.answer.trim()) {
        this.checkAnswer();
      }
    },
  };
}
