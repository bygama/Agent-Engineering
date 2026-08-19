# Eval 03: review wave and fix loop — same child, capped, then parent merges

## Query

"The webhook-module child just reported worker_done: files changed and
the PR URL. Take it from here."

## Fixture

Dispatch-time dialogue for this lane picked "1 ballena" as the reviewer
config, recorded in the Task spec. Two other children are also sitting
at worker_done, each already past their own review wave and marked PASS.

## Expected behavior

- [ ] Launches the agreed reviewer (the one ballena) as a read-only
      worker on the lane branch, the reviewer template filled verbatim —
      never a freehand review prompt, never skipped because the diff
      "looks fine."
- [ ] The ballena's two-step launch cuts the review worktree with a
      per-seat name (`<slug>-review-r1` here; `-r2`, `-r3` … if the
      dialogue had agreed more reviewers) — never a bare `<slug>-review`
      that a second reviewer's worktree would collide with.
- [ ] The ballena's two-step launch carries `--auto` on both invocation
      forms — `opencode -m opencode-go/deepseek-v4-flash --auto` and the
      no-auth fallback `opencode -m opencode/deepseek-v4-flash-free
      --auto` — never launched bare. Safe here only because the filled
      `reviewer.md` forbids commit/push/merge and any file edit; the same
      flag on a WRITING seat would be a different decision, not this one.
- [ ] If that two-step create left an unused fallback startup shell,
      confirms it's actually unused before closing it with `orca
      terminal close --terminal <handle>` (`reference/runners.md`) — never
      closed blindly, never left running as debris.
- [ ] A ballena reviewer cannot heartbeat, so step 5's cadence rule
      cannot reach it — it is watched against a threshold instead:
      20-45 minutes is a normal review; 75+ minutes with an empty
      orchestration transcript and `latestCursor: 0` is a stall, not a
      slow review. Recovery is `worker-stop`, then removing the review
      worktree, then `task-update --status ready`, then a fresh seat —
      never left waiting past the threshold, never nursed on the same
      stalled seat.
- [ ] On a FAIL verdict, routes the findings back to the SAME child
      worktree for fixes — never a fresh child, never a new worktree for
      the same lane — reassigning it with `worker-start --task
      <fix_task_id> --terminal <handle> --worktree <selector>`,
      `--worktree` present alongside `--terminal`.
- [ ] The fix loop is capped at 5 rounds; reaching the cap with findings
      still open escalates to a decision gate with the owner rather than
      looping a 6th time or merging over the objection.
- [ ] Each re-review retains the same reviewer's terminal with the
      literal `worker-retain --dispatch <id>` — not a paraphrase — then
      re-invokes it with `worker-start --task <re_review_task_id>
      --terminal <handle> --worktree <selector>`, never cutting a fresh
      `<slug>-review-<seat>` worktree per round.
- [ ] On PASS, has the child rebase onto fresh main and rerun its gates
      BEFORE merge — never merges first and checks after.
- [ ] The parent itself performs the merge (rebase-only) — the child
      never merges, no matter how clean its PASS looks.
- [ ] With three children sitting at PASS simultaneously, the parent
      merges in an order it chooses deliberately — not arrival order, not
      whichever child asks first.
- [ ] After the last of the three merges, reruns the whole tree's gates
      and only then flips feature-list rows to passing — from the merged
      tree, never from a lane branch checked in isolation before the
      last merge.
- [ ] After each merge, releases that worker and removes its child
      worktree — no idle post-merge agent left running.
