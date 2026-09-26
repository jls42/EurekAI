/* eslint-disable
   @typescript-eslint/consistent-type-definitions,
   @typescript-eslint/no-misused-promises,
   @typescript-eslint/no-unnecessary-condition,
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-argument,
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-return,
   @typescript-eslint/restrict-template-expressions
   --
   Codacy lance ESLint sans notre project TS complet sur les handlers Express/Mistral;
   lint:ci local reste la couverture type-aware. */
import { Router, type Request, type RequestHandler, type Response } from 'express';
import multer from 'multer';
import { randomUUID, createHash } from 'node:crypto';
import { unlinkSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { Mistral } from '@mistralai/mistralai';
import type {
  Source,
  OcrConfidence,
  AgeGroup,
  DuplicateUpload,
  ModerationResult,
  Consigne,
} from '../types.js';
import type { ProjectStore } from '../store.js';
import type { ProfileStore } from '../profiles.js';
import { ocrFile } from '../generators/ocr.js';
import { normalizeOcrModel } from '../helpers/ocr-models.js';
import { moderateContent } from '../generators/moderation.js';
import {
  blockingModerationStatus,
  moderationRejection,
  type ModerationRejection,
} from '../helpers/moderation-http.js';
import { activeModerationCategories, moderationProfileOf } from '../helpers/moderation-profile.js';
import { selectChatSources } from '../helpers/chat-sources.js';
import { screenUserText, type TextScreening } from '../helpers/input-moderation.js';
import { transcribeAudio } from '../generators/stt.js';
import { webSearchEnrich } from '../generators/websearch.js';
import { detectConsigne, type ConsigneResult } from '../generators/consigne.js';
import { getMarkdown } from './generate.js';
import { parseWebInput, fetchPageContent, timer as startTimer } from '../helpers/index.js';
import { logger } from '../helpers/logger.js';
import { extractErrorCode } from '../helpers/error-codes.js';
import { runWithUsageTracking } from '../helpers/usage-context.js';
import { persistUsage } from '../helpers/cost-persist.js';
import type { ApiUsage } from '../helpers/pricing.js';
import { getConfig } from '../config.js';
import { resolveClient, requireKeyMiddleware } from '../helpers/mistral-client-factory.js';
import {
  MODERATION_WAIT_MS,
  selectSources,
  settleSourceModeration,
  startSourceModeration,
} from '../helpers/source-moderation.js';
import { MULTIPART_FIELD_LIMITS } from '../helpers/multipart-limits.js';
import { withUploadErrors } from '../helpers/upload-errors.js';
import {
  INVALID_INPUT,
  type LocaleFields,
  readBodyLang,
  readLocaleFields,
} from '../helpers/request-validation.js';

const ERR_PROJECT_NOT_FOUND = 'Projet introuvable';

function pendingModeration(): Source['moderation'] {
  return { status: 'pending', categories: {} };
}

// Texte vide/non-string (arrow pour éviter l'agglomération Lizard + garder les
// handlers sous CCN 8 après ajout de la garde auth resolveOr4xx).
const isBlankString = (v: unknown): boolean => !v || typeof v !== 'string' || v.trim().length === 0;

// Dédup ré-import : sha256 du fichier brut (avant OCR) ; comparé aux contentHash existants.
const hashFileContent = async (path: string): Promise<string | undefined> => {
  try {
    return (
      createHash('sha256')
        // eslint-disable-next-line security/detect-non-literal-fs-filename -- path is Multer's server-side temp file path.
        .update(await readFile(path))
        .digest('hex')
    );
  } catch {
    return undefined;
  }
};

const findDuplicateId = (
  hash: string | undefined,
  existing: Map<string, string>,
  seen: Map<string, string>,
): string | undefined => (hash ? (existing.get(hash) ?? seen.get(hash)) : undefined);

const tryUnlinkOrphan = (path: string): void => {
  try {
    unlinkSync(path);
  } catch (e) {
    logger.warn('sources', `unlink orphan upload failed: ${path}`, e);
  }
};

// Fichiers déjà écrits par diskStorage pour une requête refusée : orphelins sinon.
const unlinkReceivedFiles = (req: Request): void => {
  for (const file of (req.files as Express.Multer.File[] | undefined) ?? []) {
    tryUnlinkOrphan(file.path);
  }
};

// Existence du projet, sans lever : un pid invalide (traversée) fait lever safeProjectSegment.
const projectExists = (store: ProjectStore, pid: string): boolean => {
  try {
    return store.getProject(pid) !== null;
  } catch {
    return false;
  }
};

// Garde PRÉ-multer, après requireKeyMiddleware (auth-first) : diskStorage écrit sous
// projects/<pid>/uploads/ dès la réception, AVANT le handler. Un pid inconnu répondait 404 après
// l'écriture (dossier projet fantôme + jusqu'à 10 fichiers) ; il répond 404 sans rien écrire.
const requireExistingProject =
  (store: ProjectStore): RequestHandler =>
  (req, res, next) => {
    if (!projectExists(store, String(req.params.pid))) {
      res.status(404).json({ error: ERR_PROJECT_NOT_FOUND });
      return;
    }
    next();
  };

type RawWebSearchBody = {
  query?: unknown;
  lang?: unknown;
  ageGroup?: unknown;
  scrapeMode?: string;
};
type WebSearchParams = LocaleFields & { query: string; scrapeMode: string };

// Corps de /sources/websearch validé AVANT la modération et toute collecte : requête non vide,
// lang/ageGroup absents (défauts fr/enfant) ou valides — ils partent dans le prompt de
// recherche. null = 400 invalid_input déjà envoyé, l'appelant `return`.
const validateWebsearchBody = (req: Request, res: Response): WebSearchParams | null => {
  const body = (req.body ?? {}) as RawWebSearchBody;
  const locale = readLocaleFields(body.lang, body.ageGroup);
  if (isBlankString(body.query) || !locale) {
    res.status(400).json({ error: INVALID_INPUT });
    return null;
  }
  return { ...locale, query: body.query as string, scrapeMode: body.scrapeMode ?? 'auto' };
};

// Dépendances de la détection de consigne : store et profils complets (écritures de la consigne et
// du coût), compatibles avec SettleDeps (reprise des modérations).
interface ConsigneDeps {
  store: ProjectStore;
  profileStore: ProfileStore;
  client: Mistral;
}

type LoadedProject = NonNullable<ReturnType<ProjectStore['getProject']>>;

// Issue d'une détection : projet disparu ; aucune source utilisable (aucun appel LLM) ; détection
// faite, avec la consigne PERSISTÉE après l'opération (la nouvelle, ou celle restée en place si
// une source de la provenance a été supprimée pendant la détection) et son coût.
type ConsigneOutcome =
  | { kind: 'missing' }
  | { kind: 'unusable'; project: LoadedProject }
  | { kind: 'done'; consigne: Consigne | null; costDelta: number };

type TrackedDetection = { result: ConsigneResult; costDelta: number };

// Libellé du costLog : son dernier segment `detect-consigne` donne « Détection de consigne »
// (COST_ROUTE_LABEL_KEYS, src/app/helpers.ts), pour la route comme pour la détection de fond.
const consigneCostRoute = (pid: string): string => `POST /api/projects/${pid}/detect-consigne`;

// Appel LLM sous suivi de coût : persisté en cas de succès, et en cas d'échec avec l'usage déjà
// capté (motif `apiUsage` des autres routes) avant de relancer l'exception.
const runTrackedDetection = async (
  deps: ConsigneDeps,
  pid: string,
  sources: Source[],
  lang: string,
): Promise<TrackedDetection> => {
  try {
    const { result, usage } = await runWithUsageTracking(() =>
      detectConsigne(deps.client, getMarkdown(sources), undefined, lang),
    );
    const persisted = persistUsage(deps.store, pid, consigneCostRoute(pid), usage);
    return { result, costDelta: persisted?.cost ?? 0 };
  } catch (e) {
    const failedUsage = (e as { apiUsage?: ApiUsage[] }).apiUsage;
    if (failedUsage?.length) {
      persistUsage(deps.store, pid, `${consigneCostRoute(pid)}/failed`, failedUsage);
    }
    throw e;
  }
};

type DetectedConsigne = Consigne & { sourceIds: string[] };

const MISSING_PROJECT: ConsigneOutcome = { kind: 'missing' };

// Toutes les sources de la provenance existent encore dans le projet relu.
const provenanceStillPresent = (project: LoadedProject, provenance: readonly string[]): boolean => {
  const ids = new Set(project.sources.map((s) => s.id));
  return provenance.every((id) => ids.has(id));
};

// Écriture de la consigne détectée, relecture et écriture synchrones (aucune requête ne s'intercale
// entre les deux) : si une source de sa provenance a été supprimée PENDANT la détection, rien n'est
// écrit (la consigne viendrait d'un document supprimé) et l'issue porte la consigne restée en place.
const saveDetectedConsigne = (
  store: ProjectStore,
  pid: string,
  consigne: DetectedConsigne,
  costDelta: number,
): ConsigneOutcome => {
  const project = store.getProject(pid);
  if (!project) return MISSING_PROJECT;
  if (!provenanceStillPresent(project, consigne.sourceIds)) {
    logger.info('consigne', 'detection discarded: a source was deleted during detection');
    return { kind: 'done', consigne: project.consigne ?? null, costDelta };
  }
  const saved = store.setConsigne(pid, consigne);
  return saved ? { kind: 'done', consigne: saved, costDelta } : MISSING_PROJECT;
};

/**
 * Détection de la consigne sur les seules sources SÛRES pour le profil propriétaire, source unique
 * de la route et de la tâche de fond : modérations des sources reprises et attendues au plus
 * `waitMs` (settleSourceModeration), projet relu, puis sources utilisables = celles que le chat
 * accepterait (selectChatSources : statut de garde `safe` si le profil est modéré, toutes sinon).
 * Aucune source utilisable : aucun appel LLM. Sinon appel suivi en coût, consigne écrite avec sa
 * provenance (`sourceIds`). Les exceptions de l'appel LLM se propagent.
 */
const detectProjectConsigne = async (
  deps: ConsigneDeps,
  pid: string,
  lang: string,
  waitMs: number,
): Promise<ConsigneOutcome> => {
  await settleSourceModeration(deps, pid, { waitMs });
  const project = deps.store.getProject(pid);
  if (!project) return MISSING_PROJECT;
  const usable = selectChatSources(
    project.sources,
    moderationProfileOf(project, deps.profileStore),
  );
  if (usable.length === 0) return { kind: 'unusable', project };
  const { result, costDelta } = await runTrackedDetection(deps, pid, usable, lang);
  const consigne: DetectedConsigne = { ...result, sourceIds: usable.map((s) => s.id) };
  return saveDetectedConsigne(deps.store, pid, consigne, costDelta);
};

// Journal de la tâche de fond : jamais le contenu de la consigne, seulement son nombre de points.
// Tolère une consigne ancienne illisible (restée en place) : une exception ici passerait la
// consigne en échec (catch de runConsigneDetection).
const logConsigneOutcome = (outcome: ConsigneOutcome): void => {
  if (outcome.kind === 'unusable') {
    logger.info('consigne', 'detection skipped: no usable source');
    return;
  }
  if (outcome.kind !== 'done') return;
  const topics = outcome.consigne?.found ? outcome.consigne.keyTopics?.length : 0;
  logger.info('consigne', `detection: ${topics ? topics + ' topics' : 'aucune'}`);
};

// Tâche de fond (après un import) : attente longue des modérations (MODERATION_WAIT_MS.consigne),
// les sources encore en attente au-delà sont écartées de la détection. Ne lève jamais.
const runConsigneDetection = async (
  deps: ConsigneDeps,
  pid: string,
  lang: string,
): Promise<void> => {
  try {
    logConsigneOutcome(await detectProjectConsigne(deps, pid, lang, MODERATION_WAIT_MS.consigne));
  } catch (e) {
    logger.error('consigne', 'detection error:', e);
    const code = extractErrorCode(e, 'consigne');
    deps.store.setConsigneError(pid, code);
  }
};

// Coalesce par projet : le frontend envoie 1 POST par fichier. Si un scan est
// déjà en vol pour un pid, on stocke la lang la plus récente (Map plutôt que
// Set) et on replay 1× à la fin avec cet état final. Résultat : 2 scans max
// par rafale (premier feedback rapide + rescan sur état complet), zéro
// concurrence → plus de 429/retry SDK. La Map garantit que le replay utilise
// la lang du dernier trigger du burst, pas celle du premier (bug observé :
// upload `en` reçu pendant un scan `fr` ne faisait pas basculer le replay en
// `en`).
const inFlight = new Set<string>();
const pendingLang = new Map<string, string>();

// Appelée APRÈS le lancement des modérations des sources importées (startSourceModeration) : la
// détection rejoint alors ces modérations en vol au lieu d'en relancer (plafond de 10 par appel de
// settleSourceModeration).
const triggerConsigneDetection = (
  deps: ConsigneDeps,
  fingerprint: string,
  pid: string,
  lang = 'fr',
): void => {
  // Coalesce par (pid, clé) : deux profils/clés distinctes sur le même projet ne
  // partagent PAS le même scan (sinon le replay facturerait la mauvaise clé). Même
  // clé (même fingerprint) → coalescing normal d'une rafale d'uploads.
  const ck = `${pid}:${fingerprint}`;
  if (inFlight.has(ck)) {
    pendingLang.set(ck, lang);
    return;
  }
  inFlight.add(ck);
  void (async () => {
    try {
      await runConsigneDetection(deps, pid, lang);
    } catch (e) {
      // runConsigneDetection gère déjà ses propres erreurs, mais on se protège
      // ici contre une régression (exception inattendue, crash du code de
      // coalesce) qui ferait crasher l'IIFE silencieusement et bloquerait
      // `inFlight` pour toujours sans déclencher le replay.
      logger.error('consigne', 'IIFE crash', e);
    } finally {
      inFlight.delete(ck);
      const nextLang = pendingLang.get(ck);
      if (nextLang !== undefined) {
        pendingLang.delete(ck);
        triggerConsigneDetection(deps, fingerprint, pid, nextLang);
      }
    }
  })();
};

// Catégories actives du profil propriétaire du projet (activeModerationCategories), null si la
// modération est inactive : la source importée n'est alors pas modérée.
const getModerationCategories = (
  store: ProjectStore,
  profileStore: ProfileStore,
  pid: string,
): string[] | null => {
  const project = store.getProject(pid);
  return project ? activeModerationCategories(moderationProfileOf(project, profileStore)) : null;
};

type InputModeration = { ok: true; moderation?: ModerationResult } | { ok: false };

// Sous-helper texte libre / websearch : modère la saisie AVANT tout traitement (aucune source
// créée, aucune collecte lancée si refus), via screenUserText (helpers/input-moderation.ts,
// partagé avec la réponse orale du quiz vocal). `ok: false` = réponse déjà envoyée : 400/503/409
// selon le statut (moderationRejection), 500 JSON sur exception de l'API — sans ce catch,
// l'exception partait dans le handler Express par défaut (500 HTML). `moderation` absent =
// modération inactive. Module-scope (n'utilise que des params) — cf. SonarQube S7721 ; arrow pour
// éviter l'agglomération Lizard.
const moderateUserInput = async (
  client: Mistral,
  res: Response,
  text: string,
  modCats: string[] | null,
): Promise<InputModeration> => {
  let screening: TextScreening;
  try {
    screening = await screenUserText(client, text, modCats);
  } catch (e) {
    logger.error('moderation', 'input moderation error:', e);
    res.status(500).json({ error: extractErrorCode(e, 'moderation') });
    return { ok: false };
  }
  if (!screening.ok) {
    res.status(screening.rejection.status).json({ error: screening.rejection.error });
    return { ok: false };
  }
  return { ok: true, moderation: screening.moderation };
};

type ResolvedClient = { client: Mistral; fingerprint: string };
type UploadFailure = { filename: string; error: string };
type UploadOutcome = { source?: Source; failure?: UploadFailure };
type UploadBatchOutcome = {
  results: Source[];
  failures: UploadFailure[];
  duplicates: DuplicateUpload[];
};
type WebSourceFailure = { label: string; code: string };
type WebSourceOutcome = { source: Source | null; failure: WebSourceFailure | null };
// Collecte d'une source web (scraping d'URL avec repli, ou recherche par mots-clés) : lève en cas
// d'échec. Alias : un paramètre de type fonction écrit en ligne coupe la mesure de Lizard.
type WebSourceTask = () => Promise<Source>;
type ProcessedUpload = { markdown: string; elapsed: number; confidence?: OcrConfidence };
type SttPipelineResult = {
  text: string;
  elapsed: number;
  persisted: ReturnType<typeof persistUsage>;
};

const TEXT_EXTS = new Set(['.txt', '.md']);

// Codes du contrat /sources/websearch quand aucune source n'est créée (respondNoWebSources).
const URL_BLOCKED = 'url_blocked';
const ALL_SOURCES_FAILED = 'all_sources_failed';

// Discrimine les erreurs SSRF des erreurs reseau/parse pour decider du fallback LLM.
const SSRF_ERROR_MARKERS = [
  'URL invalide',
  'Protocole non autorise',
  'Hostname interdit',
  'IP privee interdite',
  'Resolution DNS impossible',
  'Hostname resout vers IP privee',
  'URL sans hostname',
  'Host format invalide',
  'Redirect refuse',
];

// Auth-first : résout le client (header > env) en tête de handler IA, ou répond
// 4xx stable et retourne null.
const resolveOr4xx = (req: Request, res: Response): ResolvedClient | null => {
  const r = resolveClient(req);
  if (r.ok) return { client: r.client, fingerprint: r.fingerprint };
  res.status(r.status).json({ error: r.error });
  return null;
};

const createDynamicUpload = (store: ProjectStore) =>
  multer({
    storage: multer.diskStorage({
      // getUploadDir lève si le projet a disparu depuis la garde pré-multer (ENOENT, jamais de
      // dossier recréé) : l'erreur passe par le callback (withUploadErrors → 500 JSON).
      destination: (req, _file, cb) => {
        let dir: string;
        try {
          dir = store.getUploadDir(String(req.params.pid));
        } catch (e) {
          cb(e as Error, '');
          return;
        }
        cb(null, dir);
      },
      filename: (_req, file, cb) => {
        cb(null, `${randomUUID()}-${file.originalname}`);
      },
    }),
    limits: { fileSize: 20 * 1024 * 1024, files: 10, ...MULTIPART_FIELD_LIMITS }, // NOSONAR(S5693) — limite bornée volontaire (20 Mo, 10 fichiers) : c'est le garde-fou anti-DoS upload
  });

const createMemoryUpload = () =>
  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 25 * 1024 * 1024, files: 1, ...MULTIPART_FIELD_LIMITS }, // NOSONAR(S5693) — limite bornée volontaire (25 Mo, 1 fichier) : c'est le garde-fou anti-DoS upload
  });

