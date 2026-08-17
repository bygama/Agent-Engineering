# rename relay → work-run — progress

## Done

- 2026-08-17 — R1 DONE_WITH_CONCERNS — mechanical sweep: `git mv
  skills/relay skills/work-run`; frontmatter `name: work-run`; every
  living "relay" reference renamed (SKILL.md intro rephrased off the
  baton metaphor, fan-out pairing line now "work-run = sequential
  within a lane; fan-out = parallel across lanes", evals ×4; AGENTS.md
  map line; README.md table row/chain paragraph/mermaid node/Status
  sentence; reference/skills.md; reference/task-tiers.md;
  templates/repo/docs/tiers.md; docs/how-it-works/work-lifecycle.md +
  execution.md; skills/using-ae/SKILL.md; skills/work-plan/SKILL.md +
  evals ×3). ADR-004's Status line gained the rename note verbatim;
  body and filename untouched (record). Records (CHANGELOG, docs/plans,
  migration.md, ADR-005 body) untouched. All four gates exit 0 —
  eval-checks confirms `work-run: 4 evals well-formed` and no `relay`
  dir listed. Acceptance grep #1 exits 0, not the expected 1: 2
  residual hits are the unrenamed `docs/adrs/ADR-004-relay.md`
  filename cited from README.md and reference/task-tiers.md — SPEC's
  own living-reference list for those two files names only the table
  row/chain paragraph/mermaid/Status-sentence/L-row, never the ADR-004
  link, so this is the filename-kept-as-record rule's expected
  footprint, not a leftover. No other living "relay" text remains
  (verified: `grep -vi ADR-004-relay.md` on both hits returns nothing).

- 2026-08-17 — R1b DONE_WITH_CONCERNS — scope-extension sweep:
  `git mv skills/agent-init skills/ae-init`, `git mv skills/agent-audit
  skills/ae-audit`; frontmatter `name:` + H1 titles updated in both;
  every living "agent-init"/"agent-audit" mention renamed to
  "ae-init"/"ae-audit" across: both skills' own SKILL.md + evals;
  skills/using-ae/SKILL.md map; README.md (table rows, prose, install
  link, gate sentence); AGENTS.md (gotcha line, Replication-skills map);
  reference/skills.md (naming examples, PLUS new "## Placement" section
  stating AE ships the fundamental skills — lifecycle + replication —
  complementary methodology skills live in bygama/skills (junctioned),
  and a complementary skill that becomes load-bearing moves upstream
  into AE); reference/context.md, reference/tracker.md,
  reference/design-md.md; docs/how-it-works/architecture.md (3 spots,
  one missed on first pass and fixed on re-grep),
  docs/how-it-works/integrations.md, docs/how-it-works/work-lifecycle.md,
  docs/how-it-works/standard-lifecycle.md (5 spots incl. two `##`
  headers and a mermaid node); templates/community/MATRIX.md;
  loops/self-audit.md; .claude/skills/docs-sweep/references/patterns.md;
  .claude/skills/release/SKILL.md + evals/eval-01.md (migration.md path
  citations); .github/ISSUE_TEMPLATE/upstream-report.md;
  scripts/agent-lint.mjs (2 comments — `agent-lint` itself untouched,
  confirmed via `git grep ae-lint` returning nothing);
  tests/run-lint-tests.mjs (1 comment); tests/fixtures/kitchen-sink/
  MANIFEST.md (3 spots — descriptive references to the audit skill, not
  planted violation content, so in scope per SPEC's "tests only if they
  reference the skills by name" clause). Self-referencing skill paths
  (`skills/agent-init/references/migration.md` citations) followed the
  rename everywhere they appeared outside excluded/record paths. All
  four gates exit 0; eval-checks lists `ae-init: 3 evals well-formed`
  and `ae-audit: 4 evals well-formed`, no `agent-init`/`agent-audit`
  entry remains.
  CONCERN for controller ruling: acceptance grep #1 exits 0, not 1 — 4
  residual hits, all judged record-like and left untouched:
  `docs/specs/SPEC-agent-engineering.md` and `docs/specs/SPEC-design-
  md.md` (both entirely under a `## Decisions (fixed)` header; the
  repo's own docs-sweep ratchet, `.claude/skills/docs-sweep/references/
  patterns.md` "Records vs living docs", explicitly names "SPEC
  decision text" as history — "annotate or leave" — same class as
  docs/adrs and docs/plans, just not in the acceptance grep's exclusion
  list); `examples/README.md` and `examples/single-app/README.md` (the
  same patterns.md file's "Deliberate-clean list" already covers
  `examples/` by name: "authoring-time snapshots... their staleness is
  by design, the READMEs say so" — the agent-init mentions are in that
  same caption prose, not generated snapshot content, but the carve-out
  reads as covering the READMEs' text, not just AGENTS.md/CLAUDE.md
  stamps inside each example). Cost if the ruling disagrees: 4 small
  edits (2 SPEC prose swaps across ~20 lines total that would then need
  the historical-vs-living line reconsidered repo-wide; 2 one-line
  caption edits in examples/), no structural rework either way.

## In progress

- 2026-08-17 — Lane opened; rename approved by owner in chat.

## Tried and failed

## Next

- R1 dispatch (batched mechanical sweep).

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->
