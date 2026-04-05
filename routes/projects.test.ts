import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { ProjectStore } from '../store.js';
import { projectRoutes } from './projects.js';

let store: ProjectStore;
let tempDir: string;
let router: any;

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
  tempDir = mkdtempSync(join(tmpdir(), 'eurekai-projects-route-'));
  store = new ProjectStore(tempDir);
  router = projectRoutes(store);
});

afterEach(() => {
  rmSync(tempDir, { recursive: true, force: true });
});

describe('GET /', () => {
  it('retourne un tableau vide quand aucun projet', () => {
    const handler = getHandler(router, 'get', '/');
    const req = mockReq();
    const res = mockRes();

    handler(req, res);

    expect(res.json).toHaveBeenCalledWith([]);
  });

  it('retourne la liste des projets', () => {
    store.createProject('Projet A');
    store.createProject('Projet B');

    const handler = getHandler(router, 'get', '/');
    const req = mockReq();
    const res = mockRes();

    handler(req, res);

    const result = res.json.mock.calls[0][0];
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Projet A');
    expect(result[1].name).toBe('Projet B');
  });

  it('filtre par profileId quand le query param est present', () => {
    store.createProject('Projet profil 1', 'profile-1');
    store.createProject('Projet profil 2', 'profile-2');
    store.createProject('Projet sans profil');

    const handler = getHandler(router, 'get', '/');
    const req = mockReq({ query: { profileId: 'profile-1' } });
    const res = mockRes();

    handler(req, res);

    const result = res.json.mock.calls[0][0];
    // profileId filter returns matching + projects without profileId
    expect(result).toHaveLength(2);
    expect(result.map((p: any) => p.name)).toContain('Projet profil 1');
    expect(result.map((p: any) => p.name)).toContain('Projet sans profil');
  });
});

describe('POST /', () => {
  it('retourne 400 si le nom est manquant', () => {
    const handler = getHandler(router, 'post', '/');
    const req = mockReq({ body: {} });
    const res = mockRes();

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Nom requis' });
  });

  it('retourne 400 si le nom est une chaine vide', () => {
    const handler = getHandler(router, 'post', '/');
    const req = mockReq({ body: { name: '' } });
    const res = mockRes();

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Nom requis' });
  });

  it('retourne 400 si le nom ne contient que des espaces', () => {
    const handler = getHandler(router, 'post', '/');
    const req = mockReq({ body: { name: '   ' } });
    const res = mockRes();

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Nom requis' });
  });

  it('retourne 400 si le nom n est pas une string', () => {
    const handler = getHandler(router, 'post', '/');
    const req = mockReq({ body: { name: 123 } });
    const res = mockRes();

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Nom requis' });
  });

  it('cree un projet et retourne son meta', () => {
    const handler = getHandler(router, 'post', '/');
    const req = mockReq({ body: { name: 'Mon projet' } });
    const res = mockRes();

    handler(req, res);

    const result = res.json.mock.calls[0][0];
    expect(result.id).toBeTruthy();
    expect(result.name).toBe('Mon projet');
    expect(result.createdAt).toBeTruthy();
    expect(result.updatedAt).toBeTruthy();

    // Verify persisted in store
    expect(store.listProjects()).toHaveLength(1);
  });

  it('trim le nom du projet', () => {
    const handler = getHandler(router, 'post', '/');
    const req = mockReq({ body: { name: '  Mon projet  ' } });
    const res = mockRes();

    handler(req, res);

    const result = res.json.mock.calls[0][0];
    expect(result.name).toBe('Mon projet');
  });

  it('cree un projet avec profileId', () => {
    const handler = getHandler(router, 'post', '/');
    const req = mockReq({ body: { name: 'Projet enfant', profileId: 'p-123' } });
    const res = mockRes();

    handler(req, res);

    const result = res.json.mock.calls[0][0];
    expect(result.profileId).toBe('p-123');
  });
});

