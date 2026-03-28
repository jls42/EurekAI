import { describe, it, expect, vi } from 'vitest';

vi.mock('../helpers/audio.js', () => ({
  collectStream: vi.fn().mockResolvedValue(Buffer.from('png-data')),
}));

vi.mock('node:fs', async (importOriginal) => {
  const orig = await importOriginal<typeof import('node:fs')>();
  return { ...orig, writeFileSync: vi.fn() };
});

vi.mock('../prompts.js', () => ({
  imageSystem: vi.fn().mockReturnValue('system instructions'),
  imageUser: vi.fn().mockReturnValue('user prompt'),
}));

import { generateImage } from './image.js';
import { writeFileSync } from 'node:fs';

function createClient(outputs: any[] = [{ content: [{ imageUrl: 'https://example.com/image.png' }] }]) {
  return {
    beta: {
      agents: {
        create: vi.fn().mockResolvedValue({ id: 'agent-img' }),
        delete: vi.fn().mockResolvedValue(undefined),
      },
      conversations: {
        start: vi.fn().mockResolvedValue({ outputs }),
      },
    },
    files: {
      download: vi.fn().mockResolvedValue(
        (async function* () {
          yield Buffer.from('png-data');
        })(),
      ),
    },
  } as any;
}

describe('generateImage', () => {
  it('creates agent, starts conversation, extracts image URL, and deletes agent', async () => {
    const client = createClient();
    const result = await generateImage(client, '# Test content', '/tmp/project', 'pid-1');

    expect(client.beta.agents.create).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'mistral-large-latest',
        name: 'Illustrator',
        tools: [{ type: 'image_generation' }],
      }),
    );
    expect(client.beta.conversations.start).toHaveBeenCalledWith({
      agentId: 'agent-img',
      inputs: 'user prompt',
    });
    expect(result.imageUrl).toBe('https://example.com/image.png');
    expect(client.beta.agents.delete).toHaveBeenCalledWith({ agentId: 'agent-img' });
  });

  it('downloads file when response has fileId instead of URL', async () => {
    const client = createClient([{ content: [{ fileId: 'file-abc' }] }]);
    const result = await generateImage(client, '# Content', '/tmp/project', 'pid-2');

    expect(client.files.download).toHaveBeenCalledWith({ fileId: 'file-abc' });
    expect(writeFileSync).toHaveBeenCalled();
    expect(result.imageUrl).toContain('/output/projects/pid-2/');
  });

  it('throws when no image found in outputs', async () => {
    const client = createClient([{ content: [{ text: 'No image here' }] }]);

    await expect(
      generateImage(client, '# Content', '/tmp/project', 'pid-3'),
    ).rejects.toThrow("Aucune image generee par l'agent");
  });

  it('cleans up agent even on error', async () => {
    const client = createClient();
    client.beta.conversations.start.mockRejectedValue(new Error('API error'));

    await expect(
      generateImage(client, '# Content', '/tmp/project', 'pid-4'),
    ).rejects.toThrow('API error');
    expect(client.beta.agents.delete).toHaveBeenCalledWith({ agentId: 'agent-img' });
  });
});
