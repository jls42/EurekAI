/** Shared auto-title generation for all generation types. */

const arrayLen = (data: unknown): string | number => (Array.isArray(data) ? data.length : '?');

// « 1 question », « 2 questions » : singulier pour un seul élément (« Quiz (1 questions) » s'affichait).
const countOf = (data: unknown, singular: string, plural: string): string => {
  const n = arrayLen(data);
  return `${n} ${n === 1 ? singular : plural}`;
};

const TITLE_FORMATTERS: Record<string, (data: unknown, lang: string) => string> = {
  summary: (data, lang) => {
    const prefix = lang === 'en' ? 'Note' : 'Fiche';
    const title = (data as { title?: string } | null | undefined)?.title;
    return title ? `${prefix} — ${title}` : 'summary';
  },
  flashcards: (data) => `Flashcards (${arrayLen(data)})`,
  quiz: (data) => `Quiz (${countOf(data, 'question', 'questions')})`,
  'quiz-vocal': (data, lang) =>
    `${lang === 'en' ? 'Vocal Quiz' : 'Quiz Vocal'} (${countOf(data, 'question', 'questions')})`,
  podcast: () => 'Podcast',
  image: () => 'Illustration',
  'fill-blank': (data, lang) =>
    `${lang === 'en' ? 'Fill-in-the-blanks' : 'Textes à trous'} (${arrayLen(data)})`,
  dictation: (data, lang) =>
    lang === 'en'
      ? `Dictation (${countOf(data, 'word', 'words')})`
      : `Dictée (${countOf(data, 'mot', 'mots')})`,
};

export function autoTitle(type: string, data: unknown, lang = 'fr'): string {
  const formatter = TITLE_FORMATTERS[type];
  return formatter ? formatter(data, lang) : type;
}
