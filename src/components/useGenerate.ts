"use client";

import { useCallback, useRef, useState } from "react";
import { generate, QuotaError, type GenerateResult } from "@/lib/ai/client";
import type { GenerateRequest } from "@/lib/types";

export function useGenerate() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; quota: boolean } | null>(null);
  const [meta, setMeta] = useState<Omit<GenerateResult, "text"> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const run = useCallback(async (req: GenerateRequest) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setOutput("");
    setError(null);
    setMeta(null);
    setLoading(true);
    try {
      const result = await generate({
        ...req,
        signal: controller.signal,
        onToken: (t) => setOutput((prev) => prev + t),
      });
      setOutput(result.text);
      setMeta({ via: result.via, provider: result.provider });
    } catch (err) {
      if (controller.signal.aborted) return;
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError({ message, quota: err instanceof QuotaError });
    } finally {
      if (abortRef.current === controller) setLoading(false);
    }
  }, []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setLoading(false);
  }, []);

  return { output, loading, error, meta, run, stop, setOutput };
}
