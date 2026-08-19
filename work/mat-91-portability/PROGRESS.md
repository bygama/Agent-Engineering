# PROGRESS — mat-91-portability

Tickets: MAT-91 (primary) + MAT-88 · Tier M · Base: main 9fc4bda (v1.4.0)
Branch: `bygama/mat-91-portability` · Dispatch: ctx_85f24f7cf833

## Status

| Step | What | State |
|---|---|---|
| 1 | using-ae eval-07 (map routes to skill-authoring) | DONE `ec806d0` |
| 2 | portability evals ×3 [batch] | DONE `784934c` |
| 3 | three skills: path literal ⇒ citation [batch] | DONE `0dd4dac` |
| 4 | two loops: path literal ⇒ `<repo>` [batch] | DONE `fe98ac6` |
| 5 | using-ae map row | DONE `b43392d` |
| 6 | gate sweep + lane truth | DONE (this entry) |

Executed by `work-run`'s documented inline fallback — this session has no
subagent capability it is permitted to use (dispatch brief: no
grandchildren; harness: no Agent tool unless requested). Same lane, same
ceremony, PLAN steps in order, acceptance per step, PROGRESS updated.
Nothing was downgraded and no dispatch was simulated.

## Baseline (before any edit, base 9fc4bda)

All four gates green before this lane touched anything — so any later
failure is this lane's, not inherited:

```
node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
  → 0 high, 0 medium, 0 low — PASS                        exit 0
node tests/run-lint-tests.mjs   → all 16 cases passed     exit 0
node tests/run-gen-tests.mjs    → all gen cases passed    exit 0
node tests/run-eval-checks.mjs  → all eval checks passed  exit 0
```

The five hits, measured rather than taken on faith
(`grep -rn "C:/Briar" --include="*.md" . | grep -v "^./work/"`):

```
loops/issue-triage.md:41       --provider claude --repo path:C:/Briar/…
loops/self-audit.md:45         --provider claude --repo path:C:/Briar/…
skills/ae-audit/SKILL.md:33    `C:/Briar/…` — or locate/ask). It settles the
skills/ae-init/SKILL.md:14     this machine `C:/Briar/…` — or ask).
skills/loop-setup/SKILL.md:65  `C:/Briar/…`, or locate/ask). Fill every
```

Clean-by-contrast claim verified, not assumed — the same grep over
`reference/`, `templates/`, `global/`, `.claude/`, `tests/` returns zero
hits.

## Reported to the parent (findings this lane does not act on)

1. **A sixth machine-path hit exists, and is deliberately left alone.**
   `docs/plans/2026-08-16-agent-engineering-p2-usage-skills.md:37` carries
   the same literal. It is a dated, closed implementation plan — a record
   of what was written that day, not a surface an agent follows. Editing it
   to satisfy a portability sweep would falsify history. Parent confirmed
   at the SPEC gate. See DECISIONS.
2. **`README.md` needs nothing.** The brief allowed touching it "only if
   the portability fix genuinely needs it". It does not: README already
   reads "## The eleven skills" and already carries the `skill-authoring`
   row, both landed when that skill shipped with MAT-44.
3. **MAT-88's framing-sentence check is a verified no-op.** `## The map`
   has no framing sentence and the file carries no skill count anywhere, so
   eleven rows read exactly as nine did. See DECISIONS.
4. **Follow-up worth a ticket, not built here: a lint check banning
   machine-absolute paths on shipped surfaces.** This lane removes five
   instances by hand; nothing stops the sixth from being typed tomorrow.
   The natural home is `scripts/agent-lint.mjs`, which is sibling lane B's
   file this wave, so the check is reported rather than written. It pairs
   naturally with MAT-92 (the ≤80 cap check) as the same "make the law
   executable" family.

## Handoff — 2026-08-19

**State: work complete, pushed, PR open. Owner of the next step: the
parent.** Nothing in this lane is in progress and nothing is blocked.

