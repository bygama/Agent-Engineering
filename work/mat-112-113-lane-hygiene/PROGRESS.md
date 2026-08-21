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

- **Step 1 review — Approved (engine: sigiloso, command mode,
  `opencode/x-preview-f-free`, first-choice seat, liveness-probed).**
  Verdict verbatim: "### Spec compliance / ✅ Compliant — every
  requirement of Step 1 is present and verified […] ### Assessment /
  **Step quality:** Approved / **Reasoning:** All acceptance criteria
  verified against a live read-only run — the suite exits 1 failing
  only the new over case with the required `missing expected finding
  \"lane-accumulation\"` string — and the fixtures are built to stay
  correct once step 2 lands the check (marker shape exact, count
  wording matches SPEC). No defects found at any severity in the
  implemented scope." Reviewer independently re-ran the suite
  (exit 1, 1/27, over case only) plus gen/eval gates (both exit 0).
  Minor notes (no fix loop): (a) the DECISIONS.md reviewer-mode entry
  riding in the step-1 diff is controller-authored (work-run step 1,
  settle-the-mode) — confirmed, nothing to do; (b) `expect: []`
  explicit vs omitted is house-acceptable either way. Seat note: the
  sigiloso seat initially failed with opencode's known postinstall
  gotcha (`reference/runners.md` install note); repaired by running
  `node_modules/opencode-ai/postinstall.mjs` once by hand, then probed
  ALIVE before this review.

- **Step 2 [MAT-112] The `lane-accumulation` check — DONE.** Added the
  check to `scripts/agent-lint.mjs`'s work-lanes section, right after the
  per-lane loop that builds the `lanes` Map (so it reuses `lanes.size`,
  which already counts folders mechanically — one entry per distinct
  `work/<slug>/` regardless of contents — verbatim from step 1's fixture
  design). Fires `medium` `lane-accumulation` anchored to the file field
  `work/` when `lanes.size > 5` (strict), with the exact message from the
  PLAN's constraints block, `<n>` interpolated from the live count. The
  comment above the check records both required judgments: the interplay
  judgment (a design-first-window lane still counts toward the total —
  the check measures accumulation, never validity, citing SPEC and
  MAT-112) and the threshold rationale (XL lanes' children live in their
  own worktrees, so 5 concurrent lanes in one checkout is already
  generous; MEDIUM severity, a nudge to close) — mirroring the tone of
  the `DESIGN_WINDOW_MARKER` and `machine-path` comment blocks nearby.

  Acceptance commands, both exit 0:

  ```
  $ node tests/run-lint-tests.mjs
  ...
  ok   exactly 5 lanes in work/ passes
  ok   6 lanes in work/ fails (one is a design-first-window lane)
  ...
  all 27 cases passed
  EXIT: 0

  $ node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-112-113-lane-hygiene
  0 high, 0 medium, 0 low — PASS
  EXIT: 0
  ```

  Also re-ran `node tests/run-gen-tests.mjs` and
  `node tests/run-eval-checks.mjs` as a sanity check (not required by
  this step's acceptance) — both still exit 0, unaffected.

  Files changed: `scripts/agent-lint.mjs` (the check + its comment
  block, 9 added lines). No fixtures or test cases touched — step 1
  landed those verbatim and the suite went green without further edits.

  Concerns: none.

## In progress

- PLAN steps 3-7 pending — work-run dispatch continues at step 3.

## Next

- work-run the plan step by step, then work-verify, then work-handoff +
  PR.
