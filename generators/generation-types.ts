import { AUTO_AGENT_TYPES } from './auto-agents.js';

// Types générables individuellement via POST /generate/<type> (bouton UI dédié).
// Depuis que la dictée est entrée dans l'auto-router, cet ensemble coïncide avec
// AUTO_AGENT_TYPES (chaque agent auto a aussi son bouton de génération unitaire).
// `auto-agents.ts` reste la source unique du routeur et de /generate/auto ;
// on garde cet alias sémantique pour les call sites « génération unitaire »
// (ex: allowlist SSRF frontend) qui ne veulent pas dépendre du nom « auto ».
export const SINGLE_GENERATE_TYPES = AUTO_AGENT_TYPES;

export const SINGLE_GENERATE_SET: ReadonlySet<string> = new Set(SINGLE_GENERATE_TYPES);
