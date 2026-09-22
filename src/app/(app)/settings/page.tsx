"use client";

import { useEffect, useState } from "react";
import { Badge, Button, Card, Label, PageHeader, Spinner } from "@/components/ui";
import { SetupSteps } from "@/components/SetupSteps";
import { listModels } from "@/lib/ai/client";
import { PROVIDERS, PROVIDER_BY_ID, type ModelOption, type ProviderId, type ProviderInfo } from "@/lib/config";
import { clearEverything } from "@/lib/db";
import {
  clearAllKeys,
  getActiveProvider,
  getKey,
  getModel,
  getRemember,
  maskKey,
  setActiveProvider,
  setKey,
  setModel,
  setRemember,
  type ActiveProvider,
} from "@/lib/keys";
import { useIsClient } from "@/lib/useIsClient";

interface Row {
  key: string;
  model: string;
  editing: boolean;
  savedFlash: boolean;
  /** Models fetched live from the provider with the student's key. */
  liveModels: string[] | null;
  loadingModels: boolean;
  modelsError: string | null;
}

const CUSTOM = "__custom__";

function loadRows(): Record<ProviderId, Row> {
  return Object.fromEntries(
    PROVIDERS.map((p) => [
      p.id,
      { key: getKey(p.id), model: getModel(p.id), editing: false, savedFlash: false, liveModels: null, loadingModels: false, modelsError: null },
    ]),
  ) as Record<ProviderId, Row>;
}

export default function SettingsPage() {
  // Keys live in browser storage, so the form only renders after hydration.
  const isClient = useIsClient();
  if (!isClient) return null;
  return <SettingsForm />;
}

