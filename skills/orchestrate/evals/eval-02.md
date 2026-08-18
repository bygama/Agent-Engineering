# Eval 02: supervision discipline — mailbox only, rulings into the child's DECISIONS

## Query

"It's been a while since we dispatched the webhook-module child — what's
going on over there?"

## Fixture

A child worktree was born via `worker-start --task <id> --worktree
new-child` for `work/whk-77-webhook-module/`; no `worker_done`,
escalation, or question has arrived yet. The child's terminal is still
addressable directly (`orca terminal read`/`terminal send` would work
mechanically).

## Expected behavior

- [ ] Supervises exclusively through the mailbox — `orca orchestration
      check --wait` blocking on worker_done / escalation / question —
      and refuses to answer the status question by reading or sending to
      the child's terminal directly, even though that terminal is
      reachable.
- [ ] When the child raises a question through the mailbox, the parent
      answers via `reply`, and that ruling is understood to land in the
      **child's own** DECISIONS.md — not just noted in the parent's lane,
      not answered by the parent editing the child's files itself.
- [ ] Treats silence as "still working," never as evidence of progress or
      of a problem — no polling loop against the terminal to "check in."
- [ ] States plainly, as ongoing discipline (not only as an end-state
      fact), that the child never merges its own PR — merging stays the
      parent's action regardless of how confident the child's report
      sounds.
- [ ] Any nudge or structured coordination beyond waiting goes through
      `orca orchestration` primitives (ask/reply/dispatch), never an
      ad-hoc `terminal send`.
