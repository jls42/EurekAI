const RTL_LANGUAGES = new Set(['ar']);
const dictionaries: Record<string, Record<string, string>> = {};
let currentLocale = localStorage.getItem('sf-lang') || 'fr';

// Set initial lang and dir attributes
document.documentElement.lang = currentLocale;
document.documentElement.dir = RTL_LANGUAGES.has(currentLocale) ? 'rtl' : 'ltr';

export function registerLocale(lang: string, dict: Record<string, string>) {
  dictionaries[lang] = dict;
}

export function setLocale(lang: string) {
  currentLocale = lang;
  localStorage.setItem('sf-lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL_LANGUAGES.has(lang) ? 'rtl' : 'ltr';
}

export function getLocale(): string {
  return currentLocale;
}

export function resolveText(key: string, locale: string): string {
  const dict = dictionaries[locale] || dictionaries['fr'] || {};
  return dict[key] ?? dictionaries['fr']?.[key] ?? key;
}

export function interpolate(text: string, params: Record<string, string | number>): string {
  let result = text;
  for (const [k, v] of Object.entries(params)) {
    result = result.replaceAll(`{${k}}`, String(v));
  }
  return result;
}

export function t(key: string, params?: Record<string, string | number>): string {
  const text = resolveText(key, currentLocale);
  return params ? interpolate(text, params) : text;
}
