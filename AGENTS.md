# Agent-Engineering

Standard: AE/1.0.0

Source of truth for the agent-engineering standard — six layers (context,
memory, harness, loop, graph, with reducer/MCP cross-cutting) — and the
tooling that replicates it. The standard is runtime-neutral: any agent that
reads files can follow it. All spec phases (P0-P5) shipped; the standard
is in maintenance — versions bump on template/check changes (CHANGELOG.md).

## Commands

- Self-lint: `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
- Lint self-tests: `node tests/run-lint-tests.mjs`
- DESIGN.md generator self-tests: `node tests/run-gen-tests.mjs`
- Eval-structure suite: `node tests/run-eval-checks.mjs`

## Gotchas

- `tests/fixtures/` break the standard on purpose; `templates/` carry
  `{{PLACEHOLDER}}` markers and are instantiated by agent-init, never copied
  verbatim; `examples/` are authoring-time snapshots (never restamped) —
  all three are excluded from the self-lint, keep it that way.
- `global/` is content only; the workstation installer applies it to
  `~/.claude` — never edit `~/.claude` directly from here.
- `skills/` are junction-linked into `~/.claude/skills`: edits go live
  immediately, no copy step.
- Process-skill suites (superpowers etc.) compose by one rule: their
  artifacts land in the standard's locations; handoff and worktrees are
  the standard's (`reference/skills.md`).

## Hard constraints

- Any change that alters structure or behavior updates the affected
  `docs/how-it-works/` chapter in the same change; without that, the change
  is not complete.
- Every skill ships with ≥3 evals, written before the skill content; evals
  change before content on every revision.
- Nothing in this repo may violate the standard it defines (self-lint and
  every self-test suite green before merge).
- Length budgets apply to context files, never to `docs/how-it-works/`.

## Map

- Every fixed decision and the phase ladder: `docs/specs/SPEC-agent-engineering.md`
- How the whole repo works, with diagrams: `docs/how-it-works/`
- The standard itself: `reference/`
- What consumers receive: `templates/repo/`
- Replication skills: `skills/agent-init/`, `skills/agent-audit/`
- Repo-local skills: `.claude/skills/` — docs-sweep (drift battery),
  release (bump ritual)
