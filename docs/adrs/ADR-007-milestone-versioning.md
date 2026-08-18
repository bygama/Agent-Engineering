# ADR-007: milestone-weighted versioning

Date: 2026-08-18
Status: Accepted <!-- Amends ADR-003 and the CHANGELOG header criterion -->

## Context

ADR-003 adopted strict SemVer: every backward-compatible capability is
a MINOR. One day of maintenance then shipped three MINORs
(1.1.0/1.2.0/1.3.0) and nearly a fourth — at which point the owner
interrupted: version numbers were reading as churn, and the numbers
carried no signal about what mattered. MAT-53 fixed the CADENCE
(related sets accumulate unreleased, one release per package); this
ADR fixes the WEIGHT: the owner wants MINOR to mean "a milestone of
the standard", not "any new skill file".

## Decision

The criterion becomes milestone-weighted:

- **MAJOR** — breaking shape change: a migrated repo must change to
  stay compliant. (Unchanged.)
- **MINOR** — an owner-designated milestone package: a coherent set
  the owner names as a milestone (a new layer of the standard, a
  system-level capability like the orchestration/worktrees package).
  Designation is the owner's, made at release time or reserved ahead.
- **PATCH** — everything else backward compatible: fixes, errata, AND
  incremental capability (new skills, templates, checks) that the
  owner has not designated a milestone.

This deviates deliberately from strict SemVer, which puts all new
capability in MINOR. The deviation is stated openly in the CHANGELOG
header; backward compatibility remains the MAJOR boundary, so
consumers' compatibility reading of the number is unaffected — only
the MINOR/PATCH split changes meaning.

## Consequences

- The CHANGELOG header criterion is reworded; ADR-003 carries a
  status-line pointer here. Existing releases keep their numbers
  (records never renumber).
- The release skill's Size step and eval-04 re-encode the criterion;
  when milestone status is unclear, the ritual asks the owner.
- Immediate application: the dispatch-templates + shaping package
  ships as 1.3.1; 1.4.0 is reserved for the worktrees/orchestration
  milestone (owner, 2026-08-18).

## Alternatives considered

- Strict SemVer (status quo) — rejected: MINOR churn with no signal;
  the owner reads numbers as milestones, not compatibility ledgers.
- Holding everything unreleased until milestones — rejected: small
  improvements would sit unshipped for weeks; PATCH keeps them
  flowing without consuming milestone numbers.
- CalVer — rejected: loses the breaking-change signal MAJOR carries.
