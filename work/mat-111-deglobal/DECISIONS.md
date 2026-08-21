# MAT-111 — decisions

<!-- Rulings that shaped this lane. Parent's answers are quoted, not paraphrased. -->

## 2026-08-20 — Parent ruling at the SPEC gate (design-first)

Asked as one blocking `orca orchestration ask` after SPEC.md was
written: SPEC approval plus three fence collisions the brief told the
lane to ask about rather than choose. Parent's answer, verbatim in
substance:

> SPEC approved; A=yes B=1 C=1.

### Precondition verified before asking

`bygama/workstation` `main` @ `22f3619`: `claude/CLAUDE.md`'s header
reads `<!-- Canonical: workstation/claude/CLAUDE.md — applied to
~/.claude/CLAUDE.md by claude/install.ps1. -->`, and `claude/hooks/`
carries both `orca-probe.ps1` and `using-ae.ps1`. MAT-110 is merged;
deleting this repo's `global/` loses no content.

### Ruling A — `reference/orca.md:27` (not fenced) → repoint

> (A) yes — repoint reference/orca.md to reference/global-layer.md with
> a generic probe description, minimal words, stay under the cap.

Applied in PLAN step 8. `reference/orca.md` is at its 120-line cap, so
the edit is word-for-word neutral or shorter.

### Ruling B — `skills/using-ae/evals/eval-03.md` (fenced) → leave

> (B) option 1 — leave the eval untouched, record the staleness in
> DECISIONS.md as accepted debt; the follow-up is already filed as
> MAT-114, cite it in your DECISIONS entry. For the record, option 2's
> repoint to workstation/claude/hooks/ would have been rejected anyway:
> an AE eval must anchor to the standard's doctrine (the new reference
> doc), never to the owner's personal repo — MAT-114 says exactly that.

**Accepted debt, owned by MAT-114.** `eval-03.md`'s Query and Fixture
name `global/hooks/using-ae.ps1` and `global/hooks/orca-probe.ps1` as
the artifacts under test; after this lane those paths do not exist in
this repo. No gate breaks — `tests/run-eval-checks.mjs` is structural
only (`## Query` + `## Expected behavior` + ≥1 checklist line), it never
resolves a path. The correct anchor is the new reference doc's doctrine,
not workstation; MAT-114 carries that rewrite.

### Ruling C — `.claude/skills/docs-sweep/references/patterns.md:48` (fenced) → leave

> (C) option 1 — leave the battery entry, record it; the battery's own
> law says entries are corrected with a stated reason through
> docs-sweep, and the next sweep owns that correction.

