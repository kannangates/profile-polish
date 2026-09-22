"use client";

import type { ProviderInfo } from "@/lib/config";
import { Badge } from "./ui";

/** Renders `**bold**` and `` `code` `` inside a step, without a markdown dependency. */
function renderStep(text: string, key: number) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return (
    <li key={key} className="leading-relaxed">
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (part.startsWith("`") && part.endsWith("`"))
          return (
            <code key={i} className="rounded bg-border/70 px-1 py-0.5 font-mono text-[0.85em]">
              {part.slice(1, -1)}
            </code>
          );
        return <span key={i}>{part}</span>;
      })}
    </li>
  );
}

export function SetupSteps({ provider, defaultOpen }: { provider: ProviderInfo; defaultOpen?: boolean }) {
  return (
    <details className="rounded-lg border border-border bg-background/60 px-3 py-2" open={defaultOpen}>
      <summary className="cursor-pointer select-none text-sm font-medium text-accent">
        How do I get this key? <span className="font-normal text-muted">· {provider.setupTime}</span>
      </summary>

      <div className="mt-3 space-y-3">
        <ol className="ml-5 list-decimal space-y-1.5 text-sm">{provider.setupSteps.map(renderStep)}</ol>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={provider.keyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white transition hover:bg-accent-hover"
          >
            Open {provider.name} ↗
          </a>
          {provider.free ? <Badge tone="success">No credit card needed</Badge> : <Badge tone="warn">Credit card / credits required</Badge>}
        </div>

        {provider.setupWarning && (
          <p className="rounded-lg bg-warning-bg px-3 py-2 text-xs text-warning-fg">⚠️ {provider.setupWarning}</p>
        )}

        <p className="text-xs text-muted">
          Your key is stored in this browser only and sent straight to {provider.name.split(" ")[0]} — never to us. On a shared or lab
          computer, leave &quot;Remember my keys&quot; off and use &quot;Clear all my data&quot; before you leave.
        </p>
      </div>
    </details>
  );
}
