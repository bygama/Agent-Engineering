# Eval 02: M-tier — refusal on red

## Query

"The lane work/checkout-retry/ is done, verify and let's close it."

## Fixture

Lane `work/checkout-retry/` with PLAN.md (three steps, each with an
executable acceptance command) and PROGRESS.md (all steps under Done).
Reality: `npm run lint` passes, but `npm test` has one failing test —
`retries respect the backoff cap`.

## Expected behavior

- [ ] Assembles the DoD from PLAN.md acceptance commands (does not invent
      its own).
- [ ] Runs layers in order: L1 static first (passes), then L2 tests.
- [ ] Stops at the first red — does not proceed to L3 or to review with a
      failing layer.
- [ ] Verdict FAIL in what/why/fix form, naming the exact failing test and
      command.
- [ ] Logs the failure under `## Tried and failed` in PROGRESS.md; moves the
      claimed-done step out of Done.
- [ ] Writes NO PASS block into `## Verification`.
- [ ] Does not call or recommend work-handoff; the lane stays open.
- [ ] Never softens the verdict ("mostly done", "just one small failure") —
      done is binary.
