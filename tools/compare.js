// So sánh hai bản (ChatGPT vs Gemini) của nhiều unit: điểm chất lượng + đối chiếu chéo mạo từ/số nhiều/động từ.
// node tools/compare.js <thư mục A> <thư mục B> [tên A] [tên B]   → in báo cáo, ghi inbox/compare.json
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const V = require('../js/validate.js');
const [dirA, dirB, nameA = 'chatgpt', nameB = 'gemini'] = process.argv.slice(2);

// Bảng động từ tự soạn để đối chiếu "forms"
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/verbs.js'), 'utf8') + ';this.VERBS=VERBS', ctx);
const VERB = new Map(ctx.VERBS.list.map(v => [v.display, v]));
const expectForms = v => `${v.prefix ? v.er + ' ' + v.prefix : v.er}, ${v.prefix ? v.prt + ' ' + v.prefix : v.prt}, ${v.aux === 's' ? 'ist' : 'hat'} ${v.p2}`;

const findFiles = d => fs.readdirSync(d, { recursive: true }).filter(f => /\.(json|txt)$/i.test(f)).map(f => path.join(d, f));
function loadDir(d) {
  const map = new Map();
  for (const f of findFiles(d)) {
    let data; try { data = V.extract(fs.readFileSync(f, 'utf8')); } catch (e) { console.log('✗ không đọc được', f, e.message); continue; }
    for (const u of V.mergeUnits(Array.isArray(data) ? data : [data])) map.set(u.id, map.has(u.id) ? V.mergeUnits([map.get(u.id), u])[0] : u);
  }
  return map;
}
const A = loadDir(dirA), B = loadDir(dirB);
const words = s => (String(s || '').match(/\S+/g) || []).length;

function stats(u) {
  const r = V.checkUnit(u);
  const ls = u.lessons;
  const s = {
    errors: r.errors, warns: r.warns,
    lessons: ls.length,
    vocab: ls.reduce((a, l) => a + (l.vocab || []).length, 0),
    ex: ls.reduce((a, l) => a + (l.exercises || []).length, 0),
    dialog: ls.reduce((a, l) => a + (l.dialogue || []).length, 0),
    theory: ls.reduce((a, l) => a + (l.theory || '').length, 0),
    readingWords: ls.reduce((a, l) => a + words(l.reading && l.reading.text), 0),
    readings: ls.filter(l => l.reading).length,
    writing: ls.filter(l => l.writing).length,
    links: ls.filter(l => /\]\(https?:/.test(l.theory || '')).length,
    examples: ls.reduce((a, l) => a + ((l.theory || '').match(/\{\{/g) || []).length, 0),
    verbIssues: [],
  };
  for (const l of ls) for (const v of l.vocab || []) {
    if (v.pos !== 'verb' || !v.forms) continue;
    const ref = VERB.get(v.de);
    if (ref) {
      const norm = x => x.replace(/\s+/g, ' ').trim().toLowerCase();
      if (norm(v.forms) !== norm(expectForms(ref))) s.verbIssues.push(`${v.de}: "${v.forms}" ≠ chuẩn "${expectForms(ref)}"`);
    }
  }
  // điểm: lỗi trừ nặng, cảnh báo trừ nhẹ, phong phú cộng điểm
  s.score = -60 * r.errors.length - 2 * r.warns.length - 15 * s.verbIssues.length - 5 * s.links
    + s.vocab * 1 + s.ex * 0.6 + s.dialog * 0.5 + s.theory / 400 + s.readingWords / 25 + s.writing * 2 + s.examples * 0.3;
  return s;
}
function nouns(u) {
  const m = new Map();
  for (const l of u.lessons) for (const v of l.vocab || []) if (v.pos === 'noun' && v.de) m.set(v.de, v);
  return m;
}

const ids = [...new Set([...A.keys(), ...B.keys()])].sort();
const report = [];
const allNounsA = new Map(), allNounsB = new Map();
for (const id of ids) {
  const a = A.get(id), b = B.get(id);
  const sa = a && stats(a), sb = b && stats(b);
  const pick = !sa ? nameB : !sb ? nameA : sa.score >= sb.score ? nameA : nameB;
  if (a) for (const [k, v] of nouns(a)) allNounsA.set(k, { ...v, unit: id });
  if (b) for (const [k, v] of nouns(b)) allNounsB.set(k, { ...v, unit: id });
  report.push({ id, pick, [nameA]: sa && { ...sa, errors: sa.errors.length, warns: sa.warns.length, errList: sa.errors, warnList: sa.warns }, [nameB]: sb && { ...sb, errors: sb.errors.length, warns: sb.warns.length, errList: sb.errors, warnList: sb.warns } });
}
// Đối chiếu chéo danh từ giữa hai AI
const conflicts = [];
for (const [k, va] of allNounsA) {
  const vb = allNounsB.get(k);
  if (!vb) continue;
  const pa = (va.plural || '').replace(/^–$|^-$/, '–'), pb = (vb.plural || '').replace(/^–$|^-$/, '–');
  if (va.article !== vb.article) conflicts.push(`MẠO TỪ  ${k}: ${nameA}=${va.article} (${va.unit}) · ${nameB}=${vb.article} (${vb.unit})`);
  else if (pa && pb && pa !== pb && pa !== '–' && pb !== '–') conflicts.push(`SỐ NHIỀU ${va.article} ${k}: ${nameA}=${pa} · ${nameB}=${pb}`);
}

const f = (s, k) => s ? String(s[k]).padStart(5) : '    –';
console.log(`unit     | chọn     | ${nameA.padEnd(36)} | ${nameB}`);
console.log('         |          | lỗi cảnh từ  bt   thoại đọc  điểm  | lỗi cảnh từ  bt   thoại đọc  điểm');
for (const r of report) {
  const a = r[nameA], b = r[nameB];
  const row = s => s ? `${String(s.errors).padStart(3)} ${String(s.warns).padStart(4)} ${String(s.vocab).padStart(3)} ${String(s.ex).padStart(4)} ${String(s.dialog).padStart(4)} ${String(s.readingWords).padStart(5)} ${String(Math.round(s.score)).padStart(5)}` : '   (không có)                     ';
  console.log(`${r.id} | ${r.pick.padEnd(8)} | ${row(a)}  | ${row(b)}`);
}
console.log('\n=== Lỗi / vấn đề động từ ===');
for (const r of report) for (const n of [nameA, nameB]) {
  const s = r[n]; if (!s) continue;
  for (const e of s.errList) console.log(`❌ ${r.id} ${n}: ${e}`);
  for (const e of s.verbIssues) console.log(`⚠️ ${r.id} ${n} động từ: ${e}`);
}
console.log(`\n=== Mâu thuẫn giữa hai AI (${conflicts.length}) ===\n` + conflicts.join('\n'));
fs.writeFileSync(path.join(__dirname, '../inbox/compare.json'), JSON.stringify({ report, conflicts }, null, 1));
