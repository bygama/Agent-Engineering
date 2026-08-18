---
issue: MAT-55
---
# orchestrate — Orca-first orchestration (the 1.3.0 milestone) — spec

<!-- Owner-written. The agent never edits this file. -->

AE runs Orca-first: every M+ task executes in a child worktree dispatched,
supervised, reviewed, and merged by an orchestrator sitting in the parent
worktree — mapped onto Orca's native orchestration primitives (Run, Task,
Dispatch, worker_done, decision gates), never onto invented coordination.

Done looks like:

- A new skill `skills/orchestrate` owns the parent role end to end:
  - Registers the orchestrator by binding a Run from its terminal
    (`orca orchestration run-create` / `run-use` after a restart) — one
    live Run per parent; no other terminal registration exists.
  - Converts each lane into an Orca Task (`task-create --spec`), encoding
    dependencies and file-overlap queuing via `--deps` — two lanes that
    touch the same files are never dispatched concurrently.
  - Runs the dispatch dialogue with the owner before each child is born:
    adversarial reviewers yes/no, how many, which model — default
    **1 ballena** (deepseek v4 flash; "ballenas" when N). One question per
    lane; one per batch at XL with per-lane override. The answer travels
    in the Task spec.
  - Spawns children only via `orca orchestration worker-start --task <id>
    --worktree new-child` (full Task+Dispatch+launch provenance), binds
    the Linear issue at birth, and fills the dispatch-child template
    verbatim.
  - Supervises by mailbox (`check --wait` on worker_done/escalation/
    question; rulings via `reply` land in the child's DECISIONS.md) —
    never by polling terminals.
  - On the child's worker_done, launches the agreed reviewers (read-only
    workers on the lane branch, reviewer template); routes FAIL findings
    back to the same child; fix loop cap 5, then a decision gate to the
    owner.
  - On PASS, has the child rebase onto fresh main and rerun the gates,
    then merges the lane's PR itself (rebase-only, parent-chosen order);
    releases the worker and removes the child worktree.
- Tier gating: S resolves inline in the parent (no lane); M+ always goes
  to a child. The parent never implements; its checkout stays clean.
- Children run the unchanged work-cycle inside (work-plan design-first
  from the Task spec → work-run → work-verify → work-handoff), open their
  PR, and never merge. No grandchildren. Design (shaping) happens only in
  the parent.
- `skills/fan-out` is absorbed: closed finalize-then-remove, its manual
  no-Orca procedure preserved as orchestrate's fallback section (the
  standard stays followable without Orca).
- `skills/using-ae` carries an `orchestrate` map row plus a role rule:
  Run-bound session (parent) routes M+ to orchestrate; dispatch-bound
  session (child) uses the map as today.
- The standard's docs describe the roles runtime-neutrally
  (orchestrator / worker / reviewer) with Orca as the reference binding:
  `reference/` and the tiers docs updated, ADR-008 records the decisions
  (child=lane; PR-per-lane with parent merging; S inline / M+ child;
  dispatch-time reviewer question with ballena default; fan-out absorbed;
  design-in-parent / execution-in-child; 1.3.0 reused post-renumber),
  and a `docs/how-it-works/` chapter with topology + lifecycle diagrams
  ships in the same change.
- `skills/ae-init/references/migration.md` gains the 1.3.0 note
  (restamp only; installer sweeps the fan-out junction).
- Every new/changed skill ships evals-before-content; self-lint and all
  self-test suites stay green.
- Release gate: one real M task (MAT-44, MAT-46, or MAT-47) dispatched
  through orchestrate end to end — child lane, ballena review, parent
  merge — before the 1.3.0 bump. MAT-7 (first XL) validates multi-child
  fan-out post-release.