const uploadedFileExt = (file: Express.Multer.File): string => {
  const name = file.originalname.toLowerCase();
  const dotIdx = name.lastIndexOf('.');
  return dotIdx >= 0 ? name.slice(dotIdx) : '';
};

const readTextUpload = async (file: Express.Multer.File): Promise<ProcessedUpload> => {
  const stop = startTimer();
  // eslint-disable-next-line security/detect-non-literal-fs-filename -- file.path is created by Multer diskStorage, not a client-supplied filename.
  const markdown = await readFile(file.path, 'utf-8');
  const elapsed = stop();
  logger.info(
    'sources',
    `TXT OK: ${file.originalname} (${elapsed.toFixed(1)}s, ${markdown.length} chars)`,
  );
  return { markdown, elapsed };
};

const readOcrUpload = async (
  client: Mistral,
  file: Express.Multer.File,
): Promise<ProcessedUpload> => {
  const result = await ocrFile(
    client,
    file.path,
    file.originalname,
    normalizeOcrModel(getConfig().models.ocr),
  );
  const confStr = result.confidence
    ? `, confidence: ${(result.confidence.average * 100).toFixed(0)}%`
    : '';
  logger.info(
    'sources',
    `OCR OK: ${file.originalname} (${result.elapsed.toFixed(1)}s, ${result.markdown.length} chars${confStr})`,
  );
  return result;
};

