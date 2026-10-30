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
4. **Tetapkan PIN Pentadbir:** ikon gear **Project Settings** (kiri) → turun ke **Script properties** → **Add script property** → Property: `ADMIN_PASSWORD`, Value: PIN pilihan anda → **Save script properties**.
   PIN mestilah **4 nombor sahaja** (cth. empat digit pilihan anda), kerana ORBIT memaparkan papan nombor gaya kunci telefon dan hanya menerima nombor. Jangan tulis PIN itu dalam kod atau GitHub.
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
2. Buka laman web ORBIT, tekan gear dan masukkan kata laluan. Dalam menu gear, status akan berbunyi **Pelayan data masih kosong**.
3. **Urus warga & penyelaras** → **Import** → pilih fail JSON tadi. Perubahan terus disimpan ke pelayan.
   Jika tiada apa-apa yang perlu diimport, tekan gear → **Simpan ke pelayan sekarang** untuk memuat naik data semasa.

## C. Penggunaan harian

- **Pentadbir:** tekan gear, masukkan kata laluan, kemudian sunting seperti biasa (aplikasi, pautan, gambar guru, penyelaras, pengumuman). Setiap perubahan disimpan automatik. Status dalam menu gear (Pentadbir sahaja; footer tidak lagi memaparkan status) menunjukkan:
  - *Menyimpan ke pelayan…* kemudian *Disegerakkan dengan pelayan data*.
  - *Tiada sambungan…* bermakna perubahan belum sampai ke pelayan; tekan **Cuba lagi** pada pemberitahuan.
- **Guru:** hanya buka pautan laman. Data terkini dimuat turun setiap kali laman dibuka, bila tab dibuka semula, bila internet kembali, dan setiap minit selagi laman dibuka. Semua yang Pentadbir ubah (kandungan, jenama, warna aksen, warna unit, gaya bunyi) sampai ke semua peranti dalam masa seminit.
- Jika dua Pentadbir menyunting serentak, yang kedua akan diberitahu bahawa data sudah dikemas kini oleh orang lain; paparannya dimuat semula dan suntingan terakhir perlu diulang. Ini mengelakkan perubahan saling menimpa.

## D. Keselamatan dan sandaran

- Salah PIN 5 kali: pelayan mengunci percubaan selama 5 minit. PIN 4 digit hanya 10,000 kemungkinan, jadi kunci ini yang melindunginya; jangan kongsi PIN dan tukar bila perlu. Tanpa pelayan data disambungkan, mod Pentadbir tidak boleh dibuka.
- Setiap simpanan menyimpan versi sebelumnya sebagai `orbit-data.prev.json` dalam Drive anda (sandaran satu langkah). Fail `orbit-data.json` boleh dibuka dan disalin bila-bila masa.
- Sesiapa yang tahu alamat laman boleh **membaca** data (nama dan gambar warga, pautan aplikasi). Ini sama dengan apa yang laman sudah paparkan kepada umum. Jangan letak maklumat yang tidak mahu dikongsi, seperti nombor telefon peribadi.
- Untuk menukar PIN: ubah nilai `ADMIN_PASSWORD` dalam Script properties (nombor 4 digit; berkuat kuasa serta-merta, tiada Deploy semula). Sesi Pentadbir yang sedang terbuka akan diminta masuk semula.
- Warna aksen (12 pilihan: Aurora, Samudera, Suria, Zamrud, Mawar, Safir, Ametis, Emas, Platinum, Emas Mawar, Rubi, Senja): **gear → Tetapan paparan → Warna aksen**. Hanya Pentadbir boleh menukarnya dan ia terpakai pada semua peranti (disegerakkan melalui pelayan; tiada Deploy semula). Pilihan peribadi di setiap peranti hanya Kurangkan animasi, Kontras tinggi dan Bunyi hidup/mati.
- Gaya bunyi intro dan klik: **gear → Tetapan paparan → Gaya bunyi**. Ketik satu gaya untuk memilih dan mendengar intronya; pilihan dipakai oleh semua guru (disegerakkan melalui pelayan seperti jenama; tiada Deploy semula diperlukan). Lalai: 3 Angkasa. Setiap guru boleh mematikan bunyi pada peranti sendiri melalui ikon pembesar suara di kepala atas. Pada lawatan baharu di komputer, skrin "Sentuh untuk masuk" muncul sebelum intro supaya bunyi sentiasa ada (pelayar menyekat bunyi sebelum sentuhan pertama). Pada telefon dan tablet skrin itu tiada: intro terus bermula. Jika pelayar menyekat bunyi, petunjuk kecil "Sentuh untuk bunyi" dipaparkan dan sentuhan pertama menyertai bunyi intro pada saat semasa (sentuhan kedua melangkau intro); jika pelayar membenarkan (cth. Android selepas Install aplikasi), intro berbunyi sendiri. Suis senyap iPhone (oren) tetap mendiamkan bunyi web, itu tetapan perkakasan.
- Warna setiap unit (Pengurusan, Kurikulum, dan seterusnya): **gear → Tetapan paparan → Warna unit → Ubah**. Pilih warna pratetap atau seret peluncur; warna dipakai pada kad, tab, ikon dan skrin loading unit itu, untuk semua pengguna.

