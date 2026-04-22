import { existsSync, readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import type { AppConfig } from './types.js';
import type { MistralVoice, VoiceId } from './helpers/voice-types.js';
import { asVoiceId } from './helpers/voice-types.js';
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
    // Pour d'autres langues, `selectVoices` (helpers/voice-selection.ts) prend le relais
    // via `resolveMistralDefaults` (FR fallback sinon).
    host: asVoiceId('2f62b1af-aea3-4079-9d10-7ca665ee7243'),
    guest: asVoiceId('e0580ce5-e63c-4cbe-88c8-a983b80c5f1f'),
  },
};

let configPath: string;
let currentConfig: AppConfig;
// Suit si le dernier load a échoué (JSON corrompu ou read error). Si true au moment d'un
// saveConfig/resetConfig suivant, le fichier corrompu actuel est copié en `.corrupt.bak`
// AVANT overwrite — garantit que la promesse "config préservé sur disque" du log loadFailed
// n'est pas brisée par l'action utilisateur suivante.
let lastLoadFailed = false;

// Spread merge durci contre shapes hostiles depuis le disque (JSON valide mais types
// inattendus : `{"models": null}`, `{"models": "x"}`, `{"models": []}`). Sans cette garde,
// un accès ultérieur `currentConfig.models.chat` crasherait. Fragilité symétrique à
// loadFailed : un config.json hostile ne doit jamais corrompre l'état in-memory.
const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === 'object' && !Array.isArray(v);

function mergeSafe(saved: unknown): AppConfig {
  if (!isPlainObject(saved)) {
    logger.warn('config', `invalid shape for config root (got ${Array.isArray(saved) ? 'array' : typeof saved}), resetting`);
    return { ...DEFAULT_CONFIG };
  }
  const savedModels = isPlainObject(saved.models)
    ? (saved.models as Partial<AppConfig['models']>)
    : logAndFallback('models', saved.models);
  const savedVoices = isPlainObject(saved.mistralVoices)
    ? (saved.mistralVoices as Partial<AppConfig['mistralVoices']>)
    : logAndFallback('mistralVoices', saved.mistralVoices);
  return {
    ...DEFAULT_CONFIG,
    ...saved,
    models: { ...DEFAULT_CONFIG.models, ...savedModels },
    mistralVoices: { ...DEFAULT_CONFIG.mistralVoices, ...savedVoices },
  };
}

const describeShape = (value: unknown): string => {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';
  return typeof value;
};

function logAndFallback(field: string, value: unknown): Record<string, never> {
  if (value !== undefined) {
    logger.warn(
      'config',
      `invalid shape for '${field}' (got ${describeShape(value)}), resetting to default`,
    );
  }
  return {};
}

// Distingue "read failed" (EACCES/EIO) de "parse failed" (JSON corrompu).
// Dans les deux cas : retourne DEFAULT in-memory avec `loadFailed=true`, préserve le disque.
// initConfig gate sur loadFailed pour ne pas overwrite un fichier potentiellement précieux.
function loadSavedConfig(): { config: AppConfig; loadFailed: boolean } {
  let raw: string;
  try {
    raw = readFileSync(configPath, 'utf-8');
  } catch (e) {
    logger.error(
      'config',
      "Failed to read config.json. config.json préservé sur disque, in-memory DEFAULT actif jusqu'au prochain saveConfig:",
      e,
    );
    return { config: { ...DEFAULT_CONFIG }, loadFailed: true };
  }
  try {
    return { config: mergeSafe(JSON.parse(raw)), loadFailed: false };
  } catch (e) {
    logger.error(
      'config',
      "Failed to parse config.json (corrompu). config.json préservé sur disque, in-memory DEFAULT actif jusqu'au prochain saveConfig:",
      e,
    );
    return { config: { ...DEFAULT_CONFIG }, loadFailed: true };
  }
}

// Migration one-time : normalise les `config.json` hérités qui contenaient les champs TTS
// multi-provider (`ttsProvider`, `voices`, `ttsModel: 'eleven_*'`) vers le schéma Mistral
// Voxtral actuel. Retirer quand le support multi-provider sera réintroduit.
// const arrow plutôt que `function` pour contourner le parseur TS de Lizard qui agglomère
// les `function foo()` top-level consécutives (cf. CLAUDE.md "Mesurer > deviner").
const removeLegacyTtsFields = (): string[] => {
  const removed: string[] = [];
  const legacy = currentConfig as unknown as Record<string, unknown>;
  for (const key of ['ttsProvider', 'voices']) {
    if (legacy[key] !== undefined) {
      delete legacy[key];
      removed.push(key);
      logger.info('config', `migration: removed legacy field '${key}'`);
    }
  }
  return removed;
};

const resetLegacyTtsModel = (): boolean => {
  if (!currentConfig.ttsModel?.startsWith('eleven_')) return false;
  const prev = currentConfig.ttsModel;
  currentConfig.ttsModel = DEFAULT_CONFIG.ttsModel;
  logger.info('config', `migration: ttsModel '${prev}' -> '${DEFAULT_CONFIG.ttsModel}'`);
  return true;
};

function migrateLegacyElevenLabsFields(): boolean {
  const removed = removeLegacyTtsFields();
  const ttsModelReset = resetLegacyTtsModel();
  const changed = removed.length > 0 || ttsModelReset;
  if (changed) {
    logger.info(
      'config',
      `migration complete: removed=[${removed.join(',')}], ttsModelReset=${ttsModelReset}`,
    );
  }
  return changed;
}

