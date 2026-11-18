// Soát quy luật cho gói động từ (bổ sung cho đối chiếu bảng chuẩn trong add-content.js)
// node tools/verb-audit.js <thư mục chứa verbs-*.json>
const fs = require('fs');
const path = require('path');
const V = require('../js/validate.js');
const dir = process.argv[2];
const INSEP = /^(be|ge|er|ver|zer|ent|emp|miss|hinter|über|unter|wider|wieder|voll)/;
const NO_PREFIX = ['ernten', 'erben', 'geben', 'gehen', 'gelten', 'gewinnen', 'genießen', 'geschehen', 'gießen', 'beten', 'entern', 'ehren'];
const stripPron = s => String(s).split('|')[0].trim().replace(/\s+(mich|dich|sich|uns|euch|mir|dir)\b/g, '');
const MOTION = ['gehen', 'kommen', 'fahren', 'fliegen', 'laufen', 'reisen', 'fallen', 'steigen', 'springen', 'schwimmen', 'wandern', 'rennen', 'fliehen', 'kriechen', 'reiten', 'segeln', 'klettern', 'wachsen', 'sterben', 'werden', 'bleiben', 'sein', 'passieren', 'geschehen', 'aufstehen', 'einschlafen', 'aufwachen', 'ankommen', 'abfahren', 'umziehen', 'einsteigen', 'aussteigen', 'umsteigen', 'zurückkommen', 'erscheinen', 'entstehen', 'verschwinden', 'gelingen', 'misslingen', 'begegnen', 'folgen', 'gelangen', 'auftreten', 'aufwachsen', 'zunehmen', 'abnehmen', 'eintreten', 'ausziehen', 'einziehen', 'losfahren', 'weggehen', 'mitkommen', 'vorbeikommen'];
const issues = [], seen = new Map();
let total = 0;
for (const f of fs.readdirSync(dir).filter(f => /^verbs-.*\.json$/.test(f)).sort()) {
  const pack = V.extract(fs.readFileSync(path.join(dir, f), 'utf8'));
  for (const v of pack.verbs || []) {
    total++;
    const P = `${pack.id} ${v.inf}`;
    const base = v.inf.replace(/^sich /, '');
    if (seen.has(base)) issues.push(`TRÙNG  ${P} (đã có ở ${seen.get(base)})`); else seen.set(base, pack.id);
    const p2 = String(v.partizip || '').split('|')[0].trim();
    const sepMatch = (v.praesens && v.praesens[0] || '').split('|')[0].trim().split(/\s+/);
    const reflexive = /^sich /.test(v.inf);
    const parts = sepMatch.filter(w => !/^(mich|dich|sich|uns|euch|mir|dir)$/.test(w));
    const sepPrefix = parts.length >= 2 ? parts[parts.length - 1] : '';
    const stem = sepPrefix ? base.slice(sepPrefix.length) : base;
    // ge- trong Partizip II
    if (NO_PREFIX.includes(stem)) {
      if (!/^ge/.test(p2.slice(sepPrefix.length))) issues.push(`GE-    ${P}: "${p2}" – thường bắt đầu bằng ge-`);
    } else if (/ieren$/.test(stem) || INSEP.test(stem) || /^recyc/.test(stem)) {
      if (/^(ge)/.test(p2.slice(sepPrefix.length)) && !/^ge/.test(stem)) issues.push(`GE-    ${P}: "${p2}" – động từ -ieren/tiền tố không tách thường KHÔNG có ge-`);
    } else if (sepPrefix) {
      if (!p2.startsWith(sepPrefix + 'ge')) issues.push(`GE-    ${P}: "${p2}" – động từ tách thường là ${sepPrefix}ge…`);
    } else if (!/^ge/.test(p2)) issues.push(`GE-    ${P}: "${p2}" – thường bắt đầu bằng ge-`);
    if (!/(t|en|n)$/.test(p2)) issues.push(`ĐUÔI   ${P}: Partizip "${p2}" không kết thúc bằng -t/-en`);
    // trợ động từ
    if (MOTION.includes(base) && !/sein/.test(v.aux || '')) issues.push(`AUX    ${P}: "${v.aux}" – động từ di chuyển/biến đổi trạng thái thường dùng sein`);
    if (reflexive && /^sein$/.test(v.aux || '')) issues.push(`AUX    ${P}: động từ phản thân hầu như luôn dùng haben`);
    // Präteritum: ich = er; wir = sie
    const pr = v.praeteritum || [];
    if (pr.length === 6) {
      const a = i => stripPron(pr[i]);
      if (a(0) !== a(2)) issues.push(`PRÄT   ${P}: ich "${a(0)}" ≠ er "${a(2)}"`);
      if (a(3) !== a(5)) issues.push(`PRÄT   ${P}: wir "${a(3)}" ≠ sie "${a(5)}"`);
    }
    const ps = v.praesens || [];
    if (ps.length === 6 && stripPron(ps[3]) !== stripPron(ps[5])) issues.push(`PRÄS   ${P}: wir ≠ sie/Sie`);
  }
}
console.log(issues.join('\n') || '(không có điểm nghi vấn)');
console.log(`\n${total} động từ · ${seen.size} khác nhau · ${issues.length} điểm nghi vấn`);
