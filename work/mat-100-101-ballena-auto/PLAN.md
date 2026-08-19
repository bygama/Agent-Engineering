# Ballena --auto + fallback-shell contradiction — plan

## Constraints (apply to every step)

- Never touch: `CHANGELOG.md`, the `AGENTS.md` version stamp,
  `global/`, `examples/`. No version bump, no restamp, no CHANGELOG
  entry — this ships in 1.4.2 later; the release ritual owns those.
- Sibling-owned, hands off: `scripts/agent-lint.mjs`, `tests/**`,
  `docs/how-it-works/standard-lifecycle.md`.
- Owned files only: `reference/runners.md`, `reference/orca.md`,
  `skills/orchestrate/**`, `docs/how-it-works/execution.md`, this lane.
- All artifacts in English.

## Steps

- [ ] 1. [judgment] Evals first — `skills/orchestrate/evals/eval-03.md`
  gains three assertions, before ANY content edit: (a) the ballena
  two-step launch carries `--auto` on BOTH forms — the Go default
  `opencode -m opencode-go/deepseek-v4-flash --auto` and the no-auth
  fallback `opencode -m opencode/deepseek-v4-flash-free --auto` — with
  the read-only rationale (safe only because the filled reviewer.md
  forbids commit/push/merge and file edits); (b) the review-seat stall
  clock — observed normal 20-45 min; 75+ min with an empty
  orchestration transcript and `latestCursor: 0` is a stall; recovery
  is `worker-stop` → remove the review worktree → `task-update
  --status ready` → fresh seat; (c) the fallback-shell close names the
  actual closing command (`orca terminal close --terminal <handle>`)
  where the requirement is stated. — accept:
  `node tests/run-eval-checks.mjs` exits 0 AND
  `grep -c -e '--auto' skills/orchestrate/evals/eval-03.md` ≥ 1

- [ ] 2. [judgment] MAT-100 in `reference/runners.md` — the
  reviewer-seat prose (the TUI form, "opencode has two invocation
  forms" paragraph) shows both ballena launch commands with `--auto`,
  the one-line reason (verified on this machine 2026-08-19: `--auto`
  auto-approves permissions not explicitly denied; without it the
  reviewer hangs at a permission prompt nobody watches — a 78-minute
  live stall on the MAT-91 review, undiagnosable from the parent's
  seat: worker `ready`, terminal `running`, transcript EMPTY,
  `latestCursor: 0`), and the read-only caveat (safe for THIS seat
  because the filled reviewer.md forbids commit/push/merge and any
  file edit; the same flag on a WRITING seat is a different decision —
  said explicitly). — accept:
  `grep -c -e '--auto' reference/runners.md` ≥ 2 AND
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  exits 0

- [ ] 3. [judgment] MAT-100 in `skills/orchestrate/SKILL.md` step 6 +
  `docs/how-it-works/execution.md`, same commit (house rule: behavior
  change updates the affected chapter): the two-step snippet's
  `terminal create --command` line carries `--auto`; the free-fallback
  sentence carries it too; a stall-clock paragraph lands immediately
  after the fallback-shell paragraph — tied back to step 5's cadence
  guidance (a ballena cannot heartbeat, so the cadence rule cannot
  reach it), threshold and recovery as in step 1's eval wording.
  execution.md's stage-6 narration gains the same stall clock and its
  mermaid `terminal create` line stays consistent with the flag.
  Consumes: step 1's eval-03 assertions (the graded wording). —
  accept: `node tests/run-eval-checks.mjs` exits 0 AND
  `grep -c -e '--auto' skills/orchestrate/SKILL.md` ≥ 2

- [ ] 4. [mechanical] MAT-101 — `reference/runners.md` fallback-shell
  paragraph drops the categorical claim ("the bare create opens a
  startup shell of its own" → the two-step CAN leave one; observed
  both ways on this repo's own Run, 2026-08-19: present on some
  launches, absent on the MAT-91 review seats);
  `skills/orchestrate/SKILL.md` step 6 names the closing command on
  the requirement line — one line, `orca terminal close --terminal
  <handle>`, citing `reference/runners.md` for the full recipe
  (single-definition discipline); then verify the three files agree
  (`reference/runners.md`, `skills/orchestrate/SKILL.md:~177`,
  `reference/orca.md:~109` — all "can", no categorical form left). —
  accept: `grep -c 'opens a startup shell' reference/runners.md`
  is 0 AND `grep -c 'terminal close --terminal' skills/orchestrate/SKILL.md` ≥ 1

- [ ] 5. [mechanical] Full gate suite + lane bookkeeping current
  (PROGRESS.md truthful, DECISIONS.md carries every ruling). — accept:
  all four commands exit 0:
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` ·
  `node tests/run-lint-tests.mjs` · `node tests/run-gen-tests.mjs` ·
  `node tests/run-eval-checks.mjs`
