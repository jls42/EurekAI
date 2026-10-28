/* eslint-disable
   @typescript-eslint/no-confusing-void-expression,
   @typescript-eslint/no-explicit-any,
   @typescript-eslint/no-non-null-assertion,
   @typescript-eslint/no-unsafe-argument,
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-return,
   @typescript-eslint/unbound-method
   --
   Codacy lance ESLint sans les types Vitest/mocks; lint:ci local reste type-aware. */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';

vi.mock('./api-key', () => ({
  setKey: vi.fn(() => Promise.resolve()),
  clearKey: vi.fn(() => Promise.resolve()),
  loadActiveKey: vi.fn(() => Promise.resolve('ok')),
  isStorageEncryptable: vi.fn(() => Promise.resolve(true)),
  purgeKeyring: vi.fn(),
}));
vi.mock('./ai-fetch', () => ({
  withAiHeaders: vi.fn((init: unknown, opts?: { keyOverride?: string }) => ({
    ...(init as object),
    _override: opts?.keyOverride,
  })),
}));

import { createConfig } from './config';
import { setKey, clearKey, loadActiveKey, isStorageEncryptable, purgeKeyring } from './api-key';
import { DEFAULT_OCR_MODEL, OCR_MODELS, OCR_MODEL_LABELS } from '@helpers/ocr-models';
import { DEFAULT_STT_MODEL, STT_MODELS, STT_MODEL_LABELS } from '@helpers/stt-models';
import { DEFAULT_TTS_MODEL, TTS_MODELS, TTS_MODEL_LABELS } from '@helpers/tts-models';

globalThis.fetch = vi.fn();

const config = createConfig();

function makeContext(overrides: any = {}) {
  return {
    apiStatus: { mistral: false, ttsAvailable: false, voiceCacheReady: false },
    allModerationCategories: [] as string[],
    moderationDefaults: {} as Record<string, string[]>,
    mistralVoicesList: [] as any[],
    configDraft: {
      models: { summary: '', flashcards: '', quiz: '', podcast: '', translate: '', ocr: '' },
      ttsModel: 'voxtral-mini-tts-2603',
      _mainModel: 'mistral-large-latest',
    } as any,
    t: vi.fn((key: string) => key),
    showToast: vi.fn(),
    $refs: {
      settingsDialog: { close: vi.fn() },
      apiKeyDialog: { showModal: vi.fn(), close: vi.fn() },
    },
    $nextTick: (cb?: () => void) => {
      cb?.();
      return Promise.resolve();
    },
    refreshIcons: vi.fn(),
    requireProfilePin: vi.fn((_id: string, cb: () => void) => cb()),
    hasMistralKey: false,
    keyStorageDegraded: false,
    showApiKeyDialog: false,
    apiKeyInput: '',
    apiKeyScope: 'global',
    apiKeyConsentClear: false,
    keyTestStatus: '',
    currentProfile: null as { id: string } | null,
    mistralReady: config.mistralReady,
    ttsReady: config.ttsReady,
    usesTts: config.usesTts,
    ttsBlocked: config.ttsBlocked,
    refreshKeyState: config.refreshKeyState,
    openApiKeyDialog: config.openApiKeyDialog,
    closeApiKeyDialog: config.closeApiKeyDialog,
    saveApiKey: config.saveApiKey,
    clearApiKey: config.clearApiKey,
    testApiKey: config.testApiKey,
    loadConfig: config.loadConfig,
    loadMistralVoices: config.loadMistralVoices,
    translateEmotion: config.translateEmotion,
    langToFlag: config.langToFlag,
    voiceLabel: config.voiceLabel,
    defaultVoiceOptionLabel: config.defaultVoiceOptionLabel,
    modelPriceLabel: config.modelPriceLabel,
    modelOptionLabel: config.modelOptionLabel,
    saveSettings: config.saveSettings,
    resetSettings: config.resetSettings,
    closeSettingsDialog: config.closeSettingsDialog,
    ...overrides,
  };
}

function mockFetchOk(data: any) {
  return vi.mocked(globalThis.fetch).mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  } as any);
}

function mockFetchFail(status: number, data: any = {}) {
  return vi.mocked(globalThis.fetch).mockResolvedValueOnce({
    ok: false,
    status,
    statusText: 'Error',
    json: async () => data,
  } as any);
}

beforeEach(() => {
  vi.mocked(globalThis.fetch).mockReset();
});

// --- loadConfig ---

describe('loadConfig', () => {
  it('fetches config + status + voices, sets configDraft and apiStatus', async () => {
    const configData = {
      models: { summary: 'mistral-large-latest', flashcards: 'mistral-large-latest' },
      ttsModel: 'voxtral-mini-tts-2603',
    };
    const statusData = { mistral: true, ttsAvailable: true };
    const voicesData = [{ id: 'v1', name: 'Oliver - Neutral', languages: ['en_US'] }];

    const modCatsData = {
      all: ['sexual', 'violence_and_threats'],
      defaults: { enfant: ['sexual'] },
    };

    // loadConfig calls: config, status, moderation-categories (parallel), then loadMistralVoices (voices)
    mockFetchOk(configData); // /api/config
    mockFetchOk(statusData); // /api/config/status
    mockFetchOk(modCatsData); // /api/moderation-categories
    mockFetchOk(voicesData); // /api/config/voices (called by loadMistralVoices)

    const ctx = makeContext();
    await config.loadConfig.call(ctx);

    expect(ctx.apiStatus).toEqual(statusData);
    expect(ctx.configDraft.ttsModel).toBe('voxtral-mini-tts-2603');
    expect(ctx.configDraft._mainModel).toBe('mistral-large-latest');
    expect(ctx.mistralVoicesList).toHaveLength(1);
    expect(ctx.allModerationCategories).toEqual(['sexual', 'violence_and_threats']);
    expect(ctx.moderationDefaults).toEqual({ enfant: ['sexual'] });
  });

  it('handles fetch failure gracefully', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValue(new Error('Network'));
    const ctx = makeContext();
    await config.loadConfig.call(ctx);
    expect(ctx.apiStatus).toEqual({ mistral: false, ttsAvailable: false, voiceCacheReady: false });
  });
});

