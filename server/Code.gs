/**
 * ORBIT — Pelayan data (Google Apps Script)
 * © 2026 Cikgu Rizwan Yusop. Hak cipta terpelihara.
 *
 * Menyimpan SEMUA data kongsi ORBIT (warga + gambar, penyelaras, aplikasi + pautan, tab, pengumuman)
 * sebagai satu fail JSON dalam Google Drive pemilik skrip. Semua guru membaca data yang sama;
 * hanya Pentadbir (yang tahu kata laluan) boleh menyimpan perubahan.
 *
 * Persediaan: lihat server/PANDUAN.md.  Kata laluan TIDAK ditulis dalam fail ini. Tetapkan di:
 *   Project Settings > Script properties > ADMIN_PASSWORD
 *
 * Protokol (semua balasan JSON):
 *   GET  ?action=ping                 -> {ok, app, rev, st:1}
 *   GET  ?since=<rev>                 -> {ok, same:true, rev, st:1}  jika tiada perubahan, atau {ok, rev, updated, data, st:1}
 *   POST {action:'auth', password}    -> {ok} | {ok:false, error:'auth'|'locked'|'noconfig'}
 *   POST {action:'save', password, rev, data}
 *                                     -> {ok, rev, updated} | {ok:false, error:'conflict'|'auth'|'locked'|'too_big'|'bad_data'|'busy'}
 *
 * Statistik penggunaan SEBENAR (tanpa kata laluan, tanpa nama; peranti dikenali dengan ID rawak):
 *   POST {action:'hb', id, clicks:[idAplikasi,...]}
 *                                     -> {ok, now, active, series:[[ts,n],...], top:{idAplikasi:klik7hari}} | {ok:false, error:'bad_id'|'busy'}
 *   GET  ?action=stats                -> {ok, now, since, active, series, feed:[{a,ts}], days:[{d,c,u,t,a,h}], uq:{7:[kini,sebelum],14:[..],30:[..]}}
 * Data harian disimpan dalam fail Drive orbit-stats.json (70 hari); kehadiran dan kiraan semasa dalam CacheService.
 */

var FILE_NAME = 'orbit-data.json';        // data semasa
var PREV_NAME = 'orbit-data.prev.json';   // salinan sebelum simpanan terakhir (sandaran satu langkah)
var MAX_CHARS = 9 * 1024 * 1024;          // had saiz JSON
var MAX_FAILS = 5;                        // salah kata laluan sebelum dikunci
var LOCK_SECONDS = 300;                   // tempoh kunci (saat)

/** Jalankan SEKALI daripada editor (butang Run) untuk memberi kebenaran Drive dan memeriksa tetapan. */
function setup() {
  var pw = PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
  if (!pw) throw new Error('Tetapkan ADMIN_PASSWORD dahulu: Project Settings > Script properties > Add script property.');
  var cur = read_();
  if (!cur.data && cur.rev === 0) write_(FILE_NAME, { rev: 0, updated: 0, data: null });
  Logger.log('ORBIT sedia. Fail data: ' + file_(FILE_NAME, false).getUrl());
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.action === 'stats') return out_(statsOut_());
  var cur = read_();
  // st:1 memberitahu klien bahawa pelayan ini menyokong statistik (klien lama pelayan tidak menghantar isyarat ke pelayan lama)
  if (p.action === 'ping') return out_({ ok: true, app: 'ORBIT', rev: cur.rev, st: 1 });
  if (p.since !== undefined && String(p.since) === String(cur.rev)) return out_({ ok: true, same: true, rev: cur.rev, st: 1 });
  return out_({ ok: true, rev: cur.rev, updated: cur.updated, data: cur.data, st: 1 });
}

