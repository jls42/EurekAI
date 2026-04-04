import { describe, it, expect, vi } from 'vitest';
import { trackClient } from './tracked-client.js';
import type { ApiUsage } from './pricing.js';

function makeFakeClient() {
  return {
    chat: {
      complete: vi.fn().mockResolvedValue({
        model: 'mistral-large-2512',
        usage: { promptTokens: 100, completionTokens: 50, totalTokens: 150 },
        choices: [{ message: { content: 'hello' } }],
      }),
    },
    audio: {
      transcriptions: {
        complete: vi.fn().mockResolvedValue({
          model: 'voxtral-mini-2602',
          text: 'transcribed text',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0, promptAudioSeconds: 12.5 },
        }),
      },
      speech: {
        complete: vi.fn().mockResolvedValue({
          audioData: 'base64audio',
        }),
      },
    },
    ocr: {
      process: vi.fn().mockResolvedValue({
        model: 'mistral-ocr-2512',
        pages: [{ markdown: '# Hello' }],
        usageInfo: { pagesProcessed: 2, docSizeBytes: 1024 },
      }),
    },
    beta: {
      conversations: {
        start: vi.fn().mockResolvedValue({
          outputs: [{ type: 'message', content: 'result' }],
          usage: { promptTokens: 200, completionTokens: 150, totalTokens: 350 },
        }),
      },
    },
  } as any;
}

describe('trackClient', () => {
  it('captures chat.complete usage', async () => {
    const client = makeFakeClient();
    const captured: ApiUsage[] = [];
    trackClient(client, (u) => captured.push(u));

    await client.chat.complete({ model: 'mistral-large-latest', messages: [] });

    expect(captured).toHaveLength(1);
    expect(captured[0]).toEqual({
      promptTokens: 100,
      completionTokens: 50,
      totalTokens: 150,
      model: 'mistral-large-2512',
    });
  });

  it('captures STT usage with audio seconds', async () => {
    const client = makeFakeClient();
    const captured: ApiUsage[] = [];
    trackClient(client, (u) => captured.push(u));

    await client.audio.transcriptions.complete({ model: 'voxtral-mini-latest', file: {} });

    expect(captured).toHaveLength(1);
    expect(captured[0].promptAudioSeconds).toBe(12.5);
    expect(captured[0].model).toBe('voxtral-mini-2602');
  });

  it('captures OCR usage with pages processed', async () => {
    const client = makeFakeClient();
    const captured: ApiUsage[] = [];
    trackClient(client, (u) => captured.push(u));

    await client.ocr.process({ model: 'mistral-ocr-latest', document: {} });

    expect(captured).toHaveLength(1);
    expect(captured[0].pagesProcessed).toBe(2);
    expect(captured[0].model).toBe('mistral-ocr-2512');
  });

  it('captures TTS usage from input text length', async () => {
    const client = makeFakeClient();
    const captured: ApiUsage[] = [];
    trackClient(client, (u) => captured.push(u));

    await client.audio.speech.complete({ model: 'voxtral-mini-tts-2603', input: 'Hello world!' });

    expect(captured).toHaveLength(1);
    expect(captured[0].inputCharacters).toBe(12);
    expect(captured[0].model).toBe('voxtral-mini-tts-2603');
  });

  it('captures Agent conversation usage', async () => {
    const client = makeFakeClient();
    const captured: ApiUsage[] = [];
    trackClient(client, (u) => captured.push(u));

    await client.beta.conversations.start({ agentId: 'agent-1', inputs: 'test' });

    expect(captured).toHaveLength(1);
    expect(captured[0].promptTokens).toBe(200);
    expect(captured[0].completionTokens).toBe(150);
    expect(captured[0].model).toBe('mistral-large-latest');
  });

  it('returns original response unchanged', async () => {
    const client = makeFakeClient();
    trackClient(client, () => {});

    const response = await client.chat.complete({ model: 'mistral-large-latest', messages: [] });

    expect(response.choices[0].message.content).toBe('hello');
    expect(response.usage.promptTokens).toBe(100);
  });
});
