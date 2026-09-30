/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return -- Codacy lance ESLint sans resolution des types vitest (faux positifs) ; couvert par lint:ci local type-aware */
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';

// Mock Lightpanda : `main()` rend l'overview via le navigateur headless (réseau réel). Le neutraliser
// garde les tests rapides et hors réseau ; les tests de `main` lui font rendre LEGACY_MD (overview
// saine), certains simulent une panne ou une page sans table (dégradation gracieuse).
const { lightpandaFetch } = vi.hoisted(() => ({
  lightpandaFetch: vi.fn(() => Promise.resolve('')),
}));
vi.mock('@lightpanda/browser', () => ({ lightpanda: { fetch: lightpandaFetch } }));

import { MODERATION_MODEL } from '../helpers/moderation-model.js';
import { DEFAULT_OCR_MODEL, OCR_MODELS } from '../helpers/ocr-models.js';
import {
  analyzeModels,
  collectFindings,
  fetchModels,
  findLaggingDefaults,
  findMissing,
  findUntrackedFamilyModels,
  legacyTableProblem,
  main,
  parseLegacyTable,
  resolveGroup,
  WATCHED_MODELS,
} from './check-models.js';

const LEGACY_MD = [
  '| Model | Version | API | DeprecationRetirement | Alternative |',
  '| --- | --- | --- | --- | --- |',
  '| [OCR 2 ↗](https://x) | 25.05 | mistral\\-ocr\\-2505 | 2/27/20265/31/2026 | [OCR 4](https://y) |',
  '| [Mod ↗](https://x) | 24.11 | mistral\\-moderation\\-2411 | 1/15/20266/30/2026 | [Moderation 2](https://y) |',
].join('\n');

