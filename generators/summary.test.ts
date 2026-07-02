import { describe, it, expect, vi } from 'vitest';
import { generateSummary, generateRemediationSummary } from './summary.js';

const validSummary = {
  title: 'Les volcans',
  summary: 'Les volcans sont...',
  key_points: ['Point 1', 'Point 2'],
  fun_fact: 'Le saviez-vous?',
  vocabulary: [{ word: 'magma', definition: 'Roche fondue' }],
  citations: [],
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

describe('generateSummary', () => {
  it('returns valid StudyFiche on first attempt', async () => {
    const client = mockClient(validSummary);
    const result = await generateSummary(client, 'Some markdown content');
    expect(result).toEqual(validSummary);
    expect(client.chat.complete).toHaveBeenCalledTimes(1);
  });

  it('retries when first attempt returns invalid JSON, succeeds on second', async () => {
    const client = mockClient({});
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] })
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(validSummary) } }],
      });

    const result = await generateSummary(client, 'Some markdown');
    expect(result).toEqual(validSummary);
    expect(client.chat.complete).toHaveBeenCalledTimes(2);
  });

  it('retry prompt ne fait pas fuiter "UNE SEULE fiche COMPLETE" dans le title', async () => {
    const client = mockClient({});
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] })
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(validSummary) } }],
      });

    await generateSummary(client, 'Some markdown');

    // Inspect le 2e appel (le retry)
    const retryCall = client.chat.complete.mock.calls[1][0];
    const retryUserMessage = retryCall.messages[retryCall.messages.length - 1].content;
    const lower = retryUserMessage.toLowerCase();
    // Phrases exactes des anciennes formulations problématiques — alignées sur
    // les verrous d'absence de `prompts.test.ts` (cf. .claude/rules/prompts.md §Anti-leak).
    expect(lower).not.toContain('une seule fiche complete');
    expect(lower).not.toContain('fiche complete');
    expect(lower).not.toContain('la fiche finale');
    expect(lower).not.toContain('avec cette fiche');
    expect(lower).not.toContain('resume complet du cours');
    // Règle positive présente — assertions simples
    expect(retryUserMessage).toContain('objet JSON unique');
    expect(retryUserMessage).toContain('premier niveau');
  });

  it('throws when both attempts fail', async () => {
    const client = mockClient({});
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] })
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] });

    await expect(generateSummary(client, 'content')).rejects.toThrow(/generer une fiche valide/);
  });

  it('lève une SyntaxError finale (→ llm_invalid_json côté route)', async () => {
    const client = mockClient({});
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] })
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] });

    await expect(generateSummary(client, 'content')).rejects.toBeInstanceOf(SyntaxError);
  });

  it('retry API rejection propage le message originel intact (→ quota_exceeded préservé)', async () => {
    const client = mockClient({});
    const rateLimitError = new Error('429 rate_limit exceeded on retry');
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] })
      .mockRejectedValueOnce(rateLimitError);

    await expect(generateSummary(client, 'content')).rejects.toBe(rateLimitError);
  });

  it('retry API rejection context_length propage intact', async () => {
    const client = mockClient({});
    const contextError = new Error('context_length_exceeded in retry attempt');
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] })
      .mockRejectedValueOnce(contextError);

    await expect(generateSummary(client, 'content')).rejects.toBe(contextError);
  });

  it('handles wrapped response {"fiches": [fiche1]} (single fiche unwrap)', async () => {
    const wrapped = { fiches: [validSummary] };
    const client = mockClient(wrapped);
    const result = await generateSummary(client, 'content');
    expect(result).toEqual(validSummary);
  });

  it('récupère une fiche title+summary même si key_points est vide (pas de 500)', async () => {
    // Cas observé : summary très structuré mais key_points vide → fiche utilisable
    const incomplete = {
      title: 'Les climats de la France',
      summary: '**1.** Le climat océanique est doux et pluvieux.',
      key_points: [],
    };
    const client = mockClient({});
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] })
      .mockResolvedValueOnce({ choices: [{ message: { content: JSON.stringify(incomplete) } }] });

    const result = await generateSummary(client, 'content');
    expect(result.title).toBe('Les climats de la France');
    expect(result.summary).toContain('océanique');
    expect(result.key_points).toEqual([]);
    expect(client.chat.complete).toHaveBeenCalledTimes(2);
  });

  it('récupère et normalise key_points fourni en texte (string → tableau)', async () => {
    const stringKp = {
      title: 'Les climats',
      summary: 'Explication des climats.',
      key_points: '- Le climat océanique est doux\n- Le climat méditerranéen est chaud',
      vocabulary: [],
    };
    const client = mockClient(stringKp);
    const result = await generateSummary(client, 'content');
    expect(result.key_points).toEqual([
      'Le climat océanique est doux',
      'Le climat méditerranéen est chaud',
    ]);
  });

  it('merges multiple fiches {"fiches": [fiche1, fiche2]} with deduplication', async () => {
    const fiche1 = {
      title: 'Volcans',
      summary: 'Partie 1.',
      key_points: ['Point A', 'Point B'],
      fun_fact: 'Fun!',
      vocabulary: [{ word: 'magma', definition: 'Roche fondue' }],
      citations: [],
    };
    const fiche2 = {
      title: 'Seismes',
      summary: 'Partie 2.',
      key_points: ['Point B', 'Point C'],
      vocabulary: [
        { word: 'magma', definition: 'Roche fondue' },
        { word: 'lave', definition: 'Roche en surface' },
      ],
      citations: [],
    };
    const wrapped = { fiches: [fiche1, fiche2] };
    const client = mockClient(wrapped);
    const result = await generateSummary(client, 'content');

    expect(result.title).toBe('Volcans / Seismes');
    expect(result.summary).toBe('Partie 1. Partie 2.');
    // Deduplicated key_points
    expect(result.key_points).toEqual(['Point A', 'Point B', 'Point C']);
    // Deduplicated vocabulary by word
    expect(result.vocabulary).toEqual([
      { word: 'magma', definition: 'Roche fondue' },
      { word: 'lave', definition: 'Roche en surface' },
    ]);
  });

  it('passes correct model, system prompt, user prompt to client', async () => {
    const client = mockClient(validSummary);
    await generateSummary(client, 'My markdown', 'custom-model', true, 'en', 'ado');

    const call = client.chat.complete.mock.calls[0][0];
    expect(call.model).toBe('custom-model');
    expect(call.messages).toHaveLength(2);
    expect(call.messages[0].role).toBe('system');
    expect(call.messages[1].role).toBe('user');
    expect(call.messages[1].content).toContain('My markdown');
    expect(call.responseFormat).toEqual({ type: 'json_object' });
  });

  it('handles missing vocabulary/fun_fact gracefully', async () => {
    const minimal = {
      title: 'Titre',
      summary: 'Resume',
      key_points: ['Point 1'],
    };
    const client = mockClient(minimal);
    const result = await generateSummary(client, 'content');
    expect(result.title).toBe('Titre');
    expect(result.summary).toBe('Resume');
    expect(result.key_points).toEqual(['Point 1']);
  });

  it("registre falc : le bloc STYLE D'ECRITURE atteint le prompt user, absent sinon", async () => {
    const client = mockClient(validSummary);
    await generateSummary(client, 'contenu', 'm', false, 'fr', 'enfant', undefined, 'falc');
    const falcUser = client.chat.complete.mock.calls[0][0].messages[1].content;
    expect(falcUser).toContain("STYLE D'ECRITURE");

    const client2 = mockClient(validSummary);
    await generateSummary(client2, 'contenu', 'm', false, 'fr', 'enfant');
    const stdUser = client2.chat.complete.mock.calls[0][0].messages[1].content;
    expect(stdUser).not.toContain("STYLE D'ECRITURE");
  });
});

