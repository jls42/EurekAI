import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { initConfig, getConfig, saveConfig, getApiStatus, resetConfig, resolveVoices, setVoiceCache } from './config.js';

let tempDir: string;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'eurekai-config-'));
});

afterEach(() => {
  rmSync(tempDir, { recursive: true, force: true });
  vi.unstubAllEnvs();
});

describe('initConfig', () => {
  it('sans fichier existant retourne config par defaut', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    expect(cfg.models.summary).toBe('mistral-large-latest');
    expect(cfg.models.quizVerify).toBe('mistral-large-latest');
    expect(cfg.ttsModel).toBe('voxtral-mini-tts-latest');
    expect(cfg.ttsProvider).toBe('mistral');
  });

  it('avec fichier existant merge avec les defauts', () => {
    writeFileSync(
      join(tempDir, 'config.json'),
      JSON.stringify({ models: { summary: 'custom-model' } }),
    );
    initConfig(tempDir);
    const cfg = getConfig();
    expect(cfg.models.summary).toBe('custom-model');
    expect(cfg.models.quiz).toBe('mistral-large-latest'); // defaut preserve
  });

  it('fichier JSON invalide fallback sur defaut', () => {
    writeFileSync(join(tempDir, 'config.json'), 'not json{{{');
    initConfig(tempDir);
    const cfg = getConfig();
    expect(cfg.models.summary).toBe('mistral-large-latest');
  });
});

describe('getConfig', () => {
  it('retourne la config courante apres init', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    expect(cfg).toHaveProperty('models');
    expect(cfg).toHaveProperty('voices');
    expect(cfg).toHaveProperty('ttsModel');
  });
});

describe('saveConfig', () => {
  it('merge partiel models et persiste sur disque', () => {
    initConfig(tempDir);
    saveConfig({ models: { summary: 'new-model' } as any });
    const cfg = getConfig();
    expect(cfg.models.summary).toBe('new-model');
    expect(cfg.models.quiz).toBe('mistral-large-latest'); // non ecrase

    const onDisk = JSON.parse(readFileSync(join(tempDir, 'config.json'), 'utf-8'));
    expect(onDisk.models.summary).toBe('new-model');
  });

  it('merge partiel voices', () => {
    initConfig(tempDir);
    saveConfig({ voices: { host: { id: 'new-id', name: 'Nouvelle voix' } } as any });
    const cfg = getConfig();
    expect(cfg.voices.host.id).toBe('new-id');
    expect(cfg.voices.guest.name).toBeTruthy(); // guest preserve
  });
});

describe('getApiStatus', () => {
  it('detecte les cles API presentes', () => {
    vi.stubEnv('MISTRAL_API_KEY', 'test-key');
    vi.stubEnv('ELEVENLABS_API_KEY', 'test-key-2');
    const status = getApiStatus();
    expect(status.mistral).toBe(true);
    expect(status.elevenlabs).toBe(true);
  });

  it('detecte les cles API absentes', () => {
    vi.stubEnv('MISTRAL_API_KEY', '');
    vi.stubEnv('ELEVENLABS_API_KEY', '');
    const status = getApiStatus();
    expect(status.mistral).toBe(false);
    expect(status.elevenlabs).toBe(false);
  });

  it('ttsAvailable vrai quand provider mistral et MISTRAL_API_KEY presente', () => {
    initConfig(tempDir);
    saveConfig({ ttsProvider: 'mistral' });
    vi.stubEnv('MISTRAL_API_KEY', 'test-key');
    vi.stubEnv('ELEVENLABS_API_KEY', '');
    const status = getApiStatus();
    expect(status.ttsAvailable).toBe(true);
  });

  it('ttsAvailable faux quand provider mistral et MISTRAL_API_KEY absente', () => {
    initConfig(tempDir);
    saveConfig({ ttsProvider: 'mistral' });
    vi.stubEnv('MISTRAL_API_KEY', '');
    vi.stubEnv('ELEVENLABS_API_KEY', 'test-key');
    const status = getApiStatus();
    expect(status.ttsAvailable).toBe(false);
  });

  it('ttsAvailable vrai quand provider elevenlabs et ELEVENLABS_API_KEY presente', () => {
    initConfig(tempDir);
    saveConfig({ ttsProvider: 'elevenlabs' });
    vi.stubEnv('MISTRAL_API_KEY', '');
    vi.stubEnv('ELEVENLABS_API_KEY', 'test-key');
    const status = getApiStatus();
    expect(status.ttsAvailable).toBe(true);
  });

  it('ttsAvailable faux quand provider elevenlabs et ELEVENLABS_API_KEY absente', () => {
    initConfig(tempDir);
    saveConfig({ ttsProvider: 'elevenlabs' });
    vi.stubEnv('MISTRAL_API_KEY', 'test-key');
    vi.stubEnv('ELEVENLABS_API_KEY', '');
    const status = getApiStatus();
    expect(status.ttsAvailable).toBe(false);
  });
});