function doPost(e) {
  var req;
  try { req = JSON.parse(e.postData.contents); } catch (err) { return out_({ ok: false, error: 'bad_request' }); }
  if (!req || typeof req !== 'object') return out_({ ok: false, error: 'bad_request' });

  // isyarat statistik: awam dan TIDAK menyentuh kata laluan (jangan kira sebagai percubaan salah)
  if (req.action === 'hb') return out_(heartbeat_(req));

  var auth = checkPassword_(String(req.password || ''));
  if (auth !== true) return out_({ ok: false, error: auth });
  if (req.action === 'auth') return out_({ ok: true });
  if (req.action !== 'save') return out_({ ok: false, error: 'bad_action' });

  var bad = validate_(req.data);
  if (bad) return out_({ ok: false, error: bad });

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return out_({ ok: false, error: 'busy' });
  try {
    var cur = read_();
    // Elak menimpa perubahan Pentadbir lain: klien mesti menghantar `rev` yang terakhir dilihatnya.
    if (req.rev !== undefined && Number(req.rev) !== cur.rev) return out_({ ok: false, error: 'conflict', rev: cur.rev });
    if (cur.data) write_(PREV_NAME, cur);
    var next = { rev: cur.rev + 1, updated: Date.now(), data: req.data };
    write_(FILE_NAME, next);
    return out_({ ok: true, rev: next.rev, updated: next.updated });
  } finally {
    lock.releaseLock();
  }
}

/* ---------- bantuan ---------- */

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function file_(name, create) {
  var it = DriveApp.getFilesByName(name);
  if (it.hasNext()) return it.next();
  return create ? DriveApp.createFile(name, '{}', 'text/plain') : null;
}

function read_() {
  var f = file_(FILE_NAME, false);
  if (!f) return { rev: 0, updated: 0, data: null };
  try {
    var j = JSON.parse(f.getBlob().getDataAsString('UTF-8'));
    return { rev: Number(j.rev) || 0, updated: Number(j.updated) || 0, data: j.data || null };
  } catch (err) {
    return { rev: 0, updated: 0, data: null };
  }
}

function write_(name, obj) {
  file_(name, true).setContent(JSON.stringify(obj));
}

/** Semakan bentuk asas sahaja; klien ORBIT membersihkan setiap medan semula ketika memuatkan. */
function validate_(d) {
  if (!d || typeof d !== 'object' || Array.isArray(d)) return 'bad_data';
  if (!Array.isArray(d.staff) || d.staff.length > 200) return 'bad_data';
  if (!Array.isArray(d.apps) || d.apps.length > 300) return 'bad_data';
  if (!Array.isArray(d.notices) || d.notices.length > 100) return 'bad_data';
  if (!d.coords || typeof d.coords !== 'object' || Array.isArray(d.coords)) return 'bad_data';
  if (!d.cats || typeof d.cats !== 'object' || Array.isArray(d.cats)) return 'bad_data';
  if (JSON.stringify(d).length > MAX_CHARS) return 'too_big';
  return null;
}

