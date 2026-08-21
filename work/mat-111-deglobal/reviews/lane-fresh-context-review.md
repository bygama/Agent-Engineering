# Fresh-context review — lane `work/mat-111-deglobal/` (MAT-111)

Reviewer: fresh-context seat, no prior conversation history with the builders.
Repo: `C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-111-deglobal`
Range reviewed: `4da691f..c40adf9`
Tree state at review: `HEAD = c40adf9e29d80e967a1c10b0b10a0b92754b3949`, `git status --porcelain` → empty (clean).
Nothing was mutated: no commit, no edit, no index/HEAD/branch change. This file is the only write.

---

## DoD run

### Layer 1 — the four repo gates

```
$ node scripts/agent-lint.mjs . --ignore tests,templates,examples
agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-111-deglobal
0 high, 0 medium, 0 low — PASS
EXIT=0
```

```
$ node tests/run-lint-tests.mjs
...
ok   global-layer CLAUDE.md passes its own canon
...
ok   machine-anchored paths in dated records + a fenced block pass
all 22 cases passed
EXIT=0
```

```
$ node tests/run-gen-tests.mjs
all gen cases passed
EXIT=0
```

```
$ node tests/run-eval-checks.mjs
ok   ae-audit: 5 evals well-formed
...
all eval checks passed
EXIT=0
```

All four exit 0, with the self-lint in its NEW (`global`-less) form.

### Layer 2 — the 12 PLAN acceptance commands

Every one run verbatim from the repo root. All exit 0.

| Step | Command (as written in PLAN.md) | Exit | Key output |
|---|---|---|---|
| 1 | `test -f reference/global-layer.md && test $(grep -c '' reference/global-layer.md) -le 120 && node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` | 0 | `0 high, 0 medium, 0 low — PASS`; file is **105** lines |
| 2 | `test ! -e global && node scripts/agent-lint.mjs . --ignore tests,templates,examples` | 0 | `0 high, 0 medium, 0 low — PASS` |
| 3 | `! grep -q 'tests,templates,global,examples' AGENTS.md && grep -q 'reference/global-layer.md' AGENTS.md && grep -q '^Standard: AE/1.4.2$' AGENTS.md && node scripts/agent-lint.mjs . --ignore tests,templates,examples` | 0 | `0 high, 0 medium, 0 low — PASS` |
| 4 | `test $(grep -rl 'tests,templates,global,examples' --exclude-dir=.git --exclude-dir=mat-111-deglobal . \| wc -l) -eq 0 && grep -q 'tests,templates,examples' .github/workflows/gates.yml` | 0 | (silent success) |
| 5 | `! grep -q 'global/CLAUDE.md\|global/hooks' README.md && grep -q 'reference/global-layer.md' README.md && node scripts/agent-lint.mjs . --ignore tests,templates,examples` | 0 | `0 high, 0 medium, 0 low — PASS` |
| 6 | `! grep -q 'global/' docs/how-it-works/architecture.md && grep -q 'global-layer.md' docs/how-it-works/architecture.md` | 0 | (silent success) |
| 7 | `! grep -q 'global/hooks/README.md' docs/how-it-works/standard-lifecycle.md && grep -q 'five-surface\|standard-lifecycle' work/mat-111-deglobal/DECISIONS.md` | 0 | (silent success) |
| 8 | `! grep -q 'global/hooks' reference/orca.md && test $(grep -c '' reference/orca.md) -le 120 && node scripts/agent-lint.mjs . --ignore tests,templates,examples` | 0 | `0 high, 0 medium, 0 low — PASS`; `reference/orca.md` = **120** lines (exactly at cap, not over) |
| 9 | `test $(grep -c 'MAT-111' docs/specs/SPEC-agent-engineering.md) -ge 2 && grep -q '2026-08-20' … && git diff --stat …` | 0 | `MAT-111` count = **2** |
| 10 | `grep -q 'machine-config' work/mat-111-deglobal/DECISIONS.md && ! grep -q 'global/' examples/machine-config/README.md` | 0 | (silent success) |
| 11 | all four gates | 0 | see Layer 1 |
| 12 | `grep -q 'ignore tests,templates,examples' skills/ae-audit/evals/eval-03.md && ! grep -q 'scripts, global, tests' … && node tests/run-eval-checks.mjs && node scripts/agent-lint.mjs . --ignore tests,templates,examples` | 0 | `all eval checks passed`; `0 high, 0 medium, 0 low — PASS` |

