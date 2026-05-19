import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import fs from "node:fs";
import path from "node:path";

const ROOT = "./content/en";
const pages = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const fp = path.join(d, e.name);
    if (e.isDirectory()) walk(fp);
    else if (e.name.endsWith(".md")) {
      const raw = fs.readFileSync(fp, "utf8");
      const { data, content } = matter(raw);
      const html = remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).processSync(content).toString();
      pages.push({ ...data, html });
    }
  }
}
walk(ROOT);

const sectionTitles = {
  "getting-started": ["🚀", "Getting Started"],
  "orders": ["📦", "Orders & Support"],
  "devices": ["🎛️", "Your Device"],
  "software": ["🎵", "Sound & Software"],
  "troubleshooting": ["🔧", "Not Working?"],
};
const order = ["getting-started","devices","software","troubleshooting","orders","professionals","sound"];
pages.sort((a,b) => (order.indexOf(a.section) - order.indexOf(b.section)) || ((a.order||99) - (b.order||99)));
const grouped = {};
for (const p of pages) (grouped[p.section] ||= []).push(p);

const css = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f7f8fb;color:#1a1a2e;font-size:15px;line-height:1.6}
a{color:#5c6bc0;text-decoration:none}a:hover{text-decoration:underline}
header{position:sticky;top:0;background:#fff;border-bottom:1px solid #e8eaf6;padding:14px 24px;display:flex;align-items:center;gap:16px;z-index:20}
.logo{font-weight:800;letter-spacing:-.3px;display:flex;align-items:center;gap:8px}
.logo-icon{width:28px;height:28px;background:linear-gradient(135deg,#5c6bc0,#3949ab);color:#fff;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:14px}
.search{flex:1;max-width:480px;background:#f7f8fb;border:1.5px solid #e8eaf6;border-radius:10px;padding:9px 14px;font-size:14px;outline:none}
.cta{background:#5c6bc0;color:#fff;border:none;border-radius:8px;padding:8px 16px;font-size:13px;font-weight:600;cursor:pointer}
.shell{display:flex;max-width:1100px;margin:0 auto;gap:24px;padding:20px}
.sidebar{width:240px;flex-shrink:0;border-right:1px solid #e8eaf6;padding-right:16px}
.sb-section{margin-bottom:20px}
.sb-section-head{font-size:10px;font-weight:700;color:#999;letter-spacing:.9px;text-transform:uppercase;margin-bottom:6px}
.sb-link{display:block;padding:7px 10px;font-size:13.5px;color:#555;border-radius:6px;cursor:pointer;border-left:2px solid transparent}
.sb-link:hover{background:#eef0fa;color:#1a1a2e}
.sb-link.active{background:rgba(92,107,192,.12);color:#1a1a2e;border-left-color:#5c6bc0;font-weight:600}
.main{flex:1;min-width:0}
.hero{background:linear-gradient(135deg,#5c6bc0 0%,#3949ab 100%);border-radius:16px;padding:32px 36px;color:#fff;margin-bottom:24px}
.hero h1{font-size:24px;font-weight:800;margin-bottom:8px}
.hero p{opacity:.92;max-width:540px}
.quick-links{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}
.quick-link{background:rgba(255,255,255,.15);padding:6px 14px;border-radius:999px;font-size:13.5px;font-weight:500;color:#fff;cursor:pointer}
.quick-link:hover{background:rgba(255,255,255,.25);text-decoration:none}
.card-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:14px}
.card{background:#fff;border:1px solid #e8eaf6;border-radius:10px;padding:16px;cursor:pointer;transition:.15s}
.card:hover{border-color:#5c6bc0;box-shadow:0 2px 6px rgba(0,0,0,.04)}
.card-emoji{font-size:22px;margin-bottom:4px}
.card-title{font-weight:600;font-size:14.5px;margin-top:2px}
.card-desc{font-size:13px;color:#999;margin-top:2px}
.section-h{font-size:18px;font-weight:700;margin:24px 0 10px}
.section-sub{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.7px;color:#777;margin:18px 0 6px}
.browse-list{display:grid;grid-template-columns:repeat(2,1fr);gap:2px}
.browse-list a{padding:6px 10px;border-radius:6px;color:#555;font-size:14px}
.browse-list a:hover{background:#eef0fa;color:#1a1a2e}
.article{max-width:680px}
.article .breadcrumb{font-size:12px;color:#999;margin-bottom:12px}
.article h1{font-size:24px;font-weight:800;margin-bottom:10px}
.article .summary{color:#666;margin-bottom:22px;max-width:60ch}
.prose h2{font-size:18px;font-weight:700;margin:22px 0 8px;padding-top:6px}
.prose h3{font-size:15.5px;font-weight:700;margin:16px 0 6px}
.prose p{margin-bottom:12px}
.prose ul,.prose ol{margin:0 0 14px 20px}
.prose li{margin-bottom:4px}
.prose blockquote{border-left:3px solid #e8eaf6;padding:8px 14px;color:#555;margin:14px 0;background:#fff;border-radius:0 6px 6px 0}
.prose code{background:#eef0fa;padding:2px 6px;border-radius:4px;font-size:.9em}
.prose hr{border:0;border-top:1px solid #e8eaf6;margin:24px 0}
.feedback{margin-top:36px;border:1px solid #e8eaf6;background:#fff;border-radius:8px;padding:14px 16px;font-size:14px}
.feedback-btn{margin-left:8px;border:1px solid #e8eaf6;background:#fff;padding:4px 12px;border-radius:6px;cursor:pointer;font-size:13px}
.feedback-btn.primary{background:#5c6bc0;color:#fff;border-color:#5c6bc0}
.banner{background:#fffbea;border:1px solid #f5e9b3;border-radius:8px;padding:12px 14px;margin-bottom:20px;font-size:13.5px;color:#665a17}
@media(max-width:780px){.shell{flex-direction:column;padding:12px}.sidebar{display:none}.card-grid,.browse-list{grid-template-columns:1fr}.hero{padding:22px 20px}}
`;

const navHtml = order.filter(s => grouped[s]).map(s => {
  const [emoji, title] = sectionTitles[s] || ["📁", s];
  return `<div class="sb-section"><div class="sb-section-head">${emoji} ${title}</div>` +
    grouped[s].map(p => `<a class="sb-link" data-slug="${s}/${p.slug}">${p.emoji || ""} ${p.title}</a>`).join("") +
    `</div>`;
}).join("");

const homeHtml = `
  <div class="banner">⚠️ Это preview из 6 P0-страниц. Запусти <code>npm run dev</code> чтобы увидеть полную dev-версию с поиском Pagefind и feedback-виджетом.</div>
  <section class="hero">
    <h1>How can we help? 🎵</h1>
    <p>Everything you need to make music from anything — plants, water, your hands, that bowl of fruit on the counter.</p>
    <div class="quick-links">
      <a class="quick-link" data-slug="orders/track-your-order">Track my order</a>
      <a class="quick-link" data-slug="orders/returns-refunds">Returns</a>
      <a class="quick-link" data-slug="orders/invoice-vat">Invoice & VAT</a>
      <a class="quick-link" data-slug="getting-started/got-it-as-a-gift">Got it as a gift?</a>
    </div>
  </section>
  <h2 class="section-h">New here?</h2>
  <div class="card-grid">
    <div class="card" data-slug="getting-started/what-is-playtronica"><div class="card-emoji">⭐</div><div class="card-title">What is Playtronica?</div><div class="card-desc">A 60-second overview.</div></div>
    <div class="card" data-slug="orders/track-your-order"><div class="card-emoji">🔍</div><div class="card-title">Track your order</div><div class="card-desc">Where it is right now.</div></div>
    <div class="card" data-slug="getting-started/got-it-as-a-gift"><div class="card-emoji">🎁</div><div class="card-title">Got it as a gift?</div><div class="card-desc">Start here.</div></div>
  </div>
  <h2 class="section-h">Browse by section</h2>
  ${order.filter(s => grouped[s]).map(s => {
    const [emoji, title] = sectionTitles[s] || ["📁", s];
    return `<div class="section-sub">${emoji} ${title}</div><div class="browse-list">${grouped[s].map(p => `<a data-slug="${s}/${p.slug}">${p.emoji || ""} ${p.title}</a>`).join("")}</div>`;
  }).join("")}
`;

const articlesHtml = pages.map(p => `
  <article class="article" id="page-${p.section}/${p.slug}" style="display:none">
    <div class="breadcrumb">Home / ${sectionTitles[p.section]?.[1] || p.section} / ${p.title}</div>
    <h1>${p.emoji ? p.emoji + " " : ""}${p.title}</h1>
    ${p.summary ? `<p class="summary">${p.summary}</p>` : ""}
    <div class="prose">${p.html}</div>
    <div class="feedback">Did this answer your question? <button class="feedback-btn primary">Yes</button><button class="feedback-btn">No</button></div>
  </article>
`).join("");

const html = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Playtronica Help — Preview</title>
<style>${css}</style>
</head><body>
<header>
  <div class="logo"><span class="logo-icon">🎵</span> Playtronica Help</div>
  <input class="search" placeholder="Try: track my order, connect to Ableton, corrosion…" oninput="doSearch(this.value)">
  <button class="cta">Contact us</button>
</header>
<div class="shell">
  <aside class="sidebar">${navHtml}</aside>
  <main class="main">
    <div id="home">${homeHtml}</div>
    ${articlesHtml}
  </main>
</div>
<script>
function show(slug){
  document.getElementById('home').style.display = slug ? 'none' : '';
  document.querySelectorAll('.article').forEach(a => a.style.display='none');
  if (slug) {
    const el = document.getElementById('page-'+slug);
    if (el) el.style.display='block';
  }
  document.querySelectorAll('.sb-link').forEach(l => l.classList.toggle('active', l.dataset.slug===slug));
  window.scrollTo({top:0});
  if (slug) history.replaceState(null, '', '#/'+slug);
  else history.replaceState(null, '', '#');
}
document.body.addEventListener('click', e => {
  const t = e.target.closest('[data-slug]');
  if (t) { e.preventDefault(); show(t.dataset.slug); }
  else if (e.target.closest('.logo, header')) { show(''); }
});
const hash = location.hash.replace(/^#\\//, '');
if (hash) show(hash);
function doSearch(q){
  if (!q || q.length<2) return;
  q = q.toLowerCase();
  const links = [...document.querySelectorAll('.sb-link')];
  for (const l of links) {
    if (l.textContent.toLowerCase().includes(q)) { show(l.dataset.slug); return; }
  }
}
</script>
</body></html>`;

fs.writeFileSync("../preview.html", html);
console.log("Wrote help-center/preview.html (" + html.length + " bytes)");
