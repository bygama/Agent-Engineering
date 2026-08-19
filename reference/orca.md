# Orca mapping

Source: Orca CLI help output and the version-matched guide
(`orca skills get orca-cli`), verified on-machine 2026-08-16. Orca is the
executor of this standard (ADR-001): artifacts and quality gates are
runner-neutral files; execution features are Orca's.

## The probe — step 0 of every executing skill

Resolve the executable once per session (rules from the `orca-cli` stub):
`ORCA_CLI_COMMAND` env var if set → `orca-dev` in dev checkouts exposing
`ORCA_DEV_REPO_ROOT` → `orca-ide` on Linux outside Orca-managed terminals
(bare `orca` there is usually the GNOME screen reader) → `orca`. Then:

```text
ORCA status --json    # exit 0 + "ok": true ⇒ Orca session
```

(`ORCA` is the resolved executable — substitute it, never run it
literally.)

Anything else ⇒ the no-Orca contract below. The response's `capabilities`
array supports feature-level detection when a skill needs it; the same
command is the natural automation `--precheck`.

On machines with the global layer installed, a session-start hook
(`global/hooks/orca-probe.ps1`) already injected the result as an
`ORCA: available|unavailable` context line — citing that line satisfies
step 0; re-run the probe only when the line is absent.

## The no-Orca contract

Without Orca an agent may do everything that is a file: read and write
lanes, run gates, append PASS blocks, execute one manual iteration of any
loop. It may not schedule, parallelize with managed worktrees, or write to
the tracker. On hitting an Orca-only step it declares it explicitly —
"no Orca — <step> was NOT done; needs an Orca session or the operator" —
and continues with what remains. Never silently skipped, never faked.

## The mapping table

| Standard concept | Orca command (verified) |
|---|---|
| Lane in isolation | `orca worktree create` (`--parent-worktree active` for children; `--linear-issue <KEY>` links the tracker) |
| Worker spawn (orchestrate, supervised) | `orca orchestration worker-start --task <id> --worktree new-child` — full Task+Dispatch+launch provenance for a child the parent supervises by mailbox; distinct from the unsupervised full-transfer form below |
| Worker follow-up | the single `startupTerminal.handle`: `orca terminal wait --terminal <h> --for tui-idle --timeout-ms <ms>`, then `orca terminal send --terminal <h> --text "…" --enter`; stale handle ⇒ re-list, never dual-send |
| Lane visibility | `orca worktree set --worktree active --comment "<checkpoint>"` at PROGRESS state changes; `--workspace-status in-progress\|in-review\|completed` mirrors the lane lifecycle |
| Coordinator↔workers (XL) | `orca orchestration` — task DAGs, dispatch, inbox/reply; a worker reads mail with `orca orchestration check --unread --inject`. Never ad-hoc `terminal send` for structured coordination |
| Full lane transfer | `orca worktree create --no-parent --agent <id> --prompt "<brief>"`, then stop monitoring; never `task-create` for a full handoff (task rows are supervised orchestration) |
| Long-lived process | `orca terminal create --worktree <sel> --command "<cmd>" --title "<name>"`; read with `orca terminal read` (cursor reads for long output) |
| Loop / schedule | `orca automations create --name <n> --trigger <preset\|cron\|RRULE> --prompt "follow loops/<name>.md" --provider <agent> [--precheck <cmd>] [--repo <sel>] [--workspace-mode new-per-run] --disabled` — enable only on explicit go |
| Tracker | `orca linear …` (see `reference/tracker.md`) |
| E2E surface (web) | built-in browser: `orca goto/snapshot/click/wait --json` — the named L3 tool for web-facing work on an Orca machine (criterion below) |
| Report publishing | `orca artifacts share <file>` — gated by a human-granted device capability; on `artifact_sharing_disabled` deliver the file locally, do not retry |

## The browser criterion

Default: Orca's embedded browser (`orca goto/snapshot/click/wait --json`).
It lives in the app, so it outlives the agent session and never blocks a
card's working→idle transition — whatever else is installed, everything it
already does (navigate, snapshot, click, wait) goes through it.

Playwright, chrome-devtools and claude-in-chrome each drive a long-lived
process of their own. One of them is justified only when BOTH hold:

- the need is a capability Orca's browser lacks — performance traces, heap
  snapshots, a11y audits, device emulation; and
- the session is an owner terminal that can afford a long-lived process —
  never a supervised child, whose browser discipline stays absolute
  (`skills/orchestrate/references/dispatch-child.md`).

Convenience, habit, and "it is already installed" are not lacked
capabilities.

## Automation notes (verified flags)

- Triggers: `hourly`, `daily`, `weekdays`, `weekly` (+ `--day 0-6`
  `--time HH:MM` `--timezone <IANA>`), 5-field cron, or RRULE.
- `--precheck <command>` runs a command ahead of the agent — the natural
  home for the loop's queue-empty check. Its exact skip semantics are not
  documented in the CLI help; verify on first use, and keep the same check
  in the run protocol so the loop is correct on any trigger.
- `--workspace-mode new-per-run` gives each run a fresh worktree
  (isolation for runs that mutate files); `existing` reuses one.
- Create automations `--disabled`; enable only on the owner's explicit go.
- The automation `--prompt` points at the loop artifact ("follow
  `loops/<name>.md`"), never duplicates it — one contract, any trigger.

## Worktree and terminal notes

- One lane ⇔ one worktree: per-lane `work/<slug>/` folders exist so
  parallel worktrees never collide on shared root files.
- Prefer agent-first create for agent workers: bare `worktree create`
  plus a later `terminal create --command <agent>` is the anti-pattern —
  it can leave an unused fallback shell. `--agent` owns the first
  terminal.
- Never run a dev server as a background shell inside an agent session —
  it blocks the session's idle transition and dies with it. Terminal tabs
  (`orca terminal create`) outlive the session; that is the point.
- Spawn-command inheritance is machine policy (which account/CLI a child
  agent uses); it lives in the global layer (`~/.claude/CLAUDE.md`), not
  in repos. When that policy forces the two-step spawn (bare create +
  `terminal create --command`), a fallback shell may appear — close it
  after confirming it is unused.
- Spawn briefs are short and point at artifacts (the issue, the lane) —
  `terminal send` truncates long inline briefs.
- Decommission workers after the merge: close their terminals and
  `orca worktree rm` the child worktree once its branch merged and the
  card is completed — an idle agent on a completed card is debris.
