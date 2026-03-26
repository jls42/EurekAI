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
});