// Table « Deprecated & retired models » RÉELLE de l'overview (rendu Lightpanda du 2026-09-25, 49
// lignes dont un séparateur répété et 3 lignes sans id d'API ; URLs des liens abrégées en `u`) :
// 40 modèles, sentinelles de complétude comprises (mistral-ocr-2505, mistral-moderation-2411).
const REAL_LEGACY_MD = [
  '| Model | Version | API | DeprecationRetirement | Alternative |',
  '|---|---|---|---|---|',
  '',
  '| [Leanstral ↗](u) | `26.03` | labs\\-leanstral\\-2603 | 5/22/20266/30/2026 | [Leanstral 1.5](u) |',
  '|---|---|---|---|---|',
  '| [Mistral Medium 3.1 ↗](u) | `25.08` | mistral\\-medium\\-2508 | 5/22/20268/31/2026 | [Mistral Medium 3.5](u) |',
  '| [Mistral Small 3.2 ↗](u) | `25.06` | mistral\\-small\\-2506 | 4/30/20267/31/2026 | [Mistral Small 4](u) |',
  '| [Voxtral Mini Transcribe ↗](u) | `25.07` | voxtral\\-mini\\-2507 | 2/27/20265/31/2026 | [Voxtral Mini Transcribe 2](u) |',
  '| [Devstral 2 ↗](u) | `25.12` | devstral\\-2512 | 5/22/20267/31/2026 | [Mistral Medium 3.5](u) |',
  '| [Magistral Medium 1.1 ↗](u) | `25.07` | magistral\\-medium\\-2507 | 10/31/202511/30/2025 | [Mistral Medium 3.5](u) |',
  '| [Mistral Small Creative ↗](u) | `25.12` | labs\\-mistral\\-small\\-creative | 3/31/20264/30/2026 | [Ministral 3 8B](u) |',
  '| [Devstral Small 2 ↗](u) | `25.12` | labs\\-devstral\\-small\\-2512 | 2/27/20263/31/2026 | [Mistral Medium 3.5](u) |',
  '| [Magistral Medium 1.2 ↗](u) | `25.09` | magistral\\-medium\\-2509 | 5/22/20267/31/2026 | [Mistral Medium 3.5](u) |',
  '| [Magistral Small 1.2 ↗](u) | `25.09` | magistral\\-small\\-2509 | 4/30/20267/31/2026 | [Mistral Small 4](u) |',
  '| [Magistral Small 1.1 ↗](u) | `25.07` | magistral\\-small\\-2507 | 10/31/202511/30/2025 | [Mistral Small 4](u) |',
  '| [Voxtral Mini ↗](u) | `25.07` | voxtral\\-mini\\-2507 | 2/27/20265/31/2026 | [Voxtral Mini Transcribe 2](u) |',
  '| [Devstral Medium 1.0 ↗](u) | `25.07` | devstral\\-medium\\-2507 | 2/27/20265/31/2026 | [Mistral Medium 3.5](u) |',
  '| [Devstral Small 1.1 ↗](u) | `25.07` | devstral\\-small\\-2507 | 2/27/20265/31/2026 | [Mistral Small 4](u) |',
  '| [Magistral Medium 1.0 ↗](u) | `25.06` | magistral\\-medium\\-2506 | 10/31/202511/30/2025 | [Mistral Medium 3.5](u) |',
  '| [Magistral Small 1.0 ↗](u) | `25.06` | magistral\\-small\\-2506 | 10/31/202511/30/2025 | [Mistral Small 4](u) |',
  '| [OCR 2 ↗](u) | `25.05` | mistral\\-ocr\\-2505 | 2/27/20265/31/2026 | [OCR 4.1](u) |',
  '| [Devstral Small 1.0 ↗](u) | `25.05` | devstral\\-small\\-2505 | 10/31/202511/30/2025 | [Mistral Medium 3.5](u) |',
  '| [Mistral Medium 3 ↗](u) | `25.05` | mistral\\-medium\\-2505 | 5/22/20268/31/2026 | [Mistral Medium 3.5](u) |',
  '| [Mistral Small 3.1 ↗](u) | `25.03` | mistral\\-small\\-2503 | 11/6/202511/30/2025 | [Mistral Small 4](u) |',
  '| [OCR ↗](u) | `25.03` | mistral\\-ocr\\-2503 | 12/2/202512/31/2025 | [OCR 4.1](u) |',
  '| [Mistral Saba ↗](u) | `25.02` | mistral\\-saba\\-2502 | 6/10/20259/30/2025 | [Mistral Small 4](u) |',
  '| [Mistral Small 3.0 ↗](u) | `25.01` | mistral\\-small\\-2501 | 11/6/202511/30/2025 | [Mistral Small 4](u) |',
  '| [Codestral ↗](u) | `25.01` | codestral\\-2501 | 11/6/202511/30/2025 | [Codestral](u) |',
  '| [Mistral Large 2.1 ↗](u) | `24.11` | mistral\\-large\\-2411 | 2/27/20265/31/2026 | [Mistral Medium 3.5](u) |',
  '| [Pixtral Large ↗](u) | `24.11` | pixtral\\-large\\-2411 | 2/27/20265/31/2026 | [Mistral Medium 3.5](u) |',
  '| [Mistral Moderation ↗](u) | `24.11` | mistral\\-moderation\\-2411 | 3/31/20266/30/2026 | [Mistral Moderation 2](u) |',
  '| [Ministral 3B ↗](u) | `24.1` | ministral\\-3b\\-2410 | 12/2/202512/31/2025 | [Ministral 3 3B](u) |',
  '| [Ministral 8B ↗](u) | `24.1` | ministral\\-8b\\-2410 | 12/2/202512/31/2025 | [Ministral 3 8B](u) |',
  '| [Mistral Small 2.0 ↗](u) | `24.09` | mistral\\-small\\-2409 | 11/6/202511/30/2025 | [Mistral Small 4](u) |',
  '| [Pixtral 12B ↗](u) | `24.09` | pixtral\\-12b\\-2409 | 12/2/202512/31/2025 | [Ministral 3 14B](u) |',
  '| [Mistral Large 2.0 ↗](u) | `24.07` | mistral\\-large\\-2407 | 11/30/20243/30/2025 | [Mistral Large 3](u) |',
  '| [Mistral Nemo 12B ↗](u) | `24.07` | open\\-mistral\\-nemo\\-2407 | 5/22/20267/31/2026 | [Ministral 3 8B](u) |',
  '| [Codestral Mamba 7B ↗](u) | `0.1` | open\\-codestral\\-mamba | 6/6/20256/6/2025 | [Codestral](u) |',
  '| [Mathstral 7B ↗](u) | `0.1` |  |  | [Mistral Small 4](u) |',
  '| [Codestral ↗](u) | `24.05` | codestral\\-2405 | 12/2/20246/16/2025 | [Codestral](u) |',
  '| [Mistral 7B ↗](u) | `0.3` | open\\-mistral\\-7b | 11/30/20243/30/2025 | [Ministral 3 8B](u) |',
  '| [Mixtral 8x22B ↗](u) | `0.1\\-0.3` | open\\-mixtral\\-8x22b | 11/30/20243/30/2025 | [Mistral Small 4](u) |',
  '| [Mistral Small 1.0 ↗](u) | `24.02` | mistral\\-small\\-2402 | 11/30/20246/16/2025 | [Mistral Small 4](u) |',
  '| [Mistral Large 1.0 ↗](u) | `24.02` | mistral\\-large\\-2402 | 11/30/20246/16/2025 | [Mistral Large 3](u) |',
  '| [Mistral Next ↗](u) | `` |  |  | [Mistral Large 3](u) |',
  '| [Mistral Medium 1.0 ↗](u) | `23.12` | mistral\\-medium\\-2312 | 11/30/20246/16/2025 | [Mistral Medium 3.5](u) |',
  '| [Mixtral 8x7B ↗](u) | `0.1` | open\\-mixtral\\-8x7b | 11/30/20243/30/2025 | [Mistral Small 4](u) |',
  '| [Mistral 7B ↗](u) | `0.2` | open\\-mistral\\-7b | 11/30/20243/30/2025 | [Ministral 3 8B](u) |',
  '| [Mistral 7B ↗](u) | `0.1` |  | 11/30/20243/30/2025 | [Ministral 3 8B](u) |',
].join('\n');
const REAL_LEGACY = parseLegacyTable(REAL_LEGACY_MD);

// Rendus dégradés de la table réelle : tronquée (10 premières lignes), privée de lignes données.
const truncatedLegacyMd = (lines: number): string =>
  REAL_LEGACY_MD.split('\n').slice(0, lines).join('\n');
const legacyMdWithout = (...escapedIds: string[]): string =>
  REAL_LEGACY_MD.split('\n')
    .filter((line) => !escapedIds.some((id) => line.includes(id)))
    .join('\n');

// Forme RÉELLE de /v1/models (mesurée 2026-09-25) : chaque nom d'un modèle est SA PROPRE entrée,
// qui liste ses frères dans `aliases`.
const family = (ids: string[], deprecation: string | null = null) =>
  ids.map((id) => ({ id, aliases: ids.filter((a) => a !== id), deprecation }));

// Même ordre canonique que le script (unités de code) pour écrire les groupes attendus.
const sorted = (ids: readonly string[]) => [...ids].sort((a, b) => (a < b ? -1 : Number(a > b)));

const alertOf = (message: string) => ({ level: 'alert', message });
const infoOf = (message: string) => ({ level: 'info', message });

