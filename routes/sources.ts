import { Router } from 'express';
import multer from 'multer';
import { randomUUID } from 'node:crypto';
import { Mistral } from '@mistralai/mistralai';
import type { Source } from '../types.js';
import type { ProjectStore } from '../store.js';
import { type ProfileStore, MODERATION_CATEGORIES } from '../profiles.js';
import { ocrFile } from '../generators/ocr.js';
import { moderateContent } from '../generators/moderation.js';
import { transcribeAudio } from '../generators/stt.js';
import { webSearchEnrich } from '../generators/websearch.js';
import { detectConsigne } from '../generators/consigne.js';
import { getMarkdown } from './generate.js';
import { parseWebInput, fetchPageContent, timer as startTimer } from '../helpers/index.js';
import { logger } from '../helpers/logger.js';
import { runWithUsageTracking } from '../helpers/usage-context.js';
import { aggregateUsage, calculateTotalCost, buildCostBreakdown } from '../helpers/pricing.js';

function pendingModeration(): Source['moderation'] {
  return { status: 'pending', categories: {} };
}

function errorModeration(): Source['moderation'] {
  return { status: 'error', categories: {} };
}

async function triggerConsigneDetection(store: ProjectStore, client: Mistral, pid: string, lang = 'fr') {
  try {
    const project = store.getProject(pid);
    if (!project || project.sources.length === 0) return;
    const markdown = getMarkdown(project.sources);
    const result = await detectConsigne(client, markdown, undefined, lang);
    if (!store.setConsigne(pid, result)) return;
    logger.info('consigne', `detection: ${result.found ? result.keyTopics.length + ' topics' : 'aucune'}`);
  } catch (e) {
    logger.error('consigne', 'detection error:', e);
  }
}

function getModerationCategories(
  store: ProjectStore,
  profileStore: ProfileStore,
  pid: string,
): string[] | null {
  const project = store.getProject(pid);
  if (!project) return null;
  const profileId = project.meta.profileId;
  if (!profileId) return null;
  const profile = profileStore.get(profileId);
  if (!profile?.useModeration) return null;
  return profile.moderationCategories ?? MODERATION_CATEGORIES[profile.ageGroup] ?? null;
}

async function triggerModeration(
  store: ProjectStore,
  client: Mistral,
  pid: string,
  sourceId: string,
  markdown: string,
  categories: string[],
) {
  try {
    const result = await moderateContent(client, markdown, categories);
    if (!store.setSourceModeration(pid, sourceId, result)) return;
    logger.info('moderation', `${result.status.toUpperCase()} (source ${sourceId.slice(0, 8)})`);
  } catch (e) {
    logger.error('moderation', 'error:', e);
    store.setSourceModeration(pid, sourceId, errorModeration());
  }
}

