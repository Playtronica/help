"use client";

/**
 * WhatsAppFeedback — temporary feedback channel that routes user reports
 * directly to the team's WhatsApp. Two modes:
 *
 *   A. Highlight-to-report — select any text on the page, a "📍 Help improve
 *      this" link appears near the selection.
 *
 *   C. Floating "What's missing?" button — bottom-right of every page.
 *
 * BOTH actions are real `<a href>` links, not buttons with JS handlers. A
 * native link tap opens the wa.me deeplink reliably on every platform —
 * including iOS Safari, where a JavaScript window.open is blocked once the
 * tap's user-gesture call stack is lost. The clipboard copy is a fire-and-
 * forget side-effect (the Mac WhatsApp prefill-bug fallback).
 *
 * The highlight tooltip lingers for 12s and does NOT vanish when the text
 * selection collapses — on iOS the first tap dismisses the selection, so the
 * link must still be there for the tap that follows.
 *
 * To disable site-wide, remove the import + render from `app/layout.tsx`.
 */

import { useEffect, useRef, useState } from "react";
import {
  buildMessageText,
  buildWhatsAppLink,
  copyMessage,
  trackFeedback,
  WHATSAPP_ENABLED,
} from "@/lib/whatsapp-feedback";

type Anchor = {
  top: number;
  left: number;
  text: string;
  heading: string;
};

function findNearestHeadingForRange(range: Range): string {
  let node: Node | null = range.startContainer;
  while (node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const enclosing = el.closest("h2, h3");
      if (enclosing) return enclosing.textContent?.trim() || "";
      let sib: Element | null = el.previousElementSibling;
      while (sib) {
        if (sib.tagName === "H2" || sib.tagName === "H3") {
          return sib.textContent?.trim() || "";
        }
        const inner = sib.querySelector("h2, h3");
        if (inner) return inner.textContent?.trim() || "";
        sib = sib.previousElementSibling;
      }
    }
    node = (node as Node).parentNode;
  }
  return "";
}

function getCurrentVisibleHeading(): string {
  if (typeof document === "undefined") return "";
  const headings = Array.from(document.querySelectorAll("article h2, article h3"));
  let last = "";
  for (const h of headings) {
    const rect = (h as HTMLElement).getBoundingClientRect();
    if (rect.top <= 120) {
      last = (h as HTMLElement).textContent?.trim() || "";
    } else {
      break;
    }
  }
  return last;
}

function isInsideArticle(range: Range): boolean {
  const node =
    range.startContainer.nodeType === Node.ELEMENT_NODE
      ? (range.startContainer as Element)
      : range.startContainer.parentElement;
  return !!node?.closest("article");
}

// The widget is opt-in: it only renders if NEXT_PUBLIC_WHATSAPP_FEEDBACK_NUMBER
// is set. The branch is a build-time constant so hook order is preserved.
export function WhatsAppFeedback() {
  if (!WHATSAPP_ENABLED) return null;
  return <WhatsAppFeedbackInner />;
}

