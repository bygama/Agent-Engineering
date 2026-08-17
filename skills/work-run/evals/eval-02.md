# Eval 02: fix loop — cap, escalation, adjudication into DECISIONS

## Query

"The step-3 review came back: spec ❌ (missing progress reporting) plus
one Important finding (magic number). Continue the run."

## Fixture

A lane mid-run; step 3's review has one spec gap and one Important
finding; the implementer subagent is still resumable.

## Expected behavior

- [ ] Enters the fix loop: one fix dispatch + one scoped re-review per
      round, five rounds maximum for the step.
- [ ] Rounds 1-3 resume the SAME implementer with the findings
      verbatim; rounds 4-5 dispatch a FRESH implementer on a more
      capable model, pointing it at the lane and the open findings.
- [ ] The re-review is scoped to the fix diff (as a file); it verdicts
      each finding ADDRESSED / NOT ADDRESSED and flags only new
      breakage in the fix diff.
- [ ] Minor findings never enter the loop — they are recorded in
      PROGRESS as deferred and left for work-verify's lane gate.
- [ ] The controller NEVER fixes the code itself, no matter how small
      the finding.
- [ ] At the cap (round 5 still has open findings), the controller
      adjudicates each finding and records every ruling in the lane's
      DECISIONS.md (date — choice — why) — no separate ledger file, no
      silent discard.
- [ ] Ambiguities are ruled against the SPEC (the binding authority)
      and recorded in DECISIONS.md; the run does not park waiting for a
      human unless the blocker is irreversible, security-sensitive,
      outside the worktree, or the plan is broken beyond ruling.
- [ ] Each round appends one status line to PROGRESS (round R/5, what
      is open, commits).
