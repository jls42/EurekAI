import type { FailedStepCode } from '../types.js';

// Agents qui touchent la pile audio (TTS + STT). Le code retourné reste
// `tts_upstream_error` : historiquement orienté TTS mais couvre aussi STT via
// le libellé i18n explicite ("Erreur du service audio (TTS/STT)"). Ne pas scinder
// sans casser le contrat API — la distinction TTS/STT ne change rien côté UX.
const TTS_AGENTS = new Set(['podcast', 'quiz-vocal', 'tts', 'stt']);

// Signaux textuels qu'une panne dans un agent audio vient bien de la pile TTS/STT
// (et non d'un bug de prompt, parser JSON, ou FS). Évite que toute erreur levée
// dans podcast/quiz-vocal soit aveuglément mappée vers tts_upstream_error.
const TTS_SIGNATURE = /\btts\b|\bstt\b|voxtral|elevenlabs|audio|speech|voice|transcrib/i;

// Forme minimale des erreurs SDK Mistral qu'on inspecte. Narrow typé pour
// remplacer les (err as any)?.x répétés : un renommage SDK (status→statusCode)
// serait attrapé par tsc plutôt que silencieusement dégradé en internal_error.
interface ErrWithFields {
  status?: unknown;
  code?: unknown;
  stage?: unknown;
  message?: unknown;
}

function asErrFields(err: unknown): ErrWithFields {
  return err !== null && typeof err === 'object' ? (err as ErrWithFields) : {};
}

function readString(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

// Map une erreur brute vers un code client stable : pas d'err.message dans la réponse HTTP
// (clés API, URLs internes, stack restent dans logger.error côté serveur).
export function extractErrorCode(err: unknown, agent?: string): FailedStepCode {
  if (err instanceof SyntaxError) return 'llm_invalid_json';

  const fields = asErrFields(err);

  // Inspecter d'abord les champs structurés (SDK Mistral APIError expose status/code).
  // Plus robuste que regex sur message qui peut être localisé ou muter entre versions.
  // Distinction : 429 = budget utilisateur (rate limit / tier) ; 503/529 = saturation backend
  // indépendante du budget (panne ou overload). UX distincte côté i18n + retry plus pertinent
  // sur upstream_unavailable que sur quota.
  const status = fields.status;
  const code = readString(fields.code);
  if (status === 429) return 'quota_exceeded';
  if (status === 503 || status === 529) return 'upstream_unavailable';
  if (/rate.?limit|quota|tier/i.test(code)) return 'quota_exceeded';
  if (/capacity|overloaded|unavailable/i.test(code)) return 'upstream_unavailable';
  if (/context.?length|token.?limit/i.test(code)) return 'context_length_exceeded';

  const msg = err instanceof Error ? err.message : String(err);
  if (/\b429\b|rate[_ ]?limit|quota|tier.*limit/i.test(msg)) {
    return 'quota_exceeded';
  }
  if (/\b503\b|\b529\b|overloaded|capacity|service.?unavailable/i.test(msg)) {
    return 'upstream_unavailable';
  }
  if (/context[_ ]?length|token.*limit|too.?many.?tokens|prompt.*too.?long/i.test(msg)) {
    return 'context_length_exceeded';
  }

  // Audio seulement si signature positive : tag explicite posé par le generator,
  // ou message qui cite un composant de la pile audio. Sinon internal_error plutôt
  // que masquer un bug hors-TTS (parser, FS, auth) derrière tts_upstream_error.
  const stage = readString(fields.stage);
  if (agent && TTS_AGENTS.has(agent) && (stage === 'tts' || TTS_SIGNATURE.test(msg))) {
    return 'tts_upstream_error';
  }

  return 'internal_error';
}
