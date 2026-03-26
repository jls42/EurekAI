import { t as i18nT, setLocale as i18nSetLocale, getLocale } from '../i18n/index';
import { setProfileLocale } from './profile-locale';

export function createI18n() {
  return {
    locale: getLocale(),

    t(this: any, key: string, params?: Record<string, string | number>): string {
      // Read this.locale to create Alpine reactivity dependency
      void this.locale;
      return i18nT(key, params);
    },

    setLocale(this: any, lang: string, skipProfileSync = false) {
      this.locale = lang;
      i18nSetLocale(lang);
      if (!skipProfileSync && this.currentProfile) {
        this.currentProfile.locale = lang;
        setProfileLocale(this.currentProfile.id, lang);
        if (!this.currentProfile.hasPin) {
          this.updateProfile(this.currentProfile.id, { locale: lang });
        }
      } else if (this.currentProfile) {
        this.currentProfile.locale = lang;
        setProfileLocale(this.currentProfile.id, lang);
      }
    },

    dateLocale(this: any): string {
      return this.locale === 'en' ? 'en-GB' : 'fr-FR';
    },
  };
}
