# Agent-Engineering

The agent-engineering standard: one repo that defines, installs, and audits
how AI-agent work happens across all of my repositories — six layers,
runtime-neutral, model-agnostic.

| Layer | Question it answers |
|---|---|
| Context | what does the model see right now? |
| Memory | what survives between sessions? |
| Harness | what surrounds one run — tools, state, permissions, verification? |
| Loop | how does work repeat itself with feedback and a stop rule? |
| Graph | how do many loops coordinate — lanes, gates, reducers? |
| Cross-cutting | reducers between fan-out and synthesis; MCP as the tool standard |

## Architecture

Each directory answers exactly one question:

| Directory | Question | Status |
|---|---|---|
| `reference/` | what is the standard, and why? | live (loops P3, graphs P4) |
| `templates/repo/` | what gets installed in a consuming repo? | live |
| `skills/` | how does it replicate and get used day to day? | init + audit + work-* live |
| `scripts/` | what is checked mechanically, without judgment? | live |
| `global/` | what belongs in the global (`~/.claude`) layer? | live |
| `tests/` | how is the standard itself tested? | live |
| `docs/` | why did we decide this, and how does it all work? | live |

Deep dive: **`docs/how-it-works/`** — the living self-documentation of this
repo, updated as part of every change.

## The standard in one paragraph

A consuming repo carries a canonical `AGENTS.md` of ≤60 lines (what the repo
is, verified commands, real gotchas, genuine hard constraints, a version
stamp) plus a pointer `CLAUDE.md`, and a `docs/` tree of decision records
and rich-reference specs. Work above trivial size runs under explicit
ceremony scaled by tier (S/M/L): definition of done written first, one lane
of work in progress at a time, verification by command — never by
confidence — and clean-state handoffs. Everything an agent needs lives in
files, so any model or runtime can pick up any lane.

## Status

**AE/2.1 shipped (P2)** — the standard is installable and daily-usable:
`agent-init` sets up or migrates a repo, `agent-audit` + `agent-lint`
verify it, `work-verify` gates completion on command evidence, and
`work-handoff` closes or pauses lanes in a clean state (tracker-aware).
Next phases add loops (P3) and graphs/reducers (P4); the ladder, every
fixed decision, and acceptance criteria live in
`docs/specs/SPEC-agent-engineering.md`.

## License

MIT — see `LICENSE`.
