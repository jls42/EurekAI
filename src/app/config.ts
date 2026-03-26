export function createConfig() {
  return {
    async loadConfig(this: any) {
      try {
        const [configRes, statusRes] = await Promise.all([
          fetch('/api/config'),
          fetch('/api/config/status'),
        ]);
        if (configRes.ok) {
          const config = await configRes.json();
          this.configDraft = JSON.parse(JSON.stringify(config));
          // Derive single model selector from per-task models
          this.configDraft._mainModel = config.models?.summary || 'mistral-large-latest';
        }
        if (statusRes.ok) this.apiStatus = await statusRes.json();
        // Load Mistral voices filtered by current profile locale
        await this.loadMistralVoices();
      } catch {}
    },

    async loadMistralVoices(this: any) {
      try {
        const lang = this.currentProfile?.locale || 'fr';
        const voicesRes = await fetch(`/api/config/voices?lang=${lang}`);
        if (voicesRes.ok) this.mistralVoicesList = await voicesRes.json();
      } catch {}
    },

    async saveSettings(this: any) {
      try {
        // Propagate single model selector to all non-OCR tasks
        const mainModel = this.configDraft._mainModel || 'mistral-large-latest';
        this.configDraft.models = {
          summary: mainModel,
          flashcards: mainModel,
          quiz: mainModel,
          podcast: mainModel,
          translate: mainModel,
          quizVerify: mainModel,
          chat: mainModel,
          ocr: 'mistral-ocr-latest',
        };
        // Set default TTS model when switching providers
        if (
          this.configDraft.ttsProvider === 'mistral' &&
          this.configDraft.ttsModel.startsWith('eleven')
        ) {
          this.configDraft.ttsModel = 'voxtral-mini-tts-2603';
        } else if (
          this.configDraft.ttsProvider === 'elevenlabs' &&
          this.configDraft.ttsModel.startsWith('voxtral')
        ) {
          this.configDraft.ttsModel = 'eleven_v3';
        }
        const res = await fetch('/api/config', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.configDraft),
        });
        if (res.ok) {
          const saved = await res.json();
          this.configDraft = JSON.parse(JSON.stringify(saved));
          this.configDraft._mainModel = saved.models?.summary || 'mistral-large-latest';
          // Reload API status (ttsAvailable may have changed)
          const statusRes = await fetch('/api/config/status');
          if (statusRes.ok) this.apiStatus = await statusRes.json();
          this.$refs.settingsDialog?.close();
          this.showToast(this.t('toast.settingsSaved'), 'success');
        }
      } catch {
        this.showToast(this.t('toast.settingsError'), 'error', () => this.saveSettings());
      }
    },

    closeSettingsDialog(this: any) {
      this.$refs.settingsDialog?.close();
    },
  };
}
