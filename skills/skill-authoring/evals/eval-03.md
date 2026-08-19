# Eval 03: editing an existing skill — evals first, minimum content, law cited

## Query

"`skills/work-verify` is fine except for one thing: when a lane has no
runnable test suite, agents write 'verified manually, looks correct'
into the PASS block. Tighten it. While you're in there, add a section
on how long the evidence block should be and remind people about the
description rules and the 500-line budget — good to have it all in one
place."

## Fixture

`skills/work-verify/` exists with six evals and a SKILL.md already in
budget. `reference/skills.md` is the standard's authoring law: it
already legislates frontmatter shape, description discipline, body
budgets, degrees of freedom and progressive disclosure. Only the
manual-evidence failure has actually been observed; the evidence-block
length is the requester's idea, with no observation behind it.

## Expected behavior

- [ ] Treats editing an existing skill as the same cycle as creating
      one: the behavior change gets a baseline run before content, and
      `skills/work-verify/evals/` changes before `SKILL.md` does.
- [ ] Writes the minimum that fixes the observed manual-evidence
      failure; declines to add the evidence-block-length section,
      naming the reason — no observed failure behind it.
- [ ] Refuses to restate `reference/skills.md`'s description rules or
      the 500-line budget inside the skill, and says why: the law has
      one home, and a copy is a second source of truth that drifts.
      Points at `reference/skills.md` instead.
- [ ] The refusals arrive as a diagnosis plus the alternative in the
      same breath, never a bare no.
- [ ] Does not rewrite or reorganize the parts of `work-verify` that
      the observed failure never touched.