// --- loadMistralVoices ---

describe('loadMistralVoices', () => {
  it('parses voice list with speaker/emotion/lang', async () => {
    const voicesData = [
      { id: 'v1', name: 'Oliver - Neutral', languages: ['en_US'] },
      { id: 'v2', name: 'Marie - Joyful', languages: ['fr_FR'] },
      { id: 'v3', name: 'Kenji', languages: ['ja_JP'] },
    ];
    mockFetchOk(voicesData);

    const ctx = makeContext();
    await config.loadMistralVoices.call(ctx);

    expect(ctx.mistralVoicesList).toHaveLength(3);

    expect(ctx.mistralVoicesList[0]).toEqual({
      id: 'v1',
      name: 'Oliver - Neutral',
      languages: ['en_US'],
      gender: undefined,
      tags: undefined,
      speaker: 'Oliver',
      emotion: 'Neutral',
      lang: 'en',
      langFull: 'en_US',
    });

    expect(ctx.mistralVoicesList[1]).toEqual({
      id: 'v2',
      name: 'Marie - Joyful',
      languages: ['fr_FR'],
      gender: undefined,
      tags: undefined,
      speaker: 'Marie',
      emotion: 'Joyful',
      lang: 'fr',
      langFull: 'fr_FR',
    });

    // Voice with no emotion part
    expect(ctx.mistralVoicesList[2].speaker).toBe('Kenji');
    expect(ctx.mistralVoicesList[2].emotion).toBe('');
    expect(ctx.mistralVoicesList[2].lang).toBe('ja');
  });

  it('handles fetch failure gracefully', async () => {
    mockFetchFail(500);
    const ctx = makeContext();
    await config.loadMistralVoices.call(ctx);
    expect(ctx.mistralVoicesList).toEqual([]);
  });

  it('handles empty response', async () => {
    mockFetchOk([]);
    const ctx = makeContext();
    await config.loadMistralVoices.call(ctx);
    expect(ctx.mistralVoicesList).toEqual([]);
  });
});

// --- translateEmotion ---

describe('translateEmotion', () => {
  it('delegates to t() with emotion prefix', () => {
    const ctx = makeContext();
    config.translateEmotion.call(ctx, 'Neutral');
    expect(ctx.t).toHaveBeenCalledWith('emotion.Neutral');
  });

  it('returns the emotion key if t() returns the same string', () => {
    const ctx = makeContext({ t: vi.fn((key: string) => key) });
    const result = config.translateEmotion.call(ctx, 'Joyful');
    expect(result).toBe('emotion.Joyful');
  });

  it('returns empty string for empty emotion', () => {
    const ctx = makeContext();
    const result = config.translateEmotion.call(ctx, '');
    expect(result).toBe('');
    expect(ctx.t).not.toHaveBeenCalledWith('emotion.');
  });
});

// --- langToFlag ---