const processUploadedFile = async (
  client: Mistral,
  file: Express.Multer.File,
  pid: string,
  modCats: string[] | null,
  contentHash: string | undefined,
): Promise<Source> => {
  const isText = TEXT_EXTS.has(uploadedFileExt(file));
  const processed = isText ? await readTextUpload(file) : await readOcrUpload(client, file);
  return {
    id: randomUUID(),
    filename: file.originalname,
    markdown: processed.markdown,
    uploadedAt: new Date().toISOString(),
    sourceType: isText ? 'text' : 'ocr',
    filePath: `projects/${pid}/uploads/${file.filename}`,
    moderation: modCats ? pendingModeration() : undefined,
    ocrConfidence: processed.confidence,
    contentHash,
  };
};

const attemptFileUpload = async (
  store: ProjectStore,
  client: Mistral,
  file: Express.Multer.File,
  pid: string,
  modCats: string[] | null,
  contentHash: string | undefined,
): Promise<UploadOutcome> => {
  try {
    const { result: source, usage } = await runWithUsageTracking(() =>
      processUploadedFile(client, file, pid, modCats, contentHash),
    );
    const persisted = persistUsage(store, pid, `POST /api/projects/${pid}/sources/upload`, usage);
    if (persisted) {
      source.estimatedCost = persisted.cost;
      source.usage = persisted.usage;
      source.costBreakdown = persisted.costBreakdown;
    }
    store.addSource(pid, source);
    return { source };
  } catch (e) {
    // Aucune source ne référencera ce fichier : orphelin dans uploads/ sinon.
    tryUnlinkOrphan(file.path);
    const failedUsage = (e as { apiUsage?: ApiUsage[] }).apiUsage;
    if (failedUsage?.length) {
      persistUsage(store, pid, `POST /api/projects/${pid}/sources/upload/failed`, failedUsage);
    }
    logger.error('sources', `Upload FAIL: ${file.originalname}`, e);
    return { failure: { filename: file.originalname, error: extractErrorCode(e) } };
  }
};

