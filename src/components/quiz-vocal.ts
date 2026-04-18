import { stepByStep } from './step-by-step';
import { parseChoiceLabel } from '@helpers/choice-labels';

export function quizVocalComponent(gen: any) {
  return {
    ...stepByStep(gen),
    audioPlaying: false,
    vocalRecording: false,
    vocalRecorder: null as MediaRecorder | null,
    storedFeedback: {} as Record<number, any>,

    questions() {
      return this.items();
    },

    // Bidi-safe split identique à quizComponent.choiceParts — évite la duplication
    // de la logique de parsing tout en gardant le helper pur.
    choiceParts(raw: string): { label: string; text: string } {
      const parsed = parseChoiceLabel(raw);
      return parsed ? { label: `${parsed.label})`, text: parsed.text } : { label: '', text: raw };
    },

    currentAudioUrl(this: any) {
      return this.gen.audioUrls?.[this.currentIndex()] || '';
    },

    questionAudio(this: any): HTMLAudioElement | null {
      return (this.$refs?.questionAudio as HTMLAudioElement | undefined) ?? null;
    },

    stopQuestion(this: any) {
      const audio = this.questionAudio();
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      this.audioPlaying = false;
    },

    playQuestion(this: any) {
      const audio = this.questionAudio();
      if (!audio || !this.currentAudioUrl()) return;
      audio.pause();
      audio.currentTime = 0;
      audio.load();
      this.audioPlaying = true;
      audio.play().catch((e) => {
        this.audioPlaying = false;
        console.warn('Question audio play failed:', e.message);
      });
    },

    async startVocalRecording(this: any) {
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
      } catch (e: any) {
        this.showToast(this.t('toast.micError', { error: e.message }), 'error');
      }
    },

    stopVocalRecording() {
      if (this.vocalRecorder?.state === 'recording') {
        this.vocalRecorder.stop();
      }
      this.vocalRecording = false;
    },

    isCurrentAnswered(this: any): boolean {
      return this.storedFeedback[this.currentIndex()] !== undefined;
    },

    async submitVocalAnswer(this: any, blob: Blob) {
      if (this.isReviewing()) return;
      const pid = this.currentProjectId;
      this.feedback = { loading: true, correct: false };
      try {
        const formData = new FormData();
        formData.append('audio', blob, 'answer.webm');
        formData.append('questionIndex', String(this.currentIndex()));
        formData.append('lang', document.documentElement.lang || 'fr');
        const res = await fetch(
          '/api/projects/' + pid + '/generations/' + this.gen.id + '/vocal-answer',
          { method: 'POST', body: formData },
        );
        if (res.ok) {
          const result = await res.json();
          this.feedback = { correct: result.correct, ...result };
          this.storedFeedback[this.currentIndex()] = this.feedback;
          if (result.correct) this.score++;
        } else {
          this.feedback = {
            correct: false,
            feedback: this.t('quiz.verificationError'),
            transcription: '',
          };
        }
      } catch (e: any) {
        this.feedback = {
          correct: false,
          feedback: this.t('toast.error', { error: e.message }),
          transcription: '',
        };
      }
    },

    // Override nextQuestion to stop audio before advancing
    nextQuestion(this: any) {
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

    prevQuestion(this: any) {
      if (this.currentQ <= 0) return;
      this.stopQuestion();
      this.feedback = null;
      this.currentQ--;
      this.onPrevReady?.();
    },

    onNextReady(this: any) {
      this.restoreOrPlay();
    },

    onPrevReady(this: any) {
      this.restoreOrPlay();
    },

    restoreOrPlay(this: any) {
      const idx = this.currentIndex();
      if (this.storedFeedback[idx]) {
        this.feedback = this.storedFeedback[idx];
        return;
      }
      this.feedback = null;
      this.$nextTick(() => this.playQuestion());
    },

    onFinish() {
      // Score displayed on finished screen, no backend persist
    },

    resetVocalQuiz(this: any) {
      this.stopQuestion();
      this.resetAll();
      this.$nextTick(() => this.playQuestion());
    },
  };
}
