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
  it('returns flag emoji for 2-letter lang with matching voice', () => {
    const ctx = makeContext({
      mistralVoicesList: [{ lang: 'fr', langFull: 'fr_FR' }],
    });
    const result = config.langToFlag.call(ctx, 'fr');
    // FR flag: U+1F1EB U+1F1F7
    expect(result).toBe('\uD83C\uDDEB\uD83C\uDDF7');
  });

  it('returns flag using lang code when no voice found', () => {
    const ctx = makeContext({ mistralVoicesList: [] });
    const result = config.langToFlag.call(ctx, 'us');
    // US flag: U+1F1FA U+1F1F8
    expect(result).toBe('\uD83C\uDDFA\uD83C\uDDF8');
  });

  it('returns empty string for invalid lang', () => {
    const ctx = makeContext({ mistralVoicesList: [] });
    expect(config.langToFlag.call(ctx, '')).toBe('');
    expect(config.langToFlag.call(ctx, 'a')).toBe('');
  });

  it('returns empty for lang where country code is not 2 uppercase letters', () => {
    const ctx = makeContext({
      mistralVoicesList: [{ lang: 'xx', langFull: 'xx_123' }],
    });
    expect(config.langToFlag.call(ctx, 'xx')).toBe('');
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
    expect(sentBody.models.ocr).toBe('mistral-ocr-4-0');
    expect(sentBody._mainModel).toBeUndefined();
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

  it('auto-corrige ttsModel quand un ID eleven_* legacy est présent', async () => {
    const savedConfig = {
      models: { summary: 'mistral-large-latest' },
      ttsModel: 'voxtral-mini-tts-2603',
    };
    mockFetchOk(savedConfig);
    mockFetchOk({ mistral: true, ttsAvailable: true });

    const ctx = makeContext({
      configDraft: {
        ...makeContext().configDraft,
        ttsModel: 'eleven_v3',
        _mainModel: 'mistral-large-latest',
      },
    });
    await config.saveSettings.call(ctx);

    const putCall = vi.mocked(globalThis.fetch).mock.calls[0];
    const sentBody = JSON.parse(putCall[1].body as string);
    expect(sentBody.ttsModel).toBe('voxtral-mini-tts-latest');
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
