import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import {
  initConfig,
  getConfig,
  saveConfig,
  getApiStatus,
  resetConfig,
  resolveVoices,
  setVoiceCache,
} from './config.js';
import { logger } from './helpers/logger.js';
import { asVoiceId } from './helpers/voice-types.js';
import type { AppConfig } from './types.js';

let tempDir: string;

const FALLBACK_HOST = '2f62b1af-aea3-4079-9d10-7ca665ee7243';
const FALLBACK_GUEST = 'e0580ce5-e63c-4cbe-88c8-a983b80c5f1f';

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'eurekai-config-'));
  setVoiceCache([]);
});

afterEach(() => {
  rmSync(tempDir, { recursive: true, force: true });
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
  setVoiceCache([]);
});

describe('initConfig', () => {
  it('sans fichier existant retourne config par defaut sans voix globales', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    expect(cfg.models.summary).toBe('mistral-large-latest');
    expect(cfg.models.quizVerify).toBe('mistral-large-latest');
    expect(cfg.ttsModel).toBe('voxtral-mini-tts-latest');
    expect(cfg).not.toHaveProperty('mistralVoices');
    expect(cfg).not.toHaveProperty('mistralVoicesSource');
  });

  it('migration 2026-04 : ttsProvider legacy et ttsModel eleven_* sont normalisés vers Mistral', () => {
    writeFileSync(
      join(tempDir, 'config.json'),
      JSON.stringify({
        ttsProvider: 'elevenlabs',
        ttsModel: 'eleven_v3',
        voices: { host: { id: 'old', name: 'old' }, guest: { id: 'old', name: 'old' } },
      }),
    );
    initConfig(tempDir);
    const cfg = getConfig() as AppConfig & { ttsProvider?: string; voices?: unknown };
    expect(cfg.ttsProvider).toBeUndefined();
    expect(cfg.voices).toBeUndefined();
    expect(cfg.ttsModel).toBe('voxtral-mini-tts-latest');
    const onDisk = JSON.parse(readFileSync(join(tempDir, 'config.json'), 'utf-8'));
    expect(onDisk.ttsProvider).toBeUndefined();
    expect(onDisk.voices).toBeUndefined();
    expect(onDisk.ttsModel).toBe('voxtral-mini-tts-latest');
  });

  it('migration one-time: supprime les anciennes voix globales du config.json', () => {
    writeFileSync(
      join(tempDir, 'config.json'),
      JSON.stringify({
        models: { summary: 'custom-model' },
        mistralVoices: { host: 'old-host', guest: 'old-guest' },
        mistralVoicesSource: 'user',
      }),
    );
    initConfig(tempDir);
    const cfg = getConfig() as AppConfig & {
      mistralVoices?: unknown;
      mistralVoicesSource?: unknown;
    };
    expect(cfg.models.summary).toBe('custom-model');
    expect(cfg.mistralVoices).toBeUndefined();
    expect(cfg.mistralVoicesSource).toBeUndefined();
    const onDisk = JSON.parse(readFileSync(join(tempDir, 'config.json'), 'utf-8'));
    expect(onDisk.mistralVoices).toBeUndefined();
    expect(onDisk.mistralVoicesSource).toBeUndefined();
  });

  it('avec fichier existant merge avec les defauts', () => {
    writeFileSync(
      join(tempDir, 'config.json'),
      JSON.stringify({ models: { summary: 'custom-model' } }),
    );
    initConfig(tempDir);
    const cfg = getConfig();
    expect(cfg.models.summary).toBe('custom-model');
    expect(cfg.models.quiz).toBe('mistral-large-latest');
  });

  it('fichier JSON invalide: fallback in-memory DEFAULT + disque préservé + log error', () => {
    const errSpy = vi.spyOn(logger, 'error').mockImplementation(() => {});
    writeFileSync(join(tempDir, 'config.json'), '{invalid json');
    initConfig(tempDir);
    expect(getConfig().models.summary).toBe('mistral-large-latest');
    expect(getConfig().ttsModel).toBe('voxtral-mini-tts-latest');
    expect(readFileSync(join(tempDir, 'config.json'), 'utf-8')).toBe('{invalid json');
    expect(errSpy).toHaveBeenCalledWith(
      'config',
      expect.stringContaining('Failed to parse'),
      expect.any(SyntaxError),
    );
  });

  it('fichier corrompu + saveConfig: .corrupt.bak créé avant overwrite, une seule fois', () => {
    const corruptContent = '{invalid json but user data inside}';
    const configPath = join(tempDir, 'config.json');
    const backupPath = `${configPath}.corrupt.bak`;
    writeFileSync(configPath, corruptContent);
    vi.spyOn(logger, 'error').mockImplementation(() => {});
    initConfig(tempDir);
    expect(existsSync(backupPath)).toBe(false);
    saveConfig({ ttsModel: 'voxtral-mini-tts-latest' });
    expect(existsSync(backupPath)).toBe(true);
    expect(readFileSync(backupPath, 'utf-8')).toBe(corruptContent);
    expect(JSON.parse(readFileSync(configPath, 'utf-8')).ttsModel).toBe('voxtral-mini-tts-latest');
    writeFileSync(backupPath, 'this should NOT be overwritten');
    saveConfig({ ttsModel: 'other' });
    expect(readFileSync(backupPath, 'utf-8')).toBe('this should NOT be overwritten');
  });

  it('migration partielle: voices seul legacy → removed, ttsModel intouché', () => {
    writeFileSync(
      join(tempDir, 'config.json'),
      JSON.stringify({
        voices: { host: { id: 'x', name: 'x' }, guest: { id: 'y', name: 'y' } },
        ttsModel: 'voxtral-mini-tts-latest',
      }),
    );
    initConfig(tempDir);
    const cfg = getConfig() as AppConfig & { voices?: unknown };
    expect(cfg.voices).toBeUndefined();
    expect(cfg.ttsModel).toBe('voxtral-mini-tts-latest');
    const onDisk = JSON.parse(readFileSync(join(tempDir, 'config.json'), 'utf-8'));
    expect(onDisk.voices).toBeUndefined();
  });

  it("migration partielle: ttsModel 'eleven_*' seul → reset", () => {
    writeFileSync(
      join(tempDir, 'config.json'),
      JSON.stringify({ ttsModel: 'eleven_multilingual_v2' }),
    );
    initConfig(tempDir);
    expect(getConfig().ttsModel).toBe('voxtral-mini-tts-latest');
  });

  it('idempotent double-boot: aucune réécriture quand config est déjà migré', () => {
    writeFileSync(join(tempDir, 'config.json'), JSON.stringify({ models: { summary: 'custom' } }));
    initConfig(tempDir);
    const content1 = readFileSync(join(tempDir, 'config.json'), 'utf-8');
    initConfig(tempDir);
    const content2 = readFileSync(join(tempDir, 'config.json'), 'utf-8');
    expect(content2).toBe(content1);
  });

  it('shape hostile: saved.models = null → fallback DEFAULT sans crash', () => {
    writeFileSync(join(tempDir, 'config.json'), JSON.stringify({ models: null }));
    initConfig(tempDir);
    expect(getConfig().models.chat).toBe('mistral-large-latest');
    expect(getConfig().models.summary).toBe('mistral-large-latest');
  });

  it('shape hostile: saved.models = string → fallback DEFAULT', () => {
    writeFileSync(join(tempDir, 'config.json'), JSON.stringify({ models: 'haxor' }));
    initConfig(tempDir);
    expect(getConfig().models.chat).toBe('mistral-large-latest');
  });

  it('shape hostile: saved.models = array → fallback DEFAULT', () => {
    writeFileSync(join(tempDir, 'config.json'), JSON.stringify({ models: ['a', 'b'] }));
    initConfig(tempDir);
    expect(getConfig().models.chat).toBe('mistral-large-latest');
  });

  it('shape hostile: saved = array au top-level → fallback DEFAULT', () => {
    writeFileSync(join(tempDir, 'config.json'), JSON.stringify([1, 2, 3]));
    initConfig(tempDir);
    expect(getConfig().ttsModel).toBe('voxtral-mini-tts-latest');
  });
});

