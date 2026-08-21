# Reviewer seats + review granularity — plan

<!-- Steps with executable acceptance. Not "improve X" — "command Y exits 0".
     This PLAN dogfoods MAT-117's own convention: every step carries a review
     class beside its role hint. -->

## Constraints (every step)

- **No version bump, no CHANGELOG entry, no restamp.** No template and
  no check changes here. `AGENTS.md`'s `Standard: AE/1.4.2` stamp is not
  touched.
- **Never touch:** `CHANGELOG.md`, the `AGENTS.md` version stamp,
  `scripts/agent-lint.mjs`, `tests/**`, `examples/`, `.claude/skills/`,
  `templates/`. Concluding that a check or template MUST change is an
  **ask to the parent**, never a unilateral edit.
- **Evals change BEFORE content, per skill.** Every skill's eval step is
  a separate commit landing before that skill's content commit. Three
  skills are touched, so this ordering is load-bearing three times.
- **Dated records are amended, never rewritten** — an italic amendment
  note in the ADR-008 style, dated 2026-08-21. Records naming the dead
  `opencode/deepseek-v4-flash-free` (`ADR-008:93`,
  `execution.md:497`, `docs/plans/*`) stay as written: that model did
  run those lanes on those dates.
- **All artifacts in English.** Skills are junction-linked into
  `~/.claude/skills`, so every edit here is read verbatim by every
  future session.
- **Role hint · review class** on every step, in that order, e.g.
  *(judgment · per-step)* — the notation this lane is introducing.
- The four gates, unchanged in form:
  `node scripts/agent-lint.mjs . --ignore tests,templates,examples`,
  `node tests/run-lint-tests.mjs`, `node tests/run-gen-tests.mjs`,
  `node tests/run-eval-checks.mjs`.

## Interface produced in step 1, consumed by steps 3, 6, 7, 8, 9

Step 1 fixes the vocabulary in **`reference/runners.md`**; every later
step cites it rather than re-deriving it:

- **`sigiloso`** (pl. *sigilosos*) — the house name for stealth free Zen
  models. Verified current instance: **Ox Alpha**,
  `opencode/x-preview-f-free`. `opencode/big-pickle` is named as a
  sigiloso but **unverified here** (DECISIONS.md, 2026-08-21).
- **The command-mode recipe**, exactly: `opencode run --auto -m
  <provider/model> "<prompt>"`.
- **The degradation chain**, in this order: sigiloso →
  `opencode/muse-spark-1.2-contributor-free` →
  `opencode-go/muse-spark-1.2-contributor` → in-session Claude subagent.
- **The economics rule** — every seat defaults to its free variant while
  the free windows last; the Go plan is the fallback, never the default.
- **The `--auto` law** — every opencode seat launches with `--auto`,
  TUI and `run` alike.

## Review-class grouping for this lane

Steps 1-7 and 10 are `per-step`: skill content, a reference file every
skill cites, and the gate sweep — all expensive to redo. Steps 8-9 are
the lane's one contiguous `grouped` block (cheap-to-redo documentation
and a dated-record amendment): **one** reviewer pass at the boundary
after step 9, covering both.

## Steps

- [ ] **1. `reference/runners.md` — register the seats and the laws**
  (MAT-116 item 1, all seven parts of SPEC §1): the sigilosos entry
  (Ox Alpha verified, Big Pickle named-unverified), the free-ratón
  entry, the command-mode recipe, the `--auto` law extended to run-mode
  (the current "the headless `run` form above takes no `--auto`"
  sentence is **replaced**, not softened — `opencode run --help` at CLI
  1.18.18 lists the flag), the economics rule restating the ratón and
  ballena at their free ids, the degradation chain written as law in
  the file's own voice, and both live citations of the dead
  `opencode/deepseek-v4-flash-free` repointed at
  `muse-spark-1.2-contributor-free`. The paragraph claiming "no no-auth
  Muse Spark route has run here" is falsified by this lane's probe and
  goes with it. *(judgment · per-step)*
  accept: `grep -q 'sigiloso' reference/runners.md && grep -q 'x-preview-f-free' reference/runners.md && grep -q 'opencode run --auto' reference/runners.md && grep -q 'muse-spark-1.2-contributor-free' reference/runners.md && ! grep -q 'deepseek-v4-flash-free' reference/runners.md && ! grep -q 'takes no `--auto`' reference/runners.md && node scripts/agent-lint.mjs . --ignore tests,templates,examples` — exit 0

