# ORBIT: panduan sambung pelayan data

© 2026 Cikgu Rizwan Yusop. Hak cipta terpelihara.

Tanpa pelayan, setiap pelayar simpan suntingan sendiri (gambar, pautan, pengumuman). Dengan pelayan ini:

- Pentadbir sunting sekali, **semua guru nampak data yang sama**.
- Data disimpan dalam **Google Drive anda** (fail `orbit-data.json`). Percuma, tak perlu sewa pelayan.
- Hanya orang yang tahu **PIN Pentadbir** boleh simpan perubahan. PIN disemak di pelayan Google, bukan dalam pelayar.

## A. Pasang sekali sahaja (kira-kira 10 minit)

1. **Pilih akaun Google.** Guna akaun Gmail biasa. Akaun sekolah (DELIMa) selalunya tak benarkan pilihan "Anyone" di langkah 6. Data akan disimpan dalam Google Drive akaun ini.
2. Buka <https://script.google.com>, tekan **New project**, dan namakan `ORBIT Data`.
3. Dalam fail `Code.gs`, padam semua isi, lepas itu tampal seluruh isi [`server/Code.gs`](Code.gs). Tekan **Ctrl+S**.
4. **Tetapkan PIN Pentadbir.** Tekan ikon gear **Project Settings** di kiri, turun ke **Script properties**, tekan **Add script property**. Isi Property: `ADMIN_PASSWORD`, Value: PIN pilihan anda. Tekan **Save script properties**.
   PIN mesti **4 nombor sahaja**, sebab ORBIT guna papan nombor macam kunci telefon dan hanya terima nombor. Jangan tulis PIN dalam kod atau di GitHub.
5. **Beri kebenaran.** Balik ke editor (ikon `< >`), pilih fungsi `setup` di menu atas dan tekan **Run**. Pilih akaun anda, tekan **Advanced**, **Go to ORBIT Data (unsafe)**, lepas itu **Allow**. Dalam Execution log akan keluar `ORBIT sedia`.
6. **Terbitkan.** Tekan **Deploy**, **New deployment**, ikon gear di sebelah "Select type", pilih **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Tekan **Deploy**, lepas itu salin **Web app URL** (hujungnya `/exec`).
7. **Sambung ke ORBIT.** Buka `orbit.config.json` di GitHub, tekan ikon pensel (Edit) dan tukar kepada:

   ```json
   {
     "api": "TAMPAL_URL_ANDA_DI_SINI"
   }
   ```

   Tekan **Commit changes**. Dalam 1 atau 2 minit, laman akan guna pelayan itu. Atau hantar URL kepada pembangun supaya dia masukkan dan bina semula.

## B. Masukkan data yang sudah ada

Data yang anda sunting setakat ini masih dalam pelayar. Untuk pindah ke pelayan:

1. Di tempat anda membuat suntingan, tekan gear, masukkan PIN, pilih **Urus warga & penyelaras**, lepas itu **Eksport**. Simpan fail JSON itu.
2. Buka laman ORBIT, tekan gear dan masukkan PIN. Dalam menu gear, status akan tulis **Pelayan masih kosong**.
3. Pilih **Urus warga & penyelaras**, tekan **Import** dan pilih fail JSON tadi. Perubahan terus disimpan ke pelayan.
   Kalau tak ada apa-apa untuk diimport, tekan gear lalu **Simpan ke pelayan sekarang** untuk hantar data yang ada.

## C. Guna setiap hari

- **Pentadbir:** tekan gear, masukkan PIN, lepas itu sunting macam biasa (aplikasi, pautan, gambar guru, penyelaras, pengumuman). Setiap perubahan disimpan sendiri. Status dalam menu gear (Pentadbir sahaja) akan tunjuk:
  - *Menyimpan ke pelayan…* lepas itu *Sudah sama dengan pelayan*.
  - *Tak dapat hubungi pelayan* bermaksud perubahan belum sampai. Tekan **Cuba lagi** pada pemberitahuan.
