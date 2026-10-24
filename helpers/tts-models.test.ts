/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect } from 'vitest';
import {
  TTS_MODELS,
  TTS_MODEL_LABELS,
  TTS_PREVIEW_MODELS,
  DEFAULT_TTS_MODEL,
  isTtsModel,
  normalizeTtsModel,
  voiceSupportsTtsModel,
  voicesForTtsModel,
} from './tts-models.js';

const SPEECH_V1 = 'voxtral-mini-tts-2603';
const TTS_3 = 'voxtral-mini-tts-3-0';

// Catalogue RÉEL de GET /v1/audio/voices du 2026-10-21 (68 voix) : [slug, voix personnelle (userId
// non nul), `kind` brut de l'API]. Le prédicat lit `kind` depuis le SDK 3 ; le même catalogue sans
// `kind` juge le repli slug/custom, qui doit rendre le même verdict voix par voix.
const REAL_CATALOG_2026_10_21: ReadonlyArray<readonly [string | null, boolean, 'ivc' | 'pvc']> = [
  ['voice_3150', false, 'pvc'],
  ['voice_478', false, 'pvc'],
  ['voice_447', false, 'pvc'],
  ['voice_485', false, 'pvc'],
  ['en_paul_sad', false, 'ivc'],
  ['en_paul_neutral', false, 'ivc'],
  ['en_paul_happy', false, 'ivc'],
  ['en_paul_frustrated', false, 'ivc'],
  ['en_paul_excited', false, 'ivc'],
  ['en_paul_confident', false, 'ivc'],
  ['en_paul_cheerful', false, 'ivc'],
  ['en_paul_angry', false, 'ivc'],
  ['voice_3149', false, 'pvc'],
  ['voice_3147', false, 'pvc'],
  ['voice_591', false, 'pvc'],
  ['voice_590', false, 'pvc'],
  ['voice_1788', false, 'pvc'],
  ['voice_1787', false, 'pvc'],
  ['voice_1786', false, 'pvc'],
  ['gb_oliver_neutral', false, 'ivc'],
  ['gb_jane_sarcasm', false, 'ivc'],
  ['gb_jane_confused', false, 'ivc'],
  ['gb_oliver_sad', false, 'ivc'],
  ['gb_oliver_excited', false, 'ivc'],
  ['gb_oliver_curious', false, 'ivc'],
  ['gb_oliver_confident', false, 'ivc'],
  ['gb_oliver_cheerful', false, 'ivc'],
  ['gb_oliver_angry', false, 'ivc'],
  ['gb_jane_shameful', false, 'ivc'],
  ['gb_jane_sad', false, 'ivc'],
  ['gb_jane_neutral', false, 'ivc'],
  ['gb_jane_jealousy', false, 'ivc'],
  ['gb_jane_frustrated', false, 'ivc'],
  ['gb_jane_curious', false, 'ivc'],
  ['gb_jane_confident', false, 'ivc'],
  ['voice_479', false, 'pvc'],
  ['voice_3143', false, 'pvc'],
  ['voice_481', false, 'pvc'],
  ['voice_483', false, 'pvc'],
  ['voice_592', false, 'pvc'],
  ['voice_3137', false, 'pvc'],
  ['voice_589', false, 'pvc'],
  ['voice_3141', false, 'pvc'],
  ['fr_marie_sad', false, 'ivc'],
  ['fr_marie_neutral', false, 'ivc'],
  ['fr_marie_happy', false, 'ivc'],
  ['fr_marie_excited', false, 'ivc'],
  ['fr_marie_curious', false, 'ivc'],
  ['fr_marie_angry', false, 'ivc'],
  ['voice_3153', false, 'pvc'],
  ['voice_3139', false, 'pvc'],
  ['voice_3146', false, 'pvc'],
  ['voice_482', false, 'pvc'],
  ['voice_3133', false, 'pvc'],
  ['voice_3136', false, 'pvc'],
  ['voice_3135', false, 'pvc'],
  ['voice_3145', false, 'pvc'],
  ['voice_3134', false, 'pvc'],
  ['voice_3154', false, 'pvc'],
  ['voice_480', false, 'pvc'],
  ['voice_3155', false, 'pvc'],
  ['voice_3132', false, 'pvc'],
  ['voice_3138', false, 'pvc'],
  ['voice_3140', false, 'pvc'],
  ['voice_3144', false, 'pvc'],
  ['voice_3142', false, 'pvc'],
  [null, true, 'ivc'],
  [null, true, 'ivc'],
];

