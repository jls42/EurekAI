#!/usr/bin/env npx tsx
/**
 * Générateur d'images (Gemini Image API)
 * Usage: npx tsx scripts/generate-image.ts "votre prompt" [options]
 *
 * Options:
 *   --output, -o    Nom du fichier de sortie (défaut: generated_image.png)
 *   --ratio, -r     Ratio: 1:1, 16:9, 9:16, 4:3, 3:4, etc. (défaut: 1:1)
 *   --model, -m     flash ou pro (défaut: flash)
 */

import { GoogleGenAI } from '@google/genai';
import * as fs from 'node:fs';
import * as path from 'node:path';

const envPath = path.resolve(import.meta.dirname, '../.env');
if (fs.existsSync(envPath)) {
  process.loadEnvFile(envPath);
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('Erreur: GEMINI_API_KEY non définie. Ajoutez-la dans votre .env');
  process.exit(1);
}

const VALID_RATIOS = ['1:1', '2:3', '3:2', '3:4', '4:3', '4:5', '5:4', '9:16', '16:9', '21:9'];
const MODELS: Record<string, string> = {
  flash: 'gemini-3.1-flash-image-preview',
  pro: 'gemini-3-pro-image-preview',
};

type ParsedOptions = {
  prompt: string;
  output: string;
  ratio: string;
  model: keyof typeof MODELS;
};

const FLAG_MAP: Record<string, keyof ParsedOptions> = {
  '-o': 'output',
  '--output': 'output',
  '-r': 'ratio',
  '--ratio': 'ratio',
  '-m': 'model',
  '--model': 'model',
};

export function parseArgs(): ParsedOptions {
  const args = process.argv.slice(2);
  const options: ParsedOptions = {
    prompt: '',
    output: 'generated_image.png',
    ratio: '1:1',
    model: 'flash',
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const key = FLAG_MAP[arg];
    if (key) {
      (options[key] as string) = args[++i];
    } else if (!arg.startsWith('-')) {
      options.prompt = arg;
    }
  }

  return options;
}

export async function requestImage(
  ai: GoogleGenAI,
  modelId: string,
  prompt: string,
  ratio: string,
) {
  return ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      responseModalities: ['TEXT', 'IMAGE'],
      imageConfig: { aspectRatio: ratio },
    },
  });
}

export function savePartAsImage(part: unknown, output: string): boolean {
  if (typeof part !== 'object' || part === null || !('inlineData' in part)) return false;
  const inline = (part as { inlineData?: { data?: string } }).inlineData;
  if (!inline?.data) return false;

  const buffer = Buffer.from(inline.data, 'base64');
  const dir = path.dirname(output);
  if (dir && !fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(output, buffer);
  console.log(`\n  Image sauvegardée: ${output}`);
  return true;
}

export function logTextPart(part: unknown): void {
  if (typeof part === 'object' && part !== null && 'text' in part) {
    const text = (part as { text?: string }).text;
    if (text) console.log(`\n  Réponse: ${text}`);
  }
}

export async function generateImage(
  prompt: string,
  output: string,
  ratio: string,
  model: string,
): Promise<boolean> {
  if (!VALID_RATIOS.includes(ratio)) {
    console.error(`Erreur: Ratio invalide '${ratio}'. Valides: ${VALID_RATIOS.join(', ')}`);
    process.exit(1);
  }

  const modelId = MODELS[model] || MODELS.flash;
  const preview = prompt.slice(0, 80) + (prompt.length > 80 ? '...' : '');
  console.log(`\nGénération en cours...`);
  console.log(`  Prompt: ${preview}`);
  console.log(`  Modèle: ${modelId}`);
  console.log(`  Ratio: ${ratio}`);

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const response = await requestImage(ai, modelId, prompt, ratio);
  const parts = response.candidates?.[0]?.content?.parts || [];

  for (const part of parts) {
    logTextPart(part);
    if (savePartAsImage(part, output)) return true;
  }

  console.error('Erreur: Aucune image générée');
  return false;
}

const { prompt, output, ratio, model } = parseArgs();

if (!prompt) {
  console.log(`
Générateur d'images (Gemini)

Usage: npx tsx scripts/generate-image.ts "votre prompt" [options]

Options:
  -o, --output  Fichier de sortie (défaut: generated_image.png)
  -r, --ratio   Ratio: ${VALID_RATIOS.join(', ')} (défaut: 1:1)
  -m, --model   flash, pro (défaut: flash)

Modèles:
  flash      gemini-3.1-flash-image-preview (rapide, stable)
  pro        gemini-3-pro-image-preview (meilleure qualité)

Exemples:
  npx tsx scripts/generate-image.ts "Un chat cosmique" -o image.png
  npx tsx scripts/generate-image.ts "Diagramme architecture" -r 16:9 -m pro
`);
  process.exit(0);
}

try {
  const success = await generateImage(prompt, output, ratio, model);
  process.exit(success ? 0 : 1);
} catch (error) {
  console.error('Erreur:', error instanceof Error ? error.message : error);
  process.exit(1);
}
