"use client";

import { useState } from "react";
import { OutputPanel } from "@/components/OutputPanel";
import { Button, Card, Label, PageHeader } from "@/components/ui";
import { useGenerate } from "@/components/useGenerate";
import { MESSAGE_KINDS, messagePrompt, type MessageKind } from "@/lib/ai/prompts";
import { useProfile } from "@/lib/hooks";

const TONES = ["Friendly & professional", "Formal", "Casual", "Confident"];

export default function MessagesPage() {
  const profile = useProfile();
  const [kind, setKind] = useState<MessageKind>("connection");
  const [recipient, setRecipient] = useState("");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState(TONES[0]);
  const gen = useGenerate();

  const selected = MESSAGE_KINDS.find((k) => k.id === kind)!;

  return (
    <>
      <PageHeader title="Message Writer" description="Connection requests, referral asks and follow-ups that people actually reply to." />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Card className="space-y-4">
          <div>
            <Label>What kind of message?</Label>
            <div className="grid grid-cols-2 gap-2">
              {MESSAGE_KINDS.map((k) => (
                <button
                  key={k.id}
                  onClick={() => setKind(k.id)}
                  className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                    kind === k.id ? "border-accent bg-accent-soft font-medium text-accent" : "border-border hover:bg-accent-soft/50"
                  }`}
                >
                  {k.label}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-xs text-muted">{selected.hint}</p>
          </div>

          <div>
            <Label>Who is it for?</Label>
            <input
              className="field"
              placeholder="e.g. Priya Sharma, Talent Acquisition at Zomato; or 'a senior from my college now at Google'"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>

          <div>
            <Label>Context & what you want</Label>
            <textarea
              className="field min-h-28"
              placeholder="e.g. I applied for the SDE intern role (job ID 1234) last week. I built a similar payments feature in my college project. Want to ask for a referral."
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>

          <div>
            <Label>Tone</Label>
            <select className="field" value={tone} onChange={(e) => setTone(e.target.value)}>
              {TONES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {!profile && <p className="text-xs text-muted">Tip: upload your profile to get messages that mention your real background.</p>}

          <Button className="w-full" disabled={gen.loading} onClick={() => gen.run(messagePrompt(profile, kind, recipient.trim(), context.trim(), tone))}>
            {gen.loading ? "Writing…" : "Write 3 versions"}
          </Button>
        </Card>

        <OutputPanel
          output={gen.output}
          loading={gen.loading}
          error={gen.error}
          meta={gen.meta}
          onStop={gen.stop}
          draftType="message"
          draftTitle={`${selected.label}${recipient ? ` — ${recipient}` : ""}`}
          emptyHint="You'll get three variants — short, warm and direct — plus a tip on when to send."
        />
      </div>
    </>
  );
}
