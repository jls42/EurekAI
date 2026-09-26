/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument -- Codacy lance son propre ESLint sans résolution de types (globals vitest et SDK typés `error`) → faux positifs ; cf. CLAUDE.md section Codacy */
// Test de contrat du client suivi sur une VRAIE instance du SDK Mistral, construite par
// buildTrackedClient : seul `fetch` est remplacé (le DEFAULT_FETCHER du SDK l'appelle au moment de
// chaque requête). Sérialisation, parsing zod et accesseurs sont donc ceux de la version installée :
// un bump du SDK qui casserait la capture d'usage (accesseur recréé à chaque lecture, champ
// renommé, réponse rejetée) échoue ici, alors que tracked-client.test.ts tourne sur un faux client.
import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildTrackedClient } from './mistral-client-factory.js';
import { runWithUsageTracking } from './usage-context.js';

interface SentRequest {
  method: string;
  path: string;
  body?: unknown;
}

// Corps JSON bruts (snake_case) tels que l'API les renvoie. Chat, STT, OCR et TTS : formes et
// valeurs mesurées le 2026-09-26 avec le SDK 2.7.0 (appels réels minimaux).
const CHAT_RESPONSE = {
  id: 'cmpl-contract',
  object: 'chat.completion',
  model: 'mistral-small-latest',
  created: 1790409600,
  choices: [{ index: 0, message: { role: 'assistant', content: 'ok' }, finish_reason: 'stop' }],
  usage: {
    prompt_tokens: 24,
    completion_tokens: 2,
    total_tokens: 26,
    service_tier: 'standard',
    prompt_tokens_details: { cached_tokens: 0 },
  },
};

const STT_RESPONSE = {
  model: 'voxtral-mini-latest',
  text: 'Bonjour, les volcans.',
  language: 'fr',
  // Segment à bornes nulles (transcription diarisée) : rejeté par le SDK 2.3.0 (start/end non
  // nullables), accepté depuis 2.7.0. On ne lit que `.text`.
  segments: [
    { type: 'transcription_segment', text: 'Bonjour, les volcans.', start: null, end: null },
  ],
  usage: {
    prompt_tokens: 5,
    completion_tokens: 8,
    total_tokens: 388,
    prompt_audio_seconds: 1,
    service_tier: 'standard',
    prompt_tokens_details: { cached_tokens: 0, audio_tokens: 375 },
  },
};

const OCR_RESPONSE = {
  pages: [
    {
      index: 0,
      markdown: 'Les volcans\n\nUn volcan crache de la lave.',
      images: [],
      dimensions: { dpi: 200, height: 140, width: 520 },
      confidence_scores: {
        average_page_confidence_score: 0.97,
        minimum_page_confidence_score: 0.81,
      },
    },
  ],
  model: 'mistral-ocr-4-0',
  usage_info: { pages_processed: 1, doc_size_bytes: 3445 },
};

const TTS_RESPONSE = { audio_data: Buffer.from('ID3 fake mp3').toString('base64') };

// Agents : `usage` et types de sorties CAPTURÉS en réel le 2026-09-26 (JSON brut). Les autres
// champs des entrées sont complétés selon le schéma du SDK.
const toolExecution = (name: string, args: string) => ({
  object: 'entry',
  type: 'tool.execution',
  created_at: '2026-09-26T10:00:00.000Z',
  completed_at: '2026-09-26T10:00:03.000Z',
  id: `tool_exec_${name}`,
  name,
  arguments: args,
});

const messageOutput = (content: unknown[]) => ({
  object: 'entry',
  type: 'message.output',
  created_at: '2026-09-26T10:00:03.000Z',
  completed_at: '2026-09-26T10:00:05.000Z',
  id: 'msg_contract',
  agent_id: 'ag_contract',
  model: 'mistral-large-2512',
  role: 'assistant',
  content,
});