- [ ] **2. `skills/work-run/evals/` — evals FIRST for work-run**
  (SPEC §6): the reviewer-mode knob (command mode is a shell command,
  not an orchestration worker; sigiloso default; the liveness check
  before relying on the model; the degradation chain on a dead model)
  and review-class execution (`per-step` never downgraded, `grouped`
  buys one pass per contiguous group at its boundary,
  `covered-by-batch` covered by the batch's single review, a classless
  PLAN falls back to `per-step`). Existing evals that would go stale are
  amended in the same step. *(judgment · per-step)*
  accept: `grep -rq 'command mode' skills/work-run/evals/ && grep -rq 'covered-by-batch' skills/work-run/evals/ && grep -rq 'sigiloso' skills/work-run/evals/ && node tests/run-eval-checks.mjs` — exit 0

- [ ] **3. `skills/work-run` content — the knob and the classes**
  (MAT-116 item 2 + MAT-117 item 5, SPEC §2 and §5, one coherent
  concern: how work-run buys review): the reviewer-mode knob
  (`subagent` | `command`) documented with the explicit
  "shell command, NOT an orchestration worker — the no-grandchildren
  fence is untouched" statement and the sigiloso default with its
  liveness check; the step loop executing the three review classes;
  and the fix loop, its cap of 5, work-verify's lane gate and the
  adversarial seat all stated as unchanged.
  `references/step-reviewer.md` gains the command-mode fill note so the
  template stays the single source of the review prompt in both modes.
  *(judgment · per-step)*
  accept: `grep -q 'reviewer mode' skills/work-run/SKILL.md && grep -q 'opencode run --auto' skills/work-run/SKILL.md && grep -q 'covered-by-batch' skills/work-run/SKILL.md && grep -q 'grandchildren' skills/work-run/SKILL.md && grep -q 'command' skills/work-run/references/step-reviewer.md && node scripts/agent-lint.mjs . --ignore tests,templates,examples && node tests/run-eval-checks.mjs` — exit 0

- [ ] **4. `skills/work-plan/evals/` — evals FIRST for work-plan**
  (SPEC §6): every PLAN step carries a review class; `per-step` is
  mandatory and never overridable downward; `grouped` is for
  cheap-to-redo doc/mechanical steps at a contiguous boundary;
  `covered-by-batch` belongs to a `[batch]` entry; and the harder
  `[batch]` rule with its field evidence (MAT-111 ran 9 steps where ~5
  were right). `eval-04.md`, which owns batching and role hints today,
  is amended rather than duplicated. *(judgment · per-step)*
  accept: `grep -rq 'review class' skills/work-plan/evals/ && grep -rq 'covered-by-batch' skills/work-plan/evals/ && grep -rq 'MAT-111' skills/work-plan/evals/ && node tests/run-eval-checks.mjs` — exit 0

- [ ] **5. `skills/work-plan` content — review classes + harder [batch]**
  (MAT-117 item 4, SPEC §4): the three classes defined beside the
  existing role hints in step 5, **required on every step** (unlike
  role hints, which stay optional per plan) because work-run reads the
  class to decide how many seats the lane buys; `per-step` mandatory and
  never overridable downward; the `[batch]` rule enforced harder with
  the MAT-111 evidence named; the workflow checklist line updated to
  match. *(judgment · per-step)*
  accept: `grep -q 'review class' skills/work-plan/SKILL.md && grep -q 'covered-by-batch' skills/work-plan/SKILL.md && grep -q 'MAT-111' skills/work-plan/SKILL.md && node scripts/agent-lint.mjs . --ignore tests,templates,examples && node tests/run-eval-checks.mjs` — exit 0

