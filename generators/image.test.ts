import { describe, it, expect, vi, afterEach } from 'vitest';

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
import { collectStream } from '../helpers/audio.js';
import { runWithMediaLedger } from '../helpers/media-ledger.js';
import { logger } from '../helpers/logger.js';

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
    // store: false : Mistral ne garde pas la conversation (texte de la leçon) sur ses serveurs.
    expect(client.beta.conversations.start).toHaveBeenCalledWith({
      agentId: 'agent-img',
      inputs: 'user prompt',
      store: false,
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

  // L'agent renvoie du JPEG (mesuré au release-test du 2026-10-04 : JFIF 1024×768), enregistré
  // jusqu'ici en .png et donc servi en image/png : l'extension suit les octets de tête.
  it('enregistre une image JPEG en .jpg', async () => {
    const jpeg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46]);
    vi.mocked(collectStream).mockResolvedValueOnce(jpeg);
    const client = createClient([{ content: [{ fileId: 'file-jpg' }] }]);
    const result = await generateImage(client, '# Content', '/tmp/project', 'pid-jpg');

    expect(result.imageUrl).toMatch(
      /^\/output\/projects\/pid-jpg\/illustration-\d+-[0-9a-f]{8}\.jpg$/,
    );
    const savedPath = vi.mocked(writeFileSync).mock.calls.at(-1)?.[0];
    expect(String(savedPath)).toMatch(/illustration-\d+-[0-9a-f]{8}\.jpg$/);
  });

  it('garde .png pour une image PNG', async () => {
    const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    vi.mocked(collectStream).mockResolvedValueOnce(png);
    const client = createClient([{ content: [{ fileId: 'file-png' }] }]);
    const result = await generateImage(client, '# Content', '/tmp/project', 'pid-png');

    expect(result.imageUrl).toMatch(/^\/output\/projects\/pid-png\/illustration-.+\.png$/);
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

describe('generateImage — plusieurs images renvoyées par l’agent', () => {
  it('garde la première, supprime tous les fichiers chez Mistral et journalise le surcoût', async () => {
    loggerWarn.mockClear();
    const client = createClient([
      { content: [{ fileId: 'file-1' }] },
      { content: [{ text: 'Voici ton image' }, { fileId: 'file-2' }] },
    ]);

    const result = await generateImage(client, '# Content', '/tmp/project', 'pid-10');

    expect(client.files.download).toHaveBeenCalledTimes(1);
    expect(client.files.download).toHaveBeenCalledWith({ fileId: 'file-1' });
    expect(result.imageUrl).toMatch(/^\/output\/projects\/pid-10\/illustration-/);
    expect(client.files.delete).toHaveBeenCalledWith({ fileId: 'file-1' });
    expect(client.files.delete).toHaveBeenCalledWith({ fileId: 'file-2' });
    expect(loggerWarn).toHaveBeenCalledWith('image', expect.stringContaining('2 images'));
  });

  it('même fichier cité deux fois : un seul téléchargement, une seule suppression, pas d’alerte', async () => {
    loggerWarn.mockClear();
    const client = createClient([
      { content: [{ fileId: 'file-1' }] },
      { content: [{ file_id: 'file-1' }] },
    ]);

    await generateImage(client, '# Content', '/tmp/project', 'pid-11');

    expect(client.files.download).toHaveBeenCalledTimes(1);
    expect(client.files.delete).toHaveBeenCalledTimes(1);
    expect(loggerWarn).not.toHaveBeenCalled();
  });

  it('URL puis fichier : URL gardée, fichier supplémentaire supprimé chez Mistral', async () => {
    const client = createClient([
      { content: [{ imageUrl: 'https://example.com/a.png' }, { fileId: 'file-3' }] },
    ]);

    const result = await generateImage(client, '# Content', '/tmp/project', 'pid-12');

    expect(result.imageUrl).toBe('https://example.com/a.png');
    expect(client.files.download).not.toHaveBeenCalled();
    expect(client.files.delete).toHaveBeenCalledWith({ fileId: 'file-3' });
  });

  it('téléchargement de la première en échec : les fichiers supplémentaires sont supprimés quand même', async () => {
    const client = createClient([{ content: [{ fileId: 'file-1' }, { fileId: 'file-2' }] }]);
    client.files.download.mockRejectedValue(new Error('download failed'));

    await expect(generateImage(client, '# Content', '/tmp/project', 'pid-13')).rejects.toThrow(
      'download failed',
    );
    expect(client.files.delete).toHaveBeenCalledWith({ fileId: 'file-1' });
    expect(client.files.delete).toHaveBeenCalledWith({ fileId: 'file-2' });
  });
});

// Réponse réelle d'un réessai (historiques Mistral des 2026-09-26 et 27) : l'outil expire au bout
// de 30 s côté Mistral, l'agent le rappelle, seule la dernière tentative produit une image. Chaque
// appel est compté dans le coût (`usage.connectors`).
describe('generateImage — tentatives de l’outil sans image', () => {
  const TIMEOUT = 'Tool call timed out. Please try again.';
  const toolCall = (result: string) => ({
    type: 'tool.execution',
    name: 'image_generation',
    arguments: '{"prompt": "un volcan"}',
    info: { result },
  });
  const SUCCESS = toolCall('{"url": "https://blob.example/image.jpg?sig=secret"}');
  const imageOutput = (fileId: string) => ({
    type: 'message.output',
    content: [{ type: 'tool_file', fileId }],
  });

  it('journalise les tentatives sans image avec leur motif, sans l’URL signée du succès', async () => {
    loggerWarn.mockClear();
    const client = createClient([
      toolCall(TIMEOUT),
      toolCall(TIMEOUT),
      SUCCESS,
      imageOutput('file-1'),
    ]);

    const result = await generateImage(client, '# Content', '/tmp/project', 'pid-14');

    expect(result.imageUrl).toMatch(/^\/output\/projects\/pid-14\/illustration-/);
    expect(loggerWarn).toHaveBeenCalledTimes(1);
    const message = String(loggerWarn.mock.calls[0][1]);
    expect(loggerWarn.mock.calls[0][0]).toBe('image');
    expect(message).toContain('3 appels');
    expect(message).toContain('2 tentatives sans image');
    expect(message).toContain(TIMEOUT);
    expect(message).not.toContain('https://');
    expect(message).not.toContain('sig=secret');
  });

  it('un appel, une image : aucun avertissement', async () => {
    loggerWarn.mockClear();
    const client = createClient([SUCCESS, imageOutput('file-1')]);

    await generateImage(client, '# Content', '/tmp/project', 'pid-15');

    expect(loggerWarn).not.toHaveBeenCalled();
  });

  it('autant d’images que d’appels : seul l’avertissement des images en trop', async () => {
    loggerWarn.mockClear();
    const client = createClient([SUCCESS, imageOutput('file-1'), SUCCESS, imageOutput('file-2')]);

    await generateImage(client, '# Content', '/tmp/project', 'pid-16');

    expect(loggerWarn).toHaveBeenCalledTimes(1);
    expect(loggerWarn).toHaveBeenCalledWith('image', expect.stringContaining('2 images'));
  });

  it('motif absent ou illisible : tentatives comptées quand même', async () => {
    loggerWarn.mockClear();
    const noInfo = { type: 'tool.execution', name: 'image_generation', arguments: '{}' };
    const client = createClient([noInfo, SUCCESS, imageOutput('file-1')]);

    await generateImage(client, '# Content', '/tmp/project', 'pid-17');

    expect(loggerWarn).toHaveBeenCalledWith(
      'image',
      expect.stringContaining('1 tentative sans image'),
    );
  });
});

// Format réel de l'outil au release-test du 2026-10-10 : URL signée dans le résultat de l'appel,
// message final en simple texte, plus aucun fichier dans l'API Files.
describe("generateImage — URL signée de l'outil (format d'octobre 2026)", () => {
  const SIGNED =
    'https://mistralaiblackforestprod.blob.core.windows.net/images/blackforest/38de/img.jpeg?sig=abc';
  const outputsWith = (url: string) => [
    { type: 'tool.execution', name: 'image_generation', info: { result: JSON.stringify({ url }) } },
    {
      type: 'message.output',
      role: 'assistant',
      content: "Voici une illustration du cycle de l'eau.",
    },
  ];
  const jpeg = Uint8Array.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("télécharge l'image et l'enregistre dans le projet (jamais l'URL signée, qui expire)", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(jpeg, { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const client = createClient(outputsWith(SIGNED));
    const result = await generateImage(client, '# Contenu', '/tmp/project', 'pid-url');
    expect(fetchMock).toHaveBeenCalledWith(SIGNED, expect.objectContaining({ redirect: 'error' }));
    expect(result.imageUrl).toMatch(
      /^\/output\/projects\/pid-url\/illustration-\d+-[0-9a-f]{8}\.jpg$/,
    );
    expect(writeFileSync).toHaveBeenCalled();
    expect(client.files.download).not.toHaveBeenCalled();
  });

  it('refuse un autre hôte que le stockage de Mistral, sans le contacter', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const client = createClient(outputsWith('https://evil.example.com/img.jpeg'));
    await expect(generateImage(client, '# Contenu', '/tmp/project', 'pid-x')).rejects.toThrow(
      "Hôte d'image refusé",
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sans image, journalise la forme de la réponse, jamais son texte ni une URL', async () => {
    const client = createClient([
      { type: 'message.output', content: 'Pas d’image ici : https://x.example/y' },
    ]);
    await expect(generateImage(client, '# Contenu', '/tmp/project', 'pid-y')).rejects.toThrow(
      "Aucune image generee par l'agent",
    );
    const [, message] = vi.mocked(logger.error).mock.calls.at(-1) ?? [];
    expect(message).toContain('message.output(texte)');
    expect(message).not.toContain('https');
  });
});
