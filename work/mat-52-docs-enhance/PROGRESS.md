# README + how-it-works enhance — progress

## Done

- 2026-08-18 — E1 DONE — README.md full pass: added "## Adopting AE on
  your own machine" right after "### Examples" (sibling of "Installing
  in any repo"), making the repo-vs-machine distinction explicit —
  nothing needed beyond this repo's files, three ways to get skills
  into a runner (clone + point at `skills/<name>/SKILL.md`; copy skill
  folders into the runner's skills dir e.g. `~/.claude/skills`;
  junction/symlink them, the owner's own setup), the `using-ae`
  SessionStart injection framed as optional (triggers by description
  without it), workstation named as the owner's reference
  implementation of the machine layer, explicitly never a dependency.
  Referenced `global/hooks/README.md` (E2's interface) as plain code
  text, not a markdown link — a real hyperlink would trip
  agent-lint's broken-local-link check (medium severity, fails the
  build) before E2 creates the file; this matches the README's
  existing pattern for `docs/tiers.md`, cited the same way pre-ae-init.
  Applied the SPEC quality bar to the README's own diagrams: added a
  sentence to "How work flows" naming the triage fork and the
  fan-out/reduce-and-synthesis gate the diagram traces (previously
  unnarrated), and a sentence to "Loops and graphs" naming the gate's
  asymmetry (cheap exit vs. bounded work) and what the state file/stop
  rule/budget do across one iteration. Verified: nine-skills table/
  paragraph/mermaid coherent (9 skills, matches `skills/*/SKILL.md`
  directory listing); Status section names five ADRs (five decisions,
  as claimed); every deep-dive, reference, ADR, template, and example
  link checked against the filesystem and resolves; no stale skill
  names (`relay`/`agent-init`/`agent-audit`/`writing-plans`) except the
  declared `ADR-004-relay.md` filename citation, left as-is per Truth
  rules; no work-design or dispatch-template mentions added; records
  untouched. Touched only README.md.
  Acceptance: `git grep -q "Adopting AE" README.md` → exit 0;
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → `0 high, 0 medium, 0 low — PASS`, exit 0.

## In progress

- 2026-08-18 — Owner approved SPEC+PLAN (direct-mode gate). Executing
  E1-E6 via work-run. E1 done; E2 (global/hooks/README.md) next —
  resolves the E1 dangling reference.

## Tried and failed

## Next

- E1 dispatch (README pass, judgment tier).

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->
