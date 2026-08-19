# MAT-83 + MAT-84 scale polish — progress

## Done

- SPEC.md written (design-first) and approved by the parent via blocking
  ask; ruling recorded in DECISIONS.md (2026-08-19).
- PLAN.md shaped: 8 steps, constraints block, eval-07 before content.

### Step 1 DONE — tracker.md trimmed to the reference budget (179 → 120)

`reference/tracker.md` now sits at 120 lines (SPEC item 1) and its head
citation tracks the Concepts page (SPEC item 4).

What changed:

- **Head citation** — the looser "an issue sits in at most one project;
  initiatives group projects" replaced by "an issue belongs to a team and
  can be added to a project; an initiative can contain multiple projects",
  re-read date bumped to 2026-08-19.
- **The GitHub plane** (31 → 13 lines, header kept — execution.md names the
  plane): the normative rules stay (PRs/PR comments are GitHub-native;
  GitHub issues are not intake, the tracker is the single intake plane;
  branch slug + `Closes <KEY>`; verify the workspace app before relying on
  it, else `orca linear`; upstream feedback labeled/proposed, never
  automatic; triage loop sweeps GitHub issues in) plus a pointer to
  `docs/how-it-works/integrations.md`. The verified-live detail dropped
  from the reference is already carried there (app install path, per-team
  Pull-request automation defaults, connected-account gotcha) and in
  `skills/ae-audit/SKILL.md` (the exact filing commands) — nothing was
  deleted without a home.
- **ADR-001 two-connectors note survives in both binding places**:
  "a second connector, not a second rung" in the connector section, and
  "whatever connector the session carries (ADR-001 — the MCP is a
  connector, not a fallback rung)" under Without Orca (untouched).
- **Prose tightened elsewhere** as the step allows: head, Two planes,
  Linking affordances (bullets → one paragraph, all three affordances
  kept), connector prose, and the declaration section — every normative
  rule kept verbatim in substance, including the canonical `Tracker:`
  fenced format, the `Tracker-project:` line, the inheritance rule, the
  "never earns a file" clause, ae-init's verbatim-write rule, and the
  full before-any-write comparison contract (url slug vs display fields,
  mismatch → no write + emit, unresolvable = same contract, inert without
  a full `Tracker:` line).
- **Connector table** 7 rows → 2 grouped rows (Read / Write); every command
  string preserved, and `orca worktree create --linear-issue <KEY>` moved
  into the intro sentence (it is also a row in `reference/orca.md`).
- Wrapping normalized to the house reference width (p90 of `reference/*.md`
  prose is 78 cols); no `docs/how-it-works/` chapter needed updating — no
  behavior changed and the relocated detail already lived in
  `integrations.md`.

Acceptance:

```
$ [ $(wc -l < reference/tracker.md) -le 120 ] && grep -q "second connector" reference/tracker.md \
  && grep -q "belongs to a team" reference/tracker.md \
  && node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-83-84-scale-polish
0 high, 0 medium, 0 low — PASS
EXIT=0
```

Other three gates re-run as insurance (nothing in them reads tracker.md,
but the lane constraint wants them green): `node tests/run-lint-tests.mjs`
→ "all 16 cases passed"; `node tests/run-gen-tests.mjs` → "all gen cases
passed"; `node tests/run-eval-checks.mjs` → "all eval checks passed".

Files changed: `reference/tracker.md` (+87 / −145).

### Step 1 fix — verified JSON path re-attributed to its real object

Review finding (Important) accepted: the compression had pulled
`workspace.name` under `result.meta.resolved`, where the on-machine
observation never put it. The pre-trim text recorded two locations —
`result.meta.resolved`'s `workspaceName`/`workspaceId` on reads, and
`workspace.name` on a list row — and tracker.md is the only file in the repo
carrying these paths, under a "(verified on-machine 2026-08-18)" stamp.

