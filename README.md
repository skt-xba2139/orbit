# ORBIT — Integrated School Management System

Portal digital SK Tangkungon Telupid: satu tempat untuk semua aplikasi sekolah (Pengurusan, Kurikulum, HEM, Ko-kurikulum, Pusat Sumber), lengkap dengan karusel warga, penyelaras unit, pengumuman dan pengurusan kandungan oleh Pentadbir.

> © 2026 Cikgu Rizwan Yusop. Hak cipta terpelihara.
> Dilarang menyalin, mengubah suai atau mengedar semula sistem ini tanpa kebenaran bertulis daripada pemilik hak cipta.

## Cara guna

Buka `orbit.html` terus dalam pelayar (Chrome / Edge / Safari). Ia satu fail yang lengkap; tiada pelayan diperlukan.

## Struktur

| Laluan | Kandungan |
|---|---|
| `orbit.html` | Hasil bina (fail tunggal, logo tertanam). Jangan disunting terus. |
| `src/orbit.src.html` | Kod sumber. Semua suntingan dibuat di sini. |
| `build.ps1` | Skrip bina: menanam logo dari `assets/` ke dalam `orbit.html`. |
| `assets/` | Logo sekolah, logo TS25 dan aset jenama ORBIT (SVG). |
| `brand/orbit-brand.html` | Panduan jenama ORBIT. |
| `arkib/` | Hasil bina lama (sebelum dinamakan ORBIT). |

Untuk membina semula selepas menyunting sumber (PowerShell):

```powershell
.\build.ps1
```

## Data

Sistem ini **tidak mempunyai pangkalan data pelayan**. Data lalai (senarai aplikasi, kategori, nama warga contoh) ada dalam kod sumber. Suntingan Pentadbir (aplikasi, tab, warga, penyelaras, gambar, pengumuman) disimpan dalam `localStorage` pelayar pada peranti yang digunakan.

Untuk sandaran atau memindahkan data antara peranti: **Mod Pentadbir → Urus warga & penyelaras → Eksport**, yang menghasilkan fail JSON; fail itu boleh diimport semula di peranti lain.

Penyimpanan kongsi untuk semua guru memerlukan sambungan ke pelayan (cadangan: Google Sheet melalui Apps Script).

## Nota keselamatan

Kata laluan mod Pentadbir disemak di dalam pelayar sahaja. Ia menghalang salah masuk, tetapi bukan perlindungan sebenar daripada orang yang membaca kod sumber. Pengesahan sebenar perlu dibuat di pelayan.
