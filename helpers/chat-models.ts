import type { ChatCompletionRequest } from '@mistralai/mistralai/models/components';

// Mistral Large 4, proposé en option dans les Réglages (dialog-settings.html). Id épinglé :
// `mistral-large-4` suivrait une future version 4.x, à un autre prix, sans évaluation.
export const MISTRAL_LARGE_4 = 'mistral-large-4-0';

// Familles qui raisonnent quand la requête ne précise rien : la réponse commence alors par un bloc
// de réflexion, facturé en tokens de sortie. Mesuré le 2026-10-08 (3 questions de quiz en JSON) :
// Large 4 rend 907 tokens de sortie en 30 s, contre 123 tokens en 2,7 s avec `reasoningEffort:
// 'none'` ; Large 3, Medium 3.5 et Small 4 ne raisonnent pas sans qu'on le leur demande.
const REASONING_BY_DEFAULT = ['mistral-large-4'];

// Aucune génération ne demande de réflexion : coupée pour ces familles, sauf choix de l'appelant.
// Appliqué à toute requête de chat par tracked-client (wrapChatComplete).
export const withReasoningDefault = (request: ChatCompletionRequest): ChatCompletionRequest => {
  if (request.reasoningEffort) return request;
  // Requête sans `model` malgré le type (cas couvert par tracked-client.test.ts) : envoyée telle quelle.
  const model: unknown = request.model;
  if (typeof model !== 'string') return request;
  if (!REASONING_BY_DEFAULT.some((family) => model.startsWith(family))) return request;
  return { ...request, reasoningEffort: 'none' };
};
