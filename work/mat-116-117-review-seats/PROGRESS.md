# Progress — MAT-116 + MAT-117 (reviewer seats + review granularity)

Lane: `work/mat-116-117-review-seats/` · Tier L · branch
`bygama/mat-116-117-review-seats` · dispatched by the parent
orchestrator 2026-08-21.

## Lane setup

- **2026-08-21 — read both tickets** (`orca linear issue MAT-116 --full
  --json`, same for MAT-117). Both carry owner rulings and field
  evidence; the parent's dispatch brief is the binding ask.
- **2026-08-21 — re-probed the opencode CLI on this machine** before
  writing anything into `reference/runners.md`, because that file makes
  verify-on-install a hard rule. Results in SPEC.md § "Machine evidence
  this lane re-verified": CLI 1.18.18; `opencode run --auto -m
  opencode/x-preview-f-free` and `... -m
  opencode/muse-spark-1.2-contributor-free` both returned the exact
  requested output; `opencode run --help` lists `--auto`;
  `opencode models` has no `opencode/deepseek-v4-flash-free`.
- **2026-08-21 — work-plan design-first**: SPEC.md written, parent's
  SPEC gate asked and answered (ruling quoted in DECISIONS.md), then
  PLAN.md shaped. 10 steps, review classes on every step.

## Step reports

<!-- work-run appends one report per step below. -->
