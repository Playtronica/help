import Link from "next/link";

export const metadata = { title: "Preview F2 · Soft brutal + serif display · Playtronica Help" };

export default function FSerifHome() {
  return (
    <>
      <style>{`
        .f2 {
          --bg: #fdfcfa; --ink: #15161b; --ink-soft: #5a5d6a;
          --rule: #1a1a1a; --rule-soft: #e9e6df; --accent: #4a5cd9;
          --hl: #fff9e9;
          background: var(--bg); color: var(--ink);
          margin: -24px -16px -24px -16px;
          padding: 18px 18px 64px;
          min-height: 100vh;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
          font-size: 17px; line-height: 1.65;
        }
        .f2 .mono { font-family: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace; }
        .f2 .serif { font-family: "Times New Roman", "PP Editorial New", "Source Serif Pro", Georgia, serif; }
        .f2 a { color: var(--accent); }

        .f2 .topbar { display: flex; align-items: center; gap: 12px; padding: 10px 0;
          border-bottom: 1.5px solid var(--rule); margin-bottom: 16px; }
        .f2 .logo { font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 15px; }
        .f2 .search { flex: 1; max-width: 380px; background: #fff; border: 1.5px solid var(--rule);
          padding: 8px 12px; font-size: 14px; outline: none; font-family: inherit; }
        .f2 .search:focus { box-shadow: 3px 3px 0 var(--rule); }

        .f2 .tabs { display: flex; margin: 0 0 22px; border-bottom: 1.5px solid var(--rule); }
        .f2 .tab { padding: 8px 14px; font-family: "JetBrains Mono", monospace; font-size: 12px;
          letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-soft);
          border-bottom: 2px solid transparent; margin-bottom: -1.5px; }
        .f2 .tab.active { color: var(--ink); border-bottom-color: var(--ink); font-weight: 700; }

        .f2 .kicker { font-family: "JetBrains Mono", monospace; font-size: 11px;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 12px; }
        .f2 .hero-h {
          font-family: "Times New Roman", "PP Editorial New", Georgia, serif;
          font-weight: 700; font-style: italic;
          font-size: clamp(36px, 7vw, 60px); line-height: 1; letter-spacing: -0.02em;
          max-width: 14ch;
        }
        .f2 .hero-h em { font-style: normal; background: var(--hl);
          padding: 0 6px; border: 1.5px solid var(--rule); }
        .f2 .hero-sub { margin-top: 18px; max-width: 56ch; font-size: 17px; color: var(--ink-soft); line-height: 1.6; }

        .f2 .pills { margin-top: 22px; display: flex; gap: 8px; flex-wrap: wrap; }
        .f2 .pill { display: inline-block; background: #fff; color: var(--ink);
          border: 1.5px solid var(--rule); padding: 8px 14px; font-size: 14px;
          transition: box-shadow 150ms, transform 150ms; }
        .f2 .pill:hover { box-shadow: 3px 3px 0 var(--rule); transform: translate(-1px, -1px); text-decoration: none; }

        .f2 .section-head { display: flex; align-items: baseline; gap: 14px; margin: 44px 0 14px;
          border-top: 1.5px solid var(--rule); padding-top: 16px; }
        .f2 .section-no { font-family: "JetBrains Mono", monospace; font-size: 12px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); }
        .f2 .section-title { font-family: "Times New Roman", Georgia, serif; font-style: italic;
          font-weight: 700; font-size: clamp(22px, 3vw, 30px); line-height: 1.1; letter-spacing: -0.01em; }
        .f2 .section-meta { font-family: "JetBrains Mono", monospace; font-size: 11px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); margin-left: auto; }

        .f2 .bento { display: grid; gap: 14px; grid-template-columns: 1fr; }
        .f2 .cell { background: #fff; border: 1.5px solid var(--rule); color: var(--ink);
          padding: 18px 20px; display: flex; flex-direction: column; gap: 8px;
          transition: transform 150ms, box-shadow 150ms; }
        .f2 .cell:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0 var(--rule); text-decoration: none; }
        .f2 .cell-emo { font-size: 26px; line-height: 1; }
        .f2 .cell-h { font-family: "Times New Roman", Georgia, serif; font-weight: 700;
          font-size: 22px; line-height: 1.15; letter-spacing: -0.01em; }
        .f2 .cell-p { font-size: 15px; line-height: 1.55; color: var(--ink-soft); }
        .f2 .cell-meta { font-family: "JetBrains Mono", monospace; font-size: 10.5px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); margin-top: auto; }
        .f2 .cta { font-family: "JetBrains Mono", monospace; font-size: 12px; color: var(--accent); margin-top: 4px; }

        @media (min-width: 768px) {
          .f2 { padding: 24px 28px 80px; }
          .f2 .bento { grid-template-columns: repeat(12, 1fr); grid-auto-rows: 160px; }
          .f2 .col-4 { grid-column: span 4; } .f2 .col-6 { grid-column: span 6; } .f2 .col-8 { grid-column: span 8; } .f2 .col-12 { grid-column: span 12; }
          .f2 .row-2 { grid-row: span 2; } .f2 .row-3 { grid-row: span 3; }
        }

        .f2 .credit { font-family: "JetBrains Mono", monospace; font-size: 10.5px;
          color: var(--ink-soft); margin-top: 56px; letter-spacing: 0.1em;
          padding-top: 16px; border-top: 1.5px solid var(--rule);
          display: flex; justify-content: space-between; }
      `}</style>

      <div className="f2">
        <div className="topbar">
          <div className="logo">∿ playtronica / help</div>
          <input className="search" placeholder="Search…" />
          <Link href="/preview/" className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginLeft: "auto" }}>← variants</Link>
        </div>

        <div className="tabs">
          <Link href="/preview/f-serif/" className="tab active">/ Home</Link>
          <Link href="/preview/f-serif/article/" className="tab">/ Article example</Link>
        </div>

        <div className="kicker">∿ Playtronica — help center v3 · serif edition</div>
        <h1 className="hero-h">Make sound from <em>anything.</em></h1>
        <p className="hero-sub">
          A help center with the structural confidence of an engineering notebook and the typographic warmth of an editorial magazine. Body stays read-easy 17 px Inter; the headings tell you who you're talking to.
        </p>
        <div className="pills">
          <Link className="pill" href="#tracking">📦 Track my order</Link>
          <Link className="pill" href="#returns">↩ Returns</Link>
          <Link className="pill" href="#invoice">🧾 Invoice & VAT</Link>
          <Link className="pill" href="#gift">🎁 Got it as a gift?</Link>
          <Link className="pill" href="#trouble">🔧 Not working?</Link>
        </div>

        <div className="section-head">
          <span className="section-no">/ 01</span>
          <span className="section-title">Your device</span>
          <span className="section-meta">5 instruments</span>
        </div>
        <div className="bento">
          <Link href="#touchme" className="cell col-4 row-3">
            <div className="cell-emo">👐</div>
            <div className="cell-h">TouchMe</div>
            <p className="cell-p">Grip both gold pads. Touch any conductive thing. Notes come out.</p>
            <div className="cell-meta">since 2018 · 8 pads</div>
            <div className="cta">Open guide →</div>
          </Link>
          <Link href="#playtron" className="cell col-4 row-3">
            <div className="cell-emo">🍉</div>
            <div className="cell-h">Playtron</div>
            <p className="cell-p">Clip alligators to fruit, foil, plants, your skin. Anything that conducts.</p>
            <div className="cell-meta">16 alligator inputs</div>
            <div className="cta">Open guide →</div>
          </Link>
          <Link href="#biotron" className="cell col-4 row-3">
            <div className="cell-emo">🌿</div>
            <div className="cell-h">Biotron</div>
            <p className="cell-p">A houseplant becomes a slow, weird, generative MIDI source.</p>
            <div className="cell-meta">self-playing</div>
            <div className="cta">Open guide →</div>
          </Link>
          <Link href="#orbita" className="cell col-6 row-2">
            <div className="cell-emo">🌀</div>
            <div className="cell-h">Orbita</div>
            <p className="cell-p">A rotating step-sequencer. The motor spins, the pattern plays.</p>
            <div className="cta">Open guide →</div>
          </Link>
          <Link href="#scales" className="cell col-6 row-2">
            <div className="cell-emo">⚖️</div>
            <div className="cell-h">Scales</div>
            <p className="cell-p">Weight-to-MIDI. Up to 3 kg, five performance modes.</p>
            <div className="cta">Open guide →</div>
          </Link>
        </div>

        <div className="section-head">
          <span className="section-no">/ 02</span>
          <span className="section-title">New here?</span>
          <span className="section-meta">three starting points</span>
        </div>
        <div className="bento">
          <Link href="#what-is" className="cell col-4 row-2">
            <div className="cell-h">⭐ What is Playtronica?</div>
            <p className="cell-p">The whole idea, in 60 seconds.</p>
            <div className="cta">Read →</div>
          </Link>
          <Link href="#first5" className="cell col-4 row-2">
            <div className="cell-h">🔌 Your first 5 minutes</div>
            <p className="cell-p">From unboxing to first audible note.</p>
            <div className="cta">Start →</div>
          </Link>
          <Link href="#gift" className="cell col-4 row-2">
            <div className="cell-h">🎁 Got it as a gift?</div>
            <p className="cell-p">Welcome. Fastest path to the wow moment.</p>
            <div className="cta">Open →</div>
          </Link>
        </div>

        <div className="section-head">
          <span className="section-no">/ 03</span>
          <span className="section-title">Orders & support</span>
          <span className="section-meta">most-asked</span>
        </div>
        <div className="bento">
          <Link href="#tracking" className="cell col-4 row-2">
            <div className="cell-h">🔍 Track your order</div>
            <p className="cell-p">Where it is, when it arrives.</p>
            <div className="cell-meta">953/year</div>
          </Link>
          <Link href="#invoice" className="cell col-4 row-2">
            <div className="cell-h">🧾 Invoice & VAT</div>
            <p className="cell-p">Customs, company, plain receipt.</p>
            <div className="cell-meta">484/year</div>
          </Link>
          <Link href="#returns" className="cell col-4 row-2">
            <div className="cell-h">↩️ Returns & refunds</div>
            <p className="cell-p">30-day window, no drama.</p>
            <div className="cell-meta">517/year</div>
          </Link>
          <Link href="#trouble" className="cell col-12 row-2">
            <div className="cell-h" style={{ fontSize: 26 }}>🔧 Not working? — start the troubleshooter</div>
            <p className="cell-p" style={{ fontSize: 16 }}>Three or four yes/no questions, the same ones we'd ask if you wrote to us. End at the fix.</p>
            <div className="cta">Open the walker →</div>
          </Link>
        </div>

        <div className="credit">
          <span>∿ Playtronica / help · F2 serif preview · 2026</span>
          <span>Made in Cowork</span>
        </div>
      </div>
    </>
  );
}
