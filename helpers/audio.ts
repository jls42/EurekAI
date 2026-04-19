/** Collecte un ReadableStream ou un iterable de chunks en un seul Buffer */
export async function collectStream(
  stream: AsyncIterable<Uint8Array | Buffer> | ReadableStream<Uint8Array>,
): Promise<Buffer> {
  const chunks: Buffer[] = [];

  if (Symbol.asyncIterator in (stream as object)) {
    for await (const chunk of stream as AsyncIterable<Uint8Array>) {
      chunks.push(Buffer.from(chunk));
    }
  } else {
    const reader = (stream as ReadableStream<Uint8Array>).getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(Buffer.from(value));
    }
  }

  return Buffer.concat(chunks);
}
