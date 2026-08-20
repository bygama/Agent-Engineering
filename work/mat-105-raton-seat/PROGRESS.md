# Progress — mat-105-raton-seat

Lane: second cross-family reviewer seat (ratón chispeante) in
`reference/runners.md`. SPEC approved by the parent 2026-08-19
(ruling in DECISIONS.md). Executing via work-run, one implementer per
PLAN step.

## Done

### Step 1 — falsehood check (judgment) — DONE

Read `skills/orchestrate/SKILL.md` (step 3's dispatch dialogue and step
6's whole review wave), `skills/orchestrate/evals/eval-03.md`, and
`docs/how-it-works/execution.md`'s review-wave narration (stages 4-8,
plus the "Runners" section) against the planned `reference/runners.md`
change. Verdict: **no-change on all three** — recorded per file, with
the specific lines and the reason each survives, in DECISIONS.md
("Step 1: falsehood check re-verified at execution"). No eval revision
is required, so step 2 is free to touch content.

Two findings worth carrying forward, neither a falsehood:

- SKILL.md's stall-clock and single-shot paragraphs (and execution.md's
  matching stage-6 prose) are scoped to "a ballena reviewer". They hold
  for any opencode TUI seat, so after this lane they are narrower than
  the evidence — under-generality, not a false claim. Generalizing them
  is outside this lane's owned files; noted for a later lane.
- Also checked beyond the named three: `evals/eval-01.md`'s dialogue
  line ("offers **default 1 ballena**") stays true because the ballena
  keeps the default, and `docs/how-it-works/work-lifecycle.md`'s only
  mention is a pointer at `reference/runners.md`, "The adversarial
  seat", restating no pairing of its own.

Acceptance: `grep -c 'no-change' work/mat-105-raton-seat/DECISIONS.md`
→ `5` (≥ 1) · `node tests/run-eval-checks.mjs` → `all eval checks
passed`, exit 0. Extra: `node scripts/agent-lint.mjs . --ignore
tests,templates,global,examples` → `0 high, 0 medium, 0 low — PASS`,
exit 0.

Files changed: `work/mat-105-raton-seat/DECISIONS.md` (judgment
recorded), `work/mat-105-raton-seat/PLAN.md` (step 1 ticked), this
file. No repo content touched — correct for a no-change verdict.

Concerns: none.

#### Step 1 review (fresh reviewer, opus) — verdict recorded verbatim

> ### Spec compliance
> ✅ Compliant — the step's two deliverables are both present and both
> acceptance conditions verify.
>
> **Step quality:** Approved
> **Reasoning:** The judgment this step exists to produce is correct — I
> re-derived it independently against all three surfaces plus the two
> adjacent ones and found no graded or narrative line that the planned
> runners.md change makes false — and both acceptance commands reproduce
> exactly as recorded, with no repo content touched, which is the right
> footprint for a no-change verdict.

Minor findings (deferred to work-verify's triage, never the fix loop):

1. DECISIONS.md step-1 entry: the dialogue-default quote elides with
   `…` the clause closest to an exclusivity reading (SKILL.md:73-74
   "the house name for THE cross-family reviewer seat"); reviewer
   agrees it is a role descriptor, not a uniqueness claim, but asks for
   one sentence naming the clause and why it survives.
2. PROGRESS.md drops the `## In progress` / `## Next` headings the
   template and sibling lane carry (not lint-enforced).
3. Forward note for step 2: `reference/runners.md:41` "`--auto` is
   required on both ballena launch commands" stays literally true but
   becomes under-general once the ratón's own `--auto` rationale lands
   beside it — keep coherent in step 2's single edit (runners.md IS
   owned there).

### Step 2 — ratón chispeante seat in `reference/runners.md` (judgment) — DONE

One coherent edit to `reference/runners.md`, all four sub-deliverables:

