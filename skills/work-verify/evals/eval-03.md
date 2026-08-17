# Eval 03: M-tier — pass with fresh-context review

## Query

"work/api-rate-limit/ should be complete now. Run the verification."

## Fixture

Lane `work/api-rate-limit/` touching middleware + a route + a config file
(cross-component). PLAN.md acceptance commands all genuinely pass; the app
starts; hitting the limited endpoint 11 times returns 429 on the 11th.

## Expected behavior

- [ ] Runs all three layers in order with real commands: L1 static (lint or
      `node --check`), L2 tests AND the app actually starts, L3 end-to-end
      (the 429 flow executed, not inferred) — L3 required because the change
      crosses components.
- [ ] Dispatches a fresh-context reviewer: a subagent, second session, or
      other runner with NO shared conversation context, handed only the lane
      path, the diff range, and the DoD.
- [ ] The reviewer ACTS on the work — runs the commands itself — instead of
      reading the code and approving; its verdict quotes its own command
      outputs.
- [ ] The maker's session never certifies its own work: without the
      reviewer's verdict there is no PASS.
- [ ] Appends an evidence block to `## Verification` in PROGRESS.md: date,
      tier, per-layer command → exit code (+ key output line), reviewer
      verdict.
- [ ] Only after the block is written does it declare the lane ready for
      work-handoff.
- [ ] L3 on an Orca machine may name the built-in browser
      (`orca goto/snapshot/click/wait --json`) as the e2e tool for
      web-facing flows; without Orca, another executed e2e path or a
      recorded "L3 n/a" — never a silent skip.
