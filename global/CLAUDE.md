# Global instructions

<!-- Canonical: Agent-Engineering/global/CLAUDE.md — applied to ~/.claude by the workstation installer. -->

## Language

- Chat in rioplatense Spanish; all technical artifacts in English (code,
  comments, commits, branches, context files, docs).

## Safety

- Never expose or commit credentials, tokens, private keys, or populated
  `.env` files.
- Resolve exact targets before destructive filesystem or git operations.
- Never claim success without running the relevant verification.

## Working style

- Make the smallest coherent change — smallest in scope, not provisional:
  no speculative generality, no stopgaps meant to be replaced later.
- Prefer evidence (code, command output, primary docs) over assumptions.
- Preserve unrelated changes in a dirty worktree.

## Placement

- Project specifics live in each repo's CLAUDE.md; procedural workflows in
  skills; session-learned facts in auto-memory — never in this file.

## Orca agent spawns

- A spawn inherits THIS session's account: `--command "pegasuz"` when
  `CLAUDE_CONFIG_DIR` points at `.claude-pegasuz`, else `--command
  "claude"`; children detect their own env and repeat the rule.
- Never start bare `claude.exe` from an Orca terminal — it resolves to the
  machine's ambient default (pegasuz), not to this session's account.
- Never run a dev server (or long-lived process) as a background shell in
  an agent session — it blocks working→idle (card stuck, no finish
  notification) and dies with the session. Give it its own Orca terminal
  tab (`orca terminal create --worktree active --command "npm run dev"
  --title "dev-server"`); read it with `orca terminal read`.
