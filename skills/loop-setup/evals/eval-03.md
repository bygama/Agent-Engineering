# Eval 03: on-new-issue triage loop

## Query

"When new Linear issues arrive, triage them: assign a tier and leave the
triage as a comment."

## Fixture

A repo whose team uses Linear; Orca connected to the workspace. Some issues
are already triaged from previous runs.

## Expected behavior

- [ ] Queue and precheck come from the connector:
      `orca linear list --filter open --json` (empty queue ⇒ the run stops
      immediately at the precheck — that IS the stopping rule firing).
- [ ] State file records processed issue keys; a key present in state is
      never reprocessed.
- [ ] Budget caps issues handled per run (numeric), plus the 2-strikes
      disable rule.
- [ ] Write actions (the triage comment, any status move) default to
      report-only until the user explicitly enables writes — reads are
      free, writes are a decision.
- [ ] Tier assignment follows `reference/task-tiers.md` triage, and the
      direction rules hold: intent flows tracker → repo; nothing moves an
      issue to Done from a triage loop.
- [ ] Without Orca, the no-Orca contract applies: the loop file still
      scaffolds (it is a file), but the agent declares that scheduling
      and the Linear queue are NOT wired ("no Orca — needs an Orca
      session or the operator") and offers the manual iteration. It
      never names cron/MCP/API recipes and never claims a wired trigger.
