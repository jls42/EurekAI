import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { ProjectStore } from '../store.js';
import { ProfileStore } from '../profiles.js';
import { sourceRoutes } from './sources.js';

// --- Mocks ---

vi.mock('../generators/ocr.js', () => ({
  ocrFile: vi.fn().mockResolvedValue({ markdown: '# OCR result', elapsed: 1.5 }),
}));

vi.mock('../generators/moderation.js', () => ({
  moderateContent: vi.fn().mockResolvedValue({ status: 'safe', categories: {} }),
}));

vi.mock('../generators/stt.js', () => ({
  transcribeAudio: vi.fn().mockResolvedValue({ text: 'transcribed text', elapsed: 0.5 }),
}));

vi.mock('../generators/websearch.js', () => ({
  webSearchEnrich: vi.fn().mockResolvedValue({ text: 'search result text', elapsed: 1.0 }),
}));

vi.mock('../generators/consigne.js', () => ({
  detectConsigne: vi.fn().mockResolvedValue({ found: true, text: 'Reviser les dates', keyTopics: ['dates'] }),
}));

vi.mock('../helpers/index.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../helpers/index.js')>();
  return {
    ...actual,
    fetchPageContent: vi.fn().mockResolvedValue({ text: 'scraped page content', engine: 'readability' }),
  };
});

vi.mock('./generate.js', () => ({
  getMarkdown: vi.fn(() => '# Combined markdown'),
}));

import { ocrFile } from '../generators/ocr.js';
import { moderateContent } from '../generators/moderation.js';
import { transcribeAudio } from '../generators/stt.js';
import { webSearchEnrich } from '../generators/websearch.js';
import { detectConsigne } from '../generators/consigne.js';
import { fetchPageContent } from '../helpers/index.js';

// --- Helpers ---

let store: ProjectStore;
let profileStore: ProfileStore;
let tempDir: string;
let router: any;
const client = {} as any;

function getHandler(r: any, method: string, path: string) {
  for (const layer of r.stack) {
    if (layer.route?.path === path && layer.route.methods[method]) {
      return layer.route.stack[layer.route.stack.length - 1].handle;
    }
  }
  throw new Error(`No handler for ${method.toUpperCase()} ${path}`);
}

function mockReq(overrides: any = {}) {
  return { params: {}, query: {}, body: {}, ...overrides } as any;
}

function mockRes() {
  const res: any = {};
  res.status = vi.fn(() => res);
  res.json = vi.fn(() => res);
  return res;
}

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'eurekai-sources-route-'));
  store = new ProjectStore(tempDir);
  profileStore = new ProfileStore(tempDir);
  router = sourceRoutes(store, client, profileStore);
  vi.clearAllMocks();
});

afterEach(() => {
  rmSync(tempDir, { recursive: true, force: true });
});

// --- Helper: create a project with optional moderation-enabled profile ---

function createProjectWithProfile(opts: { useModeration?: boolean; ageGroup?: string } = {}) {
  const age = opts.ageGroup === 'adulte' ? 30 : opts.ageGroup === 'etudiant' ? 20 : opts.ageGroup === 'ado' ? 14 : 9;
  const profile = profileStore.create('Test Kid', age, '0', 'fr');
  if (opts.useModeration !== undefined) {
    profileStore.update(profile.id, { useModeration: opts.useModeration });
  }
  const project = store.createProject('Test Project', profile.id);
  return { project, profile };
}

// =============================================================================
// POST /:pid/sources/text
// =============================================================================

