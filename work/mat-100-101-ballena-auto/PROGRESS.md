# Progress — mat-100-101-ballena-auto

Lane: MAT-100 + MAT-101 (declared family, one PR closes both).

## Done

- 2026-08-19 — Lane opened. Tickets read (`orca linear issue MAT-100`,
  `MAT-101`). SPEC.md written design-first from the parent's dispatch
  design; parent approved as written (ruling in DECISIONS.md). PLAN.md
  shaped: 5 steps, evals-before-content as step 1.
- 2026-08-19 — Step 1 DONE (evals first, orchestrate).
  `skills/orchestrate/evals/eval-03.md` gained three assertions before
  any SKILL.md content edit: (a) the ballena two-step launch carries
  `--auto` on both invocation forms — the Go default `opencode -m
  opencode-go/deepseek-v4-flash --auto` and the no-auth fallback
  `opencode -m opencode/deepseek-v4-flash-free --auto` — with the
  read-only-seat rationale (safe here only because the filled
  `reviewer.md` forbids commit/push/merge and any file edit; a WRITING
  seat would be a different decision, said explicitly); (b) the
  review-seat stall clock — observed normal 20-45 min, 75+ min with an
  empty orchestration transcript and `latestCursor: 0` is a stall,
  never a slow review — recovery `worker-stop` → remove the review
  worktree → `task-update --status ready` → fresh seat; (c) the
  existing fallback-shell-close assertion now names the actual closing
  command in place (`orca terminal close --terminal <handle>`) instead
  of only citing `reference/orca.md`, per DECISIONS' second ruling. No
  SKILL.md, reference/, or docs/ file touched — eval file only, per
  step scope. Acceptance: `node tests/run-eval-checks.mjs` → exit 0,
  `ok   orchestrate: 5 evals well-formed`; `grep -c -e '--auto'
  skills/orchestrate/evals/eval-03.md` → 3 (≥ 1 required). Also ran
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → 0 high, 0 medium, 0 low, PASS (sanity check, not this step's gate).

## In progress

- Step 2 (MAT-100 in `reference/runners.md`) not started.
