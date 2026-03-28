import { describe, it, expect } from 'vitest';
import { createHelpers } from './helpers';

const helpers = createHelpers();

// Helper to call a method with a mock context
function callWith<T>(method: Function, ctx: any, ...args: any[]): T {
  return method.call(ctx, ...args);
}

// --- Pure functions (no `this` needed) ---

describe('genIcon', () => {
  it('returns correct icon for each known type', () => {
    expect(helpers.genIcon('summary')).toBe('file-text');
    expect(helpers.genIcon('flashcards')).toBe('layers');
    expect(helpers.genIcon('quiz')).toBe('brain');
    expect(helpers.genIcon('podcast')).toBe('headphones');
    expect(helpers.genIcon('quiz-vocal')).toBe('mic');
    expect(helpers.genIcon('image')).toBe('image');
    expect(helpers.genIcon('fill-blank')).toBe('pencil-line');
    expect(helpers.genIcon('auto')).toBe('sparkles');
  });

  it('returns sparkles as fallback for unknown type', () => {
    expect(helpers.genIcon('unknown')).toBe('sparkles');
    expect(helpers.genIcon('')).toBe('sparkles');
  });
});

describe('genColor', () => {
  it('returns correct CSS variable for each known type', () => {
    expect(helpers.genColor('summary')).toBe('var(--color-gen-summary)');
    expect(helpers.genColor('flashcards')).toBe('var(--color-gen-flashcards)');
    expect(helpers.genColor('quiz')).toBe('var(--color-gen-quiz)');
    expect(helpers.genColor('podcast')).toBe('var(--color-gen-podcast)');
    expect(helpers.genColor('quiz-vocal')).toBe('var(--color-gen-quizvocal)');
    expect(helpers.genColor('image')).toBe('var(--color-gen-image)');
    expect(helpers.genColor('fill-blank')).toBe('var(--color-gen-fillblank)');
  });

  it('returns primary color as fallback for unknown type', () => {
    expect(helpers.genColor('unknown')).toBe('var(--color-primary)');
    expect(helpers.genColor('')).toBe('var(--color-primary)');
  });
});

describe('iconChipClass', () => {
  it('returns special class for quiz-vocal', () => {
    expect(helpers.iconChipClass('quiz-vocal')).toBe('icon-chip-quizvocal');
  });

  it('returns special class for fill-blank', () => {
    expect(helpers.iconChipClass('fill-blank')).toBe('icon-chip-fillblank');
  });

  it('returns default pattern icon-chip-{type} for other types', () => {
    expect(helpers.iconChipClass('summary')).toBe('icon-chip-summary');
    expect(helpers.iconChipClass('quiz')).toBe('icon-chip-quiz');
    expect(helpers.iconChipClass('flashcards')).toBe('icon-chip-flashcards');
    expect(helpers.iconChipClass('podcast')).toBe('icon-chip-podcast');
    expect(helpers.iconChipClass('image')).toBe('icon-chip-image');
  });

  it('returns default pattern for unknown type', () => {
    expect(helpers.iconChipClass('custom')).toBe('icon-chip-custom');
  });
});

describe('inferSourceType', () => {
  it('returns sourceType if already set', () => {
    expect(helpers.inferSourceType({ sourceType: 'voice', filename: 'anything' })).toBe('voice');
    expect(helpers.inferSourceType({ sourceType: 'ocr', filename: 'Texte libre' })).toBe('ocr');
  });

  it('returns text for "Texte libre"', () => {
    expect(helpers.inferSourceType({ filename: 'Texte libre' })).toBe('text');
  });

  it('returns voice for "Enregistrement vocal"', () => {
    expect(helpers.inferSourceType({ filename: 'Enregistrement vocal' })).toBe('voice');
  });

  it('returns websearch for filenames starting with "Recherche web"', () => {
    expect(helpers.inferSourceType({ filename: 'Recherche web : python' })).toBe('websearch');
    expect(helpers.inferSourceType({ filename: 'Recherche web' })).toBe('websearch');
  });

  it('returns ocr as default fallback', () => {
    expect(helpers.inferSourceType({ filename: 'photo.jpg' })).toBe('ocr');
    expect(helpers.inferSourceType({ filename: 'document.pdf' })).toBe('ocr');
    expect(helpers.inferSourceType({ filename: '' })).toBe('ocr');
  });
});

