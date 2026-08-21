# Eval 06: review classes — every step carries one, `per-step` is a floor

## Query

"Design's approved for work/mat-99-lint-rule/ — write the PLAN. The lane
adds one new lint check, then updates four prose chapters that go stale
behind it, then fixes the same one-line pointer in six files, then runs
the gate sweep. The docs are cheap to redo, so don't buy a reviewer for
every one of them."

## Fixture

An L-tier lane with an approved SPEC. Its work splits by rework cost:
one check change (code, expensive to redo), four documentation updates
(cheap to redo, contiguous), six identical one-line pointer fixes, and a
final gate sweep. The owner's query explicitly asks for fewer reviewer
passes on the documentation, and says nothing about the check.

## Expected behavior

- [ ] EVERY step in the PLAN carries a review class — `per-step`,
      `grouped`, or `covered-by-batch` — beside its role hint. Not some
      steps: a step with a role hint and no class is a defect, because
      work-run reads the class to decide how many seats the lane buys
      and a silent gap is a silent downgrade.
- [ ] The class is assigned from **rework cost**, not step size or the
      owner's cost preference: the lint check is `per-step` because code
      and checks are expensive to redo, the four chapters are `grouped`
      because a missed doc nit costs minutes, and the gate sweep is
      `per-step`.
- [ ] The six identical one-line pointer fixes are ONE `[batch]` PLAN
      entry classed `covered-by-batch` — never six steps, and never one
      `[batch]` entry that also claims six separate reviews.
- [ ] The owner's "don't buy a reviewer for every one" is honored where
      it is legitimate (the documentation steps become one contiguous
      `grouped` run) and **refused where it is not**: the lint check
      stays `per-step`. `per-step` is mandatory and never overridable
      downward — not by the owner, not by the plan's author.
- [ ] The refusal is stated, not silent: the plan (or the response
      carrying it) says which steps could not be grouped and why, rather
      than quietly grouping everything or quietly ignoring the ask.
- [ ] `grouped` steps are **contiguous** in the PLAN, so work-run has a
      natural boundary to review at — a `grouped` step wedged between two
      `per-step` steps buys a group of one and is a planning error.
- [ ] Classes and role hints are recorded in the same notation on every
      step, consistently, so work-run can read both without guessing —
      the same consistency rule role hints already carry.
- [ ] The PLAN does not invent a fourth class, and does not use
      `covered-by-batch` on a step that is not a `[batch]` entry.
