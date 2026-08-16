# Audit checklist

Every check derives from `reference/` in the Agent-Engineering repo
(principles.md, context.md, task-tiers.md, verification.md, skills.md).
Severities: **high** = wastes attention budget, fights model judgment, or
breaks the evidence chain; **medium** = budget/quality drift; **low** =
cosmetic. Checks marked (lint) are settled mechanically by agent-lint — the
audit only re-reports them.

## Contents

- AGENTS.md checks
- Pointer checks
- Duplication checks
- Structure checks
- Lane checks
- Feature list checks
- Skills checks
- Docs checks
- Design checks

## AGENTS.md checks (canonical file)

| Check | Pass condition | Severity |
|---|---|---|
| Line budget (lint) | Root ≤60 (cap 100); per-app ≤30 | medium |
| Stamp (lint) | `Standard: AE/<major>.<minor>` present, well-formed, current | medium |
| Inferable content | No file trees, framework explanations, facts derivable from code | high |
| Rules vs judgment | No taste rules; constraints are genuine safety only | high |
| Block structure (lint) | Summary → stamp → tier line → Commands → Gotchas → Hard constraints → optional Map | low |
| Commands verified | Commands plausible for the repo (lockfiles/scripts match) | medium |
| Map discipline | ≤8 lines, non-obvious locations only, signal not required reading | medium |
| Memory content | No session-learned facts hand-written in | medium |

## Pointer checks

| Check | Pass condition | Severity |
|---|---|---|
| Root CLAUDE.md (lint) | ≤3 lines, contains `@AGENTS.md` | high |
| Per-app CLAUDE.md (lint) | Same pointer shape per app dir | high |
| Global exception | `~/.claude`-style file (H1 `# Global instructions`) ≤40 lines, own canon | medium |

## Duplication checks

| Check | Pass condition | Severity |
|---|---|---|
| Per-tool adapters (lint) | No CODEX.md / GEMINI.md / .cursorrules / similar | high |
| Skill list in AGENTS.md | Repo skills NOT enumerated there (descriptions auto-load) | high |
| Cross-file repetition | No instruction appears in >1 of AGENTS.md / pointer / skills | high |

## Structure checks

| Check | Pass condition | Severity |
|---|---|---|
| Read orders (lint) | No "read X before doing anything" anywhere | high |
| Procedural prose | No recurring how-to workflows in entry files or docs (those are skills) | medium |
| Naming (lint) | ADR-NNN-<topic>.md, SPEC-<feature>.md | low |
| docs/ index (lint) | docs/README.md exists, one line per area, no content of its own | low |
| Monorepo | Per-app AGENTS.md (≤30) + pointer CLAUDE.md per app | medium |

## Lane checks

| Check | Pass condition | Severity |
|---|---|---|
| Lane shape (lint) | Every lane `work/<kebab-slug>/` with PLAN.md + PROGRESS.md | medium |
| Root artifacts (lint) | No SPEC/PLAN/PROGRESS/DECISIONS at repo root | medium |
| PROGRESS honesty | PROGRESS.md agrees with git log (no phantom "done", no unrecorded work) | medium |
| Stale lanes | No lane whose work merged long ago but folder never closed | low |
| SPEC ownership | Lane SPEC.md not edited by agent commits (owner-only) | high |

## Feature list checks

| Check | Pass condition | Severity |
|---|---|---|
| Schema (lint) | Rows match the triple schema; states from the enum | high |
| Evidence gate (lint) | `passing` rows carry non-null evidence | high |
| Regression (lint) | No row ever leaves `passing` | high |
| Verification realism | Each row's verification command actually exists/runs in this repo | medium |

## Skills checks (`.claude/skills/` or `skills/`)

| Check | Pass condition | Severity |
|---|---|---|
| Description quality | Third person; states what AND when (triggers) | medium |
| Body budget (lint) | SKILL.md <500 lines | medium |
| Reference depth | All references one level from SKILL.md | medium |
| Speculative skills | Every skill maps to a real recurring workflow | medium |
| Evals present | ≥3 evals per skill; evals change before content | medium |
| TOC | Reference files >100 lines start with contents list | low |

## Docs checks

| Check | Pass condition | Severity |
|---|---|---|
| Dead docs | Every doc referenced by an entrypoint/index/skill OR a rich reference (ADR, spec, test, rubric) | medium |
| ADRs | Never flag ADRs/specs as bloat — rich references by design | — |
| Prose conventions | No CODE-STYLE.md-type prose a linter enforces | medium |
| Diagrams | Mermaid, non-inferable topology only; no folder-structure diagrams | medium |

## Design checks (only for repos/apps with UI)

| Check | Pass condition | Severity |
|---|---|---|
| DESIGN.md presence | Every app with UI carries one (root or app root) | medium |
| Token consumption | Components use generated tokens; no raw hex/px duplicating a token | medium |
| Decisions honored | No `## Decisions` entry contradicted by current code | high |
| Compilation (lint) | Tokens edited only in frontmatter; `design.tokens.css` regenerated (`design-drift` clean) | medium |
| Mode discipline | Theme variants in frontmatter `modes`; components consume semantic tokens, never branch on theme | medium |