- **Guru:** buka pautan laman sahaja. Data terkini diambil bila laman dibuka, bila tab dibuka semula, bila internet kembali, dan setiap minit selagi laman terbuka. Apa sahaja yang Pentadbir ubah (kandungan, jenama, warna aksen, warna unit, gaya bunyi) sampai ke semua peranti dalam masa seminit.
- Kalau dua Pentadbir sunting serentak, yang kedua akan diberitahu ada orang lain sudah kemas kini. Paparannya dimuat semula dan suntingan terakhir perlu diulang. Ini supaya perubahan tak saling menimpa.

## D. Keselamatan dan sandaran

- Salah PIN 5 kali, pelayan kunci percubaan selama 5 minit. PIN 4 nombor hanya ada 10,000 kemungkinan, jadi kunci inilah yang melindunginya. Jangan kongsi PIN dan tukar bila perlu. Kalau pelayan data tak disambung, mod Pentadbir tak boleh dibuka.
- Setiap kali simpan, versi sebelumnya disimpan sebagai `orbit-data.prev.json` dalam Drive anda (sandaran satu langkah). Fail `orbit-data.json` boleh dibuka dan disalin bila-bila masa.
- Sesiapa yang tahu alamat laman boleh **baca** data (nama dan gambar warga, pautan aplikasi). Ini sama dengan apa yang laman sudah tunjuk kepada umum. Jangan letak maklumat yang tak mahu dikongsi, contohnya nombor telefon peribadi.
- **Tukar PIN:** ubah nilai `ADMIN_PASSWORD` dalam Script properties (4 nombor). Terus berkesan, tak perlu Deploy semula. Sesi Pentadbir yang sedang terbuka akan diminta masuk semula.
- **Warna aksen** (12 pilihan: Aurora, Samudera, Suria, Zamrud, Mawar, Safir, Ametis, Emas, Platinum, Emas Mawar, Rubi, Senja): gear, Tetapan paparan, Warna aksen. Hanya Pentadbir boleh tukar dan ia terpakai di semua peranti (melalui pelayan, tak perlu Deploy semula). Pilihan peribadi pada setiap peranti hanya Kurangkan animasi, Kontras tinggi dan Bunyi hidup atau mati.
- **Gaya bunyi** intro dan klik: gear, Tetapan paparan, Gaya bunyi. Ketik satu gaya untuk dengar intronya. Pilihan itu terpakai untuk semua guru (melalui pelayan macam jenama, tak perlu Deploy semula). Lalai: 3 Angkasa. Setiap guru boleh tutup bunyi di peranti sendiri dengan ikon pembesar suara di atas.
  - Di komputer, kalau bunyi belum dibenarkan pelayar, keluar skrin "Sentuh untuk masuk" sebelum intro.
  - Di telefon dan tablet, intro terus jalan. Kalau pelayar sekat bunyi, ada ikon pembesar suara kecil yang berdenyut (tanpa tulisan). Ketukan pertama menyambung bunyi intro pada saat itu dan ketukan kedua melangkau intro. Kalau pelayar benarkan bunyi (contohnya Android yang sudah pasang ORBIT), intro berbunyi sendiri.
  - Suis senyap di tepi iPhone (oren) tetap mematikan bunyi laman web. Itu tetapan telefon.
- **Warna unit** (Pengurusan, Kurikulum dan seterusnya): gear, Tetapan paparan, Warna unit, Ubah. Pilih warna yang sudah ada atau seret peluncur. Warna dipakai pada kad, tab, ikon dan skrin loading unit itu untuk semua orang.

## E. Kemas kini `Code.gs` kemudian

Lepas menyunting kod pelayan: **Deploy**, **Manage deployments**, ikon pensel, **Version: New version**, lepas itu **Deploy**. Alamat `/exec` tak berubah.

`Code.gs` yang terkini (pilihan, tapi disyorkan kalau guru ramai): semakan perubahan setiap minit dijawab dari cache tanpa baca fail Drive, jadi lebih ringan untuk kuota Apps Script. Pelayan lama masih boleh guna tanpa kemas kini ini.

