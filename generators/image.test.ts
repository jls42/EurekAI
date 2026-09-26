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

const { loggerWarn } = vi.hoisted(() => ({ loggerWarn: vi.fn() }));
vi.mock('../helpers/logger.js', () => ({
  logger: { info: vi.fn(), warn: loggerWarn, error: vi.fn() },
}));

import { generateImage } from './image.js';
import { writeFileSync } from 'node:fs';
import { runWithMediaLedger } from '../helpers/media-ledger.js';

function createClient(
  outputs: any[] = [{ content: [{ imageUrl: 'https://example.com/image.png' }] }],
) {
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
      delete: vi.fn().mockResolvedValue({ id: 'file-abc', deleted: true }),
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
    // Nom unique (horodatage + suffixe aléatoire) : deux illustrations de la même ms ne
    // s'écrasent plus.
    expect(result.imageUrl).toMatch(
      /^\/output\/projects\/pid-2\/illustration-\d+-[0-9a-f]{8}\.png$/,
    );
  });

  it('throws when no image found in outputs', async () => {
    const client = createClient([{ content: [{ text: 'No image here' }] }]);

    await expect(generateImage(client, '# Content', '/tmp/project', 'pid-3')).rejects.toThrow(
      "Aucune image generee par l'agent",
    );
  });

  it('cleans up agent even on error', async () => {
    const client = createClient();
    client.beta.conversations.start.mockRejectedValue(new Error('API error'));

    await expect(generateImage(client, '# Content', '/tmp/project', 'pid-4')).rejects.toThrow(
      'API error',
    );
    expect(client.beta.agents.delete).toHaveBeenCalledWith({ agentId: 'agent-img' });
  });
});

describe('generateImage — fichier Mistral et registre des médias', () => {
  const FILE_OUTPUTS = [{ content: [{ fileId: 'file-abc' }] }];

  it('supprime le fichier généré chez Mistral après son téléchargement', async () => {
    const client = createClient(FILE_OUTPUTS);

    await generateImage(client, '# Content', '/tmp/project', 'pid-5');

    expect(client.files.delete).toHaveBeenCalledWith({ fileId: 'file-abc' });
    expect(client.files.delete.mock.invocationCallOrder[0]).toBeGreaterThan(
      client.files.download.mock.invocationCallOrder[0],
    );
  });

  it('échec de files.delete toléré : image renvoyée, avertissement journalisé', async () => {
    loggerWarn.mockClear();
    const client = createClient(FILE_OUTPUTS);
    client.files.delete.mockRejectedValue(new Error('delete failed'));

    const result = await generateImage(client, '# Content', '/tmp/project', 'pid-6');

    expect(result.imageUrl).toMatch(/^\/output\/projects\/pid-6\/illustration-/);
    expect(loggerWarn).toHaveBeenCalledWith(
      'image',
      expect.stringContaining('file-abc'),
      expect.any(Error),
    );
  });

  it('téléchargement en échec : fichier Mistral supprimé quand même, erreur propagée', async () => {
    const client = createClient(FILE_OUTPUTS);
    client.files.download.mockRejectedValue(new Error('download failed'));

    await expect(generateImage(client, '# Content', '/tmp/project', 'pid-7')).rejects.toThrow(
      'download failed',
    );
    expect(client.files.delete).toHaveBeenCalledWith({ fileId: 'file-abc' });
  });

  it('inscrit l’illustration écrite au registre de la génération', async () => {
    const client = createClient(FILE_OUTPUTS);

    const { result, mediaUrls } = await runWithMediaLedger('/tmp/project', 'pid-8', () =>
      generateImage(client, '# Content', '/tmp/project', 'pid-8'),
    );

    expect(mediaUrls).toEqual([result.imageUrl]);
  });

  it('URL externe : rien à supprimer chez Mistral, rien d’inscrit au registre', async () => {
    const client = createClient();

    const { mediaUrls } = await runWithMediaLedger('/tmp/project', 'pid-9', () =>
      generateImage(client, '# Content', '/tmp/project', 'pid-9'),
    );

    expect(mediaUrls).toEqual([]);
    expect(client.files.delete).not.toHaveBeenCalled();
  });
});