The entry ("`reference/verification.md` and `global/` carry no tier
enumerations — by design, not by omission") asserts nothing false about
the repo; it exempts a directory that no longer exists. Dead half, not
wrong half. The next `docs-sweep` run owns the correction.

## 2026-08-20 — Two brief corrections, accepted by the parent

> Your two corrections are accepted: global/hooks/README.md is the right
> path, and update all FOUR live ignore-string sites (gates.yml,
> AGENTS.md, CONTRIBUTING.md, loops/self-audit.md) — re-stamping the
> self-audit verified date is correct since you actually run the new
> command.

1. **No top-level `global/README.md` exists.** The brief's "README" is
   `global/hooks/README.md`. Deleting the directory covers it; nothing
   else was missing.
2. **The old ignore string is live in four places, not two.** The brief
   named `AGENTS.md` and the CI workflow; grep also found
   `CONTRIBUTING.md:23` and `loops/self-audit.md:20`. All four flip to
   `--ignore tests,templates,examples`. `loops/self-audit.md`'s gate line
   carries a `verified 2026-08-17, exit 0` stamp that the command change
   invalidates, so it is re-stamped with this lane's own run date.

## 2026-08-20 — `scripts/agent-lint.mjs` stays untouched (brief) — and costs nothing

Two checks in the lint mention or imply `global/`; neither needs a
change and neither loses coverage:

- `SHIPPED_SURFACE = /^(skills|reference|templates|global|loops)\//`
  (machine-anchored-path check) keeps `global/` as a **vendored-dir
  class in consumer repos**. True with this repo's own `global/` gone —
  that is precisely the brief's reasoning.
- The global-CLAUDE.md 40-line canon is **content-detected**, not
  path-bound: it fires on any `CLAUDE.md` whose first line is
  `# Global instructions`. It stays exercised by
  `tests/fixtures/global-layer` (`tests/run-lint-tests.mjs:143`), so
  deleting `global/` removes no lint test coverage.

## 2026-08-20 — Judgments recorded at execution

Recorded by the steps that made them; see PROGRESS.md for the evidence.

- **`examples/machine-config/README.md`** (brief step 7) — verdict in
  PROGRESS step 10.
- **`docs/how-it-works/standard-lifecycle.md` five-surface sentence**
  (brief step 5) — verdict in PROGRESS step 7.

## 2026-08-20 — Out of scope, reported not fixed

`bygama/workstation`'s own `claude/README.md` still describes its
`hooks/` folder as "(canonical source: `Agent-Engineering/global/hooks/`)"
— stale the moment this lane merges. Different repo, different ticket.
Parent's instruction:

> Good catch on workstation's claude/README.md drift: report it in your
> worker_done body and I will fold it into the wave close on the
> workstation side.

## 2026-08-20 — Controller ruling: step 4's acceptance grep excludes the lane

**Defect in the PLAN, not in the work.** Step 4's acceptance was written as
a repo-wide `grep -rl 'tests,templates,global,examples'` expecting zero
hits. But the lane's own files quote the old command to *describe* the
change — SPEC.md, PLAN.md, PROGRESS.md and the `reviews/` verdicts all
name it — so the repo-wide form can never reach zero without falsifying
the lane's own record.

Step 3's implementer flagged this ahead of time rather than pre-empting
it ("that is step 4's call to make"); step 4's implementer ran the
lane-excluded variant, reported **both** the command it ran and why, and
did not edit any record to make a grep pass.

**Ruling:** the acceptance command's intent is "no live surface outside
the lane's own records still carries the old string". Verified true:

```
$ grep -rl 'tests,templates,global,examples' --exclude-dir=.git . | grep -v '^./work/mat-111-deglobal/'
(none outside the lane)
```

PLAN.md step 4's acceptance line is corrected to
`--exclude-dir=mat-111-deglobal` so the lane's own plan states the command
that actually gates it. No content change to any repo surface.

## 2026-08-20 — Step 7 judgment: the five-surface sentence STAYS as written

The sentence judged, `docs/how-it-works/standard-lifecycle.md:170-173`,
unchanged by this step:

> The five surfaces a consumer receives — `skills/`, `reference/`,
> `templates/`, `global/`, `loops/` — have to read true on any machine,
> so a path anchored to one machine's disk layout is a defect there

**Reading taken: (ii) — it enumerates the surface *classes a consumer
repo can carry*, not this repo's own directories.** Three pieces of
evidence, in the order they decided it:

1. **Its own subject is the consumer, not this repo.** "The five surfaces
   a consumer *receives*" — the enumeration is the scope of a check
   applied to a repo being linted, and the paragraph never narrows to
   this repo. The rest of the paragraph keeps that register: `docs/plans/`,
   `docs/adrs/`, `CHANGELOG.md` and `examples/` are exempted *as classes*
   ("`examples/` are authoring-time snapshots, none of them is ever
   restamped"), and the whole passage is the prose narration of one lint
   check, not a listing of this repo's directories.
2. **The check it narrates still contains `global/`.**
   `scripts/agent-lint.mjs:354` — `const SHIPPED_SURFACE =
   /^(skills|reference|templates|global|loops)\//` — is untouched by
   this lane (a PLAN constraint, and DECISIONS' earlier entry keeps
   `global/` there as a vendored-dir class). A consumer repo that
   vendors a `global/` still gets it scanned at `medium`.
3. **Editing it would introduce a new falsehood, not remove one.** The
   lint's own comment at `scripts/agent-lint.mjs:325-326` uses the
   identical phrasing — "the five surfaces a consumer receives —
   skills/, reference/, templates/, global/, loops/". Writing "four
   surfaces" in the chapter would make the chapter contradict the check
   it exists to explain, and would tell a reader that a vendored
   `global/` is not scanned when it is.

The sentence's truth condition is "does the check cover these five
classes", and it does. This repo no longer *having* a `global/` of its own
does not touch that condition.

**Not edited.** Only the `global/hooks/README.md` pointer at `:25` was
repointed at `reference/global-layer.md` (step 7 half A), together with
one word of truth repair in the same sentence: "The global layer wires
it as a SessionStart hook" → "can wire it", because this repo ships no
wiring any more — `reference/global-layer.md` carries the recipe, and
`README.md:289-295` and `architecture.md:56-58` already speak of it as a
recipe rather than as shipped plumbing.

## 2026-08-20 — Step 10 judgment: `examples/machine-config/README.md` STAYS as written

Checked claim by claim against the file as it stands after steps 1-9.
**Verdict: still true. No edit.**

First fact that decides most of it: `grep -c 'global/' examples/machine-config/README.md` returns
**0** — the file never named a `global/` path in this repo to begin
with, so this lane's deletion cannot have falsified it by pulling a rug
out from under a citation. Its four bullets all point *at
`bygama/workstation`*, live, via GitHub blob URLs:

1. `AGENTS.md` — "canonical, stamped, ~58 lines... 9 real gotchas" —
   a claim about **workstation's own root `AGENTS.md`**, not this
   repo's now-deleted `global/CLAUDE.md`. Unaffected: this lane touched
   no file in `bygama/workstation`.
2. `terminal/AGENTS.md` — "≤30 lines" — same reasoning, workstation's
   own per-directory context file, untouched by this lane.
3. `docs/tiers.md` — "the consumer tier guide, installed by the seed" —
   workstation's own doc, untouched by this lane.
4. CI runs "this standard's lint on every PR
   (`.github/workflows/verify.yml`, job `standard`)" — this is the one
   claim that names *this repo's* check (`scripts/agent-lint.mjs`), but
   the claim is only that workstation's CI *invokes* it; this lane did
   not touch `scripts/agent-lint.mjs` (PLAN constraint, confirmed
   untouched — see the `scripts/agent-lint.mjs stays untouched` entry
   above) nor change the lint's exit-code contract, so the invocation
   claim stands.
5. "PRs #12–#16" — a historical record of workstation's migration,
   frozen in workstation's own PR history; not something this repo's
   `global/` deletion can touch.

Cross-checked against `docs/how-it-works/architecture.md`'s own
description of this entry (step 6's file, re-read as instructed, not
edited): `### examples/` (`:157-158`) still says the machine-config
entry "points at the living public consumer (workstation) instead of a
snapshot that would drift" — confirmed accurate against the file's
actual content (four links into `bygama/workstation@main`, zero
snapshotted paths from this repo). That description is unchanged by
this lane and needed no fix.

Per the brief, workstation's internals were not re-verified line-by-line
(a local clone exists at `C:\Briar\repos\mine\workstation` but no claim
here is at risk from *this lane's* change, so there was no specific
claim to check against it). The one real drift this lane surfaces on
the workstation side — `claude/README.md` calling its `hooks/` folder's
canonical source `Agent-Engineering/global/hooks/` — is a **different
file** than the one this step reviews (`examples/machine-config/README.md`
cites `AGENTS.md`, `terminal/AGENTS.md`, `docs/tiers.md` and
`.github/workflows/verify.yml`, never `claude/README.md`), and is
already recorded above under "Out of scope, reported not fixed" for the
parent to fold into the workstation-side wave close.

**File not changed.** `examples/` is on the never-touch list except for
this judgment, and no claim in it went false.

## 2026-08-20 — Parent ruling: fence LIFTED for `skills/ae-audit/evals/eval-03.md`

A fourth fence collision, found by step 11's classification sweep and
missed by the SPEC's own survey (SPEC §6 listed three; this is a fourth
file). Escalated as a blocking `ask` rather than decided in the lane.

**The file:** `skills/ae-audit/evals/eval-03.md`, the dogfooding-gate
eval. Two independent live falsehoods:

- **(a) line 14** — "Runs the self-lint exactly as documented in
  AGENTS.md (`node scripts/agent-lint.mjs . --ignore
  tests,templates,global`)". That string matches neither the pre-lane form
  (`tests,templates,global,examples`) nor the new one
  (`tests,templates,examples`); it predates `examples` entering the ignore
  list at all. **Pre-existing** — already wrong before this lane.
- **(b) line 20** — "every top-level directory (reference, templates,
  skills, scripts, global, tests, docs) ... has a current
  section/chapter under `docs/how-it-works/`". **This lane falsified
  this one:** `global/` is no longer a top-level directory, and step 6
  correctly removed its how-it-works section, so the eval now instructs
  the auditor to flag a missing chapter for a directory that must not
  have one — a false finding on every future self-audit run.

