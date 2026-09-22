import type { ImageInput } from "../../types";

export interface StreamParams {
  apiKey: string;
  model: string;
  system: string;
  prompt: string;
  images?: ImageInput[];
  onToken: (text: string) => void;
  signal?: AbortSignal;
}

export type StreamFn = (p: StreamParams) => Promise<string>;

export type ListModelsFn = (apiKey: string) => Promise<string[]>;
