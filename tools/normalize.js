// Chuẩn hoá tự động mọi nội dung trước khi đưa vào web:
//  - IPA: bỏ dấu nối t͡s/t͡ʃ/p͡f → ts/tʃ/pf (ký hiệu Duden), g Latin → ɡ.
//  - Tên riêng tiếng Việt có dấu nằm trong văn bản TIẾNG ĐỨC → bỏ dấu (Đà Nẵng → Da Nang) để giọng Đức đọc trôi chảy.
//    Văn bản tiếng Việt giữ nguyên. Chữ ä ö ü ß được giữ nguyên.
const GERMAN_OK = /^[A-Za-zÄÖÜäöüß]+$/;
const VI_MARK = /[À-ỹĐđ]/;
function stripVi(word) {
  if (GERMAN_OK.test(word) || !VI_MARK.test(word)) return word;
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
const ipa = s => typeof s === 'string' ? s.replace(/t͡s/g, 'ts').replace(/t͡ʃ/g, 'tʃ').replace(/p͡f/g, 'pf').replace(/d͡ʒ/g, 'dʒ').replace(/g/g, 'ɡ') : s;
const theory = s => typeof s === 'string' ? s
  .replace(/\s*\[([^\]]+)\]\((https?:[^)]+)\)/g, '')           // bỏ đường link nguồn (ứng dụng không hiển thị link)
  .replace(/\{\{(.+?)\}\}/g, (_, t) => '{{' + deText(t) + '}}')
  .replace(/`([^`]*)`/g, (_, t) => '`' + ipa(t) + '`') : s;

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
  if (y.pairs) y.pairs = y.pairs.map(([a, b]) => [deText(a), b]);
  if (y.explain) y.explain = theory(y.explain);
  return y;
}
function reading(r) {
  if (!r) return r;
  return { ...r, title: deText(r.title), text: deText(r.text), glossary: (r.glossary || []).map(vocab),
    questions: (r.questions || []).map(q => ({ ...q, q: deText(q.q), options: q.options.map(deText) })) };
}
function unit(u) {
  return { ...u, lessons: u.lessons.map(l => {
    const o = {
      ...l,
      theory: theory(l.theory),
      vocab: (l.vocab || []).map(vocab),
      dialogue: (l.dialogue || []).map(d => ({ ...d, name: deText(d.name), de: deText(d.de) })),
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
module.exports = { item, unit, vocab, exercise, deText, ipa, theory };