export function sourceRoutes(
  store: ProjectStore,
  client: Mistral,
  profileStore: ProfileStore,
): Router {
  const router = Router();

  const dynamicUpload = multer({
    storage: multer.diskStorage({
      destination: (req, _file, cb) => {
        const pid = String(req.params.pid);
        cb(null, store.getUploadDir(pid));
      },
      filename: (_req, file, cb) => cb(null, `${randomUUID()}-${file.originalname}`),
    }),
    limits: { fileSize: 20 * 1024 * 1024, files: 10 },
  });

  const memoryUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 25 * 1024 * 1024, files: 1 },
  });

  const TEXT_EXTS = new Set(['.txt', '.md']);

  /** Process a single uploaded file (OCR or text read). */
  async function processUploadedFile(
    file: Express.Multer.File,
    pid: string,
    modCats: string[] | null,
  ): Promise<Source> {
    const name = file.originalname.toLowerCase();
    const dotIdx = name.lastIndexOf('.');
    const ext = dotIdx >= 0 ? name.slice(dotIdx) : '';
    const isText = TEXT_EXTS.has(ext);
    let markdown: string;
    let elapsed: number;
    if (isText) {
      const stop = startTimer();
      markdown = (await import('node:fs')).readFileSync(file.path, 'utf-8');
      elapsed = stop();
      logger.info('sources', `TXT OK: ${file.originalname} (${elapsed.toFixed(1)}s, ${markdown.length} chars)`);
    } else {
      ({ markdown, elapsed } = await ocrFile(client, file.path, file.originalname));
      logger.info('sources', `OCR OK: ${file.originalname} (${elapsed.toFixed(1)}s, ${markdown.length} chars)`);
    }
    return {
      id: randomUUID(),
      filename: file.originalname,
      markdown,
      uploadedAt: new Date().toISOString(),
      sourceType: isText ? 'text' : 'ocr',
      filePath: `projects/${pid}/uploads/${file.filename}`,
      moderation: modCats ? pendingModeration() : undefined,
    };
  }

  // Upload files (OCR)
  router.post('/:pid/sources/upload', dynamicUpload.array('files'), async (req, res) => {
    const pid = String(req.params.pid);
    const project = store.getProject(pid);
    if (!project) {
      res.status(404).json({ error: 'Projet introuvable' });
      return;
    }

    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ error: 'Aucun fichier envoye' });
      return;
    }

    const results: Source[] = [];
    const modCats = getModerationCategories(store, profileStore, pid);
    for (const file of files) {
      try {
        const { result: source, usage } = await runWithUsageTracking(
          () => processUploadedFile(file, pid, modCats),
        );
        source.estimatedCost = usage.length > 0 ? calculateTotalCost(usage) : 0;
        if (usage.length > 0) {
          source.usage = aggregateUsage(usage);
          source.costBreakdown = buildCostBreakdown(usage);
        }
        store.addSource(pid, source);
        results.push(source);
      } catch (e) {
        logger.error('sources', `Upload FAIL: ${file.originalname}`, e);
        res.status(500).json({ error: `Echec pour ${file.originalname}: ${e}` });
        return;
      }
    }

    const lang = req.body.lang || 'fr';
    void triggerConsigneDetection(store, client, pid, lang);
    for (const src of results) {
      if (modCats) void triggerModeration(store, client, pid, src.id, src.markdown, modCats);
    }
    res.json(results);
  });

  // Add text source
  router.post('/:pid/sources/text', async (req, res) => {
    const project = store.getProject(req.params.pid);
    if (!project) {
      res.status(404).json({ error: 'Projet introuvable' });
      return;
    }

    const { text } = req.body;
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      res.status(400).json({ error: 'Texte requis' });
      return;
    }

    const modCats = getModerationCategories(store, profileStore, req.params.pid);
    let sourceModeration: Source['moderation'] = undefined;
    if (modCats) {
      const modResult = await moderateContent(client, text.trim(), modCats);
      if (modResult.status !== 'safe') {
        res.status(400).json({ error: 'moderation.blocked' });
        return;
      }
      sourceModeration = modResult;
    }

    const source: Source = {
      id: randomUUID(),
      filename: 'Texte libre',
      markdown: text.trim(),
      uploadedAt: new Date().toISOString(),
      sourceType: 'text',
      moderation: sourceModeration,
      estimatedCost: 0,
    };
    store.addSource(req.params.pid, source);
    logger.info('sources', `Texte libre ajoute: ${source.markdown.length} chars`);
    const lang = req.body.lang || 'fr';
    void triggerConsigneDetection(store, client, req.params.pid, lang);
    res.json(source);
  });

  // Voice input (Voxtral STT)
  router.post('/:pid/sources/voice', memoryUpload.single('audio'), async (req, res) => {
    const pid = String(req.params.pid);
    const project = store.getProject(pid);
    if (!project) {
      res.status(404).json({ error: 'Projet introuvable' });
      return;
    }

    const file = req.file;
    if (!file) {
      res.status(400).json({ error: 'Fichier audio requis' });
      return;
    }

    try {
      const lang = req.body.lang || 'fr';
      const { result: sttResult, usage } = await runWithUsageTracking(() =>
        transcribeAudio(client, file.buffer, file.originalname || 'audio.webm', lang),
      );
      const { text, elapsed } = sttResult;
      if (!text || text.trim().length === 0) {
        res.status(400).json({ error: 'Transcription vide — aucune parole detectee' });
        return;
      }
      const modCats = getModerationCategories(store, profileStore, pid);
      const source: Source = {
        id: randomUUID(),
        filename: 'Enregistrement vocal',
        markdown: text.trim(),
        uploadedAt: new Date().toISOString(),
        sourceType: 'voice',
        moderation: modCats ? pendingModeration() : undefined,
        ...(usage.length > 0 && { usage: aggregateUsage(usage), estimatedCost: calculateTotalCost(usage), costBreakdown: buildCostBreakdown(usage) }),
      };
      store.addSource(pid, source);
      logger.info('sources', `STT OK: ${text.length} chars (${elapsed.toFixed(1)}s)`);
      void triggerConsigneDetection(store, client, pid, lang);
      if (modCats) {
        void triggerModeration(store, client, pid, source.id, source.markdown, modCats);
      }
      res.json(source);
    } catch (e) {
      logger.error('sources', 'STT error:', e);
      res.status(500).json({ error: `Transcription echouee: ${e}` });
    }
  });

  /** Scrape a single URL, falling back to Mistral web_search on failure. */
  async function scrapeUrl(
    url: string,
    scrapeMode: string,
    lang: string,
    ageGroup: import('../types.js').AgeGroup,
    modCats: string[] | null,
    now: string,
  ): Promise<Source | null> {
    try {
      const stop = startTimer();
      const result = await fetchPageContent(url, scrapeMode as any);
      const elapsed = stop();
      logger.info('sources', `URL scraped [${result.engine}]: "${url}" (${elapsed.toFixed(1)}s, ${result.text.length} chars)`);
      return {
        id: randomUUID(), filename: url.slice(0, 80), markdown: result.text,
        uploadedAt: now, sourceType: 'websearch', scrapeEngine: result.engine,
        moderation: modCats ? pendingModeration() : undefined,
      };
    } catch {
      logger.warn('sources', `URL scrape failed for "${url}", falling back to web search`);
    }
    try {
      const { text, elapsed } = await webSearchEnrich(client, url, lang, ageGroup);
      logger.info('sources', `URL fallback [mistral]: "${url}" (${elapsed.toFixed(1)}s, ${text.length} chars)`);
      return {
        id: randomUUID(), filename: url.slice(0, 80), markdown: text,
        uploadedAt: now, sourceType: 'websearch', scrapeEngine: 'mistral',
        moderation: modCats ? pendingModeration() : undefined,
      };
    } catch (e) {
      logger.error('sources', `URL failed completely: "${url}"`, e);
      return null;
    }
  }

  /** Perform a keyword web search via Mistral agent. */
  async function searchByKeywords(
    searchQuery: string,
    lang: string,
    ageGroup: import('../types.js').AgeGroup,
    modCats: string[] | null,
    now: string,
  ): Promise<Source> {
    const { text, elapsed } = await webSearchEnrich(client, searchQuery, lang, ageGroup);
    const webLabel = lang === 'en' ? 'Web search' : 'Recherche web';
    logger.info('sources', `Web search OK: "${searchQuery}" (${elapsed.toFixed(1)}s, ${text.length} chars)`);
    return {
      id: randomUUID(),
      filename: `${webLabel}: ${searchQuery.slice(0, 50)}`,
      markdown: text,
      uploadedAt: now,
      sourceType: 'websearch',
      moderation: modCats ? pendingModeration() : undefined,
    };
  }

  /** Collect sources from URLs and/or keyword search. */
  async function collectWebSources(req: any, pid: string, modCats: string[] | null): Promise<Source[]> {
    const lang = req.body.lang || 'fr';
    const ageGroup: import('../types.js').AgeGroup = req.body.ageGroup || 'enfant';
    const { urls, searchQuery } = parseWebInput(req.body.query.trim());
    const scrapeMode = req.body.scrapeMode || 'auto';
    const sources: Source[] = [];
    const now = new Date().toISOString();

    for (const url of urls) {
      const source = await scrapeUrl(url, scrapeMode, lang, ageGroup, modCats, now);
      if (source) {
        store.addSource(pid, source);
        sources.push(source);
      }
    }

    if (searchQuery) {
      const source = await searchByKeywords(searchQuery, lang, ageGroup, modCats, now);
      store.addSource(pid, source);
      sources.push(source);
    }

    return sources;
  }

  // Web search / URL scrape source
  router.post('/:pid/sources/websearch', async (req, res) => {
    const pid = String(req.params.pid);
    if (!store.getProject(pid)) {
      res.status(404).json({ error: 'Projet introuvable' });
      return;
    }

    const { query } = req.body;
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      res.status(400).json({ error: 'query requis' });
      return;
    }

    const modCats = getModerationCategories(store, profileStore, pid);
    if (modCats) {
      const modResult = await moderateContent(client, query.trim(), modCats);
      if (modResult.status !== 'safe') {
        res.status(400).json({ error: 'moderation.blocked' });
        return;
      }
    }

    try {
      const { result: sources, usage } = await runWithUsageTracking(
        () => collectWebSources(req, pid, modCats),
      );
      if (sources.length === 0) {
        res.status(500).json({ error: 'Aucune source extraite' });
        return;
      }
      if (usage.length > 0) {
        const costPerSource = calculateTotalCost(usage) / sources.length;
        const usagePerSource = aggregateUsage(usage);
        for (const s of sources) {
          s.estimatedCost = costPerSource;
          s.usage = usagePerSource;
        }
      }
      const lang = req.body.lang || 'fr';
      void triggerConsigneDetection(store, client, pid, lang);
      for (const s of sources) {
        if (modCats) void triggerModeration(store, client, pid, s.id, s.markdown, modCats);
      }
      res.json(sources);
    } catch (e) {
      logger.error('sources', 'Web search error:', e);
      res.status(500).json({ error: `Recherche web echouee: ${e}` });
    }
  });

  // Delete source
  router.delete('/:pid/sources/:sid', (req, res) => {
    const result = store.deleteSource(req.params.pid, req.params.sid);
    if (!result) {
      res.status(404).json({ error: 'Projet ou source introuvable' });
      return;
    }
    res.json({ ok: true });
  });

  // Consigne detection (manual trigger)
  router.post('/:pid/detect-consigne', async (req, res) => {
    const pid = String(req.params.pid);
    const project = store.getProject(pid);
    if (!project) {
      res.status(404).json({ error: 'Projet introuvable' });
      return;
    }
    if (project.sources.length === 0) {
      res.status(400).json({ error: 'Aucune source' });
      return;
    }
    try {
      const lang = req.body.lang || 'fr';
      const markdown = getMarkdown(project.sources);
      const result = await detectConsigne(client, markdown, undefined, lang);
      if (!store.setConsigne(pid, result)) {
        res.status(404).json({ error: 'Projet introuvable' });
        return;
      }
      res.json(result);
    } catch (e) {
      logger.error('consigne', 'detection error:', e);
      res.status(500).json({ error: String(e) });
    }
  });

  // Moderation
  router.post('/:pid/moderate', async (req, res) => {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: 'text requis' });
      return;
    }
    try {
      const result = await moderateContent(client, text);
      res.json(result);
    } catch (e) {
      logger.error('moderation', 'error:', e);
      res.status(500).json({ error: String(e) });
    }
  });

  return router;
}