Changed (`reference/tracker.md`, the before-any-write paragraph): the
negative clause now reads "never the display fields
`workspaceName`/`workspaceId` under `result.meta.resolved`, or a list row's
`workspace.name` (verified on-machine 2026-08-18)" — the two objects are
distinct again, matching the pre-trim observation. The paragraph tail was
re-wrapped so the fix costs no line ("same contract when" → "same when",
"so nothing to compare. Absence degrades cleanly." → "nothing to compare —
absence degrades cleanly."); no other content touched, Minor findings left
for the lane gate.

Acceptance re-run:

```
$ wc -l < reference/tracker.md
120
$ [ $(wc -l < reference/tracker.md) -le 120 ] && grep -q "second connector" reference/tracker.md \
  && grep -q "belongs to a team" reference/tracker.md \
  && node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-83-84-scale-polish
0 high, 0 medium, 0 low — PASS
EXIT=0
```

Concerns:

- The file lands at exactly 120 — the budget is met with zero margin, so
  any later addition to tracker.md has to buy its line back.
- The compression is dense by design; the citations other files make into
  this file were checked and all still resolve (`loops/issue-triage.md`
  "single intake plane", `skills/ae-init/SKILL.md` declaration format +
  prompt-template reminder, evals 05/06's declaration section,
  `skills/work-handoff` respect rule, execution.md's "GitHub plane").

### Step 1 review closed — Approved (fix round 1: ADDRESSED)

Fresh reviewer: spec ✅ compliant, quality Approved; every dropped fact
checked against its claimed home (integrations.md, ae-audit SKILL,
CONTRIBUTING, issue-triage loop) — none orphaned. One Important finding
(a verified JSON path compressed onto the wrong object) fixed in round 1
(`c163d62`), re-review: ADDRESSED, no new Critical/Important breakage.

Minor findings deferred to the lane gate (work-verify triage):

- tracker.md:32-33 — "all take `--json`" now shares a sentence with
  `orca worktree create --linear-issue` (not an `orca linear` command);
  scope the claim explicitly.
- tracker.md:100-105 — branch-autolink vs `Closes <KEY>`-marks-for-close
  merged into one clause; the original kept the "(autolink)" precision.
- tracker.md:53-55 vs 64-65 — `Tracker:` keeps its fenced block,
  `Tracker-project:` became inline backticks; asymmetric presentation of
  the two canonical forms (fence costs 2 lines the budget lacks).
- tracker.md:76-90 — pre-write rule now one dense 15-line paragraph;
  least scannable passage, and the file sits at 120/120 with zero
  headroom.
- tracker.md:86 — re-wrap dropped "contract" from "same contract when"
  (re-review round 1, Minor).

### Step 2 DONE — eval-06 Run D widened to the two-connectors law

Run D no longer grades a bare machine only: it now runs twice — bare, and
with a Linear MCP present — because the rule it exists to protect is
connector-independent (`reference/tracker.md` "Without Orca", ADR-001).

What changed (`skills/ae-init/evals/eval-06.md`):

- **Fixture preamble** (Run D bullet) — was "on a machine with no Orca CLI
  and no Linear MCP (identical contract when the binding cannot be resolved
  at all)". Now: no Orca CLI, run twice — once bare (no MCP either, the
  identical contract when the binding cannot be resolved), once with a
  Linear MCP present, connected and bound to `bygama` — plus the reason the
  two runs share one contract: without an Orca session there is no tracker
  write, whatever connector the session carries.
- **Graded item, widened** — the existing Run D expectation (nothing claimed
  as created; the refusal stated plainly; the EXACT operations emitted;
  every declaration line still written as in Run A) now reads "Run D, both
  runs (no Orca — bare, and with an MCP present — or an unresolvable
  binding)", so the MCP-present case is graded against the same three
  obligations. No obligation was reworded or dropped.
- **New graded item for the MCP-present failure mode** — the connector
  changes NOTHING: it is a second connector under the same declaration
  check, never a no-Orca fallback rung. Creating the initiative or a project
  through the MCP because Orca is missing, or reporting the tracker as
  updated on the strength of it, fails; so does downgrading the refusal into
  a question ("shall I use the MCP instead?"), since ADR-001 fixes the
  answer and leaves nothing to ask.

Run A is untouched and stays consistent: with an Orca session present, its
writes may go through `orca linear` OR the Linear MCP — that asymmetry
(same connector, opposite outcome depending on the Orca session) is exactly
what Run D now pins down.

Acceptance:

```
$ grep -qi "MCP present" skills/ae-init/evals/eval-06.md && node tests/run-eval-checks.mjs
ok   ae-audit: 4 evals well-formed
ok   ae-init: 6 evals well-formed
ok   loop-setup: 5 evals well-formed
ok   orchestrate: 4 evals well-formed
ok   shaping: 4 evals well-formed
ok   using-ae: 4 evals well-formed
ok   work-handoff: 6 evals well-formed
ok   work-plan: 5 evals well-formed
ok   work-run: 4 evals well-formed
ok   work-verify: 6 evals well-formed
ok   .claude/docs-sweep: 3 evals well-formed
ok   .claude/release: 4 evals well-formed
all eval checks passed
EXIT=0
```

Other three gates re-run as insurance (none reads evals, but the lane
constraint wants them green): `node scripts/agent-lint.mjs . --ignore
tests,templates,global,examples` → "0 high, 0 medium, 0 low — PASS" (exit
0); `node tests/run-lint-tests.mjs` → "all 16 cases passed"; `node
tests/run-gen-tests.mjs` → "all gen cases passed".

No `docs/how-it-works/` chapter needed updating: no behavior changed — the
two-connectors law already landed with MAT-82 (d352399) and is stated in
`reference/tracker.md` and ADR-001; this step only makes it testable. No
other file cites eval-06's runs (only eval-05 cites the eval by name, for
its ≥3-domain path).