## G. Statistik penggunaan sebenar (pengguna aktif, klik, halaman Statistik)

Dengan versi `Code.gs` ini, ORBIT mengira penggunaan yang betul, bukan lagi angka contoh.

**Untuk hidupkan:** kemas kini `Code.gs` macam bahagian E (tampal `Code.gs` baharu, lepas itu **Deploy, Manage deployments, pensil, New version, Deploy**). Alamat dan PIN tak berubah dan tak ada langkah lain. Selagi pelayan belum dikemas kini, ORBIT tunjuk "—" untuk pengguna aktif dan tak hantar apa-apa isyarat.

**Apa yang dikira**
- **Pengguna aktif:** bilangan peranti (pelayar atau telefon) yang buka ORBIT dalam 3 minit terakhir. Setiap peranti hantar isyarat kecil kira-kira setiap 2 minit, hanya bila tabnya kelihatan.
- **Klik:** setiap kali ada orang buka aplikasi melalui ORBIT. Dikira ikut aplikasi, hari dan jam (waktu Malaysia).
- **Halaman Statistik** terbuka kepada SEMUA warga (ada dalam bar navigasi). Ia dikemas kini sendiri setiap 15 saat selagi dibuka, dengan bilangan peranti aktif di atas. Aplikasi yang terhad kepada Pentadbir tak disenaraikan kepada pembaca biasa. Isinya: jumlah klik, peranti unik, aplikasi digunakan, masa purata sehari, klik harian, kategori, waktu paling sibuk, aplikasi paling digunakan dan klik terkini. Perbandingan dengan tempoh sebelum hanya muncul bila data sudah cukup.
  Klik terkini tulis **"N user membuka (aplikasi)"**. N ialah bilangan peranti berbeza yang buka aplikasi itu dalam klik terkini. Peranti yang sama klik berulang dikira sekali, tiada nama, dan seorang guru yang guna dua peranti dikira dua. Ini perlukan `Code.gs` yang terkini. Selagi belum dikemas kini (bahagian E), klik terkini tulis "Seseorang".

**Yang perlu tahu**
- Pengiraan **mula pada hari pelayan dikemas kini**. Tiada sejarah lama.
- "Pengguna" bermaksud **peranti**. Seorang guru yang guna telefon dan komputer dikira dua. Kalau buka aplikasi terus tanpa melalui ORBIT, ia tak dikira.
- **Privasi:** peranti dikenali dengan ID rawak yang dijana dalam pelayar. Tiada nama, e-mel atau lokasi dikumpul. Jumlah keseluruhan (tanpa ID) boleh dibaca sesiapa yang tahu alamat pelayan, sama macam data lain.
- Data harian disimpan dalam fail `orbit-stats.json` di Google Drive anda (70 hari terakhir). Untuk mula semula, padam fail itu. Kehadiran semasa disimpan sementara dalam cache Google. Kalau cache itu dikosongkan, paling banyak isyarat seminit terakhir yang hilang, bukan klik yang sudah dikira.
- Pelayan tolak ID dan nama aplikasi yang tak sah, dan hadkan 10 klik setiap isyarat dan 300 klik setiap peranti sehari. Ini menyukarkan angka dipalsukan, tapi bukan perlindungan penuh.
- Bebannya rendah (kira-kira 30 permintaan sejam bagi setiap peranti yang sedang buka portal). Google tak umumkan had harian yang tepat untuk web app. Kalau kuota pernah penuh, statistik berhenti sehari dan pulih sendiri.

## H. Jenama ORBIT atau MyD@PS

