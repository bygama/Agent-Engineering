# DECISIONS — mat-91-portability

Rulings that bind this lane. Parent rulings arrived through
`orca orchestration ask` on the dispatch's Run (ctx_85f24f7cf833).

## Ruling 1 — the loop placeholder is `<repo>`, not `<repo-path>`

**Question (child, at the SPEC gate).** The brief names the token
`<repo-path>`, but grounds the choice in "matching how the loop template
already treats machine facts" — and the template's actual token is
different: `templates/repo/loops/issue-triage.example.md:41` already ships
`--repo path:<repo>`. The two halves of the brief point at different
tokens.

**Ruling (parent).** Use `--repo path:<repo>`, byte-for-byte the template's
spelling. "My `<repo-path>` was a guess; your rationale beats my literal,
and shipping a second spelling of one machine fact — in a lane that CANNOT
touch `templates/` to reconcile it — would have created exactly the drift
this whole wave is cleaning up."

**Effect.** PLAN constraints fix the token; step 4 writes it at both sites.
`<repo-path>` survives in this repo only at `skills/ae-audit/SKILL.md:31`,
where it means something else — the repo being audited, the lint's own
argument — and is deliberately untouched.

## Ruling 2 — evals for all four skills, not using-ae alone

**Question (child, at the SPEC gate).** The brief says "EVALS BEFORE
CONTENT for the using-ae change". AGENTS.md's hard constraint is broader:
"evals change before content on every revision". The MAT-91 edit changes
what an agent *does* on a foreign machine — behavior, not typography — so
the child read the brief's line as emphasis on the tight case rather than a
carve-out suspending the repo's law for the other three skills.

**Ruling (parent).** "Your reading is correct and my line was emphasis, not
a carve-out. AGENTS.md's constraint governs." Ship four evals —
`using-ae/eval-07`, `ae-init/eval-08`, `ae-audit/eval-05`,
`loop-setup/eval-06` — each grading that the agent reaches the standard's
repo by using-ae's §Reference paths rule **and says so when it cannot**:
"that last half is the part most likely to rot, so grade it explicitly."

**Effect.** PLAN steps 1-2 write the four evals before steps 3-5 touch any
skill content. The say-so half is a PLAN constraint, not left to each
eval's author.

## Local call — the ≤80 trim clause was evaluated and did not fire

MAT-88 authorizes trimming "a genuinely redundant line" if the
`skill-authoring` row does not fit, and requires naming it here if one is
cut. **Nothing was cut.** `skills/using-ae/SKILL.md` is 78 lines on base
9fc4bda; the row measures 66 columns, which ties the widest existing map
row (`orchestrate`) without exceeding it and sits inside the file's
74-column wrap, so it needs no continuation line. 78 + 1 = **79 ≤ 80**.

Recorded because the absence of a trim is itself the answer to a ticket
requirement — not because nothing happened. Trimming a line the file still
needs, purely to spend headroom the row did not require, would have been a
worse outcome than the row.

## Local call — MAT-88's framing-sentence check resolves to a no-op

MAT-88 asks whether "the map's framing sentence still reads correctly with
eleven skills". `## The map` in `skills/using-ae/SKILL.md` **has no framing
sentence**: the heading is followed directly by the list, and no sentence
anywhere in the file counts the skills (`grep -nEi "nine|ten|eleven|[0-9]+
skills"` returns only two "the map above" references in the role rule).
Eleven rows therefore read exactly as nine did.

The surfaces that *do* carry a count — `README.md:103` "The eleven skills"
and `docs/how-it-works/architecture.md:67` "Live, all eleven" — were both
already correct before this lane opened, having been updated when
`skill-authoring` shipped with MAT-44. Verified, not assumed; both files
are left untouched.

## Local call — the `docs/plans/` hit is reported, not fixed

A sixth machine-path hit exists at
`docs/plans/2026-08-16-agent-engineering-p2-usage-skills.md:37`. It is a
dated, closed implementation plan — a record of what was written on
2026-08-16, not a surface any agent follows. Editing it to satisfy a
portability sweep would falsify history. Reported in PROGRESS.md for the
parent, which confirmed the call at the SPEC gate: "dated plans are
records".
