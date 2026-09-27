import { describe, it, expect, vi } from 'vitest';
import { chatWithSources } from './chat.js';

describe('chatWithSources', () => {
  const messages = [{ role: 'user', content: 'Bonjour' }];
  const sourceContext = 'Les volcans sont des montagnes.';

  it('returns reply without tool calls (simple response)', async () => {
    const client = {
      chat: {
        complete: vi.fn().mockResolvedValue({
          choices: [{ message: { content: "Bonjour! Comment puis-je t'aider?" } }],
        }),
      },
    } as any;

    const result = await chatWithSources(client, messages, sourceContext);
    expect(result.reply).toBe("Bonjour! Comment puis-je t'aider?");
    expect(result.toolCalls).toEqual([]);
    expect(client.chat.complete).toHaveBeenCalledTimes(1);
  });

  it('envoie les 4 outils de génération avec une description non vide', async () => {
    const client = {
      chat: {
        complete: vi.fn().mockResolvedValue({ choices: [{ message: { content: 'ok' } }] }),
      },
    } as any;

    await chatWithSources(client, messages, sourceContext);

    const tools = client.chat.complete.mock.calls[0][0].tools;
    expect(tools.map((t: any) => t.function.name)).toEqual([
      'generate_summary',
      'generate_flashcards',
      'generate_quiz',
      'generate_fill-blank',
    ]);
    for (const t of tools) {
      expect(t.function.description.length).toBeGreaterThan(10);
    }
  });

  it('returns reply with tool calls (first response has toolCalls, then final response)', async () => {
    const client = {
      chat: {
        complete: vi
          .fn()
          .mockResolvedValueOnce({
            choices: [
              {
                message: {
                  content: '',
                  toolCalls: [{ id: 'tc1', function: { name: 'generate_summary' } }],
                },
              },
            ],
          })
          .mockResolvedValueOnce({
            choices: [{ message: { content: 'Voici ton resume!' } }],
          }),
      },
    } as any;

    const result = await chatWithSources(client, messages, sourceContext);
    expect(result.reply).toBe('Voici ton resume!');
    expect(result.toolCalls).toEqual(['generate_summary']);
    expect(client.chat.complete).toHaveBeenCalledTimes(2);
  });

  it('limits tool calls to 3 maximum', async () => {
    const fourToolCalls = [
      { id: 'tc1', function: { name: 'generate_summary' } },
      { id: 'tc2', function: { name: 'generate_quiz' } },
      { id: 'tc3', function: { name: 'generate_flashcards' } },
      { id: 'tc4', function: { name: 'generate_fill-blank' } },
    ];
    const client = {
      chat: {
        complete: vi
          .fn()
          .mockResolvedValueOnce({
            choices: [{ message: { content: '', toolCalls: fourToolCalls } }],
          })
          .mockResolvedValueOnce({
            choices: [{ message: { content: 'Done!' } }],
          }),
      },
    } as any;

    const result = await chatWithSources(client, messages, sourceContext);
    expect(result.toolCalls).toHaveLength(3);
    expect(result.toolCalls).not.toContain('generate_fill-blank');
  });

  it('uses correct system prompt with source context', async () => {
    const client = {
      chat: {
        complete: vi.fn().mockResolvedValue({
          choices: [{ message: { content: 'Reply' } }],
        }),
      },
    } as any;

    await chatWithSources(client, messages, sourceContext, 'mistral-large-latest', 'fr');

    const call = client.chat.complete.mock.calls[0][0];
    expect(call.messages[0].role).toBe('system');
    expect(call.messages[0].content).toContain('DOCUMENTS DE COURS');
    expect(call.messages[0].content).toContain(sourceContext);
  });

  it('handles non-string content gracefully', async () => {
    const client = {
      chat: {
        complete: vi.fn().mockResolvedValue({
          choices: [{ message: { content: null } }],
        }),
      },
    } as any;

    const result = await chatWithSources(client, messages, sourceContext);
    expect(result.reply).toBe('');
  });

  it('uses EN docs label when lang=en', async () => {
    const client = {
      chat: {
        complete: vi.fn().mockResolvedValue({
          choices: [{ message: { content: 'Reply' } }],
        }),
      },
    } as any;

    await chatWithSources(client, messages, sourceContext, 'mistral-large-latest', 'en');

    const call = client.chat.complete.mock.calls[0][0];
    expect(call.messages[0].content).toContain('COURSE DOCUMENTS');
  });

  // Scénarios mesurés sur l'API réelle (mistral-large-latest, 2026-09-27) : le modèle enchaîne ses
  // appels d'outils (un par tour), rappelle un outil déjà lancé, et renvoie son texte en morceaux
  // quand toolChoice vaut 'none'.
  describe("boucle d'outils", () => {
    // Réponses rendues dans l'ordre. `seen` garde une COPIE des messages de chaque appel :
    // chatWithSources modifie son tableau en place, mock.calls n'en garderait que la référence.
    const scriptedClient = (...responses: Array<{ content?: unknown; toolCalls?: unknown[] }>) => {
      const seen: Array<{ messages: any[]; toolChoice?: string }> = [];
      const complete = vi.fn((req: any) => {
        seen.push({ messages: [...req.messages], toolChoice: req.toolChoice });
        return Promise.resolve({ choices: [{ message: responses.shift() }] });
      });
      return { client: { chat: { complete } } as any, seen, complete };
    };
    const call = (id: string, name: string) => ({ id, function: { name, arguments: '{}' } });
    const toolAnswers = (msgs: any[]) =>
      msgs.filter((m) => m.role === 'tool').map((m) => m.toolCallId);

    it('traite un outil appelé au 2e tour et rend le texte du tour final', async () => {
      const { client, complete } = scriptedClient(
        { content: '', toolCalls: [call('t1', 'generate_quiz')] },
        { content: '', toolCalls: [call('t2', 'generate_flashcards')] },
        { content: 'Ton quiz et tes flashcards arrivent !' },
      );

      const result = await chatWithSources(client, messages, sourceContext);

      expect(result.toolCalls).toEqual(['generate_quiz', 'generate_flashcards']);
      expect(result.reply).toBe('Ton quiz et tes flashcards arrivent !');
      expect(complete).toHaveBeenCalledTimes(3);
    });

    it('répond à un outil rappelé à un tour suivant sans le relancer', async () => {
      const { client, seen } = scriptedClient(
        { content: 'Je te prépare un quiz !', toolCalls: [call('t1', 'generate_quiz')] },
        { content: 'Le quiz cuit…', toolCalls: [call('t2', 'generate_quiz')] },
        { content: 'Le quiz est prêt !' },
      );

      const result = await chatWithSources(client, messages, sourceContext);

      expect(result.toolCalls).toEqual(['generate_quiz']);
      expect(result.reply).toBe('Le quiz est prêt !');
      expect(toolAnswers(seen[2].messages)).toEqual(['t1', 't2']);
    });

    it('au-delà de 3 appels : le tour assistant ne garde que les appels traités, puis texte forcé', async () => {
      const { client, seen } = scriptedClient(
        {
          content: '',
          toolCalls: [
            call('t1', 'generate_summary'),
            call('t2', 'generate_quiz'),
            call('t3', 'generate_flashcards'),
            call('t4', 'generate_fill-blank'),
          ],
        },
        { content: 'Tout est lancé !' },
      );

      const result = await chatWithSources(client, messages, sourceContext);

      expect(result.toolCalls).toEqual([
        'generate_summary',
        'generate_quiz',
        'generate_flashcards',
      ]);
      const assistant = seen[1].messages.find((m) => m.role === 'assistant');
      expect(assistant.toolCalls.map((t: any) => t.id)).toEqual(['t1', 't2', 't3']);
      expect(toolAnswers(seen[1].messages)).toEqual(['t1', 't2', 't3']);
      expect(seen[1].toolChoice).toBe('none');
    });

    it('arrête après 3 tours d’outils : 4 appels au plus, le dernier en texte forcé', async () => {
      const { client, seen, complete } = scriptedClient(
        { content: '', toolCalls: [call('t1', 'generate_quiz')] },
        { content: '', toolCalls: [call('t2', 'generate_quiz')] },
        { content: '', toolCalls: [call('t3', 'generate_quiz')] },
        { content: 'Fini.' },
      );

      const result = await chatWithSources(client, messages, sourceContext);

      expect(complete).toHaveBeenCalledTimes(4);
      expect(seen.map((s) => s.toolChoice)).toEqual(['auto', 'auto', 'auto', 'none']);
      expect(result.toolCalls).toEqual(['generate_quiz']);
      expect(result.reply).toBe('Fini.');
    });

    it('extrait le texte d’une réponse en morceaux (le raisonnement est ignoré)', async () => {
      const { client } = scriptedClient(
        { content: '', toolCalls: [call('t1', 'generate_quiz')] },
        {
          content: [
            { type: 'thinking', thinking: [{ type: 'text', text: 'réflexion' }] },
            { type: 'text', text: 'Voici ' },
            { type: 'text', text: 'ton quiz !' },
          ],
        },
      );

      const result = await chatWithSources(client, messages, sourceContext);

      expect(result.reply).toBe('Voici ton quiz !');
    });

    it('garde le dernier texte non vide quand le tour final est vide', async () => {
      const { client } = scriptedClient(
        { content: 'Je te génère un quiz !', toolCalls: [call('t1', 'generate_quiz')] },
        { content: '' },
      );

      const result = await chatWithSources(client, messages, sourceContext);

      expect(result.reply).toBe('Je te génère un quiz !');
    });
  });
});
