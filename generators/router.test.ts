import { describe, it, expect, vi } from 'vitest';
import { routeRequest } from './router.js';

const validPlan = {
  plan: [
    { agent: 'summary', reason: 'Because' },
    { agent: 'quiz', reason: 'Testing' },
  ],
  context: 'Content about...',
};

function mockClient(responseData: any) {
  return {
    chat: {
      complete: vi.fn().mockResolvedValue({
        choices: [{ message: { content: JSON.stringify(responseData) } }],
      }),
    },
  } as any;
}

describe('routeRequest', () => {
  it('returns valid plan with known agents', async () => {
    const client = mockClient(validPlan);
    const result = await routeRequest(client, 'Some content');
    expect(result.plan).toEqual(validPlan.plan);
    expect(result.context).toBe('Content about...');
  });

  it('filters out invalid agent names', async () => {
    const planWithInvalid = {
      plan: [
        { agent: 'summary', reason: 'OK' },
        { agent: 'unknown_agent', reason: 'Bad' },
        { agent: 'quiz', reason: 'OK' },
      ],
      context: 'Context',
    };
    const client = mockClient(planWithInvalid);
    const result = await routeRequest(client, 'content');
    expect(result.plan).toEqual([
      { agent: 'summary', reason: 'OK' },
      { agent: 'quiz', reason: 'OK' },
    ]);
  });

  it('handles empty plan gracefully', async () => {
    const emptyPlan = { plan: [], context: 'Nothing useful' };
    const client = mockClient(emptyPlan);
    const result = await routeRequest(client, 'content');
    expect(result.plan).toEqual([]);
  });

  it('passes model parameter', async () => {
    const client = mockClient(validPlan);
    await routeRequest(client, 'content', 'custom-model');

    const call = client.chat.complete.mock.calls[0][0];
    expect(call.model).toBe('custom-model');
  });
});
