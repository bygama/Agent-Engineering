---
name: release
description: Repo-local skill for the Agent-Engineering repo — runs the version-bump ritual end to end (size by the SemVer criterion, Keep-a-Changelog entry, migration note, restamp surfaces, gates, post-merge tag). Use when a template or check change is about to ship, or when the owner says "release". Refuses docs-only releases. Never junctioned, never installed in consumers.
---

# Release

Operationalizes the bump ritual whose law lives in the `CHANGELOG.md`
header. The characteristic failures it exists to stop: a bump sized by
effort instead of compatibility, a release with no migration note, a
stale stamp surface, and a tag that never got pushed.

## Workflow

Copy this checklist and tick items off:

```
Release progress:
- [ ] 1. Qualify: did a template or check change?
- [ ] 2. Size the bump (SemVer criterion)
- [ ] 3. CHANGELOG entry
- [ ] 4. Migration note
- [ ] 5. Restamp surfaces
- [ ] 6. Gates + PR (house flow)
- [ ] 7. Tag post-merge + verify
```

**1. Qualify.** Only template or check changes release. Docs-only
refresh ⇒ STOP and say so — no version, no restamp, no tag. When the
owner insists, ask what template or check actually changed.

The set must also be COMPLETE, not just coherent: when a RELATED lane
is queued or in flight (same capability family), propose holding the
bump — related sets accumulate unreleased and ship as one release when
the set completes. The owner paces releases; never bump past that
question. A second bump in the same day always needs the owner's
explicit yes. "Template or check changes always bump" means they always
END UP in a release — never shipped silently — not bump-per-merge.

**2. Size the bump.** The criterion (CHANGELOG header, ADR-007): a
migrated repo must change to stay compliant ⇒ **MAJOR**; an
owner-designated milestone package ⇒ **MINOR**; everything else
backward compatible — fixes, errata, AND incremental capability —
⇒ **PATCH**. Milestone designation is the owner's, never inferred:
when it is unclear whether a set is a milestone, ASK. Breaking-vs-not
still measures compatibility impact, never effort. Before releasing a
MAJOR, check whether a non-breaking alternative exists (e.g. support
both shapes for one version) and offer it.

**3. CHANGELOG entry.** Keep a Changelog form: `## [X.Y.Z] — <ISO
date>`, newest on top, sections from
Added/Changed/Deprecated/Removed/Fixed/Security, humans-first prose.
Existing entries are records — never edited, never re-dated (the 0.6.1
lesson).

**4. Migration note.** `skills/ae-init/references/migration.md`
gains the per-version note: exactly what changes in an installed repo.
"Restamp only" is valid for MINOR/PATCH; a MAJOR's note must be
concrete (which file, what change) — no note, no merge.

**5. Restamp surfaces.** Exactly the list in the docs-sweep battery
(`.claude/skills/docs-sweep/references/patterns.md`, "Restamp
surfaces"): root `AGENTS.md`, `templates/repo/AGENTS.md.template`,
`tests/fixtures/v2-clean/AGENTS.md` — never `examples/` (authoring-time
snapshots), never the README badge (it reads the latest tag).

**6. Gates + PR.** All four gates exit 0, then the house flow: tracker
issue, branch, conventional commits, rebase-merged PR. Never direct to
main; never tag from the branch.

**7. Tag post-merge.** On the rebased release commit on `main`:
`git tag -a vX.Y.Z -m "<one-line summary>"` + push the tag. Verify —
`git tag -l vX.Y.Z` AND a remote check (`git ls-remote --tags`) — and
never claim the tag exists without both. The README badge updates by
itself. Report: version, criterion applied, surfaces restamped, tag
verified.

## Judgment notes

- Consumers are never notified: repos never poll — the next ae-audit
  finds them behind and ae-init migrates them. That is the design,
  not an omission.
- One release per coherent change set; never batch unrelated bumps to
  "save a version number".
- Sizing follows ADR-007, not effort and not pacing: PATCH absorbs
  incremental capability; MINOR is only ever an owner-designated
  milestone; reserved milestone numbers (e.g. "1.4.0 is the
  orchestration package") are honored — nothing else may take them
  (born from the aborted fourth same-day bump, MAT-53/MAT-54).
- When the release itself changes this skill's inputs (the criterion,
  the surfaces list), those docs change in the same PR — the ritual and
  its law never drift apart.
