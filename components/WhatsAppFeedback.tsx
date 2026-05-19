"use client";

/**
 * WhatsAppFeedback — temporary feedback channel that routes user reports
 * directly to Andrey's WhatsApp. Two modes:
 *
 *   A. Highlight-to-report — user selects any text on the page, a small
 *      "📍 Report this" tooltip appears near the selection. Tap → opens
 *      WhatsApp with: page URL + nearest heading + the selected text.
 *
 *   C. Floating "What's missing here?" button — bottom-right of every page.
 *      Tap → modal with a textarea. The user types what's missing, taps
 *      "Send to WhatsApp" → opens WhatsApp with: page URL + the currently
 *      visible heading + their note, pre-filled. The user taps Send in
 *      WhatsApp itself (one extra tap; this is also the anti-spam gate).
 *
 * To disable site-wide, remove the import + render from `app/layout.tsx`.
 *
 * The widget never POSTs to a server. The only network call is opening
 * the wa.me deeplink, which the user can cancel inside WhatsApp.
 */

import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "351937910673"; // Andrey personal — feedback channel only

type Anchor = {
  top: number;
  left: number;
  text: string;
  heading: string;
};

function buildWhatsAppLink(opts: {
  pageUrl: string;
  heading?: string;
  selectedText?: string;
  note?: string;
}): string {
  const lines: string[] = ["Help center feedback", "", `Page: ${opts.pageUrl}`];
  if (opts.heading) lines.push(`Section: ${opts.heading}`);
  if (opts.selectedText) {
    const trimmed = opts.selectedText.slice(0, 240);
    lines.push(`Selected: "${trimmed}${opts.selectedText.length > 240 ? "…" : ""}"`);
  }
  lines.push("", `My note: ${opts.note ?? ""}`);
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function findNearestHeadingForRange(range: Range): string {
  // Walk up from the selection start; for each element, check for an enclosing
  // h2/h3 and otherwise the nearest preceding h2/h3 in document order.
  let node: Node | null = range.startContainer;
  while (node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const enclosing = el.closest("h2, h3");
      if (enclosing) return enclosing.textContent?.trim() || "";
      // walk previous siblings looking for a heading
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
  const node = range.startContainer.nodeType === Node.ELEMENT_NODE
    ? (range.startContainer as Element)
    : range.startContainer.parentElement;
  return !!node?.closest("article");
}

export function WhatsAppFeedback() {
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    function readSelection() {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
        setAnchor(null);
        return;
      }
      const text = sel.toString().trim();
      if (text.length < 5 || text.length > 600) {
        setAnchor(null);
        return;
      }
      const range = sel.getRangeAt(0);
      if (!isInsideArticle(range)) {
        setAnchor(null);
        return;
      }
      const rect = range.getBoundingClientRect();
      // Place the tooltip just below the end of the selection. Clamp to viewport.
      const top = rect.bottom + window.scrollY + 6;
      const left = Math.max(8, Math.min(rect.left + window.scrollX, window.innerWidth - 160));
      setAnchor({
        top,
        left,
        text,
        heading: findNearestHeadingForRange(range),
      });
    }

    function onSelectionChange() {
      // selectionchange fires while the user is dragging; we want to commit
      // only when they stop, so debounce a touch.
      window.clearTimeout((onSelectionChange as any)._t);
      (onSelectionChange as any)._t = window.setTimeout(readSelection, 120);
    }

    document.addEventListener("mouseup", readSelection);
    document.addEventListener("touchend", readSelection);
    document.addEventListener("selectionchange", onSelectionChange);
    return () => {
      document.removeEventListener("mouseup", readSelection);
      document.removeEventListener("touchend", readSelection);
      document.removeEventListener("selectionchange", onSelectionChange);
    };
  }, []);

  function reportSelection() {
    if (!anchor) return;
    const url = buildWhatsAppLink({
      pageUrl: window.location.href,
      heading: anchor.heading,
      selectedText: anchor.text,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    setAnchor(null);
    window.getSelection()?.removeAllRanges();
  }

  function submitGeneral() {
    const url = buildWhatsAppLink({
      pageUrl: window.location.href,
      heading: getCurrentVisibleHeading(),
      note: note.trim(),
    });
    window.open(url, "_blank", "noopener,noreferrer");
    setModalOpen(false);
    setNote("");
  }

  return (
    <>
      {/* Highlight-to-report tooltip */}
      {anchor && (
        <button
          onClick={reportSelection}
          style={{
            position: "absolute",
            top: anchor.top,
            left: anchor.left,
            zIndex: 60,
          }}
          className="rounded-sm border-[1.5px] border-ink bg-ink px-2 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-bg shadow-block-sm transition hover:bg-accent hover:border-accent"
        >
          📍 Help improve this
        </button>
      )}

      {/* Floating "What's missing here?" button.
          Stacks ABOVE the ViewToggle on both mobile and desktop so the two never
          overlap. On mobile, MobileBottomNav at bottom: 0 + ViewToggle at bottom: 80
          + this button at bottom: 136. On desktop, ViewToggle at bottom: 16 + this
          button at bottom: 64. */}
      <button
        onClick={() => setModalOpen(true)}
        aria-label="What's missing here?"
        className="fixed right-3 bottom-[136px] z-40 flex h-10 items-center gap-2 rounded-full border-[1.5px] border-ink bg-white px-3 font-mono text-[11px] uppercase tracking-[0.06em] text-ink shadow-block-sm transition hover:bg-accent hover:text-bg hover:border-accent md:bottom-16 md:h-11 md:px-4"
      >
        <span aria-hidden="true">📝</span>
        <span>What&rsquo;s missing?</span>
      </button>

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
              Tell us what is missing, wrong, or unclear. Your note goes to Andrey on
              WhatsApp with the page URL and the section you are reading attached. You
              confirm before WhatsApp sends.
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
                onClick={() => setModalOpen(false)}
                className="min-h-[36px] border-[1.5px] border-rule bg-white px-3 py-1 text-[14px] transition hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-block-sm"
              >
                Cancel
              </button>
              <button
                onClick={submitGeneral}
                className="min-h-[36px] border-[1.5px] border-ink bg-ink px-3 py-1 text-[14px] text-bg transition hover:bg-accent hover:border-accent"
              >
                Send to WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
