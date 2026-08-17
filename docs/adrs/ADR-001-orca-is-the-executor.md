# ADR-001: Orca is the executor

Date: 2026-08-16
Status: Accepted <!-- Amends SPEC Decision 9 -->

## Context

Decision 9 made Orca "preferred, never a dependency": every mapping
carried a no-Orca fallback (cron, `/schedule`, Linear MCP, plain API).
The fleet runs Orca; the fallback recipes were maintained prose nobody
executed, and dual paths cost attention in every skill read. The
portability proof (2026-08-16: opencode completed a prepared lane from
the artifacts alone) showed where neutrality actually lives — in the
files: lanes, gates, loops, PASS blocks.

## Decision

Orca is the executor of the standard. Execution features — scheduling,
managed parallelism, tracker CLI, card visibility — are Orca's: single
path, real commands, probed with `orca status --json` as step 0 of every
executing skill. Artifacts and quality gates remain runner-neutral files.
Where Orca is absent, the no-Orca contract applies (`reference/orca.md`):
everything that is a file still happens; Orca-only steps are declared NOT
done, never faked. Per-capability fallback recipes are removed.

## Consequences

- Skills carry a probe and one path, not ladders; features trim without
  Orca, quality never does.
- The portability claim narrows honestly: any file-reading agent can hold
  a lane; only Orca orchestrates.
- Five adopted primitives (agent-first spawn, card comments, card status,
  orchestration mail, built-in browser e2e) bind the standard deeper into
  Orca — deliberately.
- A machine without Orca loses scheduling, parallelism, and tracker
  writes until an Orca session or the operator picks them up.
- Reverting = restoring the AE/2.3 fallback columns from git history.

## Alternatives considered

- Keep dual paths (status quo) — maintained recipes nobody executes;
  attention tax on every skill read.
- Orca-required for artifacts too — breaks the proven any-runner lane
  portability for no gain; the files are free to keep neutral.
