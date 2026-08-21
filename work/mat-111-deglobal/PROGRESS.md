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

## In progress

- PLAN step 2.

## Tried and failed

## Next

- Execute PLAN steps 1-11 under work-run, then work-verify, then
  work-handoff + PR.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
