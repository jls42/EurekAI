export function fillBlankComponent(gen: any) {
  return {
    gen,
    answers: {} as Record<number, string>,
    results: null as Record<number, boolean> | null,
    submitted: false,
    showHint: {} as Record<number, boolean>,

    initFillBlank() {
      this.answers = {};
      this.results = null;
      this.submitted = false;
      this.showHint = {};
    },

    exercises() {
      return this.gen.data || [];
    },

    toggleHint(qi: number) {
      this.showHint[qi] = !this.showHint[qi];
    },

    allFilled() {
      return (
        this.exercises().length > 0 &&
        Object.keys(this.answers).length === this.exercises().length &&
        Object.values(this.answers).every((a: any) => (a as string).trim().length > 0)
      );
    },

    score() {
      if (!this.results) return 0;
      return Object.values(this.results).filter(Boolean).length;
    },

    async submitAttempt(this: any) {
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
          this.results = result.results;
          this.gen.stats = result.stats;
          this.submitted = true;
          this.showToast(this.t('toast.scoreSaved'), 'success');
        }
      } catch {
        this.showToast(this.t('toast.scoreError'), 'error', () => this.submitAttempt());
      }
    },

    retryWrong(this: any) {
      if (!this.results) return;
      for (const [qi, correct] of Object.entries(this.results)) {
        if (!correct) {
          this.answers[Number(qi)] = '';
        }
      }
      this.submitted = false;
      this.results = null;
    },

    resetExercise() {
      this.initFillBlank();
    },
  };
}
