---
issue: MAT-112, MAT-113
---

# SPEC — lane hygiene: the accumulation check and the marathon anti-pattern

## Problem

Field evidence (Pegasuz repo, 2026-08-20): 32 completed lanes accumulated
in `work/` across a ~40-ticket marathon — every lane verified and merged,
work-handoff's close (the commit that REMOVES the lane folder) never ran,
and no tool flagged it. A finished lane whose folder persists in `work/`
is invisible today: neither `agent-lint` nor any skill refuses to pile
more work on top. This lane closes the gap from both sides — a mechanical
check (MAT-112) and skill-side reinforcement (MAT-113) — as one coherent
capability.

## Scope — MAT-112, the check leg (fixture first)

1. **New MEDIUM check in `scripts/agent-lint.mjs`** (work-lanes section):
   when `work/` holds more than N lane folders, emit
   `work/ holds <n> lanes — work/ is ephemeral; close finished lanes
   (work-handoff close removes the folder, history preserves it)`.
   - Threshold **N=5** (ticket's proposal, confirmed here as the final
     call — rationale recorded in DECISIONS.md): XL child lanes live in
     their own worktrees, so a single checkout legitimately holds very
     few lanes at once.
   - The check counts lane FOLDERS, mechanically — it never judges lane
     state or validity.
2. **Fixture + case land before the check** (red-first, then green): a
   boundary pair in `tests/fixtures/` — exactly N lanes passes, N+1
   fails — mirroring the existing `entry-skill-ok`/`entry-skill-bloat`
   pattern, with the case in `tests/run-lint-tests.mjs` proving the miss
   before `agent-lint.mjs` learns the check.
3. **Interplay judgment (recorded where the check is documented)**: a
   lane sitting in the design-first approval window (the marker
   `lane-incomplete` now honors) still COUNTS toward the accumulation
   total — the count measures accumulation, not validity. The over-limit
   fixture includes one window lane to prove it counts (and that
   `lane-incomplete` stays quiet for it).

## Scope — MAT-113, the skill legs (evals first on both skills)

4. **`skills/work-plan`: pre-open sweep.** Before creating
   `work/<slug>/`, check the checkout for lanes whose work is already
   MERGED (on main/master: `branch --merged` / PR state — mechanically
   detectable) but whose folder persists; refuse to open the new lane
   until work-handoff closes them ("the next ticket is not a close").
   - The criterion is **MERGED, not verified**: a verified lane with an
     OPEN PR awaiting its decided merge-order turn is pending, not
     debt — the sweep never forces a merge and never breaks stacked
     waves; merge order stays the parent's/owner's call.
   - In-progress lanes untouched — the rule punishes debt, never
     concurrency.
5. **`skills/work-handoff`: the red-flag row.** "I'll close them all at
   the end of the run" ⇒ in a marathon the end never comes; close is
   per-lane, at each ticket's merge, never a batch sweep.
6. **Evals change before skill content, on both skills.** The
   owner-confirmed scenarios (2026-08-20) become work-plan evals:
   - [a] 4 lanes in flight, 1 finishes+merges, session wants to open 2
     more ⇒ sweep closes the merged one first, leaves the 3 in-progress
     untouched, then opens.
   - [b] stacked wave: lanes verified with open PRs in a decided merge
     order ⇒ NOT debt, sweep opens freely; only a merged-but-present
     folder blocks.
   work-handoff gains an eval exercising the batch-close red flag.

## Docs

`docs/how-it-works/` chapters narrating the lint battery or the lane
lifecycle (`architecture.md`, `work-lifecycle.md`) update in the same
change wherever this lane makes their claims false; explicit no-change
judgments land in DECISIONS.md.

## Fences (from the dispatch brief)

- Never touch: `CHANGELOG.md`, the `AGENTS.md` version stamp,
  `reference/`, `README.md`, `examples/`, `.claude/skills/`,
  `templates/`. No version bump, no restamp, no CHANGELOG entry — the
  check change ships in the owner-paced 1.4.3 release.
- If a template appears to REQUIRE a change, ask the parent first.
- All artifacts in English. PR body carries `Closes MAT-112` and
  `Closes MAT-113`. Push + open PR; never merge.

## Definition of done

- The four gates exit 0 at the lane's end:
  `node scripts/agent-lint.mjs . --ignore tests,templates,examples`,
  `node tests/run-lint-tests.mjs`, `node tests/run-gen-tests.mjs`,
  `node tests/run-eval-checks.mjs`.
- The new lint case demonstrably ran RED (fixture + case, check absent)
  before turning green — evidence quoted in PROGRESS.md.
- Evals committed before skill content on both touched skills.
- work-verify PASS recorded in PROGRESS.md; PR open with both
  `Closes` keys.
