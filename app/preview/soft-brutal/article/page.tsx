import Link from "next/link";

export const metadata = { title: "Article preview · F · Soft brutalism" };

export default function SoftBrutalArticle() {
  return (
    <>
      <style>{`
        .sb {
          --bg: #fdfcfa; --ink: #15161b; --ink-soft: #5a5d6a;
          --rule: #1a1a1a; --rule-soft: #e9e6df; --accent: #4a5cd9;
          --gold: #b88a47; --hl: #fff9e9; --warn-bg: #fff5f5; --warn-rule: #c62828;
          --tip-bg: #f0f4ff; --tip-rule: #4a5cd9;
          background: var(--bg); color: var(--ink);
          margin: -24px -16px -24px -16px;
          padding: 18px 18px 64px;
          min-height: 100vh;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
          font-size: 17px; line-height: 1.65;
        }
        .sb .mono { font-family: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace; }
        .sb a { color: var(--accent); }

        .sb .topbar {
          display: flex; align-items: center; gap: 12px; padding: 10px 0;
          border-bottom: 1.5px solid var(--rule); margin-bottom: 20px;
        }
        .sb .logo { font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 15px; }
        .sb .search-mini {
          flex: 1; max-width: 360px; background: #fff;
          border: 1.5px solid var(--rule); padding: 7px 12px; font-size: 14px;
          outline: none; font-family: inherit;
        }
        .sb .tabs {
          display: flex; gap: 0; margin: 0 0 20px;
          border-bottom: 1.5px solid var(--rule);
        }
        .sb .tab {
          padding: 8px 14px; font-family: "JetBrains Mono", monospace; font-size: 12px;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--ink-soft); border-bottom: 2px solid transparent; margin-bottom: -1.5px;
        }
        .sb .tab.active { color: var(--ink); border-bottom-color: var(--ink); font-weight: 700; }

        .sb .crumb {
          font-family: "JetBrains Mono", monospace; font-size: 11px;
          color: var(--ink-soft); margin: 4px 0 16px; letter-spacing: 0.04em;
        }
        .sb .crumb a { color: var(--ink-soft); }
        .sb .crumb a:hover { color: var(--accent); }

        .sb h1.article-h {
          font-family: "JetBrains Mono", monospace; font-weight: 700;
          font-size: clamp(24px, 3.5vw, 32px); line-height: 1.15; letter-spacing: -0.01em;
        }
        .sb .summary {
          font-size: 17px; color: var(--ink-soft); line-height: 1.55;
          margin: 8px 0 18px; max-width: 60ch;
        }

        .sb .schematic {
          border: 1.5px solid var(--rule); background: #fff; padding: 14px;
          margin: 0 0 22px;
          text-align: center; font-family: "JetBrains Mono", monospace;
          font-size: 11px; color: var(--ink-soft); letter-spacing: 0.06em;
        }
        .sb .schem-art {
          height: 140px; display: flex; align-items: center; justify-content: center;
          font-size: 52px; margin-bottom: 8px;
        }

        .sb h2.section {
          font-family: "Inter", sans-serif; font-weight: 700;
          font-size: 22px; letter-spacing: -0.01em;
          margin: 36px 0 6px;
          display: flex; align-items: baseline; gap: 10px;
        }
        .sb h2.section .num {
          font-family: "JetBrains Mono", monospace; font-size: 12px;
          color: var(--ink-soft); letter-spacing: 0.08em;
        }
        .sb p { margin-bottom: 14px; max-width: 64ch; }

        .sb .callout {
          border-left: 3px solid var(--ink); background: #fff;
          padding: 14px 16px; margin: 18px 0; max-width: 64ch;
          font-size: 16px; line-height: 1.55;
        }
        .sb .callout.warn { border-left-color: var(--warn-rule); background: var(--warn-bg); }
        .sb .callout.tip  { border-left-color: var(--tip-rule);  background: var(--tip-bg); }
        .sb .callout strong { font-weight: 700; }

        .sb ol.steps { margin: 18px 0; padding: 0; list-style: none; max-width: 66ch; }
        .sb ol.steps li {
          display: grid; grid-template-columns: 32px 1fr; gap: 12px; align-items: start;
          padding: 14px 0; border-bottom: 1px solid var(--rule-soft);
        }
        .sb ol.steps li:last-child { border-bottom: 0; }
        .sb ol.steps .step-num {
          font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 14px;
          background: var(--ink); color: var(--bg); padding: 4px 0;
          text-align: center; align-self: start; line-height: 1.2;
        }
        .sb ol.steps .step-body { font-size: 16px; line-height: 1.55; }
        .sb ol.steps .step-body strong { font-weight: 700; }
        .sb ol.steps .step-body .step-desc { color: var(--ink-soft); margin-top: 2px; font-size: 15px; }

        .sb .related {
          margin-top: 36px; padding-top: 22px; border-top: 1.5px solid var(--rule);
        }
        .sb .related-h {
          font-family: "JetBrains Mono", monospace; font-size: 12px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft);
          margin-bottom: 10px;
        }
        .sb .related-list {
          display: grid; gap: 10px; grid-template-columns: 1fr;
        }
        .sb .related-card {
          background: #fff; border: 1.5px solid var(--rule); padding: 12px 16px;
          color: var(--ink); display: flex; align-items: center; gap: 12px;
          transition: transform 150ms, box-shadow 150ms;
        }
        .sb .related-card:hover {
          transform: translate(-1px, -1px); box-shadow: 3px 3px 0 var(--rule);
          text-decoration: none;
        }
        .sb .related-card .emo { font-size: 22px; }
        .sb .related-card .ttl { font-weight: 600; font-size: 15px; }
        .sb .related-card .arr { margin-left: auto; font-family: "JetBrains Mono", monospace;
          color: var(--accent); font-size: 13px; }

        .sb .feedback {
          margin-top: 28px; padding: 16px; border: 1.5px solid var(--rule); background: #fff;
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
        }
        .sb .feedback span { font-weight: 600; font-size: 15px; }
        .sb .feedback button {
          font-family: inherit; font-size: 14px; padding: 7px 14px;
          border: 1.5px solid var(--rule); background: #fff; cursor: pointer;
          transition: box-shadow 150ms, transform 150ms;
        }
        .sb .feedback button:hover {
          box-shadow: 2px 2px 0 var(--rule); transform: translate(-1px, -1px);
        }
        .sb .feedback .yes { background: var(--ink); color: var(--bg); }

        @media (min-width: 1024px) {
          .sb { padding: 28px 36px 80px; }
          .sb .related-list { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="sb">
        <div className="topbar">
          <div className="logo">∿ playtronica / help</div>
          <input className="search-mini" placeholder="Search…" />
          <Link href="/preview/" className="mono" style={{ fontSize: 11, color: "#5a5d6a", marginLeft: "auto" }}>← variants</Link>
        </div>

        <div className="tabs">
          <Link href="/preview/soft-brutal/" className="tab">/ Home</Link>
          <Link href="/preview/soft-brutal/article/" className="tab active">/ Article example</Link>
        </div>

        <div className="crumb">
          <Link href="/preview/soft-brutal/">Home</Link> / <Link href="#">Your device</Link> / TouchMe
        </div>

        <h1 className="article-h">👐 TouchMe — complete guide</h1>
        <p className="summary">
          How to use TouchMe, from first connection to live performance. The simplest place to start with our line — grip both gold pads, touch a friend, make music.
        </p>

        <figure className="schematic">
          <div className="schem-art">👐 — — — 🎵</div>
          <div>FIG. 1 · TouchMe TOP VIEW · v6</div>
        </figure>

        <p>
          TouchMe is a touch instrument — grab both conductive ends and you're playing. It works by detecting the electrical conductivity of your skin and completing a circuit between the two pads. The more contact area, the richer the signal.
        </p>

        <div className="callout warn">
          <strong>⚠️ Handle only the contacts shown in this guide.</strong> The gold pads (1, 2), the USB-C connector (3), and the electrode-patch clip points (6) are the parts meant to be touched. Avoid solder joints, exposed chips, and the underside of the PCB — even when unplugged. TouchMe is durable, but those areas can be damaged permanently.
        </div>

        <h2 className="section">
          <span className="num">01</span>
          Quick start (2 minutes)
        </h2>
        <p>The fastest path from box to first sound. If this doesn't work, the troubleshooter is at the bottom of the page.</p>

        <ol className="steps">
          <li>
            <span className="step-num">1</span>
            <div className="step-body">
              <strong>Connect TouchMe to your computer via USB.</strong>
              <div className="step-desc">No drivers needed on Mac or Windows. If you don't have a USB-A port, you'll need an adapter (Lightning, Micro USB, or USB-C).</div>
            </div>
          </li>
          <li>
            <span className="step-num">2</span>
            <div className="step-body">
              <strong>Open <a href="https://synth.playtronica.com">synth.playtronica.com</a> in Chrome or Brave.</strong>
              <div className="step-desc">Must be Chrome/Brave — the only browsers with Web MIDI support. Open the browser <em>after</em> connecting the device for reliable detection.</div>
            </div>
          </li>
          <li>
            <span className="step-num">3</span>
            <div className="step-body">
              <strong>Choose a synth.</strong>
              <div className="step-desc">For your first session, we recommend Dots Piano. It's forgiving and sounds good with bare-skin contact.</div>
            </div>
          </li>
          <li>
            <span className="step-num">4</span>
            <div className="step-body">
              <strong>Grab both gold ends with bare skin.</strong>
              <div className="step-desc">Hold TouchMe like a remote control — both conductive pads in your hands. Vary pressure for different velocities.</div>
            </div>
          </li>
        </ol>

        <div className="callout tip">
          <strong>🛠️ Want to go deeper?</strong> When you're past the basics, see the <a href="#">TouchMe deep dive</a> — MIDI mapping, custom scales, hardware tuning, performance tips. The <a href="#">tuning page</a> covers scale presets.
        </div>

        <h2 className="section">
          <span className="num">02</span>
          Two-person play
        </h2>
        <p>
          One hand on each pad, you complete the circuit alone. But the trick — and what makes TouchMe a workshop favourite — is that two people can each hold one pad, touch each other anywhere on bare skin, and the circuit completes through both of them.
        </p>
        <p>
          Try this at a dinner party. Pass the device. Watch what happens when two strangers' hands meet.
        </p>

        <h2 className="section">
          <span className="num">03</span>
          When it isn't working
        </h2>
        <ol className="steps">
          <li><span className="step-num">A</span><div className="step-body"><strong>Are you in Chrome or Brave?</strong><div className="step-desc">Safari and Firefox don't speak Web MIDI yet.</div></div></li>
          <li><span className="step-num">B</span><div className="step-body"><strong>Did you click Allow on the MIDI prompt?</strong><div className="step-desc">If you clicked Block by accident: browser Settings → Site Settings → MIDI → set synth.playtronica.com to Allow.</div></div></li>
          <li><span className="step-num">C</span><div className="step-body"><strong>Bare skin on both pads?</strong><div className="step-desc">Sleeves and gloves break the circuit. Same for very dry skin in winter — a small drop of water on a fingertip usually fixes it.</div></div></li>
        </ol>

        <div className="related">
          <div className="related-h">Related</div>
          <div className="related-list">
            <Link href="#" className="related-card">
              <span className="emo">🍉</span>
              <span className="ttl">Playtron — complete guide</span>
              <span className="arr">→</span>
            </Link>
            <Link href="#" className="related-card">
              <span className="emo">🎼</span>
              <span className="ttl">Custom tuning and scales</span>
              <span className="arr">→</span>
            </Link>
            <Link href="#" className="related-card">
              <span className="emo">🔧</span>
              <span className="ttl">Troubleshooting walker</span>
              <span className="arr">→</span>
            </Link>
            <Link href="#" className="related-card">
              <span className="emo">🍊</span>
              <span className="ttl">Objects you can play</span>
              <span className="arr">→</span>
            </Link>
          </div>
        </div>

        <div className="feedback">
          <span>Did this answer your question?</span>
          <button className="yes">Yes</button>
          <button>No</button>
          <span className="mono" style={{ fontSize: 11, color: "#5a5d6a", marginLeft: "auto" }}>
            updated · 2026-05-12
          </span>
        </div>
      </div>
    </>
  );
}
