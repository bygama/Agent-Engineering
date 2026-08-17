# Community-health matrix

`ae-init` asks the profile once and instantiates exactly this set.

| File | Personal | Public OSS | Team |
|---|---|---|---|
| README.md | yes | yes | yes |
| LICENSE | no | yes (MIT default, selectable) | case by case |
| SECURITY.md | no | yes | yes |
| CONTRIBUTING.md | no | yes | yes |
| .github templates (issues + PR) | no | yes | yes |
| CODEOWNERS | no | optional | yes |

Notes:
- These files are for humans and GitHub — they never load into model context,
  so they don't compete for the attention budget.
- README.md is not templated here; `ae-init` writes it per repo (or keeps
  the existing one).