Files changed: `skills/ae-init/evals/eval-06.md` (+21 / −9).

Concerns: none. Wrapping kept at the file's 78-col house width (no line
exceeds 80).

### Step 2 review closed — Approved, no fix loop

Fresh reviewer: spec ✅ compliant, quality Approved, no Critical or
Important findings. Citations verified load-bearing against the
post-trim tracker.md and ADR-001; acceptance re-run exit 0 clean.

Minor findings deferred to the lane gate (work-verify triage):

- run-eval-checks is structural only — the gate's green proves shape,
  not content; the substantive check was the review read itself.
- eval-06 could state the Run A / Run D contrast (same connector,
  opposite outcome depending on the Orca session) in the file itself,
  not only in the lane record.

One finding routed forward, ruling recorded in DECISIONS.md: eval-06:120
"monorepo pair (`AGENTS.md` + pointer) per app" is live contract text
using the retired vocabulary — added to step 3's sweep targets.

### Step 3 DONE — retired-vocabulary sweep, "per-app" → nested/any-depth

One commit, six files. "per-app" replaced by "nested" / "at any earned
depth" vocabulary everywhere it still read as current contract text on a
living surface; the docs-sweep battery gained the row naming the real
instances (ratchet rule, same commit).

What changed:

- `README.md:252` — budget-table cell "per-app ≤30" → "nested ≤30"
  (matches the SPEC/PLAN Constraints block's own "root ≤60/100, nested
  ≤30, pointer ≤3" wording).
- `skills/ae-audit/SKILL.md:27` — inventory line "per-app
  AGENTS.md/CLAUDE.md" → "nested AGENTS.md/CLAUDE.md".
- `scripts/agent-lint.mjs:101-102` — both finding messages ("per-app
  AGENTS.md far over the cap", "over the per-app cap") → "nested AGENTS.md
  far over the cap", "over the nested cap". No test asserts the old
  message text (checked `tests/`), so the wording swap is inert to
  `run-lint-tests.mjs`.
- `skills/ae-init/references/migration.md:14,28` — TARGET (Destination)
  columns only: "Per-app AGENTS.md (≤30) + per-app pointer CLAUDE.md" →
  "Nested AGENTS.md (≤30) + nested pointer CLAUDE.md"; "Per-app AGENTS.md
  ≤30 lines + pointer" → "Nested AGENTS.md ≤30 lines + pointer". The
  source/legacy-side columns ("Per-app CLAUDE.md (≤30)", "Per-app
  AGENTS.md contracts") are untouched — found-state vocabulary describing
  what a legacy repo looked like, per the step's own carve-out.
- `docs/how-it-works/architecture.md:144` — examples line "a monorepo
  with per-app files" → "a monorepo with nested AGENTS.md files".
- **DECISIONS.md ruling honored** — `skills/ae-init/evals/eval-06.md:120`
  ("monorepo pair (`AGENTS.md` + pointer) per app") → "... at any earned
  depth" (matching `skills/ae-audit/references/checklist.md`'s existing
  "at any earned depth" phrasing); this line is graded contract text, not
  a fixture description, so it fell inside the sweep per the step-2
  reviewer's routed finding. Re-wrapped the surrounding checklist item to
  the file's house width (no line over 80) since the replacement text
  shifted the wrap points.
- `.claude/skills/docs-sweep/references/patterns.md` — new Grep-battery
  row: pattern `` `per-app` `` on living surfaces outside CHANGELOG,
  `docs/plans/`, `examples/`, and eval fixtures describing a legacy
  repo's found state (migration.md's legacy-side columns called out as
  found-state too); names all six real instances above, tagged MAT-83.

Left untouched (excluded categories, verified by a full-repo grep after
the edits): `CHANGELOG.md:345` (untouchable record), `examples/README.md`
and `examples/monorepo/README.md` (deliberate-clean, excluded by SPEC),
`docs/plans/2026-08-16-*.md` (dated record), `skills/ae-init/evals/eval-03.md:11`
and `skills/ae-audit/evals/eval-01.md:11` (both under `## Fixture`,
describing "A 2025-style legacy monorepo" / "A legacy 2025-style repo" —
found-state fixture descriptions, the SPEC's explicit exclusion), and
`migration.md`'s two legacy-side table cells. This lane's own SPEC.md/
PLAN.md (which cite "per-app" as the literal sweep target) are lane
records, not living surfaces.

Acceptance:

```
$ ! grep -n "per-app" README.md skills/ae-audit/SKILL.md docs/how-it-works/architecture.md scripts/agent-lint.mjs && grep -q "per-app" .claude/skills/docs-sweep/references/patterns.md && node tests/run-lint-tests.mjs
ok   v2-clean repo passes
ok   bloated canonical AGENTS.md fails
ok   per-tool adapters fail
ok   read order + broken link fail
ok   v1-style repo drifts (pointer + stamp)
ok   pointer-fenced repo passes (fenced tool-managed block exempted)
ok   pointer-unfenced repo still fails (unfenced extra content over budget)
ok   pointer-unclosed repo still fails (unmatched BEGIN is not an exemption)
ok   malformed lanes fail
ok   invalid feature list fails
ok   global-layer CLAUDE.md passes its own canon
ok   clean DESIGN.md passes
ok   drifted/undated DESIGN.md fails
ok   dangling-ref/ungenerated DESIGN.md fails
ok   DESIGN.md with mode groups passes
ok   kitchen-sink composite fires the planted set
all 16 cases passed
EXIT=0
```

Other three gates re-run as insurance (this step touches an eval file and
a script, so all four matter here): `node scripts/agent-lint.mjs .
--ignore tests,templates,global,examples` → "0 high, 0 medium, 0 low —
PASS" (exit 0); `node tests/run-gen-tests.mjs` → "all gen cases passed";
`node tests/run-eval-checks.mjs` → "all eval checks passed" (12/12
skills' evals well-formed, eval-06 included).

No `docs/how-it-works/` chapter needed updating beyond the one edited
line itself (architecture.md's own examples line, which IS the change):
this step is pure vocabulary substitution, no behavior changed.

Files changed: `README.md`, `skills/ae-audit/SKILL.md`,
`scripts/agent-lint.mjs`, `skills/ae-init/references/migration.md`,
`docs/how-it-works/architecture.md`, `skills/ae-init/evals/eval-06.md`,
`.claude/skills/docs-sweep/references/patterns.md` (7 files, +11/−10).

Concerns: none.

### Step 3 fix — eval-03's unswept graded line (review round 1)

Review finding (Important) accepted, SWEEP direction taken per the
standing DECISIONS ruling (live graded text falls inside the sweep,
same as eval-06.md:120): `skills/ae-init/evals/eval-03.md:29` sits under
`## Expected behavior`, not `## Fixture` — it is a graded expectation
about the migration's *result state*, structurally identical to the
eval-06 case the step-2 reviewer already routed in, not the fixture's
found-state description at line 11 (which correctly stayed untouched).
The battery row's own exclusion clause ("eval fixtures describing a
legacy repo's found state") read file-wide rather than section-scoped,
so a future sweeper applying it literally would have skipped line 29
forever — the review's third ask (narrow the wording) closes that hole
for good, not just for this one instance.

All three parts done, one commit (`7eeecfc`):

1. **Swept the line** — `skills/ae-init/evals/eval-03.md:29`:
   `- [ ] Per-app: AGENTS.md ≤30 lines + pointer CLAUDE.md per app.` →
   `- [ ] Nested: AGENTS.md ≤30 lines + pointer CLAUDE.md at any earned
   depth.` — same graded obligations (root cap, pointer requirement),
   vocabulary only. Line 11 (`## Fixture`, "per-app AGENTS.md in three
   app dirs") is genuine found-state and was left as-is.
2. **Battery row instance column** — `skills/ae-init/evals/eval-03.md:29`
   added beside the eval-06 entry.
3. **Exclusion wording narrowed** — "eval fixtures describing a legacy
   repo's found state" → "`## Fixture` SECTIONS describing a legacy
   repo's found state", with an explicit parenthetical that a
   `## Expected behavior` graded line in the same eval file is NOT
   covered by that exclusion.

Acceptance re-run (the step's own gate):

```
$ ! grep -n "per-app" README.md skills/ae-audit/SKILL.md docs/how-it-works/architecture.md scripts/agent-lint.mjs && grep -q "per-app" .claude/skills/docs-sweep/references/patterns.md && node tests/run-lint-tests.mjs
ok   v2-clean repo passes
ok   bloated canonical AGENTS.md fails
ok   per-tool adapters fail
ok   read order + broken link fail
ok   v1-style repo drifts (pointer + stamp)
ok   pointer-fenced repo passes (fenced tool-managed block exempted)
ok   pointer-unfenced repo still fails (unfenced extra content over budget)
ok   pointer-unclosed repo still fails (unmatched BEGIN is not an exemption)
ok   malformed lanes fail
ok   invalid feature list fails
ok   global-layer CLAUDE.md passes its own canon
ok   clean DESIGN.md passes
ok   drifted/undated DESIGN.md fails
ok   dangling-ref/ungenerated DESIGN.md fails
ok   DESIGN.md with mode groups passes
ok   kitchen-sink composite fires the planted set
all 16 cases passed
EXIT=0
```

`node tests/run-eval-checks.mjs` (requested explicitly — eval-03.md's
edit is outside the step's grep legs, proving the file still parses):

```
ok   ae-audit: 4 evals well-formed
ok   ae-init: 6 evals well-formed
ok   loop-setup: 5 evals well-formed
ok   orchestrate: 4 evals well-formed
ok   shaping: 4 evals well-formed
ok   using-ae: 4 evals well-formed
ok   work-handoff: 6 evals well-formed
ok   work-plan: 5 evals well-formed
ok   work-run: 4 evals well-formed
ok   work-verify: 6 evals well-formed
ok   .claude/docs-sweep: 3 evals well-formed
ok   .claude/release: 4 evals well-formed
all eval checks passed
EXIT=0
```

Other two gates re-run as insurance: `node scripts/agent-lint.mjs .
--ignore tests,templates,global,examples` → "0 high, 0 medium, 0 low —
PASS" (exit 0); `node tests/run-gen-tests.mjs` → "all gen cases passed".

Files changed: `skills/ae-init/evals/eval-03.md`,
`.claude/skills/docs-sweep/references/patterns.md` (2 files, +2/−2).

Minor findings from the review stay deferred to the lane gate (none
were surfaced for step 3 beyond this Important finding).

### Step 3 review closed — fix round 1 ADDRESSED

Fresh reviewer: all seven enumerated targets swept precisely (migration
target/source split and lint message-only change verified against the
lint tests' ID-based assertions); one Important finding — eval-03.md:29
was live graded text left unswept, and the battery row's file-wide
exclusion would have masked it. Fixed in round 1 (`7eeecfc`, all three
parts); re-review: ADDRESSED, no new breakage.

Minor findings deferred to the lane gate (work-verify triage):

- The step's acceptance had no executable leg over the eval edits
  (covered ad hoc by running run-eval-checks in the fix report; noted
  for future plan-shaping).
- architecture.md:144 now says "nested AGENTS.md files" while
  examples/monorepo itself still says "Per-app" — accepted drift
  (examples are authoring-time-frozen by design); recorded so it is not
  re-litigated later.

### Step 4 DONE — README interop over-bundle split (identical → aligned)

`README.md` §Installing in any repo, the interop paragraph. The old tail
claimed AE's nesting rule *is* the spec's ("AE's nesting rule is the
spec's own: nest at any depth, nearest-wins"), which bundles two
different things: the shared precedence behavior, and AE's own additions
on top of it. Split into what the standard defines and what AE adds.

New text (replacing lines 242-244):

> AE's nesting rule is *aligned* with that standard, not identical to
> it: files nest at any depth and the nearest one wins — the spec's own
> precedence, which Claude Code's walk-up reproduces by combining
> ancestors root-first. What AE adds is its own: the earning test (a
> directory gets a file only for non-inferable local knowledge, never
> for symmetry) and the line budgets that keep every file small
> ([reference/context.md](reference/context.md)).

Attribution checked against the repo's own sources rather than restated
from memory: `reference/context.md:72-79` assigns nearest-wins precedence
to the agents.md standard (quoted there) and the walk-up/concatenate
mechanics to Claude Code, and states the earning test + the ≤30/≤3
budgets as AE's rules; `docs/how-it-works/standard-lifecycle.md:50-62`
already draws the same split ("which is what the agents.md standard
specifies and what Claude Code's walk-up produces"). The README was the
only surface carrying the over-bundled form — a repo-wide grep for
"spec's own" / "nearest-wins" returns only `reference/context.md`,
`standard-lifecycle.md` (both already precise), this lane's SPEC/PLAN,
and the README line now fixed.

No `docs/how-it-works/` chapter needed updating: nothing structural or
behavioral changed — this is a precision fix to a README claim, and the
chapter that narrates nesting (`standard-lifecycle.md`) was already
correct, so the change moves README toward it rather than away.

Acceptance:

```
$ grep -qi "aligned" README.md && node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-83-84-scale-polish
0 high, 0 medium, 0 low — PASS
EXIT=0
```

Other three gates re-run as insurance (the lane constraint wants all four
green; none reads README): `node tests/run-lint-tests.mjs` → "all 16 cases
passed"; `node tests/run-gen-tests.mjs` → "all gen cases passed"; `node
tests/run-eval-checks.mjs` → "all eval checks passed". Combined exit 0.

Files changed: `README.md` (+6 / −3, one paragraph tail). Wrapping kept
at the section's house width (longest new line 74 cols).

Concerns: none. The paragraph grew by three lines; README carries no line
budget (budgets bind entry files, not the README), and the lint confirms
it.

### Step 4 review closed — Approved, no fix loop

Fresh reviewer: spec ✅ compliant, quality Approved, no Critical or
Important findings; attribution verified line-for-line against
reference/context.md and standard-lifecycle.md (README moved toward the
chapter, no chapter update owed). Acceptance re-run exit 0.

Minor finding deferred to the lane gate (work-verify triage):

- README.md:244-245 — "combining ancestors root-first" dropped the
  consequence clause ("so the nearest file lands last"); standing alone
  it can read as root-takes-priority. Cheap same-length fix available.

### Step 5 DONE — eval-07 written (evals before content, MAT-84)

New `skills/ae-init/evals/eval-07.md` (82 lines): "fresh install on a UI
repo — the browser gotcha". EVAL ONLY — `skills/ae-init/SKILL.md` and
`docs/how-it-works/standard-lifecycle.md` are untouched; they are step 6,
which implements the contract this file grades.

Shape (house style, checked against evals 01-06): `Origin failure:`
preamble + `## Query` + `## Fixture` + `## Expected behavior` with
checklist lines, no fenced blocks (no eval in the repo uses one), wrapped
at the evals' house width (longest line 76 cols; the family's max is 81).

The fixture is two runs on ONE machine that carries Playwright and
chrome-devtools MCPs connected, in an Orca-managed worktree — the
temptation is put in front of the agent on purpose, the way eval-05 puts
the wrong live binding in front of the tracker question:

- **Run A** — eval-01's fresh repo with a plain UI stack (components,
  stylesheets, dev-server script): the signal step 1 already looks for,
  the one that makes step 6 offer `DESIGN.md.template`. Run twice, offer
  accepted then declined.
- **Run B** — the same repo with the UI removed (CLI/library, no
  rendering surface). No UI signal, so no DESIGN.md offer either.

What the twelve graded items pin down (this is the interface step 6
implements):

- **The trigger** — exactly ONE Gotchas bullet, written on the strength of
  step 1's UI detection alone; the same detection that gates the DESIGN.md
  offer, never a second pass or a signal of its own.
- **No question** — inferred while exploring and written, the way eval-04's
  language split is; the interview stays gotchas / hard constraints /
  compatibility (+ tracker when in play).
- **The three clauses** of `reference/orca.md`'s browser criterion and
  nothing else: prefer the runner's own embedded/app-managed browser; a
  driven-browser MCP only for a capability that browser lacks (performance
  traces, heap snapshots, a11y audits, device emulation); never from a
  supervised child session — with the criterion's own "convenience, habit
  and already-installed are not lacked capabilities" carried over.
- **Runtime-neutral** — no runner, product or command named; writing `orca
  goto/snapshot/click` into the generated file is the named regression.
  Grounded in the repo's own split rather than an analogy:
  `reference/orca.md:5-6` — artifacts and quality gates are runner-neutral
  files, execution features are the runner's. The rule travels into the
  repo; the command does not.
- **Trigger, not answer** — declining the DESIGN.md offer changes nothing
  about the bullet; the bullet is context ae-init writes, not an artifact
  the owner opts into.
- **Placement** — root AGENTS.md Gotchas, one bullet, one place: no browser
  section, no `docs/` page, no repo skill, no per-tool command list, and no
  Hard constraints entry (Gotchas holds non-inferable working facts; Hard
  constraints stays for genuine safety rules, per
  `templates/repo/AGENTS.md.template`'s own comments).
- **Machine untouched** — no MCP installed, configured, disabled or probed;
  the bullet is not a command, so step 4's verify-by-running does not apply.
- **Budgets hold** — root AGENTS.md ≤60, pointer ≤3, agent-lint exits 0.
- **Run B negatives** — no browser line anywhere (Gotchas, Hard
  constraints, docs/) however many browser MCPs the machine carries, AND no
  question, offer or final-report mention: friction on every non-UI install
  is the regression that run exists to catch.
- **Rest of the fresh-install contract unchanged** in both runs.

Design notes: no verbatim example line is dictated — the eval grades the
three clauses, the neutrality, and the placement, which is the phrasing
interface step 6 owes. That follows eval-04 (grades the language gotcha's
obligations, not its wording) rather than eval-05 (a canonical `Tracker:`
format that genuinely is verbatim). Two clause-level citations were checked
in the source before writing rather than restated from memory:
`reference/orca.md:56-73` for the criterion (including the
lacked-capabilities list and the owner-terminal/child split, which
`skills/orchestrate/references/dispatch-child.md:84-91` states absolutely
for children) and `reference/orca.md:5-6` for the runner-neutral/execution
split that justifies dropping the commands.

Acceptance:

```
$ test -f skills/ae-init/evals/eval-07.md && node tests/run-eval-checks.mjs
ok   ae-audit: 4 evals well-formed
ok   ae-init: 7 evals well-formed
ok   loop-setup: 5 evals well-formed
ok   orchestrate: 4 evals well-formed
ok   shaping: 4 evals well-formed
ok   using-ae: 4 evals well-formed
ok   work-handoff: 6 evals well-formed
ok   work-plan: 5 evals well-formed
ok   work-run: 4 evals well-formed
ok   work-verify: 6 evals well-formed
ok   .claude/docs-sweep: 3 evals well-formed
ok   .claude/release: 4 evals well-formed
all eval checks passed
EXIT=0
```

Other three gates re-run as insurance: `node scripts/agent-lint.mjs .
--ignore tests,templates,global,examples` → "0 high, 0 medium, 0 low —
PASS" (exit 0); `node tests/run-lint-tests.mjs` → "all 16 cases passed";
`node tests/run-gen-tests.mjs` → "all gen cases passed".

No `docs/how-it-works/` chapter update is owed by this step: nothing
structural or behavioral changed yet — the eval states the contract, step 6
implements it and narrates it in `standard-lifecycle.md` §Install in the
same commit (the SPEC and PLAN put the chapter there, not here).

Files changed: `skills/ae-init/evals/eval-07.md` (new, 82 lines);
`work/mat-83-84-scale-polish/PLAN.md` (step 5 ticked).

Concerns:

- `run-eval-checks.mjs` is structural only (sections + one checklist line),
  so the gate proves shape, not substance — same limitation the step-2
  reviewer noted. The substantive check is the review read.
- The eval asserts budgets hold with the bullet present; a two-physical-line
  bullet is what that assumes. If step 6's phrasing runs longer, the budget
  claim is what will bite first — that is the intended pressure, not a
  defect of the eval.

### Step 5 review closed — Approved, no fix loop

Fresh reviewer: spec ✅ compliant, quality Approved, no Critical or
Important findings; source fidelity verified clause-by-clause against
reference/orca.md's browser criterion and the AGENTS.md template
comments; ae-init step numbering checked. Minors only, deferred:

- eval-07:72-74 — the "cited, not restated" parenthetical could be
  misread as requiring the GENERATED bullet to cite reference/orca.md
  (a dead, runner-naming pointer in an adopter repo). Interface reading
  fixed by DECISIONS ruling (below) instead of a fix round.
- eval-07:80-81 — "no product named" is stricter than the SPEC's
  illustrative "(Playwright, devtools)"; same ruling settles which text
  is generated vs skill-side.
- PROGRESS step-5 entry says "twelve graded items"; the file has 11.
- eval-07:101 phrasing lacks the MAT-68 fenced-block carve-out (matches
  eval-06's phrasing; consistency-only).
- eval-07 preamble could preempt the machine-policy-vs-repo-property
  challenge explicitly (implicit today: the trigger is a repo property).

### Step 6 DONE — the browser gotcha reaches ae-init and its chapter

The content eval-07 already grades, in ONE commit with the chapter that
narrates it: `skills/ae-init/SKILL.md` step 6 now writes the browser bullet
beside the `DESIGN.md.template` offer, and
`docs/how-it-works/standard-lifecycle.md` §Install tells adopters what that
line is and why it is worded the way it is.

**`skills/ae-init/SKILL.md`** — the "UI stack detected in step 1" sentence
gains the instruction, written so each of eval-07's graded items has a
clause that produces it:

- **Same trigger, no second pass** — "The SAME detection also writes ONE
  browser bullet into the root Gotchas" (eval-07 items 1 and 6: one bullet,
  one place, on step 1's UI detection alone).
- **Written, not asked, not offered** — "not asked, not offered, and
  independent of how the DESIGN.md offer was answered — inferred and
  written, like step 3's language split" (items 2 and 5: no interview
  question, and the two Run-A sub-runs agree because they share a trigger,
  not an answer). The step 3 analogy is the skill's own existing precedent
  for a gotcha that is inferred rather than interviewed.
- **The three clauses** — prefer the runner's own embedded or app-managed
  browser; a driven-browser MCP only for a capability that browser lacks
  (performance traces, heap snapshots, a11y audits, device emulation),
  "never convenience or 'it is already installed'"; never from a supervised
  child session (item 3, including the criterion's own
  not-a-lacked-capability qualifier).
- **Runtime-neutral, per the DECISIONS interface ruling** — "no runner,
  product or command in the generated text (Playwright and chrome-devtools
  are examples for you, never text in the file) — it must read true for an
  agent on another runner", and the citation is marked "your source, cited
  nowhere in the line" so `reference/orca.md` reaches the skill reader and
  never the adopter's file (item 4, and the eval-07:72-74 minor the step-5
  reviewer flagged: the generated bullet cites no AE file and names no
  product).
- **Machine untouched + budget** — "Context, not a command: nothing on the
  machine is installed, probed or configured, and the line counts against
  the budget like any other" (items 7 and 8; the budget phrasing matches
  the Judgment note that already says a declaration line counts like any
  other).
- **Run B** — "No rendering surface: no bullet, no question." (items 9 and
  10, both negatives in one sentence).

The paragraph's tail (`Do NOT create work/ lanes …`) was re-wrapped to the
file's house width because the insertion left a ragged short line; no words
changed there.

**`docs/how-it-works/standard-lifecycle.md` §Install** — a new paragraph
before the "Templates are instantiated" close, in the chapter's explanatory
register (what happens, and why it is that way): the UI signal that offers
`DESIGN.md.template` also writes one Gotchas line; the three clauses in
prose, with the reason the child-session clause exists (the child owns the
long-lived process, stalls while it runs, and takes it down on the way
out); the criterion named as `reference/orca.md`'s; the runtime-neutral
constraint with its rationale (the file outlives the runner that installed
it and has to read true on the next one); and the no-UI case, tied back to
why one detection gates both this and the DESIGN.md offer.

Acceptance:

```
$ grep -qi "browser" skills/ae-init/SKILL.md && grep -qi "browser" docs/how-it-works/standard-lifecycle.md && node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-83-84-scale-polish
0 high, 0 medium, 0 low — PASS
EXIT=0
```

Other three gates re-run as insurance: `node tests/run-lint-tests.mjs` →
"all 16 cases passed"; `node tests/run-gen-tests.mjs` → "all gen cases
passed"; `node tests/run-eval-checks.mjs` → "all eval checks passed"
(ae-init: 7 evals well-formed). Combined exit 0.

Files changed: `skills/ae-init/SKILL.md` (+24 / −5, 154 → 168 lines; the
skills budget is <500), `docs/how-it-works/standard-lifecycle.md` (+15, no
budget — `docs/how-it-works/` is exempt by AGENTS.md). No line either file
gained exceeds 80 cols (the two pre-existing over-width lines,
SKILL.md:3 frontmatter and standard-lifecycle.md:18/168, are untouched).

Concerns:

- The instruction is prose, so eval-07 is graded by reading, not by a
  command — the gates prove lint/shape only. That is the same limitation
  every step in this lane has carried.
- The illustrative product names (Playwright, chrome-devtools) sit in the
  skill text as the DECISIONS ruling permits, fenced by "examples for you,
  never text in the file". It is the one place where a careless reader
  could leak a product name into the generated bullet; the neutrality
  clause is stated in the same sentence to make that hard.

## In progress

## Tried and failed

## Next

- Execute PLAN steps 5-8 via work-run (steps 1-4 closed; 1-3 Approved,
  4 pending its review).

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
