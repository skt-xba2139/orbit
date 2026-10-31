# ORBIT

Portal SK Tangkungon Telupid. Semua aplikasi sekolah di satu tempat: Pengurusan, Kurikulum, HEM, Ko-kurikulum dan Pusat Sumber. Ada juga karusel warga, penyelaras unit, pengumuman, statistik, sijil dan galeri.

© 2026 Cikgu Rizwan Yusop. Hak cipta terpelihara.
Tidak boleh disalin, diubah atau diedar semula tanpa izin bertulis daripada pemilik.

## Cara buka

Buka `index.html` dalam Chrome, Edge atau Safari. Satu fail sahaja, tak perlu pelayan. Alamat penuh laman: `https://skt-xba2139.github.io/orbit/`

### Pasang di telefon atau komputer

Tekan **Install aplikasi** di bawah laman (bahagian Pintasan). Panduan bergambar untuk Komputer, Android dan iPhone ada di situ. Kalau pelayar boleh pasang terus, ada butang **Pasang sekarang**. Bila ORBIT sudah dipasang, butang itu bertukar jadi "Pasang di peranti lain".

## Fail dan folder

| Laluan | Isi |
|---|---|
| `index.html` | Hasil bina, ini yang dibuka orang. Jangan edit terus. |
| `orbit.html` | Pengalih kecil supaya pautan lama `.../orbit.html` masih jalan. |
| `src/orbit.src.html` | Kod sumber. Semua suntingan dibuat di sini. |
| `build.ps1` | Skrip bina. Masukkan logo dari `assets/` dan alamat pelayan dari `orbit.config.json`. |
| `orbit.config.json` | Alamat pelayan data (`"api"`). Kosong bermaksud tiada pelayan. |
| `sw.js` | Menyimpan salinan ORBIT supaya cepat dibuka dan masih boleh dibuka tanpa internet. |
| `server/` | Pelayan data Google Apps Script (`Code.gs`) dan panduan memasangnya (`PANDUAN.md`). |
| `assets/` | Logo, ikon dan `qr.js` (penjana kod QR). |
| `brand/orbit-brand.html` | Panduan jenama ORBIT. |
| `arkib/` | Versi lama, sebelum dinamakan ORBIT. |

Lepas menyunting kod sumber, bina semula (PowerShell):

```powershell
.\build.ps1
```

## Data

Senarai aplikasi, kategori dan nama warga contoh ada dalam kod sumber. Suntingan Pentadbir (aplikasi, pautan, tab, warga, gambar, penyelaras, pengumuman) disimpan dengan salah satu cara ini:

1. **Dengan pelayan data (disyorkan).** Pelayan kecil Google Apps Script ([`server/Code.gs`](server/Code.gs)) simpan semua data dalam Google Drive pemilik. Semua guru nampak data yang sama dan hanya Pentadbir yang tahu PIN boleh simpan. Ikut [`server/PANDUAN.md`](server/PANDUAN.md), lepas itu isi alamat pelayan dalam `orbit.config.json`.
2. **Tanpa pelayan.** Suntingan disimpan dalam pelayar di peranti itu sahaja dan tidak dikongsi.

Sandaran atau pindah data: **Mod Pentadbir, Urus warga & penyelaras, Eksport / Import** (fail JSON).

### Yang dikongsi ke semua peranti

Jenama, warna aksen (12 pilihan), gaya bunyi, warna setiap unit dan semua kandungan yang Pentadbir ubah. Semua peranti ikut dalam masa seminit. Pilihan yang kekal peribadi pada setiap peranti: Kurangkan animasi, Kontras tinggi dan Bunyi hidup atau mati.

## Ciri-ciri

- **Statistik.** Pengguna aktif dan klik dikira oleh pelayan data (peranti dikenali dengan ID rawak, tiada nama). Tanpa pelayan, angkanya dipaparkan sebagai "—", bukan angka rekaan. Terbuka kepada semua warga dan dikemas kini setiap 15 saat. Lihat PANDUAN bahagian G.
- **Jenama.** Pentadbir boleh tukar antara ORBIT dan MyD@PS (Tetapan paparan, Jenama sistem). Lihat PANDUAN bahagian H.
- **Sijil dan pengiktirafan** (MyIPO dan lain-lain). Muat naik gambar atau PDF (halaman pertama sahaja). Ditunjukkan di bawah laman. Lihat PANDUAN bahagian I.
- **Galeri kegiatan.** Album perkongsian, pertandingan inovasi dan bengkel. Foto disimpan dalam Google Drive melalui pelayan data, jadi perlu `Code.gs` yang terkini. Lihat PANDUAN bahagian J.
- **Pintasan anda.** Di muka depan, aplikasi berbintang disusun dahulu, lepas itu yang terakhir dibuka (maksimum 10). Satu ketukan terus buka.
- **Kod QR & kongsi.** Di bawah laman (bahagian Pintasan). Ada kod QR, butang Kongsi, Salin pautan dan Muat turun QR untuk dicetak. Penjana QR (`assets/qr.js`, qrcode-generator, lesen MIT) hanya dimuat bila dialog dibuka.
- **Foto warga.** Gambar PNG atau WebP tanpa latar ditunjukkan tanpa latar pada kad karusel. Gambar biasa (JPG) kekal dengan latar kad. Kad kiri dan kanan karusel terus nampak fotonya.

