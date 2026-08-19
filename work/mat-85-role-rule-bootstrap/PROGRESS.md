# mat-85-role-rule-bootstrap — progress

## Done

- 2026-08-19 — Lane opened. SPEC.md written from the parent's shaped brief
  (design-first). Detection signal chosen and verified on this machine
  (DECISIONS ruling 1).

## In progress

- Awaiting parent approval of SPEC.md before PLAN.md is shaped.

## Tried and failed

- Bare `git rev-parse --git-dir` vs `--git-common-dir` as the detection
  signal: measured NO for the main worktree when run from a subdirectory
  (absolute vs relative output). Replaced by the `--path-format=absolute`
  form, which measured correctly in all four positions.

## Next

- Parent approves SPEC → shape PLAN.md → work-run → work-verify →
  work-handoff → push + PR (`Closes MAT-85`), never merge.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