- **(a) The seat.** Three new paragraphs immediately after the
  single-shot paragraph, inside the ballena stack: house name **ratón
  chispeante** in the accented prose form (parent ruling), the verbatim
  argv `opencode --auto -m opencode-go/muse-spark-1.2-contributor`
  inline (matching how the ballena's TUI argv is written in the same
  stack, not a new fenced block), the same two-step launch named by its
  three moves (bare TUI form → `terminal wait --for tui-idle` →
  `worker-start --terminal`), the `--auto` rationale **cited** not
  restated ("Same `--auto` rationale as above, on the same
  read-only-seat condition"), and the evidence line: verified 2026-08-19
  across two production reviews, the MAT-104 and MAT-94 waves, both PASS
  at ballena grade. The default is stated explicitly and unchanged —
  "The ballena is the dispatch dialogue's default seat, not the only
  one"; the ratón is "picked by the owner per lane rather than offered
  by default". No dialogue wording anywhere else was touched.
- **(b) Consent gotcha**, its own paragraph directly under the launch
  command: opencode's DATA-COLLECTION consent prompt, `--auto` does NOT
  cover it, named as a *different prompt class* from the permission
  prompts `--auto` auto-approves, manual and one-time per machine/model
  (owner cleared it live on the MAT-94 seat), and the diagnostic framing
  — "check it first when a new seat never reaches `tui-idle`".
- **(c) Known behavior, not a rule** — one line, opened with exactly
  that framing: a ratón seat's `worker_done` printed "(no output)" and
  never registered in the ledger; verdict read off the transcript rather
  than re-sent, per the single-shot rule directly above it; cause left
  unattributed ("model or CLI").
- **(d) "The adversarial seat"** — the verified-runner sentence now
  reads "the verified cross-family **pairings are** opencode + DeepSeek
  (the portability-proof pairing, the ballena) and opencode + Muse Spark
  (the ratón chispeante)". Singular→plural plus the second pairing; the
  "No second runner installed ⇒ NOT done" sentence after it is untouched
  (only rewrapped by the fill change).

**Deferred minor #3 from step 1's review, addressed.** Line 41's
`--auto` sentence read "required on both ballena launch commands — the
Go default and the free fallback"; with the ratón's own `--auto`
rationale landing below it, that enumeration was about to go
under-general. Smallest coherent fix, in place, no restructuring of the
ballena stack: "`--auto` is required on every TUI reviewer launch — the
ballena's Go default and free fallback, and the ratón below". The rest
of that paragraph (the MAT-91 stall evidence, the read-only-seat
condition, the "not on a WRITING seat" carve-out) is byte-identical, so
the ratón can cite it instead of restating it.

Acceptance (all four conditions, run after the final reflow):

- `grep -c 'muse-spark-1.2-contributor' reference/runners.md` → `1` (≥ 1)
- `grep -ci 'consent' reference/runners.md` → `1` (≥ 1)
- `grep -c '(no output)' reference/runners.md` → `1` (≥ 1)
- `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → `0 high, 0 medium, 0 low — PASS`, exit 0

Extra (not required by this step, run as a regression check before
committing): `node tests/run-lint-tests.mjs` → `all 20 cases passed` ·
`node tests/run-gen-tests.mjs` → `all gen cases passed` ·
`node tests/run-eval-checks.mjs` → `all eval checks passed`; the chain
exited 0.

Files changed: `reference/runners.md` (the only repo file — no skill,
eval or `docs/how-it-works/` change, which is step 1's recorded
no-change verdict standing, and satisfies AGENTS.md's
"update the affected chapter" constraint because step 1 established
there is no affected chapter), `work/mat-105-raton-seat/PLAN.md` (step 2
ticked), this file.

Concerns: none blocking. One judgment worth flagging for the reviewer:
the ratón argv is written verbatim as proven (`--auto` before `-m`),
which reads inconsistently next to the ballena's `-m … --auto` ordering
two paragraphs up. The PLAN says verbatim, and the argv is the thing
that was actually run on this machine, so verbatim won over cosmetic
symmetry. Also: "the ratón below" in the `--auto` paragraph is a forward
reference — the file already uses "the headless `run` form above" in the
same sentence, so the pattern is house voice, but it does depend on the
ratón paragraphs staying below that one.

#### Step 2 review (fresh reviewer, opus) — verdict recorded verbatim

> ### Spec compliance
> ✅ Compliant — all four sub-deliverables landed in a single edit to
> the one owned file, and all four acceptance conditions pass.
>
> **Step quality:** Approved
> **Reasoning:** All four sub-deliverables are present, accurately
> worded against the SPEC, and placed where the SPEC required; the one
> edit beyond the literal step list (`--auto` generalization) is
> necessary for the required citation to be coherent and stays inside
> the owned file, and all four acceptance commands plus the three other
> gate suites exit 0 on re-run. The only open item is confirming the
> "(no output)" event really was a ratón seat, which cannot be settled
> from this diff.

Reviewer re-ran all four acceptance commands plus the three other
suites — all green, PROGRESS claims verified truthful. The ⚠️ item
(ratón attribution of the "(no output)" event) is adjudicated with
ticket evidence in DECISIONS.md — attribution stands.

Minor findings (deferred to work-verify's triage, never the fix loop):

4. `runners.md:41` "every TUI reviewer launch" is broader than the
   flag — `--auto` is an opencode flag; suggested "every opencode TUI
   reviewer launch".
5. Consent gotcha is opencode-wide but sits in the ratón block
   (SPEC-dictated placement); optional four-word pointer from the
   ballena launch paragraph would add reach.
6. No fallback recorded for the ratón — correct under
   verify-on-install (none proven); add only if a no-auth Muse Spark
   route is proven later.

### Step 3 — Full gate suite + lane bookkeeping current — DONE

Verified PROGRESS.md and DECISIONS.md bookkeeping: PROGRESS.md truthful
with Steps 1 and 2 completed and recorded; DECISIONS.md carries the
SPEC-approval ruling (2026-08-19 — SPEC approval, parent ruling) and the
step-1 judgments (2026-08-19 — Step 1: falsehood check re-verified at
execution).

Ran all four acceptance commands:

- `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → `0 high, 0 medium, 0 low — PASS`, exit 0
- `node tests/run-lint-tests.mjs` → `all 20 cases passed`, exit 0
- `node tests/run-gen-tests.mjs` → `all gen cases passed`, exit 0
- `node tests/run-eval-checks.mjs` → `all eval checks passed`, exit 0

Files changed: `work/mat-105-raton-seat/PLAN.md` (step 3 ticked), this
file. No repo content touched — all gates green.

Concerns: none.

#### Step 3 review (fresh reviewer, sonnet) — verdict recorded verbatim

> ### Spec compliance
> ✅ Compliant — the diff ticks PLAN.md step 3, all four acceptance
> commands re-run clean, and DECISIONS.md already carries both required
> entries.
>
> **Step quality:** Approved
> **Reasoning:** All four required gates were independently re-run and
> exit 0 with outputs matching what's recorded, DECISIONS.md verifiably
> carries the two required rulings, and the change stays entirely
> inside owned lane files with no repo content touched — the one flaw
> is a self-inconsistent "files changed" line that doesn't affect
> substance.

Minor finding: the step-3 "Files changed" line omitted the PLAN.md
tick — fixed in place by the controller when recording this verdict
(lane bookkeeping accuracy, no repo content).

### Step A1 — evals first under the amended law (judgment) — DONE

Amendment step 1 (SPEC "Amendment", owner ruling 2026-08-20). Evals
change before content, so both orchestrate evals that mention a reviewer
seat were judged against the new law (ratón chispeante = the dialogue's
default; ballena = the owner-selectable alternative).

- **`skills/orchestrate/evals/eval-01.md` — CHANGED** (the only content
  edit in this step). Its dispatch-dialogue graded line was the eval
  corpus's only assertion of the offered DEFAULT, which the amendment
  inverts. It now grades two facts instead of one: the offered default
  is **1 ratón chispeante** (muse spark 1.2 contributor), and the
  ballena (deepseek v4 flash) must be NAMED as the selectable
  alternative — "rather than picking either silently". The rest of the
  item (one question for this lane, not a batch question) is unchanged;
  no other eval-01 line mentions a seat.
- **`skills/orchestrate/evals/eval-03.md` — no-change**, with ALL graded
  lines checked, not just the fixture sentence. The fixture ("picked '1
  ballena' … recorded in the Task spec") reads as an owner CHOICE, not a
  default — the word "default" does not occur anywhere in the file
  (`grep -i default skills/orchestrate/evals/eval-03.md` → no match,
  exit 1) — and the ballena stays selectable under the new law. Lines
  23, 27, 37 and 49 are conditioned on that choice; line 31 is scoped to
  the ballena's own two invocation forms (still registered); line 41's
  stall clock is under-general, not false, exactly as step 1 recorded.
  Per-line reasoning in DECISIONS.md.
- Checked beyond the two named files: eval-02, eval-04 and eval-05
  mention no seat at all (`grep -rn -i 'ballena|ratón|muse'
  skills/orchestrate/evals/` hits only eval-01 and eval-03), so the
  amendment reaches no other eval.

One consumption note carried forward to A3, recorded in DECISIONS.md:
eval-03's `--auto` graded line stays gradeable only while the ballena's
launch argv remains reachable from the skill — which is what A3's
"ballena's cited nearby per single-definition discipline" already
requires; swapping SKILL.md step 6's snippet to the ratón WITHOUT that
citation would strand that line.

Acceptance (both conditions):

- `grep -c 'ratón chispeante' skills/orchestrate/evals/eval-01.md` → `1`
  (≥ 1)
- `node tests/run-eval-checks.mjs` → `all eval checks passed`, exit 0

Extra (regression check, not required by this step):
`node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
→ `0 high, 0 medium, 0 low — PASS`, exit 0.

Files changed: `skills/orchestrate/evals/eval-01.md` (the graded line —
the only repo content touched), `work/mat-105-raton-seat/DECISIONS.md`
(A1 judgment), `work/mat-105-raton-seat/PLAN.md` (A1 ticked), this file.
No skill, reference or docs content touched — those are A2/A3.

Concerns: none blocking. Worth the reviewer's eye: eval-01's line now
grades a compound behavior (default offered AND alternative named); that
is deliberate — under the new law an agent that offers the ratón while
hiding the ballena is as wrong as one that still defaults to the
ballena — but it is one checklist line carrying two failure modes.

## In progress

## Next

## Tried and failed

## Verification

### 2026-08-19 — M DoD — PASS

- L1 static: `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` → exit 0 (`0 high, 0 medium, 0 low —
  PASS`)
- L2 behavioral: `node tests/run-lint-tests.mjs` → exit 0 (`all 20
  cases passed`) · `node tests/run-gen-tests.mjs` → exit 0 (`all gen
  cases passed`) · `node tests/run-eval-checks.mjs` → exit 0 (`all eval
  checks passed`); PLAN acceptance greps: `muse-spark-1.2-contributor`
  → 1, `consent` → 1, `(no output)` → 1, `no-change` in DECISIONS → 5
  (all ≥ 1)
- L3 end-to-end: n/a: single component — one registry markdown file
  (`reference/runners.md`) plus the lane folder; no executable flow
  crosses components (recorded as a decision, not an omission)
- Fresh-context review (opus subagent, diff c7eff52..HEAD): **PASS** —
  "every DoD command reproduces on my own run at exit 0 (`0 high, 0
  medium, 0 low — PASS`, `all 20 cases passed`, `all gen cases passed`,
  `all eval checks passed`, and all four greps at or above threshold),
  and the SPEC's own bars hold: `git diff --name-only c7eff52..HEAD`
  lists only `reference/runners.md` plus the lane folder, the
  orchestrate dialogue files are untouched with `Default: **1
  ballena**` intact, and the one claim I could not check from the repo
  — the ratón attribution of the '(no output)' event — is confirmed
  verbatim by MAT-105's own description. The four findings are cosmetic
  or out-of-scope follow-ups; none blocks handoff." Reviewer also
  re-derived the step-1 no-change judgment independently and confirmed
  the argv byte-identical to the ticket's. Its minor #1 (ragged reflow
  at runners.md:41-44, a regression of the triage fix) was fixed after
  the review — whitespace-only rejoin — and all four gates re-run green
  on the final tree (this block's L1/L2 outputs are from that re-run).
  Minors #2-#3 (execution.md stage-6 fork and SKILL.md:73 read narrower
  than the evidence now supports) are the already-noted follow-up-lane
  items — out of this lane's owned files; #4 was this very block,
  pending at review time.
- Adversarial review: n/a: M tier, not requested in-lane — the parent
  runs its own cross-model reviewer after worker_done (an additional
  seat, per the dispatch brief).
