### Spec compliance
✅ Compliant

Both required regions changed and nothing else: the directory table's
`global/` row (README.md, table near line 34-39) and the replication
section's seed paragraphs (README.md, ~289-311). Accept command verified
directly:

- `grep -q 'global/CLAUDE.md\|global/hooks' README.md` → no match (good)
- `grep -q 'reference/global-layer.md' README.md` → match (good)
- `node scripts/agent-lint.mjs . --ignore tests,templates,examples` → `0 high, 0 medium, 0 low — PASS`, exit 0

A full `grep -n "global/" README.md` over the post-edit file returns nothing at all — no live path reference to the deleted directory survives anywhere in the file, not just in the two touched regions.

### Strengths

- The new prose **points at** `reference/global-layer.md` rather than restating it. I read that file end to end and checked every claim the README now makes against it: "what a `~/.claude` is for" → its "What the layer is" section; "what belongs in it" → its "What belongs in it" table; "the budget its `CLAUDE.md` is held to" → its "≤40 lines" section; "the settings entry that calls a hook script, and the rules that keep it working on any runner" → its "SessionStart hook wiring" section, three rules included. Nothing invented.
- The replacement for the deleted "strip the owner-specific lines" warning still tells the reader what to do instead: "the global instructions you end up with are yours to write." The warning's referent (a seed to copy) is gone, and so is the warning — correctly, not orphaned.
- "None of this depends on any other repo" stays true. The rewritten workstation paragraph calls it the "canonical personal instance of this layer" (matching global-layer.md's own "canonical for the owner's personal layer" and the SPEC's framing) but immediately closes with "kept in its own repo precisely so the standard need not carry it — worth reading as a worked example, never a dependency." "Canonical" describes workstation's role for the *personal* layer, not a claim that AE depends on it — the sentence is explicit both ways in the same breath.
- Link syntax (`[`reference/global-layer.md`](reference/global-layer.md)`) is correct and the target file exists.

### Issues

#### Critical (Must Fix)
None.

#### Important (Should Fix)
None.

#### Minor (Nice to Have)
- **README.md, directory table**: deleting the `global/` row (rather than repointing it) is the right call — `global/` is no longer a directory, so a row for it would be false, and the table's own promise is about directories. But the question it used to answer ("what belongs in the global (`~/.claude`) layer?") isn't visible anywhere in the table now; a skimming reader has to already know to look inside `reference/` or scroll down to "Adopting AE on your own machine" to find the `reference/global-layer.md` link. This is a pre-existing pattern (other `reference/` files like `context.md` and `orca.md` don't get their own table rows either, and `loops/` is missing from the table entirely, unrelated to this lane), so I'm not calling it a regression — just noting the doctrine's discoverability from the table alone is slightly lower than before. Not worth blocking on; could optionally get a one-line mention in the `reference/` row's question if a future pass wants it.

### Assessment
**Step quality:** Approved
**Reasoning:** The edit is scoped exactly as specified, the accept command passes, every claim in the new prose is backed by `reference/global-layer.md`, and the "no dependency" and "write your own" guarantees both survive the rewrite intact.
