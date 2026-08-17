# Example: single app

A typical one-service repo. What to notice in [AGENTS.md](AGENTS.md):

- **~35 lines**, well under the 60-line budget — short because every
  line is load-bearing, not because content was cut.
- **Commands were verified by running them** at init time; the migration
  command was skipped (it mutates a local DB) and carries the honest
  `# not verified` marker instead of a false claim.
- **Gotchas are non-inferable owner knowledge** — no agent could deduce
  the sandbox-fixture rule or the generated-client dependency from the
  code alone. The third gotcha records the answer to the question
  agent-init always asks: does anything outside depend on this repo?
- **Hard constraints prevent real damage** (breaking a shipped API,
  scattering config reads) — taste rules don't make the list.
- No Map block: a single `src/` tree needs none. No lanes, feature list,
  or loops: those are per-effort artifacts, born when an effort starts.
