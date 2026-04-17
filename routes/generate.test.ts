import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { ProjectStore } from '../store.js';
import { ProfileStore } from '../profiles.js';
import { getMarkdown, generateRoutes } from './generate.js';
import type { Source } from '../types.js';

// --- Mock generators ---

vi.mock('../generators/summary.js', () => ({
  generateSummary: vi.fn().mockResolvedValue({
    title: 'Test Summary',
    summary: 'Resume test',
    key_points: ['point1'],
    vocabulary: [],
    fun_fact: 'Fun fact',
  }),
}));

vi.mock('../generators/flashcards.js', () => ({
  generateFlashcards: vi.fn().mockResolvedValue([
    { question: 'Q1', answer: 'A1' },
    { question: 'Q2', answer: 'A2' },
  ]),
}));

vi.mock('../generators/quiz.js', () => ({
  generateQuiz: vi
    .fn()
    .mockResolvedValue([
      { question: 'Q1', choices: ['a', 'b', 'c', 'd'], correct: 0, explanation: 'Expl' },
    ]),
  generateQuizVocal: vi.fn().mockResolvedValue([
    {
      question: 'Q1 vocal',
      choices: ['a', 'b', 'c', 'd'],
      correct: 1,
      explanation: 'Expl vocal',
    },
  ]),
  generateQuizReview: vi.fn().mockResolvedValue([
    {
      question: 'Review Q1',
      choices: ['a', 'b', 'c', 'd'],
      correct: 2,
      explanation: 'Review expl',
    },
  ]),
}));

vi.mock('../generators/podcast.js', () => ({
  generatePodcastScript: vi.fn().mockResolvedValue({
    script: [
      { speaker: 'host', text: 'Hello' },
      { speaker: 'guest', text: 'Hi' },
    ],
    sourceRefs: ['ref1'],
  }),
}));

vi.mock('../generators/tts.js', () => ({
  generateAudio: vi.fn().mockResolvedValue(Buffer.from('fake-audio')),
}));

vi.mock('../generators/quiz-vocal.js', () => ({
  ttsQuestion: vi.fn().mockResolvedValue(Buffer.from('fake-question-audio')),
}));

vi.mock('../generators/image.js', () => ({
  generateImage: vi.fn().mockResolvedValue({
    imageUrl: '/output/projects/test/image.png',
    prompt: 'A test image',
  }),
}));

vi.mock('../generators/fill-blank.js', () => ({
  generateFillBlank: vi
    .fn()
    .mockResolvedValue([
      { sentence: 'Le ___ est bleu', answer: 'ciel', hint: 'Au dessus', category: 'Nature' },
    ]),
}));

vi.mock('../generators/router.js', () => ({
  routeRequest: vi.fn().mockResolvedValue({
    plan: [
      { agent: 'summary', reason: 'test reason' },
      { agent: 'flashcards', reason: 'test reason 2' },
    ],
    context: 'Test context',
  }),
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
    ttsProvider: 'mistral' as const,
    mistralVoices: { host: 'mh', guest: 'mg' },
  })),
  resolveVoices: vi.fn(() => ({ host: 'mh', guest: 'mg' })),
  getModelLimits: vi.fn(() => ({})),
}));

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

// --- Test data ---

function makeSources(count = 2): Source[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `src-${i + 1}`,
    filename: `source${i + 1}.txt`,
    markdown: `Content of source ${i + 1}`,
    uploadedAt: new Date().toISOString(),
  }));
}

// --- Tests ---

describe('getMarkdown (exported)', () => {
  const sources = makeSources(3);

  it('returns all sources concatenated when no sourceIds', () => {
    const md = getMarkdown(sources);
    expect(md).toContain('Source 1');
    expect(md).toContain('Source 2');
    expect(md).toContain('Source 3');
    expect(md).toContain('source1.txt');
    expect(md).toContain('Content of source 1');
    expect(md).toContain('Content of source 3');
  });

  it('returns all sources when sourceIds is empty array', () => {
    const md = getMarkdown(sources, []);
    expect(md).toContain('Source 1');
    expect(md).toContain('Source 3');
  });

  it('filters sources by sourceIds', () => {
    const md = getMarkdown(sources, ['src-2']);
    expect(md).toContain('source2.txt');
    expect(md).toContain('Content of source 2');
    expect(md).not.toContain('source1.txt');
    expect(md).not.toContain('source3.txt');
  });

  it('filters multiple sourceIds', () => {
    const md = getMarkdown(sources, ['src-1', 'src-3']);
    expect(md).toContain('source1.txt');
    expect(md).toContain('source3.txt');
    expect(md).not.toContain('source2.txt');
  });

  it('throws when no sources match', () => {
    expect(() => getMarkdown(sources, ['nonexistent'])).toThrow('Aucune source disponible');
  });

  it('throws when sources array is empty', () => {
    expect(() => getMarkdown([])).toThrow('Aucune source disponible');
  });

  it('formats markdown with separators', () => {
    const md = getMarkdown(sources);
    expect(md).toContain('---');
  });
});

