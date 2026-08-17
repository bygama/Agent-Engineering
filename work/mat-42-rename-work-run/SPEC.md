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

## Scope extension (owner, 2026-08-17)

- `skills/agent-init/` → `skills/ae-init/` and `skills/agent-audit/` →
  `skills/ae-audit/` (git mv, frontmatter names, every living
  reference: the other's checklist/references, using-ae map, README,
  AGENTS.md map + gotcha lines, reference/skills.md, how-it-works
  chapters, templates that cite them). The `agent-lint` SCRIPT keeps
  its name (consumer AGENTS.md Commands cite it — renaming would
  break them). Records keep old names (CHANGELOG, plans, ADR bodies).
  Self-referencing paths inside the two skills (e.g.
  `skills/agent-init/references/migration.md` citations) follow the
  rename.
- `reference/skills.md` gains the placement rule: AE ships the
  fundamental skills (lifecycle + replication); complementary
  methodology skills live in the personal library (bygama/skills,
  junctioned); a complementary skill that becomes load-bearing for the
  standard moves upstream into AE.

## DoD

`git grep -i relay` hits ONLY records (docs/adrs/, docs/plans/,
CHANGELOG.md, migration.md's 1.1.0-1.2.0 notes, closed-lane history);
all four gates exit 0. Release ritual runs after (expected MINOR;
migration note: rename is machine-global via junctions — consumers
optionally refresh docs/tiers.md).