describe('isImageFile', () => {
  it('returns true for common image extensions', () => {
    expect(helpers.isImageFile('photo.jpg')).toBe(true);
    expect(helpers.isImageFile('photo.jpeg')).toBe(true);
    expect(helpers.isImageFile('image.png')).toBe(true);
    expect(helpers.isImageFile('anim.gif')).toBe(true);
    expect(helpers.isImageFile('photo.webp')).toBe(true);
    expect(helpers.isImageFile('image.bmp')).toBe(true);
  });

  it('is case insensitive', () => {
    expect(helpers.isImageFile('PHOTO.JPG')).toBe(true);
    expect(helpers.isImageFile('Image.PNG')).toBe(true);
    expect(helpers.isImageFile('test.Jpeg')).toBe(true);
  });

  it('returns false for non-image files', () => {
    expect(helpers.isImageFile('document.pdf')).toBe(false);
    expect(helpers.isImageFile('data.json')).toBe(false);
    expect(helpers.isImageFile('script.ts')).toBe(false);
    expect(helpers.isImageFile('readme.md')).toBe(false);
    expect(helpers.isImageFile('')).toBe(false);
  });

  it('returns false when extension appears in middle of filename', () => {
    expect(helpers.isImageFile('png-file.txt')).toBe(false);
    expect(helpers.isImageFile('my.jpg.backup')).toBe(false);
  });
});

describe('isPdfFile', () => {
  it('returns true for PDF files', () => {
    expect(helpers.isPdfFile('document.pdf')).toBe(true);
  });

  it('is case insensitive', () => {
    expect(helpers.isPdfFile('DOC.PDF')).toBe(true);
    expect(helpers.isPdfFile('file.Pdf')).toBe(true);
  });

  it('returns false for non-PDF files', () => {
    expect(helpers.isPdfFile('image.png')).toBe(false);
    expect(helpers.isPdfFile('data.json')).toBe(false);
    expect(helpers.isPdfFile('')).toBe(false);
    expect(helpers.isPdfFile('pdf')).toBe(false);
  });

  it('returns false when pdf appears in middle of filename', () => {
    expect(helpers.isPdfFile('my.pdf.backup')).toBe(false);
  });
});

describe('avatarStyle', () => {
  it('returns correct style for legacy key "rocket" (index 0)', () => {
    const style = helpers.avatarStyle('rocket');
    expect(style).toContain("background-image:url('/avatars.webp')");
    expect(style).toContain('background-size:500% 400%');
    expect(style).toContain('background-position:0% 0%');
  });

  it('returns correct position for legacy key "star" (index 1)', () => {
    const style = helpers.avatarStyle('star');
    // col=1, row=0 -> x = (1/4)*100 = 25%, y = 0%
    expect(style).toContain('background-position:25% 0%');
  });

  it('returns correct position for legacy key "heart" (index 4)', () => {
    const style = helpers.avatarStyle('heart');
    // col=4, row=0 -> x = (4/4)*100 = 100%, y = 0%
    expect(style).toContain('background-position:100% 0%');
  });

  it('returns correct position for legacy key "sun" (index 5)', () => {
    const style = helpers.avatarStyle('sun');
    // col=0, row=1 -> x = 0%, y = (1/3)*100 = 33.33%
    expect(style).toContain('background-position:0% 33.33');
  });

  it('returns correct position for legacy key "music" (index 11)', () => {
    const style = helpers.avatarStyle('music');
    // col=1, row=2 -> x = (1/4)*100 = 25%, y = (2/3)*100 = 66.66%
    expect(style).toContain('background-position:25% 66.66');
  });

  it('parses numeric string keys', () => {
    const style = helpers.avatarStyle('0');
    expect(style).toContain('background-position:0% 0%');
  });

  it('handles numeric key in second row', () => {
    const style = helpers.avatarStyle('7');
    // col=2, row=1 -> x = (2/4)*100 = 50%, y = (1/3)*100 = 33.33%
    expect(style).toContain('background-position:50% 33.33');
  });

  it('defaults to index 0 for unknown non-numeric key', () => {
    const style = helpers.avatarStyle('unknown');
    expect(style).toContain('background-position:0% 0%');
  });

  it('always includes no-repeat', () => {
    expect(helpers.avatarStyle('rocket')).toContain('background-repeat:no-repeat');
  });
});

describe('formatDuration', () => {
  it('formats zero seconds', () => {
    expect(helpers.formatDuration(0)).toBe('0:00');
  });

  it('formats seconds under a minute with leading zero', () => {
    expect(helpers.formatDuration(5)).toBe('0:05');
    expect(helpers.formatDuration(9)).toBe('0:09');
  });

  it('formats seconds >= 10 without extra leading zero', () => {
    expect(helpers.formatDuration(10)).toBe('0:10');
    expect(helpers.formatDuration(59)).toBe('0:59');
  });

  it('formats exact minutes', () => {
    expect(helpers.formatDuration(60)).toBe('1:00');
    expect(helpers.formatDuration(120)).toBe('2:00');
  });

  it('formats minutes and seconds', () => {
    expect(helpers.formatDuration(65)).toBe('1:05');
    expect(helpers.formatDuration(125)).toBe('2:05');
    expect(helpers.formatDuration(754)).toBe('12:34');
  });

  it('handles large values', () => {
    expect(helpers.formatDuration(3600)).toBe('60:00');
    expect(helpers.formatDuration(3661)).toBe('61:01');
  });
});

