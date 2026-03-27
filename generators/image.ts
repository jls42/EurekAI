import { Mistral } from '@mistralai/mistralai';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { collectStream } from '../helpers/audio.js';
import { imageSystem, imageUser } from '../prompts.js';

interface ImageResult {
  type: 'url' | 'fileId';
  value: string;
}

function extractImageRef(outputs: any[]): ImageResult | null {
  for (const output of outputs) {
    const o = output as Record<string, unknown>;
    if (!Array.isArray(o.content)) continue;
    for (const chunk of o.content) {
      const c = chunk as Record<string, unknown>;
      if (c.fileId) return { type: 'fileId', value: `${c.fileId}` }; // NOSONAR(S6551) — fileId is always string from Mistral API
      if (c.file_id) return { type: 'fileId', value: `${c.file_id}` }; // NOSONAR(S6551) — file_id is always string from Mistral API
      if (c.imageUrl) return { type: 'url', value: `${c.imageUrl}` }; // NOSONAR(S6551) — imageUrl is always string from Mistral API
      if (c.url) return { type: 'url', value: `${c.url}` }; // NOSONAR(S6551) — url is always string from Mistral API
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
  const imageBuffer = await collectStream(fileStream as any);
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
  ageGroup: string = 'enfant',
): Promise<{ imageUrl: string; prompt: string }> {
  const agent = await client.beta.agents.create({
    model: 'mistral-large-latest',
    name: 'Illustrator',
    instructions: imageSystem(lang, ageGroup as any),
    tools: [{ type: 'image_generation' } as any],
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
