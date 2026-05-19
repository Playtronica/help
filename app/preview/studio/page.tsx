import Link from "next/link";

export const metadata = {
  title: "Preview B · Studio dark · Playtronica Help",
};

export default function StudioPreview() {
  return (
    <>
      <style>{`
        .studio {
          --bg: oklch(10% 0.008 90);
          --bg-2: oklch(13% 0.008 90);
          --ink: oklch(94% 0.02 85);
          --ink-soft: oklch(70% 0.02 85);
          --rule: oklch(25% 0.008 90);
          --accent: oklch(68% 0.18 268);
          --accent-glow: oklch(68% 0.18 268 / 0.4);
          --gold: oklch(78% 0.08 75);
          --gold-glow: oklch(78% 0.08 75 / 0.35);
          background: var(--bg);
          color: var(--ink);
          margin: -24px -16px -24px -16px;
          padding: 24px 16px 64px;
          min-height: 100vh;
          background-image:
            radial-gradient(circle at 20% 10%, oklch(35% 0.05 268 / 0.18), transparent 40%),
            radial-gradient(circle at 80% 60%, oklch(40% 0.04 75 / 0.12), transparent 35%),
            radial-gradient(circle 1px at 24px 24px, var(--bg-2) 1px, transparent 1.5px);
          background-size: auto, auto, 24px 24px;
        }
        .studio .mono { font-family: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace; }
        .studio .topbar {
          display: flex; align-items: center; gap: 16px;
          padding: 10px 14px;
          background: oklch(15% 0.01 90 / 0.7);
          border: 1px solid var(--rule);
          backdrop-filter: blur(12px);
          border-radius: 12px;
          margin-bottom: 28px;
        }
        .studio .meta-bar {
          font-family: "JetBrains Mono", monospace; font-size: 11px;
          letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-soft);
        }
        .studio .logo {
          font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 18px;
          background: linear-gradient(90deg, var(--gold), var(--accent));
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .studio .search {
          flex: 1; max-width: 460px;
          background: oklch(12% 0.01 90); color: var(--ink);
          border: 1px solid var(--rule); border-radius: 8px;
          padding: 9px 14px; font-family: "JetBrains Mono", monospace; font-size: 13px;
          outline: none; transition: border-color 200ms, box-shadow 200ms;
        }
        .studio .search:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 4px var(--accent-glow);
        }
        .studio .search::placeholder { color: var(--ink-soft); }
        .studio .hero {
          margin: 18px 0 6px;
          padding: 28px;
          border-radius: 18px;
          background:
            radial-gradient(circle at 30% 40%, oklch(30% 0.06 268 / 0.5), transparent 60%),
            linear-gradient(135deg, oklch(18% 0.02 268), oklch(13% 0.008 90));
          border: 1px solid var(--rule);
          position: relative; overflow: hidden;
        }
        .studio .hero::after {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(135deg, transparent 60%, var(--gold-glow));
          opacity: 0.2; pointer-events: none;
        }
        .studio .hero-h {
          font-family: "JetBrains Mono", monospace; font-weight: 700;
          font-size: clamp(28px, 4vw, 44px); line-height: 1.1; letter-spacing: -0.01em;
        }
        .studio .hero-h span { color: var(--gold); }
        .studio .hero-sub { margin-top: 12px; color: var(--ink-soft); max-width: 540px; line-height: 1.6; }
        .studio .pill {
          display: inline-block;
          background: oklch(20% 0.02 90 / 0.7); color: var(--ink);
          border: 1px solid var(--rule); border-radius: 999px;
          padding: 7px 12px; font-family: "JetBrains Mono", monospace; font-size: 12px;
          transition: border-color 200ms, color 200ms, background 200ms;
        }
        .studio .pill:hover {
          border-color: var(--gold); color: var(--gold); text-decoration: none;
          background: oklch(20% 0.05 75 / 0.4);
        }
        .studio .section-rule {
          margin: 36px 0 14px; display: flex; justify-content: space-between; align-items: baseline;
          padding-bottom: 10px; border-bottom: 1px solid var(--rule);
        }
        .studio .section-num {
          font-family: "JetBrains Mono", monospace; font-size: 11px;
          letter-spacing: 0.08em; color: var(--ink-soft);
        }
        .studio .section-title { font-family: "JetBrains Mono", monospace; font-size: 18px; font-weight: 700; }
        .studio .bento {
          display: grid; grid-template-columns: repeat(12, 1fr); grid-auto-rows: 140px; gap: 12px;
        }
        .studio .cell {
          border: 1px solid var(--rule); border-radius: 14px;
          padding: 18px; color: var(--ink);
          background: oklch(13% 0.008 90 / 0.6);
          backdrop-filter: blur(14px);
          transition: border-color 200ms, transform 200ms, box-shadow 200ms, background 200ms;
          position: relative; overflow: hidden;
        }
        .studio .cell::before {
          content: ""; position: absolute; inset: -1px;
          background: linear-gradient(135deg, transparent 60%, var(--gold-glow));
          opacity: 0; transition: opacity 200ms; pointer-events: none;
          border-radius: 14px;
        }
        .studio .cell:hover {
          border-color: var(--gold); transform: translateY(-2px);
          box-shadow: 0 8px 32px oklch(20% 0.04 75 / 0.4);
          text-decoration: none;
        }
        .studio .cell:hover::before { opacity: 1; }
        .studio .col-4 { grid-column: span 4; }
        .studio .col-6 { grid-column: span 6; }
        .studio .col-8 { grid-column: span 8; }
        .studio .col-12 { grid-column: span 12; }
        .studio .row-2 { grid-row: span 2; }
        .studio .row-3 { grid-row: span 3; }
        .studio .cell-meta {
          font-family: "JetBrains Mono", monospace; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold);
          margin-bottom: 8px;
        }
        .studio .cell-h {
          font-family: "JetBrains Mono", monospace; font-weight: 700;
          font-size: 18px; line-height: 1.2; color: var(--ink);
        }
        .studio .cell-p { font-size: 13px; margin-top: 8px; line-height: 1.55; color: var(--ink-soft); }
        .studio .led {
          width: 10px; height: 10px; border-radius: 999px; background: var(--accent);
          box-shadow: 0 0 14px var(--accent-glow); display: inline-block;
          animation: pulse 2.4s ease-in-out infinite;
        }
        @keyframes pulse { 50% { opacity: 0.45; } }
        .studio .credit {
          font-family: "JetBrains Mono", monospace; font-size: 10px;
          color: var(--ink-soft); margin-top: 36px; letter-spacing: 0.08em;
        }
        @media (max-width: 768px) {
          .studio .bento { grid-template-columns: 1fr; grid-auto-rows: auto; }
          .studio .cell { grid-column: span 1 !important; grid-row: auto !important; min-height: 140px; }
        }
      `}</style>

      <div className="studio">
        <div className="topbar">
          <div className="logo">∿ PLAYTRONICA / help</div>
          <input className="search" placeholder="search: tracking, ableton, no sound…" />
          <Link href="/preview/" className="meta-bar" style={{ marginLeft: "auto" }}>← all variants</Link>
        </div>

        <div className="hero">
          <div className="meta-bar"><span className="led" /> &nbsp; live · v3.0 · 2026-05</div>
          <h1 className="hero-h">make sound from <span>anything</span>.<br />docs for music producers, after midnight.</h1>
          <p className="hero-sub">
            The help center for Playtronica devices — dark by default, search-first, mobile-fluent. Made for the people actually using these things.
          </p>
          <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link className="pill" href="#tracking">📦 track my order</Link>
            <Link className="pill" href="#returns">↩ returns</Link>
            <Link className="pill" href="#invoice">🧾 invoice & VAT</Link>
            <Link className="pill" href="#gift">🎁 got it as a gift?</Link>
            <Link className="pill" href="#trouble">⚡ not working?</Link>
          </div>
        </div>

        <div className="section-rule">
          <div><span className="section-num">/ 01 ───</span> <span className="section-title">&nbsp; your devices</span></div>
          <span className="meta-bar">5 instruments</span>
        </div>
        <div className="bento">
          <Link href="#touchme" className="cell col-4 row-3">
            <div className="cell-meta">since 2018</div>
            <div className="cell-h">👐 TouchMe</div>
            <div className="cell-p">Grip both gold pads. Touch any conductive thing. Notes.</div>
          </Link>
          <Link href="#playtron" className="cell col-4 row-3">
            <div className="cell-meta">16 alligator inputs</div>
            <div className="cell-h">🍉 Playtron</div>
            <div className="cell-p">Clip alligators to fruit, foil, plants, skin. Anything that conducts.</div>
          </Link>
          <Link href="#biotron" className="cell col-4 row-3">
            <div className="cell-meta">self-playing</div>
            <div className="cell-h">🌿 Biotron</div>
            <div className="cell-p">Bio-electrical signals from a houseplant. Generative without you.</div>
          </Link>
          <Link href="#orbita" className="cell col-6 row-2">
            <div className="cell-meta">rotating sequencer · $470</div>
            <div className="cell-h">🌀 Orbita</div>
            <div className="cell-p">A motorized step-sequencer that plays a pattern around its ring.</div>
          </Link>
          <Link href="#scales" className="cell col-6 row-2">
            <div className="cell-meta">weight → pitch · 5 modes</div>
            <div className="cell-h">⚖️ Scales</div>
            <div className="cell-p">Put a stone on the plate. Heavier = higher. Arpeggios from gravity.</div>
          </Link>
        </div>

        <div className="section-rule">
          <div><span className="section-num">/ 02 ───</span> <span className="section-title">&nbsp; new here?</span></div>
          <span className="meta-bar">start anywhere</span>
        </div>
        <div className="bento">
          <Link href="#what-is" className="cell col-4 row-2">
            <div className="cell-meta">60 seconds</div>
            <div className="cell-h">⭐ What is Playtronica?</div>
            <div className="cell-p">The whole idea, fast.</div>
          </Link>
          <Link href="#first5" className="cell col-4 row-2">
            <div className="cell-meta">box → sound</div>
            <div className="cell-h">🔌 First 5 minutes</div>
            <div className="cell-p">Hardware → laptop → audible note.</div>
          </Link>
          <Link href="#gift" className="cell col-4 row-2">
            <div className="cell-meta">no jargon</div>
            <div className="cell-h">🎁 Got it as a gift?</div>
            <div className="cell-p">Welcome. Fastest path to the wow moment.</div>
          </Link>
        </div>

        <div className="section-rule">
          <div><span className="section-num">/ 03 ───</span> <span className="section-title">&nbsp; orders + support</span></div>
          <span className="meta-bar">most-asked</span>
        </div>
        <div className="bento">
          <Link href="#tracking" className="cell col-4 row-2">
            <div className="cell-meta">953 tickets/yr</div>
            <div className="cell-h">🔍 Track your order</div>
            <div className="cell-p">Where it is and when it arrives.</div>
          </Link>
          <Link href="#invoice" className="cell col-4 row-2">
            <div className="cell-meta">484 tickets/yr</div>
            <div className="cell-h">🧾 Invoice & VAT</div>
            <div className="cell-p">Customs, company purchases, receipts.</div>
          </Link>
          <Link href="#returns" className="cell col-4 row-2">
            <div className="cell-meta">517 tickets/yr</div>
            <div className="cell-h">↩️ Returns & refunds</div>
            <div className="cell-p">30-day window, no drama.</div>
          </Link>
          <Link href="#trouble" className="cell col-12 row-2">
            <div className="cell-meta">interactive triage</div>
            <div className="cell-h" style={{ fontSize: 24 }}>⚡ Not working? &nbsp;&nbsp; → start the troubleshooter</div>
            <div className="cell-p">3–4 yes/no questions, walks you to the fix.</div>
          </Link>
        </div>

        <div className="credit">∿ PLAYTRONICA / help · v3.0 · studio mode · 2026</div>
      </div>
    </>
  );
}
