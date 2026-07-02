import { AUTO_AGENT_TYPES } from './auto-agents.js';

// Types générables individuellement via POST /generate/<type> (bouton UI dédié) :
// SUPERSET des agents auto. `auto-agents.ts` reste la source unique du routeur
// et de /generate/auto (son en-tête documente ce contrat, MAX_PLAN_LENGTH suit
// son cardinal) — on ne le pollue pas avec un type non-auto.
// La dictée est générable par bouton mais JAMAIS proposée par l'auto-router :
// elle exige une source « liste de mots » dédiée, pas n'importe quel cours.
export const SINGLE_GENERATE_TYPES = [...AUTO_AGENT_TYPES, 'dictation'] as const;

export const SINGLE_GENERATE_SET: ReadonlySet<string> = new Set(SINGLE_GENERATE_TYPES);
