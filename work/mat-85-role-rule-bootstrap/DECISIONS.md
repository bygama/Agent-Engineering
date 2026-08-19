# mat-85-role-rule-bootstrap — decisions

<!-- Append-only: date — choice — why. -->
- 2026-08-19 — Ruling 1: main-worktree detection is `git rev-parse
  --path-format=absolute --git-dir --git-common-dir`, two identical paths ⇒
  main worktree — chosen over the Orca signals because the standard is
  runtime-neutral (any file-reading agent must be able to follow the rule,
  with or without Orca) and this invents no CLI surface. Verified on this
  machine in all four positions: main root and main subdir print the same
  path twice; child root and child subdir print
  `…/.git/worktrees/<name>` vs `…/.git` (git 2.55.0.windows.3). Rejected:
  (a) `ORCA_WORKTREE_ID` alone — it is set in the main checkout too
  (`<repoId>::<path>`), so it does not discriminate; (b) `orca worktree
  list --json` → `isMainWorktree: true` — correct and verified, but Orca-only
  and a second process call; kept as the corroborating signal where Orca is
  present, not as the rule; (c) bare `--git-dir` vs `--git-common-dir`
  without `--path-format=absolute` — REJECTED as unreliable: from a
  subdirectory of the main worktree git prints an absolute `--git-dir` and a
  relative `--git-common-dir`, so the string compare reports NO for a main
  checkout (measured, not assumed).
- 2026-08-19 — Ruling 2 (parent, at SPEC approval): SPEC approved as
  written, AND `skills/orchestrate/SKILL.md`'s frontmatter `description`
  is aligned too, not only step 0's prose — "Use in a Run-bound parent
  session when an M+ task must go to a child" is the same precondition bug
  at the DISCOVERY layer: a fresh unbound session may never load
  orchestrate precisely in the case the new rule exists for, so fixing the
  rule while leaving the description keeps the symptom at the door. New
  wording follows the seat rule while keeping the description's what+when
  form (`reference/skills.md`). Same file is already a lane surface — no
  sibling conflict.
- 2026-08-19 — Ruling 3 (lane, recorded not acted on): `README.md` carries
  the superseded reading in TWO places — the skill-table gloss (line 119,
  "a Run-bound parent session takes M+ work") and the prose at line 134
  ("Run-bound session dispatches M+ work to a child worktree it
  supervises") — both inaccurate in the same way as the frontmatter was.
  README is on this lane's do-not-touch list (sibling lane
  `mat-83-84-scale-polish` in flight), so the row is left alone and
  reported to the parent in `worker_done` for routing — never silently
  edited across a lane boundary.
- 2026-08-19 — Ruling 4: work-run executes this lane under its documented
  inline fallback ("work-run is never mandatory — the standard is
  runtime-neutral"), not by dispatching implementer subagents: this
  session's harness forbids the Agent tool unless explicitly requested, so
  the subagent seat is unavailable to it. Ceremony is unchanged — PLAN
  steps in order, one commit per step, the step's acceptance command run
  and its output recorded in PROGRESS.md before the next step opens. No
  dispatch is simulated. The lane-level fresh-context review still runs
  (work-verify), and the adversarial review is the parent's after
  `worker_done`, per the dispatch config.
- 2026-08-19 — Ruling 5: the fresh-context reviewer's two Important
  findings are accepted and fixed in this lane rather than deferred, even
  though its verdict was PASS. (a) The Role rule's three seats are now
  read IN ORDER, first match wins, and the main-worktree seat carries the
  "no such preamble" qualifier — without it a dispatch-bound child handed
  a plain clone (CI checkout, cloud sandbox) matched both seat 1 and seat
  2 with no stated precedence, trading one false classification for
  another in the recursive-dispatch direction. Seat 3 became the catch-all
  ("a linked worktree, or no repo to read"), which also gives a non-git
  checkout a seat instead of falling through. (b) `using-ae`'s eval-04
  still graded routing by the binding ("Because the session is Run-bound
  (parent)"), the inference this lane supersedes, and eval-01's new
  cross-reference cited it that way four lines above its own check that
  the binding confers nothing; eval-04's fixture is now pinned to the
  main-worktree seat with the live Run as corroboration, and a check was
  added that failing to give the seat as the reason fails the eval.
- 2026-08-19 — Ruling 6: reviewer minors 3-7 also applied, being
  one-liners on surfaces this lane already owns — "only then route" softened
  (precondition-shaped phrasing in the file whose point is that binding is
  not a precondition), `docs/adrs/ADR-008-orchestration.md` gained a
  Status-line amendment pointer in the house shape (ADR-004 and ADR-007
  precedent) since its Consequences still state the superseded role rule
  and the file is neither do-not-touch nor out-of-scope, the ≤80-line
  citation corrected to `CHANGELOG.md`'s 1.2.0 entry, and ruling 3 widened
  to both stale README spots (lines 119 and 134) so the parent does not fix
  one and leave the other.
- 2026-08-19 — Ruling 7: the PLAN's diff-based acceptance commands used the
  two-dot form (`git diff main`, `git diff --name-only main`), which
  compares main's CURRENT tree to this branch and so reports main's own
  later commits as if they were this lane's. It silently held only while
  main was frozen; when the sibling lane `mat-83-84-scale-polish` landed
  (main 1ee598e → 119f8bc, 23 commits) the do-not-touch guard flipped to
  exit 0 and named nine files this lane never opened. Corrected to the
  three-dot merge-base form (`main...HEAD`) in PLAN steps 4, 5 and 6, which
  asks the question the guard was always meant to ask: what did THIS branch
  change since it forked. Re-run after the correction: guard exits 1, and
  `git diff --name-only main...HEAD` lists exactly the 6 lane surfaces plus
  this lane's 4 files. The sibling's set and this lane's are disjoint
  (`git diff --name-only 1ee598e..main | grep -E 'using-ae|orchestrate|execution\.md'`
  → exit 1), so the pending rebase onto fresh main is expected to be clean.
- 2026-08-19 — Ruling 8: fix round 1 claimed finding 2 closed but only
  half-closed it. The eval-01 half of the edit was written as an unasserted
  string replacement whose anchor did not match the file (the line begins
  "map behaving as written here", not "as written here"), so it silently
  no-op'd while the surrounding round reported success. The scoped
  re-reviewer caught it by reading the fix diff and finding eval-01 absent
  from it entirely. Round 2 applies the edit with an assertion on both the
  anchor and its removal, and a repo-wide grep confirms no surface still
  says "bound Run redirects" or "Because the session is Run-bound"
  (exit 1). Standing consequence for this lane: every scripted edit asserts
  its anchor — an edit that cannot fail loudly is not evidence.
