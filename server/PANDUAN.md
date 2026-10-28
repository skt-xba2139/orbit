# ORBIT — Panduan menyambung pelayan data

> © 2026 Cikgu Rizwan Yusop. Hak cipta terpelihara.

Tanpa pelayan, setiap pelayar menyimpan suntingan sendiri (gambar, pautan, pengumuman). Dengan pelayan ini:

- Pentadbir menyunting sekali, **semua guru nampak data yang sama**.
- Data disimpan dalam **Google Drive anda** (fail `orbit-data.json`), percuma, tanpa pelayan sendiri.
- Hanya orang yang tahu **kata laluan Pentadbir** boleh menyimpan perubahan. Kata laluan disemak di pelayan Google, bukan dalam pelayar.

## A. Pasang sekali sahaja (kira-kira 10 minit)

1. **Pilih akaun Google.** Disarankan akaun Gmail biasa, kerana akaun sekolah (DELIMa) sering menyekat pilihan "Anyone" di langkah 6. Data akan disimpan dalam Google Drive akaun ini.
2. Buka <https://script.google.com> → **New project**. Namakan projek: `ORBIT Data`.
3. Dalam fail `Code.gs`, padam semua kandungan, kemudian tampal seluruh kandungan [`server/Code.gs`](Code.gs). Tekan **Ctrl+S**.
4. **Tetapkan kata laluan Pentadbir:** ikon gear **Project Settings** (kiri) → turun ke **Script properties** → **Add script property** → Property: `ADMIN_PASSWORD`, Value: kata laluan pilihan anda → **Save script properties**.
   Jangan tulis kata laluan itu dalam kod atau GitHub.
5. **Beri kebenaran:** kembali ke editor (ikon `< >`), pilih fungsi `setup` pada menu atas, tekan **Run**. Pilih akaun anda → **Advanced** → **Go to ORBIT Data (unsafe)** → **Allow**. Pada Execution log akan keluar `ORBIT sedia`.
6. **Terbitkan:** **Deploy** → **New deployment** → ikon gear di sebelah "Select type" → **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Tekan **Deploy**, kemudian salin **Web app URL** (berakhir dengan `/exec`).
7. **Sambungkan ke ORBIT:** buka `orbit.config.json` di GitHub, tekan ikon pensel (Edit), tukar kepada:

   ```json
   {
     "api": "TAMPAL_URL_ANDA_DI_SINI"
   }
   ```

   lalu **Commit changes**. Dalam 1 hingga 2 minit laman web akan menggunakan pelayan itu. (Atau hantar URL kepada pembangun supaya dimasukkan dan dibina semula.)

## B. Masukkan data yang sudah ada

Data suntingan anda sekarang masih dalam pelayar. Cara memasukkannya ke pelayan:

1. Di tempat anda membuat suntingan: gear → kata laluan → **Urus warga & penyelaras** → **Eksport**. Simpan fail JSON itu.
2. Buka laman web ORBIT, tekan gear dan masukkan kata laluan. Di bahagian bawah laman, status akan berbunyi **Pelayan data masih kosong**.
3. **Urus warga & penyelaras** → **Import** → pilih fail JSON tadi. Perubahan terus disimpan ke pelayan.
   Jika tiada apa-apa yang perlu diimport, tekan gear → **Simpan ke pelayan sekarang** untuk memuat naik data semasa.

## C. Penggunaan harian

- **Pentadbir:** tekan gear, masukkan kata laluan, kemudian sunting seperti biasa (aplikasi, pautan, gambar guru, penyelaras, pengumuman). Setiap perubahan disimpan automatik. Status di menu gear dan di bahagian bawah laman menunjukkan:
  - *Menyimpan ke pelayan…* kemudian *Disegerakkan dengan pelayan data*.
  - *Tiada sambungan…* bermakna perubahan belum sampai ke pelayan; tekan **Cuba lagi** pada pemberitahuan.
- **Guru:** hanya buka pautan laman. Data terkini dimuat turun setiap kali laman dibuka, bila tab dibuka semula, dan setiap 5 minit.
- Jika dua Pentadbir menyunting serentak, yang kedua akan diberitahu bahawa data sudah dikemas kini oleh orang lain; paparannya dimuat semula dan suntingan terakhir perlu diulang. Ini mengelakkan perubahan saling menimpa.

## D. Keselamatan dan sandaran

