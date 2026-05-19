import Link from "next/link";

export const metadata = { title: "Preview F · Soft brutalism · Playtronica Help" };

export default function SoftBrutalPreview() {
  return (
    <>
      <style>{`
        .sb {
          --bg: #fdfcfa;
          --ink: #15161b;
          --ink-soft: #5a5d6a;
          --rule: #1a1a1a;
          --rule-soft: #e9e6df;
          --accent: #4a5cd9;
          --gold: #b88a47;
          --hl: #fff9e9;
          background: var(--bg); color: var(--ink);
          margin: -24px -16px -24px -16px;
          padding: 28px 24px 64px;
          min-height: 100vh;
          font-family: "Inter", "Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
          font-size: 17px; line-height: 1.65;
        }
        .sb .mono { font-family: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace; }
        .sb a { color: var(--accent); }

        .sb .topbar {
          display: flex; align-items: center; gap: 16px;
          padding: 12px 0; border-bottom: 1.5px solid var(--rule); margin-bottom: 28px;
        }
        .sb .logo {
          font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 17px;
          letter-spacing: -0.01em;
        }
        .sb .search {
          flex: 1; max-width: 480px;
          border: 1.5px solid var(--rule); background: #fff;
          padding: 9px 14px; font-size: 15px; outline: none;
          transition: box-shadow 200ms;
        }
        .sb .search:focus { box-shadow: 4px 4px 0 var(--rule); }
        .sb .nav-text { font-family: "JetBrains Mono", monospace; font-size: 11px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); }

        .sb .hero { padding: 18px 0 8px; }
        .sb .kicker {
          font-family: "JetBrains Mono", monospace; font-size: 11px;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-soft);
          margin-bottom: 14px;
        }
        .sb .hero-h {
          font-family: "JetBrains Mono", monospace; font-weight: 700;
          font-size: clamp(30px, 4vw, 50px); line-height: 1.05; letter-spacing: -0.015em;
          max-width: 18ch;
        }
        .sb .hero-h em { font-style: normal; background: var(--hl);
          padding: 0 6px; border: 1.5px solid var(--rule); }
        .sb .hero-sub {
          margin-top: 18px; max-width: 56ch;
          font-size: 17px; line-height: 1.65; color: var(--ink-soft);
        }
        .sb .pills { margin-top: 22px; display: flex; gap: 8px; flex-wrap: wrap; }
        .sb .pill {
          display: inline-block; background: #fff; color: var(--ink);
          border: 1.5px solid var(--rule); padding: 8px 14px; font-size: 14px;
          font-weight: 500; transition: box-shadow 150ms, transform 150ms;
        }
        .sb .pill:hover { box-shadow: 3px 3px 0 var(--rule); transform: translate(-1px, -1px);
          text-decoration: none; }

        .sb .section-head {
          display: flex; align-items: baseline; gap: 14px; margin: 48px 0 14px;
          border-top: 1.5px solid var(--rule); padding-top: 16px;
        }
        .sb .section-no { font-family: "JetBrains Mono", monospace; font-size: 12px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); }
        .sb .section-title { font-family: "Inter", sans-serif; font-weight: 700; font-size: 22px;
          line-height: 1.2; letter-spacing: -0.01em; }
        .sb .section-meta { font-family: "JetBrains Mono", monospace; font-size: 11px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft);
          margin-left: auto; }

        .sb .bento {
          display: grid; grid-template-columns: repeat(12, 1fr); grid-auto-rows: 150px;
          gap: 14px;
        }
        .sb .cell {
          background: #fff; border: 1.5px solid var(--rule); color: var(--ink);
          padding: 18px 20px;
          transition: transform 150ms, box-shadow 150ms;
          display: flex; flex-direction: column; justify-content: space-between;
        }
        .sb .cell:hover {
          transform: translate(-2px, -2px); box-shadow: 4px 4px 0 var(--rule);
          text-decoration: none;
        }
        .sb .col-4 { grid-column: span 4; }
        .sb .col-6 { grid-column: span 6; }
        .sb .col-8 { grid-column: span 8; }
        .sb .col-12 { grid-column: span 12; }
        .sb .row-2 { grid-row: span 2; }
        .sb .row-3 { grid-row: span 3; }

        .sb .cell-meta {
          font-family: "JetBrains Mono", monospace; font-size: 10.5px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft);
        }
        .sb .cell-h {
          font-family: "Inter", sans-serif; font-weight: 700; font-size: 20px; line-height: 1.2;
          margin-top: 6px; letter-spacing: -0.01em;
        }
        .sb .cell-p {
          font-size: 15px; line-height: 1.55; color: var(--ink-soft);
          margin-top: 8px;
        }
        .sb .cell-emoji { font-size: 28px; line-height: 1; }
        .sb .cell-cta {
          font-family: "JetBrains Mono", monospace; font-size: 12px;
          color: var(--accent); margin-top: 12px;
        }

        .sb .credit {
          font-family: "JetBrains Mono", monospace; font-size: 10.5px;
          color: var(--ink-soft); margin-top: 56px; letter-spacing: 0.1em;
          padding-top: 16px; border-top: 1.5px solid var(--rule);
          display: flex; justify-content: space-between;
        }

        @media (max-width: 768px) {
          .sb { padding: 22px 18px 56px; font-size: 16px; }
          .sb .bento { grid-template-columns: 1fr; grid-auto-rows: auto; }
          .sb .cell { grid-column: span 1 !important; grid-row: auto !important; min-height: 140px; }
        }
      `}</style>

      <div className="sb">
        <div className="topbar">
          <div className="logo">∿ playtronica / help</div>
          <input className="search" placeholder="Search…" />
          <Link href="/preview/" className="nav-text" style={{ marginLeft: "auto" }}>← variants</Link>
        </div>

        <div style={{ display: "flex", gap: 0, marginBottom: 18, borderBottom: "1.5px solid var(--rule)" }}>
          <Link href="/preview/soft-brutal/" style={{ padding: "8px 14px", fontFamily: "JetBrains Mono, monospace", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink)", borderBottom: "2px solid var(--ink)", marginBottom: "-1.5px", fontWeight: 700 }}>/ Home</Link>
          <Link href="/preview/soft-brutal/article/" style={{ padding: "8px 14px", fontFamily: "JetBrains Mono, monospace", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-soft)" }}>/ Article example</Link>
        </div>

        <section className="hero">
          <div className="kicker">∿ Playtronica — help center v3</div>
          <h1 className="hero-h">Make sound from <em>anything.</em></h1>
          <p className="hero-sub">
            A help center that reads as easily as a Notion page, looks like Playtronica feels in your hands. Find what you need in two clicks — or zero, using search above.
          </p>
          <div className="pills">
            <Link className="pill" href="#tracking">📦 Track my order</Link>
            <Link className="pill" href="#returns">↩ Returns</Link>
            <Link className="pill" href="#invoice">🧾 Invoice & VAT</Link>
            <Link className="pill" href="#gift">🎁 Got it as a gift?</Link>
            <Link className="pill" href="#trouble">🔧 Not working?</Link>
          </div>
        </section>

        <div className="section-head">
          <span className="section-no">/ 01</span>
          <span className="section-title">Your device</span>
          <span className="section-meta">5 instruments</span>
        </div>
        <div className="bento">
          <Link href="#touchme" className="cell col-4 row-3">
            <div>
              <div className="cell-emoji">👐</div>
              <div className="cell-h">TouchMe</div>
              <p className="cell-p">Grip both gold pads. Touch any conductive thing. Notes come out. The simplest place to start with our line.</p>
            </div>
            <div>
              <div className="cell-meta">since 2018 · 8 pads</div>
              <div className="cell-cta">Open guide →</div>
            </div>
          </Link>
          <Link href="#playtron" className="cell col-4 row-3">
            <div>
              <div className="cell-emoji">🍉</div>
              <div className="cell-h">Playtron</div>
              <p className="cell-p">Clip alligators to fruit, foil, plants, your skin. Anything that conducts becomes a key. Up to 16 objects, 16 notes.</p>
            </div>
            <div>
              <div className="cell-meta">16 alligator inputs · ground pin</div>
              <div className="cell-cta">Open guide →</div>
            </div>
          </Link>
          <Link href="#biotron" className="cell col-4 row-3">
            <div>
              <div className="cell-emoji">🌿</div>
              <div className="cell-h">Biotron</div>
              <p className="cell-p">Stick leaf-pads on a houseplant. The plant becomes a slow, weird, generative MIDI source. You don't play it — you water it.</p>
            </div>
            <div>
              <div className="cell-meta">self-playing · light sensor on Ch.2</div>
              <div className="cell-cta">Open guide →</div>
            </div>
          </Link>
          <Link href="#orbita" className="cell col-6 row-2">
            <div>
              <div className="cell-emoji">🌀</div>
              <div className="cell-h">Orbita</div>
              <p className="cell-p">A rotating step-sequencer. The motor spins, the pattern plays itself.</p>
            </div>
            <div className="cell-cta">Open guide →</div>
          </Link>
          <Link href="#scales" className="cell col-6 row-2">
            <div>
              <div className="cell-emoji">⚖️</div>
              <div className="cell-h">Scales</div>
              <p className="cell-p">Put any object up to 3 kg on the plate. Heavier = higher pitch. Five performance modes.</p>
            </div>
            <div className="cell-cta">Open guide →</div>
          </Link>
        </div>

        <div className="section-head">
          <span className="section-no">/ 02</span>
          <span className="section-title">New here?</span>
          <span className="section-meta">start with one</span>
        </div>
        <div className="bento">
          <Link href="#what-is" className="cell col-4 row-2">
            <div>
              <div className="cell-meta">60-second read</div>
              <div className="cell-h">⭐ What is Playtronica?</div>
              <p className="cell-p">The whole idea, fast — for the kind of person who wants context before plugging in.</p>
            </div>
            <div className="cell-cta">Read it →</div>
          </Link>
          <Link href="#first5" className="cell col-4 row-2">
            <div>
              <div className="cell-meta">box → first sound</div>
              <div className="cell-h">🔌 Your first 5 minutes</div>
              <p className="cell-p">Step-by-step from unboxing to your first audible note.</p>
            </div>
            <div className="cell-cta">Start →</div>
          </Link>
          <Link href="#gift" className="cell col-4 row-2">
            <div>
              <div className="cell-meta">no jargon, no setup pain</div>
              <div className="cell-h">🎁 Got it as a gift?</div>
              <p className="cell-p">Someone gave you a Playtronica. Welcome — here's the fastest path to the wow moment.</p>
            </div>
            <div className="cell-cta">Open →</div>
          </Link>
        </div>

        <div className="section-head">
          <span className="section-no">/ 03</span>
          <span className="section-title">Orders & support</span>
          <span className="section-meta">most-asked</span>
        </div>
        <div className="bento">
          <Link href="#tracking" className="cell col-4 row-2">
            <div>
              <div className="cell-meta">953 tickets/year</div>
              <div className="cell-h">🔍 Track your order</div>
              <p className="cell-p">Where it is now, when it arrives, what to do if tracking has gone quiet.</p>
            </div>
            <div className="cell-cta">Open →</div>
          </Link>
          <Link href="#invoice" className="cell col-4 row-2">
            <div>
              <div className="cell-meta">484 tickets/year</div>
              <div className="cell-h">🧾 Invoice & VAT</div>
              <p className="cell-p">Customs invoice, company purchase, plain receipt — three different cases, plainly.</p>
            </div>
            <div className="cell-cta">Open →</div>
          </Link>
          <Link href="#returns" className="cell col-4 row-2">
            <div>
              <div className="cell-meta">517 tickets/year</div>
              <div className="cell-h">↩️ Returns & refunds</div>
              <p className="cell-p">30-day window, no drama either way. The full process, plainly.</p>
            </div>
            <div className="cell-cta">Open →</div>
          </Link>
          <Link href="#trouble" className="cell col-12 row-2">
            <div>
              <div className="cell-meta">interactive triage · WhatsApp-style</div>
              <div className="cell-h" style={{ fontSize: 26 }}>🔧 Not working? — start the troubleshooter</div>
              <p className="cell-p" style={{ fontSize: 16 }}>Three or four yes/no questions, the same ones we'd ask if you wrote to us. End at the fix.</p>
            </div>
            <div className="cell-cta">Open the walker →</div>
          </Link>
        </div>

        <div className="credit">
          <span>∿ Playtronica / help · soft brutalism preview · 2026</span>
          <span>Made in Cowork</span>
        </div>
      </div>
    </>
  );
}
