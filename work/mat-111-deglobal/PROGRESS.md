# Remove `global/`; global-layer doctrine to `reference/` — progress

## Done

- 2026-08-20 — Lane opened. SPEC.md written in design-first mode;
  parent approved at the SPEC gate and ruled on the three fence
  collisions (A=repoint, B=leave/MAT-114, C=leave/next sweep). Rulings
  quoted in DECISIONS.md. PLAN.md shaped: 11 steps.
- 2026-08-20 — Precondition verified: workstation `main` @ `22f3619`
  carries the canonical header and both hook scripts (MAT-110 merged).
- 2026-08-20 — Baseline gate green before any edit:
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → `0 high, 0 medium, 0 low — PASS`.

- 2026-08-20 — **PLAN step 1 DONE.** Created `reference/global-layer.md`
  (97 lines, under the 120 cap): the global layer's own doctrine, in the
  directory that answers "what is the standard, and why?". Three parts,
  matching the SPEC's three items.

  1. *What the layer is* / *What belongs in it* / *The canon* — doctrine
     adapted from `docs/how-it-works/architecture.md`'s `### global/`
     section (canonical `~/.claude` content, edited at its source and
     installed, never edited in place on a machine) and README's
     replication seed paragraphs (a lived-in `~/.claude` shipped by the
     standard reads as a dependency and has to be stripped before use).
     Placement is stated as the duplication test, with the full rule left
     owned by `reference/context.md` — one owner per fact. The 40-line
     canon is described the way `agent-lint` enforces it: content-detected
     on any `CLAUDE.md` whose H1 is `# Global instructions`
     (`scripts/agent-lint.mjs:145-149`), not path-bound.
  2. *SessionStart hook wiring* — the `settings.json` entry shape carried
     over from `global/hooks/README.md`, plus its notes: the path must be
     absolute (hook runners perform no shell expansion, no env-var
     substitution — MAT-31), the hook is **optional** (the entry skill
     still triggers by its description), and an injecting hook resolves
     its payload relative to its installed location and stays silent when
     that payload is absent. Runner-generic; names no machine.
  3. *The owner's living instance* — `bygama/workstation` as canonical for
     the personal layer, explicitly a consumer of this standard and never
     a dependency of it; `~/.claude` changes go through workstation.

  Accept command and output:

  ```
  $ test -f reference/global-layer.md \
      && test $(grep -c '' reference/global-layer.md) -le 120 \
      && node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
  agent-lint <repo root>
  0 high, 0 medium, 0 low — PASS
  EXIT=0   lines=97
  ```

  Files changed: `reference/global-layer.md` (new) and this PROGRESS.md.
  Nothing else touched — `global/` is still present at this step, per the
  brief; step 2 deletes it.

  Concerns: none blocking. Two notes for downstream steps. (a) The new
  file cites `reference/orca.md` for the probe, and step 8 repoints
  `reference/orca.md` back here — that mutual pointer is the PLAN's stated
  interface, not drift. (b) The ≤120-line budget on `reference/` is a
  house convention, not a lint check: `agent-lint` applies no line budget
  to `reference/` (only AGENTS.md, nested AGENTS.md, global CLAUDE.md and
  the entry SKILL.md are capped in code), so the cap lives only in the
  accept commands.

- 2026-08-20 — **PLAN step 1 FIX round 1.** Three Important review
  findings on `reference/global-layer.md`, all three confirmed against
  their sources before fixing, all three fixed. File now 105 lines.

  1. **"The standard defines the layer; it never populates it" was false.**
     Confirmed: `AGENTS.md:27` junction-links `skills/` into
     `~/.claude/skills`, `README.md:284-288` offers copy-or-junction as
     two of three install paths, and the file's own table lists
     cross-repo skills as layer content. Rewrote the bullet as **"One
     owner per content class"**: the standard ships the replicable part
     (the cross-repo skills that install into `~/.claude/skills`) and
     does not ship one person's machine policy, which a personal repo
     owns. The dependency argument that follows is unchanged and now
     rests on a true premise.
  2. **The duplication test was restated with a changed branch.**
     Confirmed: `reference/context.md:98-100` reads "→ global (or
     nowhere)"; the copy here dropped the parenthetical — the branch that
     stops a cross-repo line from being auto-promoted — so the two
     statements answered differently. Took the deferral option: the
     restatement is gone, replaced by one sentence naming
     `reference/context.md` as the test's owner. One normative statement
     of the rule again, per `context.md:50-51`.
  3. **The `settings.json` snippet did not load.** Confirmed
     independently, not taken on report: `C:\Briar\repos\mine\workstation\
     claude\hooks.json` and the live `~/.claude/settings.json` both nest a
     `hooks` ARRAY inside each entry of the `SessionStart` array; the
     snippet inherited from `global/hooks/README.md` put `type`/`command`
     directly in the event array. Published the correct nested shape,
     placeholder path kept (`<absolute path to>`, no machine path on a
     shipped surface), plus a clause noting the envelope is the runner's
     to define, that this one is Claude Code's, and that the three rules
     below hold for any spelling. Snippet re-parsed as JSON after the
     edit and structurally matches the live config.

     Worth recording: the live config's command is a fully expanded
     absolute path even though workstation's `hooks.json` template writes
     `${CLAUDE_HOME}` — the installer expands it at install time,
     precisely because the runner will not. That is MAT-31's rule
     observed in production, so the absolute-path bullet is confirmed too.

  Deferred as instructed, not fixed: the 40-line cap could point at its
  owner `reference/context.md`; "H1 is `# Global instructions`" is
  marginally looser than the check's first-line test.

  Accept command re-run after the fixes:

  ```
  $ test -f reference/global-layer.md \
      && test $(grep -c '' reference/global-layer.md) -le 120 \
      && node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
  agent-lint <repo root>
  0 high, 0 medium, 0 low — PASS
  EXIT=0   lines=105
  ```

  Files changed: `reference/global-layer.md`, this PROGRESS.md.

