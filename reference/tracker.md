# Tracker plane

Sources: `docs/specs/SPEC-agent-engineering.md` Decision 8; `orca linear`
CLI help output verified on-machine 2026-08-16. The tracker is optional by
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

## Without Orca

The no-Orca contract (`reference/orca.md`) applies: tracker writes are
Orca-only. Emit the exact calls + payloads for the operator and state
plainly that the tracker was NOT updated. Never claim a write without a
confirmed call.

## The GitHub plane

PRs and PR review comments are GitHub-native: agents open PRs, answer
review comments, and comment on PRs (`gh pr comment`) as part of normal
work. GitHub **issues** are not intake — the tracker is the single
intake plane; an issue filed on GitHub gets triaged INTO the tracker,
never worked from GitHub. Two affordances bridge the planes: branch
slugs carry the issue key (autolink), and the close PR's body carries
`Closes <KEY>` so a connected Linear↔GitHub integration moves the issue
on merge — the strongest repo → tracker truth. Verify the integration is
actually active (integration-native PR activity on an issue) before
relying on it; absent that, attach and move states via `orca linear`.

## Non-negotiables

- Triage loops never move issues to Done (that path runs through
  work-verify → work-handoff).
- Tracker writes from loops default to report-only until the owner
  enables them.
- The standard never requires a tracker: every skill degrades cleanly to
  the no-tracker path.