## E. Mengemas kini `Code.gs` kemudian

Selepas menyunting kod pelayan: **Deploy** → **Manage deployments** → ikon pensel → **Version: New version** → **Deploy**. Alamat `/exec` kekal sama.

`Code.gs` terkini (pilihan, disyorkan bila ramai guru): semakan perubahan setiap minit dijawab daripada cache tanpa membaca fail Drive, jadi jauh lebih ringan pada kuota Apps Script. Pelayan lama masih berfungsi tanpa kemas kini ini.

## G. Statistik penggunaan sebenar (pengguna aktif, klik, halaman Statistik)

Bermula dengan versi `Code.gs` ini, ORBIT mengira penggunaan **sebenar**, bukan lagi angka contoh.

**Untuk mengaktifkannya:** kemas kini `Code.gs` seperti bahagian E (tampal `Code.gs` baharu, kemudian **Deploy → Manage deployments → pensil → New version → Deploy**). Alamat dan kata laluan tidak berubah dan tiada langkah lain. Selagi pelayan belum dikemas kini, ORBIT memaparkan "—" untuk pengguna aktif dan tidak menghantar apa-apa isyarat.

**Apa yang dikira**
- **Pengguna aktif:** bilangan peranti (pelayar atau telefon) yang membuka ORBIT dalam 3 minit terakhir. Setiap peranti menghantar isyarat ringkas kira-kira setiap 2 minit, hanya semasa tabnya kelihatan.
- **Klik:** setiap kali seseorang membuka aplikasi melalui ORBIT. Dikira bagi setiap aplikasi, hari dan jam (waktu Malaysia).
- **Halaman Statistik (terbuka kepada SEMUA warga, ada dalam bar navigasi):** dikemas kini sendiri setiap 15 saat selagi dibuka, dengan bilangan peranti aktif sekarang di bahagian atas. Aplikasi yang terhad kepada Pentadbir tidak disenaraikan kepada pembaca biasa. Kandungan: jumlah klik, peranti unik, aplikasi digunakan, masa purata sehari, klik harian, kategori, waktu paling sibuk, aplikasi paling digunakan dan klik terkini. Perbandingan dengan tempoh sebelumnya hanya muncul selepas data mencukupi.
  Klik terkini memaparkan **"N user membuka (aplikasi)"**: N ialah bilangan peranti berbeza yang membuka aplikasi itu dalam klik terkini (peranti yang sama klik berulang dikira sekali, tanpa nama; seorang guru dengan dua peranti dikira dua). Ini memerlukan `Code.gs` yang terkini; selagi belum dikemas kini (seperti bahagian E), klik terkini memaparkan "Seseorang".

**Yang perlu diketahui**
- Pengiraan **bermula pada hari pelayan dikemas kini**; tiada sejarah lama.
- "Pengguna" ialah **peranti**: seorang guru yang menggunakan telefon dan komputer dikira dua. Penggunaan aplikasi terus tanpa melalui ORBIT tidak dikira.
- **Privasi:** peranti dikenali dengan ID rawak yang dijana dalam pelayar. Tiada nama, e-mel atau lokasi dikumpul. Kiraan keseluruhan (tanpa ID) boleh dibaca oleh sesiapa yang tahu alamat pelayan, sama seperti data lain.
- Data harian disimpan dalam fail `orbit-stats.json` di Google Drive anda (70 hari terakhir). Untuk memulakan semula, padam fail itu. Kehadiran semasa disimpan sementara dalam cache Google; jika ia dikosongkan, hanya isyarat satu minit terakhir boleh hilang, bukan klik yang sudah dikira.
- Pelayan menolak ID dan nama aplikasi yang tidak sah, menghad 10 klik setiap isyarat dan 300 klik setiap peranti sehari. Ini menyukarkan angka dipalsukan tetapi bukan perlindungan mutlak.
- Beban dirancang rendah (kira-kira 30 permintaan sejam bagi setiap peranti yang sedang membuka portal). Google tidak menerbitkan had harian tepat bagi web app; jika kuota pernah dicapai, statistik berhenti sehari dan pulih sendiri.