// Modérations des sources importées enregistrées AVANT la détection de consigne, qui les rejoint
// (cf. triggerConsigneDetection). Profil non modéré : aucune modération, détection directe.
const startModerationsThenDetect = (
  deps: ConsigneDeps,
  fingerprint: string,
  pid: string,
  lang: string,
  modCats: string[] | null,
  sources: Source[],
): void => {
  if (modCats) {
    for (const src of sources) startSourceModeration(deps.store, deps.client, pid, src, modCats);
  }
  triggerConsigneDetection(deps, fingerprint, pid, lang);
};

const sendUploadResponse = (
  res: Response,
  results: Source[],
  failures: UploadFailure[],
  duplicates: DuplicateUpload[],
): void => {
  if (results.length === 0 && duplicates.length === 0) {
    res.status(500).json({ error: 'upload_failed', failures });
    return;
  }
  if (failures.length === 0 && duplicates.length === 0) {
    res.json(results);
    return;
  }
  res.json({ sources: results, failures, duplicates });
};

const buildExistingHashMap = (store: ProjectStore, pid: string): Map<string, string> => {
  const map = new Map<string, string>();
  for (const s of store.getProject(pid)?.sources ?? []) {
    if (s.contentHash && !map.has(s.contentHash)) map.set(s.contentHash, s.id);
  }
  return map;
};

