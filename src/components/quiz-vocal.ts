import { stepByStep, type StepByStepBase } from './step-by-step';
import { parseChoiceLabel } from '@helpers/choice-labels';
import type { AppContext } from '../app/app-context';
import type { Generation, QuizQuestion } from '../../types';

interface VocalFeedback {
  correct: boolean;
  feedback?: string;
  transcription?: string;
  loading?: boolean;
}

function buildErrorFeedback(this: QuizVocalContext, key: string, error?: string): VocalFeedback {
  const t = this.t?.bind(this);
  const msg = error ? (t?.(key, { error }) ?? '') : (t?.(key) ?? '');
  return { correct: false, feedback: msg, transcription: '' };
}

async function postVocalAttempt(
  pid: string,
  genId: string,
  idx: number,
  blob: Blob,
): Promise<Response> {
  const formData = new FormData();
  formData.append('audio', blob, 'answer.webm');
  formData.append('questionIndex', String(idx));
  formData.append('lang', document.documentElement.lang || 'fr');
  return fetch('/api/projects/' + pid + '/generations/' + genId + '/vocal-answer', {
    method: 'POST',
    body: formData,
  });
}

interface QuizVocalContext extends Omit<StepByStepBase, 'feedback'>, Partial<AppContext> {
  audioPlaying: boolean;
  vocalRecording: boolean;
  vocalRecorder: MediaRecorder | null;
  storedFeedback: Record<number, VocalFeedback>;
  feedback: VocalFeedback | null;
  questions(): QuizQuestion[];
  choiceParts(raw: string): { label: string; text: string };
  currentAudioUrl(): string;
  questionAudio(): HTMLAudioElement | null;
  stopQuestion(): void;
  playQuestion(): void;
  startVocalRecording(): Promise<void>;
  stopVocalRecording(): void;
  isCurrentAnswered(): boolean;
  submitVocalAnswer(blob: Blob): Promise<void>;
  restoreOrPlay(): void;
  resetVocalQuiz(): void;
}

type QuizVocalGen = Generation & { audioUrls?: Record<number, string> };

export function quizVocalComponent(gen: Generation) {
  return {
    ...stepByStep(gen),
    audioPlaying: false,
    vocalRecording: false,
    vocalRecorder: null as MediaRecorder | null,
    storedFeedback: {} as Record<number, VocalFeedback>,

    questions(this: QuizVocalContext): QuizQuestion[] {
      return this.items() as QuizQuestion[];
    },

    // Bidi-safe split identique à quizComponent.choiceParts — évite la duplication
    // de la logique de parsing tout en gardant le helper pur.
    choiceParts(raw: string): { label: string; text: string } {
      const parsed = parseChoiceLabel(raw);
      return parsed ? { label: `${parsed.label})`, text: parsed.text } : { label: '', text: raw };
    },

    currentAudioUrl(this: QuizVocalContext): string {
      const idx = this.currentIndex();
      if (idx === undefined) return '';
      return (this.gen as QuizVocalGen).audioUrls?.[idx] || '';
    },

    questionAudio(this: QuizVocalContext): HTMLAudioElement | null {
      return (this.$refs?.questionAudio as HTMLAudioElement | undefined) ?? null;
    },

    stopQuestion(this: QuizVocalContext) {
      const audio = this.questionAudio();
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      this.audioPlaying = false;
    },

    playQuestion(this: QuizVocalContext) {
      const audio = this.questionAudio();
      if (!audio || !this.currentAudioUrl()) return;
      audio.pause();
      audio.currentTime = 0;
      audio.load();
      this.audioPlaying = true;
      audio.play().catch((e: Error) => {
        this.audioPlaying = false;
        console.warn('Question audio play failed:', e.message);
      });
    },

    async startVocalRecording(this: QuizVocalContext) {
      try {
        this.stopQuestion();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.vocalRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        const chunks: Blob[] = [];
        this.vocalRecorder.ondataavailable = (e: BlobEvent) => chunks.push(e.data);
        this.vocalRecorder.onstop = async () => {
          stream.getTracks().forEach((t) => t.stop());
          const blob = new Blob(chunks, { type: 'audio/webm' });
          await this.submitVocalAnswer(blob);
        };
        this.vocalRecorder.start();
        this.vocalRecording = true;
      } catch (e) {
        const error = e instanceof Error ? e.message : String(e);
        this.showToast?.(this.t?.('toast.micError', { error }) ?? '', 'error');
      }
    },

    stopVocalRecording(this: QuizVocalContext) {
      if (this.vocalRecorder?.state === 'recording') {
        this.vocalRecorder.stop();
      }
      this.vocalRecording = false;
    },

    isCurrentAnswered(this: QuizVocalContext): boolean {
      const idx = this.currentIndex();
      return idx !== undefined && this.storedFeedback[idx] !== undefined;
    },

    async submitVocalAnswer(this: QuizVocalContext, blob: Blob) {
      if (this.isReviewing()) return;
      const idx = this.currentIndex();
      if (idx === undefined || !this.currentProjectId) return;
      this.feedback = { loading: true, correct: false };
      try {
        const res = await postVocalAttempt(this.currentProjectId, this.gen.id, idx, blob);
        if (!res.ok) {
          this.feedback = buildErrorFeedback.call(this, 'quiz.verificationError');
          return;
        }
        const result = (await res.json()) as VocalFeedback;
        this.feedback = { ...result, correct: result.correct };
        this.storedFeedback[idx] = this.feedback;
        if (result.correct) this.score++;
      } catch (e) {
        const error = e instanceof Error ? e.message : String(e);
        this.feedback = buildErrorFeedback.call(this, 'toast.error', error);
      }
    },

    // Override nextQuestion to stop audio before advancing
    nextQuestion(this: QuizVocalContext) {
      this.stopQuestion();
      this.feedback = null;
      this.currentQ++;
      if (this.currentQ >= this.total()) {
        this.finished = true;
        this.onFinish?.();
      } else {
        if (this.currentQ > this.highWaterMark) {
          this.highWaterMark = this.currentQ;
        }
        this.onNextReady?.();
      }
    },

    prevQuestion(this: QuizVocalContext) {
      if (this.currentQ <= 0) return;
      this.stopQuestion();
      this.feedback = null;
      this.currentQ--;
      this.onPrevReady?.();
    },

    onNextReady(this: QuizVocalContext) {
      this.restoreOrPlay();
    },

    onPrevReady(this: QuizVocalContext) {
      this.restoreOrPlay();
    },

    restoreOrPlay(this: QuizVocalContext) {
      const idx = this.currentIndex();
      if (idx !== undefined && this.storedFeedback[idx]) {
        this.feedback = this.storedFeedback[idx];
        return;
      }
      this.feedback = null;
      this.$nextTick?.(() => this.playQuestion());
    },

    onFinish() {
      // Score displayed on finished screen, no backend persist
    },

    resetVocalQuiz(this: QuizVocalContext) {
      this.stopQuestion();
      this.resetAll();
      this.$nextTick?.(() => this.playQuestion());
    },
  };
}
