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
