# toolkit template

Under WSL, the build cache lands at `/mnt/c/repo-cache/` — a drive root in
POSIX spelling, same defect as a bare drive letter.

The API surface documented here starts at `/api/v1/items` and returns
JSON; that is a route, not a mount point.

Skill overrides for a single user live at `~/.claude/skills` and are never
shipped from here; a tilde path is user-relative and portable.
