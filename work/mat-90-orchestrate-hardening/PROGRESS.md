# PROGRESS — mat-90-orchestrate-hardening

Lane: MAT-90 (bound) + MAT-95, MAT-96, MAT-97, MAT-98 — one PR closes all
five. Tier L. Dispatched as a supervised child of Run
`run_fafc4f70d4ac`, dispatch `ctx_0e3f93b9be11`.

## Status

- [x] Tickets read (all five) and the production evidence in each cited
      into SPEC.md
- [x] Orca CLI claims verified on this machine before any were written
      down (see Evidence below)
- [x] SPEC.md written, design-first gate raised to the parent
- [x] Parent approval received — DECISIONS ruling 1
- [x] PLAN.md, DECISIONS.md, feature_list.json written
- [ ] work-run: steps 1-8
- [ ] work-verify
- [ ] work-handoff

## Evidence — Orca CLI verification (2026-08-19, this machine)

Every CLI claim this lane adds to the standard was produced by running
the command here, not inferred. Raw runs:

- `orca orchestration task-list --brief --json --run run_fafc4f70d4ac` →
  `ok: true`; `result` keys `runId, legacyReadOnly, tasks, count`; 35
  rows; each row's keys: `id, run_id, parent_id,
  created_by_terminal_handle, created_by_pane_key,
  created_by_process_incarnation, created_by_run_generation, task_title,
  display_name, spec, status, deps, result, created_at, completed_at,
  spec_truncated`. **No `title` key exists** — the exact field the
  external operator guessed (MAT-97).
- `orca orchestration worker-list --json --run run_fafc4f70d4ac` →
  `result` keys `workers, counts`; 36 rows; row keys `dispatchId, taskId,
  runId, workerState, dispatchStatus, agentTerminalHandle, terminalState,
  resource`.
- `orca worktree list --json` → `result` keys `worktrees, totalCount,
  truncated`; row keys include `id, path, head, branch, displayName,
  comment, linkedLinearIssue, workspaceStatus, parentWorktreeId,
  childWorktreeIds, lineage, git`.
- `orca orchestration worker-show --dispatch ctx_2b7ad61143ae --json` →
  `ok: true`, `result` keys `dispatch, worker, terminal, observation,
  terminalResource`. **`ctx_` ids are accepted** (MAT-97's stale
  2026-08-14 note is wrong).
- `orca orchestration worker-retain --help` / `worker-release --help` →
  both take `--dispatch <dispatch_id>`; nine rows in this Run sit at
  `releaseState: "retained"` / `retainedReason: "user_requested"`, a
  state only a successful `worker-retain --dispatch ctx_…` produces.
- `orca orchestration worker-start --help` → `--agent`, `--model`,
  `--effort`, `--terminal`; note: "`--model` supports Claude, Codex, and
  Cursor opaque provider model ids; `--effort` requires `--model`.
  Neither can combine with `--terminal`." **No argv passthrough**
  (MAT-96).
- `orca orchestration task-create --help` → `--spec <text>` only; **no
  `--spec-file`**; `task-update` changes state, not spec (MAT-98).
- Two-step provenance cost, measured by diffing two dispatches in this
  Run: `ctx_e818399d9132` (two-step, `mat-56-review`) reports
  `worker.effects` `worktree: reused`, `setup: not_applicable`,
  `terminal: reused`, and `resource.ownershipState: "external"` /
  `retainedReason: "external_terminal"`; `ctx_2b7ad61143ae`
  (`--worktree new-child`) reports `worktree: created_child` and
  `ownershipState: "user_owned"` / `retainedReason: "user_requested"`.

Baseline before any edit: `node scripts/agent-lint.mjs . --ignore
tests,templates,global,examples` → `0 high, 0 medium, 0 low — PASS`,
exit 0.

## Verification

_(work-verify fills this section; the four gates are the lane's DoD and
their evidence lands here rather than as a feature_list row — DECISIONS
ruling 4.)_
