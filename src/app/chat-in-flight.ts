/**
 * Messages du chat qui attendent la réponse du tuteur, par cours (`state.chatInFlight`). La requête
 * continue quand on change de cours (règle du propriétaire, 2026-10-21) ; sa réponse ne s'affiche
 * que sur son cours (chat.ts). resetSession remet chatLoading à false, le chat du cours suivant
 * n'étant pas en attente : sans ce registre, revenir sur le cours avant la réponse laissait le
 * champ actif, sans indicateur (release-test du 2026-10-21).
 * - ni resetSession ni resetState n'y touchent ;
 * - fin de la requête (réponse, refus, panne) : entrée retirée, quel que soit le cours affiché ;
 * - retour sur le cours : chatLoading rétabli (restoreChatLoading, appelé par applyProjectSnapshot).
 * Module dédié, sans dépendance : partagé par chat.ts et projects.ts.
 */
import type { AppContext } from './app-context';

type ChatInFlightState = Pick<AppContext, 'chatInFlight'>;
type ChatLoadingState = Pick<AppContext, 'chatInFlight' | 'chatLoading'>;

/** Message envoyé sur ce cours : la réponse du tuteur est attendue. */
export const startChatInFlight = (ctx: ChatInFlightState, projectId: string): void => {
  ctx.chatInFlight[projectId] = true;
};

/** Requête terminée (réponse, refus ou panne), que son cours soit affiché ou non. */
export const endChatInFlight = (ctx: ChatInFlightState, projectId: string): void => {
  delete ctx.chatInFlight[projectId];
};

/** Retour sur un cours dont un message attend encore sa réponse : indicateur rétabli, champ inactif. */
export const restoreChatLoading = (ctx: ChatLoadingState, projectId: string): void => {
  if (ctx.chatInFlight[projectId]) ctx.chatLoading = true;
};
