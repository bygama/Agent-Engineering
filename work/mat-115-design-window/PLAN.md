# The design-first approval window — plan

<!-- Steps with executable acceptance. Not "improve X" — "command Y exits 0".
     SPEC.md approved as written by the parent orchestrator, 2026-08-21
     (DECISIONS.md). Tier M, two legs, one PR. -->

## Constraints (every step)

- **No version bump, no CHANGELOG entry, no restamp.** The check change
  in step 4 earns a PATCH, but this repo's release ritual is owner-paced
  and packages bumps separately. `AGENTS.md`'s `Standard: AE/1.4.2` stamp
  is not touched.
- **Never touch:** `CHANGELOG.md`, the `AGENTS.md` version stamp,
  `reference/`, `README.md`, `examples/`, `.claude/skills/`,
  `templates/`, and any global path (`~/.claude` and friends — the
  personal layer is canonical in `bygama/workstation`). Concluding that
  one of these MUST change is an **ask to the parent**, never a
  unilateral edit.
- **Evals change BEFORE skill content** (step 1 before step 2), and
  **fixtures change BEFORE check content** (step 3 before step 4). Both
  orderings are load-bearing and each is a separate commit; step 3's red
  is the evidence step 4 is worth shipping.
- **The marker is written verbatim, never paraphrased.** Copy the exact
  string from the interface block below into every site. A retyped
  marker with different punctuation is a silent regression the gates
  cannot catch.
- **All artifacts in English.** `skills/` is junction-linked into
  `~/.claude/skills`, so every edit here is read verbatim by every future
  session on this machine.
- **Role hint · review class** on every step, in that order, e.g.
  *(judgment · per-step)*.
- The four gates, exactly as `AGENTS.md` states them:
  `node scripts/agent-lint.mjs . --ignore tests,templates,examples`,
  `node tests/run-lint-tests.mjs`, `node tests/run-gen-tests.mjs`,
  `node tests/run-eval-checks.mjs`.

## Interface produced in step 1, consumed by steps 2, 3, 4, 5, 6

**The marker string, exact and complete** (SPEC "The marker"; wording
rationale in DECISIONS.md, 2026-08-21). ASCII only — no em dash, no
smart quotes:

```
STATE: design-first approval window, waiting for owner approval of SPEC.md before PLAN.md
```

