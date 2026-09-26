import { describe, expect, it, vi } from 'vitest';
import { MODERATION_CHUNK_SIZE, moderateContent } from './moderation.js';
import { MODERATION_MODEL, MODERATION_MODEL_CATEGORIES } from '../helpers/moderation-model.js';
import { ALL_MODERATION_CATEGORIES, MODERATION_CATEGORIES } from '../profiles.js';
import { logger } from '../helpers/logger.js';

// Réponse réelle de mistral-moderation-2603, capturée en live le 2026-09-25 :
// `Object.keys(results[0].categories)` (11 clés, ordre de la réponse), toutes à false.
// Fixture INDÉPENDANTE de MODERATION_MODEL_CATEGORIES, sinon le test de contrat serait tautologique.
const FIXTURE_MODEL = 'mistral-moderation-2603';
const NONE_FLAGGED: Record<string, boolean> = {
  sexual: false,
  hate_and_discrimination: false,
  violence_and_threats: false,
  dangerous: false,
  criminal: false,
  selfharm: false,
  health: false,
  financial: false,
  law: false,
  pii: false,
  jailbreaking: false,
};

const cats = (flags: Record<string, boolean> = {}) => ({ ...NONE_FLAGGED, ...flags });

const withoutKeys = (keys: string[]) =>
  Object.fromEntries(Object.entries(NONE_FLAGGED).filter(([k]) => !keys.includes(k)));

// Forme de ModerationResponse (SDK 2.3.0) : `categories` absent → résultat sans la clé.
function response(categories?: Record<string, boolean>) {
  const result = categories
    ? {
        categories,
        categoryScores: Object.fromEntries(
          Object.entries(categories).map(([k, flagged]) => [k, flagged ? 0.92 : 0.01]),
        ),
      }
    : { categoryScores: {} };
  return { id: 'mod-test', model: FIXTURE_MODEL, results: [result] };
}

function createClient(responses: unknown[]) {
  const moderate = vi.fn();
  for (const r of responses) moderate.mockResolvedValueOnce(r);
  return {
    client: {
      classifiers: { moderate },
    } as any,
    moderate,
  };
}

const loggedWith = (spy: { mock: { calls: unknown[][] } }, ...parts: string[]) =>
  spy.mock.calls.some(
    (c) =>
      c[0] === 'moderation' &&
      typeof c[1] === 'string' &&
      parts.every((p) => (c[1] as string).includes(p)),
  );

