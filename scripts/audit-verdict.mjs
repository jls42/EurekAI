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
  if (parsed && typeof parsed === 'object' && parsed.error) {
    return 'transport:' + (parsed.error.code || '?');
  }
  if (!parsed || !parsed.metadata || !parsed.metadata.vulnerabilities) {
    return 'no-metadata';
  }
  // Coerce explicite : si npm change la shape (ex: critical={count:N} ou string non-numeric),
  // `raw || 0` masquerait la mutation par truthy — un objet `{count:5}` passerait
  // `> 0` en `false` (NaN > 0) → faux verdict 'ok' alors qu'il y a 5 critiques.
  // Number(...) || 0 force la coercion numérique, et NaN devient 0 (fail-open documenté
  // par 'no-metadata' au-dessus, mais ici on signale 'parse-error' car la shape est cassée).
  const raw = parsed.metadata.vulnerabilities.critical;
  const critical = Number(raw);
  if (raw !== undefined && raw !== null && !Number.isFinite(critical)) {
    return 'parse-error';
  }
  return critical > 0 ? 'critical:' + critical : 'ok';
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const chunks = [];
  process.stdin.on('data', (c) => chunks.push(c));
  process.stdin.on('end', () => {
    process.stdout.write(computeAuditVerdict(chunks.join('')) + '\n');
  });
}
