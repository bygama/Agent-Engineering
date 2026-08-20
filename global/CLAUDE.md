# Global instructions

<!-- Canonical: Agent-Engineering/global/CLAUDE.md — applied to ~/.claude by the workstation installer. -->

## Language

- Reply in the language of each prompt: Spanish prompt → rioplatense
  Spanish; English prompt → English. Communication only — never changes
  the artifact rules below.
- All technical artifacts in English: code, comments, docs, commits,
  branches, PR titles/bodies, context files.
- User-facing product content (site copy, UI text, SEO metadata) in Spanish, unless
  the project's context says otherwise.

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
