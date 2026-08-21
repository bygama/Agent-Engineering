# Progress — MAT-116 + MAT-117 (reviewer seats + review granularity)

Lane: `work/mat-116-117-review-seats/` · Tier L · branch
`bygama/mat-116-117-review-seats` · dispatched by the parent
orchestrator 2026-08-21.

## Lane setup

- **2026-08-21 — read both tickets** (`orca linear issue MAT-116 --full
  --json`, same for MAT-117). Both carry owner rulings and field
  evidence; the parent's dispatch brief is the binding ask.
- **2026-08-21 — re-probed the opencode CLI on this machine** before
  writing anything into `reference/runners.md`, because that file makes
  verify-on-install a hard rule. Results in SPEC.md § "Machine evidence
  this lane re-verified": CLI 1.18.18; `opencode run --auto -m
  opencode/x-preview-f-free` and `... -m
  opencode/muse-spark-1.2-contributor-free` both returned the exact
  requested output; `opencode run --help` lists `--auto`;
  `opencode models` has no `opencode/deepseek-v4-flash-free`.
- **2026-08-21 — work-plan design-first**: SPEC.md written, parent's
  SPEC gate asked and answered (ruling quoted in DECISIONS.md), then
  PLAN.md shaped. 10 steps, review classes on every step.

## Step reports

<!-- work-run appends one report per step below. -->

### Step 1 — `reference/runners.md` — DONE

Commit: see `git log` for `feat(runners)`. Acceptance command exit 0
(all six greps + `agent-lint` 0 high / 0 medium / 0 low).

What landed: the `## Sigilosos`, `## The economics rule` and
`## The degradation chain` sections; the command-mode paragraph
rewritten to name both invocation forms; the `--auto` law extended to
`run` with the false "takes no `--auto`" sentence **replaced**; the
ratón restated at its free id and the falsified "no no-auth Muse Spark
route has run here" claim deleted; the ballena's dead no-auth fallback
declared retired instead of repointed; the adversarial-seat section
gaining opencode + sigiloso as a third verified cross-family pairing.

**Review engine: sigiloso — `opencode run --auto -m
opencode/x-preview-f-free`, command mode, 1st chain position, no
fall-through.** Verdict verbatim:

> VERDICT: PASS
>
> ### Spec compliance
> ✅ Compliant — all seven SPEC §1 requirements landed, each verified against the diff and the resulting file:
>
> 1. **Sigilosos** — new `## Sigilosos` section (runners.md:72-83): house name with owner attribution, Ox Alpha at `opencode/x-preview-f-free` with the Zen-docs mapping and 2026-08-20 announcement specs, Big Pickle named-not-registered with verify-on-install binding.
> 2. **Free ratón** — chain position 2 (runners.md:98-99) and the ratón paragraph restated at `opencode/muse-spark-1.2-contributor-free`, no-auth, verified 2026-08-21; the falsified "no no-auth Muse Spark route has run here" sentence is deleted (grep confirms zero matches).
> 3. **Command-mode recipe** — runners.md:29-41, exactly `opencode run --auto -m <provider/model> "<prompt>"`, one-shot, exits at completion.
> 4. **`--auto` law extended** — runners.md:43-56 states it as an owner rule covering TUI and `run` alike, cites `opencode run --help` at CLI 1.18.18, keeps the SPEC's fall-through-for-the-wrong-reason rationale; the false "takes no `--auto`" sentence is replaced, not softened (grep confirms zero matches).
> 5. **Economics rule** — own H2 section (runners.md:63-70); ratón paragraph runs at the free id with the Go id demoted to chain position 3 (runners.md:110-121). The ballena cannot be restated at a free id because its free id is dead — pointing its no-auth case at the chain is the only truthful reading of this requirement.
> 6. **Degradation chain as law** — own numbered H2 section (runners.md:91-108), order exactly sigiloso → free ratón → paid Go → Claude subagent, with liveness check and never-silently-block stated in the file's voice.
> 7. **Dead id repointed** — table row now falls through to the free ratón (runners.md:25); ballena paragraph names the dead id only to declare it retired (runners.md:126). Grep confirms no `-m opencode/deepseek-v4-flash-free` survives anywhere in the file.
>
> Step acceptance conditions all hold by inspection and grep. Single-file change, matching step scope.
>
> ### Strengths
> - The `--auto` replacement preserves the MAT-91 stall evidence while killing the falsehood — history kept, claim corrected, and "THIS seat" correctly widened to "THESE seats" to match the broader law.
> - The ratón cost record gained "verified 2026-08-19 **on the Go id**" — an honest annotation that stops the new economics rule from retroactively claiming those production reviews were free.
> - The dead-id handling distinguishes naming-to-retire from pointing-a-seat exactly as the brief demands.
> - New sections match the file's voice: dated verifications, owner attributions, em-dash density, Spanish seat names. The command-mode paragraph also seeds the vocabulary steps 3/6/7 consume, per the PLAN's interface block.
>
> ### Findings
>
> #### Critical
> None.
>
> #### Important
> None.
>
> #### Minor
> - **reference/runners.md:136-137** — "ratón or ballena, the no-auth fallback included" (DATA-COLLECTION consent-prompt paragraph): "the no-auth fallback" was the ballena's deepseek-free fallback, which this very change declares retired two paragraphs up; today's no-auth seats are the free ratón and the sigilosos. The sentence's claim stays true, but the definite reference dangles and will send a future reader hunting for a fallback that no longer exists. Fix: "ratón or ballena, the no-auth seats included" or drop the clause.
> - **reference/runners.md:25 vs :76-79** — the table row says the free seats were verified "in run mode" while the body's term is "command mode" (the wobble originates in the SPEC itself). Harmless since command mode is defined at :29, but one word would align them.
>
> ### Assessment
> **Step quality:** Approved
> **Reasoning:** All seven requirements are implemented truthfully and in the file's own voice, with no live surface left pointing at the dead id; the two minor wording leftovers do not mislead action and can ride a later pass.