/**
 * First-boot classifier (pas une migration au sens strict).
 * Classe `mistralVoicesSource` à 'default' ou 'user' selon les IDs de voix présents, si le
 * champ est absent du config. Aucune réécriture in-place — le champ est ajouté.
 * Tout config qui match DEFAULT_CONFIG ou LEGACY_DEFAULT_* est 'default', sinon 'user'.
 * Evite d'étendre LEGACY_DEFAULT_* à chaque release qui change le défaut.
 * Retourne true quand la classification a été écrite en mémoire, pour que initConfig persiste
 * le fichier — sinon au prochain boot on reclasserait à chaque fois.
 */
function classifyMistralVoicesSource(): boolean {
  if (currentConfig.mistralVoicesSource) return false;
  const isDefault =
    isDefaultHost(currentConfig.mistralVoices.host) &&
    isDefaultGuest(currentConfig.mistralVoices.guest);
  currentConfig.mistralVoicesSource = isDefault ? 'default' : 'user';
  return true;
}

// Écrit le config courant sur disque. Si le boot précédent a détecté un fichier corrompu
// (lastLoadFailed), crée d'abord un `.corrupt.bak` à côté du fichier à écraser — évite la
// perte silencieuse du contenu user original (il pouvait contenir des valeurs que le user
// voulait récupérer manuellement après debug).
// const arrow plutôt que `function` pour contourner le parseur TS de Lizard qui agglomère
// les `function foo()` top-level consécutives (cf. CLAUDE.md "Mesurer > deviner").
const persistConfig = (): void => {
  if (lastLoadFailed && existsSync(configPath)) {
    const backupPath = `${configPath}.corrupt.bak`;
    try {
      copyFileSync(configPath, backupPath);
      logger.info('config', `backup corrupt config.json -> ${backupPath} before overwrite`);
    } catch (e) {
      logger.warn('config', 'could not create .corrupt.bak backup (proceeding with overwrite):', e);
    }
    lastLoadFailed = false;
  }
  writeFileSync(configPath, JSON.stringify(currentConfig, null, 2));
};

export function initConfig(outputDir: string): void {
  mkdirSync(outputDir, { recursive: true });
  configPath = join(outputDir, 'config.json');
  if (existsSync(configPath)) {
    const { config, loadFailed } = loadSavedConfig();
    currentConfig = config;
    lastLoadFailed = loadFailed;
    // Gate critique : si load a échoué (read error ou JSON corrompu), le disque est
    // potentiellement précieux. Ne PAS écraser avec DEFAULT via classify/migrate/write.
    // Le backup .corrupt.bak sera créé par persistConfig au prochain saveConfig/resetConfig.
    if (loadFailed) return;
  } else {
    currentConfig = { ...DEFAULT_CONFIG };
    lastLoadFailed = false;
  }
  // Ordre: classify AVANT migrate. Invariant actuel: aucune migration ne touche
  // `mistralVoices.host/guest`, donc classify lit un état cohérent. Si une future migration
  // touche `mistralVoices`, inverser l'ordre (migrate → classify) pour éviter de classer
  // sur des IDs sur le point d'être migrés.
  const classified = classifyMistralVoicesSource();
  const migrated = migrateLegacyElevenLabsFields();
  if (classified || migrated) {
    try {
      persistConfig();
    } catch (e) {
      logger.error('config', 'migration persist failed (continuing in-memory):', e);
    }
  }
}

export function getConfig(): AppConfig {
  return currentConfig;
}

export function resetConfig(): AppConfig {
  currentConfig = { ...DEFAULT_CONFIG };
  persistConfig();
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
  if (partial.ttsModel) {
    // Rejection legacy : une UI pré-PR ou client automatisé peut encore POSTer un ttsModel
    // 'eleven_*' entre le boot (qui a nettoyé via resetLegacyTtsModel) et le restart suivant.
    // Ignore la valeur legacy, preserve le choix courant (déjà non-legacy).
    if (partial.ttsModel.startsWith('eleven_')) {
      logger.warn(
        'config',
        `rejected legacy ttsModel '${partial.ttsModel}' at saveConfig, keeping current value '${currentConfig.ttsModel}'`,
      );
    } else {
      currentConfig.ttsModel = partial.ttsModel;
    }
  }
  applyMistralVoicesPatch(partial);
  persistConfig();
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
const LEGACY_DEFAULT_HOSTS: ReadonlySet<VoiceId> = new Set([
  asVoiceId('e3596645-b1af-469e-b857-f18ddedc7652'),
]);
const LEGACY_DEFAULT_GUESTS: ReadonlySet<VoiceId> = new Set([
  asVoiceId('5a271406-039d-46fe-835b-fbbb00eaf08d'),
]);

function isDefaultHost(id: VoiceId | undefined): boolean {
  return !id || id === DEFAULT_CONFIG.mistralVoices.host || LEGACY_DEFAULT_HOSTS.has(id);
}

function isDefaultGuest(id: VoiceId | undefined): boolean {
  return !id || id === DEFAULT_CONFIG.mistralVoices.guest || LEGACY_DEFAULT_GUESTS.has(id);
}

// Résout host + guest via le helper partagé selectVoices, avec logging des fallbacks.
// Retourne null si voiceCache est entièrement vide (cas dégradé).
function resolveMistralDefaults(
  lang: string | undefined,
  profileId: string | undefined,
  flow: string,
): { host: VoiceId; guest: VoiceId } | null {
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
  profile: VoiceId | undefined,
  userConfigured: boolean,
  configured: VoiceId,
  dynamic: VoiceId | undefined,
  defaultVoice: VoiceId,
): VoiceId {
  if (profile) return profile;
  if (userConfigured) return configured;
  return dynamic || configured || defaultVoice;
}

export function resolveVoices(
  config: AppConfig,
  profileVoices?: { host: VoiceId; guest: VoiceId },
  lang?: string,
  profileId?: string,
  flow = 'unknown',
): { host: VoiceId; guest: VoiceId } {
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
