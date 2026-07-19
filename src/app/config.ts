import { selectVoices } from '@helpers/voice-selection';
import type { MistralVoice } from '@helpers/voice-types';
import { normalizeOcrModel, OCR_MODEL_LABELS } from '@helpers/ocr-models';
import { modelPriceLabel as priceLabel } from './model-pricing';
import type { AppContext } from './app-context';
import type { AppConfig } from '../../types';
import { setKey, clearKey, loadActiveKey, isStorageEncryptable, purgeKeyring } from './api-key';
import { withAiHeaders } from './ai-fetch';

interface ConfigDraft extends AppConfig {
  _mainModel?: string;
  _ocrModel?: string;
}

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
interface ApiStatus {
  mistral: boolean;
  ttsAvailable: boolean;
  voiceCacheReady: boolean;
  requireUserKey: boolean;
}

type ValidateStatus = 'ok' | 'invalid' | 'quota' | 'network' | 'missing';

interface ModerationCategoriesPayload {
  all?: string[];
  defaults?: Record<string, string[]>;
}

const DEFAULT_MAIN_MODEL = 'mistral-large-latest';
const TOAST_SETTINGS_ERROR = 'toast.settingsError';
const PROFILE_VOICE_DEFAULT_I18N = 'profile.voiceDefault';

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
          draft._ocrModel = normalizeOcrModel(config.models?.ocr);
          this.configDraft = draft;
        }
      } catch (e) {
        console.error('Failed to load config:', e);
      }
    },

    async loadMistralVoices(this: AppContext) {
      try {
        const voicesRes = await fetch('/api/config/voices', withAiHeaders());
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
        this.mistralVoicesList = enriched;
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
      if (list.length === 0) return this.t(PROFILE_VOICE_DEFAULT_I18N);
      const lang = (locale || 'fr').slice(0, 2);
      const voices = list as unknown as MistralVoice[];
      const result = selectVoices({ voices, lang, profileId });
      if (!result) return this.t(PROFILE_VOICE_DEFAULT_I18N);
      const match = list.find((v) => v.id === result[role]);
      if (!match) return this.t(PROFILE_VOICE_DEFAULT_I18N);
      return `${this.voiceLabel(match)} ${this.t('profile.voiceDefaultSuffix')}`;
    },

    // Libellé tarifaire d'un modèle, dérivé de MODEL_PRICING (cf. model-pricing.ts).
    modelPriceLabel(this: AppContext, modelId: string): string {
      return priceLabel(modelId, (k: string) => this.t(k));
    },

    // Libellé d'option de dropdown : "<nom> — <tarif>". Pour OCR, <nom> = nom produit lisible
    // (OCR 3 / OCR 4) via OCR_MODEL_LABELS ; sinon l'ID technique. L'ID réel reste affiché en
    // italique sous le sélecteur OCR (cf. dialog-settings.html, x-text configDraft._ocrModel).
    modelOptionLabel(this: AppContext, modelId: string): string {
      const display = (OCR_MODEL_LABELS as Record<string, string>)[modelId] ?? modelId;
      return `${display} — ${this.modelPriceLabel(modelId)}`;
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
          ocr: normalizeOcrModel(draft._ocrModel),
        };
        if (draft.ttsModel?.startsWith('eleven_')) {
          draft.ttsModel = 'voxtral-mini-tts-latest';
        }
        const payload = { ...draft } as ConfigDraft & Record<string, unknown>;
        delete payload._mainModel;
        delete payload._ocrModel;
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
          updated._ocrModel = normalizeOcrModel(saved.models?.ocr);
          this.configDraft = updated;
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

    /* Ouverture des Réglages gatée par le PIN du profil courant (mineur protégé) :
       modèles IA, clé API et Reset ne doivent pas être à un tap de l'enfant. */
    openSettings(this: AppContext) {
      const open = () => {
        (this.$refs.settingsDialog as HTMLDialogElement | undefined)?.showModal();
        this.refreshIcons();
      };
      const pid = this.currentProfile?.id;
      if (pid) this.requireProfilePin(pid, open);
      else open();
    },

    async resetSettings(this: AppContext) {
      try {
        const res = await fetch('/api/config/reset', { method: 'POST' });
        if (res.ok) {
          const saved = (await res.json()) as AppConfig;
          const reset = structuredClone(saved) as ConfigDraft;
          reset._mainModel = saved.models?.summary || DEFAULT_MAIN_MODEL;
          reset._ocrModel = normalizeOcrModel(saved.models?.ocr);
          this.configDraft = reset;
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

    // --- Clé Mistral navigateur (cf. src/app/api-key.ts) ---

    // Disponibilité EFFECTIVE = clé d'env utilisable (apiStatus.mistral est déjà false
    // quand EUREKAI_REQUIRE_USER_KEY) OU clé navigateur chargée pour le profil actif.
    mistralReady(this: AppContext): boolean {
      return this.apiStatus.mistral || this.hasMistralKey;
    },
    ttsReady(this: AppContext): boolean {
      return this.mistralReady();
    },

    // Charge la clé active (profil > global) en mémoire et synchronise les flags réactifs.
    // 'broken' (master key IndexedDB perdue) → purge du trousseau + gate réouvert.
    async refreshKeyState(this: AppContext, profileId?: string): Promise<void> {
      const pid = profileId ?? this.currentProfile?.id;
      const status = await loadActiveKey(pid);
      if (status === 'broken') {
        purgeKeyring();
        this.hasMistralKey = false;
      } else {
        this.hasMistralKey = status === 'ok';
      }
      this.keyStorageDegraded = !(await isStorageEncryptable());
    },

    openApiKeyDialog(this: AppContext, scope: 'global' | 'profile' = 'global') {
      this.apiKeyScope = this.currentProfile ? scope : 'global';
      this.apiKeyInput = '';
      this.apiKeyConsentClear = false;
      this.keyTestStatus = '';
      this.showApiKeyDialog = true;
      this.$nextTick(() => {
        (this.$refs.apiKeyDialog as HTMLDialogElement | undefined)?.showModal();
        this.refreshIcons();
      });
    },
    closeApiKeyDialog(this: AppContext) {
      this.showApiKeyDialog = false;
      (this.$refs.apiKeyDialog as HTMLDialogElement | undefined)?.close();
    },

    async saveApiKey(this: AppContext) {
      const key = this.apiKeyInput.trim();
      if (!key) return;
      // Hors secure context : stockage en clair → consentement explicite obligatoire.
      if (!(await isStorageEncryptable()) && !this.apiKeyConsentClear) {
        this.keyStorageDegraded = true;
        return;
      }
      const scope = this.apiKeyScope;
      const profileId = this.currentProfile?.id;
      const commit = async () => {
        await setKey({ scope, profileId, plaintext: key });
        await this.refreshKeyState(profileId);
        this.closeApiKeyDialog();
        await this.loadMistralVoices?.();
        this.showToast(this.t('toast.keySaved'), 'success');
      };
      if (scope === 'profile' && profileId) this.requireProfilePin(profileId, () => void commit());
      else await commit();
    },

    async clearApiKey(this: AppContext, scope: 'global' | 'profile') {
      const profileId = this.currentProfile?.id;
      const commit = async () => {
        await clearKey({ scope, profileId });
        await this.refreshKeyState(profileId);
        this.showToast(this.t('toast.keyCleared'), 'success');
      };
      if (scope === 'profile' && profileId) this.requireProfilePin(profileId, () => void commit());
      else await commit();
    },

    async testApiKey(this: AppContext) {
      const key = this.apiKeyInput.trim();
      if (!key) {
        this.keyTestStatus = 'missing';
        return;
      }
      this.keyTestStatus = 'testing';
      try {
        const res = await fetch(
          '/api/providers/mistral/validate',
          withAiHeaders({ method: 'POST' }, { keyOverride: key }),
        );
        const data = (await res.json()) as { status: ValidateStatus };
        this.keyTestStatus = data.status;
      } catch {
        this.keyTestStatus = 'network';
      }
    },
  };
}
