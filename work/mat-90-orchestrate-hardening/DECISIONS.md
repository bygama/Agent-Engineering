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

## 6. `reference/orca.md` trim — what was tightened

Budget was 109 of 120 lines before §11's field table. Only duplicated
material was condensed, per ruling 1:

- the fallback-shell bullet and the decommission bullet in "Worktree and
  terminal notes" — both rules are stated normatively in
  `skills/orchestrate/SKILL.md` (steps 6 and 8), so `orca.md` keeps the
  rule in one line each instead of two-to-four;
- no verified fact, command, flag or field name was removed.
