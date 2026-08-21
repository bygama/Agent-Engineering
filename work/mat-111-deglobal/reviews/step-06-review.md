# Step 6 review — `docs/how-it-works/architecture.md`

### Spec compliance

✅ Compliant.

- Accept command run verbatim: `! grep -q 'global/' docs/how-it-works/architecture.md && grep -q 'global-layer.md' docs/how-it-works/architecture.md` → **exit 0**. No `global/` occurrence remains anywhere in the file; `global-layer.md` appears at lines 32 and 54.
- SPEC §3 bullet for this file ("the `GLB` mermaid node and the `### global/` section, rewritten for the new shape — the layer is still explained; the directory is not") is satisfied on both halves.
- SPEC §5 constraint honored: `scripts/agent-lint.mjs` not touched.
- Self-lint in its new form: `node scripts/agent-lint.mjs . --ignore tests,templates,examples` → **0 high, 0 medium, 0 low — PASS**.

### Strengths

**1. The mermaid is valid and nothing dangles.** `GLB` was a bare node — declared, never an edge endpoint — so deleting the line leaves the six remaining nodes (`REF`, `SK`, `TPL`, `SCR`, `TST`, `DOCS`) with every edge endpoint still defined. Verified by reading the whole fenced block at `architecture.md:17-25`: five edge statements, all endpoints declared. No orphan, no syntax break.

**2. The replacement prose is a real explanation, not a hand-wave — and is sharper than what it replaced.** The old paragraph asserted a negative ("`global/` carries no arrow on purpose") about a box that was sitting right there in the diagram. The new one (`:30-35`) separates two things the old text conflated: the *doctrine* is on the map, inside `reference/`, and gets a document rather than a box; what no arrow reaches is *one machine's actual `~/.claude` content*, which a personal repo owns and installs from. That is a more honest account of the new shape than the old text was of the old one.

**3. Refusing to give `global-layer.md` its own `### ` heading is the right call.** The section is titled "What each directory answers"; a file is not a directory, and minting a heading for one would have re-created exactly the confusion the lane is removing. Coverage now matches disk precisely: top-level dirs are `docs/ examples/ loops/ reference/ scripts/ skills/ templates/ tests/ work/`, and the chapter has a `### ` for eight of them — `work/` being the pre-existing exception that `work-lifecycle.md` owns. Before this change the chapter had a ninth heading for a directory; now it has none.

**4. The findability problem was anticipated rather than ignored.** `:53` opens "because a reader may come looking for a directory and find only a file", and `:54` carries the old heading's question as a literal string — `answers "what belongs in ~/.claude?"`. A reader who Ctrl-Fs the question the deleted heading posed still lands on the answer. The map paragraph at `:30-32` gives a second entry point.

**5. No dangling anchors.** Grepped the repo for `architecture.md#` and for `#global` — zero hits, so removing the `### global/` heading breaks no cross-reference.

**6. The `reference/` intro list is now exactly right.** `ls reference/` returns 14 files; the list at `:45-47` names 14 (context, memory, harness, verification, task tiers, loops, graphs-and-reducers + principles, **global layer**, orca, tracker, runners, design-md, skill authoring — the last mapping to `skills.md`). One-to-one, nothing missing, nothing invented.

**7. Scope is clean.** Four hunks, all inside the two named targets plus the two truth fixes they force. `### examples/` (`:152-160`) untouched, no restyling anywhere, working tree clean.

### Issues

#### Critical (Must Fix)

None.

#### Important (Should Fix)

**I1. `architecture.md:30-31` — "a layer of the standard like any other" contradicts this chapter's own layer count.**

> The `~/.claude` layer is on this map too, inside `reference/`: it is a
> layer of the standard like any other, so it gets one document…

150 lines later the same chapter opens `## The six layers` (`:185`) and enumerates exactly six: **Context, Memory, Harness, Loop, Graph, Cross-cutting** (verified — those are the six bolded entries). The global layer is not among them. `AGENTS.md:6-7` frames the standard the same way: "six layers (context, memory, harness, loop, graph, with reducer/MCP cross-cutting)". And this chapter's own `reference/` list at `:47` files "global layer" under *cross-cutting docs*, not in the per-layer group — so the two edited passages disagree with each other as well.

*Why it matters:* a reader who takes `:31` at face value goes looking for a seventh layer in the section that exists to enumerate them, and does not find it. This is the chapter whose job is being right about the repo's shape.

*Fix (one clause):* "…inside `reference/`: it is part of the standard like anything else the standard defines, so it gets one document (`reference/global-layer.md`) and no box of its own." Keeps the point, drops the miscount.

