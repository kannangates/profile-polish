"use client";

import { useState } from "react";
import { FileDrop } from "@/components/FileDrop";
import { OutputPanel } from "@/components/OutputPanel";
import { Button, Card, Label, PageHeader, Spinner } from "@/components/ui";
import { useGenerate } from "@/components/useGenerate";
import { atsPrompt, resumeFixPrompt } from "@/lib/ai/prompts";
import { atsReportToText, runAtsChecks, type AtsReport } from "@/lib/ats";
import { extractResumeText } from "@/lib/pdf";

export default function ResumePage() {
  const [resume, setResume] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [jd, setJd] = useState("");
  const [target, setTarget] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<AtsReport | null>(null);
  const [mode, setMode] = useState<"ats" | "fix">("ats");
  const gen = useGenerate();

  async function handleFile(f: File) {
    setBusy(true);
    setError(null);
    try {
      const text = await extractResumeText(f);
      if (text.trim().length < 100) throw new Error("Very little text found. If your resume is an image or a designed PDF, ATS bots can't read it either — that's finding #1.");
      setResume(text);
      setFileName(f.name);
      setReport(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read the file.");
    } finally {
      setBusy(false);
    }
  }

  function runChecks() {
    const r = runAtsChecks(resume, jd);
    setReport(r);
    return r;
  }

  function runAts() {
    const r = runChecks();
    setMode("ats");
    gen.run(atsPrompt(resume, jd.trim(), atsReportToText(r)));
  }

  function runFix() {
    setMode("fix");
    gen.run(resumeFixPrompt(resume, target.trim()));
  }

  return (
    <>
      <PageHeader title="Resume ATS Check & Fix" description="Instant rule-based ATS score (no AI needed), then AI-powered keyword gaps, bullet rewrites and a corrected resume." />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="space-y-4">
          <Card className="space-y-4">
            <FileDrop accept=".pdf,.docx,.txt,application/pdf" onFile={handleFile} disabled={busy}>
              {busy ? (
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Spinner className="text-accent" /> Reading…
                </div>
              ) : fileName ? (
                <p className="text-sm">
                  <span className="font-medium">{fileName}</span> loaded — drop another to replace
                </p>
              ) : (
                <>
                  <p className="font-medium">Drop your resume (PDF, DOCX or TXT)</p>
                  <p className="mt-1 text-xs text-muted">Parsed in your browser. Never uploaded.</p>
                </>
              )}
            </FileDrop>
            {error && <p className="text-sm text-danger">{error}</p>}
            <details className="text-sm">
              <summary className="cursor-pointer text-muted">Or paste resume text</summary>
              <textarea className="field mt-2 min-h-32" value={resume} onChange={(e) => setResume(e.target.value)} placeholder="Paste your resume text…" />
            </details>

            <div>
              <Label hint="strongly recommended">Job description</Label>
              <textarea
                className="field min-h-28"
                placeholder="Paste the JD you're applying to. We'll match keywords against it."
                value={jd}
                onChange={(e) => setJd(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" disabled={!resume.trim()} onClick={runChecks}>
                Quick ATS score (free, instant)
              </Button>
              <Button disabled={!resume.trim() || gen.loading} onClick={runAts}>
                {gen.loading && mode === "ats" ? "Analysing…" : "Full ATS review with AI"}
              </Button>
            </div>
          </Card>

          <Card className="space-y-3">
            <div>
              <Label hint="optional">Target role for the rewrite</Label>
              <input className="field" placeholder="e.g. Data analyst intern, Frontend developer" value={target} onChange={(e) => setTarget(e.target.value)} />
            </div>
            <Button variant="secondary" className="w-full" disabled={!resume.trim() || gen.loading} onClick={runFix}>
              {gen.loading && mode === "fix" ? "Rewriting…" : "Rewrite my resume"}
            </Button>
          </Card>

          {report && <AtsScoreCard report={report} />}
        </div>

        <OutputPanel
          output={gen.output}
          loading={gen.loading}
          error={gen.error}
          meta={gen.meta}
          onStop={gen.stop}
          draftType="resume"
          draftTitle={mode === "ats" ? `ATS review — ${fileName ?? "resume"}` : `Resume rewrite — ${target || fileName || "resume"}`}
          emptyHint="Upload your resume and a job description. The quick score is instant and free; the AI review adds keyword gaps and bullet rewrites."
        />
      </div>
    </>
  );
}

function AtsScoreCard({ report }: { report: AtsReport }) {
  const tone = report.score >= 75 ? "text-success" : report.score >= 50 ? "text-warning-fg" : "text-danger";
  return (
    <Card className="space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="font-medium">Quick ATS score</span>
        <span className={`text-2xl font-semibold ${tone}`}>{report.score}/100</span>
      </div>
      <ul className="space-y-1.5 text-sm">
        {report.checks.map((c) => (
          <li key={c.id} className="flex gap-2">
            <span className={c.pass ? "text-success" : "text-danger"} aria-hidden>
              {c.pass ? "✓" : "✗"}
            </span>
            <div>
              <div className={c.pass ? "" : "font-medium"}>{c.label}</div>
              {!c.pass && <div className="text-xs text-muted">{c.detail}</div>}
            </div>
          </li>
        ))}
      </ul>
      {report.missingKeywords.length > 0 && (
        <div className="text-sm">
          <div className="mb-1 font-medium">Missing JD keywords</div>
          <div className="flex flex-wrap gap-1">
            {report.missingKeywords.map((k) => (
              <span key={k} className="rounded-full bg-danger/10 px-2 py-0.5 text-xs text-danger">
                {k}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
