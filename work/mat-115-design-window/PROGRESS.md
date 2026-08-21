---
issue: MAT-115
---
# The design-first approval window — progress

## Done

- **SPEC.md** written from the parent orchestrator's dispatch brief
  (work-plan design-first, step 1), then the lane **stopped** for owner
  approval.
- **The window was dogfooded, and the bug reproduced in it.** PROGRESS.md
  was written at the SPEC step carrying the marker this lane introduces —
  the exact behavior leg 1 adds to work-plan — so for the length of the
  approval wait this lane held SPEC.md + PROGRESS.md and no PLAN.md.
  During that window:

  ```
  $ node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-115-design-window
    MEDIUM work/mat-115-design-window/  lane missing PLAN.md  [lane-incomplete]
  0 high, 1 medium, 0 low — FAIL
  $ echo $?
  1
  ```

  MAT-115 observed on the lane that fixes it, not inferred from reading
  the source. It also confirms the SPEC's sharpening of the ticket's
  mitigating nuance: this lane was untracked at the time, and the finding
  fired anyway, because `agent-lint` walks the filesystem rather than the
  index.
- **Owner approval received** (parent orchestrator, 2026-08-21): SPEC
  approved as written, all judgment calls confirmed as the lane's own.
  Recorded in DECISIONS.md.
- **PLAN.md** written — six steps, every one `per-step`, with the marker
  and the fixture/case names fixed in the interface block so steps 3 and
  4 cannot drift apart. Writing PLAN.md **ends the approval window**, so
  the marker line was removed from this file: leaving it would have made
  PROGRESS.md state something untrue about the lane.
- **Reviewer seat verified live** before relying on it
  (`reference/runners.md` verify-on-install, work-run step 2): `opencode
  run --auto -m opencode/x-preview-f-free` returned the requested output
  one-shot, exit 0, in this worktree on 2026-08-21. Chain position 1 is
  alive; no degradation needed at settle time.
- **Step 1 — `skills/work-plan/evals/eval-05.md` amended, evals-first**
  (PLAN step 1): the existing design-first assertions (a) are untouched;
  gained two companions — the same SPEC.md turn also writes
  `work/<slug>/PROGRESS.md` under `## In progress` carrying the marker
  verbatim (quoted in full in the eval), and PLAN.md still does not
  appear alongside it. Added the negative for direct mode (b): it never
  writes the marker, because it has no approval window to declare.
  eval-05 was not duplicated — amended in place, per SPEC §1.

  ```
  $ grep -q 'STATE: design-first approval window, waiting for owner approval of SPEC.md before PLAN.md' skills/work-plan/evals/eval-05.md && echo MARKER_OK
  MARKER_OK
  $ grep -q 'direct' skills/work-plan/evals/eval-05.md && echo DIRECT_OK
  DIRECT_OK
  $ node tests/run-eval-checks.mjs
  ok   work-plan: 6 evals well-formed
  ... (all other skills ok)
  all eval checks passed
  $ echo $?
  0
  ```

## In progress

- work-run executing PLAN steps 1-6 in order. Step 1 done; steps 2-6
  remain.

## Tried and failed

- The first `orca orchestration ask` for SPEC approval timed out at
  900 s with no answer (thread `msg_287612c3b824`). Resumed the **same**
  question by id rather than asking a duplicate; the parent answered on
  the resumed thread and explained the batch it had acked unread.

## Next

- Steps 1-6 per PLAN.md, then work-verify (M-tier DoD), then
  work-handoff, then the PR carrying `Closes MAT-115`.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
