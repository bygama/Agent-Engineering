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

### Step 7 — `skills/orchestrate` content (two-seat dialogue + guardrail) — DONE

Acceptance exit 0 (three greps + `agent-lint` PASS + eval-checks).
Three commits, evals-before-content preserved twice inside the step:
`d38a9b5` (eval-01: the child brief must name the command-mode seat),
`c9c3a7b` (eval-04: the rung survives either seat form), then the
content commit.

**Review engine: sigiloso — `opencode run --auto -m
opencode/x-preview-f-free`, command mode, 1st chain position, no
fall-through. Two passes: FAIL, PASS.** Verdicts verbatim:

#### Round 1 — FAIL (Critical)

> ✱ Glob "skills/orchestrate/**/*" 9 matches
> ✱ Grep "deepseek-v4-flash-free|opencode-go/muse-spark-1\.2-contributor|x-preview-f-free|muse-spark-1\.2-contributor-free" in skills/orchestrate · 6 matches
> ✱ Grep "dialogue|one question|question block|both seats|per-step|adversarial" in skills/orchestrate · 55 matches
> → Read skills/orchestrate/evals/eval-02.md
> → Read skills/orchestrate/evals/eval-04.md
> → Read skills/orchestrate/evals/eval-05.md
> VERDICT: FAIL
>
> ### Spec compliance
> ❌ Issues found — the step's own requirements are met, but the change leaves one of its own sentences falsified elsewhere in SKILL.md (details below).
>
> Checked against SPEC §3 and the DECISIONS ruling:
>
> - One question block, both seats, one turn — ✅ SKILL.md:70-72 ("never one seat now with the other asked later").
> - Per-step default command-mode sigiloso (`opencode/x-preview-f-free`), Claude subagent alternative — ✅ SKILL.md:75-78.
> - Adversarial default 1 ratón chispeante at the free id, ballena named — ✅ SKILL.md:79-85; economics-rule sentence at :87-90.
> - Both answers recorded in the Task spec — ✅ SKILL.md:92-93; child-seat default explicitly not a second ask (:96-97).
> - Guardrail in positive form governing, not bolted on — ✅ SKILL.md:99-108: the headline is the positive rule, and :104-106 is an operative instruction ("Hold the rule in its positive form, not as a blacklist…"), which is what makes eval-06's checkbox 1 pass rather than decorate.
> - Both zero-cross-family combinations rejected, loudly, re-asked, never silently substituted — ✅ SKILL.md:100-104.
> - Escape worded as ruled — ✅ SKILL.md:110-115: reachable **only** by explicit owner override, recorded verbatim (anti-paraphrase/checkbox/summary gloss), "Impossible to reach by accident", never offered by the dialogue, never inferred from silence/hurry/smallness. Nothing in the new text lets the dialogue offer it or the parent assume it.
> - ADR-008 cited as enforced, not revised — ✅ SKILL.md:106-108.
> - Review-wave launch restated at the free ratón id — ✅ SKILL.md:207, provenance comment intact; the falsified "falls back to the ballena's no-auth free model" sentence replaced by the degradation-chain walk (:214-218), not softened.
> - Watch item (dispatch-child described the dialogue as one seat) — ✅ fixed at dispatch-child.md:3-5.
> - Eval coverage: every eval-06 checkbox (all nine) and every amended eval-01 dialogue line has instruction behind it in the two files; eval-03's retired-id and chain requirements are covered at SKILL.md:216-218. No bare checkboxes found.
>
> ### Strengths
> - The override paragraph is the ruling encoded, not paraphrased — including the anti-gaming details (owner's own words, not a checkbox) that make the verbatim record enforceable.
> - The dispatch-child.md command-mode paragraph (:96-103) lands eval-01's fence requirement precisely: shell command, no Task/Dispatch/`worker_done`, "Either seat satisfies the rung; neither excuses skipping it."
> - Length budget respected: SKILL.md is 422 lines (< 500).
> - Replacing (not keeping) the dead ballena-fallback sentence was the right call — leaving it would have been this lane's signature failure.
>
> ### Findings
>
> #### Critical
> 1. **skills/orchestrate/SKILL.md:406 — Red flags row now states something false.** "work-run's per-step reviewer and work-verify's step-4 review are in-session subagents, REQUIRED at their tiers." This step itself establishes (SKILL.md:75-78, dispatch-child.md:96-97) that where the dialogue settles `command` mode — the new default — the per-step reviewer "is not a subagent at all." A parent using this row to answer a child's fence question would re-decide the seat form the owner chose, and could steer a lane toward the exact zero-cross-family outcome the guardrail forbids. Fix: amend the reality cell, e.g. "work-run's per-step reviewer (in-session subagent, or command-mode shell-out where the Task spec settled command mode) and work-verify's step-4 review are REQUIRED at their tiers."
>
> #### Important
> None.
>
> #### Minor
> 1. **skills/orchestrate/SKILL.md:3 — frontmatter lags the body.** "(reviewers, count, model)" is the pre-change parenthetical; the checklist line was updated to "(both seats, count, model) + cross-family guardrail" (:27-28) but the description was not. It states nothing false ("reviewers" is plural), so Minor — but mirror the checklist wording.
> 2. **skills/orchestrate/SKILL.md:216-220 — rule stated twice in three lines.** "Never retype a model id from memory…" and the pre-existing "Every launch argv … read off `reference/runners.md` … never retyped from memory" say the same thing. Merge into one statement; this is the standard's longest skill.
>
> ### Assessment
> **Step quality:** Needs fixes
> **Reasoning:** The dialogue, guardrail, escape, and launch restatement match SPEC §3 and the parent's ruling almost line for line, and eval coverage is complete — but the change falsified the Red flags row at SKILL.md:406, the exact stale-claim class two earlier steps failed on.
>
> ⚠️ Outside this diff, for the parent: (a) ADR-008 still carries only the 2026-08-20 amendment naming the paid Go id as the dialogue default — SPEC §3's dated amendment note is presumably a later step of this lane; (b) eval-04.md:39 describes the per-step reviewer as "in-session" in its fence-contrast checkbox — same phrasing class as the Critical finding; whether it needs the matching eval amendment is a lane call (evals change before content).
>

#### Round 2 (fix: the red-flag row, the frontmatter, the duplicated rule) — PASS

> 9ed48ae feat(work-plan): a review class on every step, and [batch] as a requirement
> 5c0c5e8 test(work-plan): evals for review classes and the harder [batch] rule
> d275fd2 docs(lane): record step 3 — three sigiloso passes, two real catches
> 24b0438 feat(work-run): review class decides how often, reviewer mode decides who
> 34896c4 test(work-run): command mode needs a fourth template input
>
> → Read skills/orchestrate/evals/eval-02.md
> ✱ Grep "cross-family|maker" in docs/adrs · 5 matches
> **Critical 1 — Red flags row:** ADDRESSED. `SKILL.md:405` now reads "work-run's per-step reviewer — in-session subagent, or the command-mode shell-out the Task spec settled — and work-verify's step-4 review are REQUIRED at their tiers." A parent answering a fence question now defers to the Task spec instead of re-deciding the seat form; it agrees verbatim-in-substance with the amended `eval-04.md:39-40` and with `dispatch-child.md:96-103`.
>
> **Minor 1 — frontmatter:** ADDRESSED. `SKILL.md:3` now reads "(both reviewer seats, count, model, under a cross-family guardrail)", agreeing with checklist item 3 (`SKILL.md:27`) and the two-seat dialogue block (`SKILL.md:70-97`).
>
> **Minor 2 — duplicated never-retype rule:** ADDRESSED. Stated once at `SKILL.md:216-219`, with the ballena's retired fallback folded in as the *reason* ("the file is what knows that") rather than a second command.
>
> **Outside-diff item (b) — eval-04 amendment:** Verified correct. `eval-04.md:39-43` carries the either-seat form of the rung, and git history confirms it committed before these content fixes (`c9c3a7b`, `d38a9b5`, `a69a8a5` all precede the uncommitted content change) — evals-before-content holds. Item (a), ADR-008's dated note, remains step 8's, correctly untouched here.
>
> ### NEW BREAKAGE sweep — whole `skills/orchestrate/` tree
>
> - **Per-step reviewer necessarily a subagent:** none survives. `dispatch-child.md:88`'s heading still says "your own in-session subagents", but the very next paragraph (:96-103) explicitly handles command mode ("not a subagent at all… Either seat satisfies the rung") — and that two-beat shape is exactly what committed eval-01 (:84, :98-103) expects, so no reader acts wrongly. `SKILL.md:15` describes work-run's execution model, not the reviewer seat; `reviewer.md:11` concerns the adversarial seat only.
> - **One-seat dialogue description:** none. Frontmatter, checklist, step 3, and `dispatch-child.md:3-5` all describe both seats. `reviewer.md:5`'s "(default 1 ratón chispeante)" is scoped to the adversarial wave — correct for that template.
> - **Paid-id default:** none. Defaults are free ids only (`SKILL.md:76, :83, :207`); Go ids appear solely as runners.md chain position 3 and eval-03's agreed-ballena teaching. The economics paragraph (`SKILL.md:87-90`) matches `reference/runners.md:63-70`.
> - **Retired id as spawn target:** none. `opencode/deepseek-v4-flash-free` appears only in eval-03:37 naming its retirement; every launch argv on disk matches a registered seat in `runners.md` (ratón TUI :207 ≡ runners.md:112-114; sigiloso :76 ≡ runners.md:76-80). Vocabulary (sigiloso/ratón/ballena, degradation chain, `--auto`) checks clean against runners.md throughout.
>
> ```
> VERDICT: PASS
> ```
>

Step 7 closes Approved at fix round 1/5. No deferred minors. The
reviewer's out-of-diff item (a) — ADR-008's dated amendment note — is
step 8, next.

### Steps 8-9 — the `grouped` block — DONE (ONE review pass)

The lane's only contiguous `grouped` run, reviewed once at its
boundary on the combined diff and both PLAN lines — this lane applying
MAT-117's machinery to itself.

**Step 8 — `docs/adrs/ADR-008-orchestration.md`:** an italic
"Amended again 2026-08-21 (MAT-116 owner amendment)" note on the
existing Dispatch-time-reviewer-question bullet. The bullet, the
2026-08-20 note, and the `deepseek-v4-flash-free` line at 93 all stay
as written — dated records.

**Step 9 — `docs/how-it-works/`:** `execution.md` (stage-3 sequence
lines + new narration on why both seats are asked together) and
`work-lifecycle.md` (the falsified per-step-review claim split into
what is invariant and what the plan now chooses). Four chapters judged
and recorded NO CHANGE in DECISIONS.md with the reason for each:
`architecture.md`, `standard-lifecycle.md`, `integrations.md`,
`README.md`.

Acceptance exit 0 for both steps (step 8's four greps; step 9's three
greps + `agent-lint` PASS).

**Review engine: FELL THROUGH — third occurrence.** The sigiloso read
the brief, the diff, the ADR, all six how-it-works chapters,
`reference/runners.md` and all three touched SKILL.md files, then ended
without emitting a report. Chain position 2, the **free ratón
(`opencode/muse-spark-1.2-contributor-free`)**, produced the verdict.
The pattern across the lane is consistent: the sigiloso returns
normally on light-to-medium briefs and silently ends on the heaviest
ones (steps 4, 5 and 8-9 — the three briefs that ask it to read the
most files).

Verdict verbatim (free ratón):

> → Read skills/work-run/SKILL.md
> ```
> VERDICT: PASS
> ```
>
> ### Spec compliance
> ✅ Compliant — `docs/adrs/ADR-008-orchestration.md:49-66`, `docs/how-it-works/execution.md:231-233,283-309`, `docs/how-it-works/work-lifecycle.md:118-164`, `work/mat-116-117-review-seats/DECISIONS.md:140-182` satisfy SPEC §§3,7 and the `grouped` review class (PLAN steps 8-9), with the house hard constraint honoured in the same change.
>
> ### Strengths
> - ADR-008 amendment is additive and style-faithful: original `Dispatch-time reviewer question` bullet `docs/adrs/ADR-008-orchestration.md:38-46` and `*Amended 2026-08-20` note `docs/adrs/ADR-008-orchestration.md:47-51` untouched; new `*Amended again 2026-08-21` note `docs/adrs/ADR-008-orchestration.md:52-66` in same italic style names both seats, guardrail, recorded-override escape, states `maker ≠ checker` unchanged, cites `reference/runners.md`; dated `deepseek-v4-flash-free` at `docs/adrs/ADR-008-orchestration.md:107` retained as record per SPEC out-of-scope rule.
> - `execution.md:231-233` sequenceDiagram correctly replaces one-seat `reviewers? how many? which model?` with two-seat `BOTH seats: per-step reviewer<br/>(mode + model) and adversarial (how many? which model?)` plus new `P->>P: 3. guardrail: >=1 cross-family gate per lane,<br/>else reject and re-ask`; surrounding narration `docs/how-it-works/execution.md:283-309` moves no-auth fallback to live id and cites degradation chain — no live `-m opencode/deepseek-v4-flash-free` spawn target left.
> - `work-lifecycle.md:118-164` corrects the falsified universal claim: invariant `fresh-context, maker ≠ checker` separated from variable `how often` (`per-step`/`grouped`/`covered-by-batch` with contiguity rule and cost evidence MAT-111/MAT-110) and `who` (subagent vs `opencode run --auto` command-mode, cross-family, degradation chain, `grouped` safe because lane gate + adversarial seat unchanged); work-plan paragraph `docs/how-it-works/work-lifecycle.md:118-124` gains review class beside interfaces/role hints.
> - Four NO-CHANGE judgments verified independently and recorded `work/mat-116-117-review-seats/DECISIONS.md:162-182` whether or not file moved, as SPEC §7 requires; each rationale is accurate (see findings).
>
> ### Findings
> #### Critical
> None.
>
> #### Important
> None — no stale one-seat dialogue, universal `Each step gets...` claim, retired `free` id as spawn target, or subagent-only reviewer remains in live surfaces; `architecture.md:98`, `standard-lifecycle.md:28-31`, `integrations.md:5,85-86`, `README.md:14-16` indeed contain no lane-reviewer claim that this lane falsified.
>
> #### Minor
> - `docs/how-it-works/execution.md:231-233` — `>=` inside sequenceDiagram label is valid but relies on mermaid treating `>` after the `:` as literal; alternative `&gt;=` would be more defensive. No parse break observed; leave as is unless linting the diagram.
> - `work/mat-116-117-review-seats/DECISIONS.md:162-182` — line-number citations (e.g., `architecture.md line 98`, `standard-lifecycle.md 29-30`) are approximate after insertions but still locate the claim; not a defect, just note the numbers drift with edits.
>
> ### Assessment
> **Step quality:** Approved
> **Reasoning:** Grouped steps 8-9 together make the two changed chapters true, amend the ADR without rewriting it, and correctly judge the four unchanged chapters with explicit DECISIONS record; Mermaid remains valid, no live surface uses the dead `opencode/deepseek-v4-flash-free` id, and no over-duplication of skill-owned detail.
>

**Minor 1 taken, not deferred:** the reviewer flagged `>=` inside a
mermaid sequenceDiagram label as parse-risky. Swapped for "at least
one" — a literal word substitution that removes the risk and reads
better; no re-review bought for it.

**Deferred minor (1):** M6 — DECISIONS.md's line-number citations for
the four NO-CHANGE chapters drift as those files are edited. Not a
defect; the claims are still locatable.

### Step 10 — full gate sweep + integration review — DONE

**All four gates, run in this worktree:**

```
node scripts/agent-lint.mjs . --ignore tests,templates,examples  → 0 high, 0 medium, 0 low — PASS (exit 0)
node tests/run-lint-tests.mjs                                    → all 22 cases passed (exit 0)
node tests/run-gen-tests.mjs                                     → all gen cases passed (exit 0)
node tests/run-eval-checks.mjs                                   → all eval checks passed (exit 0)
```

**No live surface points a seat at the dead id.** Two mentions of
`opencode/deepseek-v4-flash-free` survive — `reference/runners.md:126`
and `skills/orchestrate/evals/eval-03.md:37` — and both exist to say
it is retired. Zero `-m opencode/deepseek-v4-flash-free` spawn targets.

**Evals precede content, per skill, inside this lane:**

```
work-run     c545b79 test → 34896c4 test → 24b0438 feat
work-plan    5c0c5e8 test → 9ed48ae feat
orchestrate  a69a8a5 test → d38a9b5 test → c9c3a7b test → 48cedb5 feat
```

**Review engine: free ratón for the integration pass
(`opencode/muse-spark-1.2-contributor-free`), sigiloso for the scoped
re-review (`opencode/x-preview-f-free`).** The integration brief was
the heaviest of the lane — a 1176-line whole-lane diff plus every
touched surface — so it went to the seat that has held up on heavy
briefs rather than being sent to fail first.

#### Round 1 — PASS (integration, free ratón)

> → Read work/mat-116-117-review-seats/PLAN.md
> → Read reference/runners.md
> → Read skills/work-run/SKILL.md
> → Read skills/work-plan/SKILL.md
> → Read skills/orchestrate/SKILL.md
> → Read docs/adrs/ADR-008-orchestration.md
> → Read docs/how-it-works/execution.md
> → Read docs/how-it-works/work-lifecycle.md
> ```
> VERDICT: PASS
> ```
>
> ### Spec compliance
> ✅ Compliant — all seven SPEC sections present in the diff; no scope creep beyond the brief; dated records (`ADR-008:93`, `execution.md:497`, `docs/plans/*`) correctly left as records while every live spawn target was repointed; `work-verify` correctly untouched per §Out of scope.
>
> ### Strengths
> - `reference/runners.md` as single registry obeyed: economics rule, degradation chain, `--auto` law and command form live in one place; every consumer cites (`reference/runners.md`) rather than re-deriving. Chain order `sigiloso → free ratón → paid Go → Claude subagent` verbatim in SPEC §1, `reference/runners.md:96-103` and `work-run/eval-05:978` only.
> - Producer/consumer contract matches: `work-plan/SKILL.md:152-155` defines trailing parenthetical `*(role · class)*` or `*(class)*` alone with `per-step` floor never downgradable; `work-run/SKILL.md:89-105` reads it off the PLAN line and executes exactly `per-step=dedicated`, `grouped=one pass at contiguous boundary with combined diff`, `covered-by-batch=nothing extra`, falling back to `per-step` for classless plans. Evals `work-plan/eval-06` and `work-run/eval-06` encode the same table.
> - Cross-file review vocabulary locked: three classes, two modes `subagent|command`, sigiloso/Ox Alpha `opencode/x-preview-f-free`, ratón `opencode/muse-spark-1.2-contributor-free`, ballena `opencode-go/deepseek-v4-flash`, command form `opencode run --auto -m <provider/model> "<prompt>"` one-shot vs TUI `opencode --auto -m …` + `terminal wait` + `worker-start --terminal`. Every default now offered at free variant per `reference/runners.md:63-70`.
> - Guardrail in positive form everywhere: `skills/orchestrate/SKILL.md:99-115`, `docs/adrs/ADR-008-orchestration.md:9-23` italic amendment, `docs/how-it-works/execution.md:231-233` diagram plus `execution.md:296-309` narration, `skills/orchestrate/evals/eval-06` — all state "at least one cross-family gate per lane", reject both `Claude+Claude` and `Claude-per-step + no adversarial`, owner override only by explicit verbatim Task-spec record.
>
> ### Findings
> #### Critical
> None.
>
> #### Important
> None.
>
> #### Minor
> - `skills/work-run/SKILL.md:89` — `Read it off the step's PLAN line beside its role hint` implies a role hint is always present; `skills/work-plan/SKILL.md:152-155` allows `*(per-step)*` alone when no hints are used. A hintless plan is valid per producer but the consumer wording could cause a literal reader to treat `*(per-step)*` as malformed. Fix: `Read it off the step's trailing parenthetical, beside the role hint when present` and cite the class-alone form.
> - `reference/runners.md:25` headless spawn cell and `skills/work-run/SKILL.md:112` restate the full `opencode run --auto -m …` argv verbatim (cited, but restated). This is spec-mandated, but remains the one duplication that can drift if a flag ever changes — mitigated by the parenthetical citations, but keep the cite and avoid adding variants without updating the registry.
> - `docs/how-it-works/work-lifecycle.md:160` — grouping safety stated as "nothing downstream moved: lane gate and adversarial seat still see every line." True, but the late coverage presupposes the guardrail was satisfied at dispatch; a zero-cross-family lane that was explicitly overridden is safe only by that override record — worth naming explicitly to avoid reading grouping as safe even without a cross-family gate.
>
> ### Assessment
> **Step quality:** Approved
> **Reasoning:** Whole-lane integration is coherent: vocabulary, degradation chain, economics rule and command form are cited consistently; writer/reader contract for review classes aligns; stale `deepseek-v4-flash-free` spawn survives only as named retired id; SPEC §§1-7 are fully covered and how-it-works chapters carry no falsified claim.
>
> **What remains weak:** The riskiest property as shipped is exactly what makes the lane cheap — the free window. Every default now races a clock: Ox Alpha and the free ratón are explicitly "for a limited time" and the degradation chain is law precisely because the top id can vanish without notice while the Go fallback silently becomes paid. The standard is correct to make falling through normal operation and to require recording which engine ruled, but a future agent following the text verbatim will still land on cost if nobody re-probes the Zen list and retires the dead id in `reference/runners.md` promptly; the file is the only place that knows. The guardrail and the `grouped` knob compound this: both are safe only because late cross-family coverage still runs — if a lane were both grouped heavily and allowed to reach the explicit zero-cross-family override, the paper trail would be correct and the blind-spot risk would still be real.
>

#### Round 2 (fix: the notation contract + borrowed-safety clause) — PASS (sigiloso)

> 8403fc0 feat(work-run): release finished runners in the step loop
> d6325b6 test(work-run): eval-01 expects released runners in the step loop
> 52988b0 docs(mat-55): sweep remaining living surfaces from fan-out to orchestrate
> 9ebb781 test(shaping): add shaping's four evals and reroute superseded ones (MAT-45 H1)
> 156fd1b docs(work-run): point dispatch/review/fix-loop clauses at their templates
> 5dc42e3 feat(skills): dispatch templates — implementer, step-reviewer, re-reviewer, lane-reviewer
> 91f98cf test(work-run,work-verify): pin dispatch-template composition in evals
> c5eb379 rename(skills): relay -> work-run — mechanical sweep
> d96db88 test(work-plan): eval-05 pins the two-mode split (S6)
> bac4da8 test(work-plan): evals first — shaping, refusal, XL, interfaces/batching/roles
> rg: The term 'rg' is not recognized as a name of a cmdlet, function, script file, or executable program.
> Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
>
> ✱ Grep "evals change before|eval-first|eval change" in work/mat-116-117-review-seats · 1 match
> → Read work/mat-116-117-review-seats/PROGRESS.md [offset=470]
> → Read work/mat-116-117-review-seats/PLAN.md
> All context gathered. Let me run the repo's self-lint (read-only) to confirm the fix introduces no structural violation.
>
> $ node scripts/agent-lint.mjs . --ignore tests,templates,examples
> agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-116-117-review-seats
> 0 high, 0 medium, 0 low — PASS
>
> **Minor 1 — ADDRESSED.** `skills/work-run/SKILL.md:89-92` now reads the class off "the step's trailing parenthetical — beside the role hint where the plan uses hints, `*(judgment · per-step)*`, and alone where it does not, `*(per-step)*`." Both notational forms are named, so the class-alone plan is no longer readable as malformed. This matches `skills/work-plan/SKILL.md:151-155` term for term: trailing parenthetical, role first, class alone when the plan uses no hints.
>
> **Minor 3 — ADDRESSED.** `docs/how-it-works/work-lifecycle.md:161-167`: "That safety is borrowed, not intrinsic — it is the late cross-family coverage doing the work, which is why the dispatch dialogue refuses to leave a lane without a cross-family gate ([execution.md](execution.md)). A lane that grouped heavily *and* took the owner's explicit zero-cross-family override would have a correct paper trail and a real blind spot; the override is deliberately hard to reach for that reason." That is precisely the scenario the finding named, with the enforcement point cited.
>
> **Minor 2 — agreed, correctly left alone.** The argv restatement is spec-mandated (PLAN steps 1/7 acceptance greps) and carries its runners.md citation; nothing to act on.
>
> ### NEW BREAKAGE
>
> None.
>
> - **work-run wording vs work-plan's notation paragraph:** agree. Same mechanism (one trailing parenthetical), same role-first order, identical example forms down to the middle dot (`skills/work-plan/SKILL.md:152-154`).
> - **vs `skills/work-run/evals/eval-06.md`:** agree. Eval-06:24 expects reading the class off the PLAN line; its fixtures (:11-16) all use the hint+class form the new sentence describes first; the hintless-plan case eval exercises (`old-lane-42`, hints but no classes) is still handled by the unchanged no-classes-at-all paragraph (`SKILL.md:105-107`). Nothing in the eval presupposes a hint.
> - **work-lifecycle sentence vs `execution.md`:** no contradiction. The guardrail is execution.md:233 ("at least one cross-family gate per lane, else reject and re-ask"); the escape is :306-309 (owner chooses explicitly, words in the Task spec verbatim, "cannot be reached by drifting into it"). The relative link target exists and the form matches the file's two existing `[execution.md](execution.md)` links (:45, :170).
> - **Overstatement:** none. "A real blind spot" mirrors execution.md's own "maker and every checker share one family's blind spots"; "deliberately hard to reach" is a fair gloss of reject-and-re-ask plus verbatim recording; "correct paper trail" matches the verbatim-in-Task-spec rule.
> - **Eval-first constraint:** checked — no eval diff accompanies this skill-content touch, but the governing expectation was already pinned by the committed `skills/work-plan/evals/eval-06.md:45-47` ("so work-run can read both without guessing", commit 5c0c5e8, predating this content change). No eval needed changing; ordering holds.
> - **Stale-claim sweep:** remaining "beside its/the role hint" phrasings (`work-plan/SKILL.md:140`, work-plan evals 04/32 and 06/22) are producer-side statements whose fixtures all use hints — not falsified by this consumer-side fix. Lane PLAN comment and PROGRESS quotes are records. Self-lint: PASS (0/0/0).
>
> ```
> VERDICT: PASS
> ```
>

Step 10 closes Approved at fix round 1/5. Minor 2 (the argv
restatement in `reference/runners.md:25` and `work-run/SKILL.md`) was
deliberately left: it is SPEC-mandated and carries its citation. The
re-reviewer agreed.

## Verification

### 2026-08-21 — L-tier DoD — PASS

DoD assembled per `DECISIONS.md` ("The L-tier DoD, assembled"): this repo
carries no `feature_list.json` outside `tests/fixtures/`, so the DoD is
the SPEC's `## Verification` section plus the PLAN's ten per-step
acceptance commands. No feature-list row moves to `passing`.

- **L1 static:** `node scripts/agent-lint.mjs . --ignore tests,templates,examples` → exit 0 (`0 high, 0 medium, 0 low — PASS`)
- **L2 behavioral:** `node tests/run-lint-tests.mjs` → exit 0 (`all 22 cases passed`); `node tests/run-gen-tests.mjs` → exit 0 (`all gen cases passed`); `node tests/run-eval-checks.mjs` → exit 0 (`all eval checks passed`, with `work-run: 6`, `work-plan: 6`, `orchestrate: 6 evals well-formed`); starts: `node --check scripts/agent-lint.mjs` → exit 0, and all three touched SKILL.md files parse with valid frontmatter
- **L3 end-to-end:** cross-component (a reference file, three skills, an ADR, two chapters), so the flow was executed, not inferred — the registered command-mode recipe run verbatim against the live gateway: `opencode run --auto -m opencode/x-preview-f-free` → `E2E-CHAIN-1-OK`; `opencode run --auto -m opencode/muse-spark-1.2-contributor-free` → `E2E-CHAIN-2-OK`; `opencode models` confirms chain position 3 (`opencode-go/muse-spark-1.2-contributor`) present and the retired `opencode/deepseek-v4-flash-free` **absent**, which is the claim `reference/runners.md` now makes. The wider e2e is the lane itself: every step of this PLAN was reviewed through the machinery this PLAN was writing.
- **Fresh-context review:** PASS — in-session subagent, no shared conversation, ran every DoD command and all ten PLAN acceptance expressions itself. Three Important findings, all of one class (surfaces this change made untrue): the repo-root `README.md` skills row, one word in work-run's description, and an unamended `ADR-004`. All three fixed; scoped re-review PASS.
- **Adversarial review:** the parent's 1 ratón chispeante fires after `worker_done` (its dispatch config). Additionally, and unusually: **every per-step review in this lane already ran cross-family** — command-mode sigiloso, falling through to the free ratón — per the owner's mid-lane ruling in `DECISIONS.md`. The lane never certified itself with a same-family seat at any rung.

### Fresh-context reviewer verdict — verbatim

> ### DoD run
>
> All commands run by me from the repo root at `HEAD = 3cb5ddf`, worktree clean (`git status --porcelain` → empty).
>
> **L1 static**
> ```
> $ node scripts/agent-lint.mjs . --ignore tests,templates,examples
> agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-116-117-review-seats
> 0 high, 0 medium, 0 low — PASS
> EXIT=0
> ```
>
> **L2 behavioral**
> ```
> $ node tests/run-lint-tests.mjs
> all 22 cases passed
> EXIT=0
>
> $ node tests/run-gen-tests.mjs
> all gen cases passed
> EXIT=0
>
> $ node tests/run-eval-checks.mjs
> ok   orchestrate: 6 evals well-formed
> ok   work-plan: 6 evals well-formed
> ok   work-run: 6 evals well-formed
> all eval checks passed
> EXIT=0
> ```
>
> **PLAN per-step acceptance** — I ran all ten acceptance expressions verbatim from `PLAN.md`; every one returned `exit 0 PASS` (steps 1-10). Step 10's grep prints `grep: --exclude-dir=.git: No such file or directory` (flag placed after the pattern) but the `test … -eq 0` still evaluates true, and I confirmed the substance independently below.
>
> **Lane-specific evidence 1 — dead id as spawn target**
> ```
> $ grep -rn -- '-m opencode/deepseek-v4-flash-free' . (excluding .git, node_modules)
> ./docs/plans/2026-08-16-agent-engineering-p4-graphs.md:201
> + lane files (SPEC/PLAN/PROGRESS) only
> ```
> The single non-lane hit is a dated 2026-08-16 plan — a record the SPEC explicitly preserves. The two surviving live mentions, `reference/runners.md:126` and `skills/orchestrate/evals/eval-03.md:37`, both name the id to declare it retired, which the SPEC requires. `ADR-008:107-108` and `execution.md:517` are intact dated records. PASS.
>
> **Lane-specific evidence 2 — evals precede content, per skill** (`git log` over the range, per path):
> ```
> work-run     c545b79 (23:21) test → 34896c4 (23:37:11) test → 24b0438 (23:37:22) feat
> work-plan    5c0c5e8 (23:45) test → 9ed48ae (23:53) feat
> orchestrate  a69a8a5 → d38a9b5 → c9c3a7b (23:59-00:05) test → 48cedb5 (00:10) feat
> ```
> PASS for all three.
>
> **Lane-specific evidence 3 — ADR-008 amended, not rewritten**
> ```
> $ git diff bc194f2..HEAD -- docs/adrs/ADR-008-orchestration.md
> @@ -49,6 +49,21 @@   (15 insertions, 0 deletions)
> ```
> Purely additive. The original "Dispatch-time reviewer question, default 1 ballena" bullet and the `*Amended 2026-08-20 (v1.4.2, MAT-105 …)*` note are byte-identical; the new `*Amended again 2026-08-21 (MAT-116 owner amendment)…*` note follows in the same italic style. PASS.
>
> **SPEC scope coverage** — I read all seven `## What done looks like` sections against the diff. All seven landed: runners.md carries all 7 sub-items (sigilosos, free ratón, command recipe, `--auto` law with the false "takes no `--auto`" sentence *replaced*, economics rule, degradation chain as numbered law, dead-id repointing); work-run has the mode knob with the explicit no-grandchildren statement and the class executor including the classless→`per-step` fallback; orchestrate has the one-block two-seat dialogue, the positive-form guardrail and the verbatim-override escape; work-plan has the class table, notation, `per-step` floor and the harder `[batch]` rule with MAT-111 named; evals moved first on all three; both chapters updated and all four no-change chapters judged in `DECISIONS.md`. Nothing promised is missing.
>
> **Producer/consumer contract** — the writer (`skills/work-plan/SKILL.md:151-155`) prescribes one trailing parenthetical, role first: `*(judgment · per-step)*`, and `*(per-step)*` alone in a hintless plan. The reader (`skills/work-run/SKILL.md:89-92`) names both forms verbatim, same middle-dot separator, same order. A plan written to work-plan's letter cannot be misread by work-run. (The lane's own round-1 integration review caught the earlier version of this — the reader said "beside its role hint", which read a hintless plan as malformed — and fixed it in `3cb5ddf`.)
>
> **One vocabulary** — `sigiloso`/Ox Alpha `opencode/x-preview-f-free`, ratón at `opencode/muse-spark-1.2-contributor-free`, ballena `opencode-go/deepseek-v4-flash`, the chain order sigiloso → free ratón → paid Go → Claude subagent, the economics rule and the command form `opencode run --auto -m <provider/model> "<prompt>"` are identical across `reference/runners.md`, the three SKILL.md files, six evals, `dispatch-child.md`, `step-reviewer.md`, ADR-008 and both chapters. I grepped each term across every live surface; no id, ordering or flag drift. One drift found, listed below.
>
> ### Issues
>
> #### Critical (Must Fix)
> None.
>
> #### Important (Should Fix)
>
> - **`README.md:115`** — the skills table still describes work-run as "fresh subagent per step, **per-step review**, capped fix loop". Under `grouped` and `covered-by-batch` that is no longer true, and it directly contradicts the skill's own new frontmatter ("reviews scaled by each step's review class"). This is the exact failure class the DoD names (a file still saying every step gets a review). `DECISIONS.md` judged `docs/how-it-works/README.md`, not the repo-root one, so this surface was never judged at all.
>
> - **`skills/work-run/SKILL.md:3`** — the description changed from "a fresh **subagent** per step" to "a fresh **runner** per step", in the same sentence that then uses "runner" for the command-mode CLI seat ("in-session subagent or command-mode runner"). The lane spent `reference/runners.md` making "runner" mean a registered CLI; the implementer is and remains an in-session subagent (the body says so at line 7-8, and `architecture.md:98` and `evals/eval-01.md:21` agree). A reader of the description alone can conclude the implementer seat is also configurable, which nothing in the change supports. Reverting that one word to "subagent" costs nothing.
>
> - **`docs/adrs/ADR-004-relay.md:23`** — the Decision text reads "sequential execution of one lane with a fresh implementer subagent per PLAN step, **per-step review** (maker ≠ checker)". MAT-117 makes that rung class-scaled, so the decision as recorded is now partially superseded and carries no amendment note — while ADR-008 got a dated note in this same lane for a smaller change (which default model id the dialogue offers). ADR-004 is not in the SPEC's scope, so this is drift the lane created rather than a broken promise, but the house pattern says a superseded ADR decision gets an italic dated note, not silence. It is also not among `DECISIONS.md`'s recorded no-change judgments.
>
> #### Minor (Nice to Have)
>
> - **`skills/work-run/SKILL.md:98`** — the class table's `covered-by-batch` row reads "nothing extra: the `[batch]` entry's single review already covers the sweep". Read alone, "nothing extra" is available as "this step buys no review"; the intent (one review of the batch entry's combined diff) is only unambiguous in `evals/eval-06.md:38`. One clause — "its own single review, covering the whole sweep" — would close it.
>
> - **`skills/work-run/references/step-reviewer.md:7-9` vs `SPEC.md:126-129`** — the SPEC promised the command-mode note would use "the same three inputs"; the shipped template requires a fourth, `[WORKTREE_ROOT]`. The change is correct (a command-mode seat has no ambient checkout), was eval-first (`34896c4` precedes `24b0438`), and is reasoned through at length in PROGRESS — but a deviation from the binding SPEC belongs in `DECISIONS.md`, where it is not recorded.
>
> - **`3cb5ddf`** touches `skills/work-run/SKILL.md` with no eval commit ahead of it. The DoD's letter is satisfied (eval commits precede *a* content commit for that skill) and the lane's re-reviewer argued the expectation was already pinned by `work-plan/evals/eval-06.md:45-47`, which predates it — defensible, but the reasoning lives in a PROGRESS quote rather than in `DECISIONS.md`.
>
> ### Verdict
>
> **PASS** — every DoD gate exits 0 on my own run (`0 high, 0 medium, 0 low — PASS`, `all 22 cases passed`, `all gen cases passed`, `all eval checks passed`), all ten PLAN acceptance commands exit 0, the ADR-008 diff is 15 insertions and 0 deletions with both prior records byte-identical, eval-before-content ordering holds for all three skills, and no live surface points a seat at `opencode/deepseek-v4-flash-free`. The three Important findings are stale claims on adjacent surfaces the SPEC did not enumerate (root README, one word in a description, an unamended ADR-004) — worth a follow-up sweep, but none falsifies the lane's own verification.

