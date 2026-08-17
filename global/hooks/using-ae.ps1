# Emits the using-ae entry skill's content at session start, verbatim,
# under one header line. Canonical: Agent-Engineering/global/hooks/using-ae.ps1
# — applied to ~/.claude/hooks/ by the workstation installer. The skill file
# (junctioned at ~/.claude/skills/using-ae/SKILL.md) is the single source of
# truth; this hook injects it rather than a separate digest, so there is
# nothing else to drift.
$ErrorActionPreference = 'SilentlyContinue'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$skillPath = Join-Path (Split-Path $PSScriptRoot) 'skills/using-ae/SKILL.md'
if (Test-Path -LiteralPath $skillPath -PathType Leaf) {
    Write-Output '--- using-ae: AE entry skill (SessionStart) ---'
    Get-Content -LiteralPath $skillPath -Raw -Encoding UTF8 | Write-Output
}
exit 0
