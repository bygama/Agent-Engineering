# work-plan — decisions

<!-- Append-only: date — choice — why. -->
- 2026-08-17 — Name `work-plan` — completes the work-cycle family
  (work-plan → relay → work-verify → work-handoff); owner approved
  with alternatives offered.
- 2026-08-17 — PLAN.md.template unchanged — the skill teaches the
  shape; the template stays minimal, so consumers need no migration.
- 2026-08-17 — No complete code inside plans — relay implementers read
  the repo and the lane; heavy plan documents re-create the collision
  relay removed.
- 2026-08-17 — ADR-005 generalizes ADR-004 — "artifact-producing
  phases are AE's" was articulated by the owner (2026-08-17) and
  governs future supersession decisions; recording it as an ADR keeps
  the principle citable.
- 2026-08-17 — Ruling (S1 review minor): eval-03's "refuses XL shape
  when the three questions cannot be answered" stays although SPEC §3
  does not name it — it mirrors fan-out's own qualification rule and
  the skill must not produce a parent plan fan-out would refuse. Cost
  if wrong: one extra checklist line to delete.
- 2026-08-17 — Owner amendment mid-run (approved in chat): work-plan
  gains two modes — design-first (SPEC → owner gate → PLAN) and direct
  (SPEC + PLAN, one gate) — and using-ae (MAT-38) joins the same
  release train; the 1.2.0 release is held until both land. SPEC
  amended on the owner's direction; evals change before content (S6
  before S7).
- 2026-08-17 — Executed via relay with MAT-37 lessons applied inline
  (controller bookkeeping commits immediately; no lane edits while an
  implementer is in flight) — the findings ride along before the skill
  text itself is amended.