const catalogVoices = REAL_CATALOG_2026_10_21.map(([slug, custom, kind]) => ({
  slug: slug ?? undefined,
  custom,
  kind,
}));

describe('tts-models', () => {
  it("DEFAULT_TTS_MODEL est Voxtral TTS épinglé (2603), ce que servait l'alias", () => {
    expect(DEFAULT_TTS_MODEL).toBe(SPEECH_V1);
  });

  it('TTS_MODELS liste le défaut en tête, puis TTS 3', () => {
    expect(TTS_MODELS).toEqual([SPEECH_V1, TTS_3]);
    expect(TTS_MODELS[0]).toBe(DEFAULT_TTS_MODEL);
  });

  it('TTS_MODEL_LABELS mappe chaque id vers son nom produit', () => {
    expect(TTS_MODEL_LABELS).toEqual({ [SPEECH_V1]: 'Voxtral TTS', [TTS_3]: 'Voxtral TTS 3' });
  });

  it('préversion : TTS 3 (Public Preview), jamais le défaut', () => {
    expect([...TTS_PREVIEW_MODELS]).toEqual([TTS_3]);
    expect(TTS_PREVIEW_MODELS.has(DEFAULT_TTS_MODEL)).toBe(false);
  });

  describe('isTtsModel / normalizeTtsModel', () => {
    it.each(TTS_MODELS)('garde le modèle épinglé %s', (model) => {
      expect(isTtsModel(model)).toBe(true);
      expect(normalizeTtsModel(model)).toBe(model);
    });

    // L'alias défaut jusqu'en v1.7.11 (appelé à pointer sur Voxtral 3), les ids ElevenLabs retirés,
    // un id STT, une valeur inconnue ou absente : jamais envoyés tels quels.
    it('ramène alias, legacy, inconnu, nul ou non-string sur le défaut épinglé', () => {
      const rejected = [
        'voxtral-mini-tts-latest',
        'eleven_v3',
        'eleven_multilingual_v2',
        'voxtral-mini-2602',
        'voxtral-custom',
        '',
        undefined,
        null,
        42,
      ];
      for (const value of rejected) {
        expect(isTtsModel(value), String(value)).toBe(false);
        expect(normalizeTtsModel(value), String(value)).toBe(SPEECH_V1);
      }
    });
  });

  describe('voiceSupportsTtsModel : catalogue réel du 2026-10-21', () => {
    // Un instantané tronqué ou altéré passerait en silence : on verrouille sa composition.
    it('instantané complet : 68 voix, 32 ivc dont 2 personnelles, 36 pvc', () => {
      const ivc = catalogVoices.filter((v) => v.kind === 'ivc');
      expect(catalogVoices).toHaveLength(68);
      expect(ivc).toHaveLength(32);
      expect(ivc.filter((v) => v.custom)).toHaveLength(2);
      expect(catalogVoices.filter((v) => v.kind === 'pvc')).toHaveLength(36);
    });

    // Test d'acceptation : 2603 refuse les voix pvc en HTTP 400 (code 3051, « voice is not
    // supported for speech v1 ») ; le prédicat doit reconnaître CHAQUE voix ivc, et seulement elles.
    it('Voxtral TTS (speech v1) accepte exactement les voix ivc, voix par voix', () => {
      for (const { slug, custom, kind } of catalogVoices) {
        expect(voiceSupportsTtsModel({ slug, custom, kind }, SPEECH_V1), `${slug} (${kind})`).toBe(
          kind === 'ivc',
        );
      }
    });

    // Repli quand `kind` manque (voix lue avant le SDK 3) : même verdict que `kind`, voix par voix.
    it('repli slug/custom sans kind : même verdict que kind sur les 68 voix', () => {
      for (const { slug, custom, kind } of catalogVoices) {
        expect(voiceSupportsTtsModel({ slug, custom }, SPEECH_V1), `${slug} (${kind})`).toBe(
          kind === 'ivc',
        );
      }
    });

    it('TTS 3 accepte tout le catalogue, ivc comme pvc', () => {
      for (const { slug, custom, kind } of catalogVoices) {
        expect(voiceSupportsTtsModel({ slug, custom, kind }, TTS_3), String(slug)).toBe(true);
      }
    });

    it('voicesForTtsModel : 32 voix pour Voxtral TTS, les 68 pour TTS 3, ordre conservé', () => {
      const forSpeechV1 = voicesForTtsModel(catalogVoices, SPEECH_V1);
      expect(forSpeechV1).toEqual(catalogVoices.filter((v) => v.kind === 'ivc'));
      expect(forSpeechV1).toHaveLength(32);
      expect(voicesForTtsModel(catalogVoices, TTS_3)).toEqual(catalogVoices);
    });
  });

  describe('voiceSupportsTtsModel : kind', () => {
    it('kind prime sur le slug et le caractère personnel', () => {
      expect(voiceSupportsTtsModel({ slug: 'fr_marie_neutral', kind: 'pvc' }, SPEECH_V1)).toBe(
        false,
      );
      expect(
        voiceSupportsTtsModel({ slug: 'voice_3141', custom: false, kind: 'ivc' }, SPEECH_V1),
      ).toBe(true);
    });

    // Prédicat POSITIF : seule la valeur exacte `ivc` passe speech v1.
    it.each([
      ['inconnu', 'xvc'],
      ['vide', ''],
      ['majuscules', 'IVC'],
    ])('kind %s : refusé par Voxtral TTS, accepté par TTS 3', (_label, kind) => {
      expect(
        voiceSupportsTtsModel({ slug: 'fr_marie_neutral', custom: true, kind }, SPEECH_V1),
      ).toBe(false);
      expect(voiceSupportsTtsModel({ kind }, TTS_3)).toBe(true);
    });
  });

  describe('voiceSupportsTtsModel : formes inconnues', () => {
    // Repli sans `kind`. Prédicat POSITIF : une voix qui n'a ni slug de preset Voxtral 2 ni
    // caractère personnel est écartée de speech v1 (repli sur une autre voix) plutôt qu'envoyée vers
    // un 400.
    it.each([
      ['slug pvc', 'voice_3141'],
      ['tirets', 'fr-marie-neutral'],
      ['majuscules', 'FR_MARIE_NEUTRAL'],
      ['deux segments', 'fr_marie'],
      ['quatre segments', 'fr_marie_neutral_bis'],
      ['préfixe de trois lettres', 'fra_marie_neutral'],
      ['chiffre', 'fr_marie_neutral2'],
      ['slug vide', ''],
      ['sans slug', undefined],
    ])('%s, voix non personnelle : refusée par Voxtral TTS, acceptée par TTS 3', (_label, slug) => {
      expect(voiceSupportsTtsModel({ slug, custom: false }, SPEECH_V1)).toBe(false);
      expect(voiceSupportsTtsModel({ slug }, SPEECH_V1)).toBe(false);
      expect(voiceSupportsTtsModel({ slug, custom: false }, TTS_3)).toBe(true);
    });

    it('voix personnelle (clonage instantané) acceptée par Voxtral TTS, avec ou sans slug', () => {
      expect(voiceSupportsTtsModel({ custom: true }, SPEECH_V1)).toBe(true);
      expect(voiceSupportsTtsModel({ slug: 'voice_1', custom: true }, SPEECH_V1)).toBe(true);
    });
  });
});
