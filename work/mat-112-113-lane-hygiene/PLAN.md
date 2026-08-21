---
issue: MAT-112, MAT-113
---

# PLAN — mat-112-113-lane-hygiene

## Constraints (bind every step)

- **Fences**: never touch `CHANGELOG.md`, the `AGENTS.md` version stamp,
  `reference/`, `README.md`, `examples/`, `.claude/skills/`,
  `templates/`. No version bump, no restamp, no CHANGELOG entry. A
  template change requires asking the parent first.
- **Check contract (MAT-112)**: finding code `lane-accumulation`,
  severity MEDIUM, threshold strict `> 5`, message exactly
  `work/ holds <n> lanes — work/ is ephemeral; close finished lanes
  (work-handoff close removes the folder, history preserves it)`.
- **Ordering law**: fixtures + cases land before the check (step 1
  before step 2); evals land before skill content (step 3 before 4,
  step 5 before 6). The step order IS the law — never reorder.
- **Interplay judgment (parent-ratified)**: design-first-window lanes
  COUNT toward accumulation — the count measures accumulation, not
  validity. Documented where the check is documented.
- **Sweep criterion (MAT-113)**: MERGED, not verified — open-PR lanes
  in a decided merge order are pending, not debt; in-progress lanes
  untouched; the sweep never forces a merge.
- All artifacts in English. Any behavior/structure change updates the
  affected `docs/how-it-works/` chapter in the same change (step 7
  collects the narration; per-step falsified claims fix in-step).

## Steps

- [ ] 1. **[MAT-112] Fixture pair + self-test cases (RED).** Add
  `tests/fixtures/lanes-accum-ok/` (clean repo, `work/` holding exactly
  5 complete lanes → case `fail: false`, forbid `lane-accumulation`)
  and `tests/fixtures/lanes-accum-over/` (identical shape, 6 lanes, one
  of them a design-first-window lane: SPEC.md + marker-carrying
  PROGRESS.md, no PLAN.md → case `fail: true`, expect
  `lane-accumulation`, expectMatch `work/ holds 6 lanes`, forbid
  `lane-incomplete`), plus both cases in `tests/run-lint-tests.mjs`
  (red-until comment citing MAT-112, house style). Acceptance:
  `node tests/run-lint-tests.mjs` exits 1 failing ONLY the new over
  case with `missing expected finding "lane-accumulation"` — quote the
  RED output into PROGRESS.md. *(per-step)*
- [ ] 2. **[MAT-112] The `lane-accumulation` check.** In
  `scripts/agent-lint.mjs`'s work-lanes section, emit the constrained
  MEDIUM finding when `work/` holds more than 5 lane folders, with a
  comment recording the interplay judgment (window lanes count;
  accumulation ≠ validity) and the threshold rationale (XL children
  live in their own worktrees). Consumes step 1's fixture pair and the
  `lane-accumulation` code verbatim. Acceptance:
  `node tests/run-lint-tests.mjs` exits 0 AND
  `node scripts/agent-lint.mjs . --ignore tests,templates,examples`
  exits 0. *(per-step)*
- [ ] 3. **[MAT-113] work-plan evals (before content).** Add
  `skills/work-plan/evals/eval-07.md` (owner scenario [a]: 4 lanes in
  flight, 1 finishes+merges, session wants 2 more ⇒ sweep closes the
  merged one first, leaves the 3 in-progress untouched, then opens) and
  `eval-08.md` (owner scenario [b]: stacked wave, verified lanes with
  open PRs in a decided merge order ⇒ NOT debt, sweep opens freely;
  only a merged-but-present folder blocks). House eval shape: `## Query`
  + `## Fixture` + `## Expected behavior` checklist. Acceptance:
  `node tests/run-eval-checks.mjs` exits 0. *(per-step)*
- [ ] 4. **[MAT-113] work-plan pre-open sweep.** Add the sweep to
  `skills/work-plan/SKILL.md`: before creating `work/<slug>/`, check
  the checkout for lanes already MERGED (main/master: `branch --merged`
  / PR state) whose folder persists; refuse to open until work-handoff
  closes them ("the next ticket is not a close"), under the constraints
  block's sweep criterion. Behavior must satisfy step 3's eval-07 and
  eval-08 checklists. Acceptance: `node tests/run-eval-checks.mjs`
  exits 0 AND
  `node scripts/agent-lint.mjs . --ignore tests,templates,examples`
  exits 0. *(per-step)*
- [ ] 5. **[MAT-113] work-handoff eval (before content).** Add
  `skills/work-handoff/evals/eval-07.md`: mid-marathon session proposes
  "I'll close them all at the end of the run" ⇒ expected behavior
  refuses the batch, closes per-lane at each ticket's merge. Acceptance:
  `node tests/run-eval-checks.mjs` exits 0. *(per-step)*
- [ ] 6. **[MAT-113] work-handoff red-flag row.** Add a red-flag table
  to `skills/work-handoff/SKILL.md` carrying the row: "I'll close them
  all at the end of the run" ⇒ in a marathon the end never comes; close
  is per-lane, at each ticket's merge, never a batch sweep. Behavior
  must satisfy step 5's eval-07 checklist. Acceptance:
  `node tests/run-eval-checks.mjs` exits 0 AND
  `node scripts/agent-lint.mjs . --ignore tests,templates,examples`
  exits 0. *(per-step)*
- [ ] 7. **[docs] Narration sweep.** Update the `docs/how-it-works/`
  chapters whose claims this lane falsifies — candidates:
  `work-lifecycle.md` (lane lifecycle, ephemerality, work-plan modes,
  handoff close) and `architecture.md` (lint-battery description) — and
  record an explicit no-change judgment in the lane's DECISIONS.md for
  each candidate chapter left untouched. Acceptance:
  `node scripts/agent-lint.mjs . --ignore tests,templates,examples`
  exits 0. *(grouped)*
