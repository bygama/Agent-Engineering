# Repo declares its tracker workspace — decisions

<!-- Append-only: date — choice — why. -->
- 2026-08-18 — SPEC approved by the parent orchestrator via blocking
  orchestration ask — design-first gate cleared; the parent stands in for
  the owner on this dispatched lane.
- 2026-08-18 — Fence formally extended to
  `docs/how-it-works/integrations.md`, scoped to the tracker-rule
  distillation only — parent ruling: the repo's same-change hard
  constraint outranks the dispatch fence; the chapter is disjoint from
  the sibling lane (mat-58), no collision risk.
- 2026-08-18 — argpiscinas retrofit (named in MAT-61's ticket) excluded
  from this lane — the ticket is context; the dispatch brief is binding
  and fences this repo only.
- 2026-08-18 — Declaration line format defined once in
  `reference/tracker.md` and cited everywhere else — one source of truth
  for the writer (ae-init) and the readers (respect rule, work-handoff).
- 2026-08-18 — work-verify triage of the deferred step-review minors:
  FIX in one polish commit — (a) reorder tracker.md's resolution bullet
  to lead with the URL slug and name the `workspace.name` display-name
  trap explicitly; (b) correct the JSON path to `result.meta.resolved`;
  (c) drop the trailing simile on the inertness bullet; (d) close the
  empty-workspace gap: an unresolved binding (no issue to read, empty or
  erroring list) is handled like a mismatch — no write, emit the
  operation; (e) eval-05: state explicitly that the owner's answer is the
  fixture's ground-truth values; (f) eval-05: trim the abstract format-
  structure bullet to the citation, keeping the concrete instantiated
  line (an eval must show expected output; it must not re-derive the
  canonical structure). ACCEPT as-is — capitalization drift ("ANY" in
  the source and eval-03, lowercase "any" in the two citing sentences):
  paraphrase versus the source's own emphasis device, no semantic
  effect; normalizing would churn three files for nothing.
