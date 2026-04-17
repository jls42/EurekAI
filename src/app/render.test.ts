import { describe, expect, it } from 'vitest';
import { createRender } from './render.js';

describe('createRender', () => {
  const render = createRender();

  describe('renderMarkdown', () => {
    it('retourne une chaine vide pour un contenu vide', () => {
      expect(render.renderMarkdown('')).toBe('');
    });

    it('retourne une chaine vide pour un contenu falsy', () => {
      expect(render.renderMarkdown(null as any)).toBe('');
      expect(render.renderMarkdown(undefined as any)).toBe('');
    });

    it('convertit du markdown simple en HTML', () => {
      const result = render.renderMarkdown('**gras**');
      expect(result).toContain('<strong>gras</strong>');
    });

    it('convertit les sauts de ligne en <br> (mode breaks)', () => {
      const result = render.renderMarkdown('ligne1\nligne2');
      expect(result).toContain('<br>');
    });

    it('sanitise le HTML brut injecte dans le markdown', () => {
      const result = render.renderMarkdown('<script>alert(1)</script>');
      expect(result).not.toContain('<script>');
      expect(result).toContain('&lt;script&gt;');
    });

    it('sanitise les attributs evenements dans le markdown', () => {
      const result = render.renderMarkdown('<img onerror="alert(1)" src="x">');
      expect(result).not.toContain('onerror');
    });

    it('gere les listes markdown', () => {
      const result = render.renderMarkdown('- item1\n- item2');
      expect(result).toContain('<li>');
    });

    it('gere les titres markdown', () => {
      const result = render.renderMarkdown('# Titre');
      expect(result).toContain('<h1');
      expect(result).toContain('Titre');
    });

    it('gere les liens markdown en ajoutant rel noopener', () => {
      const result = render.renderMarkdown('[lien](https://example.com)');
      expect(result).toContain('href="https://example.com"');
      expect(result).toContain('rel="noopener noreferrer"');
    });
  });

  describe('summaryData', () => {
    it('initialise les tableaux manquants', () => {
      const gen = { data: {} };
      const result = render.summaryData.call({}, gen);

      expect(result.citations).toEqual([]);
      expect(result.vocabulary).toEqual([]);
      expect(result.key_points).toEqual([]);
    });

    it('preserve les donnees existantes', () => {
      const gen = {
        data: {
          title: 'Mon titre',
          citations: ['cite1'],
          vocabulary: [{ word: 'test', definition: 'def' }],
          key_points: ['point1', 'point2'],
        },
      };
      const result = render.summaryData.call({}, gen);

      expect(result.title).toBe('Mon titre');
      expect(result.citations).toEqual(['cite1']);
      expect(result.vocabulary).toHaveLength(1);
      expect(result.key_points).toEqual(['point1', 'point2']);
    });

    it('filtre les key_points vides ou blancs', () => {
      const gen = {
        data: {
          key_points: ['valide', '', '  ', null, 'aussi valide', '   '],
        },
      };
      const result = render.summaryData.call({}, gen);

      expect(result.key_points).toEqual(['valide', 'aussi valide']);
    });

    it('gere une generation sans data', () => {
      const gen = {};
      const result = render.summaryData.call({}, gen);

      expect(result.citations).toEqual([]);
      expect(result.vocabulary).toEqual([]);
      expect(result.key_points).toEqual([]);
    });

    it('gere data undefined', () => {
      const gen = { data: undefined };
      const result = render.summaryData.call({}, gen);

      expect(result.citations).toEqual([]);
      expect(result.vocabulary).toEqual([]);
      expect(result.key_points).toEqual([]);
    });

    it('ne modifie pas les tableaux deja presents', () => {
      const citations = ['a', 'b'];
      const vocabulary = [{ word: 'x', definition: 'y' }];
      const gen = { data: { citations, vocabulary, key_points: ['pt'] } };
      const result = render.summaryData.call({}, gen);

      expect(result.citations).toBe(citations);
      expect(result.vocabulary).toBe(vocabulary);
    });
  });

  describe('renderWithSources', () => {
    function makeCtx(sources: any[] = []) {
      return {
        genSources: () => sources,
        renderMarkdown: render.renderMarkdown,
      };
    }

    it('retourne une chaine vide pour un contenu vide', () => {
      const ctx = makeCtx();
      const result = render.renderWithSources.call(ctx, '', {});
      expect(result).toBe('');
    });

    it('rend le markdown normalement sans references', () => {
      const ctx = makeCtx();
      const result = render.renderWithSources.call(ctx, '**texte**', {});
      expect(result).toContain('<strong>texte</strong>');
    });

    it('remplace [Source 1] par un badge sans source correspondante', () => {
      const ctx = makeCtx([]);
      const result = render.renderWithSources.call(ctx, 'Voir [Source 1]', {});
      expect(result).toContain('<span class="source-badge">1</span>');
    });

    it('remplace [Source 1] par un bouton avec source correspondante', () => {
      const sources = [{ id: 'src-abc', filename: 'doc.pdf' }];
      const ctx = makeCtx(sources);
      const result = render.renderWithSources.call(ctx, 'Voir [Source 1]', {});
      expect(result).toContain('<button type="button" class="source-badge"');
      expect(result).toContain('data-source-id="src-abc"');
      expect(result).toContain('title="doc.pdf"');
      expect(result).toContain('>1</button>');
    });

    it('gere plusieurs references individuelles', () => {
      const sources = [
        { id: 'src-1', filename: 'a.pdf' },
        { id: 'src-2', filename: 'b.pdf' },
      ];
      const ctx = makeCtx(sources);
      const result = render.renderWithSources.call(ctx, '[Source 1] et [Source 2]', {});
      expect(result).toContain('data-source-id="src-1"');
      expect(result).toContain('data-source-id="src-2"');
    });

    it('eclate [Source 1, Source 2] en badges individuels', () => {
      const sources = [
        { id: 'src-1', filename: 'a.pdf' },
        { id: 'src-2', filename: 'b.pdf' },
      ];
      const ctx = makeCtx(sources);
      const result = render.renderWithSources.call(ctx, 'Voir [Source 1, Source 2]', {});
      expect(result).toContain('data-source-id="src-1"');
      expect(result).toContain('data-source-id="src-2"');
      expect(result).toContain('>1</button>');
      expect(result).toContain('>2</button>');
    });

    it('eclate la forme degradee [Source N, M] en badges adjacents sans bracket brut', () => {
      const sources = [
        { id: 'src-13', filename: 'a.pdf' },
        { id: 'src-20', filename: 'b.pdf' },
      ];
      // 20 sources placeholder so idx 12 and 19 resolve
      for (let i = sources.length; i < 20; i += 1) sources.push({ id: `s${i}`, filename: `f${i}` });
      sources[12] = { id: 'src-13', filename: 'a.pdf' };
      sources[19] = { id: 'src-20', filename: 'b.pdf' };
      const ctx = makeCtx(sources);
      const result = render.renderWithSources.call(ctx, 'barrages [Source 13, 20] et fin', {});
      expect(result).toContain('data-source-id="src-13"');
      expect(result).toContain('data-source-id="src-20"');
      expect(result).toContain('>13</button>');
      expect(result).toContain('>20</button>');
      // aucun bracket brut ne doit subsister
      expect(result).not.toMatch(/\[Source[^<]*\]/);
    });

    it('eclate la forme sans espace [Source N,M]', () => {
      const sources = Array.from({ length: 20 }, (_, i) => ({
        id: `s${i + 1}`,
        filename: `f${i + 1}`,
      }));
      const ctx = makeCtx(sources);
      const result = render.renderWithSources.call(ctx, '[Source 13,20]', {});
      expect(result).toContain('data-source-id="s13"');
      expect(result).toContain('data-source-id="s20"');
      expect(result).not.toMatch(/\[Source[^<]*\]/);
    });

    it('gere les references hors plage avec un badge span', () => {
      const sources = [{ id: 'src-1', filename: 'a.pdf' }];
      const ctx = makeCtx(sources);
      const result = render.renderWithSources.call(ctx, 'Voir [Source 5]', {});
      expect(result).toContain('<span class="source-badge">5</span>');
    });

    it('echappe les caracteres speciaux dans les attributs', () => {
      const sources = [{ id: 'src-"inj"', filename: 'file <script>.pdf' }];
      const ctx = makeCtx(sources);
      const result = render.renderWithSources.call(ctx, '[Source 1]', {});
      expect(result).toContain('data-source-id="src-&quot;inj&quot;"');
      expect(result).toContain('title="file &lt;script&gt;.pdf"');
    });

    it('gere Source avec espaces variables', () => {
      const sources = [{ id: 'src-1', filename: 'a.pdf' }];
      const ctx = makeCtx(sources);
      const result = render.renderWithSources.call(ctx, '[Source  1]', {});
      expect(result).toContain('data-source-id="src-1"');
    });

    it('ne transforme pas les crochets non-Source', () => {
      const ctx = makeCtx();
      const result = render.renderWithSources.call(ctx, 'Un [lien](url) normal', {});
      expect(result).not.toContain('source-badge');
    });
  });
});
