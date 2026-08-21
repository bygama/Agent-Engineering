# Decisions — MAT-116 + MAT-117 (reviewer seats + review granularity)

Format: date — choice — why. Parent rulings are quoted, never
paraphrased into a summary that loses their wording.

## 2026-08-21 — Parent ruling: the cross-family guardrail's exact shape

Asked at the design-first SPEC gate, because the brief stated the rule
in its negative form ("the Claude+Claude combination is rejected") while
the positive form ("at least one cross-family gate per lane") also
catches a second zero-cross-family combination the brief did not name.

Parent's answer, verbatim:

> SPEC approved. Your reading is CONFIRMED with one precision: the
> guardrail's positive form is 'at least one cross-family gate per
> lane', so BOTH zero-cross-family combinations are caught — Claude+Claude
> and Claude-per-step+no-adversarial alike. The precision: the dialogue
> REJECTS those combinations as silent or default outcomes, but the owner
> retains the right to explicitly choose a zero-cross-family lane — that
> choice must be an explicit override, stated by the owner in the dispatch
> dialogue and recorded verbatim in the Task spec, never a default the
> dialogue offers and never something the parent assumes. Encode it
> exactly that way: impossible to reach by accident, reachable only by
> recorded owner ruling. Good re-probes — replacing (not softening) the
> factually wrong 'run takes no --auto' line in runners.md is correct.
> Proceed to PLAN.md and execution.

**Effect on the lane:** SPEC section 3 carries the positive rule, both
rejected combinations, and the explicit-override escape with its
"never offered, never assumed" wording. `skills/orchestrate` and its
evals encode the same three parts.

## 2026-08-21 — `opencode/big-pickle` is named, not registered

