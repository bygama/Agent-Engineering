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
has Linear connected — the tracker is plainly in play. One manifest at the
root, no `apps/` tree, no top-level directory with a manifest of its own:
a SINGLE domain, well under the ≥3 that opens the monorepo tracker path
(`eval-06`). Two Linear workspaces exist on the machine and the session's
LIVE binding resolves to the client one, `acme`; the repo actually tracks
in the owner's own workspace `bygama`, team `MAT`, project
`Agent-Engineering`. The owner never raises the tracker first and answers
the question when asked — that answer, not the live binding, is the
fixture's ground truth: `bygama` / `MAT` / `Agent-Engineering`.

Second run: the identical fixture, owner answers "none".

Third run: the same repo grown to two domains (`apps/web` + `apps/api`,
each with its own manifest), owner answers as in the first run. Two is
still under the threshold — this run pins the boundary, not the middle.

## Expected behavior

- [ ] Asks the tracker question exactly once, inside the gotcha interview —
      workspace / team key / project — and asks it BECAUSE step 1 or the
      workspace signals found a tracker connected, not on every install.
- [ ] Under 3 domains that question is EXACTLY the single question above and
      nothing more: no pre-built recommendation, no proposed initiative, no
      per-domain project list, no approval round, no second turn. The
      ≥3-domain path (`eval-06`) does not fire here and does not fire on the
      third run either — new friction for a small repo is the regression
      this check exists to catch.
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
- [ ] The format matches the canonical format of `reference/tracker.md`'s
      declaration section, not reinvented per repo.
- [ ] The `· project <project>` segment is omitted entirely when the repo
      has no project — no empty segment, no `none` placeholder.
- [ ] The declaration takes the small-repo shape — `· project
      Agent-Engineering`, never `· initiative` — and no `Tracker-project:`
      line is written anywhere: the first two runs nest nothing, and the
      third run's two apps inherit the root declaration whole.
- [ ] ae-init creates NOTHING in the tracker: no project, no initiative, no
      issue. The declaration records where the repo tracks; provisioning
      belongs to the ≥3-domain path alone.
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
