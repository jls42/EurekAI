import { stepByStep } from './step-by-step';

export function quizComponent(gen: any) {
  return {
    ...stepByStep(gen),
    selectedChoice: null as number | null,
    answers: {} as Record<number, number>,
    reviewing: false,

    currentQuestion() {
      return this.items()[this.currentIndex()];
    },

    isCurrentAnswered(this: any): boolean {
      return this.currentIndex() in this.answers;
    },

    selectChoice(this: any, ci: number) {
      if (this.feedback || this.isReviewing()) return;
      this.selectedChoice = ci;
      const q = this.currentQuestion();
      const correct = ci === q.correct;
      this.answers[this.currentIndex()] = ci;
      if (correct) this.score++;
      this.feedback = { correct };
    },

    onNextReady(this: any) {
      this.restoreState();
    },

    onPrevReady(this: any) {
      this.restoreState();
    },

    restoreState(this: any) {
      const idx = this.currentIndex();
      if (idx in this.answers) {
        this.selectedChoice = this.answers[idx];
        const q = this.items()[idx];
        this.feedback = { correct: this.answers[idx] === q?.correct };
      } else {
        this.selectedChoice = null;
        this.feedback = null;
      }
    },

    onFinish(this: any) {
      this.submitAttempt();
    },

    async submitAttempt(this: any) {
      const pid = this.currentProjectId;
      try {
        const res = await fetch(
          '/api/projects/' + pid + '/generations/' + this.gen.id + '/quiz-attempt',
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
        } else {
          console.error('Quiz attempt failed:', res.status);
          this.showToast(this.t('toast.scoreError'), 'error');
        }
      } catch {
        this.showToast(this.t('toast.scoreError'), 'error');
      }
    },

    async reviewErrors(this: any) {
      const pid = this.currentProjectId;
      const weakQuestions: any[] = [];
      for (const [qi, ci] of Object.entries(this.answers)) {
        if (this.gen.data[Number(qi)]?.correct !== Number(ci)) {
          weakQuestions.push(this.gen.data[Number(qi)]);
        }
      }
      if (weakQuestions.length === 0) return;

      this.reviewing = true;
      try {
        const res = await fetch('/api/projects/' + pid + '/generate/quiz-review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ generationId: this.gen.id, weakQuestions }),
        });
        if (res.ok) {
          const newGen = await res.json();
          this.generations.push(newGen);
          this.openGens[newGen.id] = true;
          this.showToast(this.t('toast.reviewGenerated'), 'success');
        } else {
          console.error('Quiz review failed:', res.status);
          this.showToast(this.t('toast.reviewError'), 'error');
        }
      } catch {
        this.showToast(this.t('toast.reviewError'), 'error');
      } finally {
        this.reviewing = false;
      }
    },

    retryWrongQuestions(this: any) {
      const wrong = Object.entries(this.answers)
        .filter(([qi, ci]) => this.items()[Number(qi)]?.correct !== Number(ci))
        .map(([k]) => Number(k));
      this.answers = {};
      this.selectedChoice = null;
      this.retryWrong(wrong);
    },

    resetQuiz(this: any) {
      this.answers = {};
      this.selectedChoice = null;
      this.resetAll();
    },
  };
}