**Deferred minors (2)** — per work-run, minors never enter the fix loop;
both go to work-verify's triage:

- M1: `reference/runners.md` DATA-COLLECTION paragraph — "the no-auth
  fallback" is now a dangling definite reference.
- M2: table row says "run mode" where the body says "command mode".

### Step 2 — `skills/work-run/evals/` (evals FIRST) — DONE

Acceptance exit 0 (three greps + `node tests/run-eval-checks.mjs`, which
reports `work-run: 6 evals well-formed`). New: `eval-05.md` (reviewer
mode) and `eval-06.md` (review classes). Amended: `eval-01.md` (its
fixture now states the class and the mode, so its "after each DONE"
line stays true under grouping) and `eval-03.md` (the no-subagent
fallback no longer silently costs the lane its reviews).

**Review engine: sigiloso — `opencode run --auto -m
opencode/x-preview-f-free`, command mode, 1st chain position, no
fall-through.** Round 1 verdict verbatim:

> VERDICT: FAIL
>
> ### Spec compliance
> ❌ Issues found — one named SPEC §6 scenario has no eval line: **the sigiloso default**. `skills/work-run/evals/eval-05.md:24-27` only ever tests a mode the lane *explicitly settled* (fixture line 64: "The dispatch dialogue settled the per-step seat as command-mode sigiloso"; the query itself commands "Use command mode"). No checklist line says what happens when **nothing** was settled — SPEC §2:114-122 makes "Default when available: the sigiloso, in command mode" one of the three things the skill must state, and SPEC §6:210-214 names "sigiloso default" among exactly what these evals encode. An implementation that stalls asking for a mode, or silently defaults to the paid Go seat, passes every line in the set. Everything else in the step is present and correctly shaped.
>
> ### Strengths
> - **eval-05's degradation scenario is genuinely discriminating**: the sigiloso retires *mid-run* (line 68-69), which catches implementations that liveness-check once at start; and "falling through the chain is normal operation... a missing verdict is not a verdict" (lines 107-109) encodes runners.md's law, not just its mechanics.
> - **eval-06's lines each name a distinct wrong behavior**: "not three separate reviews and not zero", the boundary-resizing prohibition, the upgrade/downgrade asymmetry, and "does not stop the run to demand the PLAN be re-annotated first" — that last one is an easy-to-miss failure mode no plausible bad implementation self-reports.
> - **Stale-sweep discipline is right**: eval-01's fixture gains `per-step` marking plus a settled reviewer mode so its "after each DONE" line stays true under classes; eval-03(b) gains reviews-survive-without-subagents; eval-02/eval-04 are correctly untouched — nothing in them is falsified.
> - Vocabulary matches step 1's interface exactly: chain order and ids (eval-05:66-68 = runners.md:96-103), the recipe form, sigiloso/ratón terms, the `(judgment · per-step)` notation.
>
> ### Findings
> #### Critical
> None.
>
> #### Important
> 1. **`skills/work-run/evals/eval-05.md` — the sigiloso default is never exercised as a default.** The mode+model are settled in every fixture (eval-01:15 settles `subagent`; eval-05 settles command-mode sigiloso; eval-06 settles neither but asserts nothing about mode). What's untested: lane settled no seat → controller applies command-mode sigiloso, verifies it responds, walks the chain otherwise. This matters because it is one of the four scenarios SPEC §6 assigns to this very step, and a wrong default is the economics rule's named bug ("a paid id written as a default anywhere in this standard is a bug"). Fix: add one line to eval-05 (e.g. "*When the lane settled no reviewer seat, defaults to command-mode sigiloso rather than asking or inheriting the last-used seat, verifying it responds before relying on it*") — or give eval-06's classless fixture (`work/old-lane-42/`, which settles nothing) the mode expectation too.
>
> #### Minor
> 1. **`eval-05.md:80-81`** — "(which has nothing to attach to here)" misapplies runners.md's chiasmus: runners.md:38-40 reserves "nothing to attach to" for the headless-form-in-the-TUI-slot direction. In a command-mode slot the TUI form's actual failure is that it never exits and returns no stdout verdict. Reword the parenthetical.
> 2. **`eval-05.md:78-85`** — `--auto` is asserted twice (line 81 ends "never without `--auto`"; line 83-85 is wholly about carrying it). Keep the dedicated line, drop the trailing clause; duplicated assertions drift apart on future amendments.
> 3. **`eval-03.md:31-32`** — "where a runner is installed" is looser than intended: every runtime has *a* runner. The operative condition is a command-mode-capable runner per `reference/runners.md`. Tighten so a grader can't read any installed runner as qualifying.
>
> ### Assessment
> **Step quality:** Needs fixes
> **Reasoning:** Five of the six scenarios the brief weights hardest have sharp, discriminating eval lines, and the amendments leave zero stale claims — but the sigiloso default, explicitly named in SPEC §6 for this step's evals, is only ever baked into fixtures and never tested as fallback behavior, so a content commit omitting it would pass every gate. One added line closes it.

