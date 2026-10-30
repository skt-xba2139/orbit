/* ORBIT — pekerja perkhidmatan MINIMUM.
   Tiada cache dan tiada pintasan rangkaian: laman sentiasa dimuat terkini seperti biasa, jadi tiada risiko versi lapuk.
   Ia wujud hanya supaya pelayar (Chrome/Edge/Android) menawarkan pemasangan ORBIT sebagai aplikasi (kriteria kebolehpasangan).
   © 2026 Cikgu Rizwan Yusop. Hak cipta terpelihara. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});   // pas-terus: tiada respondWith, rangkaian dipanggil seperti biasa
