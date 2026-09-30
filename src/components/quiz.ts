import { stepByStep, type StepByStepBase } from './step-by-step';
import { withAiHeaders } from '../app/ai-fetch';
import { registerGeneration } from '../app/generate';
import { ensureGenerationAllowed } from '../app/moderation-gate';
import { getLocale } from '../i18n/index';
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
  remediate(): Promise<void>;
  retryWrongQuestions(): void;
  resetQuiz(): void;
}

type QuizGen = Generation & { data: QuizQuestion[]; stats?: QuizStats };

const API_PROJECTS = '/api/projects/';

type RemediationTarget = 'remediation-summary' | 'quiz-review';

// Refus de modération (contenu signalé) : réessayer produirait le même refus.
const MODERATION_BLOCKED = 'moderation.blocked';

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
  void this.submitAttempt();
};

const submitAttempt = async function (this: QuizContext) {
  const pid = this.currentProjectId;
  try {
    const res = await fetch(API_PROJECTS + pid + '/generations/' + this.gen.id + '/quiz-attempt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: this.answers }),
    });
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

// Sources du quiz d'origine : le serveur garde la remédiation sur elles et ne donne qu'elles au
// LLM. [] = toutes les sources du projet, comme le serveur (quiz ancien sans sourceIds compris).
const quizSourceIds = (gen: Generation): string[] => {
  return (gen.sourceIds as string[] | undefined) ?? [];
};

// Corps d'une cible : lang et ageGroup, obligatoires sur tout appel IA — langue de l'interface,
// âge du profil courant (absent sans profil : défaut du serveur).
const remediationBody = (state: QuizContext, weakQuestions: QuizQuestion[]) => {
  return {
    generationId: state.gen.id,
    weakQuestions,
    lang: getLocale(),
    ageGroup: state.currentProfile?.ageGroup,
  };
};

// Code d'erreur stable renvoyé par le serveur (`{ error }`), undefined si le corps n'en porte pas.
const readErrorCode = async (res: Response): Promise<string | undefined> => {
  const body: unknown = await res.json().catch(() => null);
  const code = (body as { error?: unknown } | null)?.error;
  return typeof code === 'string' ? code : undefined;
};

// Vrai si l'échec est un refus de modération du serveur (code porté par l'exception).
const isModerationBlocked = (reason: unknown): boolean => {
  return (reason as { code?: unknown } | null | undefined)?.code === MODERATION_BLOCKED;
};

const postRemediationTarget = async function (
  this: QuizContext,
  target: RemediationTarget,
  weakQuestions: QuizQuestion[],
): Promise<Generation> {
  const pid = this.currentProjectId;
  const allowedUrls = [
    API_PROJECTS + pid + '/generate/remediation-summary',
    API_PROJECTS + pid + '/generate/quiz-review',
  ];
  const url = API_PROJECTS + pid + '/generate/' + target;
  // Shape exact `if (whitelist.includes(url)) { fetch(url, ...) }` reconnu
  // par Codacy `rule-node-ssrf` (même pattern que src/app/generate.ts).
  if (allowedUrls.includes(url)) {
    const res = await fetch(
      url,
      withAiHeaders({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(remediationBody(this, weakQuestions)),
      }),
    );
    if (!res.ok) {
      const code = await readErrorCode(res);
      throw Object.assign(new Error(`${target} failed: ${res.status}`), { code });
    }
    const gen: unknown = await res.json();
    return gen as Generation;
  }
  throw new Error('invalid remediation target');
};

// Échec d'une cible : toast avec réessai ciblé (la chaîne se poursuit tant qu'il échoue).
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars -- Codacy compte `this`/params typés comme unused.
const notifyRemediationFailure = function (
  this: QuizContext,
  target: RemediationTarget,
  weakQuestions: QuizQuestion[],
  errorKey: string,
): void {
  this.showToast(this.t(errorKey), 'error', () => {
    void retryRemediationTarget.call(this, target, weakQuestions, errorKey);
  });
};

// Réessai CIBLÉ d'une seule cible de remédiation (pas les deux) : évite de
// régénérer la moitié déjà réussie. Le toast d'échec re-propose le réessai (chaîne),
// sauf refus de modération : même refus assuré, toast sans bouton.
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars -- Codacy compte `this`/params typés comme unused.
const retryRemediationTarget = async function (
  this: QuizContext,
  target: RemediationTarget,
  weakQuestions: QuizQuestion[],
  errorKey: string,
): Promise<void> {
  try {
    const gen = await postRemediationTarget.call(this, target, weakQuestions);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Codacy ne résout pas Generation cross-module.
    registerGeneration(this, gen);
  } catch (e) {
    console.error(`Remediation ${target} retry failed:`, e);
    if (isModerationBlocked(e)) {
      this.showToast(this.t(MODERATION_BLOCKED), 'error');
      return;
    }
    notifyRemediationFailure.call(this, target, weakQuestions, errorKey);
  }
};

// Résultat d'une cible : génération enregistrée, sinon échec signalé avec réessai ciblé — sauf
// refus de modération, signalé une seule fois pour les deux cibles par remediate.
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars -- Codacy compte `this`/params typés comme unused.
const settleRemediationTarget = function (
  this: QuizContext,
  result: PromiseSettledResult<Generation>,
  target: RemediationTarget,
  weakQuestions: QuizQuestion[],
  errorKey: string,
): void {
  if (result.status === 'fulfilled') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Codacy ne résout pas PromiseFulfilledResult<Generation> cross-module.
    registerGeneration(this, result.value);
    return;
  }
  console.error(`Remediation ${target} failed:`, result.reason);
  if (!isModerationBlocked(result.reason)) {
    notifyRemediationFailure.call(this, target, weakQuestions, errorKey);
  }
};

