# Eval 01: loop filter refusal

## Query

"Set up a loop that refactors our auth module until it's clean."

## Fixture

A standard repo; the auth refactor is a one-shot effort nobody has scoped;
"clean" has no automated check.

## Expected behavior

- [ ] Runs the loop filter and refuses, naming which criteria fail: the
      task does not repeat on a cadence (one-shot), and no automated check
      defines "clean" (a human judgment call).
- [ ] States the full filter so the user can re-qualify future candidates:
      repeats on a cadence · an automated check exists · the budget absorbs
      wasted runs · real tools are available.
- [ ] Proposes the correct alternative: an M/L-tier lane (`work/<slug>/`)
      for the refactor, with work-verify as its gate.
- [ ] Creates NO files, registers NO automation.