## H. Jenama ORBIT atau MyD@PS (togol Pentadbir)

**Mod Pentadbir → Tetapan paparan → Jenama sistem** membolehkan Pentadbir bertukar antara **ORBIT** dan **MyD@PS** pada bila-bila masa. Pilihan disimpan sebagai sebahagian daripada data kongsi di pelayan (kunci `brand`), jadi **semua pengguna** melihat jenama yang sama selepas muat semula: tulisan pada navbar, tajuk hero, footer, tajuk tab pelayar dan **skrin loading**. Logo (cincin-O dengan orbit) kekal sama untuk kedua-dua jenama: hanya hurufnya berubah (RBIT menjadi MYD@PS, dilukis garis tunggal dengan kecerunan dan kilau yang sama). Tiada kemas kini `Code.gs` diperlukan (pelayan menyimpan data kongsi apa adanya).

- Peranti yang pernah membuka portal menyimpan jenama terakhir dan membuka intro dengan jenama itu. Jika Pentadbir baru menukarnya, intro bermula dengan jenama lama dan bertukar dengan lembut sebaik sahaja data pelayan tiba (biasanya kurang 2 saat).
- Yang TIDAK berubah serta-merta: nama dan ikon aplikasi yang dipasang di skrin utama telefon (diambil daripada `manifest.webmanifest` semasa memasang; pasang semula untuk menukarnya), dan teks yang ditulis sendiri dalam pengumuman.
- Tanpa pelayan data, pilihan hanya disimpan pada peranti itu.

## I. Sijil & pengiktirafan (MyIPO dan lain-lain)

Pentadbir boleh memuat naik sijil dan pengiktirafan, dan **semua pengguna** melihatnya dalam paparan galeri yang premium (bingkai berkilau, condong 3D mengikut kursor, leret atau anak panah untuk bertukar sijil, dan paparan penuh dengan zum).

- **Tempat paparan:** footer → lajur **Mengenai Kami** → **Sijil & Pengiktirafan** (dengan bilangan sijil), atau Ctrl K → "sijil". Ia disembunyikan daripada pengguna biasa selagi belum ada sijil.
- **Cara menyunting (Pentadbir):** menu Mod Pentadbir → **Urus sijil & pengiktirafan**, atau *Tetapan paparan → Sijil & pengiktirafan → Urus sijil*. Tambah sijil: muat naik gambar (JPG, PNG atau WebP), isi tajuk, jenis (MyIPO, Hak Cipta, Cap Dagangan, Anugerah, Pengiktirafan), pengeluar, no. rujukan, tarikh, keterangan dan pautan dokumen asal (pilihan). Susun semula, sunting dan padam (ada *Buat asal*).
- **PDF:** boleh dimuat naik terus. **Halaman pertama** ditukar kepada gambar secara automatik (PDF berbilang halaman: hanya halaman pertama; PDF berkata laluan tidak disokong). Pertukaran guna pdf.js yang dimuatkan **sekali sahaja** daripada cdnjs apabila Pentadbir memilih PDF (versi tetap 3.11.174, disahkan dengan hash SRI), jadi memerlukan sambungan internet pada masa itu sahaja; paparan sijil untuk pengguna tidak memerlukannya. Fail PDF asal tidak disimpan; untuk membolehkan pengguna memuat turunnya, letakkan pautan PDF (cth. Google Drive, "sesiapa yang ada pautan") dalam ruang *Pautan dokumen asal*, dan butang **Dokumen asal** akan muncul pada paparan.
- **Had:** 12 sijil. Setiap gambar dikecilkan secara automatik (sisi terpanjang 1600px, kira-kira 220 KB sekeping) supaya data kongsi kekal ringan; jumlah gambar kira-kira 2.4 MB.
- **Penyimpanan:** sebahagian daripada data kongsi di pelayan (kunci `certs`), jadi **tiada kemas kini `Code.gs` diperlukan**. Semua pengguna melihat sijil baharu selepas muat semula portal. Setiap perubahan menghantar semua data kongsi sekali lagi, jadi tunggu status "Disegerakkan" selepas muat naik.
- **Privasi:** sijil boleh dilihat oleh sesiapa yang tahu alamat laman. Elakkan memuat naik dokumen yang mengandungi no. kad pengenalan, alamat rumah atau maklumat peribadi lain (tutup bahagian itu pada gambar dahulu).

