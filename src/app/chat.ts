import { getLocale } from '../i18n/index';
import { addCostDelta } from './cost-utils';
import { withAiHeaders } from './ai-fetch';
import { registerGeneration } from './generate';
import type { AppContext } from './app-context';
import type { Generation } from '../../types';

interface ChatSuccessPayload {
  reply: string;
  generatedIds?: string[];
  costDelta?: number;
  generations?: Generation[];
}

interface ChatErrorPayload {
  error?: string;
}

function handleChatSuccess(state: AppContext, data: ChatSuccessPayload): void {
  state.chatMessages.push({
    role: 'assistant',
    content: data.reply,
    timestamp: new Date().toISOString(),
    generatedIds: data.generatedIds,
  });
  addCostDelta(state, data.costDelta, 'chat');
  if (data.generations && data.generations.length > 0) {
    for (const gen of data.generations) {
      registerGeneration(state, gen);
    }
    state.showToast(state.t('toast.chatGenDone'), 'success');
  }
}

// Refus AVANT tout traitement du message (rien n'est persisté côté serveur) : la bulle de l'enfant
// est retirée et le toast traduit la clé, sans bulle d'erreur de l'assistant.
const REFUSED_BEFORE_SEND = new Set([
  'chat.moderationBlocked',
  'chat.ageRestricted',
  'moderation.error',
]);

function handleChatError(state: AppContext, err: ChatErrorPayload): void {
  const code = err.error || '';
  if (REFUSED_BEFORE_SEND.has(code)) {
    state.chatMessages.pop();
    state.showToast(state.t(code), 'error');
  } else {
    state.chatMessages.push({
      role: 'assistant',
      content: state.t('chat.errorReply'),
      timestamp: new Date().toISOString(),
    });
    state.showToast(state.t('toast.chatErrorMsg', { error: state.resolveError(code) }), 'error');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Méthodes extraites de createChat — `const = function` pour éviter
// l'agglomération Lizard CCN (cf. CLAUDE.md piège connu).
// ─────────────────────────────────────────────────────────────────────────────

const loadChatHistory = async function (this: AppContext) {
  if (!this.currentProjectId) return;
  try {
    const res = await fetch(this.apiBase() + '/chat');
    if (res.ok) {
      const body: unknown = await res.json();
      const data = body as { messages?: AppContext['chatMessages'] };
      this.chatMessages = data.messages || [];
    }
  } catch {
    /* silent: offline fallback, chat vide OK */
  }
};

// Sous-helper extrait : la branche succès/erreur du POST chat (cf.
// handleChatSuccess / handleChatError) pour réduire le CCN de sendChatMessage. Corps typé par une
// variable : `(await res.json()) as …` coupait la mesure Lizard (sendChatMessage disparaissait).
const dispatchChatResponse = async function (state: AppContext, res: Response): Promise<void> {
  const body: unknown = await res.json();
  if (res.ok) {
    handleChatSuccess(state, body as ChatSuccessPayload);
    return;
  }
  handleChatError(state, body as ChatErrorPayload);
};

const sendChatMessage = async function (this: AppContext) {
  if (!this.currentProfile?.chatEnabled) return;
  const msg = this.chatInput.trim();
  if (!msg || this.chatLoading || !this.currentProjectId) return;
  this.chatInput = '';
  this.chatMessages.push({ role: 'user', content: msg, timestamp: new Date().toISOString() });
  this.chatLoading = true;
  this.$nextTick(() => this.scrollChatBottom());

  try {
    const res = await fetch(
      this.apiBase() + '/chat',
      withAiHeaders({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // useConsigne : bascule du projet (consigne écartée par l'enfant), respectée par les
        // générations que le chat lance par outil, comme par les boutons de génération.
        body: JSON.stringify({
          message: msg,
          lang: getLocale(),
          ageGroup: this.currentProfile.ageGroup,
          useConsigne: this.useConsigne,
        }),
      }),
    );
    await dispatchChatResponse(this, res);
  } catch {
    this.chatMessages.push({
      role: 'assistant',
      content: this.t('chat.connectionError'),
      timestamp: new Date().toISOString(),
    });
    this.showToast(this.t('toast.chatError'), 'error');
  } finally {
    this.chatLoading = false;
    this.$nextTick(() => {
      this.scrollChatBottom();
      this.refreshIcons();
    });
  }
};

const clearChat = async function (this: AppContext) {
  if (!this.currentProjectId) return;
  try {
    await fetch(this.apiBase() + '/chat', { method: 'DELETE' });
    this.chatMessages = [];
    this.showToast(this.t('toast.chatCleared'), 'info');
  } catch {
    /* silent: clear chat offline est acceptable */
  }
};

const scrollChatBottom = function () {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
};

export function createChat() {
  return {
    loadChatHistory,
    sendChatMessage,
    clearChat,
    scrollChatBottom,
  };
}
