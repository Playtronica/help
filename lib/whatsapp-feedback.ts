/**
 * Shared library for the temporary WhatsApp feedback channel.
 *
 * Both `WhatsAppFeedback` (floating button + highlight-to-report) and
 * `FeedbackWidget` (in-article "Did this answer? NO" branch) call into here so
 * the message format and the Mac-paste-bug workaround are defined in exactly
 * one place.
 *
 * Mac WhatsApp app sometimes drops the pre-filled text from `wa.me` deeplinks,
 * especially after the user has already opened the conversation. The fix here
 * is to always copy the full message to the system clipboard BEFORE opening
 * the wa.me link. If the prefill works → great. If it doesn't → user pastes.
 * Either way the data reaches WhatsApp.
 */

/**
 * WhatsApp destination number for feedback. Set via env var so the actual
 * number is not in the public source tree. Falls back to an empty string,
 * which makes the feedback widgets gracefully no-op if the env var is missing.
 *
 * Set `NEXT_PUBLIC_WHATSAPP_FEEDBACK_NUMBER` in `.env.local` for dev, and in
 * Cloudflare Pages → Settings → Environment Variables for production. The
 * value is a phone number in international format with no leading "+" or
 * spaces (e.g. `351912345678`).
 */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_FEEDBACK_NUMBER ?? "";

/** True only when the env var is set — callers should hide the widget otherwise. */
export const WHATSAPP_ENABLED = WHATSAPP_NUMBER.length > 0;

const MAX_SELECTED_CHARS = 240;
const MAX_TOTAL_MESSAGE_CHARS = 1200; // Safe well below wa.me + WhatsApp UI limits

export type FeedbackPayload = {
  pageUrl: string;
  heading?: string;
  selectedText?: string;
  note?: string;
};

export function buildMessageText(opts: FeedbackPayload): string {
  const lines: string[] = ["Help center feedback", "", `Page: ${opts.pageUrl}`];
  if (opts.heading) lines.push(`Section: ${opts.heading}`);
  if (opts.selectedText) {
    const trimmed = opts.selectedText.slice(0, MAX_SELECTED_CHARS);
    lines.push(
      `Selected: "${trimmed}${opts.selectedText.length > MAX_SELECTED_CHARS ? "…" : ""}"`,
    );
  }
  lines.push("", `My note: ${opts.note ?? ""}`);
  let text = lines.join("\n");
  if (text.length > MAX_TOTAL_MESSAGE_CHARS) {
    text = text.slice(0, MAX_TOTAL_MESSAGE_CHARS - 3) + "...";
  }
  return text;
}

export function buildWhatsAppLink(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Best-effort clipboard copy — the fallback for the Mac WhatsApp prefill bug,
 * where the desktop app sometimes drops the pre-filled `wa.me` text.
 *
 * The actual WhatsApp open is NOT done here. It is a native `<a href>` in the
 * UI components: a real link tap opens the deeplink reliably on every platform,
 * including iOS Safari, where a JavaScript `window.open` is blocked once the
 * user-gesture call stack is lost. This copy runs as a side-effect of that tap
 * and is intentionally fire-and-forget — it must never block the navigation.
 */
export function copyMessage(text: string): void {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => {
      /* clipboard permission denied — the wa.me prefill still carries the text */
    });
  }
}

/* ─── Feedback funnel instrumentation ──────────────────────────────────────
 *
 * The whole point: a month with zero WhatsApp messages tells us nothing on its
 * own. We cannot tell apart "nobody clicks" from "people click but the wa.me
 * hand-off / number is broken". This counts every step of the funnel so the
 * drop-off is visible.
 *
 * Funnel: shown → open → send. Read it as:
 *   - high `*_shown`, ~0 `*_open`  → discovery problem (button ignored)
 *   - `*_open` > 0, ~0 `*_send`    → form/intent friction
 *   - `*_send` > 0 but no messages → delivery problem (wrong number / wa.me)
 *
 * Three sinks, all best-effort and non-blocking:
 *   1. Microsoft Clarity custom event + tag — works TODAY (Clarity is live).
 *      Lets us both COUNT events and FILTER session recordings by them — i.e.
 *      watch the actual recording of someone who tapped "Send" and see what
 *      happened next. This is the debug surface.
 *   2. GA4 event — activates automatically once NEXT_PUBLIC_GA4_ID is set.
 *   3. localStorage rolling log — instant local debug via
 *      `window.__playtronicaFeedbackLog` (counts + last 200 events), same
 *      pattern as the SearchBar query log.
 */
export type FeedbackEvent =
  | "fab_shown" // floating "What's missing?" button rendered (impression / denominator)
  | "fab_open" // floating button tapped → modal opened
  | "modal_send" // "Send to WhatsApp" tapped inside the modal
  | "highlight_shown" // selection tooltip appeared
  | "highlight_send" // selection → WhatsApp tapped
  | "inline_yes" // in-article "Did this answer?" → Yes
  | "inline_no" // in-article → No (textarea opened)
  | "inline_send"; // in-article → Send tapped

const FB_LOG_KEY = "playtronica.feedback.log";
const FB_LOG_MAX = 200;

export function trackFeedback(event: FeedbackEvent, detail?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const w = window as any;
  const page = typeof location !== "undefined" ? location.pathname : "";

  // 1. Clarity — custom event (counts) + tag (filter recordings). Live today.
  try {
    w.clarity?.("event", `feedback_${event}`);
    w.clarity?.("set", "feedback_action", event);
  } catch {
    /* Clarity not loaded — non-fatal */
  }

  // 2. GA4 — no-op until the tag is configured.
  try {
    w.gtag?.("event", `feedback_${event}`, {
      event_category: "whatsapp_feedback",
      page_path: page,
      ...detail,
    });
  } catch {
    /* gtag not loaded — non-fatal */
  }

  // 3. localStorage rolling log — instant debug, no backend required.
  try {
    const raw = localStorage.getItem(FB_LOG_KEY);
    const log: { counts: Record<string, number>; events: unknown[] } = raw
      ? JSON.parse(raw)
      : { counts: {}, events: [] };
    log.counts[event] = (log.counts[event] || 0) + 1;
    log.events.push({ event, page, ts: Date.now(), ...detail });
    if (log.events.length > FB_LOG_MAX) log.events = log.events.slice(-FB_LOG_MAX);
    localStorage.setItem(FB_LOG_KEY, JSON.stringify(log));
    w.__playtronicaFeedbackLog = log;
  } catch {
    /* localStorage blocked — best-effort only */
  }
}
