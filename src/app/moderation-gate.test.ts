/* eslint-disable
   @typescript-eslint/no-explicit-any,
   @typescript-eslint/no-unsafe-argument,
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-return,
   @typescript-eslint/unbound-method
   --
   Codacy lance ESLint sans les types Vitest/mocks; lint:ci local reste type-aware. */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createGenerate } from './generate';
import {
  ensureGenerationAllowed,
  generationSources,
  mergeSourceModerations,
  requestSourceModeration,
} from './moderation-gate';

vi.mock('../i18n/index', () => ({ getLocale: vi.fn(() => 'fr') }));
vi.mock('./helpers', () => ({ normalizeSummaryData: vi.fn() }));

globalThis.fetch = vi.fn();

const gen = createGenerate();
const MODERATE_URL = '/api/projects/pid-1/sources/moderate';

const moderation = (status: string, categories: Record<string, boolean> = {}) => ({
  status,
  categories,
});

// État minimal : profil enfant modéré, méthodes réelles du pré-contrôle (createGenerate).
function makeState(overrides: any = {}) {
  return {
    currentProjectId: 'pid-1',
    currentProfile: { id: 'p1', ageGroup: 'enfant', useModeration: true },
    moderationDefaults: {},
    sources: [] as any[],
    selectedIds: [] as string[],
    t: vi.fn((key: string) => key),
    showToast: vi.fn(),
    $nextTick: vi.fn((cb?: () => void) => cb?.()),
    refreshIcons: vi.fn(),
    flaggedCategoryLabels: vi.fn(() => ''),
    blockedModerationSource: gen.blockedModerationSource,
    blockedModerationStatus: gen.blockedModerationStatus,
    moderationBlockedMessage: gen.moderationBlockedMessage,
    ...overrides,
  } as any;
}

function respondWith(sources: unknown[]) {
  return vi.mocked(globalThis.fetch).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ sources }),
  } as any);
}

const sentBody = (call = 0) =>
  JSON.parse((vi.mocked(globalThis.fetch).mock.calls[call][1] as RequestInit).body as string);

beforeEach(() => {
  vi.mocked(globalThis.fetch).mockReset();
});

describe('generationSources', () => {
  const sources = [{ id: 's1' }, { id: 's2' }, { id: 's3' }];

  it('sourceIds explicites, sinon la sélection ; liste vide = toutes les sources', () => {
    const state = makeState({ sources, selectedIds: ['s2'] });
    expect(generationSources(state, ['s3'])).toEqual([{ id: 's3' }]);
    expect(generationSources(state)).toEqual([{ id: 's2' }]);
    expect(generationSources(state, [])).toEqual(sources);
    expect(generationSources(makeState({ sources }))).toEqual(sources);
  });
});