**Mode.** Closed to review, not terminally closed — and the lane folder
**survives on purpose**. work-handoff's default close removes it, but this
repo's convention is visibly the opposite for dispatched lanes: the parent
removes lane records itself after merge (`9fc4bda`, "chore(lanes):
terminal close — MAT-44 and MAT-87 lane records"). Deleting the lane here
would also destroy what the parent's review wave reads — SPEC, PLAN,
DECISIONS and this file are the reviewers' inputs, and `--report-path`
points straight at PROGRESS.md.

**Debris sweep.** `git status --porcelain` → 0 lines. No stray TODO/FIXME
added, no commented-out blocks, no scratch file inside the repo (the two
this lane used — a resolver probe and a text block — live in the session
scratchpad, outside the tree). The two `{{PLACEHOLDER}}` matches in the
diff are prose *about* placeholder sweeps (`ae-init/SKILL.md:115`,
pre-existing; `loop-setup/evals/eval-06.md:43`, this lane's), not surviving
markers.

**State check, re-run after the reflow commit** (files changed since the
verification block, so nothing is carried over from that run): all four
gates exit 0.

**What the parent still owns:**

1. **The review wave** — fresh-context and adversarial rungs, NOT run here
   (see `## Verification`). 1 ballena per the dispatch config.
2. **The merge** — this lane never merges. It HAS now been rebased onto
   fresh main (`f8c340e`) at the parent's request, re-verified there, and
   force-pushed with `--force-with-lease`; see the rebase block under
   `## Verification`.
3. **Terminal lane close** — removing `work/mat-91-portability/` after the
   merge, as with MAT-44 and MAT-87.
4. **Four reported findings** — see `## Reported to the parent` above; the
   only one that wants a new ticket is the lint check banning
   machine-absolute paths on shipped surfaces.

**If a reviewer disagrees with a call**, the reasoning is already written
down rather than needing reconstruction: DECISIONS carries rulings 1-3 and
three local calls, including why the `<repo>` token differs from the
brief's literal and why the `docs/plans/` hit was left alone.

## Verification

### 2026-08-19 — rebase onto fresh main — RE-VERIFIED

Rebased `9fc4bda` → **`f8c340e`** (`origin/main`, sibling lint lane
MAT-89/MAT-92 merged). Clean: 10 commits replayed, no conflict, no file
overlap — the sibling touched `scripts/agent-lint.mjs`, `tests/**`,
`reference/skills.md`, `docs/how-it-works/standard-lifecycle.md` and its own
lane, none of which this lane owns. Rebased head **`4e51196`**.

Four gates on the rebased tip, all exit 0:

```
node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
  → 0 high, 0 medium, 0 low — PASS                       exit 0
node tests/run-lint-tests.mjs   → all 20 cases passed    exit 0
node tests/run-gen-tests.mjs    → all gen cases passed   exit 0
node tests/run-eval-checks.mjs  → all eval checks passed exit 0
```

**What changed vs the pre-rebase run, and what did not.** `run-lint-tests`
reports **20 cases, not 16** — the sibling lane added four fixtures
(`entry-skill-ok`, `entry-skill-bloat`, `cmd-escaping`, `cmd-inrepo-drift`).
The blocks below this one say 16 and were correct for base 9fc4bda; they are
left as written rather than back-edited. `agent-lint`'s own output is
**unchanged** (`0 high, 0 medium, 0 low — PASS`) — the sibling's cmd-drift
rework did not alter this tree's findings.

**Invariant 1 — using-ae still 79.** `wc -l` → 79, `skill-authoring` row
present. It is now enforced by a real check rather than by discipline:
`scripts/agent-lint.mjs:211-216` defines `ENTRY_SKILL_CAP = 80` and emits
`entry-skill-cap` at MEDIUM.

That the check *fires on this file* was proven, not assumed — pushing the
real file to 82 lines and re-running:

```
MEDIUM skills/using-ae/SKILL.md  82 lines — the always-loaded entry skill
  must stay ≤80  [entry-skill-cap]
0 high, 1 medium, 0 low — FAIL
```

Reverted immediately (`git checkout --`); tree byte-identical to the commit
afterwards. So 79 passes because it is under the cap, not because the check
is silent or blind to this path.

**Invariant 2 — the fence, expressed three-dot.**
`git diff --name-only origin/main...HEAD` lists **exactly the 14 files this
lane owns** and nothing else. Post-rebase the two-dot form now agrees (also
14), because the rebase makes `origin/main` a true ancestor of HEAD — the
divergence the reviewer flagged was an artifact of the stale base, and
rebasing is what resolved it rather than a change to the command's claim.
Three-dot remains the correct form to state it in, since it is the one that
stays honest if the branch goes stale again.

### 2026-08-19 — M DoD — PASS on the executable layers; review rung OWED

- **L1 static:** `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → exit 0 (`0 high, 0 medium, 0 low — PASS`)
- **L2 behavioral:** `node tests/run-lint-tests.mjs` → exit 0 (`all 16 cases
  passed`); `node tests/run-gen-tests.mjs` → exit 0 (`all gen cases
  passed`); `node tests/run-eval-checks.mjs` → exit 0 (`all eval checks
  passed`). The repo's executables run: the lint and all three suites
  start and complete.
- **L3 end-to-end:** RUN, not n/a — this change crosses files by
  construction. Three skills now cite a section that must exist in a
  fourth, and two loops must match a template this lane cannot edit:
  - the cited section resolves: `grep -n "^## Reference paths"
    skills/using-ae/SKILL.md` → `17:## Reference paths`, exit 0. No
    dangling citation.
  - all three citations are ONE string, not three variants: piping them
    through `sort -u | wc -l` yields `1`.
  - the loop token matches the fenced template byte-for-byte: both
    `loops/*.md` and `templates/repo/loops/issue-triage.example.md` yield
    the identical `--repo path:<repo>`.
  - **the rule itself was executed on this machine**, which is what the
    three skills now delegate to. Resolving the junction the way a runner
    would:

    ```
    link : C:/Users/mateo/.claude/skills/ae-init
    real : <AE clone>/skills/ae-init
    root : <AE clone>
    root/reference exists  : true
    root/templates/repo    : true
    naive ../../ from link : C:/Users/mateo/.claude/reference  exists: false
    ```

    The rule's walk lands on the directory ae-init needs; the naive walk
    the red-flags row warns about lands nowhere. Both halves reproduced,
    not asserted.
- **DoD sweep:** `grep -rn "C:/Briar" --include="*.md" .` filtered past
  `work/` and `docs/plans/` → exit 1. Zero machine-absolute paths left on
  shipped surfaces.
- **Fence:** no do-not-touch path in `git diff --name-only main` → exit 1
  (no match). 14 files changed, every one owned by this lane.
- **Fresh-context review (step 4) and adversarial review (step 5): NOT
  RUN — OWED, and owned by the parent.** A stated gap, not a silent skip.
  work-verify at M requires a reviewer with no shared context, and this
  session cannot supply one: the dispatch forbids grandchildren, and the
  parent's dispatch config assigns the wave — "adversarial review = 1
  ballena, dispatched by the PARENT after worker_done; the child runs its
  own work-verify only". The verdict below is scoped to match.

**Verdict: PASS on every command the DoD names.** The maker has not been
checked by anyone but itself, so no unqualified M PASS is claimed here —
`worker_done` reports it the same way.

## Evidence log

**Step 1** — `skills/using-ae/evals/eval-07.md` (`ec806d0`).
```
node tests/run-eval-checks.mjs
  → ok   using-ae: 7 evals well-formed        exit 0
```

**Step 2** — three portability evals, one batch (`784934c`).
```
node tests/run-eval-checks.mjs
  → ok   ae-init: 8 evals well-formed
    ok   ae-audit: 5 evals well-formed
    ok   loop-setup: 6 evals well-formed      exit 0
```

**Step 3** — the three skills cite the rule (`0dd4dac`).
```
grep -rn "C:/Briar" skills/                              exit 1
grep -lF '§Reference paths' <the three SKILL.md> | wc -l → 3
grep -c "locate/ask\|or ask)\|on this machine" <same>   → 0 0 0
node scripts/agent-lint.mjs . --ignore …  → 0/0/0 PASS   exit 0
```
This step's acceptance FAILED on first run, on files this lane had just
written: step 2's evals quoted the machine path verbatim as evidence of
the defect they grade. Held the acceptance rather than relaxing it and
rewrote the three preambles to name the defect by shape — DECISIONS
ruling 3 carries the reasoning. Re-run green above.

**Step 4** — the loops ship `<repo>` (`fe98ac6`).
```
grep -rn "C:/Briar" loops/                               exit 1
grep -c -- "--repo path:<repo>" <both loop files>        → 1, 1
grep -q "registered enabled 2026-08-16" issue-triage.md  exit 0
node scripts/agent-lint.mjs . --ignore …  → 0/0/0 PASS   exit 0
```

**Step 5** — using-ae's map row (`b43392d`).
```
wc -l < skills/using-ae/SKILL.md                         → 79  (≤80)
grep -q "^- \*\*skill-authoring\*\* — "                    exit 0
git diff main --numstat -- skills/using-ae/SKILL.md      → 1  0
```

**Step 6** — the four gates, on the finished branch:
```
node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
  → 0 high, 0 medium, 0 low — PASS                       exit 0
node tests/run-lint-tests.mjs   → all 16 cases passed    exit 0
node tests/run-gen-tests.mjs    → all gen cases passed   exit 0
node tests/run-eval-checks.mjs  → all eval checks passed exit 0
```
Fence — no do-not-touch file in the diff:
```
git diff --name-only main | grep -E '^(scripts/|tests/|templates/|global/
  |examples/|README\.md|CHANGELOG\.md|docs/plans/|docs/how-it-works/
  |skills/orchestrate/|reference/)'                       exit 1 (no match)
```
DoD — zero machine-absolute paths outside `docs/plans/`:
```
grep -rn "C:/Briar" --include="*.md" .
  | grep -v "^./work/" | grep -v "^./docs/plans/"          exit 1
```
The only surviving hit repo-wide is the deliberate one:
`docs/plans/2026-08-16-agent-engineering-p2-usage-skills.md:37`.