The brief names Big Pickle as a sigiloso alongside Ox Alpha, and
`opencode models` lists `opencode/big-pickle` on this machine. But its
id carries no `-free` suffix and this lane ran no probe against it, so
registering a spawn command for it would break `reference/runners.md`'s
own hard rule ("no spawn command enters a worker table until it ran on
the target machine"). Choice: name it as a sigiloso instance, state that
it is unverified here, and let verify-on-install bind before use. Ox
Alpha (`opencode/x-preview-f-free`) is the verified current instance.

## 2026-08-21 — `skills/work-verify` is not edited

The economics rule changes which model id the adversarial seat runs, but
work-verify names no model id: its adversarial rung already reads the
seat off `reference/runners.md` (SKILL.md:85). Editing it would be a
diff with no behavior change. The brief's "the adversarial seat
unchanged" therefore stays literally true, and the economics rule still
reaches the seat through the reference file.

## 2026-08-21 — Parent ruling: this lane runs the machinery it builds

Arrived by mailbox mid-lane (two messages: the ruling, then a
correction carrying the exact command). Quoted verbatim:

> Owner directive (2026-08-21): your own per-step reviews run on the NEW
> engine, effective immediately — do not wait for the skill text to
> merge. Concretely: for each PLAN step's review, instead of an
> in-session Claude subagent, shell out  from your worktree (the model
> has tools and reads the checkout itself; instruct it read-only,
> verdict format PASS/FAIL + findings). Keep the FREQUENCY unchanged —
> this lane touches skill content, which is per-step class by MAT-117's
> own logic; only the ENGINE changes. Paste every verdict verbatim into
> your lane records exactly as before. Degradation chain if an
> invocation fails or rate-limits: opencode/muse-spark-1.2-contributor-free,
> then the in-session Claude subagent (the old way) — never a blocked
> step, and record which engine each review used. Cross-family stays
> satisfied twice over (Ox per-step + raton adversarial after
> worker_done). This lane is thereby its own first production test —
> record THAT in DECISIONS.md, and if the sigiloso engine misses
> something your Claude-subagent instinct would have caught, that
> observation is gold: report it in your worker_done body.

And the correction, which carried the command the first mail lost to a
quoting fault:

> Correction: the previous mail (same subject family) may have lost the
> command text to a shell-quoting fault on my side. The per-step review
> engine command, verbatim, no backticks: opencode run --auto -m
> opencode/x-preview-f-free "<review brief>" -- run it from your
> worktree root; on failure or rate-limit fall back to: opencode run
> --auto -m opencode/muse-spark-1.2-contributor-free "<review brief>"
> -- and if both fail, the in-session Claude subagent as before. NOTE
> from the parent seat: the plain "opencode" command on this machine
> resolves to a BROKEN npm shim (incompatible exe); if you hit that, use
> the winget binary full path:
> C:\Users\mateo\AppData\Local\Microsoft\WinGet\Packages\SST.opencode_Microsoft.Winget.Source_8wekyb3d8bbwe\opencode.exe
> with the same arguments. Everything else in the prior mail stands:
> frequency unchanged, verdicts verbatim in lane records, engine
> recorded per review, this lane is its own first production test.

**This lane is the first production test of its own machinery.** Every
PLAN step's review runs on the sigiloso in command mode; the frequency
is unchanged (skill content is `per-step` by MAT-117's own logic); each
review names the engine that produced it, and the verdict text is pasted
verbatim into PROGRESS.md.

**Binary resolution, confirmed here.** The parent's broken-shim warning
reproduces exactly: plain `opencode` on PATH resolves to
`C:\Briar\dev\node\opencode.ps1`, whose target
`node_modules/opencode-ai/bin/opencode.exe` is the placeholder left when
the postinstall never ran ("not a valid application for this OS
platform"). This lane uses the parent's named winget binary
(`…\WinGet\Packages\SST.opencode_…\opencode.exe`, `--version` → 1.18.18),
which is the same version as the working platform binary at
`C:\Briar\dev\node\node_modules\opencode-windows-x64\bin\opencode.exe`.

**Prompt delivery.** The review brief is written to a session scratch
file and the invocation is `opencode run --auto -m <id> "Read <path> and
follow it exactly."` — same command shape the parent gave, with the
brief delivered by file rather than by a multi-kilobyte argv string that
Windows quoting would mangle. The seat has tools and reads the checkout
itself, which is the whole premise of command mode.

## 2026-08-21 — Implementation runs inline; every review runs cross-family

work-run's step loop dispatches a fresh implementer subagent per step
and a fresh reviewer after it. This lane runs the **reviewer** rung
exactly as the standard demands — and, per the parent's ruling above, on
a stronger seat than the standard's own default: a fresh cross-family
sigiloso in command mode, one per step, with the verdict text pasted
verbatim into PROGRESS.md.

The **implementer** side runs inline in the controller session, which is
work-run's own runtime-neutral fallback shape ("the SAME lane inline
under the SAME ceremony: PLAN steps in order, acceptance per step,
PROGRESS updated"). The property work-run's controller-never-implements
rule protects is maker ≠ checker, and that property is fully intact
here: no step's diff is judged by the seat that wrote it, and the judging
seat is not even the same model family. What the rule forbids — a
controller fix that *skips* review — never happens in this lane; every
step's diff goes to the sigiloso before the step is recorded DONE.

Recorded rather than assumed, because it is a deviation from work-run's
default shape and the parent should see it stated, not inferred.

## 2026-08-21 — `docs/how-it-works/` judgments, chapter by chapter

The house hard constraint updates the affected chapter in the same
change. "Affected" is decided per chapter, and the verdict is recorded
whether or not the file moved.

**`execution.md` — CHANGED.** Stage 3 of the 8-stage dispatch cycle read
"dispatch dialogue - reviewers? how many? which model?", a one-seat
description this lane falsifies. The sequence line now names both seats
and adds the guardrail beat; new narration under the diagram explains
why asking together is what makes the cross-family check possible before
the child is born, and the launch-fork paragraph picks up the free-id
default and the degradation chain.

**`work-lifecycle.md` — CHANGED.** Two claims went false. "Each step
gets a fresh-context review (maker ≠ checker)" is not true under
`grouped`; the paragraph now separates what is invariant (fresh context,
maker ≠ checker) from what the plan now chooses (how often, and who),
carries the MAT-111/MAT-110 cost evidence in one sentence, and says why
grouping is safe — nothing downstream of the review moved. work-plan's
own paragraph gains the review class beside interfaces and acceptance.

**`architecture.md` — NO CHANGE.** Its work-run sentence (line 98)
describes "a fresh implementer subagent per step, the lane as its entire
context package". That is the **implementer**, which this lane does not
touch: the reviewer seat is what became configurable. The sentence reads
true as written.

**`standard-lifecycle.md` — NO CHANGE.** Its only relevant lines (29-30)
enumerate the work-cycle skills by name and cite ADR-006 for shaping's
place in the order. The order did not change and no skill was added or
removed.

**`integrations.md` — NO CHANGE.** Its "review" mentions are the GitHub
plane's PR review (line 5) and the tracker's `in-review` workspace status
(line 86). Neither is the in-lane reviewer seat; both stay true.

**`README.md` — NO CHANGE.** The chapter index rows for
`work-lifecycle.md` and `execution.md` describe those chapters at the
level of "the lane lifecycle" and "the parent/child dispatch cycle,
review wave" — review classes and reviewer seats live inside both of
those, so neither row went false. Rewriting an index row to name every
concept a chapter gained is drift, not maintenance.

## 2026-08-21 — The L-tier DoD, assembled (no feature list in this repo)

work-verify assembles an L DoD from `feature_list.json` rows. This repo
has no feature list outside `tests/fixtures/`, so the DoD is the lane
SPEC's `## Verification` section plus the PLAN's ten per-step acceptance
commands. Recorded because the substitution was a judgment, not a
default: the alternative — declaring the tier unverifiable for want of a
file the repo deliberately does not carry — would certify nothing.

No feature-list row moves to `passing` in this lane, for the same reason.

## 2026-08-21 — Deviation from SPEC §2: the template took a fourth input

SPEC §2 promised `references/step-reviewer.md` would carry the
command-mode note with "the same three inputs". The shipped template
requires a fourth, `[WORKTREE_ROOT]`, and the deviation is deliberate: a
command-mode seat has no ambient checkout, so a three-input prompt would
leave it guessing which tree to read. The step-3 reviewer raised the
three-inputs-vs-worktree-root contradiction as an Important finding and
the fix went the other way — widen the contract rather than drop the
input — with the eval amended first (`34896c4` precedes `24b0438`).

Recorded here because a deviation from an approved SPEC belongs in
DECISIONS, not only in a review quote inside PROGRESS.

## 2026-08-21 — `3cb5ddf` touched skill content with no eval commit ahead of it

The step-10 integration fix reworded `skills/work-run/SKILL.md`'s
class-reading sentence so it names both notation forms `work-plan` can
emit. No eval changed with it. The judgment: the expectation was already
pinned by `skills/work-plan/evals/eval-06.md` ("the same notation on
every step, consistently", committed in `5c0c5e8`, which predates it),
so the behavior under test did not move — only the consumer's wording
caught up with an eval that already demanded it. The scoped re-reviewer
checked this reasoning independently and agreed.

The house rule is "evals change before content on every revision"; this
records why this particular revision needed no eval change, rather than
leaving the exception to be inferred from a PROGRESS quote.
