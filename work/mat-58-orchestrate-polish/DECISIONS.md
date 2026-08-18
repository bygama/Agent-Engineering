# orchestrate polish batch — decisions

## 2026-08-18 — SPEC approval (parent ruling, via orchestration ask)

Parent approved the SPEC and ratified the three investigation calls:

1. **Naming drift direction**: align `docs/how-it-works/execution.md:276`
   "pre-dispatch" → "pre-fan-out" — majority term across
   graphs-and-reducers.md, ADR-008, ADR-002, the spec; records are
   immutable; the topology word survives per the mat-55 ruling.
   graphs-and-reducers.md untouched.
2. **README mermaid**: `FAN` node id → `ORC`, plus the same block's
   `<br\>` one-char typo (line 75) fixed in passing — ruled in-scope
   tidying, recorded here.
   *Correction (same day, step 6)*: the `<br\>` typo turned out not to
   exist — the file already read `<br/>` at the branch point; the
   sighting was a display-escaping artifact of the investigation's
   search output. Only the node-id rename shipped; nothing else in the
   block was touched.
3. **reference/orca.md**: NO edit for item 1 — it already prescribes
   closing the unused fallback shell; SKILL.md citing it is the
   correct shape.

Ruling: "approve — SPEC faithful … Proceed to PLAN.md and the
work-cycle."

## 2026-08-18 — Owner amendment: item 9 (mid-flight, via mailbox)

Received at the implement→verify mailbox check (msg_787407570c20 —
the discipline item 8 encodes, working live): **item 9 joins the
batch.** `references/dispatch-child.md` gains one standing
instruction alongside item 8's mailbox rule: browser needs go through
Orca's embedded browser (`orca tab create/goto/snapshot/click/wait
--json`) — NEVER Playwright, chrome-devtools, or claude-in-chrome
from a supervised child session: a driven browser is a long-lived
process that blocks the card's working→idle transition and dies with
the session, while Orca's browser lives in the app
(`reference/orca.md` already names it the e2e tool; cite it). Same
evals-first discipline (one eval-01 line first, own test commit);
scope fence unchanged otherwise. SPEC and PLAN amended accordingly
(SPEC item 9, PLAN steps 8-9).

## 2026-08-18 — Ruling: browser-command literal (step 9 fix round 1)

The step-9 reviewer caught the amendment's command literal `orca tab
create/goto/snapshot/click/wait --json` mismatching
`reference/orca.md:53`'s verified E2E row `orca
goto/snapshot/click/wait --json` (the shorter form is the standard's
vocabulary everywhere else). Parent ruling, verbatim: "(b) — correct
template+eval literals to the verified shorter form … A citation must
match the cited row … the 'tab create' segment in my amendment was
the sloppy literal, not orca.md. No fence extension." Applied as fix
round 1: eval-01 literal first (test commit), then dispatch-child.md
(fix commit). SPEC item 9's literal updated to match the ruling.
