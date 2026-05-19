import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { getPage } from "@/lib/content";
import { TroubleshootingWalker } from "@/components/TroubleshootingWalker";
import { FeedbackWidget } from "@/components/FeedbackWidget";

export const metadata = {
  title: "Troubleshooting hub — Playtronica Help",
  description: "Interactive checklist that walks you through fixing your device.",
};

function loadTree() {
  const fp = path.join(process.cwd(), "content", "_data", "troubleshooting-tree.json");
  return JSON.parse(fs.readFileSync(fp, "utf8"));
}

export default function TroubleshootingHubPage() {
  const page = getPage("troubleshooting", "hub");
  const tree = loadTree();
  return (
    <article data-pagefind-body>
      <nav className="mb-3 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-soft">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span className="mx-1.5 text-rule-soft">/</span>
        <Link href="/troubleshooting/" className="hover:text-accent">Not Working?</Link>
        <span className="mx-1.5 text-rule-soft">/</span>
        <span className="text-ink">Troubleshooting hub</span>
      </nav>
      <h1
        className="font-mono text-[clamp(24px,4vw,32px)] font-bold leading-tight tracking-tight"
        data-pagefind-meta="title"
      >
        🔧 Troubleshooting hub
      </h1>
      <p className="mt-3 max-w-[60ch] text-[17px] leading-relaxed text-ink-soft">
        Pick what's happening below. The checklist walks you through the same triage we do over email — usually 3–4 questions to the fix.
      </p>

      <TroubleshootingWalker tree={tree} />

      {page && (
        <div className="prose-pl mt-8" dangerouslySetInnerHTML={{ __html: page.html }} />
      )}

      <FeedbackWidget slug="troubleshooting/hub" />

      <div className="mt-8 flex flex-wrap justify-between gap-2 border-t-[1.5px] border-rule pt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
        <span>∿ Not Working / Troubleshooting hub</span>
        <span>updated 2026-05</span>
      </div>
    </article>
  );
}
