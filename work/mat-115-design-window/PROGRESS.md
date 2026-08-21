---
issue: MAT-115
---
# The design-first approval window — progress

## Done

- **SPEC.md** written from the parent orchestrator's dispatch brief
  (work-plan design-first, step 1), then the lane **stopped** for owner
  approval.
- **The window was dogfooded, and the bug reproduced in it.** PROGRESS.md
  was written at the SPEC step carrying the marker this lane introduces —
  the exact behavior leg 1 adds to work-plan — so for the length of the
  approval wait this lane held SPEC.md + PROGRESS.md and no PLAN.md.
  During that window:

  ```
  $ node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-115-design-window
    MEDIUM work/mat-115-design-window/  lane missing PLAN.md  [lane-incomplete]
  0 high, 1 medium, 0 low — FAIL
  $ echo $?
  1
  ```

  MAT-115 observed on the lane that fixes it, not inferred from reading
  the source. It also confirms the SPEC's sharpening of the ticket's
  mitigating nuance: this lane was untracked at the time, and the finding
  fired anyway, because `agent-lint` walks the filesystem rather than the
  index.
- **Owner approval received** (parent orchestrator, 2026-08-21): SPEC
  approved as written, all judgment calls confirmed as the lane's own.
  Recorded in DECISIONS.md.
- **PLAN.md** written — six steps, every one `per-step`, with the marker
  and the fixture/case names fixed in the interface block so steps 3 and
  4 cannot drift apart. Writing PLAN.md **ends the approval window**, so
  the marker line was removed from this file: leaving it would have made
  PROGRESS.md state something untrue about the lane.
- **Reviewer seat verified live** before relying on it
  (`reference/runners.md` verify-on-install, work-run step 2): `opencode
  run --auto -m opencode/x-preview-f-free` returned the requested output
  one-shot, exit 0, in this worktree on 2026-08-21. Chain position 1 is
  alive; no degradation needed at settle time.
- **Step 1 — `skills/work-plan/evals/eval-05.md` amended, evals-first**
  (PLAN step 1): the existing design-first assertions (a) are untouched;
  gained two companions — the same SPEC.md turn also writes
  `work/<slug>/PROGRESS.md` under `## In progress` carrying the marker
  verbatim (quoted in full in the eval), and PLAN.md still does not
  appear alongside it. Added the negative for direct mode (b): it never
  writes the marker, because it has no approval window to declare.
  eval-05 was not duplicated — amended in place, per SPEC §1.

  ```
  $ grep -q 'STATE: design-first approval window, waiting for owner approval of SPEC.md before PLAN.md' skills/work-plan/evals/eval-05.md && echo MARKER_OK
  MARKER_OK
  $ grep -q 'direct' skills/work-plan/evals/eval-05.md && echo DIRECT_OK
  DIRECT_OK
  $ node tests/run-eval-checks.mjs
  ok   work-plan: 6 evals well-formed
  ... (all other skills ok)
  all eval checks passed
  $ echo $?
  0
  ```