describe('projectColor', () => {
  it('returns first color for index 0', () => {
    expect(helpers.projectColor(0)).toBe('var(--color-primary)');
  });

  it('returns different colors for sequential indices', () => {
    const color0 = helpers.projectColor(0);
    const color1 = helpers.projectColor(1);
    const color2 = helpers.projectColor(2);
    expect(color0).not.toBe(color1);
    expect(color1).not.toBe(color2);
  });

  it('cycles through 8 colors', () => {
    expect(helpers.projectColor(8)).toBe(helpers.projectColor(0));
    expect(helpers.projectColor(9)).toBe(helpers.projectColor(1));
    expect(helpers.projectColor(16)).toBe(helpers.projectColor(0));
  });

  it('returns all 8 unique colors', () => {
    const colors = Array.from({ length: 8 }, (_, i) => helpers.projectColor(i));
    const unique = new Set(colors);
    expect(unique.size).toBe(8);
  });
});

describe('initGenProps', () => {
  it('initializes _audioUrl and _generatingVoice on empty gen', () => {
    const gen: any = { type: 'quiz' };
    helpers.initGenProps(gen);
    expect(gen._audioUrl).toBeNull();
    expect(gen._generatingVoice).toBe(false);
  });

  it('does not overwrite existing _audioUrl', () => {
    const gen: any = { type: 'quiz', _audioUrl: 'http://example.com/audio.mp3' };
    helpers.initGenProps(gen);
    expect(gen._audioUrl).toBe('http://example.com/audio.mp3');
  });

  it('does not overwrite existing _generatingVoice', () => {
    const gen: any = { type: 'quiz', _generatingVoice: true };
    helpers.initGenProps(gen);
    expect(gen._generatingVoice).toBe(true);
  });

  it('adds _scriptOpen=false for podcast type', () => {
    const gen: any = { type: 'podcast' };
    helpers.initGenProps(gen);
    expect(gen._scriptOpen).toBe(false);
  });

  it('does not add _scriptOpen for non-podcast type', () => {
    const gen: any = { type: 'quiz' };
    helpers.initGenProps(gen);
    expect(gen._scriptOpen).toBeUndefined();
  });
});

describe('resolveSourceRef', () => {
  const sources = [
    { id: 's1', filename: 'Photo volcans.jpg' },
    { id: 's2', filename: 'Texte libre' },
    { id: 's3', filename: 'Recherche web : dinosaures' },
  ];

  it('resolves "Source 1" to first source (1-indexed)', () => {
    expect(helpers.resolveSourceRef('Source 1', sources)).toBe(sources[0]);
  });

  it('resolves "source 2" case-insensitively', () => {
    expect(helpers.resolveSourceRef('source 2', sources)).toBe(sources[1]);
  });

  it('resolves "Source 3" to third source', () => {
    expect(helpers.resolveSourceRef('Source 3', sources)).toBe(sources[2]);
  });

  it('returns undefined for out-of-range source number', () => {
    expect(helpers.resolveSourceRef('Source 99', sources)).toBeUndefined();
  });

  it('resolves by exact filename match (case-insensitive)', () => {
    expect(helpers.resolveSourceRef('texte libre', sources)).toBe(sources[1]);
  });

  it('resolves by partial match (ref includes filename)', () => {
    expect(helpers.resolveSourceRef('see Photo volcans.jpg for details', sources)).toBe(sources[0]);
  });

  it('resolves by partial match (filename includes ref)', () => {
    expect(helpers.resolveSourceRef('dinosaures', sources)).toBe(sources[2]);
  });

  it('returns undefined when nothing matches', () => {
    expect(helpers.resolveSourceRef('nonexistent', sources)).toBeUndefined();
  });

  it('handles empty sources array', () => {
    expect(helpers.resolveSourceRef('Source 1', [])).toBeUndefined();
  });

  it('prefers numeric match over text match', () => {
    // "Source 1" should resolve via numeric pattern to first source
    const result = helpers.resolveSourceRef('Source 1', sources);
    expect(result).toBe(sources[0]);
  });
});

