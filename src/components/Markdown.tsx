"use client";

import ReactMarkdown from "react-markdown";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="md text-[0.95rem]">
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}