### Layer 2b — the three known-weak commands, judged on their own terms

**Step 4 (original repo-wide form).** I ran the original, unexcluded form to see what it actually finds:

```
$ grep -rl 'tests,templates,global,examples' --exclude-dir=.git .
./work/mat-111-deglobal/DECISIONS.md
./work/mat-111-deglobal/PLAN.md
./work/mat-111-deglobal/PROGRESS.md
./work/mat-111-deglobal/reviews/step-01-review.md
./work/mat-111-deglobal/reviews/step-03-review.md
./work/mat-111-deglobal/reviews/step-04-review.md
./work/mat-111-deglobal/reviews/step-11-review.md
./work/mat-111-deglobal/SPEC.md
```

Eight hits, **all eight inside the lane's own record files**, which quote the old command in order to describe the change. Zero outside. The controller's ruling (DECISIONS.md:111-135) is correct on the facts, and — this is the part that matters — the lane corrected the *PLAN's acceptance line* rather than editing a record to force a green grep. That is the honest resolution of the two available ones. **Sound.**

**Step 7.** The second clause (`grep -q 'five-surface\|standard-lifecycle' DECISIONS.md`) is near-vacuous: any mention of the filename satisfies it, so the command proves a judgment was *filed*, not that one was *made*. I therefore checked the judgment itself. DECISIONS.md:137-182 takes reading (ii) — that `standard-lifecycle.md:170-173` enumerates consumer-repo surface *classes*, not this repo's directories — on three pieces of evidence. I verified the load-bearing one independently:

```
$ sed -n '325,327p' scripts/agent-lint.mjs
// consumer receives — skills/, reference/, templates/, global/, loops/ — a
$ grep -n 'SHIPPED_SURFACE' scripts/agent-lint.mjs   →  /^(skills|reference|templates|global|loops)\//
```

The chapter's phrasing is word-for-word the lint comment's, the check it narrates still carries `global/`, and `scripts/agent-lint.mjs` is untouched by this lane (`git diff --name-only 4da691f..c40adf9 -- scripts/` → empty). Editing the sentence to "four surfaces" would have made the chapter contradict the check it exists to explain. **The judgment is right, and it is right for the reason recorded.**

**Step 10.** `! grep -q 'global/' examples/machine-config/README.md` passes vacuously — I confirmed the pre-lane file also had zero hits:

```
$ git show 4da691f:examples/machine-config/README.md | grep -c 'global/'
0
```

So the command could never have failed. The lane recognized exactly this (DECISIONS.md:189-193, "First fact that decides most of it… returns 0") and then did the real work: a claim-by-claim audit of the file's five assertions, all of which point at `bygama/workstation` rather than at anything this lane touched. Verdict "no edit" is correct, and `examples/` stayed on the never-touch list. **Sound.**

### Layer 3 — the SPEC's own Verification section

**Clause 1 — four gates in the new form.** Done above, all 0.

**Clause 2 — "no live (non-record, non-fenced) surface greps for `global/` as a path".** I ran the full sweep and classified every single hit myself:

```
$ grep -rn 'global/' --exclude-dir=.git --exclude-dir=mat-111-deglobal . | sort
```

| Hit | Class | Verdict |
|---|---|---|
| `.claude/skills/docs-sweep/references/patterns.md:48` | fenced, Ruling C | matches ruling — file untouched |
| `CHANGELOG.md:44,177,390` | dated record | untouched (verified: `git diff --stat … -- CHANGELOG.md` → 0 lines) |
| `docs/plans/2026-08-16-*.md` (5 hits) | dated record | untouched |
| `docs/specs/SPEC-agent-engineering.md:196,273` | dated record, **amended** at `:210` and `:280` | correct |
| `docs/how-it-works/standard-lifecycle.md:172` | live, non-fenced — consumer-class enumeration | ruled to stay; verified above |
| `scripts/agent-lint.mjs:326` | code comment, PLAN-fenced | untouched |
| `skills/ae-init/references/migration.md:140` | fenced, and a 1.4.2 version-history entry about *consumer repos that vendor* those dirs | still true; not in any ruling but needs none |
| `skills/using-ae/evals/eval-03.md:5,10,35` | fenced, Ruling B | matches ruling — file untouched |