describe('referencedSourceNums', () => {
  it('extracts source nums from flashcards sourceRefs', () => {
    const gen = {
      type: 'flashcards',
      data: { flashcards: [{ sourceRefs: ['Source 1', 'Source 3'] }, { sourceRefs: ['Source 2'] }] },
    };
    const nums = helpers.referencedSourceNums(gen);
    expect(nums).toEqual(new Set([1, 2, 3]));
  });

  it('extracts source nums from flashcards legacy source field', () => {
    const gen = {
      type: 'flashcards',
      data: [{ source: 'Source 1' }, { source: 'Source 2' }],
    };
    const nums = helpers.referencedSourceNums(gen);
    expect(nums).toEqual(new Set([1, 2]));
  });

  it('extracts source nums from quiz sourceRefs', () => {
    const gen = {
      type: 'quiz',
      data: { quiz: [{ sourceRefs: ['Source 1'] }, { sourceRefs: ['Source 2', 'Source 3'] }] },
    };
    const nums = helpers.referencedSourceNums(gen);
    expect(nums).toEqual(new Set([1, 2, 3]));
  });

  it('extracts source nums from quiz legacy sourceRef field', () => {
    const gen = {
      type: 'quiz',
      data: [{ sourceRef: 'Source 1' }, { sourceRef: 'Source 2' }],
    };
    const nums = helpers.referencedSourceNums(gen);
    expect(nums).toEqual(new Set([1, 2]));
  });

  it('extracts source nums from quiz-vocal', () => {
    const gen = {
      type: 'quiz-vocal',
      data: { quiz: [{ sourceRefs: ['Source 1'] }] },
    };
    const nums = helpers.referencedSourceNums(gen);
    expect(nums).toEqual(new Set([1]));
  });

  it('extracts source nums from podcast sourceRefs', () => {
    const gen = {
      type: 'podcast',
      data: { sourceRefs: ['Source 1', 'Source 4'] },
    };
    const nums = helpers.referencedSourceNums(gen);
    expect(nums).toEqual(new Set([1, 4]));
  });

  it('extracts source nums from fill-blank items', () => {
    const gen = {
      type: 'fill-blank',
      data: [{ sourceRefs: ['Source 2'] }, { sourceRefs: ['Source 3'] }],
    };
    const nums = helpers.referencedSourceNums(gen);
    expect(nums).toEqual(new Set([2, 3]));
  });

  it('extracts source nums from summary citations', () => {
    const gen = {
      type: 'summary',
      data: { summary: 'text', citations: [{ sourceRef: 'Source 1' }] },
    };
    const nums = helpers.referencedSourceNums(gen);
    expect(nums).toEqual(new Set([1]));
  });

  it('extracts source nums from summary inline [Source N] references', () => {
    const gen = {
      type: 'summary',
      data: { summary: 'As seen in [Source 2] and [Source 5]', key_points: ['Point [Source 1]'] },
    };
    const nums = helpers.referencedSourceNums(gen);
    expect(nums).toEqual(new Set([1, 2, 5]));
  });

  it('returns empty set for unknown generation type', () => {
    const gen = { type: 'image', data: {} };
    const nums = helpers.referencedSourceNums(gen);
    expect(nums.size).toBe(0);
  });

  it('returns empty set when no refs present', () => {
    const gen = { type: 'quiz', data: { quiz: [{ question: 'test' }] } };
    const nums = helpers.referencedSourceNums(gen);
    expect(nums.size).toBe(0);
  });
});

// --- Functions needing mock `this` context ---

describe('apiBase', () => {
  it('returns the API base URL with project ID', () => {
    const ctx = { currentProjectId: 'proj-123' };
    const result = callWith<string>(helpers.apiBase, ctx);
    expect(result).toBe('/api/projects/proj-123');
  });

  it('handles different project IDs', () => {
    const ctx = { currentProjectId: 'abc' };
    expect(callWith<string>(helpers.apiBase, ctx)).toBe('/api/projects/abc');
  });
});

describe('getOriginalFileUrl', () => {
  it('returns /output/ prefixed path when filePath exists', () => {
    const src = { filePath: 'projects/p1/photo.jpg' };
    expect(helpers.getOriginalFileUrl(src)).toBe('/output/projects/p1/photo.jpg');
  });

  it('returns null when filePath is absent', () => {
    expect(helpers.getOriginalFileUrl({})).toBeNull();
    expect(helpers.getOriginalFileUrl({ filePath: '' })).toBeNull();
  });
});

