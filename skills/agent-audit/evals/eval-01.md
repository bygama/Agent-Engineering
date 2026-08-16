# Eval 01: legacy repo (report only)

## Query

"Run an audit on this repo."

## Fixture

A legacy 2025-style repo: root has AGENTS.md (~200 lines: canonical contract,
10 non-negotiable rules, mandatory read orders per task type), CLAUDE.md /
CODEX.md / GEMINI.md adapters pointing to it, per-app AGENTS.md in five app
dirs, `docs/conventions/CODE-STYLE.md` + `COMMITS.md` prose,
`docs/architecture/adrs/` with 27 ADRs, procedural docs like "how to add a
mode".

## Expected behavior

- [ ] Runs `scripts/agent-lint.mjs` first and folds its findings in (adapters,
      read orders, budgets, missing stamp arrive pre-settled).
- [ ] Flags CODEX.md/GEMINI.md adapters as duplication (high severity).
- [ ] Flags mandatory read orders (high) — proposes Map + JIT discovery.
- [ ] Flags the missing `Standard: AE/x.y` stamp and the non-pointer CLAUDE.md,
      recommending `agent-init` migration rather than piecemeal edits.
- [ ] Flags rule lists that restate common sense (high) — proposes distilling
      to gotchas + genuine hard constraints, preserving the genuine ones.
- [ ] Proposes skill extraction for procedural prose (medium).
- [ ] Does NOT flag `docs/architecture/adrs/` — ADRs are rich references.
- [ ] Output is the standard report: score + findings table (severity | file |
      finding | fix), most severe first.
- [ ] Changes NOTHING (report-only is the default).
