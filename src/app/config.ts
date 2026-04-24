import { selectVoices } from '@helpers/voice-selection';
import type { MistralVoice } from '@helpers/voice-types';
import type { AppContext } from './app-context';
import type { AppConfig } from '../../types';

type ConfigDraft = AppConfig & { _mainModel?: string };
type VoiceRole = 'host' | 'guest';

interface VoicesEnrichedEntry {
  id: string;
  name: string;
  languages: string[];
  gender?: string;
  tags?: string[];
  speaker: string;
  emotion: string;
  lang: string;
  langFull: string;
}

/**
 * @invariant ttsAvailable === mistral — Mistral Voxtral est l'unique provider TTS.
 * Verrouillage runtime : `config.test.ts` "invariant: ttsAvailable === mistral".
 * Si un futur provider TTS non-Mistral est réintroduit, remplacer par `ttsAvailable = mistral || <autre>`.
 *
 * voiceCacheReady : true uniquement après warmup réussi de listVoices au boot serveur.
 * Si false, la sélection dynamique par langue retombe sur DEFAULT_CONFIG (voix FR) — UI
 * peut griser les sélecteurs de voix ou afficher un badge "voice catalog loading".
 */
type ApiStatus = { mistral: boolean; ttsAvailable: boolean; voiceCacheReady: boolean };

type ModerationCategoriesPayload = {
  all?: string[];
  defaults?: Record<string, string[]>;
};

const DEFAULT_MAIN_MODEL = 'mistral-large-latest';
const TOAST_SETTINGS_ERROR = 'toast.settingsError';

