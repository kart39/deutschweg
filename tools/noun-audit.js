// Kiểm tra danh từ khi không có bản thứ hai để đối chiếu:
//  1) so với mọi danh từ đã có (data đã duyệt + các thư mục tham chiếu)  2) quy tắc hậu tố chắc chắn
// node tools/noun-audit.js <thư mục cần kiểm> [thư mục tham chiếu...]
const fs = require('fs');
const path = require('path');
const V = require('../js/validate.js');
const [target, ...refs] = process.argv.slice(2);
const root = path.join(__dirname, '..');

const units = d => fs.readdirSync(d, { recursive: true }).filter(f => /\.(json|txt)$/.test(f)).flatMap(f => {
  try { const x = V.extract(fs.readFileSync(path.join(d, f), 'utf8')); return V.mergeUnits(Array.isArray(x) ? x : [x]); } catch (e) { return []; }
});
const published = () => {
  const out = []; global.window = { SEED: [] };
  for (const f of fs.readdirSync(path.join(root, 'data'), { recursive: true }).filter(f => f.endsWith('.js') && f !== 'index.js')) {
    window.SEED = []; require(path.join(root, 'data', f)); out.push(...window.SEED);
  }
  return out;
};
const ref = new Map();
for (const u of [...published(), ...refs.flatMap(units)]) for (const l of u.lessons || []) for (const v of l.vocab || []) if (v.pos === 'noun' && v.article) ref.set(v.de, v);

// Hậu tố gần như không có ngoại lệ
const RULES = [
  [/(ung|heit|keit|schaft|ion|tät|ik|enz|anz|ei|ie|ur)$/, 'die', ['Abitur', 'Papagei', 'Brei', 'Ei', 'Genie', 'Knie', 'Abenteuer', 'Kurier', 'Blei', 'Geschrei', 'Polizei', 'Partei', 'Sprung', 'Schwung', 'Ursprung', 'Aufschwung', 'Ring', 'Ding', 'Vorsprung', 'Hering', 'Pfennig', 'Lehrling', 'Ruhm', 'Purpur', 'Flur', 'Schwur', 'Mut', 'Spion', 'Skorpion', 'Champion', 'Lion', 'Stadion', 'Ion', 'Million', 'Gymnasium', 'Plebiszit', 'Atelier', 'Studium', 'Zentrum', 'Museum', 'Ministerium', 'Datum', 'Labor', 'Motor', 'Doktor', 'Professor', 'Autor', 'Moderator', 'Kurier']],
  [/(chen|lein)$/, 'das', []],
  [/(ling|ismus|ant|ist)$/, 'der', ['Gift', 'List', 'Frist', 'Restaurant', 'Ambiente']],
  [/(um|ment)$/, 'das', ['Konsum', 'Irrtum', 'Reichtum', 'Baum', 'Raum', 'Traum', 'Schaum', 'Zement', 'Moment', 'Konsument', 'Dokument', 'Student', 'Patient', 'Kunde', 'Turm', 'Sturm', 'Wurm', 'Rum', 'Saum', 'Zaum', 'Flaum']],
];
let issues = 0;
for (const u of units(target)) for (const l of u.lessons) for (const v of l.vocab || []) {
  if (v.pos !== 'noun' || !v.article) continue;
  const r = ref.get(v.de);
  if (r && r.article !== v.article) { issues++; console.log(`MẠO TỪ khác kho  ${l.id}: ${v.article} ${v.de}  ↔  kho đã duyệt: ${r.article} ${r.de}`); }
  else if (r && r.plural && v.plural && r.plural !== v.plural && r.plural !== '–' && v.plural !== '–') { issues++; console.log(`SỐ NHIỀU khác kho ${l.id}: ${v.de} ${v.plural}  ↔  kho: ${r.plural}`); }
  for (const [re, art, exc] of RULES) {
    const last = v.de.split(/(?=[A-ZÄÖÜ])/).pop();       // thành tố cuối của từ ghép
    if (re.test(last.toLowerCase()) && !exc.includes(last) && !exc.includes(v.de) && v.article !== art) {
      issues++; console.log(`HẬU TỐ  ${l.id}: ${v.article} ${v.de} – hậu tố thường là ${art}`);
    }
  }
}
console.log(`\n${issues} điểm cần xem lại · kho tham chiếu: ${ref.size} danh từ`);
