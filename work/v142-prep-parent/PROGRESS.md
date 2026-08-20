# PROGRESS — v1.4.2 prep wave (parent orchestrator)

## 2026-08-19

- Run rebound: `run-use run_fafc4f70d4ac` (fresh terminal after model
  switch; seat rule applied, binding was step 0's own work).
- Tickets MAT-99 / MAT-100 / MAT-101 / MAT-93 → In Progress.
- Three specs generated from `dispatch-child.md` verbatim (placeholder
  guard green; 9.1K / 10.2K / 8.5K chars).
- Tasks created: task_72446add29ec, task_a22b9029ffc3,
  task_4d1e5ddcfc81. No `--deps` (file-disjoint, fences in specs).
- Children born (all `input_accepted`, `created_child` effects):
  - mat-99 → ctx_3d53e731152a, term_713b434c
  - mat-100-101 → ctx_6a0116b471c9, term_e49a1210
  - mat-93 (cross-repo `--repo path:C:/Briar/repos/mine/skills`) →
    ctx_77a45e0fa5a7, term_f0827cac
- Linear bound at birth on all three worktrees (`worktree set
  --linear-issue`).
- Design-first SPEC approvals, all three ruled and recorded by the
  children (rulings in each child's DECISIONS.md):
  - mat-100-101 (msg_c28b6c5b79c3): APPROVED — stall clock in step 6,
    eval-03 gains both assertions before content.
  - mat-99 (msg_3e53c9dcca7a): APPROVED — narrow 3-class rule
    (corpus-triaged), MEDIUM severity, skip-lines for fenced blocks;
    tilde paths stay legal.
  - mat-93 (msg_71af24909758): APPROVED — CARRY-narrow verdict,
    bounded stall-escalation, differentiated from MAT-47 D-003.
- Supervision: rolling `check --wait` (9-min arms under the shell's
  10-min cap; deliveries acked each round). Healthy heartbeat cadence
  from all three children through investigating → planning →
  implementing → verifying.
- **mat-100-101 worker_done** (msg_f3b79e5c479d): PR #77 OPEN, branch
  `bygama/mat-100-101-ballena-auto`, four gates exit 0, fresh-context
  review PASS with one Important fixed (7c098ce) and re-reviewed
  ADDRESSED, verdicts verbatim in the lane. Child terminal retained
  (ctx_6a0116b471c9).
- Review wave, lane mat-100-101: ballena launched per standing ruling
  (`opencode --auto -m opencode-go/deepseek-v4-flash`) on read-only
  worktree `mat-100-101-ballena-auto-review-r1` cut from the lane
  branch; review task task_5a5d333dc3b3 → dispatch ctx_737d8c83c062
  (input_accepted). Two-step provenance costs observed as documented
  (worktree `reused`, setup `not_applicable`). Fallback startup shell
  DID appear this time (term_53907732) — confirmed unused, closed
  (`ptyKilled: true`); MAT-101's "can, not always" holds live.
- **mat-93 worker_done** (msg_d6ef2e45c7a3): PR bygama/skills#12 OPEN,
  branch `bygama/mat-93-ask-for-help-leg`, CARRY-narrow executed —
  eval-08 first (RED baseline: unrouted-ask branch confirmed; GREEN
  8/8), WHEN-not-HOW stall-escalation section, work-verify M PASS,
  fresh-context review corroborated all 8 items (0C/0I), Linear In
  Review. Child terminal retained (ctx_77a45e0fa5a7).
- Review wave, lane mat-93: ballena (`--auto`) on read-only worktree
  `mat-93-ask-for-help-leg-review-r1` (skills repo, cross-repo via
  `--repo path:`); review task task_c57b5eb245c7 → dispatch
  ctx_3f1e470d9d6b (input_accepted). Fallback shell appeared
  (term_6507054f) — closed.
- **mat-99 worker_done** (msg_e2e20404fe82): PR #78 OPEN, branch
  `bygama/mat-99-lint-path-portability`, fixture-first (suite 20→22,
  red before the check), MEDIUM check with drive-rooted / POSIX
  user-home / WSL-mount classes on the five shipped surfaces,
  exemptions stated in the check, tilde legal per ruling, live
  docs/plans case blob-hash-identical, four gates exit 0, per-step +
  fresh-context reviews verbatim in the lane. Notable: a literal
  `X:\` example would trip the check itself — the chapter advises
  `<drive>:\`-style forms, verified empirically twice. Child terminal
  retained (ctx_3d53e731152a).
- Review wave, lane mat-99: ballena (`--auto`) on read-only worktree
  `mat-99-lint-path-portability-review-r1`; review task
  task_8c73ef3f55f1 → dispatch ctx_89d1cd83c0c2 (input_accepted).
  Fallback shell appeared (term_b7c00d0b) — closed.

## Review verdicts (verbatim)

### Lane mat-100-101 — ballena ctx_737d8c83c062 (msg_7364cb8dd021)

PASS — I tried to break it and could not. Checked out the lane branch at f52e8f0 (review worktree is at the same commit) and re-ran every DoD claim from scratch: all four gates exit 0 ('0 high, 0 medium, 0 low — PASS', 'all 20 cases passed', 'all gen cases passed', 'all eval checks passed / ok orchestrate: 5 evals well-formed'); every grep acceptance matches the PASS block's exact counts (runners --auto 5, SKILL --auto 2, eval-03 --auto 3, categorical 0, close cmd 1); PR #77 is OPEN on main with 'Closes MAT-100'/'Closes MAT-101' on separate lines; diff vs merge-base touches only owned files (reference/runners.md, reference/orca.md, skills/orchestrate/**, docs/how-it-works/execution.md, lane folder) — no CHANGELOG/AGENTS/global/examples/scripts/tests/standard-lifecycle; commit order confirms evals-before-content (0dcbeab before 474d7d7); the 7c098ce fix genuinely disambiguates 'both forms' to the two ballena launch commands; the stall clock sits immediately after the fallback-shell paragraph tied to step 5's real cadence rule; the three-file 'can' agreement holds repo-wide; CLI claims verified (opencode --help --auto text, worker-stop, task-update, orca terminal close). Minor (non-blocking, all pre-declared in PROGRESS): connector drift 'never'/'not a slow review' between SKILL.md/execution.md and the grading eval-03.md; runners.md:43 'the headless run form above takes no --auto' is precise about the documented command but could be misread as a claim about opencode run's flag surface. Verdict: PASS, nothing at Critical or Important severity.

Parent ruling: PASS accepted; both Minors stay out of the fix loop per
the house rule and are recorded here for the 1.4.2 completion pass.
Lane decommissioned (reviewer + child released, both worktrees removed;
branch `bygama/mat-100-101-ballena-auto` and PR #77 live on origin).

### Lane mat-99 — ballena ctx_89d1cd83c0c2 (msg_9eff0295a8ab)

Delivery mechanics, on the record: the seat's first `worker_done` went
out with placeholder subject/body "t" (PowerShell mangled the
backtick-heavy verdict; the seat test-fired the channel), which
consumed the dispatch's single-shot worker_done capability. The real
verdict arrived as Orca's rejected-worker_done wrapper quoting the
original body verbatim — the text below is the reviewer's own.

Orca rejected this worker_done: Dispatch ctx_89d1cd83c0c2 capability is revoked.

Original body:
PASS — verdict: the lane's M DoD PASS reproduces from branch head e8edd88 in my own hands; all four gates exit 0 (self-lint "0 high, 0 medium, 0 low — PASS", "all 22 cases passed", "all gen cases passed", "all eval checks passed"), the fire fixture exits 1 with exactly three MEDIUM machine-path findings at true file:line (reference/toolkit.md:3, skills/toolkit/SKILL.md:10, templates/toolkit.md:3), the clean fixture exits 0 with zero findings, the live case is byte-identical (blob e1f850dc… at base and HEAD), the forbidden-path set diff is empty, and PR #78 is open/mergeable with "Closes MAT-99". My adversarial probes — the full benign surface (https://, http://a.b/mnt/c/x, ~/.claude, /opt, /usr, /dev/null, /api, %USERPROFILE%, UNC, /root/, clock times), backslash drive form, invented-letter X:\… firing while <drive>:\… and angle-bracket placeholders stay silent, nesting collapse to one finding, fenced-block skip reproduced on a reference/ surface (closing the step-1 minor), unmatched BEGIN not exempting, no lastIndex leakage, and a full-repo scan including templates/, global/, loops/ with zero findings — all behave exactly as PROGRESS.md claims; I could not break it. Only on-record minors remain (space/comma-truncated quotes "C:/Program" and "E:/a"; fenced-skip committed-fixture pin on skills/ only; "/mnt/c" without trailing slash deliberately unflagged), none a gate — left for the parent's merge and the 1.4.2 release ritual.

Parent ruling: PASS accepted; on-record minors stay out of the fix
loop and are noted for the 1.4.2 completion pass. New failure mode
(mangled first send burns the worker_done capability) filed as a
follow-up ticket. Lane decommissioned (reviewer + child released, both
worktrees removed; branch `bygama/mat-99-lint-path-portability` and
PR #78 live on origin).

- **Review-seat stall, lane mat-93 (r1)**: ballena ctx_3f1e470d9d6b hit
  the stall signature at ~75 min — no verdict, and the transcript FLAT
  between two worker-reads ~25 min apart (identical tail, token count
  frozen at 43.6K mid-review after a 52.7s thought). Applied the
  encoded recovery (the one PR #77 itself documents): `worker-stop` →
  review worktree removed → `task-update --status ready` → fresh seat
  r2 (`opencode --auto`) on a new worktree; dispatch ctx_c016a7014706
  (input_accepted), fallback shell closed. Note: --auto removes the
  permission-prompt stall but not every wedge — the 75-min clock caught
  this one exactly as designed.

### Lane mat-93 — ballena r2 ctx_c016a7014706 (msg_f51cef4dd96f)

PASS — I re-ran every DoD command on branch bygama/mat-93-ask-for-help-leg @ 4456c13 and all exit clean: lint 0/0/1 PASS exit 0 (sole finding the pre-existing AGENTS.md:15 LOW, byte-identical to e969b67 and untouched in the lane), SKILL.md 241<500 lines with description byte-identical and one-level-deep refs, CI standard SUCCESS on the current PR head (run 32305042695), PR #12 OPEN/MERGEABLE with Closes MAT-93 and never merged, and evals-before-content proven in the graph (f61b8d7,cd842c5 before the sole SKILL.md commit f330637). I walked eval-08's 8 items against the post-f330637 SKILL.md and each has a carrier, the negative guard is sequenced against the ask items, and a pre-leg baseline fails items 3/4, so the eval discriminates. No Critical/Important; three Minor all disclosed/deferred (three-strikes cross-ref by adjacency, 'this seat' register, no Rationalizations-table row) — nothing FAIL-worthy; the only thing I could not reproduce is the controller-graded GREEN 8/8 behavioral run, which the lane discloses and the fresh-context read covers.

Parent ruling: PASS accepted; the three disclosed Minors stay out of
the fix loop. Lane decommissioned (reviewer r2 + child released, both
worktrees removed; branch `bygama/mat-93-ask-for-help-leg` and
bygama/skills PR #12 live on origin).

## Wave close (2026-08-19)

3/3 lanes PASS. PRs deliberately left OPEN for the 1.4.2 completion:
Agent-Engineering #77 (MAT-100+101), #78 (MAT-99), bygama/skills #12
(MAT-93). All child and reviewer dispatches released, all six worktrees
removed; branches live on origin. Linear: the four tickets sit In
Review with PRs attached — they close on merge at release time.
New finding filed: MAT-104 (single-shot worker_done capability burned
by a mangled first send). Review-seat stalls this wave: 1 (mat-93 r1),
recovered by the encoded protocol; --auto prevented the known
permission-prompt stall on all three seats.

## Round 2 — review verdicts (verbatim)

### Lane mat-104-94 — raton chispeante 1, ctx_b5f296bfeb2a (muse-spark-1.2-contributor)

Delivery mechanics, on the record: the seat completed its review and
ran the worker_done send, which printed "(no output)" and never
registered in the ledger (dispatch stayed `ready|dispatched`). Per
MAT-104's own rule — shipped in this very PR — the verdict evidence
below is the seat's transcript captured verbatim via `worker-read`
(and independently relayed by the owner from the seat's session):

"Review complete. Verdict: PASS — all gates and per-step acceptance
checks rerun clean on HEAD c7eff52, all seven SPEC items verified in
place with correct commit ordering (evals-first), MAT-94
classifications re-verified verbatim against the superpowers 6.3.0
cache, and no forbidden files touched. Three minor non-blocking notes
(runners.md wrap length, pre-existing TOC drift at 120/120, n-gram
aggregates) — none warrants a fix loop."

Full detail from the seat's summary: agent-lint 0/0/0 PASS,
run-lint-tests 20/20, run-gen-tests pass, run-eval-checks 13 skills
pass; single-shot warnings verified at reviewer.md:72, runners.md:52,
SKILL.md:198 and execution.md; MAT-94 additive notices at
shaping/SKILL.md:112 and skill-authoring/SKILL.md:188 verified
verbatim against the cache; reference/skills.md at 120/120 with the
trim documented.

Parent ruling: PASS accepted; three Minors stay out of the fix loop.

### Lane mat-94-attribution — raton chispeante 2, ctx_62889aeddd29 (msg_755e84ed4264)

PASS — Lane work/mat-94-attribution-skills on branch bygama/mat-94-attribution-skills satisfies all 7 DoD gates and SPEC constraints; re-ran every cited verification and all exit clean on the live branch. What was done well: exhaustive diff-evidenced classification (D2/D3) with quoted verbatim runs and structural parallels against upstream v6.3.0, correct whole-file vs parts-only notices (4 files x 1 Copyright occurrence), byte-identical NOTICE MIT reproduction, fenced files untouched, and PR #13 base/body/CI correct. Remaining findings are Low severity only — 23 deferred minors already catalogued (step-1:5, step-2:6, step-3:4, step-4:4, step-5:3, fresh-review:+1) such as D2 Gate-1 fifth edit omission (work/mat-94-attribution-skills/DECISIONS.md:~88), two off-by-one upstream cites (D3 ~196->197, 240->241), Not-candidates bookkeeping leaks parked under excluded heading (DECISIONS.md:583), techniques.md dangling antecedent (skills/tracing-root-causes/references/techniques.md:10-12), and README technique-references breadth (README.md:66) — none verdict- or gate-changing; no Critical or Important defects found. Commands re-run: node agent-lint.mjs . => '0 high, 0 medium, 1 low — PASS' (pre-existing AGENTS.md:15); wc -l both SKILL.md=249 (<500); grep -c Copyright each file=1 (4/4); SELECT-STRING NOTICE Permission=>FOUND; NOTICE MIT dedented diff vs C:/Users/mateo/.claude/plugins/cache/claude-plugins-official/superpowers/6.3.0/LICENSE => IDENTICAL; git diff 4456c13..HEAD --name-only => 10 files only, LICENSE/CODE_OF_CONDUCT=0 lines touched, evals=0 lines; gh pr checks 13 => standard pass; PR base=bygama/mat-93-ask-for-help-leg, state OPEN, body contains Closes MAT-94.

Parent ruling: PASS accepted; the 23 catalogued Low-severity minors
stay in the lane's deferred ledger.

## Round 2 close (2026-08-19/20)

Both mice PASS. PRs deliberately left OPEN, stacked: AE #80 (base #77,
Closes MAT-104 + Part of MAT-94), skills #13 (base skills#12, Closes
MAT-94). Seat notes for the compatibility ticket: muse-spark launches
clean to tui-idle with --auto; ONE-TIME opencode data-collection
consent prompt required manual acceptance on a fresh seat (not covered
by --auto — owner intervened live); one worker_done send printed
"(no output)" and never registered — transcript verdict used per
MAT-104's rule.

## Round 3 — MAT-105 (raton chispeante seat + owner amendment)

### Verdict r1, pre-amendment tree ffb5ac4 — raton ctx_97512a845637 (msg_e79d57e2085f)

PASS — Lane work/mat-105-raton-seat on branch bygama/mat-105-raton-seat (PR #82 base bygama/mat-104-94-single-shot-attrib, OPEN, Closes MAT-105) withstands refutation: all four SPEC sub-deliverables land in reference/runners.md:59-75 and 98-105 with verbatim argv opencode --auto -m opencode-go/muse-spark-1.2-contributor, consent gotcha (DATA-COLLECTION, --auto does NOT cover, different prompt class, one-time per machine/model), (no output) known-behavior with single-shot citation and cause unattributed, and pairings are pluralization. Reran the lane's own DoD on the worktree: agent-lint 0 high 0 medium 0 low — PASS, lint-tests all 20 cases passed, gen-tests all gen cases passed, eval-checks all eval checks passed; lane diff c7eff52..HEAD touches only reference/runners.md plus lane folder (skills/orchestrate/SKILL.md, eval-03.md, docs/how-it-works/execution.md diff length 0) so owned-files and forbidden-files (CHANGELOG.md, AGENTS.md, global/, tests/) constraints hold, and the no-change judgment in DECISIONS.md is sound. No blocking defects; remaining items are low-severity polish already triaged in DECISIONS.md: forward reference 'and the ratón below' in the --auto sentence (runners.md:41-42), consent note scoped to ratón block though opencode-wide (deferred pointer), and SKILL.md/execution.md stall-clock prose being narrower than evidence (out of owned-files scope, noted for future lane).

### Owner amendment (2026-08-20, post-verdict change of law)

The owner ruled after r1's PASS: full house name "raton chispeante
(pl. ratones chispeantes)" documented, and the seat becomes the
DISPATCH-DIALOGUE DEFAULT for cost reasons (~$0.01/review), ballena
the named alternative. Dispatched to the retained child as a fix-loop
task (ctx_1a3ce2f7631e); encoded evals-first (eval-01 re-graded before
content; eval-03 judged owner-CHOICE, untouched), five surfaces
inverted in PR #82 amended in place.

### Verdict r2, amended tree 1f70b5e — same raton, re-review task (msg_83f6656b5b57)

PASS — Re-reviewed amended tree at 1f70b5e (git reset --hard origin/bygama/mat-105-raton-seat confirmed). Reran four gates on amended tree: agent-lint 0 high/0 medium/0 low — PASS, lint-tests all 20 cases passed, gen-tests all gen cases passed, eval-checks all eval checks passed; negative sweep grep -r 'default 1 ballena' over skills/orchestrate+docs/how-it-works returned no match and no broader 'ballena.*default|default.*ballena' survives except execution.md:247 alt-label naming both seats correctly. Commit order verified evals-first: 08665a3 (eval-01 graded to ratón chispeante default) precedes all content commits 9513df6/a659b79/3b6197d/b9b70d1; eval-03 untouched judgment sound — file contains no 'default' word, fixture 'picked 1 ballena recorded in Task spec' reads as owner CHOICE still selectable, all graded lines conditioned/scoped to that choice or to ballena's own forms. Diff c7eff52..HEAD limited to 5 permitted repo files (runners.md, SKILL.md, eval-01.md, reviewer.md, execution.md) plus lane folder; forbidden surfaces (CHANGELOG.md, AGENTS.md stamp, global/, tests/) empty. No blocking defects; deferred minors remain A3-2/3/4, A2-2, A1-2 and ADR-008 supersession marker (DECISIONS.md:158-175 follow-up lane), all non-blocking.

Parent ruling: PASS accepted on the amended tree; deferred minors stay
in the lane ledger (ADR-008 supersession marker noted for a docs-sweep
or release lane). MAT-105 lane complete — PR #82, tip of the AE stack.

## Merge wave + wave close (2026-08-20)

Stacked order executed exactly as planned, parent-only, rebase-only:
1. AE #77 merged → #80 rebased onto fresh main (--onto, old tip
   f52e8f04 dropped), four gates green locally, retargeted, merged →
   #82 rebased (old tip c7eff52a dropped), gates green, retargeted,
   merged → #78 merged (disjoint, clean).
2. skills #12 merged → #13 rebased in a TEMP worktree (main checkout's
   owner-local CODE_OF_CONDUCT.md deletion untouched and verified
   intact after), CI standard green, merged.
3. Full-tree gates on AE main 731f9d8: 0/0/0 PASS · all 22 cases
   (MAT-99's +2 live) · gen pass · eval checks pass.
4. Remote lane-branch deletion rejected by the ruleset — branches
   remain merged on origin; harmless.

Shipped by this wave, all reviewed PASS: MAT-99, MAT-100, MAT-101,
MAT-104, MAT-94, MAT-105 (+ the raton-default owner amendment).
Terminal close: the five AE lane folders and this parent record are
removed in this commit (finalize-then-remove; history is the record).
Release 1.4.2 follows as its own lane.
