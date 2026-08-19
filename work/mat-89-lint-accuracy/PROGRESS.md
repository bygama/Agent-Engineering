# agent-lint accuracy (MAT-89 + MAT-92) — progress

<!-- First read of every session. If it isn't here, it didn't happen. -->

## Done

- Investigated both tickets against clean main (9fc4bda) before touching
  anything. MAT-89 reproduced with a scratch repo citing one escaping and
  one in-repo `node` path, both absent:

  ```
  MEDIUM AGENTS.md:7  file not found: ../Agent-Engineering/scripts/agent-lint.mjs  [cmd-drift]
  MEDIUM AGENTS.md:8  file not found: scripts/missing.mjs  [cmd-drift]
  0 high, 2 medium, 0 low — FAIL
  ```

  Line 7 is the false positive; line 8 is the behavior to protect.
- MAT-92 investigated: the 80-line cap is stated nowhere in the standard
  (evidence and greps in DECISIONS.md, entry 4). `reference/skills.md:79`
  names the entry skill without a number.
- SPEC.md written from the parent's shaped design; design-first gate sent
  as a blocking `ask` with the `reference/skills.md` fence question.
- Parent ruled: SPEC approved; `reference/skills.md` may be MODIFIED (fold
  the number into :79-80, file stays at 119 lines), not extended.
- PLAN.md shaped: 6 steps, grader-before-check ordering as a lane-wide
  constraint.

- **Step 1 DONE — RED for MAT-89.** Added `tests/fixtures/cmd-escaping/`
  (absent `node ../sibling-toolchain/scripts/agent-lint.mjs .` plus a
  present `node scripts/present.mjs`) and
  `tests/fixtures/cmd-inrepo-drift/` (absent `node scripts/missing.mjs`);
  `tests/run-lint-tests.mjs` gained `expectMatch`, the mirror of
  `forbidMatch`, and both cases. Acceptance — `node
  tests/run-lint-tests.mjs` exits 1, RED for the right reason:

  ```
  FAIL cross-repo sibling path reports low, does not fail the lint
    expected fail=false, got true
    no finding message matched expected "escapes the repo"
    no finding message matched expected "sibling checkout"
    findings: cmd-drift
  ok   in-repo path that no longer exists still fails the lint
  1/18 cases failed
  ```

  The guard case is green from birth by design (it grades behavior that
  already works). Declared as a regression guard and proven to bite with
  a throwaway mutation probe — the `node <path>` existence branch
  commented out, runner re-run, then `git checkout --` restored the file:

  ```
  FAIL in-repo path that no longer exists still fails the lint
    expected fail=true, got false
    missing expected finding "cmd-drift"
    no finding message matched expected "file not found: scripts/missing.mjs"
  ```

- **Step 2 DONE — GREEN for MAT-89.** `scripts/agent-lint.mjs` resolves the
  cited `node <path>` against the root once and classifies before judging:
  escaping (`relative()` starts with `..`, or absolute) and missing → `low`
  naming the context-dependence; escaping and present → nothing; in-repo and
  missing → the unchanged MEDIUM. Header comment documents the exemption
  beside the pointer one. Acceptance — `node tests/run-lint-tests.mjs`
  exits 0, `all 18 cases passed`, including both step-1 cases.

  Real-world re-run of the §Problem 1 repro, same scratch repo:

  ```
  MEDIUM AGENTS.md:8  file not found: scripts/missing.mjs  [cmd-drift]
  LOW    AGENTS.md:7  ../Agent-Engineering/scripts/agent-lint.mjs escapes the repo
                      — context-dependent, resolves only where the sibling
                      checkout exists  [cmd-drift]
  ```

- **Step 3 DONE — RED for MAT-92, law first.** `reference/skills.md` :79-80
  now states the cap inside the sentence that already named the entry skill
  ("…always-loaded entry point (SessionStart), hard-capped at 80 lines…"),
  folded per the parent's ruling — the file is still exactly 119 lines of
  its 120 cap. Added `tests/fixtures/entry-skill-ok/`
  (`skills/using-ae/SKILL.md` at exactly 80) and
  `tests/fixtures/entry-skill-bloat/` (the same file at 81, differing by one
  line) plus both cases. Acceptance — `node tests/run-lint-tests.mjs`
  exits 1, RED for the right reason, boundary case already green:

  ```
  ok   entry skill exactly at the always-loaded cap passes
  FAIL entry skill one line over the always-loaded cap fails
    expected fail=true, got false
    missing expected finding "entry-skill-cap"
    no finding message matched expected "81 lines"
    findings: (none)
  1/20 cases failed
  ```

  `wc -l reference/skills.md` → 119.

