# Step 11 Fix Round 1 — Re-review Report

## Finding verdicts

**1. File count in the first sweep is wrong: report says 21, actual is 22.** — ADDRESSED

The fix corrects all three occurrences:
- Line 10: `"returns 21 files"` → `"returns 22 files"`
- Lines 19–26: `"21/21 files classified"` → `"22/22 files classified"` with explicit per-bucket arithmetic (4+2+3+13 = 22)
- Line 62: Verdict section updated from `"across 21 files"` → `"across 22 files"`

Verified independently: `grep -rln 'global/' --exclude-dir=.git . | wc -l` returns 22 files. The fix correctly reflects actual output.

**2. Two lines never appear in the second (bare-`global`) grep's classification despite the claim to have read every remaining line.** — ADDRESSED

Both lines are now explicitly named and classified:

(a) `scripts/agent-lint.mjs:354` (the `SHIPPED_SURFACE` regex line):
- Added at lines 34–41 with explicit correction note.
- Correctly classified as bucket 3 (same file, same fact as already-classified `:326` comment).
- Explanation provided: "global" sits between `|` characters, never followed by literal `/`, so correctly falls in the second grep, not the first.

(b) `skills/ae-audit/references/checklist.md:41` (the "Global exception" line):
- Added at lines 47–52 with explicit correction note.
- Correctly placed alongside `reference/context.md` in class 2 (content-detected canon doctrine).
- Clearly distinguished from the unclassified `skills/ae-audit/evals/eval-03.md` mentioned in the same context.

## New breakage in the fix diff

None. The diff modifies PROGRESS.md only with precise corrections, re-runs all four gates (all pass, exit 0), and includes appropriate record-honesty notes. No repo surface touched.

## Out-of-scope observations

None.

## Verdict

**Fix round:** All findings addressed, no new Critical/Important breakage.

The fix correctly resolves both arithmetic and enumeration issues. The per-bucket arithmetic (4+2+3+13 = 22) makes the count independently verifiable without re-deriving it. The explicit placement of the two previously-omitted lines with reasoning preserves accuracy of the evidence record. The record-honesty note acknowledging the original commit message's disagreement prevents a later reader from seeing the mismatch as unexplained error.
