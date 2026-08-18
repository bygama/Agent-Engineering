---
issue: MAT-43
---
# dispatch templates — spec

<!-- Owner-written (work-plan direct mode: MAT-43's issue text is the
     spec; owner directed "procede con mat-43"). -->

Done looks like: work-run and work-verify dispatch from shipped
templates instead of improvised prompts. Evidence: today's five
production runs improvised ~21 dispatch prompts by hand — consistent
only because one session wrote them all. The machinery is adapted from
superpowers (implementer-prompt.md, task-reviewer-prompt.md,
re-review-prompt.md, code-reviewer.md) to the lane shape.

## Constraints (bind every step)

- Templates are REFERENCES one level from SKILL.md
  (`reference/skills.md` authoring rule); each is a fill-in prompt
  skeleton with `[PLACEHOLDER]` slots, told apart from instantiated
  text; SKILL.md stays <500 lines and gains only pointer lines.
- The templates encode the lane shape, not superpowers' workspace:
  implementer = lane path + step number + step's PLAN line + the
  4-state report contract (report appended to PROGRESS.md, return =
  status + commits + one line) + no-subagents rule; step-reviewer =
  exactly three inputs (diff package path, PLAN step, SPEC) + BOTH
  verdicts (spec compliance AND quality) + severity buckets
  Critical/Important/Minor with file:line + read-only review rule +
  no-subagents; re-reviewer = scoped to the fix diff, verdicts each
  finding ADDRESSED/NOT ADDRESSED, flags only new breakage in the fix
  diff; whole-lane reviewer (work-verify's fresh-context seat) = lane
  path + diff range + DoD, must ACT (run the commands itself) and
  quote outputs.
- Steal the good judgment lines from superpowers' code-reviewer.md:
  calibration (not everything is Critical), acknowledge strengths,
  file:line specificity, clear verdict mandatory, "don't review code
  you didn't read".
- Nothing unshipped referenced (no shaping); records untouched.

## Files

- `skills/work-run/references/implementer.md`
- `skills/work-run/references/step-reviewer.md`
- `skills/work-run/references/re-reviewer.md`
- `skills/work-verify/references/lane-reviewer.md`
- SKILL.md pointer lines: work-run's dispatch step points at
  implementer.md, its review step at step-reviewer.md, its fix loop at
  re-reviewer.md; work-verify's step 4 points at lane-reviewer.md.
- `docs/how-it-works/work-lifecycle.md`: one sentence where work-run's
  loop is described — dispatch and review prompts ship as templates
  with the skill (hard constraint: same-change chapter update).

## Evals first (hard constraint)

- work-run evals: extend eval-01's checklist — dispatches are composed
  from the shipped templates (the four things filled into
  implementer.md, not a freehand prompt); reviews composed from
  step-reviewer.md with the three inputs. Extend eval-02 — fix-loop
  re-reviews use re-reviewer.md.
- work-verify evals: extend the eval covering the fresh-context seat —
  the reviewer dispatch is composed from lane-reviewer.md.
- Eval edits land BEFORE the templates and SKILL.md pointers.

## DoD

Four gates exit 0 (eval-checks re-validates the edited evals); lint
green; fresh-context review of the whole diff; release ritual sizes
the bump (expected MINOR — new skill surface) unless the owner packs
it with shaping into one release.