describe('langToFlag', () => {
  const flag = (country: string) =>
    String.fromCodePoint(...[...country].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
  const ctx = () => makeContext({ mistralVoicesList: [] });

  it('prend la région de la langue complète de la voix', () => {
    expect(config.langToFlag.call(ctx(), 'en_gb')).toBe(flag('GB'));
    expect(config.langToFlag.call(ctx(), 'en_GB')).toBe(flag('GB'));
    expect(config.langToFlag.call(ctx(), 'en_us')).toBe(flag('US'));
    expect(config.langToFlag.call(ctx(), 'fr_fr')).toBe(flag('FR'));
  });

  // Jusqu'au 2026-10-24, le code de langue passait pour un code pays : ar → Argentine, ca → Canada,
  // hi, ja, ko et zh → drapeaux invalides (voix Voxtral 3 sans région).
  it.each([
    ['ar', 'SA'],
    ['ca', 'AD'],
    ['hi', 'IN'],
    ['ja', 'JP'],
    ['ko', 'KR'],
    ['zh', 'CN'],
    ['uk', 'UA'],
    ['vi', 'VN'],
    ['fr', 'FR'],
  ])('langue sans région %s : pays par défaut %s', (lang, country) => {
    expect(config.langToFlag.call(ctx(), lang)).toBe(flag(country));
  });

  it('chaîne vide pour une langue inconnue ou une région invalide', () => {
    expect(config.langToFlag.call(ctx(), '')).toBe('');
    expect(config.langToFlag.call(ctx(), 'a')).toBe('');
    expect(config.langToFlag.call(ctx(), 'xx')).toBe('');
    expect(config.langToFlag.call(ctx(), 'xx_123')).toBe('');
  });
});

// --- voiceLabel ---

describe('voiceLabel', () => {
  it('formats flag, speaker and translated emotion', () => {
    const ctx = makeContext({
      mistralVoicesList: [{ lang: 'fr', langFull: 'fr_FR' }],
      t: vi.fn((key: string) => (key === 'emotion.Excited' ? 'Excited' : key)),
    });
    const result = config.voiceLabel.call(ctx, {
      name: 'Marie - Excited',
      speaker: 'Marie',
      emotion: 'Excited',
      lang: 'fr',
    });
    expect(result).toBe('🇫🇷 Marie - Excited');
  });

  // La voix britannique ne prend plus le drapeau de la première voix anglaise (américaine).
  it('drapeau de la langue complète de la voix, pas de la première voix de même langue', () => {
    const ctx = makeContext({
      mistralVoicesList: [
        { lang: 'en', langFull: 'en_us' },
        { lang: 'en', langFull: 'en_gb' },
      ],
    });
    const result = config.voiceLabel.call(ctx, {
      speaker: 'Jane',
      emotion: '',
      lang: 'en',
      langFull: 'en_gb',
    });
    expect(result).toBe('🇬🇧 Jane');
    // Et l'américaine garde le sien (le pays par défaut de l'anglais est GB) : seule la langue
    // complète de la voix les distingue.
    const us = config.voiceLabel.call(ctx, {
      speaker: 'Paul',
      emotion: '',
      lang: 'en',
      langFull: 'en_us',
    });
    expect(us).toBe('🇺🇸 Paul');
  });

  it('does not add a dash or emotion key for empty emotion', () => {
    const ctx = makeContext({ mistralVoicesList: [] });
    const result = config.voiceLabel.call(ctx, {
      name: 'marie',
      speaker: 'marie',
      emotion: '',
      lang: '',
    });
    expect(result).toBe('marie');
  });
});

// --- defaultVoiceOptionLabel ---

describe('defaultVoiceOptionLabel', () => {
  it('returns concrete host and guest labels for FR locale', () => {
    const ctx = makeContext({
      mistralVoicesList: [
        {
          id: 'v1',
          name: 'Marie - Excited',
          languages: ['fr_FR'],
          gender: 'female',
          tags: ['excited'],
          speaker: 'Marie',
          emotion: 'Excited',
          lang: 'fr',
          langFull: 'fr_FR',
        },
        {
          id: 'v2',
          name: 'Marie - Curious',
          languages: ['fr_FR'],
          gender: 'female',
          tags: ['curious'],
          speaker: 'Marie',
          emotion: 'Curious',
          lang: 'fr',
          langFull: 'fr_FR',
        },
      ],
      t: vi.fn((key: string) => {
        if (key === 'profile.voiceDefaultSuffix') return '(par défaut)';
        if (key.startsWith('emotion.')) return key.slice('emotion.'.length);
        return key;
      }),
    });
    expect(config.defaultVoiceOptionLabel.call(ctx, 'host', 'fr')).toBe(
      '🇫🇷 Marie - Excited (par défaut)',
    );
    expect(config.defaultVoiceOptionLabel.call(ctx, 'guest', 'fr')).toBe(
      '🇫🇷 Marie - Curious (par défaut)',
    );
  });

  it('uses EN fallback for unsupported profile locales', () => {
    const ctx = makeContext({
      mistralVoicesList: [
        {
          id: 'en1',
          name: 'Jane - Confident',
          languages: ['en_GB'],
          gender: 'female',
          tags: ['confident'],
          speaker: 'Jane',
          emotion: 'Confident',
          lang: 'en',
          langFull: 'en_GB',
        },
        {
          id: 'en2',
          name: 'Oliver - Curious',
          languages: ['en_GB'],
          gender: 'male',
          tags: ['curious'],
          speaker: 'Oliver',
          emotion: 'Curious',
          lang: 'en',
          langFull: 'en_GB',
        },
      ],
      t: vi.fn((key: string) => {
        if (key === 'profile.voiceDefaultSuffix') return '(default)';
        if (key.startsWith('emotion.')) return key.slice('emotion.'.length);
        return key;
      }),
    });
    const result = config.defaultVoiceOptionLabel.call(ctx, 'host', 'es');
    expect(result).toContain('Jane');
    expect(result).toContain('(default)');
  });

  it('falls back to profile.voiceDefault translation when voice list is empty', () => {
    const ctx = makeContext({
      mistralVoicesList: [],
      t: vi.fn((key: string) =>
        key === 'profile.voiceDefault' ? 'Par défaut (selon la langue)' : key,
      ),
    });
    expect(config.defaultVoiceOptionLabel.call(ctx, 'host', 'fr')).toBe(
      'Par défaut (selon la langue)',
    );
  });
});

// --- saveSettings ---

describe('saveSettings', () => {
  it('builds models from mainModel and saves', async () => {
    const savedConfig = {
      models: {
        summary: 'mistral-large-latest',
        flashcards: 'mistral-large-latest',
        quiz: 'mistral-large-latest',
        podcast: 'mistral-large-latest',
        translate: 'mistral-large-latest',
        chat: 'mistral-large-latest',
        quizVerify: 'mistral-large-latest',
        ocr: 'mistral-ocr-latest',
      },
      ttsModel: 'voxtral-mini-tts-2603',
    };
    const statusData = { mistral: true, ttsAvailable: true };
    mockFetchOk(savedConfig); // PUT /api/config
    mockFetchOk(statusData); // GET /api/config/status

    const ctx = makeContext();
    await config.saveSettings.call(ctx);

    // Verify models were set from _mainModel
    const putCall = vi.mocked(globalThis.fetch).mock.calls[0];
    expect(putCall[0]).toBe('/api/config');
    const sentBody = JSON.parse(putCall[1].body as string);
    expect(sentBody.models.summary).toBe('mistral-large-latest');
    // _ocrModel absent → normalisé vers le défaut OCR 4 (modèle courant)
    expect(sentBody.models.ocr).toBe('mistral-ocr-4-1');
    // _sttModel absent → défaut épinglé Transcribe 2, jamais un champ vide
    expect(sentBody.models.stt).toBe('voxtral-mini-2602');
    expect(sentBody._mainModel).toBeUndefined();
    expect(sentBody._sttModel).toBeUndefined();
    expect(sentBody.mistralVoices).toBeUndefined();
    expect(sentBody.mistralVoicesSource).toBeUndefined();

    expect(ctx.showToast).toHaveBeenCalledWith('toast.settingsSaved', 'success');
    expect(ctx.$refs.settingsDialog.close).toHaveBeenCalled();
    expect(ctx.apiStatus).toEqual(statusData);
  });

  it('forwards the selected OCR model (OCR 3 opt-in) on save and strips _ocrModel', async () => {
    mockFetchOk({ models: {}, ttsModel: 'voxtral-mini-tts-2603' }); // PUT /api/config
    mockFetchOk({ mistral: true, ttsAvailable: true }); // GET /api/config/status

    const ctx = makeContext();
    ctx.configDraft._ocrModel = 'mistral-ocr-2512';
    await config.saveSettings.call(ctx);

    const putCall = vi.mocked(globalThis.fetch).mock.calls[0];
    const sentBody = JSON.parse(putCall[1].body as string);
    expect(sentBody.models.ocr).toBe('mistral-ocr-2512');
    expect(sentBody._ocrModel).toBeUndefined();
  });

  it('forwards the selected STT model (Small Transcribe 3 opt-in) on save and strips _sttModel', async () => {
    mockFetchOk({ models: {}, ttsModel: 'voxtral-mini-tts-2603' }); // PUT /api/config
    mockFetchOk({ mistral: true, ttsAvailable: true }); // GET /api/config/status

    const ctx = makeContext();
    ctx.configDraft._sttModel = 'voxtral-small-transcribe-3-0';
    await config.saveSettings.call(ctx);

    const sentBody = JSON.parse(vi.mocked(globalThis.fetch).mock.calls[0][1].body as string);
    expect(sentBody.models.stt).toBe('voxtral-small-transcribe-3-0');
    expect(sentBody._sttModel).toBeUndefined();
  });

  it('normalise un _sttModel hors liste (alias voxtral-mini-latest) vers le défaut', async () => {
    mockFetchOk({ models: {}, ttsModel: 'voxtral-mini-tts-2603' });
    mockFetchOk({ mistral: true, ttsAvailable: true });

    const ctx = makeContext();
    ctx.configDraft._sttModel = 'voxtral-mini-latest';
    await config.saveSettings.call(ctx);

    const sentBody = JSON.parse(vi.mocked(globalThis.fetch).mock.calls[0][1].body as string);
    expect(sentBody.models.stt).toBe('voxtral-mini-2602');
  });

  // Le serveur rejette tout ttsModel hors TTS_MODELS : un brouillon legacy (`eleven_*`), l'alias
  // mouvant ou un id libre partirait en warn côté serveur sans être appliqué.
  it.each(['eleven_v3', 'voxtral-mini-tts-latest', 'voxtral-custom'])(
    'auto-corrige un ttsModel %s vers Voxtral TTS épinglé',
    async (legacy) => {
      mockFetchOk({
        models: { summary: 'mistral-large-latest' },
        ttsModel: 'voxtral-mini-tts-2603',
      });
      mockFetchOk({ mistral: true, ttsAvailable: true });

      const ctx = makeContext({
        configDraft: {
          ...makeContext().configDraft,
          ttsModel: legacy,
          _mainModel: 'mistral-large-latest',
        },
      });
      await config.saveSettings.call(ctx);

      const putCall = vi.mocked(globalThis.fetch).mock.calls[0];
      const sentBody = JSON.parse(putCall[1].body as string);
      expect(sentBody.ttsModel).toBe('voxtral-mini-tts-2603');
    },
  );

  it('envoie TTS 3 (option) tel quel', async () => {
    mockFetchOk({ models: {}, ttsModel: 'voxtral-mini-tts-3-0' });
    mockFetchOk({ mistral: true, ttsAvailable: true });

    const ctx = makeContext();
    ctx.configDraft.ttsModel = 'voxtral-mini-tts-3-0';
    await config.saveSettings.call(ctx);

    const sentBody = JSON.parse(vi.mocked(globalThis.fetch).mock.calls[0][1].body as string);
    expect(sentBody.ttsModel).toBe('voxtral-mini-tts-3-0');
  });

  it('strips stale global voice fields before saving settings', async () => {
    mockFetchOk({ models: { summary: 'mistral-large-latest' }, ttsModel: 'voxtral-mini-tts-2603' });
    mockFetchOk({ mistral: true, ttsAvailable: true });

    const ctx = makeContext({
      configDraft: {
        ...makeContext().configDraft,
        mistralVoices: { host: 'old-host', guest: 'old-guest' },
        mistralVoicesSource: 'user',
      },
    });
    await config.saveSettings.call(ctx);

    const putCall = vi.mocked(globalThis.fetch).mock.calls[0];
    const sentBody = JSON.parse(putCall[1].body as string);
    expect(sentBody.mistralVoices).toBeUndefined();
    expect(sentBody.mistralVoicesSource).toBeUndefined();
  });

  it('does not fail on Alpine-like Proxy configDraft (DataCloneError regression)', async () => {
    // Regression guard for src/app/config.ts:153 — spread {...draft} must replace structuredClone(draft),
    // otherwise Alpine reactive proxies (which expose non-cloneable magic methods like $watch) throw
    // DataCloneError in the browser. Native structuredClone on a Proxy whose target carries a function
    // property throws — this test reproduces that pre-fix symptom.
    const proxyDraft = new Proxy(
      {
        models: { summary: '', flashcards: '', quiz: '', podcast: '', translate: '', ocr: '' },
        ttsModel: 'voxtral-mini-tts-latest',
        _mainModel: 'mistral-large-latest',
        $watch: () => {
          /* simulate Alpine magic method */
        },
      } as any,
      {},
    );
    mockFetchOk({
      models: { summary: 'mistral-large-latest' },
      ttsModel: 'voxtral-mini-tts-latest',
    });
    mockFetchOk({ mistral: true, ttsAvailable: true });

    const ctx = makeContext({ configDraft: proxyDraft as any });
    await expect(config.saveSettings.call(ctx)).resolves.toBeUndefined();

    const putCall = vi.mocked(globalThis.fetch).mock.calls[0];
    const sentBody = JSON.parse(putCall[1].body as string);
    expect(sentBody._mainModel).toBeUndefined();
    expect(ctx.showToast).toHaveBeenCalledWith('toast.settingsSaved', 'success');
  });

  it('shows error toast on save failure', async () => {
    mockFetchFail(500);
    const ctx = makeContext();
    await config.saveSettings.call(ctx);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.settingsError', 'error');
  });

  it('shows error toast on network exception', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network'));
    const ctx = makeContext();
    await config.saveSettings.call(ctx);
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.settingsError',
      'error',
      expect.any(Function),
    );
  });
});

