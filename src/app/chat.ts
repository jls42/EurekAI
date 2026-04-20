import { getLocale } from '../i18n/index';
import { addCostDelta } from './cost-utils';
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

function handleChatError(state: AppContext, err: ChatErrorPayload): void {
  if (err.error === 'chat.moderationBlocked' || err.error === 'chat.ageRestricted') {
    state.chatMessages.pop();
    state.showToast(state.t(err.error), 'error');
  } else {
    state.chatMessages.push({
      role: 'assistant',
      content: state.t('chat.errorReply'),
      timestamp: new Date().toISOString(),
    });
    state.showToast(state.t('toast.chatErrorMsg', { error: err.error || '' }), 'error');
  }
}

export function createChat() {
  return {
    async loadChatHistory(this: AppContext) {
      if (!this.currentProjectId) return;
      try {
        const res = await fetch(this.apiBase() + '/chat');
        if (res.ok) {
          const data = (await res.json()) as { messages?: AppContext['chatMessages'] };
          this.chatMessages = data.messages || [];
        }
      } catch {
        /* silent: offline fallback, chat vide OK */
      }
    },

    async sendChatMessage(this: AppContext) {
      if (!this.currentProfile?.chatEnabled) return;
      const msg = this.chatInput.trim();
      if (!msg || this.chatLoading || !this.currentProjectId) return;
      this.chatInput = '';
      this.chatMessages.push({ role: 'user', content: msg, timestamp: new Date().toISOString() });
      this.chatLoading = true;
      this.$nextTick(() => this.scrollChatBottom());

      try {
        const res = await fetch(this.apiBase() + '/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: msg,
            lang: getLocale(),
            ageGroup: this.currentProfile?.ageGroup || 'enfant',
          }),
        });
        if (res.ok) {
          handleChatSuccess(this, (await res.json()) as ChatSuccessPayload);
        } else {
          handleChatError(this, (await res.json()) as ChatErrorPayload);
        }
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
    },

    async clearChat(this: AppContext) {
      if (!this.currentProjectId) return;
      try {
        await fetch(this.apiBase() + '/chat', { method: 'DELETE' });
        this.chatMessages = [];
        this.showToast(this.t('toast.chatCleared'), 'info');
      } catch {
        /* silent: clear chat offline est acceptable */
      }
    },

    scrollChatBottom() {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    },
  };
}
