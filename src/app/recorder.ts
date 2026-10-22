import { addCostDelta } from './cost-utils';
import { captureAiKey, withAiHeaders } from './ai-fetch';
import { PROJECT_ID_SAFE } from './moderation-gate';
import type { AppContext } from './app-context';
import type { Source } from '../../types';

type VoiceSource = Source & { estimatedCost?: number };

/**
 * Destination d'un enregistrement vocal, capturée à son DÉBUT : cours (et son nom, pour le toast de
 * fin hors écran), clé Mistral et langue. Un changement de cours ou de profil arrête
 * l'enregistrement (resetSession) et l'envoie vers CE cours. Jusqu'en v1.7.11, la voix partait vers
 * le cours affiché à l'arrêt (après un changement de profil : le cours d'un autre enfant), ou était
 * jetée sans un mot quand aucun cours n'était ouvert.
 */
export type VoiceTarget = { projectId: string; projectName: string; key: string; lang: string };

const captureVoiceTarget = (state: AppContext, projectId: string): VoiceTarget => {
  return {
    projectId,
    projectName: state.currentProject?.meta.name ?? '',
    key: captureAiKey(),
    lang: state.locale,
  };
};

// Destination d'un envoi : celle de l'enregistrement, sinon (appel direct) le cours affiché.
const resolveVoiceTarget = (state: AppContext, target?: VoiceTarget): VoiceTarget | null => {
  if (target) return target;
  const projectId = state.currentProjectId;
  return projectId ? captureVoiceTarget(state, projectId) : null;
};

// Le cours de l'enregistrement est affiché : sa transcription s'applique à l'écran.
const voiceShown = (state: AppContext, target: VoiceTarget): boolean => {
  return state.currentProjectId === target.projectId;
};

const stopTracks = (stream: MediaStream): void => {
  stream.getTracks().forEach((t) => t.stop());
};

const beginRecording = (state: AppContext, stream: MediaStream, target: VoiceTarget): void => {
  const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
  const chunks: Blob[] = [];
  recorder.ondataavailable = (e: BlobEvent) => chunks.push(e.data);
  // Arrêt par l'enfant ou par un changement de cours / de profil (resetSession) : envoi vers le
  // cours où l'enregistrement a commencé.
  recorder.onstop = async () => {
    stopTracks(stream);
    await state.uploadVoice(new Blob(chunks, { type: 'audio/webm' }), target);
  };
  state.recorder = recorder;
  recorder.start();
  state.recording = true;
  state.recordingDuration = 0;
  state.recordingTimer = setInterval(() => {
    state.recordingDuration++;
  }, 1000);
};

const runStartRecording = async function (state: AppContext): Promise<void> {
  const projectId = state.currentProjectId;
  if (!projectId) return;
  const target = captureVoiceTarget(state, projectId);
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Cours ou profil changé pendant la demande d'accès au micro : rien n'est enregistré.
    if (state.currentProjectId !== projectId) {
      stopTracks(stream);
      return;
    }
    beginRecording(state, stream, target);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    state.showToast(state.t('toast.micError', { error: msg }), 'error');
  }
};

// Envoi vers le cours de l'enregistrement, avec sa clé (captureAiKey : '' = clé d'env) et sa langue.
const postVoice = (target: VoiceTarget, blob: Blob): Promise<Response> => {
  const formData = new FormData();
  formData.append('audio', blob, 'recording.webm');
  formData.append('lang', target.lang);
  const url = '/api/projects/' + target.projectId + '/sources/voice';
  // Barrière taint de Codacy rule-node-ssrf (cf. moderation-gate.ts) : id du cours validé avant l'URL.
  const allowedUrls = PROJECT_ID_SAFE.test(target.projectId) ? [url] : [];
  if (allowedUrls.includes(url)) {
    return fetch(
      url,
      withAiHeaders({ method: 'POST', body: formData }, { keyOverride: target.key }),
    );
  }
  return Promise.reject(new Error('invalid project id'));
};

// Échec : toast habituel sur le cours de l'enregistrement ; ailleurs, toast qui nomme ce cours.
const reportVoiceFailure = (
  state: AppContext,
  target: VoiceTarget,
  shownKey: string,
  error: string,
): void => {
  if (voiceShown(state, target)) {
    state.showToast(state.t(shownKey, { error }), 'error');
    return;
  }
  state.showToast(state.t('toast.voiceErrorIn', { project: target.projectName, error }), 'error');
};

// Voix transcrite : ajoutée et sélectionnée sur son cours affiché (sans doublon si le cours a été
// rouvert entre-temps, sa source déjà relue du serveur) ; ailleurs, toast qui nomme son cours, où
// la source est enregistrée. Jamais dans les sources, la sélection ni le coût d'un autre cours.
const applyVoiceSource = (state: AppContext, target: VoiceTarget, source: VoiceSource): void => {
  if (!voiceShown(state, target)) {
    state.showToast(state.t('toast.voiceAddedIn', { project: target.projectName }), 'success');
    return;
  }
  if (!state.sources.some((s: Source) => s.id === source.id)) {
    state.sources.push(source);
    state.selectedIds.push(source.id);
    addCostDelta(state, source.estimatedCost, 'sources/voice');
  }
  state.showToast(state.t('toast.voiceTranscribed'), 'success');
  void state.$nextTick(() => state.refreshIcons());
  setTimeout(() => {
    if (voiceShown(state, target)) void state.refreshModeration();
  }, 2000);
};

const handleVoiceResponse = async function (
  state: AppContext,
  target: VoiceTarget,
  res: Response,
): Promise<void> {
  const body: unknown = await res.json();
  if (res.ok) {
    applyVoiceSource(state, target, body as VoiceSource);
    return;
  }
  const code = (body as { error?: string } | null)?.error || res.statusText;
  reportVoiceFailure(state, target, 'toast.error', state.resolveError(code));
};

const runUploadVoice = async function (
  state: AppContext,
  blob: Blob,
  target?: VoiceTarget,
): Promise<void> {
  const dest = resolveVoiceTarget(state, target);
  if (!dest) return;
  if (voiceShown(state, dest)) state.loading.voice = true;
  try {
    const res = await postVoice(dest, blob);
    await handleVoiceResponse(state, dest, res);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    reportVoiceFailure(state, dest, 'toast.transcriptionError', msg);
  } finally {
    if (voiceShown(state, dest)) state.loading.voice = false;
  }
};

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
      await runStartRecording(this);
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

    async uploadVoice(this: AppContext, blob: Blob, target?: VoiceTarget) {
      await runUploadVoice(this, blob, target);
    },
  };
}
