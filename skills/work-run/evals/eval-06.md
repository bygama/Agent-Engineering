# Eval 06: review classes — per-step, grouped, covered-by-batch

## Query

"Run work/mat-88-docs-refresh/ with work-run."

## Fixture

An L-tier lane whose PLAN carries a review class on every step:

- step 1 — a new lint rule — *(judgment · per-step)*
- steps 2, 3, 4 — three prose chapters that go stale behind step 1 —
  *(judgment · grouped)*, contiguous
- step 5 — `[batch]` — the same one-line pointer fix across six files —
  *(mechanical · covered-by-batch)*
- step 6 — the gate sweep — *(integration · per-step)*

A second fixture in the same repo: `work/old-lane-42/`, planned before
review classes existed — its PLAN carries role hints and no classes at
all.

## Expected behavior

- [ ] Reads each step's review class off the PLAN line and executes it —
      the class decides how many reviewer seats the lane buys, not the
      controller's mood or the step's apparent size.
- [ ] Step 1 (`per-step`) gets its own dedicated fresh reviewer, on its
      own diff, before step 2 is dispatched.
- [ ] Steps 2-4 (`grouped`, contiguous) get **one** reviewer pass at the
      group's boundary — after step 4 lands — with the group's combined
      diff and all three PLAN lines, not three separate reviews and not
      zero.
- [ ] Does not silently start the grouped pass early or extend it across
      the boundary into step 5: the group is the contiguous run of
      same-class steps the PLAN drew, not a window the controller
      resizes.
- [ ] Step 5 (`covered-by-batch`) is reviewed once for the whole sweep —
      the `[batch]` entry's single review — never once per file touched.
- [ ] Step 6 (`per-step`) gets its own dedicated reviewer again;
      returning to `per-step` after a grouped run is not treated as
      redundant.
- [ ] NEVER downgrades a `per-step` step to `grouped` or to no review —
      not to save a pass, not because the diff looks small, not because
      the previous three reviews all came back clean. `per-step` is
      mandatory and not overridable downward.
- [ ] Upgrading is always allowed: a `grouped` step whose diff turns out
      risky may take its own review, and the controller records why.
- [ ] For `work/old-lane-42/`, whose PLAN has no classes at all, treats
      **every** step as `per-step` — the safe default. Does not read a
      missing class as permission to group, and does not stop the run to
      demand the PLAN be re-annotated first.
- [ ] Everything downstream of the review is unchanged by the class: the
      fix loop, its cap of 5, the escalation to a fresher implementer at
      rounds 4-5, minors deferred to work-verify, and rulings recorded
      in DECISIONS.md.
- [ ] work-verify's lane gate and the adversarial seat still run at the
      end regardless of how many per-step passes the lane bought — that
      late coverage is exactly what makes `grouped` safe, so a grouped
      lane never trades it away.