// Groupe medium RÉEL : `magistral-medium-latest` en DERNIER — l'ancien index « dernier écrit gagne »
// résolvait mistral-medium-latest vers lui et ratait la version datée mistral-medium-2604.
const MEDIUM = [
  'mistral-medium-latest',
  'mistral-medium',
  'mistral-medium-3-5',
  'mistral-medium-3.5',
  'mistral-medium-3',
  'mistral-medium-2604',
  'mistral-vibe-cli-latest',
  'mistral-vibe-cli-with-tools',
  'magistral-medium-latest',
];
const OCR_41 = ['mistral-ocr-latest', 'mistral-ocr-4', 'mistral-ocr-4-1'];

// Instantané COMPLET de GET /v1/models du 2026-09-25 (53 entrées, ordre réel, champs id / aliases /
// deprecation) : `family` reproduit EXACTEMENT chaque entrée à partir de son groupe (vérifié sur la
// capture). À rafraîchir quand une source unique (OCR_MODELS, MODERATION_MODEL) change de version.
const REAL_MODELS = [
  ['codestral-2508', 'codestral-latest', 'mistral-code-latest', 'mistral-code-fim-latest'],
  ['mistral-small-2603', 'mistral-small-latest', 'mistral-vibe-cli-fast', 'magistral-small-latest'],
  ['voxtral-small-2507', 'voxtral-small-latest'],
  ['labs-leanstral-1-5-1', 'labs-leanstral-1-5'],
  ['mistral-large-2512', 'mistral-large-latest'],
  ['ministral-3b-2512', 'ministral-3b-latest'],
  ['ministral-8b-2512', 'ministral-8b-latest'],
  ['ministral-14b-2512', 'ministral-14b-latest'],
  MEDIUM,
  ['glm-5-2', 'zai-glm-5-2'],
  ['zai-glm-5-3', 'zai-glm-5', 'zai-glm-latest'],
  ['mistral-embed-2312', 'mistral-embed'],
  ['codestral-embed', 'codestral-embed-2505'],
  ['mistral-moderation-2603'],
  ['mistral-ocr-2512', 'mistral-ocr-3-0', 'mistral-ocr-3'],
  ['mistral-ocr-4-0'],
  OCR_41,
  ['voxtral-mini-2602', 'voxtral-mini-latest'],
  [
    'voxtral-mini-transcribe-realtime-2602',
    'voxtral-mini-realtime-2602',
    'voxtral-mini-realtime-latest',
  ],
  ['voxtral-mini-tts-2603', 'voxtral-mini-tts-latest'],
].flatMap((ids) => family(ids));

const LAG_40 = alertOf(
  "défaut épinglé mistral-ocr-4-0 en retard sur sa génération : mistral-ocr-4 → mistral-ocr-4-1 — mettre à jour l'épinglage",
);
// Retard assumé réellement livré du 2026-09-26 au retrait d'OCR 4.0 (v1.7.2 à v1.7.5) : donnée de test
// du mécanisme, plus la configuration livrée (le défaut est OCR 4.1 depuis la v1.7.6).
const LAG_41_ACCEPTED = {
  candidate: 'mistral-ocr-4-1',
  since: '2026-09-26',
  reason:
    'OCR 4.1 évalué sur 11 leçons réelles : perd des légendes et consignes proches des figures',
} as const;
const ACCEPTED_40 = infoOf(
  `épinglage volontaire : mistral-ocr-4-0 conservé face à mistral-ocr-4-1 depuis 2026-09-26 (${LAG_41_ACCEPTED.reason}) — réévaluer à la prochaine mineure`,
);
// Défaut OCR 4.0 suivi AVEC le retard assumé (configuration livrée jusqu'en v1.7.5), puis variantes.
const PINNED_40_ACCEPTED = { pinned: 'mistral-ocr-4-0', acceptedLag: LAG_41_ACCEPTED };
const OCR_40_CATALOG = [...family(['mistral-ocr-4-0']), ...family(OCR_41)];
const FAMILY_HINT = 'évaluer (taxonomie, prix) avant de changer MODERATION_MODEL';

describe('parseLegacyTable', () => {
  it('parses the api id, both glued dates (deprecation+retirement) and the alternative', () => {
    const t = parseLegacyTable(LEGACY_MD);
    expect(t.get('mistral-ocr-2505')).toEqual({
      apiId: 'mistral-ocr-2505',
      deprecation: '2/27/2026',
      retirement: '5/31/2026',
      alternative: 'OCR 4',
    });
  });

  it('ignores the header and separator rows (only model-id rows kept)', () => {
    expect([...parseLegacyTable(LEGACY_MD).keys()]).toEqual([
      'mistral-ocr-2505',
      'mistral-moderation-2411',
    ]);
  });

  it('returns an empty map on markdown without a legacy table', () => {
    expect(parseLegacyTable('# Overview\nno table here\njust prose').size).toBe(0);
  });

  it('drops a non-link / dash alternative cell (no "remplacer par -")', () => {
    const md =
      '| M | V | API | DeprecationRetirement | Alternative |\n| [X](u) | 1 | foo\\-bar\\-2401 | 1/1/20262/2/2026 | - |';
    expect(parseLegacyTable(md).get('foo-bar-2401')?.alternative).toBeUndefined();
  });

  it('parses the REAL overview table (2026-09-25): 40 models, rows without api id skipped', () => {
    expect(REAL_LEGACY.size).toBe(40);
    expect(REAL_LEGACY.get('mistral-moderation-2411')).toEqual({
      apiId: 'mistral-moderation-2411',
      deprecation: '3/31/2026',
      retirement: '6/30/2026',
      alternative: 'Mistral Moderation 2',
    });
    expect(REAL_LEGACY.get('mistral-ocr-2505')?.alternative).toBe('OCR 4.1');
  });
});

