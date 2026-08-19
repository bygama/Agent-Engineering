# DECISIONS — MAT-99

## 2026-08-19 — Parent ruling: SPEC approved as written (design-first gate)

Verbatim from the parent orchestrator, via blocking ask: "APPROVED as
written. The corpus triage is exactly why the narrow rule wins: a check
whose only broad-rule hits would be URL routes and /dev/null teaches
everyone to ignore it. MEDIUM is the right severity and the distinction
from MAT-89's LOW (correct-somewhere vs correct-nowhere-but-one-machine) is
worth stating verbatim in the check's message or a nearby comment.
Skip-lines over strip for fenced blocks is right (line numbers must stay
true). Note ~/... tilde paths stay legal on shipped surfaces
(user-relative, portable) — do not extend the classes to them. Shape
PLAN.md and proceed."

Carried into the plan: the check's comment states the
correct-somewhere/correct-nowhere distinction; tilde paths are named legal
in both the check comment and the fixtures.

## 2026-08-19 — Rule breadth: machine-anchored classes, not "no absolute path"

**Decision.** The check flags exactly three pattern classes on shipped
surfaces — drive-rooted (`X:/`, `X:\`), POSIX user-home (`/home/<seg>`,
`/Users/<seg>`), WSL drive mount (`/mnt/<letter>/`) — rather than the broad
"no absolute path outside records".

**Evidence (corpus triage, 2026-08-19, whole repo before any change).**

- Drive-rooted candidate (`[A-Za-z]:[/\\]` not preceded by alnum): 24 hits,
  ALL in `docs/specs/SPEC-agent-engineering.md` (P0 history embedded in the
  spec) and `docs/plans/2026-08-16-*.md` (dated records). Zero on shipped
  surfaces — MAT-91 already cleaned those by hand; the check exists to keep
  them clean.
- User-home candidate (`/home/…`, `/Users/…`): zero hits repo-wide outside
  `docs/plans/` drive-rooted forms (`C:\Users\mateo\...` — caught by the
  drive-rooted class anyway).
- Broad candidate (any absolute Unix path, tests/ excluded): every hit is a
  URL route (`/v1/`, `/api/cart/items` — one lives on a shipped surface,
  `templates/repo/feature_list.example.json`) or `/dev/null` in a
  verification command. The broad rule would fail a shipped template today
  on a false positive and forbid legitimate illustrative Unix paths in
  runtime-neutral docs.

**Why.** The observed failure class (MAT-91's five hits) was 100%
drive-rooted; the broad rule adds no true positive the narrow rule misses
and creates a standing false-positive class on content the standard *wants*
shipped (URL routes in feature-list examples, device paths in verify
commands). `/mnt/<letter>/` is included because it is a drive root in POSIX
spelling — same defect, one alternation. Out of scope, recorded: UNC paths
(`\\server\share`) and `/root/` — zero corpus evidence, and `/root/` is
reproducible in container docs rather than machine-specific; either can
become a class later if one ever leaks.

**Scope note.** Surfaces are the brief's five (`skills/`, `reference/`,
`templates/`, `global/`, `loops/`). `docs/specs/` stays out: its one hit is
embedded P0 history, same nature as the dated records the brief carves out.

## 2026-08-19 — Severity: medium (fails the lint)

MAT-89's LOW precedent applies to paths that are correct *somewhere* (a
sibling checkout the owner and CI both have). A machine-anchored path on a
shipped surface is correct nowhere but the author's machine — a genuine
defect in content consumers receive, so it fails, like `broken-link` and
in-repo `cmd-drift`. Not high: highs mark structural breaks (adapters,
pointer-shape, schema); this is content drift. MAT-92's precedent (a cap
becoming a failing check) supports medium over low.

## 2026-08-19 — Skip lines, don't strip, for tool-managed blocks

The pointer check strips tool-managed blocks and re-counts the remainder;
this check instead *skips* the lines inside matched
`<!-- BEGIN:<name> -->` / `<!-- END:<name> -->` pairs while scanning, so
finding line numbers stay true to the file as written. The header invariant
in `scripts/agent-lint.mjs` ("Only the pointer check strips") is amended in
the same change.

## 2026-08-19 — Handoff: lane records survive the PR; terminal close is the parent's

work-handoff's close default removes the lane folder, but this repo's
convention for dispatched children is that the parent terminal-closes lane
records after merge (main history: d0ac9e3 "chore(lanes): terminal close —
MAT-89/92 and MAT-91/88 lane records"), and this dispatch's report path
points the parent at work/mat-99-lint-path-portability/PROGRESS.md while
the PR is held open for its review wave. So this handoff finalizes and
commits the lane state and leaves the folder in place; removal belongs to
the parent's terminal close.
