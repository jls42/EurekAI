import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import type { AppConfig } from './types.js';
import { type MistralVoice } from './generators/tts-provider.js';

const DEFAULT_CONFIG: AppConfig = {
  models: {
    summary: 'mistral-large-latest',
    flashcards: 'mistral-large-latest',
    quiz: 'mistral-large-latest',
    podcast: 'mistral-large-latest',
    translate: 'mistral-large-latest',
    ocr: 'mistral-ocr-latest',
    quizVerify: 'mistral-large-latest',
    chat: 'mistral-large-latest',
  },
  voices: {
    host: { id: 'JdwJ7jL68CWmQZuo7KgG', name: 'Voix info IA' },
    guest: { id: 'sANWqF1bCMzR6eyZbCGw', name: 'Marie' },
  },
  ttsModel: 'voxtral-mini-tts-latest',
  ttsProvider: 'mistral',
  mistralVoices: {
    // Marie - Excited (host) + Marie - Curious (guest) — voix françaises cohérentes par défaut.
    // Pour d'autres langues, VOICE_SELECTION ci-dessous prend le relais (FR fallback sinon).
    host: '2f62b1af-aea3-4079-9d10-7ca665ee7243',
    guest: 'e0580ce5-e63c-4cbe-88c8-a983b80c5f1f',
  },
};

let configPath: string;
let currentConfig: AppConfig;

export function initConfig(outputDir: string): void {
  mkdirSync(outputDir, { recursive: true });
  configPath = join(outputDir, 'config.json');

  if (existsSync(configPath)) {
    try {
      const saved = JSON.parse(readFileSync(configPath, 'utf-8'));
      currentConfig = {
        ...DEFAULT_CONFIG,
        ...saved,
        models: { ...DEFAULT_CONFIG.models, ...saved.models },
        voices: { ...DEFAULT_CONFIG.voices, ...saved.voices },
        mistralVoices: { ...DEFAULT_CONFIG.mistralVoices, ...saved.mistralVoices },
      };
    } catch (e) {
      console.error('Failed to load config, using defaults:', e);
      currentConfig = { ...DEFAULT_CONFIG };
    }
  } else {
    currentConfig = { ...DEFAULT_CONFIG };
  }
}

export function getConfig(): AppConfig {
  return currentConfig;
}

export function resetConfig(): AppConfig {
  currentConfig = { ...DEFAULT_CONFIG };
  writeFileSync(configPath, JSON.stringify(currentConfig, null, 2));
  return currentConfig;
}

export function saveConfig(partial: Partial<AppConfig>): AppConfig {
  if (partial.models) {
    currentConfig.models = { ...currentConfig.models, ...partial.models };
  }
  if (partial.voices) {
    currentConfig.voices = { ...currentConfig.voices, ...partial.voices };
  }
  if (partial.ttsModel) {
    currentConfig.ttsModel = partial.ttsModel;
  }
  if (partial.ttsProvider) {
    currentConfig.ttsProvider = partial.ttsProvider;
  }
  if (partial.mistralVoices) {
    currentConfig.mistralVoices = { ...currentConfig.mistralVoices, ...partial.mistralVoices };
  }
  writeFileSync(configPath, JSON.stringify(currentConfig, null, 2));
  return currentConfig;
}

export function getApiStatus(): { mistral: boolean; elevenlabs: boolean; ttsAvailable: boolean } {
  const config = currentConfig ?? DEFAULT_CONFIG;
  const hasMistral = !!process.env.MISTRAL_API_KEY;
  const hasElevenlabs = !!process.env.ELEVENLABS_API_KEY;
  return {
    mistral: hasMistral,
    elevenlabs: hasElevenlabs,
    ttsAvailable: config.ttsProvider === 'mistral' ? hasMistral : hasElevenlabs,
  };
}

// --- Model context limits cache ---

let modelLimits: Record<string, number> = {};

export function setModelLimits(limits: Record<string, number>): void { modelLimits = limits; }
export function getModelLimits(): Record<string, number> { return modelLimits; }

// --- Voice cache & language defaults ---

let voiceCache: MistralVoice[] = [];

export function setVoiceCache(voices: MistralVoice[]): void { voiceCache = voices; }
export function getVoiceCache(): MistralVoice[] { return voiceCache; }

const VOICE_SELECTION: Record<string, { host: { speaker: string; tag: string }; guest: { speaker: string; tag: string } }> = {
  fr: { host: { speaker: 'Marie', tag: 'excited' }, guest: { speaker: 'Marie', tag: 'curious' } },
  en: { host: { speaker: 'Jane', tag: 'curious' }, guest: { speaker: 'Oliver', tag: 'cheerful' } },
};

function findVoice(lang: string, criteria: { speaker: string; tag: string }): string | undefined {
  return voiceCache.find(v =>
    v.languages.some(l => l.startsWith(lang)) &&
    v.name.startsWith(criteria.speaker) &&
    v.tags?.includes(criteria.tag),
  )?.id;
}

function resolveLanguageVoiceDefaults(lang?: string): Partial<{ host: string; guest: string }> {
  if (!lang) return {};
  const sel = VOICE_SELECTION[lang];
  if (!sel) return {};
  return {
    host: findVoice(lang, sel.host),
    guest: findVoice(lang, sel.guest),
  };
}

export function resolveVoices(
  config: AppConfig,
  profileVoices?: { host: string; guest: string },
  lang?: string,
): { host: string; guest: string } {
  if (config.ttsProvider !== 'mistral') {
    return { host: config.voices.host.id, guest: config.voices.guest.id };
  }

  const configured = config.mistralVoices;
  const languageDefaults = resolveLanguageVoiceDefaults(lang);
  const preferLanguageHost =
    !!languageDefaults.host &&
    !!lang &&
    lang !== 'fr' &&
    (!configured.host || configured.host === DEFAULT_CONFIG.mistralVoices.host);
  const preferLanguageGuest =
    !!languageDefaults.guest &&
    !!lang &&
    lang !== 'fr' &&
    (!configured.guest || configured.guest === DEFAULT_CONFIG.mistralVoices.guest);

  const defaults = {
    host:
      (preferLanguageHost ? languageDefaults.host : configured.host) ||
      languageDefaults.host ||
      DEFAULT_CONFIG.mistralVoices.host,
    guest:
      (preferLanguageGuest ? languageDefaults.guest : configured.guest) ||
      languageDefaults.guest ||
      DEFAULT_CONFIG.mistralVoices.guest,
  };

  // Merge profile overrides per field (partial overrides supported)
  return {
    host: profileVoices?.host || defaults.host,
    guest: profileVoices?.guest || defaults.guest,
  };
}
