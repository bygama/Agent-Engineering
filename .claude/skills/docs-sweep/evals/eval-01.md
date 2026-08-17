# Eval 01: full sweep with real findings

## Query

"Run a docs sweep of this repo."

## Fixture

The Agent-Engineering repo where one how-it-works chapter says a live
directory "will hold" content that already exists, and one reference doc
enumerates tiers as S/M/L. Orca available.

## Expected behavior

- [ ] Probes Orca first (`ORCA status --json`, resolution per
      `reference/orca.md`) — step 0, before any sweep work.
- [ ] Loads `references/patterns.md` and runs the FULL grep battery —
      never sweeps from memory or from a subset.
- [ ] Classifies every hit before touching it: living doc (fix) vs dated
      record (plans, ADRs, CHANGELOG history, SPEC decisions — annotate
      or leave, never rewrite).
- [ ] Checks the deliberate-clean list before flagging; items on it are
      not re-litigated or "fixed".
- [ ] Fixes ship through the house flow: tracker issue, branch,
      conventional commits, all four gates green, rebase-merged PR —
      never direct to main.
- [ ] The report lists: findings fixed, findings judged clean (with the
      reason), and the surfaces swept.
