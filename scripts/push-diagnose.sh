#!/usr/bin/env bash
# Push diagnostic + recovery.
# Use when a normal `git push` is not working and you want one script that
# walks the symptoms, fixes whatever's fixable, and shows the actual state.
#
# Run from anywhere:
#   bash "/Users/andreymanirko/Documents/Claude/Projects/AM PLTRNC/help-center/06-build/scripts/push-diagnose.sh"

set -u

REPO="/Users/andreymanirko/Documents/Claude/Projects/AM PLTRNC/help-center/06-build"

if [ ! -d "$REPO" ]; then
  echo "✗ Repo folder not found at $REPO"
  exit 1
fi

cd "$REPO" || exit 1
echo "→ Repo: $REPO"

# 1 — Is it actually a git repo?
if [ ! -d .git ]; then
  echo "✗ Not a git repo (.git missing). Re-clone from github.com/Playtronica/help."
  exit 1
fi
echo "✓ .git/ present"

# 2 — Clear any stale lock
if [ -f .git/index.lock ]; then
  echo "⚠ Stale .git/index.lock — removing"
  rm -f .git/index.lock
fi

# 3 — Show current state
echo ""
echo "── Branch / remote ──"
git status -sb 2>&1 | head -5
echo ""
git remote -v 2>&1
echo ""

# 4 — Show what's staged / unstaged
echo "── Pending changes ──"
TRACKED=$(git status --porcelain 2>&1 | head -50)
TRACKED_COUNT=$(printf '%s\n' "$TRACKED" | grep -c -v '^$')
if [ "$TRACKED_COUNT" -eq 0 ]; then
  echo "✓ Working tree clean — nothing to commit."
  echo ""
  echo "── Local vs origin/main ──"
  git fetch origin main 2>&1 | tail -3
  AHEAD=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo "?")
  BEHIND=$(git rev-list --count HEAD..origin/main 2>/dev/null || echo "?")
  echo "Ahead of origin/main: $AHEAD commit(s)"
  echo "Behind origin/main:   $BEHIND commit(s)"
  if [ "$AHEAD" = "0" ] && [ "$BEHIND" = "0" ]; then
    echo "✓ Already up to date with origin/main. Nothing to push."
    exit 0
  fi
  if [ "$AHEAD" != "0" ] && [ "$AHEAD" != "?" ]; then
    echo "→ You have $AHEAD un-pushed commit(s). Trying push…"
  fi
else
  echo "$TRACKED_COUNT files changed."
  printf '%s\n' "$TRACKED" | head -25
  if [ "$TRACKED_COUNT" -gt 25 ]; then
    echo "  … and $((TRACKED_COUNT - 25)) more."
  fi
  echo ""
  echo "→ Staging everything and committing…"
  git add -A
  TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  git commit -m "Snapshot ${TIMESTAMP} — bulk push from diagnostic script"
  echo ""
fi

# 5 — Try push, show verbose
echo "── Pushing to origin/main ──"
PUSH_OUTPUT=$(git push origin main 2>&1)
PUSH_STATUS=$?
echo "$PUSH_OUTPUT"
echo ""

if [ $PUSH_STATUS -eq 0 ]; then
  echo "✓ Push succeeded."
  echo ""
  echo "── Latest commit ──"
  git log -1 --oneline 2>&1
  echo ""
  echo "→ Cloudflare Pages should redeploy in ~1.5 min."
  echo "→ Check: https://help-d9v.pages.dev/ (and education.playtronica.com once configured)"
  exit 0
fi

# 6 — Push failed. Diagnose.
echo "✗ Push failed (exit $PUSH_STATUS)."
echo ""

# Auth?
if echo "$PUSH_OUTPUT" | grep -qi "auth\|password\|token\|denied\|403"; then
  echo "🔐 LIKELY CAUSE — Authentication."
  echo ""
  echo "GitHub no longer accepts passwords. You need a Personal Access Token (classic)"
  echo "with 'repo' + 'workflow' scopes."
  echo ""
  echo "Fix:"
  echo "  1. Open https://github.com/settings/tokens/new"
  echo "  2. Generate new token (classic), scopes: repo + workflow"
  echo "  3. Cache it in macOS keychain:"
  echo "     git config --global credential.helper osxkeychain"
  echo "  4. Re-run this script. When prompted for password, paste the token."
  exit 1
fi

# Conflicts?
if echo "$PUSH_OUTPUT" | grep -qi "rejected\|non-fast-forward\|behind"; then
  echo "🔀 LIKELY CAUSE — Branch is behind origin/main."
  echo ""
  echo "Someone else pushed to main since your last fetch. Pull first."
  echo ""
  echo "Fix:"
  echo "  git pull --rebase origin main"
  echo "  bash scripts/push-diagnose.sh   # then re-run this"
  exit 1
fi

# Network?
if echo "$PUSH_OUTPUT" | grep -qi "could not resolve\|timed out\|network\|ssl\|tls"; then
  echo "🌐 LIKELY CAUSE — Network or SSL."
  echo ""
  echo "Check:"
  echo "  ping -c 2 github.com"
  echo "  curl -I https://github.com"
  echo ""
  echo "If both fail — VPN / firewall blocking. Try off VPN."
  exit 1
fi

# Unknown — dump raw
echo "❓ Unrecognised error. Raw output above."
echo "Copy the output and share — I'll diagnose specifically."
exit 1
