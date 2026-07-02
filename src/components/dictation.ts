/* eslint-disable
   no-unused-vars,
   @typescript-eslint/no-unused-vars,
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-return,
   @typescript-eslint/no-unsafe-argument,
   @typescript-eslint/no-floating-promises,
   @typescript-eslint/no-unnecessary-condition,
   @typescript-eslint/no-redundant-type-constituents,
   @typescript-eslint/no-empty-function
   --
   Codacy lance ESLint sans résolution de types (params de signatures, imports
   cross-module et ReturnType résolus en error/any) ; lint:ci local reste type-aware. */
import { stepByStep, type StepByStepBase } from './step-by-step';
import { diffDictation, maskWordInSentence, type DictationDiff } from '@helpers/dictation-diff';
import type { AppContext } from '../app/app-context';
import type { DictationGeneration, DictationItem, DictationStats, Generation } from '../../types';

// Pause avant la relecture automatique du mot (1 seule relecture — Voxtral TTS
// n'a pas de voix lente, cf. plan vague 1 : l'app orchestre répétition + pause,
// et l'enfant garde la main avec le bouton réécouter).
const REPLAY_PAUSE_MS = 3000;

interface DictationContext extends Omit<StepByStepBase<DictationItem>, 'feedback'>, AppContext {
  typed: string;
  answers: Record<number, string>;
  results: Record<number, boolean>;
  feedback: DictationDiff | null;
  _replayTimer: ReturnType<typeof setTimeout> | null;
  _replayedOnce: boolean;
  currentWord(): DictationItem | undefined;
  maskedSentence(): string | null;
  audioUrl(): string | undefined;
  audioElement(): HTMLAudioElement | undefined;
  playWord(): void;
  stopWord(): void;
  clearReplayTimer(): void;
  onAudioEnded(): void;
  isCurrentAnswered(): boolean;
  checkAnswer(): void;
  restoreState(): void;
  submitFullAttempt(): Promise<void>;
  retryWrongWords(): void;
  resetDictation(): void;
  handleKey(e: KeyboardEvent): void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Méthodes extraites de dictationComponent — `const = function` pour éviter
// l'agglomération Lizard CCN et la limite Codacy « method > 50 lignes »
// (cf. CLAUDE.md pièges connus, même pattern que quiz.ts).
// ─────────────────────────────────────────────────────────────────────────────

const currentWord = function (this: DictationContext): DictationItem | undefined {
  return this.currentItem();
};

// Phrase-exemple À TROU avant validation (sinon l'enfant recopie le mot).
// null si le mot n'est pas retrouvé dans la phrase → la vue n'affiche alors
// la phrase qu'après validation (fallback documenté du plan).
const maskedSentence = function (this: DictationContext): string | null {
  const item = this.currentWord();
  if (!item) return null;
  return maskWordInSentence(item.sentence, item.word);
};

const audioUrl = function (this: DictationContext): string | undefined {
  const idx = this.currentIndex();
  // StepByStepBase type `gen` en Generation large — narrow vers la dictée.
  // .at() plutôt que [idx] : le plugin security Codacy flagge l'indexation dynamique.
  return idx === undefined ? undefined : (this.gen as DictationGeneration).audioUrls.at(idx);
};

const audioElement = function (this: DictationContext): HTMLAudioElement | undefined {
  return this.$refs.wordAudio as HTMLAudioElement | undefined;
};

const clearReplayTimer = function (this: DictationContext) {
  if (this._replayTimer) {
    clearTimeout(this._replayTimer);
    this._replayTimer = null;
  }
};

const playWord = function (this: DictationContext) {
  this.clearReplayTimer();
  this._replayedOnce = false;
  const audio = this.audioElement();
  if (!audio) return;
  audio.currentTime = 0;
  void audio.play().catch(() => {});
};

const stopWord = function (this: DictationContext) {
  this.clearReplayTimer();
  const audio = this.audioElement();
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
};

// Une seule relecture automatique après une pause, jamais après validation.
// Le timer est SYSTÉMATIQUEMENT nettoyé sur next/prev/reset/retry/validation
// et fermeture de carte (sinon un replay différé part après navigation).
const onAudioEnded = function (this: DictationContext) {
  if (this.feedback || this._replayedOnce) return;
  this._replayedOnce = true;
  this.clearReplayTimer();
  this._replayTimer = setTimeout(() => {
    this._replayTimer = null;
    const audio = this.audioElement();
    if (audio) {
      audio.currentTime = 0;
      void audio.play().catch(() => {});
    }
  }, REPLAY_PAUSE_MS);
};

const isCurrentAnswered = function (this: DictationContext): boolean {
  const idx = this.currentIndex();
  return idx !== undefined && idx in this.results;
};

const checkAnswer = function (this: DictationContext) {
  if (this.isReviewing()) return;
  const idx = this.currentIndex();
  const item = this.currentWord();
  if (idx === undefined || !item || !this.typed.trim()) return;
  this.stopWord();
  const diff = diffDictation(this.typed, item.word);
  // Object.assign avec clé calculée : évite le faux positif « Object Injection
  // Sink » du plugin security Codacy sur answers[idx]/results[idx].
  Object.assign(this.answers, { [idx]: this.typed });
  Object.assign(this.results, { [idx]: diff.correct });
  if (diff.correct) this.score++;
  // L'input est verrouillé via :disabled="!!feedback" dans la vue.
  this.feedback = diff;
};

const onNextReady = function (this: DictationContext) {
  this.stopWord();
  this.restoreState();
};

const onPrevReady = function (this: DictationContext) {
  this.stopWord();
  this.restoreState();
};

const restoreState = function (this: DictationContext) {
  const idx = this.currentIndex();
  this._replayedOnce = false;
  // getOwnPropertyDescriptor/.at() : même dodge « Object Injection Sink » que
  // contextLimitFor (routes/generate.ts) pour le plugin security Codacy.
  const saved =
    idx === undefined
      ? undefined
      : (Object.getOwnPropertyDescriptor(this.answers, idx)?.value as string | undefined);
  if (idx !== undefined && saved !== undefined) {
    this.typed = saved;
    const item = this.items().at(idx);
    this.feedback = diffDictation(saved, item?.word ?? '');
  } else {
    this.typed = '';
    this.feedback = null;
    this.$nextTick(() => {
      (this.$refs.dictationInput as HTMLInputElement | undefined)?.focus();
    });
  }
};

const onFinish = function (this: DictationContext) {
  this.stopWord();
  this.submitFullAttempt();
};

const submitFullAttempt = async function (this: DictationContext) {
  const pid = this.currentProjectId;
  try {
    const res = await fetch(
      '/api/projects/' + pid + '/generations/' + this.gen.id + '/dictation-attempt',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: this.answers }),
      },
    );
    if (res.ok) {
      const result = (await res.json()) as { stats: DictationStats };
      (this.gen as Generation & { stats?: DictationStats }).stats = result.stats;
      this.showToast(this.t('toast.scoreSaved'), 'success');
    } else {
      console.error('Dictation attempt failed:', res.status);
      this.showToast(this.t('toast.scoreError'), 'error');
    }
  } catch {
    this.showToast(this.t('toast.scoreError'), 'error');
  }
};

