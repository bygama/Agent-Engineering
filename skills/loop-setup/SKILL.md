---
name: loop-setup
description: Scaffolds a recurring agent loop as a standing artifact — stopping rule, verified gate command, numeric budget, state file, and a trigger (Orca automation created disabled, with the manual-iteration fallback) — and refuses tasks that fail the loop filter. Use when work should repeat on a cadence or on an event (nightly audits, issue triage, scheduled checks), or when someone says "keep doing X automatically".
---

# Loop setup

A loop is standing automation, not a lane: it runs on a cadence or an
event, against a queue, behind a gate, inside a budget. The characteristic
failures this skill prevents: looping a one-shot task, and unbounded loops
that burn budget on noise.

## The loop filter — all four, or refuse

1. **Repeats** on a cadence or a recurring event (weekly, nightly, on new
   issue). One-shot work → a lane (`work/<slug>/`), not a loop.
2. **An automated check exists** — the gate is a command with an exit code,
   never a human judgment ("clean", "better") in disguise.
3. **The budget absorbs waste** — a wasted run must be cheap enough that
   the cadence survives it.
4. **Real tools** — the queue and actions are reachable from the runner
   (CLI, MCP, API), verified, not hoped.

Refusals cite which criterion failed and propose the alternative (usually a
lane with `work-verify` as its gate).

## Five elements — every loop, no exceptions

| Element | Form |
|---|---|
| Stopping rule | one sentence: stop when queue empty / gate green / budget hit; plus skip conditions (e.g. dirty tree) |
| Gate | an executable command, **verified by running it** before it is written anywhere |
| Budget | numeric: runs per period, items per run, and the failure budget — 2 consecutive failed runs ⇒ the loop disables itself and reports to a human |
| State file | `loops/<name>.state.json` — last run, processed item keys (never reprocess), consecutive-failure count |
| Trigger | primary + named fallback (see matrix) |

Unbounded loops are refused even when explicitly requested — offer the
bounded version. Write actions against external systems (tracker comments,
status moves) default to **report-only** until the user enables writes.

## Trigger matrix

| Trigger | Command |
|---|---|
| Schedule / on-event | `orca automations create --name <n> --trigger hourly\|daily\|weekly\|<cron> --prompt "follow loops/<name>.md" --provider <agent> [--precheck <cmd>] [--repo <sel>] --disabled` — on-new-issue = a schedule whose precheck is `orca linear list --filter open --json` non-empty |
| Manual (universal fallback) | `orca automations run <name>`, or "run one iteration of `loops/<name>.md`" to any agent — works with or without Orca |

## Workflow

Copy this checklist and tick items off:

```
Loop setup:
- [ ] 0. Probe: `orca status --json` (reference/orca.md)
- [ ] 1. Loop filter (refuse or proceed)
- [ ] 2. Fix the five elements with the user
- [ ] 3. Verify the gate command by running it
- [ ] 4. Instantiate loops/<name>.md + state file
- [ ] 5. Wire the trigger (nothing enabled without explicit go)
- [ ] 6. First run by protocol + report
```

**4.** Instantiate from `templates/repo/loops/LOOP.md.template` (in the
Agent-Engineering repo, resolved by `skills/using-ae` §Reference paths).
Fill every placeholder; a surviving `{{...}}` means the loop is not
scaffolded. Write the state file with its initial JSON — **gitignored**
(`loops/*.state.json`) and self-initializing when missing: tracked state
dirties the tree on every run, which self-blocks any cleanliness precheck
(check that interaction explicitly). The worked example
`templates/repo/loops/issue-triage.example.md` shows a complete artifact.

**5.** Register the trigger (`--disabled`) only with the user's explicit
go; otherwise leave the exact registration command in the loop file's
Trigger section, ready to paste. Without Orca (probe failed): the loop
file still scaffolds — it is a file — but declare the trigger NOT wired
per the no-Orca contract (`reference/orca.md`) and name the manual
iteration as what runs meanwhile.

**6.** Execute one run following the loop's run protocol — read state →
precheck the queue (empty ⇒ stop, that's the stopping rule firing) → take
at most the per-run budget of items → act → run the gate → update state →
stop — and report the evidence (commands, exits, state diff).

## Judgment notes

- The queue is discrete items — one issue, one flaky test, one CVE — never
  "everything" as one blob. If you cannot enumerate the items, you don't
  have a queue yet; define it first (e.g. quarantine flaky tests so each
  becomes an item).
- The loop file is the contract; the automation's `--prompt` should say
  "follow loops/<name>.md" rather than duplicating it — one source of
  truth, any runner.
- Cadence beats size: prefer a small hourly/weekly loop over a monster
  monthly one; the budget stays absorbable.
- A loop that keeps hitting its failure budget is telling you the gate or
  the queue is wrong — fix the loop definition, don't widen the budget.
