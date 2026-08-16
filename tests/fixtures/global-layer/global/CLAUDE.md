# Global instructions

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

- Make the smallest coherent change that satisfies the request.
- Prefer evidence (code, command output, primary docs) over assumptions.
- Preserve unrelated changes in a dirty worktree.

## Placement

- Project specifics live in each repo's CLAUDE.md — never duplicate them here.
- Procedural workflows live in skills, never in this file.
- Session-learned facts belong to auto-memory, not here.

## Tooling

- Prefer ripgrep over grep for searches.
- Use pnpm unless the repo pins another package manager.
