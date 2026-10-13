# Stop and remove the site from Tailscale
#
# Usage (PowerShell):
#   .\scripts\stop-tailscale.ps1

$ErrorActionPreference = 'Continue'
$Root = Split-Path $PSScriptRoot -Parent
$PidFile = Join-Path $Root '.preview-pid'

Write-Host '==> Removing the Tailscale share...' -ForegroundColor Cyan
tailscale serve stop 2>$null
if ($LASTEXITCODE -eq 0) {
  Write-Host 'Tailscale share removed. The site is no longer reachable.' -ForegroundColor Green
} else {
  Write-Host 'Nothing to remove (or Tailscale is not running).' -ForegroundColor Yellow
}

Write-Host '==> Stopping the local preview server...' -ForegroundColor Cyan
$stopped = $false
if (Test-Path $PidFile) {
  $pid_ = Get-Content $PidFile
  Remove-Item $PidFile -Force -ErrorAction SilentlyContinue
  try {
    Stop-Process -Id $pid_ -Force -ErrorAction Stop
    Write-Host "Stopped preview server (PID $pid_)" -ForegroundColor Green
    $stopped = $true
  } catch {
    # process already gone
  }
}

if (-not $stopped) {
  Get-CimInstance Win32_Process -Filter "Name='node.exe'" -ErrorAction SilentlyContinue |
    Where-Object { $_.CommandLine -like '*vite*' -and $_.CommandLine -like '*preview*' } |
    ForEach-Object {
      Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue
      Write-Host "Stopped preview process (PID $($_.ProcessId))" -ForegroundColor Gray
    }
}

Write-Host 'Done. Nothing from this site is being served anymore.' -ForegroundColor Green
