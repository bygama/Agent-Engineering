# MAT-27 SemVer 1.0.0 rework — decisions

- 2026-08-17 — Renumbering maps former names, never rewrites records:
  CHANGELOG entries keep "formerly AE/2.x" tags and their ORIGINAL
  dates (the reviewer caught a date regression on 0.6.1 — fixed);
  plans/ADRs/SPEC prose stay as written; only SPEC Decision 3 carries
  the ADR-003 amendment pointer. The SPEC's other two-part stamp
  mentions (reviewer F5) stay un-annotated: dated record, and the
  Decision 3 pointer is the single signal by design.
- 2026-08-17 — how-it-works provenance ("live since AE/2.1") keeps
  ship-time names; the index note + CHANGELOG mapping bridge them.
- 2026-08-17 — `examples/` are authoring-time snapshots excluded from
  lint and restamps; the living example is a LINK (workstation), never
  a copied snapshot that would drift.
- 2026-08-17 — The two-part stamp shape stays lint-valid forever:
  old-stamped repos must read as behind (audit), never malformed
  (lint).
