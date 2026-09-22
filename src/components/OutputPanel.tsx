"use client";

import Link from "next/link";
import { useState } from "react";
import { saveDraft } from "@/lib/db";
import type { DraftType } from "@/lib/types";
import { CopyButton } from "./CopyButton";
import { Markdown } from "./Markdown";
import { Badge, Button, Card, Spinner } from "./ui";

interface Props {
  output: string;
  loading: boolean;
  error: { message: string; quota: boolean } | null;
  meta: { via: "byok" | "shared"; provider: string } | null;
  draftType: DraftType;
  draftTitle: string;
  onStop?: () => void;
  emptyHint?: string;
}

export function OutputPanel({ output, loading, error, meta, draftType, draftTitle, onStop, emptyHint }: Props) {
  const [saved, setSaved] = useState(false);

  return (
    <Card className="flex min-h-[320px] flex-col">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          Result
          {loading && <Spinner className="text-accent" />}
          {meta && <Badge tone={meta.via === "byok" ? "accent" : "neutral"}>{meta.via === "byok" ? `Your key · ${meta.provider}` : meta.provider}</Badge>}
        </div>
        <div className="flex gap-2">
          {loading && onStop && (
            <Button variant="ghost" onClick={onStop}>
              Stop
            </Button>
          )}
          <CopyButton text={output} />
          <Button
            variant="secondary"
            disabled={!output || loading || saved}
            onClick={async () => {
              await saveDraft(draftType, draftTitle, output);
              setSaved(true);
              setTimeout(() => setSaved(false), 2000);
            }}
          >
            {saved ? "Saved ✓" : "Save draft"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-3 rounded-lg border border-danger/30 bg-danger/5 p-3 text-sm">
          <p className="text-danger">{error.message}</p>
          {error.quota && (
            <Link href="/settings" className="mt-1 inline-block font-medium text-accent hover:underline">
              Add your free API key in Settings →
            </Link>
          )}
        </div>
      )}

      {output ? (
        <Markdown>{output}</Markdown>
      ) : (
        !loading && !error && <p className="my-auto text-center text-sm text-muted">{emptyHint ?? "Your result will appear here."}</p>
      )}
    </Card>
  );
}
