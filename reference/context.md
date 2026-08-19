# Context layer: entry files

Sources: [The new rules of context engineering](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)
(2026-07-24); [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
— the smallest high-signal token set; [AGENTS.md](https://agents.md), the open
standard stewarded by the Agentic AI Foundation (Linux Foundation) — nearest
file wins, and OpenAI's main repo carries 88 nested files;
[Claude Code memory](https://code.claude.com/docs/en/memory) — the CLAUDE.md
walk-up; `principles.md` in this directory. Retrieved 2026-08-16; the two
nesting sources 2026-08-18.

## Budgets

| File | Target | Hard cap |
|---|---|---|
| Root AGENTS.md (canonical) | ≤60 lines | 100 |
| Nested AGENTS.md (any depth) | ≤30 lines | 60 |
| CLAUDE.md (pointer, root or nested) | ≤3 lines | 3 |
| Global ~/.claude/CLAUDE.md | ≤40 lines | 40 |

## The canonical file: AGENTS.md

One canonical entry file per repo, readable by every runner (Claude Code via
the pointer, Codex/opencode/grok/dsh natively). Fixed structure:

1. **Title + summary (2-3 lines)** — what the repo is and its stack. Nothing
   the filesystem already says.
2. **`Standard: AE/<major>.<minor>`** — the version stamp, own line. This is
   what `ae-audit` compares against the current standard.
3. **Tier one-liner** — `Tiers: S direct+verify · M lane+plan · L four
   files+feature list — doubt → higher.`
4. **`## Commands`** — build/test/run/lint, only the ones that matter,
   **verified by running them** before they are written here.
5. **`## Gotchas`** — only non-inferable facts ("first boot takes ~40s").
6. **`## Hard constraints`** — only genuine safety rules; if violating it
   doesn't hurt, it doesn't belong.
7. **`## Map`** (optional, ≤8 lines) — non-obvious locations, phrased as
   signals, never as required reading. Delete when nothing qualifies.

## The pointer: CLAUDE.md

```markdown
@AGENTS.md
```

One line. Claude Code auto-loads CLAUDE.md and the `@` import pulls the
canonical file in; every other runner reads AGENTS.md directly. This keeps a
single source of truth with zero duplicated contracts — the per-tool adapter
ban stands.

The global layer is the one exception: `~/.claude/CLAUDE.md` (H1
`# Global instructions`, ≤40 lines) is its own canon — user identity, safety,
working style — and is not a pointer.

A fenced tool-managed block does not count against the line budget — the lint's
`pointer-shape` check settles what qualifies as one.

## Nesting: a directory earns its own file

AGENTS.md files nest at any depth — `apps/web/`, `packages/ui/core/`,
`services/billing/api/` — not one privileged `apps/*` level. A directory earns
its own file only when it holds **non-inferable local knowledge**: commands
that differ from the root's, gotchas that bite only inside that subtree.
Symmetry is never the reason. A sibling having one earns nothing here, and a
nested file that restates the root spends attention in every session that
touches the directory.

Each nested file is ≤30 lines — that subtree's commands and gotchas only, the
root still covers everything shared — and carries its own ≤3-line CLAUDE.md
pointer beside it. `agent-lint` applies both budgets to every non-root
AGENTS.md and every non-global CLAUDE.md, at any depth.

Precedence when two files disagree: **user prompt > nearest AGENTS.md >
ancestors** — nearest-wins. The agents.md standard defines it that way ("agents
automatically read the nearest file in the directory tree, so the closest one
takes precedence"); Claude Code lands on the same result mechanically, walking
up from the working directory and concatenating root-first so the nearest file
lands last in context, plus subtree files pulled in on demand once it opens
files there. So a nested file may contradict the root — deliberately, as the
more specific fact, never by accident.

## What never goes in entry files

- A list of the repo's skills (their descriptions auto-load — duplication).
- Session-learned facts (auto-memory owns those).
- Procedural workflows ("how to add an endpoint") — those are skills.
- Work-in-progress state (lanes own that: `work/<slug>/PROGRESS.md`).
- Anything that fails the "the model is already smart" test.

## Global vs repo placement

- **Global (`~/.claude`)** = facts about the USER: language/tone, safety
  rules, universal working style, cross-repo skills.
- **Repo (AGENTS.md, `.claude/`)** = facts about the PROJECT: commands,
  gotchas, constraints, project workflows as repo skills.
- **Auto-memory** = session-learned facts, at either level. Never hand-write
  memory content into entry files.

The duplication test: would the same line appear in more than one repo's
AGENTS.md? → global (or nowhere). Only matters to one project? → never
global. About neither the user nor one project? → a skill, or nothing.

## Legacy anti-patterns

| Anti-pattern | Why it fails | Replacement |
|---|---|---|
| Per-tool adapters (CODEX.md, GEMINI.md, .cursorrules) | N× maintenance, drift | One canonical AGENTS.md + one pointer |
| Mandatory read orders | Burns attention budget upfront | Just-in-time discovery + Map |
| "10 non-negotiable rules" lists | Taste masquerading as safety fights judgment | Gotchas + genuine hard constraints |
| Prose conventions docs (CODE-STYLE.md) | Restates what linters enforce | Linters, or a skill if truly procedural |
| v1 layout: canonical CLAUDE.md, stub AGENTS.md, no stamp | Invisible version drift; Claude-only canonical | The v2 flip + stamp (`ae-init` migrates) |