function SettingsForm() {
  const [active, setActive] = useState<ActiveProvider>(getActiveProvider);
  const [remember, setRememberState] = useState(getRemember);
  const [rows, setRows] = useState<Record<ProviderId, Row>>(loadRows);
  const [cleared, setCleared] = useState(false);
  const [sharedKey, setSharedKey] = useState<boolean | null>(null);
  const anyKey = PROVIDERS.some((p) => !!rows[p.id].key);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/status")
      .then((r) => r.json())
      .then((d: { sharedKey: boolean }) => !cancelled && setSharedKey(d.sharedKey))
      .catch(() => !cancelled && setSharedKey(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const update = (id: ProviderId, patch: Partial<Row>) => setRows((r) => ({ ...r, [id]: { ...r[id], ...patch } }));

  const save = (id: ProviderId) => {
    const key = rows[id].key.trim();
    setKey(id, key);
    setModel(id, rows[id].model);
    const nextActive: ActiveProvider = key ? id : active === id ? "shared" : active;
    setActiveProvider(nextActive);
    setActive(nextActive);
    update(id, { editing: false, savedFlash: true, key });
    setTimeout(() => update(id, { savedFlash: false }), 1500);
  };

  const loadLive = async (id: ProviderId) => {
    const key = rows[id].key.trim();
    if (!key) return;
    update(id, { loadingModels: true, modelsError: null });
    try {
      const models = await listModels(id, key);
      update(id, { liveModels: models, loadingModels: false });
    } catch (e) {
      update(id, { loadingModels: false, modelsError: e instanceof Error ? e.message : "Could not load models — check the key." });
    }
  };

  return (
    <>
      <PageHeader title="Settings" description="Bring your own API key (BYOK). It's stored only in this browser and sent straight to the provider — never to us." />

      <div className="space-y-4">
        {!anyKey && (
          <Card className="space-y-3 border-accent/40 bg-accent-soft">
            <div className="flex items-center gap-2">
              <span aria-hidden>🔑</span>
              <span className="font-medium">Start here: get a free key (about 1 minute)</span>
            </div>
            <p className="text-sm">
              ProfilePolish uses an AI provider to write your drafts. You bring your own key so the app stays free and your text never
              passes through our server.
              {sharedKey === false && " This deployment has no shared key, so a key of your own is required."}
              {sharedKey === true && " You can also try a few requests a day on the shared key without any setup."}
            </p>
            <ol className="ml-5 list-decimal space-y-1 text-sm">
              <li>
                Pick <strong>Google Gemini</strong> below — it&apos;s free and needs no credit card.
              </li>
              <li>
                Open <strong>How do I get this key?</strong> and follow the {PROVIDER_BY_ID.gemini.setupSteps.length} steps.
              </li>
              <li>Paste the key, click <strong>Save</strong>, and you&apos;re done.</li>
            </ol>
            <p className="text-xs text-muted">
              Free tiers have daily limits. If you run out, switch to Groq (also free) in the same way.
            </p>
          </Card>
        )}

        <Card className="space-y-3">
          <div>
            <div className="font-medium">Which AI to use</div>
            <p className="text-sm text-muted">
              {sharedKey === false
                ? "This deployment doesn't have a shared key, so you'll need your own. It's free and takes a minute — steps are below."
                : "With no key of your own, requests use the app's shared free key — limited to a few per day per person so everyone gets a turn."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ProviderPill
              selected={active === "shared" && sharedKey !== false}
              disabled={sharedKey === false}
              onClick={() => { setActiveProvider("shared"); setActive("shared"); }}
            >
              Shared free key{sharedKey === false ? " (not available)" : ""}
            </ProviderPill>
            {PROVIDERS.map((p) => (
              <ProviderPill key={p.id} selected={active === p.id} disabled={!rows[p.id].key} onClick={() => { setActiveProvider(p.id); setActive(p.id); }}>
                {p.name}
              </ProviderPill>
            ))}
          </div>
        </Card>

        <Card>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              className="mt-1"
              checked={remember}
              onChange={(e) => {
                setRemember(e.target.checked);
                setRememberState(e.target.checked);
              }}
            />
            <span className="text-sm">
              <span className="font-medium">Remember my keys on this device</span>
              <span className="block text-muted">
                Off (default): keys are forgotten when you close this tab. Turn on <strong>only on your personal laptop</strong> — never on a college lab or shared computer.
              </span>
            </span>
          </label>
        </Card>

        {PROVIDERS.map((p) => (
          <ProviderCard
            key={p.id}
            provider={p}
            row={rows[p.id]}
            isActive={active === p.id}
            onChange={(patch) => update(p.id, patch)}
            onSave={() => save(p.id)}
            onLoadModels={() => loadLive(p.id)}
            onRemove={() => {
              setKey(p.id, "");
              update(p.id, { key: "", editing: false, liveModels: null });
              if (active === p.id) {
                setActiveProvider("shared");
                setActive("shared");
              }
            }}
            onCancel={() => update(p.id, { editing: false, key: getKey(p.id), model: getModel(p.id) })}
          />
        ))}

        <Card className="space-y-2">
          <div className="font-medium">Your data</div>
          <p className="text-sm text-muted">Your profile, drafts and keys exist only in this browser. Use this before leaving a shared computer.</p>
          <Button
            variant="danger"
            onClick={async () => {
              clearAllKeys();
              await clearEverything();
              setRows(loadRows());
              setActive("shared");
              setRememberState(false);
              setCleared(true);
            }}
          >
            {cleared ? "Everything cleared ✓" : "Clear all my data on this device"}
          </Button>
        </Card>
      </div>
    </>
  );
}

interface ProviderCardProps {
  provider: ProviderInfo;
  row: Row;
  isActive: boolean;
  onChange: (patch: Partial<Row>) => void;
  onSave: () => void;
  onLoadModels: () => void;
  onRemove: () => void;
  onCancel: () => void;
}

function ProviderCard({ provider: p, row, isActive, onChange, onSave, onLoadModels, onRemove, onCancel }: ProviderCardProps) {
  const hasKey = !!row.key;
  const showForm = row.editing || !hasKey;

  // Curated list + anything the provider reported + whatever is currently set.
  const options: ModelOption[] = [...p.models];
  for (const id of row.liveModels ?? []) if (!options.some((o) => o.id === id)) options.push({ id, label: id });
  const isCustom = !options.some((o) => o.id === row.model);
  const [customMode, setCustomMode] = useState(isCustom);
  const selectedNote = options.find((o) => o.id === row.model)?.note;
  const looksWrong = row.key.trim().length > 6 && !row.key.trim().startsWith(p.keyPrefix);

  return (
    <Card className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium">{p.name}</span>
          {p.free ? <Badge tone="success">Free tier</Badge> : <Badge tone="warn">Paid</Badge>}
          {isActive && <Badge tone="accent">In use</Badge>}
          {hasKey && !row.editing && <Badge>Key saved · {maskKey(row.key)}</Badge>}
        </div>
        <a href={p.keyUrl} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">
          Get a key ↗
        </a>
      </div>
      <p className="text-sm text-muted">{p.keyHint}</p>

      <SetupSteps provider={p} defaultOpen={showForm && !row.key} />

      {showForm ? (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>API key</Label>
              <input
                className="field font-mono text-sm"
                type="password"
                autoComplete="off"
                placeholder={p.keyPlaceholder}
                value={row.key}
                onChange={(e) => onChange({ key: e.target.value })}
              />
              {looksWrong && (
                <p className="mt-1 text-xs text-warning-fg">
                  {p.name} keys normally start with <code className="font-mono">{p.keyPrefix}</code> — double-check you copied the whole key.
                </p>
              )}
            </div>
            <div>
              <Label
                hint={
                  row.loadingModels ? "loading…" : row.liveModels ? `${row.liveModels.length} live models loaded` : undefined
                }
              >
                Model
              </Label>
              {customMode ? (
                <div className="flex gap-2">
                  <input className="field font-mono text-sm" value={row.model} onChange={(e) => onChange({ model: e.target.value })} placeholder="model-id" />
                  <Button variant="ghost" onClick={() => { setCustomMode(false); onChange({ model: p.defaultModel }); }}>
                    List
                  </Button>
                </div>
              ) : (
                <select
                  className="field"
                  value={row.model}
                  onChange={(e) => {
                    if (e.target.value === CUSTOM) {
                      setCustomMode(true);
                      onChange({ model: "" });
                    } else onChange({ model: e.target.value });
                  }}
                >
                  {options.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                      {o.id === p.defaultModel ? " (default)" : ""}
                    </option>
                  ))}
                  <option value={CUSTOM}>Custom model id…</option>
                </select>
              )}
              {!customMode && selectedNote && <p className="mt-1 text-xs text-muted">{selectedNote}</p>}
            </div>
          </div>
          {row.modelsError && <p className="text-xs text-danger">{row.modelsError}</p>}
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={onSave} disabled={!row.model.trim()}>
              Save
            </Button>
            <Button variant="secondary" onClick={onLoadModels} disabled={!row.key.trim() || row.loadingModels}>
              {row.loadingModels ? <Spinner /> : null} Load models from {p.name.split(" ")[0]}
            </Button>
            {hasKey && (
              <Button variant="ghost" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted">
            Model: <code className="font-mono">{row.model}</code>
          </span>
          <Button variant="ghost" onClick={() => onChange({ editing: true })}>
            Change key / model
          </Button>
          <Button variant="ghost" onClick={onRemove}>
            Remove key
          </Button>
          {row.savedFlash && <span className="text-success">Saved ✓</span>}
        </div>
      )}
    </Card>
  );
}

function ProviderPill({ selected, disabled, onClick, children }: { selected: boolean; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      title={disabled ? "Add a key below first" : undefined}
      className={`rounded-full border px-3 py-1.5 text-sm transition disabled:cursor-not-allowed disabled:opacity-40 ${
        selected ? "border-accent bg-accent text-white" : "border-border hover:bg-accent-soft"
      }`}
    >
      {children}
    </button>
  );
}
