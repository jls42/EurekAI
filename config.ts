/* eslint-disable
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-argument,
   @typescript-eslint/no-unnecessary-condition,
   @typescript-eslint/restrict-template-expressions
   --
   Codacy lance ESLint sans notre project TS complet sur ce fichier de config JSON legacy;
   lint:ci local reste la couverture type-aware. */
import { existsSync, readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import type { AppConfig, Profile, VoiceFlow } from './types.js';
import type { MistralVoice, VoiceId } from './helpers/voice-types.js';
import { asVoiceId } from './helpers/voice-types.js';
import { selectVoices } from './helpers/voice-selection.js';
import { logger } from './helpers/logger.js';
import { DEFAULT_OCR_MODEL, normalizeOcrModel } from './helpers/ocr-models.js';
import { DEFAULT_STT_MODEL, normalizeSttModel } from './helpers/stt-models.js';
import {
  DEFAULT_TTS_MODEL,
  isTtsModel,
  normalizeTtsModel,
  voiceSupportsTtsModel,
  type TtsModel,
} from './helpers/tts-models.js';

const MISTRAL_LARGE_LATEST = 'mistral-large-latest';

const DEFAULT_CONFIG: AppConfig = {
  models: {
    summary: MISTRAL_LARGE_LATEST,
    flashcards: MISTRAL_LARGE_LATEST,
    quiz: MISTRAL_LARGE_LATEST,
    podcast: MISTRAL_LARGE_LATEST,
    translate: MISTRAL_LARGE_LATEST,
    ocr: DEFAULT_OCR_MODEL,
    stt: DEFAULT_STT_MODEL,
    quizVerify: MISTRAL_LARGE_LATEST,
    chat: MISTRAL_LARGE_LATEST,
  },
  ttsModel: DEFAULT_TTS_MODEL,
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

interface MergeResult {
  config: AppConfig;
  shapeInvalid: boolean;
}

type LegacyRuntimeConfig = AppConfig & {
  ttsProvider?: unknown;
  voices?: unknown;
  mistralVoices?: unknown;
  mistralVoicesSource?: unknown;
};

function mergeSafe(saved: unknown): MergeResult {
  if (!isPlainObject(saved)) {
    logger.warn('config', `invalid shape for config root (got ${describeShape(saved)}), resetting`);
    return { config: { ...DEFAULT_CONFIG }, shapeInvalid: true };
  }
  const savedModels = isPlainObject(saved.models)
    ? (saved.models as Partial<AppConfig['models']>)
    : logAndFallback('models', saved.models);
  return {
    config: {
      ...DEFAULT_CONFIG,
      ...saved,
      models: { ...DEFAULT_CONFIG.models, ...savedModels },
    },
    shapeInvalid: false,
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
    const merged = mergeSafe(JSON.parse(raw));
    // shapeInvalid : JSON parsait, mais la racine n'était pas un plain object
    // (`null`/`array`/`scalaire`). Symétrie avec ProfileStore.list() : on flag loadFailed
    // pour que le prochain saveConfig crée un .corrupt.bak avant overwrite.
    return { config: merged.config, loadFailed: merged.shapeInvalid };
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
  const legacy = currentConfig as LegacyRuntimeConfig;
  if (legacy.ttsProvider !== undefined) {
    delete legacy.ttsProvider;
    removed.push('ttsProvider');
    logger.info('config', "migration: removed legacy field 'ttsProvider'");
  }
  if (legacy.voices !== undefined) {
    delete legacy.voices;
    removed.push('voices');
    logger.info('config', "migration: removed legacy field 'voices'");
  }
  return removed;
};

// Fige `ttsModel` sur un id de TTS_MODELS : `eleven_*` (ElevenLabs retiré), l'alias mouvant
// `voxtral-mini-tts-latest` (défaut jusqu'en v1.7.11, appelé à pointer sur Voxtral 3) ou une valeur
// inconnue → défaut épinglé (cf. helpers/tts-models.ts).
const normalizeLegacyTtsModel = (): boolean => {
  const prev = currentConfig.ttsModel;
  const normalized = normalizeTtsModel(prev);
  if (prev === normalized) return false;
  currentConfig.ttsModel = normalized;
  logger.info('config', `migration: ttsModel '${prev}' -> '${normalized}'`);
  return true;
};

function migrateLegacyElevenLabsFields(): boolean {
  const removed = removeLegacyTtsFields();
  const ttsModelReset = normalizeLegacyTtsModel();
  const changed = removed.length > 0 || ttsModelReset;
  if (changed) {
    logger.info(
      'config',
      `migration complete: removed=[${removed.join(',')}], ttsModelReset=${ttsModelReset}`,
    );
  }
  return changed;
}

// S3: arrow `const` plutôt que `function` — adjacence avec migrateLegacyElevenLabsFields
// ci-dessus déclencherait autrement l'agglomération du parseur TS de Lizard
// (cf. CLAUDE.md "Mesurer > deviner").
const removeLegacyGlobalVoiceFields = (): boolean => {
  const legacy = currentConfig as LegacyRuntimeConfig;
  let changed = false;
  if (legacy.mistralVoices !== undefined) {
    delete legacy.mistralVoices;
    changed = true;
    logger.info('config', "migration: removed legacy field 'mistralVoices'");
  }
  if (legacy.mistralVoicesSource !== undefined) {
    delete legacy.mistralVoicesSource;
    changed = true;
    logger.info('config', "migration: removed legacy field 'mistralVoicesSource'");
  }
  return changed;
};

// Migration one-time : normalise un `models.ocr` legacy (`mistral-ocr-latest`, ancien alias
// mouvant, ou valeur inconnue) vers le défaut OcrModel explicite courant (OCR 4). Sans ça,
// mergeSafe préserve l'alias mouvant sur disque ; on le fige sur la version explicite pour qu'une
// future bascule Mistral de `-latest` ne change pas le modèle (ni le tarif) silencieusement.
// const arrow (pas `function`) : contournement parseur Lizard (cf. CLAUDE.md "Mesurer > deviner").
const normalizeLegacyOcrModel = (): boolean => {
  const current = currentConfig.models.ocr;
  const normalized = normalizeOcrModel(current);
  if (current === normalized) return false;
  currentConfig.models.ocr = normalized;
  logger.info('config', `migration: ocr model '${current}' -> '${normalized}'`);
  return true;
};

// Même régime pour `models.stt` (cf. helpers/stt-models.ts) : alias ou valeur inconnue → défaut
// épinglé. Un config.json sans `stt` reçoit le défaut par mergeSafe, sans migration.
const normalizeLegacySttModel = (): boolean => {
  const current = currentConfig.models.stt;
  const normalized = normalizeSttModel(current);
  if (current === normalized) return false;
  currentConfig.models.stt = normalized;
  logger.info('config', `migration: stt model '${current}' -> '${normalized}'`);
  return true;
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
  // Idempotence cross-cycle (miroir de ProfileStore.save) : si `.corrupt.bak` existe
  // déjà (cycle précédent non résolu), on NE l'écrase PAS — on préserve le backup
  // d'origine pour permettre le post-mortem. Conséquence assumée : seul le premier
  // backup par cycle corrompu est conservé (idem profiles.ts).
  //
  // Reset du flag : on reset systématiquement après un writeFileSync réussi,
  // même si le backup `.corrupt.bak` a échoué. Rationale : après le write, le
  // contenu corrompu d'origine n'existe plus sur disque (overwrite). Garder
  // lastLoadFailed=true ferait que le prochain saveConfig backup le NOUVEAU contenu
  // (désormais valide) sous `.corrupt.bak` — fausse alerte post-mortem. Si
  // writeFileSync lui-même throw, l'exception se propage avant le reset → flag
  // préservé → retry correct au prochain save.
  if (lastLoadFailed && existsSync(configPath)) {
    const backupPath = `${configPath}.corrupt.bak`;
    if (existsSync(backupPath)) {
      logger.info('config', `backup ${backupPath} already exists, skipping copy`);
    } else {
      try {
        copyFileSync(configPath, backupPath);
        logger.info('config', `backup corrupt config.json -> ${backupPath} before overwrite`);
      } catch (e) {
        // logger.error (pas warn) : on est sur le chemin "fichier corrompu va être
        // écrasé sans backup possible" — perte de données réelle, pas une simple
        // condition warn. Sévérité ERROR = un humain doit savoir, sinon l'admin
        // découvre la perte uniquement quand il en a besoin (post-mortem).
        logger.error(
          'config',
          'could not create .corrupt.bak backup (corrupt content will be lost on overwrite):',
          e,
        );
      }
    }
  }
  writeFileSync(configPath, JSON.stringify(currentConfig, null, 2));
  lastLoadFailed = false;
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
  // Tableau évalué en entier : chaque migration tourne, même si une précédente a déjà changé
  // quelque chose (un `||` court-circuiterait les suivantes).
  const changed = [
    migrateLegacyElevenLabsFields(),
    removeLegacyGlobalVoiceFields(),
    normalizeLegacyOcrModel(),
    normalizeLegacySttModel(),
  ].some(Boolean);
  if (changed) {
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

type ModelNormalizer = (v: unknown) => string; // eslint-disable-line no-unused-vars, @typescript-eslint/no-unused-vars -- param de type documentaire, faux positif Codacy (cf. CLAUDE.md « Codacy »)

// Rejection legacy/alias d'un modèle épinglé (OCR, STT) : un client stale peut POSTer un alias
// mouvant (`mistral-ocr-latest`, `voxtral-mini-latest`) ou une valeur inconnue entre 2 restarts.
// On normalise vers le défaut explicite plutôt que laisser fuir un alias mouvant.
const enforcePinnedModel = (field: 'ocr' | 'stt', label: string, normalize: ModelNormalizer) => {
  const requested = currentConfig.models[field];
  const normalized = normalize(requested);
  if (requested === normalized) return;
  logger.warn(
    'config',
    `rejected legacy/unknown ${label} model '${requested}' at saveConfig, using '${normalized}'`,
  );
  currentConfig.models[field] = normalized;
};

// Rejection legacy : une UI pré-PR ou un client automatisé peut encore POSTer un ttsModel
// 'eleven_*', l'alias `voxtral-mini-tts-latest` ou un id hors TTS_MODELS entre le boot (qui a
// normalisé via normalizeLegacyTtsModel) et le restart suivant. Ignore la valeur, préserve le choix
// courant (déjà épinglé), jamais de reset vers DEFAULT.
const applyTtsModel = (requested: string): void => {
  if (isTtsModel(requested)) {
    currentConfig.ttsModel = requested;
    return;
  }
  logger.warn(
    'config',
    `rejected legacy/unknown ttsModel '${requested}' at saveConfig, keeping current value '${currentConfig.ttsModel}'`,
  );
};

// Même discipline que ttsModel pour les champs voix globales retirés de AppConfig. Ces champs ne
// sont plus typés dans Partial<AppConfig>, donc ignorés silencieusement par saveConfig — mais une
// UI stale ou un client externe peut encore les POSTer. On log.warn pour observabilité.
const warnLegacyVoiceFields = (partial: Partial<AppConfig>): void => {
  const legacy = partial as Partial<LegacyRuntimeConfig>;
  if (legacy.mistralVoices !== undefined) {
    logger.warn('config', "rejected legacy field 'mistralVoices' at saveConfig (cleaned at boot)");
  }
  if (legacy.mistralVoicesSource !== undefined) {
    logger.warn(
      'config',
      "rejected legacy field 'mistralVoicesSource' at saveConfig (cleaned at boot)",
    );
  }
};

export function saveConfig(partial: Partial<AppConfig>): AppConfig {
  if (partial.models) {
    currentConfig.models = { ...currentConfig.models, ...partial.models };
    enforcePinnedModel('ocr', 'OCR', normalizeOcrModel);
    enforcePinnedModel('stt', 'STT', normalizeSttModel);
  }
  if (partial.ttsModel) applyTtsModel(partial.ttsModel);
  warnLegacyVoiceFields(partial);
  persistConfig();
  return currentConfig;
}

export function getApiStatus(): {
  mistral: boolean;
  ttsAvailable: boolean;
  voiceCacheReady: boolean;
  requireUserKey: boolean;
} {
  // `requireUserKey` : déploiement exposé qui force chaque navigateur à fournir sa clé.
  // Dans ce cas la clé d'env ne sert qu'aux warmups → le serveur n'est PAS "prêt" du
  // point de vue requêtes, donc `mistral`/`ttsAvailable` doivent rester false (sinon le
  // frontend saute le gate puis se prend des 401). Cf. CLAUDE.md.
  const requireUserKey = process.env.EUREKAI_REQUIRE_USER_KEY === 'true';
  const hasMistral = !!process.env.MISTRAL_API_KEY && !requireUserKey;
  return {
    mistral: hasMistral,
    ttsAvailable: hasMistral,
    voiceCacheReady,
    requireUserKey,
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

const VOICE_SELECTION_LOG = 'voice-selection';

// Résout host + guest via le helper partagé selectVoices, avec logging des fallbacks.
// Retourne null si voiceCache est entièrement vide (cas dégradé).
const resolveMistralDefaults = (
  lang: string,
  profileId: string | undefined,
  flow: VoiceFlow,
  model: TtsModel,
): { host: VoiceId; guest: VoiceId } | null => {
  // Le cache garde tout le catalogue ; seules les voix que le modèle accepte sont candidates
  // (un modèle speech v1 refuse les voix pvc en 400, cf. helpers/tts-models.ts).
  const result = selectVoices({
    voices: voiceCache.filter((v) => voiceSupportsTtsModel(v, model)),
    lang,
    profileId,
  });
  if (!result) {
    logger.warn(VOICE_SELECTION_LOG, `no voice available (lang=${lang}, flow=${flow})`);
    return null;
  }
  if (result.source !== 'lang-match') {
    logger.info(
      VOICE_SELECTION_LOG,
      `fallback lang_input=${lang} lang_matched=${result.langMatched ?? 'none'} source=${result.source} bucketSize=${result.bucketSize} flow=${flow}`,
    );
  }
  if (result.sameCharacterBucket) {
    logger.warn(
      VOICE_SELECTION_LOG,
      `single-speaker bucket: host et guest partagent le même personnage (lang_matched=${result.langMatched ?? 'none'} bucketSize=${result.bucketSize} flow=${flow}) — podcast jouera les deux rôles avec la même voix`,
    );
  }
  return { host: result.host, guest: result.guest };
};

export interface ResolveVoicesArgs {
  // Réutilise la shape de Profile.mistralVoices pour empêcher un drift silencieux
  // entre le format stocké (profile JSON) et celui consommé ici.
  profileVoices?: NonNullable<Profile['mistralVoices']>;
  lang: string;
  // `string` (profile actif) ou `undefined` (anonyme/sans profil). Pas de `null` :
  // un seul sentinel "absent" simplifie les call sites — sinon chacun fait `?? null`
  // alors que selectVoices attend `?: string`. Le typechecker garde le champ obligatoire.
  profileId: string | undefined;
  flow: VoiceFlow;
  // Modèle TTS de l'appel (`ttsOptionsFor(...).model`) : filtre les voix candidates ET l'override.
  model: TtsModel;
}

// Override du profil que le modèle refuse (voix pvc choisie, puis modèle speech v1 sélectionné) :
// ignoré avec un warn, la sélection dynamique prend le relais. Voix absente du cache (catalogue pas
// encore chargé, voix supprimée) : gardée telle quelle, faute de pouvoir en juger.
const usableOverride = (
  id: VoiceId | undefined,
  model: TtsModel,
  flow: VoiceFlow,
): VoiceId | undefined => {
  if (!id) return undefined;
  const voice = voiceCache.find((v) => v.id === id);
  if (!voice || voiceSupportsTtsModel(voice, model)) return id;
  logger.warn(
    VOICE_SELECTION_LOG,
    `profile voice ${id} not supported by ${model} (flow=${flow}), using dynamic selection`,
  );
  return undefined;
};

export function resolveVoices(opts: ResolveVoicesArgs): { host: VoiceId; guest: VoiceId } {
  const dynamic = resolveMistralDefaults(opts.lang, opts.profileId, opts.flow, opts.model);
  const host = usableOverride(opts.profileVoices?.host, opts.model, opts.flow);
  const guest = usableOverride(opts.profileVoices?.guest, opts.model, opts.flow);
  return {
    host: host || dynamic?.host || DEFAULT_VOICES_FALLBACK.host,
    guest: guest || dynamic?.guest || DEFAULT_VOICES_FALLBACK.guest,
  };
}
