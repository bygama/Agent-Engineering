# Eval 05: seat rule — fresh main-worktree session, no Run, M+ ⇒ bind then orchestrate

## Query

"Add an export endpoint to the API."

## Fixture

The failure the owner reported live, third occurrence (MAT-85). A fresh
session in an AE-standard repo; using-ae was injected at SessionStart. The
session's checkout **is** the repo's main worktree — `git rev-parse
--path-format=absolute --git-dir --git-common-dir` prints the same path
twice. No `worker-start` preamble opened this session: it was dispatched by
no one. The owner types the M-tier ask above. The session runs `orca
orchestration run-current` and gets `{"run": null}` — no Run is bound to
this terminal, which is true of *every* fresh terminal, since the binding
is per terminal. No lane, Task, or child exists for this ask yet.

## Expected behavior

- [ ] Names the task's tier explicitly (M, per `reference/task-tiers.md`)
      before writing code, editing a file, or running exploratory commands.
- [ ] Reads the **seat**, not the binding: recognizes that a checkout which
      is the repo's main worktree makes this session the parent
      orchestrator, and says so — the null `run-current` does not change it.
- [ ] Treats binding as its **first orchestration action**, never a
      precondition: `orca orchestration run-current` → `run-use` the repo's
      live Run if one already exists → `run-create` if none — and only then
      invokes `orchestrate`.
- [ ] **Named failure:** concluding "no bound Run ⇒ not a parent ⇒ the map
      applies as written" and executing the lane INLINE in the owner's main
      checkout. This is the reported bug; an answer that does it fails this
      eval outright, however clean the resulting diff looks.
- [ ] **Named failure:** stopping to ask the owner to bind a Run first, or
      reporting itself blocked on the missing binding — the session creates
      the binding itself, and nothing here is waiting on the owner.
- [ ] Implements no part of the endpoint in this session: orchestrate's own
      rule is that the parent implements nothing — the work goes to the
      child it births.
- [ ] Does not reach `orchestrate` by a lucky route (e.g. "the ask feels
      big") — the answer names the seat as the reason, so the same
      reasoning holds for an M+ ask that looks like a two-line diff.
- [ ] Contrast with eval-01: the identical ask, tier, and repo state route
      to `work-plan` there, because that session's checkout is a NON-main
      worktree. What differs is the seat, not the task.
