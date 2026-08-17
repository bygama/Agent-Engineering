# acme-api

Standard: AE/1.0.0

REST API for Acme's ordering flow — Node 22 + Express + Prisma on
Postgres. TypeScript everywhere; deploys from `main` via CI.

Tiers: S direct+verify · M lane+plan · L four files+feature list · XL
fan-out — doubt → higher (docs/tiers.md).

## Commands

- `npm run dev` — local server on :3000
- `npm test` — unit + integration (testcontainers Postgres)
- `npm run lint` — eslint + `tsc --noEmit`
- `npx prisma migrate dev` — apply schema changes locally  # not verified

## Gotchas

- `src/billing/` mirrors the payment provider's sandbox quirks — test
  against the recorded fixtures, never the live sandbox in CI.
- Migrations are append-only once merged; editing an applied migration
  breaks staging.
- The public package `@acme/api-client` is generated from this repo's
  OpenAPI spec — downstream teams depend on it.

## Hard constraints

- Public API responses are versioned under `/v1/` — a breaking change to
  a shipped response shape requires a `/v2/` route, never an edit.
- Nothing reads env vars outside `src/config.ts`.
