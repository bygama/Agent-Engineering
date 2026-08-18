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

- 2026-08-18 — E3 DONE — docs/how-it-works/README.md index +
  architecture.md pass. Checked all five index rows against their
  chapters' current content (post-1.1.0-1.3.0): architecture.md's row
  named only "the directory map, what each part answers, how they
  connect", silent on "the six layers", "the phase ladder", and
  "design rules that bind this repo" — three sections making up half
  the chapter — so the row now names all four; work-lifecycle.md's row
  listed tiers/lanes/four-files/feature-list/tracker-plane but omitted
  the lane lifecycle (work-plan → work-run → work-verify → work-handoff)
  and the verification-layers section (incl. the adversarial-review
  seat) — both accreted since 1.1.0/1.2.0 — so the row now names both;
  standard-lifecycle.md, execution.md, and integrations.md rows already
  matched their chapters, left unchanged. Provenance Status column
  (`live since AE/2.x`) untouched per the SPEC's "do NOT modernize"
  rule — that column names versions current at ship time, not skill
  names.
  In architecture.md: the `### skills/` section still said "Live, all
  six" and enumerated only ae-init/ae-audit/work-verify/work-handoff/
  loop-setup/fan-out — silent on using-ae, work-plan, and work-run
  entirely. Rewrote to the current nine, added `work-run` (1.1.0,
  ADR-004 gave execution a house owner) and `work-plan`/`using-ae`
  (1.2.0, ADR-005 generalized ADR-004 to every artifact-producing
  phase) with links to both ADRs; rewrote the "actors" paragraph to
  walk the full work-plan → work-run → work-verify → work-handoff chain
  and name using-ae as the entry point, plus one sentence noting suite
  planners/executors are superseded in writing by this chain. No stale
  names (relay/agent-init/agent-audit) introduced — ADR-004's filename
  (`ADR-004-relay.md`) is the only "relay" text, kept as the citable
  record per the file's own status-line note.
  Diagram pass: "The map" flowchart's `GLB` node (`global/`) carried no
  edge and no prose ever mentioned it — added one clause to the
  existing "Read the arrows" paragraph explaining `global/` sits
  outside the dependency chain on purpose (applied by a separate
  machine-setup mechanism, not consumed in-repo). The phase-ladder
  diagram's prose already named what to see (each phase's
  self-sufficiency, the one-way progression) — left as-is. No
  folder-structure diagrams added or found. No work-design or dispatch-
  template mentions; records (ADRs, CHANGELOG) untouched. Touched only
  docs/how-it-works/README.md and docs/how-it-works/architecture.md.
  Acceptance: index rows now match chapter contents (reviewer
  judgment, reasoning above); `node scripts/agent-lint.mjs .
  --ignore tests,templates,global,examples` → `0 high, 0 medium, 0 low
  — PASS`, exit 0.

## In progress

- 2026-08-18 — Owner approved SPEC+PLAN (direct-mode gate). Executing
  E1-E6 via work-run. E1 done; E2 (global/hooks/README.md) next —
  resolves the E1 dangling reference.
- 2026-08-18 — E2 DONE — global/hooks/README.md created: one paragraph
  framing the folder as canonical SessionStart hooks the standard ships
  and applied by workstation installer to ~/.claude/hooks/ (or wired
  manually on other machines); one line per hook (orca-probe: session
  Orca availability, using-ae: entry skill emission); SessionStart
  settings.json example with absolute path requirement (MAT-31 lesson),
  hook optionality note (triggers still work by description), and skill
  reachability note (silent by design if skill not found). Acceptance:
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → `0 high, 0 medium, 0 low — PASS`, exit 0.

## Tried and failed

## Next

- E1 dispatch (README pass, judgment tier).

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->
