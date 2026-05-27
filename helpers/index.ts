import { Readability } from '@mozilla/readability';
import { parseHTML } from 'linkedom';
import { isIPv4, isIPv6 } from 'node:net';
import { promises as dns } from 'node:dns';

/** Parse web input: separate URLs from search keywords. */
export function parseWebInput(input: string): { urls: string[]; searchQuery: string } {
  const urlPattern = /https?:\/\/[^\s]+/gi;
  const urls = input.match(urlPattern) || [];
  const searchQuery = input.replaceAll(urlPattern, '').trim();
  return { urls, searchQuery };
}

const MIN_CONTENT_LENGTH = 200;

export type ScrapeMode = 'auto' | 'readability' | 'lightpanda';
export type ScrapeEngine = 'readability' | 'lightpanda';

const PRIVATE_IPV4_RANGES: ReadonlyArray<readonly [number, number | null, number | null]> = [
  [0, null, null],
  [10, null, null],
  [127, null, null],
  [169, 254, 254],
  [172, 16, 31],
  [192, 0, 0],
  [192, 88, 88],
  [192, 168, 168],
  [100, 64, 127],
  [198, 18, 19],
];

const parseIPv4Octets = (ip: string): [number, number] | null => {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n) || n < 0 || n > 255)) return null;
  return [parts[0], parts[1]];
};

const matchesPrivateRange = (a: number, b: number): boolean =>
  PRIVATE_IPV4_RANGES.some(([ra, rbMin, rbMax]) => {
    if (a !== ra) return false;
    if (rbMin === null) return true;
    return b >= rbMin && b <= (rbMax ?? rbMin);
  });

const isPrivateIPv4 = (ip: string): boolean => {
  const parts = parseIPv4Octets(ip);
  if (!parts) return true;
  const [a, b] = parts;
  if (a >= 224) return true;
  return matchesPrivateRange(a, b);
};

const PRIVATE_IPV6_PREFIXES = ['fc', 'fd', 'fe80', 'fe9', 'fea', 'feb', 'ff'];

const parseMappedIPv4Hex = (ip: string): string | null => {
  const words = ip.split(':').map((part) => Number.parseInt(part, 16));
  if (words.length !== 2 || words.some((n) => Number.isNaN(n) || n < 0 || n > 0xffff)) {
    return null;
  }
  const [hi, lo] = words;
  return `${hi >> 8}.${hi & 0xff}.${lo >> 8}.${lo & 0xff}`;
};

const isPrivateIPv6 = (ip: string): boolean => {
  const lower = ip.toLowerCase().replace(/^\[|\]$/g, '');
  if (lower === '::1' || lower === '::') return true;
  if (PRIVATE_IPV6_PREFIXES.some((p) => lower.startsWith(p))) return true;
  if (lower.startsWith('::ffff:')) {
    const v4 = lower.slice(7);
    if (isIPv4(v4)) return isPrivateIPv4(v4);
    const mapped = parseMappedIPv4Hex(v4);
    if (mapped) return isPrivateIPv4(mapped);
    return true;
  }
  return false;
};

const BLOCKED_HOSTNAME_SUFFIXES = ['.localhost', '.local', '.internal', '.lan'];
// eslint-disable-next-line sonarjs/no-hardcoded-ip -- block AWS/GCP/Azure metadata endpoint (SSRF guard)
const BLOCKED_HOSTNAMES = new Set(['localhost', 'metadata.google.internal', '169.254.169.254']);

const isBlockedHostname = (host: string): boolean => {
  if (BLOCKED_HOSTNAMES.has(host)) return true;
  return BLOCKED_HOSTNAME_SUFFIXES.some((s) => host.endsWith(s));
};

const parseHttpUrl = (rawUrl: string): URL => {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new Error('URL invalide');
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error(`Protocole non autorise: ${parsed.protocol}`);
  }
  return parsed;
};

const assertHostNotPrivate = (host: string): void => {
  if (!host) throw new Error('URL sans hostname');
  if (isBlockedHostname(host)) throw new Error(`Hostname interdit: ${host}`);
  if (isIPv4(host) && isPrivateIPv4(host)) throw new Error(`IP privee interdite: ${host}`);
  if (isIPv6(host) && isPrivateIPv6(host)) throw new Error(`IP privee interdite: ${host}`);
};

const assertResolvedAddressesArePublic = async (host: string): Promise<void> => {
  if (isIPv4(host) || isIPv6(host)) return;
  let addrs: { address: string; family: number }[];
  try {
    addrs = await dns.lookup(host, { all: true });
  } catch {
    throw new Error(`Resolution DNS impossible: ${host}`);
  }
  for (const { address, family } of addrs) {
    const blocked =
      (family === 4 && isPrivateIPv4(address)) || (family === 6 && isPrivateIPv6(address));
    if (blocked) throw new Error(`Hostname resout vers IP privee: ${host}`);
  }
};

/**
 * Valide une URL fournie par l'utilisateur avant un fetch sortant.
 * Defense contre SSRF (CodeQL js/request-forgery).
 */
