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

- 2026-08-18 — E4 DONE — docs/how-it-works/work-lifecycle.md re-woven per
  the bar. The chapter's arc already matched the target order (triage →
  lane/four files → lane lifecycle → verification layers → feature list
  → tracker plane), so the fix was narrower than a reorder: the two
  accreted passages (work-plan, work-run) inside "## The lane lifecycle"
  needed stronger diagram narration and one missing detail, not
  relocation. Changes: (1) the lane-lifecycle overview diagram (intake →
  triage → work → verify → handoff) got a one-line lead-in and a "What to
  see" sentence naming the mechanism the diagram bar item 2 asked for —
  the fail edge looping straight back into `W` (work in lane) vs. the
  pass edge exiting to the two skills below, previously left for the
  reader to infer from node labels alone; (2) the work-plan passage
  gained its missing two-modes summary (design-first stops for SPEC
  approval before PLAN; direct writes both in one pass) plus an explicit
  "the skill's own doc owns the rest" pointer, both absent before even
  though work-plan's SKILL.md leads with the mode split; (3) the work-run
  passage got the same "skill doc owns the fix-loop/role-hint detail"
  pointer and a paragraph reflow (a stray mid-sentence line break from an
  earlier bolt-on); (4) the work-handoff close/pause diagram gained a
  lead-in and a "What to see" sentence naming the three-way fork
  (close/pause/refuse) the diagram already drew but no prose named — the
  refuse branch was previously undernarrated next to close and pause.
  The two diagrams that already carried adequate narration (tier-triage
  ratchet, feature-list `passing` irreversibility) were left untouched —
  re-verified against the bar, not rewritten for its own sake. No
  unshipped features (work-design, dispatch templates) mentioned; ADR-004
  (work-run/execution ownership) and ADR-005 (work-plan/planning
  ownership) citations preserved where they already explained ownership;
  provenance blockquotes and "live since AE/2.x" notes left AS WRITTEN;
  records untouched. Skimmed skills/work-plan/SKILL.md and
  skills/work-run/SKILL.md first to confirm the mode split and fix-loop
  description match their contracts exactly. Touched only
  docs/how-it-works/work-lifecycle.md.
  Acceptance: reviewer confirms all four mermaid diagrams placed with
  prose that says what to see (reasoning above); `node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples` →
  `0 high, 0 medium, 0 low — PASS`, exit 0.

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
