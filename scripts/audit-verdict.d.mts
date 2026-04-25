// Domaine fini des verdicts émis par computeAuditVerdict, consommé par .husky/pre-push
// (case statement bash) et par audit-verdict.test.ts. Encoder l'union plutôt que `string`
// permet au typechecker d'attraper un futur retour littéral typo (ex: 'criticla:3').
export type AuditVerdict =
  | 'ok'
  | 'parse-error'
  | 'no-metadata'
  | `transport:${string}`
  | `critical:${number}`;

export function computeAuditVerdict(rawJson: string): AuditVerdict;
