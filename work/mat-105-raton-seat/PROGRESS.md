# Progress — mat-105-raton-seat

Lane: second cross-family reviewer seat (ratón chispeante) in
`reference/runners.md`. SPEC approved by the parent 2026-08-19
(ruling in DECISIONS.md). Executing via work-run, one implementer per
PLAN step.

## Done

### Step 1 — falsehood check (judgment) — DONE

Read `skills/orchestrate/SKILL.md` (step 3's dispatch dialogue and step
6's whole review wave), `skills/orchestrate/evals/eval-03.md`, and
`docs/how-it-works/execution.md`'s review-wave narration (stages 4-8,
plus the "Runners" section) against the planned `reference/runners.md`
change. Verdict: **no-change on all three** — recorded per file, with
the specific lines and the reason each survives, in DECISIONS.md
("Step 1: falsehood check re-verified at execution"). No eval revision
is required, so step 2 is free to touch content.

Two findings worth carrying forward, neither a falsehood:

- SKILL.md's stall-clock and single-shot paragraphs (and execution.md's
  matching stage-6 prose) are scoped to "a ballena reviewer". They hold
  for any opencode TUI seat, so after this lane they are narrower than
  the evidence — under-generality, not a false claim. Generalizing them
  is outside this lane's owned files; noted for a later lane.
- Also checked beyond the named three: `evals/eval-01.md`'s dialogue
  line ("offers **default 1 ballena**") stays true because the ballena
  keeps the default, and `docs/how-it-works/work-lifecycle.md`'s only
  mention is a pointer at `reference/runners.md`, "The adversarial
  seat", restating no pairing of its own.

Acceptance: `grep -c 'no-change' work/mat-105-raton-seat/DECISIONS.md`
→ `5` (≥ 1) · `node tests/run-eval-checks.mjs` → `all eval checks
passed`, exit 0. Extra: `node scripts/agent-lint.mjs . --ignore
tests,templates,global,examples` → `0 high, 0 medium, 0 low — PASS`,
exit 0.

Files changed: `work/mat-105-raton-seat/DECISIONS.md` (judgment
recorded), `work/mat-105-raton-seat/PLAN.md` (step 1 ticked), this
file. No repo content touched — correct for a no-change verdict.

Concerns: none.

## Tried and failed

## Verification
