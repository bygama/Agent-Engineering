# work-plan — progress

## Done

- 2026-08-17 — S1 — wrote `skills/work-plan/evals/eval-01..04` per
  SPEC §3 (shaping, refusal, XL, interfaces/batching/roles) — acceptance:
  `node tests/run-eval-checks.mjs` → exit 0 (work-plan has no SKILL.md
  yet so the runner skips the dir per its own rule; manually verified
  all four files carry `## Query` + `## Fixture` + `## Expected
  behavior` + checklist lines, 23 checklist lines total).
- 2026-08-17 — S2 — wrote `skills/work-plan/SKILL.md`: qualify (S
  refusal, standalone-document refusal, XL shape check) · read input ·
  XL parent plan (three fan-out questions + worker table skeleton,
  refuses when independence can't be shown) · constraints block ·
  step drafting (one commit/one concern, executable acceptance checked
  against AGENTS.md Commands, no complete code) · interfaces/batching/
  role-hints · save location — house style matched against
  `skills/relay` and `skills/fan-out` — acceptance: `node
  tests/run-eval-checks.mjs` → exit 0 (10 skill dirs, work-plan: 4
  evals well-formed) AND `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` → exit 0 (0 high, 0 medium, 0 low).
- 2026-08-17 — S3 — wrote `docs/adrs/ADR-005-artifact-phases.md`
  (house format, generalizes ADR-004: artifact-producing phases are
  AE's; work-plan named as its first consequence) · amended
  `reference/skills.md` (writing-plans joins the ADR-004 superseded
  list, pointer names ADR-005, suite-example list drops writing-plans)
  · `README.md` ("The eight skills": work-plan row + chain
  paragraph + mermaid diagram + Status sentence extended to five
  decisions) · `docs/how-it-works/work-lifecycle.md` (work-plan named
  as the how of the M+ planning moment, ADR-005 pointer) — acceptance:
  `grep -l work-plan reference/skills.md README.md
  docs/how-it-works/work-lifecycle.md docs/adrs/ADR-005-artifact-phases.md`
  → all four match, exit 0; `test -f
  docs/adrs/ADR-005-artifact-phases.md` → yes; `node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples` →
  exit 0 (0 high, 0 medium, 0 low).
- 2026-08-17 — S6 — wrote `skills/work-plan/evals/eval-05.md` (two
  modes per SPEC §3 amendment: (a) design-first stops after SPEC.md
  only, (b) direct produces SPEC+PLAN in one pass with one gate, (c)
  no design + genuine uncertainty refuses and points at brainstorming)
  — pins behavior the current SKILL.md does not yet induce, per
  DECISIONS.md (evals change before content; S7 makes it pass) —
  acceptance: `node tests/run-eval-checks.mjs` → exit 0 (work-plan: 5
  evals well-formed).
- 2026-08-17 — S7 — added the mode fork to `skills/work-plan/SKILL.md`
  per SPEC §1 "Two modes": qualify (step 0) gains a third refusal — no
  design plus genuine scope uncertainty refuses SPEC.md/PLAN.md and
  opens no lane, names what's missing, points at brainstorming, never
  invents scope; step 1 becomes "pick the mode, then read the input" —
  design-first (default: conversation-settled or no SPEC.md yet)
  writes SPEC.md and STOPs with an explicit owner-approval ask, PLAN.md
  only in a later turn after that approval is on record; direct (owner
  states certainty, or the tracker issue is the spec) writes SPEC.md +
  PLAN.md in one pass with one gate at the end covering both files —
  frontmatter description, intro paragraph, step 6 (save location for
  both files), and the Judgment notes refusal/cadence bullets updated
  to match; the S-tier and standalone-document refusals and steps 2-6
  otherwise unchanged — acceptance: `node tests/run-eval-checks.mjs` →
  exit 0 (work-plan: 5 evals well-formed) AND `node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples` →
  exit 0 (0 high, 0 medium, 0 low). eval-05 checklist walked by hand,
  all 8 lines induced: (a) design-first stop text matches "writes SPEC
  ... stops" + "explicit" owner-approval ask + "PLAN.md only ... later
  turn ... after approval"; (b) direct text matches "one pass" + "one
  approval gate at the end, covering both files together, never one
  gate per file"; (c) uncertainty refusal text matches "refuse to write
  SPEC.md or PLAN.md and open no work/ lane" + "name what's missing and
  point at brainstorming" + "never invent scope ... to force the ask
  into design-first or direct". No item flagged as not induced.

## In progress

- 2026-08-17 — Lane opened; design approved by owner in chat. Executing
  S1-S3 via relay (second production run; MAT-37 lessons applied).

## Tried and failed

## Next

- S1 dispatch (implementer, judgment tier).

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->
