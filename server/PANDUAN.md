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

## F. Masalah lazim

| Gejala | Punca biasa |
|---|---|
| Bahagian bawah laman: *Pelayan tidak dapat dicapai* | URL salah, atau "Who has access" bukan **Anyone**, atau penerbitan belum dibuat. |
| Masuk Pentadbir: *Pelayan belum ditetapkan ADMIN_PASSWORD* | Langkah A4 belum dibuat, atau namanya tersalah eja. |
| Masuk Pentadbir: *Terlalu banyak percubaan* | Tunggu 5 minit. |
| *Gagal menyimpan (too_big)* | Data melebihi 9 MB; kecilkan gambar atau ikon SVG tersuai. |
| Selepas menyunting, guru tidak nampak perubahan | Mereka perlu membuka semula tab atau menunggu 5 minit. |
