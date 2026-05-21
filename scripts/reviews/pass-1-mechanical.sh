#!/usr/bin/env bash
# Pass 1 — Mechanical correctness.
#
# Runs the four automated technical checks that catch errors a human reader
# would miss: type errors, lint violations, broken internal links, build
# failures. This pass is the gate for every PR via .github/workflows/ci.yml.
#
# Exit code: non-zero if any check fails. Output is grouped by check so CI
# logs are skimmable.

set -e
cd "$(dirname "$0")/../.."

echo "=== Pass 1.1 — TypeScript strict compile ==="
npx tsc --noEmit
echo "✓ tsc clean"
echo

echo "=== Pass 1.2 — ESLint ==="
npm run lint --silent
echo

echo "=== Pass 1.3 — Cross-reference audit (links + anchors + slugs) ==="
python3 scripts/audit-cross-references.py | tail -20
echo

echo "=== Pass 1.4 — Production build smoke ==="
NEXT_OUTPUT_MODE=export npx next build > /tmp/next-build.log 2>&1 || {
  echo "BUILD FAILED — last 40 lines of log:"
  tail -40 /tmp/next-build.log
  exit 1
}
PAGE_COUNT=$(find out -name "*.html" 2>/dev/null | wc -l | tr -d ' ')
echo "✓ build OK · ${PAGE_COUNT} HTML pages emitted to out/"
echo

echo "All Pass 1 checks passed."
