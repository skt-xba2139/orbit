# ORBIT — Integrated School Management System
# © 2026 Cikgu Rizwan Yusop. Hak cipta terpelihara.
#
# Membina orbit.html (fail tunggal) daripada src\orbit.src.html
# dengan menanam logo dari folder assets\ ke dalam HTML sebagai data URI.
#
#   .\build.ps1

$root = $PSScriptRoot
$src  = Join-Path $root 'src\orbit.src.html'
$out  = Join-Path $root 'orbit.html'

function Get-DataUri([string]$path) {
    'data:image/png;base64,' + [Convert]::ToBase64String([IO.File]::ReadAllBytes($path))
}

$html = [IO.File]::ReadAllText($src, [Text.Encoding]::UTF8)
$html = $html.Replace('__LOGO_SEKOLAH__', (Get-DataUri (Join-Path $root 'assets\logo-sekolah.png')))
$html = $html.Replace('__LOGO_TS25__',    (Get-DataUri (Join-Path $root 'assets\logo-ts25.png')))

[IO.File]::WriteAllText($out, $html, (New-Object Text.UTF8Encoding $false))
'{0}  ({1:N0} KB)' -f $out, ((Get-Item $out).Length / 1KB)