// Rendu TRONQUÉ de l'overview (Lightpanda) : sans contrôle de complétude, une table partielle
// passait pour complète et les retraits absents étaient déclarés « OK ».
describe('legacyTableProblem (complétude de la table Legacy)', () => {
  it('real table (40 models, both sentinels) → complete', () => {
    expect(legacyTableProblem(REAL_LEGACY)).toBeNull();
  });

  it('table truncated to 10 lines → partial (6 models < 20)', () => {
    expect(legacyTableProblem(parseLegacyTable(truncatedLegacyMd(10)))).toBe(
      'table Legacy partielle : 6 modèles lus, au moins 20 attendus',
    );
  });

  it('below the threshold even with both sentinels → partial', () => {
    expect(legacyTableProblem(parseLegacyTable(LEGACY_MD))).toBe(
      'table Legacy partielle : 2 modèles lus, au moins 20 attendus',
    );
  });

  it('truncated after the threshold (30 lines, 25 models) → the missing sentinel gives it away', () => {
    expect(legacyTableProblem(parseLegacyTable(truncatedLegacyMd(30)))).toBe(
      'table Legacy partielle : sentinelle(s) absente(s) mistral-moderation-2411',
    );
  });

  it('a sentinel row missing from an otherwise full table → partial', () => {
    const table = parseLegacyTable(legacyMdWithout('mistral\\-ocr\\-2505'));
    expect(table.size).toBe(39);
    expect(legacyTableProblem(table)).toBe(
      'table Legacy partielle : sentinelle(s) absente(s) mistral-ocr-2505',
    );
    const neither = legacyMdWithout('mistral\\-ocr\\-2505', 'mistral\\-moderation\\-2411');
    expect(legacyTableProblem(parseLegacyTable(neither))).toBe(
      'table Legacy partielle : sentinelle(s) absente(s) mistral-ocr-2505, mistral-moderation-2411',
    );
  });

  it('empty table → not found (unchanged message)', () => {
    expect(legacyTableProblem(new Map())).toBe('table Legacy introuvable (0 ligne)');
  });
});

describe('resolveGroup', () => {
  it('resolves the same group whatever the list order (own entry, siblings included)', () => {
    for (const list of [REAL_MODELS, [...REAL_MODELS].reverse()]) {
      expect(resolveGroup(list, 'mistral-medium-latest')).toEqual({
        kind: 'found',
        ids: sorted(MEDIUM),
      });
    }
  });

  it('falls back to the entries listing the name as alias (old API form)', () => {
    expect(
      resolveGroup(
        [{ id: 'mistral-moderation-2411', aliases: ['mistral-moderation-latest'] }],
        'mistral-moderation-latest',
      ),
    ).toEqual({ kind: 'found', ids: ['mistral-moderation-2411', 'mistral-moderation-latest'] });
  });

  it('accepts several alias entries when they form one and the same group', () => {
    const models = [
      { id: 'mistral-ocr-4', aliases: ['mistral-ocr-latest', 'mistral-ocr-4-1'] },
      { id: 'mistral-ocr-4-1', aliases: ['mistral-ocr-4', 'mistral-ocr-latest'] },
    ];
    for (const list of [models, [...models].reverse()]) {
      expect(resolveGroup(list, 'mistral-ocr-latest')).toEqual({
        kind: 'found',
        ids: sorted(OCR_41),
      });
    }
  });

  it('reports an ambiguous alias listed by distinct groups (never « first entry wins »)', () => {
    const models = [
      { id: 'mistral-ocr-4-0', aliases: ['mistral-ocr-latest'] },
      { id: 'mistral-ocr-4-1', aliases: ['mistral-ocr-latest'] },
    ];
    for (const list of [models, [...models].reverse()]) {
      expect(resolveGroup(list, 'mistral-ocr-latest')).toEqual({
        kind: 'ambiguous',
        groups: [
          ['mistral-ocr-4-0', 'mistral-ocr-latest'],
          ['mistral-ocr-4-1', 'mistral-ocr-latest'],
        ],
      });
    }
  });

  it('returns missing for an unknown name', () => {
    expect(resolveGroup(REAL_MODELS, 'mistral-moderation-latest')).toEqual({ kind: 'missing' });
  });
});

