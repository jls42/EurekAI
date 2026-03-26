import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { AppConfig } from './types.js';

const DEFAULT_CONFIG: AppConfig = {
  models: {
    summary: 'mistral-large-latest',
    flashcards: 'mistral-large-latest',
    quiz: 'mistral-large-latest',
    podcast: 'mistral-large-latest',
    translate: 'mistral-large-latest',
    ocr: 'mistral-ocr-latest',
    quizVerify: 'mistral-large-latest',
    chat: 'mistral-large-latest',
  },
  voices: {
    host: { id: 'JdwJ7jL68CWmQZuo7KgG', name: 'Voix info IA' },
    guest: { id: 'sANWqF1bCMzR6eyZbCGw', name: 'Marie' },
  },
  ttsModel: 'eleven_v3',
  ttsProvider: 'elevenlabs',
  mistralVoices: {
    host: 'Oliver',
    guest: 'Marie',
  },
};

let configPath: string;
let currentConfig: AppConfig;

export function initConfig(outputDir: string): void {
  mkdirSync(outputDir, { recursive: true });
  configPath = join(outputDir, 'config.json');

  if (existsSync(configPath)) {
    try {
      const saved = JSON.parse(readFileSync(configPath, 'utf-8'));
      currentConfig = {
        ...DEFAULT_CONFIG,
        ...saved,
        models: { ...DEFAULT_CONFIG.models, ...saved.models },
        voices: { ...DEFAULT_CONFIG.voices, ...saved.voices },
        mistralVoices: { ...DEFAULT_CONFIG.mistralVoices, ...saved.mistralVoices },
      };
    } catch {
      currentConfig = { ...DEFAULT_CONFIG };
    }
  } else {
    currentConfig = { ...DEFAULT_CONFIG };
  }
}

export function getConfig(): AppConfig {
  return currentConfig;
}

export function saveConfig(partial: Partial<AppConfig>): AppConfig {
  if (partial.models) {
    currentConfig.models = { ...currentConfig.models, ...partial.models };
  }
  if (partial.voices) {
    currentConfig.voices = { ...currentConfig.voices, ...partial.voices };
  }
  if (partial.ttsModel) {
    currentConfig.ttsModel = partial.ttsModel;
  }
  if (partial.ttsProvider) {
    currentConfig.ttsProvider = partial.ttsProvider;
  }
  if (partial.mistralVoices) {
    currentConfig.mistralVoices = { ...currentConfig.mistralVoices, ...partial.mistralVoices };
  }
  writeFileSync(configPath, JSON.stringify(currentConfig, null, 2));
  return currentConfig;
}

export function getApiStatus(): { mistral: boolean; elevenlabs: boolean; ttsAvailable: boolean } {
  const config = currentConfig ?? DEFAULT_CONFIG;
  const hasMistral = !!process.env.MISTRAL_API_KEY;
  const hasElevenlabs = !!process.env.ELEVENLABS_API_KEY;
  return {
    mistral: hasMistral,
    elevenlabs: hasElevenlabs,
    ttsAvailable: config.ttsProvider === 'mistral' ? hasMistral : hasElevenlabs,
  };
}