const WEB_SEARCH_RESPONSE = {
  object: 'conversation.response',
  conversation_id: 'conv_websearch',
  outputs: [
    toolExecution('web_search', '{"query": "volcans pour enfants"}'),
    messageOutput([
      { type: 'text', text: 'Un volcan est une montagne qui crache de la lave.' },
      {
        type: 'tool_reference',
        tool: 'web_search',
        title: 'Les volcans',
        url: 'https://example.org',
      },
    ]),
  ],
  usage: {
    prompt_tokens: 789,
    completion_tokens: 94,
    total_tokens: 8100,
    connector_tokens: 7217,
    connectors: { web_search: 1 },
  },
};

const IMAGE_RESPONSE = {
  object: 'conversation.response',
  conversation_id: 'conv_image',
  outputs: [
    toolExecution('image_generation', '{"prompt": "un volcan en éruption"}'),
    messageOutput([
      {
        type: 'tool_file',
        tool: 'image_generation',
        file_id: 'file_contract',
        file_name: 'image_generated_0',
        file_type: 'png',
      },
    ]),
  ],
  usage: {
    prompt_tokens: 187,
    completion_tokens: 464,
    total_tokens: 943,
    connector_tokens: 292,
    connectors: { image_generation: 1 },
  },
};

const jsonResponse = (body: unknown): Response =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });

const readJsonBody = async (request: Request): Promise<unknown> => {
  const type = request.headers.get('content-type') ?? '';
  return type.includes('application/json') ? JSON.parse(await request.clone().text()) : undefined;
};

// Remplace `fetch` : route par chemin, enregistre chaque requête (méthode, chemin, corps JSON).
const stubFetch = (routes: Record<string, unknown>): SentRequest[] => {
  const sent: SentRequest[] = [];
  const fakeFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const request = input instanceof Request ? input : new Request(input, init);
    const path = new URL(request.url).pathname;
    sent.push({ method: request.method, path, body: await readJsonBody(request) });
    if (!(path in routes)) return new Response('not found', { status: 404 });
    return jsonResponse(routes[path]);
  };
  vi.stubGlobal('fetch', vi.fn(fakeFetch));
  return sent;
};

