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

#### Step A1 review (fresh reviewer, opus) — verdict recorded verbatim

> ### Spec compliance
> ✅ **Compliant.**
>
> **Step quality:** Approved
> **Reasoning:** Both acceptance conditions pass on this checkout, the
> eval-01 wording genuinely fails the old ballena default while also
> failing a ratón-only offer, and the eval-03 no-change ruling is argued
> line by line with grep evidence I independently confirmed. The three
> minor items are wording precision and forward-looking record-keeping —
> none blocks A2.

Minor findings (deferred to work-verify's triage):

A1-1. DECISIONS/PROGRESS "no other line in eval-01 mentions a seat" is
   imprecise (eval-01:42-43 child seat, :86 cross-model seat) — meant
   claim: "no other line names a reviewer seat by house name".
A1-2. After A1 the corpus grades the ballena's launch in detail
   (eval-03, fixture-conditioned) but nothing grades the ratón's launch
   — a coverage judgment to state explicitly (or defer to A3's review).
A1-3. SPEC's pre-amendment items asserted the old law without a
   superseded pointer — FIXED by the controller when recording this
   verdict (superseded marker added at "What done looks like").

### Step A2 — `reference/runners.md` under the amended law (judgment) — DONE

Amendment step 2. One coherent edit to `reference/runners.md` (the only
repo file touched — no skill, eval or `docs/how-it-works/` change; those
are A3). Four deliverables, plus one in-file coherence fix:

- **Label inversion.** The ratón entry now opens the seat stack:
  "**Ratón chispeante** (pl. ratones chispeantes) is the seat the
  dispatch dialogue offers by default", and carries the cost rationale
  as the REASON for the default — "It holds the default on cost: two
  production reviews on this machine — the MAT-104 and MAT-94 waves,
  verified 2026-08-19, both PASS at ballena grade — for ~$0.01 all-in,
  against the ballena's price." The ballena gets its own paragraph
  directly below: "The **ballena** is the owner-selectable alternative,
  fully registered:" — nothing of its registration removed, argv
  (`opencode -m opencode-go/deepseek-v4-flash --auto`), no-auth
  fallback (`opencode -m opencode/deepseek-v4-flash-free --auto`), the
  two-step launch, the `--auto` rationale and the portability-proof
  evidence (free model 2026-08-16, Go model 2026-08-18) all present,
  ending "The dialogue names it beside the default; the owner picks
  between ratones chispeantes and ballenas at dispatch, never silently"
  — the behavior A1's eval-01 line now grades (default offered AND
  alternative named).
- **Full house name** documented at the seat entry: singular in bold,
  plural inline as `(pl. ratones chispeantes)`; the plural is also used
  naturally in the dispatch sentence.
- **Forward reference fixed.** The `--auto` law paragraph read "the
  ballena's Go default and free fallback, and the ratón below" — an
  enumeration that both asserted the old default and depended on
  paragraph order. It now reads "on every opencode TUI reviewer launch
  registered **here** — either seat, the ballena's no-auth fallback
  included", which is ordering-neutral (no above/below), seat-neutral,
  and still names the fallback the flag must carry. Its other reference
  ("the headless `run` form above") is backward to the table and stays.
  Both seat paragraphs cite the law ("Same `--auto` rationale as
  above") — single definition, both seats citing it, per the step.
- **Consent note re-scoped opencode-wide**: "Any opencode seat can stop
  at opencode's DATA-COLLECTION consent prompt on a fresh machine or a
  fresh model — ratón or ballena, the no-auth fallback included — and
  `--auto` does NOT cover it…". Placement: immediately after the
  ballena paragraph, i.e. directly under launch commands (the SPEC's
  "NEXT to the launch command" bar) and now visibly after BOTH seats'
  launches rather than inside the ratón block. This closes step-2
  review minor #5 / triage item 5 properly, at the moment the law made
  it in-scope.

Two supporting moves the inversion required, both inside the owned file:

- The two-invocation-forms paragraph used to carry the ballena's TUI
  argv as the illustration ("so it launches the bare TUI form —
  `opencode -m opencode-go/deepseek-v4-flash --auto`, no-auth fallback
  …"). With the ballena no longer the default, hard-coding it there
  would re-assert the old law and duplicate the argv. It is now
  seat-neutral — "so it launches the seat the dispatch dialogue settled
  on in its bare TUI form" — and each seat's argv is defined exactly
  once, in its own entry (the ballena's argv is not lost, it moved into
  its paragraph).
- Table row (opencode, headless spawn): "(ballena default `-m
  opencode-go/deepseek-v4-flash`…)" → "(the ballena's default …)". A
  possessive; the parenthetical always meant the ballena's own Go/free
  model pair, but after the inversion "ballena default" is exactly the
  string a reader scanning for the seat default would misread. Three
  characters, no claim changed.

Untouched by judgment: "The adversarial seat" section's pairing
sentence (lines 112-115) lists the ballena pairing first but attaches no
default/alternative label to either — it enumerates verified
cross-family pairings, which the amendment does not reorder; and the
"(no output)" known-behavior line, whose "the single-shot rule above"
reference stays backward under the new ordering.

Acceptance (all three conditions):

- `grep -c 'ratones chispeantes' reference/runners.md` → `2` (≥ 1)
- `grep -ci 'default' reference/runners.md` → `9` (≥ 1)
- `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → `0 high, 0 medium, 0 low — PASS`, exit 0

Extra (regression check, not required by this step):
`node tests/run-lint-tests.mjs` → `all 20 cases passed` ·
`node tests/run-gen-tests.mjs` → `all gen cases passed` ·
`node tests/run-eval-checks.mjs` → `all eval checks passed`; the chain
exited 0. Wrap check: every line this step wrote is ≤ 72 columns (13
non-table lines pre-existing over 72 columns and untouched).

Files changed: `reference/runners.md` (+30/−21, the only repo content),
`work/mat-105-raton-seat/PLAN.md` (A2 ticked), this file.

Concerns: none blocking. Two for the reviewer's eye: (1) the ratón argv
stays verbatim as proven (`--auto` before `-m`) while the ballena's
reads `-m … --auto` — the asymmetry is deliberate, each is the argv
actually run on this machine; (2) `docs/how-it-works/execution.md` and
`skills/orchestrate/SKILL.md` still narrate the ballena as the default,
which this commit makes false — that is A3's scope by the PLAN's own
decomposition, so the AGENTS.md "update the affected chapter in the same
change" constraint is satisfied at the A2+A3 commit pair, not by A2
alone.

#### Step A2 — fix round 1 (reviewer finding 1, Important)

**Finding:** the new default seat had no documented no-auth path. The
ratón's `opencode-go/` prefix is the OpenCode Go subscription — the same
auth the table calls out for the ballena's default, and for which the
ballena carries a documented fallback. After the inversion, a fresh
machine reading the registry got a *default* it might not be able to
launch, with the only no-auth path in the file belonging to the
alternative.

**Fix:** one clause in the ratón paragraph, directly after the argv and
launch moves — "OpenCode Go subscription auth, like the ballena's
default; no Go auth ⇒ the ballena's no-auth free fallback is the seat
instead, since no no-auth Muse Spark route has run here." Three points
of judgment inside the reviewer's wording:

- No Muse Spark free model is invented — verify-on-install stands (the
  same reason triage item 6 recorded no ratón fallback); the recovery is
  the ballena's *proven* free fallback, and the trailing clause states
  why the recovery is a different seat rather than a different model.
- The fallback stays defined exactly once, in the ballena entry; the
  ratón cites it.
- The reviewer's example said "the ballena's no-auth free fallback
  **below**"; the directional word was dropped. This step's own
  deliverable was removing an ordering-dependent reference from the
  `--auto` paragraph, so re-introducing one two paragraphs later would
  undo it. "the ballena's no-auth free fallback" names the thing
  uniquely — no above/below needed.

Nothing else in the file was touched.

Verification: `node scripts/agent-lint.mjs . --ignore
tests,templates,global,examples` → `0 high, 0 medium, 0 low — PASS`,
exit 0. Acceptance conditions still hold: `grep -c 'ratones
chispeantes'` → `2`, `grep -ci 'default'` → `10` (was 9; the new clause
adds one "default"). Wrap: every line of the rewrapped paragraph ≤ 72
columns.

Files changed: `reference/runners.md` (the ratón paragraph only), this
file.

#### Step A2 review (fresh reviewer, opus) — verdict recorded verbatim

> ### Spec compliance
> ✅ Compliant
>
> **Step quality:** Approved
> **Reasoning:** All four deliverables land with the acceptance
> verified independently and every gate green, the inversion loses
> nothing of the ballena's registration (argv, fallback, two-step
> launch, both evidence dates, portability-proof record all confirmed
> against `HEAD~1`), and the single-definition and ordering fixes are
> real improvements rather than shuffles. The one should-fix — the new
> default seat's unstated Go-auth requirement and missing no-auth path
> — is a one-clause addition that A3's pass over the same law can
> absorb.

Important finding 1 (no-auth path for the default seat) entered the
fix loop — fix round 1 commit a659b79, scoped re-review verdict
recorded verbatim:

> ### Finding 1 (no-auth path for the default seat)
> **ADDRESSED** — The fix inserts one clause after the ratón's
> argv/launch line [...] names the ratón's auth requirement, points the
> no-auth recovery at the ballena's proven fallback [...] rather than
> inventing an unproven Muse Spark free model, and the fallback command
> itself is still defined exactly once in the ballena entry. [...] no
> new ordering-dependent reference. `node scripts/agent-lint.mjs .
> --ignore tests,templates,global,examples` → `0 high, 0 medium, 0 low
> — PASS`, exit 0.
>
> ### New issues inside the fix's blast radius (only if real)
> None found.

Minor findings (deferred to work-verify's triage):

A2-2. The ~$0.01 figure carries no verification stamp and "the
   ballena's price" is never quantified — stamp it like the file's
   other facts, or state it as an ordering.
A2-3. The two-invocation-forms paragraph lost its only concrete TUI
   argv and leans on "the dispatch dialogue" (an orchestrate concept);
   suggested "launches the chosen seat (registered below)".
A2-4. The two-step pattern is enumerated in the pattern paragraph AND
   re-listed in the ratón entry, while the ballena entry only cites it
   — asymmetric; drop the re-listing or declare it deliberate.
A2-5. PROGRESS wrap-check count ("five >72 lines") is wrong (13
   non-table lines pre-exist over 72 cols); the load-bearing claim (no
   NEW line over 72) was verified true — fix or drop the number.

The reviewer's carryover checklist for A3 (surviving ballena-as-default
lines) is recorded for the A3 implementer: SKILL.md:73-74, :163, :376;
references/reviewer.md:5; execution.md:184-185, 226, 247, 282, 286,
321, 329; eval-03:10 stays (owner choice, valid under the new law).

### Step A3 — orchestrate skill + narrating chapter under the amended law (judgment) — DONE

Amendment step 3+4, one commit for all three files (house rule: the
chapter updates in the same change). The A2 reviewer's carryover
checklist drove the sweep and every listed line was addressed; the
`grep -rn -i 'ballena'` re-run below shows what survives and why.

**`skills/orchestrate/SKILL.md`** (five edits):

- **Step 3, the dispatch dialogue (was :73-74).** The offered default is
  now **1 ratón chispeante** ("the house name for the cross-family
  reviewer seat that holds the default on cost, muse spark 1.2
  contributor; several of them are ratones chispeantes"), and the
  **ballena** (deepseek v4 flash) is named in the same question as the
  alternative, "so neither seat is picked silently". That is exactly the
  compound behavior eval-01:38-40 now grades — default offered AND
  alternative named. The dialogue's shape is untouched: still one
  question, still yes/no + how many + which model, still "never a silent
  default" in the sentence above it.
- **Step 6, the launch fork and snippet (was :163, :169, :175-177).**
  The fork is no longer ballena-scoped ("an opencode seat needs custom
  argv, so it takes the two-step launch — here at the dialogue's
  default, the ratón chispeante"), and the `terminal create` line now
  carries the ratón argv **verbatim as proven**: `opencode --auto -m
  opencode-go/muse-spark-1.2-contributor`, keeping its
  `# reference/runners.md` provenance comment. The ballena's launch
  stays REACHABLE per A1's forward note — the paragraph under the fence
  now reads "A ballena agreed at the dialogue takes the same four
  commands with its own argv, and a machine without OpenCode Go auth
  falls back to the ballena's no-auth free model — the seat changes, the
  four commands do not. Every launch argv, `--auto` included, is read
  off `reference/runners.md`, which registers both seats, never retyped
  from memory." Single-definition discipline: the ballena's two argv
  (Go default + no-auth fallback) are no longer duplicated here, they
  are cited where A2 registered them, which is what keeps eval-03:31
  gradeable.
- **Stall clock (:185).** "A ballena reviewer cannot heartbeat" → "An
  opencode TUI reviewer (ratón or ballena) cannot heartbeat" — the
  generalize-don't-swap rule: the mechanic holds for any opencode TUI
  seat, and eval-03:41 (fixture: a ballena) still grades against it.
- **Fix-loop cost line (:230)** "pays a new ballena five times" → "pays
  a new reviewer seat five times"; **teardown line (:264)** "a retained
  ballena idles" → "a retained reviewer seat idles". Both are
  seat-agnostic mechanics that ballena-scoping now misreads as the
  default.
- **Judgment note (:376).** "which is what the ballena default is for" →
  "which is what the ratón chispeante default is for" — the line the
  step named explicitly.

**`skills/orchestrate/references/reviewer.md`** — the "(default 1
ballena)" line at :5 inverted to "(default 1 ratón chispeante)", one
rewrap of the sentence. Nothing inside the fenced brief changed: the
template is seat-neutral by construction.

**`docs/how-it-works/execution.md`** — falsehood check re-run under the
new law across the whole chapter, then updated at every place it
narrated the old default:

- **Topology diagram (:184-185)**: `Reviewer / ballena` → `Reviewer /
  ratón chispeante` on both reviewer nodes (the wave's default seat is
  what the drawing should show).
- **Sequence diagram (:226, :247, :249)**: participant renamed the same
  way; the stage-6 `alt/else` label is now `else opencode seat (ratón
  chispeante by default, or a ballena - no --model id)` — the fork is
  CLI-enforced for any custom-argv seat, not for the ballena
  specifically; the elided command shows `"opencode --auto -m ..."`,
  matching the ratón's argv order.
- **Launch-fork prose (:282)**: "while the ballena — custom argv" →
  "while an opencode seat — custom argv", plus one new sentence naming
  both seats and where their argv live: "Either opencode seat takes it:
  the dialogue's default ratón chispeante (muse spark 1.2 contributor)
  and the ballena (deepseek v4 flash) it names beside it differ in argv,
  not in how they launch — `reference/runners.md` registers both, and
  the skill reads either off it rather than restating them."
- **Stall clock (:286)**: "a ballena reviewer cannot heartbeat" → "an
  opencode TUI reviewer — ratón or ballena — cannot heartbeat".
- **Stage-8 teardown (:321)**: "a retained ballena idles" → "a retained
  reviewer seat idles".
- **Stage-4 borrowed launch (:329)**: "borrows the ballena's launch from
  stage 6" → "borrows the reviewer seat's two-step launch from stage 6".
- **Untouched by judgment**: the 2026-08-16 portability-proof paragraph
  (a dated record — opencode + `deepseek-v4-flash-free` completing
  `f04-capitalize` is what actually ran), the "Runners" section (it
  calls the runner "a free choice per row of the worker table" and
  restates no default), and every other dated/evidence line. Paragraph
  reflows in the touched paragraphs are whitespace-only.

Out of scope and deliberately untouched: `reference/runners.md` (A2),
the evals (A1 — eval-03:10's "picked '1 ballena'" is an owner CHOICE,
valid under the new law), `CHANGELOG.md`, `docs/adrs/ADR-008` (dated
record; ADR-008:38-43 still states the old default by its own date, as
DECISIONS.md's amendment entry rules), and
`docs/how-it-works/standard-lifecycle.md`.

Acceptance (all four conditions, run on the final tree):

- `grep -c 'ratón chispeante' skills/orchestrate/SKILL.md` → `3` (≥ 1)
- `bash -c "! grep -rqi 'default 1 ballena' skills/orchestrate docs/how-it-works"`
  → exit `0`
- `grep -c 'ratón' docs/how-it-works/execution.md` → `6` (≥ 1)
- `node tests/run-eval-checks.mjs` → `all eval checks passed`, exit 0

Regression check (all four gates, final tree, chained with `&&`):
`node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
→ `0 high, 0 medium, 0 low — PASS` · `node tests/run-lint-tests.mjs` →
`all 20 cases passed` · `node tests/run-gen-tests.mjs` → `all gen cases
passed` · `node tests/run-eval-checks.mjs` → `all eval checks passed`;
the chain exited 0. SKILL.md is 386 lines (cap <500). Wrap check on the
diff: no new prose line exceeds 78 columns; the three longer added lines
are a mermaid node label, a mermaid `alt` label and the fenced
`terminal create` command — all shorter than the lines they replaced.

Surviving `ballena` mentions in the three files, each verified correct
under the new law: SKILL.md:76 (the named alternative in the dialogue),
:179 and :181 (the alternative's launch + the no-auth fallback that is
the ballena's), :192 (generalized stall clock, "ratón or ballena");
execution.md:247 (fork label naming both), :286 (the alternative named
in prose), :291 (generalized stall clock).

Files changed: `skills/orchestrate/SKILL.md`,
`skills/orchestrate/references/reviewer.md`,
`docs/how-it-works/execution.md` (repo content, one commit),
`work/mat-105-raton-seat/PLAN.md` (A3 ticked), this file.

Concerns: none blocking. Two for the reviewer's eye. (1) SKILL.md no
longer spells out the ballena's two argv — it cites
`reference/runners.md` instead. That is the step's own instruction
(single-definition discipline) and A1's forward note is satisfied by the
citation, but an agent grading eval-03:31 must now follow one hop to
read those argv. (2) The `--auto` law is stated in SKILL.md as "Every
launch argv, `--auto` included, is read off `reference/runners.md`"
rather than repeated as a rule; runners.md:40-49 holds the rule and the
MAT-91 evidence, so this is a pointer, not a lost claim.

#### Step A3 — fix round 1 (reviewer finding, Important)

**Finding:** `docs/how-it-works/execution.md:287-288` asserted something
its own skill contradicts — "`reference/runners.md` registers both, and
the skill reads **either** off it rather than restating them". SKILL.md
does not read either off it: its fenced snippet restates the ratón's
argv verbatim (what A3 required), and only the ballena's argv is read
off runners.md. A reader following the sentence to SKILL.md would find a
hardcoded argv where the chapter promised a citation.

**Fix:** the claim narrowed to what is true, one sentence, execution.md
only — "…differ in argv, not in how they launch — `reference/runners.md`
registers both; the skill shows the default's argv with that citation
and reads the alternative's off it rather than duplicating them." This
is exactly the asymmetry the step's own instruction created (ratón argv
verbatim, ballena's cited), now narrated as such: the citation on the
snippet line is still named, so the chapter does not undersell the
provenance comment either.

Nothing else in the file was touched; SKILL.md and reviewer.md are
unchanged from the A3 commit.

Verification: `node scripts/agent-lint.mjs . --ignore
tests,templates,global,examples` → `0 high, 0 medium, 0 low — PASS`,
exit 0 · `node tests/run-eval-checks.mjs` → `all eval checks passed`,
exit 0. A3's acceptance still holds: `grep -c 'ratón'
docs/how-it-works/execution.md` → `6`, and the sentence adds no
`default 1 ballena` string. Wrap: the three rewritten lines are 69, 71
and 36 columns.

Files changed: `docs/how-it-works/execution.md` (the one sentence), this
file.

#### Step A3 review (fresh reviewer, opus) — verdict recorded verbatim

> ### Spec compliance
> ✅ Compliant
>
> **Step quality:** Approved
> **Reasoning:** Every named requirement is implemented, all four
> acceptance conditions and all four gates verify green on the current
> tree, no forbidden file is touched, and the seat-agnostic
> generalization is the right structural call rather than a mechanical
> find-and-replace. The one Important finding is a single false clause
> in the narrating chapter about how the skill it narrates is written —
> worth a one-sentence fix, not a re-do.

The reviewer re-graded eval-03 line by line against the amended
SKILL.md (all graded lines PASS — the ballena fixture stays gradeable
via the generalized stall clock and the runners.md citation) and swept
for stranded references (none; ADR-008's old-default statement stands
as a dated record, ruling in DECISIONS.md).

Important finding (execution.md's argv-citation claim contradicted the
skill) entered the fix loop — fix round 1 commit b9b70d1, scoped
re-review verdict recorded verbatim:

> ### Finding 1 (chapter's argv-citation claim)
> **ADDRESSED** — The false clause ("the skill reads either off it
> rather than restating them") is gone. The new text reads:
> "`reference/runners.md` registers both; the skill shows the default's
> argv with that citation and reads the alternative's off it rather
> than duplicating them." This matches SKILL.md:169-176 [...].
> `node scripts/agent-lint.mjs . --ignore
> tests,templates,global,examples` → `0 high, 0 medium, 0 low — PASS`,
> exit 0.
>
> ### New issues inside the fix's blast radius
> None.

Minor findings (deferred to work-verify's triage):

A3-2. SKILL.md:76-77 — authoring instruction ("named in the same
   question, so neither seat is picked silently") sits inside the
   quoted dialogue question; move to prose below the block.
A3-3. SKILL.md:73-75 — "the house name for the cross-family reviewer
   seat that holds the default on cost" reads as a unique definite for
   a two-member class; suggested "this machine's cheapest cross-family
   reviewer seat".
A3-4. SKILL.md:179-182 — the no-auth fallback clause is grammatically
   parked in the ballena's sentence; a sentence break would remove the
   fast-reader ambiguity.
A3-5. SKILL.md:182-184 — `--auto` demoted from inline rule to
   runners.md pointer; deliberate single-definition trade-off, on
   record in case a future eval grades the skill in isolation.

### Step A4 — Full gate suite + lane bookkeeping current — DONE

Verified DECISIONS.md and PROGRESS.md bookkeeping. DECISIONS.md carries
both required entries: 2026-08-20 amendment ruling ("Owner ruling,
arrived AFTER the lane's M DoD PASS…") and 2026-08-20 Step A1 judgment
("Evals change before content…"). PROGRESS.md truthful: steps A1-A3
completed and recorded with DONE reports and all acceptance conditions
verified.

Ran all four acceptance commands on the current tree:

- `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → `0 high, 0 medium, 0 low — PASS`, exit 0
- `node tests/run-lint-tests.mjs` → `all 20 cases passed`, exit 0
- `node tests/run-gen-tests.mjs` → `all gen cases passed`, exit 0
- `node tests/run-eval-checks.mjs` → `all eval checks passed`, exit 0

Fixed one trivial bookkeeping gap (finding A2-5 from the A2 review):
the wrap-check count in the A2 entry claimed "the five >72 lines" were
pre-existing; the true pre-existing count is 13 non-table lines over 72
columns. Updated the count from "five >72 lines" to "13 non-table lines
pre-existing over 72 columns".

Files changed: `work/mat-105-raton-seat/PROGRESS.md` (evidence slip
corrected), `work/mat-105-raton-seat/PLAN.md` (A4 ticked), this file.
No repo content touched — all gates green.

Concerns: none.

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
