# ae-init artifacts language — progress

## Done

- 2026-08-18 — Step 1 (`judgment`) — added
  `skills/ae-init/evals/eval-04.md`: fresh install on a single-app repo
  whose README, site copy and SEO metadata are Spanish. Query + Fixture +
  Expected behavior in evals 01-03's voice; six checklist lines covering
  (a) the settled-once language question inside the gotcha interview,
  (b) the generated AGENTS.md coming out ENGLISH regardless of README or
  chat language, (c) the split recorded as a gotcha in the canonical
  phrasing, (d) the Spanish surfaces left untouched, (e) the named
  FAILURE CASE — inferring the language from the repo and producing a
  Spanish AGENTS.md, (f) the rest of the fresh-install contract
  unchanged. Commit: `9348063` (eval alone, per the evals-first
  constraint; no SKILL.md or template change — that is step 2).
  - Acceptance `node tests/run-eval-checks.mjs` → exit 0,
    `ok   ae-init: 4 evals well-formed` … `all eval checks passed`.
  - Also ran `node scripts/agent-lint.mjs . --ignore
    tests,templates,global,examples` → exit 0, `0 high, 0 medium, 0 low
    — PASS`.
  - Files changed: `skills/ae-init/evals/eval-04.md` (new).
  - Note: the eval's Query is English and the Spanish signal lives in the
    Fixture prose (owner chats in Spanish, human docs are Spanish), so the
    eval file itself stays an English artifact per the house convention.

- 2026-08-18 — Step 1 review — ✅ Compliant / **Approved** (fresh
  reviewer, opus seat). Three Minor findings deferred to work-verify's
  triage (no fix loop):
  1. eval-04.md:26 — "(step 6 keeps the existing README/LICENSE)"
     cites weaker support than it implies (that SKILL.md line means
     "don't delete", not "don't translate"); drop the parenthetical or
     state the rule directly.
  2. eval-04.md:27 — `FAILURE CASE:` label prefix is new to the repo;
     house register writes negative expectations as "Never…/Does
     not…/Refuses…" lines.
  3. eval-04.md:30-32 — restates four expectations eval-01 owns;
     consider trimming to a pointer so eval-01 stays single source.
  Reviewer's ⚠️: evals-first commit ordering only observable once
  step 2 lands (verify at lane gate).

- 2026-08-18 — Step 2 (`judgment`) — encoded what eval-04 expects.
  (a) `skills/ae-init/SKILL.md` step 3 (gotcha interview) gains six lines
  in the step's voice: the artifacts language is settled once for the
  repo, agent context and technical docs default to ENGLISH, never
  inferred from the README nor from the conversation's language, and on
  divergence the split goes into the generated AGENTS.md as a gotcha in
  the canonical phrasing (agent context and technical docs English; site
  content/SEO/README in the project's own language — never fix one side
  into the other). Placed at the end of step 3 so `Accept "none"` / "never
  invent filler" keep referring to the gotcha and compatibility answers.
  (b) `templates/repo/AGENTS.md.template` gains one two-line HTML comment
  above the title — "Filled in English by convention, whatever language
  the repo's README and human docs use." — matching the house pattern of
  a file-level fill-in comment at the top (`templates/monorepo/
  app-AGENTS.md.template`); instantiation drops these comments, as
  `tests/fixtures/v2-clean/AGENTS.md` shows. Commit: `41a5a92`
  (content alone, after step 1's `9348063` — evals-first ordering now
  observable in `git log`).
  - Acceptance `node scripts/agent-lint.mjs . --ignore
    tests,templates,global,examples` → exit 0, `0 high, 0 medium, 0 low
    — PASS`; `node tests/run-eval-checks.mjs` → exit 0, `ok   ae-init: 4
    evals well-formed` … `all eval checks passed`.
  - Also ran the other two lane gates: `node tests/run-lint-tests.mjs` →
    exit 0, `all 13 cases passed`; `node tests/run-gen-tests.mjs` → exit
    0, `all gen cases passed`.
  - Files changed: `skills/ae-init/SKILL.md`,
    `templates/repo/AGENTS.md.template`.
  - Note on the how-it-works constraint: no chapter enumerates ae-init's
    interview questions — `docs/how-it-works/standard-lifecycle.md:63`
    abstracts them as "profile · gotchas · tier defaults", and the
    language question lands inside "gotchas". Nothing to update, and the
    SPEC's scope fence holds.
  - Fix round 1 (reviewer's Important finding; controller ruling recorded
    in DECISIONS.md — the SPEC's "question joins the interview" means the
    interview asks, so SKILL.md moves and eval-04 stands). Step 3's opener
    stated the default but never instructed an ask, leaving eval-04:15
    ("Asks the language question once during the gotcha interview")
    without an instruction a grader could match. Applied the reviewer's
    wording verbatim: "Ask about the artifacts language here too, and
    settle it once for the repo:". The rewording pushed one line to 94
    chars, so the paragraph is re-wrapped to the file's ~78-col width —
    `awk 'length > 80'` over SKILL.md now reports only line 3, the
    frontmatter `description`, which is one line by format. eval-04
    untouched; Minor findings 2 (blank line before the new ask) and 3
    (coverage observation) left for work-verify's triage as instructed.
    Commit: `dca37ed` (new commit; `41a5a92` left intact).
    - Acceptance re-run: `node scripts/agent-lint.mjs . --ignore
      tests,templates,global,examples` → exit 0, `0 high, 0 medium, 0 low
      — PASS`; `node tests/run-eval-checks.mjs` → exit 0, `ok   ae-init: 4
      evals well-formed` … `all eval checks passed`.
    - Files changed: `skills/ae-init/SKILL.md`.

