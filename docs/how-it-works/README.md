# How this repo works

Living self-documentation of Agent-Engineering: what every piece is, how the
flows run end to end, and why it is built this way. This folder is exempt
from the minimalism budget on purpose — it is just-in-time human
documentation, not always-loaded agent context. The hard rule that keeps it
honest: **any change that alters structure or behavior updates the affected
chapter in the same change.**

| Chapter | Covers | Status |
|---|---|---|
| [architecture.md](architecture.md) | the directory map, what each part answers, how they connect | current (P1) |
| [standard-lifecycle.md](standard-lifecycle.md) | install → audit → update/migrate flows, versioning | live since AE/2.0 |
| [work-lifecycle.md](work-lifecycle.md) | task tiers S/M/L, lanes, the four files, feature list, tracker plane | templates live · skills arrive P2 |
| execution.md | loops, fan-out/reducer, runners, Orca mapping | arrives P3–P4 |

Convention: every section that documents behavior not yet built carries a
`> Phase: PN` note, so this folder never claims unbuilt things exist.
