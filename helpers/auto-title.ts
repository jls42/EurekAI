/** Shared auto-title generation for all generation types. */

const arrayLen = (data: any): string | number => (Array.isArray(data) ? data.length : '?');

const TITLE_FORMATTERS: Record<string, (data: any, lang: string) => string> = {
  summary: (data, lang) => {
    const prefix = lang === 'en' ? 'Note' : 'Fiche';
    return data?.title ? `${prefix} — ${data.title}` : 'summary';
  },
  flashcards: (data) => `Flashcards (${arrayLen(data)})`,
  quiz: (data) => `Quiz (${arrayLen(data)} questions)`,
  'quiz-vocal': (data, lang) =>
    `${lang === 'en' ? 'Vocal Quiz' : 'Quiz Vocal'} (${arrayLen(data)} questions)`,
  podcast: () => 'Podcast',
  image: () => 'Illustration',
  'fill-blank': (data, lang) =>
    `${lang === 'en' ? 'Fill-in-the-blanks' : 'Textes à trous'} (${arrayLen(data)})`,
};

export function autoTitle(type: string, data: any, lang = 'fr'): string {
  const formatter = TITLE_FORMATTERS[type];
  return formatter ? formatter(data, lang) : type;
}