describe('getConfig', () => {
  it('retourne la config courante apres init', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    expect(cfg).toHaveProperty('models');
    expect(cfg).toHaveProperty('ttsModel');
    expect(cfg).not.toHaveProperty('mistralVoices');
  });
});

describe('saveConfig', () => {
  it('merge partiel models et persiste sur disque', () => {
    initConfig(tempDir);
    saveConfig({ models: { summary: 'new-model' } as any });
    const cfg = getConfig();
    expect(cfg.models.summary).toBe('new-model');
    expect(cfg.models.quiz).toBe('mistral-large-latest');
    const onDisk = JSON.parse(readFileSync(join(tempDir, 'config.json'), 'utf-8'));
    expect(onDisk.models.summary).toBe('new-model');
  });

  it('ignore les anciennes voix globales postées par un vieux client', () => {
    initConfig(tempDir);
    saveConfig({
      mistralVoices: { host: 'new-host-voice', guest: 'new-guest-voice' },
      mistralVoicesSource: 'user',
    } as Partial<AppConfig>);
    const cfg = getConfig() as AppConfig & {
      mistralVoices?: unknown;
      mistralVoicesSource?: unknown;
    };
    expect(cfg.mistralVoices).toBeUndefined();
    expect(cfg.mistralVoicesSource).toBeUndefined();
    const onDisk = JSON.parse(readFileSync(join(tempDir, 'config.json'), 'utf-8'));
    expect(onDisk.mistralVoices).toBeUndefined();
    expect(onDisk.mistralVoicesSource).toBeUndefined();
  });

  it("rejette ttsModel legacy 'eleven_*' POST et preserve la valeur courante", () => {
    initConfig(tempDir);
    saveConfig({ ttsModel: 'voxtral-custom' });
    expect(getConfig().ttsModel).toBe('voxtral-custom');
    const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {});
    saveConfig({ ttsModel: 'eleven_v3' });
    expect(getConfig().ttsModel).toBe('voxtral-custom');
    expect(warnSpy).toHaveBeenCalledWith(
      'config',
      expect.stringContaining("rejected legacy ttsModel 'eleven_v3'"),
    );
  });
});

