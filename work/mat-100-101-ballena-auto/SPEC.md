---
issue: MAT-100
---
# Ballena --auto + fallback-shell contradiction — spec

<!-- Shaped from the parent orchestrator's dispatch design (2026-08-19).
     Family: MAT-100 + MAT-101, one lane, one PR closing both. -->

## What done looks like

### MAT-100 — the ballena seat ALWAYS launches with `--auto`

Owner directive 2026-08-19, encoded as the launch command itself, never
as a tip.

1. **`reference/runners.md`** — the reviewer-seat prose (the TUI form,
   currently lines 29-38) carries both ballena launch commands with the
   flag: `opencode -m opencode-go/deepseek-v4-flash --auto` and the
   no-auth fallback `opencode -m opencode/deepseek-v4-flash-free
   --auto`, plus:
   - the one-line reason, verified on this machine 2026-08-19: `--auto`
     auto-approves permissions not explicitly denied; without it the
     reviewer hangs at a permission prompt nobody watches — a 78-minute
     live stall on the MAT-91 review, undiagnosable from the parent's
     seat (worker `ready`, terminal `running`, transcript EMPTY,
     `latestCursor: 0`);
   - the read-only caveat: safe for THIS seat because the filled
     `reviewer.md` forbids commit/push/merge and any file edit; the
     same flag on a WRITING seat is a different decision — stated
     explicitly.
2. **`skills/orchestrate/SKILL.md` step 6** — the two-step launch
   snippet's `terminal create --command` line shows `--auto`; the
   fallback sentence (`-m opencode/deepseek-v4-flash-free`) shows it
   too.
3. **Review-seat stall clock** — placement: `SKILL.md` step 6,
   immediately after the fallback-shell paragraph (post-launch,
   pre-verdict — where the seat's commands live), explicitly tied back
   to step 5's cadence guidance: a ballena cannot heartbeat, so
   MAT-95's cadence rule cannot reach it; it gets a threshold instead.
   Observed normal: 20-45 min. 75+ min with an empty orchestration
   transcript and `latestCursor: 0` is a stall. Recovery as executed
   live: fence with `worker-stop`, remove the review worktree,
   `task-update --status ready`, launch a fresh seat.
4. **`docs/how-it-works/execution.md`** — the review-wave/supervision
   narration gains the stall clock in the same change (house rule:
   behavior change updates the affected chapter).

### MAT-101 — the fallback-shell contradiction

5. **`reference/runners.md`** (currently lines 105-110) says the
   two-step launch's bare create ALWAYS "opens a startup shell of its
   own". Observation from this repo's own Run (2026-08-19): the shell
   appeared on some launches and not others (the MAT-91 review seats
   had none) — "can" is accurate; runners.md is the file to fix.
   `skills/orchestrate/SKILL.md` (line 177, "can leave") and
   `reference/orca.md` (line 109, "can leave") already say "can".
   After the edit, all three files agree — verified, not assumed.
6. **`skills/orchestrate/SKILL.md` step 6** makes the close REQUIRED
   but names only the show command. The actual closing command lands
   where the requirement is stated: one line, `orca terminal close
   --terminal <handle>`, citing `reference/runners.md` for the full
   recipe (single-definition discipline).

### Evals before content

`skills/orchestrate/evals/eval-03.md` is the eval that grades the
review wave. It asserts the two-step launch and the fallback-shell
close, but no eval asserts the launch flags. BEFORE any SKILL.md edit,
eval-03 gains:
- the `--auto` assertion on the ballena launch (both the Go default and
  the free fallback), including the read-only-seat rationale;
- the stall-clock assertion: threshold (75+ min, empty transcript,
  `latestCursor: 0`) and the live-executed recovery sequence.

## Constraints

- Never touch: `CHANGELOG.md`, the `AGENTS.md` version stamp,
  `global/`, `examples/`. No version bump, no restamp — this ships in
  1.4.2 later; the release ritual owns those.
- Sibling lane owns `scripts/agent-lint.mjs`, `tests/**`,
  `docs/how-it-works/standard-lifecycle.md` — do not touch.
- Owned files: `reference/runners.md`, `reference/orca.md`,
  `skills/orchestrate/**`, `docs/how-it-works/execution.md`, this lane
  folder.
- All four gates exit 0 before the PR: self-lint, lint self-tests,
  gen self-tests, eval-structure suite.
- PR body carries `Closes MAT-100` and `Closes MAT-101` on separate
  lines; the PR is left OPEN for the parent's review — the missing
  merge is not a stall.
- All artifacts in English.
