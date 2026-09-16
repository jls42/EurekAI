import multer from 'multer';
import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { logger } from './logger.js';

/** Codes stables d'un upload rejeté, traduits côté front via `errorCode.<code>`. */
type UploadErrorCode = 'file_too_large' | 'upload_failed' | 'internal_error';

type UploadRejection = { status: number; code: UploadErrorCode };

const classifyUploadError = (err: unknown): UploadRejection => {
  if (err instanceof multer.MulterError) {
    return err.code === 'LIMIT_FILE_SIZE'
      ? { status: 413, code: 'file_too_large' }
      : { status: 400, code: 'upload_failed' };
  }
  // Erreur système du stockage disque (ENOSPC, EACCES…) : panne serveur, pas faute du client.
  if (typeof (err as NodeJS.ErrnoException | null)?.code === 'string') {
    return { status: 500, code: 'internal_error' };
  }
  // Corps multipart illisible signalé par busboy (« Unexpected end of form », boundary absente…).
  return { status: 400, code: 'upload_failed' };
};

const errorDetail = (err: unknown): string => {
  if (err instanceof multer.MulterError) return err.code;
  return err instanceof Error ? err.message : String(err);
};

/**
 * Enveloppe un middleware multer : ses rejets deviennent `{ error: <code> }` avec un statut HTTP
 * adapté (413 fichier trop gros, 400 requête invalide, 500 panne du stockage). Sans ce wrapper,
 * l'erreur tombe dans le handler Express par défaut : HTTP 500 et, hors production, page HTML
 * avec la stack. Le détail reste dans les logs serveur, jamais dans la réponse.
 */
export const withUploadErrors =
  (upload: RequestHandler): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err?: unknown) => {
      if (!err) {
        next();
        return;
      }
      const { status, code } = classifyUploadError(err);
      if (status >= 500) logger.error('upload', `rejet ${code}`, err);
      else logger.warn('upload', `rejet ${code} (${errorDetail(err)})`);
      res.status(status).json({ error: code });
    });
  };
