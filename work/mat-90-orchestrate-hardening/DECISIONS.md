# DECISIONS — mat-90-orchestrate-hardening

## 1. Parent ruling — SPEC approved, two refinements (2026-08-19)

Asked through `orca orchestration ask` at the design-first gate (SPEC
written, PLAN.md not yet started). Parent's reply, verbatim on the two
points that changed the plan:

> SPEC APPROVED — proceed to PLAN.md. Both rulings your way.
>
> (1) MAT-96: confirmed, (b) default + (a) as a named exception with your
> three conditions. […] Put that measured list in the skill itself, not
> only in DECISIONS: a cost a parent can see is a cost a parent can
> accept deliberately. And make the fallback-shell close REQUIRED
> wording, not advice — an external operator left two of those open last
> night.
>
> (2) Eval shape approved as planned: eval-01 gains the filled-spec
> clauses, eval-04 gains the contrast (same child refuses a worker AND
> still runs its step-4 reviewer in-session — that IS the production
> failure, so grade it as the contrast rather than a separate case), new
> eval-05 for the parent side at wave scale. Five evals is right for what
> this lane changes.
>
> feature_list at 5 rows with gates evidence in PROGRESS: correct, the
> gates are the lane's DoD, not a feature.
>
> reference/orca.md at 109/120: tighten the duplicated worktree/terminal
> bullets to fit the field table — approved […] One constraint:
> tightening DUPLICATION is free, losing a VERIFIED FACT is not. If
> something has to go and it is not a duplicate, stop and ask rather than
> choosing for me.

Consequences carried into the plan: SPEC §10 rewritten so the four
measured costs live in `skills/orchestrate/SKILL.md` (not only here) with
`reference/runners.md` citing them; the fallback-shell close is written
as a required step in both places; PLAN's constraints block carries the
"duplication is free, a verified fact is not" rule for step 4.

## 1b. Parent ruling — attempt-then-classify, and a fourth occurrence (2026-08-19)

Arrived unsolicited in the mailbox while step 2 was under review
(`msg_51a75510e5b0`). Verbatim:

> Live evidence for your MAT-90 clause, arriving while you write it.
>
> A FOURTH child hit the same wall minutes ago — your sibling lane
> (mat-89-lint-accuracy) stopped at work-verify step 4 and asked the
> parent, exactly like the three from last night. But its wording adds a
> case your fix should cover explicitly: it did not only cite the
> no-grandchildren fence, it also cited "this session's standing
> no-Agent-tool rule" — i.e. it conflated a rule it READ with a
> capability it never TESTED, and stopped without attempting the
> dispatch. I ruled: attempt first, and only a refusal you OBSERVE (tool
> unavailable, runtime declines) counts as the not-run case.
>
> So the template's wording should force that order — attempt, then
> classify — rather than letting a child reason its way to "I cannot"
> from any rule it happens to hold. Four occurrences across two waves,
> all four children stopping correctly rather than self-certifying, all
> four costing a mailbox round-trip at the same rung. That is the failure
> your clause has to make impossible to repeat, and it is now the
> strongest-evidenced finding in this lane. Cite the count.

Three consequences, all carried into SPEC §§1-2 and step 2's fix round:

1. **The order is imperative, not descriptive.** The template must say
   *attempt the dispatch, then classify what you observe* — the current
   wording defines fence vs. refusal correctly but still lets a child
   reason its way to "I cannot" before trying.
2. **Any rule, not just this fence.** The fourth child cited a
   *session-level* no-Agent-tool rule, not the no-grandchildren clause.
   The classification rule must be written to cover **any** rule the
   child holds, from any source, or it will keep missing the case that
   just happened.
3. **The count is four across two waves**, not three in one. SPEC §1's
   evidence line is corrected accordingly.

Recorded here per the dispatch contract: a parent ruling lands in the
child's own DECISIONS.

## 2. MAT-96 stance — (b) default, (a) named exception

The ticket listed three options and the brief delegated the choice. Ruled
out (c) — "if Orca gains argv passthrough on `worker-start`, prefer it" —
on evidence rather than preference: `orca orchestration worker-start
--help` on this machine (2026-08-19) shows `--agent`, `--model`,
`--effort` and no argv flag, with the CLI's own note that `--model` and
`--effort` "cannot combine with `--terminal`". (c) describes a capability
Orca does not have, so it cannot be the encoded stance today.

Between (a) and (b): (b) alone would make the external operator's live
run wrong when it was the only way to launch the runner he needed, and
(a) alone would drop the standing stock-runner convention that keeps most
dispatches on the full-provenance path. Encoded as **(b) as the default,
(a) as the named exception on three conditions** — reason recorded at
dispatch, fallback-shell close required, provenance cost named.

The cost is measured, not asserted. Comparing a `--worktree new-child`
dispatch (`ctx_2b7ad61143ae`) with a two-step one (`ctx_e818399d9132`) in
the parent's own Run `run_fafc4f70d4ac`:

| | `--worktree new-child` | two-step `--terminal` |
|---|---|---|
| `worker.effects` worktree action | `created_child` | `reused` |
| `worker.effects` setup | runs | `not_applicable` |
| `resource.ownershipState` | `user_owned` | `external` |
| `resource.retainedReason` | `user_requested` | `external_terminal` |
| `--model` / `--effort` | available | rejected with `--terminal` |

## 3. Cadence N = 10 minutes