- **Step 4 DONE — GREEN for MAT-92.** `scripts/agent-lint.mjs` gained
  `ENTRY_SKILL` / `ENTRY_SKILL_CAP` beside the existing skill loop, with a
  pointer comment citing the `reference/skills.md` statement step 3 wrote —
  the shape the file already uses for the AGENTS.md budgets. Fires
  `medium` / `entry-skill-cap` when that exact path exceeds the cap; repos
  that do not vendor the entry skill are unaffected. Acceptance:

  ```
  ok   entry skill exactly at the always-loaded cap passes
  ok   entry skill one line over the always-loaded cap fails
  all 20 cases passed                                    (exit 0)

  agent-lint …\mat-89-lint-accuracy
  0 high, 0 medium, 0 low — PASS                         (exit 0)
  ```

  The live entry skill measures 78 lines and stays silent; the constant is
  a single shared string, so the fixtures grade the path itself — a typo
  would turn both entry-skill cases red rather than dying silently.

- **Step 5 DONE — docs.** `docs/how-it-works/standard-lifecycle.md`, audit
  section: the enumeration of what the lint counts now names the
  always-loaded entry skill's cap, and two new paragraphs state the
  command-drift exemptions (the `# not verified` honesty marker, which the
  chapter had never carried, and the escaping path reported-but-not-failed,
  with the in-repo case explicitly untouched) and why the entry-skill cap is
  the one budget that is not about a file's own readers. All four gates:

  ```
  node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
    0 high, 0 medium, 0 low — PASS                       (exit 0)
  node tests/run-lint-tests.mjs   all 20 cases passed    (exit 0)
  node tests/run-gen-tests.mjs    all gen cases passed   (exit 0)
  node tests/run-eval-checks.mjs  all eval checks passed (exit 0)
  ```

- **Step 6 DONE — close.** work-verify ran the M DoD (block below), the
  fresh-context reviewer returned PASS with five findings, all five were
  applied — the two behavioral ones graded first (f5262dd RED → 85ec18f
  fix) — and the re-review confirmed four ADDRESSED with the fifth (this
  bookkeeping) deferred here on purpose.

## In progress

- Nothing — lane verified, handing off.

## Tried and failed

## Next

- Parent's adversarial review wave (1 ballena), then rebase onto fresh
  main at the parent's request. Merge is the parent's action, never this
  lane's.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

### 2026-08-19 — M DoD — PASS

- L1 static: `node --check scripts/agent-lint.mjs` → exit 0;
  `node --check tests/run-lint-tests.mjs` → exit 0;
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → exit 0 (`0 high, 0 medium, 0 low — PASS`)
- L2 behavioral: `node tests/run-lint-tests.mjs` → exit 0
  (`all 20 cases passed`, 16 pre-existing + 4 this lane);
  `node tests/run-gen-tests.mjs` → exit 0 (`all gen cases passed`);
  `node tests/run-eval-checks.mjs` → exit 0 (`all eval checks passed`);
  the lint itself runs against foreign roots — `node scripts/agent-lint.mjs
  C:/Briar/repos/mine/skills` → exit 0
- L3 end-to-end: the real MAT-89 scenario, not a fixture. The actual
  `bygama/skills` AGENTS.md linted in both conditions. Sibling present
  (owner's checkout, read-only): `0 high, 0 medium, 0 low — PASS`, nothing
  reported. Sibling absent (its AGENTS.md + CLAUDE.md copied where no
  sibling exists — the worktree condition the ticket describes):

  ```
  LOW  AGENTS.md:15  ../Agent-Engineering/scripts/agent-lint.mjs escapes the repo
       — context-dependent, true only where that path exists outside it
       (a sibling checkout, CI)  [cmd-drift]
  0 high, 0 medium, 1 low — PASS   exit 0
  ```

  The reviewer re-ran the same directory against the PRE-FIX lint
  (`git show 9fc4bda:scripts/agent-lint.mjs`) and got
  `MEDIUM … file not found: ../Agent-Engineering/scripts/agent-lint.mjs`,
  `0 high, 1 medium, 0 low — FAIL exit 1` — the MEDIUM that failed both
  skills-repo children last night, now a LOW that names its own
  context-dependence, signal intact.
- Fresh-context review: **PASS** (in-session subagent, capable tier, no
  shared context; dispatched under the parent's ruling recorded in
  DECISIONS.md). It re-derived the grader-before-check ordering by
  replaying HEAD's runner against the pre-fix lint — both graders
  genuinely RED — and probed eleven path shapes plus the cap at
  78/79/80/81/120 and two wrong paths. One Important (a docs paragraph
  join) and four Minor, all applied; re-review verdict: four ADDRESSED,
  the fifth deferred here to handoff, `PASS stands`.
- Adversarial review: pending — the parent's 1 ballena, dispatched after
  worker_done per this lane's dispatch config, not the child's to run.
