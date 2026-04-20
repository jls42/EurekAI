import { describe, it, expect, vi } from 'vitest';
import { trackClient } from './tracked-client.js';
import type { ApiUsage } from './pricing.js';
import type { Mistral } from '@mistralai/mistralai';

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

  it('chat.complete with missing response.usage falls back to 0s', async () => {
    const client = makeFakeClient();
    client.chat.complete.mockResolvedValue({
      model: 'mistral-large-2512',
      choices: [{ message: { content: 'hi' } }],
      // no usage field
    });
    const captured: ApiUsage[] = [];
    trackClient(client, (u) => captured.push(u));

    await client.chat.complete({ model: 'mistral-large-latest', messages: [] });

    expect(captured).toHaveLength(1);
    expect(captured[0].promptTokens).toBe(0);
    expect(captured[0].completionTokens).toBe(0);
    expect(captured[0].totalTokens).toBe(0);
  });

  it('chat.complete with missing response.model falls back to request.model', async () => {
    const client = makeFakeClient();
    client.chat.complete.mockResolvedValue({
      // no model field
      usage: { promptTokens: 10, completionTokens: 5, totalTokens: 15 },
      choices: [{ message: { content: 'ok' } }],
    });
    const captured: ApiUsage[] = [];
    trackClient(client, (u) => captured.push(u));

    await client.chat.complete({ model: 'mistral-large-latest', messages: [] });

    expect(captured[0].model).toBe('mistral-large-latest');
  });

  it('chat.complete with missing both response.model and request.model falls back to empty string', async () => {
    const client = makeFakeClient();
    client.chat.complete.mockResolvedValue({
      usage: { promptTokens: 10, completionTokens: 5, totalTokens: 15 },
      choices: [{ message: { content: 'ok' } }],
    });
    const captured: ApiUsage[] = [];
    trackClient(client, (u) => captured.push(u));

    await client.chat.complete({ messages: [] });

    expect(captured[0].model).toBe('');
  });

  it('STT with missing usage.promptAudioSeconds reports undefined', async () => {
    const client = makeFakeClient();
    client.audio.transcriptions.complete.mockResolvedValue({
      model: 'voxtral-mini-2602',
      text: 'hello',
      usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
    });
    const captured: ApiUsage[] = [];
    trackClient(client, (u) => captured.push(u));

    await client.audio.transcriptions.complete({ model: 'voxtral-mini-latest', file: {} });

    expect(captured[0].promptAudioSeconds).toBeUndefined();
  });

  it('STT with missing response.model falls back to request.model', async () => {
    const client = makeFakeClient();
    client.audio.transcriptions.complete.mockResolvedValue({
      text: 'hello',
      usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0, promptAudioSeconds: 5 },
    });
    const captured: ApiUsage[] = [];
    trackClient(client, (u) => captured.push(u));

    await client.audio.transcriptions.complete({ model: 'voxtral-mini-latest', file: {} });

    expect(captured[0].model).toBe('voxtral-mini-latest');
  });

  it('OCR with missing response.usageInfo falls back to 0', async () => {
    const client = makeFakeClient();
    client.ocr.process.mockResolvedValue({
      model: 'mistral-ocr-2512',
      pages: [{ markdown: '# Doc' }],
      // no usageInfo field
    });
    const captured: ApiUsage[] = [];
    trackClient(client, (u) => captured.push(u));

    await client.ocr.process({ model: 'mistral-ocr-latest', document: {} });

    expect(captured[0].pagesProcessed).toBe(0);
  });

  it('OCR with missing response.model falls back to request.model', async () => {
    const client = makeFakeClient();
    client.ocr.process.mockResolvedValue({
      pages: [{ markdown: '# Doc' }],
      usageInfo: { pagesProcessed: 1, docSizeBytes: 512 },
    });
    const captured: ApiUsage[] = [];
    trackClient(client, (u) => captured.push(u));

    await client.ocr.process({ model: 'mistral-ocr-latest', document: {} });

    expect(captured[0].model).toBe('mistral-ocr-latest');
  });

  it('TTS with non-string input reports inputCharacters as 0', async () => {
    const client = makeFakeClient();
    const captured: ApiUsage[] = [];
    trackClient(client, (u) => captured.push(u));

    await client.audio.speech.complete({ model: 'voxtral-mini-tts-2603', input: 12345 });

    expect(captured[0].inputCharacters).toBe(0);
  });

  it('retries on 503 and calls onUsage once with final usage', async () => {
    vi.useFakeTimers();
    try {
      const client = makeFakeClient();
      const mockComplete = client.chat.complete;
      mockComplete
        .mockReset()
        .mockRejectedValueOnce(Object.assign(new Error('upstream'), { status: 503 }))
        .mockResolvedValueOnce({
          model: 'mistral-large-2512',
          usage: { promptTokens: 10, completionTokens: 20, totalTokens: 30 },
          choices: [{ message: { content: 'ok' } }],
        });
      const captured: ApiUsage[] = [];
      trackClient(client as unknown as Mistral, (u) => captured.push(u));

      const p = client.chat.complete({ model: 'mistral-large-latest', messages: [] });
      await vi.runAllTimersAsync();
      await p;

      expect(mockComplete).toHaveBeenCalledTimes(2);
      expect(captured).toHaveLength(1);
      expect(captured[0]).toEqual(
        expect.objectContaining({ promptTokens: 10, completionTokens: 20, totalTokens: 30 }),
      );
    } finally {
      vi.useRealTimers();
    }
  });

  it('Agent conversation with no response.usage does not call onUsage', async () => {
    const client = makeFakeClient();
    client.beta.conversations.start.mockResolvedValue({
      outputs: [{ type: 'message', content: 'result' }],
      // no usage field
    });
    const captured: ApiUsage[] = [];
    trackClient(client, (u) => captured.push(u));

    await client.beta.conversations.start({ agentId: 'agent-1', inputs: 'test' });

    expect(captured).toHaveLength(0);
  });
});