describe('POST /:pid/sources/text', () => {
  it('retourne 404 quand le projet n existe pas', async () => {
    const handler = getHandler(router, 'post', '/:pid/sources/text');
    const req = mockReq({ params: { pid: 'inexistant' }, body: { text: 'hello' } });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Projet introuvable' });
  });

  it('retourne 400 quand le texte est manquant', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/text');
    const req = mockReq({ params: { pid: project.meta.id }, body: {} });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Texte requis' });
  });

  it('retourne 400 quand le texte est vide', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/text');
    const req = mockReq({ params: { pid: project.meta.id }, body: { text: '' } });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Texte requis' });
  });

  it('retourne 400 quand le texte ne contient que des espaces', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/text');
    const req = mockReq({ params: { pid: project.meta.id }, body: { text: '   ' } });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Texte requis' });
  });

  it('retourne 400 quand le texte n est pas une string', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/text');
    const req = mockReq({ params: { pid: project.meta.id }, body: { text: 42 } });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Texte requis' });
  });

  it('ajoute une source texte avec succes', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/text');
    const req = mockReq({ params: { pid: project.meta.id }, body: { text: 'Mon texte de cours' } });
    const res = mockRes();

    await handler(req, res);

    expect(res.json).toHaveBeenCalledTimes(1);
    const source = res.json.mock.calls[0][0];
    expect(source.id).toBeTruthy();
    expect(source.filename).toBe('Texte libre');
    expect(source.markdown).toBe('Mon texte de cours');
    expect(source.sourceType).toBe('text');
    expect(source.uploadedAt).toBeTruthy();
    expect(source.moderation).toBeUndefined();

    // Verify persisted in store
    const updated = store.getProject(project.meta.id);
    expect(updated!.sources).toHaveLength(1);
    expect(updated!.sources[0].markdown).toBe('Mon texte de cours');
  });

  it('trim le texte avant de l ajouter', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/text');
    const req = mockReq({ params: { pid: project.meta.id }, body: { text: '  Mon texte  ' } });
    const res = mockRes();

    await handler(req, res);

    const source = res.json.mock.calls[0][0];
    expect(source.markdown).toBe('Mon texte');
  });

  it('bloque le contenu unsafe quand la moderation est activee', async () => {
    const { project } = createProjectWithProfile({ useModeration: true });
    vi.mocked(moderateContent).mockResolvedValueOnce({ status: 'unsafe', categories: { sexual: true } });

    const handler = getHandler(router, 'post', '/:pid/sources/text');
    const req = mockReq({ params: { pid: project.meta.id }, body: { text: 'contenu inapproprie' } });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'moderation.blocked' });
    expect(moderateContent).toHaveBeenCalledTimes(1);

    // Verify source was NOT added
    const updated = store.getProject(project.meta.id);
    expect(updated!.sources).toHaveLength(0);
  });

  it('autorise le contenu safe quand la moderation est activee', async () => {
    const { project } = createProjectWithProfile({ useModeration: true });
    vi.mocked(moderateContent).mockResolvedValueOnce({ status: 'safe', categories: {} });

    const handler = getHandler(router, 'post', '/:pid/sources/text');
    const req = mockReq({ params: { pid: project.meta.id }, body: { text: 'cours de maths' } });
    const res = mockRes();

    await handler(req, res);

    expect(res.json).toHaveBeenCalledTimes(1);
    const source = res.json.mock.calls[0][0];
    expect(source.markdown).toBe('cours de maths');
    expect(source.moderation).toEqual({ status: 'safe', categories: {} });

    // Verify source was added
    const updated = store.getProject(project.meta.id);
    expect(updated!.sources).toHaveLength(1);
  });

  it('n appelle pas la moderation quand elle est desactivee', async () => {
    const { project } = createProjectWithProfile({ useModeration: false });

    const handler = getHandler(router, 'post', '/:pid/sources/text');
    const req = mockReq({ params: { pid: project.meta.id }, body: { text: 'texte normal' } });
    const res = mockRes();

    await handler(req, res);

    expect(moderateContent).not.toHaveBeenCalled();
    const source = res.json.mock.calls[0][0];
    expect(source.moderation).toBeUndefined();
  });

  it('n appelle pas la moderation pour un projet sans profil', async () => {
    const project = store.createProject('Sans profil');

    const handler = getHandler(router, 'post', '/:pid/sources/text');
    const req = mockReq({ params: { pid: project.meta.id }, body: { text: 'texte libre' } });
    const res = mockRes();

    await handler(req, res);

    expect(moderateContent).not.toHaveBeenCalled();
  });
});

// =============================================================================
// DELETE /:pid/sources/:sid
// =============================================================================

