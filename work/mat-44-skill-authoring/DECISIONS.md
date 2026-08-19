# skill-authoring — decisions

<!-- Append-only: date — choice — why. -->
- 2026-08-19 — Ship the METHOD only; `reference/skills.md` stays the law
  and is cited by pointer, never restated — the standard already
  legislates authoring (frontmatter, budgets, degrees of freedom,
  progressive disclosure, the >=3-evals skeleton). A skill that
  re-states law creates two sources of truth for the same rule.
- 2026-08-19 — YAGNI'd from superpowers' `writing-skills`: SDO /
  keyword / naming guidance, token-efficiency targets,
  directory-structure and file-organization sections, multi-language
  anti-patterns (all already law in `reference/skills.md`); flowchart /
  graphviz conventions and the renderer script (no house need);
  `persuasion-principles.md` as its own file (its one actionable
  sentence rides inside the reference file instead). Parent approved
  the list at the SPEC gate.
- 2026-08-19 — One non-law addition kept: a description states what +
  when, never a step-by-step workflow summary. Grounds: the source's
  own testing found a summarized workflow becomes the shortcut agents
  take instead of reading the body. Parent approved.
- 2026-08-19 — `skills/using-ae/` gains NO `skill-authoring` map row in
  this lane — parent ruling at the SPEC gate: the row is neither this
  lane's nor the sibling's. MAT-87 owns using-ae this wave and is at its
  80-line cap, and this skill does not exist until this lane merges, so
  a row added now would name a missing skill. The parent filed a
  follow-up ticket (map row + the budget trim it needs) to run after
  both lanes land. Deliberate deferral, not an omission.
- 2026-08-19 — The forward TDD supersession row names `bygama/skills`'
  `testing-first` (parent ruling; the sibling lane proposed that slug
  over a bare `test-driven-development` because a bare one junctioned
  into `~/.claude/skills` collides permanently in the picker with the
  still-installed suite skill). Written before that skill exists on
  main: the row states the supersession without claiming a path in THIS
  repo, and is sourced from the ruling rather than an observed
  directory — if the sibling PR ships a different slug, this row is the
  thing to correct.
