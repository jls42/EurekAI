import { Readability } from '@mozilla/readability';
import { parseHTML } from 'linkedom';

/** Parse web input: separate URLs from search keywords. */
export function parseWebInput(input: string): { urls: string[]; searchQuery: string } {
  const urlPattern = /https?:\/\/[^\s]+/gi;
  const urls = input.match(urlPattern) || [];
  const searchQuery = input.replace(urlPattern, '').trim();
  return { urls, searchQuery };
}

const MIN_CONTENT_LENGTH = 200;

/** Fetch a URL and extract its main text content using Readability. */
export async function fetchPageContent(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();

  // Try Readability first
  const { document } = parseHTML(html);
  const reader = new Readability(document);
  const article = reader.parse();
  const text = article?.textContent?.trim() || '';
  if (text.length >= MIN_CONTENT_LENGTH) return text;

  // Fallback: Lightpanda headless browser for JS-rendered pages
  try {
    return await fetchWithLightpanda(url);
  } catch {
    // If Lightpanda fails too, return whatever Readability got (or throw)
    if (text.length > 0) return text;
    throw new Error('Could not extract content from page');
  }
}

/** Fallback: use Lightpanda headless browser for JS-rendered content. */
async function fetchWithLightpanda(url: string): Promise<string> {
  const { lightpanda } = await import('@lightpanda/browser');
  const result = await lightpanda.fetch(url, { dump: true, dumpOptions: { type: 'markdown' } });
  const text = typeof result === 'string' ? result : result.toString('utf-8');
  return text.trim();
}

/** Extract text content from a Mistral chat completion response choice. */
export function getContent(response: { choices?: Array<{ message: { content?: unknown } }> }): string {
  const content = response.choices?.[0]?.message?.content;
  return typeof content === 'string' ? content : '';
}

/** Retire les blocs ```json ``` autour du JSON retourne par les LLMs */
export function stripJsonMarkdown(text: string): string {
  return text.replace(/```json\s*|\s*```/g, '').trim(); // NOSONAR — bounded by literal backticks, input from LLM only
}

/** Parse du JSON meme s'il est wrappe dans du markdown */
export function safeParseJson<T = unknown>(text: string): T {
  const cleaned = stripJsonMarkdown(text);
  return JSON.parse(cleaned) as T;
}

/** Timer simple : retourne une fonction stop() qui donne les secondes ecoulees */
export function timer(): () => number {
  const start = performance.now();
  return () => (performance.now() - start) / 1000;
}

/**
 * Unwrap un resultat JSON qui peut etre `[...]` ou `{"key": [...]}`.
 * Retourne toujours le tableau.
 */
export function unwrapJsonArray<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];
  if (typeof data === 'object' && data !== null) {
    for (const key of Object.keys(data)) {
      const val = (data as Record<string, unknown>)[key];
      if (Array.isArray(val)) return val as T[];
    }
  }
  return [];
}

/** Extrait tout le texte des outputs d'un agent Mistral (recursif) */
export function extractAllText(outputs: unknown[]): string {
  const texts: string[] = [];
  for (const output of outputs) {
    const o = output as Record<string, unknown>;
    if (typeof o.text === 'string') {
      texts.push(o.text);
    }
    if (Array.isArray(o.content)) {
      texts.push(extractAllText(o.content));
    } else if (typeof o.content === 'string') {
      texts.push(o.content);
    }
    if (Array.isArray(o.outputs) && o.outputs.length > 0) {
      texts.push(extractAllText(o.outputs));
    }
    if (o.output) {
      if (typeof o.output === 'string') {
        texts.push(o.output);
      } else if (Array.isArray(o.output)) {
        texts.push(extractAllText(o.output));
      }
    }
  }
  return texts.filter(Boolean).join('\n');
}
