/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any -- Codacy lance ESLint sans resolution des types vitest : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect, vi } from 'vitest';
import { generateDictation, shuffleItems, DICTATION_MAX_WORDS } from './dictation.js';
import { dictationRetryUser } from '../prompts.js';

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

const makeItems = (n: number) =>
  Array.from({ length: n }, (_, i) => ({
    word: `mot${i}`,
    sentence: `Une phrase avec mot${i} dedans.`,
    rule: 'Règle.',
  }));

describe('generateDictation', () => {
  it('retourne les items valides au premier essai (ordre mélangé, multiset préservé)', async () => {
    const client = mockClient({ items: validItems });
    const result = await generateDictation(client, 'toujours\nécole');
    expect(result).toHaveLength(validItems.length);
    expect(result).toEqual(expect.arrayContaining(validItems));
    expect(client.chat.complete).toHaveBeenCalledTimes(1);
  });

  it('cap dur : tronque à DICTATION_MAX_WORDS même si le LLM déborde', async () => {
    const client = mockClient({ items: makeItems(30) });
    const result = await generateDictation(client, 'liste', 'm', 'fr', 'enfant', 30);
    expect(result).toHaveLength(DICTATION_MAX_WORDS);
  });

  it('respecte le count demandé : 15 items retournés, count=10 → 10 servis', async () => {
    const client = mockClient({ items: makeItems(15) });
    const result = await generateDictation(client, 'liste', 'm', 'fr', 'enfant', 10);
    expect(result).toHaveLength(10);
  });

  it('le count demandé est plafonné dans le prompt user', async () => {
    const client = mockClient({ items: validItems });
    await generateDictation(client, 'liste', 'm', 'fr', 'enfant', 99);
    const userMsg = client.chat.complete.mock.calls[0][0].messages[1].content;
    expect(userMsg).toContain(`Choisis ${DICTATION_MAX_WORDS} mots`);
  });

  it("transmet l'historique d'exclusion au prompt user", async () => {
    const client = mockClient({ items: validItems });
    await generateDictation(
      client,
      'liste',
      'm',
      'fr',
      'enfant',
      10,
      "Tu as deja travaille les mots ci-dessous. Choisis d'autres mots du contenu :\n- avion",
    );
    const userMsg = client.chat.complete.mock.calls[0][0].messages[1].content;
    expect(userMsg).toContain('deja travaille les mots');
    expect(userMsg).toContain('- avion');
  });

  it('filtre un item dont la phrase ne contient pas le mot, sans retry', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const items = [
      ...validItems,
      {
        word: 'absent',
        sentence: 'Une phrase qui ne contient pas ce qui est attendu.',
        rule: 'R.',
      },
    ];
    const client = mockClient({ items });
    const result = await generateDictation(client, 'liste');
    expect(result).toHaveLength(validItems.length);
    expect(result).toEqual(expect.arrayContaining(validItems));
    expect(client.chat.complete).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('1 item'));
    warnSpy.mockRestore();
  });

  it('écarte les items runtime sales (null, nombre, objet incomplet) sans throw', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const client = mockClient({ items: [null, 42, { word: 'toujours' }, validItems[0]] });
    const result = await generateDictation(client, 'liste');
    expect(result).toEqual([validItems[0]]);
    expect(client.chat.complete).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('3 item'));
    warnSpy.mockRestore();
  });

  it('retry sur JSON invalide puis succès', async () => {
    const client = mockClient({});
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] })
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify({ items: validItems }) } }],
      });
    const result = await generateDictation(client, 'liste');
    expect(result).toHaveLength(validItems.length);
    expect(result).toEqual(expect.arrayContaining(validItems));
    expect(client.chat.complete).toHaveBeenCalledTimes(2);
    expect(client.chat.complete.mock.calls[1][0].messages[3].content).toBe(
      dictationRetryUser(10, 'fr'),
    );
  });

  it('throw après deux échecs', async () => {
    const client = mockClient({});
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] })
      .mockResolvedValueOnce({ choices: [{ message: { content: '{}' } }] });
    await expect(generateDictation(client, 'liste')).rejects.toThrow(/2 tentatives/);
  });
});

describe('shuffleItems', () => {
  it("rng → 0 : permutation identité (l'ordre d'origine est conservé)", () => {
    expect(shuffleItems([1, 2, 3, 4], () => 0)).toEqual([1, 2, 3, 4]);
  });

  it('rng → max-1 : permutation inverse', () => {
    expect(shuffleItems([1, 2, 3, 4], (max) => max - 1)).toEqual([4, 3, 2, 1]);
  });

  it('préserve le multiset et ne mute pas le tableau source', () => {
    const input = ['a', 'b', 'c', 'd', 'e'];
    const out = shuffleItems(input);
    const byLocale = (a: string, b: string) => a.localeCompare(b);
    expect([...out].sort(byLocale)).toEqual([...input].sort(byLocale));
    expect(input).toEqual(['a', 'b', 'c', 'd', 'e']);
  });
});