- Salah kata laluan 5 kali: pelayan mengunci percubaan selama 5 minit.
- Setiap simpanan menyimpan versi sebelumnya sebagai `orbit-data.prev.json` dalam Drive anda (sandaran satu langkah). Fail `orbit-data.json` boleh dibuka dan disalin bila-bila masa.
- Sesiapa yang tahu alamat laman boleh **membaca** data (nama dan gambar warga, pautan aplikasi). Ini sama dengan apa yang laman sudah paparkan kepada umum. Jangan letak maklumat yang tidak mahu dikongsi, seperti nombor telefon peribadi.
- Untuk menukar kata laluan: ubah nilai `ADMIN_PASSWORD` dalam Script properties. Sesi Pentadbir yang sedang terbuka akan diminta masuk semula.

## E. Mengemas kini `Code.gs` kemudian

Selepas menyunting kod pelayan: **Deploy** → **Manage deployments** → ikon pensel → **Version: New version** → **Deploy**. Alamat `/exec` kekal sama.

## G. Statistik penggunaan sebenar (pengguna aktif, klik, halaman Statistik)

Bermula dengan versi `Code.gs` ini, ORBIT mengira penggunaan **sebenar**, bukan lagi angka contoh.

**Untuk mengaktifkannya:** kemas kini `Code.gs` seperti bahagian E (tampal `Code.gs` baharu, kemudian **Deploy → Manage deployments → pensil → New version → Deploy**). Alamat dan kata laluan tidak berubah dan tiada langkah lain. Selagi pelayan belum dikemas kini, ORBIT memaparkan "—" untuk pengguna aktif dan tidak menghantar apa-apa isyarat.

**Apa yang dikira**
- **Pengguna aktif:** bilangan peranti (pelayar atau telefon) yang membuka ORBIT dalam 3 minit terakhir. Setiap peranti menghantar isyarat ringkas kira-kira setiap 2 minit, hanya semasa tabnya kelihatan.
- **Klik:** setiap kali seseorang membuka aplikasi melalui ORBIT. Dikira bagi setiap aplikasi, hari dan jam (waktu Malaysia).
- **Halaman Statistik (Pentadbir):** jumlah klik, peranti unik, aplikasi digunakan, masa purata sehari, klik harian, kategori, waktu paling sibuk, aplikasi paling digunakan dan klik terkini. Perbandingan dengan tempoh sebelumnya hanya muncul selepas data mencukupi.

**Yang perlu diketahui**
- Pengiraan **bermula pada hari pelayan dikemas kini**; tiada sejarah lama.
- "Pengguna" ialah **peranti**: seorang guru yang menggunakan telefon dan komputer dikira dua. Penggunaan aplikasi terus tanpa melalui ORBIT tidak dikira.
- **Privasi:** peranti dikenali dengan ID rawak yang dijana dalam pelayar. Tiada nama, e-mel atau lokasi dikumpul. Kiraan keseluruhan (tanpa ID) boleh dibaca oleh sesiapa yang tahu alamat pelayan, sama seperti data lain.
- Data harian disimpan dalam fail `orbit-stats.json` di Google Drive anda (70 hari terakhir). Untuk memulakan semula, padam fail itu. Kehadiran semasa disimpan sementara dalam cache Google; jika ia dikosongkan, hanya isyarat satu minit terakhir boleh hilang, bukan klik yang sudah dikira.
- Pelayan menolak ID dan nama aplikasi yang tidak sah, menghad 10 klik setiap isyarat dan 300 klik setiap peranti sehari. Ini menyukarkan angka dipalsukan tetapi bukan perlindungan mutlak.
- Beban dirancang rendah (kira-kira 30 permintaan sejam bagi setiap peranti yang sedang membuka portal). Google tidak menerbitkan had harian tepat bagi web app; jika kuota pernah dicapai, statistik berhenti sehari dan pulih sendiri.

## F. Masalah lazim

| Gejala | Punca biasa |
|---|---|
| Bahagian bawah laman: *Pelayan tidak dapat dicapai* | URL salah, atau "Who has access" bukan **Anyone**, atau penerbitan belum dibuat. |
| Masuk Pentadbir: *Pelayan belum ditetapkan ADMIN_PASSWORD* | Langkah A4 belum dibuat, atau namanya tersalah eja. |
| Masuk Pentadbir: *Terlalu banyak percubaan* | Tunggu 5 minit. |
| *Gagal menyimpan (too_big)* | Data melebihi 9 MB; kecilkan gambar atau ikon SVG tersuai. |
| Selepas menyunting, guru tidak nampak perubahan | Mereka perlu membuka semula tab atau menunggu 5 minit. |
| Pengguna aktif memaparkan "—" dan Statistik berkata memerlukan pelayan data | `Code.gs` belum dikemas kini (bahagian G), atau penerbitan versi baharu belum dibuat. |
