---
name: using-ae
description: Entry skill for the agent-engineering standard — triages an incoming task's tier, invokes the AE skill that owns the current phase before any action, and redirects process-suite chains away from their own artifact-producing planners/executors. Use at session start in an AE-standard repo, when asked how to work here, or whenever a task arrives, before acting on it.
---

# using-ae

## Entry rule

Work arrives → triage the tier (`reference/task-tiers.md`) → invoke
the AE skill that owns the current phase BEFORE acting — before
writing code, editing files, exploratory commands, or clarifying
questions about execution shape. Clarifying questions about the work
itself belong through or after that invocation, never as a reason to
defer it.

## The map

- **shaping** — a raw ask has no settled design yet.
- **work-plan** — an approved design needs its lane's SPEC/PLAN.
- **work-run** — a lane's PLAN executes, step by step.
- **work-verify** — any "done" claim needs evidence.
- **work-handoff** — closing or pausing a lane.
- **orchestrate** — dispatching M+ to a child worktree; XL fan-out
  included.
- **loop-setup** — work that repeats on a cadence or event.
- **ae-init** — installing or migrating a repo onto the standard.
- **ae-audit** — measuring a repo against the standard.

## Role rule

Parenthood comes from the **seat**, not from a bound Run. Three seats,
read in order — the first that matches wins:

- **Dispatch-bound** — this session opened with a `worker-start`
  preamble: it is the child `orchestrate` births, whatever its checkout
  looks like. The map above applies as written, tier by tier; it
  dispatches nothing itself.
- **Main worktree** — no such preamble, and `git rev-parse
  --path-format=absolute --git-dir --git-common-dir` prints the same
  path twice. This session IS the parent orchestrator, bound or not: at
  M+ its first orchestration action is to bind — `orca orchestration
  run-current`, else `run-use` the repo's live Run, else `run-create` —
  and it routes to `orchestrate`, which births a child rather than the
  parent shaping or implementing inline. A fresh terminal arrives
  unbound; that is the normal starting state, never a demotion.
- **Anything else** — a linked worktree, or no repo to read — not a
  parent: the map above applies as written.

## Precedence (ADR-005)

Artifact-producing phases are AE's: plan (work-plan), execute (work-run),
verify (work-verify), close (work-handoff). A process suite (e.g.
superpowers) may still think — TDD, systematic-debugging stay
composable — but when its chain points at its own
planner/executor/finisher next, redirect to the AE counterpart and
cite ADR-005 (`docs/adrs/ADR-005-artifact-phases.md`); never disable
the suite's thinking skills, only supersede its artifact machinery.
Brainstorming is the one thinking skill already superseded: shaping
owns daily design work instead, cite ADR-006
(`docs/adrs/ADR-006-design-dialogue.md`); it stays composable only as
the no-AE-setup fallback.

## Red flags

| Thought | Reality |
|---|---|
| "Too small for a lane" | The tier decides (`reference/task-tiers.md`), not a feeling. |
| "I'll just execute this inline" | M+ never inline: parent routes to orchestrate, work-run executes within a lane. |
| "The suite's next step says use its planner" | ADR-005: redirect to the AE counterpart, cite it. |
| "I'll answer, then check the tier" | Triage and invoke first — before acting or clarifying. |
| "`run-current` returned null — not a parent, I'll run it here" | The seat decides, not the binding: in the repo's main worktree, M+ binds first, then orchestrates — never inline in the owner's checkout. |
