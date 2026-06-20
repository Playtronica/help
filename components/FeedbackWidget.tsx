"use client";
import { useState } from "react";
import {
  buildMessageText,
  buildWhatsAppLink,
  copyMessage,
  trackFeedback,
  WHATSAPP_ENABLED,
} from "@/lib/whatsapp-feedback";

/**
 * FeedbackWidget — in-article "Did this answer your question?" Yes / No.
 *
 *  - YES → logs a one-bit signal for the deflection dashboard.
 *  - NO  → opens a textarea; the typed note opens in WhatsApp via a native
 *          `<a href>` link. A real link tap opens the wa.me deeplink reliably
 *          on every platform, including iOS Safari (a JS window.open is
 *          blocked there once the tap gesture is lost). If WhatsApp is not
 *          configured, the link falls back to a mailto:.
 */
export function FeedbackWidget({ slug }: { slug: string }) {
  const [state, setState] = useState<"idle" | "no" | "submitted">("idle");
  const [note, setNote] = useState("");

  // Lightweight analytics — fire-and-forget. No-op in the static build
  // (there is no /api/feedback endpoint); the console line is the signal.
  function logFeedback(value: "yes" | "no", noteText: string) {
    if (typeof window === "undefined") return;
    const payload = { slug, value, note: noteText, ts: new Date().toISOString() };
    fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {
      /* ignore in static build */
    });
    console.info("[feedback]", payload);
  }

  // Build the NO-branch message + link from the current note. Recomputed each
  // render so the link is always current when the user taps it.
  const heading =
    typeof document !== "undefined"
      ? document.querySelector("article h1, article h2")?.textContent?.trim() || ""
      : "";
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const message = buildMessageText({
    pageUrl,
    heading,
    note: note.trim() || "[did not answer this page's question]",
  });
  const noHref = WHATSAPP_ENABLED
    ? buildWhatsAppLink(message)
    : `mailto:support@playtronica.com?subject=${encodeURIComponent(
        `Help center feedback — ${slug}`,
      )}&body=${encodeURIComponent(message)}`;

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
            type="button"
            onClick={() => {
              trackFeedback("inline_yes");
              logFeedback("yes", "");
              setState("submitted");
            }}
            className="min-h-[36px] border-[1.5px] border-ink bg-ink px-3 py-1 text-[14px] text-bg transition hover:border-accent hover:bg-accent"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => {
              trackFeedback("inline_no");
              setState("no");
            }}
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
            Your note opens in {WHATSAPP_ENABLED ? "WhatsApp" : "your email app"} with
            the page URL attached. You confirm before it sends.
          </p>
          <a
            href={noHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackFeedback("inline_send");
              copyMessage(message);
              logFeedback("no", note.trim());
              setState("submitted");
            }}
            className="inline-flex min-h-[36px] items-center border-[1.5px] border-ink bg-ink px-3 py-1 text-[14px] text-bg no-underline transition hover:border-accent hover:bg-accent"
          >
            Send to {WHATSAPP_ENABLED ? "WhatsApp" : "email"}
          </a>
        </div>
      )}
    </div>
  );
}
