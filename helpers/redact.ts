// Redaction structurée des secrets pour les logs (cf. CLAUDE.md "Clé Mistral navigateur").
//
// Réaliste, pas magique : on NE peut PAS scrubber une clé arbitraire d'un texte
// libre sans la connaître. Donc deux leviers fiables :
//  1. champs sensibles connus (noms de headers/propriétés) → valeur masquée
//  2. valeurs de secrets connus (clé d'env) → remplacées partout où elles apparaissent
// La défense PRIMAIRE reste : ne jamais passer la clé/headers bruts au logger.
//
// Invariant préservé : un objet/valeur sans secret est retourné inchangé (référence
// identique quand rien n'a matché) — cf. helpers/logger.test.ts (args plain intacts).

const REDACTED = '[REDACTED]';
// Noms de champs dont la valeur est toujours masquée (insensible à la casse).
const SENSITIVE_KEY_RE = /^(authorization|cookie|x-eurekai-ai-key|x-mistral-key|api[-_]?key)$/i;
// Un secret trop court provoquerait des remplacements parasites — seuil prudent.
const MIN_SECRET_LEN = 8;

function knownSecrets(): string[] {
  const env = process.env.MISTRAL_API_KEY;
  return env && env.length >= MIN_SECRET_LEN ? [env] : [];
}

function scrubString(s: string, secrets: string[]): string {
  let out = s;
  for (const sec of secrets) {
    if (out.includes(sec)) out = out.split(sec).join(REDACTED);
  }
  return out;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  if (v === null || typeof v !== 'object') return false;
  const proto = Object.getPrototypeOf(v) as object | null;
  return proto === Object.prototype || proto === null;
}

function redactError(err: Error, secrets: string[]): unknown {
  const message = scrubString(err.message, secrets);
  const stack = err.stack ? scrubString(err.stack, secrets) : undefined;
  if (message === err.message && stack === err.stack) return err;
  return { name: err.name, message, stack };
}

function redactObject(obj: Record<string, unknown>, secrets: string[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = SENSITIVE_KEY_RE.test(k) ? REDACTED : redactSecrets(v, secrets);
  }
  return out;
}

/** Masque les secrets connus dans une valeur quelconque (string/array/objet plain/Error). */
export function redactSecrets(value: unknown, secrets: string[] = knownSecrets()): unknown {
  if (typeof value === 'string') return secrets.length ? scrubString(value, secrets) : value;
  if (Array.isArray(value)) return value.map((v) => redactSecrets(v, secrets));
  if (value instanceof Error) return redactError(value, secrets);
  if (isPlainObject(value)) return redactObject(value, secrets);
  return value;
}
