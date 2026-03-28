import { describe, it, expect, vi } from 'vitest';
import { detectConsigne } from './consigne.js';

function mockClient(responseData: any) {
  return {
    chat: {
      complete: vi.fn().mockResolvedValue({
        choices: [{ message: { content: JSON.stringify(responseData) } }],
      }),
    },
  } as any;
}

describe('detectConsigne', () => {
  it('returns found=true with keyTopics', async () => {
    const data = {
      found: true,
      text: 'Revision sur les volcans',
      keyTopics: ['magma', 'eruption', 'tectonique'],
    };
    const client = mockClient(data);
    const result = await detectConsigne(client, 'content about volcanos');
    expect(result.found).toBe(true);
    expect(result.text).toBe('Revision sur les volcans');
    expect(result.keyTopics).toEqual(['magma', 'eruption', 'tectonique']);
  });

  it('returns found=false when no consigne detected', async () => {
    const data = { found: false, text: '', keyTopics: [] };
    const client = mockClient(data);
    const result = await detectConsigne(client, 'random content');
    expect(result.found).toBe(false);
    expect(result.text).toBe('');
    expect(result.keyTopics).toEqual([]);
  });

  it('handles missing fields (defaults: found=false, text="", keyTopics=[])', async () => {
    const client = mockClient({});
    const result = await detectConsigne(client, 'content');
    expect(result.found).toBe(false);
    expect(result.text).toBe('');
    expect(result.keyTopics).toEqual([]);
  });

  it('passes lang parameter in system prompt', async () => {
    const data = { found: false, text: '', keyTopics: [] };
    const client = mockClient(data);
    await detectConsigne(client, 'content', 'mistral-large-latest', 'en');

    const call = client.chat.complete.mock.calls[0][0];
    expect(call.messages[0].content).toContain('en');
  });
});
