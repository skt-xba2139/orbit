# ORBIT — Integrated School Management System
# © 2026 Cikgu Rizwan Yusop. Hak cipta terpelihara.
#
# Membina orbit.html dan index.html (fail tunggal, salinan serupa) daripada src\orbit.src.html
# dengan menanam logo dari folder assets\ ke dalam HTML sebagai data URI,
# dan alamat pelayan data daripada orbit.config.json ("api").
#
#   .\build.ps1

$root = $PSScriptRoot
$src  = Join-Path $root 'src\orbit.src.html'
$out  = Join-Path $root 'orbit.html'
$cfg  = Join-Path $root 'orbit.config.json'

function Get-DataUri([string]$path) {
    'data:image/png;base64,' + [Convert]::ToBase64String([IO.File]::ReadAllBytes($path))
}

$api = ''
if (Test-Path $cfg) {
    $j = Get-Content -Raw -Encoding UTF8 $cfg | ConvertFrom-Json
    if ($j.api) { $api = ([string]$j.api).Trim() }
}
if ($api -and $api -notmatch '^https://script\.google\.com/(a/macros/[\w.-]+|macros)/s/[\w-]+/exec$') {
    throw "orbit.config.json: nilai 'api' bukan alamat Google Apps Script yang sah (https://script.google.com/macros/s/.../exec)."
}

$html = [IO.File]::ReadAllText($src, [Text.Encoding]::UTF8)
$html = $html.Replace('__LOGO_SEKOLAH__', (Get-DataUri (Join-Path $root 'assets\logo-sekolah.png')))
$html = $html.Replace('__LOGO_TS25__',    (Get-DataUri (Join-Path $root 'assets\logo-ts25.png')))
$html = $html.Replace('__ORBIT_API__',    $api)

[IO.File]::WriteAllText($out, $html, (New-Object Text.UTF8Encoding $false))

# index.html = salinan penuh: pautan pendek https://<akaun>.github.io/orbit/ membuka portal terus (alamat tidak bertukar kepada .../orbit.html).
# orbit.html dikekalkan supaya pautan lama masih berfungsi.
Copy-Item -LiteralPath $out -Destination (Join-Path $root 'index.html') -Force

'{0}  ({1:N0} KB)  pelayan data: {2}' -f $out, ((Get-Item $out).Length / 1KB), $(if ($api) { $api } else { '(belum disambungkan)' })
