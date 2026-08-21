# Step 12 review — `skills/ae-audit/evals/eval-03.md`

## Spec compliance

✅ Compliant — the step honors the parent's fence-lift ruling to the letter: exactly one file, exactly two lines, both now correct, gates green.

## Strengths

- **Scope discipline verified at the commit level, not just the diff.** `git show --stat -1 3e35543` (read-only) confirms `1 file changed, 2 insertions(+), 2 deletions(-)` — `skills/ae-audit/evals/eval-03.md` only. Worktree is clean (`git status --porcelain` empty). Nothing else under `skills/` moved, `skills/ae-audit/SKILL.md` untouched, house rule "evals change before content" trivially satisfied.
- **Line 14 is byte-identical to `AGENTS.md:14`.** Both read `node scripts/agent-lint.mjs . --ignore tests,templates,examples`, including the `.` before `--ignore`. The eval's own claim ("exactly as documented in AGENTS.md") is now true.
- **Line 20's `global` removal is correct and matches the ruling's stated cause.** `global/` is gone from the repo root (verified via `ls`), and the parent's ruling explicitly scoped the fix to repairing the falsehood *this lane* introduced.
- **Eval structure intact.** `## Query`, `## Expected behavior`, and all checklist lines are unchanged apart from the two ruled edits (confirmed from the diff hunk context).
- **Acceptance command re-run independently, exit 0**, matching PROGRESS.md's recorded evidence:
  ```
  ok   (14 skills/eval batches) all eval checks passed
  agent-lint ... 0 high, 0 medium, 0 low — PASS
  EXIT=0
  ```

## Issues

### Critical (Must Fix)

None.

### Important (Should Fix)

- **`skills/ae-audit/evals/eval-03.md:20` — the enumeration is still incomplete, and the implementer's "Concerns: none" missed it.** `docs/how-it-works/architecture.md` carries dedicated chapters `### \`loops/\`` (line 144) and `### \`examples/\`` (line 152) — both are real top-level directories (`ls` confirms `loops/` and `examples/` exist at repo root) with current sections under `docs/how-it-works/`. Neither appears in the eval's enumeration, which now reads `(reference, templates, skills, scripts, tests, docs)`. This is **pre-existing** — the pre-lane string `(reference, templates, skills, scripts, global, tests, docs)` never listed `loops` or `examples` either — so it is not damage this lane caused, and per the ruling's strict two-line, this-file-only scope, fixing it here would have exceeded what was authorized (the ruling addressed only the `global` falsehood this lane introduced, plus the one-word `AGENTS.md:14` restoration). **Correctly left unedited.** But the lane has an established practice of surfacing exactly this kind of out-of-scope finding for follow-up — step 3 flagged step 4's acceptance defect ahead of time, the workstation `claude/README.md` drift was reported in DECISIONS.md for the parent to fold into wave close, and the `using-ae/evals/eval-03.md` staleness became MAT-114. PROGRESS.md's step 12 entry (`work/mat-111-deglobal/PROGRESS.md:1489`) instead states "Concerns: none," which is not accurate — the implementer had the enumeration and `architecture.md`'s section list in hand while doing this exact line and did not notice or record the gap. Recommend a short DECISIONS.md addendum (or a follow-up ticket in the MAT-114 style) noting the enumeration's `loops`/`examples` omission as accepted debt before the lane closes, so it isn't silently lost.

### Minor (Nice to Have)

None.

## Assessment

**Step quality:** Approved
**Reasoning:** The two ruled lines are both correct (line 14 byte-identical to `AGENTS.md:14`, line 20's `global` removal matches the ruling's cause), scope was honored exactly (one file, two lines, confirmed at the commit level), and all gates pass on an independent re-run. The one Important finding is a reporting gap (an unreported pre-existing enumeration incompleteness), not a violation of the ruling or a broken gate — it belongs in DECISIONS.md as accepted debt, not in a rework of this step.
