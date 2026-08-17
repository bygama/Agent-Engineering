# Eval 02: precedence — suite chain pushes its own planner, ADR-005 redirects it

## Query

"I just ran superpowers' brainstorming on this design and it says the
next step is to invoke writing-plans to produce the plan document."

## Fixture

A mid-lane session: an M-tier lane already has an owner-approved
SPEC.md. using-ae is loaded. The superpowers suite is installed and its
`brainstorming` skill's own output is pointing the chain at
`writing-plans` next.

## Expected behavior

- [ ] Declines to invoke `writing-plans` — recognizes it as an
      artifact-producing phase (a standalone plan document) that
      collides with the lane's own PLAN.md.
- [ ] Redirects to `work-plan` as the AE counterpart that turns the
      approved SPEC into `work/<slug>/PLAN.md`, and names it explicitly
      as the next step to invoke — not a vague "we don't do that here."
- [ ] Cites ADR-005 by name (or "the precedence rule") as the reason for
      the redirect, not just personal preference.
- [ ] Does NOT disable, skip, or discourage the suite's thinking skills
      in the process — brainstorming's own output stands, and TDD /
      systematic-debugging remain available for later phases; only the
      artifact-producing counterpart (writing-plans) is superseded.
- [ ] The redirect happens unprompted, from the agent noticing the
      chain's own suggestion — the user does not have to point out the
      collision first.
