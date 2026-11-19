// Chuẩn hoá tự động mọi nội dung trước khi đưa vào web:
//  - IPA: bỏ dấu nối t͡s/t͡ʃ/p͡f → ts/tʃ/pf (ký hiệu Duden), g Latin → ɡ.
//  - Tên riêng tiếng Việt có dấu nằm trong văn bản TIẾNG ĐỨC → bỏ dấu (Đà Nẵng → Da Nang) để giọng Đức đọc trôi chảy.
//    Văn bản tiếng Việt giữ nguyên. Chữ ä ö ü ß được giữ nguyên.
const GERMAN_OK = /^[A-Za-zÄÖÜäöüß]+$/;
// Chỉ ký tự RIÊNG của tiếng Việt (ă â ê ô ơ ư đ, dấu hỏi/ngã/nặng…). Không tính é/à… đơn thuần
// vì từ mượn tiếng Pháp trong tiếng Đức dùng chúng (Café, Varieté, à la carte).
const VI_MARK = /[ăâđêôơưĂÂĐÊÔƠƯãẽĩõũỹÃẼĨÕŨỸàèìòùÀÈÌÒÙẠ-ỹ]/;
function stripVi(word) {
  if (GERMAN_OK.test(word) || !VI_MARK.test(word) || word === 'à') return word;
  const keep = { 'ä': '\u0001', 'ö': '\u0002', 'ü': '\u0003', 'Ä': '\u0004', 'Ö': '\u0005', 'Ü': '\u0006', 'ß': '\u0007' };
  let w = word.replace(/[äöüÄÖÜß]/g, c => keep[c]);
  w = w.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
  for (const [k, v] of Object.entries(keep)) w = w.split(v).join(k);
  return w.normalize('NFC');
}
// Chỉ áp dụng cho văn bản chủ yếu là tiếng Đức (≤ 50% số từ mang dấu tiếng Việt), để không làm hỏng câu tiếng Việt.
const deText = s => {
  if (typeof s !== 'string') return s;
  const words = s.match(/\p{L}+/gu) || [];
  const vi = words.filter(w => !GERMAN_OK.test(w) && VI_MARK.test(w)).length;
  if (!words.length || vi / words.length > 0.5) return s;
  return s.replace(/\p{L}+/gu, stripVi);
};
// ʔ chỉ ghi bên trong từ (beachten = bəˈʔaxtn̩); ở đầu từ thì bỏ (kể cả sau dấu trọng âm ˈ/ˌ)
const ipa = s => typeof s === 'string' ? s.replace(/t͡s/g, 'ts').replace(/t͡ʃ/g, 'tʃ').replace(/p͡f/g, 'pf').replace(/d͡ʒ/g, 'dʒ').replace(/g/g, 'ɡ')
  .replace(/(^|\s)([ˈˌ]?)ʔ/g, '$1$2') : s;
const theory = s => typeof s === 'string' ? s
  .replace(/\s*\[([^\]]+)\]\((https?:[^)]+)\)/g, '')           // bỏ đường link nguồn (ứng dụng không hiển thị link)
  .replace(/\{\{(.+?)\}\}/g, (_, t) => '{{' + deText(t) + '}}')
  // chỉ chuẩn hoá đoạn `…` trông như IPA (có ký hiệu IPA, không có chữ số/gạch nối như `gr-b2-01`)
  .replace(/`([^`]*)`/g, (_, t) => '`' + (/[ːˈˌʁəɐɛɔʊɪʏøœçŋʃʒ]/.test(t) && !/[\d-]/.test(t) ? ipa(t) : t) + '`') : s;
// Chỉ chuẩn hoá các trường "ipa" (an toàn cho mọi loại nội dung, không đụng tới chữ)
const ipaFields = x => Array.isArray(x) ? x.map(ipaFields)
  : x && typeof x === 'object' ? Object.fromEntries(Object.entries(x).map(([k, v]) => [k, k === 'ipa' ? ipa(v) : ipaFields(v)])) : x;

function vocab(v) {
  if (!v) return v;
  return { ...v, de: deText(v.de), plural: deText(v.plural), example: deText(v.example), forms: deText(v.forms), ipa: ipa(v.ipa) };
}
function exercise(x) {
  const y = { ...x };
  for (const k of ['de', 'text', 'answer', 'audio', 'context']) if (y[k]) y[k] = deText(y[k]);
  if (y.answers) y.answers = y.answers.map(deText);
  if (y.words) y.words = y.words.map(deText);
  if (y.type === 'mcq' && y.options) y.options = y.options.map(deText);
  if (y.type === 'mcq' && y.q) y.q = theory(y.q);
  if (y.pairs) y.pairs = y.pairs.map(p => Array.isArray(p) ? p : [p.a ?? p.de ?? p.left, p.b ?? p.vi ?? p.right]).map(([a, b]) => [deText(a), b]);
  if (y.explain) y.explain = theory(y.explain);
  return y;
}
function reading(r) {
  if (!r) return r;
  return { ...r, title: deText(r.title), text: deText(r.text), glossary: (r.glossary || []).map(vocab),
    questions: (r.questions || []).map(q => ({ ...q, q: deText(q.q), options: q.options.map(deText) })) };
}
// Hội thoại: "speaker" phải là A/B (để đổi giọng đọc). Nếu AI ghi tên người → tên chuyển sang "name", người nói thứ nhất = A, thứ hai = B.
function dialogue(list) {
  const order = [];
  return (list || []).map(d => {
    const raw = String(d.speaker || '').trim();
    let speaker = raw, name = d.name;
    if (raw !== 'A' && raw !== 'B') {
      if (!order.includes(raw)) order.push(raw);
      speaker = order.indexOf(raw) % 2 === 0 ? 'A' : 'B';
      name = name || raw;
    }
    return { ...d, speaker, name: deText(name), de: deText(d.de) };
  });
}
function unit(u) {
  return { ...u, lessons: u.lessons.map(l => {
    const o = {
      ...l,
      theory: theory(l.theory),
      vocab: (l.vocab || []).map(vocab),
      dialogue: dialogue(l.dialogue),
      exercises: (l.exercises || []).map(exercise),
    };
    if (l.reading) o.reading = reading(l.reading);
    if (l.writing) o.writing = { ...l.writing, sample: deText(l.writing.sample) };
    return o;
  }) };
}
function item(x) {
  if (!x.type || x.type === 'unit') return unit(x);
  if (x.type === 'deck') return { ...x, cards: x.cards.map(vocab) };
  if (x.type === 'reading') return reading(x);
  if (x.type === 'grammar') return { ...x, body: theory(x.body), exercises: (x.exercises || []).map(exercise) };
  if (x.type === 'exam') return { ...x, sections: x.sections.map(s => ({ ...s, text: deText(s.text), audio: deText(s.audio), sample: deText(s.sample), exercises: (s.exercises || []).map(exercise) })) };
  return x;
}
module.exports = { item, unit, vocab, exercise, deText, ipa, theory, ipaFields };
