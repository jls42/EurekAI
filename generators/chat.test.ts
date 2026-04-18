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
});