**No live surface asserts that this repo has a `global/` directory.** The two live non-fenced mentions (`standard-lifecycle.md:172`, `agent-lint.mjs:326`) both have "a consumer" as their subject and describe a surface class the lint still scans. The clause is satisfied under the correct reading, and the lane's documentation of why is accurate.

**Clause 3 — `docs/how-it-works/` covers the new shape.** `architecture.md` dropped the `GLB` mermaid node (no dangling `GLB` reference anywhere: `grep -rn 'GLB' docs/how-it-works/ README.md` → none), deleted the `### global/` section, and added a substantive paragraph at `:52-61` naming `reference/global-layer.md`. `standard-lifecycle.md:25-26` repointed. Section coverage after the change is 8 `###` blocks for 8 of the 9 top-level dirs, `work/` having its own chapter — consistent with the pre-existing convention.

---

## What was done well

Acknowledging this first, because several of these are things a lane of this shape usually gets wrong.

1. **Nothing of value died in the deletion — I proved it byte-for-byte, not by trusting the claim.** I extracted all three deleted files from `4da691f` and diffed them (CRLF-normalized) against the live workstation clone at `C:\Briar\repos\mine\workstation`:

   ```
   === orca-probe.ps1 === 2,3c2,3   (only the "Canonical:" header lines differ)
   === using-ae.ps1   === 2,3c2,3   (only the "Canonical:" header lines differ)
   === CLAUDE.md      === 3c3       (only the "Canonical:" comment differs)
   ```

   Every functional line is identical; the only divergence is the canonical-source header, which MAT-110 correctly repointed at workstation. Deletion cost zero content.

2. **`reference/global-layer.md` is true, and it silently fixed a latent bug.** I checked its two checkable claims about the lint:
   - "`agent-lint` finds it by content, not by path" — `scripts/agent-lint.mjs:144-149`: `const claudes = files.filter(basename === "CLAUDE.md")`, then `globals` selected by `fileLines(f)[0]?.trim() === "# Global instructions"`, then `if (n > 40) add("medium", …)`. Content-detected, path-agnostic, 40-line cap. **Accurate.**
   - The JSON hook snippet at `:59-75` uses the **nested** shape (event array → entry carrying its own `hooks` array). The deleted `global/hooks/README.md:14-26` used the **flat** shape (`type`/`command` directly in the event array entry), which Claude Code does not load. I checked the real runner config on this machine — `~/.claude/settings.json` uses the nested shape throughout. The lane did not merely port the recipe; it **corrected a snippet that would not have worked.** The accompanying note ("The exact nesting belongs to the runner; that shape is Claude Code's") is the right hedge for a runtime-neutral standard.

3. **The fences held exactly.** `git diff --name-only 4da691f..c40adf9 -- skills/ tests/ examples/ .claude/ CHANGELOG.md docs/plans/` returns exactly one path: `skills/ae-audit/evals/eval-03.md`, and its diff is exactly two changed lines — the two the fence-lift ruling authorized, nothing else. `AGENTS.md:3` still reads `Standard: AE/1.4.2` and the stamp line does not appear in the diff at all (`git diff … -- AGENTS.md | grep -c 'Standard: AE'` → **0**). `CHANGELOG.md` diffstat → **0 lines**. `scripts/` diffstat → empty.

4. **The accepted debt is genuinely ticketed.** I did not take Ruling B's citation on faith — I pulled MAT-114 from Linear. It exists, status Backlog, and its description states the exact rewrite-against-doctrine constraint the ruling quotes ("pointing it at bygama/workstation would couple a standard's eval to the owner's personal repo"). The debt has a real owner.

5. **The amendment style is house-consistent.** The two new notes match `docs/adrs/ADR-008-orchestration.md:47`'s `*Amended 2026-08-20 (v1.4.2, MAT-105 owner amendment): …*` template. Both preserve the original text and add the correction beneath it, which is what "amend, not rewrite" means.

