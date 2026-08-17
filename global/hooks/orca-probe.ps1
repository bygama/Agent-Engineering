# Emits one line of session context: whether Orca is available right now.
# Canonical: Agent-Engineering/global/hooks/orca-probe.ps1 — applied to
# ~/.claude/hooks/ by the workstation installer. Executing skills may cite
# the emitted line as their completed step-0 probe (reference/orca.md).
$ErrorActionPreference = 'SilentlyContinue'
$cmd = $env:ORCA_CLI_COMMAND
if (-not $cmd) { $cmd = 'orca' }
$raw = & $cmd status --json 2>$null | Out-String
$ok = $false
if ($LASTEXITCODE -eq 0 -and $raw) {
    try { $ok = [bool](($raw | ConvertFrom-Json).ok) } catch { $ok = $false }
}
if ($ok) {
    Write-Output 'ORCA: available — session-start probe ok; executing skills may cite this line as step 0.'
}
else {
    Write-Output 'ORCA: unavailable — the no-Orca contract applies (reference/orca.md in the agent-engineering standard).'
}
exit 0
