import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { writeFile, readFile, unlink, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import ffmpegPath from 'ffmpeg-static';
import { textToSpeech, type TtsOptions } from './tts-provider.js';
import type { PodcastLine } from '../types.js';
import type { VoiceId } from '../helpers/voice-types.js';

const execFileAsync = promisify(execFile);

export interface TtsVoiceConfig {
  host: VoiceId;
  guest: VoiceId;
}

export async function generateSilence(durationMs: number): Promise<Buffer> {
  const tmpDir = await mkdtemp(join(tmpdir(), 'eurekai-silence-'));
  const outputPath = join(tmpDir, 'silence.mp3');
  try {
    await execFileAsync(ffmpegPath as string, [
      '-y',
      '-f',
      'lavfi',
      '-i',
      'anullsrc=r=44100:cl=mono',
      '-t',
      String(durationMs / 1000),
      '-c:a',
      'libmp3lame',
      '-b:a',
      '128k',
      outputPath,
    ]);
    return await readFile(outputPath);
  } finally {
    await unlink(outputPath).catch(() => {});
    await unlink(tmpDir).catch(() => {});
  }
}

export async function concatMp3(segments: Buffer[]): Promise<Buffer> {
  if (segments.length === 1) return segments[0];

  const tmpDir = await mkdtemp(join(tmpdir(), 'eurekai-mp3-'));
  const tempFiles: string[] = [];

  try {
    for (let i = 0; i < segments.length; i++) {
      const p = join(tmpDir, `seg_${i}.mp3`);
      await writeFile(p, segments[i]);
      tempFiles.push(p);
    }

    const listPath = join(tmpDir, 'list.txt');
    await writeFile(listPath, tempFiles.map((f) => `file '${f}'`).join('\n'));
    tempFiles.push(listPath);

    const outputPath = join(tmpDir, 'output.mp3');
    tempFiles.push(outputPath);

    await execFileAsync(ffmpegPath as string, [
      '-y',
      '-f',
      'concat',
      '-safe',
      '0',
      '-i',
      listPath,
      '-c',
      'copy',
      '-write_xing',
      '1',
      outputPath,
    ]);

    return await readFile(outputPath);
  } finally {
    await Promise.all(tempFiles.map((f) => unlink(f).catch(() => {})));
    await unlink(tmpDir).catch(() => {});
  }
}

// Retry avec backoff exponentiel pour absorber les glitches transient Mistral
// (empty audioData, timeout réseau, 5xx). 3 tentatives max, délais 200ms → 600ms.
// Au-delà, remonte l'erreur telle quelle — la route mappe en tts_upstream_error.
const MAX_TTS_RETRIES = 3;
const TTS_RETRY_BASE_DELAY_MS = 200;

const delay = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

async function textToSpeechWithRetry(
  text: string,
  voiceId: VoiceId,
  ttsOptions: TtsOptions,
): Promise<Buffer> {
  let lastErr: unknown;
  for (let attempt = 0; attempt < MAX_TTS_RETRIES; attempt++) {
    try {
      return await textToSpeech(text, voiceId, ttsOptions);
    } catch (e) {
      lastErr = e;
      if (attempt < MAX_TTS_RETRIES - 1) {
        await delay(TTS_RETRY_BASE_DELAY_MS * Math.pow(2, attempt));
      }
    }
  }
  throw lastErr;
}

export async function generateAudio(
  script: PodcastLine[],
  voices: TtsVoiceConfig,
  ttsOptions: TtsOptions,
): Promise<Buffer> {
  const segments: Buffer[] = [];

  for (const line of script) {
    const voiceId = line.speaker === 'host' ? voices.host : voices.guest;
    const audioBytes = await textToSpeechWithRetry(line.text, voiceId, ttsOptions);
    segments.push(audioBytes);
  }

  return concatMp3(segments);
}
