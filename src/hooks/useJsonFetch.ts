import { useEffect, useState } from "react";

type JsonFetchResult<T> = [
  data: T | null,
  loading: boolean,
  error: Error | null,
];

function wait(milliseconds: number) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

export function useJsonFetch<T>(
  url: string,
  options?: RequestInit,
  minimumDelay = 0,
): JsonFetchResult<T> {
  const requestKey = `${url}:${minimumDelay}`;
  const [result, setResult] = useState<{
    requestKey: string;
    data: T | null;
    error: Error | null;
  } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const startedAt = Date.now();

    fetch(url, { ...options, signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        return response.json() as Promise<T>;
      })
      .then(async (value) => {
        const remainingDelay = Math.max(
          0,
          minimumDelay - (Date.now() - startedAt),
        );
        if (remainingDelay) await wait(remainingDelay);
        if (!controller.signal.aborted) {
          setResult({ requestKey, data: value, error: null });
        }
      })
      .catch((reason: unknown) => {
        if ((reason as Error).name !== "AbortError") {
          setResult({ requestKey, data: null, error: reason as Error });
        }
      });

    return () => controller.abort();
  }, [url, options, minimumDelay, requestKey]);

  if (result?.requestKey !== requestKey) return [null, true, null];
  return [result.data, false, result.error];
}
