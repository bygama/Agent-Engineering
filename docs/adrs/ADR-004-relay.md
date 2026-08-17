# ADR-004: relay — the standard owns lane execution

Date: 2026-08-17
Status: Accepted <!-- Amends SPEC Decision 7 (L-tier ceremony note) -->

## Context

Process-skill suites compose under one rule (`reference/skills.md`):
they supply the thinking, the standard owns locations and endings. That
held for brainstorming and planning, but execution had no house
counterpart: superpowers' recommended executor (subagent-driven
development — fresh subagent per task, review between tasks) ships its
own workspace, ledger, rulings file, and spec authority, which collide
1:1 with the lane's PROGRESS, DECISIONS, and SPEC. Composing two
protocols over the same information is permanent friction, and the
suite's internal chain steers agents into its own executor. Meanwhile
the insight is real and worth owning: stateless subagents need a
constructed context package — and the lane already IS that package.

## Decision

Add `skills/relay`: sequential execution of one lane with a fresh
implementer subagent per PLAN step, per-step review (maker ≠ checker),
a capped fix loop (5 rounds, escalating model), and rulings recorded in
DECISIONS.md. The lane is the entire dispatch package — no extracted
briefs, no scratch workspace, no separate ledger. relay ships no final
review: work-verify remains the lane gate, work-handoff the ending.

Normative force: recommended default at L, available at M with several
steps, usable by an XL worker inside its own lane, never mandatory —
the standard stays runtime-neutral; a runner without subagents executes
the same lane inline under the same ceremony. Suites' executors and
finishers are superseded in writing (`reference/skills.md`).

## Consequences

- The execution pair becomes symmetric: fan-out = parallel across
  lanes; relay = sequential within a lane. Both hand workers the same
  artifact, making relay subagents indistinguishable from fan-out
  workers (MAT-29's goal).
- `reference/skills.md` gains the supersession paragraph;
  `reference/task-tiers.md` L row names relay as the recommended
  executor; README documents the skill chain.
- WIP=1 tightens explicitly to inside-the-lane: one implementer in
  flight; parallel implementers are refused.
- Dogfood pending: first production relay run on the bygama/skills
  migration lanes (MAT-30).

## Alternatives considered

- Compose superpowers SDD via location mapping (ledger→PROGRESS,
  rulings→DECISIONS) — rejected: their SKILL.md hardcodes its workspace
  and scripts; every session re-reconciles two protocols, and plugin
  updates break the mapping silently.
- Whole-lane dispatch (subagent = one lane, sequentially) — rejected:
  loses per-step review and per-step model selection, the machinery
  that makes SDD strong.
- Mandatory at L (as superpowers 5 made it) — rejected: hardens before
  local evidence exists and breaks runtime neutrality.