export async function assertSafeFetchUrl(rawUrl: string): Promise<URL> {
  const parsed = parseHttpUrl(rawUrl);
  const host = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, '');
  assertHostNotPrivate(host);
  await assertResolvedAddressesArePublic(host);
  return parsed;
}

const SAFE_HOST_RE = /^[A-Za-z0-9.\-:[\]]{1,255}$/;

// Sanitization barrier visible par CodeQL : reconstruit l'URL via regex match[0]
// pour le host et littéraux pour le scheme. Coupe le data flow user → fetch.
const buildSafeFetchUrl = (parsed: URL): string => {
  const protocol: 'http:' | 'https:' = parsed.protocol === 'https:' ? 'https:' : 'http:';
  const hostMatch = SAFE_HOST_RE.exec(parsed.host);
  if (!hostMatch) throw new Error('Host format invalide');
  const safeHost = hostMatch[0];
  return `${protocol}//${safeHost}${parsed.pathname}${parsed.search}`;
};

async function fetchWithReadability(safeUrlStr: string): Promise<string> {
  // URL validated upstream by assertSafeFetchUrl: http/https only, no local
  // hostnames, no private/reserved IPs, public DNS resolution, then rebuilt by
  // buildSafeFetchUrl. Redirects are rejected below via `redirect: 'manual'`.
  // CodeQL and Codacy cannot infer this feature-level SSRF barrier because this
  // scraper intentionally accepts arbitrary public URLs.
  // codeql[js/request-forgery] nosemgrep
  const res = await fetch(safeUrlStr, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
    signal: AbortSignal.timeout(15000),
    redirect: 'manual',
  });
  if (res.status >= 300 && res.status < 400) {
    throw new Error(`Redirect refuse (status ${res.status}) — possible SSRF`);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const { document } = parseHTML(html);
  const reader = new Readability(document);
  const article = reader.parse();
  return article?.textContent?.trim() || '';
}

async function autoFallbackToLightpanda(
  safeUrlStr: string,
  readabilityText: string,
): Promise<{ text: string; engine: ScrapeEngine }> {
  try {
    const lpText = await fetchWithLightpanda(safeUrlStr);
    return { text: lpText, engine: 'lightpanda' };
  } catch {
    if (readabilityText.length > 0) return { text: readabilityText, engine: 'readability' };
    throw new Error('Could not extract content from page');
  }
}

/** Fetch a URL and extract its main text content. */
export async function fetchPageContent(
  url: string,
  mode: ScrapeMode = 'auto',
): Promise<{ text: string; engine: ScrapeEngine }> {
  const safeUrl = await assertSafeFetchUrl(url);
  const safeUrlStr = buildSafeFetchUrl(safeUrl);

  if (mode === 'lightpanda') {
    const text = await fetchWithLightpanda(safeUrlStr);
    return { text, engine: 'lightpanda' };
  }
  const text = await fetchWithReadability(safeUrlStr);
  if (mode === 'readability' || text.length >= MIN_CONTENT_LENGTH) {
    if (text.length > 0) return { text, engine: 'readability' };
    throw new Error('Readability could not extract content');
  }
  return autoFallbackToLightpanda(safeUrlStr, text);
}

/** Fallback: use Lightpanda headless browser for JS-rendered content. */
async function fetchWithLightpanda(url: string): Promise<string> {
  const { lightpanda } = await import('@lightpanda/browser');
  const result = await lightpanda.fetch(url, { dump: true, dumpOptions: { type: 'markdown' } });
  const text = typeof result === 'string' ? result : result.toString('utf-8');
  return text.trim();
}

/** Extract text content from a Mistral chat completion response choice. */
export function getContent(response: {
  choices?: Array<{ message?: { content?: unknown } }>;
}): string {
  const content = response.choices?.[0]?.message?.content;
  return typeof content === 'string' ? content : '';
}

/** Retire les blocs ```json ``` autour du JSON retourne par les LLMs */
export function stripJsonMarkdown(text: string): string {
  // eslint-disable-next-line sonarjs/slow-regex -- bounded by literal backticks, LLM-only input (voir NOSONAR ci-dessous)
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

// cf. CLAUDE.md "Pièges Lizard"
const textFromField = (v: unknown): string | undefined => {
  if (Array.isArray(v)) return extractAllText(v);
  if (typeof v === 'string') return v;
  return undefined;
};

const arrayTextFromField = (v: unknown): string | undefined =>
  Array.isArray(v) && v.length > 0 ? extractAllText(v) : undefined;

const textsFromOutput = (output: unknown): (string | undefined)[] => {
  const o = output as Record<string, unknown>;
  return [
    typeof o.text === 'string' ? o.text : undefined,
    textFromField(o.content),
    arrayTextFromField(o.outputs),
    textFromField(o.output),
  ];
};

/** Extrait tout le texte des outputs d'un agent Mistral (recursif) */
export function extractAllText(outputs: unknown[]): string {
  const texts: (string | undefined)[] = [];
  for (const output of outputs) {
    texts.push(...textsFromOutput(output));
  }
  return texts.filter(Boolean).join('\n');
}
