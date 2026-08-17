# Eval 02: full fan-out — anchors, worker table, contract

## Query

"feature_list.json has F01/F02/F03, all independent modules. Fan them out."

## Fixture

An L-tier repo on the standard: SPEC.md defines each module's exported
API; `feature_list.json` has three `not_started` rows touching disjoint
files; Orca is available.

## Expected behavior

- [ ] Verifies independence first (disjoint files, no consumed outputs) —
      the three questions answered in writing in the parent lane's PLAN.
- [ ] Freezes and NAMES the anchors: SPEC.md, the interface contracts, the
      feature list — read-only for every worker for the duration.
- [ ] Parent PLAN.md gains `## Fan-out`: the questions, the anchors, a
      worker table (item · lane `work/<slug>/` · worktree path · branch ·
      runner · spawn command), and the reducer contract.
- [ ] Probe first (`orca status --json`). One worktree per lane,
      spawned agent-first: `orca worktree create --agent <id>
      --prompt "<worktree path + lane path + DoD>" --parent-worktree
      active` — one command per worker, never two workers in one working
      tree, no bare-create-then-terminal anti-pattern. Follow-ups use
      the single startupTerminal handle (`terminal wait --for tui-idle`,
      then `terminal send`).
- [ ] Coordinator↔worker coordination beyond the spawn runs through
      `orca orchestration` (dispatch, inbox/reply), never ad-hoc
      `terminal send` chains.
- [ ] Without Orca: fan-out is declared NOT runnable in parallel; the
      same lanes are offered sequentially under the same ceremony.
- [ ] Workers are spawned artifacts-only: each receives its worktree path,
      its lane path, and the DoD — no shared conversation, no sibling
      paths, no anchor-edit rights.
- [ ] WIP=1 per worker: one lane each, nothing else.
