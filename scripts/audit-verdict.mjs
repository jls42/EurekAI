#!/usr/bin/env node
// Calcule un verdict bash-friendly à partir du JSON de `npm audit --json`.
// Lecture stdin pour rester compatible avec le pipe utilisé par .husky/pre-push.
// Sortie : `ok` | `critical:N` | `transport:<code>` | `no-metadata` | `parse-error`.
// Voir CLAUDE.md "Couverture actuelle" et `.husky/pre-push` pour les invariants.

export function computeAuditVerdict(rawJson) {
  let parsed;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return 'parse-error';
  }
  const shapeVerdict = classifyShape(parsed);
  if (shapeVerdict) return shapeVerdict;
  return classifyVulnerabilities(parsed.metadata.vulnerabilities);
}

// Détecte les shapes top-level non-vulnérabilités : `error` (npm offline/proxy down) ou
// metadata absente (réponse partielle / JSON null). Retourne null si la shape attendue
// `metadata.vulnerabilities` est présente — laisse classifyVulnerabilities décider.
// Découpée pour tenir computeAuditVerdict sous la limite CCN 8 (Codacy mesure ~13 sinon).
function classifyShape(parsed) {
  if (parsed && typeof parsed === 'object' && parsed.error) {
    return 'transport:' + (parsed.error.code || '?');
  }
  if (!parsed || !parsed.metadata || !parsed.metadata.vulnerabilities) {
    return 'no-metadata';
  }
  return null;
}

function classifyVulnerabilities(vulnerabilities) {
  const count = coerceCriticalCount(vulnerabilities.critical);
  if (count === null) return 'parse-error';
  return count > 0 ? 'critical:' + count : 'ok';
}

// Distingue "absent" (npm omet le champ) de "shape invalide" (boolean/array/object/empty).
// `Number(...)` seul est trop laxiste : Number("") = 0, Number(false) = 0, Number([]) = 0
// → faux verdict 'ok' silencieux sur shapes hostiles. On accepte uniquement number direct
// ou string trim non-vide (npm a déjà sérialisé en "3" dans des versions passées).
function coerceCriticalCount(raw) {
  if (raw === undefined || raw === null) return 0;
  if (typeof raw !== 'number' && typeof raw !== 'string') return null;
  const trimmed = typeof raw === 'string' ? raw.trim() : raw;
  if (trimmed === '') return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const chunks = [];
  process.stdin.on('data', (c) => chunks.push(c));
  process.stdin.on('end', () => {
    process.stdout.write(computeAuditVerdict(chunks.join('')) + '\n');
  });
}
