import { describe, it, expect, vi } from 'vitest';

vi.mock('./tts-provider.js', () => ({
  textToSpeech: vi.fn().mockResolvedValue(Buffer.from('segment-audio')),
}));

vi.mock('node:child_process', () => ({
  execFile: vi.fn((_cmd: any, _args: any, cb: any) => {
    if (typeof cb === 'function') cb(null, '', '');
  }),
}));

vi.mock('node:fs/promises', async (importOriginal) => {
  const orig = await importOriginal<typeof import('node:fs/promises')>();
  return {
    ...orig,
    mkdtemp: vi.fn().mockResolvedValue('/tmp/eurekai-mp3-test'),
    writeFile: vi.fn().mockResolvedValue(undefined),
    readFile: vi.fn().mockResolvedValue(Buffer.from('concatenated-audio')),
    unlink: vi.fn().mockResolvedValue(undefined),
  };
});

import { generateAudio } from './tts.js';
import { textToSpeech } from './tts-provider.js';
import type { TtsOptions } from './tts-provider.js';
import type { PodcastLine } from '../types.js';

const ttsOptions: TtsOptions = {
  provider: 'mistral',
  model: 'voxtral-mini-tts-2603',
  mistralClient: {} as any,
};

const voices = { host: 'host-voice-id', guest: 'guest-voice-id' };

describe('generateAudio', () => {
  it('returns audio buffer directly for a single-line script (no ffmpeg)', async () => {
    const script: PodcastLine[] = [{ speaker: 'host', text: 'Bienvenue au podcast' }];

    const result = await generateAudio(script, voices, ttsOptions);

    expect(textToSpeech).toHaveBeenCalledTimes(1);
    expect(textToSpeech).toHaveBeenCalledWith('Bienvenue au podcast', 'host-voice-id', ttsOptions);
    expect(result).toBeInstanceOf(Buffer);
    expect(result.toString()).toBe('segment-audio');
  });

  it('maps host speaker to host voice ID', async () => {
    const script: PodcastLine[] = [{ speaker: 'host', text: 'Host line' }];

    await generateAudio(script, voices, ttsOptions);

    expect(textToSpeech).toHaveBeenCalledWith('Host line', 'host-voice-id', ttsOptions);
  });

  it('maps guest speaker to guest voice ID', async () => {
    const script: PodcastLine[] = [{ speaker: 'guest', text: 'Guest line' }];

    await generateAudio(script, voices, ttsOptions);

    expect(textToSpeech).toHaveBeenCalledWith('Guest line', 'guest-voice-id', ttsOptions);
  });

  it('calls textToSpeech for each line in a multi-line script', async () => {
    vi.mocked(textToSpeech).mockClear();
    const script: PodcastLine[] = [
      { speaker: 'host', text: 'Line 1' },
      { speaker: 'guest', text: 'Line 2' },
      { speaker: 'host', text: 'Line 3' },
    ];

    await generateAudio(script, voices, ttsOptions);

    expect(textToSpeech).toHaveBeenCalledTimes(3);
    expect(textToSpeech).toHaveBeenNthCalledWith(1, 'Line 1', 'host-voice-id', ttsOptions);
    expect(textToSpeech).toHaveBeenNthCalledWith(2, 'Line 2', 'guest-voice-id', ttsOptions);
    expect(textToSpeech).toHaveBeenNthCalledWith(3, 'Line 3', 'host-voice-id', ttsOptions);
  });
});
