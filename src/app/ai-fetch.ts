// Injection des headers de credential IA sur les SEULS call sites qui touchent Mistral
// (least-privilege). Cf. CLAUDE.md "Clé Mistral navigateur".
//
// On expose un décorateur d'init plutôt qu'un wrapper de fetch global : le shape
// `fetch(url, withAiHeaders(init))` reste un `fetch(url, …)` littéral, condition pour que
// l'analyse SSRF du repo reconnaisse les fetch d'URL externes (src/app/generate.ts).
/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- Codacy ESLint sans résolution de types (Headers/HeadersInit typés `error`) → faux positifs ; notre lint:ci type-aware ne les flague pas. Cf. CLAUDE.md section Codacy. */

import { getActiveKey } from './api-key';

const PROVIDER_HEADER = 'X-EurekAI-AI-Provider';
const KEY_HEADER = 'X-EurekAI-AI-Key';
const PROVIDER = 'mistral';
const MAX_KEY_LEN = 512;
// Anti-CRLF : `fetch` jette si un header contient un caractère de contrôle. On omet
// plutôt que d'échouer (et le serveur retombe sur la clé d'env si aucun header).
const VALID_KEY_RE = /^[\x21-\x7E]+$/;

function usableKey(key: string | null | undefined): string | null {
  return key && key.length > 0 && key.length <= MAX_KEY_LEN && VALID_KEY_RE.test(key) ? key : null;
}

/**
 * Clé d'une action longue, capturée à son lancement (Auto, import, enregistrement vocal, génération
 * dont le pré-contrôle attend la modération) : l'action continue après un changement de profil avec
 * la clé de SON profil, jamais celle du profil affiché au moment de l'envoi. À passer en
 * `keyOverride` : '' (aucune clé) omet les en-têtes et le serveur retombe sur la clé d'env, alors
 * qu'un `keyOverride` absent relirait la clé active.
 */
export const captureAiKey = (): string => {
  return getActiveKey() ?? '';
};

/**
 * Décore un RequestInit avec `X-EurekAI-AI-Provider` + `X-EurekAI-AI-Key`.
 * - Omet les DEUX headers si aucune clé utilisable (→ fallback clé d'env côté serveur).
 * - N'ajoute JAMAIS de `Content-Type` (les uploads multipart FormData posent leur boundary).
 * - Merge immuable de tous les formats `HeadersInit` (Headers / array / objet), sans muter `init`.
 * - `opts.keyOverride` : clé brouillon (bouton « tester » des réglages) ou clé capturée au lancement
 *   d'une action (captureAiKey ; '' = aucune clé, jamais la clé active du moment).
 */
export function withAiHeaders(
  init: RequestInit = {},
  opts: { keyOverride?: string } = {},
): RequestInit {
  const key = usableKey(opts.keyOverride ?? getActiveKey());
  if (!key) return init;
  const headers = new Headers(init.headers ?? undefined);
  headers.set(PROVIDER_HEADER, PROVIDER);
  headers.set(KEY_HEADER, key);
  return { ...init, headers };
}