describe('getApiStatus', () => {
  it('detecte MISTRAL_API_KEY presente', () => {
    vi.stubEnv('MISTRAL_API_KEY', 'test-key');
    const status = getApiStatus();
    expect(status.mistral).toBe(true);
    expect(status.ttsAvailable).toBe(true);
  });

  it('detecte MISTRAL_API_KEY absente', () => {
    vi.stubEnv('MISTRAL_API_KEY', '');
    const status = getApiStatus();
    expect(status.mistral).toBe(false);
    expect(status.ttsAvailable).toBe(false);
  });

  it('invariant: ttsAvailable === mistral (provider TTS unique)', () => {
    vi.stubEnv('MISTRAL_API_KEY', 'test-key');
    const s1 = getApiStatus();
    expect(s1.ttsAvailable).toBe(s1.mistral);
    vi.stubEnv('MISTRAL_API_KEY', '');
    const s2 = getApiStatus();
    expect(s2.ttsAvailable).toBe(s2.mistral);
  });

  it('voiceCacheReady reflète le succès du warmup listVoices', () => {
    setVoiceCache([]);
    expect(getApiStatus().voiceCacheReady).toBe(false);
    setVoiceCache([{ id: asVoiceId('v1'), name: 'V1', languages: ['fr_FR'] }]);
    expect(getApiStatus().voiceCacheReady).toBe(true);
    setVoiceCache([]);
    expect(getApiStatus().voiceCacheReady).toBe(false);
  });
});

