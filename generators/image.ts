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
      if (c.fileId) return { type: 'fileId', value: String(c.fileId) };
      if (c.file_id) return { type: 'fileId', value: String(c.file_id) };
      if (c.imageUrl) return { type: 'url', value: String(c.imageUrl) };
      if (c.url) return { type: 'url', value: String(c.url) };
    }
  }
  return null;
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

    const response = await client.beta.conversations.start({
      agentId: agent.id,
      inputs: prompt,
    });

    const imageRef = extractImageRef(response.outputs);

    if (!imageRef) {
      console.error('    Image outputs:', JSON.stringify(response.outputs, null, 2).slice(0, 2000));
      throw new Error("Aucune image generee par l'agent");
    }

    if (imageRef.type === 'url') {
      return { imageUrl: imageRef.value, prompt };
    }

    console.log(`    Image fileId: ${imageRef.value}, downloading...`);
    const fileStream = await client.files.download({ fileId: imageRef.value });
    const imageBuffer = await collectStream(fileStream as any);

    const imageFilename = `illustration-${Date.now()}.png`;
    writeFileSync(join(projectDir, imageFilename), imageBuffer);
    const imageUrl = `/output/projects/${pid}/${imageFilename}`;
    console.log(`    Image saved: ${imageFilename} (${(imageBuffer.length / 1024).toFixed(0)} KB)`);

    return { imageUrl, prompt };
  } finally {
    await client.beta.agents.delete({ agentId: agent.id }).catch(() => {});
  }
}
