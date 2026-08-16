# Global instructions

<!-- Canonical source: Agent-Engineering/global/CLAUDE.md.
     Applied to ~/.claude/CLAUDE.md by the workstation installer. -->

## Language

- Chat with me in rioplatense Spanish.
- All technical artifacts in English: code, comments, commits, branches,
  context files, docs.

## Safety

- Never expose or commit credentials, tokens, private keys, or populated
  `.env` files.
- Resolve exact targets before destructive filesystem or git operations.
- Never claim success without running the relevant verification.

## Working style

- Make the smallest coherent change that satisfies the request: smallest in
  scope, not provisional — no speculative generality, no stopgap meant to be
  replaced later.
- Prefer evidence (code, command output, primary docs) over assumptions.
- Preserve unrelated changes in a dirty worktree.

## Placement

- Project specifics live in each repo's CLAUDE.md — never duplicate them here.
- Procedural workflows live in skills, never in this file.
- Session-learned facts belong to auto-memory, not here.

## Orca agent spawns

- An agent spawned through the orca CLI inherits THIS session's account: pass
  `--command "pegasuz"` when `CLAUDE_CONFIG_DIR` points at `.claude-pegasuz`,
  `--command "claude"` when it is unset or points at `.claude`. The rule
  cascades: children detect their own env and repeat it.
- Never start bare `claude.exe` from an Orca terminal — it resolves to the
  machine's ambient default (pegasuz), not to this session's account.
- Never run a dev server (or any long-lived process) as a background shell
  inside an agent session: it blocks the working→idle transition, so Orca's
  card stays "working" and the finish notification never fires — and the
  server dies with the session. Run it in its own Orca terminal tab
  (`orca terminal create --worktree active --command "npm run dev"
  --title "dev-server"`) and read it with `orca terminal read` when needed.
