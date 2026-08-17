# Tier XL (AE/2.5) — plan

Spec: `docs/plans/2026-08-16-orca-first-xl-design.md` (D5-D6); task detail
in `docs/plans/2026-08-16-orca-first-xl-plan.md` Tasks 12-17. No SPEC.md —
the design doc is the spec.

- [ ] Evals pin XL (work-verify eval-05, fan-out eval-01) — accept: `node tests/run-eval-checks.mjs`
- [ ] reference/task-tiers.md: recognition cues + XL row + card mapping — accept: `node scripts/agent-lint.mjs . --ignore tests,templates,global`
- [ ] work-verify XL DoD + fan-out mandatory-at-XL — accept: lint + eval-checks exit 0
- [ ] Consumer guide templates/repo/docs/tiers.md + one-liner + index — accept: lint exit 0
- [ ] ADR-002 + how-it-works (work-lifecycle, execution) — accept: lint exit 0
- [ ] AE/2.5: CHANGELOG + stamps + migration note — accept: all four gates exit 0
- [ ] Acceptance: no surviving three-tier one-liner — accept: grep for the old tier line → 0 hits outside history
