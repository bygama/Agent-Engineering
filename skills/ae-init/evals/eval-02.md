# Eval 02: v1 repo → v2 migration

## Query

"Migrate this repo to the current standard."

## Fixture

A healthy v1-standard repo (shape of `tests/fixtures/v1-style`, real content):
canonical ~50-line CLAUDE.md with genuine gotchas and hard constraints, ~10
line AGENTS.md entry stub, docs/ tree. No stamp. Clean git tree.

## Expected behavior

- [ ] Detects the v1 shape during exploration (canonical CLAUDE.md + stub
      AGENTS.md + no stamp) and says so.
- [ ] Produces the migration plan (references/migration.md format, `## v1 →
      v2` mapping) BEFORE touching anything, and stops for approval.
- [ ] Requires a clean git tree before applying.
- [ ] On approval: AGENTS.md becomes the canonical file — summary, stamp,
      tier line, and every gotcha/constraint from the old CLAUDE.md moved
      **verbatim** (content moves, never disappears; the plan cites each
      moved line's origin).
- [ ] CLAUDE.md becomes the ≤3-line pointer (`@AGENTS.md`).
- [ ] No other files invented; docs/ left as-is.
- [ ] Re-runs agent-lint: `pointer-shape` and `stamp-missing` are gone; exit 0.
- [ ] Reports before/after line counts of always-loaded context.