- 2026-08-18 — Step 2 review — ✅ Compliant / **Approved** (fresh
  reviewer, opus seat). Reviewer re-ran both acceptance commands to
  exit 0 and cleared two named risks (template comment before the H1 is
  lint-safe; how-it-works chapter abstracts the interview, no doc owed).
  Three Minor findings deferred to work-verify's triage (no fix loop):
  1. SKILL.md:53 — "Settle the artifacts language here too" never says
     *ask*; suggest "Ask about the artifacts language here too, and
     settle it once for the repo:".
  2. SKILL.md:52-53 — new lines appended to step 3's paragraph with no
     blank line; a blank line before "Settle" keeps each ask scannable.
  3. Coverage observation (inherent to judgment evals): no mechanical
     tie between eval-04 and SKILL.md content — work-verify confirms by
     reading.

- 2026-08-18 — Fix round 1 (owner amendment, parent dispatch after the
  adversarial FAIL) — re-encoded the zero-friction design in two commits,
  evals first.
  - Commit `c97ae30` (eval alone) — rewrote
    `skills/ae-init/evals/eval-04.md` to grade the amended behavior: the
    human-docs language is INFERRED while exploring, never asked; the
    generated AGENTS.md comes out ENGLISH by the standard's standing
    convention whatever the README's language and whatever language the
    owner writes in; the split gotcha (canonical phrasing, instantiated to
    Spanish) is recorded on its own without asking anyone; a language
    question is now its own failure ("Never asks a language question… A
    question here is friction the convention exists to remove") next to
    the original one ("Never matches the README's language"); language
    enters the interview only if the owner raises it first. The
    chat-language input moved into the Fixture as a standing condition —
    the owner writes in Spanish throughout and never brings language up —
    so it is graded independently of any ask. Structure (## Query /
    ## Fixture / ## Expected behavior, checklist lines, evals 01-03's
    voice) and the fresh-install contract line kept. Two deferred minors
    fixed in passing since the lines were being rewritten anyway: the
    `FAILURE CASE:` label became house-register "Never…" lines, and the
    weakly-supported "(step 6 keeps the existing README/LICENSE)"
    parenthetical is gone.
    - Acceptance `node tests/run-eval-checks.mjs` → exit 0, `ok   ae-init:
      4 evals well-formed` … `all eval checks passed`.
    - Files changed: `skills/ae-init/evals/eval-04.md`.
  - Commit `ab4531b` (content alone, after the eval) — `skills/ae-init/
    SKILL.md` now encodes exactly that. Step 1 (Explore) gains the
    inference where inference already lives: "Also: `docs/`, repo skills,
    `work/` lanes, README — including the language the repo's human docs
    are written in (README, site copy, SEO metadata)." Step 3's six-line
    ask is replaced by a standing default in its own paragraph: never ask
    about the artifacts language and never take it from the language of
    the conversation; agent context and technical docs are always ENGLISH
    by the standard's convention; when step 1 found the human docs in
    another language, add the split to the gotchas without asking
    (canonical phrasing); language enters the interview only if the owner
    raises it. Net +3 lines, no restructuring. `awk 'length > 80'` over
    SKILL.md still reports only line 3, the frontmatter `description`.
    - `templates/repo/AGENTS.md.template` left untouched: its two-line
      HTML comment ("Filled in English by convention, whatever language
      the repo's README and human docs use.") already states the standing
      default and contradicts nothing in the amendment.
    - Acceptance `node scripts/agent-lint.mjs . --ignore
      tests,templates,global,examples` → exit 0, `0 high, 0 medium, 0 low
      — PASS`; `node tests/run-eval-checks.mjs` → exit 0, `all eval checks
      passed`.
    - Files changed: `skills/ae-init/SKILL.md`.
  - All four lane gates re-run at HEAD `ab4531b`: agent-lint → exit 0 (`0
    high, 0 medium, 0 low — PASS`); `node tests/run-lint-tests.mjs` → exit
    0 (`all 13 cases passed`); `node tests/run-gen-tests.mjs` → exit 0
    (`all gen cases passed`); `node tests/run-eval-checks.mjs` → exit 0
    (`ok   ae-init: 4 evals well-formed` … `all eval checks passed`).
  - Scope fence held: `skills/ae-init/**` only; no template change was
    needed, no bump, no CHANGELOG, no restamp. Lane files left uncommitted
    for the controller's lane commit.
  - Note: the SPEC's "one settled-once language question joins the
    interview" wording and PLAN step 1's "the interview asks the
    settled-once language question" now describe the superseded design —
    the DECISIONS.md amendment governs (SPEC is owner-written; the agent
    never edits it).

- 2026-08-18 — Fix round 1 review — ✅ Amendment-compliant /
  **Approved** (fresh reviewer, opus seat; own gate runs at `ab4531b`
  exit 0). Verified: no interview ask survives anywhere in
  skills/ae-init/; inference lives in step 1 (Explore) and the
  auto-write in step 3 with an explicit cross-reference; eval-04
  grades asking as its own failure; canonical phrasing byte-identical;
  template comment already amendment-compatible; scope fence and
  evals-first ordering exact. Important finding (PLAN.md still
  described the superseded ask) fixed by the controller: dated AMENDED
  banner atop PLAN.md's steps pointing at the DECISIONS amendment
  (ruling in DECISIONS.md). Minor findings recorded: fix commits lack
  the Co-Authored-By trailer (kept as-is — ruling in DECISIONS.md);
  follow-up candidates — community files not named by the encoded
  rule, no eval for the non-divergent (all-English) case, reference/
  never states the convention SKILL.md cites.

## In progress

## Tried and failed

- 2026-08-18 — Adversarial (ballena, parent seat) verdict FAIL — not on
  verification (all evidence stands) but on design staleness: a
  mid-flight owner amendment (zero-friction, no interview ask) was sent
  to the dispatch mailbox and never received during the run, so the
  shipped SKILL.md:52-57 ask + eval-04 "Asks the language question
  once" grade the superseded design. Fix round 1 re-encodes the
  amended behavior.

## Next

- Nothing — lane terminal. Parent merges PR #53; the branch is rebased
  clean on origin/main (no-op, main unmoved at abe76bd).

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

### 2026-08-18 — M DoD (fix round 1, amended design) — PASS
- L1 static: `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` → exit 0 (`0 high, 0 medium, 0 low — PASS`)
- L2 behavioral: `node tests/run-lint-tests.mjs` → exit 0 (`all 13 cases
  passed`); `node tests/run-gen-tests.mjs` → exit 0 (`all gen cases
  passed`); `node tests/run-eval-checks.mjs` → exit 0 (`all eval checks
  passed`). All run at HEAD `ab4531b`, this session, by the controller;
  the fix reviewer's own runs at `ab4531b` also exit 0.
- L3 end-to-end: n/a: single component (unchanged).
- Fresh-context review (scoped to the fix, fresh opus seat):
  **Approved / amendment-compliant** — no interview ask survives,
  inference + auto-write encoded where an installing agent follows
  them, eval-04 grades asking as its own failure, canonical phrasing
  byte-identical, scope fence and evals-first ordering exact. Its
  Important finding (stale PLAN.md wording) fixed via AMENDED banner
  before this block.
- Adversarial review (ballena, parent seat): re-verdict **PASS** — all
  four findings ADDRESSED (parent's close-out dispatch, 2026-08-18).
  The prior FAIL was design staleness (superseded design, not
  evidence); fix round 1 re-encoded the amendment.

### 2026-08-18 — M DoD — PASS
- L1 static: `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` → exit 0 (`0 high, 0 medium, 0 low — PASS`)
- L2 behavioral: `node tests/run-lint-tests.mjs` → exit 0 (`all 13 cases
  passed`); `node tests/run-gen-tests.mjs` → exit 0 (`all gen cases
  passed`); `node tests/run-eval-checks.mjs` → exit 0 (`ok   ae-init: 4
  evals well-formed` … `all eval checks passed`). All run at HEAD
  `dca37ed`, this session.
- L3 end-to-end: n/a: single component (markdown skill + one template
  comment; no cross-component flow).
- Fresh-context review: **PASS** (opus seat, own runs of all four gates
  exit 0; verified evals-first commit ordering `9348063` → `41a5a92`,
  scope fence exact, no bump/CHANGELOG/restamp). One Important finding
  (SKILL.md stated the default but never instructed the ask) → fixed in
  `dca37ed` (ruling in DECISIONS.md), scoped re-review verdict
  **ADDRESSED — PASS stands**, reviewer's own re-runs at `dca37ed` exit 0.
- Adversarial review (ballena, opencode-go/deepseek-v4-flash): pending —
  the PARENT's seat, launched after this worker's worker_done per the
  dispatch brief; not run inside this lane.
- Deferred minors (triaged, cosmetic, recorded above in step reviews):
  eval-04 register/citation polish (FAILURE CASE label, README/LICENSE
  parenthetical, eval-01 restatement), blank-line scannability in
  SKILL.md step 3, monorepo app-template note (follow-up ticket
  candidate).

<!-- First read of every session. If it isn't here, it didn't happen. -->