- **Step 1 review — command-mode sigiloso (`opencode/x-preview-f-free`,
  chain position 1, no degradation), verdict verbatim:**

  > ### Spec compliance
  > Compliant — eval-05.md:38-48 implements exactly what the step requires:
  > amended in place (not duplicated), existing design-first assertions
  > untouched (diff context lines confirm), companion assertion added for the
  > same-turn PROGRESS.md write with the marker quoted in full under
  > `## In progress`, PLAN-absence re-asserted against the new artifact, and
  > the direct-mode negative placed correctly inside the (b) group. Marker
  > verified byte-for-byte via `cat -A`: pure ASCII, no em dash, exact match
  > to SPEC's fixed string. Acceptance command run: exit 0, all 13 eval
  > suites green ("work-plan: 6 evals well-formed"). Repo-wide grep confirms
  > the marker currently lives only in eval-05.md — no leakage into
  > unintended sites.
  >
  > ### Issues
  > #### Critical (Must Fix)
  > None.
  >
  > #### Important (Should Fix)
  > - **PLAN.md:166 (step 6 acceptance) vs this step's required content** —
  > step 6's gate counts files matching the marker under `skills`+`scripts`
  > and demands `-eq 2`. Once steps 2 and 4 land, three files will match:
  > `skills/work-plan/SKILL.md`, `skills/work-plan/evals/eval-05.md` (this
  > step, which the PLAN itself mandates quote the marker in full), and
  > `scripts/agent-lint.mjs`. The final gate is unsatisfiable as written.
  > Risk named, check made: repo-wide grep run (above) confirming eval-05.md
  > will be a third match site. Fix: this is a plan defect, not a defect in
  > this diff — route to the parent as an ask to amend step 6's accept (e.g.
  > exclude `evals/` from the grep path, since the intent "two
  > source-of-truth sites" means SKILL.md and agent-lint.mjs; the eval is an
  > assertion *about* the sites, not a site). No change to eval-05.md is
  > warranted.
  >
  > #### Minor (Nice to Have)
  > - eval-05.md:56-57 — the truncated prose reference
  > `` `STATE: design-first approval window...` `` re-types a partial marker
  > rather than pointing at the block above. Harmless today (full quote is 12
  > lines up), but a future editor skimming could mistake the truncated form
  > for the string. Could read "the marker quoted above" instead.
  >
  > ### Assessment
  > **Step quality:** Approved
  > **Reasoning:** The diff implements every element of the step —
  > amendment-not-duplication, preserved assertions, verbatim full-quote
  > marker (byte-verified ASCII), and the direct-mode negative — and its
  > acceptance gate exits 0. The one Important finding is an arithmetic
  > conflict in PLAN step 6's future gate caused by this step's mandated eval
  > quote; it requires a parent decision on the plan, not any change to this
  > step's output.

  **Controller response.** Approved, no fix round. The Important finding is
  a defect in this lane's own PLAN, not in the diff, and it resolves against
  the SPEC without a parent ask: the SPEC's phrase is "two **source-of-truth**
  sites", and an eval that quotes the marker to assert what "verbatim" means
  is an assertion about those sites, not a third one. Step 6's acceptance is
  amended to exclude `evals/` from the count (DECISIONS.md, 2026-08-21) —
  a correction to the gate's spelling, not to its claim. The Minor finding
  is recorded as deferred for work-verify's triage.

- **Step 2 — `skills/work-plan/SKILL.md` amended, design-first writes
  PROGRESS.md** (PLAN step 2): step 1's design-first bullet now says the
  same turn that writes SPEC.md **also** writes
  `work/<slug>/PROGRESS.md` under `## In progress`, carrying the marker
  verbatim, followed by a `change both together` line naming
  `scripts/agent-lint.mjs`'s work-lanes section as the site that reads
  the same string. The direct bullet is untouched. Two more spots
  corrected so the file stops contradicting itself: the workflow
  checklist's step 1 line (was "design-first writes SPEC.md and
  stops"; now names the PROGRESS.md marker too), and step 6's "Save"
  line, which said nothing about the marker ever being removed — it now
  states that saving PLAN.md in design-first mode ends the window and
  the marker line comes out of PROGRESS.md the same turn. The direct
  bullet stays as written, per SPEC. Recorded in DECISIONS.md: the
  judgment on `templates/repo/work/PROGRESS.md.template` is to leave it
  unchanged — the marker is a transient state only design-first lanes
  enter, and baking it into the shared scaffold would write a false
  state into every direct-mode lane from creation.

  ```
  $ grep -q 'STATE: design-first approval window, waiting for owner approval of SPEC.md before PLAN.md' skills/work-plan/SKILL.md && echo MARKER_OK
  MARKER_OK
  $ grep -q 'change both together' skills/work-plan/SKILL.md && echo CBT_OK
  CBT_OK
  $ grep -q 'scripts/agent-lint.mjs' skills/work-plan/SKILL.md && echo PATH_OK
  PATH_OK
  $ grep -q 'PROGRESS.md.template' work/mat-115-design-window/DECISIONS.md && echo TEMPLATE_OK
  TEMPLATE_OK
  $ node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-115-design-window
  0 high, 0 medium, 0 low — PASS
  $ node tests/run-eval-checks.mjs
  ... all eval checks passed
  $ echo $?
  0
  ```

  (Lint reports 0/0/0 PASS here rather than the earlier `lane missing
  PLAN.md` MEDIUM: this lane's own PLAN.md already exists by this point
  in the session, so its approval window is long over — the marker's
  reproduction of MAT-115 was captured live back at the SPEC step, above.)
  Also re-ran `node tests/run-lint-tests.mjs` (22/22 `ok`) and
  `node tests/run-gen-tests.mjs` (7/7 `ok`) as a sanity check beyond this
  step's own accept command; both exit 0, confirming step 2 didn't
  disturb the suites steps 3-4 will extend next.

