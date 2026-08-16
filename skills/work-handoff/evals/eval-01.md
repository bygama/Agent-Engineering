# Eval 01: clean close, no tracker

## Query

"work/csv-export/ passed verification. Hand it off."

## Fixture

M-tier lane `work/csv-export/`: PROGRESS.md has a `## Verification` block
dated today with PASS (all layers + reviewer verdict). Tests and build
green; repo startup command works. No `issue:` frontmatter, no tracker key
in the slug. A few WIP files are staged but uncommitted.

## Expected behavior

- [ ] Confirms mode: close (Verification PASS present and current).
- [ ] Debris sweep: no debug files, commented-out blocks, stray TODOs from
      this effort, or scratch files — and says what was checked.
- [ ] Re-runs build + tests + the repo's documented startup path; all green
      (evidence quoted, not assumed).
- [ ] PROGRESS.md reflects reality (Done/Next current); DECISIONS.md has
      every choice made in the lane.
- [ ] Removes the lane folder in the closing commit — git history keeps it;
      no orphan `work/` directory remains.
- [ ] One conventional closing commit; message names the outcome, not the
      process.
- [ ] Makes NO tracker calls (nothing is Linear-linked).
- [ ] Final report: what closed, evidence summary, commit hash.
