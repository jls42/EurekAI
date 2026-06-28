import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import { randomUUID, createHash } from 'node:crypto';
import { readFileSync, unlinkSync } from 'node:fs';
import { Mistral } from '@mistralai/mistralai';
import type { Source, OcrConfidence, AgeGroup, DuplicateUpload } from '../types.js';
import type { ProjectStore } from '../store.js';
import { type ProfileStore, MODERATION_CATEGORIES } from '../profiles.js';
import { ocrFile } from '../generators/ocr.js';
import { normalizeOcrModel } from '../helpers/ocr-models.js';
import { moderateContent } from '../generators/moderation.js';
import { transcribeAudio } from '../generators/stt.js';
import { webSearchEnrich } from '../generators/websearch.js';
import { detectConsigne } from '../generators/consigne.js';
import { getMarkdown } from './generate.js';
import { parseWebInput, fetchPageContent, timer as startTimer } from '../helpers/index.js';
import { logger } from '../helpers/logger.js';
import { extractErrorCode } from '../helpers/error-codes.js';
import { runWithUsageTracking } from '../helpers/usage-context.js';
import { persistUsage } from '../helpers/cost-persist.js';
import type { ApiUsage } from '../helpers/pricing.js';
import { getConfig } from '../config.js';
import { resolveClient, requireKeyMiddleware } from '../helpers/mistral-client-factory.js';

const ERR_PROJECT_NOT_FOUND = 'Projet introuvable';

function pendingModeration(): Source['moderation'] {
  return { status: 'pending', categories: {} };
}

// cf. CLAUDE.md "Pièges Lizard"
const errorModeration = (): Source['moderation'] => ({ status: 'error', categories: {} });

// Texte vide/non-string (arrow pour éviter l'agglomération Lizard + garder les
// handlers sous CCN 8 après ajout de la garde auth resolveOr4xx).
const isBlankString = (v: unknown): boolean => !v || typeof v !== 'string' || v.trim().length === 0;

// Dédup ré-import : sha256 du fichier brut (avant OCR) ; comparé aux contentHash existants.
const hashFileContent = (path: string): string | undefined => {
  try {
    return createHash('sha256').update(readFileSync(path)).digest('hex');
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
    logger.warn('sources', `unlink orphan duplicate failed: ${path}`, e);
  }
};

// Sous-helper : valide le query input pour /sources/websearch. Retourne null si
// invalide (et envoie déjà la réponse HTTP) — caller juste `return` après.
function validateWebsearchQuery(req: Request, res: Response): string | null {
  const { query } = req.body;
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    res.status(400).json({ error: 'query requis' });
    return null;
  }
  return query;
}

const runConsigneDetection = async (
  store: ProjectStore,
  client: Mistral,
  pid: string,
  lang: string,
): Promise<void> => {
  try {
    const project = store.getProject(pid);
    if (!project || project.sources.length === 0) return;
    const markdown = getMarkdown(project.sources);
    const result = await detectConsigne(client, markdown, undefined, lang);
    if (!store.setConsigne(pid, result)) return;
    logger.info(
      'consigne',
      `detection: ${result.found ? result.keyTopics.length + ' topics' : 'aucune'}`,
    );
  } catch (e) {
    logger.error('consigne', 'detection error:', e);
    const code = extractErrorCode(e, 'consigne');
    store.setConsigneError(pid, code);
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

const triggerConsigneDetection = (
  store: ProjectStore,
  client: Mistral,
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
      await runConsigneDetection(store, client, pid, lang);
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
        triggerConsigneDetection(store, client, fingerprint, pid, nextLang);
      }
    }
  })();
};

const getModerationCategories = (
  store: ProjectStore,
  profileStore: ProfileStore,
  pid: string,
): string[] | null => {
  const project = store.getProject(pid);
  if (!project) return null;
  const profileId = project.meta.profileId;
  if (!profileId) return null;
  const profile = profileStore.get(profileId);
  if (!profile?.useModeration) return null;
  return profile.moderationCategories ?? MODERATION_CATEGORIES[profile.ageGroup] ?? null;
};

