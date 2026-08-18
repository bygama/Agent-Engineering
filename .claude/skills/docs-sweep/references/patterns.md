# Drift patterns — the living battery

Ratchet rule: no drift is fixed without its pattern landing here in the
same change. Every entry names the real instance that motivated it.
Scope: all tracked `.md` files EXCEPT `tests/fixtures/` (break rules on
purpose) and `docs/plans/` (dated records, swept only by the
records-vs-living judgment). Born 2026-08-17 from the MAT-15 sweep.

## Grep battery

| Pattern (rg) | Finds | Born from |
|---|---|---|
| `will hold\|will gain\|not yet built\|upcoming` | future-tense claims about things that already shipped | architecture.md said `docs/adrs/` "will hold" ADRs while two were live (MAT-15) |
| `S/M/L` not followed by `/XL` | stale tier enumerations | triage loops + SPEC after ADR-002 (MAT-15) |
| `AE/2\.\d` (old-scheme names) or hardcoded current versions on live surfaces — outside CHANGELOG "formerly" tags, migration.md, plans, ADRs, SPEC records | stale/old-scheme versions where only the badge + stamp should carry them | README said AE/2.3 at AE/2.5 (MAT-11); AE/2.x renumbered to 0.x at 1.0.0 (MAT-27, ADR-003) |
| `connector ladder\|fallback ladder` (+ future dead terms as they die) | terminology retired by a later version | "connector ladder" survived AE/2.4 in work-lifecycle.md and an eval title (MAT-15) |
| every ADR ⇒ its amended SPEC decision carries a pointer | stale law with no amendment signal | SPEC Decisions 7/8/9 lacked pointers to ADR-001/002 (MAT-15) |
| `> Phase: P\d` | phase tags on shipped behavior | ae-audit dogfooding check, pinned here too |
| how-it-works index rows vs chapter contents | index promising less/other than the chapter covers | index said "tiers S/M/L" after the chapter gained XL (MAT-11) |
| `\brelay\b\|agent-init\|agent-audit` as skill names on living surfaces — outside records (adrs/plans/CHANGELOG/migration per-version notes/examples/closed-lane history) and the kept `ADR-004-relay.md` filename | dead skill names after a rename release | MAT-42's ruled residuals: SPEC Decisions 4/7 needed annotations, found by the post-1.3.0 sweep (MAT-48) |
| `all (nine\|ten\|eleven\|twelve\|[0-9]+)` near "skills" on living surfaces, checked against the actual `skills/` roster | hardcoded skill-roster counts that drift when a skill lands or dies | architecture.md said "all nine" and omitted `shaping` after the 1.2.2 package (MAT-59, pre-1.3.0 sweep) |

## Restamp surfaces (checked when a version bump is in flight)

Root `AGENTS.md` · `templates/repo/AGENTS.md.template` ·
`tests/fixtures/v2-clean/AGENTS.md` · git tag `vMAJOR.MINOR.PATCH`
(the README badge reads the latest tag by itself — dynamic since
1.0.0, no longer a restamp surface). Born from the AE/2.6 errata —
first exercise of the CHANGELOG-header restamp rule.

## Deliberate-clean list (do not re-litigate)

- `examples/` — authoring-time snapshots: stamps and content show the
  version at writing time, excluded from self-lint and restamps
  (MAT-27); their staleness is by design, the READMEs say so.
- CHANGELOG "formerly AE/2.x" tags and 0.x renumbered entries — the
  version-history record after ADR-003; never "modernize" them.

- Cron/`/loop`/`/schedule` mentions in `execution.md` and
  `reference/loops.md` — illustrate artifact-neutrality; recorded
  decision (orca-first lane DECISIONS, 2026-08-16).
- `reference/verification.md` and `global/` carry no tier enumerations —
  by design, not by omission.
- Orca trigger syntax listing `cron|RRULE` presets (`orca.md`,
  `loop-setup`) — CLI surface, not a fallback ladder.
- `docs/how-it-works/` provenance notes ("live/Live since AE/2.x") —
  ship-time names by the folder's own stated convention
  (how-it-works/README.md, ADR-003 note); the CHANGELOG maps them to
  0.x. Battery entry 3 does not apply there (correction recorded
  MAT-59: a sweep renumbered them, the convention was found, the
  renumbering reverted).

## Records vs living docs

Dated records — `docs/plans/`, `docs/adrs/`, CHANGELOG entries, SPEC
decision text — are history: annotate (amendment pointers) or leave.
Living docs — README, reference/, how-it-works, skills, loops,
templates — must be true today. When one file holds both (the SPEC), the
annotation goes next to the stale law and the law stays as written.
