import { describe, it, expect } from 'vitest';
import { buildExclusionContext, diversityParams } from './diversity';
import type { Generation } from '../types';

describe('diversityParams', () => {
  it('returns correct params for quiz', () => {
    const p = diversityParams('quiz');
    expect(p.temperature).toBe(0.9);
    expect(p.presencePenalty).toBe(0.3);
    expect(p.randomSeed).toBeGreaterThanOrEqual(0);
    expect(p.randomSeed).toBeLessThan(1_000_000);
  });

  it('returns correct params for podcast', () => {
    const p = diversityParams('podcast');
    expect(p.temperature).toBe(1.0);
    expect(p.presencePenalty).toBe(0.2);
  });

  it('returns correct params for summary', () => {
    const p = diversityParams('summary');
    expect(p.temperature).toBe(0.4);
    expect(p.presencePenalty).toBe(0);
  });

  it('returns default params for unknown type', () => {
    const p = diversityParams('unknown');
    expect(p.temperature).toBe(0.7);
    expect(p.presencePenalty).toBe(0);
  });

  it('generates different randomSeed on each call', () => {
    const seeds = new Set(Array.from({ length: 10 }, () => diversityParams('quiz').randomSeed));
    expect(seeds.size).toBeGreaterThan(1);
  });
});

describe('buildExclusionContext', () => {
  it('returns empty string when no generations', () => {
    expect(buildExclusionContext([], 'quiz')).toBe('');
  });

  it('returns empty string when no matching type', () => {
    const gens = [
      { type: 'summary', data: { title: 'T', summary: 'S', key_points: ['a'], vocabulary: [] } },
    ] as unknown as Generation[];
    expect(buildExclusionContext(gens, 'quiz')).toBe('');
  });

  it('extracts quiz questions from quiz generations', () => {
    const gens = [
      {
        type: 'quiz',
        data: { quiz: [{ question: 'Q1?' }, { question: 'Q2?' }] },
      },
    ] as unknown as Generation[];
    const result = buildExclusionContext(gens, 'quiz');
    expect(result).toContain('QUESTIONS DEJA GENEREES');
    expect(result).toContain('- Q1?');
    expect(result).toContain('- Q2?');
  });

  it('extracts quiz questions from array data format', () => {
    const gens = [
      {
        type: 'quiz',
        data: [{ question: 'Q1?' }, { question: 'Q2?' }],
      },
    ] as unknown as Generation[];
    const result = buildExclusionContext(gens, 'quiz');
    expect(result).toContain('- Q1?');
  });

  it('extracts flashcard questions', () => {
    const gens = [
      {
        type: 'flashcards',
        data: { flashcards: [{ question: 'FC1?' }, { question: 'FC2?' }] },
      },
    ] as unknown as Generation[];
    const result = buildExclusionContext(gens, 'flashcards');
    expect(result).toContain('FLASHCARDS DEJA GENEREES');
    expect(result).toContain('- FC1?');
  });

  it('extracts fill-blank answers', () => {
    const gens = [
      {
        type: 'fill-blank',
        data: [{ answer: 'alternateur' }, { answer: 'turbine' }],
      },
    ] as unknown as Generation[];
    const result = buildExclusionContext(gens, 'fill-blank');
    expect(result).toContain('MOTS/CONCEPTS DEJA UTILISES');
    expect(result).toContain('- alternateur');
    expect(result).toContain('- turbine');
  });

  it('extracts podcast first host lines', () => {
    const gens = [
      {
        type: 'podcast',
        data: {
          script: [
            { speaker: 'host', text: 'Bienvenue!' },
            { speaker: 'guest', text: 'Merci' },
          ],
        },
      },
    ] as unknown as Generation[];
    const result = buildExclusionContext(gens, 'podcast');
    expect(result).toContain('PODCASTS DEJA GENERES');
    expect(result).toContain('- Bienvenue!');
  });

  it('extracts summary key_points', () => {
    const gens = [
      {
        type: 'summary',
        data: { title: 'T', summary: 'S', key_points: ['Point A', 'Point B'], vocabulary: [] },
      },
    ] as unknown as Generation[];
    const result = buildExclusionContext(gens, 'summary');
    expect(result).toContain('POINTS DEJA COUVERTS');
    expect(result).toContain('- Point A');
  });

  it('truncates at maxChars', () => {
    const questions = Array.from({ length: 100 }, (_, i) => ({
      question: `Question numero ${i} sur un sujet tres important et detaille`,
    }));
    const gens = [{ type: 'quiz', data: { quiz: questions } }] as unknown as Generation[];
    const result = buildExclusionContext(gens, 'quiz', 200);
    expect(result.length).toBeLessThanOrEqual(200 + 100); // header + last line may slightly exceed
    expect(result.split('\n-').length).toBeLessThan(100);
  });

  it('aggregates across multiple generations', () => {
    const gens = [
      { type: 'quiz', data: { quiz: [{ question: 'Gen1 Q1' }] } },
      { type: 'quiz', data: { quiz: [{ question: 'Gen2 Q1' }] } },
    ] as unknown as Generation[];
    const result = buildExclusionContext(gens, 'quiz');
    expect(result).toContain('- Gen1 Q1');
    expect(result).toContain('- Gen2 Q1');
  });

  it('returns empty for unknown type', () => {
    const gens = [
      { type: 'image', data: { imageUrl: 'x', prompt: 'y' } },
    ] as unknown as Generation[];
    expect(buildExclusionContext(gens, 'image')).toBe('');
  });

  it('extracts quiz-vocal questions using same extractor as quiz', () => {
    const gens = [
      {
        type: 'quiz-vocal',
        data: [{ question: 'QV1?' }, { question: 'QV2?' }],
      },
    ] as unknown as Generation[];
    const result = buildExclusionContext(gens, 'quiz-vocal');
    expect(result).toContain('QUESTIONS DEJA GENEREES');
    expect(result).toContain('- QV1?');
    expect(result).toContain('- QV2?');
  });

  it('returns empty when extractor yields no items', () => {
    const gens = [
      {
        type: 'quiz',
        data: { quiz: [{ noQuestion: true }] },
      },
    ] as unknown as Generation[];
    expect(buildExclusionContext(gens, 'quiz')).toBe('');
  });

  it('extracts flashcards from array data format', () => {
    const gens = [
      {
        type: 'flashcards',
        data: [{ question: 'FC-array?' }],
      },
    ] as unknown as Generation[];
    const result = buildExclusionContext(gens, 'flashcards');
    expect(result).toContain('- FC-array?');
  });

  it('handles podcast with no script gracefully', () => {
    const gens = [
      {
        type: 'podcast',
        data: { noScript: true },
      },
    ] as unknown as Generation[];
    expect(buildExclusionContext(gens, 'podcast')).toBe('');
  });

  it('handles podcast with no host speaker', () => {
    const gens = [
      {
        type: 'podcast',
        data: { script: [{ speaker: 'guest', text: 'Only guest' }] },
      },
    ] as unknown as Generation[];
    expect(buildExclusionContext(gens, 'podcast')).toBe('');
  });

  it('limits summary key_points to 5 per generation', () => {
    const gens = [
      {
        type: 'summary',
        data: { key_points: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7'] },
      },
    ] as unknown as Generation[];
    const result = buildExclusionContext(gens, 'summary');
    expect(result).toContain('- P5');
    expect(result).not.toContain('- P6');
  });
});