describe('ensureGenerationAllowed', () => {
  it('sans projet courant : false, aucun appel', async () => {
    const state = makeState({ currentProjectId: null });

    await expect(ensureGenerationAllowed(state)).resolves.toBe(false);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('profil non modéré : true sans vérification (le serveur tranche)', async () => {
    const state = makeState({
      currentProfile: { id: 'p1', ageGroup: 'adulte', useModeration: false },
      sources: [{ id: 's1', moderation: moderation('pending') }],
    });

    await expect(ensureGenerationAllowed(state)).resolves.toBe(true);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('sources toutes vérifiées : true sans appel', async () => {
    const state = makeState({ sources: [{ id: 's1', moderation: moderation('safe') }] });

    await expect(ensureGenerationAllowed(state)).resolves.toBe(true);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(state.showToast).not.toHaveBeenCalled();
  });

  it('source signalée : refus immédiat, même message, aucune vérification', async () => {
    const state = makeState({
      sources: [
        { id: 's1', moderation: moderation('pending') },
        { id: 's2', moderation: moderation('unsafe') },
      ],
    });

    await expect(ensureGenerationAllowed(state)).resolves.toBe(false);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(state.showToast).toHaveBeenCalledWith('moderation.blocked', 'error');
    expect(state.showToast).not.toHaveBeenCalledWith('moderation.checking', 'info');
  });

  it('statut effectif : une source safe qui signale une catégorie bloquée refuse sans appel', async () => {
    const state = makeState({
      currentProfile: {
        id: 'p1',
        ageGroup: 'enfant',
        useModeration: true,
        moderationCategories: ['criminal'],
      },
      sources: [
        { id: 's1', moderation: moderation('pending') },
        { id: 's2', moderation: moderation('safe', { criminal: true }) },
      ],
    });

    await expect(ensureGenerationAllowed(state)).resolves.toBe(false);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(state.showToast).toHaveBeenCalledWith('moderation.blocked', 'error');
  });

  it('sources en attente ou en erreur vérifiées safe : toast, POST sur leurs seuls ids, fusion, true', async () => {
    const state = makeState({
      sources: [
        { id: 's1', moderation: moderation('safe') },
        { id: 's2', moderation: moderation('pending') },
        { id: 's3', moderation: moderation('error') },
      ],
    });
    respondWith([
      { id: 's2', moderation: moderation('safe') },
      { id: 's3', moderation: moderation('safe') },
    ]);

    await expect(ensureGenerationAllowed(state)).resolves.toBe(true);

    const [url, init] = vi.mocked(globalThis.fetch).mock.calls[0];
    expect(url).toBe(MODERATE_URL);
    expect((init as RequestInit).method).toBe('POST');
    expect(sentBody()).toEqual({ sourceIds: ['s2', 's3'] });
    expect(state.showToast).toHaveBeenCalledWith('moderation.checking', 'info');
    expect(state.sources.map((s: any) => s.moderation.status)).toEqual(['safe', 'safe', 'safe']);
  });

  it('toujours en attente après vérification : false, toast moderation.pending', async () => {
    const state = makeState({ sources: [{ id: 's1', moderation: moderation('pending') }] });
    respondWith([{ id: 's1', moderation: moderation('pending') }]);

    await expect(ensureGenerationAllowed(state)).resolves.toBe(false);
    expect(state.showToast).toHaveBeenCalledWith('moderation.pending', 'error');
  });

  it('vérification qui signale le contenu : false, toast moderation.blocked', async () => {
    const state = makeState({ sources: [{ id: 's1', moderation: moderation('pending') }] });
    respondWith([{ id: 's1', moderation: moderation('unsafe', { sexual: true }) }]);

    await expect(ensureGenerationAllowed(state)).resolves.toBe(false);
    expect(state.showToast).toHaveBeenCalledWith('moderation.blocked', 'error');
  });

  it('erreur réseau : false proprement, état local inchangé, toast moderation.error', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const state = makeState({ sources: [{ id: 's1', moderation: moderation('error') }] });
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new TypeError('Failed to fetch'));

    await expect(ensureGenerationAllowed(state)).resolves.toBe(false);
    expect(state.sources[0].moderation.status).toBe('error');
    expect(state.showToast).toHaveBeenCalledWith('moderation.error', 'error');
    warn.mockRestore();
  });

  it('réponse HTTP en échec : false, rien fusionné', async () => {
    const state = makeState({ sources: [{ id: 's1', moderation: moderation('pending') }] });
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: async () => ({ error: 'rate_limited' }),
    } as any);

    await expect(ensureGenerationAllowed(state)).resolves.toBe(false);
    expect(state.showToast).toHaveBeenCalledWith('moderation.pending', 'error');
  });

  it('projet changé pendant la vérification : false, rien fusionné, aucun toast de refus', async () => {
    const state = makeState({ sources: [{ id: 's1', moderation: moderation('pending') }] });
    vi.mocked(globalThis.fetch).mockImplementationOnce(async () => {
      state.currentProjectId = 'pid-2';
      return {
        ok: true,
        json: async () => ({ sources: [{ id: 's1', moderation: moderation('safe') }] }),
      } as any;
    });

    await expect(ensureGenerationAllowed(state)).resolves.toBe(false);
    expect(state.sources[0].moderation.status).toBe('pending');
    expect(state.showToast).not.toHaveBeenCalledWith('moderation.pending', 'error');
  });

  it('sourceIds explicites : seules ces sources sont vérifiées', async () => {
    const state = makeState({
      sources: [
        { id: 's1', moderation: moderation('pending') },
        { id: 's2', moderation: moderation('pending') },
      ],
      selectedIds: ['s1'],
    });
    respondWith([{ id: 's2', moderation: moderation('safe') }]);

    await expect(ensureGenerationAllowed(state, ['s2'])).resolves.toBe(true);
    expect(sentBody()).toEqual({ sourceIds: ['s2'] });
  });

  it('au plus 50 identifiants envoyés (plafond de la route)', async () => {
    const sources = Array.from({ length: 60 }, (_, i) => ({
      id: `s${i}`,
      moderation: moderation('pending'),
    }));
    const state = makeState({ sources });
    respondWith([]);

    await ensureGenerationAllowed(state);

    expect(sentBody().sourceIds).toHaveLength(50);
  });
});

describe('mergeSourceModerations', () => {
  it('fusionne par id ; entrée sans moderation, inconnue ou nulle ignorée', () => {
    const state = {
      sources: [
        { id: 's1', moderation: moderation('pending') },
        { id: 's2', moderation: moderation('error') },
      ],
    } as any;

    mergeSourceModerations(state, [
      { id: 's1', moderation: moderation('safe') as any },
      { id: 's2' },
      { id: 'inconnue', moderation: moderation('unsafe') as any },
      null,
    ]);

    expect(state.sources.map((s: any) => s.moderation.status)).toEqual(['safe', 'error']);
  });
});

describe('requestSourceModeration', () => {
  it('identifiant de projet invalide : false, aucun appel', async () => {
    await expect(requestSourceModeration(makeState(), '../evasion')).resolves.toBe(false);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('sans sourceIds : corps vide (toutes les sources), statuts fusionnés, icônes rafraîchies', async () => {
    const state = makeState({ sources: [{ id: 's1', moderation: moderation('pending') }] });
    respondWith([{ id: 's1', moderation: moderation('safe') }]);

    await expect(requestSourceModeration(state, 'pid-1')).resolves.toBe(true);

    expect(sentBody()).toEqual({});
    expect(state.sources[0].moderation.status).toBe('safe');
    expect(state.refreshIcons).toHaveBeenCalled();
  });

  it('corps de réponse inattendu : rien fusionné, sans erreur', async () => {
    const state = makeState({ sources: [{ id: 's1', moderation: moderation('pending') }] });
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({ ok: true, json: async () => null } as any);

    await expect(requestSourceModeration(state, 'pid-1')).resolves.toBe(true);
    expect(state.sources[0].moderation.status).toBe('pending');
  });
});
