import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../i18n/index', () => ({
  t: vi.fn((key: string) => `translated:${key}`),
  setLocale: vi.fn(),
  getLocale: vi.fn(() => 'fr'),
}));
vi.mock('./profile-locale', () => ({
  setProfileLocale: vi.fn(),
}));

import { createI18n } from './i18n';
import { t as i18nT, setLocale as i18nSetLocale } from '../i18n/index';
import { setProfileLocale } from './profile-locale';

function makeContext(overrides: any = {}) {
  return {
    locale: 'fr',
    newProfileLocale: 'fr',
    currentProfile: { id: 'p1', locale: 'fr', hasPin: false },
    updateProfile: vi.fn(),
    ...overrides,
  };
}

describe('createI18n', () => {
  let i18n: ReturnType<typeof createI18n>;
  let ctx: ReturnType<typeof makeContext>;

  beforeEach(() => {
    vi.clearAllMocks();
    i18n = createI18n();
    ctx = makeContext();
  });

  describe('t', () => {
    it('delegates to i18n t() function', () => {
      const result = i18n.t.call(ctx, 'gen.title');
      expect(i18nT).toHaveBeenCalledWith('gen.title', undefined);
      expect(result).toBe('translated:gen.title');
    });

    it('passes params to i18n t()', () => {
      i18n.t.call(ctx, 'toast.error', { error: 'oops' });
      expect(i18nT).toHaveBeenCalledWith('toast.error', { error: 'oops' });
    });
  });

  describe('setLocale', () => {
    it('updates locale, sets i18n locale, syncs profile', () => {
      i18n.setLocale.call(ctx, 'en');

      expect(ctx.locale).toBe('en');
      expect(i18nSetLocale).toHaveBeenCalledWith('en');
      expect(ctx.currentProfile.locale).toBe('en');
      expect(setProfileLocale).toHaveBeenCalledWith('p1', 'en');
      expect(ctx.updateProfile).toHaveBeenCalledWith('p1', { locale: 'en' });
    });

    it('does not call updateProfile when profile has PIN', () => {
      ctx.currentProfile.hasPin = true;
      i18n.setLocale.call(ctx, 'en');

      expect(ctx.locale).toBe('en');
      expect(i18nSetLocale).toHaveBeenCalledWith('en');
      expect(setProfileLocale).toHaveBeenCalledWith('p1', 'en');
      expect(ctx.updateProfile).not.toHaveBeenCalled();
    });

    it('does not call updateProfile when skipProfileSync=true', () => {
      i18n.setLocale.call(ctx, 'en', true);

      expect(ctx.locale).toBe('en');
      expect(i18nSetLocale).toHaveBeenCalledWith('en');
      expect(ctx.currentProfile.locale).toBe('en');
      expect(setProfileLocale).toHaveBeenCalledWith('p1', 'en');
      expect(ctx.updateProfile).not.toHaveBeenCalled();
    });

    it('initialise newProfileLocale quand aucun profil n est actif', () => {
      ctx.currentProfile = null;
      i18n.setLocale.call(ctx, 'en');

      expect(ctx.locale).toBe('en');
      expect(i18nSetLocale).toHaveBeenCalledWith('en');
      expect(ctx.newProfileLocale).toBe('en');
      expect(setProfileLocale).not.toHaveBeenCalled();
    });
  });

  describe('dateLocale', () => {
    it('returns fr-FR for fr', () => {
      ctx.locale = 'fr';
      expect(i18n.dateLocale.call(ctx)).toBe('fr-FR');
    });

    it('returns en-GB for en', () => {
      ctx.locale = 'en';
      expect(i18n.dateLocale.call(ctx)).toBe('en-GB');
    });

    it('returns locale-specific format for other languages', () => {
      ctx.locale = 'de';
      expect(i18n.dateLocale.call(ctx)).toBe('de-DE');
      ctx.locale = 'es';
      expect(i18n.dateLocale.call(ctx)).toBe('es-ES');
      ctx.locale = 'ar';
      expect(i18n.dateLocale.call(ctx)).toBe('ar-SA');
    });

    it('returns raw locale code for unknown locales', () => {
      ctx.locale = 'xx';
      expect(i18n.dateLocale.call(ctx)).toBe('xx');
    });
  });
});