describe('analyzeModels', () => {
  it('flags an alias resolving to a deprecated dated version (piège 2026-06, API seule)', () => {
    const models = [
      {
        id: 'mistral-moderation-2411',
        aliases: ['mistral-moderation-latest'],
        deprecation: '2026-06-30T12:00:00Z',
      },
    ];
    expect(analyzeModels(models, new Map(), ['mistral-moderation-latest'])).toEqual([
      alertOf(
        'mistral-moderation-latest → mistral-moderation-2411 en fin de vie · déprécié 2026-06-30T12:00:00Z',
      ),
    ]);
  });

  it('enriches a deprecated alias with the retirement date + alternative from the legacy table', () => {
    const models = [
      { id: 'mistral-ocr-2505', aliases: ['mistral-ocr-latest'], deprecation: '2026-02-27' },
    ];
    expect(analyzeModels(models, parseLegacyTable(LEGACY_MD), ['mistral-ocr-latest'])).toEqual([
      alertOf(
        'mistral-ocr-latest → mistral-ocr-2505 en fin de vie · déprécié 2026-02-27 · retiré 5/31/2026 · → remplacer par OCR 4',
      ),
    ]);
  });

  it('catches an alias the API marks current (deprecation:null) but the legacy table lists', () => {
    const models = [{ id: 'mistral-ocr-2505', aliases: ['mistral-ocr-latest'], deprecation: null }];
    expect(analyzeModels(models, parseLegacyTable(LEGACY_MD), ['mistral-ocr-latest'])).toEqual([
      alertOf(
        'mistral-ocr-latest → mistral-ocr-2505 en fin de vie · déprécié 2/27/2026 · retiré 5/31/2026 · → remplacer par OCR 4',
      ),
    ]);
  });

  it('flags a group whose dated SIBLING is listed Legacy, whatever the list order', () => {
    const legacy = parseLegacyTable(
      '| M | V | API | DeprecationRetirement | Alternative |\n| [Medium 3.5 ↗](u) | 26.04 | mistral\\-medium\\-2604 | 9/1/202612/31/2026 | [Mistral Medium 4](u) |',
    );
    for (const list of [family(MEDIUM), family(MEDIUM).reverse()]) {
      expect(analyzeModels(list, legacy, ['mistral-medium-latest'])).toEqual([
        alertOf(
          'mistral-medium-latest → mistral-medium-2604 en fin de vie · déprécié 9/1/2026 · retiré 12/31/2026 · → remplacer par Mistral Medium 4',
        ),
      ]);
    }
  });

  it('flags a group deprecated on the API side, showing the dated id (not magistral)', () => {
    expect(
      analyzeModels(family(MEDIUM, '2026-12-31'), new Map(), ['mistral-medium-latest']),
    ).toEqual([
      alertOf('mistral-medium-latest → mistral-medium-2604 en fin de vie · déprécié 2026-12-31'),
    ]);
  });

  it('flags a deprecated PINNED version without an « X → X » arrow', () => {
    expect(
      analyzeModels(family([MODERATION_MODEL], '2027-01-01'), new Map(), [MODERATION_MODEL]),
    ).toEqual([alertOf(`${MODERATION_MODEL} en fin de vie · déprécié 2027-01-01`)]);
  });

  it('flags a pinned version listed Legacy while the API still says deprecation:null', () => {
    const legacy = parseLegacyTable(
      '| M | V | API | DeprecationRetirement | Alternative |\n| [Foo ↗](u) | 24.01 | foo\\-bar\\-2401 | 1/1/20262/2/2026 | [Foo 2](u) |',
    );
    expect(analyzeModels(family(['foo-bar-2401']), legacy, ['foo-bar-2401'])).toEqual([
      alertOf(
        'foo-bar-2401 en fin de vie · déprécié 1/1/2026 · retiré 2/2/2026 · → remplacer par Foo 2',
      ),
    ]);
  });

  it('never matches Legacy ids that only share a prefix (mistral-ocr-2505 ≠ OCR 4.1 group)', () => {
    expect(
      analyzeModels(OCR_40_CATALOG, REAL_LEGACY, ['mistral-ocr-4-0', 'mistral-ocr-latest']),
    ).toEqual([]);
  });

  it('flags an ambiguous alias with the same message whatever the list order', () => {
    const models = [
      { id: 'mistral-ocr-4-0', aliases: ['mistral-ocr-latest'] },
      { id: 'mistral-ocr-4-1', aliases: ['mistral-ocr-latest'] },
    ];
    for (const list of [models, [...models].reverse()]) {
      expect(analyzeModels(list, new Map(), ['mistral-ocr-latest'])).toEqual([
        alertOf(
          'mistral-ocr-latest : alias ambigu, listé par 2 groupes distincts (mistral-ocr-4-0, mistral-ocr-4-1) — vérifier GET /v1/models/mistral-ocr-latest',
        ),
      ]);
    }
  });

  it('is silent on the real snapshot with the real legacy table', () => {
    expect(analyzeModels(REAL_MODELS, REAL_LEGACY)).toEqual([]);
  });

  it('tolerates a missing aliases/deprecation shape (no false diagnostic)', () => {
    expect(analyzeModels([{ id: 'x' }])).toEqual([]);
    expect(analyzeModels([])).toEqual([]);
  });

  it('ignores deprecated models that are NOT watched', () => {
    const models = [
      { id: 'some-old-model-2402', aliases: ['some-old-latest'], deprecation: '2025-01-01' },
    ];
    expect(analyzeModels(models)).toEqual([]);
  });
});

describe('findMissing', () => {
  it('flags a watched name absent from /v1/models (piège 2026-09)', () => {
    expect(
      findMissing(REAL_MODELS, ['mistral-medium-latest', 'mistral-moderation-latest']),
    ).toEqual([
      alertOf(
        'mistral-moderation-latest absent de /v1/models : retiré ou renommé ? (GET /v1/models/mistral-moderation-latest → « is deprecated » ou « was not found »)',
      ),
    ]);
  });

  it('finds a pinned id listed only as a sibling alias', () => {
    expect(
      findMissing(
        [{ id: 'mistral-ocr-latest', aliases: ['mistral-ocr-4-1'] }],
        ['mistral-ocr-4-1'],
      ),
    ).toEqual([]);
  });

  it('returns [] on an empty list (silent API ≠ retired model)', () => {
    expect(findMissing([], ['mistral-moderation-latest'])).toEqual([]);
  });

  it('finds every shipped watched model in the real snapshot', () => {
    expect(findMissing(REAL_MODELS)).toEqual([]);
  });
});

