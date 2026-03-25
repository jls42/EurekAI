export function quizComponent(gen: any) {
  return {
    gen,
    answers: {} as Record<number, number>,
    submitted: false,
    reviewing: false,

    initQuiz() {
      this.answers = {};
      this.submitted = false;
    },

    questions() {
      return this.gen.data || [];
    },

    answer(qi: number, ci: number) {
      this.answers[qi] = ci;
      if (this.allAnswered() && !this.submitted) {
        this.submitAttempt();
      }
    },

    allAnswered() {
      return (
        this.questions().length > 0 && Object.keys(this.answers).length === this.questions().length
      );
    },

    score() {
      let s = 0;
      for (const [qi, ci] of Object.entries(this.answers)) {
        if (this.questions()[Number(qi)]?.correct === Number(ci)) s++;
      }
      return s;
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
          this.submitted = true;
          this.showToast(this.t('toast.scoreSaved'), 'success');
        }
      } catch {
        this.showToast(this.t('toast.scoreError'), 'error', () => this.submitAttempt());
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
          body: JSON.stringify({
            generationId: this.gen.id,
            weakQuestions,
          }),
        });
        if (res.ok) {
          const newGen = await res.json();
          this.generations.push(newGen);
          this.openGens[newGen.id] = true;
          this.showToast(this.t('toast.reviewGenerated'), 'success');
        }
      } catch {
        this.showToast(this.t('toast.reviewError'), 'error', () => this.reviewErrors());
      } finally {
        this.reviewing = false;
      }
    },

    resetQuiz() {
      this.answers = {};
      this.submitted = false;
    },
  };
}