describe('isGenerating', () => {
  it('returns true when any loading value is true', () => {
    const ctx = { loading: { summary: false, quiz: true, flashcards: false } };
    expect(callWith<boolean>(helpers.isGenerating, ctx)).toBe(true);
  });

  it('returns false when all loading values are false', () => {
    const ctx = { loading: { summary: false, quiz: false, flashcards: false } };
    expect(callWith<boolean>(helpers.isGenerating, ctx)).toBe(false);
  });

  it('returns false for empty loading object', () => {
    const ctx = { loading: {} };
    expect(callWith<boolean>(helpers.isGenerating, ctx)).toBe(false);
  });
});

describe('recentGenerations', () => {
  it('returns up to 8 most recent generations sorted by date', () => {
    const generations = Array.from({ length: 12 }, (_, i) => ({
      id: `g${i}`,
      type: 'quiz',
      createdAt: new Date(2024, 0, i + 1).toISOString(),
    }));
    const ctx = { generations };
    const result = callWith<any[]>(helpers.recentGenerations, ctx);
    expect(result).toHaveLength(8);
    // Most recent first
    expect(result[0].id).toBe('g11');
    expect(result[7].id).toBe('g4');
  });

  it('returns all generations when fewer than 8', () => {
    const ctx = {
      generations: [
        { id: 'g1', createdAt: '2024-01-01T00:00:00Z' },
        { id: 'g2', createdAt: '2024-01-02T00:00:00Z' },
      ],
    };
    const result = callWith<any[]>(helpers.recentGenerations, ctx);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('g2');
  });

  it('returns empty array when no generations', () => {
    const ctx = { generations: [] };
    expect(callWith<any[]>(helpers.recentGenerations, ctx)).toEqual([]);
  });

  it('does not mutate the original array', () => {
    const generations = [
      { id: 'g1', createdAt: '2024-01-02T00:00:00Z' },
      { id: 'g2', createdAt: '2024-01-01T00:00:00Z' },
    ];
    const ctx = { generations };
    callWith<any[]>(helpers.recentGenerations, ctx);
    expect(ctx.generations[0].id).toBe('g1');
  });
});

describe('dashboardStats', () => {
  const categories = [
    { key: 'dashboard' },
    { key: 'sources' },
    { key: 'summary' },
    { key: 'quiz' },
    { key: 'flashcards' },
  ];

  it('counts generations per category, excluding dashboard and sources', () => {
    const ctx = {
      categories,
      generations: [
        { type: 'summary' },
        { type: 'summary' },
        { type: 'quiz' },
        { type: 'flashcards' },
        { type: 'flashcards' },
        { type: 'flashcards' },
      ],
    };
    const stats = callWith<Record<string, number>>(helpers.dashboardStats, ctx);
    expect(stats).toEqual({ summary: 2, quiz: 1, flashcards: 3 });
    expect(stats['dashboard']).toBeUndefined();
    expect(stats['sources']).toBeUndefined();
  });

  it('returns zero counts when no generations exist', () => {
    const ctx = { categories, generations: [] };
    const stats = callWith<Record<string, number>>(helpers.dashboardStats, ctx);
    expect(stats).toEqual({ summary: 0, quiz: 0, flashcards: 0 });
  });

  it('handles categories with no matching generations', () => {
    const ctx = {
      categories: [{ key: 'podcast' }],
      generations: [{ type: 'quiz' }],
    };
    const stats = callWith<Record<string, number>>(helpers.dashboardStats, ctx);
    expect(stats).toEqual({ podcast: 0 });
  });
});

describe('generationsByType', () => {
  it('filters and sorts generations by type', () => {
    const ctx = {
      generations: [
        { type: 'quiz', createdAt: '2024-01-01T00:00:00Z', id: 'older' },
        { type: 'summary', createdAt: '2024-01-02T00:00:00Z', id: 'sum' },
        { type: 'quiz', createdAt: '2024-01-03T00:00:00Z', id: 'newer' },
      ],
    };
    const result = callWith<any[]>(helpers.generationsByType, ctx, 'quiz');
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('newer');
    expect(result[1].id).toBe('older');
  });

  it('returns empty array when no generations match', () => {
    const ctx = { generations: [{ type: 'quiz', createdAt: '2024-01-01T00:00:00Z' }] };
    expect(callWith<any[]>(helpers.generationsByType, ctx, 'podcast')).toEqual([]);
  });
});

