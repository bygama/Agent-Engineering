# Eval 02: v1 repo, version drift

## Query

"Audit this repo against the standard."

## Fixture

A repo on the previous (v1) standard, shaped like `tests/fixtures/v1-style`
but with real content: a canonical ~50-line CLAUDE.md (4 blocks, genuine
gotchas), a ~10-line AGENTS.md entry stub, docs/ tree with ADRs. No stamp
anywhere. Otherwise healthy.

## Expected behavior

- [ ] Runs agent-lint; surfaces exactly the drift findings: `pointer-shape`
      (CLAUDE.md is canonical, not a pointer) and `stamp-missing`.
- [ ] Diagnoses the repo as **v1, healthy but behind** — not as sloppy: the
      report says the content is fine and the *shape* is outdated.
- [ ] Recommends `ae-init` migration as one atomic step (flip + stamp),
      citing that content moves verbatim and nothing is lost.
- [ ] Does NOT flag the genuine gotchas/constraints as bloat.
- [ ] Score reflects the two mediums/highs from drift only; no invented
      findings to pad the table.
- [ ] Changes NOTHING (report-only).
