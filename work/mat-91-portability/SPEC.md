---
issue: MAT-91
---
# SPEC — portability: machine-absolute paths off shipped surfaces, + using-ae's skill-authoring row

Tickets: MAT-91 (primary) · MAT-88 · Tier: M · Lane:
`work/mat-91-portability/`
Design input: parent's shaped brief (dispatch ctx_85f24f7cf833). Base: main
9fc4bda (tag v1.4.0). Two sibling lanes in flight — fence in §Out of scope.

## Problem

### A. Machine-absolute paths on shipped surfaces (MAT-91)

The standard claims runtime-neutrality, yet five living surfaces name the
author's disk. Measured on base 9fc4bda (`grep -rn "C:/Briar"`, excluding
`work/`):

| Surface | Line | Shape |
|---|---|---|
| `skills/ae-init/SKILL.md` | 14 | "locate your local clone — on this machine `C:/Briar/…` — or ask" |
| `skills/ae-audit/SKILL.md` | 33 | "from the Agent-Engineering repo clone (on this machine `C:/Briar/…` — or locate/ask)" |
| `skills/loop-setup/SKILL.md` | 65 | "(in the Agent-Engineering repo clone — on this machine `C:/Briar/…`, or locate/ask)" |
| `loops/issue-triage.md` | 41 | `--repo path:C:/Briar/…` **inside** the registration command |
| `loops/self-audit.md` | 45 | `--repo path:C:/Briar/…` **inside** the registration command |

Two different severities, and the SPEC treats them differently:

**The three skills are mild.** Each already carries a locate-or-ask escape,
so a foreign reader gets a dead path plus permission to look elsewhere.
The damage is that a runtime-neutral standard ships the author's disk —
and, since MAT-87 landed yesterday, that it ignores the rule the standard
now states for exactly this lookup.

**The two loops are worse.** The path sits *inside* a command the file
hands the operator to paste. A copied `orca automations create … --repo
path:C:/Briar/repos/mine/Agent-Engineering` on another box does not fail
loudly — it registers an automation against a path that is not there.
Silent wrong beats loud wrong here.

**Clean by contrast — verified, not assumed.** The same grep over
`reference/`, `templates/`, `global/`, `.claude/`, `tests/` returns zero
hits. The layers consumers actually install are already portable; this is a
leak in the repo's own surfaces, not in the standard it ships.

**One further hit, out of scope.** `docs/plans/2026-08-16-agent-engineering-p2-usage-skills.md:37`
carries the same literal. It is a dated, closed implementation plan — a
historical record of what was written on 2026-08-16, not a surface any
agent follows. Editing it would falsify the record. REPORTED, not fixed.

### B. using-ae's map is missing `skill-authoring` (MAT-88)

