/**
 * Y a-t-il au moins un pending en cours (`status: 'pending'`) pour ce type ?
 *
 * Fonction pure partagée par la méthode AppContext `hasPendingOfType` (helpers.ts) ET les cleanups
 * de generate.ts / confirm.ts, qui ne doivent libérer `loading[type]` que s'il ne reste AUCUN autre
 * pending de ce type (N générations du même type en parallèle). Module dédié — et non `helpers.ts` —
 * pour rester importable par generate.ts/confirm.ts sans être touché par leurs `vi.mock('./helpers')`.
 *
 * `?? {}` tolère un `pendingById` absent (state partiel des mocks de tests) → renvoie alors `false`.
 */
export function pendingOfTypeExists(
  pendingById: Record<string, { type: string; status: string }>,
  type: string,
): boolean {
  return Object.values(pendingById ?? {}).some((p) => p.type === type && p.status === 'pending');
}
