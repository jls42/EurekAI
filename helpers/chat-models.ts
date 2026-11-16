import type { ChatCompletionRequest } from '@mistralai/mistralai/models/components';

// Mistral Large 3, modèle de génération par défaut, ÉPINGLÉ. L'alias `mistral-large-latest` (défaut
// jusqu'en v1.7.14) sert Large 4 depuis sa GA (autour du 2026-11-05) : un modèle qui réfléchit
// toujours, au-delà des 120 s du client sur nos générations (mesure du 2026-11-15, corpus et
// rapport dans output/model-corpus/2026-11-15/, hors git). Large 3 est déprécié depuis le
// 2026-10-31 et retiré le 2027-04-30 (table Legacy de docs.mistral.ai, remplaçant annoncé :
// Large 4) : son successeur se choisit par une évaluation avant cette date (check-models le
// rappelle à chaque passage).
export const DEFAULT_CHAT_MODEL = 'mistral-large-2512';

// Mistral Large 4, candidat à la succession de Large 3 (comparaison à l'aveugle prévue en mars 2027,
// cf. .claude/rules/mistral-models.md). Il n'est plus proposé dans les Réglages depuis le 2026-11-16
// (médiane 130 s sur nos générations, environ 20 fois le coût de Large 3), mais garde son tarif, sa
// surveillance (check-models) et sa réflexion réduite (withReasoningDefault) pour cette comparaison.
// Id épinglé : `mistral-large-4` suivrait une future version 4.x, à un autre prix, sans évaluation.
export const MISTRAL_LARGE_4 = 'mistral-large-4-0';

// Alias mouvant, figé sur Large 3 partout où il a été enregistré (config.json, saveConfig).
export const MOVING_LARGE_ALIAS = 'mistral-large-latest';

// Modèles de chat qui ne se choisissent plus : l'alias mouvant (il sert Large 4 depuis sa GA) et
// Large 4 lui-même, retiré des Réglages.
const RETIRED_CHAT_MODELS: ReadonlySet<string> = new Set([MOVING_LARGE_ALIAS, MISTRAL_LARGE_4]);

// Modèle de chat à enregistrer dans la config : un modèle retiré devient Large 3, toute autre valeur
// passe telle quelle (choix de l'utilisateur dans les Réglages). Appliqué au démarrage et à chaque
// sauvegarde (config.ts), jamais à l'appel : un script de comparaison peut encore viser Large 4.
export const pinChatModel = (model: string): string => {
  return RETIRED_CHAT_MODELS.has(model) ? DEFAULT_CHAT_MODEL : model;
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
