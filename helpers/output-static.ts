/**
 * Garde du montage statique `/output` : seuls les médias des projets sont servis (audio et
 * illustrations générés, originaux importés). `output/` contient aussi `profiles.json` (hash des
 * PIN parentaux : sha256 sans sel d'un code à 4 chiffres, inversible instantanément),
 * `config.json`, `projects.json` et chaque `project.json` : jamais servis.
 *
 * Le chemin est vérifié DÉCODÉ une fois, comme `send` le décode avant de lire le disque : un
 * encodage (`%2e%2e`, `%2f`) ne peut pas contourner la garde.
 */
import type { RequestHandler } from 'express';

// Même contrainte que ProjectStore.SAFE_PROJECT_ID (store.ts).
const SERVABLE_PATH = /^\/projects\/[a-zA-Z0-9_-]{1,64}\/(?:uploads\/)?[^/\\\0]{1,255}$/;
// Médias produits par l'app (.mp3, .png) et formats d'import acceptés (view-sources.html).
const SERVABLE_EXTENSIONS = new Set(['.mp3', '.png', '.jpg', '.jpeg', '.pdf', '.txt', '.md']);

const decodeOnce = (raw: string): string | null => {
  try {
    return decodeURIComponent(raw);
  } catch {
    return null;
  }
};

const hasServableName = (path: string): boolean => {
  const name = path.slice(path.lastIndexOf('/') + 1);
  const dot = name.lastIndexOf('.');
  return !name.startsWith('.') && dot > 0 && SERVABLE_EXTENSIONS.has(name.slice(dot).toLowerCase());
};

/** Chemin relatif au montage `/output` (ex. `/projects/<pid>/podcast-1.mp3`). */
export const isServableOutputPath = (rawPath: string): boolean => {
  const path = decodeOnce(rawPath);
  return path !== null && SERVABLE_PATH.test(path) && hasServableName(path);
};

export const outputStaticGuard: RequestHandler = (req, res, next) => {
  if (isServableOutputPath(req.path)) {
    next();
    return;
  }
  res.status(404).end();
};
