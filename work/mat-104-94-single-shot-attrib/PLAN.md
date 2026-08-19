# Single-shot worker_done + upstream attribution stance — plan

## Constraints (apply to every step)

- STACKED LANE: branch `bygama/mat-104-94-single-shot-attrib` cut from
  `bygama/mat-100-101-ballena-auto` (open PR #77); the PR opens with
  base `bygama/mat-100-101-ballena-auto`, NOT main.
- Never touch: `CHANGELOG.md`, the `AGENTS.md` version stamp,
  `global/`, `examples/`, `scripts/agent-lint.mjs`, `tests/**`,
  `docs/how-it-works/standard-lifecycle.md` (PR #78 owns those last
  three). No version bump, no restamp, no CHANGELOG entry — ships with
  1.4.2 later.
- Owned files only: `skills/orchestrate/**`, `reference/runners.md`,
  `reference/skills.md`, `skills/shaping/SKILL.md`,
  `skills/skill-authoring/SKILL.md`, `docs/how-it-works/execution.md`,
  this lane.
- MAT-94 notices are ADDITIVE — the repo stays MIT (c) 2026 Mateo
  Garcia; upstream notices name the project, the skill, and MIT
  (c) 2025 Jesse Vincent.
- All artifacts in English.

## Steps

- [ ] 1. [judgment] Evals first — `skills/orchestrate/evals/eval-03.md`
  gains the degenerate-worker_done assertions BEFORE any content edit:
  (a) a degenerate worker_done (placeholder body, e.g. `--subject "t"
  --body "t"`) from a seat whose transcript still advances is neither
  idle nor a FAIL — the parent diagnoses with `worker-read`, acks the
  placeholder as noise, and holds for the follow-up; (b) worker_done is
  single-shot per dispatch, so the real verdict arrives inside Orca's
  rejected-worker_done wrapper quoting the original body verbatim —
  valid verdict evidence when pasted into the lane, routed on like any
  PASS/FAIL body. — accept: `node tests/run-eval-checks.mjs` exits 0
  AND `grep -c 'worker-read' skills/orchestrate/evals/eval-03.md` ≥ 1

- [ ] 2. [judgment] Seat-side warning, single definition —
  `skills/orchestrate/references/reviewer.md`'s fenced brief (near its
  "Reporting your verdict" section) gains: worker_done is SINGLE-SHOT
  per dispatch — never test-fire the channel with a placeholder; if a
  send fails to parse, fix the escaping (write the body to a file and
  use `--body "$(cat file)"`; avoid backticks in the body) and send
  ONCE. `reference/runners.md` gains the same warning in 1-2 lines near
  the reviewer-seat launch recipe (the TUI-form paragraphs), citing the
  reviewer template rather than restating it. — accept:
  `grep -ci 'single-shot' skills/orchestrate/references/reviewer.md` ≥ 1
  AND `grep -ci 'single-shot' reference/runners.md` ≥ 1 AND
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  exits 0

- [ ] 2b. [judgment] Seat reads in place (parent directive
  msg_58ffdcfc9878, see DECISIONS.md) —
  `skills/orchestrate/references/reviewer.md`'s fenced brief: the
  seat's worktree is ALREADY checked out on the lane branch at launch;
  reading and command-running happen IN PLACE; `git fetch` only if the
  branch moved since launch; creating checkouts or worktrees of its own
  is forbidden — a raw `git worktree add` lands outside the parent's
  ledger and becomes debris no decommission sweeps. Adjust the current
  "Check out or fetch [BRANCH]" wording so it can no longer be read as
  an instruction to create one. No eval-03 change (ruling in
  DECISIONS.md: grades parent behavior, not seat-brief content). —
  accept: `grep -c 'worktree add' skills/orchestrate/references/reviewer.md`
  ≥ 1 AND `grep -c 'Check out or fetch' skills/orchestrate/references/reviewer.md`
  is 0 AND
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  exits 0

- [ ] 3. [judgment] Parent-side guidance + docs chapter, same commit
  (house rule: behavior change updates the affected chapter) —
  `skills/orchestrate/SKILL.md` step 6 gains: a degenerate worker_done
  (placeholder body) from a seat whose transcript still advances is
  neither idle nor a FAIL — diagnose with `worker-read`, ack the
  placeholder as noise, hold for the follow-up; the rejected-
  worker_done wrapper quoting the original body verbatim is valid
  verdict evidence when pasted into the lane.
  `docs/how-it-works/execution.md`'s stage-6 narration gains the same
  lesson (both sides: the seat's single-shot channel, the parent's
  handling). Consumes: step 1's eval-03 wording (the graded behavior).
  — accept: `node tests/run-eval-checks.mjs` exits 0 AND
  `grep -c 'worker-read' skills/orchestrate/SKILL.md` ≥ 2 AND
  `grep -ci 'single-shot' docs/how-it-works/execution.md` ≥ 1

- [ ] 4. [judgment] MAT-94 classification, evidence first — diff
  `skills/shaping/SKILL.md` against upstream `brainstorming` and
  `skills/skill-authoring/SKILL.md` against upstream `writing-skills`
  (superpowers 6.3.0 cache at `C:/Users/mateo/.claude/plugins/cache/`
  `claude-plugins-official/superpowers/6.3.0/skills/`; path gone ⇒ say
  so in DECISIONS.md and classify from port records). Classify each,
  section by section where it matters: substantial ported
  expression/structure → append the short upstream notice (project,
  skill, MIT (c) 2025 Jesse Vincent); idea-only rewrite → NO notice.
  Either way the classification WITH diff evidence (matching phrases
  counted, or their absence) lands in this lane's DECISIONS.md. —
  accept: `grep -c 'classification' work/mat-104-94-single-shot-attrib/DECISIONS.md`
  ≥ 2 AND
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  exits 0

- [ ] 5. [judgment] Stance rule in `reference/skills.md` — the porting
  guidance gains 2-4 lines: on every port, diff against upstream;
  substantial portions carry the upstream MIT notice per file;
  idea-only rewrites record their classification in the lane. The file
  sits at 119 of its 120-line budget: trim something genuinely
  redundant to stay ≤ 120 and name the trim in DECISIONS.md. — accept:
  `wc -l < reference/skills.md` ≤ 120 AND
  `grep -c 'diff against upstream' reference/skills.md` ≥ 1 AND
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  exits 0

- [ ] 6. [mechanical] Full gate suite + lane bookkeeping current
  (PROGRESS.md truthful, DECISIONS.md carries every ruling and both
  classifications). — accept: all four commands exit 0:
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` ·
  `node tests/run-lint-tests.mjs` · `node tests/run-gen-tests.mjs` ·
  `node tests/run-eval-checks.mjs`