**Fix round 1/5** — the Important finding is real: every fixture *settled*
a seat, so the default was never the thing under test. `eval-05.md` gains
a second query (b) with nothing settled anywhere, plus two
expected-behavior lines — apply command-mode sigiloso as the default
rather than stalling or starting at a paid id, and verify it responds
before relying on it. The three minors were accurate and one-line, so
they rode the same edit rather than being deferred.

Re-review verdict verbatim (same engine, scoped to the fix diff):

> **Important 1 — sigiloso default never exercised as a default: ADDRESSED.** The new eval-05 adds query (b) with no seat named and none settled (eval-05.md:7-8, 21-23), and expected behavior lines 31-38 make the agent apply **command-mode sigiloso** as the default, verify it responds, and walk the chain — explicitly naming "Starting at a paid seat is the economics rule's named bug" (:33-35), which is precisely the untested case the finding described.
>
> **Minor 1 — misapplied chiasmus: ADDRESSED.** "(which has nothing to attach to here)" is gone; eval-05.md:41-43 now states the actual command-mode-slot failure — the bare TUI form "never exits and returns no verdict on stdout for the controller to read" — matching runners.md's two-forms doctrine (runners.md:29-40). The "nothing to attach to" phrase survives only in runners.md, where it belongs.
>
> **Minor 2 — `--auto` asserted twice: ADDRESSED.** One dedicated rationale bullet remains (eval-05.md:44-47); the redundant trailing clause is gone. The only other occurrence is inside the verbatim registered command string (:40), which quotes runners.md's registration rather than re-asserting the rule.
>
> **Minor 3 — loose runner condition in eval-03: ADDRESSED.** eval-03.md:31-32 now reads "where a **command-mode-capable runner registered in `reference/runners.md`** is installed" — the operative condition as intended.
>
> **NEW BREAKAGE**
>
> None. Checked specifically:
>
> - Fixture chain (eval-05.md:16-19) and walk order (:62-65: free ratón → paid Go seat → in-session Claude subagent) match runners.md's degradation chain exactly (runners.md:96-103); command form matches runners.md:25,29-31; the stalled-`run` rationale (:46-47) matches runners.md:47-48; "declared NOT done, never quietly skipped" (eval-03.md:34-35) mirrors runners.md:177-178.
> - "Same three inputs" (:53-55) matches step-reviewer.md:7-8; two-verdict requirement (:57-59) matches SKILL.md:76-77; maker ≠ checker (:72-73) matches SKILL.md:73.
> - eval-05 fills the numbering gap before existing eval-06 without overlap — eval-06 tests review classes, eval-05 tests reviewer mode; no contradiction with eval-03's inline-fallback bullet (eval-03.md:20-23), which the new bullet refines rather than reverses.
> - No stale eval-count claims on living surfaces (hits were historical lane/plan snapshots).
> - Gates: `node scripts/agent-lint.mjs . --ignore tests,templates,examples` → 0 findings, PASS; `node tests/run-eval-checks.mjs` → all suites ok, work-run now 6 evals well-formed.
>
> ```
> VERDICT: PASS
> ```

Step 2 closes Approved at fix round 1/5. No deferred minors.

### Step 3 — `skills/work-run` content (the knob and the classes) — DONE

Acceptance exit 0 (five greps + `agent-lint` PASS + eval-checks). Two
commits, evals-before-content preserved inside the step: `34896c4`
amends eval-05 for the new fourth template input, then `24b0438` lands
SKILL.md + step-reviewer.md.

**Review engine: sigiloso — `opencode run --auto -m
opencode/x-preview-f-free`, command mode, 1st chain position, no
fall-through. Three passes: FAIL, FAIL, PASS.** Verdicts verbatim:

#### Round 1 — FAIL

