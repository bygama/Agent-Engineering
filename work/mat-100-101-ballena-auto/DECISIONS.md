# Decisions — mat-100-101-ballena-auto

## 2026-08-19 — Close: the lane folder survives this PR

work-handoff's default close removes the lane folder in a closing
commit. In the orchestrated flow this collides with the review wave:
the parent's reviewer template consumes `[LANE_PATH]` from the lane
branch, and this worker's `worker_done` carries `--report-path
work/mat-100-101-ballena-auto/PROGRESS.md`. Repo precedent resolves
it: finalize commits land first and the terminal close (lane removal)
is a separate later act (`da951f1 chore(lane): finalize mat-90 — L DoD
PASS on record before close`, then `d0ac9e3 chore(lanes): terminal
close — MAT-89/92 and MAT-91/88 lane records`). So: lane finalized and
committed here; removal is the parent's post-merge act.

## 2026-08-19 — SPEC approved by the parent (design-first gate)

Parent ruling, verbatim, via `orca orchestration ask`:

> APPROVED as written. Both placement calls are right: (1) the stall
> clock belongs in step 6 where the review seat's commands live — the
> reviewer is step 6's supervision problem precisely because step 5's
> cadence rule cannot reach a seat that never heartbeats; keep the
> explicit tie-back. (2) eval-03 carrying both assertions (--auto on Go
> default AND free fallback with the read-only rationale, plus the
> stall clock) BEFORE any SKILL.md edit is exactly evals-before-content.
> Shape PLAN.md and proceed. Record this ruling in your DECISIONS.md.

## 2026-08-19 — eval-03 also gains the closing-command assertion

The house hard constraint ("evals change before skill content on every
revision") covers MAT-101's SKILL.md edit too, not only MAT-100's. The
approved SPEC names two eval-03 assertions; step 4's SKILL.md change
(naming `orca terminal close --terminal <handle>` where the requirement
is stated) is also a skill revision, so PLAN step 1 extends eval-03's
existing fallback-shell assertion to expect the closing command named
in place. Ritual compliance under the ruling, not a re-decision of it —
all eval changes land in step 1, before any content edit.