## J. Galeri kegiatan (album gambar)

Galeri memaparkan album **perkongsian, pertandingan inovasi, bengkel** dan lain-lain kepada semua pengguna: ikhtisar album (kad bertindan, tapis kategori, album terkini besar), album dengan baris foto tanpa dipotong, dan penonton foto (leret, zum, tayangan slaid, lajur gambar kecil, skrin penuh).

**Untuk mengaktifkannya (sekali sahaja):** muat naik gambar memerlukan `Code.gs` terkini kerana gambar disimpan dalam Google Drive anda, bukan dalam data kongsi (data kongsi hanya menyimpan senarai album, jadi kekal kecil walau beribu foto). Tampal `Code.gs` baharu seperti bahagian E, kemudian **Deploy → Manage deployments → pensil → New version → Deploy**. Tiada kebenaran baharu diperlukan kerana skrip sudah menggunakan Drive; jika Google tetap meminta, benarkan sahaja. Selagi belum dikemas kini, Pentadbir melihat nota kuning dan butang muat naik tidak menghantar apa-apa; album yang sedia ada tetap boleh dilihat.

- **Tempat paparan:** footer → lajur **Mengenai Kami** → **Galeri Kegiatan** (bersama *Sijil & Pengiktirafan*), atau Ctrl K → "galeri".
- **Mengurus (Pentadbir):** menu Mod Pentadbir → **Urus galeri kegiatan**, atau *Tetapan paparan → Galeri kegiatan*. Cipta album (tajuk, kategori, tarikh, keterangan), **pilih banyak foto sekali gus** atau seret ke kawasan muat naik, tambah kapsyen, jadikan satu foto sebagai muka depan, susun semula atau buang foto, kemudian **Simpan album**. Foto dimuat naik dua sekali gus dengan bar kemajuan; foto yang gagal boleh dimuat naik semula.
- **Foto dikecilkan** secara automatik (sisi terpanjang 1800px, JPEG, kurang kira-kira 1 MB sekeping) sebelum dihantar. Had: 60 album dan 120 foto setiap album.
- **Di Drive anda:** folder **ORBIT Galeri**, dikongsi "sesiapa yang ada pautan" (perlu supaya semua pengguna nampak gambar). Jika dasar akaun anda (cth. akaun sekolah) menyekat perkongsian itu, gambar akan dimuat naik tetapi pengguna lain tidak dapat melihatnya; guna akaun Gmail biasa atau minta pentadbir domain membenarkan perkongsian pautan.
- **Membuang:** membuang foto atau album memindahkan failnya ke **tong sampah Drive** (boleh dipulihkan selama 30 hari dari Drive). Muat naik yang dibatalkan atau tidak disimpan juga dibuang. Pelayan hanya menyentuh fail dalam folder galeri.
- **Keselamatan:** hanya Pentadbir (kata laluan) boleh memuat naik/membuang; pelayan menyemak jenis gambar sebenar (JPEG, PNG, WebP), saiz dan hanya membuang fail dalam folder galeri.
- **Privasi:** semua foto boleh dilihat sesiapa yang tahu alamat laman. Dapatkan kebenaran ibu bapa untuk foto murid dan elakkan menyiarkan nama penuh murid dalam kapsyen.

## F. Masalah lazim

| Gejala | Punca biasa |
|---|---|
| Bahagian bawah laman: *Pelayan tidak dapat dicapai* | URL salah, atau "Who has access" bukan **Anyone**, atau penerbitan belum dibuat. |
| Masuk Pentadbir: *Pelayan belum ditetapkan ADMIN_PASSWORD* | Langkah A4 belum dibuat, atau namanya tersalah eja. |
| Masuk Pentadbir: *Terlalu banyak percubaan* | Tunggu 5 minit. |
| *Gagal menyimpan (too_big)* | Data melebihi 9 MB; kecilkan gambar atau ikon SVG tersuai. |
| Selepas menyunting, guru tidak nampak perubahan | Mereka perlu membuka semula tab atau menunggu seminit. |
| Pengguna aktif memaparkan "—" dan Statistik berkata memerlukan pelayan data (Pentadbir) atau "belum diaktifkan" (warga lain) | `Code.gs` belum dikemas kini (bahagian G), atau penerbitan versi baharu belum dibuat. |
