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

## Done

### Step 1 — evals first, all three, one commit (2026-08-19)

Evals only; no skill content touched, so the eval commit precedes every
content commit in history as the lane's constraint requires.

- `skills/orchestrate/evals/eval-01.md` — five checklist lines added to
  the existing filled-spec block (SPEC §17): the cadence line (phase
  transitions AND ~10 minutes inside a long phase, a repeated phase a
  valid signal) sits next to the heartbeat-vocabulary line it extends;
  then both sides of the fence named (orchestration workers forbidden
  vs. work-run's per-step reviewer and work-verify's step-4 review
  REQUIRED), the explicit no-absolute-phrasing check (a closing "never
  spawn anything yourself" fails even when the paragraph above is
  correct), the parent's adversarial reviewer as ADDITIONAL and never a
  substitute, and the verdict TEXT recorded verbatim in
  PROGRESS/DECISIONS with MAT-46's uncorroborated "returned CONFIRMED"
  as the named failure.
- `skills/orchestrate/evals/eval-04.md` — the CONTRAST on case (3)
  (SPEC §18). The query now carries the second half of the same
  moment ("no grandchildren, so I take it the step-4 fresh-context
  review is off too?"), the fixture states the lane is M tier (so step 4
  applies) and that the child has attempted no subagent call, and four
  checks follow the existing refusal check: the contrast itself (reading
  the fence as blocking that rung is the graded failure), the parent's
  reviewer as additional rather than a replacement, fence-READ vs
  refusal-OBSERVED, and the genuine-runtime-refusal branch (step 4 NOT
  RUN, refusal text quoted, reported) as the ONLY alternative to running
  it.
- `skills/orchestrate/evals/eval-05.md` — new, parent side at wave scale
  (SPEC §19). Query: a seven-lane wave with four moments — dispatch,
  a quiet child, "let me keep a `wave-ids.json`", and a lane needing a
  non-stock runner. The fixture carries the discriminating detail (one
  child with a stopped cadence and two identical `worker-read`
  transcripts, a second child still beating and growing, the stateless
  shell, and the on-machine `--help` output for `worker-start` and
  `task-create`). Fifteen checks across the four themes: idle diagnosis
  (both signals required, not silence alone) and the Task-to-terminal
  remedy with its structural reason (an idle agent does not read its
  mailbox); Orca as the ledger with the read commands and real field
  names (`task_title`, `dispatchId`/`agentTerminalHandle`,
  `worker.agent_terminal_handle`), `ctx_` ids used directly, the worker
  table as the one on-disk copy, and the parent lane committed like any
  other; the mechanical fill with MUST-FAIL-on-surviving-placeholder and
  `--spec "$(cat <file>)"` because `task-create` has no `--spec-file`;
  and the child-runner stance (stock by default, two-step as the named
  exception, the three conditions, and the four measured costs stated
  concretely).

Acceptance (SPEC/PLAN step 1): `node tests/run-eval-checks.mjs` → exit 0,
output includes `ok   orchestrate: 5 evals well-formed` and ends with
`all eval checks passed`.

Other gates re-run at this step, all exit 0 (none of them is step 1's
acceptance, but the lane requires they stay green):
`node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
→ `0 high, 0 medium, 0 low — PASS`; `node tests/run-lint-tests.mjs`;
`node tests/run-gen-tests.mjs`.

Files changed: `skills/orchestrate/evals/eval-01.md` (M),
`skills/orchestrate/evals/eval-04.md` (M),
`skills/orchestrate/evals/eval-05.md` (A). No do-not-touch path in the
diff.

Concerns: none blocking. Note for steps 2, 3 and 6 — these checks are
now the acceptance criteria those steps must satisfy in text, including
the ones that grade an ABSENCE (no absolute "never spawn anything
yourself" phrasing in `dispatch-child.md`; no empty optional section
surviving a fill).

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
