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

- Step 2 (2026-08-18): wrote the two dispatch templates in
  `skills/orchestrate/references/`, following the MAT-43 pattern (When
  to use / How to fill / fenced template / Placeholders / reports-via
  line) already used by `skills/work-run/references/*.md` and
  `skills/work-verify/references/lane-reviewer.md`.
  - `dispatch-child.md`: the text becomes the Task's `--spec`
    (`orca orchestration task-create --spec "..."`), injected as the
    child's preamble at `worker-start --task <id> --worktree
    new-child`. Two placeholders — `[LANE_PATH]`, `[TASK_BRIEF]`
    (the parent's already-shaped design; the child formalizes it via
    `work-plan` design-first, never re-shapes it). Covers all four
    PLAN-named behaviors: reads its Linear ticket via `orca linear
    issue --current`; pushes its branch and opens the PR but never
    merges (explicit "no matter how clean" line); reports done via
    `orca orchestration send --type worker_done --outcome succeeded
    --files-modified ... --report-path ... --body "PR: <url>"`; asks
    questions via the blocking `orca orchestration ask --question`.
    Also carries the SPEC's "no grandchildren" rule (eval-04) as its
    own section, since that's part of what the child preamble must
    tell the child.
  - `reviewer.md`: read-only adversarial reviewer on the lane branch
    — explicit "refute-the-PASS" framing (rerun the PASS block's own
    commands, look for unbacked claims, check SPEC Constraints for
    missed/extra/misunderstood). Verdict (PASS/FAIL + findings by
    severity) is reported via `worker_done`'s `--body`, deliberately
    kept separate from `--outcome` (which I resolved to mean "did the
    review itself complete," verified against `orca orchestration
    send --help`'s note that `worker_done requires --outcome
    succeeded or --outcome failed` — conflating that flag with the
    lane's verdict would misreport a completed FAIL review as a
    failed worker). Never commits/pushes/merges.

  Verified actual `orca orchestration` CLI syntax against `orca
  orchestration <cmd> --help` on-machine (task-create, worker-start,
  ask, check, reply, send, worker-release) rather than guessing flags;
  `send`'s notes on `--outcome`, `--files-modified`, `--report-path`,
  and injected `--task-id`/`--dispatch-id`/`--from` drove both
  templates' exact wording.

  Acceptance: `test -s skills/orchestrate/references/dispatch-child.md
  -a -s skills/orchestrate/references/reviewer.md` → PASS. Also ran
  (not required by this step, kept as evidence): `node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  (0 high, 0 medium, 0 low — PASS) and `node tests/run-eval-checks.mjs`
  (all 12 existing skill dirs well-formed; orchestrate still has no
  SKILL.md, so it isn't checked by that runner yet — expected, SKILL.md
  is step 3).

  Files: `skills/orchestrate/references/dispatch-child.md`,
  `skills/orchestrate/references/reviewer.md`.

  Concerns: none blocking. One judgment call worth flagging for
  step 3/review — I treated `--outcome` on the reviewer's worker_done
  as "did the review complete" rather than "did the lane pass," since
  the CLI help ties `--outcome` to the worker's own task completion,
  not an arbitrary verdict payload; step 3's SKILL.md should route the
  parent's FAIL-handling off the `--body` verdict text, not off
  `--outcome`, to stay consistent with this reading.

- Step 2 review (2026-08-18): spec ✅ Compliant, quality Approved, zero
  Critical/Important. One Minor DEFERRED for work-verify's triage:
  `dispatch-child.md` concatenates `[LANE_PATH]PROGRESS.md` with no
  separator — relies on the trailing-slash placeholder convention;
  consider an explicit no-ambiguity form. Reviewer confirmed the
  `--outcome`/`--body` split matches the DECISIONS ruling verbatim.
  No fix rounds.

## In progress

- Lane opened 2026-08-18: SPEC approved by owner; PLAN written (10 steps).

## Tried and failed

## Next

- Step 3: `skills/orchestrate/SKILL.md` — the parent role end to end,
  citing `references/dispatch-child.md` and `references/reviewer.md`
  by their exact paths.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
