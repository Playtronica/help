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
      pages.push({ file: fp, title: data.title, section: data.section, slug: data.slug, htmlLen: html.length });
    }
  }
}
walk(ROOT);
console.log(`Loaded ${pages.length} pages`);
for (const p of pages) console.log(`  ${p.section}/${p.slug.padEnd(30)} '${p.title}' (${p.htmlLen}b html)`);