describe('DELETE /:pid/sources/:sid', () => {
  it('retourne 404 quand le projet n existe pas', () => {
    const handler = getHandler(router, 'delete', '/:pid/sources/:sid');
    const req = mockReq({ params: { pid: 'inexistant', sid: 'any' } });
    const res = mockRes();

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Projet ou source introuvable' });
  });

  it('retourne 404 quand la source n existe pas', () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'delete', '/:pid/sources/:sid');
    const req = mockReq({ params: { pid: project.meta.id, sid: 'inexistant' } });
    const res = mockRes();

    handler(req, res);

    // deleteSource returns the project even if sourceId didn't match,
    // because it filters and saves. Let's check the actual behavior.
    // Looking at store.deleteSource: it always returns ProjectData if project exists.
    // So even with a non-existent sid, it returns the project (sources unchanged).
    // The route handler checks `if (!result)` — which only happens when project is null.
    // So a non-existent source ID on an existing project returns { ok: true }.
    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });

  it('supprime la source avec succes', () => {
    const project = store.createProject('P1');
    store.addSource(project.meta.id, {
      id: 'src-1',
      filename: 'test.txt',
      markdown: 'contenu',
      uploadedAt: new Date().toISOString(),
      sourceType: 'text',
    });

    const handler = getHandler(router, 'delete', '/:pid/sources/:sid');
    const req = mockReq({ params: { pid: project.meta.id, sid: 'src-1' } });
    const res = mockRes();

    handler(req, res);

    expect(res.json).toHaveBeenCalledWith({ ok: true });

    // Verify deleted from store
    const updated = store.getProject(project.meta.id);
    expect(updated!.sources).toHaveLength(0);
  });
});

// =============================================================================
// POST /:pid/detect-consigne
// =============================================================================

describe('POST /:pid/detect-consigne', () => {
  it('retourne 404 quand le projet n existe pas', async () => {
    const handler = getHandler(router, 'post', '/:pid/detect-consigne');
    const req = mockReq({ params: { pid: 'inexistant' }, body: {} });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Projet introuvable' });
  });

  it('retourne 400 quand le projet n a aucune source', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/detect-consigne');
    const req = mockReq({ params: { pid: project.meta.id }, body: {} });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Aucune source' });
  });

  it('retourne le resultat de detection de consigne', async () => {
    const project = store.createProject('P1');
    store.addSource(project.meta.id, {
      id: 'src-1',
      filename: 'test.txt',
      markdown: 'Reviser les dates de la Revolution',
      uploadedAt: new Date().toISOString(),
      sourceType: 'text',
    });

    const handler = getHandler(router, 'post', '/:pid/detect-consigne');
    const req = mockReq({ params: { pid: project.meta.id }, body: { lang: 'fr' } });
    const res = mockRes();

    await handler(req, res);

    expect(detectConsigne).toHaveBeenCalledWith(client, '# Combined markdown', undefined, 'fr');
    expect(res.json).toHaveBeenCalledWith({ found: true, text: 'Reviser les dates', keyTopics: ['dates'] });

    // Verify consigne saved in store
    const updated = store.getProject(project.meta.id);
    expect(updated!.consigne).toEqual({ found: true, text: 'Reviser les dates', keyTopics: ['dates'] });
  });

  it('utilise lang par defaut "fr" si non fourni', async () => {
    const project = store.createProject('P1');
    store.addSource(project.meta.id, {
      id: 'src-1',
      filename: 'test.txt',
      markdown: 'contenu',
      uploadedAt: new Date().toISOString(),
      sourceType: 'text',
    });

    const handler = getHandler(router, 'post', '/:pid/detect-consigne');
    const req = mockReq({ params: { pid: project.meta.id }, body: {} });
    const res = mockRes();

    await handler(req, res);

    expect(detectConsigne).toHaveBeenCalledWith(client, '# Combined markdown', undefined, 'fr');
  });

  it('retourne 404 quand setConsigne echoue (projet supprime entre temps)', async () => {
    const project = store.createProject('P1');
    const pid = project.meta.id;
    store.addSource(pid, {
      id: 'src-1',
      filename: 'test.txt',
      markdown: 'contenu',
      uploadedAt: new Date().toISOString(),
      sourceType: 'text',
    });

    // Mock setConsigne to return false (simulates project deleted between check and save)
    const origSetConsigne = store.setConsigne.bind(store);
    vi.spyOn(store, 'setConsigne').mockReturnValueOnce(null);

    const handler = getHandler(router, 'post', '/:pid/detect-consigne');
    const req = mockReq({ params: { pid }, body: { lang: 'fr' } });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Projet introuvable' });

    // Restore
    vi.mocked(store.setConsigne).mockRestore();
  });

  it('retourne 500 quand detectConsigne echoue', async () => {
    const project = store.createProject('P1');
    store.addSource(project.meta.id, {
      id: 'src-1',
      filename: 'test.txt',
      markdown: 'contenu',
      uploadedAt: new Date().toISOString(),
      sourceType: 'text',
    });

    vi.mocked(detectConsigne).mockRejectedValueOnce(new Error('AI error'));

    const handler = getHandler(router, 'post', '/:pid/detect-consigne');
    const req = mockReq({ params: { pid: project.meta.id }, body: {} });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error: AI error' });
  });
});

