"use client";
import { useState } from "react";

/**
 * Lightweight YouTube embed.
 * - On first render: a single <img> thumbnail (~10 KB) from i.ytimg.com — no iframe, no JS from YouTube.
 * - On click: swaps in the real iframe, autoplaying.
 * - Uses youtube-nocookie.com for privacy.
 * - Initial weight per video on page load: ~10 KB. With multiple videos still under ~50 KB.
 */
export function LiteYoutube({ id, title = "YouTube video" }: { id: string; title?: string }) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="lite-yt" style={{ background: "#000" }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          width="100%"
          height="100%"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="lite-yt"
      aria-label={`Play YouTube video: ${title}`}
      onClick={() => setActive(true)}
      style={{
        backgroundImage: `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`,
      }}
    >
      <span className="yt-play" aria-hidden="true" />
      <span className="yt-title">▶ {title}</span>
    </button>
  );
}
