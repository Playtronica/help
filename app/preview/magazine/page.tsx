import Link from "next/link";

export const metadata = {
  title: "Preview C · Wired-magazine · Playtronica Help",
};

export default function MagazinePreview() {
  return (
    <>
      <style>{`
        .mag {
          --bg: #fafaf6;
          --ink: #1a1a1a;
          --ink-soft: #555;
          --rule: #d9d4c4;
          --accent: #2a3eb6;
          --warm: #c47857;
          --gold: #c9a878;
          background: var(--bg); color: var(--ink);
          margin: -24px -16px -24px -16px;
          padding: 36px 28px 64px;
          min-height: 100vh;
          font-family: "Inter Tight", "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 17px; line-height: 1.65;
        }
        .mag .serif { font-family: "Times New Roman", "PP Editorial New", "Source Serif Pro", Georgia, serif; }
        .mag .mono { font-family: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace; }
        .mag .topbar {
          display: flex; align-items: baseline; gap: 16px; padding-bottom: 14px;
          border-bottom: 2px solid var(--ink); margin-bottom: 28px;
        }
        .mag .masthead {
          font-family: "Times New Roman", serif; font-style: italic; font-weight: 700;
          font-size: 26px; letter-spacing: -0.01em;
        }
        .mag .nav-text { font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-soft); }

        /* Editorial hero */
        .mag .editorial-hero {
          display: grid; grid-template-columns: 1.5fr 1fr; gap: 36px; align-items: end;
          padding: 24px 0 32px; border-bottom: 1px solid var(--rule);
        }
        .mag .kicker {
          font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--warm); margin-bottom: 14px;
        }
        .mag .display {
          font-family: "Times New Roman", "PP Editorial New", Georgia, serif;
          font-weight: 700; font-style: italic;
          font-size: clamp(40px, 6vw, 78px); line-height: 0.96; letter-spacing: -0.02em;
        }
        .mag .display em { font-style: normal; color: var(--warm); font-weight: 400; font-family: serif; }
        .mag .standfirst {
          font-family: "Inter Tight", sans-serif; font-size: 16px; line-height: 1.55;
          color: var(--ink-soft); margin-top: 18px; max-width: 38ch;
        }
        .mag .standfirst::first-letter {
          font-family: "Times New Roman", serif; float: left; font-size: 56px;
          line-height: 0.9; padding: 4px 10px 0 0; color: var(--warm); font-weight: 700;
        }
        .mag .figure {
          background: linear-gradient(135deg, #efeadb 60%, #e7dfc7);
          border: 1px solid var(--rule); padding: 18px; aspect-ratio: 5/4;
          display: flex; align-items: center; justify-content: center; font-size: 92px;
        }
        .mag .figure-cap { font-family: "JetBrains Mono", monospace; font-size: 10px; color: var(--ink-soft);
          margin-top: 8px; letter-spacing: 0.06em; text-transform: uppercase; }

        /* Section heads */
        .mag .section-head {
          display: flex; align-items: baseline; gap: 16px; margin: 56px 0 12px;
          border-top: 1px solid var(--rule); padding-top: 18px;
        }
        .mag .section-no {
          font-family: "Times New Roman", serif; font-style: italic;
          font-size: 56px; color: var(--warm); line-height: 0.9; font-weight: 700;
        }
        .mag .section-title {
          font-family: "Times New Roman", serif; font-weight: 700;
          font-size: 28px; line-height: 1.1;
        }
        .mag .section-meta { font-family: "JetBrains Mono", monospace; font-size: 11px;
          color: var(--ink-soft); margin-left: auto; letter-spacing: 0.1em; text-transform: uppercase; }

        /* Magazine devices */
        .mag .devices {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;
        }
        .mag .device-card {
          color: var(--ink); display: block; padding-bottom: 12px;
          border-bottom: 1px solid var(--rule); transition: border-color 200ms;
        }
        .mag .device-card:hover { border-bottom-color: var(--warm); text-decoration: none; }
        .mag .device-img {
          background: linear-gradient(135deg, #efeadb, #e1d7bf);
          aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center;
          font-size: 68px; border: 1px solid var(--rule);
          transition: transform 200ms;
        }
        .mag .device-card:hover .device-img { transform: scale(1.02); }
        .mag .device-name { font-family: "Times New Roman", serif; font-weight: 700;
          font-size: 24px; margin-top: 14px; }
        .mag .device-kicker { font-family: "JetBrains Mono", monospace; font-size: 10px;
          color: var(--warm); letter-spacing: 0.12em; text-transform: uppercase; margin-top: 4px; }
        .mag .device-desc { color: var(--ink-soft); margin-top: 8px; font-size: 15px; line-height: 1.5; }

        /* Pull-quote */
        .mag .pullquote {
          margin: 52px auto; max-width: 700px; text-align: center;
          padding: 28px 12px; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule);
        }
        .mag .pullquote-text {
          font-family: "Times New Roman", serif; font-style: italic; font-weight: 700;
          font-size: clamp(24px, 3vw, 36px); line-height: 1.25; letter-spacing: -0.01em;
        }
        .mag .pullquote-attr {
          font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--ink-soft); margin-top: 14px;
        }
        .mag .pullquote-mark { font-family: serif; font-size: 70px; color: var(--warm);
          line-height: 0.3; vertical-align: -0.4em; margin-right: 8px; }

        /* Article-list cluster */
        .mag .cluster {
          display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 24px;
        }
        .mag .feature {
          background: linear-gradient(135deg, var(--ink) 0%, #2a2a2a 100%); color: #f5efdc;
          padding: 32px; border-radius: 4px; min-height: 240px;
          display: flex; flex-direction: column; justify-content: space-between;
          transition: transform 200ms;
        }
        .mag .feature:hover { transform: translateY(-3px); text-decoration: none; color: #f5efdc; }
        .mag .feature h3 {
          font-family: "Times New Roman", serif; font-weight: 700; font-size: 28px; line-height: 1.15;
        }
        .mag .feature-meta { font-family: "JetBrains Mono", monospace; font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); }
        .mag .side-art {
          border: 1px solid var(--rule); padding: 20px; transition: background 200ms;
          display: flex; flex-direction: column; justify-content: space-between;
        }
        .mag .side-art:hover { background: #fff; text-decoration: none; }
        .mag .side-art h4 {
          font-family: "Times New Roman", serif; font-weight: 700; font-size: 20px; line-height: 1.2;
        }
        .mag .side-art .device-kicker { margin-top: 0; }
        .mag .side-art .device-desc { margin-top: 12px; font-size: 14px; }

        .mag .colophon {
          margin-top: 56px; padding-top: 18px; border-top: 2px solid var(--ink);
          font-family: "JetBrains Mono", monospace; font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-soft);
          display: flex; justify-content: space-between;
        }

        @media (max-width: 768px) {
          .mag { padding: 24px 18px 60px; font-size: 16px; }
          .mag .editorial-hero { grid-template-columns: 1fr; gap: 22px; }
          .mag .devices { grid-template-columns: 1fr; }
          .mag .cluster { grid-template-columns: 1fr; }
          .mag .figure { aspect-ratio: 3/2; font-size: 64px; }
          .mag .display { font-size: 40px; }
        }
      `}</style>

      <div className="mag">
        <div className="topbar">
          <span className="masthead">Playtronica</span>
          <span className="nav-text">/ help — vol. 03</span>
          <Link href="/preview/" className="nav-text" style={{ marginLeft: "auto" }}>← all variants</Link>
        </div>

        <div className="editorial-hero">
          <div>
            <div className="kicker">Issue 03 · May 2026 · Documentation</div>
            <h1 className="display">make sound<br />from <em>anything.</em></h1>
            <p className="standfirst">
              An instrument doesn't have to be made of wood or plastic — and you don't have to know music to play one. This is the documentation for everyone who decided to find out.
            </p>
          </div>
          <figure>
            <div className="figure">🎵</div>
            <div className="figure-cap">Fig. 1 — The most-asked instrument since 2018.</div>
          </figure>
        </div>

        <div className="section-head">
          <span className="section-no">01</span>
          <span className="section-title">The five instruments, briefly</span>
          <span className="section-meta">three columns</span>
        </div>

        <div className="devices">
          <Link href="#touchme" className="device-card">
            <div className="device-img">👐</div>
            <div className="device-kicker">since 2018 · €92</div>
            <div className="device-name">TouchMe</div>
            <p className="device-desc">A circuit board the size of a postcard. Grab both gold pads. Touch a banana. Now there's music.</p>
          </Link>
          <Link href="#playtron" className="device-card">
            <div className="device-img">🍉</div>
            <div className="device-kicker">16 inputs · €110</div>
            <div className="device-name">Playtron</div>
            <p className="device-desc">Sixteen alligator clips, each clipped to anything that conducts. Your fruit bowl becomes a piano.</p>
          </Link>
          <Link href="#biotron" className="device-card">
            <div className="device-img">🌿</div>
            <div className="device-kicker">self-playing · €179</div>
            <div className="device-name">Biotron</div>
            <p className="device-desc">A houseplant becomes the instrument. You don't play it. You water it, and listen.</p>
          </Link>
        </div>

        <div className="pullquote">
          <p className="pullquote-text">
            <span className="pullquote-mark">"</span>
            Some people only need it for that one trick — pulling it out at a dinner, plugging it into a banana, watching the room.
            <span className="pullquote-mark">"</span>
          </p>
          <div className="pullquote-attr">— A real customer · WhatsApp, 2025</div>
        </div>

        <div className="section-head">
          <span className="section-no">02</span>
          <span className="section-title">Starting points</span>
          <span className="section-meta">a feature, two side pieces</span>
        </div>

        <div className="cluster">
          <Link href="#gift" className="feature">
            <div>
              <div className="feature-meta">For the gift-recipient</div>
              <h3>You opened the box. Now what?</h3>
            </div>
            <p style={{ fontSize: 15, opacity: 0.9, marginTop: 16 }}>
              The fastest path from holding a circuit board to producing your first note — five minutes, no jargon, no prior music knowledge required.
            </p>
          </Link>
          <Link href="#what-is" className="side-art">
            <div>
              <div className="device-kicker">60-second read</div>
              <h4>What is Playtronica, really?</h4>
            </div>
            <p className="device-desc">The whole idea, fast. For when you want context before you plug in.</p>
          </Link>
          <Link href="#first5" className="side-art">
            <div>
              <div className="device-kicker">box → sound</div>
              <h4>First 5 minutes</h4>
            </div>
            <p className="device-desc">Step by step from unboxing to your first audible note.</p>
          </Link>
        </div>

        <div className="section-head">
          <span className="section-no">03</span>
          <span className="section-title">When it doesn't sing</span>
          <span className="section-meta">troubleshooting + orders</span>
        </div>

        <div className="cluster">
          <Link href="#trouble" className="feature" style={{ background: "linear-gradient(135deg, #2a3eb6, #1a25a0)" }}>
            <div>
              <div className="feature-meta">Interactive triage</div>
              <h3>Tell us what's happening — we'll walk you through it.</h3>
            </div>
            <p style={{ fontSize: 15, opacity: 0.9, marginTop: 16 }}>
              Same three or four yes/no questions a friend on WhatsApp would ask. End at the fix.
            </p>
          </Link>
          <Link href="#tracking" className="side-art">
            <div>
              <div className="device-kicker">most-asked</div>
              <h4>Track your order</h4>
            </div>
            <p className="device-desc">Where it is, when it arrives, what to do if tracking has gone quiet.</p>
          </Link>
          <Link href="#returns" className="side-art">
            <div>
              <div className="device-kicker">30-day window</div>
              <h4>Returns &amp; refunds</h4>
            </div>
            <p className="device-desc">No drama either way. The full process, plainly.</p>
          </Link>
        </div>

        <div className="colophon">
          <span>∿ Playtronica · Help — vol. 03</span>
          <span>Designed in Cowork · May 2026</span>
        </div>
      </div>
    </>
  );
}