describe('resetConfig', () => {
  it('remet les valeurs par defaut et persiste', () => {
    initConfig(tempDir);
    saveConfig({ models: { summary: 'custom' } as any });
    const reset = resetConfig();
    expect(reset.models.summary).toBe('mistral-large-latest');
    // Check persisted on disk
    const onDisk = JSON.parse(readFileSync(join(tempDir, 'config.json'), 'utf-8'));
    expect(onDisk.models.summary).toBe('mistral-large-latest');
  });
});

describe('resolveVoices', () => {
  it('retourne mistralVoices quand provider est mistral (tier 2 global config)', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    cfg.ttsProvider = 'mistral';
    const voices = resolveVoices(cfg);
    expect(voices).toEqual(cfg.mistralVoices);
  });

  it('retourne elevenlabs voices quand provider est elevenlabs', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    cfg.ttsProvider = 'elevenlabs';
    const voices = resolveVoices(cfg);
    expect(voices).toEqual({ host: cfg.voices.host.id, guest: cfg.voices.guest.id });
  });

  it('ignore les voix profil quand provider est elevenlabs', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    cfg.ttsProvider = 'elevenlabs';
    const voices = resolveVoices(cfg, { host: 'mistral-host', guest: 'mistral-guest' }, 'fr');
    expect(voices).toEqual({ host: cfg.voices.host.id, guest: cfg.voices.guest.id });
  });

  it('tier 1: retourne les voix du profil si definies', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    cfg.ttsProvider = 'mistral';
    const profileVoices = { host: 'profile-host-id', guest: 'profile-guest-id' };
    expect(resolveVoices(cfg, profileVoices, 'fr')).toEqual(profileVoices);
  });

  it('tier 2: retourne config globale meme si cache de voix rempli (settings utilisateur prioritaires)', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    cfg.ttsProvider = 'mistral';
    setVoiceCache([
      { id: 'marie-excited', name: 'Marie - Excited', languages: ['fr_fr'], tags: ['excited'] },
      { id: 'marie-curious', name: 'Marie - Curious', languages: ['fr_fr'], tags: ['curious'] },
    ]);
    const voices = resolveVoices(cfg, undefined, 'fr');
    expect(voices).toEqual(cfg.mistralVoices);
    setVoiceCache([]); // cleanup
  });

  it('tier 2: retourne config globale meme si cache EN rempli', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    cfg.ttsProvider = 'mistral';
    setVoiceCache([
      { id: 'jane-curious', name: 'Jane - Curious', languages: ['en_gb'], tags: ['curious'] },
      { id: 'oliver-cheerful', name: 'Oliver - Cheerful', languages: ['en_gb'], tags: ['cheerful'] },
    ]);
    const voices = resolveVoices(cfg, undefined, 'en');
    expect(voices).toEqual({ host: 'jane-curious', guest: 'oliver-cheerful' });
    setVoiceCache([]); // cleanup
  });

  it('preserve config globale custom pour EN si utilisateur a override les voix', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    cfg.ttsProvider = 'mistral';
    cfg.mistralVoices = { host: 'custom-host', guest: 'custom-guest' };
    setVoiceCache([
      { id: 'jane-curious', name: 'Jane - Curious', languages: ['en_gb'], tags: ['curious'] },
      { id: 'oliver-cheerful', name: 'Oliver - Cheerful', languages: ['en_gb'], tags: ['cheerful'] },
    ]);
    const voices = resolveVoices(cfg, undefined, 'en');
    expect(voices).toEqual({ host: 'custom-host', guest: 'custom-guest' });
    setVoiceCache([]); // cleanup
  });

  it('tier 3: fallback langue si config globale vide et cache rempli', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    cfg.ttsProvider = 'mistral';
    cfg.mistralVoices = { host: '', guest: '' };
    setVoiceCache([
      { id: 'marie-excited', name: 'Marie - Excited', languages: ['fr_fr'], tags: ['excited'] },
      { id: 'marie-curious', name: 'Marie - Curious', languages: ['fr_fr'], tags: ['curious'] },
    ]);
    const voices = resolveVoices(cfg, undefined, 'fr');
    expect(voices).toEqual({ host: 'marie-excited', guest: 'marie-curious' });
    setVoiceCache([]); // cleanup
  });

  it('tier 3: fallback config globale si cache vide', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    cfg.ttsProvider = 'mistral';
    setVoiceCache([]);
    const voices = resolveVoices(cfg, undefined, 'fr');
    expect(voices).toEqual(cfg.mistralVoices);
  });

  it('merge voix profil partielles (host seul → host custom + guest default)', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    cfg.ttsProvider = 'mistral';
    setVoiceCache([]);
    const partial = { host: 'only-host', guest: '' };
    const voices = resolveVoices(cfg, partial, 'fr');
    expect(voices).toEqual({ host: 'only-host', guest: cfg.mistralVoices.guest });
  });

  it('merge voix profil partielles (guest seul → host default + guest custom)', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    cfg.ttsProvider = 'mistral';
    setVoiceCache([]);
    const partial = { host: '', guest: 'only-guest' };
    const voices = resolveVoices(cfg, partial, 'fr');
    expect(voices).toEqual({ host: cfg.mistralVoices.host, guest: 'only-guest' });
  });

  it('combine override partiel utilisateur + fallback langue pour champ restant', () => {
    initConfig(tempDir);
    const cfg = getConfig();
    cfg.ttsProvider = 'mistral';
    const defaultGuest = cfg.mistralVoices.guest;
    cfg.mistralVoices = { host: 'custom-host', guest: defaultGuest };
    setVoiceCache([
      { id: 'jane-curious', name: 'Jane - Curious', languages: ['en_gb'], tags: ['curious'] },
      { id: 'oliver-cheerful', name: 'Oliver - Cheerful', languages: ['en_gb'], tags: ['cheerful'] },
    ]);
    const voices = resolveVoices(cfg, undefined, 'en');
    expect(voices).toEqual({ host: 'custom-host', guest: 'oliver-cheerful' });
    setVoiceCache([]); // cleanup
  });
});

