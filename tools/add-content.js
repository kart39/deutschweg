// Kiểm tra & đưa nội dung đã duyệt vào web.
//   node tools/add-content.js check <file...>     → chỉ kiểm tra, in lỗi/cảnh báo + thống kê
//   node tools/add-content.js add <file...>       → kiểm tra rồi ghi vào data/<loại>/<id>.js và cập nhật data/index.js
// File đầu vào: JSON (hoặc câu trả lời thô của AI có nhãn "=== id ===" và nhiều khối JSON).
const fs = require('fs');
const path = require('path');
const V = require('../js/validate.js');
const root = path.join(__dirname, '..');
const [mode, ...files] = process.argv.slice(2);
if (!['check', 'add'].includes(mode) || !files.length) { console.log('Dùng: node tools/add-content.js check|add <file...>'); process.exit(1); }

const items = [];
for (const f of files) {
  const raw = fs.readFileSync(f, 'utf8');
  let data;
  try { data = V.extract(raw); } catch (e) { console.log(`✗ ${f}: ${e.message}`); continue; }
  for (const x of Array.isArray(data) ? data : [data]) items.push(x);
}
const units = V.mergeUnits(items.filter(x => !x.type || x.type === 'unit'));
const others = V.mergeItems(items);
let bad = 0;
const stats = u => u.lessons.map(l => `${l.id}: ${(l.vocab || []).length} từ, ${(l.dialogue || []).length} câu thoại, ${(l.exercises || []).length} bài tập${l.reading ? ', đọc ' + (String(l.reading.text).match(/\S+/g) || []).length + ' từ' : ''}${l.writing ? ', viết' : ''}`).join('\n   ');
for (const u of units) {
  const r = V.checkUnit(u);
  console.log(`\n${r.errors.length ? '✗' : '✓'} ${u.id} (${u.level}) – ${r.errors.length} lỗi, ${r.warns.length} cảnh báo\n   ${stats(u)}`);
  r.errors.forEach(e => console.log('   ❌ ' + e));
  r.warns.forEach(w => console.log('   ⚠️ ' + w));
  if (r.errors.length) bad++;
}
// Đối chiếu gói động từ với bảng chia chuẩn trong js/verbs.js (Präsens, Präteritum, Partizip II, haben/sein)
const vmCtx = {}; require('vm').createContext(vmCtx);
require('vm').runInContext(fs.readFileSync(path.join(root, 'js/verbs.js'), 'utf8') + ';this.VERBS=VERBS', vmCtx);
const REF = new Map(vmCtx.VERBS.list.map(v => [v.display, v]));
function verbIssues(pack) {
  const out = [];
  const alts = s => String(s || '').split('|').map(x => x.trim().toLowerCase());
  for (const v of pack.verbs || []) {
    const r = REF.get(v.inf);
    if (!r) continue;
    for (let p = 0; p < 6; p++) {
      const want = vmCtx.VERBS.conj(r, 'praes', p).map(x => x.toLowerCase());
      if (v.praesens && !alts(v.praesens[p]).some(a => want.includes(a))) out.push(`${v.inf} Präsens ngôi ${p + 1}: "${v.praesens[p]}" ≠ chuẩn "${want.join(' / ')}"`);
      const wantP = vmCtx.VERBS.conj(r, 'praet', p).map(x => x.toLowerCase());
      if (v.praeteritum && !alts(v.praeteritum[p]).some(a => wantP.includes(a))) out.push(`${v.inf} Präteritum ngôi ${p + 1}: "${v.praeteritum[p]}" ≠ chuẩn "${wantP.join(' / ')}"`);
    }
    if (v.partizip && !alts(v.partizip).includes(r.p2.toLowerCase())) out.push(`${v.inf} Partizip II: "${v.partizip}" ≠ chuẩn "${r.p2}"`);
    const aux = r.aux === 's' ? 'sein' : 'haben';
    if (v.aux && !v.aux.includes(aux)) out.push(`${v.inf} trợ động từ: "${v.aux}" ≠ chuẩn "${aux}"`);
  }
  return out;
}

for (const o of others) {
  const vi = o.type === 'verbs' ? verbIssues(o) : [];
  for (const e of vi) console.log('   ❌ ĐỘNG TỪ ' + e);
  if (vi.length) bad++;
  const n = o.cards ? o.cards.length + ' thẻ' : o.verbs ? o.verbs.length + ' động từ' : o.sections ? o.sections.length + ' phần thi' : o.exercises ? o.exercises.length + ' bài tập' : o.text ? (o.text.match(/\S+/g) || []).length + ' từ' : '';
  const r = V.checkItem(o);
  console.log(`\n${r.errors.length ? '✗' : '✓'} ${o.type} ${o.id || '(thiếu id)'} (${o.level || ''}) ${n} – ${r.errors.length} lỗi, ${r.warns.length} cảnh báo`);
  r.errors.forEach(e => console.log('   ❌ ' + e));
  r.warns.forEach(w => console.log('   ⚠️ ' + w));
  if (r.errors.length) bad++;
}
if (mode === 'add') {
  if (bad) { console.log(`\nKhông ghi vì còn ${bad} mục lỗi.`); process.exit(2); }
  const idxFile = path.join(root, 'data/index.js');
  const idx = new Set(JSON.parse(fs.readFileSync(idxFile, 'utf8').match(/CONTENT_FILES = (\[[\s\S]*?\]);/)[1]));
  for (const x of [...units.map(u => ({ ...u, type: 'unit' })), ...others]) {
    const { _review, ...clean } = x;
    const dir = { unit: 'units', deck: 'decks', grammar: 'grammar', reading: 'readings', exam: 'exams', verbs: 'verbs' }[clean.type] || 'misc';
    const rel = `${dir}/${clean.id}.js`;
    fs.mkdirSync(path.join(root, 'data', dir), { recursive: true });
    fs.writeFileSync(path.join(root, 'data', rel), `/* ${clean.type} ${clean.id} – đã kiểm duyệt */\n(window.SEED = window.SEED || []).push(${JSON.stringify(clean, null, 1)});\n`);
    idx.add(rel);
    console.log('→ ghi data/' + rel);
  }
  const order = f => { const m = f.match(/(a1|a2|b1|b2|c1)/); return (m ? 'abcde'['a1a2b1b2c1'.indexOf(m[1]) / 2] : 'z') + f; };
  fs.writeFileSync(idxFile, `/* Danh sách file nội dung đã kiểm duyệt (tự cập nhật bởi tools/add-content.js). Mỗi file đẩy dữ liệu vào window.SEED. */\nwindow.CONTENT_FILES = ${JSON.stringify([...idx].sort((a, b) => order(a).localeCompare(order(b))), null, 1)};\n`);
  console.log('✓ Đã cập nhật data/index.js');
}
