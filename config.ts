import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import type { AppConfig } from './types.js';
import type { MistralVoice } from './helpers/voice-types.js';
import { selectVoices } from './helpers/voice-selection.js';
import { logger } from './helpers/logger.js';

const MISTRAL_LARGE_LATEST = 'mistral-large-latest';

const DEFAULT_CONFIG: AppConfig = {
  models: {
    summary: MISTRAL_LARGE_LATEST,
    flashcards: MISTRAL_LARGE_LATEST,
    quiz: MISTRAL_LARGE_LATEST,
    podcast: MISTRAL_LARGE_LATEST,
    translate: MISTRAL_LARGE_LATEST,
    ocr: 'mistral-ocr-latest',
    quizVerify: MISTRAL_LARGE_LATEST,
    chat: MISTRAL_LARGE_LATEST,
  },
  ttsModel: 'voxtral-mini-tts-latest',
  mistralVoices: {
    // Marie - Excited (host) + Marie - Curious (guest) — voix françaises cohérentes par défaut.
    // Pour d'autres langues, VOICE_SELECTION ci-dessous prend le relais (FR fallback sinon).
    host: '2f62b1af-aea3-4079-9d10-7ca665ee7243',
    guest: 'e0580ce5-e63c-4cbe-88c8-a983b80c5f1f',
  },
};

let configPath: string;
let currentConfig: AppConfig;

function loadSavedConfig(): AppConfig {
  try {
    const saved = JSON.parse(readFileSync(configPath, 'utf-8'));
    return {
      ...DEFAULT_CONFIG,
      ...saved,
      models: { ...DEFAULT_CONFIG.models, ...saved.models },
      mistralVoices: { ...DEFAULT_CONFIG.mistralVoices, ...saved.mistralVoices },
    };
  } catch (e) {
    console.error('Failed to load config, using defaults:', e);
    return { ...DEFAULT_CONFIG };
  }
}

// Migration one-time 2026-04 : support ElevenLabs retiré. Normalise les configs existantes
// (champs ttsProvider/voices legacy + ttsModel eleven_* → Mistral Voxtral). À retirer lors
// de la future réintégration propre d'ElevenLabs (qui réintroduira un champ ttsProvider).
function migrateLegacyElevenLabsFields(): boolean {
  let changed = false;
  const legacy = currentConfig as unknown as Record<string, unknown>;
  for (const key of ['ttsProvider', 'voices']) {
    if (legacy[key] !== undefined) {
      delete legacy[key];
      changed = true;
    }
  }
  if (currentConfig.ttsModel?.startsWith('eleven_')) {
    currentConfig.ttsModel = DEFAULT_CONFIG.ttsModel;
    changed = true;
  }
  return changed;
}

function classifyMistralVoicesSource(): void {
  // Migration one-time : classer mistralVoicesSource à partir des IDs existants.
  // Tout config qui match DEFAULT_CONFIG ou LEGACY_DEFAULT_* est 'default', sinon 'user'.
  // Evite d'étendre LEGACY_DEFAULT_* à chaque release qui change le défaut.
  if (currentConfig.mistralVoicesSource) return;
  const isDefault =
    isDefaultHost(currentConfig.mistralVoices.host) &&
    isDefaultGuest(currentConfig.mistralVoices.guest);
  currentConfig.mistralVoicesSource = isDefault ? 'default' : 'user';
}

export function initConfig(outputDir: string): void {
  mkdirSync(outputDir, { recursive: true });
  configPath = join(outputDir, 'config.json');
  currentConfig = existsSync(configPath) ? loadSavedConfig() : { ...DEFAULT_CONFIG };
  classifyMistralVoicesSource();
  if (migrateLegacyElevenLabsFields()) {
    writeFileSync(configPath, JSON.stringify(currentConfig, null, 2));
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

function hasVoiceIdChange(
  next: Partial<AppConfig['mistralVoices']>,
  current: AppConfig['mistralVoices'],
): boolean {
  const hostChanged = next.host !== undefined && next.host !== current.host;
  const guestChanged = next.guest !== undefined && next.guest !== current.guest;
  return hostChanged || guestChanged;
}

// Un round-trip complet du configDraft ne doit pas transformer une config
// "default" en override utilisateur si les IDs n'ont pas réellement changé.
function applyMistralVoicesPatch(partial: Partial<AppConfig>): void {
  if (!partial.mistralVoices) {
    if (partial.mistralVoicesSource !== undefined) {
      currentConfig.mistralVoicesSource = partial.mistralVoicesSource;
    }
    return;
  }
  const hasExplicitVoiceChange = hasVoiceIdChange(
    partial.mistralVoices,
    currentConfig.mistralVoices,
  );
  currentConfig.mistralVoices = { ...currentConfig.mistralVoices, ...partial.mistralVoices };
  if (partial.mistralVoicesSource !== undefined) {
    currentConfig.mistralVoicesSource = partial.mistralVoicesSource;
  } else if (hasExplicitVoiceChange) {
    currentConfig.mistralVoicesSource = 'user';
  }
}

export function saveConfig(partial: Partial<AppConfig>): AppConfig {
  if (partial.models) {
    currentConfig.models = { ...currentConfig.models, ...partial.models };
  }
  if (partial.ttsModel) currentConfig.ttsModel = partial.ttsModel;
  applyMistralVoicesPatch(partial);
  writeFileSync(configPath, JSON.stringify(currentConfig, null, 2));
  return currentConfig;
}

export function getApiStatus(): { mistral: boolean; ttsAvailable: boolean } {
  const hasMistral = !!process.env.MISTRAL_API_KEY;
  return {
    mistral: hasMistral,
    ttsAvailable: hasMistral,
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

// Priorités backend :
// 1. override par profil (per-field)
// 2. override global explicite (mistralVoicesSource === 'user')
// 3. sélection dynamique via selectVoices (9 langues UI)
// 4. fallback legacy DEFAULT_CONFIG.mistralVoices si voiceCache vide
function pickMistralVoice(
  profile: string | undefined,
  userConfigured: boolean,
  configured: string,
  dynamic: string | undefined,
  defaultVoice: string,
): string {
  if (profile) return profile;
  if (userConfigured) return configured;
  return dynamic || configured || defaultVoice;
}

export function resolveVoices(
  config: AppConfig,
  profileVoices?: { host: string; guest: string },
  lang?: string,
  profileId?: string,
  flow = 'unknown',
): { host: string; guest: string } {
  const userConfigured = config.mistralVoicesSource === 'user';
  const dynamic = resolveMistralDefaults(lang, profileId, flow);
  return {
    host: pickMistralVoice(
      profileVoices?.host,
      userConfigured,
      config.mistralVoices.host,
      dynamic?.host,
      DEFAULT_CONFIG.mistralVoices.host,
    ),
    guest: pickMistralVoice(
      profileVoices?.guest,
      userConfigured,
      config.mistralVoices.guest,
      dynamic?.guest,
      DEFAULT_CONFIG.mistralVoices.guest,
    ),
  };
}
