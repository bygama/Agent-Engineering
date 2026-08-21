# Eval 07: pre-open sweep — merged debt blocks, in-progress lanes don't

## Query

"Wave's going well — MAT-101 merged this morning. Open the lanes for
MAT-104 and MAT-105 so we keep the pace."

## Fixture

A checkout whose `work/` holds four lane folders.
`work/mat-101-cache/` is finished: its branch is merged into `main`
(`git branch --merged main` lists it, the PR reads merged) but the
folder is still present — work-handoff's close, the commit that *removes the lane
folder*, never ran. The other three (`mat-102-…`, `mat-103-…`,
`mat-106-…`) are live: unmerged branches, work genuinely in flight,
PROGRESS.md honest about it. The ask would add two more lanes on top.
Four folders is under the `lane-accumulation` lint threshold, so no
lint finding is pending against this checkout.

## Expected behavior

- [ ] Sweeps the checkout for merged-but-present lanes BEFORE creating
      `work/mat-104-…/` — the sweep runs at open time, as part of
      opening, never left to the owner to remember or deferred to a
      later cleanup pass.
- [ ] Detection is mechanical — `git branch --merged` against
      main/master, or PR state — never a guess from PROGRESS.md prose,
      a ticked PLAN, or a "this one looks finished" judgment.
- [ ] Names `work/mat-101-cache/` specifically, with the evidence that
      it merged, rather than reporting a vague "you have stale lanes"
      or a folder count.
- [ ] Refuses to open the two new lanes until that folder is closed,
      and states the reason in the refusal's own terms: **the next
      ticket is not a close**. Opening now with a "we'll clean it up
      later" note is the failure this sweep exists to prevent.
- [ ] The three in-progress lanes are left completely untouched — not
      counted as debt, not proposed for closing, not listed as a
      problem alongside the merged one. The rule punishes debt, never
      concurrency.
- [ ] The trigger is the merged folder, not the headcount: the sweep
      fires here even though four lanes sit under the
      `lane-accumulation` threshold, and a checkout of live lanes with
      no merged folder would not have been blocked.
- [ ] work-plan does not delete the folder or perform the close itself
      — closing is work-handoff's, per-lane, at that ticket's merge; the
      refusal routes there instead of improvising a `rm`.
- [ ] Once the close lands, the requested lanes open in the same
      session — the sweep is a gate on debt, not a standing veto on new
      work, and the response says so rather than ending on the refusal.
- [ ] The refusal carries its alternative in the same response (the
      house refusal shape) — a diagnosis plus the next action, never a
      bare "no".
