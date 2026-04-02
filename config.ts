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
    host: 'e3596645-b1af-469e-b857-f18ddedc7652',
    guest: '5a271406-039d-46fe-835b-fbbb00eaf08d',
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
    } catch {
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

export function resolveVoices(
  config: AppConfig,
  profileVoices?: { host: string; guest: string },
  lang?: string,
): { host: string; guest: string } {
  if (config.ttsProvider !== 'mistral') {
    return { host: config.voices.host.id, guest: config.voices.guest.id };
  }

  // Resolve defaults: tier 2 = global config (user settings), tier 3 = language defaults
  let defaults: { host: string; guest: string } = config.mistralVoices;
  if (lang && (!defaults.host || !defaults.guest)) {
    const sel = VOICE_SELECTION[lang];
    if (sel) {
      const h = findVoice(lang, sel.host);
      const g = findVoice(lang, sel.guest);
      if (h && g) defaults = { host: defaults.host || h, guest: defaults.guest || g };
    }
  }

  // Merge profile overrides per field (partial overrides supported)
  return {
    host: profileVoices?.host || defaults.host,
    guest: profileVoices?.guest || defaults.guest,
  };
}
