import { readFileSync } from 'node:fs';
import { Mistral } from '@mistralai/mistralai';
import { timer } from '../helpers/index.js';
import type { OcrConfidence } from '../types.js';

const OCR_MODEL = 'mistral-ocr-latest';

export async function ocrFile(
  client: Mistral,
  filePath: string,
  fileName: string,
): Promise<{ markdown: string; elapsed: number; confidence?: OcrConfidence }> {
  const content = readFileSync(filePath);
  const stop = timer();

  // Upload (purpose="ocr" obligatoire, supporte JPG/PNG/PDF)
  const uploaded = await client.files.upload({
    file: { fileName, content: new Uint8Array(content) },
    purpose: 'ocr',
  });

  // OCR avec scores de confiance au niveau page
  const ocrResult = await client.ocr.process({
    model: OCR_MODEL,
    document: { fileId: uploaded.id, type: 'file' },
    confidenceScoresGranularity: 'page',
  });

  const elapsed = stop();

  // Combiner toutes les pages
  const markdown = ocrResult.pages.map((p) => p.markdown).join('\n\n');

  // Extraire les scores de confiance (graceful degradation)
  const confidence = extractConfidence(ocrResult.pages);

  // Cleanup fichier uploade
  try {
    await client.files.delete({ fileId: uploaded.id });
  } catch {}

  return { markdown, elapsed, confidence };
}

function extractConfidence(
  pages: Array<{ confidenceScores?: { averagePageConfidenceScore: number; minimumPageConfidenceScore: number } | null }>,
): OcrConfidence | undefined {
  const scored = pages.filter(
    (p) =>
      p.confidenceScores
      && Number.isFinite(p.confidenceScores.averagePageConfidenceScore)
      && Number.isFinite(p.confidenceScores.minimumPageConfidenceScore),
  );
  if (scored.length === 0) return undefined;
  const avg = scored.reduce((s, p) => s + p.confidenceScores!.averagePageConfidenceScore, 0) / scored.length;
  const min = Math.min(...scored.map((p) => p.confidenceScores!.minimumPageConfidenceScore));
  return { average: avg, minimum: min };
}
