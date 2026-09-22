"use client";

import { useState } from "react";
import { Button } from "./ui";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="secondary"
      disabled={!text}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* clipboard blocked — nothing to do */
        }
      }}
    >
      {copied ? "Copied ✓" : label}
    </Button>
  );
}