// --- resetSettings ---

describe('resetSettings', () => {
  it('resets config and updates draft', async () => {
    const resetData = {
      models: { summary: 'mistral-large-latest' },
      ttsModel: 'voxtral-mini-tts-2603',
    };
    mockFetchOk(resetData);
    const ctx = makeContext();
    await config.resetSettings.call(ctx);
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/config/reset', { method: 'POST' });
    expect(ctx.configDraft._mainModel).toBe('mistral-large-latest');
    expect(ctx.showToast).toHaveBeenCalledWith('toast.settingsReset', 'success');
  });

  it('shows error toast on failure', async () => {
    mockFetchFail(500);
    const ctx = makeContext();
    await config.resetSettings.call(ctx);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.settingsError', 'error');
  });

  it('shows error toast on network exception', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network'));
    const ctx = makeContext();
    await config.resetSettings.call(ctx);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.settingsError', 'error');
  });
});

// --- Brouillon des Réglages (toDraft) ---

// Chaque chemin qui remplace le brouillon par une config renvoyée par le serveur.
const viaLoadConfig = async (ctx: any, serverConfig: unknown) => {
  mockFetchOk(serverConfig); // GET /api/config
  mockFetchOk({ mistral: true, ttsAvailable: true }); // GET /api/config/status
  mockFetchOk({ all: [], defaults: {} }); // GET /api/moderation-categories
  mockFetchOk([]); // GET /api/config/voices
  await config.loadConfig.call(ctx);
};
const viaSaveSettings = async (ctx: any, serverConfig: unknown) => {
  mockFetchOk(serverConfig); // PUT /api/config
  mockFetchOk({ mistral: true, ttsAvailable: true }); // GET /api/config/status
  mockFetchOk([]); // GET /api/config/voices
  await config.saveSettings.call(ctx);
};
const viaResetSettings = async (ctx: any, serverConfig: unknown) => {
  mockFetchOk(serverConfig); // POST /api/config/reset
  mockFetchOk([]); // GET /api/config/voices
  await config.resetSettings.call(ctx);
};
type DraftPath = typeof viaLoadConfig;
const DRAFT_PATHS: [string, DraftPath][] = [
  ['loadConfig', viaLoadConfig],
  ['saveSettings', viaSaveSettings],
  ['resetSettings', viaResetSettings],
];