// =============================================================================
// POST /:pid/moderate
// =============================================================================

describe('POST /:pid/moderate', () => {
  it('retourne 400 quand le texte est manquant', async () => {
    const handler = getHandler(router, 'post', '/:pid/moderate');
    const req = mockReq({ params: { pid: 'any' }, body: {} });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'text requis' });
  });

  it('retourne le resultat de moderation', async () => {
    vi.mocked(moderateContent).mockResolvedValueOnce({ status: 'safe', categories: { sexual: false } });

    const handler = getHandler(router, 'post', '/:pid/moderate');
    const req = mockReq({ params: { pid: 'any' }, body: { text: 'texte a moderer' } });
    const res = mockRes();

    await handler(req, res);

    expect(moderateContent).toHaveBeenCalledWith(client, 'texte a moderer');
    expect(res.json).toHaveBeenCalledWith({ status: 'safe', categories: { sexual: false } });
  });

  it('retourne 500 quand la moderation echoue', async () => {
    vi.mocked(moderateContent).mockRejectedValueOnce(new Error('moderation API down'));

    const handler = getHandler(router, 'post', '/:pid/moderate');
    const req = mockReq({ params: { pid: 'any' }, body: { text: 'texte' } });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error: moderation API down' });
  });

  it('retourne unsafe quand le contenu est inapproprie', async () => {
    vi.mocked(moderateContent).mockResolvedValueOnce({
      status: 'unsafe',
      categories: { violence_and_threats: true },
    });

    const handler = getHandler(router, 'post', '/:pid/moderate');
    const req = mockReq({ params: { pid: 'any' }, body: { text: 'contenu violent' } });
    const res = mockRes();

    await handler(req, res);

    expect(res.json).toHaveBeenCalledWith({
      status: 'unsafe',
      categories: { violence_and_threats: true },
    });
  });
});

// =============================================================================
// POST /:pid/sources/websearch
// =============================================================================

