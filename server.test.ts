/* eslint-disable @typescript-eslint/no-unsafe-assignment,
                  @typescript-eslint/no-unsafe-call,
                  @typescript-eslint/no-unsafe-member-access,
                  @typescript-eslint/no-unsafe-return,
                  @typescript-eslint/no-unsafe-argument --
   Codacy typed lint resolves Vitest mocks as error typed in this bootstrap test. */
import {
  type ErrorRequestHandler,
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from 'express';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => {
  const app = {
    disable: vi.fn(),
    get: vi.fn(),
    listen: vi.fn((_port: number, cb?: () => void) => {
      cb?.();
      return { close: vi.fn() };
    }),
    post: vi.fn(),
    put: vi.fn(),
    use: vi.fn(),
  };

  const makeMiddleware = () =>
    vi.fn((...args: unknown[]) => {
      const next = args[2];
      if (typeof next === 'function') next();
    });
  const helmetMiddleware = makeMiddleware();
  const jsonMiddleware = makeMiddleware();
  const staticMiddleware = makeMiddleware();
  const routeMiddleware = makeMiddleware();

  const helmet = Object.assign(
    vi.fn(() => helmetMiddleware),
    {
      contentSecurityPolicy: {
        getDefaultDirectives: vi.fn(() => ({
          'default-src': ["'self'"],
          'upgrade-insecure-requests': [],
        })),
      },
    },
  );

  return {
    app,
    aiLimiter: vi.fn((...args: unknown[]) => {
      const next = args[2];
      if (typeof next === 'function') next();
    }),
    aiPathLimiter: makeMiddleware(),
    dotenvConfig: vi.fn(),
    expressJson: vi.fn(() => jsonMiddleware),
    expressStatic: vi.fn(() => staticMiddleware),
    generalLimiter: makeMiddleware(),
    helmet,
    initConfig: vi.fn(),
    listVoices: vi.fn(() => Promise.resolve([])),
    logger: { error: vi.fn(), info: vi.fn(), warn: vi.fn() },
    mkdirSync: vi.fn(),
    modelList: vi.fn(),
    projectStoreInstances: [] as {
      cancelAllPendingsAtBoot: ReturnType<typeof vi.fn>;
      listProjects: ReturnType<typeof vi.fn>;
      migrateFromLegacy: ReturnType<typeof vi.fn>;
    }[],
    resumeModerationAtBoot: vi.fn(() => Promise.resolve(0)),
    routeFactory: vi.fn(() => routeMiddleware),
    setModelLimits: vi.fn(),
    setVoiceCache: vi.fn(),
    trackClient: vi.fn(),
  };
});

vi.mock('dotenv', () => ({ default: { config: state.dotenvConfig } }));
vi.mock('node:fs', () => ({ mkdirSync: state.mkdirSync }));
vi.mock('express', () => ({
  default: Object.assign(
    vi.fn(() => state.app),
    {
      json: state.expressJson,
      static: state.expressStatic,
    },
  ),
}));
vi.mock('helmet', () => ({ default: state.helmet }));
vi.mock('@mistralai/mistralai', () => ({
  Mistral: class MockMistral {
    models = { list: state.modelList };
  },
}));
vi.mock('./helpers/tracked-client.js', () => ({ trackClient: state.trackClient }));
vi.mock('./helpers/logger.js', () => ({ logger: state.logger }));
vi.mock('./helpers/usage-context.js', () => ({ recordUsage: vi.fn() }));
vi.mock('./helpers/rate-limit.js', () => ({
  aiLimiter: state.aiLimiter,
  aiPathLimiter: state.aiPathLimiter,
  generalLimiter: state.generalLimiter,
}));
vi.mock('./config.js', () => ({
  getApiStatus: vi.fn(() => ({ mistral: true, ttsAvailable: false })),
  getConfig: vi.fn(() => ({})),
  initConfig: state.initConfig,
  resetConfig: vi.fn(() => ({})),
  saveConfig: vi.fn(() => ({})),
  setModelLimits: state.setModelLimits,
  setVoiceCache: state.setVoiceCache,
}));
vi.mock('./generators/tts-provider.js', () => ({ listVoices: state.listVoices }));
vi.mock('./helpers/source-moderation.js', () => ({
  resumeModerationAtBoot: state.resumeModerationAtBoot,
}));
vi.mock('./store.js', () => ({
  ProjectStore: class MockProjectStore {
    cancelAllPendingsAtBoot = vi.fn(() => 0);
    listProjects = vi.fn(() => []);
    migrateFromLegacy = vi.fn();

    constructor() {
      state.projectStoreInstances.push(this);
    }
  },
}));
vi.mock('./profiles.js', () => ({
  ALL_MODERATION_CATEGORIES: [],
  MODERATION_CATEGORIES: {},
  ProfileStore: class MockProfileStore {
    readonly outputDir: string | undefined;

    constructor(outputDir?: string) {
      this.outputDir = outputDir;
    }
  },
}));
vi.mock('./routes/projects.js', () => ({ projectRoutes: state.routeFactory }));
vi.mock('./routes/sources.js', () => ({ sourceRoutes: state.routeFactory }));
vi.mock('./routes/generate.js', () => ({ generateRoutes: state.routeFactory }));
vi.mock('./routes/generations.js', () => ({ generationCrudRoutes: state.routeFactory }));
vi.mock('./routes/chat.js', () => ({ chatRoutes: state.routeFactory }));
vi.mock('./routes/profiles.js', () => ({ profileRoutes: state.routeFactory }));

