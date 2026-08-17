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

## In progress

- 2026-08-17 — Lane opened; design approved by owner in chat. Executing
  S1-S3 via relay (second production run; MAT-37 lessons applied).

## Tried and failed

## Next

- S1 dispatch (implementer, judgment tier).

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->