describe('resetConfig', () => {
  it('remet les valeurs par defaut et persiste', () => {
    initConfig(tempDir);
    saveConfig({ models: { summary: 'custom' } as any });
    const reset = resetConfig();
    expect(reset.models.summary).toBe('mistral-large-latest');
    const onDisk = JSON.parse(readFileSync(join(tempDir, 'config.json'), 'utf-8'));
    expect(onDisk.models.summary).toBe('mistral-large-latest');
    expect(onDisk.mistralVoices).toBeUndefined();
  });
});

describe('resolveVoices', () => {
  it('fallback interne quand cache vide', () => {
    expect(resolveVoices(undefined, 'fr')).toEqual({
      host: FALLBACK_HOST,
      guest: FALLBACK_GUEST,
    });
  });

  it('retourne les voix du profil si definies', () => {
    const profileVoices = {
      host: asVoiceId('profile-host-id'),
      guest: asVoiceId('profile-guest-id'),
    };
    expect(resolveVoices(profileVoices, 'fr')).toEqual(profileVoices);
  });

  it('selectionne les voix de la langue quand le profil ne force rien', () => {
    setVoiceCache([
      {
        id: asVoiceId('marie-excited'),
        name: 'Marie - Excited',
        languages: ['fr_fr'],
        tags: ['excited'],
        gender: 'female',
      },
      {
        id: asVoiceId('marie-curious'),
        name: 'Marie - Curious',
        languages: ['fr_fr'],
        tags: ['curious'],
        gender: 'female',
      },
    ]);
    expect(resolveVoices(undefined, 'fr')).toEqual({
      host: 'marie-excited',
      guest: 'marie-curious',
    });
  });

  it('fallback EN pour une langue sans bucket dédié', () => {
    setVoiceCache([
      {
        id: asVoiceId('jane-confident'),
        name: 'Jane - Confident',
        languages: ['en_gb'],
        tags: ['confident'],
        gender: 'female',
      },
      {
        id: asVoiceId('oliver-curious'),
        name: 'Oliver - Curious',
        languages: ['en_gb'],
        tags: ['curious'],
      },
    ]);
    expect(resolveVoices(undefined, 'es')).toEqual({
      host: 'jane-confident',
      guest: 'oliver-curious',
    });
  });

  it('merge voix profil partielles: host custom + guest dynamique', () => {
    setVoiceCache([
      {
        id: asVoiceId('jane-curious'),
        name: 'Jane - Curious',
        languages: ['en_gb'],
        tags: ['curious'],
        gender: 'female',
      },
      {
        id: asVoiceId('oliver-cheerful'),
        name: 'Oliver - Cheerful',
        languages: ['en_gb'],
        tags: ['cheerful'],
      },
    ]);
    const voices = resolveVoices({ host: asVoiceId('only-host') }, 'en');
    expect(voices).toEqual({ host: 'only-host', guest: 'jane-curious' });
  });

  it('merge voix profil partielles: guest custom + host fallback interne', () => {
    const voices = resolveVoices({ guest: asVoiceId('only-guest') }, 'fr');
    expect(voices).toEqual({ host: FALLBACK_HOST, guest: 'only-guest' });
  });

  it('profile voices overrident les defaults même avec lang EN et cache rempli', () => {
    setVoiceCache([
      {
        id: asVoiceId('jane-curious'),
        name: 'Jane - Curious',
        languages: ['en_gb'],
        tags: ['curious'],
      },
      {
        id: asVoiceId('oliver-cheerful'),
        name: 'Oliver - Cheerful',
        languages: ['en_gb'],
        tags: ['cheerful'],
      },
    ]);
    const voices = resolveVoices(
      { host: asVoiceId('custom-h'), guest: asVoiceId('custom-g') },
      'en',
    );
    expect(voices).toEqual({ host: 'custom-h', guest: 'custom-g' });
  });
});
