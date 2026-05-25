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
