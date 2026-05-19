import Link from "next/link";

export const metadata = { title: "Preview D · Notion clarity · Playtronica Help" };

export default function NotionClarityPreview() {
  return (
    <>
      <style>{`
        .nc {
          --bg: #ffffff;
          --ink: #2f2e2e;
          --ink-soft: #6a6a6a;
          --rule: #ececec;
          --hairline: #f4f4f4;
          --accent: #4a5cd9;
          --warm: #ffefe1;
          background: var(--bg); color: var(--ink);
          margin: -24px -16px -24px -16px;
          padding: 36px 32px 72px;
          min-height: 100vh;
          font-family: "Inter", "Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
          font-size: 18px; line-height: 1.7;
        }
        .nc a { color: var(--accent); text-decoration: none; }
        .nc a:hover { text-decoration: underline; }

        .nc .top {
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 32px; padding-bottom: 16px;
          border-bottom: 1px solid var(--rule);
        }
        .nc .brand { font-size: 18px; font-weight: 700; letter-spacing: -0.01em; }
        .nc .search {
          flex: 1; max-width: 520px;
          background: #f7f7f5;
          border: 1px solid var(--rule);
          padding: 10px 14px; font-size: 15px; outline: none;
          border-radius: 8px; color: var(--ink); font-family: inherit;
          transition: background 150ms, border-color 150ms;
        }
        .nc .search:focus { background: #fff; border-color: var(--accent); }
        .nc .meta { font-size: 13px; color: var(--ink-soft); margin-left: auto; }

        .nc h1.hero {
          font-size: clamp(34px, 4vw, 50px); font-weight: 700;
          line-height: 1.15; letter-spacing: -0.02em;
          margin: 8px 0 18px; max-width: 22ch;
        }
        .nc .sub {
          font-size: 19px; line-height: 1.6;
          color: var(--ink-soft); max-width: 62ch; margin-bottom: 24px;
        }
        .nc .callout {
          background: var(--warm); padding: 16px 20px;
          border-radius: 6px; font-size: 16px; line-height: 1.55;
          max-width: 62ch; margin: 24px 0;
        }
        .nc .callout strong { color: var(--ink); }
        .nc .pills { display: flex; gap: 8px; flex-wrap: wrap; margin: 14px 0 8px; }
        .nc .pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: #f7f7f5; color: var(--ink);
          border: 1px solid var(--rule); border-radius: 8px;
          padding: 8px 14px; font-size: 15px; font-weight: 500;
          transition: background 150ms, border-color 150ms, color 150ms;
        }
        .nc .pill:hover { background: #fff; border-color: #c8c8c8; color: var(--accent); text-decoration: none; }

        .nc h2 {
          font-size: 24px; font-weight: 700; letter-spacing: -0.01em;
          margin: 56px 0 6px;
        }
        .nc h2 + .h2-sub {
          font-size: 15px; color: var(--ink-soft); margin-bottom: 18px;
        }
        .nc .divider { height: 1px; background: var(--rule); margin: 18px 0; }

        .nc .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .nc .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }

        .nc .card {
          background: #fff; border: 1px solid var(--rule); border-radius: 10px;
          padding: 22px; color: var(--ink); display: block;
          transition: border-color 150ms, box-shadow 150ms;
        }
        .nc .card:hover {
          border-color: #c8c8c8;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          text-decoration: none;
        }
        .nc .card .emoji { font-size: 28px; line-height: 1; }
        .nc .card .title {
          font-size: 18px; font-weight: 700; margin-top: 10px;
          letter-spacing: -0.01em;
        }
        .nc .card .desc { font-size: 15px; line-height: 1.55; color: var(--ink-soft); margin-top: 8px; }
        .nc .card .meta {
          font-size: 12px; color: var(--ink-soft); margin-top: 14px;
          display: flex; justify-content: space-between;
        }
        .nc .card .meta .arrow { color: var(--accent); }

        .nc .list-card {
          background: #fff; border: 1px solid var(--rule); border-radius: 10px;
          padding: 18px 22px; color: var(--ink); display: block;
          transition: border-color 150ms;
        }
        .nc .list-card:hover { border-color: #c8c8c8; text-decoration: none; }
        .nc .list-card .row {
          display: flex; align-items: center; gap: 16px;
        }
        .nc .list-card .icon { font-size: 24px; }
        .nc .list-card .title { font-size: 17px; font-weight: 600; }
        .nc .list-card .desc { font-size: 14px; color: var(--ink-soft); margin-top: 2px; }
        .nc .list-card .badge {
          margin-left: auto; font-size: 12px; color: var(--ink-soft);
          background: #f7f7f5; padding: 4px 10px; border-radius: 999px;
        }

        .nc .credit { font-size: 13px; color: var(--ink-soft); margin-top: 64px; }

        @media (max-width: 768px) {
          .nc { padding: 24px 18px 60px; font-size: 17px; }
          .nc .grid-3 { grid-template-columns: 1fr; }
          .nc .grid-2 { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="nc">
        <div className="top">
          <span className="brand">🎵 Playtronica Help</span>
          <input className="search" placeholder="Search the help center…" />
          <Link href="/preview/" className="meta">← all variants</Link>
        </div>

        <h1 className="hero">Help center</h1>
        <p className="sub">
          Everything you need to make music from anything — plants, water, your hands, that bowl of fruit on the counter. Search at the top, or pick a topic below.
        </p>

        <div className="callout">
          <strong>👋 New here?</strong> Start with <a href="#what-is">What is Playtronica?</a> or jump to <a href="#gift">Got it as a gift?</a> if someone just handed you a circuit board and you're not sure what it is.
        </div>

        <div className="pills">
          <Link className="pill" href="#tracking">📦 Track my order</Link>
          <Link className="pill" href="#returns">↩ Returns</Link>
          <Link className="pill" href="#invoice">🧾 Invoice & VAT</Link>
          <Link className="pill" href="#trouble">🔧 Not working?</Link>
        </div>

        <h2>Your device</h2>
        <p className="h2-sub">Five instruments. Pick the one you have.</p>
        <div className="grid-3">
          {[
            { e: "👐", h: "TouchMe", d: "Grip both gold pads. Touch any conductive thing. Notes.", m: "since 2018" },
            { e: "🍉", h: "Playtron", d: "Clip alligators to fruit, foil, plants, skin. Anything that conducts.", m: "16 inputs" },
            { e: "🌿", h: "Biotron", d: "A houseplant becomes a generative MIDI source.", m: "self-playing" },
            { e: "🌀", h: "Orbita", d: "A rotating step-sequencer. Plays patterns by itself.", m: "premium" },
            { e: "⚖️", h: "Scales", d: "Weight-to-MIDI. Heavier = higher pitch. Five modes.", m: "newest" },
            { e: "🤔", h: "Not sure which?", d: "Side-by-side photo guide to identify your device.", m: "comparison" },
          ].map((c) => (
            <Link key={c.h} href={`#${c.h.toLowerCase()}`} className="card">
              <div className="emoji">{c.e}</div>
              <div className="title">{c.h}</div>
              <div className="desc">{c.d}</div>
              <div className="meta"><span>{c.m}</span><span className="arrow">Open →</span></div>
            </Link>
          ))}
        </div>

        <h2>New here?</h2>
        <p className="h2-sub">Three starting points by where you are in your journey.</p>
        <div className="grid-3">
          <Link className="card" href="#what-is">
            <div className="emoji">⭐</div>
            <div className="title">What is Playtronica?</div>
            <div className="desc">The whole idea, in 60 seconds. For the kind of person who wants context before plugging in.</div>
            <div className="meta"><span>60-second read</span><span className="arrow">Read →</span></div>
          </Link>
          <Link className="card" href="#first5">
            <div className="emoji">🔌</div>
            <div className="title">Your first 5 minutes</div>
            <div className="desc">Step-by-step from opening the box to your first audible note.</div>
            <div className="meta"><span>box → sound</span><span className="arrow">Start →</span></div>
          </Link>
          <Link className="card" href="#gift">
            <div className="emoji">🎁</div>
            <div className="title">Got it as a gift?</div>
            <div className="desc">Welcome. Here's the fastest path to the wow moment, no jargon required.</div>
            <div className="meta"><span>no setup pain</span><span className="arrow">Open →</span></div>
          </Link>
        </div>

        <h2>Orders & support</h2>
        <p className="h2-sub">The most-asked questions — direct answers, no hunting.</p>
        <div className="grid-2">
          <Link className="list-card" href="#tracking">
            <div className="row">
              <span className="icon">🔍</span>
              <div>
                <div className="title">Track your order</div>
                <div className="desc">Where it is now, when it arrives.</div>
              </div>
              <span className="badge">953/yr</span>
            </div>
          </Link>
          <Link className="list-card" href="#invoice">
            <div className="row">
              <span className="icon">🧾</span>
              <div>
                <div className="title">Invoice & VAT</div>
                <div className="desc">Customs, company, plain receipt.</div>
              </div>
              <span className="badge">484/yr</span>
            </div>
          </Link>
          <Link className="list-card" href="#returns">
            <div className="row">
              <span className="icon">↩️</span>
              <div>
                <div className="title">Returns & refunds</div>
                <div className="desc">30-day window, no drama either way.</div>
              </div>
              <span className="badge">517/yr</span>
            </div>
          </Link>
          <Link className="list-card" href="#trouble">
            <div className="row">
              <span className="icon">🔧</span>
              <div>
                <div className="title">Not working? — interactive triage</div>
                <div className="desc">3–4 yes/no questions to the fix.</div>
              </div>
              <span className="badge">walker</span>
            </div>
          </Link>
        </div>

        <p className="credit">Playtronica Help · Notion-clarity preview · 2026</p>
      </div>
    </>
  );
}
