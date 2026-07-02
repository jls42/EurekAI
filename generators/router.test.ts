import { describe, it, expect, vi } from 'vitest';
import { routeRequest, normalizePlan } from './router.js';
import { logger } from '../helpers/logger.js';

const validPlan = {
  plan: [
    { agent: 'summary', reason: 'Because' },
    { agent: 'quiz', reason: 'Testing' },
  ],
  context: 'Content about...',
};

function mockClient(responseData: any) {
  return {
    chat: {
      complete: vi.fn().mockResolvedValue({
        choices: [{ message: { content: JSON.stringify(responseData) } }],
      }),
    },
  } as any;
}

describe('routeRequest', () => {
  it('returns valid plan with known agents (summary already present, no relocation)', async () => {
    const client = mockClient(validPlan);
    const result = await routeRequest(client, 'Some content');
    expect(result.plan).toEqual(validPlan.plan);
    expect(result.context).toBe('Content about...');
  });

  it('filters out invalid agent names (summary already present, no fallback)', async () => {
    const planWithInvalid = {
      plan: [
        { agent: 'summary', reason: 'OK' },
        { agent: 'unknown_agent', reason: 'Bad' },
        { agent: 'quiz', reason: 'OK' },
      ],
      context: 'Context',
    };
    const client = mockClient(planWithInvalid);
    const result = await routeRequest(client, 'content');
    expect(result.plan).toEqual([
      { agent: 'summary', reason: 'OK' },
      { agent: 'quiz', reason: 'OK' },
    ]);
  });

  it('triggers catastrophe fallback when plan is empty (Phase 2.4)', async () => {
    const emptyPlan = { plan: [], context: 'Nothing useful' };
    const client = mockClient(emptyPlan);
    const result = await routeRequest(client, 'content');
    expect(result.plan).toEqual([
      { agent: 'summary', reason: expect.stringContaining('Fiche de synthèse') },
      { agent: 'flashcards', reason: expect.stringContaining('Flashcards') },
      { agent: 'quiz', reason: expect.stringContaining('Quiz QCM') },
    ]);
  });

  it('passes model parameter', async () => {
    const client = mockClient(validPlan);
    await routeRequest(client, 'content', 'custom-model');

    const call = client.chat.complete.mock.calls[0][0];
    expect(call.model).toBe('custom-model');
  });
});

// ── normalizePlan unit tests (Phase 2.4) ─────────────────────────────

