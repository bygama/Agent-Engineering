# Eval 05: wave scale — the idle child, the ledger, the fill, the runner

## Query

Session log in the Run-bound parent worktree during a seven-lane wave:
(1) "Dispatch all seven — the briefs are shaped and they share the same
per-repo constraints block." (2) Forty minutes in: "what is the mat-44
child doing?" (3) "Where are the dispatch ids? Let me keep a
`wave-ids.json` next to the PLAN so we stop re-deriving them." (4) "Lane
six needs a runner that is not stock claude — a wrapper binary with its
own flags."

## Fixture

The seven lanes touch disjoint files (no `--deps`), and each filled
`dispatch-child.md` spec is ~15K chars, near-identical apart from
`[LANE_PATH]`, `[TASK_BRIEF]` and the shared repo block.

mat-44's child beat every ~5 minutes for an hour and its last heartbeat
is now 40 minutes old; two `worker-read --dispatch <id>` calls 15
minutes apart return the same transcript bytes; `workerState: ready`
with the terminal `running`; no PR and no `worker_done`. A second
child's last beat is 12 minutes old and its transcript grew between the
two reads.

The parent's shell does not persist between calls, and four id JSON
files from an earlier session are already stale in the worktree. On this
machine `worker-start --help` lists `--agent`, `--model`, `--effort`
with the note that `--model`/`--effort` cannot combine with
`--terminal`; `task-create --help` lists `--spec <text>` only.

## Expected behavior

- [ ] Diagnoses (2) instead of waiting it out: an established cadence
      that STOPPED, plus a `worker-read` transcript that has not
      advanced between two reads minutes apart, is an IDLE child, not a
      slow one — while the second child (still beating, transcript
      growing) stays on the rolling wait, where silence is neither
      progress nor trouble.
- [ ] Both signals are required before the call — neither the 40-minute
      silence alone nor a single flat read is read as idleness.
- [ ] The remedy is a Task dispatched to the child's EXISTING terminal —
      `task-create` then `worker-start --task <id> --terminal <handle>
      --worktree <selector>` — never a raw `orca terminal send`, never a
      fresh child or a second worktree for a lane that already has one.
- [ ] Gives the structural reason rather than treating it as taste: an
      idle agent does not read its mailbox, so `send --to
      dispatch:<id>` cannot reach a session whose turn has ended; a
      dispatched Task is the one call that resumes a finished turn.
- [ ] Refuses (3)'s parallel id file: Orca is the ledger and is REREAD —
      `task-list --brief --json`, `worker-list --json`, `worker-show
      --dispatch <ctx_id> --json` — because the shell does not persist
      between calls, so ids are chained by rereading, not by writing
      them to disk.
- [ ] Uses the real field names rather than guessing one and concluding
      Orca returned nothing: `task_title` (there is no `title` field),
      `dispatchId` / `agentTerminalHandle` on `worker-list` rows,
      `worker.agent_terminal_handle` and `worker.effects` on
      `worker-show`.
- [ ] Passes `ctx_` dispatch ids straight to `worker-show`,
      `worker-retain` and `worker-release` instead of hunting for some
      other id form.
- [ ] Names the one record that does belong on disk: the human-readable
      worker table in the parent PLAN — and the parent lane
      (PLAN/PROGRESS/DECISIONS) is committed like any other lane, since
      specs, briefs and ids all live in Orca or in the children's
      committed lanes and the parent lane is the only irrecoverable
      artifact.
- [ ] Treats the seven ~15K-char fills as a mechanical job, not a
      hand-paste: one per-repo common block, the filled specs generated
      from it — hand-filling ~105K chars of near-duplicate text is what
      breaks the verbatim rule the skill demands.
- [ ] The generation MUST FAIL on any surviving placeholder — a spec
      reaching `task-create` with `[LANE_PATH]`, `[TASK_BRIEF]` or an
      empty optional section still in it is the graded failure, caught
      before dispatch rather than by the child.
- [ ] Feeds the generated file as `--spec "$(cat <file>)"` because
      `task-create` takes `--spec <text>` only: does not invent a
      `--spec-file` flag, and does not reach for `task-update` to
      repair a spec after dispatch.
- [ ] Keeps the stock child runner for the other six lanes (`--agent
      claude`, `reference/runners.md`) — lane six's wrapper is not read
      as license to move the whole wave off the single-call dispatch.
- [ ] Allows the two-step for lane six — `orca terminal create --command
      "<wrapper>"` then `worker-start --task <id> --terminal <handle>` —
      rather than refusing it outright or pretending `worker-start` can
      pass argv through; on this machine the flags are
      `--agent`/`--model`/`--effort` with no passthrough.
- [ ] Attaches the three conditions to that exception: the reason
      recorded at dispatch, the fallback-shell close as a REQUIRED step
      (not advice), and the provenance cost known rather than traded
      away silently.
- [ ] States the cost concretely instead of as "some provenance is
      lost": `worker.effects` records the worktree as `reused` rather
      than `created_child`, `setup` is `not_applicable` so repo setup
      hooks never run under the dispatch, `resource.ownershipState` is
      `external` (`retainedReason: external_terminal`) so teardown is
      the parent's manual job, and `--model`/`--effort` move out of the
      dispatch record into the argv.
