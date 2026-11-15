import type { ChatCompletionRequest } from '@mistralai/mistralai/models/components';

// Mistral Large 3, modèle de génération par défaut, ÉPINGLÉ. L'alias `mistral-large-latest` (défaut
// jusqu'en v1.7.14) sert Large 4 depuis sa GA (autour du 2026-11-05) : un modèle qui réfléchit
// toujours, au-delà des 120 s du client sur nos générations (mesure du 2026-11-15, corpus et
// rapport dans output/model-corpus/2026-11-15/, hors git). Large 3 est déprécié depuis le
// 2026-10-31 et retiré le 2027-04-30 (table Legacy de docs.mistral.ai, remplaçant annoncé :
// Large 4) : son successeur se choisit par une évaluation avant cette date (check-models le
// rappelle à chaque passage).
export const DEFAULT_CHAT_MODEL = 'mistral-large-2512';

// Mistral Large 4, proposé en option dans les Réglages (dialog-settings.html). Id épinglé :
// `mistral-large-4` suivrait une future version 4.x, à un autre prix, sans évaluation.
export const MISTRAL_LARGE_4 = 'mistral-large-4-0';

// Alias mouvant, figé sur Large 3 partout où il a été enregistré (config.json, saveConfig).
export const MOVING_LARGE_ALIAS = 'mistral-large-latest';

// Modèle de chat à envoyer : l'alias mouvant devient Large 3 (ce qu'il servait jusqu'à la bascule),
// toute autre valeur passe telle quelle (choix de l'utilisateur dans les Réglages).
export const pinChatModel = (model: string): string => {
  return model === MOVING_LARGE_ALIAS ? DEFAULT_CHAT_MODEL : model;
};

// Familles qui raisonnent quand la requête ne précise rien : la réponse commence alors par un bloc
// de réflexion, facturé en tokens de sortie. Mesuré le 2026-10-08 (3 questions de quiz en JSON) :
// Large 4 rend 907 tokens de sortie en 30 s ; Large 3, Medium 3.5 et Small 4 ne raisonnent pas sans
// qu'on le leur demande.
const REASONING_BY_DEFAULT = ['mistral-large-4'];

// Niveau de réflexion le plus bas accepté par ces familles. Large 4 refuse `none` en 400 depuis sa GA
// (« Use `low` for the level previously called `none` », page Reasoning de docs.mistral.ai) ; `low`
// réfléchit quand même (bloc `thinking`, jusqu'à 6900 tokens pour 10 textes à trous le 2026-11-15).
const LOWEST_REASONING_EFFORT = 'low';

// Aucune génération ne demande de réflexion : réduite au minimum pour ces familles, sauf choix de
// l'appelant. Appliqué à toute requête de chat par tracked-client (wrapChatComplete).
export const withReasoningDefault = (request: ChatCompletionRequest): ChatCompletionRequest => {
  if (request.reasoningEffort) return request;
  // Requête sans `model` malgré le type (cas couvert par tracked-client.test.ts) : envoyée telle quelle.
  const model: unknown = request.model;
  if (typeof model !== 'string') return request;
  if (!REASONING_BY_DEFAULT.some((family) => model.startsWith(family))) return request;
  return { ...request, reasoningEffort: LOWEST_REASONING_EFFORT };
};
