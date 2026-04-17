import { describe, it, expect } from 'vitest';
import { extractErrorCode } from './error-codes.js';
import type { FailedStepCode } from '../types.js';

// Exhaustiveness check compile-time : toute addition à FailedStepCode casse tsc ici
// tant que le nouveau code n'est pas listé. Force une revue volontaire des consommateurs
// (UI : mapping message, retry policy, observabilité) avant d'élargir le contrat.
const _KNOWN_CODES: Record<FailedStepCode, true> = {
  llm_invalid_json: true,
  quota_exceeded: true,
  upstream_unavailable: true,
  tts_upstream_error: true,
  context_length_exceeded: true,
  internal_error: true,
};
void _KNOWN_CODES;

describe('extractErrorCode', () => {
  it('mappe SyntaxError vers llm_invalid_json', () => {
    expect(extractErrorCode(new SyntaxError('Unexpected token'))).toBe('llm_invalid_json');
  });

  it('mappe rate_limit / 429 / quota vers quota_exceeded (message)', () => {
    expect(extractErrorCode(new Error('429 Too Many Requests'))).toBe('quota_exceeded');
    expect(extractErrorCode(new Error('rate_limit exceeded'))).toBe('quota_exceeded');
    expect(extractErrorCode(new Error('quota hit'))).toBe('quota_exceeded');
    expect(extractErrorCode(new Error('tier limit reached'))).toBe('quota_exceeded');
  });

  it('mappe 503 / 529 / overloaded / capacity vers upstream_unavailable (panne backend)', () => {
    // Sémantiquement distinct de quota : saturation backend, pas budget utilisateur.
    // Régression à prévenir : un user qui n'a rien consommé voyait "quota dépassé".
    expect(extractErrorCode(new Error('503 Service Unavailable'))).toBe('upstream_unavailable');
    expect(extractErrorCode(new Error('529 overloaded'))).toBe('upstream_unavailable');
    expect(extractErrorCode(new Error('Service overloaded'))).toBe('upstream_unavailable');
    expect(extractErrorCode(new Error('at capacity, retry later'))).toBe('upstream_unavailable');
  });

  it('mappe quota via status / code SDK (Mistral APIError)', () => {
    expect(extractErrorCode(Object.assign(new Error('x'), { status: 429 }))).toBe('quota_exceeded');
    expect(extractErrorCode(Object.assign(new Error('x'), { code: 'tier_limits_exceeded' }))).toBe(
      'quota_exceeded',
    );
    expect(extractErrorCode(Object.assign(new Error('x'), { code: 'rate_limit' }))).toBe(
      'quota_exceeded',
    );
  });

  it('mappe upstream_unavailable via status / code SDK', () => {
    expect(extractErrorCode(Object.assign(new Error('x'), { status: 503 }))).toBe(
      'upstream_unavailable',
    );
    expect(extractErrorCode(Object.assign(new Error('x'), { status: 529 }))).toBe(
      'upstream_unavailable',
    );
    expect(extractErrorCode(Object.assign(new Error('x'), { code: 'service_overloaded' }))).toBe(
      'upstream_unavailable',
    );
    expect(extractErrorCode(Object.assign(new Error('x'), { code: 'service_unavailable' }))).toBe(
      'upstream_unavailable',
    );
  });

  it('mappe context_length / token limit vers context_length_exceeded', () => {
    expect(extractErrorCode(new Error('context_length_exceeded'))).toBe('context_length_exceeded');
    expect(extractErrorCode(new Error('token limit reached'))).toBe('context_length_exceeded');
    expect(extractErrorCode(new Error('prompt too long to process'))).toBe(
      'context_length_exceeded',
    );
    expect(extractErrorCode(new Error('too many tokens in input'))).toBe('context_length_exceeded');
  });

  it('ne confond pas "too long" hors-contexte avec context_length_exceeded', () => {
    // Faux positifs historiques de la regex `too.?long`
    expect(extractErrorCode(new Error('filename too long for filesystem'))).toBe('internal_error');
    expect(extractErrorCode(new Error('image too large to upload'))).toBe('internal_error');
  });

  it('mappe vers tts_upstream_error seulement avec signature positive', () => {
    // Tag explicite posé par le generator
    expect(extractErrorCode(Object.assign(new Error('x'), { stage: 'tts' }), 'podcast')).toBe(
      'tts_upstream_error',
    );
    // Message qui cite un composant audio
    expect(extractErrorCode(new Error('TTS API unreachable'), 'quiz-vocal')).toBe(
      'tts_upstream_error',
    );
    expect(extractErrorCode(new Error('ElevenLabs timeout'), 'podcast')).toBe('tts_upstream_error');
    expect(extractErrorCode(new Error('voxtral audio failure'), 'tts')).toBe('tts_upstream_error');
    expect(extractErrorCode(new Error('audio buffer corrupted'), 'stt')).toBe('tts_upstream_error');
  });

  it('ne masque pas un bug hors-TTS dans un agent audio (parser/FS/auth)', () => {
    // Parser JSON, FS, auth : rien qui signe la pile audio → internal_error
    expect(extractErrorCode(new Error('ENOSPC: disk full'), 'podcast')).toBe('internal_error');
    expect(extractErrorCode(new Error('unexpected object shape'), 'quiz-vocal')).toBe(
      'internal_error',
    );
  });

  it('fallback vers internal_error sans agent ou pour agents non-audio', () => {
    expect(extractErrorCode(new Error('boom'))).toBe('internal_error');
    expect(extractErrorCode(new Error('boom'), '')).toBe('internal_error');
    expect(extractErrorCode(new Error('boom'), 'summary')).toBe('internal_error');
  });

  it('ne fuite jamais err.message dans le code retourné', () => {
    const code = extractErrorCode(new Error('sk-1234-SECRET via https://api.internal/v1'));
    expect(code).toBe('internal_error');
    expect(code).not.toContain('sk-1234');
    expect(code).not.toContain('api.internal');
  });

  it('gère les non-Error thrown values', () => {
    expect(extractErrorCode('string thrown')).toBe('internal_error');
    expect(extractErrorCode(null)).toBe('internal_error');
    expect(extractErrorCode({ weird: true })).toBe('internal_error');
  });

  it('priorité des règles : SyntaxError > status/code > regex > agent audio', () => {
    // SyntaxError l'emporte sur agent audio
    expect(extractErrorCode(new SyntaxError('bad json'), 'podcast')).toBe('llm_invalid_json');
    // status 429 l'emporte sur signature TTS
    expect(extractErrorCode(Object.assign(new Error('TTS down'), { status: 429 }), 'podcast')).toBe(
      'quota_exceeded',
    );
    // regex 429 l'emporte sur agent audio
    expect(extractErrorCode(new Error('429 rate_limit'), 'podcast')).toBe('quota_exceeded');
  });

  it('status structuré prime sur regex message conflictuel', () => {
    // Message évoque context_length mais status dit quota : status prime (SDK source de vérité).
    // Régression à prévenir : un refactor qui inverserait l'ordre des branches donnerait
    // context_length_exceeded sur une erreur qui est en fait un rate-limit.
    const err = Object.assign(new Error('context_length_exceeded (retry later)'), { status: 429 });
    expect(extractErrorCode(err)).toBe('quota_exceeded');

    // Inverse : code structuré context_length, message évoque quota.
    const err2 = Object.assign(new Error('rate_limit fallback kicked in'), {
      code: 'context_length_exceeded',
    });
    expect(extractErrorCode(err2)).toBe('context_length_exceeded');
  });

  it('status 503/529 prime sur regex quota conflictuelle dans le message', () => {
    // Régression à prévenir : un 503 avec message "rate_limit exceeded" doit rester
    // upstream_unavailable (status fait foi). L'inverse ferait perdre l'information
    // "panne backend" et afficherait un message quota trompeur à l'utilisateur.
    const err = Object.assign(new Error('rate_limit exceeded'), { status: 503 });
    expect(extractErrorCode(err)).toBe('upstream_unavailable');

    const err2 = Object.assign(new Error('quota apparently hit'), { status: 529 });
    expect(extractErrorCode(err2)).toBe('upstream_unavailable');
  });
});