// Sous-helper websearch : si modération activée, vérifie que la query passe la modération.
// Retourne true si OK, false si bloquée (réponse 400 déjà envoyée). Module-scope (n'utilise
// que des params) — cf. SonarQube S7721 ; arrow pour éviter l'agglomération Lizard.
const checkWebsearchModeration = async (
  client: Mistral,
  res: Response,
  query: string,
  modCats: string[] | null,
): Promise<boolean> => {
  if (!modCats) return true;
  const modResult = await moderateContent(client, query.trim(), modCats);
  if (modResult.status !== 'safe') {
    res.status(400).json({ error: 'moderation.blocked' });
    return false;
  }
  return true;
};

const triggerModeration = async (
  store: ProjectStore,
  client: Mistral,
  pid: string,
  sourceId: string,
  markdown: string,
  categories: string[],
): Promise<void> => {
  try {
    const result = await moderateContent(client, markdown, categories);
    if (!store.setSourceModeration(pid, sourceId, result)) return;
    logger.info('moderation', `${result.status.toUpperCase()} (source ${sourceId.slice(0, 8)})`);
  } catch (e) {
    logger.error('moderation', 'error:', e);
    store.setSourceModeration(pid, sourceId, errorModeration());
  }
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
type WebSearchBody = { lang?: string; ageGroup?: AgeGroup; query: string; scrapeMode?: string };
type ProcessedUpload = { markdown: string; elapsed: number; confidence?: OcrConfidence };
type SttPipelineResult = {
  text: string;
  elapsed: number;
  persisted: ReturnType<typeof persistUsage>;
};

const TEXT_EXTS = new Set(['.txt', '.md']);

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
      destination: (req, _file, cb) => {
        const pid = String(req.params.pid);
        cb(null, store.getUploadDir(pid));
      },
      filename: (_req, file, cb) => {
        cb(null, `${randomUUID()}-${file.originalname}`);
      },
    }),
    limits: { fileSize: 20 * 1024 * 1024, files: 10 }, // NOSONAR(S5693) — limite bornée volontaire (20 Mo, 10 fichiers) : c'est le garde-fou anti-DoS upload
  });

const createMemoryUpload = () =>
  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 25 * 1024 * 1024, files: 1 }, // NOSONAR(S5693) — limite bornée volontaire (25 Mo, 1 fichier) : c'est le garde-fou anti-DoS upload
  });

const uploadedFileExt = (file: Express.Multer.File): string => {
  const name = file.originalname.toLowerCase();
  const dotIdx = name.lastIndexOf('.');
  return dotIdx >= 0 ? name.slice(dotIdx) : '';
};

const readTextUpload = (file: Express.Multer.File): ProcessedUpload => {
  const stop = startTimer();
  const markdown = readFileSync(file.path, 'utf-8');
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
  const processed = isText ? readTextUpload(file) : await readOcrUpload(client, file);
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
    const failedUsage = (e as { apiUsage?: ApiUsage[] }).apiUsage;
    if (failedUsage?.length) {
      persistUsage(store, pid, `POST /api/projects/${pid}/sources/upload/failed`, failedUsage);
    }
    logger.error('sources', `Upload FAIL: ${file.originalname}`, e);
    return { failure: { filename: file.originalname, error: extractErrorCode(e) } };
  }
};

