# ORBIT — Integrated School Management System

Portal digital SK Tangkungon Telupid: satu tempat untuk semua aplikasi sekolah (Pengurusan, Kurikulum, HEM, Ko-kurikulum, Pusat Sumber), lengkap dengan karusel warga, penyelaras unit, pengumuman dan pengurusan kandungan oleh Pentadbir.

> © 2026 Cikgu Rizwan Yusop. Hak cipta terpelihara.
> Dilarang menyalin, mengubah suai atau mengedar semula sistem ini tanpa kebenaran bertulis daripada pemilik hak cipta.

## Cara guna

Buka `index.html` terus dalam pelayar (Chrome / Edge / Safari). Ia satu fail yang lengkap; tiada pelayan diperlukan.

### Pasang sebagai aplikasi di telefon

Buka alamat laman di telefon, kemudian: **Android (Chrome)** menu ⋮ → *Add to Home screen* / *Install app*; **iPhone (Safari)** butang Kongsi → *Add to Home Screen*. ORBIT terbuka seperti aplikasi, tanpa bar pelayar, dengan ikon ORBIT (`manifest.webmanifest`, `assets/icon-*.png`).

## Struktur

| Laluan | Kandungan |
|---|---|
| `index.html` | Hasil bina: portal penuh (fail tunggal, logo tertanam), dibuka pada alamat pendek `https://<akaun>.github.io/orbit/`. Jangan disunting terus. |
| `orbit.html` | Pengalih kecil ke alamat pendek, supaya pautan lama `.../orbit.html` masih berfungsi. |
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

Pengguna aktif, klik dan halaman Statistik dikira **secara sebenar** oleh pelayan data (peranti dikenali dengan ID rawak, tiada nama; lihat [`server/PANDUAN.md`](server/PANDUAN.md) bahagian G). Tanpa pelayan data, angka itu dipaparkan sebagai "—", bukan angka rekaan.

Halaman **Statistik** terbuka kepada semua warga (bar navigasi) dan dikemas kini setiap 15 saat selagi dibuka. Pentadbir boleh menukar jenama antara **ORBIT** dan **MyD@PS** dalam *Tetapan paparan → Jenama sistem*; perubahan itu sampai kepada semua pengguna, termasuk skrin loading (lihat [`server/PANDUAN.md`](server/PANDUAN.md) bahagian H).

Pentadbir boleh memuat naik **sijil dan pengiktirafan** (MyIPO dll.; gambar atau PDF, halaman pertama ditukar kepada gambar) yang dipaparkan kepada semua pengguna dalam galeri premium melalui footer (lihat [`server/PANDUAN.md`](server/PANDUAN.md) bahagian I).

**Bunyi:** intro dan setiap klik berbunyi halus. Bunyi dijana terus dalam pelayar (Web Audio, tiada fail audio) dan lalai hidup dan boleh dimatikan oleh setiap pengguna melalui ikon pembesar suara di kepala atas atau *Tetapan paparan → Bunyi*. Pelayar hanya membenarkan bunyi selepas pengguna menyentuh laman, jadi intro pada lawatan pertama selalunya senyap.

**Galeri kegiatan** (album perkongsian, pertandingan inovasi dan bengkel) dipaparkan melalui footer; Pentadbir memuat naik foto dalam album (disimpan dalam Google Drive melalui pelayan data, memerlukan `Code.gs` terkini; lihat [`server/PANDUAN.md`](server/PANDUAN.md) bahagian J).

Sandaran atau pindah data: **Mod Pentadbir → Urus warga & penyelaras → Eksport / Import** (fail JSON).

## Keselamatan

- **Dengan pelayan:** PIN Pentadbir (nombor 4 digit, papan nombor gaya kunci telefon) disemak di pelayan (`ADMIN_PASSWORD` dalam Script properties, tidak ada dalam kod). Pelayan menolak simpanan tanpa PIN itu dan mengunci percubaan selepas 5 kali salah.
- **Tanpa pelayan:** mod Pentadbir tidak boleh dibuka. Tiada cincangan PIN dalam kod kerana PIN 4 digit hanya 10,000 kemungkinan dan cincangan awam boleh dipecahkan serta-merta.
- Data yang disimpan boleh dibaca oleh sesiapa yang tahu alamat laman.