describe('findLaggingDefaults', () => {
  it('alerts once when the pinned 4-0 lags its generation (no duplicate from -latest)', () => {
    expect(findLaggingDefaults(OCR_40_CATALOG, new Map(), [{ pinned: 'mistral-ocr-4-0' }])).toEqual(
      [LAG_40],
    );
  });

  it('turns the lag into ONE informative line when the candidate is the accepted one', () => {
    expect(findLaggingDefaults(OCR_40_CATALOG, new Map(), [PINNED_40_ACCEPTED])).toEqual([
      ACCEPTED_40,
    ]);
  });

  it('alerts normally when another candidate appears (acceptance bound to 4-1 only)', () => {
    const models = [
      ...family(['mistral-ocr-4-0']),
      ...family(['mistral-ocr-latest', 'mistral-ocr-4', 'mistral-ocr-4-2']),
    ];
    expect(findLaggingDefaults(models, new Map(), [PINNED_40_ACCEPTED])).toEqual([
      alertOf(
        "défaut épinglé mistral-ocr-4-0 en retard sur sa génération : mistral-ocr-4 → mistral-ocr-4-2 — mettre à jour l'épinglage",
      ),
    ]);
  });

  it('is silent for the latest minor (4-1)', () => {
    expect(findLaggingDefaults(family(OCR_41), new Map(), [{ pinned: 'mistral-ocr-4-1' }])).toEqual(
      [],
    );
  });

  it('is silent when the generation alias and -latest are both absent', () => {
    expect(
      findLaggingDefaults(family(['mistral-ocr-4-0']), new Map(), [{ pinned: 'mistral-ocr-4-0' }]),
    ).toEqual([]);
  });

  it('never proposes a deprecated or Legacy candidate', () => {
    const tracked = [{ pinned: 'mistral-ocr-4-0' }];
    const deprecated = [
      ...family(['mistral-ocr-4-0']),
      ...family(['mistral-ocr-4', 'mistral-ocr-4-1'], '2027-01-01'),
    ];
    expect(findLaggingDefaults(deprecated, new Map(), tracked)).toEqual([]);
    const legacy = parseLegacyTable(
      '| M | V | API | DeprecationRetirement | Alternative |\n| [OCR 4.1 ↗](u) | 4.1 | mistral\\-ocr\\-4\\-1 | 1/1/20272/2/2027 | [OCR 5](u) |',
    );
    const listed = [
      ...family(['mistral-ocr-4-0']),
      ...family(['mistral-ocr-4', 'mistral-ocr-4-1']),
    ];
    expect(findLaggingDefaults(listed, legacy, tracked)).toEqual([]);
  });

  it('compares minors numerically (4-10 is newer than 4-9)', () => {
    const models = [
      ...family(['mistral-ocr-4-9']),
      ...family(['mistral-ocr-4', 'mistral-ocr-4-10']),
    ];
    expect(findLaggingDefaults(models, new Map(), [{ pinned: 'mistral-ocr-4-9' }])).toEqual([
      alertOf(
        "défaut épinglé mistral-ocr-4-9 en retard sur sa génération : mistral-ocr-4 → mistral-ocr-4-10 — mettre à jour l'épinglage",
      ),
    ]);
  });

  it('reports a new generation (informative) when -latest moved on and the generation is quiet', () => {
    const models = [
      ...family(['mistral-ocr-4', 'mistral-ocr-4-1']),
      ...family(['mistral-ocr-latest', 'mistral-ocr-5', 'mistral-ocr-5-0']),
    ];
    expect(findLaggingDefaults(models, new Map(), [{ pinned: 'mistral-ocr-4-1' }])).toEqual([
      infoOf(
        "nouvelle génération disponible : mistral-ocr-latest → mistral-ocr-5-0 (défaut épinglé mistral-ocr-4-1) — évaluer prix/compat avant de changer l'épinglage",
      ),
    ]);
  });

  it('keeps at most one line per default: the generation rule pre-empts -latest', () => {
    const models = [
      ...family(['mistral-ocr-4-0']),
      ...family(['mistral-ocr-4', 'mistral-ocr-4-1']),
      ...family(['mistral-ocr-latest', 'mistral-ocr-5', 'mistral-ocr-5-0']),
    ];
    expect(findLaggingDefaults(models, new Map(), [{ pinned: 'mistral-ocr-4-0' }])).toEqual([
      LAG_40,
    ]);
  });

  it('reports an ambiguous generation alias instead of picking a group', () => {
    const models = [
      ...family(['mistral-ocr-4-0']),
      { id: 'mistral-ocr-4-1', aliases: ['mistral-ocr-4'] },
      { id: 'mistral-ocr-4-2', aliases: ['mistral-ocr-4'] },
      ...family(['mistral-ocr-latest', 'mistral-ocr-5-0']),
    ];
    expect(findLaggingDefaults(models, new Map(), [{ pinned: 'mistral-ocr-4-0' }])).toEqual([
      alertOf(
        'mistral-ocr-4 : alias ambigu, listé par 2 groupes distincts (mistral-ocr-4-1, mistral-ocr-4-2) — vérifier GET /v1/models/mistral-ocr-4',
      ),
    ]);
  });

  it('ignores a pinned id that is not major-minor (dated OCR 3)', () => {
    const models = [
      ...family(['mistral-ocr-2512', 'mistral-ocr-3']),
      ...family(['mistral-ocr-2605', 'mistral-ocr-latest']),
    ];
    expect(findLaggingDefaults(models, new Map(), [{ pinned: 'mistral-ocr-2512' }])).toEqual([]);
  });

  it('tracks DEFAULT_OCR_MODEL by default: any candidate other than the accepted one alerts', () => {
    const generation = DEFAULT_OCR_MODEL.slice(0, DEFAULT_OCR_MODEL.lastIndexOf('-'));
    const models = [...family([DEFAULT_OCR_MODEL]), ...family([generation, `${generation}-99`])];
    expect(findLaggingDefaults(models)).toEqual([
      alertOf(
        `défaut épinglé ${DEFAULT_OCR_MODEL} en retard sur sa génération : ${generation} → ${generation}-99 — mettre à jour l'épinglage`,
      ),
    ]);
  });
});

