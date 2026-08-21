### Spec compliance
✅ Compliant

Step 11's mandate — re-run the four gates, sweep the repo for `global/`
and bare `global`, classify every hit, change nothing but PROGRESS.md —
was followed. All gate exit codes are honest, the classification scheme
is sound, and the escalation of the unclassified finding was correct
and honestly reported. Two accuracy defects in the sweep's own
bookkeeping keep this from a clean pass (see Important, below).

### Strengths

- **All four gates independently re-run, all green, output byte-for-byte
  matches the transcript.** I ran `agent-lint`, `run-lint-tests.mjs`,
  `run-gen-tests.mjs`, `run-eval-checks.mjs` myself — same 0/0/0, same 22
  lint-test cases, same 7 gen cases, same 13 eval-check groups, all
  exit 0.
- **The two adversarial spot-checks I was pointed at both hold up.**
  `skills/ae-init/references/migration.md:140` and
  `docs/how-it-works/standard-lifecycle.md:172` both genuinely narrate
  `SHIPPED_SURFACE` (`scripts/agent-lint.mjs:354`, untouched) — a
  path-*class* check applied to whatever repo the lint runs against, not
  a claim that this repo carries a `global/` directory. Bucket 3 is the
  right bucket for both.
- **Rulings B and C (bucket 2) verified verbatim against the actual
  files.** `skills/using-ae/evals/eval-03.md` and
  `.claude/skills/docs-sweep/references/patterns.md:48` match
  DECISIONS.md's quoted rulings exactly, word for word.
- **The UNCLASSIFIED finding is genuine and correctly handled.** Read
  `skills/ae-audit/evals/eval-03.md` in full and `AGENTS.md:14`. Both
  claimed falsehoods are real: line 14's quoted command
  (`--ignore tests,templates,global`) matches neither AGENTS.md's current
  command (`tests,templates,examples`) nor even this lane's own
  pre-change baseline (`tests,templates,global,examples`) — it was
  already stale before this lane started. Line 20 lists `global` as a
  top-level directory to check, which no longer exists. The step
  correctly left the file unedited (report-only mandate, `skills/` on
  the never-touch list) and escalated prominently. DECISIONS.md and
  PLAN.md now carry a later "fence LIFTED" ruling and a new PLAN step 12
  (commit `8789e1e`, after step 11's own commit) — consistent with the
  brief that the parent has since ruled this gets fixed in step 12, not
  step 11.
- **Report-only mandate honored.** `git show a1150c3 --stat` (step 11's
  commit) touches exactly one file, `work/mat-111-deglobal/PROGRESS.md`
  — 230 insertions, 2 deletions, and the two deletions are just clearing
  the stale `## In progress: PLAN step 11` bookkeeping line. No repo
  surface was edited. Working tree is currently clean
  (`git status --porcelain` and `git diff --stat` both empty).

### Issues

#### Critical (Must Fix)
None.

#### Important (Should Fix)

1. **File count in the first sweep is wrong: report says 21, actual is
   22.** `grep -rln 'global/' --exclude-dir=.git .` returns **22** files
   on my own run, not 21. Nothing is actually missing from the
   classification table — expanding the grouped bucket-4 row
   (`work/mat-111-deglobal/{SPEC,PLAN,DECISIONS,PROGRESS}.md` = 4 files +
   `reviews/step-{01,02,03,05,06,07,08,09,10}-review.md` = 9 files = 13)
   plus the 9 individually-listed rows = 22, matching my grep exactly.
   So this is an arithmetic error in the summary line ("21/21 files
   classified") and in the commit message ("classifies all 21
   hit-files"), not a coverage gap — but it is precisely the number the
   step asks a reader to trust, and it's wrong. Fix: recount and correct
   both the PROGRESS.md entry's "21" (two occurrences) and, if practical,
   note the correction — the commit message itself is immutable at this
   point.

2. **Two lines never appear anywhere in the second (bare-`global`)
   grep's classification, despite the claim to have "read every
   remaining line."** I reran
   `grep -rin 'global' --exclude-dir=.git . | grep -v 'global/'` myself:
   82 raw lines, 1 is the `./.git` worktree gitdir pointer (matches
   because the worktree path contains "deglobal") — exactly as the
   report describes, confirmed accurate. But of the 81 real lines:
   - `scripts/agent-lint.mjs:354` — `const SHIPPED_SURFACE =
     /^(skills|reference|templates|global|loops)\//;` — contains
     "global" with no trailing slash in the regex alternation, so it
     correctly falls in this second grep rather than the first, but it
     is never named. The file *is* named in class 1, just for its other
     five lines (`:13,143,145,147,149`) — `:354` is dropped silently.
   - `skills/ae-audit/references/checklist.md:41` — `"Global exception |
     ~/.claude-style file (H1 # Global instructions) ≤40 lines, own
     canon | medium"` — this whole *file* never appears in class 1, 2,
     or 3 anywhere in the report.
   Both lines are substantively harmless — accurate, untouched
   descriptions of the content-detected global-CLAUDE canon check, the
   same class as the correctly-classified `reference/context.md` hits —
   so this is not a live defect the step should have fixed. But it is a
   real gap between the claim ("read every remaining line... all fall
   into one of three harmless classes") and what was actually
   enumerated, on the one file (`ae-audit/`) this lane already found one
   real defect in. Worth a one-line fix noting both, for the record's
   own credibility.

#### Minor (Nice to Have)

- The commit message for `a1150c3` repeats the same "21 hit-files" count
  as the PROGRESS.md entry — fixing the PROGRESS.md text won't retroact
  into the commit message; worth a one-line acknowledgment in a future
  entry if the count is corrected, so the two don't disagree on record.

### Assessment
**Step quality:** Needs fixes
**Reasoning:** Every substantive verdict — all four gates green, the
bucket-3 and bucket-2 spot-checks, and the unclassified-finding
detection/escalation — holds up under independent re-verification with
no live defect left un-surfaced. The two Important findings are both
about the sweep's own bookkeeping accuracy (a wrong headline count, two
silently-dropped lines from an "exhaustive" claim) rather than a missed
classification or an improper edit, so a small fix round (recount, add
the two lines to class 1) should clear this without revisiting the
underlying judgment.
