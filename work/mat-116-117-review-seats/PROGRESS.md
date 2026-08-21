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
