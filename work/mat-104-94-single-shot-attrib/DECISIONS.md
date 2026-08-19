# Single-shot worker_done + upstream attribution stance — decisions

<!-- Append-only: date — choice — why. -->
- 2026-08-19 — SPEC approved as written by the parent orchestrator
  (work-plan design-first gate, via orchestration ask): "APPROVED as
  written — a 1:1 formalization of the shaped brief is exactly what
  design-first expects here; the judgment already happened at dispatch.
  Shape PLAN.md and proceed." — the dispatch brief is the settled
  design; this lane formalizes it, it does not re-decide it.
- 2026-08-19 — MAT-94 owner ruling carried from the ticket (recorded at
  dispatch): evidence-based classification — copyright protects
  expression, not ideas; notices are ADDITIVE, the repo stays MIT
  (c) 2026 Mateo Garcia — binding for step 4's classifications.
- 2026-08-19 — Parent mid-flight directive (msg_58ffdcfc9878, restated
  in full over ask after the first check consumed the body): ADDITIVE
  scope, folded into this lane as PLAN step 2b. Live finding: the
  MAT-91 review seat read reviewer.md's "Check out or fetch [BRANCH] to
  read it" and created its OWN raw `git worktree add` under
  Temp/opencode/ — a detached-HEAD checkout outside Orca's ledger that
  survived the wave's decommission as debris (the parent removes
  Orca-managed worktrees only) and was removed by hand. Fix in
  reviewer.md's fenced seat brief: the seat's worktree is ALREADY
  checked out on the lane branch at launch; reading and command-running
  happen IN PLACE; `git fetch` only if the branch moved since launch;
  creating checkouts or worktrees of its own is forbidden; the "Check
  out or fetch [BRANCH]" wording adjusted so it can no longer be read
  as an instruction to create one.
- 2026-08-19 — Step 2b needs no eval-03 line change — eval-03 grades
  the PARENT's review-wave behavior (launch mechanics, stall clock,
  verdict routing), which this seat-brief content change does not
  alter; the same ruling step 2's seat-side warning followed. The
  parent's directive conditioned evals-first on "if it alters graded
  behavior" — it does not.
- 2026-08-19 — MAT-94 step 4, upstream source: the superpowers 6.3.0
  cache IS present at
  `C:/Users/mateo/.claude/plugins/cache/claude-plugins-official/superpowers/6.3.0/skills/`
  (dated 2026-08-12; `brainstorming/SKILL.md` 251 lines,
  `writing-skills/SKILL.md` 680 lines). Both classifications below rest
  on a real diff against those files, not on port records. Method:
  case- and punctuation-insensitive word-n-gram overlap (n=4 and n=6),
  overlapping hits merged into maximal runs, then each run read by hand
  in both files to separate ported expression from shared vocabulary.
- 2026-08-19 — `skills/shaping/SKILL.md` vs upstream `brainstorming` —
  classification: **ported expression, localized → upstream notice
  appended.** Evidence: 990 house words vs 2314 upstream; 55 shared
  4-grams / 35 shared 6-grams, merging to 14 maximal runs (n=4) of
  which 4 survive at n=6. Three of those are protectable sentences
  copied near-verbatim, and they cluster in exactly two sections:
  (a) Red flags row 2 — 25 words verbatim, house `"It's obvious — I'll
  start while they read it" | The gate is the approval, not the
  design's length. Present, then stop until you hear yes.` against
  upstream `"It's bounded and the design is obvious — I'll start while
  they read it" | The gate is the approval, not the design's length.
  Present, then stop until you hear yes.` — the Reality cell is
  identical word for word; (b) Red flags row 1 — 14 words, house
  `"Too simple to need a design" | Simple means a short design, not no
  design — ...` against upstream `"This is too simple to need a
  design" | Simple means a short design, not no design. ...`; (c) the
  `<HARD-GATE>` block — 10 words verbatim, `what scales with
  simplicity is the artifact, never the approval`, upstream's own
  aphorism, inside a `<HARD-GATE>` tag that is also upstream's device.
  The remaining runs are shared vocabulary, not expression ("2-3
  approaches with trade-offs", "purpose, constraints, success
  criteria", "one at a time") — unprotectable terms of art. Everything
  else is house-original: the Workflow checklist, step 0's
  tier-consumption rule, the feasibility-probe path, the work-plan
  handoff, the Judgment notes; upstream's three-path ladder, process-
  flow digraph, spec-document sections and visual companion are all
  absent. So the dispatch prior ("designed fresh in an owner dialogue")
  is only two-thirds right: the SKELETON is fresh, but 2 of the 3 Red
  flags rows and the gate's closing line are upstream's wording — and
  the file's own header already says "Adapted from superpowers'
  `brainstorming`". Verbatim expression is present, so this is NOT an
  idea-only rewrite; the notice goes in, naming the two borrowed
  sections.
- 2026-08-19 — `skills/skill-authoring/SKILL.md` vs upstream
  `writing-skills` — classification: **substantial ported expression
  and structure → upstream notice appended.** Evidence: 1518 house
  words vs 3600 upstream; 184 shared 4-grams / 134 shared 6-grams,
  merging to 31 maximal runs (n=4), 17 of which survive at n=6 —
  roughly 5x shaping's density on a file only 1.5x its size. The
  overlap is not aphorisms but whole passages: a 41-word verbatim run
  (`express a real exception as its own conditional on an observable
  predicate. Exemption clauses don't scope. "This limit doesn't apply
  to code blocks" still suppresses code blocks. If part of the output
  must be exempt, restructure so the rule ...`), a 21-word run carrying
  two full table cells (`Positive recipe or contract: state what the
  output IS — its parts, in order | Prohibition list ("don't restate",
  "never narrate")`), a 17-word run carrying two more, plus 16-word
  runs for `A recipe leaves nothing to negotiate: the output matches
  the stated shape or it doesn't` and `Five different interpretations
  across five reps means the wording isn't binding — tighten the form
  before adding words`. Section by section: house §2 "Classify the
  failure, then pick the form" is upstream's "Match the Form to the
  Failure" — all four table rows in the same order with the same
  right/wrong-form pairs, followed by the same "why prohibitions
  backfire" paragraph and the same two rules, condensed but not
  re-expressed; house §5's micro-test bullets are upstream's
  "Micro-Test Wording Before Full Scenarios" items 2 and 5; the Core
  principle restates upstream's `If you didn't watch an agent fail
  without the skill, you don't know if the skill teaches the right
  thing.` House-original: the RED/GREEN/REFACTOR checklist wording, the
  probe/collect discipline, the "a request is not evidence" rule, the
  rationalization table's rows, the `reference/skills.md`
  law-vs-method split. So the dispatch prior ("stole the METHOD")
  understates it — method vocabulary would not have crossed the line on
  its own, but the ported table rows and the wording-test findings are
  upstream's sentences, and the file already cites them in-line as
  "(source: superpowers' `writing-skills` wording tests)". Notice goes
  in.
- 2026-08-19 — Notice shape, both files: a 4-line `## Attribution`
  section at the end (upstream project, upstream skill, MIT (c) 2025
  Jesse Vincent), naming WHICH sections are adapted and restating that
  the notice is additive — the file stays MIT (c) 2026 Mateo García
  per `LICENSE`. No repo-wide notice, no LICENSE edit: the owner ruling
  is that notices are additive and per-file. Budget checked: the only
  lint budget touching `skills/**/SKILL.md` is `skill-size` (<500
  lines) plus the 80-line entry-skill cap on `using-ae`; shaping goes
  110 → 117 and skill-authoring 186 → 193, both far under, and neither
  is the entry skill.
