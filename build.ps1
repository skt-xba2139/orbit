# ORBIT — Integrated School Management System
# © 2026 Cikgu Rizwan Yusop. Hak cipta terpelihara.
#
# Membina index.html (portal penuh, fail tunggal) daripada src\orbit.src.html
# dengan menanam logo dari folder assets\ ke dalam HTML sebagai data URI,
# dan alamat pelayan data daripada orbit.config.json ("api").
#
# Alamat laman ialah https://<akaun>.github.io/orbit/ (tanpa nama fail). orbit.html hanyalah pengalih kecil
# supaya pautan lama ".../orbit.html" tetap berfungsi dan bar alamat bertukar kepada alamat pendek.
#
#   .\build.ps1            (logo sebagai fail luar assets\; lalai)
#   .\build.ps1 -Inline    (fail tunggal kendiri: logo ditanam sebagai data URI)

param([switch]$Inline)

$root = $PSScriptRoot
$src  = Join-Path $root 'src\orbit.src.html'
$out  = Join-Path $root 'index.html'
$stub = Join-Path $root 'orbit.html'
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
# Logo dirujuk sebagai fail luar (assets\) supaya HTML kecil dan laman cepat dibuka pada telefon (259 KB data URI tidak lagi disekat dalam HTML;
# fail dimuat serentak dan dicache). Gunakan -Inline untuk fail tunggal kendiri (logo ditanam sebagai data URI).
if ($Inline) {
    $html = $html.Replace('__LOGO_SEKOLAH__', (Get-DataUri (Join-Path $root 'assets\logo-sekolah.png')))
    $html = $html.Replace('__LOGO_TS25__',    (Get-DataUri (Join-Path $root 'assets\logo-ts25.png')))
} else {
    $html = $html.Replace('__LOGO_SEKOLAH__', 'assets/logo-sekolah.png')
    $html = $html.Replace('__LOGO_TS25__',    'assets/logo-ts25.png')
}
$html = $html.Replace('__ORBIT_API__',    $api)

$utf8 = New-Object Text.UTF8Encoding $false
[IO.File]::WriteAllText($out, $html, $utf8)

$redirect = @'
<!doctype html>
<html lang="ms">
<!-- ORBIT — Integrated School Management System · © 2026 Cikgu Rizwan Yusop. Hak cipta terpelihara. -->
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#04050c">
<meta name="author" content="Cikgu Rizwan Yusop">
<meta name="copyright" content="© 2026 Cikgu Rizwan Yusop. Hak cipta terpelihara.">
<title>ORBIT — Integrated School Management System</title>
<script>location.replace(location.protocol==='file:'?'index.html'+location.search+location.hash:'./'+location.search+location.hash)</script>
<style>html,body{margin:0;min-height:100vh;background:#04050c;color:#9298bd;font:15px/1.5 system-ui,sans-serif}body{display:grid;place-items:center;text-align:center}a{color:#8b7bff}</style>
</head>
<body>
<p>Membuka <a href="./">ORBIT</a>…</p>
<noscript><p><a href="./">Klik di sini jika laman tidak terbuka.</a></p></noscript>
</body>
</html>
'@
[IO.File]::WriteAllText($stub, $redirect, $utf8)

'{0}  ({1:N0} KB)  pelayan data: {2}' -f $out, ((Get-Item $out).Length / 1KB), $(if ($api) { $api } else { '(belum disambungkan)' })
