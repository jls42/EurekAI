import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { ProjectStore } from '../store.js';
import { ProfileStore } from '../profiles.js';
import { chatRoutes } from './chat.js';

// --- Mocks ---

vi.mock('../generators/chat.js', () => ({
  chatWithSources: vi.fn().mockResolvedValue({ reply: 'Hello!', toolCalls: [] }),
}));

vi.mock('../generators/moderation.js', () => ({
  moderateContent: vi.fn().mockResolvedValue({ status: 'safe', categories: {} }),
}));

vi.mock('../generators/summary.js', () => ({
  generateSummary: vi.fn().mockResolvedValue({
    title: 'T',
    summary: 'S',
    key_points: ['a'],
    vocabulary: [],
  }),
}));

vi.mock('../generators/flashcards.js', () => ({
  generateFlashcards: vi
    .fn()
    .mockResolvedValue([{ question: 'Q', answer: 'A' }]),
}));

vi.mock('../generators/quiz.js', () => ({
  generateQuiz: vi
    .fn()
    .mockResolvedValue([
      { question: 'Q', choices: ['a', 'b', 'c', 'd'], correct: 0 },
    ]),
}));

vi.mock('../generators/fill-blank.js', () => ({
  generateFillBlank: vi
    .fn()
    .mockResolvedValue([{ sentence: 'The ___ is blue', answer: 'sky' }]),
}));

vi.mock('../config.js', () => ({
  getConfig: vi.fn(() => ({
    models: {
      summary: 'm',
      flashcards: 'm',
      quiz: 'm',
      podcast: 'm',
      translate: 'm',
      ocr: 'm',
      quizVerify: 'm',
      chat: 'm',
    },
    voices: {
      host: { id: 'h', name: 'H' },
      guest: { id: 'g', name: 'G' },
    },
    ttsModel: 'voxtral-mini-tts-2603',
    ttsProvider: 'mistral',
    mistralVoices: { host: 'mh', guest: 'mg' },
  })),
}));

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

function addSource(pid: string, markdown = 'Some source content') {
  store.addSource(pid, {
    id: `src-${Date.now()}`,
    filename: 'test.txt',
    markdown,
    uploadedAt: new Date().toISOString(),
    sourceType: 'text',
  });
}

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'eurekai-chat-route-'));
  store = new ProjectStore(tempDir);
  profileStore = new ProfileStore(tempDir);
  router = chatRoutes(store, client, profileStore);
  vi.clearAllMocks();
});

afterEach(() => {
  rmSync(tempDir, { recursive: true, force: true });
});

// ============================================================
// POST /:pid/chat
// ============================================================

