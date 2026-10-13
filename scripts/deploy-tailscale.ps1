# Deploy privately with Tailscale
# Serves the production build on your tailnet (only people in your Tailscale network can open it).
#
# Requirements:
#   - Tailscale installed and signed in:  https://tailscale.com/download
#   - Both your device and the recipient's device on the same tailnet
#
# Usage (PowerShell):
#   .\scripts\deploy-tailscale.ps1

$ErrorActionPreference = 'Stop'
$Port = 4173
$Root = Split-Path $PSScriptRoot -Parent
$PidFile = Join-Path $Root ".preview-pid"

function Stop-PreviewServer {
  if (Test-Path $PidFile) {
    $pid_ = Get-Content $PidFile
    Remove-Item $PidFile -Force -ErrorAction SilentlyContinue
    try {
      Stop-Process -Id $pid_ -Force -ErrorAction Stop
      Write-Host "Stopped preview server (PID $pid_)" -ForegroundColor Gray
    } catch {
      # already gone
    }
  }
}

Write-Host '==> Building the production site...' -ForegroundColor Cyan
Push-Location $Root
try {
  npm run build
  if ($LASTEXITCODE -ne 0) { throw 'Build failed' }

  Write-Host "==> Starting a local preview server on port $Port ..." -ForegroundColor Cyan
  $viteJs = Join-Path $Root 'node_modules\vite\bin\vite.js'
  if (-not (Test-Path $viteJs)) {
    throw 'Vite not found. Run "npm install" first.'
  }
  Stop-PreviewServer
  $preview = Start-Process -NoNewWindow -PassThru -FilePath 'node' -ArgumentList "`"$viteJs`"", 'preview', '--port', $Port, '--strictPort', '--host', '127.0.0.1'
  $preview.Id | Set-Content $PidFile

  $ready = $false
  for ($i = 0; $i -lt 20; $i++) {
    Start-Sleep -Seconds 1
    if ($preview.HasExited) {
      throw 'Preview server exited immediately. Port may be in use.'
    }
    $code = curl.exe -s -o NUL -w '%{http_code}' "http://localhost:$Port/"
    if ($code -eq '200') {
      $ready = $true
      break
    }
  }
  if (-not $ready) {
    Stop-PreviewServer
    throw 'Preview server did not become ready in time.'
  }

  Write-Host '==> Publishing to your tailnet with Tailscale...' -ForegroundColor Cyan
  tailscale serve $Port
  if ($LASTEXITCODE -ne 0) {
    Write-Warning 'tailscale serve failed. Make sure Tailscale is running and you are signed in (tailscale up).'
    Stop-PreviewServer
    exit 1
  }
} finally {
  Pop-Location
}

Write-Host ''
Write-Host 'Your little world is live on your tailnet.' -ForegroundColor Green
Write-Host 'Run: tailscale serve status   (to see the exact https://...ts.net URL)' -ForegroundColor Gray
Write-Host 'To stop and remove it anytime:  .\scripts\stop-tailscale.ps1' -ForegroundColor Gray
Write-Host ''
Write-Host 'Press Ctrl+C to stop the preview server.' -ForegroundColor Yellow
try {
  Wait-Process -Id $preview.Id
} finally {
  Stop-PreviewServer
}