> → Read C:/Users/mateo/AppData/Local/Temp/claude/C--Users-mateo-orca-workspaces-Agent-Engineering-mat-116-117-review-seats/8abd0527-a86c-43d8-be63-57722fcf9bdf/scratchpad/brief-common.md
> → Read reference/runners.md
> → Read work/mat-116-117-review-seats/PLAN.md
> VERDICT: FAIL
>
> ### Spec compliance
> ❌ Issues found — one missed requirement (stale claim left behind), one internal contradiction:
>
> - **Missing (stale claim): `skills/work-run/SKILL.md:3`** — the frontmatter description still promises "…with a **per-step review**, a capped fix loop…". Under `grouped`, a step no longer gets a per-step review, and under `covered-by-batch` it gets none of its own. The body now falsifies the file's own most-read sentence: this description is what auto-loads into every future session's skill list (the skill is junction-linked into `~/.claude/skills`), so controllers will triage work-run on a claim the skill no longer holds. Exactly the "claim the change itself falsified" this step existed to purge. Fix: one line, e.g. "with reviews scaled by each step's review class".
> - **Internal contradiction: `references/step-reviewer.md:7-9` vs `:18-21`** — "How to fill: **exactly three inputs**" stands unchanged, while the new command-mode note says the seat "also needs **the worktree root named**" — for which the template has no slot and the placeholder list (`:118-124`) no entry. Command-mode fillers must invent a fourth input freehand, in the very mode the note was written to keep templated. Fix: add `[WORKTREE_ROOT]` to the template and the inputs list, or fold the root into an existing input's semantics.
>
> Otherwise compliant: SPEC §2's three mandated statements (shell-command-not-worker + untouched fence, sigiloso default + liveness + chain, maker ≠ checker strengthened) are all present where the knob is documented (SKILL.md:106-131); SPEC §5's three classes, the classless-PLAN fallback, and the unchanged-list (fix loop, cap of 5, work-verify gate, adversarial seat) all land (SKILL.md:91-104, 129-131); step-reviewer gains the command-mode fill note, keeping the template the single source in both modes. Acceptance greps would all hit; SKILL.md is 200 lines, well under budget. (Gates not run — read-only seat.)
>
> ### Strengths
> - **Eval coverage is genuinely complete.** Every checkbox in eval-05 and eval-06 maps to an instruction: mode recognition + no last-lane inheritance (SKILL.md:54-57), liveness-before-reliance and chain fall-through (:120-123), engine attribution and "a missing verdict is never an Approved step" (:123-125), the exact run form with `--auto` (:110-112), per-step non-overridability with all three rationalizations named (:97-99), group = PLAN-drawn contiguous run (:101-102), upgrade-free-with-reason (:99-100), classless→`per-step` (:102-104). No orphan checkboxes found.
> - The no-grandchildren treatment is exemplary for the supervised-child controller: the bullet states the fence is untouched AND that refusing on that theory is a misread (SKILL.md:112-116), and the Red flags row lands the exact rationalization (:185).
> - Degradation chain is delegated to `reference/runners.md` instead of restated — zero drift surface, correct density.
> - The four new Red flags rows anticipate the real failure talk; checklist items 0-2 were updated coherently, not just the body.
>
> ### Findings
> #### Critical
> None.
>
> #### Important
> 1. `skills/work-run/SKILL.md:3` — stale "a per-step review" in the auto-loaded description; falsified by `grouped`/`covered-by-batch`. Fix in this step's scope; one line.
> 2. `skills/work-run/references/step-reviewer.md:7-9` vs `:18-21` — "exactly three inputs" contradicts the command-mode note's worktree-root requirement; no placeholder carries it.
>
> #### Minor
> 1. Placeholder drift vs the step-1 interface: SKILL.md:111 and step-reviewer.md:15 write `-m <model>`; `reference/runners.md:25,30` and PLAN's interface register the recipe "exactly" as `-m <provider/model>`. Same command, shortened placeholder — align or accept deliberately.
> 2. Eval-05(b)'s "applies the default rather than stalling to ask" rests on inference: step 1 lists two settlement sources (SKILL.md:55-57) and the default paragraph's "when available" reads as seat availability (:118), not as "if nothing settles the mode, take this and keep going". One clause would close it.
> 3. Grouped fill vs the template's singular frame: "You are reviewing one step's implementation" (:36-37), "Review lane step [STEP_NUMBER]" (:31), "Step quality" (:114) — the grouped note (:24-27) pours three PLAN lines into singular slots and never says what `[STEP_NUMBER]` becomes (a range?). State the convention.
> 4. SKILL.md:49-50 — "only where neither does is a review rung declared NOT done, explicitly" is grammatically tangled for a load-bearing rule; smooth the inversion.
>
> ### Assessment
> **Step quality:** Needs fixes
> **Reasoning:** The knob and the classes themselves are well-built — eval coverage is complete and the fence language is the best in the file — but the change leaves its own highest-visibility sentence (the description) claiming per-step reviews, and the command-mode fill note contradicts the template's three-input contract it sits under. Both fixes are one-liners; both are this step's obligation, not a follow-up's.
>

#### Round 2 (fix: description + `[WORKTREE_ROOT]` + four minors) — FAIL on new breakage

> → Read skills/work-run/evals/eval-05.md
> → Read skills/work-run/evals/eval-06.md
> → Read skills/work-run/evals/eval-04.md
> → Read skills/work-run/evals/eval-03.md
> → Read skills/work-run/evals/eval-01.md
> → Read skills/work-run/evals/eval-02.md
> **Important 1 — ADDRESSED.** `SKILL.md:3` replaces "a per-step review" with "reviews scaled by each step's review class and bought from either seat (in-session subagent or command-mode runner)" — no longer falsified by `grouped`/`covered-by-batch`, and the trigger clauses are untouched.
>
> **Important 2 — ADDRESSED.** `step-reviewer.md:7-9` now says "three inputs in `subagent` mode … plus a fourth, `[WORKTREE_ROOT]`, in `command` mode"; the placeholder is defined (`:135-136`) **and** appears in the template body (`:63`, "The checkout under review is [WORKTREE_ROOT].").
>
> **Minor 1 — ADDRESSED.** Both files now carry `-m <provider/model>` (`SKILL.md:112`, `step-reviewer.md:18`), matching `reference/runners.md`.
>
> **Minor 2 — ADDRESSED.** `SKILL.md:121-123`: "Nothing settled the mode ⇒ take that default and keep going: never stall the run to ask, and never start at a paid id" — eval-05(b)'s expectation is now stated in content, not inference.
>
> **Minor 3 — ADDRESSED.** `step-reviewer.md:27-32` defines the grouped fill (combined diff, every PLAN line in order, `[STEP_NUMBER]` = range `3-5`), backed by the placeholder updates at `:128-131`.
>
> **Minor 4 — ADDRESSED.** `SKILL.md:46-51` untangles it into two clean sentences ("Only when the runtime has neither — no subagents and no registered runner — is a review rung declared NOT done…").
>
> ### NEW BREAKAGE
>
> **Important — `evals/eval-05.md:53-56`.** The command-mode checkbox still reads "Composes the command-mode prompt from `skills/work-run/references/step-reviewer.md` — **the same three inputs** — never a freehand prompt…". The fix made `[WORKTREE_ROOT]` a *required* fourth input in command mode (`step-reviewer.md:7-9`), so this sentence is now false — stale claim left behind by the change itself, and evals must change before content on every revision. Worse, grading against it could pass a command-mode prompt that omits the worktree root — reintroducing exactly what Important 2 closed. Fix: amend the parenthetical to "its three shared inputs plus `[WORKTREE_ROOT]`".
>
> **Minor — `step-reviewer.md:63`.** Nothing tells a subagent-mode filler what to do with the body line "The checkout under review is [WORKTREE_ROOT]." (fill or delete), so an unfilled bracket can ship to the seat. One clause settles it.
>
> Everything else checks out: description still an accurate trigger; class/mode/default text consistent with `runners.md`'s chain and economics rule; red-flag rows match the body; evals 01–04 and 06 unaffected (eval-01's "three inputs" is correct — its fixture is subagent mode).
>
> ```
> VERDICT: FAIL
> ```
>

