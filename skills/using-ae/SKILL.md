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

A **Run-bound session** (`orca orchestration run-current` returns a live
Run) is a parent orchestrator: M+ routes to `orchestrate`, which births a
child rather than the parent shaping or implementing inline. A
**dispatch-bound session** (spawned via `worker-start` — the child
orchestrate births) uses the map above exactly as written, tier by tier.
No bound Run ⇒ not a parent ⇒ the map applies as written too.

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
