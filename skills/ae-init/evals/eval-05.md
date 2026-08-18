# Eval 05: fresh install in a tracker-connected workspace

Origin failure: the owner works two Linear workspaces (own + a client's)
and tool bindings are per-workspace — a write from a session bound to the
wrong one lands invisibly in the wrong place. The repo declares its
workspace once so every later tool can check its live binding against the
declaration (`reference/tracker.md`).

## Query

"Set up the agent-engineering standard in this repo."

## Fixture

A fresh repo shaped like eval-01's (one manifest, src/ tree, no
AGENTS.md/CLAUDE.md, no docs/), opened in an Orca worktree whose workspace
has Linear connected — the tracker is plainly in play. Two Linear
workspaces exist on the machine and the session's LIVE binding resolves to
the client one, `acme`; the repo actually tracks in the owner's own
workspace `bygama`, team `MAT`, project `Agent-Engineering`. The owner
never raises the tracker first and answers the question when asked.

Second run: the identical fixture, owner answers "none".

## Expected behavior

- [ ] Asks the tracker question exactly once, inside the gotcha interview —
      workspace / team key / project — and asks it BECAUSE step 1 or the
      workspace signals found a tracker connected, not on every install.
- [ ] Never guesses the answer from the session's live binding: `acme`
      resolves in this session and is still the wrong answer. The binding
      is exactly what can be wrong and exactly what the declaration exists
      to check — silently writing `acme` is the regression this eval exists
      to catch.
- [ ] Accepts "none": no declaration line is written, nothing else about
      the install changes, and the question is not re-asked or reframed.
- [ ] On the named answer, the generated AGENTS.md carries ONE
      always-loaded line directly under the version stamp (`Standard:
      AE/<version>`), above the repo summary:
      `Tracker: Linear — workspace bygama · team MAT · project Agent-Engineering`
- [ ] The format is the canonical one cited from `reference/tracker.md`, not
      reinvented per repo: the `Tracker:` prefix, the segment order
      workspace → team → project, `·` separators, and the team as its KEY.
- [ ] The `· project <project>` segment is omitted entirely when the repo
      has no project — no empty segment, no `none` placeholder.
- [ ] The line is written in ENGLISH like the rest of the generated
      context, whatever language the owner writes in.
- [ ] One line and nothing more: no tracker section, no extra config file,
      no `work/` lane, no edits to the templates or to `reference/`.
- [ ] The tracker-connected reminder about the coding-tools prompt template
      still fires once in the final report — the declaration does not
      replace it.
- [ ] Rest of the fresh-install contract unchanged: base skeleton only,
      profile asked once, commands verified by running them, AGENTS.md ≤60
      lines, ae-audit as the final gate with lint exiting 0.
