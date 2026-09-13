"use client";

import { useState } from "react";
import { Icon } from "@/components/shell/Icon";

const SECTIONS = ["QA", "LRDI", "VARC", "General"];

export function AskForm({ hue }: { hue: string }) {
  const [section, setSection] = useState("QA");
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-2xl glass-strong p-6 depth-shadow sm:p-8"
      style={{ ["--h" as string]: hue } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--h)" }}
      />
      {sent ? (
        <div className="relative flex flex-col items-center py-8 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-success/20 ring-1 ring-white/10">
            <Icon name="Sparkles" className="h-7 w-7 text-success" />
          </span>
          <h3 className="mt-4 text-lg font-semibold">Doubt posted</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            This is a preview. Once the backend is connected, your question will
            reach mentors and the community for a fast resolution.
          </p>
          <button
            onClick={() => {
              setSent(false);
              setText("");
            }}
            className="mt-5 rounded-lg glass px-4 py-2 text-sm transition-colors hover:text-foreground"
          >
            Ask another
          </button>
        </div>
      ) : (
        <form
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
            if (text.trim()) setSent(true);
          }}
        >
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSection(s)}
                className={`rounded-lg px-3 py-1.5 text-sm ring-1 transition-colors ${
                  section === s
                    ? "text-foreground ring-white/25"
                    : "text-muted-foreground ring-white/10 hover:text-foreground"
                }`}
                style={
                  section === s
                    ? {
                        background:
                          "color-mix(in oklch, var(--h) 22%, transparent)",
                      }
                    : undefined
                }
              >
                {s}
              </button>
            ))}
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="Type your doubt here — paste the question, add where you got stuck…"
            className="mt-4 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-4 text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-white/25"
          />

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Posting under <span className="text-foreground">{section}</span>
            </span>
            <button
              type="submit"
              disabled={!text.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary/80 px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_12px_30px_-10px_var(--color-primary)] transition-transform enabled:hover:scale-[1.03] enabled:active:scale-95 disabled:opacity-50"
            >
              Post doubt
              <Icon name="ArrowRight" className="h-4 w-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
