#!/usr/bin/env bash
# Run all four review passes and write each output to _reviews/<date>/.
# This is the single command used in CI and in the monthly refresh process.
#
# Exit code: non-zero if any pass exits non-zero. Continues running even if
# an earlier pass fails, so the operator sees the full picture in one run.

set +e
cd "$(dirname "$0")/../.."

DATE="$(date +%Y-%m-%d)"
OUT="_reviews/${DATE}"
mkdir -p "$OUT"

echo "================================================================"
echo "  PLAYTRONICA HELP CENTER  —  4-pass review"
echo "  $(date)"
echo "================================================================"

bash scripts/reviews/pass-1-mechanical.sh > "$OUT/pass-1.log" 2>&1
P1=$?
echo
if [ $P1 -eq 0 ]; then
  echo "PASS 1 (mechanical):           ✓  no issues"
else
  echo "PASS 1 (mechanical):           ✗  see $OUT/pass-1.log"
fi

node scripts/reviews/pass-2-user-journeys.mjs > "$OUT/pass-2.log" 2>&1
P2=$?
if [ $P2 -eq 0 ]; then
  echo "PASS 2 (user journeys):        ✓"
else
  echo "PASS 2 (user journeys):        ✗  see $OUT/pass-2.log"
fi

python3 scripts/reviews/pass-3-ecommerce-friction.py > "$OUT/pass-3.log" 2>&1
P3=$?
if [ $P3 -eq 0 ]; then
  echo "PASS 3 (ecommerce friction):   ✓"
else
  echo "PASS 3 (ecommerce friction):   ✗  see $OUT/pass-3.log"
fi

python3 scripts/reviews/pass-4-trust-signals.py > "$OUT/pass-4.log" 2>&1
P4=$?
if [ $P4 -eq 0 ]; then
  echo "PASS 4 (trust signals):        ✓"
else
  echo "PASS 4 (trust signals):        ✗  see $OUT/pass-4.log"
fi

echo
echo "Logs written to: $OUT/"

FAIL=$((P1 + P2 + P3 + P4))
[ $FAIL -eq 0 ] && echo "All 4 passes clean." || echo "$FAIL pass(es) need attention."
exit $FAIL
