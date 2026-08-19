# Eval 07: fresh install on a UI repo — the browser gotcha

Origin failure: an agent facing web work drives whatever browser is
installed — Playwright, chrome-devtools, claude-in-chrome — because it is
installed. Each of those is a long-lived process the session owns: from a
supervised child it blocks the card's working→idle transition and dies with
the session, while a runner's own embedded browser lives in the app and
outlives it (`reference/orca.md`, "The browser criterion";
`skills/orchestrate/references/dispatch-child.md`). The criterion is worth
one line of always-loaded context in a repo that has a UI, no line at all in
a repo that has none — and no question in either.

## Query

"Set up the agent-engineering standard in this repo."

## Fixture

Two runs on the same machine, which carries Playwright and chrome-devtools
MCPs installed and connected, in a worktree Orca manages. In both runs the
owner is silent about browsers, testing tools and DESIGN.md.

- **Run A** — a fresh repo shaped like eval-01's (one manifest, `src/` tree,
  no AGENTS.md/CLAUDE.md, no docs/) whose stack is plainly a UI: components,
  stylesheets, a dev-server script. That is the signal step 1 already looks
  for — the one that makes step 6 offer `DESIGN.md.template`. Run twice:
  the DESIGN.md offer accepted, then declined.
- **Run B** — the same repo with the UI removed: a CLI/library with no
  rendering surface (one manifest, `src/`, a bin entry, unit tests). No UI
  signal, so no DESIGN.md offer either.

## Expected behavior

- [ ] Run A — the instantiated root AGENTS.md gains exactly ONE Gotchas
      bullet about browser work, on the strength of step 1's UI detection
      alone: the same detection that makes step 6 offer
      `DESIGN.md.template`, never a second pass or a new signal of its own.
- [ ] Run A — nobody is asked. The bullet is written the way eval-04's
      language split is written: inferred while exploring, never raised in
      the interview, which stays gotchas / hard constraints / compatibility
      (plus the tracker question when a tracker is in play).
- [ ] Run A — the bullet carries the criterion's three clauses and nothing
      else (`reference/orca.md`, "The browser criterion" — cited, not
      restated): prefer the runner's own embedded or app-managed browser;
      reach for a driven-browser MCP only for a capability that browser
      lacks (performance traces, heap snapshots, a11y audits, device
      emulation); never drive one from a supervised child session.
      "Already installed", habit and convenience are not lacked
      capabilities.
- [ ] Run A — the bullet is RUNTIME-NEUTRAL: no runner named, no product
      named, no command written, and it reads correctly for an agent whose
      runner is not the one that installed the repo. Writing `orca
      goto/snapshot/click` into the generated file is the regression this
      run exists to catch — the Orca-managed worktree is the temptation,
      and the split is the standard's own: artifacts are runner-neutral
      files, execution features belong to the runner (`reference/orca.md`).
      The rule travels into the repo; the command does not.
- [ ] Run A — the two sub-runs agree: declining the DESIGN.md offer changes
      nothing about the bullet. They share a trigger, not an answer, and
      the bullet is not itself offered — it is context ae-init writes, not
      an artifact the owner opts into.
- [ ] Run A — one bullet in one place, the root AGENTS.md Gotchas block. No
      browser section, no `docs/` page, no repo skill, no per-tool command
      list, and no Hard constraints entry: Gotchas is where a non-inferable
      working fact belongs, Hard constraints stays reserved for genuine
      safety rules (`templates/repo/AGENTS.md.template`).
- [ ] Run A — ae-init changes nothing about the machine: no MCP installed,
      configured, disabled or probed. The bullet is not a command, so step
      4's verify-by-running does not apply to it.
- [ ] Run A — budgets hold with the bullet present: root AGENTS.md ≤60
      lines, pointer CLAUDE.md ≤3, and agent-lint exits 0.
- [ ] Run B — NO browser line anywhere: not in Gotchas, not in Hard
      constraints, not in docs/. A repo with no rendering surface gets no
      browser advice, however many browser MCPs the machine carries.
- [ ] Run B — and no question about it either: no "do you run browser
      tests?", no offer, no mention in the final report. Friction on every
      non-UI install is the regression this run exists to catch, for the
      same reason the DESIGN.md offer stays silent here.
- [ ] Rest of the fresh-install contract unchanged in both runs: explores
      before asking, profile asked once, commands verified by running them,
      base skeleton only, no `work/` lane and no feature list, and ae-audit
      as the final gate with lint exiting 0.
