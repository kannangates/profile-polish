export interface Profile {
  id: "current";
  name: string;
  headline: string;
  location: string;
  summary: string;
  experience: string;
  education: string;
  skills: string[];
  certifications: string[];
  /** Full extracted text — this is what the AI actually reads. */
  raw: string;
  source: "pdf" | "text" | "image";
  createdAt: number;
  expiresAt: number;
}

export type DraftType = "profile" | "message" | "post" | "resume";

export interface Draft {
  id?: number;
  type: DraftType;
  title: string;
  content: string;
  createdAt: number;
  expiresAt: number;
}

export interface ImageInput {
  mimeType: string;
  base64: string;
}

export interface GenerateRequest {
  system: string;
  prompt: string;
  images?: ImageInput[];
}