const processUploadBatch = async (
  store: ProjectStore,
  client: Mistral,
  files: Express.Multer.File[],
  pid: string,
  modCats: string[] | null,
  allowDuplicates: boolean,
): Promise<UploadBatchOutcome> => {
  const results: Source[] = [];
  const failures: UploadFailure[] = [];
  const duplicates: DuplicateUpload[] = [];
  const existing = buildExistingHashMap(store, pid);
  const seen = new Map<string, string>();
  for (const file of files) {
    const hash = await hashFileContent(file.path);
    const dupId = findDuplicateId(hash, existing, seen);
    if (!allowDuplicates && dupId && hash) {
      tryUnlinkOrphan(file.path);
      duplicates.push({ filename: file.originalname, contentHash: hash, existingSourceId: dupId });
      continue;
    }
    const outcome = await attemptFileUpload(store, client, file, pid, modCats, hash);
    if (outcome.source) {
      results.push(outcome.source);
      if (hash) seen.set(hash, outcome.source.id);
    } else if (outcome.failure) failures.push(outcome.failure);
  }
  return { results, failures, duplicates };
};

const buildVoiceSource = (
  text: string,
  persisted: ReturnType<typeof persistUsage>,
  modCats: string[] | null,
): Source => ({
  id: randomUUID(),
  filename: 'Enregistrement vocal',
  markdown: text.trim(),
  uploadedAt: new Date().toISOString(),
  sourceType: 'voice',
  moderation: modCats ? pendingModeration() : undefined,
  ...(persisted && {
    usage: persisted.usage,
    estimatedCost: persisted.cost,
    costBreakdown: persisted.costBreakdown,
  }),
});

const persistFailedUsage = (store: ProjectStore, pid: string, e: unknown): void => {
  const failedUsage = (e as { apiUsage?: ApiUsage[] }).apiUsage;
  if (failedUsage?.length) {
    persistUsage(store, pid, `POST /api/projects/${pid}/sources/voice/failed`, failedUsage);
  }
};

const runSttPipeline = async (
  store: ProjectStore,
  client: Mistral,
  pid: string,
  file: Express.Multer.File,
  lang: string,
  res: Response,
): Promise<SttPipelineResult | null> => {
  const { result: sttResult, usage } = await runWithUsageTracking(() =>
    transcribeAudio(client, file.buffer, file.originalname || 'audio.webm', lang),
  );
  const persisted = persistUsage(store, pid, `POST /api/projects/${pid}/sources/voice`, usage);
  const { text, elapsed } = sttResult;
  if (!text || text.trim().length === 0) {
    res.status(400).json({ error: 'Transcription vide — aucune parole detectee' });
    return null;
  }
  return { text, elapsed, persisted };
};

const persistAndDispatchVoiceSource = (
  deps: ConsigneDeps,
  fingerprint: string,
  pid: string,
  stt: SttPipelineResult,
  lang: string,
): Source => {
  const modCats = getModerationCategories(deps.store, deps.profileStore, pid);
  const source = buildVoiceSource(stt.text, stt.persisted, modCats);
  deps.store.addSource(pid, source);
  logger.info('sources', `STT OK: ${stt.text.length} chars (${stt.elapsed.toFixed(1)}s)`);
  startModerationsThenDetect(deps, fingerprint, pid, lang, modCats, [source]);
  return source;
};

const isSsrfError = (err: unknown): boolean => {
  if (!(err instanceof Error)) return false;
  return SSRF_ERROR_MARKERS.some((marker) => err.message.includes(marker));
};

const webSource = (
  label: string,
  markdown: string,
  now: string,
  modCats: string[] | null,
  scrapeEngine?: Source['scrapeEngine'],
): Source => ({
  id: randomUUID(),
  filename: label.slice(0, 80),
  markdown,
  uploadedAt: now,
  sourceType: 'websearch',
  scrapeEngine,
  moderation: modCats ? pendingModeration() : undefined,
});

// Échec du scraping direct : bug du parseur (SyntaxError) et rejet de la garde SSRF relancés, sans
// repli (le rejet SSRF est journalisé une fois, par trackWebSource) ; autre échec → repli Mistral.
const handleScrapeFailure = (scrapeError: unknown, url: string): void => {
  if (scrapeError instanceof SyntaxError) {
    logger.error('sources', `URL scrape parser bug for "${url}":`, scrapeError);
    throw scrapeError;
  }
  if (isSsrfError(scrapeError)) throw scrapeError;
  logger.warn(
    'sources',
    `URL scrape failed for "${url}", falling back to web search:`,
    scrapeError,
  );
};

const scrapeDirectUrl = async (
  url: string,
  scrapeMode: string,
  modCats: string[] | null,
  now: string,
): Promise<Source> => {
  const stop = startTimer();
  const result = await fetchPageContent(url, scrapeMode as Parameters<typeof fetchPageContent>[1]);
  const elapsed = stop();
  logger.info(
    'sources',
    `URL scraped [${result.engine}]: "${url}" (${elapsed.toFixed(1)}s, ${result.text.length} chars)`,
  );
  return webSource(url, result.text, now, modCats, result.engine);
};

// Repli par la recherche web Mistral sur l'URL. Un échec REMONTE (plus avalé en null) : son code
// stable (quota_exceeded, auth_required…) arrive dans failures[].code via trackWebSource.
const fallbackWebSearchUrl = async (
  client: Mistral,
  url: string,
  lang: string,
  ageGroup: AgeGroup,
  modCats: string[] | null,
  now: string,
): Promise<Source> => {
  const { text, elapsed } = await webSearchEnrich(client, url, lang, ageGroup);
  logger.info(
    'sources',
    `URL fallback [mistral]: "${url}" (${elapsed.toFixed(1)}s, ${text.length} chars)`,
  );
  return webSource(url, text, now, modCats, 'mistral');
};

const scrapeUrl = async (
  client: Mistral,
  url: string,
  scrapeMode: string,
  lang: string,
  ageGroup: AgeGroup,
  modCats: string[] | null,
  now: string,
): Promise<Source> => {
  try {
    return await scrapeDirectUrl(url, scrapeMode, modCats, now);
  } catch (scrapeError) {
    handleScrapeFailure(scrapeError, url);
  }
  return fallbackWebSearchUrl(client, url, lang, ageGroup, modCats, now);
};