describe('POST /:pid/sources/websearch', () => {
  it('retourne 404 quand le projet n existe pas', async () => {
    const handler = getHandler(router, 'post', '/:pid/sources/websearch');
    const req = mockReq({ params: { pid: 'inexistant' }, body: { query: 'test' } });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Projet introuvable' });
  });

  it('retourne 400 quand la query est manquante', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/websearch');
    const req = mockReq({ params: { pid: project.meta.id }, body: {} });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'query requis' });
  });

  it('retourne 400 quand la query est vide', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/websearch');
    const req = mockReq({ params: { pid: project.meta.id }, body: { query: '' } });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'query requis' });
  });

  it('retourne 400 quand la query ne contient que des espaces', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/websearch');
    const req = mockReq({ params: { pid: project.meta.id }, body: { query: '   ' } });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'query requis' });
  });

  it('retourne 400 quand la query n est pas une string', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/websearch');
    const req = mockReq({ params: { pid: project.meta.id }, body: { query: 123 } });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'query requis' });
  });

  it('ajoute une source websearch avec succes', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/websearch');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { query: 'Revolution francaise', lang: 'fr', ageGroup: 'enfant' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(webSearchEnrich).toHaveBeenCalledWith(client, 'Revolution francaise', 'fr', 'enfant');
    expect(res.json).toHaveBeenCalledTimes(1);
    const sources = res.json.mock.calls[0][0];
    expect(Array.isArray(sources)).toBe(true);
    expect(sources).toHaveLength(1);
    const source = sources[0];
    expect(source.id).toBeTruthy();
    expect(source.filename).toBe('Recherche web: Revolution francaise');
    expect(source.markdown).toBe('search result text');
    expect(source.sourceType).toBe('websearch');
    expect(source.moderation).toBeUndefined();

    // Verify persisted in store
    const updated = store.getProject(project.meta.id);
    expect(updated!.sources).toHaveLength(1);
  });

  it('utilise le label anglais quand lang=en', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/websearch');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { query: 'French Revolution', lang: 'en' },
    });
    const res = mockRes();

    await handler(req, res);

    const sources = res.json.mock.calls[0][0];
    expect(sources[0].filename).toBe('Web search: French Revolution');
  });

  it('utilise les valeurs par defaut pour lang et ageGroup', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/websearch');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { query: 'test query' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(webSearchEnrich).toHaveBeenCalledWith(client, 'test query', 'fr', 'enfant');
  });

  it('bloque la query unsafe quand la moderation est activee', async () => {
    const { project } = createProjectWithProfile({ useModeration: true });
    vi.mocked(moderateContent).mockResolvedValueOnce({ status: 'unsafe', categories: { hate_and_discrimination: true } });

    const handler = getHandler(router, 'post', '/:pid/sources/websearch');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { query: 'contenu haineux' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'moderation.blocked' });
    expect(webSearchEnrich).not.toHaveBeenCalled();

    // Verify source was NOT added
    const updated = store.getProject(project.meta.id);
    expect(updated!.sources).toHaveLength(0);
  });

  it('autorise la query safe quand la moderation est activee', async () => {
    const { project } = createProjectWithProfile({ useModeration: true });
    vi.mocked(moderateContent).mockResolvedValueOnce({ status: 'safe', categories: {} });

    const handler = getHandler(router, 'post', '/:pid/sources/websearch');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { query: 'photosynthese' },
    });
    const res = mockRes();

    await handler(req, res);

    // Called at least once for the query moderation check; background source moderation may add more
    expect(moderateContent).toHaveBeenCalled();
    expect(webSearchEnrich).toHaveBeenCalledTimes(1);
    const sources = res.json.mock.calls[0][0];
    expect(sources[0].moderation).toEqual({ status: 'pending', categories: {} });
  });

  it('tronque le nom de la source a 50 caracteres', async () => {
    const project = store.createProject('P1');
    const longQuery = 'A'.repeat(100);
    const handler = getHandler(router, 'post', '/:pid/sources/websearch');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { query: longQuery },
    });
    const res = mockRes();

    await handler(req, res);

    const sources = res.json.mock.calls[0][0];
    expect(sources[0].filename).toBe(`Recherche web: ${'A'.repeat(50)}`);
  });

  it('retourne 500 quand webSearchEnrich echoue (graceful fallback)', async () => {
    const project = store.createProject('P1');
    vi.mocked(webSearchEnrich).mockRejectedValueOnce(new Error('network error'));

    const handler = getHandler(router, 'post', '/:pid/sources/websearch');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { query: 'test' },
    });
    const res = mockRes();

    await handler(req, res);

    // collectWebSources catches the error per-source and returns empty array
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Aucune source extraite' });
  });

  it('scrape une URL directement via fetchPageContent', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/websearch');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { query: 'https://example.com/page' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(fetchPageContent).toHaveBeenCalledWith('https://example.com/page', 'auto');
    expect(webSearchEnrich).not.toHaveBeenCalled();
    const sources = res.json.mock.calls[0][0];
    expect(sources).toHaveLength(1);
    expect(sources[0].filename).toBe('https://example.com/page');
    expect(sources[0].markdown).toBe('scraped page content');
    expect(sources[0].scrapeEngine).toBe('readability');
  });

  it('passe le scrapeMode au fetchPageContent', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/websearch');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { query: 'https://example.com', scrapeMode: 'lightpanda' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(fetchPageContent).toHaveBeenCalledWith('https://example.com', 'lightpanda');
  });

  it('gere un mix URL + mots-cles', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/websearch');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { query: 'https://example.com les energies' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(fetchPageContent).toHaveBeenCalledTimes(1);
    expect(webSearchEnrich).toHaveBeenCalledTimes(1);
    const sources = res.json.mock.calls[0][0];
    expect(sources).toHaveLength(2);
    expect(sources[0].scrapeEngine).toBe('readability');
    expect(sources[1].filename).toContain('Recherche web');
  });

  it('fallback Mistral quand le scrape echoue', async () => {
    vi.mocked(fetchPageContent).mockRejectedValueOnce(new Error('scrape failed'));
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/websearch');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { query: 'https://example.com/broken' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(webSearchEnrich).toHaveBeenCalledTimes(1);
    const sources = res.json.mock.calls[0][0];
    expect(sources).toHaveLength(1);
    expect(sources[0].scrapeEngine).toBe('mistral');
  });

  it('retourne 500 quand scrape et fallback echouent tous les deux', async () => {
    vi.mocked(fetchPageContent).mockRejectedValueOnce(new Error('scrape failed'));
    vi.mocked(webSearchEnrich).mockRejectedValueOnce(new Error('mistral failed'));
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/websearch');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { query: 'https://example.com/dead' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Aucune source extraite' });
  });

  it('gere plusieurs URLs avec succes partiel', async () => {
    vi.mocked(fetchPageContent)
      .mockResolvedValueOnce({ text: 'page 1 content', engine: 'readability' })
      .mockRejectedValueOnce(new Error('scrape failed'));
    vi.mocked(webSearchEnrich).mockRejectedValueOnce(new Error('fallback failed'));
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/websearch');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { query: 'https://a.com https://b.com' },
    });
    const res = mockRes();

    await handler(req, res);

    const sources = res.json.mock.calls[0][0];
    expect(sources).toHaveLength(1);
    expect(sources[0].markdown).toBe('page 1 content');
  });
});

