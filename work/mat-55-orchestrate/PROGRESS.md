# orchestrate — Orca-first orchestration (1.3.0) — progress

## Done

- Step 1 (2026-08-18): wrote `skills/orchestrate/evals/eval-01.md` through
  `eval-04.md` (4 evals, evals-first per the hard constraint — no
  `SKILL.md` for orchestrate exists yet). Coverage:
  - eval-01: parent entry — M+ at a Run-bound session routes to
    orchestrate (never inline, never work-plan/work-run directly in the
    parent); Run binding confirmed/created; lane becomes a Task
    (`task-create --spec`, `--deps` for file-overlap); dispatch dialogue
    (reviewers y/n, count, model, default 1 ballena) asked and answered
    BEFORE any `worker-start`; parent implements nothing itself.
  - eval-02: supervision discipline — mailbox `check --wait` only, never
    polling the child's terminal directly even when reachable; rulings
    via `reply` land in the child's own DECISIONS.md; silence is not
    progress; child never merges (stated as ongoing, not just end-state);
    structured coordination only through `orca orchestration`.
  - eval-03: review wave + fix loop — agreed reviewer(s) dispatched
    read-only via the reviewer template; FAIL findings return to the SAME
    child; fix loop capped at 5 rounds → decision gate on exhaustion; PASS
    requires rebase-onto-main + gate rerun BEFORE merge; parent merges
    rebase-only in an order it chooses (not arrival order) across three
    simultaneously-PASS children; worker released + worktree removed
    after each merge.
  - eval-04: tier gating + no-Orca fallback — S refuses dispatch (inline,
    no lane/Task); M+ always a child; a child's request to spawn its own
    child is refused (no grandchildren) — it either folds the work into
    its own lane or asks the parent for a sibling task; on a no-Orca
    machine, orchestrate never fabricates a Run/Task/dispatch — the
    manual fallback runs instead with every Orca-only step declared
    explicitly NOT done, never faked.

  Acceptance: `test $(ls skills/orchestrate/evals/eval-*.md | wc -l) -ge 4`
  → PASS (4 evals). Also ran, both green (not required by this step's
  acceptance, but kept as evidence nothing else broke):
  `node tests/run-eval-checks.mjs` (orchestrate has no SKILL.md yet, so
  it isn't checked by that runner — all 12 existing skill dirs still
  well-formed) and `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` (0 high, 0 medium, 0 low — PASS).

  Files: `skills/orchestrate/evals/eval-01.md`,
  `skills/orchestrate/evals/eval-02.md`,
  `skills/orchestrate/evals/eval-03.md`,
  `skills/orchestrate/evals/eval-04.md`.

  Concerns: none — step scoped to evals only, no SKILL.md or references
  touched (those are steps 2-3). Commit: `429fa71`.

- Step 1 review (2026-08-18): spec ✅ Compliant, quality Approved, zero
  findings (fixtures create genuine temptation per rule; wording tracks
  SPEC; evals-first ordering verified). No fix rounds.

## In progress

- Lane opened 2026-08-18: SPEC approved by owner; PLAN written (10 steps).

## Tried and failed

## Next

- Step 2: dispatch-child.md + reviewer.md templates.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