describe('POST /:pid/chat', () => {
  it('retourne 404 quand le projet est introuvable', async () => {
    const handler = getHandler(router, 'post', '/:pid/chat');
    const req = mockReq({
      params: { pid: 'nonexistent' },
      body: { message: 'Bonjour' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Projet introuvable' });
  });

  it('retourne 400 quand le message est manquant', async () => {
    const project = store.createProject('Test');
    const handler = getHandler(router, 'post', '/:pid/chat');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: {},
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'message requis' });
  });

  it('retourne 400 quand le message n est pas une string', async () => {
    const project = store.createProject('Test');
    const handler = getHandler(router, 'post', '/:pid/chat');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { message: 123 },
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'message requis' });
  });

  it('retourne 403 quand le chat est desactive pour le profil', async () => {
    const profile = profileStore.create('Kid', 8, '0', 'fr');
    // enfant => chatEnabled defaults to false
    expect(profile.chatEnabled).toBe(false);

    const project = store.createProject('Test', profile.id);
    const handler = getHandler(router, 'post', '/:pid/chat');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { message: 'Bonjour' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'chat.ageRestricted' });
  });

  it('retourne 400 quand la moderation bloque le message', async () => {
    const { moderateContent } = await import('../generators/moderation.js');
    (moderateContent as any).mockResolvedValueOnce({
      status: 'unsafe',
      categories: { sexual: true },
    });

    // Create a profile with chat enabled and moderation active
    const profile = profileStore.create('Teen', 14, '0', 'fr');
    profileStore.update(profile.id, { chatEnabled: true, useModeration: true });

    const project = store.createProject('Test', profile.id);
    const handler = getHandler(router, 'post', '/:pid/chat');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { message: 'bad content' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'chat.moderationBlocked' });
  });

  it('envoie un message et recoit une reponse, stocke les deux dans l historique', async () => {
    const project = store.createProject('Test');
    addSource(project.meta.id);
    const handler = getHandler(router, 'post', '/:pid/chat');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { message: 'Bonjour' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        reply: 'Hello!',
        generatedIds: [],
        generations: [],
      }),
    );

    // Verify chat history was stored
    const updated = store.getProject(project.meta.id);
    expect(updated!.chat!.messages).toHaveLength(2);
    expect(updated!.chat!.messages[0].role).toBe('user');
    expect(updated!.chat!.messages[0].content).toBe('Bonjour');
    expect(updated!.chat!.messages[1].role).toBe('assistant');
    expect(updated!.chat!.messages[1].content).toBe('Hello!');
  });

  it('passe lang et ageGroup depuis le body de la requete', async () => {
    const { chatWithSources } = await import('../generators/chat.js');

    const project = store.createProject('Test');
    addSource(project.meta.id);
    const handler = getHandler(router, 'post', '/:pid/chat');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { message: 'Hi', lang: 'en', ageGroup: 'adulte' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(chatWithSources).toHaveBeenCalledWith(
      client,
      expect.any(Array),
      expect.any(String),
      'm', // config.models.chat
      'en',
      'adulte',
    );
  });

  it('utilise lang=fr et ageGroup=enfant par defaut', async () => {
    const { chatWithSources } = await import('../generators/chat.js');

    const project = store.createProject('Test');
    addSource(project.meta.id);
    const handler = getHandler(router, 'post', '/:pid/chat');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { message: 'Bonjour' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(chatWithSources).toHaveBeenCalledWith(
      client,
      expect.any(Array),
      expect.any(String),
      'm',
      'fr',
      'enfant',
    );
  });

  it('traite les tool calls et genere du contenu', async () => {
    const { chatWithSources } = await import('../generators/chat.js');
    (chatWithSources as any).mockResolvedValueOnce({
      reply: 'Voici ta fiche !',
      toolCalls: ['generate_summary'],
    });

    const project = store.createProject('Test');
    addSource(project.meta.id);
    const handler = getHandler(router, 'post', '/:pid/chat');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { message: 'Fais moi une fiche' },
    });
    const res = mockRes();

    await handler(req, res);

    const result = res.json.mock.calls[0][0];
    expect(result.reply).toBe('Voici ta fiche !');
    expect(result.generatedIds).toHaveLength(1);
    expect(result.generations).toHaveLength(1);
    expect(result.generations[0].type).toBe('summary');
    expect(result.generations[0].data.title).toBe('T');

    // Verify generation stored in project
    const updated = store.getProject(project.meta.id);
    expect(updated!.results.generations).toHaveLength(1);
    expect(updated!.results.generations[0].type).toBe('summary');
  });

  it('traite plusieurs tool calls simultanement', async () => {
    const { chatWithSources } = await import('../generators/chat.js');
    (chatWithSources as any).mockResolvedValueOnce({
      reply: 'Voici tes contenus !',
      toolCalls: ['generate_flashcards', 'generate_quiz'],
    });

    const project = store.createProject('Test');
    addSource(project.meta.id);
    const handler = getHandler(router, 'post', '/:pid/chat');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { message: 'Genere des flashcards et un quiz' },
    });
    const res = mockRes();

    await handler(req, res);

    const result = res.json.mock.calls[0][0];
    expect(result.generatedIds).toHaveLength(2);
    expect(result.generations).toHaveLength(2);
    expect(result.generations.map((g: any) => g.type)).toEqual(
      expect.arrayContaining(['flashcards', 'quiz']),
    );
  });

  it('ignore les tool calls quand il n y a pas de sources', async () => {
    const { chatWithSources } = await import('../generators/chat.js');
    (chatWithSources as any).mockResolvedValueOnce({
      reply: 'Pas de sources...',
      toolCalls: ['generate_summary'],
    });

    const project = store.createProject('Test');
    // No sources added
    const handler = getHandler(router, 'post', '/:pid/chat');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { message: 'Fais moi une fiche' },
    });
    const res = mockRes();

    await handler(req, res);

    const result = res.json.mock.calls[0][0];
    expect(result.generatedIds).toEqual([]);
    expect(result.generations).toEqual([]);
  });

  it('stocke les generatedIds dans le message assistant', async () => {
    const { chatWithSources } = await import('../generators/chat.js');
    (chatWithSources as any).mockResolvedValueOnce({
      reply: 'Quiz genere !',
      toolCalls: ['generate_quiz'],
    });

    const project = store.createProject('Test');
    addSource(project.meta.id);
    const handler = getHandler(router, 'post', '/:pid/chat');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { message: 'Quiz' },
    });
    const res = mockRes();

    await handler(req, res);

    const updated = store.getProject(project.meta.id);
    const assistantMsg = updated!.chat!.messages.find(
      (m) => m.role === 'assistant',
    );
    expect(assistantMsg!.generatedIds).toHaveLength(1);
  });

  it('gere les erreurs de generation dans les tool calls (failedTools)', async () => {
    const { chatWithSources } = await import('../generators/chat.js');
    const { generateSummary } = await import('../generators/summary.js');
    (chatWithSources as any).mockResolvedValueOnce({
      reply: 'Erreur lors de la generation',
      toolCalls: ['generate_summary'],
    });
    (generateSummary as any).mockRejectedValueOnce(new Error('AI failure'));

    const project = store.createProject('Test');
    addSource(project.meta.id);
    const handler = getHandler(router, 'post', '/:pid/chat');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { message: 'Fiche' },
    });
    const res = mockRes();

    await handler(req, res);

    const result = res.json.mock.calls[0][0];
    expect(result.failedTools).toEqual(['generate_summary']);
    expect(result.generatedIds).toEqual([]);
    expect(result.generations).toEqual([]);
  });

  it('genere un fill-blank via tool call', async () => {
    const { chatWithSources } = await import('../generators/chat.js');
    (chatWithSources as any).mockResolvedValueOnce({
      reply: 'Textes a trous generes !',
      toolCalls: ['generate_fill-blank'],
    });

    const project = store.createProject('Test');
    addSource(project.meta.id);
    const handler = getHandler(router, 'post', '/:pid/chat');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { message: 'Textes a trous' },
    });
    const res = mockRes();

    await handler(req, res);

    const result = res.json.mock.calls[0][0];
    expect(result.generatedIds).toHaveLength(1);
    expect(result.generations[0].type).toBe('fill-blank');
  });

  it('ne bloque pas la moderation quand le profil n a pas useModeration', async () => {
    const { moderateContent } = await import('../generators/moderation.js');

    // adulte => useModeration defaults to false, chatEnabled defaults to true
    const profile = profileStore.create('Adult', 30, '0', 'fr');
    expect(profile.useModeration).toBe(false);
    expect(profile.chatEnabled).toBe(true);

    const project = store.createProject('Test', profile.id);
    addSource(project.meta.id);
    const handler = getHandler(router, 'post', '/:pid/chat');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { message: 'Hello' },
    });
    const res = mockRes();

    await handler(req, res);

    // moderateContent should NOT have been called
    expect(moderateContent).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ reply: 'Hello!' }),
    );
  });

  it('ne bloque pas la moderation quand le profil est etudiant (categories vides)', async () => {
    const { moderateContent } = await import('../generators/moderation.js');

    // etudiant has empty moderation categories
    const profile = profileStore.create('Etudiant', 20, '0', 'fr');
    profileStore.update(profile.id, { useModeration: true });

    const project = store.createProject('Test', profile.id);
    addSource(project.meta.id);
    const handler = getHandler(router, 'post', '/:pid/chat');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { message: 'Hello' },
    });
    const res = mockRes();

    await handler(req, res);

    // moderateContent should NOT be called since etudiant categories are empty
    expect(moderateContent).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ reply: 'Hello!' }),
    );
  });

  it('retourne 500 quand chatWithSources lance une erreur', async () => {
    const { chatWithSources } = await import('../generators/chat.js');
    (chatWithSources as any).mockRejectedValueOnce(new Error('API down'));

    const project = store.createProject('Test');
    addSource(project.meta.id);
    const handler = getHandler(router, 'post', '/:pid/chat');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { message: 'Bonjour' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error: API down' });
  });

  it('fonctionne sans profil associe au projet', async () => {
    const project = store.createProject('Sans profil');
    addSource(project.meta.id);
    const handler = getHandler(router, 'post', '/:pid/chat');
    const req = mockReq({
      params: { pid: project.meta.id },
      body: { message: 'Bonjour' },
    });
    const res = mockRes();

    await handler(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ reply: 'Hello!' }),
    );
  });
});

