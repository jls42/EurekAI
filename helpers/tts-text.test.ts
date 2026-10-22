/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect } from 'vitest';
import { speakableText } from './tts-text.js';

describe('speakableText', () => {
  it('retire les marqueurs de sources (2603 les prononçait : « Source 2, Source 3 »)', () => {
    expect(speakableText('Les volcans [Source 1][Source 3] crachent de la lave.')).toBe(
      'Les volcans crachent de la lave.',
    );
  });

  it('retire les formats dégradés de marqueurs et recolle la ponctuation', () => {
    expect(speakableText('Fin de phrase [Source 2, 4].')).toBe('Fin de phrase.');
    expect(speakableText('Avant [Source 2, Source 5], après [source 7].')).toBe('Avant, après.');
  });

  it('garde le mot entre crochets (TTS 3 lit `[…]` comme une balise et avalait « chat »)', () => {
    expect(speakableText('Le mot [chat] est un nom commun.')).toBe(
      'Le mot chat est un nom commun.',
    );
    expect(speakableText('[rires] On commence !')).toBe('rires On commence !');
  });

  it('ôte un crochet orphelin', () => {
    expect(speakableText('La réponse est [B')).toBe('La réponse est B');
  });

  it('ne touche ni aux espaces typographiques français ni à un texte sans crochet', () => {
    expect(speakableText('Question : choix A : Paris. Vrai ou faux ?')).toBe(
      'Question : choix A : Paris. Vrai ou faux ?',
    );
    expect(speakableText('volcan')).toBe('volcan');
  });
});
