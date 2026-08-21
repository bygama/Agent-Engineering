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

## In progress

## Tried and failed

## Next

- Execute PLAN steps 1-11 under work-run, then work-verify, then
  work-handoff + PR.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