No gate catches either: `tests/run-eval-checks.mjs` is structural only.

**Parent's ruling, verbatim:**

> Ruling: 2 — lift the fence for skills/ae-audit/evals/eval-03.md only,
> fix both lines. Rationale for the record: (b) is damage this lane
> causes to a live gate — shipping it means the repo's own dogfooding
> audit reports a false finding on every run, which violates 'the change
> is not complete without its surfaces'. (a) is a one-word mechanical
> restoration to the live AGENTS.md command in the same line region;
> ticketing one word would be bureaucracy, and half-fixing the line is
> worse than either option. This differs from Ruling B's leave-it verdict
> by CLASS, record that too: using-ae eval-03 needs a real rewrite
> against the new doctrine (a design decision, MAT-114's job), while both
> lines here have exactly one unambiguously correct value. Conditions:
> the edit is exactly those two lines, nothing else in the file; it runs
> through the same fresh-reviewer ceremony as every step; DECISIONS.md
> records the fence lift with this rationale. Note (a) as pre-existing
> debt fixed opportunistically.

**The class distinction, recorded as instructed.** Ruling B left
`skills/using-ae/evals/eval-03.md` alone because fixing it means
*rewriting* the eval against the new doctrine — a design decision, owned
by MAT-114. This file is the opposite: both lines have exactly one
unambiguously correct value, mechanically derivable from
`AGENTS.md:14` and from the repo's own directory listing. Same fence,
different class of change.

Executed as **PLAN step 12**, added after the ruling. The house rule
"evals change before content on every revision" is satisfied trivially:
only an eval changes, no skill content.

## 2026-08-20 — Accepted debt: `ae-audit` eval-03's directory enumeration is still incomplete

Surfaced by step 12's reviewer, **not** by the step's own implementer,
whose report said "Concerns: none" while holding both the enumeration
and `architecture.md`'s section list. Recording it here so it is not
silently lost — the reporting gap is the finding, the enumeration is the
debt.

`skills/ae-audit/evals/eval-03.md:20` now reads "(reference, templates,
skills, scripts, tests, docs)". Two real top-level directories with
current chapters under `docs/how-it-works/` are still missing from it:
`loops/` (`architecture.md:144`) and `examples/` (`architecture.md:152`).
`work/` is a third top-level directory with a chapter of its own
(`work-lifecycle.md`), by the pre-existing convention step 6's reviewer
noted.

