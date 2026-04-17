import { describe, expect, it } from 'vitest';
import {
  clearProfileLocale,
  getProfileLocale,
  setProfileLocale,
  type StorageLike,
} from './profile-locale.js';

class MemoryStorage implements StorageLike {
  private data = new Map<string, string>();

  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.data.set(key, value);
  }
}

describe('profile locale storage', () => {
  it('retourne la locale de fallback si aucune surcharge n existe', () => {
    const storage = new MemoryStorage();
    expect(getProfileLocale('profile-1', 'fr', storage)).toBe('fr');
  });

  it('stocke une locale par profil', () => {
    const storage = new MemoryStorage();
    setProfileLocale('profile-1', 'en', storage);
    setProfileLocale('profile-2', 'fr', storage);

    expect(getProfileLocale('profile-1', 'fr', storage)).toBe('en');
    expect(getProfileLocale('profile-2', 'en', storage)).toBe('fr');
  });

  it('supprime proprement la surcharge d un profil', () => {
    const storage = new MemoryStorage();
    setProfileLocale('profile-1', 'en', storage);
    clearProfileLocale('profile-1', storage);

    expect(getProfileLocale('profile-1', 'fr', storage)).toBe('fr');
  });

  it('returns fallback when stored JSON is invalid', () => {
    const storage = new MemoryStorage();
    // Write invalid JSON directly
    storage.setItem('sf-profile-locales', '{not valid json!!!');

    expect(getProfileLocale('profile-1', 'fr', storage)).toBe('fr');
  });

  it('filters out non-string values from stored locales', () => {
    const storage = new MemoryStorage();
    // Store an object where one value is not a string
    storage.setItem(
      'sf-profile-locales',
      JSON.stringify({
        'profile-1': 'en',
        'profile-2': 42,
        'profile-3': null,
      }),
    );

    expect(getProfileLocale('profile-1', 'fr', storage)).toBe('en');
    expect(getProfileLocale('profile-2', 'fr', storage)).toBe('fr');
    expect(getProfileLocale('profile-3', 'fr', storage)).toBe('fr');
  });
});