describe('generateRoutes', () => {
  let tmpDir: string;
  let store: ProjectStore;
  let profileStore: ProfileStore;
  let router: any;
  const mockClient = {} as any;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), 'gen-test-'));
    store = new ProjectStore(tmpDir);
    profileStore = new ProfileStore(tmpDir);
    router = generateRoutes(store, mockClient, profileStore);
    vi.clearAllMocks();
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  // --- handleGeneration wrapper tests ---

  describe('handleGeneration (via summary route)', () => {
    it('returns 404 when project not found', async () => {
      const handler = getHandler(router, 'post', '/:pid/generate/summary');
      const req = mockReq({ params: { pid: 'nonexistent' }, body: {} });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Projet introuvable' });
    });

    it('returns 400 when moderation blocks', async () => {
      const profile = profileStore.create('Kid', 9, '0', 'fr');
      const project = store.createProject('Test', profile.id);
      const pid = project.meta.id;

      // Add unsafe source
      store.addSource(pid, {
        id: 'unsafe-src',
        filename: 'bad.txt',
        markdown: 'Unsafe content',
        uploadedAt: new Date().toISOString(),
        moderation: { status: 'unsafe', categories: { violence_and_threats: true } },
      });

      const handler = getHandler(router, 'post', '/:pid/generate/summary');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'moderation.blocked' });
    });

    it('does not block when profile has useModeration=false', async () => {
      const profile = profileStore.create('Adult', 30, '0', 'fr');
      // Adults have useModeration=false by default
      const project = store.createProject('Test', profile.id);
      const pid = project.meta.id;

      store.addSource(pid, {
        id: 'unsafe-src',
        filename: 'bad.txt',
        markdown: 'Unsafe content',
        uploadedAt: new Date().toISOString(),
        moderation: { status: 'unsafe', categories: { violence_and_threats: true } },
      });

      const handler = getHandler(router, 'post', '/:pid/generate/summary');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      // Should not be blocked, should succeed
      expect(res.status).not.toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ type: 'summary' }));
    });

    it('does not block when moderation status is safe', async () => {
      const profile = profileStore.create('Kid', 9, '0', 'fr');
      const project = store.createProject('Test', profile.id);
      const pid = project.meta.id;

      store.addSource(pid, {
        id: 'safe-src',
        filename: 'good.txt',
        markdown: 'Safe content',
        uploadedAt: new Date().toISOString(),
        moderation: { status: 'safe', categories: {} },
      });

      const handler = getHandler(router, 'post', '/:pid/generate/summary');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).not.toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ type: 'summary' }));
    });

    it('successfully generates and stores a generation', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Some content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/summary');
      const req = mockReq({
        params: { pid },
        body: { lang: 'fr', ageGroup: 'enfant' },
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'summary',
          title: expect.stringContaining('Fiche'),
          data: expect.objectContaining({ title: 'Test Summary' }),
        }),
      );

      // Verify generation was stored
      const updatedProject = store.getProject(pid);
      expect(updatedProject!.results.generations).toHaveLength(1);
      expect(updatedProject!.results.generations[0].type).toBe('summary');
    });

    it('handles generator errors -> 500', async () => {
      const { generateSummary } = await import('../generators/summary.js');
      (generateSummary as any).mockRejectedValueOnce(new Error('API error'));

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/summary');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: expect.stringContaining('API error') });
    });

    it('uses default lang=fr and ageGroup=enfant when not provided', async () => {
      const { generateSummary } = await import('../generators/summary.js');

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/summary');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      expect(generateSummary).toHaveBeenCalledWith(
        mockClient,
        expect.any(String),
        'm', // model
        false, // hasConsigne
        'fr', // default lang
        'enfant', // default ageGroup
        '', // exclusions (no previous generations)
      );
    });

    it('passes custom lang and ageGroup to generator', async () => {
      const { generateSummary } = await import('../generators/summary.js');

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/summary');
      const req = mockReq({
        params: { pid },
        body: { lang: 'en', ageGroup: 'ado' },
      });
      const res = mockRes();

      await handler(req, res);

      expect(generateSummary).toHaveBeenCalledWith(
        mockClient,
        expect.any(String),
        'm',
        false,
        'en',
        'ado',
        '', // exclusions
      );
    });

    it('applies consigne when project has one and useConsigne is not false', async () => {
      const { generateSummary } = await import('../generators/summary.js');

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });
      store.setConsigne(pid, {
        found: true,
        text: 'Reviser chapitre 3',
        keyTopics: ['topic1', 'topic2'],
      });

      const handler = getHandler(router, 'post', '/:pid/generate/summary');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      // The markdown passed to the generator should include consigne header
      expect(generateSummary).toHaveBeenCalledWith(
        mockClient,
        expect.stringContaining('CONSIGNE DE REVISION'),
        'm',
        true, // hasConsigne = true
        'fr',
        'enfant',
        '', // exclusions
      );
    });

    it('skips consigne when useConsigne=false', async () => {
      const { generateSummary } = await import('../generators/summary.js');

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });
      store.setConsigne(pid, { found: true, text: 'Reviser', keyTopics: ['topic1'] });

      const handler = getHandler(router, 'post', '/:pid/generate/summary');
      const req = mockReq({ params: { pid }, body: { useConsigne: false } });
      const res = mockRes();

      await handler(req, res);

      expect(generateSummary).toHaveBeenCalledWith(
        mockClient,
        expect.not.stringContaining('CONSIGNE DE REVISION'),
        'm',
        false,
        'fr',
        'enfant',
        '', // exclusions
      );
    });

    it('clamps count between 1 and 50', async () => {
      const { generateFlashcards } = await import('../generators/flashcards.js');

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/flashcards');

      // Test count > 50 clamped to 50
      const req1 = mockReq({ params: { pid }, body: { count: 100 } });
      const res1 = mockRes();
      await handler(req1, res1);
      expect(generateFlashcards).toHaveBeenCalledWith(
        mockClient,
        expect.any(String),
        'm',
        'fr',
        'enfant',
        50,
        '',
      );

      // Test count < 1 clamped to 1
      const req2 = mockReq({ params: { pid }, body: { count: -5 } });
      const res2 = mockRes();
      await handler(req2, res2);
      // 2nd call has exclusions from 1st generation stored in project
      expect(generateFlashcards).toHaveBeenCalledWith(
        mockClient,
        expect.any(String),
        'm',
        'fr',
        'enfant',
        1,
        expect.any(String),
      );
    });

    it('passes undefined count when not provided', async () => {
      const { generateFlashcards } = await import('../generators/flashcards.js');

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/flashcards');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();
      await handler(req, res);

      expect(generateFlashcards).toHaveBeenCalledWith(
        mockClient,
        expect.any(String),
        'm',
        'fr',
        'enfant',
        undefined,
        '',
      );
    });

    it('filters sources by sourceIds', async () => {
      const { generateSummary } = await import('../generators/summary.js');

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'alpha.txt',
        markdown: 'Alpha content',
        uploadedAt: new Date().toISOString(),
      });
      store.addSource(pid, {
        id: 'src-2',
        filename: 'beta.txt',
        markdown: 'Beta content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/summary');
      const req = mockReq({
        params: { pid },
        body: { sourceIds: ['src-2'] },
      });
      const res = mockRes();

      await handler(req, res);

      expect(generateSummary).toHaveBeenCalledWith(
        mockClient,
        expect.stringContaining('Beta content'),
        'm',
        false,
        'fr',
        'enfant',
        '', // exclusions
      );
      // Markdown should not contain source 1
      const calledMarkdown = (generateSummary as any).mock.calls[0][1] as string;
      expect(calledMarkdown).not.toContain('Alpha content');

      // The generation's sourceIds should only contain the selected source
      const gen = res.json.mock.calls[0][0];
      expect(gen.sourceIds).toEqual(['src-2']);
    });
  });

  // --- Route-level tests ---

  describe('POST /:pid/generate/summary', () => {
    it('generates summary with correct autoTitle (fr)', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/summary');
      const req = mockReq({ params: { pid }, body: { lang: 'fr' } });
      const res = mockRes();

      await handler(req, res);

      const gen = res.json.mock.calls[0][0];
      expect(gen.title).toBe('Fiche \u2014 Test Summary');
      expect(gen.type).toBe('summary');
      expect(gen.id).toBeDefined();
      expect(gen.createdAt).toBeDefined();
    });

    it('generates summary with correct autoTitle (en)', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/summary');
      const req = mockReq({ params: { pid }, body: { lang: 'en' } });
      const res = mockRes();

      await handler(req, res);

      const gen = res.json.mock.calls[0][0];
      expect(gen.title).toBe('Note \u2014 Test Summary');
    });
  });

  describe('POST /:pid/generate/flashcards', () => {
    it('generates flashcards and stores them', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/flashcards');
      const req = mockReq({ params: { pid }, body: { lang: 'fr', ageGroup: 'enfant' } });
      const res = mockRes();

      await handler(req, res);

      const gen = res.json.mock.calls[0][0];
      expect(gen.type).toBe('flashcards');
      expect(gen.title).toBe('Flashcards (2)');
      expect(gen.data).toHaveLength(2);

      const updatedProject = store.getProject(pid);
      expect(updatedProject!.results.generations).toHaveLength(1);
    });
  });

  describe('POST /:pid/generate/quiz', () => {
    it('generates quiz and stores it', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/quiz');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      const gen = res.json.mock.calls[0][0];
      expect(gen.type).toBe('quiz');
      expect(gen.title).toBe('Quiz (1 questions)');
      expect(gen.data).toHaveLength(1);
    });
  });

  describe('POST /:pid/generate/fill-blank', () => {
    it('generates fill-blank exercises', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/fill-blank');
      const req = mockReq({ params: { pid }, body: { lang: 'fr' } });
      const res = mockRes();

      await handler(req, res);

      const gen = res.json.mock.calls[0][0];
      expect(gen.type).toBe('fill-blank');
      expect(gen.title).toContain('Textes \u00e0 trous');
      expect(gen.data).toHaveLength(1);
    });

    it('generates fill-blank with English title', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/fill-blank');
      const req = mockReq({ params: { pid }, body: { lang: 'en' } });
      const res = mockRes();

      await handler(req, res);

      const gen = res.json.mock.calls[0][0];
      expect(gen.title).toContain('Fill-in-the-blanks');
    });
  });

  describe('POST /:pid/generate/podcast', () => {
    it('generates podcast with script and audio', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/podcast');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      const gen = res.json.mock.calls[0][0];
      expect(gen.type).toBe('podcast');
      expect(gen.title).toBe('Podcast');
      expect(gen.data.script).toHaveLength(2);
      expect(gen.data.audioUrl).toContain(`/output/projects/${pid}/podcast-`);
      expect(gen.data.sourceRefs).toEqual(['ref1']);
    });
  });

  describe('POST /:pid/generate/quiz-vocal', () => {
    it('generates quiz-vocal with TTS audio for each question', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/quiz-vocal');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      const gen = res.json.mock.calls[0][0];
      expect(gen.type).toBe('quiz-vocal');
      expect(gen.data).toHaveLength(1);
      expect(gen.audioUrls).toHaveLength(1);
      expect(gen.audioUrls[0]).toContain(`/output/projects/${pid}/quiz-vocal-q0-`);
    });
  });

  describe('POST /:pid/generate/image', () => {
    it('generates image via agent', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/image');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      const gen = res.json.mock.calls[0][0];
      expect(gen.type).toBe('image');
      expect(gen.title).toBe('Illustration');
      expect(gen.data.imageUrl).toBe('/output/projects/test/image.png');
      expect(gen.data.prompt).toBe('A test image');
    });
  });

  describe('POST /:pid/generate/quiz-review', () => {
    it('validates generationId is required', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/quiz-review');
      const req = mockReq({
        params: { pid },
        body: { weakQuestions: [{ question: 'Q', choices: ['a'], correct: 0, explanation: 'E' }] },
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'generationId et weakQuestions requis' });
    });

    it('validates weakQuestions is required', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/quiz-review');
      const req = mockReq({
        params: { pid },
        body: { generationId: 'gen-1' },
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'generationId et weakQuestions requis' });
    });

    it('validates weakQuestions must be an array', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/quiz-review');
      const req = mockReq({
        params: { pid },
        body: { generationId: 'gen-1', weakQuestions: 'not-array' },
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('returns 404 when original quiz not found', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/quiz-review');
      const req = mockReq({
        params: { pid },
        body: {
          generationId: 'nonexistent',
          weakQuestions: [{ question: 'Q', choices: ['a'], correct: 0, explanation: 'E' }],
        },
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Quiz original introuvable' });
    });

    it('returns 404 when original generation is not a quiz', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      // Add a summary generation (not a quiz)
      store.addGeneration(pid, {
        id: 'gen-summary',
        title: 'Summary',
        createdAt: new Date().toISOString(),
        sourceIds: ['src-1'],
        type: 'summary',
        data: { title: 'T', summary: 'S', key_points: [], vocabulary: [] },
      });

      const handler = getHandler(router, 'post', '/:pid/generate/quiz-review');
      const req = mockReq({
        params: { pid },
        body: {
          generationId: 'gen-summary',
          weakQuestions: [{ question: 'Q', choices: ['a'], correct: 0, explanation: 'E' }],
        },
      });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Quiz original introuvable' });
    });

    it('successfully generates review quiz from original quiz', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      // Add original quiz generation
      store.addGeneration(pid, {
        id: 'gen-quiz',
        title: 'Quiz (5 questions)',
        createdAt: new Date().toISOString(),
        sourceIds: ['src-1'],
        type: 'quiz',
        data: [{ question: 'Q1', choices: ['a', 'b', 'c', 'd'], correct: 0, explanation: 'E1' }],
      });

      const weakQuestions = [
        { question: 'Q1', choices: ['a', 'b', 'c', 'd'], correct: 0, explanation: 'E1' },
      ];

      const handler = getHandler(router, 'post', '/:pid/generate/quiz-review');
      const req = mockReq({
        params: { pid },
        body: {
          generationId: 'gen-quiz',
          weakQuestions,
          lang: 'fr',
        },
      });
      const res = mockRes();

      await handler(req, res);

      const gen = res.json.mock.calls[0][0];
      expect(gen.type).toBe('quiz');
      expect(gen.title).toContain('Revision');
      expect(gen.title).toContain('Quiz (5 questions)');
      expect(gen.sourceIds).toEqual(['src-1']);
    });

    it('uses English label for review when lang=en', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      store.addGeneration(pid, {
        id: 'gen-quiz',
        title: 'Quiz (5 questions)',
        createdAt: new Date().toISOString(),
        sourceIds: ['src-1'],
        type: 'quiz',
        data: [{ question: 'Q1', choices: ['a', 'b', 'c', 'd'], correct: 0, explanation: 'E1' }],
      });

      const handler = getHandler(router, 'post', '/:pid/generate/quiz-review');
      const req = mockReq({
        params: { pid },
        body: {
          generationId: 'gen-quiz',
          weakQuestions: [
            { question: 'Q1', choices: ['a', 'b', 'c', 'd'], correct: 0, explanation: 'E1' },
          ],
          lang: 'en',
        },
      });
      const res = mockRes();

      await handler(req, res);

      const gen = res.json.mock.calls[0][0];
      expect(gen.title).toContain('Review');
    });
  });

  // --- Route analysis endpoint ---

  describe('POST /:pid/generate/route', () => {
    it('returns 404 when project not found', async () => {
      const handler = getHandler(router, 'post', '/:pid/generate/route');
      const req = mockReq({ params: { pid: 'nonexistent' }, body: {} });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Projet introuvable' });
    });

    it('returns route plan on success', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/route');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      const result = res.json.mock.calls[0][0];
      expect(result.plan).toHaveLength(2);
      expect(result.plan[0].agent).toBe('summary');
      expect(result.plan[1].agent).toBe('flashcards');
    });

    it('returns 500 when routeRequest fails', async () => {
      const { routeRequest } = await import('../generators/router.js');
      (routeRequest as any).mockRejectedValueOnce(new Error('Route analysis failed'));

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/route');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: expect.stringContaining('Route analysis failed'),
      });
    });

    it('applies consigne when present and useConsigne is not false', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });
      store.setConsigne(pid, { found: true, text: 'Focus on dates', keyTopics: ['dates'] });

      const handler = getHandler(router, 'post', '/:pid/generate/route');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      // Should succeed
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    it('skips consigne when useConsigne is false', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });
      store.setConsigne(pid, { found: true, text: 'Focus on dates', keyTopics: ['dates'] });

      const handler = getHandler(router, 'post', '/:pid/generate/route');
      const req = mockReq({ params: { pid }, body: { useConsigne: false } });
      const res = mockRes();

      await handler(req, res);

      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  // --- Auto route ---

  describe('POST /:pid/generate/auto', () => {
    it('returns 404 when project not found', async () => {
      const handler = getHandler(router, 'post', '/:pid/generate/auto');
      const req = mockReq({ params: { pid: 'nonexistent' }, body: {} });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Projet introuvable' });
    });

    it('returns 400 when moderation blocks', async () => {
      const profile = profileStore.create('Kid', 9, '0', 'fr');
      const project = store.createProject('Test', profile.id);
      const pid = project.meta.id;

      store.addSource(pid, {
        id: 'unsafe-src',
        filename: 'bad.txt',
        markdown: 'Unsafe content',
        uploadedAt: new Date().toISOString(),
        moderation: { status: 'unsafe', categories: { violence_and_threats: true } },
      });

      const handler = getHandler(router, 'post', '/:pid/generate/auto');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'moderation.blocked' });
    });

    it('executes routed plan and returns multiple generations', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/auto');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      const result = res.json.mock.calls[0][0];
      expect(result.route).toHaveLength(2);
      expect(result.generations).toHaveLength(2);
      expect(result.generations[0].type).toBe('summary');
      expect(result.generations[1].type).toBe('flashcards');
      expect(result.failedSteps).toBeUndefined();

      // Verify all generations were stored
      const updatedProject = store.getProject(pid);
      expect(updatedProject!.results.generations).toHaveLength(2);
    });

    it('reports failed steps without failing overall', async () => {
      const { generateSummary } = await import('../generators/summary.js');
      (generateSummary as any).mockRejectedValueOnce(new Error('Summary failed'));

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/auto');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      const result = res.json.mock.calls[0][0];
      expect(result.failedSteps).toEqual([{ agent: 'summary', code: 'internal_error' }]);
      expect(result.generations).toHaveLength(1);
      expect(result.generations[0].type).toBe('flashcards');
    });

    it('skips only truly non-auto-executable agents (Phase 1B.3 — allowlist locale)', async () => {
      const { routeRequest } = await import('../generators/router.js');
      // Le router peut proposer des noms inconnus. Ceux-là doivent finir dans
      // skippedSteps. Les agents auto supportés, y compris quiz-vocal, doivent être
      // réellement exécutés.
      (routeRequest as any).mockResolvedValueOnce({
        plan: [
          { agent: 'unknown-type', reason: 'test' },
          { agent: 'quiz-vocal', reason: 'test' },
          { agent: 'quiz', reason: 'test' },
        ],
        context: 'Test context',
      });

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/auto');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      const result = res.json.mock.calls[0][0];
      expect(result.generations).toHaveLength(2);
      expect(result.generations[0].type).toBe('quiz-vocal');
      expect(result.generations[1].type).toBe('quiz');
      expect(result.skippedSteps).toEqual([{ agent: 'unknown-type', reason: 'test' }]);
      expect(result.failedSteps).toBeUndefined();
      // La réponse "route" reflète le plan effectivement exécuté (cohérent UX).
      expect(result.route).toEqual([
        { agent: 'quiz-vocal', reason: 'test' },
        { agent: 'quiz', reason: 'test' },
      ]);
    });

    it('returns 500 when routeRequest itself fails', async () => {
      const { routeRequest } = await import('../generators/router.js');
      (routeRequest as any).mockRejectedValueOnce(new Error('Router API error'));

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/auto');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: expect.stringContaining('Router API error') });
    });

    it('handles empty plan from router', async () => {
      const { routeRequest } = await import('../generators/router.js');
      (routeRequest as any).mockResolvedValueOnce({
        plan: [],
        context: 'Empty context',
      });

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/auto');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      const result = res.json.mock.calls[0][0];
      expect(result.generations).toHaveLength(0);
      expect(result.route).toHaveLength(0);
    });
  });

  // --- Auto route: podcast step ---

  describe('POST /:pid/generate/auto (podcast step)', () => {
    it('executes podcast step with audio generation', async () => {
      const { routeRequest } = await import('../generators/router.js');
      (routeRequest as any).mockResolvedValueOnce({
        plan: [{ agent: 'podcast', reason: 'educational content' }],
        context: 'Podcast context',
      });

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content for podcast',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/auto');
      const req = mockReq({ params: { pid }, body: { lang: 'fr' } });
      const res = mockRes();

      await handler(req, res);

      const result = res.json.mock.calls[0][0];
      expect(result.generations).toHaveLength(1);
      expect(result.generations[0].type).toBe('podcast');
      expect(result.generations[0].data.script).toHaveLength(2);
      expect(result.generations[0].data.audioUrl).toContain(`/output/projects/${pid}/podcast-`);
      expect(result.generations[0].data.sourceRefs).toEqual(['ref1']);
      expect(result.failedSteps).toBeUndefined();

      // Verify stored
      const updatedProject = store.getProject(pid);
      expect(updatedProject!.results.generations).toHaveLength(1);
      expect(updatedProject!.results.generations[0].type).toBe('podcast');
    });

    it('reports podcast as failed step when audio generation throws', async () => {
      const { routeRequest } = await import('../generators/router.js');
      const { generateAudio } = await import('../generators/tts.js');
      (routeRequest as any).mockResolvedValueOnce({
        plan: [
          { agent: 'summary', reason: 'overview' },
          { agent: 'podcast', reason: 'audio content' },
        ],
        context: 'Mixed context',
      });
      (generateAudio as any).mockRejectedValueOnce(new Error('TTS API down'));

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/auto');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      const result = res.json.mock.calls[0][0];
      // Summary should succeed, podcast should fail
      expect(result.generations).toHaveLength(1);
      expect(result.generations[0].type).toBe('summary');
      expect(result.failedSteps).toEqual([{ agent: 'podcast', code: 'tts_upstream_error' }]);
    });
  });

  describe('POST /:pid/generate/auto (HTTP 502 + codes stables)', () => {
    it('renvoie 502 quand tous les steps échouent', async () => {
      const { routeRequest } = await import('../generators/router.js');
      const { generateSummary } = await import('../generators/summary.js');
      const { generateFlashcards } = await import('../generators/flashcards.js');
      (routeRequest as any).mockResolvedValueOnce({
        plan: [
          { agent: 'summary', reason: 'r' },
          { agent: 'flashcards', reason: 'r' },
        ],
        context: 'ctx',
      });
      (generateSummary as any).mockRejectedValueOnce(new Error('boom'));
      (generateFlashcards as any).mockRejectedValueOnce(new Error('boom'));

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 't.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/auto');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();
      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(502);
      const body = res.json.mock.calls[0][0];
      expect(body.error).toBe('auto.allStepsFailed');
      expect(body.generations).toHaveLength(0);
      expect(body.failedSteps).toHaveLength(2);
    });

    it('failedSteps[].code est llm_invalid_json pour SyntaxError', async () => {
      const { routeRequest } = await import('../generators/router.js');
      const { generateSummary } = await import('../generators/summary.js');
      (routeRequest as any).mockResolvedValueOnce({
        plan: [{ agent: 'summary', reason: 'r' }],
        context: 'ctx',
      });
      (generateSummary as any).mockRejectedValueOnce(new SyntaxError('Unexpected token'));

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 't.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/auto');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();
      await handler(req, res);

      const body = res.json.mock.calls[0][0];
      expect(body.failedSteps).toEqual([{ agent: 'summary', code: 'llm_invalid_json' }]);
    });

    it('failedSteps[].code est quota_exceeded pour rate_limit', async () => {
      const { routeRequest } = await import('../generators/router.js');
      const { generateSummary } = await import('../generators/summary.js');
      (routeRequest as any).mockResolvedValueOnce({
        plan: [{ agent: 'summary', reason: 'r' }],
        context: 'ctx',
      });
      (generateSummary as any).mockRejectedValueOnce(new Error('429 rate_limit exceeded'));

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 't.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/auto');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();
      await handler(req, res);

      const body = res.json.mock.calls[0][0];
      expect(body.failedSteps[0].code).toBe('quota_exceeded');
    });

    it('ne renvoie pas le message brut de err au client (pas de fuite)', async () => {
      const { routeRequest } = await import('../generators/router.js');
      const { generateSummary } = await import('../generators/summary.js');
      (routeRequest as any).mockResolvedValueOnce({
        plan: [{ agent: 'summary', reason: 'r' }],
        context: 'ctx',
      });
      (generateSummary as any).mockRejectedValueOnce(
        new Error('sk-1234-SECRET leaked via URL https://api.internal/...'),
      );

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 't.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/auto');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();
      await handler(req, res);

      const body = res.json.mock.calls[0][0];
      const serialized = JSON.stringify(body);
      expect(serialized).not.toContain('sk-1234');
      expect(serialized).not.toContain('api.internal');
      expect(body.failedSteps[0].code).toBe('internal_error');
    });
  });

  describe('POST /:pid/generate/auto (quiz-vocal step)', () => {
    it('executes quiz-vocal step with per-question audio generation', async () => {
      const { routeRequest } = await import('../generators/router.js');
      (routeRequest as any).mockResolvedValueOnce({
        plan: [{ agent: 'quiz-vocal', reason: 'oral practice' }],
        context: 'Quiz vocal context',
      });

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content for quiz-vocal',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/auto');
      const req = mockReq({ params: { pid }, body: { lang: 'fr' } });
      const res = mockRes();

      await handler(req, res);

      const result = res.json.mock.calls[0][0];
      expect(result.generations).toHaveLength(1);
      expect(result.generations[0].type).toBe('quiz-vocal');
      expect(result.generations[0].data).toHaveLength(1);
      expect(result.generations[0].audioUrls).toHaveLength(1);
      expect(result.generations[0].audioUrls[0]).toContain(
        `/output/projects/${pid}/quiz-vocal-q0-`,
      );
      expect(result.generations[0].lang).toBe('fr');
      expect(result.generations[0].ageGroup).toBe('enfant');
      expect(result.failedSteps).toBeUndefined();

      const updatedProject = store.getProject(pid);
      expect(updatedProject!.results.generations).toHaveLength(1);
      expect(updatedProject!.results.generations[0].type).toBe('quiz-vocal');
    });
  });

  describe('POST /:pid/generate/auto (fill-blank step)', () => {
    it('executes fill-blank step successfully', async () => {
      const { routeRequest } = await import('../generators/router.js');
      (routeRequest as any).mockResolvedValueOnce({
        plan: [{ agent: 'fill-blank', reason: 'practice exercises' }],
        context: 'Fill-blank context',
      });

      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content for fill-blank',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/auto');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      const result = res.json.mock.calls[0][0];
      expect(result.generations).toHaveLength(1);
      expect(result.generations[0].type).toBe('fill-blank');
      expect(result.generations[0].data).toHaveLength(1);
      expect(result.failedSteps).toBeUndefined();
    });
  });

  // --- Moderation edge cases ---

  describe('checkModeration edge cases', () => {
    it('does not block when project has no profileId', async () => {
      // Project without profile
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'test.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
        moderation: { status: 'unsafe', categories: {} },
      });

      const handler = getHandler(router, 'post', '/:pid/generate/summary');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      // Should succeed because no profile = no moderation check
      expect(res.status).not.toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ type: 'summary' }));
    });

    it('blocks only selected sourceIds when some are unsafe', async () => {
      const profile = profileStore.create('Kid', 9, '0', 'fr');
      const project = store.createProject('Test', profile.id);
      const pid = project.meta.id;

      store.addSource(pid, {
        id: 'safe-src',
        filename: 'good.txt',
        markdown: 'Safe content',
        uploadedAt: new Date().toISOString(),
        moderation: { status: 'safe', categories: {} },
      });
      store.addSource(pid, {
        id: 'unsafe-src',
        filename: 'bad.txt',
        markdown: 'Unsafe content',
        uploadedAt: new Date().toISOString(),
        moderation: { status: 'unsafe', categories: {} },
      });

      const handler = getHandler(router, 'post', '/:pid/generate/summary');

      // Request with only safe source should succeed
      const req1 = mockReq({ params: { pid }, body: { sourceIds: ['safe-src'] } });
      const res1 = mockRes();
      await handler(req1, res1);
      expect(res1.status).not.toHaveBeenCalledWith(400);
      expect(res1.json).toHaveBeenCalledWith(expect.objectContaining({ type: 'summary' }));

      // Request with unsafe source should be blocked
      const req2 = mockReq({ params: { pid }, body: { sourceIds: ['unsafe-src'] } });
      const res2 = mockRes();
      await handler(req2, res2);
      expect(res2.status).toHaveBeenCalledWith(400);
    });
  });

  // --- sourceIds resolution ---

  describe('resolveSourceIds', () => {
    it('uses all source ids when body.sourceIds is empty', async () => {
      const project = store.createProject('Test');
      const pid = project.meta.id;
      store.addSource(pid, {
        id: 'src-1',
        filename: 'a.txt',
        markdown: 'A',
        uploadedAt: new Date().toISOString(),
      });
      store.addSource(pid, {
        id: 'src-2',
        filename: 'b.txt',
        markdown: 'B',
        uploadedAt: new Date().toISOString(),
      });

      const handler = getHandler(router, 'post', '/:pid/generate/flashcards');
      const req = mockReq({ params: { pid }, body: {} });
      const res = mockRes();

      await handler(req, res);

      const gen = res.json.mock.calls[0][0];
      expect(gen.sourceIds).toEqual(['src-1', 'src-2']);
    });
  });

  describe('checkContextLimit integration', () => {
    it('returns 400 when content exceeds 80% of model context limit', async () => {
      const { getModelLimits } = await import('../config.js');
      // Mock config models.summary = 'm', so limit must match 'm'
      vi.mocked(getModelLimits).mockReturnValue({ m: 300 });

      const project = store.createProject('ctx-test');
      const ctxPid = project.meta.id;
      const handler = getHandler(router, 'post', '/:pid/generate/summary');
      // 300 token limit × 0.8 = 240 tokens. At ~2 chars/token, 240 tokens ≈ 480 chars
      const longContent = 'x'.repeat(800);
      store.addSource(ctxPid, {
        id: 's-long',
        filename: 'big.txt',
        markdown: longContent,
        uploadedAt: new Date().toISOString(),
      });
      const req = mockReq({ params: { pid: ctxPid }, body: { sourceIds: ['s-long'] } });
      const res = mockRes();
      await handler(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json.mock.calls[0][0].error).toMatch(/^context_too_large:\d+$/);

      vi.mocked(getModelLimits).mockReturnValue({});
    });

    it('passes when content is within limit', async () => {
      const { getModelLimits } = await import('../config.js');
      vi.mocked(getModelLimits).mockReturnValue({ m: 100000 });

      const project = store.createProject('ctx-ok');
      const ctxPid = project.meta.id;
      store.addSource(ctxPid, {
        id: 's-ok',
        filename: 'ok.txt',
        markdown: 'Short content',
        uploadedAt: new Date().toISOString(),
      });
      const handler = getHandler(router, 'post', '/:pid/generate/summary');
      const req = mockReq({ params: { pid: ctxPid }, body: {} });
      const res = mockRes();
      await handler(req, res);
      expect(res.status).not.toHaveBeenCalledWith(400);

      vi.mocked(getModelLimits).mockReturnValue({});
    });

    it('uses 128K fallback when model has no known limit', async () => {
      const { getModelLimits } = await import('../config.js');
      vi.mocked(getModelLimits).mockReturnValue({});

      const project = store.createProject('ctx-nolimit');
      const ctxPid = project.meta.id;
      // Short content should pass with 128K fallback
      store.addSource(ctxPid, {
        id: 's-nl',
        filename: 'nl.txt',
        markdown: 'Content',
        uploadedAt: new Date().toISOString(),
      });
      const handler = getHandler(router, 'post', '/:pid/generate/summary');
      const req = mockReq({ params: { pid: ctxPid }, body: {} });
      const res = mockRes();
      await handler(req, res);
      expect(res.status).not.toHaveBeenCalledWith(400);
    });

    it('rejects very large content even with fallback limit', async () => {
      const { getModelLimits } = await import('../config.js');
      vi.mocked(getModelLimits).mockReturnValue({});

      const project = store.createProject('ctx-huge');
      const ctxPid = project.meta.id;
      // 128K * 0.8 = 102,400 tokens. At /2 ratio, need > 204,800 chars to exceed
      const hugeContent = 'x'.repeat(210_000);
      store.addSource(ctxPid, {
        id: 's-huge',
        filename: 'huge.txt',
        markdown: hugeContent,
        uploadedAt: new Date().toISOString(),
      });
      const handler = getHandler(router, 'post', '/:pid/generate/summary');
      const req = mockReq({ params: { pid: ctxPid }, body: { sourceIds: ['s-huge'] } });
      const res = mockRes();
      await handler(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json.mock.calls[0][0].error).toMatch(/^context_too_large:\d+$/);
    });
  });
});
