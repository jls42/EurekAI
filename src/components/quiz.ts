import { stepByStep, type StepByStepBase } from './step-by-step';
import { parseChoiceLabel } from '@helpers/choice-labels';
import type { AppContext } from '../app/app-context';
import type { Generation, QuizQuestion, QuizStats } from '../../types';

interface QuizContext extends StepByStepBase, Partial<AppContext> {
  selectedChoice: number | null;
  answers: Record<number, number>;
  reviewing: boolean;
  currentQuestion(): QuizQuestion | undefined;
  choiceParts(raw: string): { label: string; text: string };
  isCurrentAnswered(): boolean;
  selectChoice(ci: number): void;
  restoreState(): void;
  submitAttempt(): Promise<void>;
  reviewErrors(): Promise<void>;
  retryWrongQuestions(): void;
  resetQuiz(): void;
}

type QuizGen = Generation & { data: QuizQuestion[]; stats?: QuizStats };

export function quizComponent(gen: Generation) {
  return {
    ...stepByStep(gen),
    selectedChoice: null as number | null,
    answers: {} as Record<number, number>,
    reviewing: false,

    currentQuestion(this: QuizContext): QuizQuestion | undefined {
      const idx = this.currentIndex();
      return idx === undefined ? undefined : (this.items()[idx] as QuizQuestion);
    },

    // Bidi-safe split pour les choix "A) texte" : label et texte dans des <bdi> séparés
    // côté template. Quand le parseur ne reconnaît pas le format, on renvoie label vide
    // + texte brut (fallback gracieux).
    choiceParts(raw: string): { label: string; text: string } {
      const parsed = parseChoiceLabel(raw);
      return parsed ? { label: `${parsed.label})`, text: parsed.text } : { label: '', text: raw };
    },

    isCurrentAnswered(this: QuizContext): boolean {
      const idx = this.currentIndex();
      return idx !== undefined && idx in this.answers;
    },

    selectChoice(this: QuizContext, ci: number) {
      if (this.feedback || this.isReviewing()) return;
      const idx = this.currentIndex();
      const q = this.currentQuestion();
      if (idx === undefined || !q) return;
      this.selectedChoice = ci;
      const correct = ci === q.correct;
      this.answers[idx] = ci;
      if (correct) this.score++;
      this.feedback = { correct };
    },

    onNextReady(this: QuizContext) {
      this.restoreState();
    },

    onPrevReady(this: QuizContext) {
      this.restoreState();
    },

    restoreState(this: QuizContext) {
      const idx = this.currentIndex();
      if (idx !== undefined && idx in this.answers) {
        this.selectedChoice = this.answers[idx];
        const q = this.items()[idx] as QuizQuestion | undefined;
        this.feedback = { correct: this.answers[idx] === q?.correct };
      } else {
        this.selectedChoice = null;
        this.feedback = null;
      }
    },

    onFinish(this: QuizContext) {
      this.submitAttempt();
    },

    async submitAttempt(this: QuizContext) {
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
          const result = (await res.json()) as { stats: QuizStats };
          (this.gen as QuizGen).stats = result.stats;
          this.showToast?.(this.t?.('toast.scoreSaved') ?? '', 'success');
        } else {
          console.error('Quiz attempt failed:', res.status);
          this.showToast?.(this.t?.('toast.scoreError') ?? '', 'error');
        }
      } catch {
        this.showToast?.(this.t?.('toast.scoreError') ?? '', 'error');
      }
    },

    async reviewErrors(this: QuizContext) {
      const pid = this.currentProjectId;
      const data = (this.gen as QuizGen).data;
      const weakQuestions: QuizQuestion[] = [];
      for (const [qi, ci] of Object.entries(this.answers)) {
        if (data[Number(qi)]?.correct !== Number(ci)) {
          weakQuestions.push(data[Number(qi)]);
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
          const newGen = (await res.json()) as Generation;
          this.generations?.push(newGen);
          if (this.openGens) this.openGens[newGen.id] = true;
          this.showToast?.(this.t?.('toast.reviewGenerated') ?? '', 'success');
        } else {
          console.error('Quiz review failed:', res.status);
          this.showToast?.(this.t?.('toast.reviewError') ?? '', 'error');
        }
      } catch {
        this.showToast?.(this.t?.('toast.reviewError') ?? '', 'error');
      } finally {
        this.reviewing = false;
      }
    },

    retryWrongQuestions(this: QuizContext) {
      const wrong = Object.entries(this.answers)
        .filter(([qi, ci]) => (this.items()[Number(qi)] as QuizQuestion)?.correct !== Number(ci))
        .map(([k]) => Number(k));
      this.answers = {};
      this.selectedChoice = null;
      this.retryWrong(wrong);
    },

    resetQuiz(this: QuizContext) {
      this.answers = {};
      this.selectedChoice = null;
      this.resetAll();
    },
  };
}
