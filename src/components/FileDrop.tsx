"use client";

import { useRef, useState, type ReactNode } from "react";

interface Props {
  accept: string;
  onFile: (file: File) => void;
  children: ReactNode;
  disabled?: boolean;
}

export function FileDrop({ accept, onFile, children, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => e.key === "Enter" && !disabled && inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const f = e.dataTransfer.files?.[0];
        if (f && !disabled) onFile(f);
      }}
      className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition ${
        over ? "border-accent bg-accent-soft" : "border-border hover:border-accent/60 hover:bg-accent-soft/40"
      } ${disabled ? "pointer-events-none opacity-60" : ""}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
          e.target.value = "";
        }}
      />
      {children}
    </div>
  );
}