const searchByKeywords = async (
  client: Mistral,
  searchQuery: string,
  lang: string,
  ageGroup: AgeGroup,
  modCats: string[] | null,
  now: string,
): Promise<Source> => {
  const { text, elapsed } = await webSearchEnrich(client, searchQuery, lang, ageGroup);
  const webLabel = lang === 'en' ? 'Web search' : 'Recherche web';
  logger.info(
    'sources',
    `Web search OK: "${searchQuery}" (${elapsed.toFixed(1)}s, ${text.length} chars)`,
  );
  return webSource(`${webLabel}: ${searchQuery.slice(0, 50)}`, text, now, modCats);
};

// Code d'un échec de collecte : url_blocked pour un rejet de la garde SSRF, journalisé en warn
// SANS stack (la cause suffit) ; sinon code stable de l'erreur, journalisée avec sa stack.
const webFailureCode = (label: string, err: unknown): string => {
  if (isSsrfError(err)) {
    logger.warn('sources', `${label} rejected (SSRF guard): ${(err as Error).message}`);
    return URL_BLOCKED;
  }
  logger.error('sources', `${label} failed`, err);
  return extractErrorCode(err);
};

const trackWebSource = async (
  store: ProjectStore,
  pid: string,
  label: string,
  fn: WebSourceTask,
): Promise<WebSourceOutcome> => {
  try {
    const { result: source, usage } = await runWithUsageTracking(fn);
    const persisted = persistUsage(
      store,
      pid,
      `POST /api/projects/${pid}/sources/websearch`,
      usage,
    );
    if (persisted) {
      source.estimatedCost = persisted.cost;
      source.usage = persisted.usage;
      source.costBreakdown = persisted.costBreakdown;
    }
    return { source, failure: null };
  } catch (err) {
    const failedUsage = (err as { apiUsage?: ApiUsage[] }).apiUsage;
    if (failedUsage?.length) {
      persistUsage(store, pid, `POST /api/projects/${pid}/sources/websearch/failed`, failedUsage);
    }
    return { source: null, failure: { label, code: webFailureCode(label, err) } };
  }
};

const pushOutcome = (
  outcome: WebSourceOutcome,
  sources: Source[],
  failures: WebSourceFailure[],
): void => {
  if (outcome.source) sources.push(outcome.source);
  if (outcome.failure) failures.push(outcome.failure);
};

const collectWebSources = async (
  store: ProjectStore,
  client: Mistral,
  pid: string,
  params: WebSearchParams,
  modCats: string[] | null,
): Promise<{ sources: Source[]; failures: WebSourceFailure[] }> => {
  const { lang, ageGroup, scrapeMode } = params;
  const { urls, searchQuery } = parseWebInput(params.query.trim());
  const sources: Source[] = [];
  const failures: WebSourceFailure[] = [];
  const now = new Date().toISOString();
  for (const url of urls) {
    const outcome = await trackWebSource(store, pid, `URL scrape: ${url}`, () =>
      scrapeUrl(client, url, scrapeMode, lang, ageGroup, modCats, now),
    );
    pushOutcome(outcome, sources, failures);
  }
  if (searchQuery) {
    const outcome = await trackWebSource(store, pid, `Keyword search: ${searchQuery}`, () =>
      searchByKeywords(client, searchQuery, lang, ageGroup, modCats, now),
    );
    pushOutcome(outcome, sources, failures);
  }
  return { sources, failures };
};

const respondWebsearchSources = (
  res: Response,
  sources: Source[],
  failures: WebSourceFailure[],
): void => {
  if (failures.length > 0) res.json({ sources, failures });
  else res.json(sources);
};

// Aucune source créée : 422 url_blocked si la garde SSRF a rejeté TOUTES les tentatives, sinon
// 502 all_sources_failed (repli en échec, erreur de l'API, mélange avec des rejets SSRF). failures[]
// ({ label, code }) détaille chaque échec. Au moins une source : respondWebsearchSources (200).
const respondNoWebSources = (res: Response, failures: WebSourceFailure[]): void => {
  const allBlocked = failures.length > 0 && failures.every((f) => f.code === URL_BLOCKED);
  if (allBlocked) {
    res.status(422).json({ error: URL_BLOCKED, failures });
    return;
  }
  res.status(502).json({ error: ALL_SOURCES_FAILED, failures });
};

const persistWebsearchSources = (
  deps: ConsigneDeps,
  fingerprint: string,
  pid: string,
  sources: Source[],
  modCats: string[] | null,
  lang: string,
): void => {
  for (const s of sources) deps.store.addSource(pid, s);
  startModerationsThenDetect(deps, fingerprint, pid, lang, modCats, sources);
};

type UploadRequest = { files: Express.Multer.File[]; lang: string; allowDuplicates: boolean };

// Champs de /sources/upload, lus APRÈS multer (multipart) : fichiers présents, `lang` valide. Un
// refus supprime les fichiers que diskStorage a déjà écrits (sinon orphelins dans le dossier
// uploads du projet). null = 400 déjà envoyé. `allowDuplicates === 'true'` STRICT (cf. CLAUDE.md).
const readUploadRequest = (req: Request, res: Response): UploadRequest | null => {
  const files = (req.files as Express.Multer.File[] | undefined) ?? [];
  if (files.length === 0) {
    res.status(400).json({ error: 'Aucun fichier envoye' });
    return null;
  }
  const lang = readBodyLang(req, res);
  if (lang === null) {
    for (const file of files) tryUnlinkOrphan(file.path);
    return null;
  }
  const allowDuplicates = req.body.allowDuplicates === 'true' || req.body.allowDuplicates === true;
  return { files, lang, allowDuplicates };
};

