import type { AppContext } from './app-context';

type ReplyState = Pick<AppContext, 't'>;

/**
 * Texte affiché pour un tour de l'assistant. Réponse vide qui n'a rien lancé : repli lisible
 * (`chat.emptyReply`) au lieu d'une bulle vide. Avec une génération, le badge « Génération
 * déclenchée » suffit (un « je n'ai pas su répondre » le contredirait).
 * Module dédié, sans effet de bord (hors du vi.mock('./helpers') des tests) : partagé par chat.ts
 * (réponse reçue) et projects.ts (historique du snapshot à l'ouverture du projet).
 */
export const displayedReply = (
  state: ReplyState,
  content: unknown,
  generatedIds?: string[],
): string => {
  const text = typeof content === 'string' ? content : '';
  if (text.trim() !== '' || (generatedIds?.length ?? 0) > 0) return text;
  return state.t('chat.emptyReply');
};

// Historique chargé : même repli pour un tour assistant vide (enregistré avant le correctif
// serveur) que pour une réponse reçue.
export const withReplyFallback = (
  state: ReplyState,
  messages: AppContext['chatMessages'],
): AppContext['chatMessages'] => {
  return messages.map((m) => {
    if (m.role !== 'assistant') return m;
    return { ...m, content: displayedReply(state, m.content, m.generatedIds) };
  });
};
