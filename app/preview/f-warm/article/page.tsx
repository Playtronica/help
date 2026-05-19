import Link from "next/link";

export const metadata = { title: "Article preview · F3 · Warm gold" };

export default function FWarmArticle() {
  return (
    <>
      <style>{`
        .f3 {
          --bg: #f7f1e3; --ink: #1a1410; --ink-soft: #5a4d3a;
          --rule: #1a1410; --rule-soft: #e0d4ba;
          --accent: #b88a47; --accent-soft: #f5e7c5;
          --indigo: #4a5cd9; --hl: #ffe9a8;
          --warn-bg: #fff1ee; --warn-rule: #c62828;
          --tip-bg: #f5e7c5; --tip-rule: #b88a47;
          background: var(--bg); color: var(--ink);
          margin: -24px -16px -24px -16px;
          padding: 18px 18px 64px; min-height: 100vh;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
          font-size: 17px; line-height: 1.65;
        }
        .f3 .mono { font-family: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace; }
        .f3 a { color: var(--indigo); }
        .f3 .topbar { display: flex; align-items: center; gap: 12px; padding: 10px 0;
          border-bottom: 1.5px solid var(--rule); margin-bottom: 16px; }
        .f3 .logo { font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 15px; }
        .f3 .logo .marker { color: var(--accent); }
        .f3 .search { flex: 1; max-width: 360px; background: #fffcf3; border: 1.5px solid var(--rule);
          padding: 7px 12px; font-size: 14px; outline: none; font-family: inherit; }
        .f3 .tabs { display: flex; margin: 0 0 20px; border-bottom: 1.5px solid var(--rule); }
        .f3 .tab { padding: 8px 14px; font-family: "JetBrains Mono", monospace; font-size: 12px;
          letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-soft);
          border-bottom: 2px solid transparent; margin-bottom: -1.5px; }
        .f3 .tab.active { color: var(--ink); border-bottom-color: var(--accent); font-weight: 700; }

        .f3 .crumb { font-family: "JetBrains Mono", monospace; font-size: 11px;
          color: var(--ink-soft); margin: 4px 0 16px; letter-spacing: 0.04em; }
        .f3 .crumb a { color: var(--ink-soft); }

        .f3 .kicker { font-family: "JetBrains Mono", monospace; font-size: 11px;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
        .f3 h1.article-h {
          font-family: "JetBrains Mono", monospace; font-weight: 700;
          font-size: clamp(26px, 4vw, 36px); line-height: 1.15; letter-spacing: -0.01em;
        }
        .f3 .summary { font-size: 17px; color: var(--ink-soft); line-height: 1.55;
          margin: 10px 0 22px; max-width: 60ch; }

        .f3 .schematic { border: 1.5px solid var(--rule); background: #fffcf3; padding: 14px;
          margin: 0 0 22px; text-align: center;
          font-family: "JetBrains Mono", monospace; font-size: 11px; color: var(--ink-soft); }
        .f3 .schem-art { height: 140px; display: flex; align-items: center; justify-content: center;
          font-size: 52px; margin-bottom: 8px; }

        .f3 h2.section { font-weight: 700; font-size: 22px; letter-spacing: -0.01em;
          margin: 36px 0 6px; display: flex; align-items: baseline; gap: 10px; }
        .f3 h2.section .num { font-family: "JetBrains Mono", monospace; font-size: 12px;
          color: var(--accent); letter-spacing: 0.1em; font-weight: 700; }
        .f3 p { margin-bottom: 14px; max-width: 64ch; }

        .f3 .callout { border-left: 3px solid var(--ink); background: #fffcf3;
          padding: 14px 16px; margin: 18px 0; max-width: 64ch; font-size: 16px; line-height: 1.55; }
        .f3 .callout.warn { border-left-color: var(--warn-rule); background: var(--warn-bg); }
        .f3 .callout.tip  { border-left-color: var(--tip-rule); background: var(--tip-bg); }
        .f3 .callout strong { font-weight: 700; }

        .f3 ol.steps { margin: 18px 0; padding: 0; list-style: none; max-width: 66ch; }
        .f3 ol.steps li { display: grid; grid-template-columns: 32px 1fr; gap: 12px;
          padding: 14px 0; border-bottom: 1px solid var(--rule-soft); align-items: start; }
        .f3 ol.steps li:last-child { border-bottom: 0; }
        .f3 ol.steps .step-num { font-family: "JetBrains Mono", monospace; font-weight: 700;
          font-size: 14px; background: var(--accent); color: #fff; padding: 4px 0;
          text-align: center; line-height: 1.2; }
        .f3 ol.steps .step-body { font-size: 16px; line-height: 1.55; }
        .f3 ol.steps .step-body strong { font-weight: 700; }
        .f3 ol.steps .step-body .step-desc { color: var(--ink-soft); margin-top: 2px; font-size: 15px; }

        .f3 .related { margin-top: 36px; padding-top: 22px; border-top: 1.5px solid var(--rule); }
        .f3 .related-h { font-family: "JetBrains Mono", monospace; font-size: 12px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 10px; }
        .f3 .related-list { display: grid; gap: 10px; grid-template-columns: 1fr; }
        .f3 .related-card { background: #fffcf3; border: 1.5px solid var(--rule); padding: 12px 16px;
          color: var(--ink); display: flex; align-items: center; gap: 12px;
          transition: transform 150ms, box-shadow 150ms; }
        .f3 .related-card:hover { transform: translate(-1px, -1px); box-shadow: 3px 3px 0 var(--accent); text-decoration: none; }
        .f3 .related-card .emo { font-size: 22px; }
        .f3 .related-card .ttl { font-weight: 600; font-size: 15px; }
        .f3 .related-card .arr { margin-left: auto; font-family: "JetBrains Mono", monospace;
          color: var(--accent); font-size: 13px; font-weight: 700; }

        .f3 .feedback { margin-top: 28px; padding: 16px; border: 1.5px solid var(--rule); background: #fffcf3;
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .f3 .feedback span { font-weight: 600; font-size: 15px; }
        .f3 .feedback button { font-family: inherit; font-size: 14px; padding: 7px 14px;
          border: 1.5px solid var(--rule); background: #fffcf3; cursor: pointer;
          transition: box-shadow 150ms, transform 150ms; }
        .f3 .feedback button:hover { box-shadow: 2px 2px 0 var(--accent); transform: translate(-1px, -1px); }
        .f3 .feedback .yes { background: var(--accent); color: #fff; }

        @media (min-width: 1024px) {
          .f3 { padding: 28px 36px 80px; }
          .f3 .related-list { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="f3">
        <div className="topbar">
          <div className="logo">∿ <span className="marker">playtronica</span> / help</div>
          <input className="search" placeholder="Search…" />
          <Link href="/preview/" className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginLeft: "auto" }}>← variants</Link>
        </div>

        <div className="tabs">
          <Link href="/preview/f-warm/" className="tab">/ Home</Link>
          <Link href="/preview/f-warm/article/" className="tab active">/ Article example</Link>
        </div>

        <div className="crumb">
          <Link href="/preview/f-warm/">Home</Link> / <Link href="#">Your device</Link> / TouchMe
        </div>

        <div className="kicker">∿ Your device · #01 of 5</div>
        <h1 className="article-h">👐 TouchMe — complete guide</h1>
        <p className="summary">
          How to use TouchMe, from first connection to live performance. The simplest place to start with our line — grip both gold pads, touch a friend, make music.
        </p>

        <figure className="schematic">
          <div className="schem-art">👐 — — — 🎵</div>
          <div>FIG. 1 · TouchMe TOP VIEW · v6</div>
        </figure>

        <p>
          TouchMe is a touch instrument — grab both conductive ends and you're playing. It detects the conductivity of your skin and completes a circuit between the two pads. The more contact area, the richer the signal.
        </p>

        <div className="callout warn">
          <strong>⚠️ Handle only the contacts shown in this guide.</strong> The gold pads, the USB-C connector, and the electrode-patch clip points are the parts meant to be touched. Avoid solder joints and the underside of the PCB — even unplugged.
        </div>

        <h2 className="section"><span className="num">01</span>Quick start (2 minutes)</h2>
        <p>The fastest path from box to first sound.</p>
        <ol className="steps">
          <li><span className="step-num">1</span><div className="step-body"><strong>Connect TouchMe to your computer via USB.</strong><div className="step-desc">No drivers needed on Mac or Windows.</div></div></li>
          <li><span className="step-num">2</span><div className="step-body"><strong>Open <a href="https://synth.playtronica.com">synth.playtronica.com</a> in Chrome or Brave.</strong><div className="step-desc">Must be Chrome/Brave — the only browsers with Web MIDI support.</div></div></li>
          <li><span className="step-num">3</span><div className="step-body"><strong>Choose a synth.</strong><div className="step-desc">For your first session, we recommend Dots Piano.</div></div></li>
          <li><span className="step-num">4</span><div className="step-body"><strong>Grab both gold ends with bare skin.</strong><div className="step-desc">Hold like a remote — both conductive pads in your hands.</div></div></li>
        </ol>

        <div className="callout tip">
          <strong>🛠️ Want to go deeper?</strong> See the <a href="#">TouchMe deep dive</a> — MIDI mapping, custom scales, hardware tuning.
        </div>

        <h2 className="section"><span className="num">02</span>Two-person play</h2>
        <p>
          One hand on each pad, you complete the circuit alone. The trick — and what makes TouchMe a workshop favourite — is that two people can each hold one pad, touch each other anywhere on bare skin, and the circuit completes through both of them.
        </p>
        <p>
          Try this at a dinner party. Pass the device. Watch what happens.
        </p>

        <h2 className="section"><span className="num">03</span>When it isn't working</h2>
        <ol className="steps">
          <li><span className="step-num">A</span><div className="step-body"><strong>Are you in Chrome or Brave?</strong><div className="step-desc">Safari and Firefox don't speak Web MIDI yet.</div></div></li>
          <li><span className="step-num">B</span><div className="step-body"><strong>Did you click Allow on the MIDI prompt?</strong><div className="step-desc">If you clicked Block: browser settings → Site Settings → MIDI → set synth.playtronica.com to Allow.</div></div></li>
          <li><span className="step-num">C</span><div className="step-body"><strong>Bare skin on both pads?</strong><div className="step-desc">Sleeves break the circuit. Very dry winter skin too — a drop of water on a fingertip fixes it.</div></div></li>
        </ol>

        <div className="related">
          <div className="related-h">Related</div>
          <div className="related-list">
            <Link href="#" className="related-card"><span className="emo">🍉</span><span className="ttl">Playtron — complete guide</span><span className="arr">→</span></Link>
            <Link href="#" className="related-card"><span className="emo">🎼</span><span className="ttl">Custom tuning and scales</span><span className="arr">→</span></Link>
            <Link href="#" className="related-card"><span className="emo">🔧</span><span className="ttl">Troubleshooting walker</span><span className="arr">→</span></Link>
            <Link href="#" className="related-card"><span className="emo">🍊</span><span className="ttl">Objects you can play</span><span className="arr">→</span></Link>
          </div>
        </div>

        <div className="feedback">
          <span>Did this answer your question?</span>
          <button className="yes">Yes</button>
          <button>No</button>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginLeft: "auto" }}>updated 2026-05-12</span>
        </div>
      </div>
    </>
  );
}