function WhatsAppFeedbackInner() {
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [note, setNote] = useState("");
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    // Impression — the floating button is on screen for this page view. This is
    // the funnel denominator: fab_shown vs fab_open vs modal_send.
    trackFeedback("fab_shown");

    // Show the tooltip when the user finishes a selection. We listen to
    // mouseup / touchend only — NOT selectionchange — so the tooltip is not
    // torn down the instant iOS collapses the selection on the next tap.
    function readSelection() {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) return;
      const text = sel.toString().trim();
      if (text.length < 5 || text.length > 600) return;
      const range = sel.getRangeAt(0);
      if (!isInsideArticle(range)) return;
      const rect = range.getBoundingClientRect();
      const top = rect.bottom + window.scrollY + 8;
      const left = Math.max(8, Math.min(rect.left + window.scrollX, window.innerWidth - 190));
      setAnchor({ top, left, text, heading: findNearestHeadingForRange(range) });
      trackFeedback("highlight_shown");
      // Linger 12s — long enough to tap even after iOS eats the first tap.
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setAnchor(null), 12000);
    }

    // Allow other components (FeedbackWidget "Did this answer? NO") to open
    // the modal with a prefilled note.
    function onOpenEvent(e: Event) {
      const detail = (e as CustomEvent<{ note?: string }>).detail || {};
      setNote(detail.note ?? "");
      setModalOpen(true);
    }

    document.addEventListener("mouseup", readSelection);
    document.addEventListener("touchend", readSelection);
    window.addEventListener("cowork:open-feedback", onOpenEvent);
    return () => {
      document.removeEventListener("mouseup", readSelection);
      document.removeEventListener("touchend", readSelection);
      window.removeEventListener("cowork:open-feedback", onOpenEvent);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  // WhatsApp link for the highlight tooltip — built from the captured selection.
  const tooltipMessage = anchor
    ? buildMessageText({ pageUrl, heading: anchor.heading, selectedText: anchor.text })
    : "";

  // WhatsApp link for the modal — rebuilt live as the note is typed.
  const modalMessage = buildMessageText({
    pageUrl,
    heading: getCurrentVisibleHeading(),
    note: note.trim(),
  });

  return (
    <>
      {/* Highlight-to-report link */}
      {anchor && (
        <a
          href={buildWhatsAppLink(tooltipMessage)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackFeedback("highlight_send");
            copyMessage(tooltipMessage);
            setAnchor(null);
          }}
          style={{
            position: "absolute",
            top: anchor.top,
            left: anchor.left,
            zIndex: 60,
          }}
          className="inline-block rounded-sm border-[1.5px] border-ink bg-ink px-2 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-bg no-underline shadow-block-sm transition hover:border-accent hover:bg-accent"
        >
          📍 Help improve this
        </a>
      )}

      {/* Floating button — selection-aware.
          When the user has selected text, this becomes a direct WhatsApp link
          carrying that selection. The tooltip over the selection is the desktop-
          friendly path; the floating button is the mobile-reliable path because
          it sits far from the selection and iOS does not eat the tap. */}
      {anchor ? (
        <a
          href={buildWhatsAppLink(tooltipMessage)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackFeedback("highlight_send");
            copyMessage(tooltipMessage);
            setAnchor(null);
          }}
          aria-label="Send the selected text to WhatsApp"
          className="fixed right-3 bottom-[136px] z-40 inline-flex h-10 items-center gap-2 rounded-full border-[1.5px] border-ink bg-ink px-3 font-mono text-[11px] uppercase tracking-[0.06em] text-bg no-underline shadow-block-sm transition hover:border-accent hover:bg-accent md:bottom-16 md:h-11 md:px-4"
        >
          <span aria-hidden="true">📍</span>
          <span>Send selection</span>
        </a>
      ) : (
        <button
          type="button"
          onClick={() => {
            trackFeedback("fab_open");
            setModalOpen(true);
          }}
          aria-label="What's missing here?"
          className="fixed right-3 bottom-[136px] z-40 flex h-10 items-center gap-2 rounded-full border-[1.5px] border-ink bg-white px-3 font-mono text-[11px] uppercase tracking-[0.06em] text-ink shadow-block-sm transition hover:border-accent hover:bg-accent hover:text-bg md:bottom-16 md:h-11 md:px-4"
        >
          <span aria-hidden="true">📝</span>
          <span>What&rsquo;s missing?</span>
        </button>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 md:items-center"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-md border-[1.5px] border-ink bg-white p-5 shadow-block"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-1 text-[18px] font-semibold text-ink">
              Help us improve this page
            </h3>
            <p className="mb-3 text-[13px] leading-snug text-ink-soft">
              Tell us what is missing, wrong, or unclear. Your note opens in
              WhatsApp with the page URL and the section you are reading attached.
              You confirm before WhatsApp sends.
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              autoFocus
              className="w-full border-[1.5px] border-rule bg-white p-2 text-[14px] outline-none focus:border-accent"
              placeholder="For example: &lsquo;Biotron iPad setup is missing&rsquo; or &lsquo;Firmware link is broken&rsquo;."
            />
            <p className="mt-2 text-[11px] text-ink-soft">
              Tip — select any sentence on the page first to attach the exact line.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="min-h-[36px] border-[1.5px] border-rule bg-white px-3 py-1 text-[14px] transition hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-block-sm"
              >
                Cancel
              </button>
              <a
                href={buildWhatsAppLink(modalMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackFeedback("modal_send");
                  copyMessage(modalMessage);
                  setModalOpen(false);
                  setNote("");
                }}
                className="inline-flex min-h-[36px] items-center border-[1.5px] border-ink bg-ink px-3 py-1 text-[14px] text-bg no-underline transition hover:border-accent hover:bg-accent"
              >
                Send to WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