describe('saveConfig (additional fields)', () => {
  it('persiste ttsModel', () => {
    initConfig(tempDir);
    saveConfig({ ttsModel: 'custom-tts-model' });
    const cfg = getConfig();
    expect(cfg.ttsModel).toBe('custom-tts-model');
    const onDisk = JSON.parse(readFileSync(join(tempDir, 'config.json'), 'utf-8'));
    expect(onDisk.ttsModel).toBe('custom-tts-model');
  });

  it('persiste ttsProvider', () => {
    initConfig(tempDir);
    saveConfig({ ttsProvider: 'elevenlabs' });
    const cfg = getConfig();
    expect(cfg.ttsProvider).toBe('elevenlabs');
    const onDisk = JSON.parse(readFileSync(join(tempDir, 'config.json'), 'utf-8'));
    expect(onDisk.ttsProvider).toBe('elevenlabs');
  });

  it('merge partiel mistralVoices', () => {
    initConfig(tempDir);
    saveConfig({ mistralVoices: { host: 'new-host-voice' } as any });
    const cfg = getConfig();
    expect(cfg.mistralVoices.host).toBe('new-host-voice');
    expect(cfg.mistralVoices.guest).toBeTruthy(); // guest preserve
    const onDisk = JSON.parse(readFileSync(join(tempDir, 'config.json'), 'utf-8'));
    expect(onDisk.mistralVoices.host).toBe('new-host-voice');
  });
});
