# Tracker plane

Sources: `docs/specs/SPEC-agent-engineering.md` Decision 8; `orca linear` CLI
help verified on-machine 2026-08-16; Linear's [Concepts](https://linear.app/docs/conceptual-model)
— an issue belongs to a team and can be added to a project; an initiative can
contain multiple projects — read 2026-08-19.

## Two planes, no double truth

- **The tracker (Linear) owns workflow state**: what needs doing, priority, who
  has it — Todo / In Progress / In Review / Done. Human coordination.
- **The repo owns verification state**: `not_started / active / blocked /
  passing` + evidence. A tracker cannot run commands; the repo can.
- **Gate rule** — an issue reaches Done only when the repo side says `passing`
  (evidence recorded). Never ahead.
- **Direction rules** — intent and priority flow tracker → repo (triage reads
  the tracker to pick work); execution truth flows repo → tracker (status and
  comments only after verification). Nobody hand-edits both planes for one fact.

## Linking affordances (both optional)

`issue: <KEY>` in a lane file's frontmatter, or the key in the lane slug
(`work/dem-101-checkout-fix/`); branch names may carry it too (Linear
branch-format autolinking). Either alone lets the skills (`work-handoff`,
triage loops) detect it; absence of both skips the tracker steps. Once per
workspace, point Linear's coding-tools prompt template at the standard — first
line `Read AGENTS.md first; tier per docs/tiers.md.` — so a session opened from
an issue starts inside it (ae-init reminds the owner at install).

## Connector: Orca CLI (primary)

Verified commands (all take `--json`; `--current` = the worktree's linked
issue, from `orca worktree create --linear-issue <KEY>`):

| Need | Command |
|---|---|
| Read | `orca linear issue <KEY>` (one issue's context) · `orca linear list --filter open\|assigned\|all [--team <key>] [--limit <n>]` (triage queue) · `orca linear team states` (exact workflow state names) |
| Write | `orca linear status set <KEY> --to "<exact state name>"` · `orca linear comment add <KEY> --body "<text>"` (multiline: `--body-file -`) · `orca linear create` / `save-issue` |

`--to` takes an exact state name (list them first). Default handoff target is
`"In Review"` when a human review step follows; `"Done"` only when terminal AND
passing (gate rule). A Linear MCP the session already carries writes the same
plane under the same declaration check — a second connector, not a second rung:
it does not restore tracker writes where Orca is absent (ADR-001, below).

## Which workspace — the repo declares, tools obey

Tool bindings are per-workspace (Linear MCP OAuth, the `orca linear` API key),
so a session can be bound to a workspace the repo does not track in — and the
write lands, invisibly, in the wrong place. The repo settles it once, in
writing:

```text
Tracker: Linear — workspace <slug> · team <KEY> [· project <name>][· initiative <name>]
```

One always-loaded line in the root AGENTS.md, directly under the `Standard:
AE/<version>` stamp, above the summary: `<slug>` is the URL slug (from
`linear.app/<slug>/…`), `<KEY>` the team key, both trailing segments optional
and independent; one with no answer is omitted entirely. The shape follows the
repo: a single-domain repo names `· project`, a deep monorepo `· initiative`,
leaving the projects to the domains below; the team stays single either way.

A nested AGENTS.md declares its domain's project with one line under its title:
`Tracker-project: <Name>` — the name only, no `Tracker-initiative:` variant.

Issues filed or read anywhere in that subtree belong to that project; workspace
and team are never repeated — they inherit from the nearest full `Tracker:`
above. No line ⇒ inherit everything, project included, and the line never earns
a directory a file of its own (nesting stays earned by non-inferable local
knowledge — `reference/context.md`). ae-init asks for the declaration once at
install, whenever a tracker is in play, and writes the answer verbatim — never
inferred from the live session, since the binding is exactly what can be wrong.
This is the format's single definition: other files cite it, never restate it.

**Before ANY tracker write** — status move, comment, attachment, create —
resolve the declaration governing the file by walking UP from it (nearest
`Tracker-project:` for the project, nearest full `Tracker:` above it for
workspace and team), then compare the live binding on the workspace slug in a
resolved issue's `url` (`linear.app/<slug>/issue/…`): `result.issue.url` on
reads, `result.issues[n].url` per list row — never the display fields
`workspaceName`/`workspaceId` or `workspace.name` under `result.meta.resolved`
(verified on-machine 2026-08-18). **Mismatch → NO write**: state it plainly —
declared workspace, resolved workspace, tracker NOT updated — then emit the
exact operation (command + payload) for the operator to run from a correctly
bound session; same contract when the binding will not resolve at all (fresh or
empty workspace, erroring read). Nothing lands in the wrong workspace silently.
With no full `Tracker:` line above the file the rule is inert — a
`Tracker-project:` line alone names no workspace, so nothing to compare.
Absence degrades cleanly.

## Without Orca

The no-Orca contract (`reference/orca.md`) applies: without an Orca session
there is no tracker write, whatever connector the session carries (ADR-001 —
the MCP is a connector, not a fallback rung). Emit the exact calls + payloads
for the operator and state plainly that the tracker was NOT updated. Never
claim a write without a confirmed call.

## The GitHub plane

PRs and PR review comments are GitHub-native (`gh pr comment`); GitHub
**issues** are not — the tracker is the single intake plane, so one filed there
is triaged INTO it, never worked from GitHub. Branch slugs carry the issue key
and the close PR's body carries `Closes <KEY>`, so the Linear↔GitHub workspace
app moves the issue on merge — the strongest repo → tracker truth; verify that
app is installed before relying on it (a connected account only attributes),
else move states via `orca linear`. Upstream feedback rides it too: an audit
tracing a finding to the standard labels it `upstream` and proposes the filing
(owner-approved, never automatic — `ae-audit`), and the triage loop sweeps
those issues into the standard's tracker. App install and who writes what:
`docs/how-it-works/integrations.md`.

## Non-negotiables

- Triage loops never move issues to Done (that path runs through work-verify →
  work-handoff).
- Tracker writes from loops default to report-only until the owner enables them.
- The standard never requires a tracker: every skill degrades cleanly to the
  no-tracker path, and a repo with no tracker runs the identical lifecycle.
