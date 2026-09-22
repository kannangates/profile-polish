"use client";

import { useState } from "react";
import type { GapReport } from "@/lib/profile-gaps";
import { Badge, Card } from "./ui";

export function ProfileGaps({ report }: { report: GapReport }) {
  const [showDone, setShowDone] = useState(false);
  const must = report.missing.filter((g) => g.priority === "must");
  const nice = report.missing.filter((g) => g.priority === "nice");
  const tone = report.score >= 75 ? "text-success" : report.score >= 50 ? "text-warning-fg" : "text-danger";

  return (
    <Card className="space-y-4">
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <div className="font-medium">What&apos;s missing from your profile</div>
          <p className="text-xs text-muted">Checked in your browser — free, no AI needed.</p>
        </div>
        <span className={`text-2xl font-semibold ${tone}`}>{report.score}/100</span>
      </div>

      {report.missing.length === 0 ? (
        <p className="text-sm text-success">Nothing obvious missing — run the AI review below for wording and positioning.</p>
      ) : (
        <>
          {must.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                Fix these first <Badge tone="warn">{must.length}</Badge>
              </div>
              <ul className="space-y-2">
                {must.map((g) => (
                  <li key={g.id} className="rounded-lg border border-danger/25 bg-danger/5 p-3 text-sm">
                    <div className="font-medium">{g.label}</div>
                    <div className="mt-0.5 text-muted">{g.fix}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {nice.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                Then these <Badge>{nice.length}</Badge>
              </div>
              <ul className="space-y-2">
                {nice.map((g) => (
                  <li key={g.id} className="rounded-lg border border-border p-3 text-sm">
                    <div className="font-medium">{g.label}</div>
                    <div className="mt-0.5 text-muted">{g.fix}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {report.strengths.length > 0 && (
        <div>
          <button className="text-xs text-accent hover:underline" onClick={() => setShowDone((v) => !v)}>
            {showDone ? "Hide" : `Show the ${report.strengths.length} you already have`}
          </button>
          {showDone && (
            <ul className="mt-2 space-y-1 text-sm">
              {report.strengths.map((g) => (
                <li key={g.id} className="flex gap-2">
                  <span className="text-success" aria-hidden>
                    ✓
                  </span>
                  {g.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Card>
  );
}