**I2. `architecture.md:57-58` — "the only layer whose content lives on a machine instead of in a repo" misstates the document it is summarizing, on two counts.**

*Count one — it inverts the layer's defining property.* `reference/global-layer.md:18-21` makes the opposite the first of the two properties that "make it a layer and not a folder":

> **Edited at a source, then installed.** The machine copy is an artifact.
> Nothing is edited in place under `~/.claude` — a change goes into the
> repo that owns the content and is applied from there…

So the content lives *in a repo* (workstation); the machine holds an installed artifact. The summary sentence says the reverse of the doctrine it points at.

*Count two — "only" is contestable.* `reference/memory.md:52-56` places session-learned facts in **auto-memory** and draws the contrast explicitly — "Repo files own project state… If another agent (any model) must see it, it must be a repo file." Auto-memory is a runner store on the machine, not a repo file. So the memory layer also has content that is not in a repo.

*Fix:* "It is the only layer that is installed onto a machine rather than read from a repo, and the standard documents it without shipping any of it…" — preserves the intended contrast, survives both objections.

**Truth check on the third claim — this one holds.** "the ≤40-line canon the lint enforces by content rather than by path" is exactly backed by `scripts/agent-lint.mjs`:

- `:145` — `const globals = new Set(claudes.filter((f) => fileLines(f)[0]?.trim() === "# Global instructions"));` → selection is by H1 content, not by path.
- `:149` — `if (n > 40) add("medium", "budget", f, ...)` → the 40-line cap.

The comment at `:143` ("The global layer (H1 \"# Global instructions\") keeps its own canon") says the same. No correction needed.

**Truth check on "a consumer of this standard, never a dependency of it".** The *"never a dependency"* half is verifiable from inside this repo and holds: every live mention of workstation is a pointer, never a required input — `AGENTS.md:25`, `README.md:269,304`, `examples/machine-config/README.md:4`, `reference/global-layer.md:95`. Nothing in the build, lint, tests, or templates reads it. The *"a consumer"* half is asserted by `examples/machine-config/README.md:4` and by the lane SPEC's verified evidence (workstation `main` at 22f3619); it is an external repo and I did not verify it from this worktree.

#### Minor (Nice to Have)

**M1. `architecture.md:47` — 123-char unwrapped line.** Inserting "global layer, " pushed the wrap and the paragraph was not re-flowed; every other line in that paragraph sits at 43-76 chars. The file does carry two pre-existing >80 prose lines (`:88` at 109, `:207` at 98), so this is not a new class of sin, but `:47` is now the longest prose line in the chapter and it will make the next diff on that paragraph noisier than necessary. Re-wrap `:45-51`.

**M2. `architecture.md:35-36` — reflow artifact.** Line 35 ends mid-paragraph at 44 chars (`chain the arrows trace. \`docs/how-it-works/\``) and line 36 runs 78. Renders identically once markdown soft-wraps, so this is diff hygiene only. Re-wrap `:30-37` as one block.

**M3. The deleted section's one operational negative did not survive into the chapter.** The old text ended "Nothing here is edited in place on a machine — it is edited here, then installed." The positive half *is* preserved at `:33-35` ("a personal repo owns it and installs it from there"), and the explicit negative lives in two places a reader is pointed at — `AGENTS.md:25-26` ("never edit `~/.claude` directly — changes go through workstation") and `reference/global-layer.md:18-21`. So nothing is actually lost to a reader who follows the pointer. Flagging it only because it was the single line of the deleted section that carried an instruction rather than a description; one clause would restore it.

**On the brief's item 4 — the `:7` opening-sentence edit.** In scope and correct. "global-layer content" named something this repo no longer holds, so leaving it would have left the chapter's *first paragraph* false — and note it would have sailed through the accept grep, since the string contains no `global/`. Catching it was the right instinct, not scope creep. It reads well: "fixtures above all" honestly signals fixtures are the chief member of a set that still has other members (`loops/`, `examples/`, `work/`), all of which the chapter goes on to cover. Bare "fixtures" would have been slightly less true.

### Assessment

**Step quality:** Needs fixes

**Reasoning:** The structural judgment is right on every call — valid mermaid, no orphan node, no heading for a directory that no longer exists, findability preserved, scope clean, lint green — but two of the three specific claims the new prose makes do not survive checking: `:31` posits a seventh layer the same chapter enumerates away, and `:57-58` states the inverse of the defining property in the `reference/global-layer.md` it summarizes. Both are one-sentence rewrites (given inline above), and the chapter is correct on everything else.
