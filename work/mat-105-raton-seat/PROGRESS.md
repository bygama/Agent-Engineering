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

## In progress

## Next

## Tried and failed

## Verification
