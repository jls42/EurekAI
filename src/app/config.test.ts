import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createConfig } from './config';

globalThis.fetch = vi.fn();

// Polyfill structuredClone for vitest/jsdom if missing
if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));
}

const config = createConfig();

function makeContext(overrides: any = {}) {
  return {
    apiStatus: { mistral: false, elevenlabs: false, ttsAvailable: false },
    mistralVoicesList: [] as any[],
    configDraft: {
      models: { summary: '', flashcards: '', quiz: '', podcast: '', translate: '', ocr: '' },
      voices: { host: { id: '', name: '' }, guest: { id: '', name: '' } },
      ttsModel: 'voxtral-mini-tts-2603',
      ttsProvider: 'mistral',
      mistralVoices: { host: 'Oliver', guest: 'Marie' },
      _mainModel: 'mistral-large-latest',
    } as any,
    t: vi.fn((key: string) => key),
    showToast: vi.fn(),
    $refs: { settingsDialog: { close: vi.fn() } },
    loadConfig: config.loadConfig,
    loadMistralVoices: config.loadMistralVoices,
    translateEmotion: config.translateEmotion,
    langToFlag: config.langToFlag,
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
      ttsProvider: 'mistral',
    };
    const statusData = { mistral: true, elevenlabs: false, ttsAvailable: true };
    const voicesData = [
      { id: 'v1', name: 'Oliver - Neutral', languages: ['en_US'] },
    ];

    // loadConfig calls: config, status (parallel), then loadMistralVoices (voices)
    mockFetchOk(configData);      // /api/config
    mockFetchOk(statusData);      // /api/config/status
    mockFetchOk(voicesData);      // /api/config/voices (called by loadMistralVoices)

    const ctx = makeContext();
    await config.loadConfig.call(ctx);

    expect(ctx.apiStatus).toEqual(statusData);
    expect(ctx.configDraft.ttsModel).toBe('voxtral-mini-tts-2603');
    expect(ctx.configDraft._mainModel).toBe('mistral-large-latest');
    expect(ctx.mistralVoicesList).toHaveLength(1);
  });

  it('handles fetch failure gracefully', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValue(new Error('Network'));
    const ctx = makeContext();
    // Should not throw
    await config.loadConfig.call(ctx);
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
      speaker: 'Oliver',
      emotion: 'Neutral',
      lang: 'en',
      langFull: 'en_US',
    });

    expect(ctx.mistralVoicesList[1]).toEqual({
      id: 'v2',
      name: 'Marie - Joyful',
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
      ttsProvider: 'mistral',
    };
    const statusData = { mistral: true, elevenlabs: false, ttsAvailable: true };
    mockFetchOk(savedConfig);     // PUT /api/config
    mockFetchOk(statusData);      // GET /api/config/status

    const ctx = makeContext();
    await config.saveSettings.call(ctx);

    // Verify models were set from _mainModel
    const putCall = vi.mocked(globalThis.fetch).mock.calls[0];
    expect(putCall[0]).toBe('/api/config');
    const sentBody = JSON.parse(putCall[1].body as string);
    expect(sentBody.models.summary).toBe('mistral-large-latest');
    expect(sentBody.models.ocr).toBe('mistral-ocr-latest');

    expect(ctx.showToast).toHaveBeenCalledWith('toast.settingsSaved', 'success');
    expect(ctx.$refs.settingsDialog.close).toHaveBeenCalled();
    expect(ctx.apiStatus).toEqual(statusData);
  });

  it('auto-corrects ttsModel: mistral provider with eleven model', async () => {
    const savedConfig = { models: { summary: 'mistral-large-latest' }, ttsModel: 'voxtral-mini-tts-2603', ttsProvider: 'mistral' };
    mockFetchOk(savedConfig);
    mockFetchOk({ mistral: true, elevenlabs: false, ttsAvailable: true });

    const ctx = makeContext({
      configDraft: {
        ...makeContext().configDraft,
        ttsProvider: 'mistral',
        ttsModel: 'eleven_v3',
        _mainModel: 'mistral-large-latest',
      },
    });
    await config.saveSettings.call(ctx);

    const putCall = vi.mocked(globalThis.fetch).mock.calls[0];
    const sentBody = JSON.parse(putCall[1].body as string);
    expect(sentBody.ttsModel).toBe('voxtral-mini-tts-2603');
  });

  it('auto-corrects ttsModel: elevenlabs provider with voxtral model', async () => {
    const savedConfig = { models: { summary: 'mistral-large-latest' }, ttsModel: 'eleven_v3', ttsProvider: 'elevenlabs' };
    mockFetchOk(savedConfig);
    mockFetchOk({ mistral: true, elevenlabs: true, ttsAvailable: true });

    const ctx = makeContext({
      configDraft: {
        ...makeContext().configDraft,
        ttsProvider: 'elevenlabs',
        ttsModel: 'voxtral-mini-tts-2603',
        _mainModel: 'mistral-large-latest',
      },
    });
    await config.saveSettings.call(ctx);

    const putCall = vi.mocked(globalThis.fetch).mock.calls[0];
    const sentBody = JSON.parse(putCall[1].body as string);
    expect(sentBody.ttsModel).toBe('eleven_v3');
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
      ttsProvider: 'mistral',
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
