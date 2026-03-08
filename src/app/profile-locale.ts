const PROFILE_LOCALE_STORAGE_KEY = 'sf-profile-locales';

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

function readProfileLocales(storage: StorageLike): Record<string, string> {
  const raw = storage.getItem(PROFILE_LOCALE_STORAGE_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, string] => typeof entry[1] === 'string',
      ),
    );
  } catch {
    return {};
  }
}

function writeProfileLocales(storage: StorageLike, locales: Record<string, string>): void {
  storage.setItem(PROFILE_LOCALE_STORAGE_KEY, JSON.stringify(locales));
}

export function getProfileLocale(
  profileId: string,
  fallbackLocale: string,
  storage: StorageLike = localStorage,
): string {
  return readProfileLocales(storage)[profileId] || fallbackLocale;
}

export function setProfileLocale(
  profileId: string,
  locale: string,
  storage: StorageLike = localStorage,
): void {
  const locales = readProfileLocales(storage);
  locales[profileId] = locale;
  writeProfileLocales(storage, locales);
}

export function clearProfileLocale(profileId: string, storage: StorageLike = localStorage): void {
  const locales = readProfileLocales(storage);
  if (!(profileId in locales)) return;
  delete locales[profileId];
  writeProfileLocales(storage, locales);
}
