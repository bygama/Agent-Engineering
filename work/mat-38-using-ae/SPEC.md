---
issue: MAT-38
---
# using-ae — spec

<!-- Owner-written. The agent never edits this file. -->

Done looks like: AE has its own entry skill, kept small enough to live
in every session's context, plus the canonical hook that injects it at
SessionStart. Ships together with work-plan as AE/1.2.0 (owner
direction: one coherent set — AE owns its process end to end).
Workstation wiring is MAT-39, not this lane.

## 1. The skill (`skills/using-ae/`)

Body ≤80 lines TOTAL — it is always-loaded; every line costs tokens in
every session. Content, nothing more:

- **The entry rule**: work arrives → triage the tier
  (`docs/tiers.md` / `reference/task-tiers.md`) → invoke the AE skill
  that owns the phase BEFORE acting (including before clarifying
  questions about execution shape).
- **The map** (one line each): work-plan (an approved design needs its
  lane SPEC/PLAN) → relay (a lane's PLAN executes) → work-verify (any
  "done" claim) → work-handoff (closing or pausing); fan-out (≥2
  independent lanes / XL); loop-setup (recurring work); agent-init
  (installing/migrating a repo); agent-audit (measuring one).
- **The precedence rule** (ADR-005): artifact-producing phases are
  AE's — a suite skill may think (brainstorming, TDD,
  systematic-debugging), but plans land in the lane via work-plan,
  execution is relay's, endings are work-handoff's. When a suite chain
  pushes toward its own executor/planner/finisher, redirect to the AE
  counterpart.
- **A red-flags mini-table** (3-4 rows max): "this is too small for a
  lane" → tier says, not vibes; "I'll just execute inline" → relay
  owns M+ lanes when subagents exist; "the suite's next step says use
  its planner" → ADR-005 precedence.
- Description (frontmatter): what + when, third person, triggers on
  session start / "how do I work here" / any incoming task in an
  AE-standard repo.

## 2. The hook (`global/hooks/using-ae.ps1`)

Canonical in AE `global/hooks/` (orca-probe pattern; workstation
installer applies it — MAT-39). Behavior:

- Locates the skill via the junction, relative to its own installed
  location: `~/.claude/hooks/using-ae.ps1` →
  `~/.claude/skills/using-ae/SKILL.md` (no env vars, no hardcoded
  user paths; `$PSScriptRoot`-relative).
- Emits the SKILL.md content verbatim under one header line — the
  skill file is the single source of truth; no separate digest to
  drift.
- Skill absent (not yet junctioned) → emits nothing, exit 0. Never
  fails the session start.

## 3. Amendments (same change, hard constraint)

- README: "The eight skills" → "The nine skills"; using-ae row in the
  table (entry point, always-loaded); one chain-paragraph line naming
  it the entry point that routes to the rest.
- `reference/skills.md`: one line in the composing section — using-ae
  is the always-loaded entry point carrying the precedence rule.
- The `docs/how-it-works/` chapter that documents the skills surface
  (implementer verifies which one covers it; likely
  standard-lifecycle.md) gains the using-ae mention.

## 4. Evals (before content, ≥3)

- eval-01 entry: in a session where using-ae is loaded, work arrives
  ("add an export endpoint") → the agent names the tier and invokes
  the owning AE skill (work-plan or relay path) BEFORE acting or
  exploring; no ad-hoc execution.
- eval-02 precedence: a superpowers chain step points at its own
  executor/planner ("brainstorming says invoke writing-plans") → the
  agent redirects to the AE counterpart citing ADR-005, without
  disabling the suite's thinking skills.
- eval-03 hook: running the hook with the skill junctioned emits the
  SKILL.md content under the header; with the skill absent it emits
  nothing and exits 0.

## 5. Order

U1 evals → U2 SKILL.md (≤80 lines) → U3 hook + amendments → shared
release train with mat-33 (gates, release MINOR 1.2.0 covering both,
work-verify, handoff, one PR closing MAT-33 and MAT-38).
