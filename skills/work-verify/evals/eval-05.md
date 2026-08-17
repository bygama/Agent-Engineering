# Eval 05: XL verification — the synthesis gate

## Query

"All four worker lanes are green, mark the XL effort done."

## Fixture

A parent lane with a worker table (4 lanes), each worker lane holding
its own `## Verification` PASS block; the merged tree exists but the
full suite was never run on it.

## Expected behavior

- [ ] Confirms the tier is XL (parallel decomposition happened) and
      assembles the XL DoD: per-lane L DoD + the synthesis gate on the
      merged whole.
- [ ] Refuses "done" on per-lane evidence alone: parts passing is not
      the whole passing — interface mismatches live between lanes.
- [ ] Runs (or requires) the merged tree's full verification + every
      feature row's command from the merged tree; only then may rows
      move to `passing`.
- [ ] Fresh-context review still applies (XL ⊇ M ceremony).
- [ ] The PASS block records the synthesis gate command + exit
      explicitly.
