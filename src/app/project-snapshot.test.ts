import { describe, it, expect } from 'vitest';
import { openingProfileQuery } from './project-snapshot';

describe('openingProfileQuery', () => {
  it('profil courant → ?profileId= encodé', () => {
    expect(openingProfileQuery('abc-123')).toBe('?profileId=abc-123');
    expect(openingProfileQuery('a b&c=d#e')).toBe('?profileId=a%20b%26c%3Dd%23e');
  });

  it.each([undefined, ''])('sans profil (%j) → aucun suffixe', (profileId) => {
    expect(openingProfileQuery(profileId)).toBe('');
  });
});