describe('generateRemediationSummary', () => {
  const weakQuestions = [
    { question: 'Quelle est la couleur du ciel ?', choices: ['Rouge', 'Bleu'], correct: 1 },
    { question: 'Combien font 2 + 2 ?', choices: ['3', '4'], correct: 1 },
  ] as any[];

  it('returns valid StudyFiche and injects weak questions into user prompt', async () => {
    const client = mockClient(validSummary);
    const result = await generateRemediationSummary(
      client,
      'Contenu du cours',
      weakQuestions,
      'custom-model',
      'fr',
      'enfant',
    );

    expect(result).toEqual(validSummary);
    const call = client.chat.complete.mock.calls[0][0];
    expect(call.model).toBe('custom-model');
    expect(call.messages).toHaveLength(2);
    expect(call.messages[1].content).toContain('Quelle est la couleur du ciel ?');
    expect(call.messages[1].content).toContain('Combien font 2 + 2 ?');
    expect(call.messages[1].content).toContain('Contenu du cours');
    expect(call.responseFormat).toEqual({ type: 'json_object' });
  });

  it('anti-leak : le system prompt ne contient pas de token meta recyclable', async () => {
    const client = mockClient(validSummary);
    await generateRemediationSummary(client, 'content', weakQuestions);

    const systemPrompt = client.chat.complete.mock.calls[0][0].messages[0].content.toLowerCase();
    // Le mot "remediation" (persona) ne doit pas voisiner le champ title,
    // et les combos historiques interdits restent absents (cf. prompts.test.ts).
    expect(systemPrompt).not.toContain('une seule fiche complete');
    expect(systemPrompt).not.toContain('fiche de revision');
    expect(systemPrompt).not.toContain('resume complet du cours');
  });

  it('retries with the same discipline as generateSummary on invalid JSON', async () => {
    const client = mockClient({});
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] })
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(validSummary) } }],
      });

    const result = await generateRemediationSummary(client, 'content', weakQuestions);
    expect(result).toEqual(validSummary);
    expect(client.chat.complete).toHaveBeenCalledTimes(2);

    const retryCall = client.chat.complete.mock.calls[1][0];
    const retryUserMessage = retryCall.messages[retryCall.messages.length - 1].content;
    expect(retryUserMessage.toLowerCase()).not.toContain('une seule fiche complete');
    expect(retryUserMessage).toContain('objet JSON unique');
  });

  it('throws SyntaxError when both attempts fail', async () => {
    const client = mockClient({});
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] })
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] });

    await expect(
      generateRemediationSummary(client, 'content', weakQuestions),
    ).rejects.toBeInstanceOf(SyntaxError);
  });

  it('récupère une fiche de rappel title+summary même si key_points vide (bug « Échec de Fiche »)', async () => {
    const incomplete = {
      title: 'Rappel : les climats',
      summary: '**1.** Le climat océanique...\n\n**2.** Le climat méditerranéen...',
      key_points: [],
    };
    const client = mockClient({});
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] })
      .mockResolvedValueOnce({ choices: [{ message: { content: JSON.stringify(incomplete) } }] });

    const result = await generateRemediationSummary(client, 'content', weakQuestions);
    expect(result.title).toBe('Rappel : les climats');
    expect(result.key_points).toEqual([]);
    expect(client.chat.complete).toHaveBeenCalledTimes(2);
  });
});

