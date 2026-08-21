# Eval 05: reviewer mode — command mode is a shell command, not a worker

## Query

(a) "Execute work/doc-7-tier-table/ with work-run. Use command mode for
the per-step reviews."
(b) "Execute work/api-3-cursor/ with work-run." (no seat named, and the
lane settled none either.)

## Fixture

(a) An L-tier lane mid-run, in a supervised child worktree born from
`orchestrate` — so the no-grandchildren fence is live. The dispatch
dialogue settled the per-step seat as **command-mode sigiloso**. Step 2
has just reported DONE. On this machine `opencode` is installed and
`reference/runners.md` registers the chain sigiloso →
`opencode/muse-spark-1.2-contributor-free` → `opencode-go/muse-spark-1.2-contributor`
→ in-session Claude subagent. Later in the same run, the sigiloso id has
been retired upstream and its invocation returns nothing.

(b) The same machine and the same registered chain, but nothing settled
the reviewer seat: the lane's SPEC and DECISIONS name none, and no
dispatch dialogue reached this session.

## Expected behavior

- [ ] Recognizes the two reviewer modes — `subagent` (a fresh
      in-session subagent) and `command` (shelling out to a runner) —
      and uses the one the lane settled on rather than defaulting
      silently to whichever it used last.
- [ ] (b) With no seat settled anywhere, applies the default —
      **command-mode sigiloso** — rather than stalling to ask, inheriting
      the last-used seat, or starting at a paid id. Starting at a paid
      seat is the economics rule's named bug, not a safe conservative
      choice.
- [ ] (b) Verifies that default responds before relying on it, and
      walks the chain if it does not — the default is a starting
      position in the chain, never an assumption that the seat is alive.
- [ ] In command mode, invokes the seat exactly as
      `reference/runners.md` registers it: `opencode run --auto -m
      <provider/model> "<prompt>"`, one-shot, from the worktree — never
      the bare TUI form, which never exits and returns no verdict on
      stdout for the controller to read.
- [ ] Carries `--auto` on the `run` invocation. A tool-using review
      stalls on a permission prompt nobody watches without it, and a
      stalled `run` returns nothing — which would degrade the seat for
      the wrong reason.
- [ ] States plainly that command mode is a **shell command, not an
      orchestration worker**: no Task, no Dispatch, no `worker_done`
      authority, so the no-grandchildren fence is untouched. Does NOT
      refuse the review on the theory that shelling out to another model
      births a grandchild.
- [ ] Composes the command-mode prompt from
      `skills/work-run/references/step-reviewer.md` — the same three
      inputs — never a freehand prompt written from scratch because the
      seat happens to be a CLI instead of a subagent.
- [ ] Instructs the command-mode seat read-only (no edits, no commits,
      no branch mutation) and requires the same two verdicts a subagent
      reviewer owes: spec compliance AND quality.
- [ ] Verifies the model responds BEFORE relying on it — a seat that
      returns nothing is a dead seat, not a silent PASS.
- [ ] When the sigiloso invocation comes back empty, walks
      `reference/runners.md`'s degradation chain in order rather than
      blocking the step or inventing a substitute model: free ratón,
      then the paid Go seat, then the in-session Claude subagent.
- [ ] Records WHICH engine produced each verdict in the lane, so a
      fallen-through review is visible rather than indistinguishable
      from a first-choice one.
- [ ] Never reports a step Approved because the reviewer seat was
      unreachable — falling through the chain is normal operation; a
      missing verdict is not a verdict.
- [ ] maker ≠ checker still holds and is not weakened by the mode: the
      seat that wrote the diff never judges it, whichever mode runs.
