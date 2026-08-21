# Re-review: step 6 fix round 1

## Finding verdicts

**I1. "a layer of the standard like any other" contradicts the six-layer count.** — ADDRESSED.
`docs/how-it-works/architecture.md:30-31` now reads: "it is part of the standard like
anything else the standard defines, so it gets one document (`reference/global-layer.md`)
and no box of its own." It no longer claims the global layer is "a layer... like any other."
This is now consistent with `architecture.md:46` (reference/ section), which places "global
layer" inside the "cross-cutting docs" group, distinct from the one-doc-per-layer group, and
with `## The six layers` (`architecture.md:185-222`), which still enumerates exactly six
(Context, Memory, Harness, Loop, Graph, Cross-cutting) with no global layer among them. No
remaining contradiction.

**I2. "the only layer whose content lives on a machine instead of in a repo" misstates
`global-layer.md`.** — ADDRESSED.
`docs/how-it-works/architecture.md:57-58` now reads: "It is the only layer that is installed
onto a machine rather than read from a repo, and the standard documents it without shipping
any of it." This matches `reference/global-layer.md:18-21`: "Edited at a source, then
installed. The machine copy is an artifact... a change goes into the repo that owns the
content and is applied from there" — content originates in a repo and is *installed* onto
the machine, which is exactly what the new sentence says. The reworded claim also survives
the second half of the original finding (the `reference/memory.md:52-56` auto-memory
counterexample): auto-memory is session-learned directly on the machine, never sourced from
a repo, so it was never "installed" in the first place — it doesn't fit either side of the
new "installed... rather than read from a repo" framing, so it's no longer a counterexample
to "the only layer that is installed." Both halves of the original defect are gone.

## New breakage in the fix diff

None. Both hunks are narrowing edits to the two flagged sentences; no other text, links, or
structure changed.

## Out-of-scope observations

Requested check: does `AGENTS.md:28-29` ("`skills/` are junction-linked into
`~/.claude/skills`: edits go live immediately, no copy step") make the new "only" claim
contestable?

Judgment: arguable but not a real break, for two reasons. (1) `skills/` is a structural
directory of this repo, not one of "the layers" the sentence is comparing — the comparison
set is the six layers plus reference/'s cross-cutting-docs group (`architecture.md:46`:
context, memory, harness, loop, graph, cross-cutting, principles, global layer, orca,
tracker, runners, design-md, skill authoring); "skills" as a discipline is documented by
`reference/skills.md`, whose content is not itself the thing junction-linked. (2) The
junction is explicitly "no copy step" — under the standard's own definition of "installed"
(`global-layer.md:18`: "Edited at a source, then installed. The machine copy is an
artifact"), a live symlink back into the repo is the opposite of an install: it's a repo file
read through an alias path, not a machine-resident copy. So it still falls on the "read from
a repo" side, not a second instance of "installed."

That said, this is a genuinely debatable architectural point (the junction target,
`~/.claude/skills`, is a machine-global path read "ahead of any repo file" per
`global-layer.md:11`), and a future nitpick along these lines is plausible. Non-blocking —
flagging for awareness only, not requesting a further fix.

## Verdict

**Fix round:** All findings addressed, no new Critical/Important breakage.
