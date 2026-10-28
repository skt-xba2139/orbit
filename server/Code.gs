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
 *   GET  ?action=ping                 -> {ok, app, rev}
 *   GET  ?since=<rev>                 -> {ok, same:true, rev}  jika tiada perubahan, atau {ok, rev, updated, data}
 *   POST {action:'auth', password}    -> {ok} | {ok:false, error:'auth'|'locked'|'noconfig'}
 *   POST {action:'save', password, rev, data}
 *                                     -> {ok, rev, updated} | {ok:false, error:'conflict'|'auth'|'locked'|'too_big'|'bad_data'|'busy'}
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
  var cur = read_();
  if (p.action === 'ping') return out_({ ok: true, app: 'ORBIT', rev: cur.rev });
  if (p.since !== undefined && String(p.since) === String(cur.rev)) return out_({ ok: true, same: true, rev: cur.rev });
  return out_({ ok: true, rev: cur.rev, updated: cur.updated, data: cur.data });
}

function doPost(e) {
  var req;
  try { req = JSON.parse(e.postData.contents); } catch (err) { return out_({ ok: false, error: 'bad_request' }); }
  if (!req || typeof req !== 'object') return out_({ ok: false, error: 'bad_request' });

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