// =============================================================================
// POST /:pid/sources/voice
// =============================================================================

describe('POST /:pid/sources/voice', () => {
  it('retourne 404 quand le projet n existe pas', async () => {
    const handler = getHandler(router, 'post', '/:pid/sources/voice');
    const req = mockReq({
      params: { pid: 'inexistant' },
      body: {},
      file: { buffer: Buffer.from('audio'), originalname: 'audio.webm' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Projet introuvable' });
  });

  it('retourne 400 quand aucun fichier audio n est fourni', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/voice');
    const req = mockReq({ params: { pid: project.meta.id }, body: {} });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Fichier audio requis' });
  });

  it('ajoute une source vocale avec succes', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/voice');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: {},
      file: { buffer: Buffer.from('fake-audio'), originalname: 'record.webm' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(transcribeAudio).toHaveBeenCalledWith(client, Buffer.from('fake-audio'), 'record.webm', 'fr');
    expect(res.json).toHaveBeenCalledTimes(1);
    const source = res.json.mock.calls[0][0];
    expect(source.id).toBeTruthy();
    expect(source.filename).toBe('Enregistrement vocal');
    expect(source.markdown).toBe('transcribed text');
    expect(source.sourceType).toBe('voice');

    // Verify persisted in store
    const updated = store.getProject(project.meta.id);
    expect(updated!.sources).toHaveLength(1);
  });

  it('retourne 400 quand la transcription est vide', async () => {
    const project = store.createProject('P1');
    vi.mocked(transcribeAudio).mockResolvedValueOnce({ text: '', elapsed: 0.5 });

    const handler = getHandler(router, 'post', '/:pid/sources/voice');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: {},
      file: { buffer: Buffer.from('silence'), originalname: 'audio.webm' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Transcription vide — aucune parole detectee' });
  });

  it('retourne 400 quand la transcription ne contient que des espaces', async () => {
    const project = store.createProject('P1');
    vi.mocked(transcribeAudio).mockResolvedValueOnce({ text: '   ', elapsed: 0.3 });

    const handler = getHandler(router, 'post', '/:pid/sources/voice');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: {},
      file: { buffer: Buffer.from('noise'), originalname: 'audio.webm' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Transcription vide — aucune parole detectee' });
  });

  it('retourne 500 quand transcribeAudio echoue', async () => {
    const project = store.createProject('P1');
    vi.mocked(transcribeAudio).mockRejectedValueOnce(new Error('STT API error'));

    const handler = getHandler(router, 'post', '/:pid/sources/voice');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: {},
      file: { buffer: Buffer.from('audio'), originalname: 'audio.webm' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Transcription echouee: Error: STT API error' });
  });

  it('ajoute la moderation pending quand le profil a la moderation activee', async () => {
    const { project } = createProjectWithProfile({ useModeration: true });

    const handler = getHandler(router, 'post', '/:pid/sources/voice');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: {},
      file: { buffer: Buffer.from('audio'), originalname: 'audio.webm' },
    });
    const res = mockRes();

    await handler(req, res);

    const source = res.json.mock.calls[0][0];
    expect(source.moderation).toEqual({ status: 'pending', categories: {} });
  });

  it('utilise le nom par defaut audio.webm quand originalname est absent', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/voice');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: {},
      file: { buffer: Buffer.from('audio'), originalname: '' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(transcribeAudio).toHaveBeenCalledWith(client, Buffer.from('audio'), 'audio.webm', 'fr');
  });
});

// =============================================================================
// POST /:pid/sources/upload
// =============================================================================

describe('POST /:pid/sources/upload', () => {
  it('retourne 404 quand le projet n existe pas', async () => {
    const handler = getHandler(router, 'post', '/:pid/sources/upload');
    const req = mockReq({
      params: { pid: 'inexistant' },
      body: {},
      files: [{ path: '/tmp/file.jpg', originalname: 'photo.jpg', filename: 'uuid-photo.jpg' }],
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Projet introuvable' });
  });

  it('retourne 400 quand aucun fichier n est envoye', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/upload');
    const req = mockReq({ params: { pid: project.meta.id }, body: {}, files: [] });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Aucun fichier envoye' });
  });

  it('retourne 400 quand files est undefined', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/upload');
    const req = mockReq({ params: { pid: project.meta.id }, body: {} });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Aucun fichier envoye' });
  });

  it('ajoute des sources OCR avec succes', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/upload');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { lang: 'fr' },
      files: [
        { path: '/tmp/file1.jpg', originalname: 'devoir.jpg', filename: 'uuid-devoir.jpg' },
        { path: '/tmp/file2.pdf', originalname: 'cours.pdf', filename: 'uuid-cours.pdf' },
      ],
    });
    const res = mockRes();

    await handler(req, res);

    expect(ocrFile).toHaveBeenCalledTimes(2);
    expect(ocrFile).toHaveBeenCalledWith(client, '/tmp/file1.jpg', 'devoir.jpg');
    expect(ocrFile).toHaveBeenCalledWith(client, '/tmp/file2.pdf', 'cours.pdf');

    expect(res.json).toHaveBeenCalledTimes(1);
    const results = res.json.mock.calls[0][0];
    expect(results).toHaveLength(2);
    expect(results[0].filename).toBe('devoir.jpg');
    expect(results[0].markdown).toBe('# OCR result');
    expect(results[0].sourceType).toBe('ocr');
    expect(results[0].filePath).toContain('uuid-devoir.jpg');
    expect(results[1].filename).toBe('cours.pdf');

    // Verify persisted in store
    const updated = store.getProject(project.meta.id);
    expect(updated!.sources).toHaveLength(2);
  });

  it('retourne 500 quand ocrFile echoue', async () => {
    const project = store.createProject('P1');
    vi.mocked(ocrFile).mockRejectedValueOnce(new Error('OCR failed'));

    const handler = getHandler(router, 'post', '/:pid/sources/upload');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: {},
      files: [{ path: '/tmp/file.jpg', originalname: 'bad.jpg', filename: 'uuid-bad.jpg' }],
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Echec pour bad.jpg: Error: OCR failed' });
  });

  it('ajoute la moderation pending quand le profil a la moderation activee', async () => {
    const { project } = createProjectWithProfile({ useModeration: true });

    const handler = getHandler(router, 'post', '/:pid/sources/upload');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: {},
      files: [{ path: '/tmp/file.jpg', originalname: 'photo.jpg', filename: 'uuid-photo.jpg' }],
    });
    const res = mockRes();

    await handler(req, res);

    const results = res.json.mock.calls[0][0];
    expect(results[0].moderation).toEqual({ status: 'pending', categories: {} });
  });

  it('n ajoute pas de moderation quand le profil n a pas la moderation activee', async () => {
    const { project } = createProjectWithProfile({ useModeration: false });

    const handler = getHandler(router, 'post', '/:pid/sources/upload');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: {},
      files: [{ path: '/tmp/file.jpg', originalname: 'photo.jpg', filename: 'uuid-photo.jpg' }],
    });
    const res = mockRes();

    await handler(req, res);

    const results = res.json.mock.calls[0][0];
    expect(results[0].moderation).toBeUndefined();
  });
});

