# Agent-Engineering

Standard: AE/2.0

Source of truth for the agent-engineering standard — six layers (context,
memory, harness, loop, graph, with reducer/MCP cross-cutting) — and the
tooling that replicates it. The standard is runtime-neutral: any agent that
reads files can follow it.

## Commands

- No build/test tooling yet. `agent-lint` and its self-tests arrive in P1;
  until then verification is manual review against
  `docs/specs/SPEC-agent-engineering.md`.

## Hard constraints

- Any change that alters structure or behavior updates the affected
  `docs/how-it-works/` chapter in the same change; without that, the change
  is not complete.
- Every skill ships with ≥3 evals, written before the skill content.
- Nothing in this repo may violate the standard it defines.
- Length budgets apply to context files (this file ≤60 lines, CLAUDE.md ≤3),
  never to `docs/how-it-works/`.

## Map

- Phase ladder and every fixed decision: `docs/specs/SPEC-agent-engineering.md`
- How the whole repo works, with diagrams: `docs/how-it-works/`
- The standard itself: `reference/` (P1)
- What consumers receive: `templates/repo/` (P1)
- Replication and daily-use skills: `skills/` (P1+)
- Mechanical checks: `scripts/` (P1)

## Status

P0 — foundation. Directories above marked (P1)/(P1+) do not exist yet;
they materialize in the phase that owns them.
