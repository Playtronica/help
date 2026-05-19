"use client";
import { useState } from "react";

export function FeedbackWidget({ slug }: { slug: string }) {
  const [state, setState] = useState<"idle" | "yes" | "no" | "submitted">("idle");
  const [note, setNote] = useState("");

  async function send(value: "yes" | "no", body: string) {
    // Local dev: log to console. Production: POST to /api/feedback (Cloudflare Workers KV).
    const payload = { slug, value, note: body, ts: new Date().toISOString() };
    if (typeof window !== "undefined") {
      try {
        await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch { /* ignore in static build */ }
      console.info("[feedback]", payload);
    }
    setState("submitted");
  }

  if (state === "submitted") {
    return (
      <p className="mt-8 border-[1.5px] border-rule bg-accent-soft px-4 py-3 text-[14px] text-ink">
        Thanks — we read every one of these.
      </p>
    );
  }

  return (
    <div className="mt-10 border-[1.5px] border-rule bg-white p-4">
      {state === "idle" && (
        <div className="flex flex-wrap items-center gap-3 text-[15px]">
          <span className="font-semibold">Did this answer your question?</span>
          <button
            onClick={() => { setState("yes"); send("yes", ""); }}
            className="min-h-[36px] border-[1.5px] border-ink bg-ink px-3 py-1 text-[14px] text-bg transition hover:bg-accent hover:border-accent"
          >
            Yes
          </button>
          <button
            onClick={() => setState("no")}
            className="min-h-[36px] border-[1.5px] border-rule bg-white px-3 py-1 text-[14px] transition hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-block-sm"
          >
            No
          </button>
        </div>
      )}
      {state === "no" && (
        <div className="space-y-2 text-[15px]">
          <label className="block font-semibold">What were you looking for?</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full border-[1.5px] border-rule bg-white p-2 text-[14px] outline-none focus:border-accent"
            placeholder="A sentence is fine."
          />
          <button
            onClick={() => send("no", note)}
            className="min-h-[36px] border-[1.5px] border-ink bg-ink px-3 py-1 text-[14px] text-bg transition hover:bg-accent hover:border-accent"
          >
            Send feedback
          </button>
        </div>
      )}
    </div>
  );
}