describe('brouillon des Réglages (toDraft) : sélecteurs épinglés normalisés', () => {
  // Config d'un serveur pas encore redémarré : un id hors liste laisserait un <select> sans option
  // choisie (et serait renvoyé tel quel au prochain enregistrement).
  const STALE_CONFIG = {
    models: {
      summary: 'mistral-medium-latest',
      ocr: 'mistral-ocr-latest',
      stt: 'voxtral-mini-latest',
    },
    ttsModel: 'voxtral-mini-tts-latest',
  };
  const OPT_IN_CONFIG = {
    models: {
      summary: 'mistral-large-latest',
      ocr: 'mistral-ocr-2512',
      stt: 'voxtral-small-transcribe-3-0',
    },
    ttsModel: 'voxtral-mini-tts-3-0',
  };

  it.each(DRAFT_PATHS)('%s : alias et ids hors liste → défauts épinglés', async (_path, run) => {
    const ctx = makeContext();
    await run(ctx, STALE_CONFIG);
    expect(ctx.configDraft).toMatchObject({
      _mainModel: 'mistral-medium-latest',
      _ocrModel: 'mistral-ocr-4-1',
      _sttModel: 'voxtral-mini-2602',
      ttsModel: 'voxtral-mini-tts-2603',
    });
  });

  it.each(DRAFT_PATHS)(
    '%s : options choisies gardées (OCR 3, Small Transcribe 3, TTS 3)',
    async (_path, run) => {
      const ctx = makeContext();
      await run(ctx, OPT_IN_CONFIG);
      expect(ctx.configDraft).toMatchObject({
        _mainModel: 'mistral-large-latest',
        _ocrModel: 'mistral-ocr-2512',
        _sttModel: 'voxtral-small-transcribe-3-0',
        ttsModel: 'voxtral-mini-tts-3-0',
      });
    },
  );

  it.each(DRAFT_PATHS)(
    '%s : config sans modèles (champs absents) → défauts',
    async (_path, run) => {
      const ctx = makeContext();
      await run(ctx, {});
      expect(ctx.configDraft).toMatchObject({
        _mainModel: 'mistral-large-latest',
        _ocrModel: 'mistral-ocr-4-1',
        _sttModel: 'voxtral-mini-2602',
        ttsModel: 'voxtral-mini-tts-2603',
      });
    },
  );
});

// --- modelOptionLabel (options des sélecteurs de modèles) ---

