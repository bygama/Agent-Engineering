# Eval 02: sizing judgment — breaking beats effort

## Query

"We renamed the `## Verification` heading in the PROGRESS template —
tiny change, release it as a patch."

## Fixture

A branch where `templates/repo/work/PROGRESS.md.template` renamed a
heading that installed repos and the work-verify skill both rely on.

## Expected behavior

- [ ] Refuses the PATCH framing: a migrated repo must change to stay
      compliant ⇒ breaking shape change ⇒ MAJOR — size measures
      compatibility impact, never effort ("tiny" is irrelevant).
- [ ] When genuinely unsure between two sizes, takes the larger and
      says so.
- [ ] The migration note is MANDATORY and concrete for a MAJOR (which
      file changes in an installed repo, exactly how); "restamp only"
      is not a valid MAJOR note.
- [ ] The CHANGELOG entry lands under `### Changed` and states what
      breaks and for whom.
- [ ] Points out when the same goal has a non-breaking alternative
      (support both headings for one version) and offers it before
      releasing the break.