const registerUploadRoute = (
  router: Router,
  store: ProjectStore,
  profileStore: ProfileStore,
  dynamicUpload: ReturnType<typeof createDynamicUpload>,
): void => {
  router.post(
    '/:pid/sources/upload',
    requireKeyMiddleware,
    requireExistingProject(store),
    withUploadErrors(dynamicUpload.array('files')),
    async (req, res) => {
      const resolved = resolveOr4xx(req, res);
      if (!resolved) return;
      const { client, fingerprint } = resolved;
      const pid = String(req.params.pid);
      // Projet supprimé entre la garde pré-multer et ici : fichiers reçus supprimés.
      if (!store.getProject(pid)) {
        unlinkReceivedFiles(req);
        res.status(404).json({ error: ERR_PROJECT_NOT_FOUND });
        return;
      }
      const upload = readUploadRequest(req, res);
      if (!upload) return;
      const modCats = getModerationCategories(store, profileStore, pid);
      const { results, failures, duplicates } = await processUploadBatch(
        store,
        client,
        upload.files,
        pid,
        modCats,
        upload.allowDuplicates,
      );
      if (results.length > 0) {
        const deps = { store, profileStore, client };
        startModerationsThenDetect(deps, fingerprint, pid, upload.lang, modCats, results);
      }
      sendUploadResponse(res, results, failures, duplicates);
    },
  );
};

const registerTextRoute = (
  router: Router,
  store: ProjectStore,
  profileStore: ProfileStore,
): void => {
  router.post('/:pid/sources/text', async (req, res) => {
    const resolved = resolveOr4xx(req, res);
    if (!resolved) return;
    const { client, fingerprint } = resolved;
    if (!store.getProject(req.params.pid)) {
      res.status(404).json({ error: ERR_PROJECT_NOT_FOUND });
      return;
    }
    const { text } = req.body;
    if (isBlankString(text)) {
      res.status(400).json({ error: 'Texte requis' });
      return;
    }
    const lang = readBodyLang(req, res);
    if (lang === null) return;
    const modCats = getModerationCategories(store, profileStore, req.params.pid);
    const checked = await moderateUserInput(client, res, text, modCats);
    if (!checked.ok) return;
    const source: Source = {
      id: randomUUID(),
      filename: 'Texte libre',
      markdown: text.trim(),
      uploadedAt: new Date().toISOString(),
      sourceType: 'text',
      moderation: checked.moderation,
      estimatedCost: 0,
    };
    store.addSource(req.params.pid, source);
    logger.info('sources', `Texte libre ajoute: ${source.markdown.length} chars`);
    // Texte modéré AVANT sa création (moderateUserInput) : aucune modération à lancer.
    triggerConsigneDetection({ store, profileStore, client }, fingerprint, req.params.pid, lang);
    res.json(source);
  });
};

const registerVoiceRoute = (
  router: Router,
  store: ProjectStore,
  profileStore: ProfileStore,
  memoryUpload: ReturnType<typeof createMemoryUpload>,
): void => {
  router.post(
    '/:pid/sources/voice',
    requireKeyMiddleware,
    withUploadErrors(memoryUpload.single('audio')),
    async (req, res) => {
      const resolved = resolveOr4xx(req, res);
      if (!resolved) return;
      const { client, fingerprint } = resolved;
      const pid = String(req.params.pid);
      if (!store.getProject(pid)) {
        res.status(404).json({ error: ERR_PROJECT_NOT_FOUND });
        return;
      }
      const file = req.file;
      if (!file) {
        res.status(400).json({ error: 'Fichier audio requis' });
        return;
      }
      const lang = readBodyLang(req, res);
      if (lang === null) return;
      try {
        const stt = await runSttPipeline(store, client, pid, file, lang, res);
        if (!stt) return;
        const deps = { store, profileStore, client };
        res.json(persistAndDispatchVoiceSource(deps, fingerprint, pid, stt, lang));
      } catch (e) {
        persistFailedUsage(store, pid, e);
        logger.error('sources', 'STT error:', e);
        res.status(500).json({ error: extractErrorCode(e, 'stt') });
      }
    },
  );
};

const registerWebsearchRoute = (
  router: Router,
  store: ProjectStore,
  profileStore: ProfileStore,
): void => {
  router.post('/:pid/sources/websearch', async (req, res) => {
    const resolved = resolveOr4xx(req, res);
    if (!resolved) return;
    const { client, fingerprint } = resolved;
    const pid = String(req.params.pid);
    if (!store.getProject(pid)) {
      res.status(404).json({ error: ERR_PROJECT_NOT_FOUND });
      return;
    }
    const params = validateWebsearchBody(req, res);
    if (params === null) return;
    const modCats = getModerationCategories(store, profileStore, pid);
    if (!(await moderateUserInput(client, res, params.query, modCats)).ok) return;
    try {
      const { sources, failures } = await collectWebSources(store, client, pid, params, modCats);
      if (sources.length === 0) {
        respondNoWebSources(res, failures);
        return;
      }
      const deps = { store, profileStore, client };
      persistWebsearchSources(deps, fingerprint, pid, sources, modCats, params.lang);
      respondWebsearchSources(res, sources, failures);
    } catch (e) {
      logger.error('sources', 'Web search error:', e);
      res.status(500).json({ error: extractErrorCode(e) });
    }
  });
};

const registerDeleteRoute = (router: Router, store: ProjectStore): void => {
  // `consigne` : consigne restante (store.deleteSource efface celle qui dépendait de la source),
  // null sinon ; le front s'y resynchronise.
  router.delete('/:pid/sources/:sid', (req, res) => {
    const result = store.deleteSource(req.params.pid, req.params.sid);
    if (!result) {
      res.status(404).json({ error: 'Projet ou source introuvable' });
      return;
    }
    res.json({ ok: true, consigne: result.consigne ?? null });
  });
};

const NO_SOURCES_REJECTION: ModerationRejection = { status: 400, error: 'no_sources' };

// Aucune source utilisable pour la détection : refus selon le statut de garde des sources, comme
// une génération (400 moderation.blocked, 503 moderation.error, 409 moderation.pending) ; projet
// sans source (ou profil non modéré) : 400 no_sources.
const unusableSourcesRejection = (
  project: LoadedProject,
  profileStore: ProfileStore,
): ModerationRejection => {
  const blocked = activeModerationCategories(moderationProfileOf(project, profileStore));
  const status = blocked ? blockingModerationStatus(project.sources, blocked) : undefined;
  return moderationRejection(status) ?? NO_SOURCES_REJECTION;
};