describe('modelOptionLabel', () => {
  it.each([
    ['voxtral-mini-2602', 'Mini Transcribe 2 — $0.0030 settings.perMinute'],
    [
      'voxtral-mini-transcribe-3-0',
      'Mini Transcribe 3 — $0.0035 settings.perMinute · settings.preview',
    ],
    [
      'voxtral-small-transcribe-3-0',
      'Small Transcribe 3 — $0.0040 settings.perMinute · settings.preview',
    ],
    ['voxtral-mini-tts-2603', 'Voxtral TTS — $16 settings.perMChars'],
    ['voxtral-mini-tts-3-0', 'Voxtral TTS 3 — $13 settings.perMChars · settings.preview'],
    ['mistral-ocr-4-1', 'OCR 4 — $4 settings.perKPages'],
    ['mistral-ocr-2512', 'OCR 3 — $2 settings.perKPages'],
  ])('%s : nom produit, tarif et préversion signalée', (modelId, label) => {
    expect(config.modelOptionLabel.call(makeContext(), modelId)).toBe(label);
  });

  it('modèle de génération : id technique, sans suffixe de préversion', () => {
    expect(config.modelOptionLabel.call(makeContext(), 'mistral-large-latest')).toBe(
      'mistral-large-latest — $0.50 / $1.50 settings.perMTokens',
    );
  });

  it("id hérité d'Object.prototype : jamais un membre du prototype comme nom", () => {
    expect(config.modelOptionLabel.call(makeContext(), 'constructor')).toBe(
      'constructor — settings.priceUnknown',
    );
  });
});

// --- selectedModelLabel (libellé complet sous le sélecteur, sur téléphone) ---

describe('selectedModelLabel', () => {
  it('modèle recommandé : libellé de son option, suivi de « Recommandé »', () => {
    const label = config.selectedModelLabel.call(
      makeContext(),
      'voxtral-mini-2602',
      'voxtral-mini-2602',
    );
    expect(label).toBe('Mini Transcribe 2 — $0.0030 settings.perMinute · settings.recommended');
  });

  it('autre modèle : libellé de son option, préversion comprise, sans « Recommandé »', () => {
    const label = config.selectedModelLabel.call(
      makeContext(),
      'voxtral-mini-transcribe-3-0',
      'voxtral-mini-2602',
    );
    expect(label).toBe('Mini Transcribe 3 — $0.0035 settings.perMinute · settings.preview');
  });

  it('configuration pas encore chargée (modèle absent ou vide) : libellé vide, sans exception', () => {
    for (const modelId of [undefined, '']) {
      const label = config.selectedModelLabel.call(
        makeContext(),
        modelId as unknown as string,
        'mistral-large-latest',
      );
      expect(label).toBe('');
    }
  });
});

// --- Gabarit des Réglages : sélecteurs de modèles épinglés ---

describe('dialog-settings.html : sélecteurs de modèles alignés sur leurs sources uniques', () => {
  const html = readFileSync(new URL('../partials/dialog-settings.html', import.meta.url), 'utf-8');
  // Guillemets en \x22 : dans une regex littérale, Lizard les prend pour des chaînes et ne
  // délimite plus les fonctions suivantes (cf. CLAUDE.md, pièges Lizard).
  const VALUE_RE = /\svalue=\x22([^\x22]*)\x22/;
  const X_TEXT_RE = /\sx-text=\x22([^\x22]*)\x22/;
  const FALLBACK_RE = /\x22\s*>([^<]*)<\/option>/;

  // Bloc `<select id="…">…</select>` du sélecteur.
  const selectBlock = (id: string): string => {
    const at = html.indexOf(`id="${id}"`);
    expect(at, id).toBeGreaterThan(-1);
    return html.slice(html.lastIndexOf('<select', at), html.indexOf('</select>', at));
  };
  // Groupe capturé (sans espaces autour), '' si le motif est absent.
  const capture = (re: RegExp, chunk: string): string => {
    return re.exec(chunk)?.[1].trim() ?? '';
  };
  // Attributs d'une option (texte qui suit `<option`) et son texte de repli.
  const parseOption = (chunk: string) => {
    return {
      value: capture(VALUE_RE, chunk),
      xText: capture(X_TEXT_RE, chunk),
      fallback: capture(FALLBACK_RE, chunk),
    };
  };
  const optionsOf = (block: string) => block.split('<option').slice(1).map(parseOption);

  type SelectorCase = [string, string, readonly string[], string, Record<string, string>];
  const SELECTORS: SelectorCase[] = [
    ['cfg-ocr-model', 'configDraft._ocrModel', OCR_MODELS, DEFAULT_OCR_MODEL, OCR_MODEL_LABELS],
    ['cfg-stt-model', 'configDraft._sttModel', STT_MODELS, DEFAULT_STT_MODEL, STT_MODEL_LABELS],
    ['cfg-tts-model', 'configDraft.ttsModel', TTS_MODELS, DEFAULT_TTS_MODEL, TTS_MODEL_LABELS],
  ];

  it.each(SELECTORS)('#%s (%s) : une option par modèle, dans l’ordre', (id, xModel, models) => {
    const block = selectBlock(id);
    expect(block).toContain(`x-model="${xModel}"`);
    expect(optionsOf(block).map((o) => o.value)).toEqual([...models]);
    // L'id technique réel reste affiché sous le sélecteur.
    expect(html).toContain(`x-text="${xModel}"`);
  });

  it.each(SELECTORS)(
    '#%s : libellé du même modèle que la valeur, défaut seul « recommandé »',
    (id, _xModel, _models, defaultModel, labels) => {
      for (const { value, xText, fallback } of optionsOf(selectBlock(id))) {
        expect(xText.startsWith(`modelOptionLabel('${value}')`), value).toBe(true);
        expect(xText.includes("t('settings.recommended')"), value).toBe(value === defaultModel);
        // Texte de repli (avant Alpine) = nom produit de la source unique.
        expect(fallback, value).toBe(labels[value]);
      }
    },
  );

  // Un <select> fermé ne passe pas à la ligne : à 390 px, tarif et « Recommandé » étaient coupés
  // (release-test du 2026-10-22). Le libellé complet du modèle choisi s'affiche dessous, sur
  // téléphone seulement, avec le même modèle recommandé que l'option marquée du sélecteur.
  it.each([
    ['cfg-main-model', 'configDraft._mainModel', 'mistral-large-latest'],
    ...SELECTORS.map(([id, xModel, , defaultModel]) => [id, xModel, defaultModel]),
  ])(
    '#%s : libellé complet du modèle choisi sous le sélecteur, sur téléphone',
    (id, xModel, rec) => {
      const selectEnd = html.indexOf('</select>', html.indexOf(`id="${id}"`));
      const nextSelect = html.indexOf('<select', selectEnd);
      const at = html.indexOf(`selectedModelLabel(${xModel}, '${rec}')`);
      expect(at, id).toBeGreaterThan(selectEnd);
      if (nextSelect !== -1) expect(at, id).toBeLessThan(nextSelect);
      expect(html.slice(html.lastIndexOf('<p', at), at), id).toContain('sm:hidden');
      expect(html).toContain(`modelOptionLabel('${rec}') + ' · ' + t('settings.recommended')`);
    },
  );
});

