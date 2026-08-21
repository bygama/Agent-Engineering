# Step 1 fix round — re-review

### Finding verdicts

**1. `reference/global-layer.md:22-23` — "the standard defines the layer; it never populates it" contradicted by AGENTS.md/README.** — ADDRESSED.
The bullet is now titled "One owner per content class" and reads: "The standard ships the replicable part — the cross-repo skills that install into `~/.claude/skills`. It does not ship one person's machine policy: that is personal, and a personal repo owns it." (`reference/global-layer.md:22-24`). This matches `AGENTS.md:27` (skills junction-linked into `~/.claude/skills`) and README's copy-or-junction install paths — the standard is now correctly described as shipping skills while machine policy (CLAUDE.md, hooks) stays with the personal repo. The "What belongs in it" table (`global-layer.md:31-35`) is no longer contradicted: it lists content classes that belong in the layer without claiming the standard ships all of them, consistent with the narrowed prose. The closing section "The owner's living instance" (`global-layer.md:93-105`) is unchanged and stays consistent (workstation owns the personal machine policy, is "a consumer of this standard, never a dependency of it").

**2. `reference/global-layer.md:35-37` — duplication test restated near-verbatim, dropping the `(or nowhere)` branch.** — ADDRESSED.
The restatement is removed entirely and replaced with a deferral: "Which column a given line falls in is the duplication test's call, and `reference/context.md` owns that test — this file does not restate it." (`global-layer.md:37-38`). Verified against `reference/context.md:98-100`, which still carries the full test including "(or nowhere)". This is the "cut down to the existing deferral" option from the finding; no duplicated/divergent copy remains to drift out of sync.

**3. `reference/global-layer.md:58-70` — settings.json snippet shape doesn't load (missing nested `hooks` array).** — ADDRESSED.
The snippet now nests correctly:
```json
"SessionStart": [
  { "hooks": [ { "type": "command", "command": "...", "timeout": 15 } ] }
]
```
(`global-layer.md:62-75`). I independently verified this shape against the live `~/.claude/settings.json` on this machine (not just taking the diff's word for it) — its actual `hooks.SessionStart` array has exactly this two-level nesting (array of `{hooks: [...]}` entries, no `matcher` key for SessionStart), byte-for-byte the same structure the fix now publishes. The `<absolute path to>` placeholder is preserved (no machine paths leaked). The follow-up prose adds the requested clause: "The exact nesting belongs to the runner; that shape is Claude Code's — an event array whose every entry carries its own `hooks` array... Another runner spells the envelope differently. The three rules below survive any spelling:" (`global-layer.md:77-80`) — runner-generic framing kept, Claude Code's concrete shape now correct.

### New breakage in the fix diff
None. JSON snippet is syntactically valid, file stays within its 120-line cap (105 lines, confirmed via `wc -l`), no other claims in the touched hunks read as newly inconsistent.

### Out-of-scope observations
`docs/how-it-works/standard-lifecycle.md:14-26` carries the same SessionStart `settings.json` snippet with the OLD, unnested (broken) shape — the exact defect finding 3 fixed in `global-layer.md`, still present in the sibling doc. The fix diff didn't touch this file, so it's flagged here rather than blocking this round.

### Verdict
**Fix round:** All findings addressed, no new Critical/Important breakage.
