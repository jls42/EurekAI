import { describe, it, expect } from 'vitest';
import { computeAuditVerdict } from './audit-verdict.mjs';

// Verrous des 5 verdicts du gate npm audit pre-push (cf. .husky/pre-push).
// Sans ce filet, un futur refactor qui inverse une branche `case` ou casse le
// parser JSON laisserait passer des vulns critiques sans aucun signal.
describe('computeAuditVerdict', () => {
  it('JSON invalide -> parse-error (fail-closed)', () => {
    expect(computeAuditVerdict('<html>500</html>')).toBe('parse-error');
    expect(computeAuditVerdict('')).toBe('parse-error');
    expect(computeAuditVerdict('{ malformed')).toBe('parse-error');
  });

  it('absence metadata.vulnerabilities -> no-metadata (fail-closed)', () => {
    expect(computeAuditVerdict('{}')).toBe('no-metadata');
    expect(computeAuditVerdict('{"metadata":{}}')).toBe('no-metadata');
    expect(computeAuditVerdict('{"unrelated":true}')).toBe('no-metadata');
  });

  it('error réseau (offline, proxy down) -> transport:<code> (fail-open)', () => {
    expect(computeAuditVerdict('{"error":{"code":"ENETUNREACH","summary":"network down"}}')).toBe(
      'transport:ENETUNREACH',
    );
    expect(computeAuditVerdict('{"error":{"summary":"unknown"}}')).toBe('transport:?');
  });

  it('aucune vuln critique -> ok (pass)', () => {
    const json = JSON.stringify({
      metadata: { vulnerabilities: { critical: 0, high: 5, total: 5 } },
    });
    expect(computeAuditVerdict(json)).toBe('ok');
  });

  it('vulns critiques > 0 -> critical:N (fail-closed)', () => {
    const json = JSON.stringify({
      metadata: { vulnerabilities: { critical: 3, high: 2, total: 5 } },
    });
    expect(computeAuditVerdict(json)).toBe('critical:3');
  });

  it('shape mutation critical -> parse-error (fail-closed sur coercion)', () => {
    // Si npm publie une nouvelle shape (ex: {count:N} au lieu d'un Number direct),
    // l'ancien `raw || 0` retournait truthy et `obj > 0 → false` (NaN coerce) →
    // faux verdict 'ok'. Maintenant on détecte la mutation et on fail-closed.
    const objectShape = JSON.stringify({
      metadata: { vulnerabilities: { critical: { count: 5 } } },
    });
    expect(computeAuditVerdict(objectShape)).toBe('parse-error');
    const stringNonNumeric = JSON.stringify({
      metadata: { vulnerabilities: { critical: 'high' } },
    });
    expect(computeAuditVerdict(stringNonNumeric)).toBe('parse-error');
  });

  it('critical en string numérique reste tolerant -> coerce en Number', () => {
    // Les versions npm passées ont parfois sérialisé en string ("3"). On accepte.
    const json = JSON.stringify({
      metadata: { vulnerabilities: { critical: '3' } },
    });
    expect(computeAuditVerdict(json)).toBe('critical:3');
  });

  it('priorité error > metadata : un transport masque les chiffres', () => {
    // npm peut renvoyer error+metadata simultanement pendant une erreur partielle.
    // La logique pre-push privilégie transport pour rester fail-open dans ce cas.
    const json = JSON.stringify({
      error: { code: 'ENETDOWN' },
      metadata: { vulnerabilities: { critical: 99 } },
    });
    expect(computeAuditVerdict(json)).toBe('transport:ENETDOWN');
  });
});