describe('normalizePlan', () => {
  it('catastrophe fallback: empty input → [summary, flashcards, quiz] with reasons', () => {
    const result = normalizePlan([], 'fr');
    expect(result.map((s) => s.agent)).toEqual(['summary', 'flashcards', 'quiz']);
    expect(result.every((s) => s.reason.length > 0)).toBe(true);
  });

  it('catastrophe fallback logs a warn pour détecter les régressions router en prod', () => {
    const spy = vi.spyOn(logger, 'warn').mockImplementation(() => {});
    normalizePlan([{ agent: 'unknown-foo', reason: 'halluciné' }], 'fr');
    expect(spy).toHaveBeenCalledWith(
      'router',
      expect.stringContaining('catastrophe fallback'),
      expect.anything(),
    );
    spy.mockRestore();
  });

  it('catastrophe fallback: only invalid names → same fallback', () => {
    const result = normalizePlan(
      [
        { agent: 'foo', reason: 'r1' },
        { agent: 'bar', reason: 'r2' },
      ],
      'fr',
    );
    expect(result.map((s) => s.agent)).toEqual(['summary', 'flashcards', 'quiz']);
  });

  it('summary invariant: prepended when absent (1 agent input)', () => {
    const result = normalizePlan([{ agent: 'podcast', reason: 'narrative' }], 'fr');
    expect(result.map((s) => s.agent)).toEqual(['summary', 'podcast']);
    // No forced completion to 3 — model's cardinal respected
  });

  it('summary invariant: NOT relocated when already present (3rd position)', () => {
    const result = normalizePlan(
      [
        { agent: 'podcast', reason: 'r1' },
        { agent: 'quiz', reason: 'r2' },
        { agent: 'summary', reason: 'r3' },
      ],
      'fr',
    );
    expect(result.map((s) => s.agent)).toEqual(['podcast', 'quiz', 'summary']);
    // Pas de complétion forcée
  });

  it('respects model cardinal: 2 agents valid → 2 agents output (no completion)', () => {
    const result = normalizePlan(
      [
        { agent: 'podcast', reason: 'r1' },
        { agent: 'image', reason: 'r2' },
      ],
      'fr',
    );
    expect(result.map((s) => s.agent)).toEqual(['summary', 'podcast', 'image']);
    // Length 3 because summary added in front, but no extra padding
  });

  it('deduplicates while preserving model order', () => {
    const result = normalizePlan(
      [
        { agent: 'summary', reason: 'first' },
        { agent: 'summary', reason: 'duplicate' },
        { agent: 'quiz', reason: 'r' },
      ],
      'fr',
    );
    expect(result.map((s) => s.agent)).toEqual(['summary', 'quiz']);
    expect(result[0].reason).toBe('first');
  });

  it('preserves all 8 agents when LLM proposes the full set (budget = 8)', () => {
    const result = normalizePlan(
      [
        { agent: 'summary', reason: 'r' },
        { agent: 'flashcards', reason: 'r' },
        { agent: 'quiz', reason: 'r' },
        { agent: 'fill-blank', reason: 'r' },
        { agent: 'podcast', reason: 'r' },
        { agent: 'quiz-vocal', reason: 'r' },
        { agent: 'image', reason: 'r' },
        { agent: 'dictation', reason: 'r' },
      ],
      'fr',
    );
    expect(result).toHaveLength(8);
    expect(result.map((s) => s.agent)).toEqual([
      'summary',
      'flashcards',
      'quiz',
      'fill-blank',
      'podcast',
      'quiz-vocal',
      'image',
      'dictation',
    ]);
  });

  it('mixed invalid + valid: filtering then normalization', () => {
    const result = normalizePlan(
      [
        { agent: 'foo', reason: 'invalid' },
        { agent: 'summary', reason: 'r1' },
        { agent: 'bar', reason: 'invalid' },
        { agent: 'quiz', reason: 'r2' },
      ],
      'fr',
    );
    expect(result.map((s) => s.agent)).toEqual(['summary', 'quiz']);
  });

  it('uses lang for default reasons when summary is injected', () => {
    const resultEn = normalizePlan([{ agent: 'podcast', reason: 'r' }], 'en');
    expect(resultEn[0].agent).toBe('summary');
    expect(resultEn[0].reason).toContain('Course summary');

    const resultJa = normalizePlan([{ agent: 'podcast', reason: 'r' }], 'ja');
    // ja has no entry → fallback to fr
    expect(resultJa[0].reason).toContain('Fiche de synthèse');
  });

  it('re-adds podcast, quiz-vocal and dictation for substantial study material', () => {
    const result = normalizePlan(
      [
        { agent: 'summary', reason: 'r1' },
        { agent: 'quiz', reason: 'r2' },
      ],
      'fr',
      'a'.repeat(500),
    );
    expect(result.map((s) => s.agent)).toEqual([
      'summary',
      'quiz',
      'podcast',
      'quiz-vocal',
      'dictation',
    ]);
  });

  it('does not force audio formats for genuinely short material', () => {
    const result = normalizePlan(
      [
        { agent: 'summary', reason: 'r1' },
        { agent: 'quiz', reason: 'r2' },
      ],
      'fr',
      'Definition courte.',
    );
    expect(result.map((s) => s.agent)).toEqual(['summary', 'quiz']);
  });

  it('ignores long consigne preamble when underlying study material is short', () => {
    const markdown = `CONSIGNE DE REVISION DETECTEE : L'eleve doit reviser les points suivants :
- date exacte
- definition precise
- personnage important
- cause et consequence
- exemple detaille

Concentre-toi PRIORITAIREMENT sur ces sujets. Le contenu hors-programme peut etre utilise en complement.

---

# Source 1 — cours.txt

Definition tres courte.`;
    const result = normalizePlan(
      [
        { agent: 'summary', reason: 'r1' },
        { agent: 'quiz', reason: 'r2' },
      ],
      'fr',
      markdown,
    );
    expect(result.map((s) => s.agent)).toEqual(['summary', 'quiz']);
  });

  it('preserves LLM-chosen image and enriches with quiz-vocal + dictation when budget allows', () => {
    // Politique : le LLM a explicitement demandé image (ex. carte, anatomie).
    // L'enrichment audio ne doit pas l'évincer — budget MAX_PLAN_LENGTH = 8 respecté.
    // Plan entrant = 6 agents dont image ; il reste 2 slots pour l'enrichment
    // → quiz-vocal puis dictation injectés AVANT image, sans la tronquer.
    const result = normalizePlan(
      [
        { agent: 'summary', reason: 'r' },
        { agent: 'flashcards', reason: 'r' },
        { agent: 'quiz', reason: 'r' },
        { agent: 'fill-blank', reason: 'r' },
        { agent: 'podcast', reason: 'r' },
        { agent: 'image', reason: 'r' },
      ],
      'fr',
      'b'.repeat(500),
    );
    expect(result.map((s) => s.agent)).toEqual([
      'summary',
      'flashcards',
      'quiz',
      'fill-blank',
      'podcast',
      'quiz-vocal',
      'dictation',
      'image',
    ]);
  });

  it('enriches audio when budget allows and image is present', () => {
    // Budget large (5 slots libres sur 8) : podcast, quiz-vocal ET dictation sont
    // injectés AVANT image, sans la tronquer.
    const result = normalizePlan(
      [
        { agent: 'summary', reason: 'r' },
        { agent: 'quiz', reason: 'r' },
        { agent: 'image', reason: 'r' },
      ],
      'fr',
      'c'.repeat(500),
    );
    expect(result.map((s) => s.agent)).toEqual([
      'summary',
      'quiz',
      'podcast',
      'quiz-vocal',
      'dictation',
      'image',
    ]);
  });

  it('injects the three audio agents when image is present with budget = 8', () => {
    // 5 agents dont image, budget = 8 : podcast, quiz-vocal ET dictation s'insèrent avant image.
    const result = normalizePlan(
      [
        { agent: 'summary', reason: 'r' },
        { agent: 'flashcards', reason: 'r' },
        { agent: 'quiz', reason: 'r' },
        { agent: 'fill-blank', reason: 'r' },
        { agent: 'image', reason: 'r' },
      ],
      'fr',
      'd'.repeat(500),
    );
    expect(result.map((s) => s.agent)).toEqual([
      'summary',
      'flashcards',
      'quiz',
      'fill-blank',
      'podcast',
      'quiz-vocal',
      'dictation',
      'image',
    ]);
  });

  it('dictation is a valid agent kept by normalizePlan (no longer filtered out)', () => {
    const result = normalizePlan([{ agent: 'dictation', reason: 'orthographe' }], 'fr');
    // summary est préfixé (invariant), dictation choisie par le LLM est conservée.
    expect(result.map((s) => s.agent)).toEqual(['summary', 'dictation']);
  });

  it('does not enrich dictation for genuinely short material', () => {
    const result = normalizePlan(
      [
        { agent: 'summary', reason: 'r1' },
        { agent: 'quiz', reason: 'r2' },
      ],
      'fr',
      'Definition courte.',
    );
    expect(result.map((s) => s.agent)).not.toContain('dictation');
  });
});
