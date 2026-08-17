---
issue: MAT-27
---

# MAT-27 SemVer 1.0.0 rework — progress

## Done

- 1.0.0 release (AE PR #34): SemVer + Keep a Changelog (verified at
  source), history renumbered (0.1.0 predecessor, 0.2.0–0.6.1 formerly
  AE/2.0–2.6), stamps `AE/MAJOR.MINOR.PATCH`, lint accepts both shapes,
  restamps, README Installing/Customizing/Examples, `examples/` (three
  shapes + living workstation example), ADR-003 + SPEC amendment.
- Dynamic version badge + `v1.0.0` git tag; bump ritual now tags and
  drops the badge restamp (AE PR #35). Badge label AE (AE PR #36).
- workstation restamped `AE/1.0.0` (its PR #17, CI green — its
  `standard` job validated the three-part stamp with the new lint).
- Review findings fixed: 0.6.1 date regression (record dates never
  change in a renumbering), lint header/message old-scheme mentions,
  migration mapping-table stamp shape.

## In progress

## Tried and failed

## Next

## Verification

### 2026-08-17 — M DoD — PASS
- L1 static: `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` → exit 0 (0 findings)
- L2 behavioral: `run-lint-tests` 13/13, `run-gen-tests` all, `run-eval-checks` all → exit 0 (re-run at final HEAD by the reviewer)
- L3 end-to-end: workstation CI `standard` job green against the new lint + three-part stamp; `git tag -l v1.0.0` exists, pushed; grep sweep: old-scheme names only in records/fixtures/"formerly" tags/deliberate provenance
- Fresh-context review: PASS, 11/11 DoD items verified by command — F1 (0.6.1 date) fixed; F2–F4 (old-scheme strings in lint comment/message + migration table) fixed; F5 (SPEC restates two-part stamps beyond Decision 3) accepted as dated record (DECISIONS)
- Adversarial review: n/a — M tier, not requested
