/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect } from 'vitest';
import {
  STT_MODELS,
  STT_MODEL_LABELS,
  STT_PREVIEW_MODELS,
  DEFAULT_STT_MODEL,
  normalizeSttModel,
} from './stt-models.js';

describe('stt-models', () => {
  it("DEFAULT_STT_MODEL est Voxtral Mini Transcribe 2 épinglé (2602), ce que servait l'alias", () => {
    expect(DEFAULT_STT_MODEL).toBe('voxtral-mini-2602');
  });

  it('STT_MODELS liste le défaut en tête, puis Mini et Small Transcribe 3', () => {
    expect(STT_MODELS).toEqual([
      'voxtral-mini-2602',
      'voxtral-mini-transcribe-3-0',
      'voxtral-small-transcribe-3-0',
    ]);
    expect(STT_MODELS[0]).toBe(DEFAULT_STT_MODEL);
  });

  it('STT_MODEL_LABELS mappe chaque id vers son nom produit', () => {
    expect(STT_MODEL_LABELS).toEqual({
      'voxtral-mini-2602': 'Mini Transcribe 2',
      'voxtral-mini-transcribe-3-0': 'Mini Transcribe 3',
      'voxtral-small-transcribe-3-0': 'Small Transcribe 3',
    });
  });

  it('préversions : les deux Transcribe 3 (Public Preview), jamais le défaut', () => {
    expect([...STT_PREVIEW_MODELS]).toEqual([
      'voxtral-mini-transcribe-3-0',
      'voxtral-small-transcribe-3-0',
    ]);
    expect(STT_PREVIEW_MODELS.has(DEFAULT_STT_MODEL)).toBe(false);
  });

  describe('normalizeSttModel', () => {
    it.each(STT_MODELS)('garde le modèle épinglé %s', (model) => {
      expect(normalizeSttModel(model)).toBe(model);
    });

    // L'alias codé en dur jusqu'en v1.7.11, et le synonyme non persisté de Mini Transcribe 3
    // (listé par /v1/models) : jamais envoyés tels quels.
    it.each(['voxtral-mini-latest', 'voxtral-mini-transcribe-3'])(
      'ramène %s sur le défaut épinglé',
      (alias) => {
        expect(normalizeSttModel(alias)).toBe('voxtral-mini-2602');
      },
    );

    it('ramène un id TTS, inconnu, nul ou non-string sur le défaut', () => {
      for (const value of ['voxtral-mini-tts-2603', 'garbage', '', undefined, null, 42]) {
        expect(normalizeSttModel(value), String(value)).toBe('voxtral-mini-2602');
      }
    });
  });
});
