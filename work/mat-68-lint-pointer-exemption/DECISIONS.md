# DECISIONS — mat-68-lint-pointer-exemption

Rulings from the parent orchestrator (run_fafc4f70d4ac), recorded as they
land. The parent's brief is the binding design input; these entries extend
or settle it.

## 1. Scope addition: checklist monorepo/pointer rows vs the nesting law

Source: parent status msg_d1f3f667565c (2026-08-19), pre-SPEC. MAT-82's
lane reviewer surfaced that `skills/ae-audit/references/checklist.md`
still grades the Monorepo row (line 59) — and the per-app pointer row
(line 40) — by the retired per-app-only rule. Brief item 3 extends to
rewording that row set against the nesting law merged with MAT-82
(`reference/context.md`): nested AGENTS.md (≤30) + pointer CLAUDE.md
beside it at any earned depth, no privileged `apps/*` level. Folded into
SPEC §3. Base the work on fresh main (acdcec0), which contains MAT-82.

## 2. SPEC approved; scope extended by one clause in reference/context.md

Source: parent's answer to the design-first approval ask (2026-08-19).
SPEC points 1-4 approved as formalized. One extension: the budget-table
pointer row in `reference/context.md` gains the same one-clause exemption
note, citing the lint as the mechanism, not restating the marker grammar
(single-definition discipline). Rationale: law and check must not drift
apart (the repo's ritual-and-law principle) — a reader of the budget table
would otherwise believe a fenced-block pointer violates the standard while
the check permits it. MAT-82 is merged, so context.md is stable — no
contention. Folded into SPEC §5.