type TestResponse = Response & {
  jsonMock: ReturnType<typeof vi.fn>;
  statusMock: ReturnType<typeof vi.fn>;
};

function responseMock(): TestResponse {
  const jsonMock = vi.fn();
  const statusMock = vi.fn();
  const res = { json: jsonMock, jsonMock, status: statusMock, statusMock };
  statusMock.mockReturnValue(res);
  return res as unknown as TestResponse;
}

function importServer(): Promise<typeof import('./server.js')> {
  return import('./server.js');
}

function getHelmetOptions() {
  const helmetCalls = state.helmet.mock.calls as unknown as [unknown][];
  return helmetCalls[0]?.[0] as {
    contentSecurityPolicy: { directives: Record<string, unknown> };
    crossOriginEmbedderPolicy: boolean;
  };
}

function getRouteHandler(path: string) {
  const getCalls = state.app.get.mock.calls as unknown as [string, RequestHandler][];
  const handler = getCalls.find(([routePath]) => routePath === path)?.[1];
  if (!handler) throw new TypeError(`Missing route handler for ${path}`);
  return handler;
}

function getJsonErrorHandler() {
  const handler = state.app.use.mock.calls
    .map(([middleware]) => middleware)
    .find((middleware) => typeof middleware === 'function' && middleware.length === 4);
  if (!handler) throw new TypeError('Missing JSON error handler');
  return handler as ErrorRequestHandler;
}

// Rang d'appel (invocationCallOrder) du premier `app.use` qui vérifie `match`.
function useCallOrder(match: (args: unknown[]) => boolean): number {
  const index = state.app.use.mock.calls.findIndex((args) => match(args));
  if (index === -1) throw new TypeError('Missing app.use call');
  return state.app.use.mock.invocationCallOrder[index];
}

function requestForPath(path: string): Request {
  return { path } as Request;
}

