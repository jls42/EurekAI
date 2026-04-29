// Cross-tab synchronization de la cloche notifications.
// Le 'storage' event ne fire QUE dans les autres tabs (pas dans celui qui a
// écrit), donc combiné avec le bump local sur appendNotification, cela couvre
// les deux cas. Un 5+ tabs ouverts → 4+ events par écriture, charge négligeable.

const NOTIFS_STORAGE_SLOT = 'sf-profile-notifications';
export const CROSS_TAB_SYNC_BROKEN_EVENT = 'cross-tab-sync-broken';

type AlpineDataStackEntry = { notificationsVersion?: number; crossTabSyncBroken?: boolean };
type AlpineRoot = HTMLElement & {
  _x_dataStack?: AlpineDataStackEntry[];
};

function notifyCrossTabSyncBroken(doc: Document): void {
  doc.defaultView?.dispatchEvent(new Event(CROSS_TAB_SYNC_BROKEN_EVENT));
}

export function handleCrossTabStorageEvent(
  event: { key: string | null },
  doc: Document,
  warned: { value: boolean },
): 'bumped' | 'wrong-key' | 'drift' {
  if (event.key !== NOTIFS_STORAGE_SLOT) return 'wrong-key';
  const root: AlpineRoot | null = doc.querySelector('[x-data="app()"]');
  const stack = root?._x_dataStack?.[0];
  if (stack && typeof stack.notificationsVersion === 'number') {
    stack.notificationsVersion++;
    return 'bumped';
  }
  if (stack && typeof stack.crossTabSyncBroken === 'boolean') {
    stack.crossTabSyncBroken = true;
  }
  notifyCrossTabSyncBroken(doc);
  if (!warned.value) {
    // _x_dataStack est une API privée Alpine.js — un upgrade peut casser ce
    // chemin silencieusement. Warn une fois par session si la structure
    // attendue est absente, pour surfacer le drift.
    console.warn('[notifications] cross-tab sync unavailable', {
      root: !!root,
      stack: !!stack,
      hasField: typeof stack?.notificationsVersion === 'number',
    });
    warned.value = true;
  }
  return 'drift';
}

export function installCrossTabSync(target: EventTarget, doc: Document): void {
  const warned = { value: false };
  target.addEventListener('storage', (e) => {
    handleCrossTabStorageEvent(e as StorageEvent, doc, warned);
  });
}
