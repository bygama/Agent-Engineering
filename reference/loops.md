# Loops

Sources: [Addy Osmani: Loop Engineering](https://addyosmani.com/blog/loop-engineering/)
(filter, budgets, stopping); [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
(evaluator loops, tool grounding). Retrieved 2026-08-16.

## What a loop is

Standing automation: work that repeats on a cadence or an event, against a
**queue** of discrete items, behind an executable **gate**, inside a
**budget**. A loop is not a lane — lanes are per-effort and close; loops
persist and fire again. The artifact is a file, `loops/<name>.md` in the
owning repo (template: `templates/repo/loops/LOOP.md.template`), so any
runner — an Orca automation, `/loop`, cron, or an agent told to "run one
iteration" — executes the same contract.

## The filter — all four, or it is not a loop

1. **Repeats** on a cadence or recurring event.
2. **An automated check exists** — the gate is a command with an exit
   code, never a human judgment in disguise.
3. **The budget absorbs waste** — one wasted run is cheap enough that the
   cadence survives it.
4. **Real tools** — queue and actions reachable from the runner, verified.

Failing any one → it's a lane (`work/<slug>/` + work-verify), not a loop.

## The five elements

| Element | Form |
|---|---|
| Stopping rule | one sentence: stop when queue empty / gate green / budget hit; plus skip conditions (dirty tree, missing connector) |
| Gate | executable command, verified by running before written |
| Budget | numeric: runs per period, items per run, failure budget |
| State file | `loops/<name>.state.json` |
| Trigger | primary + named fallback (`reference/orca.md` matrix) |

State file minimum shape (a runtime artifact: gitignore
`loops/*.state.json` — committed state dirties the tree on every run — and
initialize it when missing):

```json
{ "last_run": "2026-08-16T09:00:00Z", "processed": ["KEY-1"], "consecutive_failures": 0 }
```

`processed` keys are never reprocessed; `consecutive_failures` implements
the failure budget: **2 consecutive failed runs ⇒ the loop disables itself
and reports to a human.** A loop that keeps hitting this is telling you the
gate or the queue is wrong — fix the definition, never widen the budget.

## The run protocol

Every run, any runner:

1. Read the state file.
2. Precheck the queue — empty ⇒ stop (that is the stopping rule firing;
   Orca's automation `--precheck` can front-run this check — see
   `reference/orca.md`).
3. Take at most the per-run budget of items.
4. Act on each item; run the **gate**; item done only on exit 0.
5. Update state (processed keys, timestamps, failure count).
6. Stop per the stopping rule.

Write actions against external systems (tracker comments, status moves)
default to **report-only** until the owner enables writes.

## Design pressure

- Cadence beats size: small hourly/weekly loops over monster monthly ones.
- Unbounded loops ("run until everything is fixed") are refused even when
  requested — bound them with the stopping rule + budget.
- If you cannot enumerate the queue's items, you don't have a queue yet.
