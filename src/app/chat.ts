import { getLocale } from '../i18n/index';
import { normalizeSummaryData } from './helpers';

function handleChatSuccess(state: any, data: any): void {
  state.chatMessages.push({
    role: 'assistant',
    content: data.reply,
    timestamp: new Date().toISOString(),
    generatedIds: data.generatedIds,
  });
  if (data.generations && data.generations.length > 0) {
    for (const gen of data.generations) {
      normalizeSummaryData(gen);
      state.initGenProps(gen);
      state.generations.push(gen);
      state.openGens[gen.id] = true;
    }
    state.showToast(state.t('toast.chatGenDone'), 'success');
  }
}

function handleChatError(state: any, err: any): void {
  if (err.error === 'chat.moderationBlocked' || err.error === 'chat.ageRestricted') {
    // Remove the optimistic user message
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
    async loadChatHistory(this: any) {
      if (!this.currentProjectId) return;
      try {
        const res = await fetch(this.apiBase() + '/chat');
        if (res.ok) {
          const data = await res.json();
          this.chatMessages = data.messages || [];
        }
      } catch {}
    },

    async sendChatMessage(this: any) {
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
          handleChatSuccess(this, await res.json());
        } else {
          handleChatError(this, await res.json());
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

    async clearChat(this: any) {
      if (!this.currentProjectId) return;
      try {
        await fetch(this.apiBase() + '/chat', { method: 'DELETE' });
        this.chatMessages = [];
        this.showToast(this.t('toast.chatCleared'), 'info');
      } catch {}
    },

    scrollChatBottom() {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    },
  };
}
