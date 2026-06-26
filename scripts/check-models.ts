#!/usr/bin/env tsx
/**
 * Surveille les modèles Mistral via l'API /v1/models (source de vérité, PAS une table manuelle qui
 * dérive — leçon OCR 3). Détecte les alias `-latest` utilisés par l'app qui pointeraient vers une
 * version DÉPRÉCIÉE (piège `mistral-moderation-latest` → `mistral-moderation-2411`).
 *
 * Informatif et **NON BLOQUANT** : `exit 0` toujours, skip sans `MISTRAL_API_KEY`, tolérant au shape
 * de la réponse. Appelé par `scripts/check-deps.sh` (`|| true`). Usage direct : `npx tsx scripts/check-models.ts`.
 */
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

// Alias `-latest` réellement résolus par EurekAI. Le champ `deprecation` de l'API les concernant doit
// rester `null` ; sinon Mistral a basculé l'alias vers une version en fin de vie sans repointage.
const WATCHED_ALIASES = [
  'mistral-large-latest',
  'mistral-medium-latest',
  'mistral-small-latest',
  'mistral-moderation-latest',
  'mistral-ocr-latest',
  'voxtral-mini-latest',
  'voxtral-mini-tts-latest',
];

interface ModelEntry {
  id: string;
  aliases?: string[];
  deprecation?: string | null;
}

/**
 * Renvoie un avertissement par alias surveillé pointant vers une version `deprecation != null`.
 * Tolérant au shape : `aliases`/`deprecation` absents → ignorés (pas de faux diagnostic).
 */
export function analyzeModels(models: ModelEntry[]): string[] {
  const byAlias = new Map<string, ModelEntry>();
  for (const m of models) {
    for (const alias of m.aliases ?? []) byAlias.set(alias, m);
  }
  const warnings: string[] = [];
  for (const alias of WATCHED_ALIASES) {
    const target = byAlias.get(alias);
    if (target?.deprecation) {
      warnings.push(`${alias} → ${target.id} est DÉPRÉCIÉ (${target.deprecation})`);
    }
  }
  return warnings;
}

function resolveApiKey(): string | undefined {
  if (process.env.MISTRAL_API_KEY) return process.env.MISTRAL_API_KEY;
  try {
    const env = readFileSync(new URL('../.env', import.meta.url), 'utf-8');
    const m = /^MISTRAL_API_KEY=(.+)$/m.exec(env);
    return m?.[1]?.trim().replace(/^["']|["']$/g, '');
  } catch {
    return undefined;
  }
}

async function fetchModels(key: string): Promise<ModelEntry[]> {
  const res = await fetch('https://api.mistral.ai/v1/models', {
    headers: { Authorization: `Bearer ${key}` },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as { data?: ModelEntry[] };
  return data.data ?? [];
}

async function main(): Promise<void> {
  const key = resolveApiKey();
  if (!key) {
    console.log('check-models: MISTRAL_API_KEY absent — skip (non bloquant).');
    return;
  }
  try {
    const warnings = analyzeModels(await fetchModels(key));
    if (warnings.length === 0) {
      console.log(`check-models: ${WATCHED_ALIASES.length} alias OK (aucun déprécié).`);
      return;
    }
    console.log('check-models: ⚠ alias pointant vers un modèle déprécié :');
    for (const w of warnings) console.log(`  - ${w}`);
    console.log('  → pinner explicitement la version courante (cf. generators/moderation.ts).');
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.log(`check-models: vérification impossible (${msg}) — skip (non bloquant).`);
  }
}

// Guard CLI (robuste ESM/tsx) : ne lance main() que si exécuté directement, pas à l'import (tests).
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  void main();
}
