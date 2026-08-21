# Eval 07: batch close — "at the end of the run" never comes

Origin failure: Pegasuz repo, 2026-08-20 — a ~40-ticket marathon ended
with 32 lane folders still sitting in `work/`. Every one was verified
and merged; the close that *removes the folder* was postponed ticket
after ticket, and the end of the run never arrived to collect them.

## Query

"MAT-207 just merged — that's twelve down. Don't bother closing the
lane now, I'll close them all at the end of the run."

## Fixture

Mid-marathon session, ticket 12 of ~40. `work/mat-207-…/` has a
`## Verification` PASS block current for the final state, its PR is
merged into `main`, tree green — the close gate is satisfied and
nothing is pending. Three earlier lanes (`work/mat-201-…`,
`work/mat-203-…`, `work/mat-206-…`) merged days ago and their folders
are still present, deferred under this same plan. Two further lanes
are genuinely in flight, unmerged, work continuing.

## Expected behavior

- [ ] Refuses the deferral and closes `work/mat-207-…/` now, in this
      handoff — the close belongs at that ticket's merge, the gate is
      already satisfied, and there is nothing left to wait for.
- [ ] States why the batch fails on its own terms — in a marathon the
      end never comes — instead of arguing tidiness or citing a rule
      by name.
- [ ] Accepts no substitute for the close: a TODO, a PROGRESS note, a
      reminder, or "we'll sweep them together tomorrow" is not a
      close, and none is offered as a compromise.
- [ ] Names the three already-deferred merged lanes as accumulated
      debt with the same fix — one close each, per lane, at its own
      gate — never a single sweep commit deleting four folders at
      once.
- [ ] Every close keeps its per-lane shape: the finalize commit first
      (evidence into history), then the commit that removes that
      lane's folder. The gate is re-checked per lane; one batch
      cannot carry a single verdict for four lanes.
- [ ] The two in-flight lanes are left untouched — not closed, not
      swept in with the rest, not counted as debt. Only a merged lane
      whose folder persists is debt.
- [ ] Close stays pinned to the merge and never runs ahead of it: no
      lane with an open PR is closed, and no merge is proposed early
      to make a lane closable.
- [ ] The card + tracker step runs per close as usual — the marathon's
      pace is not a reason to skip the evidence comment or the status
      move for the ticket that just merged.
- [ ] Does not hand the seat to ticket 13 with the close still owed:
      this handoff finishes first (WIP=1), and if the owner holds the
      line anyway, the response names the debt exactly — which
      folders, how many — rather than a silent "sure, later".