6. **The lane surfaced its own weaknesses instead of hiding them.** Step 3's implementer flagged step 4's grep defect without pre-empting the decision; step 12's reviewer caught an enumeration gap the implementer's "Concerns: none" had missed, and the gap was **recorded rather than fixed**, because fixing it would have exceeded the two-line ruling. That is the correct call in both directions.

7. **Prose quality on the rewritten surfaces is high.** The README's replication section and `architecture.md:52-61` do the hard thing — explaining a layer whose directory no longer exists, without leaving the reader hunting for a folder. `architecture.md:54` ("because a reader may come looking for a directory and find only a file") anticipates exactly the confusion the deletion creates.

---

## Issues

### Critical (Must Fix)

**None.** No gate is red, no fence was crossed, no false claim ships on a live surface, and no content was lost.

### Important (Should Fix)

**None that block this lane.** The two candidates below were considered and rejected as findings:

- `skills/using-ae/evals/eval-03.md` now names paths that do not exist — but it is fenced, ruled by the parent (B), recorded as debt, and ticketed as MAT-114 (verified live). It breaks no gate (`run-eval-checks.mjs` is structural; my gate-4 run shows `ok using-ae: 7 evals well-formed`).
- `.claude/skills/docs-sweep/references/patterns.md:48` exempts a directory that no longer exists — dead half, not false half, and Ruling C assigns it to the next sweep.

Both are recorded decisions with owners, not undisclosed breakage.

### Minor (Nice to Have)

1. **`work/mat-111-deglobal/PLAN.md` — 12 unticked boxes.** `grep -c '^- \[ \] \*\*'` → 12, `grep -c '^- \[x\]'` → 0, while PROGRESS.md records all 12 steps DONE. This is *not* a defect at this gate: `skills/work-handoff/SKILL.md:57` puts "ticked PLAN" in the handoff commit, which is the next step after this review. Flagging only so handoff does not skip it.

2. **The workstation out-of-scope report names one stale line; there are two.** DECISIONS.md:100-109 reports `bygama/workstation`'s `claude/README.md` describing its `hooks/` folder as `(canonical source: Agent-Engineering/global/hooks/)`. I checked the file and found a second, arguably worse one:

   ```
   claude/README.md:32: | `hooks/` | … (canonical source: `Agent-Engineering/global/hooks/`) |
   claude/README.md:53: `Agent-Engineering/global/CLAUDE.md`. Edit there first, copy here, then re-run the
   ```

   Line 53 is an *instruction* to edit a file that will not exist after this merge, not just a stale attribution. Correctly out of scope for this repo — but the `worker_done` body handed to the parent should name both lines so the workstation-side fix lands complete in one pass.

3. **`docs/specs/SPEC-agent-engineering.md` step-9 acceptance carries a no-op clause.** The third conjunct, `git diff --stat docs/specs/SPEC-agent-engineering.md`, exits 0 with no output against a clean tree regardless of what the file contains — it verifies nothing at review time. The step's real evidence is the `MAT-111` count (2) and the date grep, both of which I confirmed. Not flagged by the brief as known-weak, but it belongs in the same bucket as steps 7 and 10.

4. **Two cosmetic long lines in `docs/how-it-works/architecture.md`.** The chapter wraps at ~78 columns; `:32` (83 chars, newly written) and `:47` (123 chars — pre-existing at 109, widened by inserting "global layer, ") now exceed it. `docs/how-it-works/` is explicitly outside the length budgets per AGENTS.md and the lint is green, so this is style only.

---

## Verdict

**PASS**

All four repo gates exit 0 with the self-lint in its new form (`0 high, 0 medium, 0 low — PASS`, `all 22 cases passed`, `all gen cases passed`, `all eval checks passed`), all 12 PLAN acceptance commands exit 0, and I independently confirmed the three known-weak ones pass for defensible reasons rather than by accident — most decisively `scripts/agent-lint.mjs:325-326` carrying the same "five surfaces a consumer receives — skills/, reference/, templates/, global/, loops/" phrasing that step 7 declined to edit. The deletion is provably lossless (deleted files diff against the workstation clone in the canonical-header line only), the fences held to exactly one file and exactly two lines, and `AGENTS.md:3` still reads `Standard: AE/1.4.2` with `CHANGELOG.md` at a zero-line diffstat. The four Minor items are handoff hygiene and cosmetics; none of them changes the lane's correctness.