#### Round 3 (fix: eval-05 input count + the subagent-mode fill rule) — PASS

> → Read skills/work-run/evals/eval-06.md
> → Read reference/runners.md
>
> $ git status --porcelain && git stash list | Select-Object -First 3
> M skills/work-run/SKILL.md
>  M skills/work-run/evals/eval-05.md
>  M skills/work-run/references/step-reviewer.md
>
> **Finding 1 (Important — eval-05 "same three inputs"):** **ADDRESSED** — `skills/work-run/evals/eval-05.md:53-58` now reads "its three shared inputs plus `[WORKTREE_ROOT]`, which command mode requires because the seat has no ambient checkout". Grading against it can no longer pass a command-mode prompt that omits the worktree root; the wording also matches `step-reviewer.md:7-9` and the placeholder list at `step-reviewer.md:135-138`.
>
> **Finding 2 (Minor — unfilled `[WORKTREE_ROOT]` bracket in subagent mode):** **ADDRESSED** — `skills/work-run/references/step-reviewer.md:135-138`: "`[WORKTREE_ROOT]` — REQUIRED in `command` mode only … in `subagent` mode delete that template line rather than leaving an unfilled bracket in the prompt." The fill instruction is unambiguous and lands on the exact body line (template line 63).
>
> **NEW BREAKAGE:** none. Swept `SKILL.md`, `step-reviewer.md`, and all six `evals/*.md` for surviving input-count claims and anything else the `[WORKTREE_ROOT]` addition falsified:
>
> - The only remaining "three inputs" phrasing is `evals/eval-01.md:44-47`; its fixture pins the lane's reviewer mode to `subagent` (eval-01.md:15), where three inputs is exactly the corrected rule — no wrong prompt passes grading, so it is not falsified.
> - Other "three" hits (`SKILL.md:99`, `eval-06.md:12,31,44`) are about reviews/chapters/PLAN lines, not template inputs.
> - `SKILL.md` makes no input-count claim; its mode-neutral paragraph (`SKILL.md:131-135`) defers composition to `step-reviewer.md`, which carries the mode-specific rule.
> - Command-form vocabulary stays aligned with `reference/runners.md` (`opencode run --auto -m <provider/model> "<prompt>"`, sigiloso default, chain order ratón → Go → subagent) across `SKILL.md:111-129`, `step-reviewer.md:17-18`, and `eval-05.md:39-67`.
>
> ```
> VERDICT: PASS
> ```
>

Step 3 closes Approved at fix round 2/5. No deferred minors — all four
minors were accurate one-liners and rode the same fix rounds.

### Step 4 — `skills/work-plan/evals/` (evals FIRST) — DONE

Acceptance exit 0 (three greps + eval-checks; `work-plan: 6 evals
well-formed`). New `eval-06.md` (review classes); `eval-04.md` amended
for the harder `[batch]` rule with the MAT-111 evidence; `eval-01.md`
amended so its PLAN expectations carry a class.

**Review engine: FELL THROUGH the chain.** First invocation, sigiloso
(`opencode run --auto -m opencode/x-preview-f-free`): the seat read the
brief, the SPEC, the diff, all six work-plan evals, both work-run
surfaces and `tests/run-eval-checks.mjs` — then the run **ended without
emitting a report**. Tool calls in the transcript, no verdict on stdout.
That is a failed invocation, not a PASS, so chain position 2 took the
seat: **free ratón, `opencode run --auto -m
opencode/muse-spark-1.2-contributor-free`**, which returned the verdict
below. First production fall-through of the chain this lane defines;
the law held — the step was reviewed, not blocked and not skipped.

Verdict verbatim (free ratón):