describe('server bootstrap', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    state.projectStoreInstances.length = 0;
    state.listVoices.mockResolvedValue([]);
    state.modelList.mockResolvedValue({
      data: [
        { id: 'model-a', maxContextLength: 32_000, aliases: ['model-alias'] },
        { id: 'model-without-limit' },
      ],
    });
    vi.stubEnv('MISTRAL_API_KEY', 'test-key');
    vi.stubEnv('NODE_ENV', 'development');
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('monte Helmet avec CSP active et les routes de boot', async () => {
    await importServer();

    const helmetOptions = getHelmetOptions();
    expect(helmetOptions.contentSecurityPolicy).not.toBe(false);
    expect(helmetOptions.crossOriginEmbedderPolicy).toBe(false);
    expect(helmetOptions.contentSecurityPolicy.directives['connect-src']).toEqual([
      "'self'",
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'ws://localhost:5173',
      'ws://127.0.0.1:5173',
    ]);
    await vi.waitFor(() =>
      expect(state.setModelLimits).toHaveBeenCalledWith({
        'model-a': 32_000,
        'model-alias': 32_000,
      }),
    );

    const moderationHandler = getRouteHandler('/api/moderation-categories');
    const moderationRes = responseMock();
    moderationHandler({} as Request, moderationRes, vi.fn());
    expect(moderationRes.jsonMock).toHaveBeenCalledWith({ all: [], defaults: {} });
  });

  it('masque les details des payloads JSON invalides', async () => {
    await importServer();

    const errorHandler = getJsonErrorHandler();
    const syntaxError = Object.assign(new SyntaxError('bad json'), { body: '{}' });
    const badJsonRes = responseMock();
    errorHandler(syntaxError, {} as Request, badJsonRes, vi.fn() as NextFunction);
    expect(badJsonRes.statusMock).toHaveBeenCalledWith(400);
    expect(badJsonRes.jsonMock).toHaveBeenCalledWith({ error: 'invalid_json' });

    const nextError = vi.fn();
    const otherError = new Error('other');
    errorHandler(otherError, {} as Request, responseMock(), nextError as NextFunction);
    expect(nextError).toHaveBeenCalledWith(otherError);
  });

  it('ne sert sous /output que les médias des projets', async () => {
    await importServer();

    const mount = state.app.use.mock.calls.find(([path]) => path === '/output');
    expect(mount).toBeDefined();
    expect(state.expressStatic).toHaveBeenCalledWith(expect.stringMatching(/output$/), {
      dotfiles: 'deny',
      index: false,
      redirect: false,
    });
    const guard = mount?.[1] as RequestHandler;
    const denied = { status: vi.fn(), end: vi.fn() };
    denied.status.mockReturnValue(denied);
    const next = vi.fn();
    guard(requestForPath('/profiles.json'), denied as unknown as Response, next);
    expect(denied.status).toHaveBeenCalledWith(404);
    expect(next).not.toHaveBeenCalled();

    guard(requestForPath('/projects/p1/podcast-1.mp3'), responseMock(), next);
    expect(next).toHaveBeenCalledOnce();
  });

  // generalLimiter avant la 1re route /api (les routes de config lui échappaient) ; aiPathLimiter
  // une seule fois, avant les routeurs (les chemins IA sont testés dans helpers/rate-limit.test.ts).
  it('monte generalLimiter avant toute route /api et aiPathLimiter avant les routeurs', async () => {
    await importServer();

    const generalOrder = useCallOrder(
      ([path, mw]) => path === '/api' && mw === state.generalLimiter,
    );
    const [firstApiRoute] = state.app.get.mock.calls[0] as [string];
    expect(firstApiRoute).toBe('/api/config');
    expect(generalOrder).toBeLessThan(state.app.get.mock.invocationCallOrder[0]);
    expect(generalOrder).toBeLessThan(state.app.put.mock.invocationCallOrder[0]);
    expect(generalOrder).toBeLessThan(state.app.post.mock.invocationCallOrder[0]);

    const aiUses = state.app.use.mock.calls.filter(([mw]) => mw === state.aiPathLimiter);
    expect(aiUses).toHaveLength(1);
    const aiOrder = useCallOrder(([mw]) => mw === state.aiPathLimiter);
    expect(aiOrder).toBeLessThan(useCallOrder(([path]) => path === '/api/profiles'));
    expect(aiOrder).toBeLessThan(useCallOrder(([path]) => path === '/api/projects'));
  });

  // Reprise des modérations interrompues : clé d'env seulement, jamais une clé utilisateur.
  it('reprend les modérations interrompues au démarrage avec la clé d’env', async () => {
    await importServer();

    expect(state.resumeModerationAtBoot).toHaveBeenCalledTimes(1);
    const [store, profileStore, client] = state.resumeModerationAtBoot.mock.calls[0] as unknown[];
    expect(store).toBe(state.projectStoreInstances[0]);
    expect(profileStore).toMatchObject({ outputDir: expect.stringMatching(/output$/) });
    expect(client).toBeDefined();
  });

  it.each([
    ['EUREKAI_REQUIRE_USER_KEY=true', { EUREKAI_REQUIRE_USER_KEY: 'true' }],
    ['sans clé d’env', { MISTRAL_API_KEY: '' }],
  ])('%s : aucune reprise au démarrage, journalisé', async (_label, env) => {
    for (const [name, value] of Object.entries(env)) vi.stubEnv(name, value);

    await importServer();

    expect(state.resumeModerationAtBoot).not.toHaveBeenCalled();
    expect(state.logger.info).toHaveBeenCalledWith(
      'boot',
      expect.stringContaining('interrupted moderations resume on next use'),
    );
  });

  it('journalise les echecs de warmup non bloquants', async () => {
    state.listVoices.mockRejectedValueOnce(new Error('voice down'));
    state.modelList.mockRejectedValueOnce(new Error('models down'));

    await importServer();

    await vi.waitFor(() => {
      expect(state.logger.warn).toHaveBeenCalledWith(
        'voice-cache',
        expect.stringContaining('voice down'),
      );
      expect(state.logger.warn).toHaveBeenCalledWith(
        'models',
        expect.stringContaining('models down'),
      );
    });
  });
});
