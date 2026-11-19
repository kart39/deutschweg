/* DeutschWeg – lõi ứng dụng: nội dung, định tuyến, tiện ích, bài học, phiên luyện tập, ôn tập, cài đặt */
const App = (() => {
  /* ================= Tiện ích ================= */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = arr => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = a => a[Math.random() * a.length | 0];
  const dayStr = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const S = () => Store.s;
  const set = () => Store.s.settings;
  const view = $('#view');
  const routes = {};
  let keyHandler = null;
  let cleanup = [];

  function toast(msg, ms = 2600) {
    const t = $('#toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), ms);
  }
  function modal(html) {
    const m = $('#modal'), c = $('#modalCard');
    c.innerHTML = html + '';
    m.hidden = false;
    m.onclick = e => { if (e.target === m) closeModal(); };
    return c;
  }
  function closeModal() { $('#modal').hidden = true; $('#modalCard').innerHTML = ''; Speech.stop(); }
  function copy(text) {
    (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => toast('Đã sao chép ✓'))
      .catch(() => { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); toast('Đã sao chép ✓'); });
  }
  function download(name, text, type = 'application/json') {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  /* Âm thanh phản hồi đúng/sai */
  let actx = null;
  function beep(ok) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const notes = ok ? [660, 880] : [300, 220];
      notes.forEach((f, i) => {
        const o = actx.createOscillator(), g = actx.createGain();
        o.type = 'sine'; o.frequency.value = f;
        const t = actx.currentTime + i * 0.11;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.18, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
        o.connect(g).connect(actx.destination); o.start(t); o.stop(t + 0.2);
      });
    } catch (e) { /* bỏ qua */ }
  }
  function confetti() {
    const c = document.createElement('canvas');
    c.className = 'confetti'; c.width = innerWidth; c.height = innerHeight;
    document.body.appendChild(c);
    const g = c.getContext('2d');
    const colors = ['#0E7C63', '#9FE3C7', '#f5c400', '#dd2c2c', '#111', '#5AD6AE'];
    const ps = Array.from({ length: 140 }, () => ({ x: innerWidth / 2, y: innerHeight / 3, vx: (Math.random() - .5) * 14, vy: Math.random() * -12 - 3, s: Math.random() * 6 + 4, c: pick(colors), r: Math.random() * 6 }));
    let n = 0;
    (function tick() {
      g.clearRect(0, 0, c.width, c.height);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .35; p.r += .1; g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.fillStyle = p.c; g.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6); g.restore(); });
      if (++n < 110) requestAnimationFrame(tick); else c.remove();
    })();
  }

  /* ================= Markdown tối giản ({{tiếng Đức}} bấm để nghe) ================= */
  function inline(s) {
    return s
      .replace(/\{\{(.+?)\}\}/g, (_, t) => `<span class="say" data-say="${t}" title="Bấm để nghe">${t}</span>`)
      .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
      .replace(/(^|[\s(])\*([^*\n]+?)\*(?=[\s).,;:!?]|$)/g, '$1<i>$2</i>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }
  const inl = s => inline(esc(s));
  function md(src) {
    const lines = esc(src || '').split(/\r?\n/);
    const out = [];
    const isBlock = l => /^(#{1,4}\s|\s*\||&gt;|\s*[-*•]\s|\s*\d+[.)]\s)/.test(l);
    let i = 0;
    while (i < lines.length) {
      const l = lines[i];
      if (!l.trim()) { i++; continue; }
      let m;
      if ((m = l.match(/^(#{1,4})\s+(.*)/))) { const n = Math.min(4, m[1].length + 1); out.push(`<h${n}>${inline(m[2])}</h${n}>`); i++; continue; }
      if (/^\s*\|/.test(l)) {
        const rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(lines[i++]);
        const sep = r => /^[\s|:-]+$/.test(r);
        const cells = r => r.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
        const hasHead = rows[1] && sep(rows[1]);
        let html = '<table>';
        rows.forEach((r, ri) => {
          if (sep(r)) return;
          const tag = hasHead && ri === 0 ? 'th' : 'td';
          html += '<tr>' + cells(r).map(c => `<${tag}>${inline(c)}</${tag}>`).join('') + '</tr>';
        });
        out.push(html + '</table>'); continue;
      }
      if (/^&gt;/.test(l)) {
        const b = [];
        while (i < lines.length && /^&gt;/.test(lines[i])) b.push(lines[i++].replace(/^&gt;\s?/, ''));
        // Hộp ghi chú kiểu GitHub: > [!NOTE] / [!IMPORTANT] / [!TIP] / [!WARNING] / [!CAUTION]
        const CALLOUT = { NOTE: 'Lưu ý', TIP: 'Mẹo', IMPORTANT: 'Quan trọng', WARNING: 'Chú ý', CAUTION: 'Cẩn thận' };
        const m = /^\[!(\w+)\]\s*/.exec(b[0] || '');
        if (m && CALLOUT[m[1].toUpperCase()]) {
          b[0] = b[0].slice(m[0].length);
          const body = b.filter((x, k) => k > 0 || x.trim()).map(inline).join('<br>');
          out.push(`<blockquote><strong>${CALLOUT[m[1].toUpperCase()]}:</strong> ${body}</blockquote>`); continue;
        }
        out.push(`<blockquote>${b.map(inline).join('<br>')}</blockquote>`); continue;
      }
      if (/^\s*[-*•]\s+/.test(l)) {
        const b = [];
        while (i < lines.length && /^\s*[-*•]\s+/.test(lines[i])) b.push(lines[i++].replace(/^\s*[-*•]\s+/, ''));
        out.push('<ul>' + b.map(x => `<li>${inline(x)}</li>`).join('') + '</ul>'); continue;
      }
      if (/^\s*\d+[.)]\s+/.test(l)) {
        const b = [];
        while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) b.push(lines[i++].replace(/^\s*\d+[.)]\s+/, ''));
        out.push('<ol>' + b.map(x => `<li>${inline(x)}</li>`).join('') + '</ol>'); continue;
      }
      const p = [];
      while (i < lines.length && lines[i].trim() && !isBlock(lines[i])) p.push(lines[i++]);
      out.push(`<p>${p.map(inline).join('<br>')}</p>`);
    }
    return out.join('');
  }

  /* ================= Nút nghe & bàn phím umlaut ================= */
  const sayBtn = (text, slow = false, alt = false) => text ? `<button class="say-btn${slow ? ' slow' : ''}" data-say="${esc(text)}"${slow ? ' data-slow' : ''}${alt ? ' data-alt' : ''} title="${slow ? 'Nghe chậm' : 'Nghe'}" aria-label="${slow ? 'Nghe chậm' : 'Nghe'}">${slow ? '🐢' : '🔊'}</button>` : '';
  const sayBtns = (text, alt) => sayBtn(text, false, alt) + sayBtn(text, true, alt);
  const umlautBar = () => `<div class="umlauts">${['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map(c => `<button type="button" data-ins="${c}" tabindex="-1">${c}</button>`).join('')}</div>`;
  let lastInput = null;
  document.addEventListener('focusin', e => { if (e.target.matches('input[type=text], input:not([type]), textarea')) lastInput = e.target; });
  document.addEventListener('mousedown', e => { if (e.target.closest('[data-ins]')) e.preventDefault(); });
  document.addEventListener('click', e => {
    const ins = e.target.closest('[data-ins]');
    if (ins) {
      const el = (document.activeElement && document.activeElement.matches('input, textarea')) ? document.activeElement : lastInput;
      if (el) {
        const s = el.selectionStart ?? el.value.length, en = el.selectionEnd ?? el.value.length;
        el.value = el.value.slice(0, s) + ins.dataset.ins + el.value.slice(en);
        el.focus(); el.selectionStart = el.selectionEnd = s + 1;
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
      return;
    }
    const b = e.target.closest('[data-say]');
    if (b) { e.preventDefault(); sayEl(b); }
  });
  async function sayEl(b) {
    $$('.playing').forEach(x => x.classList.remove('playing'));
    b.classList.add('playing');
    try { await Speech.speak(b.dataset.say, { slow: 'slow' in b.dataset, alt: 'alt' in b.dataset }); }
    catch (err) { toast(err.message || 'Không phát được âm thanh'); }
    finally { b.classList.remove('playing'); }
  }

  /* ================= Nội dung ================= */
  const C = { units: new Map(), lessons: new Map(), decks: new Map(), grammar: new Map(), readings: new Map(), exams: new Map(), verbs: [], vocab: new Map() };
  const cardKey = v => (v.article ? v.article + ' ' : '') + v.de;

  function loadScript(src) {
    // async = false: tải song song nhưng vẫn chạy đúng thứ tự
    return new Promise(res => { const s = document.createElement('script'); s.src = src; s.async = false; s.onload = res; s.onerror = () => { console.warn('Không tải được', src); res(); }; document.head.appendChild(s); });
  }
  async function loadContent() {
    window.SEED = window.SEED || [];
    if (!loadContent.filesLoaded) {
      loadContent.filesLoaded = true;
      const files = window.CONTENT_FILES || [], view = document.getElementById('view');
      let done = 0;
      const tick = () => { if (view) view.innerHTML = `<div class="card" style="margin:2rem auto;max-width:420px;text-align:center">Đang tải nội dung… ${++done}/${files.length}</div>`; };
      await Promise.all(files.map(f => loadScript('data/' + f).then(tick)));
    }
    for (const k of ['units', 'lessons', 'decks', 'grammar', 'readings', 'exams', 'vocab']) C[k].clear();
    C.verbs = [];
    let imported = [];
    try { imported = await DB.getAll('units'); } catch (e) { /* */ }
    const all = [...window.SEED, ...imported.map(x => ({ ...x, _imported: true }))];
    const units = Validator.mergeUnits(all.filter(x => !x.type || x.type === 'unit'));
    for (const u of units) C.units.set(u.id, u);
    for (const x of Validator.mergeItems(all)) {
      if (x.type === 'deck') C.decks.set(x.id, x);
      else if (x.type === 'grammar') C.grammar.set(x.id, x);
      else if (x.type === 'reading') C.readings.set(x.id, x);
      else if (x.type === 'exam') C.exams.set(x.id, x);
      else if (x.type === 'verbs') for (const v of x.verbs || []) if (v.inf && v.praesens) C.verbs.push(v);
    }
    for (const u of C.units.values()) for (const l of u.lessons || []) {
      C.lessons.set(l.id, { lesson: l, unit: u });
      for (const v of l.vocab || []) if (v.de && v.vi && !C.vocab.has(cardKey(v))) C.vocab.set(cardKey(v), { ...v, level: u.level, src: l.id });
    }
    for (const d of C.decks.values()) for (const v of d.cards || []) if (v.de && v.vi && !C.vocab.has(cardKey(v))) C.vocab.set(cardKey(v), { ...v, level: d.level, src: d.id });
    for (const r of C.readings.values()) for (const v of r.glossary || []) if (v.de && v.vi && !C.vocab.has(cardKey(v))) C.vocab.set(cardKey(v), { ...v, level: r.level, src: r.id });
    updateBadges();
  }
  const unitsOf = lv => CURRICULUM.units.filter(u => u.level === lv);
  function orderedLessons() {
    const out = [];
    for (const cu of CURRICULUM.units) { const u = C.units.get(cu.id); if (u) for (const l of u.lessons) out.push({ lesson: l, unit: u }); }
    for (const u of C.units.values()) if (!CURRICULUM.byId(u.id)) for (const l of u.lessons) out.push({ lesson: l, unit: u });
    return out;
  }
  const lessonDone = id => (S().lessons[id] && S().lessons[id].best >= 60);
  function nextLesson() { return orderedLessons().find(x => !lessonDone(x.lesson.id)) || null; }

  /* ================= XP, chuỗi ngày ================= */
  function addXp(n) {
    if (!n) return;
    S().xp += n;
    const d = dayStr();
    S().days[d] = (S().days[d] || 0) + n;
    Store.save(); updateChips();
  }
  function streak() {
    let n = 0;
    const d = new Date();
    if (!S().days[dayStr(d)]) d.setDate(d.getDate() - 1);
    while (S().days[dayStr(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function updateChips() {
    $('#streakChip').textContent = '🔥 ' + streak();
    $('#xpChip').textContent = `⚡ ${S().days[dayStr()] || 0}/${set().dailyGoal}`;
  }

  /* ================= SRS (FSRS) ================= */
  function addCards(list) {
    let n = 0;
    for (const v of list) {
      const k = cardKey(v);
      if (!S().cards[k]) { S().cards[k] = FSRS.blank(); n++; }
    }
    Store.save(); updateBadges();
    return n;
  }
  function dueCards(now = Date.now()) {
    const due = [], fresh = [];
    for (const [k, c] of Object.entries(S().cards)) {
      if (!C.vocab.has(k)) continue;
      if (c.state === FSRS.NEW) fresh.push(k); else if (c.due <= now) due.push(k);
    }
    due.sort((a, b) => S().cards[a].due - S().cards[b].due);
    const nt = S().newToday.date === dayStr() ? S().newToday.n : 0;
    const left = Math.max(0, set().newPerDay - nt);
    return { due, fresh: fresh.slice(0, left), freshTotal: fresh.length };
  }
  function updateBadges() {
    const d = dueCards();
    const n = d.due.length + d.fresh.length;
    $('#dueBadge').textContent = n ? (n > 99 ? '99+' : n) : '';
  }

  /* ================= Định tuyến ================= */
  function crumbs(list) {
    $('#crumbs').innerHTML = list.map(([t, h]) => h ? `<a href="${h}">${esc(t)}</a>` : `<span>${esc(t)}</span>`).join(' <span class="muted">/</span> ');
  }
  function route() {
    dialogToken++;
    Speech.stop();
    keyHandler = null;
    cleanup.forEach(f => { try { f(); } catch (e) { /* */ } }); cleanup = [];
    const parts = location.hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
    const name = parts[0] || 'home';
    $$('#nav a').forEach(a => a.classList.toggle('active', a.dataset.nav === name || (name === 'level' || name === 'unit' || name === 'lesson' || name === 'practice') && a.dataset.nav === 'path'));
    $('#sidebar').classList.remove('open');
    const fn = routes[name] || routes.home;
    view.innerHTML = '';
    try { fn(...parts.slice(1)); } catch (e) { console.error(e); view.innerHTML = `<div class="card notice bad">Lỗi hiển thị trang: ${esc(e.message)}</div>`; }
    window.scrollTo(0, 0);
    updateChips();
  }
  document.addEventListener('keydown', e => { if (keyHandler) keyHandler(e); if (e.key === 'Escape' && !$('#modal').hidden) closeModal(); });

  /* ================= Widget chấm phát âm ================= */
  function scoreClass(s) { return s >= 80 ? 'score-ok' : s >= 60 ? 'score-mid' : 'score-bad'; }
  function scoreLabel(s) { return s >= 90 ? 'Xuất sắc! 🌟' : s >= 80 ? 'Rất tốt! 👏' : s >= 60 ? 'Khá – luyện thêm chút nữa' : 'Cần luyện thêm 💪'; }
  /** Gắn widget luyện nói vào host. onResult({score}) */
  function pronWidget(host, ref, onResult, opts = {}) {
    const azureOn = !!(set().azureKey && set().azureRegion);
    const geminiOn = !azureOn && AI.geminiReady() && set().pronEngine !== 'stt';
    const azure = azureOn || geminiOn;   // cả hai dùng chế độ: bấm để ghi – bấm lần nữa để chấm
    host.innerHTML = `
      <div class="row" style="gap:14px">
        <button class="mic-btn" type="button" title="Bấm để nói" aria-label="Ghi âm">🎤</button>
        <div style="flex:1;min-width:180px">
          <div class="row">${opts.hideModel ? '' : sayBtns(ref)}<span class="small muted pw-status">${Speech.sttSupported || azure ? 'Nghe mẫu → bấm 🎤 và đọc to, rõ ràng' : 'Trình duyệt này không hỗ trợ nhận dạng giọng nói – hãy dùng Chrome hoặc Edge.'}</span></div>
        </div>
      </div>
      <div class="pw-result" style="margin-top:12px"></div>`;
    const mic = $('.mic-btn', host), status = $('.pw-status', host), res = $('.pw-result', host);
    let busy = false, rec = null, recording = null, sttHandle = null, lastBlob = null;

    function showResult(r) {
      const words = r.words.map(w => {
        if (r.engine === 'gemini') {
          const cls = w.score >= 80 ? 'w-ok' : w.score >= 60 ? 'w-close' : 'w-bad';
          return `<span class="${cls}" style="text-decoration:none" title="${w.score}/100${w.issue ? ' · ' + esc(w.issue) : ''}">${esc(w.word)}</span>`;
        }
        if (r.engine === 'azure') {
          const cls = w.error === 'Omission' ? 'w-miss' : w.score >= 80 ? 'w-ok' : w.score >= 60 ? 'w-close' : 'w-bad';
          const tip = w.phonemes && w.phonemes.length ? w.phonemes.map(p => `${p.p}:${p.score}`).join(' ') : '';
          return `<span class="${cls}" title="${esc(w.error !== 'None' ? w.error + ' · ' : '')}${w.score}/100 ${esc(tip)}">${esc(w.word)}</span>`;
        }
        return `<span class="${w.st === 'ok' ? 'w-ok' : w.st === 'close' ? 'w-close' : 'w-miss'}">${esc(w.w)}</span>`;
      }).join(' ');
      res.innerHTML = `
        <div class="row" style="gap:16px;align-items:center">
          <div class="score-big ${scoreClass(r.score)}">${r.score}</div>
          <div><b>${scoreLabel(r.score)}</b>
            ${r.engine === 'azure' ? `<div class="small muted">Độ chính xác ${r.accuracy} · Trôi chảy ${r.fluency} · Đầy đủ ${r.completeness}</div>` : ''}
          </div>
          ${lastBlob ? '<button class="btn sm pw-replay" type="button">▶ Nghe lại giọng bạn</button>' : ''}
        </div>
        <div class="diff" style="margin-top:10px;font-size:1.15rem">${words}</div>
        ${r.heard ? `<div class="small muted" style="margin-top:6px">Máy nghe được: „${esc(r.heard)}“</div>` : ''}
        ${r.engine === 'gemini' ? `${r.words.filter(w => w.issue).length ? `<ul class="small" style="margin:8px 0 0">${r.words.filter(w => w.issue).map(w => `<li><b>${esc(w.word)}</b> (${w.score}): ${esc(w.issue)}</li>`).join('')}</ul>` : ''}
          ${r.tips ? `<div class="notice small" style="margin-top:8px">💡 ${esc(r.tips)}</div>` : ''}<div class="small muted" style="margin-top:4px">Chấm bởi Gemini (nghe trực tiếp giọng bạn).</div>`
        : r.engine === 'azure' ? '<div class="small muted">Rê chuột lên từng từ để xem điểm từng âm.</div>' : '<div class="small muted" style="margin-top:4px">Chấm theo mức máy hiểu được bạn nói. Muốn chấm chi tiết từng âm: chọn chấm bằng Gemini hoặc Azure trong Cài đặt.</div>'}`;
      const rp = $('.pw-replay', res);
      if (rp) rp.onclick = () => { const a = new Audio(URL.createObjectURL(lastBlob)); a.play(); };
      onResult && onResult(r);
    }

    mic.onclick = async () => {
      if (busy) return;
      Speech.stop();
      // Azure: bấm 1 lần để ghi, bấm lần nữa để dừng & chấm
      if (azure) {
        if (!recording) {
          try { recording = await Speech.record(); } catch (e) { status.textContent = 'Không mở được micro: ' + e.message; return; }
          mic.classList.add('rec'); status.textContent = 'Đang ghi âm… bấm 🎤 lần nữa khi đọc xong';
          return;
        }
        mic.classList.remove('rec'); busy = true; status.textContent = 'Đang chấm điểm…';
        try { lastBlob = await recording.stop(); recording = null; showResult(await (azureOn ? Speech.azureAssess(lastBlob, ref) : Speech.geminiAssess(lastBlob, ref))); status.textContent = 'Bấm 🎤 để thử lại'; }
        catch (e) { status.textContent = e.message; }
        finally { busy = false; recording = null; }
        return;
      }
      if (!Speech.sttSupported) { toast('Hãy mở trang bằng Chrome hoặc Edge để luyện nói.'); return; }
      if (sttHandle) { sttHandle.stop(); return; }
      busy = true; mic.classList.add('rec'); status.textContent = 'Đang nghe… hãy đọc câu';
      try { rec = await Speech.record(); } catch (e) { rec = null; }
      sttHandle = Speech.listen(t => { status.textContent = '… ' + t; });
      busy = false;
      try {
        const alts = await sttHandle.promise;
        let best = null;
        for (const a of alts) { const r = Speech.align(ref, a.transcript); if (!best || r.score > best.score) best = { ...r, heard: a.transcript }; }
        if (rec) lastBlob = await rec.stop();
        showResult({ engine: 'stt', ...best });
        status.textContent = 'Bấm 🎤 để thử lại';
      } catch (e) {
        status.textContent = e.message;
        if (rec) rec.stop();
      } finally { mic.classList.remove('rec'); sttHandle = null; }
    };
    cleanup.push(() => { if (sttHandle) sttHandle.stop(); if (recording) recording.stop(); });
  }
  function pronModal(text, vi) {
    const c = modal(`<div class="row between"><h2 style="margin:0">Luyện phát âm</h2><button class="icon-btn" data-close>✕</button></div>
      <div class="big-de" style="margin:14px 0 4px">${esc(text)}</div>${vi ? `<div class="muted">${esc(vi)}</div>` : ''}<hr><div id="pwHost"></div>`);
    $('[data-close]', c).onclick = closeModal;
    pronWidget($('#pwHost', c), text);
  }

  /* ================= Hiển thị từ vựng ================= */
  function nounLabel(v) { return v.article ? `<span class="art-${v.article}">${v.article}</span> ${esc(v.de)}` : esc(v.de); }
  function plural(v) { return v.plural && v.plural !== '–' && v.plural !== '-' ? ', die ' + esc(v.plural) : (v.article && (v.plural === '–' || v.plural === '-') ? ' <span class="muted small">(không có số nhiều)</span>' : ''); }
  function vocabItem(v) {
    const k = cardKey(v);
    const inSrs = !!S().cards[k];
    return `<div class="vocab-item ${v.article ? 'noun-' + v.article : ''}">
      <div>
        <div class="w">${nounLabel(v)}<span class="meta" style="font-weight:500">${plural(v)}</span></div>
        <div class="meta">${set().showIpa && v.ipa ? `<span class="ipa">[${esc(v.ipa)}]</span> · ` : ''}${v.pos ? `<i>${esc(v.pos)}</i> · ` : ''}${esc(v.vi)}</div>
        ${v.forms ? `<div class="meta">⇄ ${esc(v.forms)}</div>` : ''}
      </div>
      <div class="acts">${sayBtns((v.article ? v.article + ' ' : '') + v.de)}
        <button class="say-btn" data-pron="${esc((v.article ? v.article + ' ' : '') + v.de)}" data-vi="${esc(v.vi)}" title="Luyện phát âm">🎤</button>
        <button class="say-btn" data-card="${esc(k)}" title="${inSrs ? 'Đã có trong ôn tập' : 'Thêm vào ôn tập'}">${inSrs ? '✓' : '＋'}</button></div>
      ${v.example ? `<div class="ex">${sayBtn(v.example)}<div><div>${esc(v.example)}</div><div class="muted small">${esc(v.exampleVi || '')}</div></div></div>` : ''}
    </div>`;
  }
  document.addEventListener('click', e => {
    const p = e.target.closest('[data-pron]');
    if (p) { pronModal(p.dataset.pron, p.dataset.vi); return; }
    const c = e.target.closest('[data-card]');
    if (c) {
      const v = C.vocab.get(c.dataset.card);
      if (v && !S().cards[c.dataset.card]) { addCards([v]); c.textContent = '✓'; c.title = 'Đã có trong ôn tập'; toast('Đã thêm vào ôn tập'); }
    }
  });

  /* ================= Trang chủ ================= */
  routes.home = () => {
    crumbs([['Tổng quan']]);
    const nx = nextLesson();
    const d = dueCards();
    const today = S().days[dayStr()] || 0;
    const pct = Math.min(100, Math.round(today / set().dailyGoal * 100));
    const totalLessons = orderedLessons().length;
    const doneLessons = orderedLessons().filter(x => lessonDone(x.lesson.id)).length;
    const learned = Object.values(S().cards).filter(c => c.state !== FSRS.NEW).length;
    // Bản đồ nhiệt 18 tuần
    const start = new Date(); start.setDate(start.getDate() - (17 * 7 + ((start.getDay() + 6) % 7)));
    let heat = '';
    for (let dt = new Date(start); dt <= new Date(); dt.setDate(dt.getDate() + 1)) {
      const x = S().days[dayStr(dt)] || 0;
      const lv = x === 0 ? '' : x < 20 ? 'l1' : x < 50 ? 'l2' : x < 100 ? 'l3' : 'l4';
      heat += `<i class="${lv}" title="${dayStr(dt)}: ${x} XP"></i>`;
    }
    const lvRows = CURRICULUM.levelKeys.map(lv => {
      const ls = orderedLessons().filter(x => x.unit.level === lv);
      const dn = ls.filter(x => lessonDone(x.lesson.id)).length;
      const have = unitsOf(lv).filter(u => C.units.has(u.id)).length;
      return `<a class="card hover" href="#/level/${lv}" style="display:block;color:inherit">
        <div class="row between"><div class="row"><span class="level-badge lv-${lv}" style="width:40px;height:40px;font-size:1rem">${lv}</span><b>${esc(CURRICULUM.levels[lv].name.split('–')[1] || lv)}</b></div>
        <span class="small muted">${dn}/${ls.length} bài · ${have}/${unitsOf(lv).length} unit</span></div>
        <div class="progress" style="margin-top:10px"><i style="width:${ls.length ? dn / ls.length * 100 : 0}%"></i></div></a>`;
    }).join('');
    view.innerHTML = `
      <div class="hero">
        <div class="card hero-main">
          <span class="eyebrow">Guten Tag! 👋</span>
          <h1 style="margin-top:14px">Học tiếng Đức<br>từ A1 đến C1</h1>
          <p class="muted">${nx ? `Bài tiếp theo: <b style="color:#fff">${esc(nx.lesson.title)}</b> · ${esc(nx.unit.level)} – ${esc(nx.unit.title)}` : 'Bạn đã học hết nội dung hiện có. Thêm unit mới ở mục Nội dung.'}</p>
          <div class="row" style="margin-top:18px">
            ${nx ? `<a class="btn lg" href="#/lesson/${nx.lesson.id}">▶ Học tiếp</a>` : `<a class="btn lg" href="#/content">Thêm nội dung</a>`}
            <a class="btn lg" href="#/review" style="background:rgba(255,255,255,.14);color:#fff;border-color:transparent">↻ Ôn tập · ${d.due.length + d.fresh.length}</a>
          </div>
        </div>
        <div class="card">
          <div class="row" style="gap:18px">
            <div class="ring" style="--p:${pct}"><div>${today}<small>/ ${set().dailyGoal} XP</small></div></div>
            <div class="stack">
              <div class="stat"><b>🔥 ${streak()}</b><span>ngày liên tiếp</span></div>
              <div class="stat"><b>${learned}</b><span>từ đã học · ${doneLessons}/${totalLessons} bài</span></div>
            </div>
          </div>
          <div class="label-up" style="margin:16px 0 6px">Hoạt động 18 tuần</div>
          <div class="heat">${heat}</div>
        </div>
      </div>
      <h2 style="margin-top:28px">Luyện kỹ năng</h2>
      <div class="grid g3">
        ${[['#/pron', '◉', 'Phòng phát âm', 'IPA, umlaut, cặp tối thiểu, chấm điểm giọng'], ['#/articles', '◐', 'der · die · das', 'Luyện giống danh từ có quy tắc gợi ý'], ['#/verbs', '⇄', 'Chia động từ', 'Präsens, Präteritum, Perfekt'],
           ['#/listen', '♪', 'Nghe – chép chính tả', 'Nghe giọng bản ngữ và gõ lại'], ['#/shadow', '◎', 'Shadowing', 'Nói đuổi theo giọng mẫu'], ['#/tutor', '✦', 'Gia sư AI', 'Hội thoại, chấm bài viết, hỏi ngữ pháp']]
          .map(([h, i, t, s], k) => `<a class="card tile hover${k === 5 ? ' dark' : ''}" href="${h}"><span class="ti">${i}</span><span><b>${t}</b><br><span class="small muted">${s}</span></span></a>`).join('')}
      </div>
      <h2 style="margin-top:28px">Tiến độ theo trình độ</h2>
      <div class="grid g2">${lvRows}</div>`;
  };

  /* ================= Lộ trình ================= */
  function unitCard(cu) {
    const u = C.units.get(cu.id);
    if (!u) return `<a class="card unit-card missing hover" href="#/unit/${cu.id}"><span class="num">Unit ${cu.order} · chưa có nội dung</span><h3>${esc(cu.title)}</h3><span class="small muted">${esc(cu.titleVi)}</span><span class="gram">${esc(cu.grammar)}</span></a>`;
    const ls = u.lessons;
    const dn = ls.filter(l => lessonDone(l.id)).length;
    return `<a class="card unit-card hover" href="#/unit/${u.id}"><span class="num">Unit ${cu.order} · ${ls.length} bài</span><h3>${esc(u.title)}</h3><span class="small muted">${esc(u.titleVi || cu.titleVi)}</span>
      <span class="gram">${esc(cu.grammar)}</span><div class="progress" style="margin-top:auto"><i style="width:${dn / ls.length * 100}%"></i></div>
      <span class="small ${dn === ls.length ? 'score-ok' : 'muted'}">${dn === ls.length ? '✓ Hoàn thành' : `${dn}/${ls.length} bài`}</span></a>`;
  }
  routes.path = () => {
    crumbs([['Lộ trình']]);
    view.innerHTML = `<span class="eyebrow">Khung CEFR · Goethe-Zertifikat</span><h1 style="margin-top:10px">Lộ trình A1 → C1</h1>
      <p class="muted">${CURRICULUM.units.length} unit · ${CURRICULUM.units.filter(u => C.units.has(u.id)).length} unit đã có nội dung. Mỗi trình độ kết thúc bằng bài kiểm tra tổng hợp.</p>` +
      CURRICULUM.levelKeys.map(lv => `<div class="level-block">
        <div class="level-head"><span class="level-badge lv-${lv}">${lv}</span><div><h2 style="margin:0">${esc(CURRICULUM.levels[lv].name)}</h2><div class="muted small">${esc(CURRICULUM.levels[lv].desc)}</div></div>
          <a class="btn sm" style="margin-left:auto" href="#/test/${lv}">Kiểm tra ${lv}</a></div>
        <div class="grid g3">${unitsOf(lv).map(unitCard).join('')}</div></div>`).join('');
  };
  routes.level = lv => {
    if (!CURRICULUM.levels[lv]) return routes.path();
    crumbs([['Lộ trình', '#/path'], [lv]]);
    view.innerHTML = `<div class="level-head"><span class="level-badge lv-${lv}">${lv}</span><div><h1 style="margin:0">${esc(CURRICULUM.levels[lv].name)}</h1><div class="muted">${esc(CURRICULUM.levels[lv].desc)}</div></div></div>
      <div class="row" style="margin-bottom:16px"><a class="btn primary" href="#/test/${lv}">Làm bài kiểm tra ${lv}</a></div>
      <div class="grid g3">${unitsOf(lv).map(unitCard).join('')}</div>`;
  };

  routes.unit = id => {
    const cu = CURRICULUM.byId(id), u = C.units.get(id);
    const lv = (u && u.level) || (cu && cu.level) || '';
    crumbs([['Lộ trình', '#/path'], [lv, '#/level/' + lv], [(u || cu || {}).title || id]]);
    if (!u) {
      view.innerHTML = `<div class="card"><span class="eyebrow">${esc(lv)} · Unit ${cu ? cu.order : ''}</span>
        <h1 style="margin-top:10px">${esc(cu ? cu.title : id)}</h1><p class="muted">${esc(cu ? cu.titleVi : '')}</p>
        <div class="notice warn">Unit này chưa có nội dung. Nội dung đang được soạn bằng ChatGPT & Gemini, Claude kiểm tra rồi đưa vào web. Bạn cũng có thể tự tạo ở mục <a href="#/content/${esc(id)}">Nội dung & Prompt</a>.</div>
        ${cu ? `<p style="margin-top:14px"><b>Chủ đề:</b> ${esc(cu.topics)}<br><b>Ngữ pháp:</b> ${esc(cu.grammar)}</p>` : ''}</div>`;
      return;
    }
    view.innerHTML = `<div class="card"><span class="eyebrow">${esc(u.level)} · Unit ${u.order}</span>
      <h1 style="margin-top:10px">${esc(u.title)}</h1><p class="muted">${esc(u.titleVi || '')}</p>
      ${u.goals && u.goals.length ? `<div class="label-up">Mục tiêu</div><ul>${u.goals.map(g => `<li>${esc(g)}</li>`).join('')}</ul>` : ''}
      <div class="row"><a class="btn primary" href="#/lesson/${u.lessons[0].id}">Bắt đầu</a><a class="btn" href="#/test/${u.id}">Kiểm tra cả unit</a></div></div>
      <div class="grid g2" style="margin-top:14px">${u.lessons.map((l, i) => {
        const r = S().lessons[l.id];
        return `<a class="card hover" href="#/lesson/${l.id}" style="color:inherit;display:block">
          <div class="label-up">Bài ${i + 1}</div><h3 style="margin:4px 0">${esc(l.title)}</h3><div class="muted small">${esc(l.titleVi || '')}</div>
          <div class="row small muted" style="margin-top:10px"><span>📚 ${(l.vocab || []).length} từ</span><span>✍️ ${(l.exercises || []).length} bài tập</span>${l.reading ? '<span>📖 Đọc</span>' : ''}${l.writing ? '<span>🖊 Viết</span>' : ''}
          ${r ? `<span class="pill ${r.best >= 60 ? 'ok' : 'warn'}" style="margin-left:auto">${r.best >= 60 ? '✓ ' : ''}${r.best}%</span>` : ''}</div></a>`;
      }).join('')}</div>`;
  };

  /* ================= Bài học ================= */
  let dialogToken = 0;
  async function playDialogue(lines, host) {
    const my = ++dialogToken;
    for (let i = 0; i < lines.length; i++) {
      if (my !== dialogToken) return;
      const el = $(`[data-line="${i}"]`, host);
      $$('.dialog-line', host).forEach(x => x.classList.remove('speaking'));
      if (el) { el.classList.add('speaking'); el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
      try { await Speech.speak(lines[i].de, { alt: lines[i].speaker === 'B' }); } catch (e) { toast(e.message); return; }
      await new Promise(r => setTimeout(r, 350));
    }
    $$('.dialog-line', host).forEach(x => x.classList.remove('speaking'));
  }

  routes.lesson = (id, tab) => {
    const hit = C.lessons.get(id);
    if (!hit) { view.innerHTML = '<div class="empty">Không tìm thấy bài học.</div>'; return; }
    const { lesson: l, unit: u } = hit;
    crumbs([['Lộ trình', '#/path'], [u.level, '#/level/' + u.level], [u.title, '#/unit/' + u.id], [l.title]]);
    const tabs = [['theory', 'Lý thuyết'], ['vocab', `Từ vựng (${(l.vocab || []).length})`]];
    if (l.dialogue && l.dialogue.length) tabs.push(['dialog', 'Hội thoại']);
    if (l.reading) tabs.push(['reading', 'Đọc hiểu']);
    if (l.writing) tabs.push(['writing', 'Viết']);
    tabs.push(['practice', 'Luyện tập']);
    const cur = tabs.find(t => t[0] === tab) ? tab : 'theory';
    const idx = u.lessons.findIndex(x => x.id === l.id);
    const prev = u.lessons[idx - 1], next = u.lessons[idx + 1];
    view.innerHTML = `<div class="row between" style="align-items:flex-start">
        <div><span class="eyebrow">${esc(u.level)} · ${esc(u.title)} · Bài ${idx + 1}/${u.lessons.length}</span>
        <h1 style="margin:10px 0 2px">${esc(l.title)}</h1><div class="muted">${esc(l.titleVi || '')}</div></div>
        <a class="btn primary lg" href="#/practice/${l.id}">✍️ Luyện tập</a></div>
      <div class="tabs" style="margin-top:18px">${tabs.map(([k, t]) => `<button data-tab="${k}" class="${k === cur ? 'active' : ''}">${t}</button>`).join('')}</div>
      <div id="lessonBody"></div>
      <div class="row between" style="margin-top:22px">
        ${prev ? `<a class="btn" href="#/lesson/${prev.id}">← ${esc(prev.title)}</a>` : '<span></span>'}
        ${next ? `<a class="btn" href="#/lesson/${next.id}">${esc(next.title)} →</a>` : `<a class="btn" href="#/unit/${u.id}">Về unit</a>`}</div>`;
    $$('[data-tab]').forEach(b => b.onclick = () => { history.replaceState(null, '', `#/lesson/${l.id}/${b.dataset.tab}`); route(); });
    const body = $('#lessonBody');
    if (cur === 'theory') body.innerHTML = `<div class="card md">${md(l.theory || '_Chưa có lý thuyết._')}</div>`;
    if (cur === 'vocab') {
      body.innerHTML = `<div class="row" style="margin-bottom:12px"><button class="btn" id="playAll">🔊 Nghe tất cả</button><button class="btn" id="addAll">＋ Thêm tất cả vào ôn tập</button>
        <label class="row small"><input type="checkbox" id="ipaT" ${set().showIpa ? 'checked' : ''}> Hiện IPA</label></div>
        <div class="vocab-list">${(l.vocab || []).map(vocabItem).join('')}</div>`;
      $('#addAll').onclick = () => { const n = addCards(l.vocab || []); toast(n ? `Đã thêm ${n} từ vào ôn tập` : 'Tất cả từ đã có trong ôn tập'); route(); };
      $('#ipaT').onchange = e => { set().showIpa = e.target.checked; Store.save(); route(); };
      $('#playAll').onclick = async () => {
        const my = ++dialogToken;
        for (const v of l.vocab || []) { if (my !== dialogToken) return; await Speech.speak((v.article ? v.article + ' ' : '') + v.de).catch(() => {}); await new Promise(r => setTimeout(r, 450)); }
      };
    }
    if (cur === 'dialog') {
      body.innerHTML = `<div class="card"><div class="row" style="margin-bottom:10px"><button class="btn primary" id="playD">▶ Phát cả hội thoại</button><button class="btn" id="stopD">■ Dừng</button>
        <label class="row small"><input type="checkbox" id="viT" ${set().showVi ? 'checked' : ''}> Hiện bản dịch</label></div>
        <div id="dlg">${l.dialogue.map((d, i) => `<div class="dialog-line ${d.speaker === 'B' ? 'b' : ''}" data-line="${i}">
          <span class="sp" title="${esc(d.name || d.speaker)}">${esc((d.name || d.speaker || '?').slice(0, 2))}</span>
          <div style="flex:1"><div class="de">${d.name ? `<span class="small muted">${esc(d.name)}: </span>` : ''}${esc(d.de)}</div>${set().showVi ? `<div class="vi">${esc(d.vi)}</div>` : ''}</div>
          ${sayBtn(d.de, false, d.speaker === 'B')}<button class="say-btn" data-pron="${esc(d.de)}" data-vi="${esc(d.vi)}" title="Luyện nói câu này">🎤</button></div>`).join('')}</div></div>`;
      $('#playD').onclick = () => playDialogue(l.dialogue, $('#dlg'));
      $('#stopD').onclick = () => { dialogToken++; Speech.stop(); };
      $('#viT').onchange = e => { set().showVi = e.target.checked; Store.save(); route(); };
    }
    if (cur === 'reading') renderReading(body, l.reading);
    if (cur === 'writing') renderWriting(body, l.writing, u.level);
    if (cur === 'practice') {
      const ex = l.exercises || [];
      const r = S().lessons[l.id];
      body.innerHTML = `<div class="card"><h2>Luyện tập</h2><p class="muted">${ex.length} bài tập: trắc nghiệm, điền từ, sắp xếp câu, dịch, nghe – chép, luyện nói, nối từ. Câu sai sẽ được hỏi lại ở cuối.</p>
        ${r ? `<p>Kết quả tốt nhất: <b>${r.best}%</b> · ${r.tries} lần</p>` : ''}<a class="btn primary lg" href="#/practice/${l.id}">Bắt đầu</a></div>`;
    }
  };

  function splitSentences(text) { return String(text).match(/[^.!?…]+[.!?…]+["“”«»]?|[^.!?…]+$/g) || [text]; }
  function renderReading(body, r) {
    const paras = String(r.text || '').split(/\n\s*\n|\n/).filter(Boolean);
    body.innerHTML = `<div class="card"><div class="row between"><h2 style="margin:0">${esc(r.title || 'Đọc hiểu')}</h2><div class="row"><button class="btn sm" id="rdAll">▶ Nghe cả bài</button><button class="btn sm" id="rdVi">Bản dịch</button></div></div>
      <p class="small muted">Bấm vào câu bất kỳ để nghe.</p>
      <div id="rdText" style="font-size:1.08rem;line-height:1.9">${paras.map(p => `<p>${splitSentences(p).map(s => `<span class="say" style="font-weight:500;border-bottom-style:none" data-say="${esc(s.trim())}">${esc(s)}</span>`).join(' ')}</p>`).join('')}</div>
      <div id="rdViBox" hidden class="notice" style="margin-top:10px">${md(r.vi || '')}</div>
      ${r.glossary && r.glossary.length ? `<div class="label-up" style="margin-top:14px">Từ khó</div><div class="vocab-list">${r.glossary.map(vocabItem).join('')}</div>` : ''}</div>
      ${(r.questions || []).length ? `<div class="card"><h3>Câu hỏi</h3>${r.questions.map((q, i) => `<div style="margin-bottom:16px" data-q="${i}"><div style="font-weight:600;margin-bottom:6px">${i + 1}. ${inl(q.q)}</div><div class="options">${q.options.map((o, k) => `<button class="opt" data-k="${k}">${inl(o)}</button>`).join('')}</div></div>`).join('')}</div>` : ''}`;
    $('#rdVi').onclick = () => { const b = $('#rdViBox'); b.hidden = !b.hidden; };
    $('#rdAll').onclick = async () => { const my = ++dialogToken; for (const s of $$('#rdText [data-say]')) { if (my !== dialogToken) return; s.style.background = 'var(--primary-soft)'; await Speech.speak(s.dataset.say).catch(() => {}); s.style.background = ''; } };
    $$('[data-q]', body).forEach(box => {
      const q = r.questions[+box.dataset.q];
      $$('.opt', box).forEach(b => b.onclick = () => {
        if (box.dataset.done) return; box.dataset.done = 1;
        const k = +b.dataset.k;
        b.classList.add(k === q.answer ? 'right' : 'wrong');
        $$('.opt', box)[q.answer].classList.add('right');
        beep(k === q.answer); if (k === q.answer) addXp(5);
      });
    });
  }
  function renderWriting(body, w, level) {
    body.innerHTML = `<div class="card"><h2>Bài viết</h2><div class="notice">${md(w.task || '')}</div>
      <textarea class="input" id="wrText" style="min-height:200px;margin-top:12px" placeholder="Viết bài của bạn bằng tiếng Đức…"></textarea>${umlautBar()}
      <div class="row between" style="margin-top:10px"><span class="small muted" id="wc">0 từ${w.minWords ? ' / tối thiểu ' + w.minWords : ''}</span>
      <div class="row">${w.sample ? '<button class="btn" id="wrSample">Xem bài mẫu</button>' : ''}<button class="btn primary" id="wrGrade">✦ Chấm bằng AI</button></div></div>
      <div id="wrOut" style="margin-top:14px"></div></div>`;
    const ta = $('#wrText');
    try { ta.value = localStorage.getItem('dw.draft.' + (w.task || '').slice(0, 40)) || ''; } catch (e) { /* */ }
    const wc = () => { const n = (ta.value.match(/\S+/g) || []).length; $('#wc').textContent = `${n} từ${w.minWords ? ' / tối thiểu ' + w.minWords : ''}`; try { localStorage.setItem('dw.draft.' + (w.task || '').slice(0, 40), ta.value); } catch (e) { /* */ } };
    ta.oninput = wc; wc();
    if (w.sample) $('#wrSample').onclick = () => { $('#wrOut').innerHTML = `<div class="notice"><b>Bài mẫu</b> ${sayBtn(w.sample)}<p style="margin-top:6px">${esc(w.sample)}</p></div>`; };
    $('#wrGrade').onclick = async () => {
      if (!AI.ready()) { $('#wrOut').innerHTML = `<div class="notice warn">Cần API key Gemini/OpenAI để chấm bài. Vào <a href="#/settings">Cài đặt</a>.</div>`; return; }
      if (ta.value.trim().length < 5) return toast('Hãy viết bài trước');
      $('#wrOut').innerHTML = '<div class="muted">Đang chấm…</div>';
      try { const r = await AI.chat([{ role: 'user', content: `Đề bài: ${w.task}\n\nBài làm của học viên:\n${ta.value}` }], AI.SYSTEM.write(level)); $('#wrOut').innerHTML = `<div class="card md">${md(r)}</div>`; addXp(15); }
      catch (e) { $('#wrOut').innerHTML = `<div class="notice bad">${esc(e.message)}</div>`; }
    };
  }

  /* ================= Bài tập ================= */
  const normEq = (a, b) => {
    const n = s => String(s).trim().replace(/[„“”"«»]/g, '"').replace(/\s+/g, ' ').replace(/[.!?,;:]+$/, '').toLowerCase();
    return n(a) === n(b) ? 2 : Speech.fold(n(a)) === Speech.fold(n(b)) ? 1 : 0;
  };
  function gradeFree(input, answers) {
    let best = null;
    for (const a of answers) { const r = Speech.align(a, input); if (!best || r.score > best.score) best = { ...r, ans: a }; }
    const exact = best.words.every(w => w.st === 'ok') && !best.extra.length;
    const close = !exact && best.words.every(w => w.st !== 'miss') && !best.extra.length;
    return { ok: exact || close, close, best };
  }
  function diffHtml(best) {
    return `<div class="diff">${best.words.map(w => `<span class="${w.st === 'ok' ? 'w-ok' : w.st === 'close' ? 'w-close' : 'w-miss'}" title="${w.got ? 'bạn viết: ' + esc(w.got) : 'thiếu'}">${esc(w.w)}</span>`).join(' ')}${best.extra.length ? ' ' + best.extra.map(x => `<span class="w-bad">${esc(x)}</span>`).join(' ') : ''}</div>`;
  }
  const TYPE_LABEL = { mcq: 'Chọn đáp án đúng', gap: 'Điền vào chỗ trống', order: 'Sắp xếp thành câu', translate: 'Dịch sang tiếng Đức', listen: 'Nghe và viết lại', speak: 'Đọc to câu sau', match: 'Nối cặp tương ứng', article: 'Chọn mạo từ đúng' };

  /** Vẽ một bài tập. api: { setReady(bool), submit() }. Trả về { check() → {ok, close, skip, answer, say, explain} } */
  function renderExercise(x, host, api) {
    const head = `${x._ctx ? `<div class="notice md" style="margin-bottom:14px;max-height:320px;overflow:auto">${md(x._ctx)}</div>` : ''}${x._audio ? `<div class="row notice" style="margin-bottom:14px">${sayBtns(x._audio)}<span class="small">Nghe bài nghe (có thể nghe lại)</span></div>` : ''}<div class="ex-type">${TYPE_LABEL[x.type] || x.type}</div>`;
    if (x.type === 'mcq') {
      const order = x._order || (x._order = shuffle(x.options.map((_, i) => i)));
      host.innerHTML = head + `<div class="ex-q">${inl(x.q)}</div><div class="options">${order.map((k, i) => `<button class="opt" data-k="${k}"><span class="kbd">${i + 1}</span> ${inl(x.options[k])}</button>`).join('')}</div>`;
      let sel = null;
      const choose = b => { $$('.opt', host).forEach(o => o.classList.remove('sel')); b.classList.add('sel'); sel = +b.dataset.k; api.setReady(true); };
      $$('.opt', host).forEach(b => b.onclick = () => { if (!host.dataset.locked) choose(b); });
      host._key = e => { const n = +e.key; if (n >= 1 && n <= order.length && !host.dataset.locked) choose($$('.opt', host)[n - 1]); };
      return { check: () => {
        host.dataset.locked = 1;
        $$('.opt', host).forEach(o => { if (+o.dataset.k === x.answer) o.classList.add('right'); else if (+o.dataset.k === sel) o.classList.add('wrong'); });
        return { ok: sel === x.answer, answer: x.options[x.answer], explain: x.explain, say: /[äöüßÄÖÜ]|\b(der|die|das|ich|du|ist|und)\b/.test(x.options[x.answer]) ? x.options[x.answer] : '' };
      } };
    }
    if (x.type === 'gap') {
      const parts = String(x.text).split('___');
      host.innerHTML = head + `<div class="gap-text">${parts.map((p, i) => esc(p) + (i < parts.length - 1 ? `<input class="gap-input" data-i="${i}" autocomplete="off" autocapitalize="off" spellcheck="false" style="width:${Math.max(5, (x.answers[i] || '').split('|')[0].length + 3)}ch">` : '')).join('')}</div>
        ${x.hint ? `<div class="small muted">Gợi ý: ${esc(x.hint)}</div>` : ''}${x.vi ? `<div class="small muted">${esc(x.vi)}</div>` : ''}${umlautBar()}`;
      const ins = $$('.gap-input', host);
      const upd = () => api.setReady(ins.every(i => i.value.trim()));
      ins.forEach(i => i.oninput = upd);
      setTimeout(() => ins[0] && ins[0].focus(), 50);
      return { check: () => {
        let all = true, fold = false;
        ins.forEach((inp, i) => {
          const alts = String(x.answers[i] || '').split('|');
          const m = Math.max(...alts.map(a => normEq(a, inp.value)));
          if (m === 1) fold = true;
          inp.classList.add(m ? 'right' : 'wrong'); if (!m) all = false;
          inp.disabled = true;
        });
        const full = parts.map((p, i) => p + (i < parts.length - 1 ? String(x.answers[i]).split('|')[0] : '')).join('');
        return { ok: all, close: all && fold, closeMsg: 'Nên gõ đúng ä/ö/ü/ß thay vì ae/oe/ue/ss.', answer: full, explain: x.explain, say: full };
      } };
    }
    if (x.type === 'order') {
      const words = x._pool || (x._pool = shuffle(x.words.map((w, i) => ({ w, i }))));
      const placed = [];
      host.innerHTML = head + `${x.vi ? `<div class="ex-q">${esc(x.vi)}</div>` : ''}<div class="tiles answer" id="ansRow"></div><div class="tiles" id="poolRow"></div>`;
      const draw = () => {
        $('#ansRow', host).innerHTML = placed.map(i => `<button class="tile-w" data-p="${i}">${esc(x.words[i])}</button>`).join('');
        $('#poolRow', host).innerHTML = words.map(o => `<button class="tile-w ${placed.includes(o.i) ? 'used' : ''}" data-w="${o.i}">${esc(o.w)}</button>`).join('');
        $$('[data-w]', host).forEach(b => b.onclick = () => { if (host.dataset.locked) return; placed.push(+b.dataset.w); draw(); });
        $$('[data-p]', host).forEach(b => b.onclick = () => { if (host.dataset.locked) return; placed.splice(placed.indexOf(+b.dataset.p), 1); draw(); });
        api.setReady(placed.length === x.words.length);
      };
      draw();
      return { check: () => {
        host.dataset.locked = 1;
        const got = Speech.tokens(placed.map(i => x.words[i]).join(' ')).join(' ');
        const ok = [x.answer, ...(x.answers || [])].some(a => Speech.tokens(a).join(' ') === got);
        return { ok, answer: x.answer, say: x.answer, explain: x.explain };
      } };
    }
    if (x.type === 'translate' || x.type === 'listen') {
      const isL = x.type === 'listen';
      const answers = isL ? [x.de] : x.answers;
      host.innerHTML = head + (isL
        ? `<div class="row" style="margin-bottom:14px">${sayBtn(x.de)}${sayBtn(x.de, true)}<span class="muted small">Nghe (có thể nghe lại nhiều lần) rồi gõ lại câu tiếng Đức</span></div>`
        : `<div class="ex-q">${esc(x.vi)}</div>`) +
        `<textarea class="input" rows="2" placeholder="Gõ câu tiếng Đức…" autocomplete="off" spellcheck="false"></textarea>${umlautBar()}`;
      const ta = $('textarea', host);
      ta.oninput = () => api.setReady(!!ta.value.trim());
      setTimeout(() => ta.focus(), 50);
      if (isL && set().autoplay) setTimeout(() => Speech.speak(x.de).catch(() => {}), 250);
      let aiBox = null;
      return { check: () => {
        ta.disabled = true;
        const g = gradeFree(ta.value, answers);
        const extra = !isL && !g.ok && AI.ready() ? `<button class="btn sm" data-aicheck>✦ Hỏi AI: câu của tôi có đúng không?</button><div class="aibox small" style="margin-top:6px"></div>` : '';
        setTimeout(() => {
          const b = $('[data-aicheck]', host.parentElement);
          if (b) b.onclick = async () => {
            aiBox = $('.aibox', host.parentElement); aiBox.textContent = 'Đang hỏi AI…';
            try { aiBox.innerHTML = md(await AI.chat([{ role: 'user', content: `Câu tiếng Việt: ${x.vi}\nĐáp án mẫu: ${answers.join(' / ')}\nBản dịch của học viên: ${ta.value}` }], AI.SYSTEM.check())); }
            catch (e) { aiBox.textContent = e.message; }
          };
        }, 0);
        return { ok: g.ok, close: g.close, closeMsg: 'Gần đúng – chú ý chính tả.', answer: g.best.ans, say: g.best.ans, html: diffHtml(g.best) + extra, explain: x.explain || (isL ? x.vi : '') };
      } };
    }
    if (x.type === 'speak') {
      host.innerHTML = head + `<div class="big-de" style="margin-bottom:4px">${esc(x.de)}</div>${x.vi ? `<div class="muted" style="margin-bottom:14px">${esc(x.vi)}</div>` : ''}<div id="pw"></div>`;
      let last = null;
      pronWidget($('#pw', host), x.de, r => { last = r; api.setReady(true); });
      return { check: () => last ? { ok: last.score >= 70, answer: x.de, say: '', explain: last.score >= 70 ? '' : 'Cần đạt từ 70 điểm. Nghe mẫu và thử lại ở lần ôn sau.' } : { skip: true } };
    }
    if (x.type === 'match') {
      const left = shuffle(x.pairs.map((p, i) => ({ t: p[0], i }))), right = shuffle(x.pairs.map((p, i) => ({ t: p[1], i })));
      host.innerHTML = head + `<div class="match-grid"><div class="match-col">${left.map(o => `<button class="match-btn" data-l="${o.i}">${esc(o.t)}</button>`).join('')}</div>
        <div class="match-col">${right.map(o => `<button class="match-btn" data-r="${o.i}">${esc(o.t)}</button>`).join('')}</div></div>`;
      let selL = null, selR = null, done = 0, errs = 0;
      const tryPair = () => {
        if (selL === null || selR === null) return;
        const bl = $(`[data-l="${selL}"]`, host), br = $(`[data-r="${selR}"]`, host);
        if (selL === selR) {
          bl.className = br.className = 'match-btn done'; bl.disabled = br.disabled = true; done++;
          Speech.speak(x.pairs[selL][0]).catch(() => {});
          if (done === x.pairs.length) { api.setReady(true); setTimeout(() => api.submit(), 300); }
        } else {
          errs++; bl.classList.add('err'); br.classList.add('err'); beep(false);
          setTimeout(() => { bl.classList.remove('err', 'sel'); br.classList.remove('err', 'sel'); }, 450);
        }
        selL = selR = null;
      };
      $$('[data-l]', host).forEach(b => b.onclick = () => { $$('[data-l]', host).forEach(o => o.classList.remove('sel')); b.classList.add('sel'); selL = +b.dataset.l; tryPair(); });
      $$('[data-r]', host).forEach(b => b.onclick = () => { $$('[data-r]', host).forEach(o => o.classList.remove('sel')); b.classList.add('sel'); selR = +b.dataset.r; tryPair(); });
      return { check: () => ({ ok: errs <= 1, answer: '', explain: errs ? `Bạn nối sai ${errs} lần.` : '' }) };
    }
    if (x.type === 'article') {
      host.innerHTML = head + `<div class="big-de" style="text-align:center;margin:18px 0 4px">___ ${esc(x.word)}</div><div class="muted" style="text-align:center;margin-bottom:18px">${esc(x.vi || '')}</div>
        <div class="grid g3">${['der', 'die', 'das'].map(a => `<button class="btn lg art-${a}" data-a="${a}" style="font-size:1.2rem">${a}</button>`).join('')}</div>`;
      let sel = null;
      $$('[data-a]', host).forEach(b => b.onclick = () => { if (host.dataset.locked) return; sel = b.dataset.a; $$('[data-a]', host).forEach(o => o.style.outline = ''); b.style.outline = '3px solid currentColor'; api.setReady(true); api.submit(); });
      return { check: () => { host.dataset.locked = 1; return { ok: sel === x.answer, answer: `${x.answer} ${x.word}`, say: `${x.answer} ${x.word}`, explain: articleHint(x.word, x.answer) }; } };
    }
    host.innerHTML = `<div class="notice warn">Loại bài tập không hỗ trợ: ${esc(x.type)}</div>`;
    return { check: () => ({ skip: true }) };
  }

  /* Gợi ý quy tắc giống danh từ */
  const ART_RULES = [
    [/(ung|heit|keit|schaft|ion|tät|ik|ur|ei|enz|anz|ie|in)$/i, 'die', 'Đuôi -ung, -heit, -keit, -schaft, -ion, -tät, -ik, -ur, -ei, -enz, -anz, -ie, -in → hầu như luôn là die.'],
    [/(chen|lein|ment|um|ma|tum|nis)$/i, 'das', 'Đuôi -chen, -lein (luôn das); -ment, -um, -ma, -tum, -nis → phần lớn là das.'],
    [/(ling|ismus|or|ist|ant|ig|ich|ent|eur)$/i, 'der', 'Đuôi -ling, -ismus, -or, -ist, -ant, -ig, -ich, -ent, -eur → thường là der.'],
    [/^ge/i, 'das', 'Danh từ tập hợp bắt đầu bằng Ge- thường là das (das Gebäude, das Gemüse).'],
    [/e$/i, 'die', 'Khoảng 90% danh từ tận cùng bằng -e là die (ngoại lệ: der Junge, der Name, das Auge, der Käse…).'],
    [/er$/i, 'der', 'Danh từ chỉ người/dụng cụ tận cùng -er thường là der (der Lehrer, der Computer).'],
  ];
  function articleHint(word, art) {
    for (const [re, a, txt] of ART_RULES) if (re.test(word)) return a === art ? '📐 ' + txt : `⚠️ Ngoại lệ! ${txt} Nhưng „${word}“ là ${art}.`;
    return 'Không có quy tắc chắc chắn – hãy học kèm mạo từ (mẹo: nhớ theo màu xanh = der, đỏ = die, lục = das).';
  }

  /** Chạy một phiên bài tập */
  function runSession({ items, back, title, onDone }) {
    const queue = items.map(x => ({ ...x }));
    let pos = 0, firstTotal = 0, firstOk = 0, xp = 0, checked = false, cur = null;
    view.innerHTML = `<div class="session"><div class="session-top"><a class="icon-btn" href="${back}" title="Thoát">✕</a><div class="progress"><i id="sBar" style="width:0"></i></div><span class="small muted" id="sCount"></span></div>
      ${title ? `<div class="label-up" style="margin-bottom:8px">${esc(title)}</div>` : ''}
      <div class="card ex-card"><div id="exHost"></div><div id="fb"></div></div>
      <div class="session-foot"><button class="btn ghost" id="skipBtn">Bỏ qua</button><button class="btn primary lg" id="checkBtn" disabled>Kiểm tra</button></div></div>`;
    const host = $('#exHost'), fb = $('#fb'), btn = $('#checkBtn');
    function show() {
      if (pos >= queue.length) return finish();
      checked = false; fb.innerHTML = ''; host.dataset.locked = ''; host._key = null;
      btn.textContent = 'Kiểm tra'; btn.disabled = true; btn.className = 'btn primary lg';
      $('#sBar').style.width = (pos / queue.length * 100) + '%';
      $('#sCount').textContent = `${pos + 1}/${queue.length}`;
      cur = renderExercise(queue[pos], host, { setReady: v => { if (!checked) btn.disabled = !v; }, submit: () => doCheck() });
    }
    function doCheck() {
      if (checked) { pos++; return show(); }
      const r = cur.check();
      if (!r) return;
      const item = queue[pos];
      if (r.skip) { pos++; return show(); }
      checked = true;
      if (!item._retry) { firstTotal++; if (r.ok) { firstOk++; xp += 10; } }
      if (!r.ok && !item._retry && item.type !== 'speak') queue.push({ ...item, _retry: true, _order: null, _pool: null });
      beep(r.ok);
      fb.innerHTML = `<div class="feedback ${r.ok ? 'ok' : 'bad'}"><b>${r.ok ? (r.close ? '✓ Gần đúng! ' + esc(r.closeMsg || '') : pick(['✓ Chính xác!', '✓ Tuyệt vời!', '✓ Sehr gut!', '✓ Richtig!'])) : '✗ Chưa đúng'}</b>
        <div class="fb-body">${r.html || ''}${r.answer && (!r.ok || r.close) ? `<div class="row" style="margin-top:6px">Đáp án: <b>${esc(r.answer)}</b> ${sayBtn(r.say)}</div>` : (r.say ? `<div class="row" style="margin-top:6px">${sayBtn(r.say)}<span class="small">${esc(r.say)}</span></div>` : '')}${r.explain ? `<div style="margin-top:6px">${inl(r.explain)}</div>` : ''}</div></div>`;
      btn.textContent = 'Tiếp tục'; btn.disabled = false; btn.className = 'btn lg ' + (r.ok ? 'ok' : 'bad');
      if (r.say && set().autoplay && item.type !== 'listen') Speech.speak(r.say).catch(() => {});
      btn.focus();
    }
    function finish() {
      const score = firstTotal ? Math.round(firstOk / firstTotal * 100) : 100;
      const bonus = score >= 80 ? 20 : score >= 60 ? 10 : 0;
      addXp(xp + bonus);
      const extra = onDone ? onDone(score) : '';
      if (score >= 80) confetti();
      view.innerHTML = `<div class="session"><div class="card" style="text-align:center;padding:36px">
        <div class="score-big ${scoreClass(score)}" style="font-size:4rem">${score}%</div>
        <h2>${score >= 90 ? 'Xuất sắc! 🌟' : score >= 80 ? 'Rất tốt! 🎉' : score >= 60 ? 'Đạt rồi! 👍' : 'Cố lên, làm lại nhé! 💪'}</h2>
        <p class="muted">Đúng ngay lần đầu ${firstOk}/${firstTotal} · +${xp + bonus} XP</p>${extra || ''}
        <div class="row" style="justify-content:center;margin-top:16px"><button class="btn" id="again">↻ Làm lại</button><a class="btn primary" href="${back}">Tiếp tục</a></div></div></div>`;
      $('#again').onclick = () => runSession({ items, back, title, onDone });
    }
    $('#skipBtn').onclick = () => { if (!checked) { pos++; show(); } };
    btn.onclick = doCheck;
    keyHandler = e => {
      if (host._key && !checked && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) host._key(e);
      if (e.key === 'Enter' && !e.shiftKey) {
        if (document.activeElement && document.activeElement.tagName === 'TEXTAREA') e.preventDefault();
        if (!btn.disabled) doCheck();
      }
    };
    show();
  }

  routes.practice = id => {
    const hit = C.lessons.get(id);
    if (!hit) return routes.home();
    const { lesson: l, unit: u } = hit;
    crumbs([['Lộ trình', '#/path'], [u.title, '#/unit/' + u.id], [l.title, '#/lesson/' + l.id], ['Luyện tập']]);
    const items = [...(l.exercises || [])];
    // Bổ sung bài mạo từ tự động từ danh từ trong bài
    const nouns = shuffle((l.vocab || []).filter(v => v.article)).slice(0, 3);
    nouns.forEach(v => items.push({ type: 'article', word: v.de, answer: v.article, vi: v.vi }));
    if (!items.length) { view.innerHTML = '<div class="empty">Bài này chưa có bài tập.</div>'; return; }
    runSession({
      items, back: '#/lesson/' + l.id, title: `${u.level} · ${l.title}`,
      onDone: score => {
        const r = S().lessons[l.id] || { best: 0, tries: 0 };
        r.best = Math.max(r.best, score); r.tries++; r.date = Date.now();
        S().lessons[l.id] = r; Store.save();
        if (score >= 60) {
          const n = addCards(l.vocab || []);
          const nx = nextLesson();
          return `${n ? `<p>📚 Đã thêm <b>${n}</b> từ mới vào ôn tập (FSRS).</p>` : ''}${nx ? `<p><a href="#/lesson/${nx.lesson.id}">Bài tiếp theo: ${esc(nx.lesson.title)} →</a></p>` : ''}`;
        }
        return '<p class="muted">Cần đạt 60% để hoàn thành bài.</p>';
      },
    });
  };

  routes.test = key => {
    let pool = [], title, back;
    if (CURRICULUM.levels[key]) {
      title = 'Bài kiểm tra ' + key; back = '#/level/' + key;
      for (const u of C.units.values()) if (u.level === key) for (const l of u.lessons) pool.push(...(l.exercises || []));
    } else {
      const u = C.units.get(key);
      if (!u) return routes.path();
      title = 'Kiểm tra: ' + u.title; back = '#/unit/' + u.id;
      for (const l of u.lessons) pool.push(...(l.exercises || []));
    }
    crumbs([['Lộ trình', '#/path'], [title]]);
    pool = pool.filter(x => ['mcq', 'gap', 'order', 'translate', 'listen'].includes(x.type));
    if (!pool.length) { view.innerHTML = '<div class="empty">Chưa có nội dung để kiểm tra trình độ này.</div>'; return; }
    runSession({ items: shuffle(pool).slice(0, 25), back, title, onDone: s => `<p>${s >= 80 ? 'Bạn nắm vững nội dung này.' : s >= 60 ? 'Khá ổn – ôn lại các bài sai.' : 'Nên học lại các bài trong phần này.'}</p>` });
  };

  /* ================= Ôn tập FSRS ================= */
  routes.review = () => {
    crumbs([['Ôn tập']]);
    const mode = sessionStorage.getItem('dw.revmode') || 'recog';
    const d = dueCards();
    let queue = [...d.due, ...d.fresh];
    const all = Object.values(S().cards);
    const learned = all.filter(c => c.state !== FSRS.NEW).length, mature = all.filter(c => c.s > 21).length;
    if (!queue.length) {
      const avail = orderedLessons().filter(x => lessonDone(x.lesson.id)).flatMap(x => x.lesson.vocab || []).filter(v => !S().cards[cardKey(v)]).length;
      view.innerHTML = `<div class="card" style="text-align:center;padding:40px"><div style="font-size:3rem">✨</div><h2>Không còn thẻ nào cần ôn hôm nay</h2>
        <p class="muted">Tổng ${all.length} thẻ · ${learned} đã học · ${mature} thẻ nhớ lâu (&gt; 21 ngày) · ${d.freshTotal} thẻ mới đang chờ (giới hạn ${set().newPerDay}/ngày)</p>
        <div class="row" style="justify-content:center">${avail ? `<button class="btn" id="addDone">＋ Thêm ${avail} từ của các bài đã học</button>` : ''}
        ${d.freshTotal ? '<button class="btn" id="moreNew">Học thêm 10 thẻ mới hôm nay</button>' : ''}<a class="btn primary" href="#/path">Học bài mới</a></div></div>`;
      const ad = $('#addDone'); if (ad) ad.onclick = () => { addCards(orderedLessons().filter(x => lessonDone(x.lesson.id)).flatMap(x => x.lesson.vocab || [])); route(); };
      const mn = $('#moreNew'); if (mn) mn.onclick = () => { S().newToday = { date: dayStr(), n: (S().newToday.date === dayStr() ? S().newToday.n : 0) - 10 }; Store.save(); route(); };
      return;
    }
    let i = 0, revealed = false, done = 0;
    view.innerHTML = `<div class="flash"><div class="row between" style="margin-bottom:12px">
        <div class="tabs" style="margin:0"><button data-m="recog" class="${mode === 'recog' ? 'active' : ''}">Đức → Việt</button><button data-m="type" class="${mode === 'type' ? 'active' : ''}">Việt → Đức (gõ)</button></div>
        <span class="small muted" id="rvCount"></span></div>
      <div class="card flash-card" id="fc"></div><div id="rateBox"></div>
      <p class="small muted" style="text-align:center;margin-top:12px">Phím tắt: <span class="kbd">Space</span> lật thẻ · <span class="kbd">1</span>–<span class="kbd">4</span> đánh giá</p></div>`;
    $$('[data-m]').forEach(b => b.onclick = () => { sessionStorage.setItem('dw.revmode', b.dataset.m); route(); });
    const fc = $('#fc'), rb = $('#rateBox');
    let typedGrade = 0;
    function show() {
      if (i >= queue.length) { updateBadges(); view.innerHTML = `<div class="card" style="text-align:center;padding:40px"><div style="font-size:3rem">🎉</div><h2>Xong phiên ôn tập!</h2><p class="muted">Đã ôn ${done} thẻ.</p><a class="btn primary" href="#/home">Về trang chủ</a></div>`; confetti(); return; }
      revealed = false; typedGrade = 0; rb.innerHTML = '';
      const k = queue[i], v = C.vocab.get(k), c = S().cards[k];
      $('#rvCount').textContent = `${queue.length - i} thẻ còn lại · ${c.state === FSRS.NEW ? 'mới' : c.state === FSRS.REVIEW ? 'ôn' : 'đang học'}`;
      const full = (v.article ? v.article + ' ' : '') + v.de;
      if (mode === 'type') {
        fc.innerHTML = `<div class="muted small">${esc(v.pos || '')}${v.article ? ' · danh từ (nhớ mạo từ!)' : ''}</div><div class="front" style="font-size:1.6rem">${esc(v.vi)}</div>
          <input class="input" id="tAns" style="max-width:360px;text-align:center;font-size:1.2rem" placeholder="Gõ từ tiếng Đức…" autocomplete="off" spellcheck="false">${umlautBar()}<div id="tRes"></div>`;
        fc.style.cursor = 'default';
        const inp = $('#tAns'); setTimeout(() => inp.focus(), 50);
        fc.onclick = null;
        inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); if (!revealed) reveal(); } };
      } else {
        fc.style.cursor = 'pointer';
        fc.innerHTML = `<div class="front">${nounLabel(v)}</div>${set().showIpa && v.ipa ? `<div class="ipa">[${esc(v.ipa)}]</div>` : ''}<div class="muted small" id="flipHint">Bấm hoặc nhấn Space để xem nghĩa</div>`;
        fc.onclick = e => { if (!e.target.closest('[data-say]') && !revealed) reveal(); };
        if (set().autoplay) Speech.speak(full).catch(() => {});
      }
    }
    function reveal() {
      revealed = true;
      const hint = $('#flipHint'); if (hint) hint.remove();
      const k = queue[i], v = C.vocab.get(k), c = S().cards[k];
      const full = (v.article ? v.article + ' ' : '') + v.de;
      if (mode === 'type') {
        const val = $('#tAns').value;
        const g = gradeFree(val, [full]);
        typedGrade = g.ok && !g.close ? 3 : g.ok ? 2 : 1;
        $('#tAns').disabled = true;
        $('#tRes').innerHTML = `<div class="feedback ${g.ok ? 'ok' : 'bad'}" style="margin-top:10px">${g.ok ? '✓' : '✗'} ${diffHtml(g.best)}</div>`;
        Speech.speak(full).catch(() => {});
      }
      fc.insertAdjacentHTML('beforeend', `<hr style="width:100%"><div class="big-de">${nounLabel(v)}${plural(v)} ${sayBtns(full)}</div>
        ${set().showIpa && v.ipa ? `<div class="ipa">[${esc(v.ipa)}]</div>` : ''}<div style="font-size:1.15rem;font-weight:600">${esc(v.vi)}</div>
        ${v.forms ? `<div class="small muted">⇄ ${esc(v.forms)}</div>` : ''}
        ${v.example ? `<div class="row" style="justify-content:center">${sayBtn(v.example)}<span>${esc(v.example)}</span></div><div class="small muted">${esc(v.exampleVi || '')}</div>` : ''}`);
      const pv = FSRS.preview(c, Date.now(), set().retention);
      rb.innerHTML = `<div class="rate">${[[1, 'Quên', 'r1'], [2, 'Khó', 'r2'], [3, 'Nhớ', 'r3'], [4, 'Dễ', 'r4']].map(([g, t, cl]) =>
        `<button class="btn ${cl}" data-g="${g}" ${typedGrade === g ? 'style="box-shadow:0 0 0 3px currentColor"' : ''}><span>${g} · ${t}</span><small>${FSRS.fmt(pv[g])}</small></button>`).join('')}</div>`;
      $$('[data-g]', rb).forEach(b => b.onclick = () => rate(+b.dataset.g));
    }
    function rate(g) {
      const k = queue[i], c = S().cards[k], now = Date.now();
      const wasNew = c.state === FSRS.NEW;
      const pv = FSRS.preview(c, now, set().retention);
      const nc = FSRS.schedule(c, g, now, set().retention);
      nc.due = now + pv[g];
      S().cards[k] = nc;
      if (wasNew) { const t = dayStr(); S().newToday = { date: t, n: (S().newToday.date === t ? S().newToday.n : 0) + 1 }; }
      if (nc.due - now < 20 * 60e3) queue.push(k);   // thẻ đang học: hỏi lại trong phiên
      done++; addXp(g > 1 ? 2 : 1); Store.save();
      i++; show();
    }
    keyHandler = e => {
      if (document.activeElement && document.activeElement.id === 'tAns' && !revealed) return;
      if ((e.key === ' ' || e.key === 'Enter') && !revealed) { e.preventDefault(); reveal(); }
      else if (revealed && /^[1-4]$/.test(e.key)) rate(+e.key);
    };
    show();
  };

  /* ================= Nội dung & Prompt ================= */
  routes.content = preset => {
    crumbs([['Nội dung & Prompt']]);
    const units = CURRICULUM.units;
    const imported = [...C.units.values()].filter(u => u._imported);
    view.innerHTML = `<span class="eyebrow">Quy trình nội dung</span><h1 style="margin-top:10px">Nội dung & Prompt</h1>
      <div class="card"><h2>Cách nội dung được tạo</h2>
        <ol><li>ChatGPT và Gemini cùng soạn mỗi unit bằng bộ prompt trong file <code>PROMPTS.md</code>.</li>
        <li>Bạn gửi cả 2 bản cho Claude → Claude so sánh, chọn phần tốt nhất, sửa lỗi (mạo từ, IPA, chia động từ, đáp án) rồi đưa vào web.</li>
        <li>Hoặc tự nhập nhanh ở ô bên dưới (sẽ được kiểm tra tự động, lưu trong trình duyệt này).</li></ol></div>
      <div class="card"><h2>Lấy prompt cho 1 unit</h2>
        <div class="row"><select class="input" id="pUnit" style="max-width:420px">${CURRICULUM.levelKeys.map(lv => `<optgroup label="${lv}">${units.filter(u => u.level === lv).map(u => `<option value="${u.id}" ${u.id === preset ? 'selected' : ''}>${u.id} · ${esc(u.title)} ${C.units.has(u.id) ? '✓' : ''}</option>`).join('')}</optgroup>`).join('')}</select>
        <button class="btn primary" id="pCopy">Sao chép prompt đầy đủ</button><button class="btn" id="pReview">Prompt kiểm tra chéo</button></div>
        <pre class="prompt" id="pBox" style="margin-top:12px"></pre></div>
      <div class="card"><h2>Nhập nội dung (JSON)</h2>
        <textarea class="input mono" id="imp" style="min-height:160px;font-size:.8rem" placeholder="Dán JSON do ChatGPT/Gemini trả về (có thể dán nhiều phần liền nhau)…"></textarea>
        <div class="row" style="margin-top:10px"><button class="btn primary" id="impCheck">Kiểm tra & nhập</button><label class="btn">📄 Chọn file .json<input type="file" id="impFile" accept=".json,.txt" multiple hidden></label></div>
        <div id="impOut" style="margin-top:12px"></div></div>
      <div class="card"><h2>Nội dung hiện có</h2>
        <p class="muted">${C.units.size} unit · ${C.decks.size} bộ từ · ${C.grammar.size} chủ điểm ngữ pháp · ${C.readings.size} bài đọc · ${C.exams.size} đề thi · ${C.verbs.length} động từ (kho) · ${C.vocab.size} từ vựng</p>
        ${imported.length ? `<div class="label-up">Đã nhập trong trình duyệt này</div>${imported.map(u => `<div class="row between" style="padding:6px 0;border-bottom:1px solid var(--line)"><span>${esc(u.id)} · ${esc(u.title)}</span><button class="btn sm" data-del="${esc(u.id)}">Xoá</button></div>`).join('')}` : ''}
        <div class="row" style="margin-top:10px"><button class="btn" id="expAll">⬇ Xuất toàn bộ nội dung (JSON)</button></div></div>`;
    const showP = () => { $('#pBox').textContent = PROMPTS.unit(CURRICULUM.byId($('#pUnit').value)); };
    $('#pUnit').onchange = showP; showP();
    $('#pCopy').onclick = () => copy($('#pBox').textContent);
    $('#pReview').onclick = () => { const t = PROMPTS.review(CURRICULUM.byId($('#pUnit').value).level); $('#pBox').textContent = t; copy(t); };
    async function doImport(text) {
      const out = $('#impOut');
      let data;
      try { data = Validator.extract(text); } catch (e) { out.innerHTML = `<div class="notice bad">${esc(e.message)}</div>`; return; }
      const list = Array.isArray(data) ? data : [data];
      const units = Validator.mergeUnits(list.filter(x => !x.type || x.type === 'unit'));
      const others = Validator.mergeItems(list);
      let html = '', saved = 0;
      for (const u of units) {
        const r = Validator.checkUnit(u);
        html += `<div class="notice ${r.errors.length ? 'bad' : r.warns.length ? 'warn' : ''}" style="margin-bottom:8px"><b>${esc(u.id)}</b> – ${r.errors.length} lỗi, ${r.warns.length} cảnh báo
          ${r.errors.length || r.warns.length ? `<details><summary>Chi tiết</summary><ul class="small">${[...r.errors.map(e => '❌ ' + e), ...r.warns.map(w => '⚠️ ' + w)].map(x => `<li>${esc(x)}</li>`).join('')}</ul></details>` : ''}</div>`;
        if (!r.errors.length) {
          const prev = await DB.get('units', u.id);
          const merged = prev ? Validator.mergeUnits([prev, u])[0] : u;
          await DB.put('units', merged); saved++;
        }
      }
      for (const o of others) {
        const r = Validator.checkItem(o);
        html += `<div class="notice ${r.errors.length ? 'bad' : r.warns.length ? 'warn' : ''}" style="margin-bottom:8px"><b>${esc(o.type)} ${esc(o.id || '?')}</b> – ${r.errors.length} lỗi, ${r.warns.length} cảnh báo
          ${r.errors.length || r.warns.length ? `<details><summary>Chi tiết</summary><ul class="small">${[...r.errors.map(e => '❌ ' + e), ...r.warns.map(w => '⚠️ ' + w)].map(x => `<li>${esc(x)}</li>`).join('')}</ul></details>` : ''}</div>`;
        if (!r.errors.length && o.id) { await DB.put('units', o); saved++; }
      }
      out.innerHTML = html + (saved ? `<div class="notice">Đã lưu ${saved} mục. <a href="#/path">Xem lộ trình →</a></div>` : '<div class="notice bad">Không lưu mục nào (sửa lỗi ❌ trước).</div>');
      await loadContent();
    }
    $('#impCheck').onclick = () => doImport($('#imp').value);
    $('#impFile').onchange = async e => { for (const f of e.target.files) await doImport(await f.text()); };
    $$('[data-del]').forEach(b => b.onclick = async () => { if (!confirm('Xoá nội dung ' + b.dataset.del + ' đã nhập?')) return; await DB.del('units', b.dataset.del); await loadContent(); route(); });
    $('#expAll').onclick = () => download('deutschweg-content.json', JSON.stringify([...C.units.values()].map(({ _imported, ...u }) => u), null, 1));
  };

  /* ================= Cài đặt ================= */
  const GEMINI_VOICES = [['Kore', 'nữ, chắc, rõ ràng'], ['Puck', 'nam, vui tươi'], ['Charon', 'nam, trầm, thông tin'], ['Aoede', 'nữ, nhẹ nhàng'], ['Leda', 'nữ, trẻ trung'],
    ['Fenrir', 'nam, hào hứng'], ['Orus', 'nam, chắc chắn'], ['Zephyr', 'nữ, tươi sáng'], ['Achernar', 'nữ, mềm'], ['Iapetus', 'nam, rõ ràng'], ['Sulafat', 'nữ, ấm'], ['Schedar', 'nam, đều đặn']];
  const AZURE_VOICES = ['de-DE-KatjaNeural', 'de-DE-ConradNeural', 'de-DE-SeraphinaMultilingualNeural', 'de-DE-FlorianMultilingualNeural', 'de-DE-AmalaNeural', 'de-DE-KillianNeural', 'de-DE-LouisaNeural', 'de-DE-BerndNeural', 'de-AT-IngridNeural', 'de-AT-JonasNeural', 'de-CH-LeniNeural', 'de-CH-JanNeural'];
  routes.settings = () => {
    crumbs([['Cài đặt']]);
    const st = set();
    const vs = Speech.voices;
    const vOpts = sel => `<option value="">Tự chọn giọng tốt nhất</option>` + vs.map(v => `<option value="${esc(v.name)}" ${v.name === sel ? 'selected' : ''}>${esc(v.name)} (${v.lang})${Speech.scoreVoice(v) >= 50 ? ' ★' : ''}</option>`).join('');
    view.innerHTML = `<h1>Cài đặt</h1>
      <div class="card"><h2>🔊 Giọng đọc</h2>
        <label class="field"><span>Bộ máy đọc</span><select class="input" id="sEngine"><option value="browser">Giọng của trình duyệt (miễn phí)</option><option value="gemini" ${st.ttsEngine === 'gemini' ? 'selected' : ''}>Gemini TTS – giọng AI tự nhiên (dùng key Gemini)</option><option value="azure" ${st.ttsEngine === 'azure' ? 'selected' : ''}>Azure Neural TTS (cần key Azure)</option></select></label>
        <div class="notice small" style="margin-bottom:12px">${vs.length ? `Trình duyệt có ${vs.length} giọng tiếng Đức. ★ = giọng neural tự nhiên.` : `Trình duyệt này <b>không có giọng tiếng Đức</b>. ${AI.geminiReady() ? 'Hãy chọn <b>Gemini TTS</b> ở trên (đã có key Gemini).' : 'Hãy nhập key Gemini ở mục Gia sư AI rồi chọn <b>Gemini TTS</b>, hoặc mở web bằng <b>Microsoft Edge</b>.'}`}</div>
        <div class="grid g3" id="gemBox" ${st.ttsEngine === 'gemini' ? '' : 'hidden'}>
          <label class="field"><span>Giọng Gemini chính</span><select class="input" id="sGemV">${GEMINI_VOICES.map(([v, d]) => `<option value="${v}" ${v === st.geminiVoice ? 'selected' : ''}>${v} – ${d}</option>`).join('')}</select></label>
          <label class="field"><span>Giọng Gemini thứ 2 (hội thoại)</span><select class="input" id="sGemV2">${GEMINI_VOICES.map(([v, d]) => `<option value="${v}" ${v === st.geminiVoiceB ? 'selected' : ''}>${v} – ${d}</option>`).join('')}</select></label>
          <label class="field"><span>Model TTS (để trống = mặc định)</span><input class="input" id="sTtsM" value="${esc(st.ttsModel)}" placeholder="${AI.DEFAULT_TTS}"></label>
        </div>
        <label class="field"><span>Chấm điểm phát âm</span><select class="input" id="sPron"><option value="auto">Tự động: Azure nếu có key → Gemini nếu có key → nhận dạng giọng nói miễn phí</option><option value="gemini" ${st.pronEngine === 'gemini' ? 'selected' : ''}>Gemini (nghe giọng bạn, chấm từng từ, nhận xét tiếng Việt)</option><option value="stt" ${st.pronEngine === 'stt' ? 'selected' : ''}>Nhận dạng giọng nói của trình duyệt (miễn phí, nhanh)</option></select></label>
        <div class="grid g2"><label class="field"><span>Giọng chính</span><select class="input" id="sVoice">${vOpts(st.voice)}</select></label>
        <label class="field"><span>Giọng thứ 2 (hội thoại)</span><select class="input" id="sVoiceB">${vOpts(st.voiceB)}</select></label></div>
        <div class="grid g2"><label class="field"><span>Tốc độ thường: <b id="rv">${st.rate}</b></span><input type="range" id="sRate" min="0.6" max="1.2" step="0.05" value="${st.rate}" style="width:100%"></label>
        <label class="field"><span>Tốc độ chậm: <b id="srv">${st.slowRate}</b></span><input type="range" id="sSlow" min="0.4" max="0.9" step="0.05" value="${st.slowRate}" style="width:100%"></label></div>
        <button class="btn" data-say="Guten Tag! Ich heiße Anna und komme aus Österreich. Wie geht es Ihnen?">▶ Nghe thử</button>
        <hr><h3>Azure Speech (tuỳ chọn – phát âm chuẩn nhất & chấm điểm từng âm vị)</h3>
        <p class="small muted">Tạo tài nguyên "Speech" miễn phí (F0: 5 giờ nhận dạng + 0,5 triệu ký tự đọc mỗi tháng) tại portal.azure.com, rồi dán Key và Region vào đây. Key chỉ lưu trên máy bạn.</p>
        <div class="grid g2"><label class="field"><span>Key</span><input class="input" id="sAzKey" type="password" value="${esc(st.azureKey)}" autocomplete="off"></label>
        <label class="field"><span>Region (vd. westeurope, southeastasia)</span><input class="input" id="sAzReg" value="${esc(st.azureRegion)}"></label>
        <label class="field"><span>Giọng chính</span><select class="input" id="sAzV">${AZURE_VOICES.map(v => `<option ${v === st.azureVoice ? 'selected' : ''}>${v}</option>`).join('')}</select></label>
        <label class="field"><span>Giọng thứ 2</span><select class="input" id="sAzV2">${AZURE_VOICES.map(v => `<option ${v === st.azureVoiceB ? 'selected' : ''}>${v}</option>`).join('')}</select></label></div></div>
      <div class="card"><h2>✦ Gia sư AI</h2>
        <p class="small muted">Dùng cho: hội thoại luyện nói, chấm bài viết, hỏi ngữ pháp, kiểm tra câu dịch. Key Gemini lấy miễn phí tại aistudio.google.com → "Get API key". Key chỉ lưu trên trình duyệt này.</p>
        <div class="grid g3"><label class="field"><span>Nhà cung cấp</span><select class="input" id="sAiP"><option value="gemini">Google Gemini</option><option value="openai" ${st.aiProvider === 'openai' ? 'selected' : ''}>OpenAI</option></select></label>
        <label class="field"><span>API key</span><input class="input" id="sAiK" type="password" value="${esc(st.aiKey)}" autocomplete="off"></label>
        <label class="field"><span>Model (để trống = mặc định)</span><input class="input" id="sAiM" value="${esc(st.aiModel)}" placeholder="${AI.DEFAULT_MODEL[st.aiProvider || 'gemini']}"></label></div></div>
      <div class="card"><h2>📚 Học tập</h2>
        <div class="grid g3"><label class="field"><span>Thẻ mới mỗi ngày</span><input class="input" type="number" id="sNew" min="0" max="200" value="${st.newPerDay}"></label>
        <label class="field"><span>Mục tiêu XP/ngày</span><input class="input" type="number" id="sGoal" min="10" max="1000" step="10" value="${st.dailyGoal}"></label>
        <label class="field"><span>Tỉ lệ nhớ mong muốn (FSRS)</span><select class="input" id="sRet">${[0.85, 0.9, 0.95].map(r => `<option value="${r}" ${r === st.retention ? 'selected' : ''}>${r * 100}%</option>`).join('')}</select></label></div>
        <label class="row"><input type="checkbox" id="sIpa" ${st.showIpa ? 'checked' : ''}> Hiện phiên âm IPA</label>
        <label class="row"><input type="checkbox" id="sAuto" ${st.autoplay ? 'checked' : ''}> Tự động phát âm</label>
        <label class="field" style="margin-top:12px"><span>Giao diện</span><select class="input" id="sTheme" style="max-width:240px"><option value="auto">Theo hệ thống</option><option value="light" ${st.theme === 'light' ? 'selected' : ''}>Sáng</option><option value="dark" ${st.theme === 'dark' ? 'selected' : ''}>Tối</option></select></label></div>
      <div class="card"><h2>💾 Dữ liệu</h2><p class="small muted">Tiến độ lưu trong trình duyệt này. Hãy sao lưu định kỳ.</p>
        <div class="row"><button class="btn" id="bExp">⬇ Sao lưu tiến độ</button><label class="btn">⬆ Khôi phục<input type="file" id="bImp" accept=".json" hidden></label><button class="btn bad" id="bReset">Xoá toàn bộ tiến độ</button></div></div>`;
    const bind = (id, key, conv = v => v, ev = 'change') => { $('#' + id)[ev === 'input' ? 'oninput' : 'onchange'] = e => { st[key] = conv(e.target.type === 'checkbox' ? e.target.checked : e.target.value); Store.save(); }; };
    bind('sVoice', 'voice'); bind('sVoiceB', 'voiceB');
    $('#sEngine').onchange = e => { st.ttsEngine = e.target.value; Store.save(); $('#gemBox').hidden = st.ttsEngine !== 'gemini'; if (st.ttsEngine === 'gemini' && !AI.geminiReady()) toast('Cần nhập key Gemini ở mục Gia sư AI bên dưới'); };
    bind('sGemV', 'geminiVoice'); bind('sGemV2', 'geminiVoiceB'); bind('sTtsM', 'ttsModel', v => v.trim(), 'input'); bind('sPron', 'pronEngine');
    $('#sRate').oninput = e => { st.rate = +e.target.value; $('#rv').textContent = st.rate; Store.save(); };
    $('#sSlow').oninput = e => { st.slowRate = +e.target.value; $('#srv').textContent = st.slowRate; Store.save(); };
    bind('sAzKey', 'azureKey', v => v.trim(), 'input'); bind('sAzReg', 'azureRegion', v => v.trim(), 'input'); bind('sAzV', 'azureVoice'); bind('sAzV2', 'azureVoiceB');
    bind('sAiP', 'aiProvider'); bind('sAiK', 'aiKey', v => v.trim(), 'input'); bind('sAiM', 'aiModel', v => v.trim(), 'input');
    bind('sNew', 'newPerDay', v => Math.max(0, +v || 0)); bind('sGoal', 'dailyGoal', v => Math.max(10, +v || 50)); bind('sRet', 'retention', Number);
    bind('sIpa', 'showIpa'); bind('sAuto', 'autoplay');
    $('#sTheme').onchange = e => { st.theme = e.target.value; Store.save(); applyTheme(); };
    $('#bExp').onclick = () => download(`deutschweg-tien-do-${dayStr()}.json`, JSON.stringify(Store.s));
    $('#bImp').onchange = async e => { try { Store.replace(JSON.parse(await e.target.files[0].text())); toast('Đã khôi phục tiến độ'); route(); } catch (err) { toast('File không hợp lệ'); } };
    $('#bReset').onclick = () => { if (confirm('Xoá TOÀN BỘ tiến độ học (XP, thẻ ôn tập, kết quả bài)? Không thể hoàn tác.')) { const keep = { ...st }; Store.reset(); Store.s.settings = keep; Store.save(); toast('Đã xoá tiến độ'); route(); } };
    const onV = () => { if (location.hash.startsWith('#/settings')) route(); };
    document.addEventListener('voiceschanged', onV, { once: true });
  };

  /* ================= Giao diện sáng/tối ================= */
  function applyTheme() {
    const t = set().theme;
    if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme;
  }
  $('#themeBtn').onclick = () => {
    const dark = document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
    set().theme = dark ? 'light' : 'dark'; Store.save(); applyTheme();
  };
  $('#menuBtn').onclick = () => $('#sidebar').classList.toggle('open');

  async function start() {
    applyTheme();
    await loadContent();
    window.addEventListener('hashchange', route);
    route();
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
  }

  return {
    $, $$, esc, md, inl, shuffle, pick, toast, modal, closeModal, copy, download, beep, confetti, dayStr,
    sayBtn, sayBtns, umlautBar, pronWidget, pronModal, vocabItem, nounLabel, plural, cardKey, addCards, addXp,
    renderExercise, runSession, renderReading, renderWriting, gradeFree, diffHtml, articleHint, ART_RULES, crumbs, splitSentences,
    routes, route, start, C, S, set, view, loadContent, unitsOf,
    get keyHandler() { return keyHandler; }, set keyHandler(f) { keyHandler = f; },
    onCleanup: f => cleanup.push(f),
    stopAll: () => { dialogToken++; Speech.stop(); },
  };
})();
window.App = App;