> → Read skills/work-run/evals/eval-06.md
> → Read skills/work-plan/SKILL.md
> ```
> VERDICT: PASS
> ```
>
> ### Spec compliance
> ✅ Compliant — diff amends `eval-01.md`/`eval-04.md` and adds `eval-06.md` exactly as SPEC §4+§6 requires: every PLAN step carries `per-step`/`grouped`/`covered-by-batch` beside role hint; `per-step` mandatory never overridable downward; `grouped` = cheap contiguous, `covered-by-batch` = `[batch]` sweep; harder `[batch]` ONE-step rule with MAT-111 field evidence (9 steps where ~5 were right) testably encoded; `eval-04.md` amended not duplicated.
>
> ### Strengths
> - `skills/work-plan/evals/eval-06.md:22-48` would fail all four bad patterns named in brief: class-by-size (l.27 rework-cost rule), silent downgrade of code step (l.37-41 refusal-stated), missing class (l.22-26), non-contiguous `grouped` (l.43).
> - Producer/consumer agreement holds: class names (`per-step`/`grouped`/`covered-by-batch`), `per-step` floor, group = contiguous run not controller window, `covered-by-batch` semantics match `skills/work-run/SKILL.md:92-105` and `skills/work-run/evals/eval-06.md:24-51` exactly.
> - Harder `[batch]` rule is gradable: `eval-04.md:26-29` states ONE step regardless of how design listed them, fails any per-file expansion even if individually well-formed — grader can count.
> - Cross-reference hygiene clean: `eval-01.md:12` and `eval-04.md:32` both delegate with `(eval-06 owns the classes in full)` — no duplication, no orphaned requirement.
>
> ### Findings
> #### Critical
> (none)
>
> #### Important
> (none)
>
> #### Minor
> - `skills/work-plan/evals/eval-05.md:30-41` — untouched but produces a PLAN in direct mode (b). Global invariant “every step carries a class” is centrally owned by `eval-06.md` and amended `eval-01/04.md`, so `eval-05.md` is not false, but adding `— and PLAN steps carry review classes per eval-06` would close the loop for a grader running only that eval’s query. Left as-is it is not misleading, only slightly incomplete. Fix: add one bullet referencing eval-06 (same pattern as eval-01/04) or note that class checks are delegated.
> - `skills/work-plan/evals/eval-06.md:38` vs `skills/work-run/SKILL.md:98-100` — enumeration of who cannot override `per-step` differs (eval-06: “not by owner, not by author”; work-run: “not to save a pass, not because diff small/clean”). Semantically consistent (both state non-overridable) and complementary, but unified phrasing covering owner/author/controller would remove any reading of disagreement. Fix: align one sentence to list all three actors as SPEC §4 does.
> - `skills/work-plan/evals/eval-03.md` — correctly untouched (XL parent plan has no executable steps, per `skills/work-plan/SKILL.md:86-103`), but a clarifying comment that “parent plan carries no review classes — executable steps belong in worker lanes” would pre-empt mis-grading. Not a defect.
>
> ### Assessment
> **Step quality:** Approved
> **Reasoning:** Step 4 fulfills SPEC §4/§6 evals-first requirement, encodes rework-cost, non-overridable `per-step`, contiguity, and batch rules in testable form, and matches the already-landed `work-run` consumer; remaining notes are polish, not spec gaps.
>

**Deferred minors (3)** — to work-verify triage, per work-run:

- M3: `work-plan/evals/eval-05.md` could delegate the class check to
  eval-06 the way eval-01 and eval-04 now do (incomplete, not false).
- M4: eval-06 and `work-run/SKILL.md` enumerate the non-override actors
  differently (owner/author vs. the three rationalizations) — consistent
  but not unified.
- M5: `eval-03.md` (XL parent plan) could say outright that a parent
  plan carries no review classes, since it carries no executable steps.

### Step 5 — `skills/work-plan` content (classes + harder [batch]) — DONE

Acceptance exit 0 (three greps + `agent-lint` PASS + eval-checks).

**Review engine: FELL THROUGH again on the first pass.** Sigiloso
(`opencode/x-preview-f-free`) read the brief, the SPEC, the diff, all
three work-plan evals and both work-run surfaces, then **ended without
emitting a report** — the same failure mode as step 4, second
occurrence. Chain position 2, the **free ratón
(`opencode/muse-spark-1.2-contributor-free`)**, produced the round-1
verdict. The scoped re-review then ran on the sigiloso again and
returned normally, so the failure is per-invocation, not a dead model.

#### Round 1 — PASS (engine: free ratón, chain position 2)

