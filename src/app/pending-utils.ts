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
  pendingById: Record<string, { type: string; status: string }> | undefined,
  type: string,
): boolean {
  return Object.values(pendingById ?? {}).some((p) => p.type === type && p.status === 'pending');
}

/**
 * Anti-flood : au plus 3 générations du même type en cours (pendings + lancements réservés, cf.
 * `reserveLaunch` dans generate.ts). Un plafond par nombre, pas par délai : un double-clic lance
 * toujours deux générations et un réessai après échec reste possible (le debounce retiré en #42
 * bloquait des réessais légitimes). Vécu le 2026-10-03 : ~18 appuis en 3 s d'une enfant sur
 * « Quiz » → 18 générations, refusées en partie par Mistral, 18 toasts d'erreur.
 */
export const MAX_PARALLEL_PER_TYPE = 3;

/** Nombre de pendings en cours (`status: 'pending'`) pour ce type ; même filtre que ci-dessus. */
export function countPendingOfType(
  pendingById: Record<string, { type: string; status: string }> | undefined,
  type: string,
): number {
  return Object.values(pendingById ?? {}).filter((p) => p.type === type && p.status === 'pending')
    .length;
}