describe('moderateContent', () => {
  it('uses a single moderation call for short text', async () => {
    const { client, moderate } = createClient([response(cats())]);

    const result = await moderateContent(client, 'bonjour', ['violence_and_threats']);

    expect(moderate).toHaveBeenCalledTimes(1);
    expect(moderate).toHaveBeenCalledWith({
      model: 'mistral-moderation-2603',
      inputs: ['bonjour'],
    });
    expect(result).toEqual({ status: 'safe', categories: cats() });
  });

  it('chunks long text and merges categories across safe chunks', async () => {
    const { client, moderate } = createClient([
      response(cats({ sexual: true })),
      response(cats({ selfharm: true })),
      response(cats()),
    ]);
    const text = 'a'.repeat(MODERATION_CHUNK_SIZE * 2 + 10);

    const result = await moderateContent(client, text, ['violence_and_threats']);

    expect(moderate).toHaveBeenCalledTimes(3);
    expect(result).toEqual({
      status: 'safe',
      categories: cats({ sexual: true, selfharm: true }),
    });
  });

  it('stops at the first unsafe chunk', async () => {
    const { client, moderate } = createClient([
      response(cats()),
      response(cats({ violence_and_threats: true })),
      response(cats({ criminal: true })),
    ]);
    const text = 'b'.repeat(MODERATION_CHUNK_SIZE * 3);

    const result = await moderateContent(client, text, ['violence_and_threats']);

    expect(moderate).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      status: 'unsafe',
      categories: cats({ violence_and_threats: true }),
    });
  });

  it('treats all flagged categories as safe when blockedCategories is empty', async () => {
    const { client } = createClient([response(cats({ selfharm: true, sexual: true }))]);

    const result = await moderateContent(client, 'texte', []);

    expect(result).toEqual({
      status: 'safe',
      categories: cats({ selfharm: true, sexual: true }),
    });
  });

  it('treats any flagged category as unsafe when no category filter is provided', async () => {
    const { client } = createClient([response(cats({ selfharm: true }))]);

    const result = await moderateContent(client, 'texte');

    expect(result).toEqual({ status: 'unsafe', categories: cats({ selfharm: true }) });
  });

  it('sans filtre (/moderate) : réponse sans aucune catégorie signalée → safe', async () => {
    const { client } = createClient([response(cats())]);

    expect(await moderateContent(client, 'texte')).toEqual({ status: 'safe', categories: cats() });
  });

  // Scission 2603 de dangerous_and_criminal_content : chaque successeur bloque seul.
  it.each(['criminal', 'dangerous'])('%s signalé et bloqué → unsafe', async (cat) => {
    const { client } = createClient([response(cats({ [cat]: true }))]);

    const result = await moderateContent(client, 'texte', [cat]);

    expect(result).toEqual({ status: 'unsafe', categories: cats({ [cat]: true }) });
  });

  it.each(['criminal', 'dangerous'])(
    'clé legacy dans la liste bloquée → étendue à ses successeurs → %s signalé → unsafe',
    async (cat) => {
      const { client } = createClient([response(cats({ [cat]: true }))]);

      const result = await moderateContent(client, 'texte', ['dangerous_and_criminal_content']);

      expect(result.status).toBe('unsafe');
    },
  );

  it('réponse sans pii/law + défauts enfant → safe (seules les clés bloquées sont exigées)', async () => {
    const errorSpy = vi.spyOn(logger, 'error').mockImplementation(() => {});
    const { client } = createClient([response(withoutKeys(['pii', 'law']))]);

    const result = await moderateContent(client, 'texte', MODERATION_CATEGORIES.enfant);

    expect(result.status).toBe('safe');
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('clé bloquée absente de la réponse → error (fail-closed, jamais unsafe) + logger.error', async () => {
    const errorSpy = vi.spyOn(logger, 'error').mockImplementation(() => {});
    const { client } = createClient([response(withoutKeys(['criminal']))]);

    const result = await moderateContent(client, 'texte', ['sexual', 'criminal']);

    expect(result.status).toBe('error');
    expect(loggedWith(errorSpy, FIXTURE_MODEL, 'criminal')).toBe(true);
    errorSpy.mockRestore();
  });

  it('contrat rompu sur un chunk intermédiaire → error, arrêt sans appeler les chunks suivants', async () => {
    const errorSpy = vi.spyOn(logger, 'error').mockImplementation(() => {});
    const { client, moderate } = createClient([
      response(cats({ health: true })),
      response(withoutKeys(['sexual'])),
      response(cats()),
    ]);
    const text = 'c'.repeat(MODERATION_CHUNK_SIZE * 3);

    const result = await moderateContent(client, text, ['sexual']);

    expect(moderate).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ status: 'error', categories: cats({ health: true }) });
    errorSpy.mockRestore();
  });

  it.each<[string, string[] | undefined]>([
    ['avec liste bloquée', ['sexual']],
    ['sans liste (/moderate)', undefined],
  ])('objet categories absent (%s) → error + logger.error', async (_label, blocked) => {
    const errorSpy = vi.spyOn(logger, 'error').mockImplementation(() => {});
    const { client } = createClient([response()]);

    const result = await moderateContent(client, 'texte', blocked);

    expect(result).toEqual({ status: 'error', categories: {} });
    expect(loggedWith(errorSpy, FIXTURE_MODEL, 'no categories object')).toBe(true);
    errorSpy.mockRestore();
  });

  it('results vide → error (aucune catégorie lisible)', async () => {
    const errorSpy = vi.spyOn(logger, 'error').mockImplementation(() => {});
    const { client } = createClient([{ id: 'mod-test', model: FIXTURE_MODEL, results: [] }]);

    const result = await moderateContent(client, 'texte', ['sexual']);

    expect(result.status).toBe('error');
    errorSpy.mockRestore();
  });

  it('clé locale inconnue ignorée (pas de DoS du profil) + warn, les autres restent appliquées', async () => {
    const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {});
    const errorSpy = vi.spyOn(logger, 'error').mockImplementation(() => {});
    const { client } = createClient([response(cats()), response(cats({ sexual: true }))]);

    const safe = await moderateContent(client, 'texte', ['sexual', 'TYPO']);
    const unsafe = await moderateContent(client, 'texte', ['sexual', 'TYPO']);

    expect(safe.status).toBe('safe');
    expect(unsafe.status).toBe('unsafe');
    expect(errorSpy).not.toHaveBeenCalled();
    expect(loggedWith(warnSpy, 'TYPO')).toBe(true);
    warnSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('liste bloquée non-tableau → error sans appel API ni itération de la chaîne', async () => {
    const errorSpy = vi.spyOn(logger, 'error').mockImplementation(() => {});
    const { client, moderate } = createClient([response(cats({ sexual: true }))]);

    const result = await moderateContent(client, 'texte', 'sexual' as unknown as string[]);

    expect(result).toEqual({ status: 'error', categories: {} });
    expect(moderate).not.toHaveBeenCalled();
    expect(loggedWith(errorSpy, 'type=string')).toBe(true);
    errorSpy.mockRestore();
  });

  it("propage les exceptions de l'API (les routes les traduisent en codes actionnables)", async () => {
    const moderate = vi.fn().mockRejectedValueOnce(new Error('429 rate limited'));
    const client = { classifiers: { moderate } } as any;

    await expect(moderateContent(client, 'texte', ['sexual'])).rejects.toThrow('429');
  });
});

// Verrou du couplage modèle ↔ taxonomie : échoue au prochain bump de MODERATION_MODEL tant que la
// fixture n'a pas été recapturée et la taxonomie alignée (procédure : helpers/moderation-model.ts).
describe('contrat MODERATION_MODEL ↔ taxonomie', () => {
  it('MODERATION_MODEL est le modèle de la fixture capturée', () => {
    expect(
      MODERATION_MODEL,
      'bump du modèle : recapturer la fixture, aligner la taxonomie, la table legacy et les clés i18n moderation.cat.*',
    ).toBe(FIXTURE_MODEL);
    expect(MODERATION_MODEL).toMatch(/^mistral-moderation-\d{4}$/);
  });

  it('la taxonomie (helper ET ré-export profiles) = les clés de la réponse réelle', () => {
    const fixtureKeys = new Set(Object.keys(NONE_FLAGGED));
    expect(new Set(MODERATION_MODEL_CATEGORIES)).toEqual(fixtureKeys);
    expect(new Set(ALL_MODERATION_CATEGORIES)).toEqual(fixtureKeys);
  });
});
