# Eval 04: interfaces, batching, and role hints

## Query

"Design's approved for work/api-9-pagination/: step 1 defines the
Cursor type in lib/cursor.ts, step 2 wires it into the list endpoint.
Same one-line import rename needs to happen across five route files.
Last step is a judgment call on the error-message wording. Write the
PLAN."

## Fixture

A design with three distinct shapes bundled together: a producer/
consumer pair sharing an interface (the `Cursor` type), five small
same-shape one-line fixes across separate files, and one step that
needs subjective judgment rather than mechanical execution.

## Expected behavior

- [ ] The step consuming the `Cursor` type names the interface
      explicitly on its PLAN line (the type/function signature and its
      file) rather than saying "use step 1's output".
- [ ] The five same-shape one-line import-rename fixes are marked
      `[batch]` and grouped as one PLAN entry so work-run sends them to
      ONE implementer in one dispatch, never five separate dispatches.
- [ ] The `[batch]` rule is applied as a requirement, not an option:
      same-shape edits repeated across files are ONE step whether or not
      the design happened to list them separately. The field evidence
      the skill cites is MAT-111, which ran 9 steps where ~5 were right
      — a plan that emits one step per file fails this check even though
      every step is individually well-formed.
- [ ] Each step also carries a review class beside its role hint
      (eval-06 owns the classes in full); the `[batch]` entry's class is
      `covered-by-batch`, since its single review covers the whole sweep.
- [ ] Each step carries a role hint (`mechanical` / `integration` /
      `judgment`) matching its nature: the batched rename is
      mechanical, the type-consuming step is integration, the
      error-messaging step is judgment.
- [ ] No step mixes two concerns — the interface-consuming step does
      not also absorb the batched rename or the judgment call.
- [ ] Role hints are used consistently once introduced (not present on
      some steps and silently absent on others of comparable nature)
      so work-run's model-by-role selector can read them without
      guessing.