describe('findUntrackedFamilyModels (veille de famille modération)', () => {
  it('reports a model outside the pinned group even with a new naming scheme (3-0)', () => {
    const models = [...family([MODERATION_MODEL]), ...family(['mistral-moderation-3-0'])];
    expect(findUntrackedFamilyModels(models)).toEqual([
      infoOf(
        `modèle non suivi dans la famille mistral-moderation : mistral-moderation-3-0 — ${FAMILY_HINT}`,
      ),
    ]);
  });

  it('ignores a -latest alias that is a sibling of the pinned model', () => {
    expect(
      findUntrackedFamilyModels(family([MODERATION_MODEL, 'mistral-moderation-latest'])),
    ).toEqual([]);
  });

  it('reports ONE line per group when -latest points to another model (2611)', () => {
    const models = [
      ...family([MODERATION_MODEL]),
      ...family(['mistral-moderation-2611', 'mistral-moderation-latest']),
    ];
    expect(findUntrackedFamilyModels(models)).toEqual([
      infoOf(
        `modèle non suivi dans la famille mistral-moderation : mistral-moderation-2611 — ${FAMILY_HINT}`,
      ),
    ]);
  });

  it('ignores a family model listed Legacy or deprecated on the API side (2411)', () => {
    const listed = [...family([MODERATION_MODEL]), ...family(['mistral-moderation-2411'])];
    expect(findUntrackedFamilyModels(listed, REAL_LEGACY)).toEqual([]);
    const deprecated = [
      ...family([MODERATION_MODEL]),
      ...family(['mistral-moderation-2411'], '2026-06-30'),
    ];
    expect(findUntrackedFamilyModels(deprecated)).toEqual([]);
  });

  it('is silent on the real snapshot', () => {
    expect(findUntrackedFamilyModels(REAL_MODELS, REAL_LEGACY)).toEqual([]);
  });
});

describe('OCR 3 (mistral-ocr-2512) exclu des règles de retard et de famille', () => {
  it('a newer mistral-ocr-2605 in the catalogue raises nothing about OCR 3', () => {
    const catalog = [...REAL_MODELS, ...family(['mistral-ocr-2605'])];
    expect(collectFindings(catalog, REAL_LEGACY)).toEqual([]);
  });
});

describe('acceptance on the real /v1/models snapshot (2026-09-25)', () => {
  it('fixture: 53 entries, every watched model present', () => {
    expect(REAL_MODELS).toHaveLength(53);
    expect(findMissing(REAL_MODELS)).toEqual([]);
  });

  it('default 4-0 + accepted lag → exactly the informative line', () => {
    expect(collectFindings(REAL_MODELS, REAL_LEGACY, [PINNED_40_ACCEPTED])).toEqual([ACCEPTED_40]);
  });

  it('default 4-0 without acceptance → exactly the actionable alert', () => {
    expect(collectFindings(REAL_MODELS, REAL_LEGACY, [{ pinned: 'mistral-ocr-4-0' }])).toEqual([
      LAG_40,
    ]);
  });

  it('default 4-1 → nothing', () => {
    expect(collectFindings(REAL_MODELS, REAL_LEGACY, [{ pinned: 'mistral-ocr-4-1' }])).toEqual([]);
  });

  it('shipped sources (2026-09-30: default OCR 4.1, no accepted lag) → nothing, any order', () => {
    // Change de valeur attendue si DEFAULT_OCR_MODEL ou les retards assumés de TRACKED_DEFAULTS
    // changent : voulu.
    expect(DEFAULT_OCR_MODEL).toBe('mistral-ocr-4-1');
    for (const list of [REAL_MODELS, [...REAL_MODELS].reverse()]) {
      expect(collectFindings(list, REAL_LEGACY)).toEqual([]);
    }
  });

  it('real Legacy row of 2026-09-30 (OCR 4.0 retired the day after its deprecation) → alert', () => {
    // Ligne réelle de docs.mistral.ai/models/overview, rendue par Lightpanda le 2026-09-30, alors que
    // /v1/models renvoyait encore `deprecation: null` pour mistral-ocr-4-0.
    const row =
      '| [OCR 4.0 ↗](https://docs.mistral.ai/models/ocr-4-0) | `4.0` | mistral\\-ocr\\-4\\-0 | 9/29/20269/30/2026 | [OCR 4.1](https://docs.mistral.ai/models/ocr-4-1) |';
    const legacy = parseLegacyTable(`${REAL_LEGACY_MD}\n${row}`);
    expect(legacy.get('mistral-ocr-4-0')).toEqual({
      apiId: 'mistral-ocr-4-0',
      deprecation: '9/29/2026',
      retirement: '9/30/2026',
      alternative: 'OCR 4.1',
    });
    // Surveillé tant qu'il figurait dans OCR_MODELS (jusqu'en v1.7.5) ; l'API le disait courant.
    expect(analyzeModels(REAL_MODELS, legacy, ['mistral-ocr-4-0'])).toEqual([
      alertOf(
        'mistral-ocr-4-0 en fin de vie · déprécié 9/29/2026 · retiré 9/30/2026 · → remplacer par OCR 4.1',
      ),
    ]);
    // Retiré d'OCR_MODELS depuis : plus surveillé, plus d'alerte.
    expect(WATCHED_MODELS).not.toContain('mistral-ocr-4-0');
    expect(collectFindings(REAL_MODELS, legacy)).toEqual([]);
  });
});

describe('WATCHED_MODELS (sources uniques)', () => {
  it('is the 5 resolved -latest aliases + OCR_MODELS + MODERATION_MODEL', () => {
    expect(WATCHED_MODELS).toEqual([
      'mistral-large-latest',
      'mistral-medium-latest',
      'mistral-small-latest',
      'voxtral-mini-latest',
      'voxtral-mini-tts-latest',
      ...OCR_MODELS,
      MODERATION_MODEL,
    ]);
  });

  it('no longer watches the moving aliases the app does not send', () => {
    expect(WATCHED_MODELS).not.toContain('mistral-moderation-latest');
    expect(WATCHED_MODELS).not.toContain('mistral-ocr-latest');
  });
});