### Bunyi

Intro dan setiap klik ada bunyi. Bunyi dijana dalam pelayar, tiada fail audio. Pentadbir pilih gaya bunyi di Tetapan paparan (1 Kristal, 2 Rhodes Hangat, 3 Angkasa [lalai], 4 Sinematik Lembut, 5 Kinetik Minimal, 8 Koir Cahaya). Setiap pengguna boleh tutup bunyi dengan ikon pembesar suara di atas.

Pelayar tak benarkan bunyi sebelum skrin disentuh. Jadi di **semua peranti** (iPhone, Android, tablet dan komputer), skrin masuk dengan tanda ORBIT sentiasa keluar dulu, walaupun pelayar sudah benarkan bunyi:

- Tandanya sahaja (bulatan O dan orbit, tanpa huruf dan tanpa tulisan). Tanda dilukis sendiri, ada cahaya bernafas dan cincin yang berdenyut keluar untuk mengajak guru ketuk atau klik.
- Lepas diketuk atau diklik, tanda menyala: orbit memecut, dua gelombang cahaya keluar, ada garis lensa dan percikan. Kemudian skrin ini memudar masuk ke intro yang bermula dengan bunyi penuh (kira-kira sesaat).
- Beberapa saat kemudian, jari kecil (telefon dan tablet) atau kursor (komputer) muncul di bawah tanda, bergerak, menekan dan memancarkan riak, lalu berulang perlahan. Ini untuk menunjukkan guru perlu ketuk atau klik. Tiada tulisan.
- Di komputer, menekan mana-mana kekunci pun boleh (selain Ctrl, Alt, Tab, Esc dan F1 hingga F12).
- Skrin tanda hanya keluar sekali setiap kali ORBIT dibuka baru (sesi). Kalau ORBIT hanya dibawa balik dari latar belakang atau dimuat semula, ia terus ke portal. Tutup aplikasi sepenuhnya untuk lihat lagi.
- Bila intro habis dan portal dibuka: logo intro terbang perlahan ke tempatnya di bar atas, cahaya lembut menyala dan pudar di tengah skrin, dan logo bar atas berkerlip dengan satu cincin riak bila ia mendarat. Kalau intro dilangkau awal (sebelum logo siap dilukis), portal dibuka dengan pudar biasa.
- Suis senyap di tepi iPhone tetap mematikan bunyi laman web. Itu tetapan telefon.

### Cepat dibuka dan luar talian

`sw.js` menyimpan salinan ORBIT. Kalau internet menjawab dalam 1.8 saat, versi terkini yang dibuka seperti biasa. Kalau perlahan atau tiada internet, salinan tersimpan yang dibuka terus, dan versi baharu dimuat turun di belakang. Bila versi baharu siap, keluar pemberitahuan "Ada versi baharu ORBIT" dengan butang Muat semula. Data warga, aplikasi dan lain-lain sudah tersimpan dalam pelayar, jadi ia terus nampak walaupun tiada internet. Pelayan data tidak melalui cache ini. Kalau logik cache diubah, naikkan nombor `V` dalam `sw.js`.

### Kelajuan

Skrin muat (tanda orbit berputar) keluar serta-merta sebelum skrip siap. Fon Google dimuat tanpa menahan paparan. Logo ialah fail luar di `assets/`, jadi HTML yang dimuat turun telefon kira-kira 130 KB (dulu 325 KB). Untuk satu fail yang lengkap dengan logo di dalamnya, bina dengan `.\build.ps1 -Inline`.

## Keselamatan

- **Dengan pelayan:** PIN Pentadbir (4 nombor) disemak di pelayan. PIN disimpan dalam `ADMIN_PASSWORD` (Script properties), bukan dalam kod. Pelayan tolak simpanan tanpa PIN dan kunci percubaan selepas 5 kali salah.
- **Tanpa pelayan:** mod Pentadbir tak boleh dibuka. Tiada cincangan PIN dalam kod, sebab PIN 4 nombor hanya ada 10,000 kemungkinan dan boleh dipecahkan serta-merta.
- Sesiapa yang tahu alamat laman boleh baca data yang disimpan.
