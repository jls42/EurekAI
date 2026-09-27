// Source unique des agents auto-exécutables par le routeur et /generate/auto.
// Importé par generators/router.ts (VALID_AGENTS) et routes/generate.ts (AUTO_EXECUTABLE)
// pour garantir que le routeur ne propose jamais un agent que le backend auto
// ne sait pas exécuter, et que MAX_PLAN_LENGTH suit automatiquement le cardinal.

export const AUTO_AGENT_TYPES = [
  'summary',
  'flashcards',
  'quiz',
  'fill-blank',
  'podcast',
  'quiz-vocal',
  'image',
  'dictation',
] as const;

export type AutoAgentType = (typeof AUTO_AGENT_TYPES)[number];

export const AUTO_AGENTS_SET: ReadonlySet<string> = new Set(AUTO_AGENT_TYPES);

export const MAX_AUTO_PLAN_LENGTH = AUTO_AGENT_TYPES.length;

// Agents qui exigent le TTS (Voxtral) : podcast, quiz vocal et dictée (une lecture audio par mot).
// Source unique du serveur (tri de /generate/auto, codes d'erreur TTS) et du navigateur (boutons
// grisés sans TTS, plan auto). Typé `string` comme AUTO_AGENTS_SET, pour tester tout type de
// génération ; `new Set<AutoAgentType>` garde des entrées valides.
export const TTS_DEPENDENT_AGENTS: ReadonlySet<string> = new Set<AutoAgentType>([
  'podcast',
  'quiz-vocal',
  'dictation',
]);
