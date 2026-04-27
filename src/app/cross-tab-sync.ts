// Cross-tab synchronization de la cloche notifications.
// Le 'storage' event ne fire QUE dans les autres tabs (pas dans celui qui a
// écrit), donc combiné avec le bump local sur appendNotification, cela couvre
// les deux cas. Un 5+ tabs ouverts → 4+ events par écriture, charge négligeable.

const NOTIFS_STORAGE_SLOT = 'sf-profile-notifications';

type AlpineRoot = HTMLElement & {
  _x_dataStack?: Array<{ notificationsVersion?: number }>;
};

export function handleCrossTabStorageEvent(
  event: { key: string | null },
  doc: Document,
  warned: { value: boolean },
): 'bumped' | 'wrong-key' | 'drift' {
  if (event.key !== NOTIFS_STORAGE_SLOT) return 'wrong-key';
  const root = doc.querySelector('[x-data="app()"]') as AlpineRoot | null;
  const stack = root?._x_dataStack?.[0];
  if (stack && typeof stack.notificationsVersion === 'number') {
    stack.notificationsVersion++;
    return 'bumped';
  }
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