> → Read skills/work-plan/evals/eval-04.md
> → Read skills/work-run/SKILL.md
> ```
> VERDICT: PASS
> ```
>
> ### Spec compliance
> ✅ Compliant — `skills/work-plan/SKILL.md` implements `work/mat-116-117-review-seats/SPEC.md:167-186` (section 4) as diff `scratchpad/step5.diff` shows. Three classes `per-step`/`grouped`/`covered-by-batch` beside existing role hints, required on every step (unlike role hints optional per plan), `per-step` floor never overridable downward, `[batch]` hardened to requirement with `MAT-111 ran 9 steps where ~5 were right` evidence, workflow checklist updated, XL exemption added. No missing, extra, or misunderstood requirement detected against the binding authority.
>
> ### Strengths
> - `skills/work-plan/SKILL.md:3` frontmatter now `role hints, and a review class on every step` — fixes the exact stale-description class of defect that failed the previous step of this lane.
> - `skills/work-plan/SKILL.md:35-36` checklist `class every step for review` matches SPEC workflow requirement verbatim.
> - `skills/work-plan/SKILL.md:138-144` batch rule upgraded from soft `Several small... become ONE` to `Same-shape steps are ONE step... This is a requirement, not an option, and it binds even when the design listed the files separately: MAT-111 ran 9 steps...` — satisfies harder `[batch]` + MAT-111 evidence.
> - `skills/work-plan/SKILL.md:140-159` review-class block is complete: required-vs-optional contrast, three-class table, rework-cost source, floor, contiguity, planning-error for lone `grouped`.
> - `skills/work-plan/SKILL.md:181-183` `The XL parent plan (step 2) carries no review classes, because it carries no executable steps` resolves the `every step carries a class` vs `step 2 produces NO executable steps` contradiction.
> - Consumer agreement verified against `skills/work-run/SKILL.md:88-105`: identical class names, `per-step` floor, `grouped` = one pass per contiguous group, `covered-by-batch` = nothing extra, contiguity as contiguous run, classless fallback `per-step`.
>
> ### Findings
> #### Critical
> None.
>
> #### Important
> None. All 8 `skills/work-plan/evals/eval-06.md:20-48` checkboxes have direct SKILL.md backing; amended `eval-01.md:32-35` and `eval-04.md:32-34` lines are covered (code steps `per-step`, `[batch]` entry `covered-by-batch`).
>
> #### Minor
> - `skills/work-plan/SKILL.md:140-143` states `A review class on every step, beside the role hint` but does not prescribe the literal PLAN-line notation (`class: per-step` vs `per-step` vs `review: ...`). `skills/work-run/SKILL.md:89-90` reads it `off the step's PLAN line beside its role hint`. `eval-06.md:45-47` expects `same notation on every step, consistently`. Coverage is semantic (every step + beside hint) not syntactic; low risk — work-run's reader is tolerant — but an explicit `write it as ...` example would close the loop.
> - `skills/work-plan/SKILL.md:152-154` lists `per-step` non-overridable as `by the owner, by this skill, or by the controller`, while `SPEC.md:171-172` lists `by the owner, by the plan's author, not to save a pass`. Semantically equivalent (`this skill` = plan's author, `controller` covers `to save a pass`), but verbatim SPEC trio is not mirrored; polish to `not by the owner, not by the plan's author, not to save a pass (including the controller)` would be exact.
>
> ### Assessment
> **Step quality:** Approved
> **Reasoning:** Diff satisfies every line of SPEC section 4, passes line-by-line eval-06/eval-01/eval-04 coverage, producer/consumer agree on names/floor/contiguity/group, and stale-claim + XL-contradiction risks are resolved; remaining items are polish on notation phrasing.
>

#### Round 2 (fix: the PLAN-line notation + the SPEC's non-override trio) — PASS (engine: sigiloso)

Minor 1 was worth taking rather than deferring: without a prescribed
notation, every plan would invent its own and work-run's reader would
have to guess which half of the parenthetical is the class. Minor 2
rode along.

> → Read work/mat-116-117-review-seats/PLAN.md
> **Minor 1 — ADDRESSED.** `skills/work-plan/SKILL.md:151-155` now prescribes the literal PLAN-line notation: one trailing parenthetical, role first — `*(judgment · per-step)*`, `*(mechanical · covered-by-batch)*` — class alone (`*(per-step)*`) when the plan uses no role hints, and "One form on every step of the plan." That is the syntactic coverage eval-06 expects ("same notation on every step, consistently") and exactly what work-run reads (`skills/work-run/SKILL.md:89-90`, "off the step's PLAN line beside its role hint").
>
> **Minor 2 — ADDRESSED.** `skills/work-plan/SKILL.md:157-160`: "`per-step` is a floor, mandatory and not overridable downward — not by the owner, not by the plan's author, and not to save a pass at execution time." Full trio, mirroring the SPEC.
>
> ### NEW BREAKAGE
>
> - **Notation vs. work-run and the live PLAN:** match. work-run reads the class off the PLAN line beside the role hint; the prescribed form delivers precisely that. Every step of `work/mat-116-117-review-seats/PLAN.md` already uses the identical form, down to the middle dot — `*(judgment · per-step)*` (PLAN.md:75, 100, 120…), `*(integration · per-step)*` (:175), `*(judgment · grouped)*` (:155, 168) — and the Constraints block declares it "the notation this lane is introducing" (PLAN.md:27-28). No defect.
> - **Contradiction with optional role hints:** none. The notation paragraph explicitly handles the no-role-hint plan (class alone, SKILL.md:153-154), preserving the "optional per plan" status stated at :135; "one form on every step" governs consistency within a plan, not the choice of whether to carry hints.
> - **Stale claims:** swept the whole file post-change — frontmatter (:3), checklist item 5 (:35-36), step-5 heading (:122), the class table (:145-149), and the judgment notes (:184-189) are mutually coherent, and the new XL exemption note (:187-189) correctly scopes the every-step rule away from parent plans. One candidate examined and cleared: the standalone-refusal enrichment list at :52 ("constraints block, named interfaces, role hints") omits review classes, but it illustrates *optional* enrichments and is not falsified by classes being mandatory — pre-existing text, not new breakage.
>
> None.
>
> ```
> VERDICT: PASS
> ```
>

Step 5 closes Approved at fix round 1/5. No deferred minors.

### Step 6 — `skills/orchestrate/evals/` (evals FIRST) — DONE

Acceptance exit 0 (three greps + eval-checks; `orchestrate: 6 evals
well-formed`). New `eval-06.md` (the cross-family guardrail, three
dialogues); `eval-01.md` amended for the two-seat question block and
the free-variant defaults; `eval-03.md` amended to stop offering the
retired `opencode/deepseek-v4-flash-free` as the ballena's fallback.

**Review engine: sigiloso — `opencode run --auto -m
opencode/x-preview-f-free`, command mode, 1st chain position, no
fall-through.** Verdict verbatim:

> → Read skills/orchestrate/references/reviewer.md
> → Read work/mat-116-117-review-seats/PROGRESS.md
> → Read tests/run-eval-checks.mjs [limit=60]
> Lane context absorbed. Now verifying the step's own acceptance criteria (read-only greps + the structural eval suite):
>
> $ $g1 = Select-String -Path "skills\orchestrate\evals\*.md" -SimpleMatch -Pattern "cross-family gate" -Quiet; $g2 = Select-String -Path "skills\orchestrate\evals\*.md" -SimpleMatch -Pattern "x-preview-f-free" -Quiet; $g3 = Select-String -Path "skills\orchestrate\evals\*.md" -SimpleMatch -Pattern "-m opencode/deepseek-v4-flash-free" -Quiet; "cross-family gate: $g1"; "x-preview-f-free: $g2"; "-m opencode/deepseek-v4-flash-free present: $g3"; node tests/run-eval-checks.mjs
> cross-family gate: True
> x-preview-f-free: True
> -m opencode/deepseek-v4-flash-free present: False
> ok   ae-audit: 5 evals well-formed
> ok   ae-init: 8 evals well-formed
> ok   loop-setup: 6 evals well-formed
> ok   orchestrate: 6 evals well-formed
> ok   shaping: 4 evals well-formed
> ok   skill-authoring: 5 evals well-formed
> ok   using-ae: 7 evals well-formed
> ok   work-handoff: 6 evals well-formed
> ok   work-plan: 6 evals well-formed
> ok   work-run: 6 evals well-formed
> ok   work-verify: 6 evals well-formed
> ok   .claude/docs-sweep: 3 evals well-formed
> ok   .claude/release: 4 evals well-formed
> all eval checks passed
>
> VERDICT: PASS
>
> ### Spec compliance
> ✅ Compliant — all three PLAN step-6 requirements landed and verified against SPEC §3, §6 and DECISIONS.md's verbatim ruling:
>
> - **Two-seat dialogue** (`eval-01.md:36-54`) — one question block, never one seat now/other later/one seat at all; per-step seat (mode+model, default command-mode sigiloso `opencode/x-preview-f-free`, Claude subagent named alternative) and adversarial seat (yes/no/count/model, default 1 ratón chispeante at `opencode/muse-spark-1.2-contributor-free`, ballena named) match SPEC §3 items 1-2 exactly; "Records BOTH answers in the Task spec" (:52-54) covers the recording requirement.
> - **Guardrail** (`eval-06.md`, new) — positive form, both zero-cross-family combinations, silent-rejection ban, explicit-override escape, ADR-008-as-unchanged-authority: all present (detail under Strengths).
> - **Dead id corrected** (`eval-03.md:31-40`) — the retired id appears only inside a names-to-retire statement; the acceptance grep `! grep '-m opencode/deepseek-v4-flash-free'` passes (verified by running it), matching SPEC Verification's naming-to-retire carve-out.
> - Acceptance suite run: all four greps hold; `node tests/run-eval-checks.mjs` → `orchestrate: 6 evals well-formed`, all suites green.
>
> ### Strengths
> - **eval-06 catches case (b) by construction, not by accident.** `(b)` has its own rejection checkbox (`eval-06.md:29-33`) that names the exact wrong implementation — "only pattern-matches 'Claude and Claude' and waves (b) through fails this check" — so a grader cannot pass the easy failure while honoring the text. The positive-form checkbox (:23-25) reinforces it structurally ("rather than a blacklist of one forbidden pair").
> - **The override is encoded exactly as the parent ruled, in all three parts**: never offered ("not an option the dialogue offered: the dialogue never lists it among the defaults", :41-45), never assumed ("never infers it from silence, from a hurry, or from the lane looking small"), recorded verbatim ("a paraphrase, a checkbox, or a parent's summary of the ruling fails", :46-49). No drift into dialogue-reachable territory.
> - **eval-01's amendment caught a latent staleness beyond its brief**: the old text offered the ratón at the *paid* Go id as default; the new free-id default plus the dedicated economics-rule checkbox (:48-51, "a paid Go id offered as the default fails this check even though the model is identical") aligns the eval with step 1's law.
> - **Coherence with the child-seat checkbox holds** (brief point 4): :55-59 still scopes the dialogue to "reviewers only" — two seats in one block is one question about reviewers; the child-seat default adds none. No contradiction, and it stays consistent with `reference/runners.md:189`.
> - **Untouched evals are correctly untouched**: eval-02 (mailbox discipline), eval-04 (tier gating/no-Orca), eval-05 (wave scale) name no model ids and no dialogue shape; nothing in them is falsified by two seats, free defaults, or the retired id.
> - eval-06's voice matches the set (Query/Fixture/Expected-behavior, bolded operative terms, named graded failures), and its numbering fills the gap without overlap.
>
> ### Findings
> #### Critical
> None.
>
> #### Important
> None.
>
> #### Minor
> 1. **`skills/orchestrate/references/dispatch-child.md:3-4`** — the authoring note still describes the dialogue as "(reviewers yes/no, count, model)", a one-seat description the two-seat dialogue supersedes. Not a step-6 defect (it is skill content; fixing it now would violate evals-before-content), and the brief exempts the SKILL.md lag specifically — but step 7's acceptance greps cover only `SKILL.md`, so this file could be missed. Fix in step 7: restate the parenthetical as the two-seat block. (`references/reviewer.md` was also swept: it names no model id and its "default 1 ratón chispeante" remains true — clean.)
>
> ### Assessment
> **Step quality:** Approved
> **Reasoning:** All three requirements are implemented and would fail the named bad implementations — the (b) pattern-match trap and the three-part override encoding are exactly the ruling's shape; acceptance greps and the eval suite exit green, and the only finding is a step-7 watch item on content that could not legally change in this step.
>

**Carried into step 7** (the reviewer's minor, and it is right):
`skills/orchestrate/references/dispatch-child.md` still describes the
dialogue as one seat — "(reviewers yes/no, count, model)". It could not
legally change in an evals-only step, and step 7's acceptance greps
cover only SKILL.md, so it is written down here rather than trusted to
memory.
