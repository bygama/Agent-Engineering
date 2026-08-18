# shaping — progress

## Done

- 2026-08-18 — Init phase: design closed by owner in MAT-45 (name,
  approach A, replace-not-additive, ADR-006, tier consumption, no
  companion); ADR-007 shipped first so the release sizes as the owner
  directed (1.3.1 package, 1.4.0 reserved).
- 2026-08-18 — H1 (judgment): all eval work first, per SPEC §4.
  - Created `skills/shaping/evals/eval-01.md` (dialogue shape: one
    question at a time, purpose/constraints/success criteria before
    approaches, 2-3 approaches with recommendation first, sectioned
    design confirmed section-by-section, no implementation before
    approval, YAGNI).
  - Created `skills/shaping/evals/eval-02.md` (tier consumption + gate:
    never re-triages using-ae's tier; the approval gate holds even for
    a "trivial" S-tier ask; a feasibility probe is treated as an
    S-tier probe — answer, report, keep nothing).
  - Created `skills/shaping/evals/eval-03.md` (supersession +
    fallback: superpowers' `brainstorming` yields to `shaping` citing
    ADR-006 in an AE-standard repo; falls back to `brainstorming`,
    named explicitly, only when AE isn't installed; never both at
    once).
  - Created `skills/shaping/evals/eval-04.md` (terminal handoff:
    approved design invokes work-plan design-first immediately;
    shaping writes no SPEC/PLAN/own folder; work-plan's own approval
    gate still applies; tier carried forward unchanged).
  - Reworded `skills/work-plan/evals/eval-05.md` scenario (c)'s
    checklist bullet: "points at brainstorming as the next step" →
    "invokes shaping as the next step".
  - Added one routing checklist bullet to
    `skills/using-ae/evals/eval-01.md` (the entry eval): the map must
    carry a `shaping` row for the design phase once MAT-45 H3 lands;
    marked as expected-to-fail-until-then, following the existing
    eval-03 forward-declaration pattern in that same skill.
  - `skills/shaping/` has no SKILL.md yet (H2), so
    `tests/run-eval-checks.mjs` does not yet enumerate its evals —
    expected per the plan's evals-before-content ordering; the command
    still exits 0 today (11 skills checked, all well-formed) and will
    pick up shaping's 4 evals automatically once H2 adds SKILL.md.
  - Acceptance: `node tests/run-eval-checks.mjs` → exit 0 ("all eval
    checks passed"). F01's verification is this same command — green.
  - Also ran `node scripts/agent-lint.mjs . --ignore
    tests,templates,global,examples` as a sanity check (not part of
    H1's acceptance): "0 high, 0 medium, 0 low — PASS".
  - Files changed: `skills/shaping/evals/eval-01.md` (new),
    `skills/shaping/evals/eval-02.md` (new),
    `skills/shaping/evals/eval-03.md` (new),
    `skills/shaping/evals/eval-04.md` (new),
    `skills/work-plan/evals/eval-05.md` (edit),
    `skills/using-ae/evals/eval-01.md` (edit).
  - Concerns: none — no SKILL.md content was written in this step, no
    scope beyond the eval files named in H1.

## In progress

- 2026-08-18 — Owner approved SPEC+PLAN (direct-mode gate). Executing
  H1-H4 via work-run — dispatches composed from
  skills/work-run/references/ (the templates' first production use).

## Tried and failed

## Next

- H2: `skills/shaping/SKILL.md` — the minimum that passes the evals
  just written.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->
