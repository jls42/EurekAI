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

function pendingModeration(): Source['moderation'] {
  return { status: 'pending', categories: {} };
}

function errorModeration(): Source['moderation'] {
  return { status: 'error', categories: {} };
}

function triggerConsigneDetection(store: ProjectStore, client: Mistral, pid: string, lang = 'fr') {
  setTimeout(async () => {
    try {
      const project = store.getProject(pid);
      if (!project || project.sources.length === 0) return;
      const markdown = getMarkdown(project.sources);
      const result = await detectConsigne(client, markdown, undefined, lang);
      if (!store.setConsigne(pid, result)) return;
      console.log(
        `  Consigne detection: ${result.found ? result.keyTopics.length + ' topics' : 'aucune'}`,
      );
    } catch (e) {
      console.error('  Consigne detection error:', e);
    }
  }, 100);
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

function triggerModeration(
  store: ProjectStore,
  client: Mistral,
  pid: string,
  sourceId: string,
  markdown: string,
  categories: string[],
) {
  setTimeout(async () => {
    try {
      const result = await moderateContent(client, markdown, categories);
      if (!store.setSourceModeration(pid, sourceId, result)) return;
      console.log(`  Moderation: ${result.status.toUpperCase()} (source ${sourceId.slice(0, 8)})`);
    } catch (e) {
      console.error('  Moderation error:', e);
      store.setSourceModeration(pid, sourceId, errorModeration());
    }
  }, 100);
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
        const { markdown, elapsed } = await ocrFile(client, file.path, file.originalname);
        const source: Source = {
          id: randomUUID(),
          filename: file.originalname,
          markdown,
          uploadedAt: new Date().toISOString(),
          sourceType: 'ocr',
          filePath: `projects/${pid}/uploads/${file.filename}`,
          moderation: modCats ? pendingModeration() : undefined,
        };
        store.addSource(pid, source);
        results.push(source);
        console.log(
          `  OCR OK: ${file.originalname} (${elapsed.toFixed(1)}s, ${markdown.length} chars)`,
        );
      } catch (e) {
        console.error(`  OCR FAIL: ${file.originalname} — ${e}`);
        res.status(500).json({ error: `OCR echoue pour ${file.originalname}: ${e}` });
        return;
      }
    }

    const lang = req.body.lang || 'fr';
    triggerConsigneDetection(store, client, pid, lang);
    for (const src of results) {
      if (modCats) {
        triggerModeration(store, client, pid, src.id, src.markdown, modCats);
      }
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
    };
    store.addSource(req.params.pid, source);
    console.log(`  Texte libre ajoute: ${source.markdown.length} chars`);
    const lang = req.body.lang || 'fr';
    triggerConsigneDetection(store, client, req.params.pid, lang);
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
      const { text, elapsed } = await transcribeAudio(
        client,
        file.buffer,
        file.originalname || 'audio.webm',
        lang,
      );
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
      };
      store.addSource(pid, source);
      console.log(`  STT OK: ${text.length} chars (${elapsed.toFixed(1)}s)`);
      triggerConsigneDetection(store, client, pid, lang);
      if (modCats) {
        triggerModeration(store, client, pid, source.id, source.markdown, modCats);
      }
      res.json(source);
    } catch (e) {
      console.error('STT error:', e);
      res.status(500).json({ error: `Transcription echouee: ${e}` });
    }
  });

  // Web search source
  router.post('/:pid/sources/websearch', async (req, res) => {
    const pid = String(req.params.pid);
    const project = store.getProject(pid);
    if (!project) {
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
      const lang = req.body.lang || 'fr';
      const ageGroup = req.body.ageGroup || 'enfant';
      const { text, elapsed } = await webSearchEnrich(client, query.trim(), lang, ageGroup);
      const webLabel = lang === 'en' ? 'Web search' : 'Recherche web';
      const source: Source = {
        id: randomUUID(),
        filename: `${webLabel}: ${query.trim().slice(0, 50)}`,
        markdown: text,
        uploadedAt: new Date().toISOString(),
        sourceType: 'websearch',
        moderation: modCats ? pendingModeration() : undefined,
      };
      store.addSource(pid, source);
      console.log(
        `  Web search OK: "${query.trim()}" (${elapsed.toFixed(1)}s, ${text.length} chars)`,
      );
      triggerConsigneDetection(store, client, pid, lang);
      if (modCats) {
        triggerModeration(store, client, pid, source.id, source.markdown, modCats);
      }
      res.json(source);
    } catch (e) {
      console.error('Web search error:', e);
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
      console.error('Consigne detection error:', e);
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
      console.error('Moderation error:', e);
      res.status(500).json({ error: String(e) });
    }
  });

  return router;
}
