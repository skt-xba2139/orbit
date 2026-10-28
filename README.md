# ORBIT — Integrated School Management System

Portal digital SK Tangkungon Telupid: satu tempat untuk semua aplikasi sekolah (Pengurusan, Kurikulum, HEM, Ko-kurikulum, Pusat Sumber), lengkap dengan karusel warga, penyelaras unit, pengumuman dan pengurusan kandungan oleh Pentadbir.

> © 2026 Cikgu Rizwan Yusop. Hak cipta terpelihara.
> Dilarang menyalin, mengubah suai atau mengedar semula sistem ini tanpa kebenaran bertulis daripada pemilik hak cipta.

## Cara guna

Buka `orbit.html` terus dalam pelayar (Chrome / Edge / Safari). Ia satu fail yang lengkap; tiada pelayan diperlukan.

## Struktur

| Laluan | Kandungan |
|---|---|
| `index.html`, `orbit.html` | Hasil bina (dua salinan serupa; fail tunggal, logo tertanam). `index.html` membuka portal terus pada alamat pendek `https://<akaun>.github.io/orbit/`. Jangan disunting terus. |
| `src/orbit.src.html` | Kod sumber. Semua suntingan dibuat di sini. |
| `build.ps1` | Skrip bina: menanam logo dari `assets/` dan alamat pelayan dari `orbit.config.json` ke dalam `orbit.html`. |
| `orbit.config.json` | Alamat pelayan data (`"api"`). Kosong = tanpa pelayan. |
| `server/` | Pelayan data Google Apps Script (`Code.gs`) dan panduan persediaan (`PANDUAN.md`). |
| `assets/` | Logo sekolah, logo TS25 dan aset jenama ORBIT (SVG). |
| `brand/orbit-brand.html` | Panduan jenama ORBIT. |
| `arkib/` | Hasil bina lama (sebelum dinamakan ORBIT). |

Untuk membina semula selepas menyunting sumber (PowerShell):

```powershell
.\build.ps1
```

## Data

Data lalai (senarai aplikasi, kategori, nama warga contoh) ada dalam kod sumber. Suntingan Pentadbir (aplikasi, pautan, tab, warga, gambar, penyelaras, pengumuman) disimpan dengan salah satu cara:

1. **Dengan pelayan data (disyorkan).** Pelayan kecil Google Apps Script ([`server/Code.gs`](server/Code.gs)) menyimpan semua data dalam Google Drive pemilik. Semua guru melihat data yang sama; hanya Pentadbir yang tahu kata laluan boleh menyimpan. Ikut [`server/PANDUAN.md`](server/PANDUAN.md), kemudian masukkan alamat pelayan dalam `orbit.config.json`.
2. **Tanpa pelayan.** Suntingan disimpan dalam `localStorage` pelayar pada peranti itu sahaja (tidak dikongsi).

Sandaran atau pindah data: **Mod Pentadbir → Urus warga & penyelaras → Eksport / Import** (fail JSON).

## Keselamatan

- **Dengan pelayan:** kata laluan Pentadbir disemak di pelayan (`ADMIN_PASSWORD` dalam Script properties, tidak ada dalam kod). Pelayan menolak simpanan tanpa kata laluan itu dan mengunci percubaan selepas 5 kali salah.
- **Tanpa pelayan:** kata laluan hanya disemak dalam pelayar, jadi ia menghalang salah masuk tetapi bukan perlindungan sebenar.
- Data yang disimpan boleh dibaca oleh sesiapa yang tahu alamat laman.
