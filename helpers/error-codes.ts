// Re-export thin : la logique vit dans error-code-resolution.ts (orchestration),
// error-code-rules.ts (règles par agent) et error-matchers.ts (matchers par
// pattern d'erreur). cf. CLAUDE.md "Codes d'erreur API → Architecture interne".
export { extractErrorCode } from './error-code-resolution.js';
