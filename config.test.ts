import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { initConfig, getConfig, saveConfig, getApiStatus } from './config.js';

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
    expect(cfg.ttsModel).toBe('voxtral-mini-tts-2603');
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
});
