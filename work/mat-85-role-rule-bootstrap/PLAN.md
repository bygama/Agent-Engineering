# PLAN — mat-85-role-rule-bootstrap

SPEC: `work/mat-85-role-rule-bootstrap/SPEC.md` (approved by the parent,
DECISIONS ruling 2). One step = one commit = one dispatch.

## Constraints (apply to every step)

- Do NOT touch CHANGELOG.md; no restamp; no version bump — this rides the
  owner's 1.4.0 release with the rest of the set.
- Do NOT touch, at any step: `reference/tracker.md`, `skills/ae-init/**`,
  `README.md`, `docs/how-it-works/standard-lifecycle.md`,
  `.claude/skills/docs-sweep/**` — sibling lane `mat-83-84-scale-polish` is
  in flight on them (DECISIONS ruling 3 records the README drift for the
  parent instead of fixing it here).
- Evals before content, per skill: step 1's commit lands before step 2's,
  and step 3's before step 4's, in history.
- The detection command is written ONCE canonically, in using-ae's Role
  rule (step 2), exactly as
  `git rev-parse --path-format=absolute --git-dir --git-common-dir`;
  every other surface refers to the rule and never restates a variant.
- The three seat names are fixed vocabulary from step 2 onward:
  **dispatch-bound**, **main worktree**, **non-main worktree**.
- All artifacts in English.

## Steps

1. [judgment] using-ae evals FIRST: add
   `skills/using-ae/evals/eval-05.md` grading the exact reported failure
   (fresh session, checkout is the repo's main worktree, M+ ask,
   `orca orchestration run-current` returns null ⇒ name the tier, read the
   seat, bind `run-current` → `run-use` → `run-create`, then invoke
   `orchestrate`; executing the lane inline in the main checkout AND
   treating the null Run as proof of non-parenthood are both named
   failures), and update `skills/using-ae/evals/eval-01.md` so its fixture
   is pinned to a **non-main worktree** that is not dispatch-bound —
   grading that the map still applies as written there (no false
   parenthood), with the contrast against eval-05 stated. SPEC §6.
   Acceptance: `node tests/run-eval-checks.mjs` exits 0 and its output
   contains `ok   using-ae: 5 evals well-formed`.

2. [judgment] `skills/using-ae/SKILL.md`: rewrite the Role rule section
   around SPEC §2's three seats — dispatch-bound (map as written,
   dispatches nothing), main worktree (IS the parent, bound or not; at M+
   its first orchestration action is to bind, then route to `orchestrate`;
   an unbound fresh terminal is the normal starting state), non-main
   worktree and not dispatch-bound (not a parent, map as written) — naming
   the detection command from the constraints block above; and add the
   red-flags row of SPEC §3 whose Thought is the null-`run-current`
   reasoning and whose Reality states the seat decides, not the binding.
   Acceptance: `test "$(wc -l < skills/using-ae/SKILL.md)" -le 80` exits 0
   AND `node scripts/agent-lint.mjs . --ignore
   tests,templates,global,examples` exits 0.

3. [judgment] `skills/orchestrate/evals/eval-01.md`: fixture covers the
   unbound arrival — the session is the repo's main worktree and
   `run-current` returned null when the M+ ask arrived — and one
   expected-behavior line grades that arriving unbound is the normal
   fresh-parent case, not a disqualifier: binding happens here, in step 0,
   and the session is never told to go be something else first. SPEC §6.
   Acceptance: `node tests/run-eval-checks.mjs` exits 0 and its output
   contains `ok   orchestrate: 4 evals well-formed`.

4. [judgment] `skills/orchestrate/SKILL.md`: step 0's three commands
   unchanged; its prose gains one clause stating the binding is step 0's
   own job and not a precondition for arriving here, citing the seat rule
   in `skills/using-ae`; and the frontmatter `description` is aligned per
   DECISIONS ruling 2 — the "Use in a Run-bound parent session" clause
   becomes the main-worktree seat, keeping the description's what+when form
   (`reference/skills.md`). SPEC §4.
   Acceptance: `git diff main -- skills/orchestrate/SKILL.md | grep -E
   '^[-+].*orca orchestration run-(current|create|use)'` exits 1 (no command
   line added or removed) AND `node scripts/agent-lint.mjs . --ignore
   tests,templates,global,examples` exits 0.

5. [judgment] `docs/how-it-works/execution.md`, §"The 8-stage dispatch
   cycle" (the "Binding the Run … happens once per parent session" passage,
   line 207): add the seat statement — what makes a session a parent is its
   checkout being the repo's main worktree, not a pre-existing binding; the
   binding is the parent's first action and a fresh terminal arriving
   unbound is the normal case — using the step-2 vocabulary. SPEC §5; the
   repo's same-change docs constraint is what this step satisfies.
   Acceptance: `grep -q "main worktree" docs/how-it-works/execution.md`
   exits 0 AND `git diff --name-only main -- docs/how-it-works/ | grep -q
   standard-lifecycle` exits 1.

6. [mechanical] Gate sweep: run all four gates, confirm no do-not-touch
   file appears in the diff, and record the command evidence in
   PROGRESS.md.
   Acceptance: `node scripts/agent-lint.mjs . --ignore
   tests,templates,global,examples` · `node tests/run-lint-tests.mjs` ·
   `node tests/run-gen-tests.mjs` · `node tests/run-eval-checks.mjs` all
   exit 0, AND `git diff --name-only main | grep -E
   '^(README\.md|reference/tracker\.md|CHANGELOG\.md|skills/ae-init/|docs/how-it-works/standard-lifecycle\.md|\.claude/skills/docs-sweep/)'`
   exits 1.
