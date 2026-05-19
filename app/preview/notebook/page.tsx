import Link from "next/link";

export const metadata = {
  title: "Preview A · Engineer's notebook · Playtronica Help",
};

export default function NotebookPreview() {
  return (
    <>
      <style>{`
        .notebook {
          --bg: #f3efe2;
          --ink: #111111;
          --rule: #1c1c1c;
          --accent: #3c4ec4;
          --gold: #c9a878;
          --grid: #e8e3d3;
          background:
            linear-gradient(var(--grid) 1px, transparent 1px) 0 0 / 24px 24px,
            var(--bg);
          color: var(--ink);
          min-height: 100vh;
          margin: -24px -16px -24px -16px;
          padding: 24px 16px 56px;
        }
        .notebook .mono { font-family: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace; }
        .notebook .topbar {
          display: flex; align-items: center; gap: 16px;
          border-bottom: 1.5px solid var(--ink); padding-bottom: 12px; margin-bottom: 28px;
        }
        .notebook .meta-bar {
          font-family: "JetBrains Mono", monospace; font-size: 11px;
          letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.7;
        }
        .notebook .logo { font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 18px; }
        .notebook .search {
          flex: 1; max-width: 460px;
          border: 1.5px solid var(--ink); background: transparent;
          padding: 8px 12px; font-family: "JetBrains Mono", monospace; font-size: 13px;
          outline: none;
        }
        .notebook .search:focus { background: #fff; }
        .notebook .pill {
          display: inline-block;
          border: 1.5px solid var(--ink); padding: 6px 10px;
          font-family: "JetBrains Mono", monospace; font-size: 12px;
          background: transparent; color: var(--ink);
          transition: background 200ms, color 200ms;
        }
        .notebook .pill:hover { background: var(--ink); color: var(--bg); text-decoration: none; }
        .notebook .section-rule {
          border-top: 1.5px solid var(--ink); padding-top: 10px; margin-top: 36px;
          display: flex; justify-content: space-between; align-items: baseline;
        }
        .notebook .section-num {
          font-family: "JetBrains Mono", monospace; font-size: 11px;
          letter-spacing: 0.08em; opacity: 0.7;
        }
        .notebook .section-title { font-family: "JetBrains Mono", monospace; font-size: 16px; font-weight: 700; }
        .notebook .bento {
          display: grid; grid-template-columns: repeat(12, 1fr); grid-auto-rows: 130px; gap: 0;
          margin-top: 18px;
        }
        .notebook .cell {
          border-right: 1.5px solid var(--ink);
          border-bottom: 1.5px solid var(--ink);
          border-left: 0; border-top: 0;
          padding: 16px;
          background: transparent;
          transition: background 200ms, color 200ms;
          color: inherit;
        }
        .notebook .cell:hover { background: var(--ink); color: var(--bg); text-decoration: none; }
        .notebook .cell:hover .cell-meta { color: var(--bg); }
        .notebook .col-4 { grid-column: span 4; }
        .notebook .col-6 { grid-column: span 6; }
        .notebook .col-8 { grid-column: span 8; }
        .notebook .col-12 { grid-column: span 12; }
        .notebook .row-2 { grid-row: span 2; }
        .notebook .row-3 { grid-row: span 3; }
        .notebook .cell-meta {
          font-family: "JetBrains Mono", monospace; font-size: 10px;
          letter-spacing: 0.08em; text-transform: uppercase; color: #444;
          margin-bottom: 8px;
        }
        .notebook .cell-h {
          font-family: "JetBrains Mono", monospace; font-weight: 700;
          font-size: 18px; line-height: 1.2;
        }
        .notebook .cell-p { font-size: 13px; margin-top: 8px; line-height: 1.5; }
        .notebook .ascii-arrow { font-family: "JetBrains Mono", monospace; font-size: 22px; opacity: 0.8; }
        .notebook .hero-h {
          font-family: "JetBrains Mono", monospace; font-weight: 700;
          font-size: clamp(28px, 4vw, 44px); line-height: 1.1; letter-spacing: -0.01em;
        }
        .notebook .hero-sub {
          margin-top: 10px; max-width: 540px;
          font-size: 14px; line-height: 1.55; opacity: 0.85;
        }
        .notebook .ndev {
          display: grid; grid-template-columns: 80px 1fr; gap: 14px; align-items: start;
        }
        .notebook .ndev-icon {
          border: 1.5px solid var(--ink); aspect-ratio: 1;
          display: flex; align-items: center; justify-content: center; font-size: 28px;
          background: var(--bg);
        }
        .notebook .ndev-name { font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 14px; }
        .notebook .ndev-desc { font-size: 12.5px; line-height: 1.5; opacity: 0.85; margin-top: 2px; }
        .notebook .credit { font-family: "JetBrains Mono", monospace; font-size: 10px; opacity: 0.5; margin-top: 28px; letter-spacing: 0.08em; }
        @media (max-width: 768px) {
          .notebook .bento { grid-template-columns: 1fr; grid-auto-rows: auto; }
          .notebook .cell { grid-column: span 1 !important; grid-row: auto !important; min-height: 120px; }
        }
      `}</style>

      <div className="notebook">
        {/* Top bar */}
        <div className="topbar">
          <div className="logo">∿ PLAYTRONICA / help</div>
          <input className="search" placeholder="_ search: tracking, ableton, no sound..." />
          <Link href="/preview/" className="meta-bar" style={{ marginLeft: "auto" }}>← all variants</Link>
        </div>

        {/* Hero */}
        <div className="meta-bar">v3.0 · 2026-05 · everything can sing</div>
        <h1 className="hero-h">make sound from anything.<br />docs that don't waste your time.</h1>
        <p className="hero-sub">
          A help center that reads like an engineering notebook. Find what you need in two clicks. Or zero, with the search above.
        </p>
        <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link className="pill" href="/preview/notebook/#tracking">[01] track my order</Link>
          <Link className="pill" href="/preview/notebook/#returns">[02] returns</Link>
          <Link className="pill" href="/preview/notebook/#invoice">[03] invoice & VAT</Link>
          <Link className="pill" href="/preview/notebook/#gift">[04] got it as a gift?</Link>
          <Link className="pill" href="/preview/notebook/#trouble">[05] not working?</Link>
        </div>

        {/* Section 01 - Your devices (bento) */}
        <div className="section-rule">
          <div>
            <span className="section-num">/ 01 ───</span>
            <span className="section-title"> &nbsp; your devices</span>
          </div>
          <span className="meta-bar">5 instruments</span>
        </div>
        <div className="bento" style={{ border: "1.5px solid var(--ink)" }}>
          <Link href="#touchme" className="cell col-4 row-3">
            <div className="cell-meta">/ TOUCHME · since 2018</div>
            <div className="cell-h">👐 TouchMe</div>
            <div className="cell-p">Grip both gold pads. Touch any conductive thing. Notes.</div>
            <div className="ascii-arrow" style={{ marginTop: 10 }}>→</div>
          </Link>
          <Link href="#playtron" className="cell col-4 row-3">
            <div className="cell-meta">/ PLAYTRON · 16 inputs</div>
            <div className="cell-h">🍉 Playtron</div>
            <div className="cell-p">Clip the alligators. Make a banana a piano key.</div>
            <div className="ascii-arrow" style={{ marginTop: 10 }}>→</div>
          </Link>
          <Link href="#biotron" className="cell col-4 row-3">
            <div className="cell-meta">/ BIOTRON · self-playing</div>
            <div className="cell-h">🌿 Biotron</div>
            <div className="cell-p">A houseplant becomes a generative MIDI source.</div>
            <div className="ascii-arrow" style={{ marginTop: 10 }}>→</div>
          </Link>
          <Link href="#orbita" className="cell col-6 row-2">
            <div className="cell-meta">/ ORBITA · rotating sequencer</div>
            <div className="cell-h">🌀 Orbita</div>
            <div className="cell-p">Patterns spin out. You don't play it; it plays you.</div>
          </Link>
          <Link href="#scales" className="cell col-6 row-2">
            <div className="cell-meta">/ SCALES · weight = pitch</div>
            <div className="cell-h">⚖️ Scales</div>
            <div className="cell-p">Place a stone on the plate. Heavier = higher.</div>
          </Link>
        </div>

        {/* Section 02 - New here? */}
        <div className="section-rule">
          <div>
            <span className="section-num">/ 02 ───</span>
            <span className="section-title"> &nbsp; new here?</span>
          </div>
          <span className="meta-bar">start with one of these</span>
        </div>
        <div className="bento" style={{ border: "1.5px solid var(--ink)" }}>
          <Link href="#what-is" className="cell col-4 row-2">
            <div className="cell-meta">/ 60 seconds</div>
            <div className="cell-h">⭐ What is Playtronica?</div>
            <div className="cell-p">The whole idea, fast.</div>
          </Link>
          <Link href="#first5" className="cell col-4 row-2">
            <div className="cell-meta">/ box → sound</div>
            <div className="cell-h">🔌 First 5 minutes</div>
            <div className="cell-p">Hardware → laptop → audible note.</div>
          </Link>
          <Link href="#gift" className="cell col-4 row-2">
            <div className="cell-meta">/ no jargon, just sound</div>
            <div className="cell-h">🎁 Got it as a gift?</div>
            <div className="cell-p">Welcome. Here is the fastest path to the wow moment.</div>
          </Link>
        </div>

        {/* Section 03 - orders + trouble */}
        <div className="section-rule">
          <div>
            <span className="section-num">/ 03 ───</span>
            <span className="section-title"> &nbsp; orders + support</span>
          </div>
          <span className="meta-bar">most-asked</span>
        </div>
        <div className="bento" style={{ border: "1.5px solid var(--ink)" }}>
          <Link href="#tracking" className="cell col-4 row-2">
            <div className="cell-meta">/ 953 tickets/yr</div>
            <div className="cell-h">🔍 Track your order</div>
            <div className="cell-p">Where it is and when it arrives.</div>
          </Link>
          <Link href="#invoice" className="cell col-4 row-2">
            <div className="cell-meta">/ 484 tickets/yr</div>
            <div className="cell-h">🧾 Invoice & VAT</div>
            <div className="cell-p">Customs, company purchases, receipts.</div>
          </Link>
          <Link href="#returns" className="cell col-4 row-2">
            <div className="cell-meta">/ 517 tickets/yr</div>
            <div className="cell-h">↩️ Returns & refunds</div>
            <div className="cell-p">30-day window, no drama.</div>
          </Link>
          <Link href="#trouble" className="cell col-12 row-2">
            <div className="cell-meta">/ INTERACTIVE TRIAGE — walks you through 3–4 yes/no questions to the fix</div>
            <div className="cell-h" style={{ fontSize: 24 }}>🔧 Not working? &nbsp;&nbsp; → start the troubleshooter</div>
          </Link>
        </div>

        <div className="credit">∿ PLAYTRONICA / help · v3.0 · made in Cowork · 2026</div>
      </div>
    </>
  );
}
