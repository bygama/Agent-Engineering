# ADR-008: Orca-first orchestration

Date: 2026-08-18
Status: Accepted <!-- Amends ADR-002 (XL fan-out mandate → orchestrate) and ADR-004 (adds orchestrate as an L executor option); amends SPEC Decision 7 -->

## Context

Dispatch and parallel execution predated Orca's own orchestration
primitives: `fan-out` invented its own coordination (frozen anchors, a
worker table, a reducer contract) instead of mapping onto Orca's native
Run/Task/Dispatch/worker_done/decision-gate machinery, discovered in
`orca skills get orchestration` during MAT-55 shaping ("orca-first, read
its documentation" — owner). Meanwhile M-tier work had no dispatch path
at all: it executed wherever the session happened to sit, parent or
not, with no child worktree, no supervision discipline, and no review
seat guaranteed before merge. ADR-001 already made Orca the executor
for scheduling and parallelism; this closes the gap for orchestration
itself.

## Decision

Add `skills/orchestrate`: the parent role, end to end, mapped onto
Orca's primitives rather than invented coordination.

- **Child = lane, via `worker-start` provenance.** A child is born only
  through `orca orchestration worker-start --task <id> --worktree
  new-child` (full Task+Dispatch+launch lineage) against a Task created
  from the lane (`task-create --spec`). No other spawn path counts as a
  child. **No grandchildren**: a child that needs its own parallel work
  folds it into its own lane or asks the parent for a sibling task —
  the orchestrator role does not nest.
- **Tier gating.** S resolves inline in the parent — no lane, no
  dispatch. M and above always go to a child; the parent never
  implements, and its own checkout stays clean.
- **`--deps` overlap queuing.** Lanes that touch the same files are
  encoded as dependent Tasks (`--deps`), never dispatched concurrently;
  independent lanes run in parallel.
- **Dispatch-time reviewer question, default 1 ballena.** Before each
  child is born the parent asks the owner one question — reviewers
  yes/no, how many, which model — default **1 ballena** (deepseek v4
  flash, the cross-family reviewer seat) if the owner has no
  preference. The answer is recorded in the Task spec, not re-asked per
  round. Defaulting to a ballena rather than another Claude instance
  makes maker ≠ checker the default, not an opt-in: the child (Claude)
  and its reviewer are different model families unless the owner
  chooses otherwise.
- **Fix loop, cap 5 → gate.** Review findings return to the *same*
  child (its terminal is retained, not released, until the lane
  settles). After 5 fix rounds without a PASS, the loop stops
  automatically and opens a decision gate (`gate-create`) to the owner
  instead of continuing silently.
- **PR-per-lane; child opens, parent merges.** Every child pushes its
  branch and opens its own PR but never merges it, "no matter how
  clean" — merge authority stays with the parent. On PASS the child
  rebases onto fresh main and reruns its gates first; the parent then
  merges rebase-only (`gh pr merge --rebase --delete-branch`) in an
  order it chooses, not arrival order — the same discipline several
  simultaneously-PASS children need to land without clobbering each
  other.
- **Design in the parent, execution in the child.** Shaping (SPEC/PLAN
  authorship) never crosses into the child; the child's `work-plan`
  design-first call formalizes the parent's already-shaped brief, it
  does not re-derive it. This mirrors ADR-006 (design lives in one
  place) rather than reopening it.
- **`fan-out` absorbed.** `skills/fan-out` is deleted (closed
  finalize-then-remove); its XL ceremony (three pre-fan-out questions,
  frozen anchors, worker table, reducer contract, synthesis gate) and
  its manual no-Orca fallback procedure both move into
  `skills/orchestrate` before the deletion, so the standard stays
  followable without Orca (ADR-001's no-Orca contract) and no ceremony
  is lost. `fan-out`'s name is not touched anywhere it already appears
  as a record — ADRs, CHANGELOG, closed lanes, examples/.
- **1.3.0, reused post-renumber.** This milestone ships as `1.3.0`, not
  the number ADR-007 had reserved for it (`1.4.0`) — the ADR-007
  renumbering addendum freed `1.3.0` (old tag deleted, zero adopters),
  and the owner ruled during shaping to reuse it rather than burn a
  fresh number on the same milestone ADR-007 already earmarked.

Three mechanics were verified against the installed `orca` CLI rather
than assumed, because the obvious guess was wrong in each case: Linear
binds to a child via a `worktree set --linear-issue <KEY>` call
immediately after `worker-start` (which has no such flag itself); the
fix loop reuses the child's own agent terminal via `worker-start
--terminal <handle>`, so the parent retains rather than releases the
worker at `worker_done`; and `--model` on `worker-start` accepts only
Claude/Codex/Cursor ids, so a ballena reviewer launches two-step
(`worktree create` → `terminal create --command "opencode -m
opencode/deepseek-v4-flash-free"` → `terminal wait --for tui-idle` →
`worker-start --terminal`).

## Consequences

- `skills/using-ae`'s map gains an `orchestrate` row and a role rule:
  a Run-bound session is a parent (M+ routes to `orchestrate`); a
  dispatch-bound session is a child (the map applies as written); a
  session with no bound Run is neither (the map applies as written).
- `reference/task-tiers.md` and `templates/repo/docs/tiers.md`: the L
  row names `orchestrate` alongside `work-run` (ADR-004) as an
  executor option, parent-bound; the XL row's mandatory fan-out becomes
  mandatory `orchestrate`, citing this ADR.
- `reference/skills.md` records the supersession in `## Placement`:
  `orchestrate` owns dispatch and parallel execution end to end, one
  child through XL fan-out, superseding `fan-out`.
- The reviewer's PASS/FAIL verdict travels in `worker_done`'s `--body`;
  `--outcome succeeded|failed` means only "did the review task itself
  complete" (verified against `orca orchestration send --help`) — the
  parent must not read a completed FAIL review as a failed worker.
- `docs/how-it-works/` gains an orchestration chapter (topology +
  8-stage dispatch lifecycle diagrams) in the same change, per the
  standard's own hard constraint that structural change and its
  documentation land together.
- Dogfood gate before the version bump: one real M task dispatched
  through `orchestrate` end to end (child lane, ballena review, parent
  merge), with the first multi-child XL run validating fan-out's
  absorption post-release.

## Alternatives considered

- A separate child-side skill (mirroring `orchestrate` for the worker
  role) — rejected: the child runs the unchanged work-cycle
  (`work-plan` → `work-run` → `work-verify` → `work-handoff`) already;
  a dispatch template (`references/dispatch-child.md`) filled verbatim
  at `worker-start` is enough context, and a second skill would be
  speculative generality with one owner problem split across two
  files.
- A standalone reviewer skill — rejected for the same reason:
  `references/reviewer.md` is a read-only preamble, not a role that
  needs its own lifecycle or evals.
- Burning a fresh MINOR for this milestone instead of reusing `1.3.0`
  — rejected: ADR-007's renumbering existed precisely to free this
  number for the orchestration/worktrees milestone; not reusing it
  would waste the renumber's own reasoning.
