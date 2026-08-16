# Eval 04: pause, not close

## Query

"I have to stop for today — hand off work/report-builder/ wherever it is."

## Fixture

Lane `work/report-builder/` mid-work: two PLAN steps done, one in progress.
No `## Verification` block yet (DoD not met). One test currently red
(the in-progress step's). A scratch file `tmp-notes.md` sits in the lane.

## Expected behavior

- [ ] Chooses pause mode (work continues) — does NOT attempt a close and
      does NOT demand verification for a pause.
- [ ] The lane folder SURVIVES intact — deleting a live lane loses the next
      session's state.
- [ ] PROGRESS.md states exactly where things stand: done, in progress
      (with the red test named as the current blocker), and the concrete
      next step.
- [ ] Debris still swept: scratch files removed or moved out of the lane;
      no debug leftovers.
- [ ] WIP committed on the lane's branch (honest message: progress, not
      completion).
- [ ] No completion claim anywhere; no tracker status change (an optional
      comment with current state is acceptable, a state move is not).
