# Loop: issue-triage

Triage new Linear issues in the bygama workspace: assign a task tier and
record it, so intake is never a pile.

## Loop filter (why this qualifies)

- Repeats: on new issues (checked each weekday)
- Automated check: queue read exits 0; each triage is a recorded note
- Waste absorbed: an empty run costs one queue call
- Real tools: `orca linear` CLI, workspace connected 2026-08-16

## Stopping rule

Stop when the open-issue queue is empty or the per-run budget is spent;
skip the run when the Linear connector is unreachable.

## Gate

- `orca linear list --filter open --json` — verified 2026-08-16, exit 0

## Budget

- Runs: 1 per weekday
- Items per run: 5 issues
- Failure budget: 2 consecutive failed runs ⇒ disable + report to a human

## State

- File: `loops/issue-triage.state.json` — runtime artifact, gitignored;
  missing ⇒ the run initializes it. Per-machine state: this loop's
  trigger runs from one machine only.
- Shape: `{ "last_run": null, "processed": [], "consecutive_failures": 0 }`

## Trigger

- Primary: `orca automations create --name issue-triage --trigger weekdays
  --time 09:30 --prompt "Follow loops/issue-triage.md in this repo"
  --provider claude --repo path:C:/Briar/repos/mine/Agent-Engineering
  --precheck "orca linear list --filter open --json"`
- Fallback (no Orca): `/schedule` weekdays + Linear MCP for the queue
- Writes: report-only until the owner enables them (then the triage lands
  as `orca linear comment add <KEY> --body "triage: tier M — <reason>"`)

## Run protocol

1. Read the state file (missing ⇒ initialize with the shape above).
2. Precheck the queue: `orca linear list --filter open --json` — empty ⇒ stop.
3. Take at most 5 issues whose keys are not in `processed`.
4. Per issue: read context (`orca linear issue <KEY>`), assign S/M/L per
   `reference/task-tiers.md` — or flag non-repo items (onboarding cards,
   duplicates) with a suggested disposition. Record the triage (report, or
   comment when writes are enabled). Never move any issue to Done from
   this loop — that path runs through work-verify → work-handoff (gate
   rule).
5. Update state (processed keys, `last_run`, failure count).
6. Stop per the stopping rule.
