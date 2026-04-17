import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { profileRoutes } from './profiles.js';
import { ProfileStore } from '../profiles.js';
import { ProjectStore } from '../store.js';

// --- Helpers ---

function getHandler(router: any, method: string, path: string) {
  for (const layer of router.stack) {
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

// --- Tests ---

describe('profileRoutes', () => {
  let tmpDir: string;
  let projectStore: ProjectStore;
  let router: any;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), 'profiles-test-'));
    projectStore = new ProjectStore(tmpDir);
    router = profileRoutes(tmpDir, projectStore);
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  // ===== GET / =====

  describe('GET /', () => {
    it('returns empty list when no profiles exist', async () => {
      const handler = getHandler(router, 'get', '/');
      const req = mockReq();
      const res = mockRes();

      await handler(req, res);

      expect(res.json).toHaveBeenCalledWith([]);
    });

    it('returns profiles in public format without pinHash', async () => {
      // Create a profile directly via the internal store
      const store = new ProfileStore(tmpDir);
      store.create('Alice', 9, '1', 'fr', '1234');

      const handler = getHandler(router, 'get', '/');
      const req = mockReq();
      const res = mockRes();

      await handler(req, res);

      const profiles = res.json.mock.calls[0][0];
      expect(profiles).toHaveLength(1);
      expect(profiles[0].name).toBe('Alice');
      expect(profiles[0].hasPin).toBe(true);
      expect(profiles[0]).not.toHaveProperty('pinHash');
    });

    it('returns multiple profiles', async () => {
      const store = new ProfileStore(tmpDir);
      store.create('Alice', 9, '1', 'fr', '1234');
      store.create('Bob', 30, '2', 'en');

      const handler = getHandler(router, 'get', '/');
      const req = mockReq();
      const res = mockRes();

      await handler(req, res);

      const profiles = res.json.mock.calls[0][0];
      expect(profiles).toHaveLength(2);
      expect(profiles[0].name).toBe('Alice');
      expect(profiles[0].hasPin).toBe(true);
      expect(profiles[1].name).toBe('Bob');
      expect(profiles[1].hasPin).toBe(false);
    });
  });

  // ===== POST / =====

  describe('POST /', () => {
    it('rejects empty name with 400', async () => {
      const handler = getHandler(router, 'post', '/');
      const req = mockReq({ body: { name: '', age: 10 } });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Nom requis' });
    });

    it('rejects missing name with 400', async () => {
      const handler = getHandler(router, 'post', '/');
      const req = mockReq({ body: { age: 10 } });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Nom requis' });
    });

    it('rejects non-string name with 400', async () => {
      const handler = getHandler(router, 'post', '/');
      const req = mockReq({ body: { name: 123, age: 10 } });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Nom requis' });
    });

    it('rejects age below 4 with 400', async () => {
      const handler = getHandler(router, 'post', '/');
      const req = mockReq({ body: { name: 'Test', age: 3 } });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Age invalide (4-120)' });
    });

    it('rejects age above 120 with 400', async () => {
      const handler = getHandler(router, 'post', '/');
      const req = mockReq({ body: { name: 'Test', age: 121 } });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Age invalide (4-120)' });
    });

    it('rejects non-number age with 400', async () => {
      const handler = getHandler(router, 'post', '/');
      const req = mockReq({ body: { name: 'Test', age: 'dix' } });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Age invalide (4-120)' });
    });

    it('requires PIN for age < 15 — missing PIN returns 400', async () => {
      const handler = getHandler(router, 'post', '/');
      const req = mockReq({ body: { name: 'Enfant', age: 10 } });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Code PIN 4 chiffres requis pour les moins de 15 ans',
      });
    });

    it('requires PIN for age < 15 — invalid PIN format returns 400', async () => {
      const handler = getHandler(router, 'post', '/');
      const req = mockReq({ body: { name: 'Enfant', age: 10, pin: '12' } });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Code PIN 4 chiffres requis pour les moins de 15 ans',
      });
    });

    it('requires PIN for age < 15 — non-digit PIN returns 400', async () => {
      const handler = getHandler(router, 'post', '/');
      const req = mockReq({ body: { name: 'Enfant', age: 10, pin: 'abcd' } });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Code PIN 4 chiffres requis pour les moins de 15 ans',
      });
    });

    it('creates child profile (age < 15) with valid PIN', async () => {
      const handler = getHandler(router, 'post', '/');
      const req = mockReq({
        body: { name: 'Enfant', age: 9, avatar: '3', locale: 'fr', pin: '1234' },
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).not.toHaveBeenCalled();
      const profile = res.json.mock.calls[0][0];
      expect(profile.name).toBe('Enfant');
      expect(profile.age).toBe(9);
      expect(profile.ageGroup).toBe('enfant');
      expect(profile.avatar).toBe('3');
      expect(profile.locale).toBe('fr');
      expect(profile.hasPin).toBe(true);
      expect(profile).not.toHaveProperty('pinHash');
      expect(profile.id).toBeDefined();
      expect(profile.createdAt).toBeDefined();
    });

    it('creates adult profile (age >= 15) without PIN', async () => {
      const handler = getHandler(router, 'post', '/');
      const req = mockReq({
        body: { name: 'Adulte', age: 30, locale: 'en' },
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).not.toHaveBeenCalled();
      const profile = res.json.mock.calls[0][0];
      expect(profile.name).toBe('Adulte');
      expect(profile.age).toBe(30);
      expect(profile.ageGroup).toBe('adulte');
      expect(profile.hasPin).toBe(false);
      expect(profile).not.toHaveProperty('pinHash');
    });

    it('uses default avatar and locale when not provided', async () => {
      const handler = getHandler(router, 'post', '/');
      const req = mockReq({
        body: { name: 'Simple', age: 20 },
      });
      const res = mockRes();

      await handler(req, res);

      const profile = res.json.mock.calls[0][0];
      expect(profile.avatar).toBe('0');
      expect(profile.locale).toBe('fr');
    });

    it('trims whitespace from name', async () => {
      const handler = getHandler(router, 'post', '/');
      const req = mockReq({
        body: { name: '  Alice  ', age: 20 },
      });
      const res = mockRes();

      await handler(req, res);

      const profile = res.json.mock.calls[0][0];
      expect(profile.name).toBe('Alice');
    });

    it('does not store PIN for adult even if provided', async () => {
      const handler = getHandler(router, 'post', '/');
      const req = mockReq({
        body: { name: 'Adulte', age: 30, pin: '9999' },
      });
      const res = mockRes();

      await handler(req, res);

      const profile = res.json.mock.calls[0][0];
      expect(profile.hasPin).toBe(false);
    });

    it('creates profile at age boundary 14 (requires PIN)', async () => {
      const handler = getHandler(router, 'post', '/');
      const req = mockReq({
        body: { name: 'Ado', age: 14, pin: '5678' },
      });
      const res = mockRes();

      await handler(req, res);

      const profile = res.json.mock.calls[0][0];
      expect(profile.hasPin).toBe(true);
      expect(profile.ageGroup).toBe('ado');
    });

    it('creates profile at age boundary 15 (no PIN required)', async () => {
      const handler = getHandler(router, 'post', '/');
      const req = mockReq({
        body: { name: 'Ado15', age: 15 },
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).not.toHaveBeenCalled();
      const profile = res.json.mock.calls[0][0];
      expect(profile.hasPin).toBe(false);
      expect(profile.ageGroup).toBe('ado');
    });
  });

  // ===== PUT /:id =====

  describe('PUT /:id', () => {
    it('returns 404 for unknown profile', async () => {
      const handler = getHandler(router, 'put', '/:id');
      const req = mockReq({ params: { id: 'nonexistent-id' }, body: { name: 'New' } });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Profil introuvable' });
    });

    it('allows non-parental update without PIN for profile with PIN', async () => {
      const store = new ProfileStore(tmpDir);
      const created = store.create('Enfant', 9, '0', 'fr', '1234');

      const handler = getHandler(router, 'put', '/:id');
      const req = mockReq({
        params: { id: created.id },
        body: { name: 'Updated' },
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.json).toHaveBeenCalled();
      expect(res.json.mock.calls[0][0].name).toBe('Updated');
    });

    it('requires correct PIN for parental field — missing PIN returns 403', async () => {
      const store = new ProfileStore(tmpDir);
      const created = store.create('Enfant', 9, '0', 'fr', '1234');

      const handler = getHandler(router, 'put', '/:id');
      const req = mockReq({
        params: { id: created.id },
        body: { useModeration: false },
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: 'Code PIN incorrect' });
    });

    it('requires correct PIN for parental field — wrong PIN returns 403', async () => {
      const store = new ProfileStore(tmpDir);
      const created = store.create('Enfant', 9, '0', 'fr', '1234');

      const handler = getHandler(router, 'put', '/:id');
      const req = mockReq({
        params: { id: created.id },
        body: { chatEnabled: true, pin: '0000' },
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: 'Code PIN incorrect' });
    });

    it('updates profile with correct PIN', async () => {
      const store = new ProfileStore(tmpDir);
      const created = store.create('Enfant', 9, '0', 'fr', '1234');

      const handler = getHandler(router, 'put', '/:id');
      const req = mockReq({
        params: { id: created.id },
        body: { name: 'Renamed', pin: '1234' },
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).not.toHaveBeenCalled();
      const profile = res.json.mock.calls[0][0];
      expect(profile.name).toBe('Renamed');
      expect(profile.hasPin).toBe(true);
      expect(profile).not.toHaveProperty('pinHash');
    });

    it('updates adult profile without PIN requirement', async () => {
      const store = new ProfileStore(tmpDir);
      const created = store.create('Adulte', 30, '0', 'fr');

      const handler = getHandler(router, 'put', '/:id');
      const req = mockReq({
        params: { id: created.id },
        body: { name: 'Updated Adulte', avatar: '5' },
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).not.toHaveBeenCalled();
      const profile = res.json.mock.calls[0][0];
      expect(profile.name).toBe('Updated Adulte');
      expect(profile.avatar).toBe('5');
    });

    it('updates age and recalculates ageGroup', async () => {
      const store = new ProfileStore(tmpDir);
      const created = store.create('Ado', 16, '0', 'fr');

      const handler = getHandler(router, 'put', '/:id');
      const req = mockReq({
        params: { id: created.id },
        body: { age: 30 },
      });
      const res = mockRes();

      await handler(req, res);

      const profile = res.json.mock.calls[0][0];
      expect(profile.age).toBe(30);
      expect(profile.ageGroup).toBe('adulte');
    });

    it('updates locale', async () => {
      const store = new ProfileStore(tmpDir);
      const created = store.create('User', 20, '0', 'fr');

      const handler = getHandler(router, 'put', '/:id');
      const req = mockReq({
        params: { id: created.id },
        body: { locale: 'en' },
      });
      const res = mockRes();

      await handler(req, res);

      const profile = res.json.mock.calls[0][0];
      expect(profile.locale).toBe('en');
    });

    it('PIN-only probe verifies PIN without updating store', async () => {
      const store = new ProfileStore(tmpDir);
      const created = store.create('Enfant', 9, '0', 'fr', '1234');
      const initialUpdatedAt = created.updatedAt;

      const handler = getHandler(router, 'put', '/:id');

      // Wrong PIN → 403
      const req1 = mockReq({ params: { id: created.id }, body: { pin: '0000' } });
      const res1 = mockRes();
      await handler(req1, res1);
      expect(res1.status).toHaveBeenCalledWith(403);

      // Correct PIN → 200 without bumping updatedAt
      const req2 = mockReq({ params: { id: created.id }, body: { pin: '1234' } });
      const res2 = mockRes();
      await handler(req2, res2);
      expect(res2.status).not.toHaveBeenCalled();
      const profile = res2.json.mock.calls[0][0];
      expect(profile.name).toBe('Enfant');
      expect(store.get(created.id)!.updatedAt).toBe(initialUpdatedAt);
    });

    it('rejects stale write via _updatedAt optimistic concurrency', async () => {
      const store = new ProfileStore(tmpDir);
      const created = store.create('User', 20, '0', 'fr');

      // Simulate a first update that bumps updatedAt to a known future time
      store.update(created.id, { name: 'Fresh' });
      // Stale write with a timestamp clearly in the past
      const staleTimestamp = new Date(Date.now() - 10000).toISOString();
      const handler = getHandler(router, 'put', '/:id');
      const req = mockReq({
        params: { id: created.id },
        body: { name: 'Stale', _updatedAt: staleTimestamp },
      });
      const res = mockRes();
      await handler(req, res);
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json.mock.calls[0][0].error).toBe('stale');
      expect(res.json.mock.calls[0][0].profile.name).toBe('Fresh');
      expect(store.get(created.id)!.name).toBe('Fresh');
    });
  });

  // ===== DELETE /:id =====

  describe('DELETE /:id', () => {
    it('returns 404 for unknown profile', async () => {
      const handler = getHandler(router, 'delete', '/:id');
      const req = mockReq({ params: { id: 'nonexistent-id' }, body: {} });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Profil introuvable' });
    });

    it('requires correct PIN for profile with PIN — missing PIN returns 403', async () => {
      const store = new ProfileStore(tmpDir);
      const created = store.create('Enfant', 9, '0', 'fr', '1234');

      const handler = getHandler(router, 'delete', '/:id');
      const req = mockReq({
        params: { id: created.id },
        body: {},
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: 'Code PIN incorrect' });
    });

    it('requires correct PIN for profile with PIN — wrong PIN returns 403', async () => {
      const store = new ProfileStore(tmpDir);
      const created = store.create('Enfant', 9, '0', 'fr', '1234');

      const handler = getHandler(router, 'delete', '/:id');
      const req = mockReq({
        params: { id: created.id },
        body: { pin: '9999' },
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: 'Code PIN incorrect' });
    });

    it('deletes profile with correct PIN', async () => {
      const store = new ProfileStore(tmpDir);
      const created = store.create('Enfant', 9, '0', 'fr', '1234');

      const handler = getHandler(router, 'delete', '/:id');
      const req = mockReq({
        params: { id: created.id },
        body: { pin: '1234' },
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ ok: true, deletedProjects: 0 });

      // Verify profile is gone
      expect(store.get(created.id)).toBeNull();
    });

    it('deletes adult profile without PIN requirement', async () => {
      const store = new ProfileStore(tmpDir);
      const created = store.create('Adulte', 30, '0', 'fr');

      const handler = getHandler(router, 'delete', '/:id');
      const req = mockReq({
        params: { id: created.id },
        body: {},
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ ok: true, deletedProjects: 0 });

      // Verify profile is gone
      expect(store.get(created.id)).toBeNull();
    });

    it('cascades deletion of projects belonging to the profile', async () => {
      const store = new ProfileStore(tmpDir);
      const created = store.create('Adulte', 30, '0', 'fr');

      // Create projects belonging to this profile
      const project1 = projectStore.createProject('Project A', created.id);
      const project2 = projectStore.createProject('Project B', created.id);
      // Create a project for a different profile — should NOT be deleted
      const otherProject = projectStore.createProject('Other', 'other-profile-id');

      const handler = getHandler(router, 'delete', '/:id');
      const req = mockReq({
        params: { id: created.id },
        body: {},
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ ok: true, deletedProjects: 2 });

      // Verify profile's projects are deleted
      expect(projectStore.getProject(project1.meta.id)).toBeNull();
      expect(projectStore.getProject(project2.meta.id)).toBeNull();

      // Verify unrelated project still exists
      expect(projectStore.getProject(otherProject.meta.id)).not.toBeNull();
    });

    it('cascades deletion with correct PIN for child profile', async () => {
      const store = new ProfileStore(tmpDir);
      const created = store.create('Enfant', 9, '0', 'fr', '5555');

      projectStore.createProject('Child Project', created.id);

      const handler = getHandler(router, 'delete', '/:id');
      const req = mockReq({
        params: { id: created.id },
        body: { pin: '5555' },
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ ok: true, deletedProjects: 1 });
      expect(store.get(created.id)).toBeNull();
    });
  });
});