export function createConfig() {
  return {
    async loadConfig(this: AppContext) {
      try {
        const [configRes, statusRes, modCatsRes] = await Promise.all([
          fetch('/api/config'),
          fetch('/api/config/status'),
          fetch('/api/moderation-categories'),
        ]);
        if (statusRes.ok) this.apiStatus = (await statusRes.json()) as ApiStatus;
        if (modCatsRes.ok) {
          const modData = (await modCatsRes.json()) as ModerationCategoriesPayload;
          this.allModerationCategories = modData.all || [];
          this.moderationDefaults = modData.defaults || {};
        }
        // Load voices BEFORE setting configDraft so the voice list is populated
        // quand Alpine rend les selects de voix Mistral.
        await this.loadMistralVoices?.();
        if (configRes.ok) {
          const config = (await configRes.json()) as AppConfig;
          const draft = structuredClone(config) as ConfigDraft;
          draft._mainModel = config.models?.summary || DEFAULT_MAIN_MODEL;
          this.configDraft = draft as unknown as typeof this.configDraft;
        }
      } catch (e) {
        console.error('Failed to load config:', e);
      }
    },

    async loadMistralVoices(this: AppContext) {
      try {
        const voicesRes = await fetch('/api/config/voices');
        if (!voicesRes.ok) return;
        const raw = (await voicesRes.json()) as MistralVoice[];
        const enriched: VoicesEnrichedEntry[] = raw.map((v) => {
          const parts = (v.name || '').split(' - ');
          const langFull = v.languages?.[0] || '';
          return {
            id: v.id,
            name: v.name,
            languages: v.languages ?? [],
            gender: v.gender,
            tags: v.tags,
            speaker: parts[0] || v.name,
            emotion: parts[1] || '',
            lang: langFull.split('_')[0] || '',
            langFull,
          };
        });
        this.mistralVoicesList = enriched as unknown as typeof this.mistralVoicesList;
      } catch (e) {
        console.error('Failed to load Mistral voices:', e);
      }
    },

    translateEmotion(this: AppContext, emotion: string): string {
      if (!emotion) return '';
      return this.t('emotion.' + emotion) || emotion;
    },

    langToFlag(this: AppContext, lang: string): string {
      if (!lang || lang.length < 2) return '';
      const list = this.mistralVoicesList as unknown as VoicesEnrichedEntry[];
      const voice = list.find((v) => v.lang === lang);
      const country = (voice?.langFull?.split('_')[1] || lang).toUpperCase();
      if (!/^[A-Z]{2}$/.test(country)) return '';
      return String.fromCodePoint(
        ...[...country].map((c) => 0x1f1e6 + (c.codePointAt(0) ?? 0) - 65),
      );
    },

    voiceLabel(this: AppContext, voice: Partial<VoicesEnrichedEntry>): string {
      const speaker = voice.speaker || voice.name || voice.id || '';
      const emotion = this.translateEmotion(voice.emotion || '');
      const flag = this.langToFlag(voice.lang || '');
      const name = emotion ? `${speaker} - ${emotion}` : speaker;
      return [flag, name].filter(Boolean).join(' ');
    },

    defaultVoiceOptionLabel(
      this: AppContext,
      role: VoiceRole,
      locale: string,
      profileId?: string,
    ): string {
      const list = this.mistralVoicesList as unknown as VoicesEnrichedEntry[];
      if (!list || list.length === 0) return '';
      const lang = (locale || 'fr').slice(0, 2);
      const voices = list as unknown as MistralVoice[];
      const result = selectVoices({ voices, lang, profileId });
      if (!result) return '';
      const match = list.find((v) => v.id === result[role]);
      if (!match) return '';
      return `${this.voiceLabel(match)} ${this.t('profile.voiceDefaultSuffix')}`;
    },

    async saveSettings(this: AppContext) {
      try {
        const draft = this.configDraft as unknown as ConfigDraft;
        const mainModel = draft._mainModel || DEFAULT_MAIN_MODEL;
        draft.models = {
          summary: mainModel,
          flashcards: mainModel,
          quiz: mainModel,
          podcast: mainModel,
          translate: mainModel,
          quizVerify: mainModel,
          chat: mainModel,
          ocr: 'mistral-ocr-latest',
        };
        if (draft.ttsModel?.startsWith('eleven_')) {
          draft.ttsModel = 'voxtral-mini-tts-latest';
        }
        const payload = { ...draft } as ConfigDraft & Record<string, unknown>;
        delete payload._mainModel;
        delete payload.mistralVoices;
        delete payload.mistralVoicesSource;
        const res = await fetch('/api/config', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const saved = (await res.json()) as AppConfig;
          const updated = structuredClone(saved) as ConfigDraft;
          updated._mainModel = saved.models?.summary || DEFAULT_MAIN_MODEL;
          this.configDraft = updated as unknown as typeof this.configDraft;
          const statusRes = await fetch('/api/config/status');
          if (statusRes.ok) this.apiStatus = (await statusRes.json()) as ApiStatus;
          await this.loadMistralVoices?.();
          (this.$refs.settingsDialog as HTMLDialogElement | undefined)?.close();
          this.showToast(this.t('toast.settingsSaved'), 'success');
        } else {
          this.showToast(this.t(TOAST_SETTINGS_ERROR), 'error');
        }
      } catch (e) {
        console.error('Failed to save settings:', e);
        this.showToast(this.t(TOAST_SETTINGS_ERROR), 'error', () => this.saveSettings());
      }
    },

    async resetSettings(this: AppContext) {
      try {
        const res = await fetch('/api/config/reset', { method: 'POST' });
        if (res.ok) {
          const saved = (await res.json()) as AppConfig;
          const reset = structuredClone(saved) as ConfigDraft;
          reset._mainModel = saved.models?.summary || DEFAULT_MAIN_MODEL;
          this.configDraft = reset as unknown as typeof this.configDraft;
          await this.loadMistralVoices?.();
          this.showToast(this.t('toast.settingsReset'), 'success');
        } else {
          this.showToast(this.t(TOAST_SETTINGS_ERROR), 'error');
        }
      } catch (e) {
        console.error('Failed to reset settings:', e);
        this.showToast(this.t(TOAST_SETTINGS_ERROR), 'error');
      }
    },

    closeSettingsDialog(this: AppContext) {
      (this.$refs.settingsDialog as HTMLDialogElement | undefined)?.close();
    },
  };
}