Di **Mod Pentadbir, Tetapan paparan, Jenama sistem**, Pentadbir boleh tukar antara **ORBIT** dan **MyD@PS** bila-bila masa. Pilihan disimpan sebagai sebahagian data kongsi di pelayan (kunci `brand`), jadi **semua orang** nampak jenama yang sama selepas muat semula: tulisan di navbar, tajuk hero, bahagian bawah laman, tajuk tab pelayar dan **skrin loading**. Logo (cincin-O dengan orbit) sama untuk kedua-dua jenama. Hanya hurufnya berubah (RBIT jadi MYD@PS, dilukis dengan satu garisan dan kilau yang sama). Tak perlu kemas kini `Code.gs` kerana pelayan simpan data kongsi seperti yang diterima.

- Peranti yang pernah buka portal simpan jenama terakhir dan mulakan intro dengan jenama itu. Kalau Pentadbir baru tukar, intro mula dengan jenama lama dan bertukar perlahan-lahan bila data pelayan sampai (biasanya kurang 2 saat).
- Yang TAK berubah serta-merta: nama dan ikon aplikasi yang sudah dipasang di skrin utama telefon (diambil dari `manifest.webmanifest` masa memasang, jadi pasang semula untuk menukarnya), dan teks yang ditulis sendiri dalam pengumuman.
- Tanpa pelayan data, pilihan hanya disimpan di peranti itu.

## I. Sijil & pengiktirafan (MyIPO dan lain-lain)

Pentadbir boleh muat naik sijil dan pengiktirafan, dan **semua orang** boleh lihatnya dalam paparan galeri (bingkai berkilau, condong 3D ikut kursor, leret atau anak panah untuk tukar sijil, dan paparan penuh dengan zum).

- **Di mana:** bawah laman, lajur **Mengenai Kami**, **Sijil & Pengiktirafan** (dengan bilangan sijil), atau tekan Ctrl K dan taip "sijil". Pengguna biasa tak nampak lajur ini selagi belum ada sijil.
- **Cara sunting (Pentadbir):** menu Mod Pentadbir, **Urus sijil & pengiktirafan**, atau *Tetapan paparan, Sijil & pengiktirafan, Urus sijil*. Untuk tambah sijil, muat naik gambar (JPG, PNG atau WebP), isi tajuk, jenis (MyIPO, Hak Cipta, Cap Dagangan, Anugerah, Pengiktirafan), pengeluar, no. rujukan, tarikh, keterangan dan pautan dokumen asal (pilihan). Boleh susun semula, sunting dan padam (ada *Buat asal*).
- **PDF:** boleh muat naik terus. **Halaman pertama** ditukar kepada gambar. PDF yang ada banyak halaman hanya guna halaman pertama, dan PDF berkata laluan tak boleh. Penukaran guna pdf.js yang dimuat **sekali sahaja** dari cdnjs bila Pentadbir pilih PDF (versi tetap 3.11.174, disahkan dengan hash SRI). Jadi perlu internet pada masa itu sahaja. Pengguna biasa tak perlukannya. Fail PDF asal tak disimpan. Kalau mahu orang boleh muat turunnya, letak pautan PDF (contohnya Google Drive, "sesiapa yang ada pautan") dalam ruang *Pautan dokumen asal*, dan butang **Dokumen asal** akan keluar pada paparan.
- **Had:** 12 sijil. Setiap gambar dikecilkan sendiri (sisi terpanjang 1600px, kira-kira 220 KB sekeping) supaya data kongsi kekal ringan. Jumlah semua gambar kira-kira 2.4 MB.
- **Simpanan:** sebahagian data kongsi di pelayan (kunci `certs`), jadi **tak perlu kemas kini `Code.gs`**. Semua orang nampak sijil baharu selepas muat semula portal. Setiap perubahan hantar semula semua data kongsi, jadi tunggu status "Sudah sama dengan pelayan" selepas muat naik.
- **Privasi:** sesiapa yang tahu alamat laman boleh lihat sijil. Jangan muat naik dokumen yang ada no. kad pengenalan, alamat rumah atau maklumat peribadi lain. Tutup bahagian itu pada gambar dulu.

## J. Galeri kegiatan (album gambar)

