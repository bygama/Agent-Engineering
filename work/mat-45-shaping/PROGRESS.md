# shaping — progress

## Done

- 2026-08-18 — Init phase: design closed by owner in MAT-45 (name,
  approach A, replace-not-additive, ADR-006, tier consumption, no
  companion); ADR-007 shipped first so the release sizes as the owner
  directed (1.3.1 package, 1.4.0 reserved).
- 2026-08-18 — H1 (judgment): all eval work first, per SPEC §4.
  - Created `skills/shaping/evals/eval-01.md` (dialogue shape: one
    question at a time, purpose/constraints/success criteria before
    approaches, 2-3 approaches with recommendation first, sectioned
    design confirmed section-by-section, no implementation before
    approval, YAGNI).
  - Created `skills/shaping/evals/eval-02.md` (tier consumption + gate:
    never re-triages using-ae's tier; the approval gate holds even for
    a "trivial" S-tier ask; a feasibility probe is treated as an
    S-tier probe — answer, report, keep nothing).
  - Created `skills/shaping/evals/eval-03.md` (supersession +
    fallback: superpowers' `brainstorming` yields to `shaping` citing
    ADR-006 in an AE-standard repo; falls back to `brainstorming`,
    named explicitly, only when AE isn't installed; never both at
    once).
  - Created `skills/shaping/evals/eval-04.md` (terminal handoff:
    approved design invokes work-plan design-first immediately;
    shaping writes no SPEC/PLAN/own folder; work-plan's own approval
    gate still applies; tier carried forward unchanged).
  - Reworded `skills/work-plan/evals/eval-05.md` scenario (c)'s
    checklist bullet: "points at brainstorming as the next step" →
    "invokes shaping as the next step".
  - Added one routing checklist bullet to
    `skills/using-ae/evals/eval-01.md` (the entry eval): the map must
    carry a `shaping` row for the design phase once MAT-45 H3 lands;
    marked as expected-to-fail-until-then, following the existing
    eval-03 forward-declaration pattern in that same skill.
  - `skills/shaping/` has no SKILL.md yet (H2), so
    `tests/run-eval-checks.mjs` does not yet enumerate its evals —
    expected per the plan's evals-before-content ordering; the command
    still exits 0 today (11 skills checked, all well-formed) and will
    pick up shaping's 4 evals automatically once H2 adds SKILL.md.
  - Acceptance: `node tests/run-eval-checks.mjs` → exit 0 ("all eval
    checks passed"). F01's verification is this same command — green.
  - Also ran `node scripts/agent-lint.mjs . --ignore
    tests,templates,global,examples` as a sanity check (not part of
    H1's acceptance): "0 high, 0 medium, 0 low — PASS".
  - Files changed: `skills/shaping/evals/eval-01.md` (new),
    `skills/shaping/evals/eval-02.md` (new),
    `skills/shaping/evals/eval-03.md` (new),
    `skills/shaping/evals/eval-04.md` (new),
    `skills/work-plan/evals/eval-05.md` (edit),
    `skills/using-ae/evals/eval-01.md` (edit).
  - Concerns: none — no SKILL.md content was written in this step, no
    scope beyond the eval files named in H1.
- 2026-08-18 — H2 (judgment): `skills/shaping/SKILL.md` — the minimum
  that passes the four evals from H1, house register.
  - Read superpowers' `brainstorming` SKILL.md
    (`~/.claude/plugins/cache/claude-plugins-official/superpowers/6.3.0/skills/brainstorming/SKILL.md`)
    to steal the dialogue shape per SPEC §1, and `skills/work-plan/SKILL.md`
    + `skills/work-run/SKILL.md` for the house register (frontmatter,
    workflow checklist, numbered steps, red-flags table, judgment
    notes).
  - Wrote `skills/shaping/SKILL.md` (110 lines): frontmatter
    (name/description, third person, what+when, cites the ADR-006
    supersession and the S-tier probe by name); intro naming shaping's
    place in the work-cycle family and what's adapted vs. NOT adopted
    from brainstorming (no spike/bounded/architectural ladder — tier
    is consumed, never re-derived; no written spec file of its own);
    a 5-item workflow checklist; step 0 (tier consumption +
    feasibility-probe special case); steps 1-3 (one question at a
    time, 2-3 approaches with recommendation first + YAGNI, sectioned
    design confirmed section-by-section) inside a `<HARD-GATE>` block
    matching brainstorming's own, including the "approval is a
    discrete stop" line eval-02(b) needs; step 4 (handoff to
    work-plan design-first, no own artifacts, tier carried forward
    unchanged); a red-flags table adapted from brainstorming's; a
    judgment-notes section carrying the ADR-006 supersession detail
    (cites it by name, doesn't disable brainstorming globally, TDD/
    systematic-debugging untouched, explicit fallback when AE isn't
    installed, never both dialogues on one ask) for eval-03.
  - Cross-checked every line against eval-01..04's checklists before
    stopping — each checklist item has a corresponding sentence in the
    skill body (see the eval files under `skills/shaping/evals/`).
  - No other file touched — ADR-006 itself, `reference/skills.md`,
    the work-plan refusal reword, and using-ae's map row are H3's job,
    not this step's.
  - Acceptance: `node scripts/agent-lint.mjs . --ignore
    tests,templates,global,examples` → "0 high, 0 medium, 0 low —
    PASS" (F02). `node tests/run-eval-checks.mjs` → "all eval checks
    passed" (12 skills now checked, shaping's 4 evals picked up
    automatically and reported well-formed).
  - Files changed: `skills/shaping/SKILL.md` (new, 110 lines).
  - Concerns: none. The eval-checks runner only verifies structural
    well-formedness (Query/Expected-behavior sections, checklist
    lines) — it does not execute the behavioral scenarios, so the
    actual dialogue behavior described here will only be exercised
    once an agent runs the skill for real; I mapped every eval
    checklist line to skill content by hand as the best available
    proxy for "passes the evals" at this stage.