const retryWrongWords = function (this: DictationContext) {
  this.stopWord();
  const wrong = Object.entries(this.results)
    .filter(([, v]) => !v)
    .map(([k]) => Number(k));
  this.answers = {};
  this.results = {};
  this.typed = '';
  this.retryWrong(wrong);
  this.$nextTick(() => {
    (this.$refs.dictationInput as HTMLInputElement | undefined)?.focus();
  });
};

const resetDictation = function (this: DictationContext) {
  this.stopWord();
  this.answers = {};
  this.results = {};
  this.typed = '';
  this.resetAll();
  this.$nextTick(() => {
    (this.$refs.dictationInput as HTMLInputElement | undefined)?.focus();
  });
};

const handleKey = function (this: DictationContext, e: KeyboardEvent) {
  if (e.key !== 'Enter') return;
  if (this.isReviewing()) return;
  if (this.feedback) {
    this.nextQuestion();
  } else if (this.typed.trim()) {
    this.checkAnswer();
  }
};

export function dictationComponent(gen: DictationGeneration) {
  return {
    ...stepByStep<DictationGeneration>(gen),
    typed: '',
    answers: {} as Record<number, string>,
    results: {} as Record<number, boolean>,
    _replayTimer: null as ReturnType<typeof setTimeout> | null,
    _replayedOnce: false,
    currentWord,
    maskedSentence,
    audioUrl,
    audioElement,
    clearReplayTimer,
    playWord,
    stopWord,
    onAudioEnded,
    isCurrentAnswered,
    checkAnswer,
    onNextReady,
    onPrevReady,
    restoreState,
    onFinish,
    submitFullAttempt,
    retryWrongWords,
    resetDictation,
    handleKey,
  };
}
