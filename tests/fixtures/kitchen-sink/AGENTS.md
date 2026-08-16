<!-- lint fixture: composite repo breaking rules across every layer. -->
# shop-api

Standard: AE/2.0

Order management service for the shop. Node + express + postgres.
Always read docs/architecture-notes.md before changing any module.

Tiers: S direct+verify · M lane+plan · L four files+feature list — doubt → higher.

## Commands

- `npm test`
- `npm run build`
- `npm run migrate  # not verified`

## Rules

- Follow the existing folder structure at all times.
- Keep functions small and composable.
- All new endpoints require a code review before merging.
- Use meaningful variable names everywhere.
- Never commit directly to main.
- Keep the changelog updated with every user-facing change.
- Prefer async/await over promise chains.
- All dates are stored in UTC, never local time.
- Environment variables are documented in .env.example.
- Database access goes through the repository layer only.
- Tests accompany every behavior change.
- Errors bubble up to the central handler; no silent catches.
- Log lines use the structured logger, never console.log.
- Feature flags gate every risky rollout.
- Public API responses are versioned under /v1.
- Retry logic uses exponential backoff with jitter.
- Secrets never appear in code or logs.
- The linter must pass before every push.
- Breaking API changes need a deprecation window.
- New dependencies require a short justification in the PR.
- Branch names follow type/short-description.
- Squash commits before merging feature branches.
- Update the API docs when responses change.
- Keep PRs under 400 lines when possible.

## Gotchas

- Write clean, readable code.
- The seed script must run before the first local test pass, or every
  suite fails with empty-table errors.
- Stripe webhooks arrive twice in dev because of the tunnel — the handler
  is idempotent on purpose; don't "fix" the duplicate calls.

## Hard constraints

- Prefer functional style over classes.
- Migrations require explicit human approval before applying (they have
  dropped production columns before).
- Refunds above $500 page a human; the service must never auto-approve
  them.

## Map

- Orders flow: `src/orders/`
- Payment integration: `src/payments/stripe.js`
- Architecture notes: `docs/architecture-notes.md`
