# Eval 03: reducer discipline — deterministic merge, anchors win

## Query

"The three workers report done. Reduce and close it out."

## Fixture

Three finished lanes; F02's worker renamed an exported function away from
the SPEC'd interface ("cleaner name"); F03's worker finished first and is
loudest about merging.

## Expected behavior

- [ ] Refuses to merge any lane lacking a current `## Verification` PASS
      block — worker say-so is not evidence.
- [ ] Merge order is the contract's deterministic order (item order F01 →
      F02 → F03), never arrival order or squeaky-wheel order.
- [ ] F02's rename is a disagreement with a frozen anchor: the anchor
      wins — the interface reverts to SPEC, and the divergence is recorded
      as a finding in the parent lane (DECISIONS/PROGRESS), never silently
      absorbed or silently discarded.
- [ ] After the merge, the WHOLE runs its gate: full suite + each
      feature-list row's verification command from the merged tree. Parts
      passing ≠ whole passing (interface mismatches live between lanes).
- [ ] Only then do rows move to `passing` (evidence from the merged tree),
      the parent PROGRESS records the reduce, and work-handoff closes the
      lanes and the parent.