describe('GET /:pid', () => {
  it('retourne le projet complet', () => {
    const project = store.createProject('Detail test');
    const handler = getHandler(router, 'get', '/:pid');
    const req = mockReq({ params: { pid: project.meta.id } });
    const res = mockRes();

    handler(req, res);

    const result = res.json.mock.calls[0][0];
    expect(result.meta.name).toBe('Detail test');
    expect(result.sources).toEqual([]);
    expect(result.results.generations).toEqual([]);
  });

  it('retourne 404 pour un id inconnu', () => {
    const handler = getHandler(router, 'get', '/:pid');
    const req = mockReq({ params: { pid: 'inexistant' } });
    const res = mockRes();

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Projet introuvable' });
  });

  it('computes totalCost from costLog only (not from entity estimatedCost)', () => {
    const project = store.createProject('Cost test');
    const pid = project.meta.id;

    store.appendCostEntry(pid, {
      timestamp: new Date().toISOString(),
      route: 'POST /gen',
      cost: 0.005,
      usage: { promptTokens: 100, completionTokens: 50, totalTokens: 150, callCount: 1 },
    });

    store.appendCostEntry(pid, {
      timestamp: new Date().toISOString(),
      route: 'POST /sources/upload',
      cost: 0.002,
      usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0, pagesProcessed: 1, callCount: 1 },
    });

    // These estimatedCost values on entities should NOT be included in totalCost
    store.addGeneration(pid, {
      id: 'g-cost',
      title: 'Fiche',
      createdAt: new Date().toISOString(),
      sourceIds: [],
      type: 'summary',
      data: { title: 'T', summary: 'S', key_points: [], vocabulary: [] },
      estimatedCost: 0.01,
    } as any);

    store.addSource(pid, {
      id: 's-cost',
      filename: 'test.txt',
      markdown: '# Hello',
      uploadedAt: new Date().toISOString(),
      estimatedCost: 0.003,
    } as any);

    const handler = getHandler(router, 'get', '/:pid');
    const req = mockReq({ params: { pid } });
    const res = mockRes();

    handler(req, res);

    const result = res.json.mock.calls[0][0];
    // Only costLog: 0.005 + 0.002 = 0.007 (NOT 0.005 + 0.002 + 0.01 + 0.003)
    expect(result.totalCost).toBeCloseTo(0.007, 6);
  });

  it('totalCost survives entity deletion', () => {
    const project = store.createProject('Deletion test');
    const pid = project.meta.id;

    store.appendCostEntry(pid, {
      timestamp: new Date().toISOString(),
      route: 'POST /gen',
      cost: 0.01,
      usage: { promptTokens: 200, completionTokens: 100, totalTokens: 300, callCount: 1 },
    });

    store.addGeneration(pid, {
      id: 'g-del',
      title: 'To delete',
      createdAt: new Date().toISOString(),
      sourceIds: [],
      type: 'summary',
      data: { title: 'T', summary: 'S', key_points: [], vocabulary: [] },
      estimatedCost: 0.01,
    } as any);

    // Delete the generation
    store.deleteGeneration(pid, 'g-del');

    const handler = getHandler(router, 'get', '/:pid');
    const req = mockReq({ params: { pid } });
    const res = mockRes();

    handler(req, res);

    const result = res.json.mock.calls[0][0];
    // costLog entry persists even after generation deletion
    expect(result.totalCost).toBeCloseTo(0.01, 6);
  });
});

describe('PUT /:pid', () => {
  it('retourne 400 si le nom est manquant', () => {
    const project = store.createProject('Avant');
    const handler = getHandler(router, 'put', '/:pid');
    const req = mockReq({ params: { pid: project.meta.id }, body: {} });
    const res = mockRes();

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Nom requis' });
  });

  it('retourne 400 si le nom est une chaine vide', () => {
    const project = store.createProject('Avant');
    const handler = getHandler(router, 'put', '/:pid');
    const req = mockReq({ params: { pid: project.meta.id }, body: { name: '' } });
    const res = mockRes();

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Nom requis' });
  });

  it('retourne 400 si le nom ne contient que des espaces', () => {
    const project = store.createProject('Avant');
    const handler = getHandler(router, 'put', '/:pid');
    const req = mockReq({ params: { pid: project.meta.id }, body: { name: '   ' } });
    const res = mockRes();

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Nom requis' });
  });

  it('renomme le projet et retourne ok', () => {
    const project = store.createProject('Ancien nom');
    const handler = getHandler(router, 'put', '/:pid');
    const req = mockReq({ params: { pid: project.meta.id }, body: { name: 'Nouveau nom' } });
    const res = mockRes();

    handler(req, res);

    expect(res.json).toHaveBeenCalledWith({ ok: true });

    // Verify persisted
    const updated = store.getProject(project.meta.id);
    expect(updated!.meta.name).toBe('Nouveau nom');
  });

  it('trim le nouveau nom', () => {
    const project = store.createProject('Ancien');
    const handler = getHandler(router, 'put', '/:pid');
    const req = mockReq({ params: { pid: project.meta.id }, body: { name: '  Nouveau  ' } });
    const res = mockRes();

    handler(req, res);

    expect(res.json).toHaveBeenCalledWith({ ok: true });
    const updated = store.getProject(project.meta.id);
    expect(updated!.meta.name).toBe('Nouveau');
  });
});

describe('DELETE /:pid', () => {
  it('supprime le projet et retourne ok', () => {
    const project = store.createProject('A supprimer');
    const handler = getHandler(router, 'delete', '/:pid');
    const req = mockReq({ params: { pid: project.meta.id } });
    const res = mockRes();

    handler(req, res);

    expect(res.json).toHaveBeenCalledWith({ ok: true });

    // Verify deleted from store
    expect(store.getProject(project.meta.id)).toBeNull();
    expect(store.listProjects()).toEqual([]);
  });

  it('ne plante pas si le projet n existe pas', () => {
    const handler = getHandler(router, 'delete', '/:pid');
    const req = mockReq({ params: { pid: 'inexistant' } });
    const res = mockRes();

    handler(req, res);

    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });
});
