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
