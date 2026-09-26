import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { writeFile, readFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import ffmpegPath from 'ffmpeg-static';
import { textToSpeech, type TtsOptions } from './tts-provider.js';
import type { PodcastLine } from '../types.js';
import type { VoiceId } from '../helpers/voice-types.js';
import { logger } from '../helpers/logger.js';

const execFileAsync = promisify(execFile);

export interface TtsVoiceConfig {
  host: VoiceId;
  guest: VoiceId;
}

// Supprime le dossier temporaire ET son contenu, dans le `finally` des deux pipelines ffmpeg.
// `unlink` sur un dossier échoue toujours (EISDIR, erreur avalée) : les dossiers
// eurekai-mp3-* / eurekai-silence-* s'accumulaient dans le tmpdir. `force` : rien à signaler si
// le dossier a déjà disparu ; tout autre échec est journalisé sans masquer le résultat ni
// l'erreur ffmpeg.
const removeTmpDir = async (dir: string): Promise<void> => {
  await rm(dir, { recursive: true, force: true }).catch((e: unknown) => {
    logger.warn('tts', `temp dir cleanup failed: ${dir}`, e);
  });
};

// Arrow functions avoid a Codacy eslint-plugin-security-node crash in
// `security-node/detect-unhandled-async-errors` on async FunctionDeclaration nodes
// with TypeScript return annotations. Same workaround as generators/image.ts.
export const generateSilence = async (durationMs: number): Promise<Buffer> => {
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
    await removeTmpDir(tmpDir);
  }
};

export const concatMp3 = async (segments: Buffer[]): Promise<Buffer> => {
  if (segments.length === 1) return segments[0];

  const tmpDir = await mkdtemp(join(tmpdir(), 'eurekai-mp3-'));

  try {
    const segmentPaths: string[] = [];
    for (let i = 0; i < segments.length; i++) {
      const p = join(tmpDir, `seg_${i}.mp3`);
      await writeFile(p, segments[i]);
      segmentPaths.push(p);
    }

    const listPath = join(tmpDir, 'list.txt');
    await writeFile(listPath, segmentPaths.map((f) => `file '${f}'`).join('\n'));

    const outputPath = join(tmpDir, 'output.mp3');

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
    await removeTmpDir(tmpDir);
  }
};

// Retry avec backoff exponentiel pour absorber les glitches transient Mistral
// (empty audioData, timeout réseau, 5xx). 3 tentatives max, délais 200ms → 600ms.
// Au-delà, remonte l'erreur telle quelle — la route mappe en tts_upstream_error.
const MAX_TTS_RETRIES = 3;
const TTS_RETRY_BASE_DELAY_MS = 200;

const delay = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const textToSpeechWithRetry = async (
  text: string,
  voiceId: VoiceId,
  ttsOptions: TtsOptions,
): Promise<Buffer> => {
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
};

export const generateAudio = async (
  script: PodcastLine[],
  voices: TtsVoiceConfig,
  ttsOptions: TtsOptions,
): Promise<Buffer> => {
  const segments: Buffer[] = [];

  for (const line of script) {
    const voiceId = line.speaker === 'host' ? voices.host : voices.guest;
    const audioBytes = await textToSpeechWithRetry(line.text, voiceId, ttsOptions);
    segments.push(audioBytes);
  }

  return concatMp3(segments);
};