// Réponse : 200 `{ consigne, costDelta }` — `consigne` = consigne persistée (null si aucune),
// `costDelta` = coût de CET appel (0 sans usage facturable), à ajouter au total du projet.
const sendConsigneOutcome = (
  res: Response,
  outcome: ConsigneOutcome,
  profileStore: ProfileStore,
): void => {
  if (outcome.kind === 'missing') {
    res.status(404).json({ error: ERR_PROJECT_NOT_FOUND });
    return;
  }
  if (outcome.kind === 'unusable') {
    const rejection = unusableSourcesRejection(outcome.project, profileStore);
    res.status(rejection.status).json({ error: rejection.error });
    return;
  }
  res.json({ consigne: outcome.consigne, costDelta: outcome.costDelta });
};

// Détection à la demande (« Détecter la consigne », « Ré-analyser ») : auth-first, 404, `lang`
// validé (400 invalid_input) AVANT toute modération et tout appel LLM, puis même détection que la
// tâche de fond avec l'attente d'une requête (MODERATION_WAIT_MS.request).
const registerConsigneRoute = (
  router: Router,
  store: ProjectStore,
  profileStore: ProfileStore,
): void => {
  router.post('/:pid/detect-consigne', async (req, res) => {
    const resolved = resolveOr4xx(req, res);
    if (!resolved) return;
    const pid = String(req.params.pid);
    if (!projectExists(store, pid)) {
      res.status(404).json({ error: ERR_PROJECT_NOT_FOUND });
      return;
    }
    const lang = readBodyLang(req, res);
    if (lang === null) return;
    try {
      const deps = { store, profileStore, client: resolved.client };
      const outcome = await detectProjectConsigne(deps, pid, lang, MODERATION_WAIT_MS.request);
      sendConsigneOutcome(res, outcome, profileStore);
    } catch (e) {
      logger.error('consigne', 'detection error:', e);
      res.status(500).json({ error: extractErrorCode(e) });
    }
  });
};

const registerModerateRoute = (router: Router): void => {
  router.post('/:pid/moderate', async (req, res) => {
    const resolved = resolveOr4xx(req, res);
    if (!resolved) return;
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: 'text requis' });
      return;
    }
    try {
      res.json(await moderateContent(resolved.client, text));
    } catch (e) {
      logger.error('moderation', 'error:', e);
      res.status(500).json({ error: extractErrorCode(e) });
    }
  });
};

// Plafond de sourceIds de POST /sources/moderate (le front envoie les sources à vérifier).
const MAX_MODERATE_SOURCE_IDS = 50;

type ModerateSourcesRequest = { sourceIds?: string[] };

// Corps de POST /sources/moderate : `sourceIds` absent (toutes les sources) ou tableau de chaînes
// d'au plus MAX_MODERATE_SOURCE_IDS éléments ; null = invalide (400 invalid_input).
const readModerateSourcesBody = (body: unknown): ModerateSourcesRequest | null => {
  const sourceIds = (body as { sourceIds?: unknown } | null | undefined)?.sourceIds;
  if (sourceIds === undefined) return {};
  if (!Array.isArray(sourceIds) || sourceIds.length > MAX_MODERATE_SOURCE_IDS) return null;
  return sourceIds.every((id) => typeof id === 'string') ? { sourceIds } : null;
};

// Statut PERSISTÉ des sources sélectionnées, relu après l'attente : le front en déduit le statut
// effectif avec les catégories du profil courant (sans objet `moderation` : champ absent).
const selectedModerations = (
  store: ProjectStore,
  pid: string,
  sourceIds?: string[],
): Array<Pick<Source, 'id' | 'moderation'>> => {
  const sources = store.getProject(pid)?.sources ?? [];
  return selectSources(sources, sourceIds).map((s) => ({ id: s.id, moderation: s.moderation }));
};

// Vérification à la demande (pré-contrôle des générations, bouton « Revérifier ») : reprend les
// modérations en attente ou en erreur des sources sélectionnées ([] ou absent = toutes) et attend
// au plus MODERATION_WAIT_MS.recheck. Profil propriétaire non modéré : rien n'est lancé, statuts
// actuels. Sous /sources/ : couverte par aiLimiter.
const registerSourceModerationRoute = (
  router: Router,
  store: ProjectStore,
  profileStore: ProfileStore,
): void => {
  router.post('/:pid/sources/moderate', async (req, res) => {
    const resolved = resolveOr4xx(req, res);
    if (!resolved) return;
    const pid = String(req.params.pid);
    if (!projectExists(store, pid)) {
      res.status(404).json({ error: ERR_PROJECT_NOT_FOUND });
      return;
    }
    const body = readModerateSourcesBody(req.body);
    if (!body) {
      res.status(400).json({ error: INVALID_INPUT });
      return;
    }
    try {
      const deps = { store, profileStore, client: resolved.client };
      const options = { sourceIds: body.sourceIds, waitMs: MODERATION_WAIT_MS.recheck };
      await settleSourceModeration(deps, pid, options);
      res.json({ sources: selectedModerations(store, pid, body.sourceIds) });
    } catch (e) {
      logger.error('moderation', 'recheck error:', e);
      res.status(500).json({ error: extractErrorCode(e, 'moderation') });
    }
  });
};

export function sourceRoutes(store: ProjectStore, profileStore: ProfileStore): Router {
  const router = Router();
  registerUploadRoute(router, store, profileStore, createDynamicUpload(store));
  registerTextRoute(router, store, profileStore);
  registerVoiceRoute(router, store, profileStore, createMemoryUpload());
  registerWebsearchRoute(router, store, profileStore);
  registerSourceModerationRoute(router, store, profileStore);
  registerDeleteRoute(router, store);
  registerConsigneRoute(router, store, profileStore);
  registerModerateRoute(router);
  return router;
}
