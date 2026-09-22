"use client";

import { useEffect, useState } from "react";
import { OutputPanel } from "@/components/OutputPanel";
import { Badge, Button, Card, Label, PageHeader, Spinner } from "@/components/ui";
import { useGenerate } from "@/components/useGenerate";
import { postPrompt } from "@/lib/ai/prompts";
import { useProfile } from "@/lib/hooks";
import { EVERGREEN_TOPICS, type Trend } from "@/lib/trending";

const STYLES = ["Story / personal lesson", "Hot take / opinion", "How-to / tips list", "Question to the network", "Celebrate a win (humble)"];
type Filter = "All" | Trend["category"];

export default function PostsPage() {
  const profile = useProfile();
  const [trends, setTrends] = useState<Trend[] | null>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const [topic, setTopic] = useState("");
  const [angle, setAngle] = useState("");
  const [style, setStyle] = useState(STYLES[0]);
  const gen = useGenerate();

  useEffect(() => {
    let cancelled = false;
    fetch("/api/trending")
      .then((r) => r.json())
      .then((d: { trends: Trend[] }) => {
        if (!cancelled) setTrends(d.trends.length ? [...d.trends, ...EVERGREEN_TOPICS] : EVERGREEN_TOPICS);
      })
      .catch(() => !cancelled && setTrends(EVERGREEN_TOPICS));
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = (trends ?? []).filter((t) => filter === "All" || t.category === filter);

  return (
    <>
      <PageHeader title="Post Generator" description="Pick a trending topic, add your angle, get hooks + a full post + hashtags." />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="space-y-4">
          <Card>
            <div className="mb-2 flex items-center justify-between">
              <Label>Trending now</Label>
              <div className="flex gap-1">
                {(["All", "Tech", "Career", "General"] as Filter[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-full px-2 py-0.5 text-xs ${filter === f ? "bg-accent text-white" : "text-muted hover:text-foreground"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            {trends === null ? (
              <div className="flex items-center gap-2 py-6 text-sm text-muted">
                <Spinner /> Loading topics…
              </div>
            ) : (
              <ul className="max-h-80 space-y-1 overflow-y-auto pr-1">
                {visible.map((t) => (
                  <li key={t.id}>
                    <button
                      onClick={() => setTopic(t.title)}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-accent-soft/60 ${topic === t.title ? "bg-accent-soft" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="line-clamp-2">{t.title}</span>
                        <Badge tone={t.source === "Google Trends" ? "warn" : t.source === "Hacker News" ? "accent" : "success"}>{t.source}</Badge>
                      </div>
                      {t.meta && <div className="mt-0.5 text-xs text-muted">{t.meta}</div>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="space-y-4">
            <div>
              <Label>Topic</Label>
              <input className="field" placeholder="Pick one above or type your own" value={topic} onChange={(e) => setTopic(e.target.value)} />
            </div>
            <div>
              <Label hint="the part that makes it yours">Your angle</Label>
              <textarea
                className="field min-h-24"
                placeholder="What do you think about it? What did you try, learn, or struggle with?"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
              />
            </div>
            <div>
              <Label>Style</Label>
              <select className="field" value={style} onChange={(e) => setStyle(e.target.value)}>
                {STYLES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <Button className="w-full" disabled={gen.loading || !topic.trim()} onClick={() => gen.run(postPrompt(profile, topic.trim(), angle.trim(), style))}>
              {gen.loading ? "Writing…" : "Generate post"}
            </Button>
          </Card>
        </div>

        <OutputPanel
          output={gen.output}
          loading={gen.loading}
          error={gen.error}
          meta={gen.meta}
          onStop={gen.stop}
          draftType="post"
          draftTitle={`Post — ${topic.slice(0, 60) || "untitled"}`}
          emptyHint="Pick a topic to get 3 hook options, a ready-to-post draft and hashtags."
        />
      </div>
    </>
  );
}