describe('genSources', () => {
  const sources = [
    { id: 's1', filename: 'a.jpg' },
    { id: 's2', filename: 'b.pdf' },
    { id: 's3', filename: 'c.txt' },
  ];

  it('returns all sources when gen has no sourceIds', () => {
    const ctx = { sources };
    const result = callWith<any[]>(helpers.genSources, ctx, { sourceIds: [] });
    expect(result).toEqual(sources);
  });

  it('returns all sources when gen has undefined sourceIds', () => {
    const ctx = { sources };
    const result = callWith<any[]>(helpers.genSources, ctx, {});
    expect(result).toEqual(sources);
  });

  it('filters sources by sourceIds', () => {
    const ctx = { sources };
    const result = callWith<any[]>(helpers.genSources, ctx, { sourceIds: ['s1', 's3'] });
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('s1');
    expect(result[1].id).toBe('s3');
  });
});

describe('isOcrSource', () => {
  it('returns true when inferSourceType returns ocr', () => {
    const ctx = { inferSourceType: helpers.inferSourceType };
    expect(callWith<boolean>(helpers.isOcrSource, ctx, { filename: 'photo.jpg' })).toBe(true);
  });

  it('returns false for text sources', () => {
    const ctx = { inferSourceType: helpers.inferSourceType };
    expect(callWith<boolean>(helpers.isOcrSource, ctx, { filename: 'Texte libre' })).toBe(false);
  });
});

describe('sourceTypeIcon', () => {
  it('returns correct icons for each source type', () => {
    const ctx = { inferSourceType: helpers.inferSourceType };
    expect(callWith<string>(helpers.sourceTypeIcon, ctx, { filename: 'photo.jpg' })).toBe('scan');
    expect(callWith<string>(helpers.sourceTypeIcon, ctx, { filename: 'Texte libre' })).toBe('pencil');
    expect(callWith<string>(helpers.sourceTypeIcon, ctx, { filename: 'Enregistrement vocal' })).toBe('mic');
    expect(callWith<string>(helpers.sourceTypeIcon, ctx, { filename: 'Recherche web : test' })).toBe('globe');
  });
});

describe('sourceTypeBadge', () => {
  it('returns correct i18n keys', () => {
    const ctx = { inferSourceType: helpers.inferSourceType, t: (k: string) => k };
    expect(callWith<string>(helpers.sourceTypeBadge, ctx, { filename: 'photo.jpg' })).toBe('sourceBadge.ocr');
    expect(callWith<string>(helpers.sourceTypeBadge, ctx, { filename: 'Texte libre' })).toBe('sourceBadge.text');
    expect(callWith<string>(helpers.sourceTypeBadge, ctx, { filename: 'Enregistrement vocal' })).toBe(
      'sourceBadge.voice',
    );
    expect(callWith<string>(helpers.sourceTypeBadge, ctx, { filename: 'Recherche web : test' })).toBe(
      'sourceBadge.web',
    );
  });
});

describe('sourceTypeBadgeColor', () => {
  it('returns correct CSS classes for each source type', () => {
    const ctx = { inferSourceType: helpers.inferSourceType };
    expect(callWith<string>(helpers.sourceTypeBadgeColor, ctx, { filename: 'photo.jpg' })).toBe(
      'bg-blue-100 text-blue-700',
    );
    expect(callWith<string>(helpers.sourceTypeBadgeColor, ctx, { filename: 'Texte libre' })).toBe(
      'bg-green-100 text-green-700',
    );
    expect(callWith<string>(helpers.sourceTypeBadgeColor, ctx, { filename: 'Enregistrement vocal' })).toBe(
      'bg-orange-100 text-orange-700',
    );
    expect(callWith<string>(helpers.sourceTypeBadgeColor, ctx, { filename: 'Recherche web : x' })).toBe(
      'bg-teal-100 text-teal-700',
    );
  });

  it('returns gray fallback for unknown source type', () => {
    const ctx = { inferSourceType: () => 'alien' };
    expect(callWith<string>(helpers.sourceTypeBadgeColor, ctx, {})).toBe('bg-gray-100 text-gray-700');
  });
});

describe('isSourceReferenced', () => {
  it('returns true when source index is in referenced nums', () => {
    const ctx = {
      referencedSourceNums: () => new Set([1, 3]),
    };
    // srcIdx is 0-based, referencedSourceNums stores 1-based
    expect(callWith<boolean>(helpers.isSourceReferenced, ctx, {}, 0)).toBe(true);
    expect(callWith<boolean>(helpers.isSourceReferenced, ctx, {}, 2)).toBe(true);
  });

  it('returns false when source index is not in referenced nums', () => {
    const ctx = {
      referencedSourceNums: () => new Set([1, 3]),
    };
    expect(callWith<boolean>(helpers.isSourceReferenced, ctx, {}, 1)).toBe(false);
  });

  it('returns true for all sources when no refs found (empty set)', () => {
    const ctx = {
      referencedSourceNums: () => new Set(),
    };
    expect(callWith<boolean>(helpers.isSourceReferenced, ctx, {}, 0)).toBe(true);
    expect(callWith<boolean>(helpers.isSourceReferenced, ctx, {}, 5)).toBe(true);
  });
});