- [ ] **6. `skills/orchestrate/evals/` — evals FIRST for orchestrate**
  (SPEC §6): the dispatch dialogue asks BOTH seats in one question
  block (per-step reviewer mode/model, default command-mode sigiloso;
  adversarial seat, default 1 ratón chispeante at its free id) and
  records both in the Task spec; the cross-family guardrail rejecting
  both zero-cross-family combinations as silent or default outcomes,
  with the owner's explicit-override escape recorded verbatim
  (DECISIONS.md, parent ruling 2026-08-21); and `eval-03.md`'s dead
  `opencode/deepseek-v4-flash-free` fallback id corrected in the same
  sweep. *(judgment · per-step)*
  accept: `grep -rq 'cross-family gate' skills/orchestrate/evals/ && grep -rq 'x-preview-f-free' skills/orchestrate/evals/ && ! grep -rq 'deepseek-v4-flash-free' skills/orchestrate/evals/ && node tests/run-eval-checks.mjs` — exit 0

- [ ] **7. `skills/orchestrate` content — two-seat dialogue + guardrail**
  (MAT-116 item 3, SPEC §3): step 3's dialogue becomes one question
  block asking both seats, both answers recorded in the Task spec; the
  guardrail in its positive form ("at least one cross-family gate per
  lane") rejecting Claude+Claude and Claude-per-step-with-no-adversarial
  alike as silent or default outcomes, with the explicit-override escape
  worded exactly as the parent ruled — never offered by the dialogue,
  never assumed by the parent, recorded verbatim in the Task spec;
  ADR-008 cited as the unchanged principle; and the review-wave launch
  commands restated at the free ratón id per the economics rule.
  *(judgment · per-step)*
  accept: `grep -q 'cross-family gate' skills/orchestrate/SKILL.md && grep -q 'x-preview-f-free' skills/orchestrate/SKILL.md && grep -q 'muse-spark-1.2-contributor-free' skills/orchestrate/SKILL.md && node scripts/agent-lint.mjs . --ignore tests,templates,examples && node tests/run-eval-checks.mjs` — exit 0

- [ ] **8. `docs/adrs/ADR-008-orchestration.md` — amendment note only**
  (SPEC §3): an italic amendment note in the file's own established
  style, dated 2026-08-21, on the "Dispatch-time reviewer question"
  bullet — naming the two-seat dialogue, the cross-family guardrail and
  its recorded-override escape, and stating that the maker ≠ checker
  cross-family principle is unchanged. The bullet itself, and the
  `deepseek-v4-flash-free` line at 93, stay as written: both are
  records. *(judgment · grouped)*
  accept: `grep -q '2026-08-21' docs/adrs/ADR-008-orchestration.md && grep -q 'cross-family gate' docs/adrs/ADR-008-orchestration.md && grep -q 'MAT-116' docs/adrs/ADR-008-orchestration.md && grep -q 'opencode/deepseek-v4-flash-free' docs/adrs/ADR-008-orchestration.md` — exit 0

- [ ] **9. `docs/how-it-works/` — make the chapters true again**
  (SPEC §7): `execution.md`'s stage-3 sequence line and its surrounding
  narration now describe a two-seat dialogue, and the no-auth-fallback
  narration moves to the live id; `work-lifecycle.md`'s "Each step gets
  a fresh-context review" claim is corrected for review classes, and its
  work-plan narration gains the class beside interfaces and role hints.
  Then judge `architecture.md`, `standard-lifecycle.md`,
  `integrations.md` and `README.md` explicitly and record each verdict
  in `DECISIONS.md` **whether or not the file changes**. Both chapters
  move in one step because the same change falsified both.
  *(judgment · grouped)*
  accept: `grep -q 'per-step reviewer' docs/how-it-works/execution.md && grep -q 'review class' docs/how-it-works/work-lifecycle.md && grep -q 'how-it-works' work/mat-116-117-review-seats/DECISIONS.md && node scripts/agent-lint.mjs . --ignore tests,templates,examples` — exit 0

- [ ] **10. Full gate sweep + no live surface on the dead id**
  (SPEC Verification): the four gates, plus proof that no live
  (non-record) surface still names `opencode/deepseek-v4-flash-free` and
  that each skill's eval commit precedes its content commit.
  *(integration · per-step)*
  accept: `node scripts/agent-lint.mjs . --ignore tests,templates,examples && node tests/run-lint-tests.mjs && node tests/run-gen-tests.mjs && node tests/run-eval-checks.mjs && test $(grep -rl 'deepseek-v4-flash-free' --exclude-dir=.git skills reference AGENTS.md README.md | wc -l) -eq 0` — all exit 0