// « M'entraîner sur mes erreurs » : fiche de rappel + quiz de révision, générés en
// parallèle (allSettled, jamais Promise.all : un rejet réseau masquerait l'autre
// résultat). Succès partiel : chaque génération obtenue est affichée même si
// l'autre a échoué. Chaque échec propose un réessai ciblé (cf. retryRemediationTarget).
// Pré-contrôle (projet, modération du profil) sur les sources du quiz d'origine, celles que le
// serveur garde : même statut effectif et même toast que les autres générations, sources en
// attente ou en erreur vérifiées d'abord (ensureGenerationAllowed), avant `reviewing`.
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars -- Codacy (ESLint sans résolution de types) compte le param `this` typé comme unused.
const remediate = async function (this: QuizContext) {
  const weakQuestions = collectWeakQuestions(this.items(), this.answers);
  if (weakQuestions.length === 0) return;
  if (!(await ensureGenerationAllowed(this, quizSourceIds(this.gen)))) return;

  this.reviewing = true;
  const [fiche, quiz] = await Promise.allSettled([
    postRemediationTarget.call(this, 'remediation-summary', weakQuestions),
    postRemediationTarget.call(this, 'quiz-review', weakQuestions),
  ]);
  // Refus de modération du serveur (état local périmé) : un seul toast, sans réessai.
  const refused = [fiche, quiz].some(
    (r) => r.status === 'rejected' && isModerationBlocked(r.reason),
  );
  if (refused) this.showToast(this.t(MODERATION_BLOCKED), 'error');
  settleRemediationTarget.call(
    this,
    fiche,
    'remediation-summary',
    weakQuestions,
    'toast.remediationSummaryError',
  );
  settleRemediationTarget.call(
    this,
    quiz,
    'quiz-review',
    weakQuestions,
    'toast.remediationQuizError',
  );
  if (fiche.status === 'fulfilled' && quiz.status === 'fulfilled') {
    this.showToast(this.t('toast.remediationGenerated'), 'success');
  }
  this.reviewing = false;
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
    remediate,
    retryWrongQuestions,
    resetQuiz,
  };
}
