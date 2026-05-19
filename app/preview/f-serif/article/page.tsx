import Link from "next/link";

export const metadata = { title: "Article preview · F2 · Serif edition" };

export default function FSerifArticle() {
  return (
    <>
      <style>{`
        .f2 {
          --bg: #fdfcfa; --ink: #15161b; --ink-soft: #5a5d6a;
          --rule: #1a1a1a; --rule-soft: #e9e6df; --accent: #4a5cd9;
          --warm: #c47857; --hl: #fff9e9; --warn-bg: #fff5f5; --warn-rule: #c62828;
          --tip-bg: #f0f4ff; --tip-rule: #4a5cd9;
          background: var(--bg); color: var(--ink);
          margin: -24px -16px -24px -16px;
          padding: 18px 18px 64px; min-height: 100vh;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
          font-size: 17px; line-height: 1.65;
        }
        .f2 .mono { font-family: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace; }
        .f2 .serif { font-family: "Times New Roman", "PP Editorial New", Georgia, serif; }
        .f2 a { color: var(--accent); }
        .f2 .topbar { display: flex; align-items: center; gap: 12px; padding: 10px 0;
          border-bottom: 1.5px solid var(--rule); margin-bottom: 16px; }
        .f2 .logo { font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 15px; }
        .f2 .search { flex: 1; max-width: 360px; background: #fff; border: 1.5px solid var(--rule);
          padding: 7px 12px; font-size: 14px; outline: none; font-family: inherit; }
        .f2 .tabs { display: flex; margin: 0 0 20px; border-bottom: 1.5px solid var(--rule); }
        .f2 .tab { padding: 8px 14px; font-family: "JetBrains Mono", monospace; font-size: 12px;
          letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-soft);
          border-bottom: 2px solid transparent; margin-bottom: -1.5px; }
        .f2 .tab.active { color: var(--ink); border-bottom-color: var(--ink); font-weight: 700; }

        .f2 .crumb { font-family: "JetBrains Mono", monospace; font-size: 11px;
          color: var(--ink-soft); margin: 4px 0 12px; letter-spacing: 0.04em; }
        .f2 .crumb a { color: var(--ink-soft); }

        .f2 .kicker { font-family: "JetBrains Mono", monospace; font-size: 11px;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--warm); margin: 14px 0 10px; }
        .f2 h1.article-h {
          font-family: "Times New Roman", "PP Editorial New", Georgia, serif;
          font-weight: 700; font-style: italic;
          font-size: clamp(32px, 5vw, 48px); line-height: 1.05; letter-spacing: -0.02em;
          max-width: 18ch;
        }
        .f2 .summary { font-size: 18px; color: var(--ink-soft); line-height: 1.55;
          margin: 12px 0 22px; max-width: 60ch; }
        .f2 .summary::first-letter {
          font-family: "Times New Roman", serif; float: left; font-size: 56px;
          line-height: 0.9; padding: 4px 10px 0 0; color: var(--warm); font-weight: 700;
        }

        .f2 .schematic { border: 1.5px solid var(--rule); background: #fff; padding: 14px;
          margin: 0 0 22px; text-align: center;
          font-family: "JetBrains Mono", monospace; font-size: 11px; color: var(--ink-soft); }
        .f2 .schem-art { height: 140px; display: flex; align-items: center; justify-content: center;
          font-size: 52px; margin-bottom: 8px; }

        .f2 h2.section { font-family: "Times New Roman", Georgia, serif; font-weight: 700;
          font-style: italic; font-size: clamp(22px, 3vw, 28px);
          letter-spacing: -0.01em; margin: 36px 0 10px;
          display: flex; align-items: baseline; gap: 12px; }
        .f2 h2.section .num { font-family: "JetBrains Mono", monospace; font-style: normal;
          font-size: 12px; color: var(--ink-soft); letter-spacing: 0.08em; font-weight: 700; }
        .f2 p { margin-bottom: 14px; max-width: 64ch; }

        .f2 .callout { border-left: 3px solid var(--ink); background: #fff;
          padding: 14px 16px; margin: 18px 0; max-width: 64ch; font-size: 16px; line-height: 1.55; }
        .f2 .callout.warn { border-left-color: var(--warn-rule); background: var(--warn-bg); }
        .f2 .callout.tip  { border-left-color: var(--tip-rule);  background: var(--tip-bg); }

        .f2 .pullquote { margin: 28px 0; padding: 22px 0; text-align: center;
          border-top: 1.5px solid var(--rule); border-bottom: 1.5px solid var(--rule); }
        .f2 .pullquote-text { font-family: "Times New Roman", serif; font-style: italic;
          font-weight: 700; font-size: clamp(22px, 3vw, 30px); line-height: 1.3; max-width: 28ch; margin: 0 auto; }
        .f2 .pullquote-attr { font-family: "JetBrains Mono", monospace; font-size: 11px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); margin-top: 10px; }
        .f2 .pullquote-mark { font-family: serif; font-size: 70px; color: var(--warm);
          line-height: 0.3; vertical-align: -0.4em; margin-right: 8px; }

        .f2 ol.steps { margin: 18px 0; padding: 0; list-style: none; max-width: 66ch; }
        .f2 ol.steps li { display: grid; grid-template-columns: 32px 1fr; gap: 12px;
          padding: 14px 0; border-bottom: 1px solid var(--rule-soft); align-items: start; }
        .f2 ol.steps li:last-child { border-bottom: 0; }
        .f2 ol.steps .step-num { font-family: "JetBrains Mono", monospace; font-weight: 700;
          font-size: 14px; background: var(--ink); color: var(--bg); padding: 4px 0;
          text-align: center; line-height: 1.2; }
        .f2 ol.steps .step-body { font-size: 16px; line-height: 1.55; }
        .f2 ol.steps .step-body strong { font-weight: 700; }
        .f2 ol.steps .step-body .step-desc { color: var(--ink-soft); margin-top: 2px; font-size: 15px; }

        .f2 .related { margin-top: 36px; padding-top: 22px; border-top: 1.5px solid var(--rule); }
        .f2 .related-h { font-family: "JetBrains Mono", monospace; font-size: 12px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 10px; }
        .f2 .related-list { display: grid; gap: 10px; grid-template-columns: 1fr; }
        .f2 .related-card { background: #fff; border: 1.5px solid var(--rule); padding: 12px 16px;
          color: var(--ink); display: flex; align-items: center; gap: 12px;
          transition: transform 150ms, box-shadow 150ms; }
        .f2 .related-card:hover { transform: translate(-1px, -1px); box-shadow: 3px 3px 0 var(--rule); text-decoration: none; }
        .f2 .related-card .emo { font-size: 22px; }
        .f2 .related-card .ttl { font-family: "Times New Roman", Georgia, serif; font-weight: 700; font-size: 16px; }
        .f2 .related-card .arr { margin-left: auto; font-family: "JetBrains Mono", monospace;
          color: var(--accent); font-size: 13px; }

        .f2 .feedback { margin-top: 28px; padding: 16px; border: 1.5px solid var(--rule); background: #fff;
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .f2 .feedback span { font-weight: 600; font-size: 15px; }
        .f2 .feedback button { font-family: inherit; font-size: 14px; padding: 7px 14px;
          border: 1.5px solid var(--rule); background: #fff; cursor: pointer;
          transition: box-shadow 150ms, transform 150ms; }
        .f2 .feedback button:hover { box-shadow: 2px 2px 0 var(--rule); transform: translate(-1px, -1px); }
        .f2 .feedback .yes { background: var(--ink); color: var(--bg); }

        @media (min-width: 1024px) {
          .f2 { padding: 28px 36px 80px; }
          .f2 .related-list { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="f2">
        <div className="topbar">
          <div className="logo">∿ playtronica / help</div>
          <input className="search" placeholder="Search…" />
          <Link href="/preview/" className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginLeft: "auto" }}>← variants</Link>
        </div>

        <div className="tabs">
          <Link href="/preview/f-serif/" className="tab">/ Home</Link>
          <Link href="/preview/f-serif/article/" className="tab active">/ Article example</Link>
        </div>

        <div className="crumb">
          <Link href="/preview/f-serif/">Home</Link> / <Link href="#">Your device</Link> / TouchMe
        </div>

        <div className="kicker">Issue 03 · Your device · Documentation</div>
        <h1 className="article-h">TouchMe — the <em>complete</em> guide.</h1>
        <p className="summary">
          The simplest place to start with our line. Grip both gold pads, touch a friend, watch a circuit complete through bare skin and a banana. This is how to get there in two minutes.
        </p>

        <figure className="schematic">
          <div className="schem-art">👐 — — — 🎵</div>
          <div>FIG. 1 · TouchMe TOP VIEW · v6</div>
        </figure>

        <p>
          TouchMe is a touch instrument — grab both conductive ends and you're playing. It works by detecting the electrical conductivity of your skin and completing a circuit between the two pads. The more contact area, the richer the signal.
        </p>

        <div className="callout warn">
          <strong>⚠️ Handle only the contacts shown in this guide.</strong> The gold pads, the USB-C connector, and the electrode-patch clip points are the parts meant to be touched. Avoid solder joints, exposed chips, and the underside of the PCB. The device is durable, but those areas can be damaged permanently.
        </div>

        <h2 className="section"><span className="num">01</span>Quick start (2 minutes)</h2>
        <p>The fastest path from box to first sound. If this doesn't work, the troubleshooter is at the bottom of the page.</p>

        <ol className="steps">
          <li><span className="step-num">1</span><div className="step-body"><strong>Connect TouchMe to your computer via USB.</strong><div className="step-desc">No drivers needed on Mac or Windows.</div></div></li>
          <li><span className="step-num">2</span><div className="step-body"><strong>Open <a href="https://synth.playtronica.com">synth.playtronica.com</a> in Chrome or Brave.</strong><div className="step-desc">Must be Chrome/Brave — the only browsers with Web MIDI support. Connect the device <em>before</em> opening the browser for reliable detection.</div></div></li>
          <li><span className="step-num">3</span><div className="step-body"><strong>Choose a synth.</strong><div className="step-desc">For your first session, Dots Piano is forgiving and sounds good with bare-skin contact.</div></div></li>
          <li><span className="step-num">4</span><div className="step-body"><strong>Grab both gold ends with bare skin.</strong><div className="step-desc">Hold TouchMe like a remote control — both conductive pads in your hands.</div></div></li>
        </ol>

        <div className="pullquote">
          <p className="pullquote-text">
            <span className="pullquote-mark">"</span>
            Some people only need it for that one trick — pulling it out at a dinner, plugging it into a banana, watching the room.
          </p>
          <div className="pullquote-attr">— A real customer · WhatsApp, 2025</div>
        </div>

        <div className="callout tip">
          <strong>🛠️ Want to go deeper?</strong> The <a href="#">deep dive</a> covers MIDI mapping, custom scales, hardware tuning, and performance tips. <a href="#">Tuning page</a> covers scale presets.
        </div>

        <h2 className="section"><span className="num">02</span>Two-person play</h2>
        <p>
          One hand on each pad, you complete the circuit alone. The trick — and what makes TouchMe a workshop favourite — is that two people can each hold one pad, touch each other anywhere on bare skin, and the circuit completes through both of them.
        </p>
        <p>
          Try this at a dinner party. Pass the device. Watch what happens when two strangers' hands meet.
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
