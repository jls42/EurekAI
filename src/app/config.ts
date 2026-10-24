import { selectVoices } from '@helpers/voice-selection';
import type { MistralVoice } from '@helpers/voice-types';
import { normalizeOcrModel, OCR_MODEL_LABELS } from '@helpers/ocr-models';
import { normalizeSttModel, STT_MODEL_LABELS, STT_PREVIEW_MODELS } from '@helpers/stt-models';
import { normalizeTtsModel, TTS_MODEL_LABELS, TTS_PREVIEW_MODELS } from '@helpers/tts-models';
import { modelPriceLabel as priceLabel } from './model-pricing';
import type { AppContext } from './app-context';
import type { AppConfig } from '../../types';
import { setKey, clearKey, loadActiveKey, isStorageEncryptable, purgeKeyring } from './api-key';
import { withAiHeaders } from './ai-fetch';
import { TTS_DEPENDENT_AGENTS } from '../../generators/auto-agents';

interface ConfigDraft extends AppConfig {
  _mainModel?: string;
  _ocrModel?: string;
  _sttModel?: string;
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

// Noms produit des modèles épinglés (OCR, transcription, synthèse vocale). Map : un id venu d'un
// gabarit ne résout jamais un membre hérité d'Object.prototype.
const MODEL_LABELS: ReadonlyMap<string, string> = new Map<string, string>([
  ...Object.entries(OCR_MODEL_LABELS),
  ...Object.entries(STT_MODEL_LABELS),
  ...Object.entries(TTS_MODEL_LABELS),
]);

// Modèles en Public Preview chez Mistral : signalés « préversion » dans leur option.
const PREVIEW_MODELS: ReadonlySet<string> = new Set<string>([
  ...STT_PREVIEW_MODELS,
  ...TTS_PREVIEW_MODELS,
]);

// Brouillon des Réglages depuis une config serveur : sélecteurs épinglés normalisés (un id hors
// liste laisserait un <select> sans option choisie), champs `_…` propres au brouillon.
const toDraft = (config: AppConfig): ConfigDraft => {
  const draft = structuredClone(config) as ConfigDraft;
  draft._mainModel = config.models?.summary || DEFAULT_MAIN_MODEL;
  draft._ocrModel = normalizeOcrModel(config.models?.ocr);
  draft._sttModel = normalizeSttModel(config.models?.stt);
  draft.ttsModel = normalizeTtsModel(config.ttsModel);
  return draft;
};

// Rechargement des voix sans appel optionnel `f?.()` (Lizard ne mesurait plus les méthodes
// suivantes) ni `.call(this)` (Sonar S6676) : la seule branche est ici.
const reloadMistralVoices = (state: AppContext): Promise<void> => {
  return state.loadMistralVoices ? state.loadMistralVoices() : Promise.resolve();
};

// Pays par défaut d'une langue sans région dans le catalogue de voix (voix Voxtral 3 : `ar`, `ca`,
// `hi`…). Les 9 langues de l'interface gardent le drapeau de leur sélecteur (src/i18n/languages.ts) ;
// le catalan prend celui d'Andorre, où il est la seule langue officielle.
const LANG_DEFAULT_COUNTRY: Readonly<Record<string, string>> = {
  ar: 'SA',
  ca: 'AD',
  de: 'DE',
  en: 'GB',
  es: 'ES',
  fr: 'FR',
  hi: 'IN',
  hu: 'HU',
  it: 'IT',
  ja: 'JP',
  ko: 'KR',
  nl: 'NL',
  no: 'NO',
  pl: 'PL',
  pt: 'BR',
  ro: 'RO',
  ru: 'RU',
  tr: 'TR',
  uk: 'UA',
  vi: 'VN',
  zh: 'CN',
};

export function createConfig() {
  return {
    async loadConfig(this: AppContext) {
      try {
        const [configRes, statusRes, modCatsRes] = await Promise.all([
          fetch('/api/config'),
          fetch('/api/config/status'),
          fetch('/api/moderation-categories'),
        ]);
        if (statusRes.ok) {
          const statusBody: unknown = await statusRes.json();
          this.apiStatus = statusBody as ApiStatus;
        }
        if (modCatsRes.ok) {
          const modBody: unknown = await modCatsRes.json();
          const modData = modBody as ModerationCategoriesPayload;
          this.allModerationCategories = modData.all || [];
          this.moderationDefaults = modData.defaults || {};
        }
        // Load voices BEFORE setting configDraft so the voice list is populated
        // quand Alpine rend les selects de voix Mistral.
        await reloadMistralVoices(this);
        if (configRes.ok) {
          const configBody: unknown = await configRes.json();
          this.configDraft = toDraft(configBody as AppConfig);
        }
      } catch (e) {
        console.error('Failed to load config:', e);
      }
    },

    async loadMistralVoices(this: AppContext) {
      try {
        const voicesRes = await fetch('/api/config/voices', withAiHeaders());
        if (!voicesRes.ok) return;
        const voicesBody: unknown = await voicesRes.json();
        const raw = voicesBody as MistralVoice[];
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

    // Drapeau d'une voix d'après SA langue (`en_gb`, `fr_fr`, ou `ar` sans région) : la région si elle
    // est donnée, sinon le pays par défaut de la langue. Jusqu'au 2026-10-24, le code de langue passait
    // pour un code pays (ar → Argentine, ca → Canada) et toutes les voix anglaises prenaient le
    // drapeau de la première voix anglaise du catalogue (voix britanniques en 🇺🇸).
    langToFlag(this: AppContext, lang: string): string {
      const [code = '', region = ''] = (lang || '').toLowerCase().split('_');
      const country = (region || LANG_DEFAULT_COUNTRY[code] || '').toUpperCase();
      if (!/^[A-Z]{2}$/.test(country)) return '';
      return String.fromCodePoint(
        ...[...country].map((c) => 0x1f1e6 + (c.codePointAt(0) ?? 0) - 65),
      );
    },

    voiceLabel(this: AppContext, voice: Partial<VoicesEnrichedEntry>): string {
      const speaker = voice.speaker || voice.name || voice.id || '';
      const emotion = this.translateEmotion(voice.emotion || '');
      const flag = this.langToFlag(voice.langFull || voice.lang || '');
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

    // Libellé d'option de dropdown : "<nom> — <tarif>", suivi de « préversion » pour un modèle en
    // Public Preview. Pour OCR, transcription et synthèse, <nom> = nom produit lisible (MODEL_LABELS) ;
    // sinon l'ID technique. L'ID réel reste affiché en italique sous ces sélecteurs
    // (cf. dialog-settings.html, x-text configDraft._ocrModel / _sttModel / ttsModel).
    modelOptionLabel(this: AppContext, modelId: string): string {
      const display = MODEL_LABELS.get(modelId) ?? modelId;
      const label = `${display} — ${this.modelPriceLabel(modelId)}`;
      return PREVIEW_MODELS.has(modelId) ? `${label} · ${this.t('settings.preview')}` : label;
    },

    // Libellé complet du modèle choisi, affiché sous son sélecteur sur téléphone : un <select> fermé
    // ne passe pas à la ligne, et le tarif ou « Recommandé » y étaient coupés à 390 px (release-test
    // du 2026-10-22). Même texte que l'option du sélecteur.
    selectedModelLabel(this: AppContext, modelId: string, recommendedId: string): string {
      const label = this.modelOptionLabel(modelId);
      return modelId === recommendedId ? `${label} · ${this.t('settings.recommended')}` : label;
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
          stt: normalizeSttModel(draft._sttModel),
        };
        // Id de TTS_MODELS seulement (le serveur rejette tout autre : `eleven_*`, alias `-latest`).
        draft.ttsModel = normalizeTtsModel(draft.ttsModel);
        const payload = { ...draft } as ConfigDraft & Record<string, unknown>;
        delete payload._mainModel;
        delete payload._ocrModel;
        delete payload._sttModel;
        delete payload.mistralVoices;
        delete payload.mistralVoicesSource;
        const res = await fetch('/api/config', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          // Corps typé par une variable : `(await res.json()) as …` coupait la mesure Lizard.
          const body: unknown = await res.json();
          this.configDraft = toDraft(body as AppConfig);
          const statusRes = await fetch('/api/config/status');
          if (statusRes.ok) {
            const statusBody: unknown = await statusRes.json();
            this.apiStatus = statusBody as ApiStatus;
          }
          await reloadMistralVoices(this);
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
          const body: unknown = await res.json();
          this.configDraft = toDraft(body as AppConfig);
          await reloadMistralVoices(this);
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
    // Génération qui exige le TTS (source unique TTS_DEPENDENT_AGENTS : podcast, quiz vocal, dictée).
    usesTts(this: AppContext, type: string): boolean {
      return TTS_DEPENDENT_AGENTS.has(type);
    },
    // Bouton de génération grisé : type audio sans TTS disponible (infobulle gen.needsTts).
    ttsBlocked(this: AppContext, type: string): boolean {
      return this.usesTts(type) && !this.ttsReady();
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
      const encryptable = await isStorageEncryptable();
      this.keyStorageDegraded = !encryptable;
    },

    openApiKeyDialog(this: AppContext, scope: 'global' | 'profile' = 'global') {
      this.apiKeyScope = this.currentProfile ? scope : 'global';
      this.apiKeyInput = '';
      this.apiKeyConsentClear = false;
      this.keyTestStatus = '';
      this.showApiKeyDialog = true;
      void this.$nextTick(() => {
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
      const encryptable = await isStorageEncryptable();
      if (!encryptable && !this.apiKeyConsentClear) {
        this.keyStorageDegraded = true;
        return;
      }
      const scope = this.apiKeyScope;
      const profileId = this.currentProfile?.id;
      const commit = async () => {
        await setKey({ scope, profileId, plaintext: key });
        await this.refreshKeyState(profileId);
        this.closeApiKeyDialog();
        await reloadMistralVoices(this);
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
        const body: unknown = await res.json();
        const data = body as { status: ValidateStatus };
        this.keyTestStatus = data.status;
      } catch {
        this.keyTestStatus = 'network';
      }
    },
  };
}
