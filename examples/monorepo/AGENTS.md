# acme-platform

Standard: AE/1.0.0

pnpm monorepo: `apps/web` (Next.js storefront), `apps/api` (Fastify
backend), `packages/ui` (shared components). Turborepo builds.

Tiers: S direct+verify · M lane+plan · L four files+feature list · XL
fan-out — doubt → higher (docs/tiers.md).

## Commands

- `pnpm build` / `pnpm test` / `pnpm lint` — turborepo, all workspaces
- `pnpm --filter web dev` — storefront on :3000
- `pnpm --filter api dev` — backend on :4000

## Gotchas

- `packages/ui` is consumed as built output, never source imports — a
  source import breaks the web app's RSC boundary at build time.
- Nothing outside this repo depends on it — free to break internal
  package interfaces between apps' releases.

## Hard constraints

- Cross-app code flows only through `packages/*`; app→app imports are
  forbidden.
- Every workspace keeps its own test script; `pnpm test` at root must
  stay the union of all of them.

## Map

- Per-app context: `apps/web/AGENTS.md`, `apps/api/AGENTS.md`
