# Tracker plane

Sources: `docs/specs/SPEC-agent-engineering.md` Decision 8;
[Linear MCP server](https://linear.app/docs/mcp); `orca linear` CLI help
output verified on-machine 2026-08-16. The tracker is optional by
construction — a repo with no tracker runs the identical lifecycle.

## Two planes, no double truth

- **The tracker (Linear) owns workflow state**: what needs doing, priority,
  who has it — Todo / In Progress / In Review / Done. Human coordination.
- **The repo owns verification state**: `not_started / active / blocked /
  passing` + evidence. A tracker cannot run commands; the repo can.

Two rules join them:

- **Gate rule** — an issue moves to Done only when the repo side says
  `passing` (evidence recorded). Never ahead.
- **Direction rules** — intent and priority flow tracker → repo (triage
  reads the tracker to pick work); execution truth flows repo → tracker
  (status changes and comments happen only after verification passes).
  Nobody hand-edits both planes for the same fact.

## Linking affordances (both optional)

- `issue: <KEY>` in a lane file's frontmatter.
- The key in the lane slug: `work/dem-101-checkout-fix/`.
- Branch names may carry the key for Linear's branch-format autolinking.

Either alone is enough for the skills (`work-handoff`, triage loops) to
detect the link; absence of both simply skips the tracker steps.

## Connector: Orca CLI (primary)

Verified commands (each supports `--json`; `--current` targets the Linear
issue linked to the enclosing Orca worktree):

| Need | Command |
|---|---|
| Read one issue's context | `orca linear issue <KEY>` |
| Triage queue | `orca linear list --filter open\|assigned\|all [--team <key>] [--limit <n>] --json` |
| Move status | `orca linear status set <KEY> --to "<exact state name>"` |
| Comment (evidence, triage) | `orca linear comment add <KEY> --body "<text>"` (multiline: `--body-file -`) |
| Workflow state names | `orca linear team states` |
| Create / update issues | `orca linear create` / `save-issue` |
| Link a worktree to an issue | `orca worktree create --linear-issue <KEY>` |

State names passed to `--to` must match the team's workflow exactly —
list them first. Default handoff target is `"In Review"` when a human
review step follows; `"Done"` only when terminal AND passing (gate rule).

## Fallbacks, honest at every rung

1. No Orca → the **Linear MCP server** (official; issue read/comment/status
   tools) from any MCP-capable runner.
2. No MCP → plain Linear API (GraphQL) with the same gate/direction rules.
3. Nothing available → emit the exact calls + payloads for the operator
   and state plainly that the tracker was NOT updated. Never claim a write
   without a confirmed call.

## Non-negotiables

- Triage loops never move issues to Done (that path runs through
  work-verify → work-handoff).
- Tracker writes from loops default to report-only until the owner
  enables them.
- The standard never requires a tracker: every skill degrades cleanly to
  the no-tracker path.