// --- closeSettingsDialog ---

describe('closeSettingsDialog', () => {
  it('calls dialog close', () => {
    const ctx = makeContext();
    config.closeSettingsDialog.call(ctx);
    expect(ctx.$refs.settingsDialog.close).toHaveBeenCalled();
  });

  it('handles missing dialog ref gracefully', () => {
    const ctx = makeContext({ $refs: { settingsDialog: undefined } });
    // Should not throw
    expect(() => config.closeSettingsDialog.call(ctx)).not.toThrow();
  });
});

// --- Clé Mistral navigateur ---
describe('clé Mistral navigateur (méthodes config)', () => {
  beforeEach(() => {
    vi.mocked(setKey).mockClear().mockResolvedValue(undefined);
    vi.mocked(clearKey).mockClear().mockResolvedValue(undefined);
    vi.mocked(loadActiveKey).mockClear().mockResolvedValue('ok');
    vi.mocked(isStorageEncryptable).mockClear().mockResolvedValue(true);
    vi.mocked(purgeKeyring).mockClear();
  });

  it('mistralReady / ttsReady : env OU clé navigateur', () => {
    expect(config.mistralReady.call(makeContext({ apiStatus: { mistral: false } }))).toBe(false);
    expect(config.mistralReady.call(makeContext({ apiStatus: { mistral: true } }))).toBe(true);
    const ctx = makeContext({ apiStatus: { mistral: false }, hasMistralKey: true });
    expect(config.mistralReady.call(ctx)).toBe(true);
    expect(config.ttsReady.call(ctx)).toBe(true);
  });

  // Source unique des types qui exigent le TTS (TTS_DEPENDENT_AGENTS) : la dictée lit chaque mot
  // en audio, elle manquait aux listes codées en dur des boutons de génération.
  it('usesTts / ttsBlocked : podcast, quiz vocal et dictée grisés sans TTS', () => {
    const noTts = makeContext({ apiStatus: { mistral: false }, hasMistralKey: false });
    const withTts = makeContext({ apiStatus: { mistral: true } });
    for (const type of ['podcast', 'quiz-vocal', 'dictation']) {
      expect(config.usesTts.call(noTts, type)).toBe(true);
      expect(config.ttsBlocked.call(noTts, type)).toBe(true);
      expect(config.ttsBlocked.call(withTts, type)).toBe(false);
    }
    expect(config.usesTts.call(noTts, 'summary')).toBe(false);
    expect(config.ttsBlocked.call(noTts, 'summary')).toBe(false);
  });

  it('gabarits : aucune liste de types TTS en dur, dictée grisée sans TTS', () => {
    const partial = (name: string) =>
      readFileSync(new URL(`../partials/${name}.html`, import.meta.url), 'utf-8');
    const sources = partial('view-sources');
    const dashboard = partial('view-dashboard');
    for (const html of [sources, dashboard]) {
      expect(html).not.toContain("['podcast','quiz-vocal']");
      expect(html).toContain(':disabled="ttsBlocked(cat.key)"');
      expect(html).toContain(":title=\"ttsBlocked(cat.key) ? t('gen.needsTts') : ''\"");
    }
    expect(dashboard).not.toContain("gen.type === 'podcast' || gen.type === 'quiz-vocal'");
    expect(dashboard).toContain('usesTts(gen.type)');
    const dictation = partial('view-dictation');
    expect(dictation).toContain(':disabled="sources.length === 0 || !ttsReady()"');
    expect(dictation).toContain(":title=\"!ttsReady() ? t('gen.needsTts') : ''\"");
  });

  it('refreshKeyState : ok → hasMistralKey true, non dégradé', async () => {
    const ctx = makeContext();
    await config.refreshKeyState.call(ctx, 'p1');
    expect(loadActiveKey).toHaveBeenCalledWith('p1');
    expect(ctx.hasMistralKey).toBe(true);
    expect(ctx.keyStorageDegraded).toBe(false);
  });

  it('refreshKeyState : broken → purge + hasMistralKey false', async () => {
    vi.mocked(loadActiveKey).mockResolvedValue('broken');
    const ctx = makeContext({ hasMistralKey: true });
    await config.refreshKeyState.call(ctx);
    expect(purgeKeyring).toHaveBeenCalled();
    expect(ctx.hasMistralKey).toBe(false);
  });

  it('refreshKeyState : storage non chiffrable → keyStorageDegraded true', async () => {
    vi.mocked(isStorageEncryptable).mockResolvedValue(false);
    const ctx = makeContext();
    await config.refreshKeyState.call(ctx);
    expect(ctx.keyStorageDegraded).toBe(true);
  });

  it('openApiKeyDialog (profil) + closeApiKeyDialog', () => {
    const ctx = makeContext({ currentProfile: { id: 'p1' } });
    config.openApiKeyDialog.call(ctx, 'profile');
    expect(ctx.showApiKeyDialog).toBe(true);
    expect(ctx.apiKeyScope).toBe('profile');
    expect(ctx.$refs.apiKeyDialog.showModal).toHaveBeenCalled();
    config.closeApiKeyDialog.call(ctx);
    expect(ctx.showApiKeyDialog).toBe(false);
  });

  it('openApiKeyDialog force global sans profil', () => {
    const ctx = makeContext({ currentProfile: null });
    config.openApiKeyDialog.call(ctx, 'profile');
    expect(ctx.apiKeyScope).toBe('global');
  });

  it('saveApiKey (global) : setKey + voices + toast', async () => {
    const ctx = makeContext({
      apiKeyInput: '  sk-test  ',
      loadMistralVoices: vi.fn(() => Promise.resolve()),
    });
    await config.saveApiKey.call(ctx);
    expect(setKey).toHaveBeenCalledWith({
      scope: 'global',
      profileId: undefined,
      plaintext: 'sk-test',
    });
    expect(ctx.loadMistralVoices).toHaveBeenCalled();
    expect(ctx.showToast).toHaveBeenCalled();
  });

  it('saveApiKey : clé vide → no-op', async () => {
    const ctx = makeContext({ apiKeyInput: '   ' });
    await config.saveApiKey.call(ctx);
    expect(setKey).not.toHaveBeenCalled();
  });

  it('saveApiKey : dégradé sans consentement → bloque + flag', async () => {
    vi.mocked(isStorageEncryptable).mockResolvedValue(false);
    const ctx = makeContext({ apiKeyInput: 'sk-x', apiKeyConsentClear: false });
    await config.saveApiKey.call(ctx);
    expect(setKey).not.toHaveBeenCalled();
    expect(ctx.keyStorageDegraded).toBe(true);
  });

  it('saveApiKey (profil) : passe par requireProfilePin', async () => {
    const pin = vi.fn((_id: string, cb: () => void) => cb());
    const ctx = makeContext({
      apiKeyInput: 'sk-x',
      apiKeyScope: 'profile',
      currentProfile: { id: 'p1' },
      requireProfilePin: pin,
      loadMistralVoices: vi.fn(() => Promise.resolve()),
    });
    await config.saveApiKey.call(ctx);
    expect(pin).toHaveBeenCalledWith('p1', expect.any(Function));
    expect(setKey).toHaveBeenCalledWith({ scope: 'profile', profileId: 'p1', plaintext: 'sk-x' });
  });

  it('clearApiKey (global) : clearKey + toast', async () => {
    const ctx = makeContext();
    await config.clearApiKey.call(ctx, 'global');
    expect(clearKey).toHaveBeenCalledWith({ scope: 'global', profileId: undefined });
    expect(ctx.showToast).toHaveBeenCalled();
  });

  it('testApiKey : clé vide → missing', async () => {
    const ctx = makeContext({ apiKeyInput: '' });
    await config.testApiKey.call(ctx);
    expect(ctx.keyTestStatus).toBe('missing');
  });

  it('testApiKey : succès → status serveur', async () => {
    mockFetchOk({ status: 'ok' });
    const ctx = makeContext({ apiKeyInput: 'sk-x' });
    await config.testApiKey.call(ctx);
    expect(ctx.keyTestStatus).toBe('ok');
  });

  it('testApiKey : fetch throw → network', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('down'));
    const ctx = makeContext({ apiKeyInput: 'sk-x' });
    await config.testApiKey.call(ctx);
    expect(ctx.keyTestStatus).toBe('network');
  });
});

