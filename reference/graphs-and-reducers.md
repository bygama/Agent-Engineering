# Graphs and reducers

Sources: [Addy Osmani: The Orchestration Tax](https://addyosmani.com/blog/orchestration-tax/)
(coordination cost); [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
(orchestrator-workers); [Anthropic: How we built our multi-agent research system](https://www.anthropic.com/engineering/built-multi-agent-research-system)
(parallel workers, compression, failure modes). Retrieved 2026-08-16.

## The layer

The graph layer is how many lanes and loops coordinate: a DAG of work
units with **verification gates on the edges** — a downstream unit starts
only when its upstream's gate passed. Fan-out/fan-in is the common shape:
one coordinator splits independent items across isolated workers and
merges the results.

## The orchestration tax

Every edge between agents costs coordination: context handed over, results
merged, disagreements resolved. The tax grows with workers and edges, and
it is paid whether or not the parallelism bought anything. Therefore:

- Parallelize **independence only**. Items that consume each other's
  outputs or touch the same files are stages, not parallel items — a
  dependency chain fans out to zero speedup and full tax.
- Prefer the smallest worker count that keeps items truly independent.
- A single loop that fits in one context beats a fleet doing the same
  work — fleets are for scope one context cannot hold.

## Anchors

Files frozen read-only before the split — the SPEC, interface contracts,
the feature list — so parallel lanes can't drift apart while nobody is
watching. Disagreement with an anchor resolves in the anchor's favor; the
divergence is recorded as a finding (the anchor might be wrong — that
becomes its own lane later), never silently absorbed.

## The reducer

The deterministic compression between workers and synthesis. N workers'
full context cannot and should not be re-read by the coordinator; the
contract makes merging mechanical:

1. **Output shape** — each lane ends with a Verification PASS block plus a
   short result summary (the standard's existing currency; nothing new).
2. **Merge order** — deterministic (item order), never arrival order.
3. **Disagreement rule** — a named resolver, decided before the split;
   anchors win.
4. **Synthesis gate** — the merged whole runs its full verification.
   Per-lane tests are structurally blind to interface mismatches *between*
   lanes; only the merged tree's gate sees them.

## Failure locality

A failed lane is redone or dropped — never repaired by a sibling reaching
across mid-flight. Cross-lane repair couples what the worktrees isolated.
Two lanes that keep needing each other mean the split was wrong: stop,
merge what passed, re-plan the remainder as one lane.

## In this standard

`skills/fan-out` operationalizes the layer — mandatory at tier XL,
available at L (`reference/task-tiers.md`): the three pre-fan-out
questions in writing, one item ↔ one lane ↔ one worktree ↔ one worker,
the contract in the parent lane's PLAN. Runner choice per worker is free
(`reference/runners.md`) because workers consume artifacts, not
conversations. Workers spawn agent-first (`orca worktree create
--agent <id> --prompt "<brief>" --parent-worktree active` — one command
per worker) and coordinate through `orca orchestration`; without Orca the
same lanes run sequentially under the same ceremony (the no-Orca
contract, `reference/orca.md`).
