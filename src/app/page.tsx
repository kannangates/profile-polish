"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileDrop } from "@/components/FileDrop";
import { Button, Card, LinkButton, Spinner } from "@/components/ui";
import { APP_NAME, APP_TAGLINE } from "@/lib/config";
import { clearProfile, saveProfile } from "@/lib/db";
import { useProfile } from "@/lib/hooks";
import { extractPdfLines } from "@/lib/pdf";
import { parseLinkedInPdf, parsePlainText, profileSummaryLine, type ParsedProfile } from "@/lib/profile-parser";

type Mode = "upload" | "paste";

export default function OnboardingPage() {
  const router = useRouter();
  const existing = useProfile();
  const [mode, setMode] = useState<Mode>("upload");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsed, setParsed] = useState<ParsedProfile | null>(null);
  const [source, setSource] = useState<"pdf" | "text">("pdf");
  const [pasted, setPasted] = useState("");
  const [replacing, setReplacing] = useState(false);

  async function handleFile(file: File) {
    setError(null);
    setBusy(true);
    try {
      if (!/\.pdf$/i.test(file.name) && file.type !== "application/pdf") throw new Error("Please upload the PDF that LinkedIn generates (Profile → More → Save to PDF).");
      const lines = await extractPdfLines(file);
      if (lines.length < 5) throw new Error("We couldn't read text from this PDF. Make sure it's LinkedIn's export, not a scan or screenshot.");
      setParsed(parseLinkedInPdf(lines));
      setSource("pdf");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read the file.");
    } finally {
      setBusy(false);
    }
  }

  function handlePaste() {
    if (pasted.trim().length < 40) {
      setError("Paste a bit more — at least your headline and About section.");
      return;
    }
    setError(null);
    setParsed(parsePlainText(pasted));
    setSource("text");
  }

  async function confirm() {
    if (!parsed) return;
    await saveProfile({ ...parsed, source });
    router.push("/profile");
  }

  // Loading IndexedDB
  if (existing === undefined) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner className="text-accent" />
      </div>
    );
  }

  // Welcome back — no forced re-upload.
  if (existing && !replacing && !parsed) {
    return (
      <Shell>
        <Card className="space-y-4 text-center">
          <h2 className="text-xl font-semibold">Welcome back{existing.name ? `, ${existing.name.split(" ")[0]}` : ""} 👋</h2>
          <p className="text-sm text-muted">Your profile is still loaded in this browser (it auto-clears 48h after upload).</p>
          <div className="flex flex-wrap justify-center gap-2">
            <LinkButton href="/profile">Continue</LinkButton>
            <Button variant="secondary" onClick={() => setReplacing(true)}>
              Upload a new PDF
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                await clearProfile();
                setReplacing(true);
              }}
            >
              Remove profile
            </Button>
          </div>
        </Card>
      </Shell>
    );
  }

  // Preview after parsing
  if (parsed) {
    return (
      <Shell>
        <Card className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Does this look right?</h2>
            <p className="text-sm text-muted">{profileSummaryLine(parsed)}</p>
          </div>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <Field label="Name" value={parsed.name} />
            <Field label="Location" value={parsed.location} />
            <Field label="Headline" value={parsed.headline} full />
            <Field label="Top skills" value={parsed.skills.join(", ")} full />
          </dl>
          <details className="text-sm">
            <summary className="cursor-pointer text-accent">Show everything we extracted</summary>
            <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-accent-soft p-3 text-xs">{parsed.raw}</pre>
          </details>
          <p className="text-xs text-muted">The AI reads the full text above, so even if the name or headline was mis-detected, your suggestions will still be accurate.</p>
          <div className="flex flex-wrap gap-2">
            <Button onClick={confirm}>Looks good — continue</Button>
            <Button variant="secondary" onClick={() => setParsed(null)}>
              Try another file
            </Button>
          </div>
        </Card>
      </Shell>
    );
  }

  return (
    <Shell>
      <Card className="space-y-5">
        <div className="flex gap-2 text-sm">
          <TabButton active={mode === "upload"} onClick={() => setMode("upload")}>
            Upload LinkedIn PDF
          </TabButton>
          <TabButton active={mode === "paste"} onClick={() => setMode("paste")}>
            Paste profile text
          </TabButton>
        </div>

        {mode === "upload" ? (
          <>
            <FileDrop accept="application/pdf,.pdf" onFile={handleFile} disabled={busy}>
              {busy ? (
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Spinner className="text-accent" /> Reading your profile…
                </div>
              ) : (
                <>
                  <div className="text-3xl" aria-hidden>
                    📄
                  </div>
                  <p className="mt-2 font-medium">Drop your LinkedIn PDF here, or click to choose</p>
                  <p className="mt-1 text-xs text-muted">Read entirely in your browser. The file is never uploaded anywhere.</p>
                </>
              )}
            </FileDrop>
            <ol className="grid gap-2 text-sm text-muted sm:grid-cols-3">
              <Step n={1}>Open your LinkedIn profile (web, not the app)</Step>
              <Step n={2}>
                Click <strong>More</strong> (or <strong>Resources</strong>) under your name
              </Step>
              <Step n={3}>
                Choose <strong>Save to PDF</strong>, then upload it here
              </Step>
            </ol>
          </>
        ) : (
          <div className="space-y-3">
            <textarea
              className="field min-h-40"
              placeholder="Paste your name, headline, About section, experience, education and skills…"
              value={pasted}
              onChange={(e) => setPasted(e.target.value)}
            />
            <Button onClick={handlePaste}>Use this text</Button>
          </div>
        )}

        {error && <p className="text-sm text-danger">{error}</p>}

        <div className="space-y-3 border-t border-border pt-4 text-center text-sm">
          <div>
            <LinkButton href="/posts" variant="ghost">
              Continue without profile →
            </LinkButton>
            <p className="mt-1 text-xs text-muted">You can still write posts and messages; suggestions just won&apos;t be personalised.</p>
          </div>
          <p className="text-xs text-muted">
            You&apos;ll also need a free AI key to generate anything —{" "}
            <Link href="/settings" className="text-accent hover:underline">
              set it up in Settings
            </Link>{" "}
            (about a minute, no credit card).
          </p>
        </div>
      </Card>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-10">
      <div className="mb-8 text-center">
        <div className="text-sm font-medium text-accent">
          <span aria-hidden>●</span> {APP_NAME}
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{APP_TAGLINE}</h1>
        <p className="mt-2 max-w-lg text-sm text-muted">
          Polish your profile, draft messages and posts, and check your resume against ATS rules. Free forever — your data never leaves your browser.
        </p>
      </div>
      <div className="w-full max-w-2xl">{children}</div>
    </div>
  );
}

function Field({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-0.5">{value || <span className="text-muted">— not detected</span>}</dd>
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-2 rounded-lg border border-border p-3">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">{n}</span>
      <span>{children}</span>
    </li>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 font-medium transition ${active ? "bg-accent text-white" : "border border-border text-muted hover:text-foreground"}`}
    >
      {children}
    </button>
  );
}
