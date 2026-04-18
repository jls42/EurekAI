import { selectVoices } from '@helpers/voice-selection';
import type { MistralVoice } from '@helpers/voice-types';

export function createConfig() {
  return {
    async loadConfig(this: any) {
      try {
        const [configRes, statusRes, modCatsRes] = await Promise.all([
          fetch('/api/config'),
          fetch('/api/config/status'),
          fetch('/api/moderation-categories'),
        ]);
        if (statusRes.ok) this.apiStatus = await statusRes.json();
        if (modCatsRes.ok) {
          const modData = await modCatsRes.json();
          this.allModerationCategories = modData.all || [];
          this.moderationDefaults = modData.defaults || {};
        }
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
            // Champs MistralVoice bruts pour selectVoices (cf. helpers/voice-types.ts)
            id: v.id,
            name: v.name,
            languages: v.languages ?? [],
            gender: v.gender,
            tags: v.tags,
            // Enrichissement UI (speaker/emotion parsés depuis name)
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

    // Hint affiché dans l'éditeur de profil (cf. profile-picker.html:383).
    // Reflète la sélection par défaut pour les champs profil laissés sur "Par défaut".
    // Converge avec resolveVoices() backend à config et liste de voix égales.
    //
    // Priorités alignées sur le backend :
    // 1. Si l'utilisateur a configuré explicitement des voix globales
    //    (mistralVoicesSource === 'user'), afficher ces voix — le backend les utilisera.
    // 2. Sinon, selectVoices() sur le catalogue (rotation par profileId).
    defaultVoiceHint(this: any, locale: string, profileId?: string): string {
      if (!this.mistralVoicesList || this.mistralVoicesList.length === 0) return '';
      const formatName = (id: string): string => {
        const match = this.mistralVoicesList.find((v: any) => v.id === id);
        if (!match) return '';
        const emotion = match.emotion ? this.translateEmotion(match.emotion) : '';
        return emotion ? `${match.speaker} - ${emotion}` : match.speaker;
      };

      // Priorité 1 : override global explicite ("mistralVoicesSource === 'user'").
      const cfg = this.configDraft;
      if (
        cfg?.mistralVoicesSource === 'user' &&
        cfg.mistralVoices?.host &&
        cfg.mistralVoices?.guest
      ) {
        const globalHost = formatName(cfg.mistralVoices.host);
        const globalGuest = formatName(cfg.mistralVoices.guest);
        if (globalHost && globalGuest) return `${globalHost} / ${globalGuest}`;
        // Si l'ID global n'est pas retrouvable dans la liste (voix supprimée côté Mistral),
        // on retombe sur selectVoices plutôt que d'afficher vide.
      }

      // Priorité 2 : sélection dynamique.
      const lang = (locale || 'fr').slice(0, 2);
      const voices = this.mistralVoicesList as MistralVoice[];
      const result = selectVoices({ voices, lang, profileId });
      if (!result) return '';
      const hostName = formatName(result.host);
      const guestName = formatName(result.guest);
      if (!hostName || !guestName) return '';
      return `${hostName} / ${guestName}`;
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
          // Refresh voice cache : Mistral peut avoir publié de nouvelles voix depuis l'init.
          await this.loadMistralVoices();
          this.$refs.settingsDialog?.close();
          this.showToast(this.t('toast.settingsSaved'), 'success');
        } else {
          this.showToast(this.t('toast.settingsError'), 'error');
        }
      } catch (e: any) {
        console.error('Failed to save settings:', e);
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
          // Refresh voice cache : même raison que saveSettings.
          await this.loadMistralVoices();
          this.showToast(this.t('toast.settingsReset'), 'success');
        } else {
          this.showToast(this.t('toast.settingsError'), 'error');
        }
      } catch (e: any) {
        console.error('Failed to reset settings:', e);
        this.showToast(this.t('toast.settingsError'), 'error');
      }
    },

    closeSettingsDialog(this: any) {
      this.$refs.settingsDialog?.close();
    },
  };
}
