import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import type { AppConfig } from './types.js';
import type { MistralVoice } from './helpers/voice-types.js';
import { selectVoices } from './helpers/voice-selection.js';
import { logger } from './helpers/logger.js';

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

  // Migration one-time : classer mistralVoicesSource à partir des IDs existants.
  // Tout config qui match DEFAULT_CONFIG ou LEGACY_DEFAULT_* est 'default', sinon 'user'.
  // Evite d'étendre LEGACY_DEFAULT_* à chaque release qui change le défaut.
  if (!currentConfig.mistralVoicesSource) {
    const isDefault =
      isDefaultHost(currentConfig.mistralVoices.host) &&
      isDefaultGuest(currentConfig.mistralVoices.guest);
    currentConfig.mistralVoicesSource = isDefault ? 'default' : 'user';
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
    const hasExplicitVoiceChange =
      (partial.mistralVoices.host !== undefined &&
        partial.mistralVoices.host !== currentConfig.mistralVoices.host) ||
      (partial.mistralVoices.guest !== undefined &&
        partial.mistralVoices.guest !== currentConfig.mistralVoices.guest);
    currentConfig.mistralVoices = { ...currentConfig.mistralVoices, ...partial.mistralVoices };
    // Un round-trip complet du configDraft ne doit pas transformer une config
    // "default" en override utilisateur si les IDs n'ont pas réellement changé.
    if (partial.mistralVoicesSource !== undefined) {
      currentConfig.mistralVoicesSource = partial.mistralVoicesSource;
    } else if (hasExplicitVoiceChange) {
      currentConfig.mistralVoicesSource = 'user';
    }
  } else if (partial.mistralVoicesSource !== undefined) {
    currentConfig.mistralVoicesSource = partial.mistralVoicesSource;
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

export function setModelLimits(limits: Record<string, number>): void {
  modelLimits = limits;
}
export function getModelLimits(): Record<string, number> {
  return modelLimits;
}

// --- Voice cache & language defaults ---

let voiceCache: MistralVoice[] = [];

export function setVoiceCache(voices: MistralVoice[]): void {
  voiceCache = voices;
}
export function getVoiceCache(): MistralVoice[] {
  return voiceCache;
}

// IDs de voix Mistral qui ont été les defaults avant des releases précédentes.
// Conservé pour la migration mistralVoicesSource (cf. initConfig) : un config.json
// existant avec un de ces IDs est classé 'default', pas 'user'.
const LEGACY_DEFAULT_HOSTS: ReadonlySet<string> = new Set(['e3596645-b1af-469e-b857-f18ddedc7652']);
const LEGACY_DEFAULT_GUESTS: ReadonlySet<string> = new Set([
  '5a271406-039d-46fe-835b-fbbb00eaf08d',
]);

function isDefaultHost(id: string | undefined): boolean {
  return !id || id === DEFAULT_CONFIG.mistralVoices.host || LEGACY_DEFAULT_HOSTS.has(id);
}

function isDefaultGuest(id: string | undefined): boolean {
  return !id || id === DEFAULT_CONFIG.mistralVoices.guest || LEGACY_DEFAULT_GUESTS.has(id);
}

// Résout host + guest via le helper partagé selectVoices, avec logging des fallbacks.
// Retourne null si voiceCache est entièrement vide (cas dégradé).
function resolveMistralDefaults(
  lang: string | undefined,
  profileId: string | undefined,
  flow: string,
): { host: string; guest: string } | null {
  if (!lang) return null;
  const result = selectVoices({ voices: voiceCache, lang, profileId });
  if (!result) {
    logger.warn('voice-selection', `no voice available (lang=${lang}, flow=${flow})`);
    return null;
  }
  if (result.source !== 'lang-match') {
    logger.info(
      'voice-selection',
      `fallback lang_input=${lang} lang_matched=${result.langMatched ?? 'none'} source=${result.source} bucketSize=${result.bucketSize} flow=${flow}`,
    );
  }
  return { host: result.host, guest: result.guest };
}

export function resolveVoices(
  config: AppConfig,
  profileVoices?: { host: string; guest: string },
  lang?: string,
  profileId?: string,
  flow = 'unknown',
): { host: string; guest: string } {
  if (config.ttsProvider !== 'mistral') {
    return { host: config.voices.host.id, guest: config.voices.guest.id };
  }

  const userConfigured = config.mistralVoicesSource === 'user';
  const dynamic = resolveMistralDefaults(lang, profileId, flow);

  // Priorités backend :
  // 1. override par profil (per-field)
  // 2. override global explicite (mistralVoicesSource === 'user')
  // 3. sélection dynamique via selectVoices (9 langues UI)
  // 4. fallback legacy DEFAULT_CONFIG.mistralVoices si voiceCache vide
  const globalHost = userConfigured ? config.mistralVoices.host : undefined;
  const globalGuest = userConfigured ? config.mistralVoices.guest : undefined;

  const hostFallback =
    dynamic?.host || config.mistralVoices.host || DEFAULT_CONFIG.mistralVoices.host;
  const guestFallback =
    dynamic?.guest || config.mistralVoices.guest || DEFAULT_CONFIG.mistralVoices.guest;

  return {
    host: profileVoices?.host || globalHost || hostFallback,
    guest: profileVoices?.guest || globalGuest || guestFallback,
  };
}
