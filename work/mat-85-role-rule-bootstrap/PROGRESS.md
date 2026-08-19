# mat-85-role-rule-bootstrap — progress

## Done

- 2026-08-19 — Lane opened. SPEC.md written from the parent's shaped brief
  (design-first). Detection signal chosen and verified on this machine
  (DECISIONS ruling 1). Parent approved the SPEC and extended scope to
  orchestrate's frontmatter description (ruling 2); PLAN.md shaped, 6 steps.
- 2026-08-19 — Step 1 DONE (evals first, using-ae). Added
  `skills/using-ae/evals/eval-05.md` grading the exact reported failure —
  main-worktree seat + M+ ask + `run-current` null ⇒ bind
  (`run-current`/`run-use`/`run-create`) then `orchestrate`, with
  inline-in-the-main-checkout and blocking-on-the-owner both named
  failures. Updated `eval-01.md`: fixture pinned to a non-main worktree
  with no dispatch preamble (it previously said only "no Run bound", which
  the seat rule makes ambiguous), plus a check that the absent Run is not
  the reason in either direction. Acceptance: `node
  tests/run-eval-checks.mjs` → exit 0, `ok   using-ae: 5 evals well-formed`.
- 2026-08-19 — Step 2 DONE. `skills/using-ae/SKILL.md` Role rule rewritten
  around three seats (dispatch-bound / main worktree / non-main worktree),
  naming the detection command once; the circular line "No bound Run ⇒ not
  a parent ⇒ the map applies as written too" is gone. Red-flags table gained
  the row whose Thought is the reported reasoning ("`run-current` returned
  null — not a parent, I'll run it here"). Acceptance: `test "$(wc -l <
  skills/using-ae/SKILL.md)" -le 80` → exit 0 (70 lines, cap 80); `node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples` →
  exit 0, PASS.
- 2026-08-19 — Step 3 DONE (evals first, orchestrate).
  `skills/orchestrate/evals/eval-01.md` fixture is now the UNBOUND arrival
  (main-worktree seat, no `worker-start` preamble, `run-current` null), and
  the expected behavior grades that binding is step 0's own work and that
  arriving unbound is the normal fresh-parent case — not a reason to bounce
  the session to work-plan, to the owner, or to a blocked report.
  `eval-04.md` line 5 was left alone on purpose: "in the Run-bound parent"
  there describes a parent that has already bound, which stays true; the
  bug was the inference "no Run ⇒ not a parent", not the term. Acceptance:
  `node tests/run-eval-checks.mjs` → exit 0, `ok   orchestrate: 4 evals
  well-formed`.
- 2026-08-19 — Step 4 DONE. `skills/orchestrate/SKILL.md`: step 0's three
  commands untouched; its prose gained the clause that binding is step 0's
  own work and never a precondition for reaching it, citing the seat rule.
  Frontmatter `description` aligned per DECISIONS ruling 2 — "Use in a
  Run-bound parent session" became the main-worktree seat, so a fresh
  unbound session can still discover the skill. Acceptance: `git diff main
  -- skills/orchestrate/SKILL.md | grep -E '^[-+].*orca orchestration
  run-(current|create|use)'` → exit 1 (no command line added or removed);
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → exit 0, PASS.
- 2026-08-19 — Step 5 DONE. `docs/how-it-works/execution.md`, §"The 8-stage
  dispatch cycle": the "Binding the Run … happens once per parent session"
  passage now states the seat rule — the parent is the session whose
  checkout is the repo's main worktree, the binding is its first action,
  arriving unbound is normal — and names the circularity and the inline-in-
  the-owner's-checkout failure it produced. Satisfies the repo's
  same-change docs constraint. Acceptance: `grep -q "main worktree"
  docs/how-it-works/execution.md` → exit 0; `git diff --name-only main --
  docs/how-it-works/ | grep -q standard-lifecycle` → exit 1 (only
  execution.md touched in that tree).
- 2026-08-19 — Step 6 DONE. Four-gate sweep, all exit 0 (evidence in
  `## Verification`), plus the do-not-touch guard: `git diff --name-only
  main | grep -E '^(README\.md|reference/tracker\.md|CHANGELOG\.md|skills/ae-init/|docs/how-it-works/standard-lifecycle\.md|\.claude/skills/docs-sweep/)'`
  → exit 1, no forbidden file in the diff. Files changed vs main:
  `docs/how-it-works/execution.md`, `skills/orchestrate/SKILL.md`,
  `skills/orchestrate/evals/eval-01.md`, `skills/using-ae/SKILL.md`,
  `skills/using-ae/evals/eval-01.md`, `skills/using-ae/evals/eval-05.md`,
  plus this lane's four files.
- 2026-08-19 — Fix round 1 (fresh-context review findings). Verdict was
  PASS with two Important findings; both accepted and fixed rather than
  deferred (DECISIONS ruling 5), plus minors 3-7 (ruling 6). Role rule
  seats are now ordered with the main-worktree seat qualified by "no such
  preamble" and seat 3 as the catch-all; `using-ae`'s eval-04 pinned to the
  seat instead of the binding, with eval-01's cross-reference corrected;
  ADR-008 gained a Status-line amendment pointer; SPEC's cap citation
  fixed; ruling 3 widened to both README spots. `skills/using-ae/SKILL.md`
  is 72 lines, still under the 80-line cap.
- 2026-08-19 — Acceptance-command defect found and fixed (DECISIONS ruling
  7): the PLAN's diff guards used the two-dot `git diff main` form, which
  broke the moment main advanced (sibling lane landed, main 1ee598e →
  119f8bc) and reported nine untouched files. Steps 4, 5 and 6 now use the
  three-dot merge-base form `main...HEAD`; re-run clean, and the sibling's
  file set is disjoint from this lane's.
- 2026-08-19 — Fix round 2 (scoped re-review of round 1). Re-reviewer
  verdict: finding 1 and minors 3-7 ADDRESSED, no new breakage; finding 2
  NOT ADDRESSED — the eval-01 half of round 1 had silently no-op'd on a
  bad anchor (DECISIONS ruling 8). Applied for real, with assertions:
  eval-01's cross-reference now says eval-04 and eval-05 both route from
  the main-worktree seat, Run bound in the first and unbound in the second.
  `grep -rn "bound Run redirects\|Because the session is Run-bound"
  skills/` → exit 1, no surface left on the superseded inference.

## In progress

- Nothing. All 6 PLAN steps done; work-verify next, then push + PR.

## Tried and failed

- Bare `git rev-parse --git-dir` vs `--git-common-dir` as the detection
  signal: measured NO for the main worktree when run from a subdirectory
  (absolute vs relative output). Replaced by the `--path-format=absolute`
  form, which measured correctly in all four positions.

## Next

- work-handoff → push + PR (`Closes MAT-85`), never merge; then
  `worker_done` to the parent.
- For the parent: main advanced to 119f8bc while this lane ran. The rebase
  is not done here (it is the parent's call, per the dispatch brief) and is
  expected to be clean — the sibling's files and this lane's are disjoint.
- For the parent, not this lane: `README.md` carries the superseded reading
  in TWO places — the skill-table gloss at line 119 and the prose at line
  134 — the same reading fixed everywhere else here. README is on this
  lane's do-not-touch list (sibling lane `mat-83-84-scale-polish` in
  flight), so both are reported rather than edited — DECISIONS ruling 3.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
