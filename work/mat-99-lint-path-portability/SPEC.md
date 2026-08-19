# SPEC — MAT-99: agent-lint check for machine-absolute paths on shipped surfaces

Tier: M · Lane: work/mat-99-lint-path-portability/ · Ships in 1.4.2 (no
version bump, no CHANGELOG entry in this PR — the release ritual owns those).

## Problem

MAT-91 found machine-absolute paths (`C:/Briar/...`) leaked onto shipped
surfaces and fixed them by hand, but could not build the check that keeps
them out. Shipped content must read true on any machine; a path anchored to
one machine's disk layout is a portability defect the lint currently cannot
see.

## The rule

New agent-lint check, code `machine-path`, severity **medium** (fails the
lint). On **shipped surfaces** — files under `skills/`, `reference/`,
`templates/`, `global/`, `loops/` — flag any line carrying a
**machine-anchored path**, defined as exactly three classes:

1. **Drive-rooted**: a single letter + colon + slash (`C:\...`, `D:/...`),
   not preceded by an alphanumeric (so `https://` never matches).
2. **POSIX user-home**: `/home/<segment>` or `/Users/<segment>`.
3. **WSL drive mount**: `/mnt/<letter>/` (a drive root in POSIX notation).

Finding location is `file:line`; the message names the portability problem
and the fix direction (home-relative `~/`, repo-relative, or a placeholder).

### Exemptions (stated in the check, not implied)

- **Dated records are history**: `docs/plans/`, `docs/adrs/`, `CHANGELOG.md`
  — out of scope by construction (the check reads only the five shipped
  surfaces), and the check's comment says why, so the scope reads as a
  decision rather than an accident. Live case that must keep passing
  untouched: `docs/plans/2026-08-16-agent-engineering-p2-usage-skills.md:37`.
- **`examples/` are authoring-time snapshots** — never restamped, never
  scanned.
- **A path inside a fenced tool-managed block** (matched
  `<!-- BEGIN:<name> -->` / `<!-- END:<name> -->` marker lines) is not ours
  to judge — those lines are skipped. Line numbers of findings outside the
  block stay true to the file as written (skip lines; do not re-count a
  stripped remainder).
- **Not machine-anchored, never flagged**: illustrative absolute Unix paths
  (`/opt/...`, `/usr/...`), URL routes (`/api/...`, `/v1/`), `/dev/null`,
  and home-relative `~/` paths (the standard's own convention for
  `~/.claude`).

### Breadth decision (recorded in DECISIONS.md with the triage)

The narrow rule — machine-anchored classes only — over "no absolute path
outside records". Corpus triage (2026-08-19, whole repo): every real hit of
the broad candidate on a shipped surface is a legitimate URL route or device
path; every genuine machine path in the repo is drive-rooted and lives in
dated records. The broad rule buys zero true positives and a standing
false-positive class.

## Severity decision

**Medium** — a failing check, like `broken-link` and in-repo `cmd-drift`.
MAT-89's LOW precedent covered paths that are *correct somewhere*
(context-dependent sibling checkouts); a machine-anchored path on a shipped
surface is correct nowhere but the author's machine, so it fails the lint.
Not high: highs mark structural breaks of the standard (adapters,
pointer-shape, schema violations); this is content drift.

## Deliverables

1. `tests/fixtures/machine-path-shipped/` — minimal consumer repo planting
   all three pattern classes on three different shipped surfaces, plus
   benign lookalikes (`/opt/...`, a URL route, `~/`) that must NOT appear in
   any finding. Fires `machine-path`, fails.
2. `tests/fixtures/machine-path-clean/` — same shape, machine paths planted
   ONLY in `docs/plans/<dated>.md`, `docs/adrs/`, `CHANGELOG.md`, and inside
   a fenced tool-managed block on a shipped surface. No `machine-path`
   finding, passes.
3. `tests/run-lint-tests.mjs` grows ≥2 cases (20 → ≥22), fixtures written
   and red/green-proven BEFORE the check lands (house pattern).
4. The check in `scripts/agent-lint.mjs`, including amending the header
   invariant "Only the pointer check strips" (this check also skips
   tool-managed lines).
5. `docs/how-it-works/standard-lifecycle.md` Audit section narrates the new
   check in the same change.
6. Lane records: breadth + severity decisions with triage evidence in
   DECISIONS.md.

## Definition of done

- All four gates exit 0:
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` ·
  `node tests/run-lint-tests.mjs` · `node tests/run-gen-tests.mjs` ·
  `node tests/run-eval-checks.mjs`.
- Lint self-test suite ≥22 cases, all green; the two new cases prove fire
  and no-fire.
- Live case `docs/plans/2026-08-16-agent-engineering-p2-usage-skills.md`
  byte-identical (untouched by this PR).
- Untouched: `CHANGELOG.md`, `AGENTS.md` version stamp, `global/`,
  `examples/`, and the sibling lane's files (`reference/runners.md`,
  `reference/orca.md`, `skills/orchestrate/**`,
  `docs/how-it-works/execution.md`).
- PR open (never merged by this lane), body carries `Closes MAT-99`.
