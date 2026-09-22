"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { Markdown } from "@/components/Markdown";
import { Badge, Button, Card, PageHeader } from "@/components/ui";
import { db } from "@/lib/db";
import { useDrafts } from "@/lib/hooks";
import type { Draft } from "@/lib/types";

const TYPE_LABEL: Record<Draft["type"], string> = { profile: "Profile", message: "Message", post: "Post", resume: "Resume" };

function timeLeft(expiresAt: number) {
  const h = Math.max(0, Math.round((expiresAt - Date.now()) / 3_600_000));
  return h < 1 ? "expires soon" : h < 24 ? `${h}h left` : `${Math.round(h / 24)}d left`;
}

function downloadMarkdown(drafts: Draft[]) {
  const body = drafts
    .map((d) => `# ${d.title}\n\n_${TYPE_LABEL[d.type]} · ${new Date(d.createdAt).toLocaleString()}_\n\n${d.content}`)
    .join("\n\n---\n\n");
  const blob = new Blob([body], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  // Detached anchor purely to trigger a download — never attached to the DOM.
  const a = document.createElement("a");
  a.href = url;
  a.download = `careerlift-drafts-${new Date().toISOString().slice(0, 10)}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function DraftsPage() {
  const drafts = useDrafts();
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <>
      <PageHeader title="My Drafts" description="Saved in this browser only. Everything auto-clears after 48 hours — export what you want to keep.">
        <Button variant="secondary" disabled={!drafts?.length} onClick={() => drafts && downloadMarkdown(drafts)}>
          Export all (.md)
        </Button>
      </PageHeader>

      {drafts === undefined ? null : drafts.length === 0 ? (
        <Card className="text-center text-sm text-muted">No drafts yet. Hit “Save draft” on any result to keep it here for 48 hours.</Card>
      ) : (
        <div className="space-y-3">
          {drafts.map((d) => {
            const open = openId === d.id;
            return (
              <Card key={d.id} className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button className="min-w-0 flex-1 text-left" onClick={() => setOpenId(open ? null : d.id!)}>
                    <div className="truncate font-medium">{d.title}</div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-muted">
                      <Badge tone="accent">{TYPE_LABEL[d.type]}</Badge>
                      {new Date(d.createdAt).toLocaleString()} · {timeLeft(d.expiresAt)}
                    </div>
                  </button>
                  <div className="flex gap-2">
                    <CopyButton text={d.content} />
                    <Button variant="danger" onClick={() => db.drafts.delete(d.id!)}>
                      Delete
                    </Button>
                  </div>
                </div>
                {open && (
                  <div className="border-t border-border pt-3">
                    <Markdown>{d.content}</Markdown>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
