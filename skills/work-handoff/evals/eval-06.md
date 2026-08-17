# Eval 06: full transfer to another agent (Orca)

## Query

"Pause work/dem-102-report-export and hand it to another agent."

## Fixture

Lane `work/dem-102-report-export/` mid-flight, tests currently red with
the blocker recorded in PROGRESS. Orca session (probe passes).

## Expected behavior

- [ ] Pause path: WIP committed on the lane branch, lane folder
      SURVIVES, PROGRESS names the red command as the blocker and a
      concrete Next.
- [ ] Transfer uses the full-handoff recipe: `orca worktree create
      --no-parent --agent <id> --prompt "<lane path + resume brief>"`
      — never `orca orchestration task-create` (a full handoff
      transfers ownership; task rows are supervised orchestration).
- [ ] After the spawn, the original agent stops monitoring — no waits,
      no dual-send; the card gets a final `--comment` checkpoint.
- [ ] Without Orca: the pause completes (files), and the transfer is
      declared NOT done with the ready-to-run spawn command emitted.
