"use client";
import { useEffect, useState } from "react";

/**
 * Dev/preview-mode toggle: forces a mobile or desktop view on top of the real viewport.
 * - Click "Mobile" → applies data-force-view="mobile" on <html>; CSS in globals.css caps the
 *   layout to 390 px and flips Tailwind md:* utilities to mobile semantics.
 * - Click "Desktop" → forces desktop, useful if you're previewing the site on a phone
 *   but want to see the wider layout.
 * - Stored in localStorage so the choice persists across navigations.
 *
 * Renders only after mount to avoid SSR hydration mismatch.
 */
export function ViewToggle() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"auto" | "mobile" | "desktop">("auto");

  useEffect(() => {
    setMounted(true);
    const stored = (typeof localStorage !== "undefined" && localStorage.getItem("view-mode")) as
      | "mobile"
      | "desktop"
      | "auto"
      | null;
    const initial = stored || "auto";
    setMode(initial);
    apply(initial);
  }, []);

  function apply(m: "auto" | "mobile" | "desktop") {
    const html = document.documentElement;
    if (m === "auto") html.removeAttribute("data-force-view");
    else html.setAttribute("data-force-view", m);
  }

  function setAndStore(m: "auto" | "mobile" | "desktop") {
    setMode(m);
    if (typeof localStorage !== "undefined") localStorage.setItem("view-mode", m);
    apply(m);
  }

  if (!mounted) return null;

  return (
    <div
      className="fixed bottom-20 right-3 z-50 flex items-center gap-0 border-[1.5px] border-rule bg-white shadow-block-sm md:bottom-4"
      role="group"
      aria-label="Preview view mode"
    >
      <ViewBtn label="📱 M" full="Mobile" active={mode === "mobile"} onClick={() => setAndStore("mobile")} />
      <ViewBtn label="🖥 D" full="Desktop" active={mode === "desktop"} onClick={() => setAndStore("desktop")} />
      <ViewBtn label="auto" full="Auto (your real viewport)" active={mode === "auto"} onClick={() => setAndStore("auto")} />
    </div>
  );
}

function ViewBtn({
  label,
  full,
  active,
  onClick,
}: {
  label: string;
  full: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      title={full}
      onClick={onClick}
      className={`min-h-[36px] border-r-[1.5px] border-rule px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.06em] transition last:border-r-0 ${
        active ? "bg-ink text-bg" : "bg-white text-ink-soft hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
