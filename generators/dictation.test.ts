/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any -- Codacy lance ESLint sans resolution des types vitest : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect, vi } from 'vitest';
import { generateDictation, DICTATION_MAX_WORDS } from './dictation.js';

const validItems = [
  { word: 'toujours', sentence: 'Mon chat dort toujours ici.', rule: 'Se termine par un s muet.' },
  { word: 'école', sentence: "Je vais à l'école.", rule: 'Accent aigu sur le e.' },
];

function mockClient(responseData: any) {
  return {
    chat: {
      complete: vi.fn().mockResolvedValue({
        choices: [{ message: { content: JSON.stringify(responseData) } }],
      }),
    },
  } as any;
}

describe('generateDictation', () => {
  it('retourne les items valides au premier essai', async () => {
    const client = mockClient({ items: validItems });
    const result = await generateDictation(client, 'toujours\nécole');
    expect(result).toEqual(validItems);
    expect(client.chat.complete).toHaveBeenCalledTimes(1);
  });

  it('cap dur : tronque à DICTATION_MAX_WORDS même si le LLM déborde', async () => {
    const many = Array.from({ length: 30 }, (_, i) => ({
      word: `mot${i}`,
      sentence: `Une phrase avec mot${i} dedans.`,
      rule: 'Règle.',
    }));
    const client = mockClient({ items: many });
    const result = await generateDictation(client, 'liste', 'm', 'fr', 'enfant', 30);
    expect(result).toHaveLength(DICTATION_MAX_WORDS);
  });

  it('le count demandé est plafonné dans le prompt user', async () => {
    const client = mockClient({ items: validItems });
    await generateDictation(client, 'liste', 'm', 'fr', 'enfant', 99);
    const userMsg = client.chat.complete.mock.calls[0][0].messages[1].content;
    expect(userMsg).toContain(`au maximum ${DICTATION_MAX_WORDS}`);
  });

  it('retry sur JSON invalide puis succès', async () => {
    const client = mockClient({});
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] })
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify({ items: validItems }) } }],
      });
    const result = await generateDictation(client, 'liste');
    expect(result).toEqual(validItems);
    expect(client.chat.complete).toHaveBeenCalledTimes(2);
  });

  it('throw après deux échecs', async () => {
    const client = mockClient({});
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] })
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] });
    await expect(generateDictation(client, 'liste')).rejects.toThrow(/2 tentatives/);
  });
});
