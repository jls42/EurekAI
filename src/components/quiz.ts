import { stepByStep, type StepByStepBase } from './step-by-step';
import { parseChoiceLabel } from '@helpers/choice-labels';
import type { AppContext } from '../app/app-context';
import type { Generation, QuizGeneration, QuizQuestion, QuizStats } from '../../types';

interface QuizContext extends StepByStepBase<QuizQuestion>, AppContext {
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

// ─────────────────────────────────────────────────────────────────────────────
// Méthodes extraites de quizComponent — `const = function` pour éviter
// l'agglomération Lizard CCN (cf. CLAUDE.md piège connu).
// ─────────────────────────────────────────────────────────────────────────────

const currentQuestion = function (this: QuizContext): QuizQuestion | undefined {
  return this.currentItem();
};

// Bidi-safe split pour les choix "A) texte" : label et texte dans des <bdi> séparés
// côté template. Quand le parseur ne reconnaît pas le format, on renvoie label vide
// + texte brut (fallback gracieux).
const choiceParts = function (raw: string): { label: string; text: string } {
  const parsed = parseChoiceLabel(raw);
  return parsed ? { label: `${parsed.label})`, text: parsed.text } : { label: '', text: raw };
};

const isCurrentAnswered = function (this: QuizContext): boolean {
  const idx = this.currentIndex();
  return idx !== undefined && idx in this.answers;
};

const selectChoice = function (this: QuizContext, ci: number) {
  if (this.feedback || this.isReviewing()) return;
  const idx = this.currentIndex();
  const q = this.currentQuestion();
  if (idx === undefined || !q) return;
  this.selectedChoice = ci;
  const correct = ci === q.correct;
  this.answers[idx] = ci;
  if (correct) this.score++;
  this.feedback = { correct };
};

const onNextReady = function (this: QuizContext) {
  this.restoreState();
};

const onPrevReady = function (this: QuizContext) {
  this.restoreState();
};

const restoreState = function (this: QuizContext) {
  const idx = this.currentIndex();
  if (idx !== undefined && idx in this.answers) {
    this.selectedChoice = this.answers[idx];
    const q = this.items()[idx];
    this.feedback = { correct: this.answers[idx] === q?.correct };
  } else {
    this.selectedChoice = null;
    this.feedback = null;
  }
};

const onFinish = function (this: QuizContext) {
  this.submitAttempt();
};

const submitAttempt = async function (this: QuizContext) {
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
      this.showToast(this.t('toast.scoreSaved'), 'success');
    } else {
      console.error('Quiz attempt failed:', res.status);
      this.showToast(this.t('toast.scoreError'), 'error');
    }
  } catch {
    this.showToast(this.t('toast.scoreError'), 'error');
  }
};

const collectWeakQuestions = function (
  data: QuizQuestion[],
  answers: Record<number, number>,
): QuizQuestion[] {
  const weak: QuizQuestion[] = [];
  for (const [qi, ci] of Object.entries(answers)) {
    if (data[Number(qi)]?.correct !== Number(ci)) {
      weak.push(data[Number(qi)]);
    }
  }
  return weak;
};

const reviewErrors = async function (this: QuizContext) {
  const pid = this.currentProjectId;
  const weakQuestions = collectWeakQuestions(this.items(), this.answers);
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
};

const retryWrongQuestions = function (this: QuizContext) {
  const wrong = Object.entries(this.answers)
    .filter(([qi, ci]) => this.items()[Number(qi)]?.correct !== Number(ci))
    .map(([k]) => Number(k));
  this.answers = {};
  this.selectedChoice = null;
  this.retryWrong(wrong);
};

const resetQuiz = function (this: QuizContext) {
  this.answers = {};
  this.selectedChoice = null;
  this.resetAll();
};

export function quizComponent(gen: QuizGeneration) {
  return {
    ...stepByStep<QuizGeneration>(gen),
    selectedChoice: null as number | null,
    answers: {} as Record<number, number>,
    reviewing: false,
    currentQuestion,
    choiceParts,
    isCurrentAnswered,
    selectChoice,
    onNextReady,
    onPrevReady,
    restoreState,
    onFinish,
    submitAttempt,
    reviewErrors,
    retryWrongQuestions,
    resetQuiz,
  };
}
