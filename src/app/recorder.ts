import { addCostDelta } from './cost-utils';
import type { AppContext } from './app-context';
import type { Source } from '../../types';

export function createRecorder() {
  return {
    async toggleRecording(this: AppContext) {
      if (this.recording) {
        this.stopRecording();
      } else {
        await this.startRecording();
      }
    },

    async startRecording(this: AppContext) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        const chunks: Blob[] = [];
        this.recorder.ondataavailable = (e: BlobEvent) => chunks.push(e.data);
        this.recorder.onstop = async () => {
          stream.getTracks().forEach((t) => t.stop());
          const blob = new Blob(chunks, { type: 'audio/webm' });
          await this.uploadVoice(blob);
        };
        this.recorder.start();
        this.recording = true;
        this.recordingDuration = 0;
        this.recordingTimer = setInterval(() => {
          this.recordingDuration++;
        }, 1000);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        this.showToast(this.t('toast.micError', { error: msg }), 'error');
      }
    },

    stopRecording(this: AppContext) {
      if (this.recorder?.state === 'recording') {
        this.recorder.stop();
      }
      this.recording = false;
      if (this.recordingTimer) {
        clearInterval(this.recordingTimer);
        this.recordingTimer = null;
      }
    },

    async uploadVoice(this: AppContext, blob: Blob) {
      if (!this.currentProjectId) return;
      this.loading.voice = true;
      try {
        const formData = new FormData();
        formData.append('audio', blob, 'recording.webm');
        formData.append('lang', this.locale);
        const res = await fetch(this.apiBase() + '/sources/voice', {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) {
          const err = (await res.json()) as { error?: string };
          this.showToast(
            this.t('toast.error', { error: this.resolveError(err.error || res.statusText) }),
            'error',
          );
          return;
        }
        const source = (await res.json()) as Source & { estimatedCost?: number };
        this.sources.push(source);
        this.selectedIds.push(source.id);
        addCostDelta(this, source.estimatedCost, 'sources/voice');
        this.showToast(this.t('toast.voiceTranscribed'), 'success');
        this.$nextTick(() => this.refreshIcons());
        setTimeout(() => this.refreshModeration(), 2000);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        this.showToast(this.t('toast.transcriptionError', { error: msg }), 'error');
      } finally {
        this.loading.voice = false;
      }
    },
  };
}
