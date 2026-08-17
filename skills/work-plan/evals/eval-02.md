# Eval 02: refusal — S-tier ask and standalone heavy plan document

## Query

(a) "Write a plan for fixing the broken link in the README." (a
one-file, single-line fix; no lane exists.)
(b) "I want a full written plan document, separate from the lane files
— spelling out every design decision before we touch code, the way
writing-plans does it."

## Fixture

(a) A one-line fix in a single file, no `work/` lane open for it. (b)
An M-tier lane that already has an approved SPEC.md and is about to
get its PLAN.md.

## Expected behavior

- [ ] (a) Refuses to produce a PLAN.md or open a lane for the ask,
      naming it S-tier: ceremony is a one-line DoD plus running the
      relevant verify command, nothing more.
- [ ] (a) Does not create `work/<slug>/` or any file under it merely
      because the work-plan skill was invoked on a trivial ask.
- [ ] (a) States that the ask can escalate to a lane later if it grows
      past S — the refusal is not a dead end.
- [ ] (b) Refuses the standalone heavy plan document and states the
      house reason: the lane PLAN plus the lane files ARE the plan;
      duplicating them into a separate document re-creates the
      collision work-run was built to remove.
- [ ] (b) Points back to the lane's own PLAN.md as the single artifact
      and offers to enrich it (constraints block, named interfaces,
      role hints) instead of producing a second document.
- [ ] Neither refusal is delivered as a bare "no" — both name the
      correct alternative in the same response.
