import { existsSync, readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import type { AppConfig, VoiceFlow } from './types.js';
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
};

const DEFAULT_VOICES_FALLBACK: { host: VoiceId; guest: VoiceId } = {
  // Marie - Excited (host) + Marie - Curious (guest), used only when the voice catalog is empty.
  host: asVoiceId('2f62b1af-aea3-4079-9d10-7ca665ee7243'),
  guest: asVoiceId('e0580ce5-e63c-4cbe-88c8-a983b80c5f1f'),
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
    logger.warn(
      'config',
      `invalid shape for config root (got ${Array.isArray(saved) ? 'array' : typeof saved}), resetting`,
    );
    return { ...DEFAULT_CONFIG };
  }
  const savedModels = isPlainObject(saved.models)
    ? (saved.models as Partial<AppConfig['models']>)
    : logAndFallback('models', saved.models);
  return {
    ...DEFAULT_CONFIG,
    ...saved,
    models: { ...DEFAULT_CONFIG.models, ...savedModels },
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
// Voxtral actuel.
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

const LEGACY_GLOBAL_VOICE_KEYS = ['mistralVoices', 'mistralVoicesSource'] as const;

// S3: arrow `const` plutôt que `function` — adjacence avec migrateLegacyElevenLabsFields
// ci-dessus déclencherait autrement l'agglomération du parseur TS de Lizard
// (cf. CLAUDE.md "Mesurer > deviner").
const removeLegacyGlobalVoiceFields = (): boolean => {
  const legacy = currentConfig as unknown as Record<string, unknown>;
  let changed = false;
  for (const key of LEGACY_GLOBAL_VOICE_KEYS) {
    if (legacy[key] !== undefined) {
      delete legacy[key];
      changed = true;
      logger.info('config', `migration: removed legacy field '${key}'`);
    }
  }
  return changed;
};

// Écrit le config courant sur disque. Si le boot précédent a détecté un fichier corrompu
// (lastLoadFailed), tente d'abord un `.corrupt.bak` à côté du fichier à écraser.
//
// Trade-off explicite quand le backup échoue (EACCES différentiel, ENOSPC borderline) :
// on log warn et on continue le write principal. Rationale :
// - Le contenu corrompu est déjà non-utilisable automatiquement (JSON.parse a fail au load)
// - Sa seule valeur résiduelle est la lecture post-mortem manuelle par un admin
// - Bloquer le write (throw) refuserait une save légitime de l'user pour préserver un fichier
//   inexploitable — pire UX
// - Early-return silencieux serait pire encore : 200 OK côté API (saveConfig retourne sans
//   throw → server.ts répond 200) alors que rien sur disque
//
// Le code actuel privilégie la préservation du nouveau contenu user. Si une garantie
// "ne jamais perdre le corrompu" devient contractuelle, refactorer la signature de
// saveConfig pour retourner {config, warnings} et exposer le warning à la route.
//
// const arrow (pas function) : contournement parseur TS Lizard qui agglomère les
// `function foo()` top-level consécutives (cf. CLAUDE.md "Mesurer > deviner").
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
  const migrated = migrateLegacyElevenLabsFields();
  const globalVoicesRemoved = removeLegacyGlobalVoiceFields();
  if (migrated || globalVoicesRemoved) {
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
  // C1: meme discipline que ttsModel 'eleven_*' pour les champs voix globales retires
  // de AppConfig. Ces champs ne sont plus typés dans Partial<AppConfig>, donc ignorés
  // silencieusement par saveConfig (branches ci-dessus n'y touchent pas) — mais une
  // UI stale ou un client externe peut encore les POSTer. On log.warn pour observabilite.
  const legacy = partial as Record<string, unknown>;
  for (const key of LEGACY_GLOBAL_VOICE_KEYS) {
    if (legacy[key] !== undefined) {
      logger.warn('config', `rejected legacy field '${key}' at saveConfig (cleaned at boot)`);
    }
  }
  persistConfig();
  return currentConfig;
}

export function getApiStatus(): {
  mistral: boolean;
  ttsAvailable: boolean;
  voiceCacheReady: boolean;
} {
  const hasMistral = !!process.env.MISTRAL_API_KEY;
  return {
    mistral: hasMistral,
    ttsAvailable: hasMistral,
    voiceCacheReady,
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
// Signal observabilité : true uniquement après warmup réussi (listVoices au boot).
// Reste false si le warmup throw (clé invalide, network timeout, etc.) — les routes
// peuvent griser les sélecteurs de voix et les users non-FR sont alertés du fallback.
let voiceCacheReady = false;

export function setVoiceCache(voices: MistralVoice[]): void {
  voiceCache = voices;
  voiceCacheReady = voices.length > 0;
}

// Résout host + guest via le helper partagé selectVoices, avec logging des fallbacks.
// Retourne null si voiceCache est entièrement vide (cas dégradé).
const resolveMistralDefaults = (
  lang: string,
  profileId: string | null,
  flow: VoiceFlow,
): { host: VoiceId; guest: VoiceId } | null => {
  const result = selectVoices({
    voices: voiceCache,
    lang,
    profileId: profileId ?? undefined,
  });
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
};

export interface ResolveVoicesArgs {
  profileVoices?: { host?: VoiceId; guest?: VoiceId };
  lang: string;
  profileId: string | null;
  flow: VoiceFlow;
}

export function resolveVoices(opts: ResolveVoicesArgs): { host: VoiceId; guest: VoiceId } {
  const dynamic = resolveMistralDefaults(opts.lang, opts.profileId, opts.flow);
  return {
    host: opts.profileVoices?.host || dynamic?.host || DEFAULT_VOICES_FALLBACK.host,
    guest: opts.profileVoices?.guest || dynamic?.guest || DEFAULT_VOICES_FALLBACK.guest,
  };
}
