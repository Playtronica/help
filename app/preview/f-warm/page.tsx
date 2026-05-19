import Link from "next/link";

export const metadata = { title: "Preview F3 · Soft brutal · Warm gold · Playtronica Help" };

export default function FWarmHome() {
  return (
    <>
      <style>{`
        .f3 {
          --bg: #f7f1e3;        /* warmer cream */
          --ink: #1a1410;       /* warm near-black */
          --ink-soft: #5a4d3a;
          --rule: #1a1410;
          --rule-soft: #e0d4ba;
          --accent: #b88a47;    /* PCB gold as PRIMARY accent */
          --accent-soft: #f5e7c5;
          --indigo: #4a5cd9;    /* indigo as secondary */
          --hl: #ffe9a8;
          background: var(--bg); color: var(--ink);
          margin: -24px -16px -24px -16px;
          padding: 18px 18px 64px;
          min-height: 100vh;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
          font-size: 17px; line-height: 1.65;
        }
        .f3 .mono { font-family: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace; }
        .f3 a { color: var(--indigo); }
        .f3 a.acc { color: var(--accent); }

        .f3 .topbar { display: flex; align-items: center; gap: 12px; padding: 10px 0;
          border-bottom: 1.5px solid var(--rule); margin-bottom: 16px; }
        .f3 .logo { font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 15px; }
        .f3 .logo .marker { color: var(--accent); }
        .f3 .search { flex: 1; max-width: 380px; background: #fffcf3;
          border: 1.5px solid var(--rule); padding: 8px 12px; font-size: 14px;
          outline: none; font-family: inherit; }
        .f3 .search:focus { box-shadow: 3px 3px 0 var(--rule); }

        .f3 .tabs { display: flex; margin: 0 0 22px; border-bottom: 1.5px solid var(--rule); }
        .f3 .tab { padding: 8px 14px; font-family: "JetBrains Mono", monospace; font-size: 12px;
          letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-soft);
          border-bottom: 2px solid transparent; margin-bottom: -1.5px; }
        .f3 .tab.active { color: var(--ink); border-bottom-color: var(--accent); font-weight: 700; }

        .f3 .kicker { font-family: "JetBrains Mono", monospace; font-size: 11px;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent);
          margin-bottom: 12px; }
        .f3 .hero-h {
          font-family: "JetBrains Mono", monospace; font-weight: 700;
          font-size: clamp(30px, 4vw, 50px); line-height: 1.05; letter-spacing: -0.015em;
          max-width: 18ch;
        }
        .f3 .hero-h em { font-style: normal; background: var(--hl);
          padding: 0 6px; border: 1.5px solid var(--rule); }
        .f3 .hero-sub { margin-top: 18px; max-width: 56ch; font-size: 17px; line-height: 1.65; color: var(--ink-soft); }

        .f3 .pills { margin-top: 22px; display: flex; gap: 8px; flex-wrap: wrap; }
        .f3 .pill { display: inline-block; background: #fffcf3; color: var(--ink);
          border: 1.5px solid var(--rule); padding: 8px 14px; font-size: 14px; font-weight: 500;
          transition: box-shadow 150ms, transform 150ms, background 150ms; }
        .f3 .pill:hover { background: var(--accent-soft); box-shadow: 3px 3px 0 var(--rule);
          transform: translate(-1px, -1px); text-decoration: none; }

        .f3 .section-head { display: flex; align-items: baseline; gap: 14px; margin: 44px 0 14px;
          border-top: 1.5px solid var(--rule); padding-top: 16px; }
        .f3 .section-no { font-family: "JetBrains Mono", monospace; font-size: 12px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); font-weight: 700; }
        .f3 .section-title { font-weight: 700; font-size: 22px; line-height: 1.2; letter-spacing: -0.01em; }
        .f3 .section-meta { font-family: "JetBrains Mono", monospace; font-size: 11px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); margin-left: auto; }

        .f3 .bento { display: grid; gap: 14px; grid-template-columns: 1fr; }
        .f3 .cell { background: #fffcf3; border: 1.5px solid var(--rule); color: var(--ink);
          padding: 18px 20px; display: flex; flex-direction: column;
          transition: transform 150ms, box-shadow 150ms; position: relative; overflow: hidden; }
        .f3 .cell::before {
          content: ""; position: absolute; top: 0; right: 0; width: 14px; height: 14px;
          background: var(--accent); transition: background 150ms;
        }
        .f3 .cell:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0 var(--accent); text-decoration: none; }
        .f3 .cell:hover::before { background: var(--ink); }
        .f3 .cell-emo { font-size: 28px; line-height: 1; margin-bottom: 6px; }
        .f3 .cell-h { font-weight: 700; font-size: 20px; line-height: 1.2; letter-spacing: -0.01em; }
        .f3 .cell-p { font-size: 15px; line-height: 1.55; color: var(--ink-soft); margin-top: 8px; flex: 1; }
        .f3 .cell-meta { font-family: "JetBrains Mono", monospace; font-size: 10.5px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); margin-top: 12px; }
        .f3 .cta { font-family: "JetBrains Mono", monospace; font-size: 12px; color: var(--accent); margin-top: 4px; font-weight: 700; }

        @media (min-width: 768px) {
          .f3 { padding: 24px 28px 80px; }
          .f3 .bento { grid-template-columns: repeat(12, 1fr); grid-auto-rows: 160px; }
          .f3 .col-4 { grid-column: span 4; } .f3 .col-6 { grid-column: span 6; } .f3 .col-8 { grid-column: span 8; } .f3 .col-12 { grid-column: span 12; }
          .f3 .row-2 { grid-row: span 2; } .f3 .row-3 { grid-row: span 3; }
        }

        .f3 .credit { font-family: "JetBrains Mono", monospace; font-size: 10.5px;
          color: var(--ink-soft); margin-top: 56px; letter-spacing: 0.1em;
          padding-top: 16px; border-top: 1.5px solid var(--rule);
          display: flex; justify-content: space-between; }
      `}</style>

      <div className="f3">
        <div className="topbar">
          <div className="logo">∿ <span className="marker">playtronica</span> / help</div>
          <input className="search" placeholder="Search…" />
          <Link href="/preview/" className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginLeft: "auto" }}>← variants</Link>
        </div>

        <div className="tabs">
          <Link href="/preview/f-warm/" className="tab active">/ Home</Link>
          <Link href="/preview/f-warm/article/" className="tab">/ Article example</Link>
        </div>

        <div className="kicker">∿ Playtronica — help center v3 · warm edition</div>
        <h1 className="hero-h">Make sound from <em>anything.</em></h1>
        <p className="hero-sub">
          Same structural confidence as the notebook variant, warmer palette. PCB-gold is the primary accent — the gold from the actual physical device. Indigo retained as secondary for links.
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
            <p className="cell-p">Grip both gold pads. Touch any conductive thing. Notes.</p>
            <div className="cell-meta">since 2018 · 8 pads</div>
            <div className="cta">Open guide →</div>
          </Link>
          <Link href="#playtron" className="cell col-4 row-3">
            <div className="cell-emo">🍉</div>
            <div className="cell-h">Playtron</div>
            <p className="cell-p">Clip alligators to fruit, foil, plants, your skin. Anything that conducts.</p>
            <div className="cell-meta">16 alligator inputs · ground pin</div>
            <div className="cta">Open guide →</div>
          </Link>
          <Link href="#biotron" className="cell col-4 row-3">
            <div className="cell-emo">🌿</div>
            <div className="cell-h">Biotron</div>
            <p className="cell-p">Stick leaf-pads on a houseplant. The plant becomes a slow, weird, generative MIDI source.</p>
            <div className="cell-meta">self-playing · light sensor</div>
            <div className="cta">Open guide →</div>
          </Link>
          <Link href="#orbita" className="cell col-6 row-2">
            <div className="cell-emo">🌀</div>
            <div className="cell-h">Orbita</div>
            <p className="cell-p">A rotating step-sequencer. The motor spins, the pattern plays itself.</p>
            <div className="cta">Open guide →</div>
          </Link>
          <Link href="#scales" className="cell col-6 row-2">
            <div className="cell-emo">⚖️</div>
            <div className="cell-h">Scales</div>
            <p className="cell-p">Put any object up to 3 kg on the plate. Heavier = higher pitch.</p>
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
            <div className="cell-meta" style={{ marginTop: 0, marginBottom: 4 }}>60-second read</div>
            <div className="cell-h">⭐ What is Playtronica?</div>
            <p className="cell-p">The whole idea, fast — for the kind of person who wants context before plugging in.</p>
            <div className="cta">Read it →</div>
          </Link>
          <Link href="#first5" className="cell col-4 row-2">
            <div className="cell-meta" style={{ marginTop: 0, marginBottom: 4 }}>box → first sound</div>
            <div className="cell-h">🔌 Your first 5 minutes</div>
            <p className="cell-p">Step-by-step from unboxing to your first audible note.</p>
            <div className="cta">Start →</div>
          </Link>
          <Link href="#gift" className="cell col-4 row-2">
            <div className="cell-meta" style={{ marginTop: 0, marginBottom: 4 }}>no jargon</div>
            <div className="cell-h">🎁 Got it as a gift?</div>
            <p className="cell-p">Someone gave you a Playtronica. Welcome — here's the fastest path to the wow moment.</p>
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
            <div className="cell-meta" style={{ marginTop: 0, marginBottom: 4 }}>953 tickets/year</div>
            <div className="cell-h">🔍 Track your order</div>
            <p className="cell-p">Where it is now, when it arrives, what to do if tracking has gone quiet.</p>
            <div className="cta">Open →</div>
          </Link>
          <Link href="#invoice" className="cell col-4 row-2">
            <div className="cell-meta" style={{ marginTop: 0, marginBottom: 4 }}>484 tickets/year</div>
            <div className="cell-h">🧾 Invoice & VAT</div>
            <p className="cell-p">Customs invoice, company purchase, plain receipt.</p>
            <div className="cta">Open →</div>
          </Link>
          <Link href="#returns" className="cell col-4 row-2">
            <div className="cell-meta" style={{ marginTop: 0, marginBottom: 4 }}>517 tickets/year</div>
            <div className="cell-h">↩️ Returns & refunds</div>
            <p className="cell-p">30-day window, no drama either way.</p>
            <div className="cta">Open →</div>
          </Link>
          <Link href="#trouble" className="cell col-12 row-2" style={{ background: "var(--accent-soft)" }}>
            <div className="cell-meta" style={{ marginTop: 0, marginBottom: 4 }}>interactive triage · WhatsApp-style</div>
            <div className="cell-h" style={{ fontSize: 26 }}>🔧 Not working? — start the troubleshooter</div>
            <p className="cell-p" style={{ fontSize: 16, marginTop: 6 }}>Three or four yes/no questions, the same ones we'd ask if you wrote to us. End at the fix.</p>
            <div className="cta">Open the walker →</div>
          </Link>
        </div>

        <div className="credit">
          <span>∿ Playtronica / help · F3 warm preview · 2026</span>
          <span>Made in Cowork</span>
        </div>
      </div>
    </>
  );
}
