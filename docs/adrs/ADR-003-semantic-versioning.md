# ADR-003: Semantic versioning and the renumbered line

Date: 2026-08-17
Status: Accepted <!-- MINOR/PATCH split re-weighted by ADR-007 (milestone versioning, 2026-08-18); MAJOR boundary and the renumbered line unchanged -->

## Context

The standard versioned as `AE/<major>.<minor>` with a single trigger
(template or check change) and no size signal: a one-word errata
(AE/2.6) and tier XL (AE/2.5) bumped identically. The owner wants small
fixes distinguishable from new capability, per common practice. The
line also started at 2.0 to honor a predecessor generation, which read
as an unexplained gap.

## Decision

Adopt Semantic Versioning 2.0.0 and Keep a Changelog 1.1.0 (both
verified at source 2026-08-17). Stamp format:
`Standard: AE/MAJOR.MINOR.PATCH` — MAJOR breaking shape change, MINOR
backward-compatible capability, PATCH fix/errata. Renumber the history:
the predecessor generation is 0.1.0; AE/2.0–2.6 become the 0.x
initial-development line (SemVer: "major version zero — anything may
change"), former names kept per CHANGELOG entry; 1.0.0 declares the
standard stable on 2026-08-17.

## Consequences

- Consumers can tell a fix from a capability from a break by the stamp.
- Old two-part stamps stay valid shapes (lint) and read as behind
  (audit); migrating to 1.0.0 is a restamp, nothing else.
- The CHANGELOG carries the criterion in its header and the former-name
  mapping per entry; migration notes stay per-version.
- Amends SPEC Decision 3 (stamp format example).

## Alternatives considered

- Keep `AE/<major>.<minor>` — no size signal; the missing-1.x question
  recurs forever.
- CalVer — dates say when, not how big; migration planning needs size.
- Renumber nothing and start SemVer at 3.0.0 — carries the gap forward
  and misses the 0.x = initial-development fit.
