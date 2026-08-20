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

## In progress

## Next

## Tried and failed

## Verification
