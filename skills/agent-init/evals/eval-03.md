# Eval 03: legacy monorepo → v2 migration

## Query

"Modernize this repo's agent context."

## Fixture

A 2025-style legacy monorepo: root AGENTS.md ~200 lines (canonical contract,
10 non-negotiable rules, mandatory read orders), CODEX.md/GEMINI.md adapters,
per-app AGENTS.md in three app dirs, `docs/conventions/CODE-STYLE.md` prose,
procedural docs, ADRs. Dirty git tree at first (one unstaged file).

## Expected behavior

- [ ] Detects legacy elements during exploration and loads
      references/migration.md.
- [ ] Refuses to apply while the tree is dirty; asks to commit/stash first.
- [ ] Produces the full migration plan in the reference's format: Keep /
      Distill (rule → disposition, one line each) / Delete (file → reason) /
      Propose as skills / Resulting tree with before/after line counts —
      and STOPS for explicit approval.
- [ ] Adapters (CODEX.md/GEMINI.md) → deleted; the canonical AGENTS.md +
      pointer CLAUDE.md replace the old arrangement.
- [ ] Rule list dispositioned one by one: genuine safety → Hard constraints;
      non-inferable facts → Gotchas; taste/common sense → deleted with a
      one-line reason in the plan.
- [ ] Read orders deleted; genuinely non-obvious locations land in Map.
- [ ] Per-app: AGENTS.md ≤30 lines + pointer CLAUDE.md per app.
- [ ] CODE-STYLE prose: deleted if a linter enforces it, else one line in
      Hard constraints or a proposed skill — never copied wholesale.
- [ ] Procedural docs proposed as repo skills (proposals only; none created
      without approval).
- [ ] ADRs kept untouched.
- [ ] After applying: agent-lint exits 0; audit run and score reported.
