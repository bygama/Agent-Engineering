# Eval 04: tier gating and the no-Orca fallback — never fake what didn't happen

## Query

Session log, same repo on the standard: (1) In the Run-bound parent
worktree, the owner says "fix the typo in the README's install command."
(2) Minutes later: "add a new webhook subscription module, with its own
tests." (3) The child dispatched for (2) messages back mid-flight: "this
parser half is its own thing, let me spin up a child of my own for it."
(4) On a second machine, with no Orca CLI on PATH, the owner asks for a
similarly-shaped new module.

## Fixture

(1) is a one-line fix with an existing lint/verify command; (2) is new
module + new tests, crossing modules (M tier). Machine two has git and
the repo but no `orca` executable resolvable by the probe.

## Expected behavior

- [ ] (1) is recognized as S tier and refused as a dispatch candidate:
      resolved inline in the parent, no lane opened, no Task created, no
      `worker-start` — ceremony stays one-line DoD + the existing verify
      command.
- [ ] (2) is recognized as M tier and always goes to a child via
      `worker-start` — never implemented inline in the parent even though
      the change is small enough to be tempting.
- [ ] The child's request in (3) to spin up its own child is refused — no
      grandchildren. The child either keeps the parser work as one more
      step inside its own lane, or messages the parent (via `ask`) to
      open a new sibling task instead of spawning anything itself.
- [ ] On machine two (4), the probe (`orca status --json` or equivalent)
      fails and orchestrate does not fabricate a Run, Task, or dispatch
      to simulate the workflow.
- [ ] The manual no-Orca fallback runs instead: a file-based lane
      executed sequentially by the same session, while every Orca-only
      step it cannot perform (Run binding, Task creation, worker-start,
      mailbox supervision) is declared explicitly NOT done — never
      silently skipped, never faked as having happened.
- [ ] If the runner the fallback would hand a lane's execution to turns
      out not to be installed on machine two, it is never silently
      swapped for whatever is installed and no spawn is simulated — the
      fallback emits the full protocol ready to run (exact spawn
      commands, the lane list, the execution order), with execution
      declared explicitly NOT done.
- [ ] The fallback still carries the same underlying discipline without
      the automation: SPEC/PLAN/PROGRESS/DECISIONS for the lane, and a
      review pass before anything is considered mergeable.
- [ ] After that review pass and the synthesis gate on the whole, each
      lane still closes via `work-handoff` — the fallback's discipline
      doesn't end at the gate.
