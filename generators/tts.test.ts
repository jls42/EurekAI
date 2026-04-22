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

import { generateAudio, generateSilence, concatMp3 } from './tts.js';
import { textToSpeech } from './tts-provider.js';
import { execFile } from 'node:child_process';
import { mkdtemp, readFile, unlink } from 'node:fs/promises';
import type { TtsOptions } from './tts-provider.js';
import type { PodcastLine } from '../types.js';
import { asVoiceId } from '../helpers/voice-types.js';

const ttsOptions: TtsOptions = {
  model: 'voxtral-mini-tts-2603',
  mistralClient: {} as any,
};

const voices = { host: asVoiceId('host-voice-id'), guest: asVoiceId('guest-voice-id') };

describe('generateSilence', () => {
  it('calls ffmpeg with correct args and returns buffer', async () => {
    vi.mocked(execFile).mockClear();
    vi.mocked(mkdtemp).mockClear();
    vi.mocked(readFile).mockClear();

    const result = await generateSilence(1200);

    expect(mkdtemp).toHaveBeenCalled();
    expect(execFile).toHaveBeenCalled();
    const args = vi.mocked(execFile).mock.calls[0][1] as string[];
    expect(args).toContain('anullsrc=r=44100:cl=mono');
    expect(args).toContain('1.2');
    expect(args).toContain('libmp3lame');
    expect(result).toBeInstanceOf(Buffer);
  });

  it('cleans up temp files in finally block', async () => {
    vi.mocked(unlink).mockClear();

    await generateSilence(500);

    // unlink called for output file + tmpDir
    expect(unlink).toHaveBeenCalledTimes(2);
  });
});

describe('concatMp3', () => {
  it('returns single segment directly without ffmpeg', async () => {
    const buf = Buffer.from('single');
    const result = await concatMp3([buf]);
    expect(result).toBe(buf);
  });
});

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

  it('retry sur transient empty audioData: 1 fail -> success, 1 seule ligne réussie', async () => {
    // Une ligne transient-fail (1re tentative) suivie d'un succès doit donner 2 appels
    // textToSpeech pour cette ligne (mais un seul segment dans l'output final).
    const ttsError = Object.assign(new Error('mistral_tts_empty_response'), { stage: 'tts' });
    vi.mocked(textToSpeech)
      .mockReset()
      .mockRejectedValueOnce(ttsError)
      .mockResolvedValueOnce(Buffer.from('retry-success'));

    const script: PodcastLine[] = [{ speaker: 'host', text: 'flaky-line' }];
    const result = await generateAudio(script, voices, ttsOptions);

    expect(textToSpeech).toHaveBeenCalledTimes(2); // 1 fail + 1 success
    expect(result.toString()).toBe('retry-success');
  });

  it('retry: 3 failures consécutives remontent la dernière erreur (max 3 attempts)', async () => {
    const ttsError = Object.assign(new Error('mistral_tts_empty_response'), { stage: 'tts' });
    vi.mocked(textToSpeech).mockReset().mockRejectedValue(ttsError);

    const script: PodcastLine[] = [{ speaker: 'host', text: 'always-fails' }];

    await expect(generateAudio(script, voices, ttsOptions)).rejects.toBe(ttsError);
    expect(textToSpeech).toHaveBeenCalledTimes(3); // 3 tentatives max
    // .stage='tts' preservé sur l'erreur remontée -> mappage tts_upstream_error OK.

    // Restore default mock for other tests
    vi.mocked(textToSpeech).mockReset().mockResolvedValue(Buffer.from('segment-audio'));
  });
});