describe('questionSources', () => {
  const sources = [
    { id: 's1', filename: 'file1.jpg' },
    { id: 's2', filename: 'file2.jpg' },
  ];

  it('returns empty array when no refs', () => {
    const ctx = {
      genSources: () => sources,
      resolveSourceRef: helpers.resolveSourceRef,
    };
    expect(callWith<any[]>(helpers.questionSources, ctx, {}, {})).toEqual([]);
  });

  it('resolves sourceRefs array', () => {
    const ctx = {
      genSources: () => sources,
      resolveSourceRef: helpers.resolveSourceRef,
    };
    const q = { sourceRefs: ['Source 1', 'Source 2'] };
    const result = callWith<any[]>(helpers.questionSources, ctx, {}, q);
    expect(result).toHaveLength(2);
    expect(result[0]).toBe(sources[0]);
  });

  it('falls back to legacy sourceRef field', () => {
    const ctx = {
      genSources: () => sources,
      resolveSourceRef: helpers.resolveSourceRef,
    };
    const q = { sourceRef: 'Source 1' };
    const result = callWith<any[]>(helpers.questionSources, ctx, {}, q);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(sources[0]);
  });

  it('filters out unresolved refs', () => {
    const ctx = {
      genSources: () => sources,
      resolveSourceRef: helpers.resolveSourceRef,
    };
    const q = { sourceRefs: ['Source 1', 'Source 99'] };
    const result = callWith<any[]>(helpers.questionSources, ctx, {}, q);
    expect(result).toHaveLength(1);
  });
});

describe('flashcardSource', () => {
  const sources = [
    { id: 's1', filename: 'file1.jpg' },
    { id: 's2', filename: 'file2.jpg' },
  ];

  it('resolves sourceRefs array', () => {
    const ctx = {
      genSources: () => sources,
      resolveSourceRef: helpers.resolveSourceRef,
    };
    const fc = { sourceRefs: ['Source 1', 'Source 2'] };
    const result = callWith<any[]>(helpers.flashcardSource, ctx, {}, fc);
    expect(result).toHaveLength(2);
    expect(result[0]).toBe(sources[0]);
    expect(result[1]).toBe(sources[1]);
  });

  it('falls back to legacy source field', () => {
    const ctx = {
      genSources: () => sources,
      resolveSourceRef: helpers.resolveSourceRef,
    };
    const fc = { source: 'Source 1' };
    const result = callWith<any[]>(helpers.flashcardSource, ctx, {}, fc);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(sources[0]);
  });

  it('returns empty array when no refs', () => {
    const ctx = {
      genSources: () => sources,
      resolveSourceRef: helpers.resolveSourceRef,
    };
    const result = callWith<any[]>(helpers.flashcardSource, ctx, {}, {});
    expect(result).toEqual([]);
  });

  it('filters out unresolved refs', () => {
    const ctx = {
      genSources: () => sources,
      resolveSourceRef: helpers.resolveSourceRef,
    };
    const fc = { sourceRefs: ['Source 1', 'Source 99'] };
    const result = callWith<any[]>(helpers.flashcardSource, ctx, {}, fc);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(sources[0]);
  });
});

describe('currentFlag', () => {
  const uiLanguages = [
    { code: 'fr', flag: '\u{1F1EB}\u{1F1F7}', label: 'Français' },
    { code: 'en', flag: '\u{1F1EC}\u{1F1E7}', label: 'English' },
    { code: 'ar', flag: '\u{1F1F8}\u{1F1E6}', label: 'العربية' },
  ];

  it('returns flag for current locale', () => {
    const ctx = { uiLanguages, locale: 'fr' };
    expect(callWith<string>(helpers.currentFlag, ctx)).toBe('\u{1F1EB}\u{1F1F7}');
  });

  it('returns globe emoji for unknown locale', () => {
    const ctx = { uiLanguages, locale: 'xx' };
    expect(callWith<string>(helpers.currentFlag, ctx)).toBe('\u{1F310}');
  });
});

describe('langLabel', () => {
  const uiLanguages = [
    { code: 'fr', flag: '\u{1F1EB}\u{1F1F7}', label: 'Français' },
    { code: 'en', flag: '\u{1F1EC}\u{1F1E7}', label: 'English' },
  ];

  it('returns label for known code', () => {
    const ctx = { uiLanguages };
    expect(callWith<string>(helpers.langLabel, ctx, 'fr')).toBe('Français');
    expect(callWith<string>(helpers.langLabel, ctx, 'en')).toBe('English');
  });

  it('returns code as fallback for unknown language', () => {
    const ctx = { uiLanguages };
    expect(callWith<string>(helpers.langLabel, ctx, 'xx')).toBe('xx');
  });
});

