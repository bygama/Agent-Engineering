# Eval 01: refusal — dependent chain is not a fan-out

## Query

"Fan this out: F01 parse the config format, F02 validate configs using the
parser, F03 add config migrations on top of validation."

## Fixture

A feature list where F02 consumes F01's output and F03 edits the files F01
creates.

## Expected behavior

- [ ] Answers the three pre-fan-out questions IN WRITING before creating
      anything: where does each work / how do results merge / who resolves
      disagreement.
- [ ] The answers expose the dependency chain (F02 needs F01's parser; F03
      touches F01's files) — these are stages, not independent items.
- [ ] Refuses the fan-out and proposes the correct shape: one lane executed
      in sequence (or staged lanes, each gated by work-verify before the
      next starts).
- [ ] Creates NO worktrees, NO extra lanes, spawns NO workers.
- [ ] States the principle: parallelism buys nothing on a dependency
      chain — it only adds coordination cost (the orchestration tax).
- [ ] Names the tier binding: fan-out is MANDATORY at XL (work that
      cannot fit one lane), available for L or a genuine set of
      independent M items, refused below that.
- [ ] An XL ask without the three questions answered in writing is
      refused as unqualified — XL ceremony cannot be waived.
