---
name: fan-out
description: Plans and runs parallel work as isolated lanes — one item per lane per worktree per worker — with frozen anchors, a written reducer contract (deterministic merge order, disagreement rule, synthesis verification), and runner-agnostic worker handoffs. Use when a feature list or issue set has two or more truly independent items, when work should run in parallel worktrees, or when someone says "split this across agents".
---

# Fan-out

Parallelism comes from isolated lanes run by isolated workers — never from
one agent juggling. A fan-out is written down before it runs; if you can't
answer the three questions in writing, you don't have a fan-out, you have
a queue.

## Workflow

Copy this checklist and tick items off:

```
Fan-out progress:
- [ ] 0. Probe: `orca status --json` (reference/orca.md)
- [ ] 1. Qualify (the three questions, in writing)
- [ ] 2. Freeze and name the anchors
- [ ] 3. Plan the lanes (worker table)
- [ ] 4. Install the reducer contract
- [ ] 5. Create worktrees, spawn workers (artifacts only)
- [ ] 6. Reduce
- [ ] 7. Close
```

**1. Qualify — the three pre-fan-out questions**, answered in writing in
the parent lane's PLAN.md:

- *Where does each unit work?* Disjoint files, own worktree. Two items
  touching the same file are one item.
- *How do results merge?* If the answer needs a human untangling
  conflicts, the split is wrong.
- *Who resolves disagreement?* A named resolver and a rule, decided now.

Items that consume another item's output or edit its files are **stages,
not parallel items** — refuse the fan-out and run them as one lane or a
gated sequence. Parallelizing a dependency chain buys nothing and pays the
orchestration tax on every edge (`reference/graphs-and-reducers.md`).

**2. Anchors.** Freeze and NAME the files every worker aligns to and no
worker may edit: the SPEC, the interface contracts, the feature list.
Anchors are read-only for the duration; wanting to change one mid-flight
means stopping the fan-out first.

**3. Worker table** in the parent PLAN: item · lane `work/<slug>/` ·
worktree path · branch · runner · spawn command (the agent-first
`orca worktree create` form below, `--agent <runner>`;
`reference/runners.md` maps runner ids and their headless equivalents
for the no-Orca sequential path). One item ↔ one lane ↔ one worktree ↔ one worker,
WIP=1 each. Spawns are agent-first — `orca worktree create --agent <id>
--prompt "<worktree path + lane path + DoD>" --parent-worktree active`,
one command per worker, never the bare-create-then-terminal anti-pattern,
never two workers in one working tree. Probe failed (no Orca)? Fan-out is
NOT runnable in parallel — say so and offer the same lanes sequentially
under the same ceremony (no-Orca contract, `reference/orca.md`).

**4. Reducer contract**, written in the parent PLAN before any worker
starts:

- **Output shape:** each lane finishes with a `## Verification` PASS block
  (work-verify) plus a 3-5 line result summary in its PROGRESS.
- **Merge order:** deterministic — item order, never arrival order.
- **Disagreement rule:** the named resolver decides; **anchors win** — a
  worker that drifted from a frozen interface reverts to it, and the
  divergence is recorded as a finding (maybe the anchor was wrong; that
  becomes its own lane later), never silently absorbed or discarded.
- **Synthesis gate:** after the merge, the WHOLE runs its verification
  (full suite + every feature row's command from the merged tree). Parts
  passing is not the whole passing — interface mismatches live between
  lanes, exactly where per-lane tests are blind.

**5. Spawn workers — artifacts only.** Each worker receives exactly three
things: its worktree path, its lane path, the DoD — delivered in the
spawn `--prompt`. Follow-ups go through the single `startupTerminal`
handle (`orca terminal wait --for tui-idle`, then `terminal send`);
structured coordination beyond that runs through `orca orchestration`
(dispatch, inbox/reply), never ad-hoc `terminal send` chains. No shared
conversation, no sibling paths, no anchor-edit rights. Worker obligation on ambiguous
anchors: implement the **plainest reading and flag the ambiguity** as a
finding in the lane (never improvise the spec, never block waiting) — and
the coordinator's reduce probes behavior with its own inputs precisely
because unflagged ambiguities happen, on any runner. Any runner from
`reference/runners.md` qualifies; the handoff never creates
runner-specific files (the adapter ban holds mid-fan-out). When the
requested runner is not installed, say so and emit the ready-to-run
protocol — never simulate the run.

**6. Reduce.** Collect lanes; refuse to merge any lane without a current
PASS block. Merge in contract order, resolving disagreements by the rule.
Run the synthesis gate on the merged tree. Only then move feature rows to
`passing` (evidence from the merged tree) and record the reduce in the
parent PROGRESS.

**7. Close.** work-handoff per lane (close mode), then the parent.

## Failure locality

A failed or stuck lane is redone or dropped — never repaired by reaching
across from a sibling lane mid-flight. Cross-lane repair couples the lanes
and forfeits the isolation the worktrees paid for. If two lanes keep
needing each other, the qualification was wrong: stop, merge what passed,
re-plan the rest as one lane.

## Judgment notes

- Fan-out is MANDATORY at XL — work that cannot fit one lane
  (`reference/task-tiers.md`, ADR-002); its ceremony cannot be waived.
  It is available for L or a genuine set of independent M items, and
  refused below that. Two tiny items fan out fine; one big tangled item
  never does.
- The coordinator holds the contract and the merge; workers hold exactly
  one lane each. Nobody holds both roles for the same lane
  (maker ≠ checker survives the parallelism).
- Token cost scales with workers — prefer the smallest worker count that
  keeps items truly independent.