**Pre-existing, not this lane's damage.** The pre-lane string
"(reference, templates, skills, scripts, global, tests, docs)" never
listed `loops` or `examples` either. The parent's fence-lift ruling
authorized exactly two lines — the `global` falsehood this lane caused,
plus the one-word `AGENTS.md:14` restoration — so widening the
enumeration here would have exceeded the ruling. **Correctly left
unedited.**

Consequence if never fixed: a self-audit run following this eval checks
how-it-works coverage for six directories and silently skips three that
have chapters. It under-reports; it does not produce a false finding the
way the `global` entry would have. Worth a ticket in the MAT-114 class,
the parent's call.

## 2026-08-20 — Handoff: the lane folder SURVIVES into this PR

`work-handoff`'s close mode removes the lane folder by default, but it
defers to a repo convention. **This repo's convention is
finalize-now, remove-post-merge**, and the removal is a separate
terminal-close commit — often the parent's, batched across a wave:

```
2445260 chore(lanes): terminal close — v142 wave lane records removed post-merge
d0ac9e3 chore(lanes): terminal close — MAT-89/92 and MAT-91/88 lane records
```

Three reasons it must survive here specifically, beyond the convention:

1. **It is the evidence the parent's reviewer reads.** The dispatch runs
   a ratón chispeante cross-family reviewer against this PR *after*
   `worker_done`. Every in-session verdict this lane produced lives only
   in `work/mat-111-deglobal/reviews/` and PROGRESS.md — deleting the
   folder ships a PR whose review trail exists only in git history.
2. **The dispatch expects the path.** `worker_done` carries
   `--report-path work/mat-111-deglobal/PROGRESS.md`; a report path that
   404s in the merged tree is a broken handoff.
3. **Deletion is not this lane's call anyway** — it happens after a merge
   this lane is forbidden to perform.

So the close commits the finalized lane (PASS block, 12 ticked PLAN
boxes, truthful PROGRESS/DECISIONS) and stops there. No orphan `work/`
survives long-term; the parent's terminal-close commit removes it after
merging.