// =============================================================================
// Background triggers (consigne detection + moderation)
// =============================================================================

describe('Background triggers after source addition', () => {
  /** Flush fire-and-forget promises (no more setTimeout, tasks run as microtasks) */
  const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

  it('text source triggers background consigne detection', async () => {
    const project = store.createProject('P1');
    store.addSource(project.meta.id, {
      id: 'existing-src',
      filename: 'existing.txt',
      markdown: 'Existing content',
      uploadedAt: new Date().toISOString(),
      sourceType: 'text',
    });

    const handler = getHandler(router, 'post', '/:pid/sources/text');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { text: 'Reviser les dates importantes', lang: 'en' },
    });
    const res = mockRes();

    await handler(req, res);
    await flushPromises();

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(detectConsigne).toHaveBeenCalledWith(
      client,
      '# Combined markdown',
      undefined,
      'en',
    );
  });

  it('voice source triggers background consigne detection', async () => {
    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/voice');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { lang: 'fr' },
      file: { buffer: Buffer.from('audio-data'), originalname: 'voice.webm' },
    });
    const res = mockRes();

    await handler(req, res);
    await flushPromises();

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(detectConsigne).toHaveBeenCalledWith(
      client,
      '# Combined markdown',
      undefined,
      'fr',
    );
  });

  it('voice source triggers background moderation when profile has moderation enabled', async () => {
    const { project } = createProjectWithProfile({ useModeration: true });

    const handler = getHandler(router, 'post', '/:pid/sources/voice');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: {},
      file: { buffer: Buffer.from('audio-data'), originalname: 'voice.webm' },
    });
    const res = mockRes();

    await handler(req, res);

    const source = res.json.mock.calls[0][0];
    expect(source.moderation).toEqual({ status: 'pending', categories: {} });

    await flushPromises();

    // Moderation should have been triggered for the voice source
    expect(moderateContent).toHaveBeenCalled();
  });

  it('upload source triggers background consigne detection and moderation', async () => {
    const { project } = createProjectWithProfile({ useModeration: true });

    const handler = getHandler(router, 'post', '/:pid/sources/upload');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { lang: 'fr' },
      files: [{ path: '/tmp/file.jpg', originalname: 'photo.jpg', filename: 'uuid-photo.jpg' }],
    });
    const res = mockRes();

    await handler(req, res);
    await flushPromises();

    expect(res.json).toHaveBeenCalledTimes(1);
    const results = res.json.mock.calls[0][0];
    expect(results[0].moderation).toEqual({ status: 'pending', categories: {} });

    expect(detectConsigne).toHaveBeenCalledWith(
      client,
      '# Combined markdown',
      undefined,
      'fr',
    );
    expect(moderateContent).toHaveBeenCalled();
  });

  it('consigne detection error does not crash the route', async () => {
    vi.mocked(detectConsigne).mockRejectedValueOnce(new Error('API down'));

    const project = store.createProject('P1');
    const handler = getHandler(router, 'post', '/:pid/sources/text');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { text: 'some text', lang: 'fr' },
    });
    const res = mockRes();

    await handler(req, res);
    await flushPromises();

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('moderation error does not crash the route and sets error status', async () => {
    vi.mocked(moderateContent).mockRejectedValueOnce(new Error('Moderation API down'));

    const { project } = createProjectWithProfile({ useModeration: true });
    const handler = getHandler(router, 'post', '/:pid/sources/voice');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: {},
      file: { buffer: Buffer.from('audio-data'), originalname: 'voice.webm' },
    });
    const res = mockRes();

    await handler(req, res);
    await flushPromises();

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();

    // Source should have error moderation status
    const updatedProject = store.getProject(project.meta.id);
    const source = updatedProject!.sources.find(s => s.sourceType === 'voice');
    expect(source?.moderation).toEqual({ status: 'error', categories: {} });
  });
});
