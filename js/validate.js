/* Kiểm tra nội dung JSON (dùng cả trong trình duyệt và bằng Node: node tools/add-content.js) */
(function (root) {
  const POS = ['noun', 'verb', 'adj', 'adv', 'prep', 'conj', 'pron', 'num', 'phrase', 'other'];
  const TYPES = ['mcq', 'gap', 'order', 'translate', 'listen', 'speak', 'match'];
  const ARTICLES = ['der', 'die', 'das'];
  const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

  /** Bóc JSON ra khỏi câu trả lời của AI (bỏ ```json, nhãn "=== id ===", chữ thừa; hỗ trợ nhiều khối) */
  function extract(text) {
    let t = String(text).trim().replace(/^﻿/, '');
    t = t.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
    try { return JSON.parse(t); } catch (e) { /* thử tiếp */ }
    const a = t.indexOf('{'), b = t.lastIndexOf('}');
    if (a >= 0 && b > a) {
      try { return JSON.parse(t.slice(a, b + 1)); } catch (e) { /* nhiều khối */ }
      const parts = [];
      let depth = 0, start = -1, inStr = false, escp = false;
      for (let i = 0; i < t.length; i++) {
        const c = t[i];
        if (inStr) { if (escp) escp = false; else if (c === '\\') escp = true; else if (c === '"') inStr = false; continue; }
        if (c === '"' && depth > 0) inStr = true;
        else if (c === '{') { if (depth === 0) start = i; depth++; }
        else if (c === '}' && depth > 0) { depth--; if (depth === 0 && start >= 0) { try { parts.push(JSON.parse(t.slice(start, i + 1))); } catch (e) { throw new Error('Một khối JSON bị lỗi cú pháp gần vị trí ' + start + ': ' + e.message); } start = -1; } }
      }
      if (parts.length) return parts.length === 1 ? parts[0] : parts;
    }
    throw new Error('Không đọc được JSON. Hãy dùng "PROMPT SỬA JSON LỖI" hoặc yêu cầu AI trả lại JSON hợp lệ.');
  }

  function checkVocab(v, Q, E, W) {
    if (!v.de) E(Q, 'thiếu "de"');
    if (!v.vi) E(Q, 'thiếu "vi"');
    if (v.pos && !POS.includes(v.pos)) W(Q, 'pos lạ: ' + v.pos);
    if (v.pos === 'noun') {
      if (v.article && !ARTICLES.includes(v.article)) E(Q, 'article sai: ' + v.article);
      if (v.de && /^(der|die|das) /i.test(v.de)) E(Q, '"de" không được kèm mạo từ');
      if (v.de && v.de[0] !== v.de[0].toUpperCase()) E(Q, 'danh từ phải viết hoa');
      if (v.article && !v.plural) W(Q, 'thiếu plural');
      if (v.plural && /^(der|die|das) /i.test(v.plural)) E(Q, 'plural không kèm mạo từ');
    }
    if (v.pos === 'verb' && !v.forms) W(Q, 'động từ thiếu "forms"');
    if (!v.ipa) W(Q, 'thiếu IPA');
    else {
      if (/[\/\[\]]/.test(v.ipa)) E(Q, 'IPA có / / hoặc [ ]: ' + v.ipa);
      if (/r/.test(v.ipa)) W(Q, 'IPA dùng "r" thay vì ʁ/ɐ: ' + v.ipa);
      if (/g/.test(v.ipa)) W(Q, 'IPA dùng chữ g Latin thay vì ɡ: ' + v.ipa);
      if (/ei|au|eu/.test(v.ipa)) W(Q, 'IPA có thể viết sai nguyên âm đôi: ' + v.ipa);
    }
    if (!v.example) W(Q, 'thiếu câu ví dụ');
  }

  function checkExercises(ex, P, E, W, need) {
    const count = {};
    (ex || []).forEach((x, i) => {
      const Q = `${P} ex[${i}] ${x.type}`;
      count[x.type] = (count[x.type] || 0) + 1;
      if (!TYPES.includes(x.type)) { E(Q, 'loại bài tập lạ'); return; }
      if (x.type === 'mcq') {
        if (!Array.isArray(x.options) || x.options.length < 2) E(Q, 'cần ≥ 2 options');
        else if (typeof x.answer !== 'number' || x.answer < 0 || x.answer >= x.options.length) E(Q, 'answer phải là chỉ số 0..' + (x.options.length - 1));
        // so sánh có phân biệt hoa/thường: "Ihre" ≠ "ihre" là phương án hợp lệ khi luyện viết hoa
        else if (new Set(x.options.map(o => String(o).trim())).size !== x.options.length) E(Q, 'có đáp án trùng nhau');
        if (!x.explain) W(Q, 'thiếu explain');
      }
      if (x.type === 'gap') {
        const n = (String(x.text || '').match(/___/g) || []).length;
        if (!n) E(Q, 'text không có ___');
        if (!Array.isArray(x.answers) || x.answers.length !== n) E(Q, `số ___ (${n}) ≠ số answers (${(x.answers || []).length})`);
        if (!x.explain) W(Q, 'thiếu explain');
      }
      if (x.type === 'order') {
        if (!Array.isArray(x.words) || !x.answer) E(Q, 'thiếu words/answer');
        else {
          const norm = s => String(s).toLowerCase().replace(/[.,!?;:„“"]/g, '').split(/\s+/).filter(Boolean).sort().join(' ');
          const w = norm(x.words.join(' '));
          for (const a of [x.answer, ...(x.answers || [])]) if (norm(a) !== w) E(Q, `words không ghép được thành "${a}"`);
        }
      }
      if (x.type === 'translate' && (!Array.isArray(x.answers) || !x.answers.length || !x.vi)) E(Q, 'thiếu vi/answers');
      if ((x.type === 'listen' || x.type === 'speak') && !x.de) E(Q, 'thiếu de');
      if (x.type === 'match') {
        if (!Array.isArray(x.pairs) || x.pairs.length < 3) E(Q, 'cần ≥ 3 cặp');
        else if (new Set(x.pairs.map(p => p[1])).size !== x.pairs.length || new Set(x.pairs.map(p => p[0])).size !== x.pairs.length) E(Q, 'các cặp bị trùng vế');
      }
    });
    if (need) for (const [t, n] of Object.entries(need)) if ((count[t] || 0) < n) W(P, `ít bài ${t} (${count[t] || 0}/${n})`);
  }

  function checkQuestions(qs, P, E) {
    (qs || []).forEach((q, i) => {
      if (!Array.isArray(q.options) || typeof q.answer !== 'number' || q.answer < 0 || q.answer >= q.options.length) E(`${P} q[${i}]`, 'answer không trỏ đúng đáp án');
    });
  }

  function checkUnit(u) {
    const errors = [], warns = [];
    const E = (p, m) => errors.push(p + ': ' + m), W = (p, m) => warns.push(p + ': ' + m);
    if (u.type !== 'unit') W('unit', 'thiếu "type": "unit"');
    if (!/^(a1|a2|b1|b2|c1)-u\d{2}$/.test(u.id || '')) E('unit', 'id không hợp lệ: ' + u.id);
    if (!LEVELS.includes(u.level)) E(u.id, 'level không hợp lệ: ' + u.level);
    if (!Array.isArray(u.lessons) || !u.lessons.length) { E(u.id, 'không có lessons'); return { errors, warns }; }
    const ids = new Set();
    u.lessons.forEach((l, li) => {
      const P = l.id || `${u.id}#${li}`;
      if (!l.id || !l.id.startsWith(u.id + '-l')) E(P, 'id lesson phải dạng ' + u.id + '-lN');
      if (ids.has(l.id)) E(P, 'trùng id lesson'); ids.add(l.id);
      if (!l.title) W(P, 'thiếu title');
      if (!l.theory) W(P, 'thiếu theory');
      else if (!/\{\{.+?\}\}/.test(l.theory)) W(P, 'theory không có ví dụ {{ }} để bấm nghe');
      const voc = l.vocab || [];
      if (voc.length < 8) W(P, `chỉ có ${voc.length} từ vựng`);
      voc.forEach((v, i) => checkVocab(v, `${P} vocab[${i}] "${v.de}"`, E, W));
      (l.dialogue || []).forEach((d, i) => { if (!d.de || !d.vi) E(`${P} dialogue[${i}]`, 'thiếu de/vi'); if (!['A', 'B'].includes(d.speaker)) W(`${P} dialogue[${i}]`, 'speaker nên là A/B'); });
      if (l.reading) { if (!l.reading.text) E(P + ' reading', 'thiếu text'); checkQuestions(l.reading.questions, P + ' reading', E); }
      checkExercises(l.exercises, P, E, W, { mcq: 3, gap: 3, order: 2, translate: 2, listen: 2, speak: 2, match: 1 });
    });
    return { errors, warns };
  }

  /** Kiểm tra các loại kho kiến thức: deck, grammar, reading, exam, verbs */
  function checkItem(x) {
    if (!x.type || x.type === 'unit') return checkUnit(x);
    const errors = [], warns = [];
    const E = (p, m) => errors.push(p + ': ' + m), W = (p, m) => warns.push(p + ': ' + m);
    const P = x.id || x.type;
    if (!x.id) E(x.type, 'thiếu id');
    if (x.type !== 'verbs' && !LEVELS.includes(x.level)) E(P, 'level không hợp lệ: ' + x.level);
    if (x.type === 'deck') {
      if (!Array.isArray(x.cards) || !x.cards.length) E(P, 'không có cards');
      const seen = new Set();
      (x.cards || []).forEach((v, i) => { checkVocab(v, `${P} card[${i}] "${v.de}"`, E, W); const k = (v.article || '') + v.de; if (seen.has(k)) W(P, 'trùng từ: ' + v.de); seen.add(k); });
    } else if (x.type === 'grammar') {
      if (!x.title || !x.body) E(P, 'thiếu title/body');
      else if (!/\{\{.+?\}\}/.test(x.body)) W(P, 'body không có ví dụ {{ }}');
      checkExercises(x.exercises, P, E, W, { mcq: 3, gap: 3 });
    } else if (x.type === 'reading') {
      if (!x.text) E(P, 'thiếu text');
      if (!x.vi) W(P, 'thiếu bản dịch');
      (x.glossary || []).forEach((v, i) => checkVocab(v, `${P} glossary[${i}] "${v.de}"`, E, W));
      checkQuestions(x.questions, P, E);
    } else if (x.type === 'exam') {
      if (!Array.isArray(x.sections) || !x.sections.length) E(P, 'không có sections');
      (x.sections || []).forEach((s, i) => {
        const S = `${P} sec[${i}] ${s.title || ''}`;
        if (!s.task && !(s.exercises || []).length) E(S, 'phần thi không có bài tập/đề');
        if (/hoer|hör/i.test(s.skill || '') && !s.audio && !(s.exercises || []).every(e => e.audio)) E(S, 'phần nghe thiếu "audio"');
        checkExercises(s.exercises, S, E, W);
      });
    } else if (x.type === 'verbs') {
      (x.verbs || []).forEach((v, i) => {
        const Q = `${P} verb[${i}] ${v.inf}`;
        if (!v.inf || !v.vi) E(Q, 'thiếu inf/vi');
        for (const k of ['praesens', 'praeteritum', 'konj2']) if (v[k] && (!Array.isArray(v[k]) || v[k].length !== 6)) E(Q, k + ' phải có đúng 6 dạng');
        if (!v.praesens) E(Q, 'thiếu praesens');
        if (!v.partizip) E(Q, 'thiếu partizip');
        if (!/^(haben|sein|haben\|sein|sein\|haben)$/.test(v.aux || '')) E(Q, 'aux không hợp lệ: ' + v.aux);
        if (v.imperativ && (!Array.isArray(v.imperativ) || v.imperativ.length !== 3)) E(Q, 'imperativ phải có 3 dạng (du, ihr, Sie)');
        // wir-Form phải trùng nguyên mẫu (động từ tách: "stehen auf" ↔ "aufstehen")
        if (v.praesens && v.praesens[3] && v.inf && !/^sich /.test(v.inf)) {
          const p = v.praesens[3].split('|')[0].trim().split(/\s+/);
          const joined = p.length === 2 ? p[1] + p[0] : p[0];
          if (joined !== v.inf) W(Q, `wir-Form "${v.praesens[3]}" không khớp nguyên mẫu – kiểm tra lại`);
        }
      });
    } else W(P, 'loại nội dung lạ: ' + x.type);
    return { errors, warns };
  }

  /** Gộp các phần của cùng một mục (khi AI chia làm nhiều lần trả lời) */
  function mergeUnits(list) {
    const map = new Map();
    for (const u of list) {
      if (!u || (u.type && u.type !== 'unit')) continue;
      const cur = map.get(u.id);
      if (!cur) { map.set(u.id, JSON.parse(JSON.stringify(u))); continue; }
      for (const k of ['title', 'titleVi', 'goals', 'level', 'order']) if (!cur[k] && u[k]) cur[k] = u[k];
      for (const l of u.lessons || []) {
        const i = cur.lessons.findIndex(x => x.id === l.id);
        if (i >= 0) cur.lessons[i] = l; else cur.lessons.push(l);
      }
      cur.lessons.sort((a, b) => parseInt(a.id.split('-l').pop()) - parseInt(b.id.split('-l').pop()));
    }
    return [...map.values()];
  }
  /** Gộp các phần của mục kho kiến thức cùng id (nối cards / verbs / sections / exercises / questions / glossary) */
  function mergeItems(list) {
    const map = new Map();
    for (const x of list) {
      if (!x || !x.type || x.type === 'unit') continue;
      const cur = map.get(x.id);
      if (!cur) { map.set(x.id, JSON.parse(JSON.stringify(x))); continue; }
      for (const k of ['cards', 'verbs', 'sections', 'exercises', 'questions', 'glossary', 'mistakes']) if (Array.isArray(x[k])) cur[k] = [...(cur[k] || []), ...x[k]];
      for (const k of Object.keys(x)) if (cur[k] === undefined || cur[k] === '') cur[k] = x[k];
      if (x.text && cur.text !== x.text && x.type === 'reading') cur.text += '\n\n' + x.text;
    }
    return [...map.values()];
  }

  const api = { extract, checkUnit, checkItem, mergeUnits, mergeItems };
  root.Validator = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
