### Spec compliance
✅ Compliant

### Strengths
- The paragraph is a straight repoint, not a rewrite: it keeps the same
  two-part operational contract (cite the line if present; re-run only if
  absent) rather than re-deriving it, which is exactly what Ruling A asked
  for — "repoint … with a generic probe description, minimal words."
- The truth of the claim actually improved. The old sentence asserted, as
  fact, that a session-start hook "already injected" the line on any
  machine with the global layer installed — true only because *this repo*
  used to ship the hook. Now that `global/` is gone and hook wiring is
  documented as optional (`reference/global-layer.md:85-87`: "The hook is
  optional … Nothing in the standard depends on a hook firing"), the new
  conditional framing ("Where the global layer wires a session-start probe
  hook, its result already arrived …") is the accurate claim, not a weaker
  one.
- `reference/global-layer.md` really does carry a "wiring recipe": the
  `## SessionStart hook wiring` section (lines 52-91) gives the
  `settings.json` shape, the JSON example, and the three portable rules
  (absolute path, hook optional, resolve-relative-to-install-location). The
  pointer's promise is kept.
- Line budget: file is exactly 120 lines before and after (`git show
  HEAD~1:reference/orca.md` / current both `grep -c ''` = 120) — the edit
  is genuinely neutral, not just under the cap by luck. Both the old and
  new paragraph occupy exactly 4 lines.
- Scope: `git diff` shows a single hunk, lines 26-29 only (was 23-26
  pre-blank-line-shift within the same file); nothing else in the file was
  restyled or touched.
- No `global/hooks` string remains anywhere in the file (confirmed by
  grep); no machine-anchored path introduced — `reference/global-layer.md`
  is a repo-relative pointer, consistent with `reference/` shipped-surface
  hygiene.

### Issues

#### Minor (Nice to Have)
- `reference/orca.md:28-29` — "re-run the probe only when **it** is
  absent." The pronoun's nearest antecedent is "that line" (from "citing
  that line satisfies step 0" in the immediately preceding clause), and
  that's also the semantically sensible reading — the guidance is
  symmetric: cite the line if present, re-run if the line is absent. So
  this resolves correctly on a careful read and isn't a real ambiguity.
  Still, the old text spelled out "the line" explicitly in the same slot,
  and swapping to a pronoun costs nothing to avoid — "re-run the probe
  only when the line is absent" would remove any need for the reader to
  resolve a referent at all, at zero line cost (same length). Not blocking.

### Assessment
**Step quality:** Approved
**Reasoning:** The instruction survives with its two operational halves
intact, the new claim is more accurate than the old one given this repo no
longer ships the hook, the referenced file genuinely backs the "wiring
recipe" pointer, the 120-line cap holds exactly as Ruling A required
(word-for-word neutral), and the diff touches nothing outside the one
paragraph. All four acceptance commands verified directly: no `global/hooks`
match, line count 120, and `node scripts/agent-lint.mjs . --ignore
tests,templates,examples` exits 0 (0 high, 0 medium, 0 low). The one note
above is stylistic and does not block.
