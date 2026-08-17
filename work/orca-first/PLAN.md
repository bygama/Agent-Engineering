# Orca-first execution (AE/2.4) — plan

Spec: `docs/plans/2026-08-16-orca-first-xl-design.md` (D1-D4); task detail
in `docs/plans/2026-08-16-orca-first-xl-plan.md` Tasks 2-10. No SPEC.md —
the design doc is the spec.

- [ ] Evals pin probe + contract + primitives — accept: `node tests/run-eval-checks.mjs`
- [ ] reference/orca.md rewritten (probe, contract, enriched mapping) — accept: `node scripts/agent-lint.mjs . --ignore tests,templates,global`
- [ ] loops/tracker/graphs references pruned of fallback ladders — accept: lint exit 0
- [ ] loop-setup + work-handoff single path (probe, cards, transfer) — accept: lint + eval-checks exit 0
- [ ] fan-out agent-first spawn + work-verify e2e browser — accept: lint + eval-checks exit 0
- [ ] LOOP template + live loops trigger = automation + manual — accept: lint exit 0
- [ ] ADR-001 written — accept: file exists, lint exit 0
- [ ] how-it-works execution + work-lifecycle updated same-change — accept: lint exit 0
- [ ] AE/2.4: CHANGELOG + stamps + migration note — accept: all four gates exit 0
- [ ] Acceptance grep: no fallback-ladder text outside history — accept: `rg "Task Scheduler|/schedule|Linear MCP|plain API" reference skills loops docs/how-it-works` → 0 hits