### Findings fixed, then re-reviewed

All three Important findings and the `covered-by-batch` minor were fixed
rather than deferred — each is a live surface this change made untrue,
which the house hard constraint says the change itself must repair. The
two recording-only minors became three `DECISIONS.md` entries. Fixes:

- `README.md:115` — "review scaled by each step's review class".
- `skills/work-run/SKILL.md:3` — "runner" reverted to "subagent" for the
  implementer; the same sentence still discloses that the reviewer seat
  is configurable.
- `docs/adrs/ADR-004-relay.md` — an italic *Amended 2026-08-21 (MAT-117)*
  note after the Decision text, purely additive, original byte-intact.
- `skills/work-run/SKILL.md:98` — the `covered-by-batch` row now says the
  step buys "its own single review, covering the whole sweep".

Scoped re-review verdict verbatim (engine: sigiloso,
`opencode run --auto -m opencode/x-preview-f-free`):

> ## Finding verdicts
>
> **Important 1 — README.md skills table: ADDRESSED.**
> README.md:115 now reads "fresh subagent per step, review scaled by each step's review class, capped fix loop" — no longer claims universal per-step review, and no longer contradicts the skill's own frontmatter.
>
> **Important 2 — `skills/work-run/SKILL.md:3`: ADDRESSED.**
> Description reverted to "a fresh subagent per step" for the implementer, while the same sentence keeps "reviews … bought from either seat (in-session subagent or command-mode runner)". "Runner" now appears only where it means a registered CLI, matching `reference/runners.md`'s vocabulary.
>
> **Important 3 — ADR-004: ADDRESSED.**
> Dated italic amendment note at `docs/adrs/ADR-004-relay.md:29-38`, placed after the Decision text. The diff (`@@ -26,6 +26,17 @@`) is a pure insertion — zero deleted lines — so the original Decision text (lines 22-27) is byte-intact.
>
> **Minor A — `covered-by-batch` row: ADDRESSED.**
> SKILL.md:98 now reads "its own single review, covering the whole sweep — one for the `[batch]` entry, never one per file it touched": the step visibly buys a review, and the wording matches `skills/work-run/evals/eval-06.md:37-38` ("reviewed once for the whole sweep … never once per file touched") and `skills/work-plan/SKILL.md:149` ("the sweep's single review").
>
> **Recording-only minors — CLOSED.** All three DECISIONS entries do the job:
> - `DECISIONS.md:184-193` — records the assembled L-tier DoD (SPEC Verification + ten acceptance commands) and why the substitution beats declaring the tier unverifiable in a repo with no feature list.
> - `DECISIONS.md:195-207` — records the deliberate fourth-input deviation, its reason, and evals-first evidence; git confirms `34896c4` precedes `24b0438`.
> - `DECISIONS.md:209-222` — cites `work-plan/evals/eval-06.md:45-47` ("same notation on every step, consistently"), which I verified exists verbatim, and git confirms `5c0c5e8` precedes `3cb5ddf`. The reasoning holds: the pinned expectation didn't move.
>
> ## New breakage
>
> None found.
>
> - **ADR-004 note**: additive, dated 2026-08-21, original intact (above).
> - **Cross-checks**: the note's two knobs (class = how often, MAT-117; seat = who, MAT-116) agree with ADR-008's 2026-08-21 note (both seats in one dialogue block), `SKILL.md:86-137`, and `reference/runners.md:29-41` (command mode named for work-run's per-step reviewer).
> - **Revert direction**: the full description sentence still discloses reviewer-seat configurability ("bought from either seat") — nothing hidden.
> - **Sweep beyond the three files**: every remaining "subagent per step" phrasing describes the *implementer* cadence, which stays true — `templates/repo/docs/tiers.md:12`, `docs/how-it-works/architecture.md:98`, `skills/orchestrate/SKILL.md:15`. `CHANGELOG.md:406-407` is a historical release record. `skills/orchestrate/SKILL.md:405` and `dispatch-child.md:96-103` were already amended for command mode earlier in the lane. `reference/task-tiers.md:40` names executors only. No live surface claims universal per-step review or a necessarily-subagent reviewer.
>
> ```
> VERDICT: PASS
> ```

All four gates re-run after the fixes: `agent-lint` → `0 high, 0 medium,
0 low — PASS`; `run-lint-tests` → `all 22 cases passed`; `run-gen-tests`
→ `all gen cases passed`; `run-eval-checks` → `all eval checks passed`.
