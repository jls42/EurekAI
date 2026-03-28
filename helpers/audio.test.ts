import { describe, it, expect } from 'vitest';
import { collectStream } from './audio.js';

describe('collectStream', () => {
  it('AsyncIterable de chunks retourne Buffer concatene', async () => {
    async function* gen() {
      yield Buffer.from('Hello ');
      yield Buffer.from('World');
    }
    const result = await collectStream(gen());
    expect(result.toString()).toBe('Hello World');
  });

  it('ReadableStream retourne Buffer', async () => {
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('abc'));
        controller.enqueue(new TextEncoder().encode('def'));
        controller.close();
      },
    });
    const result = await collectStream(stream);
    expect(result.toString()).toBe('abcdef');
  });

  it('stream vide retourne Buffer vide', async () => {
    async function* gen() {}
    const result = await collectStream(gen());
    expect(result.length).toBe(0);
  });

  it('ReadableStream sans Symbol.asyncIterator utilise getReader()', async () => {
    // In Node.js, ReadableStream has Symbol.asyncIterator, so collectStream
    // takes the AsyncIterable branch. To cover the getReader branch (lines 12-16),
    // we need an object that only exposes getReader(), without Symbol.asyncIterator.
    const chunks = [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5])];
    let index = 0;
    const fakeStream = {
      getReader() {
        return {
          read() {
            if (index < chunks.length) {
              return Promise.resolve({ done: false, value: chunks[index++] });
            }
            return Promise.resolve({ done: true, value: undefined });
          },
        };
      },
    } as unknown as ReadableStream<Uint8Array>;

    const result = await collectStream(fakeStream);
    expect(result).toEqual(Buffer.from([1, 2, 3, 4, 5]));
  });
});