- 2026-08-18 — H3 (integration): ADR-006 + `reference/skills.md`
  supersession + `skills/work-plan/SKILL.md` refusal reword +
  `skills/using-ae/SKILL.md` map row.
  - Wrote `docs/adrs/ADR-006-design-dialogue.md` (Date/Status/Context/
    Decision/Consequences/Alternatives, matching ADR-004/005/007's
    house shape). Context: work-plan's own "no design, genuine
    uncertainty" refusal pointed at an external suite (brainstorming)
    for the case that most needed an AE-owned home, contradicting the
    files-only adoption story. Decision: `skills/shaping` becomes the
    design dialogue's house owner; `brainstorming` joins the
    superseded list for daily design work, cited by name, staying
    installed as the explicit fallback where AE isn't set up. Scoped
    narrower than ADR-005 on purpose — one suite skill superseded on
    observed friction, not a category; TDD and systematic-debugging
    explicitly untouched (their own replacements, if any, are
    MAT-46/47's question).
  - `reference/skills.md`: dropped `brainstorming` from the two
    suite-example lists (the intro sentence and the ADR-004/005
    paragraph, both now read "TDD, systematic-debugging"); added a new
    closing paragraph naming the `brainstorming` supersession, citing
    ADR-006, and stating the fallback + TDD/systematic-debugging
    carve-out explicitly.
  - `skills/work-plan/SKILL.md`: reworded the "no design, genuine
    uncertainty" refusal's next-step pointer from "point at
    brainstorming as the next step" to "invoke `shaping` as the next
    step" — the only occurrence of "brainstorming" in the file.
  - `skills/using-ae/SKILL.md`: added a `shaping` row to "The map"
    ("a raw ask has no settled design yet"), placed first — ahead of
    `work-plan` — matching the work-cycle chain order (shaping →
    work-plan → work-run → work-verify → work-handoff). File is now 46
    lines, well inside the ≤80 line hold. Left the red-flags table and
    the ADR-005 precedence section untouched — SPEC scopes H3 to the
    map row only; the entry eval's routing line was already added in
    H1.
  - Acceptance: F03 —
    `node -e "const fs=require('fs');if(!fs.existsSync('docs/adrs/ADR-006-design-dialogue.md'))process.exit(1);const s=fs.readFileSync('reference/skills.md','utf8');process.exit(s.includes('brainstorming') && s.includes('ADR-006')?0:1)"`
    → exit 0. F04 —
    `node -e "const fs=require('fs');const wp=fs.readFileSync('skills/work-plan/SKILL.md','utf8');const ua=fs.readFileSync('skills/using-ae/SKILL.md','utf8');process.exit(wp.includes('shaping') && ua.includes('shaping')?0:1)"`
    → exit 0. Lint — `node scripts/agent-lint.mjs . --ignore
    tests,templates,global,examples` → "0 high, 0 medium, 0 low —
    PASS". Sanity re-run of `node tests/run-eval-checks.mjs` (not part
    of H3's acceptance, no eval files touched this step) → "all eval
    checks passed" (12 skills, unchanged from H2).
  - Files changed: `docs/adrs/ADR-006-design-dialogue.md` (new),
    `reference/skills.md` (edit), `skills/work-plan/SKILL.md` (edit),
    `skills/using-ae/SKILL.md` (edit).
  - Concerns: none. Scope held to exactly H3's four targets — README,
    work-lifecycle.md, and standard-lifecycle.md (SPEC §3) are H4's
    job, not touched here.
- 2026-08-18 — H3 fix round 1: review Important finding — reviewer
  caught that `skills/using-ae/SKILL.md`'s Precedence (ADR-005)
  section, left untouched by the H3 diff, still read "brainstorming,
  TDD, systematic-debugging stay composable", directly contradicting
  the new `reference/skills.md` paragraph ten lines away in the same
  file that supersedes brainstorming. Ruling recorded in DECISIONS.md:
  real SPEC gap, fix folded into this round.
  - Removed `brainstorming` from the Precedence section's "stay
    composable" list (now reads "TDD, systematic-debugging stay
    composable"); added one tight caveat sentence in the section's own
    register: "Brainstorming is the one thinking skill already
    superseded: shaping owns daily design work instead, cite ADR-006
    (`docs/adrs/ADR-006-design-dialogue.md`); it stays composable only
    as the no-AE-setup fallback." No other section touched (red-flags
    table and the map row from the original H3 pass are unchanged).
  - File is now 50 lines — still well under the ≤80 hold.
  - Re-ran: `node scripts/agent-lint.mjs . --ignore
    tests,templates,global,examples` → "0 high, 0 medium, 0 low —
    PASS". `node tests/run-eval-checks.mjs` → "all eval checks passed"
    (12 skills, unchanged). F04 —
    `node -e "const fs=require('fs');const wp=fs.readFileSync('skills/work-plan/SKILL.md','utf8');const ua=fs.readFileSync('skills/using-ae/SKILL.md','utf8');process.exit(wp.includes('shaping') && ua.includes('shaping')?0:1)"`
    → exit 0.
  - Files changed: `skills/using-ae/SKILL.md` (edit).
  - Concerns: none.

## In progress

- 2026-08-18 — Owner approved SPEC+PLAN (direct-mode gate). Executing
  H1-H4 via work-run — dispatches composed from
  skills/work-run/references/ (the templates' first production use).

## Tried and failed

## Next

- H4: README (ten skills + chain + adoption phrasing) + work-lifecycle
  + standard-lifecycle mentions.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->
