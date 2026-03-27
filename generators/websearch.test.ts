import { describe, it, expect, vi } from 'vitest';

vi.mock('../prompts.js', () => ({
  websearchInstructions: vi.fn().mockReturnValue('instructions'),
  websearchInput: vi.fn().mockReturnValue('formatted query'),
}));

import { webSearchEnrich } from './websearch.js';

function createClient(outputText = 'Search result text here') {
  return {
    beta: {
      agents: {
        create: vi.fn().mockResolvedValue({ id: 'agent-1' }),
        delete: vi.fn().mockResolvedValue(undefined),
      },
      conversations: {
        start: vi.fn().mockResolvedValue({
          outputs: [{ content: [{ text: outputText }] }],
        }),
      },
    },
  } as any;
}

describe('webSearchEnrich', () => {
  it('creates agent, starts conversation, extracts text, and deletes agent', async () => {
    const client = createClient();
    const result = await webSearchEnrich(client, 'dinosaures');

    expect(client.beta.agents.create).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'mistral-large-latest',
        name: 'EurekAI Web Researcher',
        tools: [{ type: 'web_search' }],
      }),
    );
    expect(client.beta.conversations.start).toHaveBeenCalledWith({
      agentId: 'agent-1',
      inputs: 'formatted query',
    });
    expect(result.text).toBe('Search result text here');
    expect(typeof result.elapsed).toBe('number');
    expect(client.beta.agents.delete).toHaveBeenCalledWith({ agentId: 'agent-1' });
  });

  it('returns fallback text when no results are found', async () => {
    const client = createClient();
    client.beta.conversations.start.mockResolvedValue({ outputs: [] });

    const result = await webSearchEnrich(client, 'nothing');

    expect(result.text).toBe('Aucun resultat trouve.');
  });

  it('uses English fallback when lang is en', async () => {
    const client = createClient();
    client.beta.conversations.start.mockResolvedValue({ outputs: [] });

    const result = await webSearchEnrich(client, 'nothing', 'en');

    expect(result.text).toBe('No results found.');
  });

  it('cleans up agent even on conversation error', async () => {
    const client = createClient();
    client.beta.conversations.start.mockRejectedValue(new Error('API error'));

    await expect(webSearchEnrich(client, 'fail')).rejects.toThrow('API error');
    expect(client.beta.agents.delete).toHaveBeenCalledWith({ agentId: 'agent-1' });
  });
});