describe('langFlag', () => {
  const uiLanguages = [
    { code: 'fr', flag: '\u{1F1EB}\u{1F1F7}', label: 'Français' },
    { code: 'en', flag: '\u{1F1EC}\u{1F1E7}', label: 'English' },
  ];

  it('returns flag for known code', () => {
    const ctx = { uiLanguages };
    expect(callWith<string>(helpers.langFlag, ctx, 'fr')).toBe('\u{1F1EB}\u{1F1F7}');
  });

  it('returns globe emoji for unknown code', () => {
    const ctx = { uiLanguages };
    expect(callWith<string>(helpers.langFlag, ctx, 'xx')).toBe('\u{1F310}');
  });
});

describe('refreshIcons', () => {
  it('does not propagate error when createIcons throws', () => {
    // In the test environment, createIcons may throw because there is no DOM.
    // refreshIcons wraps the call in try/catch and swallows the error.
    // This test verifies the catch block prevents any error from propagating.
    expect(() => helpers.refreshIcons()).not.toThrow();
  });
});

describe('getQuizScores', () => {
  it('returns scores for quizzes with attempts', () => {
    const ctx = {
      generations: [
        {
          type: 'quiz',
          stats: { attempts: [{ score: 3, total: 5 }, { score: 4, total: 5 }] },
        },
        {
          type: 'quiz',
          stats: { attempts: [] },
        },
        {
          type: 'summary',
          stats: { attempts: [{ score: 1, total: 1 }] },
        },
      ],
    };
    const result = callWith<any[]>(helpers.getQuizScores, ctx);
    expect(result).toHaveLength(1);
    expect(result[0].lastScore).toBe(4);
    expect(result[0].total).toBe(5);
    expect(result[0].attempts).toBe(2);
  });

  it('returns empty array when no quiz generations', () => {
    const ctx = { generations: [] };
    expect(callWith<any[]>(helpers.getQuizScores, ctx)).toEqual([]);
  });
});

describe('resolveError', () => {
  it('returns translated string when translation differs from key', () => {
    const ctx = { t: (k: string) => (k === 'error.network' ? 'Erreur reseau' : k) };
    expect(callWith<string>(helpers.resolveError, ctx, 'error.network')).toBe('Erreur reseau');
  });

  it('returns original error when no translation found', () => {
    const ctx = { t: (k: string) => k };
    expect(callWith<string>(helpers.resolveError, ctx, 'Something went wrong')).toBe('Something went wrong');
  });
});

describe('activeGenerations', () => {
  const categories = [
    { key: 'summary', labelKey: 'nav.summary', icon: 'file-text', color: 'var(--color-gen-summary)' },
    { key: 'quiz', labelKey: 'nav.quiz', icon: 'brain', color: 'var(--color-gen-quiz)' },
    { key: 'flashcards', labelKey: 'nav.flashcards', icon: 'layers', color: 'var(--color-gen-flashcards)' },
  ];

  it('returns empty array when nothing is loading', () => {
    const ctx = { categories, loading: { summary: false, quiz: false }, t: (k: string) => k };
    const result = callWith<any[]>(helpers.activeGenerations, ctx);
    expect(result).toEqual([]);
  });

  it('returns active generation chips for loading types', () => {
    const ctx = { categories, loading: { summary: true, quiz: false, flashcards: true }, t: (k: string) => k };
    const result = callWith<any[]>(helpers.activeGenerations, ctx);
    expect(result).toHaveLength(2);
    expect(result[0].key).toBe('summary');
    expect(result[0].color).toBe('var(--color-gen-summary)');
    expect(result[1].key).toBe('flashcards');
  });

  it('includes extra keys like auto and all', () => {
    const ctx = { categories, loading: { auto: true, summary: false }, t: (k: string) => k };
    const result = callWith<any[]>(helpers.activeGenerations, ctx);
    expect(result).toHaveLength(1);
    expect(result[0].key).toBe('auto');
    expect(result[0].icon).toBe('sparkles');
  });

  it('includes voice and websearch', () => {
    const ctx = { categories, loading: { voice: true, websearch: true }, t: (k: string) => k };
    const result = callWith<any[]>(helpers.activeGenerations, ctx);
    expect(result).toHaveLength(2);
    expect(result.map((r: any) => r.key)).toEqual(['voice', 'websearch']);
  });
});