function safeEq_(a, b) {
  if (a.length !== b.length) return false;
  var r = 0;
  for (var i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

/** Mengembalikan true, atau 'auth' | 'locked' | 'noconfig'. Selepas MAX_FAILS kali salah, dikunci LOCK_SECONDS. */
function checkPassword_(pw) {
  var secret = PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
  if (!secret) return 'noconfig';
  var cache = CacheService.getScriptCache();
  if (cache.get('locked')) return 'locked';
  if (safeEq_(pw, secret)) { cache.remove('fails'); return true; }
  var n = Number(cache.get('fails') || 0) + 1;
  if (n >= MAX_FAILS) { cache.put('locked', '1', LOCK_SECONDS); cache.remove('fails'); }
  else cache.put('fails', String(n), 600);
  return 'auth';
}

/* ====================================================================================
 *  STATISTIK PENGGUNAAN SEBENAR
 *  - Setiap pelayar menghantar isyarat ('hb') kira-kira setiap 2 minit semasa tab dibuka, dan klik aplikasi secara kelompok.
 *  - Kehadiran, kiraan hari ini, sampel graf dan klik terkini disimpan dalam CacheService (pantas, hilang jika Google mengosongkannya).
 *  - Kiraan hari ini ditulis ke Drive (orbit-stats.json) SERTA-MERTA bila ada klik baharu, dan paling kerap sekali seminit untuk isyarat biasa
 *    (masa sesi). Sejarah 70 hari.
 *  - Peranti dikenali dengan ID rawak tanpa nama; tiada nama, e-mel atau lokasi disimpan. Kiraan "pengguna" ialah peranti/pelayar.
 *  - Had: ID 8-20 aksara huruf kecil/angka; maksimum 10 klik setiap isyarat, 300 klik dan 400 peranti sehari, 300 aplikasi berbeza.
 * ==================================================================================== */

var STATS_NAME = 'orbit-stats.json';
var TZ = 'Asia/Kuala_Lumpur';
var KEEP_DAYS = 70;
var PRESENCE_MS = 180000;     // peranti dikira aktif jika ada isyarat dalam 3 minit terakhir
var SERIES_MS = 300000;       // satu sampel graf setiap 5 minit
var SERIES_LEN = 36;          // 3 jam
var FLUSH_MS = 60000;         // tulis ke Drive paling kerap sekali seminit
var MAX_CLICKS = 10;
var MAX_DEV_CLICKS = 300;
var MAX_DEVICES = 400;
var MAX_APPS = 300;
var CACHE_TTL = 21600;        // had CacheService: 6 jam

function json_(s) {
  if (!s) return null;
  try { return JSON.parse(s); } catch (err) { return null; }
}
function dayKey_(ts) { return Utilities.formatDate(new Date(ts), TZ, 'yyyy-MM-dd'); }
function hourOf_(ts) { return Number(Utilities.formatDate(new Date(ts), TZ, 'H')); }

function readStats_() {
  var f = file_(STATS_NAME, false);
  var j = f ? json_(f.getBlob().getDataAsString('UTF-8')) : null;
  if (!j || typeof j !== 'object') return { since: 0, days: {} };
  return { since: Number(j.since) || 0, days: (j.days && typeof j.days === 'object') ? j.days : {} };
}
function writeStats_(st) {
  var keys = Object.keys(st.days).sort();
  while (keys.length > KEEP_DAYS) delete st.days[keys.shift()];
  write_(STATS_NAME, st);
}

function normDay_(t, k) {
  if (!t || typeof t !== 'object') t = {};
  t.k = k;
  t.c = Number(t.c) || 0;
  if (!t.a || typeof t.a !== 'object') t.a = {};
  if (!t.s || typeof t.s !== 'object') t.s = {};
  if (!Array.isArray(t.h) || t.h.length !== 24) { t.h = []; for (var i = 0; i < 24; i++) t.h.push(0); }
  t.f = Number(t.f) || 0;
  return t;
}
/** Salinan kerja hari ini: dari cache, jika tiada dari fail Drive, jika tiada mulakan baharu. */
function loadDay_(cache, k) {
  var t = json_(cache.get('day:' + k));
  if (t) return normDay_(t, k);
  var d = readStats_().days[k];
  if (d) { d = normDay_(d, k); d.f = Date.now(); return d; }
  return normDay_(null, k);
}
function flushDay_(t, now, force) {
  if (!force && now - t.f < FLUSH_MS) return;
  var st = readStats_();
  if (!st.since) st.since = now;
  st.days[t.k] = { c: t.c, a: t.a, h: t.h, s: t.s };
  writeStats_(st);
  t.f = now;
}

/** Klik 7 hari terakhir setiap aplikasi: 6 hari sebelum hari ini daripada fail (cache 10 minit) + hari ini daripada salinan kerja. */
function top7_(cache, t, k, now) {
  var base = json_(cache.get('wk'));
  if (!base || base.k !== k) {
    var days = readStats_().days, tot = {}, from = dayKey_(now - 6 * 864e5);
    Object.keys(days).forEach(function (d) {
      if (d >= from && d < k) { var a = days[d].a || {}; for (var id in a) tot[id] = (tot[id] || 0) + a[id]; }
    });
    base = { k: k, tot: tot };
    cache.put('wk', JSON.stringify(base), 600);
  }
  var out = {}, id2;
  for (id2 in base.tot) out[id2] = base.tot[id2];
  for (id2 in t.a) out[id2] = (out[id2] || 0) + t.a[id2];
  return out;
}

function heartbeat_(req) {
  var id = String(req.id || '');
  if (!/^[a-z0-9]{8,20}$/.test(id)) return { ok: false, error: 'bad_id' };
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(8000)) return { ok: false, error: 'busy' };
  try {
    var now = Date.now(), cache = CacheService.getScriptCache(), k = dayKey_(now);

    // hari sebelumnya yang belum ditulis ke Drive
    var lastK = cache.get('lastday');
    if (lastK && lastK !== k) {
      var old = json_(cache.get('day:' + lastK));
      if (old) flushDay_(normDay_(old, lastK), now, true);
    }
    cache.put('lastday', k, CACHE_TTL);

    var t = loadDay_(cache, k);

    // kehadiran
    var pres = json_(cache.get('pres')) || {};
    pres[id] = now;
    var live = 0, cut = now - PRESENCE_MS;
    for (var p in pres) { if (pres[p] < cut) delete pres[p]; else live++; }
    cache.put('pres', JSON.stringify(pres), 900);

    // sesi harian peranti: [mula, akhir, bilangan klik]
    var s = t.s[id];
    if (s) s[1] = now;
    else if (Object.keys(t.s).length < MAX_DEVICES) { s = t.s[id] = [now, now, 0]; }

    // klik
    var feed = json_(cache.get('feed')) || [];
    var list = Array.isArray(req.clicks) ? req.clicks.slice(0, MAX_CLICKS) : [];
    var hr = hourOf_(now), added = 0;
    for (var i = 0; i < list.length && s; i++) {
      var a = String(list[i] || '');
      if (!/^[\w-]{1,28}$/.test(a)) continue;
      if ((s[2] || 0) >= MAX_DEV_CLICKS) break;
      if (!(a in t.a) && Object.keys(t.a).length >= MAX_APPS) continue;
      t.a[a] = (t.a[a] || 0) + 1;
      t.c++; t.h[hr]++; s[2] = (s[2] || 0) + 1; added++;
      feed.unshift({ a: a, ts: now });
    }
    if (feed.length > 20) feed.length = 20;
    cache.put('feed', JSON.stringify(feed), CACHE_TTL);

    // sampel graf
    var ser = json_(cache.get('ser')) || [];
    if (!ser.length || now - ser[ser.length - 1][0] >= SERIES_MS) {
      ser.push([now, live]);
      if (ser.length > SERIES_LEN) ser.shift();
      cache.put('ser', JSON.stringify(ser), CACHE_TTL);
    }

    // klik ditulis ke Drive SERTA-MERTA (jarang berlaku, dan elak hilang jika cache dikosongkan); isyarat tanpa klik hanya paling kerap sekali seminit
    flushDay_(t, now, added > 0);
    cache.put('day:' + k, JSON.stringify(t), CACHE_TTL);
    return { ok: true, now: now, active: live, series: ser, top: top7_(cache, t, k, now) };
  } finally {
    lock.releaseLock();
  }
}

function uniq_(days, from, to) {
  var set = {};
  Object.keys(days).forEach(function (d) {
    if (d >= from && d <= to) Object.keys(days[d].s || {}).forEach(function (i) { set[i] = 1; });
  });
  return Object.keys(set).length;
}

function statsOut_() {
  var cache = CacheService.getScriptCache(), now = Date.now(), k = dayKey_(now);
  var st = readStats_(), days = st.days;
  var cur = json_(cache.get('day:' + k));
  if (cur) { cur = normDay_(cur, k); days[k] = { c: cur.c, a: cur.a, h: cur.h, s: cur.s }; if (!st.since) st.since = now; }

  var pres = json_(cache.get('pres')) || {}, live = 0;
  for (var p in pres) if (pres[p] >= now - PRESENCE_MS) live++;

  var list = Object.keys(days).sort().map(function (d) {
    var x = days[d], s = x.s || {}, ids = Object.keys(s), dur = 0, n = 0;
    ids.forEach(function (i) {
      var v = s[i], sec = Math.min(4 * 3600, Math.max(0, ((v[1] || 0) - (v[0] || 0)) / 1000));
      if (sec > 0) { dur += sec; n++; }
    });
    return { d: d, c: Number(x.c) || 0, u: ids.length, t: n ? Math.round(dur / n) : 0, a: x.a || {}, h: Array.isArray(x.h) ? x.h : [] };
  });

  var uq = {};
  [7, 14, 30].forEach(function (N) {
    uq[N] = [
      uniq_(days, dayKey_(now - (N - 1) * 864e5), k),
      uniq_(days, dayKey_(now - (2 * N - 1) * 864e5), dayKey_(now - N * 864e5))
    ];
  });

  return { ok: true, now: now, since: st.since, active: live, series: json_(cache.get('ser')) || [], feed: json_(cache.get('feed')) || [], days: list, uq: uq };
}
