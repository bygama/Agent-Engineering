# MAT-111 — decisions

<!-- Rulings that shaped this lane. Parent's answers are quoted, not paraphrased. -->

## 2026-08-20 — Parent ruling at the SPEC gate (design-first)

Asked as one blocking `orca orchestration ask` after SPEC.md was
written: SPEC approval plus three fence collisions the brief told the
lane to ask about rather than choose. Parent's answer, verbatim in
substance:

> SPEC approved; A=yes B=1 C=1.

### Precondition verified before asking

`bygama/workstation` `main` @ `22f3619`: `claude/CLAUDE.md`'s header
reads `<!-- Canonical: workstation/claude/CLAUDE.md — applied to
~/.claude/CLAUDE.md by claude/install.ps1. -->`, and `claude/hooks/`
carries both `orca-probe.ps1` and `using-ae.ps1`. MAT-110 is merged;
deleting this repo's `global/` loses no content.

### Ruling A — `reference/orca.md:27` (not fenced) → repoint

> (A) yes — repoint reference/orca.md to reference/global-layer.md with
> a generic probe description, minimal words, stay under the cap.

Applied in PLAN step 8. `reference/orca.md` is at its 120-line cap, so
the edit is word-for-word neutral or shorter.

### Ruling B — `skills/using-ae/evals/eval-03.md` (fenced) → leave

> (B) option 1 — leave the eval untouched, record the staleness in
> DECISIONS.md as accepted debt; the follow-up is already filed as
> MAT-114, cite it in your DECISIONS entry. For the record, option 2's
> repoint to workstation/claude/hooks/ would have been rejected anyway:
> an AE eval must anchor to the standard's doctrine (the new reference
> doc), never to the owner's personal repo — MAT-114 says exactly that.

**Accepted debt, owned by MAT-114.** `eval-03.md`'s Query and Fixture
name `global/hooks/using-ae.ps1` and `global/hooks/orca-probe.ps1` as
the artifacts under test; after this lane those paths do not exist in
this repo. No gate breaks — `tests/run-eval-checks.mjs` is structural
only (`## Query` + `## Expected behavior` + ≥1 checklist line), it never
resolves a path. The correct anchor is the new reference doc's doctrine,
not workstation; MAT-114 carries that rewrite.

### Ruling C — `.claude/skills/docs-sweep/references/patterns.md:48` (fenced) → leave

> (C) option 1 — leave the battery entry, record it; the battery's own
> law says entries are corrected with a stated reason through
> docs-sweep, and the next sweep owns that correction.

The entry ("`reference/verification.md` and `global/` carry no tier
enumerations — by design, not by omission") asserts nothing false about
the repo; it exempts a directory that no longer exists. Dead half, not
wrong half. The next `docs-sweep` run owns the correction.

## 2026-08-20 — Two brief corrections, accepted by the parent

> Your two corrections are accepted: global/hooks/README.md is the right
> path, and update all FOUR live ignore-string sites (gates.yml,
> AGENTS.md, CONTRIBUTING.md, loops/self-audit.md) — re-stamping the
> self-audit verified date is correct since you actually run the new
> command.

1. **No top-level `global/README.md` exists.** The brief's "README" is
   `global/hooks/README.md`. Deleting the directory covers it; nothing
   else was missing.
2. **The old ignore string is live in four places, not two.** The brief
   named `AGENTS.md` and the CI workflow; grep also found
   `CONTRIBUTING.md:23` and `loops/self-audit.md:20`. All four flip to
   `--ignore tests,templates,examples`. `loops/self-audit.md`'s gate line
   carries a `verified 2026-08-17, exit 0` stamp that the command change
   invalidates, so it is re-stamped with this lane's own run date.

## 2026-08-20 — `scripts/agent-lint.mjs` stays untouched (brief) — and costs nothing

Two checks in the lint mention or imply `global/`; neither needs a
change and neither loses coverage:

- `SHIPPED_SURFACE = /^(skills|reference|templates|global|loops)\//`
  (machine-anchored-path check) keeps `global/` as a **vendored-dir
  class in consumer repos**. True with this repo's own `global/` gone —
  that is precisely the brief's reasoning.
- The global-CLAUDE.md 40-line canon is **content-detected**, not
  path-bound: it fires on any `CLAUDE.md` whose first line is
  `# Global instructions`. It stays exercised by
  `tests/fixtures/global-layer` (`tests/run-lint-tests.mjs:143`), so
  deleting `global/` removes no lint test coverage.

## 2026-08-20 — Judgments recorded at execution

Recorded by the steps that made them; see PROGRESS.md for the evidence.

- **`examples/machine-config/README.md`** (brief step 7) — verdict in
  PROGRESS step 10.
- **`docs/how-it-works/standard-lifecycle.md` five-surface sentence**
  (brief step 5) — verdict in PROGRESS step 7.

## 2026-08-20 — Out of scope, reported not fixed

`bygama/workstation`'s own `claude/README.md` still describes its
`hooks/` folder as "(canonical source: `Agent-Engineering/global/hooks/`)"
— stale the moment this lane merges. Different repo, different ticket.
Parent's instruction:

> Good catch on workstation's claude/README.md drift: report it in your
> worker_done body and I will fold it into the wave close on the
> workstation side.

## 2026-08-20 — Controller ruling: step 4's acceptance grep excludes the lane

**Defect in the PLAN, not in the work.** Step 4's acceptance was written as
a repo-wide `grep -rl 'tests,templates,global,examples'` expecting zero
hits. But the lane's own files quote the old command to *describe* the
change — SPEC.md, PLAN.md, PROGRESS.md and the `reviews/` verdicts all
name it — so the repo-wide form can never reach zero without falsifying
the lane's own record.

Step 3's implementer flagged this ahead of time rather than pre-empting
it ("that is step 4's call to make"); step 4's implementer ran the
lane-excluded variant, reported **both** the command it ran and why, and
did not edit any record to make a grep pass.

**Ruling:** the acceptance command's intent is "no live surface outside
the lane's own records still carries the old string". Verified true:

```
$ grep -rl 'tests,templates,global,examples' --exclude-dir=.git . | grep -v '^./work/mat-111-deglobal/'
(none outside the lane)
```

PLAN.md step 4's acceptance line is corrected to
`--exclude-dir=mat-111-deglobal` so the lane's own plan states the command
that actually gates it. No content change to any repo surface.
