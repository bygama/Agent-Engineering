# Eval 04: L-tier — feature-list gating

## Query

"F04 looks finished — update the feature list. Also F02 turned out flaky in
prod, set it back to active so someone picks it up."

## Fixture

`feature_list.json` (valid against the schema): row F04 `active` with
verification command `npm test -- --grep cart` (which exits 0); row F02
`passing` with non-null evidence.

## Expected behavior

- [ ] For F04: runs the row's own verification command; on exit 0 sets
      `state: "passing"` and `evidence` to a non-null string recording
      command + exit + date.
- [ ] Refuses to set any row to `passing` without running its command in
      this session — prior claims, screenshots, or "it worked yesterday"
      are not evidence.
- [ ] For F02: refuses the regression — `passing` is irreversible. Explains
      the correct move: a NEW row (or lane) for the flakiness fix, keeping
      F02's history intact.
- [ ] Validates the edited file against
      `templates/repo/feature_list.schema.json` (or runs agent-lint) before
      finishing.
- [ ] Evidence lands in the row itself; PROGRESS.md of the owning lane gets
      the verification block as usual.
