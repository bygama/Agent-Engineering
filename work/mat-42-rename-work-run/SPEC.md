---
issue: MAT-42
---
# rename relay → work-run — spec

<!-- Owner-written. The agent never edits this file. -->

Done looks like: the executor skill is named `work-run` everywhere it
lives; records keep their history. The lifecycle family reads
work-plan → work-run → work-verify → work-handoff. Owner approved in
chat, 2026-08-17.

## Rename (living surfaces)

- `skills/relay/` → `skills/work-run/` (git mv), frontmatter `name:
  work-run`, every "relay" occurrence inside SKILL.md + evals becomes
  work-run (prose adjusted where the sentence needs it — e.g. "a relay
  implementer" → "a work-run implementer"; drop or rephrase the
  baton/runner metaphor sentences so nothing reads as explaining a
  name that no longer exists).
- Living references: AGENTS.md (map line), README.md (table row, chain
  paragraph, mermaid node, Status sentence), reference/skills.md,
  reference/task-tiers.md, templates/repo/docs/tiers.md,
  docs/how-it-works/work-lifecycle.md, docs/how-it-works/execution.md,
  skills/using-ae/SKILL.md (map line), skills/work-plan/SKILL.md +
  evals (mentions of relay-shaped/relay's selector).

## Records (do NOT rewrite)

- CHANGELOG 1.1.0/1.2.0 entries, docs/plans/, migration.md's existing
  per-version notes, ADR-005 body: keep "relay" — they describe what
  shipped under that name.
- `docs/adrs/ADR-004-relay.md`: body untouched; ONLY the Status line
  gains the note `<!-- skill renamed work-run in the next MINOR
  (owner direction 2026-08-17); file name kept as record -->`.

## DoD

`git grep -i relay` hits ONLY records (docs/adrs/, docs/plans/,
CHANGELOG.md, migration.md's 1.1.0-1.2.0 notes, closed-lane history);
all four gates exit 0. Release ritual runs after (expected MINOR;
migration note: rename is machine-global via junctions — consumers
optionally refresh docs/tiers.md).