describe('generateRemediationSummary', () => {
  const weakQuestions = [
    { question: 'Quelle est la couleur du ciel ?', choices: ['Rouge', 'Bleu'], correct: 1 },
    { question: 'Combien font 2 + 2 ?', choices: ['3', '4'], correct: 1 },
  ] as any[];

  it('returns valid StudyFiche and injects weak questions into user prompt', async () => {
    const client = mockClient(validSummary);
    const result = await generateRemediationSummary(
      client,
      'Contenu du cours',
      weakQuestions,
      'custom-model',
      'fr',
      'enfant',
    );

    expect(result).toEqual(validSummary);
    const call = client.chat.complete.mock.calls[0][0];
    expect(call.model).toBe('custom-model');
    expect(call.messages).toHaveLength(2);
    expect(call.messages[1].content).toContain('Quelle est la couleur du ciel ?');
    expect(call.messages[1].content).toContain('Combien font 2 + 2 ?');
    expect(call.messages[1].content).toContain('Contenu du cours');
    expect(call.responseFormat).toEqual({ type: 'json_object' });
  });

  it('anti-leak : le system prompt ne contient pas de token meta recyclable', async () => {
    const client = mockClient(validSummary);
    await generateRemediationSummary(client, 'content', weakQuestions);

    const systemPrompt = client.chat.complete.mock.calls[0][0].messages[0].content.toLowerCase();
    // Le mot "remediation" (persona) ne doit pas voisiner le champ title,
    // et les combos historiques interdits restent absents (cf. prompts.test.ts).
    expect(systemPrompt).not.toContain('une seule fiche complete');
    expect(systemPrompt).not.toContain('fiche de revision');
    expect(systemPrompt).not.toContain('resume complet du cours');
  });

  it('retries with the same discipline as generateSummary on invalid JSON', async () => {
    const client = mockClient({});
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] })
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(validSummary) } }],
      });

    const result = await generateRemediationSummary(client, 'content', weakQuestions);
    expect(result).toEqual(validSummary);
    expect(client.chat.complete).toHaveBeenCalledTimes(2);

    const retryCall = client.chat.complete.mock.calls[1][0];
    const retryUserMessage = retryCall.messages[retryCall.messages.length - 1].content;
    expect(retryUserMessage.toLowerCase()).not.toContain('une seule fiche complete');
    expect(retryUserMessage).toContain('objet JSON unique');
  });

  it('throws SyntaxError when both attempts fail', async () => {
    const client = mockClient({});
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] })
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] });

    await expect(
      generateRemediationSummary(client, 'content', weakQuestions),
    ).rejects.toBeInstanceOf(SyntaxError);
  });
});
