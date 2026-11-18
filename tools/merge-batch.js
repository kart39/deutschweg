// Ghép một lô unit từ hai AI: 3 bài chính lấy từ bản nền, bài "Ôn tập & mở rộng" dựng từ bản còn lại.
// node tools/merge-batch.js <dir chatgpt> <dir gemini> <file quy tắc .js> <dir xuất>
const fs = require('fs');
const path = require('path');
const V = require('../js/validate.js');
const N = require('./normalize.js');
const [dirA, dirB, rulesFile, outDir] = process.argv.slice(2);
const rules = require(path.resolve(rulesFile));   // { pick(id) → 'chatgpt'|'gemini', nounFix: {de: {...}}, edits(id, unit, changes) }

const load = d => {
  const m = new Map();
  for (const f of fs.readdirSync(d, { recursive: true }).filter(f => /\.(json|txt)$/i.test(f))) {
    let data; try { data = V.extract(fs.readFileSync(path.join(d, f), 'utf8')); } catch (e) { continue; }
    for (const u of V.mergeUnits(Array.isArray(data) ? data : [data])) m.set(u.id, m.has(u.id) ? V.mergeUnits([m.get(u.id), u])[0] : u);
  }
  return m;
};
const SRC = { chatgpt: load(dirA), gemini: load(dirB) };
const key = v => (v.article || '') + '|' + v.de;
fs.mkdirSync(outDir, { recursive: true });
const summary = [];

function fixNouns(u, changes, who) {
  for (const l of u.lessons) for (const v of l.vocab || []) {
    const fx = rules.nounFix[v.de];
    if (fx && v.pos === 'noun') {
      const before = `${v.article} ${v.de}, ${v.plural}`;
      Object.assign(v, fx);
      const after = `${v.article} ${v.de}, ${v.plural}`;
      if (before !== after) changes.push(`Sửa (${who}): ${before} → ${after}`);
    }
  }
}

for (const id of [...new Set([...SRC.chatgpt.keys(), ...SRC.gemini.keys()])].sort()) {
  const baseName = rules.pick(id);
  const otherName = baseName === 'chatgpt' ? 'gemini' : 'chatgpt';
  const base = JSON.parse(JSON.stringify(SRC[baseName].get(id) || SRC[otherName].get(id)));
  const other = SRC[otherName].get(id) && JSON.parse(JSON.stringify(SRC[otherName].get(id)));
  const changes = [`Bài 1–${base.lessons.length}: bản ${baseName}`];
  fixNouns(base, changes, baseName);
  if (other) fixNouns(other, changes, otherName);

  if (other) {
    const have = new Set(base.lessons.flatMap(l => (l.vocab || []).map(key)));
    const extraVocab = [];
    for (const l of other.lessons) for (const v of l.vocab || []) if (!have.has(key(v))) { have.add(key(v)); extraVocab.push(v); }
    const dialog = other.lessons.map(l => l.dialogue || []).sort((a, b) => b.length - a.length)[0] || [];
    const reading = other.lessons.map(l => l.reading).filter(Boolean).sort((a, b) => (b.text || '').length - (a.text || '').length)[0];
    const writing = other.lessons.map(l => l.writing).filter(Boolean).pop();
    const theory = `> Bài này tổng hợp **cách giải thích thứ hai** cho toàn unit cùng từ vựng mở rộng và bài luyện tập thêm. Học sau khi xong ba bài chính.\n\n` +
      other.lessons.map(l => `## ${l.title}${l.titleVi ? ' – ' + l.titleVi : ''}\n\n${(l.theory || '').replace(/^#{1,2} /gm, '### ')}`).join('\n\n');
    base.lessons.push({
      id: `${id}-l${base.lessons.length + 1}`,
      title: 'Wiederholung und Vertiefung', titleVi: 'Ôn tập & mở rộng',
      theory, vocab: extraVocab, dialogue: dialog,
      ...(reading ? { reading } : {}), ...(writing ? { writing } : {}),
      exercises: other.lessons.flatMap(l => l.exercises || []),
    });
    changes.push(`Bài ${base.lessons.length} (Ôn tập & mở rộng) từ bản ${otherName}: lý thuyết thứ hai, ${extraVocab.length} từ mới, ${dialog.length} câu thoại, ${reading ? 'bài đọc, ' : ''}${base.lessons.at(-1).exercises.length} bài tập`);
  }
  if (rules.edits) rules.edits(id, base, changes);
  const out = N.item(base);
  out._review = { changes, source: `${baseName} (bài chính) + ${otherName} (ôn tập & mở rộng)` };
  const r = V.checkUnit(out);
  fs.writeFileSync(path.join(outDir, id + '.json'), JSON.stringify(out, null, 1));
  summary.push(`${r.errors.length ? '✗' : '✓'} ${id}: ${changes.join(' · ')}${r.errors.length ? '\n   ❌ ' + r.errors.join('\n   ❌ ') : ''}`);
}
console.log(summary.join('\n'));
