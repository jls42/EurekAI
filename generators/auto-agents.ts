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
] as const;

export type AutoAgentType = (typeof AUTO_AGENT_TYPES)[number];

export const AUTO_AGENTS_SET: ReadonlySet<string> = new Set(AUTO_AGENT_TYPES);

export const MAX_AUTO_PLAN_LENGTH = AUTO_AGENT_TYPES.length;
