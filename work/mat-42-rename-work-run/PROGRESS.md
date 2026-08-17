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

## In progress

- 2026-08-17 — Lane opened; rename approved by owner in chat.

## Tried and failed

## Next

- R1 dispatch (batched mechanical sweep).

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->