**Its two source-of-truth sites**, each carrying a paired
`change both together` comment naming the other — the pattern
`scripts/agent-lint.mjs` already uses for `ENTRY_SKILL_CAP` ("Path and
cap mirror `reference/skills.md` ... change both together"):

| Site | Role |
|---|---|
| `skills/work-plan/SKILL.md`, step 1's design-first bullet | writes it into PROGRESS.md at the SPEC step |
| `scripts/agent-lint.mjs`, work-lanes section | matches it to recognize the window |

**The fixture and case names** steps 3 and 4 both depend on, fixed here
so step 4's acceptance greps cannot drift from step 3's spelling:

| Fixture | Case name in `tests/run-lint-tests.mjs` | Expected |
|---|---|---|
| `tests/fixtures/lane-window-ok/` | `design-first approval window lane passes without PLAN.md` | `fail: false`, `forbid: ["lane-incomplete"]` |
| `tests/fixtures/lane-window-near-miss/` | `near-miss marker text does not exempt a lane` | `fail: true`, `expect: ["lane-incomplete"]` |
| `tests/fixtures/lanes-bad/` (extended) | `malformed lanes fail` (existing) | unchanged codes, plus `expectMatch` on both messages |

`lane-window-near-miss` holds **exactly one** lane, so any
`lane missing PLAN.md` the fixture emits can only be that lane's — that
is what makes it a precise assertion without touching the test harness.
`lanes-bad` gains a SPEC-only lane (`work/spec-only/SPEC.md`) whose
`lane missing PROGRESS.md` message no other lane in that fixture
produces, pinning it the same way.

## Review-class grouping for this lane

Every step is `per-step`. Steps 1-4 and 6 are skill content, test
fixtures, check code and the gate sweep — the classes table's own
"expensive to redo or irreversible" column. Step 5 is documentation and
would be `grouped` on rework cost alone; it is written `per-step`
instead, and the reason is stated rather than silent: it is the only
doc step in the lane, so `grouped` would buy a group of one wedged
between two `per-step` steps, which work-plan calls a planning error.
Upgrading is always free; downgrading a code or check step to save a
pass is the failure the class exists to prevent, and none is downgraded
here.

## Steps

- [ ] **1. `skills/work-plan/evals/` — evals FIRST for the skill leg**
  (SPEC §1): `eval-05.md` owns the two modes, so it is amended rather
  than duplicated. Its existing design-first assertions stay true and
  gain their companion — the same turn that writes SPEC.md **also**
  writes `work/<slug>/PROGRESS.md` carrying the marker verbatim under
  `## In progress`, and PLAN.md still does not appear until approval —
  plus the negative that keeps the behavior honest: **direct mode does
  not write the marker**, because it has no approval window to declare.
  The marker is quoted in full in the eval so a future reader can see
  what "verbatim" means. *(judgment · per-step)*
  accept: `grep -q 'STATE: design-first approval window, waiting for owner approval of SPEC.md before PLAN.md' skills/work-plan/evals/eval-05.md && grep -q 'direct' skills/work-plan/evals/eval-05.md && node tests/run-eval-checks.mjs` — exit 0

- [ ] **2. `skills/work-plan/SKILL.md` — design-first writes PROGRESS.md**
  (SPEC §2): step 1's design-first bullet gains the PROGRESS.md write
  and quotes the marker in full, with the paired `change both together`
  comment naming `scripts/agent-lint.mjs` as the site that must move
  with it; the workflow checklist line for step 1 and step 6's "Save"
  line are corrected so the file does not contradict itself; the direct
  bullet stays as written. In the same step, record in
  `work/mat-115-design-window/DECISIONS.md` the judgment on
  `templates/repo/work/PROGRESS.md.template` — the SPEC's position is
  that it stays unchanged (the marker is a transient state only
  design-first lanes enter; baking it into every lane's scaffold would
  write a false state into direct-mode lanes and escalate the bump), and
  the judgment is recorded whichever way the implementer lands.
  *(judgment · per-step)*
  accept: `grep -q 'STATE: design-first approval window, waiting for owner approval of SPEC.md before PLAN.md' skills/work-plan/SKILL.md && grep -q 'change both together' skills/work-plan/SKILL.md && grep -q 'scripts/agent-lint.mjs' skills/work-plan/SKILL.md && grep -q 'PROGRESS.md.template' work/mat-115-design-window/DECISIONS.md && node scripts/agent-lint.mjs . --ignore tests,templates,examples && node tests/run-eval-checks.mjs` — exit 0

- [ ] **3. `tests/` — fixtures FIRST, and the new case must go RED**
  (SPEC §3 and §4): build `tests/fixtures/lane-window-ok/` (an otherwise
  lint-clean AE fixture repo — pointer `CLAUDE.md`, stamped `AGENTS.md`
  — whose single lane holds `SPEC.md` plus a `PROGRESS.md` carrying the
  marker verbatim, and **no** `PLAN.md`) and
  `tests/fixtures/lane-window-near-miss/` (identical shape, one lane,
  whose PROGRESS.md paraphrases the marker instead of carrying it —
  e.g. an em dash swapped in and a word reordered). Add both cases to
  `tests/run-lint-tests.mjs` under the names fixed in the interface
  block, and extend the existing `lanes-bad` fixture with a SPEC-only
  lane at `work/spec-only/SPEC.md`, adding `expectMatch: ["lane missing
  PLAN.md", "lane missing PROGRESS.md"]` to its case. Run before step 4,
  `lane-window-ok` **fails** — that red is the evidence the check misses
  the state today; the other two cases pass immediately, proving the
  negatives already hold. Paste both the red output and the two `ok`
  lines into PROGRESS.md. *(judgment · per-step)*
  accept: `node tests/run-lint-tests.mjs 2>&1 | grep -q '^FAIL design-first approval window lane passes without PLAN.md' && node tests/run-lint-tests.mjs 2>&1 | grep -q '^ok   near-miss marker text does not exempt a lane' && node tests/run-lint-tests.mjs 2>&1 | grep -q '^ok   malformed lanes fail'` — exit 0 (the suite itself is RED here, by design)

- [ ] **4. `scripts/agent-lint.mjs` — `lane-incomplete` becomes lifecycle-aware**
  (SPEC §5): in the work-lanes section, define the marker once as a
  module constant beside `ENTRY_SKILL_CAP`'s pattern, carrying the
  paired `change both together` comment that names
  `skills/work-plan/SKILL.md` as the site that writes it. `PLAN.md`
  stops being required for exactly one state — `PROGRESS.md` is present
  **and** its text contains the marker; `PROGRESS.md` itself stays
  required unconditionally, so a SPEC-only lane still fires both
  findings. Code, severity and message text are unchanged for every
  other lane. This turns step 3's red green without touching the
  fixtures. *(judgment · per-step)*
  accept: `node tests/run-lint-tests.mjs && node scripts/agent-lint.mjs . --ignore tests,templates,examples && node tests/run-gen-tests.mjs && node tests/run-eval-checks.mjs` — all exit 0

- [ ] **5. `docs/how-it-works/` — the chapter that went false**
  (SPEC §6): `work-lifecycle.md` describes design-first as writing
  "SPEC.md alone" and stopping — false as of step 2 — so that sentence
  is corrected to name the PROGRESS.md write and the declared state, and
  the chapter's `PROGRESS.md` bullet gains the design-first window as a
  state the file carries. Then judge `architecture.md`,
  `standard-lifecycle.md`, `execution.md`, `integrations.md` and
  `docs/how-it-works/README.md` explicitly, recording each verdict in
  `DECISIONS.md` **whether or not the file changes** — a silent
  no-change is indistinguishable from an unexamined one.
  *(judgment · per-step)*
  accept: `! grep -q 'writes SPEC.md alone' docs/how-it-works/work-lifecycle.md && grep -q 'design-first approval window' docs/how-it-works/work-lifecycle.md && grep -q 'how-it-works' work/mat-115-design-window/DECISIONS.md && node scripts/agent-lint.mjs . --ignore tests,templates,examples` — exit 0

- [ ] **6. Gate sweep + the lane's own invariants**
  (SPEC §7 and Definition of done): the four gates, plus machine proof
  of the three claims the SPEC makes about the shape of the change — the
  marker lives in exactly two shipped sites (`skills/` and `scripts/`,
  fixtures and lane files excluded), `scripts/agent-lint.mjs` names its
  paired site by path, and no forbidden path moved in the whole branch
  diff. *(integration · per-step)*
  accept: `node scripts/agent-lint.mjs . --ignore tests,templates,examples && node tests/run-lint-tests.mjs && node tests/run-gen-tests.mjs && node tests/run-eval-checks.mjs && test $(grep -rl 'STATE: design-first approval window, waiting for owner approval of SPEC.md before PLAN.md' skills scripts | wc -l) -eq 2 && grep -q 'skills/work-plan/SKILL.md' scripts/agent-lint.mjs && test $(git diff --name-only main...HEAD -- CHANGELOG.md AGENTS.md README.md reference examples templates .claude | wc -l) -eq 0` — all exit 0