// ============================================================
// GET /:pid/chat
// ============================================================

describe('GET /:pid/chat', () => {
  it('retourne 404 quand le projet est introuvable', () => {
    const handler = getHandler(router, 'get', '/:pid/chat');
    const req = mockReq({ params: { pid: 'nonexistent' } });
    const res = mockRes();

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Projet introuvable' });
  });

  it('retourne des messages vides quand il n y a pas de chat', () => {
    const project = store.createProject('Test');
    const handler = getHandler(router, 'get', '/:pid/chat');
    const req = mockReq({ params: { pid: project.meta.id } });
    const res = mockRes();

    handler(req, res);

    expect(res.json).toHaveBeenCalledWith({ messages: [] });
  });

  it('retourne les messages du chat apres envoi', async () => {
    const project = store.createProject('Test');
    addSource(project.meta.id);

    // Send a message first
    const postHandler = getHandler(router, 'post', '/:pid/chat');
    const postReq = mockReq({
      params: { pid: project.meta.id },
      body: { message: 'Bonjour' },
    });
    const postRes = mockRes();
    await postHandler(postReq, postRes);

    // Now get the history
    const getHandler_ = getHandler(router, 'get', '/:pid/chat');
    const getReq = mockReq({ params: { pid: project.meta.id } });
    const getRes = mockRes();

    getHandler_(getReq, getRes);

    const result = getRes.json.mock.calls[0][0];
    expect(result.messages).toHaveLength(2);
    expect(result.messages[0].role).toBe('user');
    expect(result.messages[0].content).toBe('Bonjour');
    expect(result.messages[1].role).toBe('assistant');
    expect(result.messages[1].content).toBe('Hello!');
  });
});