MAT-95 says "Pick N from observed practice (~10 min looks right against
this wave's data)". Taken as 10 rather than 5: MAT-44's child beat every
~5 minutes for an hour before going 40 minutes silent, so 5 is the
observed *natural* rate under normal phases and would turn every long
probe cycle into a rule violation the child cannot honor without
interrupting its own work. 10 minutes is the threshold at which silence
stops being ordinary — it is short enough that the 40-minute gap would
have been caught four times over, and long enough that a healthy long
phase is not spamming the parent.

## 4. feature_list.json is exactly five rows

The brief says "feature_list.json (one row per ticket below)" and the
parent confirmed at the gate: the four gates are the lane's DoD, not a
feature, so no sixth gates row. Gate evidence lands in PROGRESS.md
instead. This departs from the house habit of recent lanes (mat-44,
mat-83-84 both carried a gates row) — recorded here so the difference
reads as a decision rather than an omission.

## 5. Table of contents on `dispatch-child.md`

`reference/skills.md` line 25: "Reference files >100 lines start with a
table of contents." `dispatch-child.md` was already at 125 lines without
one — pre-existing drift — and this lane grows it further. Fixed here
rather than deferred, because the repo's own hard constraint is that
nothing in it may violate the standard it defines, and because the file
is one of this lane's owned surfaces. The TOC sits in the wrapper prose,
above the fence: it does not enter the text a child is dispatched with,
so the verbatim fill is unchanged.

## 7. The fence check needs three-dot diff, not two-dot

Found by step 3's implementer and verified by the controller before
acting on it. PLAN steps 7 and 8 originally read `git diff --name-only
main …`. Two sibling lanes are in flight in this wave and their branches
merge into local `main` while this lane runs, so the two-dot form —
"diff my worktree against wherever main is NOW" — lists THEIR files as
this branch's. Measured here:

- `git diff --name-only main` → 20+ paths including
  `scripts/agent-lint.mjs`, `tests/**` and
  `docs/how-it-works/standard-lifecycle.md`, all three on this lane's
  do-not-touch list, none of them touched by this lane.
- `git diff --name-only main...HEAD` → exactly the ten files this lane
  owns.
- `git merge-base main HEAD` → `9fc4bda`, the branch point; local `main`
  is at `f8c340e` (the mat-89 lane's close).

So the two-dot form would have failed the fence check on a clean lane —
a false positive that reads exactly like a real violation. Both steps
now use `main...HEAD`. This matters beyond this lane: any lane in a
multi-lane wave that fences itself with a two-dot diff against a moving
`main` inherits the same false positive.

## 8. F01's verification command was corrected AT VERIFY TIME — and why that is not cheating

work-verify ran the five feature-list commands and F01 came back **exit 1**.
Diagnosis before any edit: the content requirement was met and the *check*
was wrong, in two independent ways.

- `/NOT RUN/` searched for a literal. The template says exactly that at
  `dispatch-child.md:104-105` — but step 7's reflow wrapped the line
  between `NOT` and `RUN`, so the regex was measuring **where the line
  broke**, not whether the branch existed.
- `/runtime refusal/i` searched for a two-word phrase the fix round had
  replaced with better wording: "A refusal is what you OBSERVED the
  runtime do once you tried."

Changing a failing check to make it pass is the anti-pattern this repo
exists to prevent, so the correction was made in the direction that makes
the check HARDER, and proved:

- whitespace-normalized the haystack (`.replace(/\s+/g,' ')`) so line
  wrapping cannot decide the verdict;
- concept-anchored the refusal clause on `/refusal/i` **and** `/OBSERVED/`
  — two signals where there was one phrase;
- **replaced the vacuous clause.** `!/never spawning anything yourself/`
  was the guard the step-2 reviewer found could never bite: the string
  actually removed was "instead of spawning anything yourself", so the
  clause would have passed on the untouched file. It is now
  `!/spawning anything (yourself|itself)/i`, which does grade the
  absence.

**Proof it is a real test, run here:** the corrected command exits **1**
against the pre-lane file (`git show 9fc4bda:…/dispatch-child.md`) and
**0** against the current one. A check that is red before the change and
green after is a test; the old one was neither.

**Addendum (fresh-context review) — the JSON escaping of that fix.** The
first encoding wrote `\\\\s+` in the JSON string, which decodes to `\\s+`,
so the shell handed node `/\\s+/` — a literal backslash followed by `s`.
POSIX `sh` collapses it back to `/\s+/` inside double quotes and the check
passed; `cmd.exe` and PowerShell do not, so on this machine's native shell
the haystack was never normalized and the check failed for the very reason
it was written to fix. The JSON now carries `\\s+` (command: `/\s+/g`).
Re-proved on all three shells, both directions — the rule this leaves is
that a verification string is portable only once it has been run on more
than one shell.

This is the sixth vacuous-or-brittle guard this lane has surfaced, and
the only one that actually fired. The pattern is recorded for the parent
in PROGRESS: **PLAN-authored acceptance regexes in this lane were written
against remembered wording rather than run against the file**, which is
the same class of error as MAT-97's operator guessing `title`.

## 6. `reference/orca.md` trim — what was tightened

Budget was 109 of 120 lines before §11's field table. Only duplicated
material was condensed, per ruling 1:

- the fallback-shell bullet and the decommission bullet in "Worktree and
  terminal notes" — both rules are stated normatively in
  `skills/orchestrate/SKILL.md` (steps 6 and 8), so `orca.md` keeps the
  rule in one line each instead of two-to-four;
- no verified fact, command, flag or field name was removed.