const okFetch = (data: unknown) =>
  vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(data) });

// Chaque modèle surveillé présent et courant (alias de génération / -latest absents → pas de retard).
const watchedData = (deprecated?: string) =>
  WATCHED_MODELS.map((id) => ({
    id,
    aliases: [],
    deprecation: id === deprecated ? '2027-01-01' : null,
  }));

describe('fetchModels', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('returns the .data array on a 200 response', async () => {
    vi.stubGlobal('fetch', okFetch({ data: [{ id: 'm' }] }));
    expect(await fetchModels('k')).toEqual([{ id: 'm' }]);
  });

  it('returns [] when .data is absent', async () => {
    vi.stubGlobal('fetch', okFetch({}));
    expect(await fetchModels('k')).toEqual([]);
  });

  it('throws on a non-ok HTTP status', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    await expect(fetchModels('k')).rejects.toThrow('HTTP 503');
  });
});

describe('main (orchestration, non bloquant)', () => {
  const origKey = process.env.MISTRAL_API_KEY;
  // Overview saine par défaut : la table Legacy réelle complète (aucun modèle surveillé listé).
  beforeEach(() => {
    lightpandaFetch.mockResolvedValue(REAL_LEGACY_MD);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    if (origKey === undefined) delete process.env.MISTRAL_API_KEY;
    else process.env.MISTRAL_API_KEY = origKey;
  });

  const run = async (data: unknown) => {
    process.env.MISTRAL_API_KEY = 'test-key';
    vi.stubGlobal('fetch', okFetch(data));
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    await main();
    return log.mock.calls.map((c) => String(c[0]));
  };

  it('skips (logs) when MISTRAL_API_KEY is absent', async () => {
    delete process.env.MISTRAL_API_KEY;
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    await main();
    expect(log).toHaveBeenCalledWith(expect.stringContaining('absent'));
  });

  it('reports OK when every watched model is present and current', async () => {
    const lines = await run({ data: watchedData() });
    expect(lines).toEqual([
      `check-models: ${WATCHED_MODELS.length} modèles surveillés OK (aucun absent, ambigu, déprécié, retiré ni en retard non assumé).`,
    ]);
  });

  it('warns with the exact line and the next steps when a pinned version is deprecated', async () => {
    const lines = await run({ data: watchedData(MODERATION_MODEL) });
    expect(lines[0]).toContain('modèles à vérifier');
    expect(lines).toContain(`  - ${MODERATION_MODEL} en fin de vie · déprécié 2027-01-01`);
    expect(lines.at(-1)).toContain('mettre à jour la version épinglée');
  });

  it('never says OK on an empty model list (silent API)', async () => {
    const lines = await run({ data: [] });
    expect(lines).toEqual([
      'check-models: /v1/models renvoie une liste vide — skip (non bloquant).',
    ]);
  });

  it('on the real snapshot: OK and nothing else (default OCR 4.1, no accepted lag)', async () => {
    const lines = await run({ data: REAL_MODELS });
    expect(lines).toEqual([
      `check-models: ${WATCHED_MODELS.length} modèles surveillés OK (aucun absent, ambigu, déprécié, retiré ni en retard non assumé).`,
    ]);
  });

  // Sans table Legacy complète : OK limité à l'API, retraits explicitement non vérifiés.
  const DEGRADED_OK = `check-models: ${WATCHED_MODELS.length} modèles surveillés OK côté API (aucun absent, ambigu, déprécié ni en retard non assumé) — retraits NON vérifiés (table Legacy indisponible ou partielle).`;

  it('degrades to the API-only diagnosis when the overview cannot be rendered', async () => {
    lightpandaFetch.mockRejectedValueOnce(new Error('lightpanda down'));
    const lines = await run({ data: watchedData() });
    expect(lines).toEqual([
      'check-models: overview indisponible (lightpanda down) — diagnostic API seul.',
      DEGRADED_OK,
    ]);
  });

  it('signals a degraded diagnosis when the overview renders without a Legacy table', async () => {
    // Page déplacée ou format changé : jamais « rien de retiré » en silence.
    lightpandaFetch.mockResolvedValueOnce('# Overview\nno table here');
    const lines = await run({ data: watchedData() });
    expect(lines).toEqual([
      'check-models: overview indisponible (table Legacy introuvable (0 ligne)) — diagnostic API seul.',
      DEGRADED_OK,
    ]);
    // « aucun retiré » n'est pas vérifiable sans la table : jamais affirmé.
    expect(DEGRADED_OK).not.toContain('retiré ni');
  });

  it('degrades (never a false OK) when the overview renders a table truncated to 10 lines', async () => {
    lightpandaFetch.mockResolvedValueOnce(truncatedLegacyMd(10));
    const lines = await run({ data: watchedData() });
    expect(lines).toEqual([
      'check-models: overview indisponible (table Legacy partielle : 6 modèles lus, au moins 20 attendus) — diagnostic API seul.',
      DEGRADED_OK,
    ]);
  });

  it('degrades when a sentinel row is missing from the Legacy table', async () => {
    lightpandaFetch.mockResolvedValueOnce(legacyMdWithout('mistral\\-moderation\\-2411'));
    const lines = await run({ data: watchedData() });
    expect(lines).toEqual([
      'check-models: overview indisponible (table Legacy partielle : sentinelle(s) absente(s) mistral-moderation-2411) — diagnostic API seul.',
      DEGRADED_OK,
    ]);
  });

  it('never throws when the API call fails (exit 0 spirit)', async () => {
    process.env.MISTRAL_API_KEY = 'test-key';
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    await expect(main()).resolves.toBeUndefined();
    expect(log).toHaveBeenCalledWith(expect.stringContaining('impossible'));
  });
});