// ============================================================
// DELETE /:pid/chat
// ============================================================

describe('DELETE /:pid/chat', () => {
  it('retourne 404 quand le projet est introuvable', () => {
    const handler = getHandler(router, 'delete', '/:pid/chat');
    const req = mockReq({ params: { pid: 'nonexistent' } });
    const res = mockRes();

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Projet introuvable' });
  });

  it('efface les messages du chat', async () => {
    const project = store.createProject('Test');
    addSource(project.meta.id);

    // Send a message first
    const postHandler = getHandler(router, 'post', '/:pid/chat');
    const postReq = mockReq({
      params: { pid: project.meta.id },
      body: { message: 'Bonjour' },
    });
    const postRes = mockRes();
    await postHandler(postReq, postRes);

    // Verify we have messages
    const beforeDelete = store.getProject(project.meta.id);
    expect(beforeDelete!.chat!.messages.length).toBeGreaterThan(0);

    // Delete chat
    const deleteHandler = getHandler(router, 'delete', '/:pid/chat');
    const deleteReq = mockReq({ params: { pid: project.meta.id } });
    const deleteRes = mockRes();

    deleteHandler(deleteReq, deleteRes);

    expect(deleteRes.json).toHaveBeenCalledWith({ ok: true });

    // Verify messages are cleared
    const afterDelete = store.getProject(project.meta.id);
    expect(afterDelete!.chat!.messages).toEqual([]);
  });

  it('retourne ok meme si le chat est deja vide', () => {
    const project = store.createProject('Test');
    const handler = getHandler(router, 'delete', '/:pid/chat');
    const req = mockReq({ params: { pid: project.meta.id } });
    const res = mockRes();

    handler(req, res);

    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });
});
