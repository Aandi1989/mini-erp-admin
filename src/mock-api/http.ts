interface MockRequestOptions {
  signal?: AbortSignal;
  delay?: number;
  failRate?: number;
}

const wait = (delay: number, signal?: AbortSignal) => {
  return new Promise<void>((resolve, reject) => {
    const timeoutId = window.setTimeout(resolve, delay);

    const handleAbort = () => {
      window.clearTimeout(timeoutId);
      reject(new DOMException("The request was aborted.", "AbortError"));
    };

    if (signal?.aborted) {
      handleAbort();
      return;
    }

    signal?.addEventListener("abort", handleAbort, { once: true });
  });
};

export const mockRequest = async <T>(
  producer: () => T,
  { signal, delay = 800, failRate = 0 }: MockRequestOptions = {},
): Promise<T> => {
  await wait(delay, signal);

  if (failRate > 0 && Math.random() < failRate) {
    throw new Error("Mock request failed. Please try again.");
  }

  return producer();
};