const triggerUploadDownstream = (
  store: ProjectStore,
  client: Mistral,
  fingerprint: string,
  pid: string,
  lang: string,
  modCats: string[] | null,
  results: Source[],
): void => {
  triggerConsigneDetection(store, client, fingerprint, pid, lang);
  if (!modCats) return;
  for (const src of results)
    void triggerModeration(store, client, pid, src.id, src.markdown, modCats);
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
    const hash = hashFileContent(file.path);
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
  store: ProjectStore,
  profileStore: ProfileStore,
  client: Mistral,
  fingerprint: string,
  pid: string,
  stt: SttPipelineResult,
  lang: string,
): Source => {
  const modCats = getModerationCategories(store, profileStore, pid);
  const source = buildVoiceSource(stt.text, stt.persisted, modCats);
  store.addSource(pid, source);
  logger.info('sources', `STT OK: ${stt.text.length} chars (${stt.elapsed.toFixed(1)}s)`);
  triggerConsigneDetection(store, client, fingerprint, pid, lang);
  if (modCats) void triggerModeration(store, client, pid, source.id, source.markdown, modCats);
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

const handleScrapeFailure = (scrapeError: unknown, url: string): void => {
  if (scrapeError instanceof SyntaxError) {
    logger.error('sources', `URL scrape parser bug for "${url}":`, scrapeError);
    throw scrapeError;
  }
  if (isSsrfError(scrapeError)) {
    logger.warn(
      'sources',
      `URL rejected (SSRF guard): "${url}" — ${(scrapeError as Error).message}`,
    );
    throw scrapeError;
  }
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

const fallbackWebSearchUrl = async (
  client: Mistral,
  url: string,
  lang: string,
  ageGroup: AgeGroup,
  modCats: string[] | null,
  now: string,
): Promise<Source | null> => {
  try {
    const { text, elapsed } = await webSearchEnrich(client, url, lang, ageGroup);
    logger.info(
      'sources',
      `URL fallback [mistral]: "${url}" (${elapsed.toFixed(1)}s, ${text.length} chars)`,
    );
    return webSource(url, text, now, modCats, 'mistral');
  } catch (e) {
    logger.error('sources', `URL failed completely: "${url}"`, e);
    return null;
  }
};

const scrapeUrl = async (
  client: Mistral,
  url: string,
  scrapeMode: string,
  lang: string,
  ageGroup: AgeGroup,
  modCats: string[] | null,
  now: string,
): Promise<Source | null> => {
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

const trackWebSource = async (
  store: ProjectStore,
  pid: string,
  label: string,
  fn: () => Promise<Source | null>,
): Promise<WebSourceOutcome> => {
  try {
    const { result: source, usage } = await runWithUsageTracking(fn);
    const persisted = persistUsage(
      store,
      pid,
      `POST /api/projects/${pid}/sources/websearch`,
      usage,
    );
    if (source && persisted) {
      source.estimatedCost = persisted.cost;
      source.usage = persisted.usage;
      source.costBreakdown = persisted.costBreakdown;
    }
    if (!source) return { source: null, failure: { label, code: 'upstream_unavailable' } };
    return { source, failure: null };
  } catch (err) {
    const failedUsage = (err as { apiUsage?: ApiUsage[] }).apiUsage;
    if (failedUsage?.length) {
      persistUsage(store, pid, `POST /api/projects/${pid}/sources/websearch/failed`, failedUsage);
    }
    logger.error('sources', `${label} failed`, err);
    return { source: null, failure: { label, code: extractErrorCode(err) } };
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
  body: WebSearchBody,
  modCats: string[] | null,
): Promise<{ sources: Source[]; failures: WebSourceFailure[] }> => {
  const lang = body.lang || 'fr';
  const ageGroup: AgeGroup = body.ageGroup || 'enfant';
  const { urls, searchQuery } = parseWebInput(body.query.trim());
  const scrapeMode = body.scrapeMode || 'auto';
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

const persistWebsearchSources = (
  store: ProjectStore,
  client: Mistral,
  fingerprint: string,
  pid: string,
  sources: Source[],
  modCats: string[] | null,
  lang: string,
): void => {
  for (const s of sources) store.addSource(pid, s);
  triggerConsigneDetection(store, client, fingerprint, pid, lang);
  for (const s of sources) {
    if (modCats) void triggerModeration(store, client, pid, s.id, s.markdown, modCats);
  }
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
    dynamicUpload.array('files'),
    async (req, res) => {
      const resolved = resolveOr4xx(req, res);
      if (!resolved) return;
      const { client, fingerprint } = resolved;
      const pid = String(req.params.pid);
      if (!store.getProject(pid)) {
        res.status(404).json({ error: ERR_PROJECT_NOT_FOUND });
        return;
      }
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        res.status(400).json({ error: 'Aucun fichier envoye' });
        return;
      }
      const modCats = getModerationCategories(store, profileStore, pid);
      const allowDuplicates =
        req.body.allowDuplicates === 'true' || req.body.allowDuplicates === true;
      const { results, failures, duplicates } = await processUploadBatch(
        store,
        client,
        files,
        pid,
        modCats,
        allowDuplicates,
      );
      if (results.length > 0) {
        triggerUploadDownstream(
          store,
          client,
          fingerprint,
          pid,
          req.body.lang || 'fr',
          modCats,
          results,
        );
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
    const modCats = getModerationCategories(store, profileStore, req.params.pid);
    const moderation = modCats ? await moderateContent(client, text.trim(), modCats) : undefined;
    if (moderation?.status && moderation.status !== 'safe') {
      res.status(400).json({ error: 'moderation.blocked' });
      return;
    }
    const source: Source = {
      id: randomUUID(),
      filename: 'Texte libre',
      markdown: text.trim(),
      uploadedAt: new Date().toISOString(),
      sourceType: 'text',
      moderation,
      estimatedCost: 0,
    };
    store.addSource(req.params.pid, source);
    logger.info('sources', `Texte libre ajoute: ${source.markdown.length} chars`);
    triggerConsigneDetection(store, client, fingerprint, req.params.pid, req.body.lang || 'fr');
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
    memoryUpload.single('audio'),
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
      try {
        const lang = req.body.lang || 'fr';
        const stt = await runSttPipeline(store, client, pid, file, lang, res);
        if (!stt) return;
        res.json(
          persistAndDispatchVoiceSource(store, profileStore, client, fingerprint, pid, stt, lang),
        );
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
    const query = validateWebsearchQuery(req, res);
    if (query === null) return;
    const modCats = getModerationCategories(store, profileStore, pid);
    if (!(await checkWebsearchModeration(client, res, query, modCats))) return;
    try {
      const { sources, failures } = await collectWebSources(store, client, pid, req.body, modCats);
      if (sources.length === 0) {
        res.status(500).json({ error: 'Aucune source extraite', failures });
        return;
      }
      persistWebsearchSources(
        store,
        client,
        fingerprint,
        pid,
        sources,
        modCats,
        req.body.lang || 'fr',
      );
      respondWebsearchSources(res, sources, failures);
    } catch (e) {
      logger.error('sources', 'Web search error:', e);
      res.status(500).json({ error: extractErrorCode(e) });
    }
  });
};

const registerDeleteRoute = (router: Router, store: ProjectStore): void => {
  router.delete('/:pid/sources/:sid', (req, res) => {
    const result = store.deleteSource(req.params.pid, req.params.sid);
    if (!result) {
      res.status(404).json({ error: 'Projet ou source introuvable' });
      return;
    }
    res.json({ ok: true });
  });
};

const registerConsigneRoute = (router: Router, store: ProjectStore): void => {
  router.post('/:pid/detect-consigne', async (req, res) => {
    const resolved = resolveOr4xx(req, res);
    if (!resolved) return;
    const { client } = resolved;
    const pid = String(req.params.pid);
    const project = store.getProject(pid);
    if (!project) {
      res.status(404).json({ error: ERR_PROJECT_NOT_FOUND });
      return;
    }
    if (project.sources.length === 0) {
      res.status(400).json({ error: 'Aucune source' });
      return;
    }
    try {
      const result = await detectConsigne(
        client,
        getMarkdown(project.sources),
        undefined,
        req.body.lang || 'fr',
      );
      if (!store.setConsigne(pid, result)) {
        res.status(404).json({ error: ERR_PROJECT_NOT_FOUND });
        return;
      }
      res.json(result);
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

export function sourceRoutes(store: ProjectStore, profileStore: ProfileStore): Router {
  const router = Router();
  registerUploadRoute(router, store, profileStore, createDynamicUpload(store));
  registerTextRoute(router, store, profileStore);
  registerVoiceRoute(router, store, profileStore, createMemoryUpload());
  registerWebsearchRoute(router, store, profileStore);
  registerDeleteRoute(router, store);
  registerConsigneRoute(router, store);
  registerModerateRoute(router);
  return router;
}