`skills/skill-authoring/` shipped yesterday with MAT-44 — the eleventh
skill. `README.md` already lists it ("## The eleven skills", row 11) and
`docs/how-it-works/architecture.md` already narrates it ("Live, all
eleven"). The one surface that actually *routes* work to it —
`skills/using-ae/SKILL.md` §`The map`, the always-loaded entry skill — does
not list it. An agent that follows the entry rule cannot reach
`skill-authoring` from the map; it arrives, if at all, by the runtime's own
trigger matching.

The row was deferred, not forgotten: MAT-87's DoD explicitly froze
`## The map` byte-identical and landed at **78 of the 80-line hard cap**
precisely to leave this row room. That headroom is 2 lines, and a sibling
lane is making the cap executable (MAT-92) while this lane edits the file.

## Design (settled by the parent — formalized here, not re-decided)

### 1. The three skills — cite the rule, do not restate it

MAT-87 put the resolution rule in the always-loaded entry skill
(`skills/using-ae/SKILL.md` §`Reference paths`): the standard's repo root
is the skill's link-resolved repo, then a local AE clone, then
`github.com/bygama/Agent-Engineering`; none reachable ⇒ say so.
`docs/how-it-works/execution.md:356` narrates it.

Each of the three literals is therefore replaced by a **citation of that
rule**, never a local paraphrase of the lookup order. Single-definition
discipline: one rule, one home, N pointers. A copy in three skills would be
three things to keep in sync the next time the rule moves.

The citation is **fixed vocabulary**, byte-identical at all three sites:

> `skills/using-ae` §Reference paths

Applied:

- **`skills/ae-init/SKILL.md:12-14`** — "locate your local clone — on this
  machine `C:/Briar/…` — or ask" ⇒ the repo resolved by that rule.
- **`skills/ae-audit/SKILL.md:31-33`** — same substitution inside the
  "run the lint from the AE clone" sentence. The `<repo-path>` placeholder
  already on line 31 (the lint's own argument) is untouched — it is a
  different thing (the repo being audited, not the standard's repo).
- **`skills/loop-setup/SKILL.md:63-65`** — same substitution inside the
  "instantiate from `templates/repo/loops/LOOP.md.template`" sentence.

Each replacement is shorter than what it replaces, so no budget moves in
the wrong direction.

### 2. The two loops — an operator-filled placeholder

The registration command carries a placeholder the operator substitutes at
registration time, matching how the shipped loop template already treats
this exact machine fact.

**Proposed token: `--repo path:<repo>`** — the spelling
`templates/repo/loops/issue-triage.example.md:41` already ships:

```
--precheck "orca linear list --filter open --json" --repo path:<repo>
```

The parent's brief names the token `<repo-path>`, but grounds the choice in
"matching how the loop template already treats machine facts" — and the
template's actual treatment is `<repo>`. The two halves of the brief point
at different tokens. This SPEC follows the **rationale** over the literal,
because `templates/` is fenced from this lane: shipping `<repo-path>` in
`loops/` would leave the repo with two spellings of one machine fact and no
way to reconcile them here. `<repo>` also reads better after the `path:`
prefix, which already says "path". **Parent's call at approval** — flipping
to `<repo-path>` is a one-token change to two lines.

**What the machine fact costs, and where it goes.** These two files are
this repo's *live* automation instances, registered on 2026-08-16. Removing
the literal means the file no longer records which disk they were
registered against. That loss is accepted and nothing is created to absorb
it: the surrounding prose already states "registered enabled 2026-08-16",
which is the fact worth keeping; the disk it ran from is per-machine
runtime state, and this repo already declares per-machine loop state a
gitignored `loops/*.state.json` concern. The brief's "if it survives at
all, an operator-local note" is permissive, not mandatory — no new file.

### 3. using-ae — one row, last, at 79 of 80

`## The map` gains one row, in `README.md`'s own ordering (skill-authoring
is that table's last row), in the siblings' exact form
(`- **name** — <when it fires>.`):

```
- **skill-authoring** — creating a skill or changing its behavior.
```

One line, **66 columns** — measured, not estimated: it ties the widest
existing map row (`orchestrate`, 66) without exceeding it, and sits well
inside the file's 74-column wrap, so it needs no continuation line. The
gerund form matches its nearest siblings (`ae-init` "installing or
migrating…", `ae-audit` "measuring…", `work-handoff` "closing or
pausing…"). **78 + 1 = 79 ≤ 80.** No trim is needed and none is
made: a trim is authorized only if the row does not fit, and it fits.
DECISIONS records that the trim clause was evaluated and did not fire.

The line count is verified by command before the commit, not asserted —
sibling lane MAT-92 makes this cap executable in the same wave, and the two
must not disagree.

### 4. The framing-sentence check (MAT-88) resolves to a no-op

MAT-88 asks whether "the map's framing sentence still reads correctly with
eleven skills". **It has none.** `## The map` in `skills/using-ae/SKILL.md`
is a bare heading followed by the list; no sentence in the file counts the
skills, and the nearest framing — the entry rule's "the AE skill that owns
the current phase" and the frontmatter description — is count-free by
construction, so eleven rows read exactly as nine did.

This is a finding, not a skipped check: the surfaces that *do* count are
`README.md:103` ("The eleven skills") and
`docs/how-it-works/architecture.md:67` ("Live, all eleven"), and both were
already updated when skill-authoring shipped. Verified, not assumed.
Recorded in DECISIONS.md.

### 5. Evals before content — four evals, one per skill whose behavior moves

AGENTS.md: "Every skill ships with ≥3 evals, written before the skill
content; evals change before content on every revision." The brief names
this for using-ae. This SPEC reads that as emphasis on the tight case, not
a carve-out suspending the repo's hard constraint for the other three —
the MAT-91 edit changes what an agent *does* on a foreign machine, which is
behavior, not typography. No existing eval in any of the four skills grades
repo-location resolution (verified by grep), so all four are additions and
nothing is rewritten.

- **`skills/using-ae/evals/eval-07.md`** — an ask to create or revise a
  skill routes through the map to `skill-authoring`. Named failure: reaching
  it by the runtime's trigger matching or by suite habit
  (`superpowers:writing-skills`) rather than from using-ae's map, which
  reads as a pass but leaves the map's gap intact. Second named failure:
  routing to `work-plan` because a skill edit "is just an M-tier change" —
  the map's rows are phase owners, and authoring is a phase (ADR-005).
- **`skills/ae-init/evals/eval-08.md`** — ae-init invoked on a machine that
  is not the author's: the agent reaches `templates/repo/` by the
  §Reference paths order, and when none of the three sources is reachable
  it says so instead of proceeding with invented template content.
- **`skills/ae-audit/evals/eval-05.md`** — same fixture for the lint step:
  reach `scripts/agent-lint.mjs` in the standard's repo by the rule, and
  when unreachable report the mechanical checks as NOT run rather than
  hand-waving them or silently dropping them from the report.
- **`skills/loop-setup/evals/eval-06.md`** — two halves: reach
  `LOOP.md.template` by the rule, AND leave `--repo path:<repo>` unfilled
  in the registration command it writes, so the operator substitutes it.
  Named failure: substituting the authoring machine's own path into a loop
  file, which is precisely the defect MAT-91 removes.

Each eval commit lands before the content commit it grades.

### 6. `docs/how-it-works/` — already covered, and the reason is checked

The repo's same-change docs constraint is satisfied by what already ships:
`docs/how-it-works/execution.md:356-362` states the resolution rule this
lane *applies*, and `architecture.md:67` already lists all eleven skills
including `skill-authoring`. This lane changes no structure or behavior
those chapters do not already describe — it removes exceptions to a
documented rule and fills a row a documented list already implies.

Both files are also fenced (`execution.md` is sibling lane A's;
`architecture.md` is untouched by choice). If review disagrees that the
existing coverage suffices, the sentence it wants is REPORTED in
PROGRESS.md for the parent, not written here.

## Out of scope (recorded, not forgotten)

- **`docs/plans/2026-08-16-…:37`** — the sixth machine-path hit. Dated
  closed plan; editing it falsifies the record. Reported, per §A.
- **`README.md`** — checked and needs nothing: already "The eleven skills"
  with a `skill-authoring` row. The brief's "README only if the portability
  fix genuinely needs it" resolves to **no**.
- **`templates/`** — fenced. It is also already clean (`path:<repo>`), which
  is why §2 matches it rather than changing it.
- **Sibling lane A**: `skills/orchestrate/**`, `reference/orca.md`,
  `reference/runners.md`, `docs/how-it-works/execution.md`.
- **Sibling lane B**: `scripts/agent-lint.mjs`, `tests/**`,
  `docs/how-it-works/standard-lifecycle.md` — including the ≤80 check for
  using-ae. This lane satisfies that cap; it does not implement it.
- **CHANGELOG.md, the AGENTS.md stamp, any version bump** — this rides the
  owner's next release with the rest of the wave.
- **`global/`, `examples/`** — untouched.
- A lint check that bans machine-absolute paths on shipped surfaces. It is
  the obvious follow-up and it is NOT built here: `scripts/agent-lint.mjs`
  is sibling lane B's file this wave. Reported for a future ticket.

## Definition of done

- Zero machine-absolute paths outside `docs/plans/`:
  `grep -rn "C:/Briar" --include="*.md" . | grep -v "^./work/" | grep -v
  "^./docs/plans/"` exits 1.
- Evals-before-content visible in history: each eval commit precedes the
  content commit it grades.
- `skills/using-ae/SKILL.md` is **≤80** lines, verified by command, and
  contains a `skill-authoring` row.
- All four gates exit 0: `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` · `node tests/run-lint-tests.mjs` ·
  `node tests/run-gen-tests.mjs` · `node tests/run-eval-checks.mjs`.
- No fenced file appears in `git diff --name-only main`.
- The reported items (the `docs/plans/` hit, the README no-op, the
  framing-sentence no-op, the future lint check) are all in PROGRESS.md.
- Branch pushed, PR open with `Closes MAT-91` and `Closes MAT-88` on
  separate lines; this lane never merges.
