import { readFileSync } from 'node:fs';
import { Mistral } from '@mistralai/mistralai';
import { timer } from '../helpers/index.js';

const OCR_MODEL = 'mistral-ocr-latest';

export async function ocrFile(
  client: Mistral,
  filePath: string,
  fileName: string,
): Promise<{ markdown: string; elapsed: number }> {
  const content = readFileSync(filePath);
  const stop = timer();

  // Upload (purpose="ocr" obligatoire, supporte JPG/PNG/PDF)
  const uploaded = await client.files.upload({
    file: { fileName, content: new Uint8Array(content) },
    purpose: 'ocr',
  });

  // OCR
  const ocrResult = await client.ocr.process({
    model: OCR_MODEL,
    document: { fileId: uploaded.id, type: 'file' },
  });

  const elapsed = stop();

  // Combiner toutes les pages
  const markdown = ocrResult.pages.map((p) => p.markdown).join('\n\n');

  // Cleanup fichier uploade
  try {
    await client.files.delete({ fileId: uploaded.id });
  } catch {}

  return { markdown, elapsed };
}
