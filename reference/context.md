# Context layer: entry files

Sources: [The new rules of context engineering](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)
(2026-07-24); `principles.md` in this directory. Retrieved 2026-08-16.

## Budgets

| File | Target | Hard cap |
|---|---|---|
| Root AGENTS.md (canonical) | ≤60 lines | 100 |
| Per-app AGENTS.md (monorepo) | ≤30 lines | 60 |
| CLAUDE.md (pointer, root or per-app) | ≤3 lines | 3 |
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
ban stands. Monorepos repeat the pattern per app: `apps/x/AGENTS.md` (≤30
lines, that app's commands and gotchas only) + `apps/x/CLAUDE.md` pointer.

The global layer is the one exception: `~/.claude/CLAUDE.md` (H1
`# Global instructions`, ≤40 lines) is its own canon — user identity, safety,
working style — and is not a pointer.

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
