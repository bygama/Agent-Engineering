---
issue: MAT-112, MAT-113
---

# PROGRESS — mat-112-113-lane-hygiene

## Done

- Lane opened; SPEC.md written from the parent orchestrator's dispatch
  brief + both Linear tickets (design-first mode).
- SPEC approved by the parent (ask msg_ed930a16487b, ruling in
  DECISIONS.md); PLAN.md shaped, approval-window marker removed the
  same turn.

- **Step 1 [MAT-112] Fixture pair + self-test cases (RED) — DONE.**
  Added `tests/fixtures/lanes-accum-ok/` (clean `AGENTS.md` +
  `@AGENTS.md` `CLAUDE.md`, `work/` holding exactly 5 complete lanes —
  `lane-alpha`..`lane-echo`, each with `PLAN.md` + `PROGRESS.md`) and
  `tests/fixtures/lanes-accum-over/` (identical shape plus a 6th lane,
  `work/lane-window/`, sitting in the design-first approval window:
  `SPEC.md` + a `PROGRESS.md` whose `## In progress` carries the marker
  line verbatim, no `PLAN.md` — mirrors `tests/fixtures/lane-window-ok/`).
  Added both cases to `tests/run-lint-tests.mjs`, red-until comments
  citing MAT-112, mirroring the `entry-skill-ok`/`entry-skill-bloat`
  boundary-pair style: the ok case (`fail: false`, `expect: []`, forbid
  `lane-accumulation`) and the over case (`fail: true`, expect
  `lane-accumulation`, expectMatch `work/ holds 6 lanes`, forbid
  `lane-incomplete`).

  Sanity-checked both fixtures directly against the unmodified lint
  first (`node scripts/agent-lint.mjs tests/fixtures/lanes-accum-ok
  --json` / `...-over --json`) — both come back `"findings": [],
  "fail": false`, confirming the over fixture is lint-clean today (no
  check exists yet to fire on it) and that the window lane does not
  spuriously trip `lane-incomplete`.

  Acceptance command and RED output (`node tests/run-lint-tests.mjs`,
  exit 1, only the new over case fails):

  ```
  ok   exactly 5 lanes in work/ passes
  FAIL 6 lanes in work/ fails (one is a design-first-window lane)
    expected fail=true, got false
    missing expected finding "lane-accumulation"
    no finding message matched expected "work/ holds 6 lanes"
    findings: (none)
  ok   invalid feature list fails
  ...
  1/27 cases failed
  EXIT CODE: 1
  ```

  All 26 other cases still pass (`ok`), including the ok fixture's case
  and every pre-existing lane/window case — the RED is isolated to the
  single new over case, and its failure includes `missing expected
  finding "lane-accumulation"` as required. Also ran
  `node scripts/agent-lint.mjs . --ignore tests,templates,examples`
  (exit 0, `0 high, 0 medium, 0 low — PASS`) to confirm the new fixtures
  under `tests/fixtures/` don't affect the repo's own self-lint (the
  `tests` ignore covers them).

  Files changed: `tests/fixtures/lanes-accum-ok/{AGENTS.md,CLAUDE.md,
  work/lane-{alpha,bravo,charlie,delta,echo}/{PLAN.md,PROGRESS.md}}`,
  `tests/fixtures/lanes-accum-over/{AGENTS.md,CLAUDE.md,
  work/lane-{alpha,bravo,charlie,delta,echo}/{PLAN.md,PROGRESS.md},
  work/lane-window/{SPEC.md,PROGRESS.md}}`, `tests/run-lint-tests.mjs`.

  Concerns: none — `scripts/agent-lint.mjs` was not touched, per the
  step's fence; step 2 lands the check itself.

## In progress

- PLAN steps 2-7 pending — work-run dispatch continues at step 2.

## Next

- work-run the plan step by step, then work-verify, then work-handoff +
  PR.
