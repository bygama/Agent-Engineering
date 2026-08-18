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
- When the workspace groups repos as Linear projects (one project per
  repo), issues born from a repo's flow carry that repo's project — the
  team stays single, the per-repo view comes from the project.

Either alone is enough for the skills (`work-handoff`, triage loops) to
detect the link; absence of both simply skips the tracker steps.

Operator setup, once per workspace: point Linear's coding-tools prompt
template at the standard — first line `Read AGENTS.md first; tier per
docs/tiers.md.` — so any session opened from an issue starts inside the
standard. ae-init reminds the owner of this when installing a repo in
a tracker-connected workspace.

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

## Which workspace — the repo declares, tools obey

Tool bindings are per-workspace (Linear MCP OAuth, the `orca linear` API
key), so a session can be bound to a different workspace than the repo
tracks in — and the write lands, invisibly, in the wrong place. The repo
settles it once, in writing:

```text
Tracker: Linear — workspace <workspace> · team <KEY> · project <project>
```

One always-loaded line in AGENTS.md, directly under the `Standard:
AE/<version>` stamp and above the summary. `<workspace>` is the URL slug
(the `<slug>` in `linear.app/<slug>/…`), `<KEY>` is the team key, and the
`· project <project>` segment is omitted entirely when the repo has none.
ae-init asks for it once at install, whenever a tracker is in play, and
writes the answer verbatim — never inferred from the live session, since
the binding is exactly what can be wrong. This is the format's single
definition: other files cite this section, they do not restate it.

**Before ANY tracker write** — status move, comment, attachment, issue
create — compare the live binding against the declaration:

- Compare on the workspace slug in any resolved issue's `url`
  (`linear.app/<slug>/issue/…`) — the identity the declaration names.
  `orca linear issue <KEY> --json` returns it in the envelope's
  `result.meta.resolved`, and `orca linear list … --json` carries a
  `url` per row too. Do NOT compare `result.meta.resolved.workspaceName`
  or a list row's `workspace.name` — both are the workspace's display
  name and need not equal its slug (verified on-machine 2026-08-18).
- **Mismatch → NO write.** State it plainly — declared workspace,
  resolved workspace, and that the tracker was NOT updated — then emit
  the exact operation (command + payload) for the operator to run from a
  correctly bound session. Same pattern as the no-Orca contract below:
  different reason, identical contract. Nothing lands in the wrong
  workspace silently. Same treatment when the binding cannot be resolved
  at all — no issue to read (fresh or empty workspace) or an erroring
  read: no write, state it, emit the operation.
- **No declaration line → the rule is inert.** Repos that predate the
  declaration, and repos whose owner answered "none", behave exactly as
  they did before. Absence degrades cleanly.

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
on merge — the strongest repo → tracker truth. Two integration levels
exist and only one automates (Linear docs, read 2026-08-17): a
user-level "Connected account" is attribution only; the **workspace
GitHub app** (Settings → Integrations → GitHub, installed on the org by
an org owner) is what links PRs and moves states, with the moves
configured per team (Workflows & automations → Pull request; defaults:
PR opened → In Progress, merged → Done). Verify the app is actually
installed (integration-native PR activity on an issue) before relying on
it; absent that, attach and move states via `orca linear`.

The plane also carries **upstream feedback**. When an audit in a
consuming repo traces a finding to the standard itself, the report
labels it `upstream` and proposes the filing — into the standard's
tracker team (project `Agent-Engineering`) on machines that carry its
workspace, or
`gh issue create --repo bygama/Agent-Engineering` for everyone else —
owner-approved, never automatic (`ae-audit`, Upstream findings). The
public repo ships an "Upstream report" issue template shaped for these
reports (stamp, kind, evidence). On the standard's side the triage loop
sweeps open GitHub issues into the tracker (mirror issue + a "tracked
as <KEY>" comment), so external reports run the same pipeline as
internal work.

## Non-negotiables

- Triage loops never move issues to Done (that path runs through
  work-verify → work-handoff).
- Tracker writes from loops default to report-only until the owner
  enables them.
- The standard never requires a tracker: every skill degrades cleanly to
  the no-tracker path.
