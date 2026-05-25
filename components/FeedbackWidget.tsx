"use client";
import { useState } from "react";
import { copyAndOpen, WHATSAPP_ENABLED } from "@/lib/whatsapp-feedback";

/**
 * FeedbackWidget — in-article "Did this answer your question?" Yes / No.
 *
 *  - YES → POSTs a one-bit signal to /api/feedback for the deflection dashboard.
 *  - NO  → opens a small textarea, then routes the typed note to Andrey on
 *          WhatsApp via the shared copyAndOpen helper. Same path the global
 *          WhatsAppFeedback widget uses; the message lands in WhatsApp with
 *          the page URL + the article slug pre-filled.
 *
 * The YES analytics signal stays — we still want to count satisfied readers.
 * Only the NO branch was rerouted to WhatsApp on 2026-05-19 (decision D50).
 */
export function FeedbackWidget({ slug }: { slug: string }) {
  const [state, setState] = useState<"idle" | "yes" | "no" | "submitted">("idle");
  const [note, setNote] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  async function sendYes() {
    const payload = { slug, value: "yes" as const, note: "", ts: new Date().toISOString() };
    if (typeof window !== "undefined") {
      try {
        await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch {
        /* ignore in static build */
      }
      console.info("[feedback]", payload);
    }
    setState("submitted");
  }

  async function sendNo() {
    // Open WhatsApp / email FIRST, synchronously — before any await. Mobile
    // browsers (iOS Safari) only honour window.open inside the click gesture;
    // an await before it loses the gesture and the open is blocked. The
    // analytics POST below must therefore run AFTER, not before.
    const heading =
      typeof document !== "undefined"
        ? (document.querySelector("article h1, article h2")?.textContent?.trim() || "")
        : "";
    const pageUrl = typeof window !== "undefined" ? window.location.href : "";
    const userNote = note.trim() || "[did not answer this page's question]";

    if (WHATSAPP_ENABLED) {
      const copied = await copyAndOpen({
        pageUrl,
        heading,
        note: userNote,
      });
      setToast(
        copied
          ? "Copied to clipboard — paste in WhatsApp if it did not auto-fill."
          : "Open WhatsApp and tap Send. If the message is empty, paste manually.",
      );
    } else if (typeof window !== "undefined") {
      const subject = `Help center feedback — ${slug}`;
      const body = `Page: ${pageUrl}\nSection: ${heading}\n\nMy note: ${userNote}`;
      window.open(
        `mailto:support@playtronica.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        "_blank",
        "noopener,noreferrer",
      );
      setToast("Opening your email app — send to finish.");
    }

    // Analytics — fire-and-forget AFTER the user-facing action, never awaited
    // before it. No-op in the static build (no /api/feedback endpoint).
    const payload = { slug, value: "no" as const, note: note.trim(), ts: new Date().toISOString() };
    if (typeof window !== "undefined") {
      fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {
        /* ignore in static build */
      });
      console.info("[feedback]", payload);
    }

    window.setTimeout(() => setToast(null), 5000);
    setState("submitted");
  }

  if (state === "submitted") {
    return (
      <>
        <p className="mt-8 border-[1.5px] border-rule bg-accent-soft px-4 py-3 text-[14px] text-ink">
          Thanks — we read every one of these.
        </p>
        {toast && (
          <p
            role="status"
            aria-live="polite"
            className="mt-2 border-[1.5px] border-rule bg-white px-4 py-2 text-[12px] text-ink-soft"
          >
            {toast}
          </p>
        )}
      </>
    );
  }

  return (
    <div className="mt-10 border-[1.5px] border-rule bg-white p-4">
      {state === "idle" && (
        <div className="flex flex-wrap items-center gap-3 text-[15px]">
          <span className="font-semibold">Did this answer your question?</span>
          <button
            onClick={() => {
              setState("yes");
              void sendYes();
            }}
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
          <label className="block font-semibold">What is missing or wrong?</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            autoFocus
            className="w-full border-[1.5px] border-rule bg-white p-2 text-[14px] outline-none focus:border-accent"
            placeholder="A sentence is fine."
          />
          <p className="text-[12px] text-ink-soft">
            Your note goes to Andrey on WhatsApp with the page URL attached. You confirm
            before WhatsApp sends.
          </p>
          <button
            onClick={() => void sendNo()}
            className="min-h-[36px] border-[1.5px] border-ink bg-ink px-3 py-1 text-[14px] text-bg transition hover:bg-accent hover:border-accent"
          >
            Send to WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