- 2026-08-20 — **PLAN step 1 REVIEWED → Approved (after fix round 1).**
  Maker ≠ checker: a fresh reviewer (opus) reviewed the step diff; the
  implementer fixed; a fresh re-reviewer (sonnet) verdicted the fix.
  Verdict text is in the lane verbatim:
  `reviews/step-01-review.md` and `reviews/step-01-rereview-r1.md`.

  Review verdict: **Spec compliance ✅ Compliant** · **Step quality: Needs
  fixes** — 3 Important findings, 0 Critical:
  1. "The standard defines the layer; it never populates it" is false —
     `AGENTS.md:27` junction-links `skills/` into `~/.claude/skills`.
  2. The duplication test was restated from `reference/context.md`
     with the `(or nowhere)` branch dropped — a divergent second copy.
  3. The `settings.json` snippet's shape does not load. The reviewer
     could not verify this from the checkout and flagged it ⚠️; the
     controller verified it against `workstation/claude/hooks.json` and
     the live `~/.claude/settings.json` and **confirmed the defect** —
     `SessionStart` entries each carry their own nested `hooks` array,
     and the snippet inherited from `global/hooks/README.md` was flat.
     A real bug the deletion would otherwise have published as the
     standard's only copy of the recipe.

  Fix round 1 (`a48656a`) → re-review verdict: **All findings addressed,
  no new Critical/Important breakage.** File is 105 lines (cap 120).

  Deferred minors (not looped, for work-verify's triage): (a) the 40-line
  cap could carry a pointer to its owner `reference/context.md`;
  (b) "H1 is `# Global instructions`" is marginally looser than the
  check's first-line test, but house-consistent with `context.md`.

  Controller correction to the re-review: its one out-of-scope
  observation — that `docs/how-it-works/standard-lifecycle.md:14-26`
  carries the same broken snippet — is **wrong**. Verified:
  `grep -rn '"SessionStart"' --include='*.md'` returns exactly two hits
  repo-wide, `global/hooks/README.md:17` (deleted in step 2) and
  `reference/global-layer.md:62` (fixed). `standard-lifecycle.md`
  carries no JSON snippet at all. No action taken.

- 2026-08-20 — **PLAN step 2 DONE.** Deleted `global/` directory entirely,
  including all four files: `global/CLAUDE.md`, `global/hooks/README.md`,
  `global/hooks/orca-probe.ps1`, `global/hooks/using-ae.ps1`. The global-layer
  doctrine has been relocated to `reference/global-layer.md` (step 1). The
  personal machine configuration is now canonical in `bygama/workstation`.

  Deletion method: `git rm -r global` to stage removal as a rename-free
  deletion.

  Accept command and output:

  ```
  $ test ! -e global && node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint <repo root>
  0 high, 0 medium, 0 low — PASS
  EXIT=0
  ```

  Commit: `cf42408` — refactor(global): remove global directory — relocated to
  reference/global-layer.md

  Files changed: 4 files deleted (CLAUDE.md, hooks/README.md, orca-probe.ps1,
  using-ae.ps1).

  Concerns: none. This is a mechanical step. No lint findings after deletion.
  All live surfaces that named `global/` paths are being repointed in steps
  3–10.

- 2026-08-20 — **PLAN step 3 DONE.** `AGENTS.md`: the `global/` gotcha
  replaced with the post-deletion truth, and the self-lint command flipped
  to the new ignore string. Two edits, nothing else in the file touched.

  1. **Gotcha** — was "`global/` is content only; the workstation installer
     applies it to `~/.claude` — never edit `~/.claude` directly from here."
     Now: the personal `~/.claude` layer is canonical in `bygama/workstation`,
     not here; never edit `~/.claude` directly — changes go through
     workstation; this repo keeps only the doctrine
     (`reference/global-layer.md`). Wording tracks
     `reference/global-layer.md`'s *The owner's living instance* section, so
     the entry file and the doctrine file say the same thing.
  2. **Self-lint command** (`## Commands`, line 14) —
     `--ignore tests,templates,global,examples` →
     `--ignore tests,templates,examples`.

  The gotcha above it ("`tests/fixtures/`, `templates/`, `examples/` … all
  three are excluded from the self-lint") already said *three*, so it needed
  no edit — it reads correctly against the new ignore string, where before it
  undercounted a four-entry list.

  Budget: 55 → 56 lines (the new gotcha is 3 lines against the old 2); the
  lint's 60-line cap on `AGENTS.md` holds with 4 lines to spare. The
  `Standard: AE/1.4.2` stamp is untouched — it does not appear in the diff.

  Accept command and output:

  ```
  $ ! grep -q 'tests,templates,global,examples' AGENTS.md \
      && grep -q 'reference/global-layer.md' AGENTS.md \
      && grep -q '^Standard: AE/1.4.2$' AGENTS.md \
      && node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-111-deglobal
  0 high, 0 medium, 0 low — PASS
  EXIT=0
  ```

  Commit: `6201d38` — docs(global): AGENTS.md — workstation-canonical layer,
  new lint ignore

  Files changed: `AGENTS.md`, this PROGRESS.md.

  Concerns: none blocking. One note for step 4: after this commit the old
  ignore string survives in exactly the three sites step 4 owns —
  `git grep -l 'tests,templates,global,examples'` returns
  `.github/workflows/gates.yml`, `CONTRIBUTING.md`, `loops/self-audit.md`
  (plus four lane files — `SPEC.md`, `PLAN.md`, `PROGRESS.md`,
  `reviews/step-01-review.md` — which quote the old command as record and
  must stay). Step 4's accept uses `grep -rl … --exclude-dir=.git`
  over the whole tree, so as written it will still see the lane files — that
  is step 4's call to make, flagged here rather than pre-empted.

- 2026-08-20 — **PLAN step 4 DONE.** Flipped the ignore string from
  `tests,templates,global,examples` to `tests,templates,examples` in three
  live sites: `.github/workflows/gates.yml:17`, `CONTRIBUTING.md:23`,
  `loops/self-audit.md:20`. Additionally re-stamped `loops/self-audit.md:20`
  to `verified 2026-08-20` to attest the re-run of the new command.

  Lint command run and verified:
  ```
  $ node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-111-deglobal
  0 high, 0 medium, 0 low — PASS
  ```

  Acceptance command (excluding lane directory, which holds dated records):
  ```
  $ test $(grep -rl 'tests,templates,global,examples' --exclude-dir=.git --exclude-dir=mat-111-deglobal . | wc -l) -eq 0 && grep -q 'tests,templates,examples' .github/workflows/gates.yml && echo "PASS"
  PASS
  ```

  Commit: `b259c9f` — docs(global): flip ignore string in gates.yml,
  CONTRIBUTING.md, loops/self-audit.md

  Files changed: `.github/workflows/gates.yml`, `CONTRIBUTING.md`,
  `loops/self-audit.md`, this PROGRESS.md.

  Concerns: none. This is a mechanical step. The old ignore string now
  appears only in dated lane records (SPEC.md, PLAN.md, prior PROGRESS
  entries, prior review files), which correctly stay unchanged.

- 2026-08-20 — **PLAN step 4 REVIEWED → Approved, no findings at any
  severity, no fix round.** Fresh reviewer (haiku). Verdict verbatim:
  `reviews/step-04-review.md`.
  **Spec compliance: ✅ Compliant** · **Step quality: Approved** ·
  Critical/Important/Minor: "None identified" in all three. It checked the
  two things that could have gone wrong quietly: the CI workflow's YAML
  shape survived the substitution (`run:` line and indentation intact —
  a broken gate there would silently stop matching `AGENTS.md`), and the
  `loops/self-audit.md` re-stamp stayed narrow — only the gate line whose
  command actually changed moved to 2026-08-20, the other three kept their
  2026-08-16 dates. A blanket bump would have been a falsified record.


- 2026-08-20 — **PLAN step 5 DONE.** `README.md`: the directory table's
  `global/` row removed, and the replication section's seed paragraphs
  repointed at `reference/global-layer.md` with workstation named as the
  owner's canonical personal instance. Two regions, nothing else touched.

  1. **Directory table (~line 37) — row removed, not replaced.** The
     table's own promise decides it: "Each directory answers exactly one
     question", and `global/` is no longer a directory of this repo. A
     replacement row would have had to name a *file*
     (`reference/global-layer.md`), which the table's framing does not
     admit. The question the row asked is not orphaned: the doctrine now
     lives in `reference/`, which the table's first row already covers
     ("what is the standard, and why?"), and the replication section
     carries the explicit pointer. No other row moved.
  2. **Replication section (~289-308) — three paragraphs.** The
     SessionStart paragraph keeps its shape (injection is optional, the
     skill still triggers by description) and its last sentence repoints:
     the wiring recipe now "lives at
     [`reference/global-layer.md`](reference/global-layer.md)". Note the
     wording change is not only the path — the old text promised "the hook
     script plus the settings entry"; this repo no longer ships a hook
     script, so the new text promises the settings entry and the rules that
     keep it working on any runner, which is exactly what the reference
     file carries. The `global/CLAUDE.md`-as-a-seed paragraph is gone with
     its "strip the owner-specific lines" warning — there is no seed left
     to strip — replaced by a pointer paragraph that says the rest of the
     layer is argued in that same file and that a lived-in personal config
     is not something a standard can ship. Per the brief, the pointer
     points: it does not restate `reference/global-layer.md`'s doctrine
     (no table of what goes in, no 40-line canon spelled out here).
  3. **Closing claim re-checked.** "None of this depends on any other
     repo." still reads TRUE after the edit: all three install ways use
     only this repo's files, and the wiring recipe is now in this repo's
     `reference/`. The workstation sentence also had to change on its own
     merits — it claimed a real `~/.claude` "built by applying `global/`
     end to end", which is false the moment `global/` is gone. It now
     reads as the owner's canonical personal instance, "kept in its own
     repo precisely so the standard need not carry it — worth reading as a
     worked example, never a dependency." Canonical for the personal
     layer, and explicitly not a dependency, in the same sentence.

  Accept command and output:

  ```
  $ ! grep -q 'global/CLAUDE.md\|global/hooks' README.md \
      && grep -q 'reference/global-layer.md' README.md \
      && node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-111-deglobal
  0 high, 0 medium, 0 low — PASS
  EXIT=0
  ```

  After the edit `grep -n 'global' README.md` returns exactly two lines,
  both intended: the `reference/global-layer.md` link and the phrase "the
  global instructions you end up with are yours to write". No `global/`
  path survives in the file. Diff: 14 insertions, 15 deletions, confined
  to the two regions.

  Commit: `edf1611` — docs(global): README — drop the `global/`
  row, repoint the machine-layer section

  Files changed: `README.md`, this PROGRESS.md.

  Concerns: none blocking. One note for step 11's sweep: README's
  Architecture mermaid never had a `GLB` node (that is
  `docs/how-it-works/architecture.md`, step 6), so nothing diagram-side was
  left behind here.

- 2026-08-20 — **PLAN step 5 REVIEWED → Approved, no Critical/Important,
  no fix round.** Fresh reviewer (sonnet). Verdict verbatim:
  `reviews/step-05-review.md`.
  **Spec compliance: ✅ Compliant** · **Step quality: Approved.** It
  re-ran the acceptance itself and additionally confirmed
  `grep -n "global/" README.md` returns nothing at all — no live path to
  the deleted directory survives anywhere in the file. It then checked
  every claim the new README prose makes against `reference/global-layer.md`
  clause by clause ("Nothing invented"), and confirmed the two
  load-bearing guarantees survive: "None of this depends on any other
  repo" stays true — "canonical" describes workstation's role for the
  *personal* layer, and the same sentence closes "never a dependency" —
  and the deleted "strip the owner-specific lines" warning is replaced by
  what a reader should do instead ("the global instructions you end up
  with are yours to write"), not merely dropped.
  Deferred Minor (not looped, for work-verify's triage): the directory
  table no longer surfaces the question "what belongs in the `~/.claude`
  layer?". The reviewer judged deleting the row correct (`global/` is not
  a directory any more, and the table's promise is about directories) and
  explicitly declined to call it a regression — `reference/context.md`,
  `reference/orca.md` and `loops/` have no rows either. Discoverability
  from the table alone is slightly lower than before.

- 2026-08-20 — **PLAN step 6 DONE.** `docs/how-it-works/architecture.md`:
  the `GLB` mermaid node deleted, the arrowless-node paragraph rewritten,
  the `### global/` directory section removed, and the explanation it owed
  the reader rehomed in `### reference/`. Four regions, +18/-15.

  **The judgment the brief asked for, both halves the same answer: the node
  and the section are removed, not rewritten — and what they explained is
  rehomed rather than dropped.**

  The reasoning is the section's own promise. "What each directory answers"
  is a list of *this repo's directories*, one question each; `global/` is
  not a directory any more, so an entry there would be a heading for
  nothing. Same for the diagram: it is a directory-level map, and a box
  labelled with a path that does not exist is simply false — the brief's
  "do not preserve a node just to avoid changing the picture" is exactly
  the trap. Nor could either be *repointed* at `reference/global-layer.md`:
  that is a file inside `reference/`, which both the diagram's `REF` node
  and the `### reference/` section already cover. A second box for one file
  inside another box would be false in a new way. This matches step 5's
  call on README's directory table (row removed, not replaced), so the two
  surfaces now answer the question the same way.

  What made removal safe rather than a silent drop is that the deletion
  improves the picture instead of merely shrinking it. `reference/` is
  *"the standard: 1 doc per layer"* — the global layer is a layer, so its
  doc belongs there by the diagram's own rule. The old node was an orphan
  precisely because this repo carried machine content; with the content
  gone, the layer stops being an exception and joins the map properly.
  That is what the new post-diagram paragraph says.

  Regions, in file order:

  1. **Intro, line 7 — a fourth region, not on the brief's list of three.**
     "Everything else — fixtures, global-layer content — exists to keep
     those five honest" went false with this change: the global layer's
     content is now `reference/global-layer.md`, i.e. *inside* the first
     verb (**defines** the standard), so it is no longer "everything else".
     Fixed by deleting the false item only: "— fixtures above all —".
     Flagged explicitly because the brief said three regions and said not
     to touch anything else; I judged a sentence *made false by this exact
     structural change* to be inside the step rather than outside it, since
     the house rule this step exists to satisfy is that the chapter is true
     after the change. It is a two-word deletion and a one-word revert if
     the controller disagrees. It does not carry `global/` and so was
     invisible to the acceptance grep.
  2. **The `GLB` node (was line 25) — deleted.** No other node or arrow
     touched; the mermaid block still parses (five nodes, four arrow lines).
  3. **The post-diagram paragraph (was 31-33) — rewritten, not deleted.**
     The old text explained why one node had no arrow. The new text
     explains where the layer went and what genuinely stays outside the
     chain: the layer is on the map *inside* `reference/` as one document
     (`reference/global-layer.md`); what no arrow reaches is any machine's
     actual `~/.claude` content, which a personal repo owns and installs.
     The following sentence's "sits outside the flow **too**" still has a
     referent, which it would have lost on a plain deletion.
  4. **`### global/` (was 132-139) — removed**, and its question rehomed
     into `### reference/`: `global layer` added to the doc enumeration
     (which had been incomplete since step 1 created the file), plus one
     paragraph that *points* — it names what `global-layer.md` answers
     ("what belongs in `~/.claude`?"), that the canon is enforced by
     content rather than by path, and that the wiring recipe is there,
     without restating any of the doctrine, per the brief. It opens on the
     reason it exists at all — "a reader may come looking for a directory
     and find only a file" — and closes on workstation as the author's
     instance, "a consumer of this standard, never a dependency of it",
     wording aligned with `reference/global-layer.md`'s own closing section
     and with step 5's README sentence.

  Untouched as instructed: `### examples/` (its "machine-config entry that
  points at the living public consumer (workstation)" is still true), and
  every other section. No prose restyled.

  Accept command and output:

  ```
  $ ! grep -q 'global/' docs/how-it-works/architecture.md \
      && grep -q 'global-layer.md' docs/how-it-works/architecture.md
  ACCEPT_EXIT=0
  ```

  All four gates re-run after the edit (not required by the step's accept,
  run anyway because the chapter carries links the lint resolves):

  ```
  $ node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-111-deglobal
  0 high, 0 medium, 0 low — PASS
  LINT=0  LINT_TESTS=0  GEN_TESTS=0  EVAL_CHECKS=0
  ```

  After the edit `grep -in 'global' docs/how-it-works/architecture.md`
  returns exactly three lines, all intended: the two
  `global-layer.md` pointers and `global layer` in the reference
  enumeration. No `global/` path survives.

  Files changed: `docs/how-it-works/architecture.md`, this PROGRESS.md.

  Concerns, none blocking:
  - Region 1 is the one to review first — it is the only edit outside the
    three regions the brief named. Stated above rather than made quietly.
  - `reference/global-layer.md` is cited in backticks, not as a relative
    markdown link. That is this chapter's house style for reference docs
    (`reference/context.md`, `reference/memory.md`, … in "The six layers"
    are all bare backticks); ADR and sibling-chapter links are the only
    real links. A link would also have been safe for the grep —
    `reference/global-layer.md` contains no `global/` substring, since
    `global` is followed by `-`.
  - The `### reference/` enumeration line is 123 chars and was already
    ragged before this step (118 chars); adding `global layer,` pushed it
    slightly. Rewrapping it would have restyled untouched prose, so I left
    the wrap as the file had it.
  - Lane bookkeeping, not mine to change: `## In progress` below still
    lists both "PLAN step 6" and a stale "PLAN step 5" left by the previous
    step. Both are now DONE. Left for the controller rather than edited.

- 2026-08-20 — **PLAN step 6 FIX round 1.** Two Important review findings
  on the new prose in `docs/how-it-works/architecture.md`; both confirmed
  against their sources before fixing, both fixed. Every structural
  judgment of the step was approved and is unchanged — the node stays
  deleted, the `### global/` section stays removed, the rehoming stays.
  Only two sentences moved. +3/-3.

  1. **`:30-31` "a layer of the standard like any other" contradicted the
     chapter's own layer count.** Confirmed, not taken on report:
     `## The six layers` (`:185`) enumerates exactly six bold names —
     `grep '^\*\*'` over that section returns Context, Memory, Harness,
     Loop, Graph, Cross-cutting, and no global layer. `AGENTS.md:6-7`
     frames it identically ("six layers (context, memory, harness, loop,
     graph, with reducer/MCP cross-cutting)"). Worse, my *own* other edit
     at `:47` filed "global layer" under **cross-cutting docs**, not in the
     per-layer group — so the two passages I wrote in the same step
     disagreed with each other. A reader taking `:31` at face value would
     go hunting for a seventh layer in the section that exists to
     enumerate them. Fixed with the reviewer's clause: "…it is part of the
     standard like anything else the standard defines, so it gets one
     document…". Keeps the reason the doc sits inside `reference/`, drops
     the miscount. Note the name "global layer" itself is house vocabulary
     and stays — `reference/memory.md:56` uses it ("**Global layer** owns
     durable facts about the user"); what was false was placing it *in the
     six-layer taxonomy*.

  2. **`:57-58` "the only layer whose content lives on a machine instead of
     in a repo" misstated the document it was summarizing.** Confirmed on
     both counts. *Count one, the serious one:*
     `reference/global-layer.md:18-21` makes the opposite the FIRST of the
     two properties that "make it a layer and not a folder" — "**Edited at
     a source, then installed.** The machine copy is an artifact. Nothing
     is edited in place under `~/.claude` — a change goes into the repo
     that owns the content and is applied from there". The content lives in
     a repo (workstation); the machine holds an installed artifact. My
     sentence asserted the exact inverse of the doctrine it was pointing
     at — the worst kind of error for a pointer paragraph, since a reader
     who trusts the summary gets the layer's defining property backwards.
     *Count two:* "only" was contestable — `reference/memory.md:52-56`
     gives auto-memory session-learned facts, a runner store on the
     machine, and the very next bullet draws the contrast explicitly ("If
     another agent (any model) must see it, it must be a repo file").
     Fixed with the reviewer's wording: "It is the only layer that is
     installed onto a machine rather than read from a repo…". Checked
     against both objections before accepting it: it now runs in the
     doctrine's direction (source → install), and auto-memory is *written*
     on a machine, never *installed* onto one, so "only" survives.
     Cross-repo skills installing into `~/.claude/skills` are part of this
     same layer per `global-layer.md:22-24`, not a competing one.

  **Third truth check left alone, as instructed** — and independently
  reconfirmed rather than assumed: "the ≤40-line canon the lint enforces by
  content rather than by path" is exactly `scripts/agent-lint.mjs:145`
  (`fileLines(f)[0]?.trim() === "# Global instructions"` selects the file)
  and `:149` (`if (n > 40)` caps it). No change.

  **Minors M1/M2/M3 not fixed**, per instruction — deferred to
  work-verify's triage: the 123-char `:47` line and the `:35-36` reflow
  artifact are both wrap-only, and M3 (this chapter no longer says in its
  own words that nothing is edited in place on a machine) is a real
  content call about how much doctrine the chapter should restate, which
  is work-verify's to weigh rather than a fix round's.

  Accept command and output:

  ```
  $ ! grep -q 'global/' docs/how-it-works/architecture.md \
      && grep -q 'global-layer.md' docs/how-it-works/architecture.md
  ACCEPT_EXIT=0
  ```

  All four gates re-run after the fixes:

  ```
  $ node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-111-deglobal
  0 high, 0 medium, 0 low — PASS
  LINT=0  LINT_TESTS=0  GEN_TESTS=0  EVAL_CHECKS=0
  ```

  Files changed: `docs/how-it-works/architecture.md`, this PROGRESS.md.

  Concerns: none. Both findings were defects in my prose, not in the step's
  design; the shape of the chapter after step 6 is what the review
  approved.

- 2026-08-20 — **PLAN step 6 REVIEWED → Approved (after fix round 1).**
  Fresh reviewer (opus), fix, fresh re-reviewer (sonnet). Verdict text
  verbatim: `reviews/step-06-review.md` and
  `reviews/step-06-rereview-r1.md`.

  Review verdict: **Spec compliance ✅ Compliant** · **Step quality: Needs
  fixes** — 2 Important, 0 Critical. It approved every structural
  judgment (valid mermaid with no orphan node — `GLB` was a bare node,
  never an edge endpoint; no `###` heading minted for a file, so heading
  coverage now matches disk exactly; findability preserved because the
  new paragraph carries the deleted heading's question as a literal
  string; no dangling anchors, verified by grepping `architecture.md#`
  and `#global`; the `reference/` list now names 14 docs against 14 files
  on disk). It also ruled the `:7` opening-sentence catch in scope and
  correct — "global-layer content" would have left the chapter's FIRST
  paragraph false, and it contains no `global/`, so the accept grep would
  never have caught it.

  The 2 Important findings were both false claims:
  1. `:30-31` "a layer of the standard like any other" — the same chapter
     opens `## The six layers` and enumerates six, without this one;
     `AGENTS.md:6-7` says the same, and the chapter's own `reference/`
     list files it under *cross-cutting docs*. A reader would go hunting
     for a seventh layer.
  2. `:57-58` "the only layer whose content lives on a machine instead of
     in a repo" — the inverse of the doctrine it summarizes
     (`reference/global-layer.md:18-21`: content is edited at a source in
     a repo and *installed*; the machine copy is the artifact), and
     "only" was contestable against auto-memory (`reference/memory.md`).

  The reviewer's third truth check PASSED unchanged: the ≤40-line canon
  "the lint enforces by content rather than by path" is exactly backed by
  `scripts/agent-lint.mjs:145` (selection by H1 content) and `:149`.

  Fix round 1 (`7ae84c2`) → re-review verdict: **All findings addressed,
  no new Critical/Important breakage.** The re-reviewer additionally
  answered the controller's challenge — whether junction-linked `skills/`
  makes the narrowed "only... installed onto a machine" claim contestable
  — and judged not: a junction is "no copy step", the opposite of an
  install under the standard's own definition, so it stays on the "read
  from a repo" side. Flagged as debatable, non-blocking.

  Deferred Minors (not looped, for work-verify's triage): (M1) `:47` is
  now a 123-char unwrapped line, re-wrap `:45-51`; (M2) reflow artifact at
  `:35-36`, diff hygiene only; (M3) the deleted section's one operational
  negative ("nothing is edited in place on a machine") survives via the
  pointers in `AGENTS.md:25-26` and `reference/global-layer.md:18-21`
  rather than in this chapter's own words.

- 2026-08-20 — **PLAN step 7 DONE.**
  `docs/how-it-works/standard-lifecycle.md`, two halves.

  **Half A (`:20-26`) — edited.** The dead pointer
  `global/hooks/README.md` (deleted in step 2) now reads
  `reference/global-layer.md`, which carries the wiring recipe the old
  file held. One further word of truth repair in the same sentence:
  "The global layer **wires** it as a SessionStart hook" → "**can wire**
  it", because this repo ships no wiring any more. The rest of the
  sentence was already true and is untouched — it framed the hook as
  "optional plumbing, not a dependency" before this lane. The narrower
  verb matches the two surfaces the earlier steps already rewrote:
  `README.md:289-295` ("The SessionStart injection … is **optional**",
  "The wiring recipe … lives at `reference/global-layer.md`") and
  `docs/how-it-works/architecture.md:56-58` ("the runner-generic
  SessionStart wiring recipe"). Diff is 3 lines; the reflow of `:25-26`
  is only what moving the longer path forced, wrap width kept at ~70.

  **Half B (`:170-173`) — JUDGED, NOT EDITED. Reading (ii).** The
  five-surface sentence enumerates the surface *classes a consumer repo
  can carry*, not this repo's own directories, so it stays exactly as
  written. Three reasons, recorded in full in `DECISIONS.md`:
  1. Its subject is the consumer — "the five surfaces a consumer
     *receives*" — and the rest of the paragraph exempts `docs/plans/`,
     `docs/adrs/`, `CHANGELOG.md` and `examples/` as classes too. It is
     prose narration of one lint check, not a directory listing.
  2. The check it narrates still contains `global/`:
     `scripts/agent-lint.mjs:354` — `const SHIPPED_SURFACE =
     /^(skills|reference|templates|global|loops)\//` — untouched by this
     lane by PLAN constraint. A consumer repo that vendors a `global/`
     still gets it scanned at `medium`.
  3. Writing "four surfaces" would ADD a falsehood: the lint's own
     comment at `scripts/agent-lint.mjs:325-326` uses the identical
     phrasing ("the five surfaces a consumer receives — skills/,
     reference/, templates/, global/, loops/"), so the chapter would
     contradict the check it exists to explain and would tell a reader a
     vendored `global/` is not scanned when it is.

  The sentence's truth condition is whether the check covers those five
  classes. It does. This repo not having a `global/` of its own does not
  reach that condition.

  Acceptance, run from the repo root:

  ```
  $ ! grep -q 'global/hooks/README.md' docs/how-it-works/standard-lifecycle.md && grep -q 'five-surface\|standard-lifecycle' work/mat-111-deglobal/DECISIONS.md
  ACCEPT EXIT=0
  ```

  Note for the reviewer: that grep is weak — `DECISIONS.md` already
  contained the word `standard-lifecycle` before this step, so exit 0 is
  no evidence the judgment was recorded. It was recorded, as a dated
  entry: **"2026-08-20 — Step 7 judgment: the five-surface sentence
  STAYS as written"**, quoting the sentence and naming reading (ii).

  Gate re-run (not required by the step, run anyway):

  ```
  $ node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint C:\…\mat-111-deglobal
  0 high, 0 medium, 0 low — PASS
  LINT EXIT=0
  ```

  Files changed: `docs/how-it-works/standard-lifecycle.md` (3 lines),
  `work/mat-111-deglobal/DECISIONS.md` (+47), this file. Nothing else in
  the chapter was touched; the only remaining `global` strings in it are
  `:23` ("global layer", the layer's name) and `:172` (the judged
  enumeration).

  Bookkeeping: cleared `## In progress`, which listed steps 5, 6 and 7 —
  5 and 6 both carry DONE + REVIEWED → Approved above, so the entries
  were stale (a step-6 reviewer had already flagged the stale step-5
  line). No substantive record of another step was edited.

  Concerns: (1) `reference/global-layer.md` is cited in backticks, not as
  a markdown link — same form the dead `global/hooks/README.md` citation
  used, so the lint's broken-link check never covered either; the path is
  verified to exist by hand. (2) Half B leaves this chapter as the one
  live surface still naming `global/` outside a dated record — step 11's
  repo-wide sweep must expect exactly that hit and classify it as the
  lint's consumer-repo class, not as residue.


- 2026-08-20 — **PLAN step 7 REVIEWED → Approved, no Critical/Important,
  no fix round.** Fresh reviewer (opus). Verdict verbatim:
  `reviews/step-07-review.md`.
  **Spec compliance: ✅ Compliant** · **Step quality: Approved.**
  The reviewer was told to test the half-B "do not edit" ruling rather
  than rubber-stamp it, and to argue the losing side first. It built the
  strongest case for DROPPING `global/` — that `ae-init` installs none of
  those five into a consumer, so "surfaces a consumer receives" must mean
  this repo's own directories, and the paragraph's exemption list
  (`docs/plans/`, `examples/`) is unambiguously this repo's furniture —
  then defeated it on three grounds: (1) **mechanism** — `SHIPPED_SURFACE`
  is matched against whatever repo `agent-lint` is pointed at, and
  `agent-lint` is a *shipped* check consumers run on their own repos, so
  included and exempted names are the same kind of thing: path classes;
  (2) **grammar** — the sentence asserts a norm over content found at
  those paths, never that this repo contains a `global/` ("carrots, peas
  and beans must be washed" does not go false in a kitchen with no
  beans"); (3) **doc-code coupling** — writing "four surfaces" would make
  the chapter contradict the check it exists to explain. It also noted the
  SPEC's own test is a conjunction whose second conjunct fails even if you
  grant the first. **Reading (ii) upheld: the sentence stays.**
  It verified each DECISIONS citation individually ("accurate, not
  decorative"), confirmed `reference/global-layer.md:52-91` really carries
  the wiring detail the repointed sentence promises, and ruled the
  "wires" → "can wire" repair necessary, sufficient and in scope. It
  credited the implementer for disclosing the acceptance grep's weakness
  unprompted instead of hiding behind it.

  **Carried forward to work-verify (reviewer's Minor 3, actionable):**
  the SPEC's Verification line "no live (non-record, non-fenced) surface
  greps for `global/` as a path" cannot be run literally — the untouched
  `scripts/agent-lint.mjs` carries `global/` in `SHIPPED_SURFACE` and its
  comment, this chapter carries it at `:172` by the ruling just upheld,
  plus the two fenced files under Rulings B and C. The clause's intent is
  **"no live surface asserts this repo HAS a `global/` directory"**;
  step 11 and work-verify apply it with those documented exemptions.

  Deferred Minors (not looped): (1) the earlier DECISIONS placeholder at
  `:95-98` still points at PROGRESS for the five-surface verdict, now
  also a full DECISIONS entry; (2) `SHIPPED_SURFACE`'s `global`
  alternative may now be vestigial — a *check* change, version bump,
  explicitly out of scope, worth a ticket; (3) `architecture.md:47`'s
  long unwrapped line, already logged as step 6's M1.


- 2026-08-20 — **PLAN step 8 DONE.** `reference/orca.md`: the probe
  paragraph at `:26-29` repointed. Ruling A applied literally — the dead
  `global/hooks/orca-probe.ps1` citation is gone, both halves of the
  operational instruction survive, and a reader who wants to wire such a
  hook is sent to `reference/global-layer.md`, which carries the
  SessionStart recipe (`:52-91`). One paragraph, 4 lines out and 4 lines
  in; nothing else in the file touched, no untouched prose restyled.

  **Line count: 120 before, 120 after** — the file was at its cap with no
  headroom, so the replacement had to be line-for-line neutral. It is:
  `git diff --stat` reads `4 insertions(+), 4 deletions(-)`, and the diff
  hunk is confined to those four lines. Wrap width kept at ≤72 chars, the
  file's own.

  Was:

  > On machines with the global layer installed, a session-start hook
  > (`global/hooks/orca-probe.ps1`) already injected the result as an
  > `ORCA: available|unavailable` context line — citing that line satisfies
  > step 0; re-run the probe only when the line is absent.

  Now:

  > Where the global layer wires a session-start probe hook, its result
  > already arrived as an `ORCA: available|unavailable` context line —
  > citing that line satisfies step 0; re-run the probe only when it is
  > absent. The wiring recipe is in `reference/global-layer.md`.

  Two things changed and one did not, deliberately:

  1. **The dead path became a generic description.** "a session-start
     hook (`global/hooks/orca-probe.ps1`)" → "a session-start probe
     hook" — the behavior is real and still worth documenting (this
     session's own context carries such a line), only the script this
     repo used to ship is gone.
  2. **The opening clause states a condition instead of asserting the
     hook exists.** "On machines with the global layer installed, … already
     injected" presumed the layer ships a probe hook; after step 2 the
     standard ships none, and `reference/global-layer.md:85-87` states the
     hook is optional in general. "Where the global layer wires a
     session-start probe hook, its result already arrived" is true on a
     machine that has one and vacuous on a machine that does not — which
     is exactly what the next clause ("re-run the probe only when it is
     absent") already assumed. Same register as the sibling surfaces
     rewritten earlier in this lane (`README.md:289-295`,
     `architecture.md:56-58`, `standard-lifecycle.md:23` "can wire").
  3. **The instruction is unchanged in substance**: cite the line if it is
     there, re-run the probe if it is not. "the line" → "it" is the only
     wording move, made to buy the characters the new pointer needed.

  Accept command and output, run from the repo root:

  ```
  $ ! grep -q 'global/hooks' reference/orca.md \
      && test $(grep -c '' reference/orca.md) -le 120 \
      && node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-111-deglobal
  0 high, 0 medium, 0 low — PASS
  ACCEPT_EXIT=0  lines=120
  ```

  The other three gates re-run anyway (not required by this step's accept):

  ```
  LINT_TESTS=0  GEN_TESTS=0  EVAL_CHECKS=0
  ```

  Files changed: `reference/orca.md` (4 lines), this PROGRESS.md.

  Concerns, none blocking:
  - `reference/orca.md:114` still reads "machine policy in the global
    layer (`~/.claude/CLAUDE.md`), never a repo". Left as written and
    flagged rather than edited: it names the *layer* and the machine file,
    not a `global/` path in this repo, and it stays true after the
    deletion — spawn-command inheritance is machine policy, which
    `reference/global-layer.md:35` files under layer content and
    workstation now owns. It carries no `global/` substring, so it was
    invisible to the accept grep either way. Step 11's sweep should expect
    this hit and classify it as the layer's name, not as residue.
  - The mutual pointer is intentional, not drift: `global-layer.md:55-56`
    cites `reference/orca.md` as the probe whose result a hook injects,
    and this paragraph now points back for the wiring. Step 1 recorded it
    as the PLAN's stated interface.
  - `reference/global-layer.md` is cited in backticks, not as a markdown
    link — the same form the dead `global/hooks/orca-probe.ps1` citation
    used, and this file's house style throughout. The lint's broken-link
    check therefore never covered either; the target's existence was
    verified by reading it.
  - **Zero headroom left.** The file sits at exactly 120. Any later step
    that adds a line here fails this step's own accept, and there is no
    slack to absorb a review fix — a fix that needs words has to buy them
    elsewhere in the same paragraph.

- 2026-08-20 — **PLAN step 8 REVIEWED → Approved, no Critical/Important,
  no fix round.** Fresh reviewer (sonnet). Verdict verbatim:
  `reviews/step-08-review.md`. This step executed the parent's **Ruling A**.
  **Spec compliance: ✅ Compliant** · **Step quality: Approved.**
  It confirmed the operational contract survived intact (cite the line if
  present; re-run only if absent), that the pointer's promise is kept —
  `reference/global-layer.md:52-91` really does carry a wiring recipe —
  and that Ruling A's "neutral or shorter" was met exactly: both the old
  and the new paragraph occupy 4 lines, and the file is 120 lines before
  and after, "genuinely neutral, not just under the cap by luck".
  It also judged the claim's truth to have **improved**: the old sentence
  asserted as fact that a hook "already injected" the line on any machine
  with the layer installed — true only because this repo used to ship the
  hook. The new conditional framing is the accurate claim now that hook
  wiring is documented as optional.
  Deferred Minor (not looped, for work-verify's triage): `reference/orca.md:28-29`
  uses the pronoun "it" where the old text said "the line". The reviewer
  resolved it correctly and called it "not a real ambiguity", but noted
  spelling it out costs zero lines.

- 2026-08-20 — **PLAN step 9 DONE.** `docs/specs/SPEC-agent-engineering.md`:
  two italic amendment notes added, one per location. **Pure insertion —
  `git diff --stat` reads `12 insertions(+)` and the diff contains not a
  single `-` line**, so the repo tree and the P1 sentence are byte-identical
  to what they were. That was this step's whole failure mode, so it is the
  first thing verified rather than the last.

  **The style matched, and where it was found.** The house marker is the
  trailing italic line `*Amended <date> (<version>, <ticket> …): <substance>*`
  appended to the item it amends, never a heading and never an edit to the
  amended text. Found by `grep -rn '\*Amend\|Amendment\|amended' docs/`, which
  returns nine hits; the model the brief names is
  **`docs/adrs/ADR-008-orchestration.md:47-51`** —
  `*Amended 2026-08-20 (v1.4.2, MAT-105 owner amendment): the dialogue's
  offered default is now 1 ratón chispeante …*` — an indented italic block
  closing the bullet whose decision it revises. The same marker is already
  used **inside this very file** five times (`:66`, `:76`, `:96`, `:102`,
  `:116`, `:123`), all in the *Fixed decisions* list, all ending with `*` and
  all leaving the decision text they amend untouched. `docs/specs/SPEC-design-md.md:116`
  uses a different form (`## Amendment 2026-07-30: mode groups`, a section);
  it was rejected — the brief names ADR-008, and a new `##` section in a
  numbered founding document would restructure it rather than annotate it.

  Version tag: `(v1.4.2, MAT-111)`. ADR-008's marker carries the version the
  amendment ships under, and this lane ships under AE/1.4.2 with no bump (PLAN
  constraint), so 1.4.2 is the accurate tag, not a stamp change.

  1. **The tree note — `:210-214`, immediately after the closing fence at
     `:208`**, separated by the blank line markdown needs and followed by the
     file's original blank line before `## Skills`. Outside the fence by
     construction: `grep -c '^```'` still returns exactly **2** (open `:168`,
     close `:208`), and `:196` — `├── global/  # canonical ~/.claude content
     (ported + updated in P1)` — is unchanged. It says the tree line is the
     record of the target state as designed, that the directory no longer
     exists here, that `bygama/workstation` is canonical for the personal
     `~/.claude` layer, and that the doctrine lives in
     `reference/global-layer.md`.
  2. **The P1 note — `:280-285`, appended to the P1 bullet** at the same
     two-space continuation indent the bullet uses, directly before `- **P2`.
     This is ADR-008's exact placement (last lines of the item, no blank line
     between). It carries the same three facts and adds the one this location
     needs: *"The phase entry above stands as written: the port did happen,
     and P1's acceptance was met at the time."* — the point of amending a
     dated record instead of correcting it.

  Both notes carry `2026-08-20`, `MAT-111`, and all three substance points the
  brief required. `reference/global-layer.md` is cited in backticks, not as a
  markdown link: in this file relative links are reserved for ADRs (`:66`,
  `:96`, `:116` …) and every `reference/*.md` citation is bare backticks
  (`:83`, `:89`, `:119`, `:161`) — same call steps 6, 7 and 8 made on their
  own surfaces.

  Acceptance command and output, run from the repo root:

  ```
  $ test $(grep -c 'MAT-111' docs/specs/SPEC-agent-engineering.md) -ge 2 \
      && grep -q '2026-08-20' docs/specs/SPEC-agent-engineering.md \
      && git diff --stat docs/specs/SPEC-agent-engineering.md
   docs/specs/SPEC-agent-engineering.md | 12 ++++++++++++
   1 file changed, 12 insertions(+)
  ACCEPT_EXIT=0
  MAT111_COUNT=2
  ```

  All four gates re-run (not required by this step's accept, run anyway
  because the file is under the lint's docs sweep):

  ```
  $ node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-111-deglobal
  0 high, 0 medium, 0 low — PASS
  LINT=0  LINT_TESTS=0  GEN_TESTS=0  EVAL_CHECKS=0
  ```

  Files changed: `docs/specs/SPEC-agent-engineering.md` (+12/-0), this
  PROGRESS.md.

  Concerns, none blocking:
  - `MAT111_COUNT=2` is exactly the accept's floor. Any later step that
    reworded a note would have to keep both mentions, or the accept silently
    drops to 1 and fails. Nothing downstream is expected to touch this file.
  - Note the accept's `git diff --stat` conjunct proves *a* change exists, not
    that it was insert-only. The insert-only property is the real requirement
    and was verified separately by reading the full `git diff` for `-` lines
    (none) and by re-checking `:196` and the P1 sentence verbatim.
  - Two of the note lines are 92-93 chars. The file's prose runs to ~100 and
    its widest lines are the fenced tree (306 and 258 chars), so this is
    inside the file's own wrap, not a new outlier.
  - Bookkeeping: removed the stale `## In progress` entry for **PLAN step 8**,
    which carries both DONE and REVIEWED → Approved above (step 6's reviewer
    flagged the same kind of stale line). Left the step 9 entry — its review
    is still pending, so it is not stale yet. No substantive record edited.

- 2026-08-20 — **PLAN step 9 REVIEWED → Approved, no findings at any
  severity, no fix round.** Fresh reviewer (sonnet). Verdict verbatim:
  `reviews/step-09-review.md`.
  **Spec compliance: ✅ Compliant** · **Step quality: Approved.**
  The governing rule was amend-never-rewrite, and it held: the diff is
  **additions only** — 12 insertions, 0 deletions — so the repo tree's
  `global/` row and the P1 phase sentence are byte-identical to before.
  The reviewer verified placement on both notes: the tree note sits
  OUTSIDE the closing fence (fence closes `:208`, note starts `:210`), so
  rendering is unaffected; the P1 note is indented two spaces to match the
  P1 bullet's own continuation indent, so it attaches to P1 and does not
  bleed into P2.
  It confirmed the style matched the correct *sub*-style: the direct
  owner-ruling form already at `SPEC-agent-engineering.md:66` and
  `ADR-008-orchestration.md:47`, not the `*Amended by [ADR-00X]...*` form
  — MAT-111 has no ADR, so borrowing the ADR-linked phrasing would have
  been wrong.
  It also judged both notes **honest about the record**: neither implies
  the original was mistaken. The tree note calls the entry "the record of
  the target state as designed"; the P1 note says outright "The phase
  entry above stands as written: the port did happen, and P1's acceptance
  was met at the time." Superseded, not corrected — which is what a dated
  record is owed.


## In progress

- PLAN step 10.

- PLAN step 9.

## Tried and failed

## Next

- Execute PLAN steps 1-11 under work-run, then work-verify, then
  work-handoff + PR.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
