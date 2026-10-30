/* ORBIT — pekerja perkhidmatan: cache cangkerang supaya ORBIT dibuka serta-merta pada talian lemah dan masih terbuka tanpa talian.
   Strategi "rangkaian dahulu dengan had masa": salinan segar dihidangkan jika rangkaian menjawab dalam WAIT ms; jika perlahan atau luar talian, salinan cache
   dihidangkan serta-merta sementara versi baharu dimuat turun di latar. Bila versi baharu ternyata berbeza, halaman diberitahu (mesej 'orbit-update') dan
   memaparkan "Muat semula". Hanya fail asal-sama disentuh; pelayan data (Apps Script) dan fon Google tidak dicache di sini.
   © 2026 Cikgu Rizwan Yusop. Hak cipta terpelihara. */
const V='orbit-v2';   // naikkan nombor ini jika logik cache berubah (cache lama dibuang bila diaktifkan)
const WAIT=1800;
const SHELL=['./','index.html','manifest.webmanifest','orbit.config.json','assets/icon-180.png','assets/icon-192.png','assets/icon-512.png','assets/logo-sekolah.png','assets/logo-ts25.png','assets/qr.js'];
const ver=r=>r.headers.get('etag')||r.headers.get('last-modified')||r.headers.get('content-length')||'';

self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(V).then(c=>Promise.allSettled(SHELL.map(u=>c.add(new Request(u,{cache:'reload'}))))));   // sebahagian gagal tidak membatalkan pemasangan
});
self.addEventListener('activate',e=>{
  e.waitUntil((async()=>{
    for(const k of await caches.keys()) if(k!==V) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',e=>{
  const req=e.request, url=new URL(req.url);
  if(req.method!=='GET'||url.origin!==location.origin) return;   // POST (isyarat statistik), Apps Script dan fon Google: laluan biasa
  e.respondWith(handle(e,url));
});
async function tell(){for(const c of await self.clients.matchAll({type:'window'})) c.postMessage({type:'orbit-update'})}
async function handle(e,url){
  const cache=await caches.open(V), key=url.origin+url.pathname;   // abaikan ?query dan #
  const isDoc=/\/$|index\.html$/.test(url.pathname);
  const cached=(await cache.match(key))||(isDoc?(await cache.match(new URL('./',location.href).href))||(await cache.match(new URL('index.html',location.href).href)):null);
  let served=false;
  const net=fetch(url.href,{cache:'no-cache'}).then(async r=>{
    if(r&&r.ok&&r.type==='basic'&&!r.redirected){   // respons ubah-hala tidak boleh dihidangkan untuk navigasi
      const old=cached?ver(cached):'';
      await cache.put(key,r.clone());
      if(isDoc&&cached&&served&&old&&old!==ver(r)) tell();   // halaman lama sudah dihidangkan; versi baharu menyusul
    }
    return r;
  }).catch(()=>null);
  e.waitUntil(net);
  if(!cached){const r=await net; return r||new Response('Luar talian dan belum ada salinan tersimpan.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})}
  const first=await Promise.race([net,new Promise(res=>setTimeout(()=>res(null),WAIT))]);
  if(first&&first.ok) return first;   // rangkaian cukup pantas: sentiasa versi terkini
  served=true; return cached;          // perlahan atau luar talian: salinan tersimpan serta-merta
}
