import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { Mistral } from '@mistralai/mistralai';
import { logger } from '../helpers/logger.js';
import { timer } from '../helpers/index.js';
import { withKeyedLock } from '../helpers/keyed-lock.js';
import { DEFAULT_OCR_MODEL, type OcrModel } from '../helpers/ocr-models.js';
import type { OcrConfidence } from '../types.js';

type OcrResult = { markdown: string; elapsed: number; confidence?: OcrConfidence };
type OcrPage = {
  markdown: string;
  confidenceScores?: { averagePageConfidenceScore: number } | null;
};

// Upload → OCR → suppression du fichier distant, dans un `finally` : si l'OCR échoue, la copie du
// document ne reste pas stockée chez Mistral.
const uploadAndProcess = async (
  client: Mistral,
  content: Buffer,
  fileName: string,
  model: OcrModel,
): Promise<OcrResult> => {
  const stop = timer();

  // Upload (purpose="ocr" obligatoire, supporte JPG/PNG/PDF)
  const uploaded = await client.files.upload({
    file: { fileName, content: new Uint8Array(content) },
    purpose: 'ocr',
  });

  try {
    // OCR avec scores de confiance au niveau page. `includeBlocks: false` épinglé : le SDK 2.3.0
    // l'envoie déjà, mais le défaut passe à true côté API et dans le SDK ≥ 2.6.1 — sans cette
    // ligne, un bump du SDK ferait renvoyer les blocs (payload ~×3,6 mesuré), inutilisés ici.
    const ocrResult = await client.ocr.process({
      model,
      document: { fileId: uploaded.id, type: 'file' },
      confidenceScoresGranularity: 'page',
      includeBlocks: false,
    });
    return buildOcrResult(ocrResult.pages, stop(), fileName);
  } finally {
    await deleteUploadedFile(client, uploaded.id, fileName);
  }
};

// Cleanup du fichier uploadé : un échec est journalisé, jamais propagé (le résultat de l'OCR, ou
// son erreur, prime).
const deleteUploadedFile = async (
  client: Mistral,
  fileId: string,
  fileName: string,
): Promise<void> => {
  try {
    await client.files.delete({ fileId });
  } catch (e) {
    logger.error('ocr', `file cleanup failed for ${fileName}:`, e);
  }
};

const buildOcrResult = (pages: OcrPage[], elapsed: number, fileName: string): OcrResult => {
  // Combiner toutes les pages
  const markdown = pages.map((p) => p.markdown).join('\n\n');

  // Extraire les scores de confiance (graceful degradation)
  const confidence = extractConfidence(pages);
  if (!confidence && pages.length > 0) {
    logger.warn(
      'ocr',
      `confidence scores requested but not returned for "${fileName}" (${pages.length} pages)`,
    );
  }
  return { markdown, elapsed, confidence };
};

export async function ocrFile(
  client: Mistral,
  filePath: string,
  fileName: string,
  model: OcrModel = DEFAULT_OCR_MODEL,
): Promise<OcrResult> {
  const content = readFileSync(filePath);
  // L'API Files renvoie le MÊME fileId pour un contenu identique (mesuré) : deux OCR concurrents
  // du même fichier (« Importer quand même » un doublon en cours d'OCR, deux onglets) partageaient
  // le fichier distant, et la suppression de l'un cassait l'OCR de l'autre. Sérialisés par contenu.
  const hash = createHash('sha256').update(content).digest('hex');
  return withKeyedLock(`ocr:${hash}`, () => uploadAndProcess(client, content, fileName, model));
}

function extractConfidence(pages: OcrPage[]): OcrConfidence | undefined {
  const scored = pages.filter(
    (p) => p.confidenceScores && Number.isFinite(p.confidenceScores.averagePageConfidenceScore),
  );
  if (scored.length === 0) return undefined;
  const rawAvg =
    scored.reduce((s, p) => s + p.confidenceScores!.averagePageConfidenceScore, 0) / scored.length;
  const avg = Math.max(0, Math.min(1, rawAvg));
  if (rawAvg !== avg) {
    logger.warn('ocr', `confidence score out of [0,1] range (rawAvg=${rawAvg}), clamped to ${avg}`);
  }
  return { average: avg };
}
