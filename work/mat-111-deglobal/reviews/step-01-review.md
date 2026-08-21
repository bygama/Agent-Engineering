# Step 1 review — `reference/global-layer.md` (MAT-111)

### Spec compliance

✅ Compliant — all three required contents are present and the acceptance command passes.

Verified against the step and the SPEC's §1:

| Requirement | Where | Status |
|---|---|---|
| Doctrine adapted from `architecture.md`'s `global/` section + README seed paragraphs | `reference/global-layer.md:10-37` | ✅ |
| Placement rule keeping project/procedural/session facts out | file:30-37 | ✅ |
| The 40-line canon the lint enforces on H1 `# Global instructions` | file:39-49 | ✅ |
| Generic SessionStart recipe, `settings.json` entry shape | file:51-70 | ✅ |
| "hook is optional" note | file:76-79 | ✅ |
| "path must be absolute, no shell/env expansion (MAT-31)" | file:72-75 | ✅ |
| Runner-generic, names no machine | `<absolute path to>` placeholder; no machine paths | ✅ |
| workstation pointer, explicitly never a dependency | file:85-97 | ✅ |
| ≤120 lines, English, shipped-surface clean | 97 lines | ✅ |

Acceptance run: `grep -c '' reference/global-layer.md` → 97; `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` → `0 high, 0 medium, 0 low — PASS`, exit 0.

Nothing Extra: the one addition beyond the SPEC's literal list (the third hook rule, file:80-83) is a faithful generalization of `global/hooks/README.md`'s last note, which dies with that file — it rescues a real portability fact rather than inventing one.

### Strengths

- **The personal instance is distilled into a class, not copied.** `global/CLAUDE.md`'s Orca-spawn section becomes "Machine policy no repo may assume (account/CLI selection on spawn)" (file:33) — the doctrine survives, the owner's `pegasuz` rule does not leak onto a shipped surface. That is exactly the split the lane exists to make.
- **The lint claim is accurate.** file:41-43 ("finds it by content, not by path… wherever it sits") matches `scripts/agent-lint.mjs:143-150`: `claudes` is every `CLAUDE.md` by basename, `globals` is selected by first-line content, capped at 40 via `rawCount`. No overstatement.
- **Correct omission in the Source line.** `global/hooks/README.md` is the recipe's actual origin but is deleted in step 2; citing it would have stranded a broken link on a shipped surface. The MAT-31 citation carries the provenance instead.
- **Budget rationale is house-voice and true**: "this file is paid for in every session of every repo, so a line that matters sometimes is a line that costs always" (file:53-55). Density and register match `context.md` and `harness.md`; no future tense, no filler.
- **The workstation pointer lands on the same terms `examples/machine-config/README.md` already uses** (public repo, worked example, never a dependency) — consistent with the README's existing "worth reading, but never a dependency" phrasing rather than inventing a second framing.

### Issues

#### Critical (Must Fix)

None.

#### Important (Should Fix)

**1. `reference/global-layer.md:22-23` — "The standard defines the layer; it never populates it" is false as written, and the file contradicts it three rows later.**

This repo does populate `~/.claude`: `AGENTS.md:27` says `skills/` are junction-linked into `~/.claude/skills`, and `README.md:280-288` offers copy-or-junction as two of the three installation paths. The file's own table (file:32) then lists "Cross-repo skills and agents (`~/.claude/skills`, `~/.claude/agents`)" as content that *belongs in* the layer — content this standard ships.

Why it matters: this is the file that will be the standard's normative statement about the layer, and it asserts something the repo's entry file denies. A consumer reading both cannot tell which is current.

Fix: narrow the claim to what the ruling actually decided — the standard ships skills that live in the layer; it never ships one person's machine policy. The heading "Owned by exactly one repo" is fine if it means each *content class* has one owner; "never populates it" is the sentence that overreaches.

**2. `reference/global-layer.md:35-37` — the duplication test is restated near-verbatim from `reference/context.md:98-100`, with one branch changed.**

context.md: "would the same line appear in more than one repo's AGENTS.md? → global **(or nowhere)**". Here: "→ global." The parenthetical is the branch that stops a cross-repo line from being auto-promoted to global, so the shorter copy is not just shorter — it answers differently.

Why it matters: two normative statements of one rule in a repo whose own doctrine is "a single source of truth with zero duplicated contracts" (`context.md:50-51`). They will drift, and one of them is already wrong.

Fix: the file already defers ("Full placement rule: `reference/context.md`") — cut the restated test down to that deferral, or restore `(or nowhere)` verbatim.

**3. ⚠️ `reference/global-layer.md:58-70` — the `settings.json` snippet's shape may not load in Claude Code, and after step 2 this is the standard's only copy of it.**

Claude Code's SessionStart config nests a `hooks` array inside each matcher entry; this snippet puts `type`/`command` directly in the event array. I could not verify this from the checkout — `global/hooks/README.md` (its verbatim source) and this file are the only two `"hooks"` configs in the repo, so there is nothing here to cross-check against, and I did not go outside it.

Why it matters: the SPEC asked for the shape to be carried over, and it was — faithfully. But the source is about to be deleted, so a shape defect that was survivable in a folder README becomes the standard's published recipe.

Fix: check it against the runner's hook docs once, or mark it explicitly schematic ("shape only — see your runner's hook docs for the exact nesting"), which the "Runner-generic recipe" framing at file:55-56 nearly does already.

#### Minor (Nice to Have)

- **file:39, 45-49** — the 40-line cap is restated without pointing at its owner. The lint's own comment (`scripts/agent-lint.mjs:52`) says "Budget defaults mirror `reference/context.md` — change both together", so context.md is the budget's home; the placement rule here defers to it but the budget does not. One trailing pointer keeps all three copies pinned to one law.
- **file:42** — "any `CLAUDE.md` whose H1 is `# Global instructions`" is marginally looser than the check, which tests the file's *first line* (`agent-lint.mjs:145`); a file with a comment above its H1 is not detected. `context.md:53-54` phrases it the same way, so this is house-consistent — only worth tightening if the precision buys something.

### ⚠️ Not step-1 gaps, noted so they are not lost

- `docs/how-it-works/architecture.md:136-139` currently says "This repo owns the *content*; a separate machine-setup mechanism applies it" — the opposite of file:22-23. SPEC §3 rewrites that section, so the contradiction is transient by design.
- The new file is not yet reachable from `README.md`'s directory table or `architecture.md`; SPEC §3 covers both.

### Assessment

**Step quality:** Needs fixes

**Reasoning:** The step is complete against its requirements and passes its acceptance command, with a genuinely good distillation — personal policy abstracted into a class, lint behavior described accurately, no machine anchoring. It needs one substantive correction: "the standard never populates the layer" is contradicted by `AGENTS.md:27`, `README.md:280-288`, and the file's own table, and a normative doc for the standard cannot ship that sentence.
