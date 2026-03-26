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

    selectChoice(this: any, ci: number) {
      if (this.feedback) return;
      this.selectedChoice = ci;
      const q = this.currentQuestion();
      const correct = ci === q.correct;
      this.answers[this.currentIndex()] = ci;
      if (correct) this.score++;
      this.feedback = { correct };
    },

    onNextReady(this: any) {
      this.selectedChoice = null;
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
