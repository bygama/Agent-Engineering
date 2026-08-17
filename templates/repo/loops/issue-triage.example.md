<!-- Worked example of LOOP.md.template: the issue-triage loop. -->

# Loop: issue-triage

Triage new tracker issues: assign a task tier and record it, so intake is
never a pile.

## Loop filter (why this qualifies)

- Repeats: on new issues (checked hourly)
- Automated check: queue read exits 0; each triage is a recorded comment
- Waste absorbed: empty runs cost one precheck call
- Real tools: `orca linear` CLI, workspace connection verified

## Stopping rule

Stop when the open-issue queue is empty or the per-run budget is spent;
skip the run when the Linear connector is unreachable.

## Gate

- `orca linear list --filter open --json` — verified <date>, exit 0

## Budget

- Runs: 24/day (hourly, precheck-gated)
- Items per run: 5 issues
- Failure budget: 2 consecutive failed runs ⇒ disable + report to a human

## State

- File: `loops/issue-triage.state.json` — runtime artifact, gitignored;
  missing ⇒ the run initializes it. Note: per-machine state — run this
  loop's trigger from one machine, or already-triaged keys re-process.
- Shape: `{ "last_run": null, "processed": [], "consecutive_failures": 0 }`

## Trigger

- Primary: `orca automations create --name issue-triage --trigger hourly
  --prompt "Follow loops/issue-triage.md" --provider claude
  --precheck "orca linear list --filter open --json" --repo path:<repo>
  --disabled` (enabled only on the owner's explicit go)
- Manual fallback: "run one iteration of `loops/issue-triage.md`" to any
  agent — works with or without Orca (without it, the queue read is
  declared NOT reachable per the no-Orca contract)
- Writes: report-only until the owner enables them (then the triage lands
  as `orca linear comment add <KEY> --body "triage: tier M — <reason>"`)

## Run protocol

1. Read the state file (missing ⇒ initialize with the shape above).
2. Precheck the queue: `orca linear list --filter open --json` — empty ⇒ stop.
3. Take at most 5 issues whose keys are not in `processed`.
4. Per issue: read context (`orca linear issue <KEY>`), assign S/M/L/XL
   per `docs/tiers.md`, record the triage (report, or comment when
   writes are enabled). Never move any issue to Done from this loop —
   that path runs through work-verify → work-handoff (gate rule).
5. Update state (processed keys, `last_run`, failure count).
6. Stop per the stopping rule.
