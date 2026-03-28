export function createConfig() {
  return {
    async loadConfig(this: any) {
      try {
        const [configRes, statusRes] = await Promise.all([
          fetch('/api/config'),
          fetch('/api/config/status'),
        ]);
        if (statusRes.ok) this.apiStatus = await statusRes.json();
        // Load voices BEFORE setting configDraft so the voice list is populated
        // when Alpine renders the x-show="ttsProvider === 'mistral'" selects
        await this.loadMistralVoices();
        if (configRes.ok) {
          const config = await configRes.json();
          this.configDraft = structuredClone(config);
          this.configDraft._mainModel = config.models?.summary || 'mistral-large-latest';
        }
      } catch (e) {
        console.error('Failed to load config:', e);
      }
    },

    async loadMistralVoices(this: any) {
      try {
        const voicesRes = await fetch('/api/config/voices');
        if (!voicesRes.ok) return;
        const raw = await voicesRes.json();
        this.mistralVoicesList = raw.map((v: any) => {
          const parts = (v.name || '').split(' - ');
          const langFull = v.languages?.[0] || '';
          return {
            id: v.id,
            name: v.name,
            speaker: parts[0] || v.name,
            emotion: parts[1] || '',
            lang: langFull.split('_')[0] || '',
            langFull,
          };
        });
      } catch (e) {
        console.error('Failed to load Mistral voices:', e);
      }
    },

    translateEmotion(this: any, emotion: string): string {
      return this.t('emotion.' + emotion) || emotion;
    },

    langToFlag(this: any, lang: string): string {
      if (!lang || lang.length < 2) return '';
      const voice = this.mistralVoicesList.find((v: any) => v.lang === lang);
      const country = (voice?.langFull?.split('_')[1] || lang).toUpperCase();
      if (!/^[A-Z]{2}$/.test(country)) return '';
      return String.fromCodePoint(...[...country].map((c) => 0x1f1e6 + c.codePointAt(0) - 65));
    },

    async saveSettings(this: any) {
      try {
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
        if (
          this.configDraft.ttsProvider === 'mistral' &&
          this.configDraft.ttsModel.startsWith('eleven')
        ) {
          this.configDraft.ttsModel = 'voxtral-mini-tts-latest';
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
          this.configDraft = structuredClone(saved);
          this.configDraft._mainModel = saved.models?.summary || 'mistral-large-latest';
          const statusRes = await fetch('/api/config/status');
          if (statusRes.ok) this.apiStatus = await statusRes.json();
          this.$refs.settingsDialog?.close();
          this.showToast(this.t('toast.settingsSaved'), 'success');
        } else {
          this.showToast(this.t('toast.settingsError'), 'error');
        }
      } catch {
        this.showToast(this.t('toast.settingsError'), 'error', () => this.saveSettings());
      }
    },

    async resetSettings(this: any) {
      try {
        const res = await fetch('/api/config/reset', { method: 'POST' });
        if (res.ok) {
          const saved = await res.json();
          this.configDraft = structuredClone(saved);
          this.configDraft._mainModel = saved.models?.summary || 'mistral-large-latest';
          this.showToast(this.t('toast.settingsReset'), 'success');
        } else {
          this.showToast(this.t('toast.settingsError'), 'error');
        }
      } catch {
        this.showToast(this.t('toast.settingsError'), 'error');
      }
    },

    closeSettingsDialog(this: any) {
      this.$refs.settingsDialog?.close();
    },
  };
}
