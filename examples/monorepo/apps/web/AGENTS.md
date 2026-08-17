# acme-platform / web

Next.js 15 storefront (App Router, RSC-first). Styling via
`packages/ui` tokens only.

## Commands

- `pnpm --filter web dev` — :3000
- `pnpm --filter web test` — vitest + playwright smoke

## Gotchas

- Server components by default; a file gains `"use client"` only with a
  reason in the PR description.
- Route handlers live under `app/api/` but real logic belongs to
  `apps/api` — handlers stay thin proxies.

## Hard constraints

- No direct fetch to third parties from the client bundle — everything
  goes through `apps/api`.
