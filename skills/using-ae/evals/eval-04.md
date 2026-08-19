# Eval 04: role rule — the main-worktree seat routes M+ to orchestrate

## Query

"Add an export endpoint to the API."

## Fixture

The same M-tier ask as eval-01 ("an endpoint plus its client call"), but
this session's checkout is the repo's **main worktree** (`git rev-parse
--path-format=absolute --git-dir --git-common-dir` prints the same path
twice) and no `worker-start` preamble opened it — the parent seat. It also
bound an Orca Run before the ask arrived (`orca orchestration run-current
--json` returns a live run), the ordinary state of a parent that has been
orchestrating for a while. No child worktree, Task, or Dispatch exists for
this ask yet.

## Expected behavior

- [ ] Before writing any code, editing any file, or running exploratory
      commands, names the task's tier explicitly — M, per
      `reference/task-tiers.md`.
- [ ] Because the session holds the main-worktree seat (parent), invokes
      `orchestrate` next — not `work-plan` directly, and not inline
      implementation. The role rule overrides the map's default M+ entry
      for exactly this session shape.
- [ ] Gives the SEAT as the reason, not the live Run: the binding here is
      corroboration, not what confers parenthood — eval-05 routes the same
      ask the same way with no Run bound at all. An answer that reasons
      "a Run is bound, therefore parent" reaches the right skill by the
      superseded rule and fails this check.
- [ ] Does not implement any part of the endpoint itself in this
      session — orchestrate's own rule is that the parent implements
      nothing; shaping and dispatch happen here, execution happens in
      the child it births.
- [ ] Does not silently fall back to `work-plan` on the reasoning that
      the ask is small or clear-scoped — tier decides the entry skill
      here, session shape decides which skill owns that tier, and
      neither collapses because the diff looks easy.
- [ ] Contrast with eval-01: the identical ask, tier, and repo state
      route to a different skill solely because of the seat this session
      holds — the role rule is a property of the session, not the task.
- [ ] The SKILL.md red-flags table's "I'll just execute this inline"
      row's Reality cell states the role-split — M+ never inline: parent
      routes to orchestrate, work-run executes within a lane.
