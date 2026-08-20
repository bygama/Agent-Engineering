# Decisions — mat-105-raton-seat

## 2026-08-19 — SPEC approval (parent ruling, via orchestration ask)

Parent approved the SPEC as written, all three judgment calls:

- **(a) Adversarial-seat sentence edit in runners.md**: approved — "a
  registry sentence naming only the DeepSeek pairing undersells what it
  now registers; minimal wording is right."
- **(b) Naming**: accented "ratón chispeante" in prose as a proper
  house name, ASCII in slugs — "correct split (precedent: ballena needs
  no accent, this one does)."
- **(c) No-change judgment** for `skills/orchestrate/SKILL.md` step 6,
  `skills/orchestrate/evals/eval-03.md`, and
  `docs/how-it-works/execution.md`: "sound because the dialogue default
  and eval-03's fixture explicitly chose the ballena; record it and
  re-verify at execution."

Ruling text (verbatim): "APPROVED as written, all three calls. (a) Yes
— a registry sentence naming only the DeepSeek pairing undersells what
it now registers; minimal wording is right. (b) Accented 'raton
chispeante' in prose as a proper house name, ASCII in slugs — correct
split (precedent: ballena needs no accent, this one does). (c) The
no-change judgment is sound because the dialogue default and eval-03's
fixture explicitly chose the ballena; record it and re-verify at
execution as you plan. Shape PLAN.md and proceed. Record this ruling in
your DECISIONS.md."

## 2026-08-19 — Step 1: falsehood check re-verified at execution

Checked the three surfaces line by line against the planned
`reference/runners.md` change (second cross-family reviewer seat "ratón
chispeante", launch `opencode --auto -m
opencode-go/muse-spark-1.2-contributor`, first-run consent gotcha, the
"(no output)" known-behavior line, and the adversarial-seat sentence
gaining the second pairing). Verdict per file: **no-change** on all
three — no eval revision is required, so step 2 may touch content.

**`skills/orchestrate/SKILL.md` — no-change.** Step 3's dialogue
default ("Default: **1 ballena** … deepseek v4 flash; several of them
are ballenas") stays true: the ballena remains the default the dialogue
offers, and the question it annotates already asks "which model?", so
the parenthetical names the default rather than asserting a sole seat.
Step 6's launch fork ("the ballena needs custom argv, so it takes the
two-step launch"), the `-m opencode-go/deepseek-v4-flash --auto` block,
the no-auth free-model fallback, the stall clock, the degenerate
`worker_done` paragraph and the judgment note ("the ballena default")
are each scoped to the ballena or to the seat *role*; a second seat
makes none of them false. The stall-clock and single-shot paragraphs
become narrower than the evidence now supports (they hold for any
opencode TUI seat, ratón included) — that is under-generality, not a
falsehood, and generalizing them is outside this lane's owned files.

**`skills/orchestrate/evals/eval-03.md` — no-change.** The fixture
picks "1 ballena" explicitly, so every graded line is conditioned on
that choice and none claims the ballena is the ONLY seat. The one line
that enumerates ("carries `--auto` on **both invocation forms**") is
scoped to *the ballena's* two forms — Go default and no-auth free
fallback — and the ratón is a distinct seat with its own argv, not a
third ballena form. The planned "(no output)" line does not collide
with the single-shot graded line either: that line grades routing on a
verdict quoted inside Orca's rejected-worker_done wrapper, while the
new note records a different surfacing path (transcript) resolved by
the same single-shot guidance. Adjacent check: `evals/eval-01.md`'s
dialogue line ("offers **default 1 ballena** (deepseek v4 flash)")
also stays true, since the ballena keeps the default.

**`docs/how-it-works/execution.md` — no-change.** The review-wave
narration draws the ballena as the default seat, not the only one:
stage 6's CLI-enforced launch fork (`--model` accepts only Claude,
Codex and Cursor ids, so a custom-argv seat takes the four-command
two-step), the stall clock, the placeholder/`worker_done` failure mode,
stage 7's rebase-before-merge ordering, stage 8's teardown and stage
4's borrowed-launch exception all stay true with a second opencode seat
available. The chapter's "Runners" section restates no exclusivity
claim — it calls the runner "a free choice per row of the worker
table", and its portability-proof paragraph is a dated 2026-08-16
record that the change does not touch. `docs/how-it-works/`'s only
other mention (work-lifecycle.md, the adversarial rung) is a pointer at
`reference/runners.md`, "The adversarial seat", with no restated
pairing to fall out of date.

Gate: `node tests/run-eval-checks.mjs` exits 0 with no eval touched.

## 2026-08-19 — Step 2 review ⚠️ adjudicated: "(no output)" seat WAS a ratón

The step-2 reviewer flagged that `reference/runners.md` attributes the
degenerate `worker_done` ("(no output)", never registered in the
ledger) to "one ratón seat" while the SPEC says only "one seat's" —
one notch more specific than the SPEC licensed. Adjudication: the
attribution stands. MAT-105's ticket (the evidence source) states the
entire round-2 review wave — both the MAT-104 seat (ctx_b5f296bfeb2a)
and the MAT-94 seat (ctx_62889aeddd29) — ran with `opencode --auto -m
opencode-go/muse-spark-1.2-contributor` instead of the ballena. Every
seat in that wave was a ratón, so whichever of the two produced the
event, "one ratón seat" is accurate; the cause (model vs CLI) stays
unattributed exactly as the ticket records it.