const newClient = () => buildTrackedClient('contract-test-key');

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('client suivi — contrat du SDK installé', () => {
  it('met en cache les accesseurs de sous-clients (sinon le remplacement des méthodes serait perdu)', () => {
    const client = newClient();
    expect(client.chat).toBe(client.chat);
    expect(client.ocr).toBe(client.ocr);
    expect(client.audio.transcriptions).toBe(client.audio.transcriptions);
    expect(client.audio.speech).toBe(client.audio.speech);
    expect(client.beta.conversations).toBe(client.beta.conversations);
    // tracked-client pose ses wrappers en propriétés PROPRES de l'instance mise en cache.
    expect(Object.hasOwn(client.chat, 'complete')).toBe(true);
    expect(Object.hasOwn(client.audio.transcriptions, 'complete')).toBe(true);
    expect(Object.hasOwn(client.ocr, 'process')).toBe(true);
    expect(Object.hasOwn(client.audio.speech, 'complete')).toBe(true);
    expect(Object.hasOwn(client.beta.conversations, 'start')).toBe(true);
  });

  it('chat.complete : usage tokens capté, modèle de la réponse', async () => {
    const sent = stubFetch({ '/v1/chat/completions': CHAT_RESPONSE });
    const client = newClient();
    const { result, usage } = await runWithUsageTracking(() =>
      client.chat.complete({
        model: 'mistral-small-latest',
        messages: [{ role: 'user', content: 'Réponds uniquement par le mot : ok' }],
      }),
    );
    expect(result.choices[0].message?.content).toBe('ok');
    expect(usage).toEqual([
      { promptTokens: 24, completionTokens: 2, totalTokens: 26, model: 'mistral-small-latest' },
    ]);
    expect(sent).toMatchObject([{ method: 'POST', path: '/v1/chat/completions' }]);
  });

  it('audio.transcriptions (STT) : secondes audio captées, segment à bornes nulles accepté', async () => {
    stubFetch({ '/v1/audio/transcriptions': STT_RESPONSE });
    const client = newClient();
    const { result, usage } = await runWithUsageTracking(() =>
      client.audio.transcriptions.complete({
        model: 'voxtral-mini-latest',
        file: { fileName: 'answer.mp3', content: new Uint8Array([1, 2, 3]) },
        language: 'fr',
      }),
    );
    expect(result.text).toBe('Bonjour, les volcans.');
    expect(result.segments?.[0].start).toBeNull();
    expect(usage).toEqual([
      {
        promptTokens: 5,
        completionTokens: 8,
        totalTokens: 388,
        promptAudioSeconds: 1,
        model: 'voxtral-mini-latest',
      },
    ]);
  });

  it('ocr.process : pages captées ; includeBlocks:false épinglé arrive sur le fil', async () => {
    const sent = stubFetch({ '/v1/ocr': OCR_RESPONSE });
    const client = newClient();
    const { result, usage } = await runWithUsageTracking(() =>
      client.ocr.process({
        model: 'mistral-ocr-4-0',
        document: { fileId: 'file-contract', type: 'file' },
        confidenceScoresGranularity: 'page',
        includeBlocks: false,
      }),
    );
    expect(result.pages[0].confidenceScores?.averagePageConfidenceScore).toBe(0.97);
    expect(usage).toEqual([{ pagesProcessed: 1, model: 'mistral-ocr-4-0' }]);
    expect(sent[0].body).toMatchObject({
      include_blocks: false,
      confidence_scores_granularity: 'page',
    });
  });

  it('audio.speech (TTS) : caractères de l’entrée captés, modèle de la requête', async () => {
    stubFetch({ '/v1/audio/speech': TTS_RESPONSE });
    const client = newClient();
    const input = 'Bonjour, les volcans.';
    const { result, usage } = await runWithUsageTracking(() =>
      client.audio.speech.complete({
        model: 'voxtral-mini-tts-latest',
        input,
        voiceId: 'voice-contract',
        responseFormat: 'mp3',
      }),
    );
    expect(Buffer.from(result.audioData, 'base64').toString()).toBe('ID3 fake mp3');
    expect(usage).toEqual([{ inputCharacters: input.length, model: 'voxtral-mini-tts-latest' }]);
  });

  it('beta.conversations.start (agent web_search) : usage capté, connecteurs exposés par le SDK', async () => {
    stubFetch({ '/v1/conversations': WEB_SEARCH_RESPONSE });
    const client = newClient();
    const { result, usage } = await runWithUsageTracking(() =>
      client.beta.conversations.start({ agentId: 'ag_contract', inputs: 'volcans' }),
    );
    expect(result.outputs.map((o) => o.type)).toEqual(['tool.execution', 'message.output']);
    // Champs sur lesquels repose le comptage des frais d'outils (remap camelCase du SDK).
    expect(result.usage.connectorTokens).toBe(7217);
    expect(result.usage.connectors).toEqual({ web_search: 1 });
    expect(usage).toEqual([
      { promptTokens: 789, completionTokens: 94, totalTokens: 8100, model: 'mistral-large-latest' },
    ]);
  });

  it('beta.conversations.start (agent image_generation) : usage capté, fichier outil parsé', async () => {
    stubFetch({ '/v1/conversations': IMAGE_RESPONSE });
    const client = newClient();
    const { result, usage } = await runWithUsageTracking(() =>
      client.beta.conversations.start({ agentId: 'ag_contract', inputs: 'un volcan' }),
    );
    expect(result.outputs[1]).toMatchObject({
      type: 'message.output',
      content: [{ type: 'tool_file', fileId: 'file_contract' }],
    });
    expect(result.usage.connectorTokens).toBe(292);
    expect(result.usage.connectors).toEqual({ image_generation: 1 });
    expect(usage).toEqual([
      { promptTokens: 187, completionTokens: 464, totalTokens: 943, model: 'mistral-large-latest' },
    ]);
  });
});
