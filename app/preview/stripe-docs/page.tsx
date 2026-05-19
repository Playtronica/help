import Link from "next/link";

export const metadata = { title: "Preview E · Stripe-grade docs · Playtronica Help" };

export default function StripeDocsPreview() {
  return (
    <>
      <style>{`
        .sd {
          --bg: #ffffff;
          --bg-soft: #fafbff;
          --ink: #1a1f36;
          --ink-soft: #58607a;
          --rule: #e6ebf1;
          --rule-strong: #cfd7e6;
          --accent: #3c50e6;
          --accent-soft: #eef0ff;
          --code-bg: #f7f8fb;
          background: var(--bg); color: var(--ink);
          margin: -24px -16px -24px -16px;
          padding: 0;
          min-height: 100vh;
          font-family: "Inter", "Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
          font-size: 16px; line-height: 1.65;
        }
        .sd a { color: var(--accent); text-decoration: none; }
        .sd a:hover { text-decoration: underline; text-underline-offset: 2px; }

        .sd .top {
          display: flex; align-items: center; gap: 16px;
          padding: 14px 32px; border-bottom: 1px solid var(--rule);
          background: var(--bg); position: sticky; top: 0; z-index: 10;
        }
        .sd .brand {
          font-weight: 700; font-size: 16px; letter-spacing: -0.01em;
          display: flex; align-items: center; gap: 8px;
        }
        .sd .brand-logo {
          width: 26px; height: 26px; border-radius: 6px;
          background: linear-gradient(135deg, #4a5cd9, #2a3eb6);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 13px;
        }
        .sd .nav-link {
          font-size: 14px; color: var(--ink-soft); font-weight: 500;
        }
        .sd .nav-link:hover { color: var(--accent); text-decoration: none; }
        .sd .cmdk {
          margin-left: auto; max-width: 360px; flex: 1;
          background: var(--code-bg); border: 1px solid var(--rule);
          padding: 8px 12px; border-radius: 8px; font-size: 14px; color: var(--ink-soft);
          display: flex; align-items: center; gap: 10px; cursor: pointer;
          transition: border-color 150ms;
        }
        .sd .cmdk:hover { border-color: var(--rule-strong); }
        .sd .cmdk-shortcut {
          font-family: "JetBrains Mono", monospace; font-size: 11px;
          background: #fff; border: 1px solid var(--rule); padding: 2px 6px;
          border-radius: 4px; margin-left: auto;
        }

        .sd .body { padding: 0 32px 72px; max-width: 1100px; margin: 0 auto; }

        .sd .breadcrumb {
          font-size: 13px; color: var(--ink-soft); margin: 24px 0 8px;
        }
        .sd .hero {
          padding: 14px 0 26px; border-bottom: 1px solid var(--rule); margin-bottom: 36px;
        }
        .sd .hero-h {
          font-size: clamp(32px, 4vw, 44px); font-weight: 700;
          line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 12px;
        }
        .sd .hero-sub {
          font-size: 18px; color: var(--ink-soft); line-height: 1.55; max-width: 60ch;
        }

        .sd .layout {
          display: grid; grid-template-columns: 1fr 220px; gap: 48px;
          align-items: start;
        }
        .sd .toc {
          position: sticky; top: 84px;
          font-size: 13px; padding: 0;
        }
        .sd .toc-h { font-weight: 700; margin-bottom: 8px; color: var(--ink); }
        .sd .toc a { display: block; color: var(--ink-soft); padding: 4px 0; font-size: 13px; }
        .sd .toc a:hover { color: var(--accent); }
        .sd .toc a.active { color: var(--accent); border-left: 2px solid var(--accent); padding-left: 8px; margin-left: -10px; }

        .sd .section {
          margin: 28px 0 8px;
          display: flex; align-items: center; gap: 12px;
        }
        .sd .chip {
          font-family: "JetBrains Mono", monospace; font-size: 11px;
          background: var(--accent-soft); color: var(--accent);
          padding: 3px 8px; border-radius: 4px; font-weight: 600;
          letter-spacing: 0.04em;
        }
        .sd .section h2 {
          font-size: 22px; font-weight: 700; letter-spacing: -0.01em;
        }
        .sd .section-sub { font-size: 15px; color: var(--ink-soft); margin: -4px 0 16px; }

        .sd .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .sd .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }

        .sd .card {
          background: var(--bg); border: 1px solid var(--rule); border-radius: 10px;
          padding: 18px 20px; color: var(--ink); display: block;
          transition: border-color 150ms, box-shadow 150ms;
        }
        .sd .card:hover {
          border-color: var(--rule-strong);
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          text-decoration: none;
        }
        .sd .card .label {
          font-family: "JetBrains Mono", monospace; font-size: 11px;
          color: var(--ink-soft); letter-spacing: 0.04em;
          margin-bottom: 8px; text-transform: uppercase;
        }
        .sd .card .title {
          font-weight: 700; font-size: 16px; line-height: 1.3;
          margin-bottom: 6px; letter-spacing: -0.01em;
        }
        .sd .card .title .arrow { color: var(--accent); margin-left: 4px; }
        .sd .card .desc { font-size: 14px; color: var(--ink-soft); line-height: 1.5; }

        .sd .feature-row {
          border: 1px solid var(--rule); border-radius: 10px;
          padding: 18px 22px; display: flex; align-items: center; gap: 18px;
          margin: 8px 0;
          transition: border-color 150ms;
        }
        .sd .feature-row:hover { border-color: var(--rule-strong); text-decoration: none; color: var(--ink); }
        .sd .feature-row .ic { font-size: 26px; }
        .sd .feature-row .meta-end {
          margin-left: auto;
          font-family: "JetBrains Mono", monospace; font-size: 11px;
          color: var(--ink-soft); background: var(--code-bg);
          padding: 4px 10px; border-radius: 4px;
        }

        .sd .footer-meta {
          font-size: 13px; color: var(--ink-soft); margin-top: 56px;
          padding-top: 18px; border-top: 1px solid var(--rule);
          display: flex; justify-content: space-between;
        }

        @media (max-width: 900px) {
          .sd .layout { grid-template-columns: 1fr; }
          .sd .toc { display: none; }
        }
        @media (max-width: 640px) {
          .sd .top { padding: 12px 18px; flex-wrap: wrap; }
          .sd .body { padding: 0 18px 56px; }
          .sd .grid-3, .sd .grid-2 { grid-template-columns: 1fr; }
          .sd .cmdk { display: none; }
        }
      `}</style>

      <div className="sd">
        <div className="top">
          <span className="brand">
            <span className="brand-logo">P</span>
            Playtronica Help
          </span>
          <Link href="#devices" className="nav-link">Devices</Link>
          <Link href="#orders" className="nav-link">Orders</Link>
          <Link href="#trouble" className="nav-link">Troubleshooting</Link>
          <Link href="#contact" className="nav-link">Contact</Link>
          <div className="cmdk">
            <span>🔍</span>
            <span>Search the docs</span>
            <span className="cmdk-shortcut">⌘K</span>
          </div>
          <Link href="/preview/" className="nav-link">← variants</Link>
        </div>

        <div className="body">
          <div className="breadcrumb">Home</div>

          <div className="hero">
            <h1 className="hero-h">Playtronica documentation</h1>
            <p className="hero-sub">
              Make music from plants, water, fruit, skin — anything that conducts a little bit of electricity. Find your device below, or jump to the most-asked questions.
            </p>
          </div>

          <div className="layout">
            <main>
              <div className="section" id="devices">
                <span className="chip">01</span>
                <h2>Your device</h2>
              </div>
              <p className="section-sub">Five instruments. Each one senses something different.</p>
              <div className="grid-3">
                <Link className="card" href="#touchme">
                  <div className="label">since 2018</div>
                  <div className="title">👐 TouchMe<span className="arrow">→</span></div>
                  <div className="desc">Grip both gold pads. Touch any conductive thing.</div>
                </Link>
                <Link className="card" href="#playtron">
                  <div className="label">16 alligator inputs</div>
                  <div className="title">🍉 Playtron<span className="arrow">→</span></div>
                  <div className="desc">Clip alligators to fruit, foil, plants, skin.</div>
                </Link>
                <Link className="card" href="#biotron">
                  <div className="label">self-playing</div>
                  <div className="title">🌿 Biotron<span className="arrow">→</span></div>
                  <div className="desc">A houseplant becomes a generative MIDI source.</div>
                </Link>
                <Link className="card" href="#orbita">
                  <div className="label">rotating sequencer</div>
                  <div className="title">🌀 Orbita<span className="arrow">→</span></div>
                  <div className="desc">A motorized step-sequencer that plays itself.</div>
                </Link>
                <Link className="card" href="#scales">
                  <div className="label">weight → pitch</div>
                  <div className="title">⚖️ Scales<span className="arrow">→</span></div>
                  <div className="desc">Place an object on the plate. Heavier = higher.</div>
                </Link>
                <Link className="card" href="#which-device">
                  <div className="label">not sure?</div>
                  <div className="title">🤔 Which one is mine?<span className="arrow">→</span></div>
                  <div className="desc">Side-by-side photo guide.</div>
                </Link>
              </div>

              <div className="section" id="start">
                <span className="chip">02</span>
                <h2>Start here</h2>
              </div>
              <p className="section-sub">Three entry points depending on where you are.</p>
              <div className="grid-3">
                <Link className="card" href="#what-is">
                  <div className="label">60s read</div>
                  <div className="title">⭐ What is Playtronica?<span className="arrow">→</span></div>
                  <div className="desc">The whole idea, fast.</div>
                </Link>
                <Link className="card" href="#first5">
                  <div className="label">box → sound</div>
                  <div className="title">🔌 Your first 5 minutes<span className="arrow">→</span></div>
                  <div className="desc">From unboxing to first audible note.</div>
                </Link>
                <Link className="card" href="#gift">
                  <div className="label">no jargon</div>
                  <div className="title">🎁 Got it as a gift?<span className="arrow">→</span></div>
                  <div className="desc">Welcome — the fastest path to the wow moment.</div>
                </Link>
              </div>

              <div className="section" id="orders">
                <span className="chip">03</span>
                <h2>Orders & support</h2>
              </div>
              <p className="section-sub">The most-asked operational questions.</p>
              <Link className="feature-row" href="#tracking">
                <span className="ic">🔍</span>
                <div>
                  <div style={{ fontWeight: 600 }}>Track your order</div>
                  <div style={{ fontSize: 14, color: "var(--ink-soft)" }}>Where it is, when it arrives, what to do if tracking has gone quiet.</div>
                </div>
                <span className="meta-end">953 tickets/yr</span>
              </Link>
              <Link className="feature-row" href="#invoice">
                <span className="ic">🧾</span>
                <div>
                  <div style={{ fontWeight: 600 }}>Invoice & VAT</div>
                  <div style={{ fontSize: 14, color: "var(--ink-soft)" }}>Customs, company purchase, plain receipt.</div>
                </div>
                <span className="meta-end">484 tickets/yr</span>
              </Link>
              <Link className="feature-row" href="#returns">
                <span className="ic">↩️</span>
                <div>
                  <div style={{ fontWeight: 600 }}>Returns & refunds</div>
                  <div style={{ fontSize: 14, color: "var(--ink-soft)" }}>30-day window, no drama either way.</div>
                </div>
                <span className="meta-end">517 tickets/yr</span>
              </Link>

              <div className="section" id="trouble">
                <span className="chip">04</span>
                <h2>Troubleshooting</h2>
              </div>
              <p className="section-sub">Interactive triage — three or four yes/no questions to the fix.</p>
              <Link className="feature-row" href="#walker" style={{ background: "var(--accent-soft)", border: "1px solid var(--accent)" }}>
                <span className="ic">⚡</span>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--accent)" }}>Open the troubleshooter →</div>
                  <div style={{ fontSize: 14, color: "var(--ink-soft)" }}>Same questions we'd ask if you wrote to us. End at the fix.</div>
                </div>
              </Link>
            </main>

            <aside className="toc">
              <div className="toc-h">On this page</div>
              <Link href="#devices" className="active">01 · Your device</Link>
              <Link href="#start">02 · Start here</Link>
              <Link href="#orders">03 · Orders & support</Link>
              <Link href="#trouble">04 · Troubleshooting</Link>
            </aside>
          </div>

          <div className="footer-meta">
            <span>Playtronica Help · Stripe-grade preview · 2026</span>
            <span>Last updated: 2026-05-12</span>
          </div>
        </div>
      </div>
    </>
  );
}
