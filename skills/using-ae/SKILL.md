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

- **work-plan** — an approved design needs its lane's SPEC/PLAN.
- **work-run** — a lane's PLAN executes, step by step.
- **work-verify** — any "done" claim needs evidence.
- **work-handoff** — closing or pausing a lane.
- **fan-out** — two or more independent lanes, or XL.
- **loop-setup** — work that repeats on a cadence or event.
- **agent-init** — installing or migrating a repo onto the standard.
- **agent-audit** — measuring a repo against the standard.

## Precedence (ADR-005)

Artifact-producing phases are AE's: plan (work-plan), execute (work-run),
verify (work-verify), close (work-handoff). A process suite (e.g.
superpowers) may still think — brainstorming, TDD, systematic-
debugging stay composable — but when its chain points at its own
planner/executor/finisher next, redirect to the AE counterpart and
cite ADR-005 (`docs/adrs/ADR-005-artifact-phases.md`); never disable
the suite's thinking skills, only supersede its artifact machinery.

## Red flags

| Thought | Reality |
|---|---|
| "Too small for a lane" | The tier decides (`reference/task-tiers.md`), not a feeling. |
| "I'll just execute this inline" | work-run owns M+ lanes wherever subagents exist. |
| "The suite's next step says use its planner" | ADR-005: redirect to the AE counterpart, cite it. |
| "I'll answer, then check the tier" | Triage and invoke first — before acting or clarifying. |
