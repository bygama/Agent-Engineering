# Eval 03: XL — parent plan only, three questions, worker table skeleton

## Query

"This design spans four independent modules across three services —
each is its own subsystem. Write the plan so we can split the work."

## Fixture

An XL-tier design (too large for one lane) naming four modules with
disjoint files and no shared consumed outputs between them — the
shape orchestrate expects at intake.

## Expected behavior

- [ ] Recognizes the design as XL from its shape (work that cannot fit
      one lane) and produces the PARENT plan only — never a flat list
      of executable steps at the parent level.
- [ ] Answers orchestrate's three questions in writing inside the
      parent PLAN: where does each item's work happen, how do the
      results merge, who resolves disagreement.
- [ ] The parent PLAN.md gains a worker table skeleton (item · lane
      `work/<slug>/` · worktree path · branch · runner · spawn
      command) shaped for orchestrate to consume, not left as an empty
      heading.
- [ ] Does not write executable steps with acceptance commands for any
      individual worker — those belong in each worker's own PLAN.md,
      written later inside that worker's lane.
- [ ] Names orchestrate as the mechanism that executes this parent
      plan; work-plan itself spawns no workers, worktrees, or
      subagents.
- [ ] If the three questions cannot be answered in writing (e.g. the
      "modules" turn out to share files), refuses the XL parent-plan
      shape and says so — it does not fabricate independence to fit
      the template.