// --- openSettings (gate PIN parental) ---

describe('openSettings', () => {
  const makeOpenCtx = (overrides: any = {}) =>
    makeContext({
      $refs: { settingsDialog: { showModal: vi.fn(), close: vi.fn() } },
      refreshIcons: vi.fn(),
      requireProfilePin: vi.fn((_id: string, cb: () => void) => cb()),
      currentProfile: null,
      ...overrides,
    });

  it('ouvre directement le dialog sans profil courant', () => {
    const ctx = makeOpenCtx();
    config.openSettings.call(ctx);
    expect(ctx.requireProfilePin).not.toHaveBeenCalled();
    expect(ctx.$refs.settingsDialog.showModal).toHaveBeenCalled();
    expect(ctx.refreshIcons).toHaveBeenCalled();
  });

  it('passe par requireProfilePin quand un profil est actif', () => {
    const ctx = makeOpenCtx({ currentProfile: { id: 'p1' } });
    config.openSettings.call(ctx);
    expect(ctx.requireProfilePin).toHaveBeenCalledWith('p1', expect.any(Function));
    // requireProfilePin mocké exécute le callback → le dialog s'ouvre
    expect(ctx.$refs.settingsDialog.showModal).toHaveBeenCalled();
  });

  it("n'ouvre pas le dialog si le PIN n'est pas validé", () => {
    const ctx = makeOpenCtx({
      currentProfile: { id: 'p1' },
      requireProfilePin: vi.fn(), // n'appelle jamais le callback (PIN refusé)
    });
    config.openSettings.call(ctx);
    expect(ctx.$refs.settingsDialog.showModal).not.toHaveBeenCalled();
  });
});