Galeri tunjuk album **perkongsian, pertandingan inovasi, bengkel** dan lain-lain kepada semua orang. Ada senarai album (kad bertindan, tapis kategori, album terkini besar), album dengan baris foto yang tak dipotong, dan penonton foto (leret, zum, tayangan slaid, gambar kecil, skrin penuh).

**Untuk hidupkan (sekali sahaja):** muat naik gambar perlukan `Code.gs` yang terkini, sebab gambar disimpan dalam Google Drive anda dan bukan dalam data kongsi (data kongsi hanya simpan senarai album, jadi kekal kecil walaupun beribu foto). Tampal `Code.gs` baharu macam bahagian E, lepas itu **Deploy, Manage deployments, pensil, New version, Deploy**. Tak perlu kebenaran baharu sebab skrip sudah guna Drive. Kalau Google tetap minta, benarkan sahaja. Selagi belum dikemas kini, Pentadbir nampak nota kuning dan butang muat naik tak hantar apa-apa. Album yang sedia ada masih boleh dilihat.

- **Di mana:** bawah laman, lajur **Mengenai Kami**, **Galeri Kegiatan** (bersama *Sijil & Pengiktirafan*), atau tekan Ctrl K dan taip "galeri".
- **Cara urus (Pentadbir):** menu Mod Pentadbir, **Urus galeri kegiatan**, atau *Tetapan paparan, Galeri kegiatan*. Buat album (tajuk, kategori, tarikh, keterangan), **pilih banyak foto sekali gus** atau seret ke kawasan muat naik, tambah kapsyen, pilih satu foto jadi muka depan, susun semula atau buang foto, lepas itu tekan **Simpan album**. Foto dimuat naik dua sekali gus dengan bar kemajuan. Foto yang gagal boleh dimuat naik semula.
- **Foto dikecilkan sendiri** (sisi terpanjang 1800px, JPEG, kurang kira-kira 1 MB sekeping) sebelum dihantar. Had: 60 album dan 120 foto setiap album.
- **Dalam Drive anda:** folder **ORBIT Galeri**, dikongsi "sesiapa yang ada pautan" (perlu supaya semua orang nampak gambar). Kalau akaun anda (contohnya akaun sekolah) sekat perkongsian itu, gambar tetap dimuat naik tapi orang lain tak nampak. Guna akaun Gmail biasa atau minta pentadbir domain benarkan perkongsian pautan.
- **Buang:** bila foto atau album dibuang, failnya masuk **tong sampah Drive** (boleh dipulihkan dalam 30 hari). Muat naik yang dibatalkan atau tak disimpan pun dibuang. Pelayan hanya sentuh fail dalam folder galeri.
- **Keselamatan:** hanya Pentadbir (dengan PIN) boleh muat naik atau buang. Pelayan semak jenis gambar yang sebenar (JPEG, PNG, WebP) dan saiznya, dan hanya buang fail dalam folder galeri.
- **Privasi:** semua foto boleh dilihat sesiapa yang tahu alamat laman. Minta kebenaran ibu bapa untuk foto murid, dan jangan tulis nama penuh murid dalam kapsyen.

## F. Masalah biasa

| Gejala | Biasanya sebab |
|---|---|
| Status: *Tak dapat hubungi pelayan* | URL salah, atau "Who has access" bukan **Anyone**, atau belum Deploy. |
| Masuk Pentadbir: *ADMIN_PASSWORD belum diisi di pelayan* | Langkah A4 belum dibuat, atau tersalah eja. |
| Masuk Pentadbir: *Terlalu banyak kali salah* | Tunggu 5 minit. |
| *Tak berjaya simpan ke pelayan (too_big)* | Data lebih 9 MB. Kecilkan gambar atau ikon SVG sendiri. |
| Lepas sunting, guru tak nampak perubahan | Mereka perlu buka semula tab atau tunggu seminit. |
| Pengguna aktif tunjuk "—", dan Statistik tulis *Statistik perlu pelayan data* (Pentadbir) atau *Statistik belum dihidupkan* (warga lain) | `Code.gs` belum dikemas kini (bahagian G), atau versi baharu belum di-Deploy. |