- **Step 2 review — command-mode sigiloso (`opencode/x-preview-f-free`,
  chain position 1, no degradation), verdict verbatim:**

  > ### Spec compliance
  >
  > **Compliant** — both halves of the step land as specified, with one
  > provenance warning:
  >
  > - **Marker byte-for-byte**: verified programmatically — SKILL.md:76,
  > eval-05.md:43, SPEC.md:71 and DECISIONS.md:13 all contain the identical
  > string `STATE: design-first approval window, waiting for owner approval
  > of SPEC.md before PLAN.md`, ASCII-only (no U+2014, no drift). Not a
  > paraphrase.
  > - **Checklist line 1** (SKILL.md:29-31): corrected [...] consistent with
  > the body. **Step 6 Save line** (SKILL.md:179-181): corrected so the file
  > doesn't contradict itself. **Direct bullet** (SKILL.md:83-86):
  > unchanged, no marker acquired. Verified.
  > - **Warning:** [the DECISIONS.md entry] is absent from the diff file —
  > the diff contains only the SKILL.md hunk. I read DECISIONS.md directly
  > because the accept criteria grep it; the entry exists in the checkout,
  > is content-compliant [...] Flagging so the controller knows the diff
  > artifact doesn't cover the whole step.
  > - **Gates**: agent-lint → 0 findings, exit 0; run-eval-checks → all
  > suites well-formed (work-plan: 6 evals), exit 0.
  >
  > ### Issues
  >
  > #### Critical (Must Fix)
  > None.
  >
  > #### Important (Should Fix)
  > None.
  >
  > #### Minor (Nice to Have)
  >
  > 1. **skills/work-plan/SKILL.md:114,179-181 — marker removal is
  > unreachable for XL design-first lanes.** The removal rule lives in step
  > 6, but line 114 scopes steps 3-6 to M/L; an XL design-first parent lane
  > writes the marker at step 1 and the parent PLAN.md at step 2, so a
  > literal reading leaves the marker stale permanently. Small rot by
  > construction (the SPEC deliberately defers stale-marker policing), but
  > placing the removal rule mode-scoped — or one clause noting it applies
  > wherever PLAN.md lands, parent plan included — would close the asymmetry
  > this diff introduces between unconditional write and conditional
  > removal.
  > 2. **skills/work-plan/evals/eval-05.md:56 — truncated prose reference
  > contains an em dash.** Pre-existing from step 1 and already triaged as
  > deferred-Minor [...] Not actionable in this step.
  >
  > ### Assessment
  > **Step quality:** Approved
  > **Reasoning:** Both required artifacts land exactly as specified — the
  > marker is byte-identical and ASCII-only across all sites, the three
  > in-file surfaces now describe one coherent behavior, the direct bullet
  > is clean, and both gates exit 0. The only findings are a
  > wording-placement nit and a provenance warning about the diff file
  > omitting the DECISIONS.md hunk whose compliant content I verified
  > directly.

  **Controller response.** Approved, no fix round — no Critical, no
  Important. Both Minors go to work-verify's triage, deferred here rather
  than dropped:

  1. **XL design-first leaves the marker stale.** Real asymmetry this diff
     introduced (unconditional write in step 1, removal rule in step 6,
     which line 114 scopes to M/L). Carried into triage as a candidate fix,
     not a wontfix — it is one clause, and the reviewer is right that the
     hole is of this change's own making.
  2. **eval-05.md:56 truncated prose reference.** Already deferred from the
     step 1 review; the em dash sits in a truncation that cannot match the
     check's grep, so it is cosmetic.

  **Controller correction to its own procedure.** The provenance warning is
  fair and is the controller's packaging error, not the implementer's: the
  step-2 diff was cut as `git diff -- skills/`, which dropped the
  DECISIONS.md half of a step that explicitly required it. From step 3 on,
  the diff package covers every path the step's deliverable touches, minus
  PROGRESS.md (which carries the implementer's own report, not the work).

- **Step 3 — `tests/` fixtures first, new case RED** (PLAN step 3):
  built `tests/fixtures/lane-window-ok/` (pointer `CLAUDE.md`, stamped
  `AGENTS.md`, single lane `work/demo-lane/` holding `SPEC.md` plus a
  `PROGRESS.md` whose `## In progress` carries the marker verbatim, no
  `PLAN.md` — otherwise lint-clean, confirmed by running the lint
  directly: its only finding is the one `lane-incomplete` MEDIUM this
  lane exists to prove missing) and
  `tests/fixtures/lane-window-near-miss/` (identical shape, one lane,
  `PROGRESS.md` paraphrasing the marker — comma swapped for an em dash,
  "owner approval of SPEC.md" reordered to "SPEC.md's owner approval").
  Added both cases to `tests/run-lint-tests.mjs` under the exact names
  fixed in PLAN's interface block. Extended `lanes-bad` with a SPEC-only
  lane at `work/spec-only/SPEC.md` (no PROGRESS.md, no PLAN.md) and added
  `expectMatch: ["lane missing PLAN.md", "lane missing PROGRESS.md"]` to
  its existing case — the PROGRESS.md message is unique to `spec-only`
  in that fixture (`Bad_Slug` only produces the PLAN.md one), so it pins
  the right lane. `scripts/agent-lint.mjs` was not touched.

  Run before step 4 (red-before-green evidence):

  ```
  $ node tests/run-lint-tests.mjs 2>&1
  ...
  ok   malformed lanes fail
  FAIL design-first approval window lane passes without PLAN.md
    expected fail=false, got true
    unexpected finding "lane-incomplete"
    findings: lane-incomplete
  ok   near-miss marker text does not exempt a lane
  ...
  1/24 cases failed
  ```

  Direct lint run on the new fixture, confirming it is otherwise
  lint-clean (the only finding is the exact one the lane exists to fix):

  ```
  $ node scripts/agent-lint.mjs tests/fixtures/lane-window-ok
  agent-lint .../tests/fixtures/lane-window-ok
    MEDIUM work/demo-lane/  lane missing PLAN.md  [lane-incomplete]
  0 high, 1 medium, 0 low — FAIL
  ```

  Accept command:

  ```
  $ node tests/run-lint-tests.mjs 2>&1 | grep -q '^FAIL design-first approval window lane passes without PLAN.md' && node tests/run-lint-tests.mjs 2>&1 | grep -q '^ok   near-miss marker text does not exempt a lane' && node tests/run-lint-tests.mjs 2>&1 | grep -q '^ok   malformed lanes fail'
  $ echo $?
  0
  ```

  Sanity check beyond this step's own accept: `node tests/run-gen-tests.mjs`
  (all cases passed, exit 0) and `node tests/run-eval-checks.mjs` (all
  eval checks passed, exit 0) both still green — this step didn't disturb
  the other two suites. `node scripts/agent-lint.mjs . --ignore
  tests,templates,examples` on the whole repo is untouched by this step
  since `tests/` is excluded from the self-lint; not re-run here as a gate
  (step 6 owns the full gate sweep).

- **Step 3 review — command-mode sigiloso (`opencode/x-preview-f-free`,
  chain position 1, no degradation), verdict verbatim:**

  > ### Spec compliance
  >
  > **Compliant** — every element of the step lands as specified, and each
  > high-risk claim was verified against the checkout, not just the diff:
  >
  > 1. **Marker byte-for-byte** (highest-risk line): compared
  > `tests/fixtures/lane-window-ok/work/demo-lane/PROGRESS.md`
  > programmatically against the SPEC "The marker" string — exact substring
  > match, pure ASCII (no em dash, no smart quotes). Identical to the PLAN
  > interface block.
  > 2. **Near-miss precision**: directory listing confirms
  > `lane-window-near-miss` holds exactly one lane (`work/demo-lane/`). Its
  > STATE line drifts on two independent axes — em dash for the comma, word
  > reorder — and programmatic check confirms the exact marker is **not** a
  > substring. Any `lane missing PLAN.md` it emits can only be that lane's.
  > 3. **Otherwise lint-clean**: ran the suite — `lane-window-ok`'s complete
  > finding set is `{lane-incomplete}` alone. No stamp-shape, pointer-shape,
  > budget, or structure noise, so today's red is attributable to exactly
  > the state the lane exists to prove, and step 4 can only turn it green by
  > learning the window.
  > 4. **Red in exactly one case**: full suite run shows `1/24 cases failed`
  > — only `design-first approval window lane passes without PLAN.md`; all
  > 23 others `ok`, including both negatives. Acceptance command verbatim:
  > exit 0.
  > 5. **`scripts/agent-lint.mjs` absent** from the diff entirely — only
  > `tests/fixtures/*` and `tests/run-lint-tests.mjs` touched.
  >
  > [...] I confirmed the harness already implements `expectMatch`
  > (tests/run-lint-tests.mjs:265-267), so the assertions are live, not
  > silent no-ops. Direct lint of `lanes-bad` shows the spec-only lane
  > introduced no unasserted finding codes, and `lane missing PROGRESS.md`
  > is uniquely spec-only's (`Bad_Slug` produces only the PLAN.md one) — the
  > pin attributes correctly.
  >
  > ### Issues
  >
  > #### Critical (Must Fix)
  > None.
  >
  > #### Important (Should Fix)
  > None.
  >
  > #### Minor (Nice to Have)
  >
  > 1. **tests/run-lint-tests.mjs:142 — `lane missing PLAN.md` is
  > ambiguously attributed in `lanes-bad`.** Both `Bad_Slug` and
  > `spec-only` emit it, so that half of the `expectMatch` proves less than
  > the other half. This is exactly what the PLAN prescribed (and the case
  > comment honestly names the PROGRESS.md message as the precise pin), so
  > no action in this step — noting only that if the harness ever grows
  > per-lane scoping, that half could tighten.
  >
  > ### Assessment
  > **Step quality:** Approved
  > **Reasoning:** All five judged requirements verified with direct
  > evidence — byte-exact ASCII marker, single-lane near-miss free of the
  > exact string, provably otherwise-clean fixtures, a red isolated to
  > precisely one case with only the expected finding code, and the linter
  > untouched. The negatives are pinned with message-level assertions the
  > harness genuinely enforces, and the red-before-green transcript is on
  > record in the lane's PROGRESS.md.

  **Controller response.** Approved, no fix round. The single Minor is the
  PLAN's own deliberate tradeoff, already named in the PLAN's interface
  block ("`lane-window-near-miss` holds exactly one lane, so any
  `lane missing PLAN.md` the fixture emits can only be that lane's") — the
  precise pin for the SPEC-only lane is the PROGRESS.md message, and the
  PLAN.md half is corroboration, not the assertion. No harness change is
  bought for it in this lane.

  **The red, on record, before the check learns anything:**

  ```
  $ node tests/run-lint-tests.mjs
  ok   malformed lanes fail
  FAIL design-first approval window lane passes without PLAN.md
  ok   near-miss marker text does not exempt a lane
  1/24 cases failed
  $ echo $?
  1
  ```

- **Step 4 — `scripts/agent-lint.mjs`, `lane-incomplete` becomes
  lifecycle-aware** (PLAN step 4): in the work-lanes section, right above
  the existing lane-collection loop, defined `DESIGN_WINDOW_MARKER` as a
  module constant — same pattern as `ENTRY_SKILL_CAP` above it (a comment
  naming the paired site, then the const) — carrying the exact marker
  string and a `change both together` comment naming
  `skills/work-plan/SKILL.md` step 1 as the site that writes it. In the
  per-lane loop, `hasProgress` and `inApprovalWindow` are computed once
  per lane (`inApprovalWindow` reads `work/<slug>/PROGRESS.md` via the
  existing `read()` helper and checks the marker is a substring), then
  the `required` loop over `["PLAN.md", "PROGRESS.md"]` skips only the
  `PLAN.md` iteration when `inApprovalWindow` is true — `PROGRESS.md`'s
  own iteration is never skipped, so a lane without PROGRESS.md still
  fires both findings (SPEC §5, DoD item 2). Code, severity and message
  text (`add("medium", "lane-incomplete", ...)`) are byte-identical to
  before for every other lane; only the loop's control flow gained one
  `continue`. `tests/` was not touched.

  ```
  $ node tests/run-lint-tests.mjs
  ok   ... (24 cases)
  ok   design-first approval window lane passes without PLAN.md
  ok   near-miss marker text does not exempt a lane
  ok   malformed lanes fail
  all 24 cases passed
  $ node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-115-design-window
  0 high, 0 medium, 0 low — PASS
  $ node tests/run-gen-tests.mjs
  all gen cases passed
  $ node tests/run-eval-checks.mjs
  ... all eval checks passed
  $ echo $?
  0
  ```

  Step 3's red case (`design-first approval window lane passes without
  PLAN.md`) is now `ok` — 24/24 cases pass, up from 1/24 failing. `git
  diff --stat` confirms only `scripts/agent-lint.mjs` changed (14
  insertions, 1 deletion), nothing under `tests/`, matching the
  constraint that fixtures are the spec this step must satisfy without
  editing them.

- **Step 4 review — command-mode sigiloso (`opencode/x-preview-f-free`,
  chain position 1, no degradation), briefed adversarially because this is
  the lane's only diff that relaxes a shipped check. Verdict verbatim:**

  > ### Spec compliance
  >
  > Compliant — every requirement of step 4 is implemented, nothing extra,
  > nothing misunderstood. Verified against SPEC §5 and the four acceptance
  > gates (all exit 0, run just now).
  >
  > **Adversarial checks performed:**
  >
  > 1. **Lane-shape enumeration** (scripts/agent-lint.mjs:249-256). [...]
  > Every shape:
  >    - (a) SPEC only, no PROGRESS → `hasProgress=false`, window
  >      unreachable → **both findings fire** (SPEC §4 pinned case holds)
  >    - (b) PROGRESS without marker, no PLAN → fires `lane missing PLAN.md`
  >      only
  >    - (c) PROGRESS with marker, no PLAN → PLAN finding skipped — the one
  >      exemption
  >    - (d) marker + PLAN present → clean, same as before
  >    - (e) no lane files → slug never enters the map, silent, unchanged
  >    - (f) PLAN present, PROGRESS absent → `hasProgress=false` → fires
  >      `lane missing PROGRESS.md`
  >
  >    No shape stopped firing except (c). Code, severity (`medium`) and
  >    message text are untouched for all others — the loop restructure is
  >    behavior-preserving when `inApprovalWindow` is false.
  >
  > 2. **Marker byte-for-byte**: extracted the constant via regex from
  > agent-lint.mjs and substring-tested it against
  > `skills/work-plan/SKILL.md`, the SPEC, and PLAN.md — all match; 89
  > chars, zero non-ASCII bytes. No drift between legs.
  > 3. **Paired comment** (agent-lint.mjs:226-228): names
  > `skills/work-plan/SKILL.md` by path, says "change both together", sits
  > directly above the constant — same shape as the `ENTRY_SKILL_CAP`
  > precedent at lines 211-215.
  > 4. **Crash safety**: [...] `read()` is short-circuited behind
  > `hasProgress`, so it only runs on a regular file confirmed to exist at
  > walk time. Residual risk: an unreadable (EACCES) PROGRESS.md would throw
  > — but that matches the script's existing unguarded-read convention
  > everywhere else [...] so it introduces no new fragility class.
  > 5. **`tests/` absent from the diff**: confirmed [...] Fixtures untouched.
  > 6. **Anchoring**: whole-file substring over PROGRESS.md only. Quotes of
  > the marker in a lane's SPEC/DECISIONS/PLAN cannot exempt anything — only
  > PROGRESS.md is read. [...] line-start anchoring would break the shipped
  > `- STATE: …` bullet form. Right call.
  >
  > ### Issues
  >
  > #### Critical (Must Fix)
  > None.
  >
  > #### Important (Should Fix)
  > None.
  >
  > #### Minor (Nice to Have)
  >
  > - **scripts/agent-lint.mjs:251** — an EACCES-unreadable PROGRESS.md
  > would crash the lint where the work-lanes section previously did no I/O.
  > Consistent with the script's convention everywhere else, and a lint
  > crash is loud rather than silently wrong, so this is polish [...] Fine
  > to defer.
  >
  > ### Assessment
  > **Step quality:** Approved
  > **Reasoning:** The relaxation is scoped to exactly one state with two
  > independent guards, the marker is byte-identical across both legs
  > (verified, ASCII-only), all six lane shapes behave as the SPEC pins
  > them, and all four acceptance gates exit 0 with the new positive and
  > near-miss cases demonstrably exercised.

  **Controller response.** Approved, no fix round. The Minor (EACCES read)
  goes to work-verify's triage with a controller lean toward WONTFIX: every
  other read in `scripts/agent-lint.mjs` is unguarded, so a `try/catch` here
  alone would make this one call site inconsistent with the file's
  convention without removing the class of failure. Recorded, not dropped.

  **Red → green, the same suite, one commit apart:**

  ```
  before (18231cd): FAIL design-first approval window lane passes without PLAN.md
                    1/24 cases failed                                   exit 1
  after  (44438e6): node tests/run-lint-tests.mjs                       exit 0
                    node scripts/agent-lint.mjs . --ignore tests,templates,examples  exit 0
                    node tests/run-gen-tests.mjs                        exit 0
                    node tests/run-eval-checks.mjs                      exit 0
  ```

- **Step 5 — `docs/how-it-works/work-lifecycle.md` corrected, four
  chapters judged unchanged** (PLAN step 5, SPEC §6): the design-first
  sentence under "The lane lifecycle" — "which writes SPEC.md alone and
  stops for the owner's approval before shaping PLAN.md" — now reads
  "which writes SPEC.md, then in the same turn writes `PROGRESS.md`
  declaring the design-first approval window, and stops for the owner's
  approval before shaping PLAN.md". The chapter's `PROGRESS.md` bullet
  under "The lane and the four files" gained one sentence naming the
  design-first approval window as a state the file can carry before
  `PLAN.md` exists, and pointing at `agent-lint`'s `lane-incomplete`
  check as the reader of that same line.

  The other four candidate chapters (`architecture.md`,
  `standard-lifecycle.md`, `execution.md`, `integrations.md`) plus
  `docs/how-it-works/README.md` were grepped for `work-plan`,
  `agent-lint`, `SPEC.md`, `lane`, `design-first`, `lane-incomplete`,
  `PROGRESS.md`, and each hit read in context. None of the five describes
  design-first's mode behavior at the level of detail that went false —
  they either cross-reference `work-lifecycle.md` or describe the skill
  chain above mode detail. Verdict for all five: no change, recorded in
  DECISIONS.md with the reasoning per file (SPEC §6's "silent no-change
  is indistinguishable from an unexamined one").

  ```
  $ ! grep -q 'writes SPEC.md alone' docs/how-it-works/work-lifecycle.md && grep -q 'design-first approval window' docs/how-it-works/work-lifecycle.md && grep -q 'how-it-works' work/mat-115-design-window/DECISIONS.md && node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-115-design-window
  0 high, 0 medium, 0 low — PASS
  $ echo $?
  0
  ```

  Sanity check beyond this step's own accept: `node tests/run-lint-tests.mjs`
  (24/24 `ok`), `node tests/run-gen-tests.mjs` (all gen cases passed),
  `node tests/run-eval-checks.mjs` (all eval checks passed) — all exit 0.
  `git status --short` confirms only `docs/how-it-works/work-lifecycle.md`
  and `work/mat-115-design-window/DECISIONS.md` changed in this step.

- **Step 5 review — command-mode sigiloso (`opencode/x-preview-f-free`,
  chain position 1, no degradation), verdict verbatim:**

  > ### Spec compliance
  > Compliant
  >
  > What I checked, concretely:
  >
  > 1. **New sentences vs shipped behavior.** [...] The corrected mode
  > sentence [...] matches SKILL.md step 1 exactly (SPEC → STOP →
  > same-turn PROGRESS.md with the marker → PLAN.md only after approval).
  > The PROGRESS.md bullet [...] claims `lane-incomplete` "reads that same
  > line to recognize the window" — true: agent-lint.mjs:249-253 exempts
  > missing PLAN.md only when PROGRESS.md exists *and* contains the exact
  > marker [...] Neither imprecision flagged in the brief is present.
  > 2. **Every named chapter judged.** DECISIONS.md entry (2026-08-21)
  > carries an explicit verdict with a stated reason for all five [...]
  > Not a blanket "rest are fine".
  > 3. **Spot-checks (three done).** (a) `architecture.md`:97 [...] verdict
  > holds. (b) `standard-lifecycle.md`:66-67 [...] verdict holds. (c)
  > `integrations.md`:130 [...] verdict holds.
  > 4. **Never-touch paths.** Diff touches only
  > `docs/how-it-works/work-lifecycle.md` and
  > `work/mat-115-design-window/DECISIONS.md`. Clean.
  > 5. **No version/restamp.** New text carries no version number.
  >
  > ### Issues
  > #### Critical (Must Fix)
  > None.
  >
  > #### Important (Should Fix)
  > None.
  >
  > #### Minor (Nice to Have)
  > - `work/mat-115-design-window/DECISIONS.md:146` — the entry heading says
  > "**four** chapters judged unchanged" but the body records **five**
  > no-change verdicts [...] as written it miscounts against the step's own
  > list of five files. Append-only file, so fix via a one-line correcting
  > append, not an edit.
  > - `docs/how-it-works/work-lifecycle.md:81-86` — the bullet doesn't
  > mention that the marker is removed when PLAN.md lands (SKILL.md step 6).
  > Its "before `PLAN.md` even exists" phrasing already bounds it and the
  > chapter delegates mode detail to the skill doc, so this is polish, not
  > error [...]
  >
  > ### Assessment
  > **Step quality:** Approved
  > **Reasoning:** Both required edits land and are verifiably true against
  > SKILL.md step 1/step 6 and agent-lint's work-lanes logic; all five
  > judgments are individually recorded and the three spot-checked ones hold
  > against the actual files; the acceptance command exits 0 with no
  > never-touch path violated.

  **Controller response.** Approved, no fix round. Minor 1 is a factual
  error in the lane's own record rather than in the shipped diff, and the
  reviewer named the right remedy for an append-only file: a correcting
  entry now stands in DECISIONS.md (2026-08-21, "it is FIVE chapters
  judged, not four"). Minor 2 goes to work-verify's triage with the other
  deferred items.

- **Step 6 — gate sweep + the lane's own invariants.** Pure verification,
  no source changes: the four gates plus the three machine-checked
  invariants the SPEC makes about the shape of the change, all against
  the state steps 1-5 already left behind.

  ```
  $ node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-115-design-window
    0 high, 0 medium, 0 low — PASS
  $ node tests/run-lint-tests.mjs
  ... (24 cases) ...
  all 24 cases passed
  $ node tests/run-gen-tests.mjs
  ... all gen cases passed
  $ node tests/run-eval-checks.mjs
  ... all eval checks passed
  ```

  Invariant proofs (DECISIONS.md 2026-08-21, "step 6's marker count
  excludes `evals/`"):

  ```
  $ grep -rl --exclude-dir=evals 'STATE: design-first approval window, waiting for owner approval of SPEC.md before PLAN.md' skills scripts
  skills/work-plan/SKILL.md
  scripts/agent-lint.mjs
  $ grep -n 'skills/work-plan/SKILL.md' scripts/agent-lint.mjs
  226:// design-first lanes (skills/work-plan/SKILL.md step 1) write this exact
  $ git diff --name-only main...HEAD -- CHANGELOG.md AGENTS.md README.md reference examples templates .claude
  (empty)
  ```

  Marker lives in exactly the two source-of-truth sites named by PLAN.md's
  interface block (`skills/work-plan/SKILL.md`, `scripts/agent-lint.mjs`);
  `evals/eval-05.md`'s verbatim quote does not count toward that total
  (excluded by `--exclude-dir=evals`, per the step-1 review finding
  adjudicated in DECISIONS.md); `agent-lint.mjs` names its paired site by
  path; and no forbidden path (`CHANGELOG.md`, `AGENTS.md`, `README.md`,
  `reference/`, `examples/`, `templates/`, `.claude/`) moved anywhere in
  the branch diff against `main`. The full acceptance command, chained
  exactly as PLAN.md states it, exits 0.
  - Files touched: none (verification only).
  - No concerns: every gate and every invariant is green against the
    lane's existing state; nothing needed papering over.

## In progress

- work-run executing PLAN steps 1-6 in order. All six steps done.

## Tried and failed

- The first `orca orchestration ask` for SPEC approval timed out at
  900 s with no answer (thread `msg_287612c3b824`). Resumed the **same**
  question by id rather than asking a duplicate; the parent answered on
  the resumed thread and explained the batch it had acked unread.

## Next

- Steps 1-6 per PLAN.md, then work-verify (M-tier DoD), then
  work-handoff, then the PR carrying `Closes MAT-115`.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
