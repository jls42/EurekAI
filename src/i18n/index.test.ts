import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockStorage: Record<string, string> = {};
vi.stubGlobal(
  'localStorage',
  Object.assign(Object.create(null), {
    getItem: (key: string) => mockStorage[key] ?? null,
    setItem: (key: string, value: string) => {
      mockStorage[key] = value;
    },
  }),
);

vi.stubGlobal('document', {
  documentElement: { lang: '', dir: '' },
});

describe('i18n/index', () => {
  let registerLocale: typeof import('./index').registerLocale;
  let setLocale: typeof import('./index').setLocale;
  let getLocale: typeof import('./index').getLocale;
  let t: typeof import('./index').t;

  beforeEach(async () => {
    for (const key of Object.keys(mockStorage)) delete mockStorage[key];
    document.documentElement.lang = '';
    document.documentElement.dir = '';
    vi.resetModules();
    const mod = await import('./index');
    registerLocale = mod.registerLocale;
    setLocale = mod.setLocale;
    getLocale = mod.getLocale;
    t = mod.t;
  });

  describe('module initialization', () => {
    it('sets document lang to fr by default', async () => {
      vi.resetModules();
      document.documentElement.lang = '';
      document.documentElement.dir = '';
      await import('./index');
      expect(document.documentElement.lang).toBe('fr');
      expect(document.documentElement.dir).toBe('ltr');
    });

    it('sets dir=rtl when localStorage has ar', async () => {
      vi.resetModules();
      mockStorage['sf-lang'] = 'ar';
      document.documentElement.lang = '';
      document.documentElement.dir = '';
      await import('./index');
      expect(document.documentElement.lang).toBe('ar');
      expect(document.documentElement.dir).toBe('rtl');
    });
  });

  describe('registerLocale + t', () => {
    it('translates keys from registered dictionary', () => {
      registerLocale('fr', { hello: 'Bonjour', bye: 'Au revoir' });
      setLocale('fr');
      expect(t('hello')).toBe('Bonjour');
      expect(t('bye')).toBe('Au revoir');
    });

    it('returns key when not found in any dictionary', () => {
      setLocale('fr');
      expect(t('nonexistent.key')).toBe('nonexistent.key');
    });

    it('falls back to fr dictionary when current locale dict missing', () => {
      registerLocale('fr', { hello: 'Bonjour' });
      setLocale('xx');
      expect(t('hello')).toBe('Bonjour');
    });

    it('falls back to fr for a missing key in current locale', () => {
      registerLocale('fr', { hello: 'Bonjour', extra: 'Extra FR' });
      registerLocale('en', { hello: 'Hello' });
      setLocale('en');
      expect(t('hello')).toBe('Hello');
      expect(t('extra')).toBe('Extra FR');
    });

    it('interpolates params in translated string', () => {
      registerLocale('fr', { greeting: 'Bonjour {name}, tu as {age} ans' });
      setLocale('fr');
      expect(t('greeting', { name: 'Alice', age: 9 })).toBe('Bonjour Alice, tu as 9 ans');
    });

    it('replaces all occurrences of the same param', () => {
      registerLocale('fr', { repeat: '{x} et {x}' });
      setLocale('fr');
      expect(t('repeat', { x: 'A' })).toBe('A et A');
    });
  });

  describe('setLocale', () => {
    it('updates currentLocale and persists to localStorage', () => {
      setLocale('en');
      expect(getLocale()).toBe('en');
      expect(mockStorage['sf-lang']).toBe('en');
    });

    it('sets document lang attribute', () => {
      setLocale('de');
      expect(document.documentElement.lang).toBe('de');
    });

    it('sets dir=rtl for Arabic', () => {
      setLocale('ar');
      expect(document.documentElement.dir).toBe('rtl');
    });

    it('sets dir=ltr for non-RTL languages', () => {
      setLocale('ar');
      expect(document.documentElement.dir).toBe('rtl');
      setLocale('fr');
      expect(document.documentElement.dir).toBe('ltr');
    });
  });

  describe('getLocale', () => {
    it('returns the current locale', () => {
      setLocale('es');
      expect(getLocale()).toBe('es');
    });
  });
});
