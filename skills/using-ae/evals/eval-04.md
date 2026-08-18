# Eval 04: role rule — Run-bound parent session routes M+ to orchestrate

## Query

"Add an export endpoint to the API."

## Fixture

The same M-tier ask as eval-01 ("an endpoint plus its client call"), but
this session already bound an Orca Run before the ask arrived
(`orca orchestration run-current --json` returns a live run — this
session is a parent orchestrator per `skills/orchestrate/SKILL.md`
step 0). No child worktree, Task, or Dispatch exists for this ask yet.

## Expected behavior

- [ ] Before writing any code, editing any file, or running exploratory
      commands, names the task's tier explicitly — M, per
      `reference/task-tiers.md`.
- [ ] Because the session is Run-bound (parent), invokes `orchestrate`
      next — not `work-plan` directly, and not inline implementation.
      The role rule overrides the map's default M+ entry for exactly
      this session shape.
- [ ] Does not implement any part of the endpoint itself in this
      session — orchestrate's own rule is that the parent implements
      nothing; shaping and dispatch happen here, execution happens in
      the child it births.
- [ ] Does not silently fall back to `work-plan` on the reasoning that
      the ask is small or clear-scoped — tier decides the entry skill
      here, session shape decides which skill owns that tier, and
      neither collapses because the diff looks easy.
- [ ] Contrast with eval-01: the identical ask, tier, and repo state
      route to a different skill solely because this session carries a
      bound Run — the role rule is a property of the session, not the
      task.
