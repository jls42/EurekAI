import { Mistral } from '@mistralai/mistralai';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { collectStream } from '../helpers/audio.js';
import { imageSystem, imageUser } from '../prompts.js';
import type { AgeGroup } from '../types.js';

interface ImageResult {
  type: 'url' | 'fileId';
  value: string;
}

// Champs possibles renvoyés par l'API Mistral selon la variante de chunk
// (camelCase / snake_case / URL directe). Ordre = priorité de résolution.
const CHUNK_REF_FIELDS: ReadonlyArray<{ key: string; type: ImageResult['type'] }> = [
  { key: 'fileId', type: 'fileId' },
  { key: 'file_id', type: 'fileId' },
  { key: 'imageUrl', type: 'url' },
  { key: 'url', type: 'url' },
];

export function parseChunkRef(c: Record<string, unknown>): ImageResult | null {
  for (const { key, type } of CHUNK_REF_FIELDS) {
    const raw = c[key];
    if (raw) return { type, value: `${raw}` }; // NOSONAR(S6551) — always string from Mistral API
  }
  return null;
}

export function extractImageRef(outputs: unknown[]): ImageResult | null {
  for (const output of outputs) {
    const o = output as Record<string, unknown>;
    if (!Array.isArray(o.content)) continue;
    for (const chunk of o.content) {
      const ref = parseChunkRef(chunk as Record<string, unknown>);
      if (ref) return ref;
    }
  }
  return null;
}

async function downloadAndSaveImage(
  client: Mistral,
  fileId: string,
  projectDir: string,
  pid: string,
): Promise<string> {
  console.log(`    Image fileId: ${fileId}, downloading...`);
  const fileStream = await client.files.download({ fileId });
  const imageBuffer = await collectStream(fileStream as Parameters<typeof collectStream>[0]);
  const imageFilename = `illustration-${Date.now()}.png`;
  writeFileSync(join(projectDir, imageFilename), imageBuffer);
  console.log(`    Image saved: ${imageFilename} (${(imageBuffer.length / 1024).toFixed(0)} KB)`);
  return `/output/projects/${pid}/${imageFilename}`;
}

export async function generateImage(
  client: Mistral,
  markdown: string,
  projectDir: string,
  pid: string,
  lang: string = 'fr',
  ageGroup: AgeGroup = 'enfant',
): Promise<{ imageUrl: string; prompt: string }> {
  const agent = await client.beta.agents.create({
    model: 'mistral-large-latest',
    name: 'Illustrator',
    instructions: imageSystem(lang, ageGroup),
    tools: [{ type: 'image_generation' }],
    completionArgs: { temperature: 0.3, topP: 0.95 },
  });

  try {
    const prompt = imageUser(lang, markdown);
    const response = await client.beta.conversations.start({ agentId: agent.id, inputs: prompt });
    const imageRef = extractImageRef(response.outputs);

    if (!imageRef) {
      console.error('    Image outputs:', JSON.stringify(response.outputs, null, 2).slice(0, 2000));
      throw new Error("Aucune image generee par l'agent");
    }

    const imageUrl =
      imageRef.type === 'url'
        ? imageRef.value
        : await downloadAndSaveImage(client, imageRef.value, projectDir, pid);
    return { imageUrl, prompt };
  } finally {
    await client.beta.agents.delete({ agentId: agent.id }).catch(() => {});
  }
}
