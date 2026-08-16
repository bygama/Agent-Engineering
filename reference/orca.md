# Orca mapping

Source: Orca CLI help output (`orca --help`, subcommand `--help` pages),
verified on-machine 2026-08-16. Orca is the preferred executor of this
standard and never a dependency: every mapping names its no-Orca fallback
(spec Decision 9).

## The mapping table

| Standard concept | Orca primary | No-Orca fallback |
|---|---|---|
| Lane in isolation | `orca worktree create` (child worktree; `--linear-issue <KEY>` links the tracker) | `git worktree add ../<slug> -b <branch>` |
| Long-lived process (dev server, watcher) | `orca terminal create --worktree <sel> --command "<cmd>" --title "<name>"`; read with `orca terminal read` | separate shell/tab owned outside the agent session |
| DAG of tasks + gates | `orca orchestration run-create` → `task-create` → `dispatch`; messages via `send`/`check`/`reply` | plan doc with task list + manual gate commands between steps |
| Loop / schedule | `orca automations create --name <n> --trigger <preset\|cron\|RRULE> --prompt "<run protocol>" --provider <agent> [--precheck <cmd>] [--repo <sel>] [--workspace-mode new-per-run]`; `run` fires now; `runs` lists history | `/loop`, `/schedule`, OS cron / Task Scheduler |
| Tracker connector | `orca linear …` (see `reference/tracker.md`) | Linear MCP server or plain API |

## Automation notes (verified flags)

- Triggers: `hourly`, `daily`, `weekdays`, `weekly` (+ `--day 0-6`
  `--time HH:MM` `--timezone <IANA>`), 5-field cron, or RRULE.
- `--precheck <command>` gates the run cheaply — the loop's queue-empty
  check belongs here so empty runs cost nothing.
- `--workspace-mode new-per-run` gives each run a fresh worktree
  (isolation for runs that mutate files); `existing` reuses one.
- `--enabled`/`--disabled` at create time; register loops disabled unless
  the owner explicitly says go.
- The automation `--prompt` should point at the loop artifact ("follow
  `loops/<name>.md`"), never duplicate it — one contract, any runner.

## Worktree and terminal notes

- One lane ⇔ one worktree: per-lane `work/<slug>/` folders exist so
  parallel worktrees never collide on shared root files.
- Never run a dev server as a background shell inside an agent session —
  it blocks the session's idle transition and dies with it. Terminal tabs
  (`orca terminal create`) outlive the session; that is the point.
- Spawn-command inheritance is machine policy (which account/CLI a child
  agent uses); it lives in the global layer (`~/.claude/CLAUDE.md`), not
  in repos.

## When there is no Orca

Nothing in a consuming repo may assume Orca exists: lanes are plain
folders, loops are plain files, and each row's fallback column is a full
substitute. A repo authored on an Orca machine runs unchanged on a
cron-and-git-worktree machine.
