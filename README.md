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

**Tetapan yang dikongsi ke semua peranti:** jenama, **warna aksen** (12 pilihan permata dan logam), gaya bunyi, warna setiap unit dan semua kandungan dipilih/disunting oleh Pentadbir dan disegerakkan melalui pelayan data; semua peranti mengikutnya dalam masa seminit. Hanya Kurangkan animasi, Kontras tinggi dan Bunyi hidup/mati ialah pilihan peribadi pada setiap peranti.

**Bunyi:** intro dan setiap klik berbunyi. Bunyi dijana terus dalam pelayar (Web Audio, tiada fail audio). Pentadbir memilih **gaya bunyi** dalam *Tetapan paparan → Gaya bunyi* (1 Kristal, 2 Rhodes Hangat, 3 Angkasa [lalai], 4 Sinematik Lembut, 5 Kinetik Minimal, 8 Koir Cahaya); pilihan itu disegerakkan ke pelayan data (kunci `sndpack`, tiada kemas kini `Code.gs` diperlukan) dan didengar oleh semua guru. Bunyi lalai hidup dan boleh dimatikan oleh setiap pengguna melalui ikon pembesar suara di kepala atas. Pelayar menyekat bunyi sehingga pengguna menyentuh laman, jadi pada **komputer**, bila bunyi hidup tetapi belum dibenarkan, laman memaparkan skrin **"Sentuh untuk masuk"** sebelum intro; satu sentuhan membuka bunyi dan intro bermula dengan bunyi penuh. Pada **telefon dan tablet** intro terus bermula tanpa skrin itu. Jika pelayar menyekat bunyi (iPhone sentiasa, Android kebanyakan masa), petunjuk kecil "Sentuh untuk bunyi" dipaparkan dan **sentuhan pertama menyertai bunyi intro pada saat semasa**, selari dengan visual (boot dipra-render ke penimbal dengan `OfflineAudioContext`, yang tidak disekat pelayar); sentuhan kedua melangkau intro. Jika pelayar membenarkan bunyi (cth. Android selepas *Install aplikasi*), intro berbunyi sendiri dari awal. Suis senyap di sisi iPhone ialah perkakasan dan dihormati: bunyi web senyap bila suis itu menunjukkan oren.

**Install aplikasi:** footer → Pintasan → *Install aplikasi* memasang ORBIT sebagai aplikasi (ikon pada skrin utama, dibuka tanpa bar pelayar). Pada Chrome/Edge/Android ia terus memasang; pada iPhone/iPad atau pelayar lain dialog memaparkan langkah ringkas. Butang disembunyikan bila laman sudah dibuka sebagai aplikasi. `sw.js` ialah pekerja perkhidmatan minimum tanpa cache (hanya untuk kriteria pemasangan, tiada risiko versi lapuk).

**Kelajuan dibuka:** skrin muat (tanda orbit berputar) dipaparkan serta-merta sebelum skrip utama siap; fon Google dimuat tanpa menyekat pelukisan; logo ialah fail luar (`assets/`) yang dimuat serentak dan dicache, jadi HTML yang dimuat turun telefon kira-kira 130 KB (dahulu 325 KB). Untuk satu fail kendiri (logo ditanam), bina dengan `.\build.ps1 -Inline`.

**Galeri kegiatan** (album perkongsian, pertandingan inovasi dan bengkel) dipaparkan melalui footer; Pentadbir memuat naik foto dalam album (disimpan dalam Google Drive melalui pelayan data, memerlukan `Code.gs` terkini; lihat [`server/PANDUAN.md`](server/PANDUAN.md) bahagian J).

**Foto warga:** gambar PNG/WebP tanpa latar (lutsinar) dipaparkan tanpa latar legap pada kad holografik karusel; potret terapung di atas pemandangan orbit. Gambar berlatar (JPG) kekal dengan latar kad. Kad kiri dan kanan karusel memaparkan foto penuh serta-merta, bukan menunggu giliran di tengah.

Sandaran atau pindah data: **Mod Pentadbir → Urus warga & penyelaras → Eksport / Import** (fail JSON).

## Keselamatan

- **Dengan pelayan:** PIN Pentadbir (nombor 4 digit, papan nombor gaya kunci telefon) disemak di pelayan (`ADMIN_PASSWORD` dalam Script properties, tidak ada dalam kod). Pelayan menolak simpanan tanpa PIN itu dan mengunci percubaan selepas 5 kali salah.
- **Tanpa pelayan:** mod Pentadbir tidak boleh dibuka. Tiada cincangan PIN dalam kod kerana PIN 4 digit hanya 10,000 kemungkinan dan cincangan awam boleh dipecahkan serta-merta.
- Data yang disimpan boleh dibaca oleh sesiapa yang tahu alamat laman.
