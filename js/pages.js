/* DeutschWeg – các trang luyện tập & kho kiến thức */
(() => {
  const { $, $$, esc, md, inl, shuffle, pick, toast, sayBtn, sayBtns, umlautBar, pronWidget, vocabItem, nounLabel, plural, cardKey, addCards, addXp,
    renderExercise, runSession, renderReading, renderWriting, gradeFree, diffHtml, articleHint, ART_RULES, crumbs, routes, route, C, S, set, view, beep } = App;
  const LV = CURRICULUM.levelKeys;
  const lvSelect = (id, val, any = true) => `<select class="input" id="${id}" style="width:auto">${any ? '<option value="">Mọi trình độ</option>' : ''}${LV.map(l => `<option ${l === val ? 'selected' : ''}>${l}</option>`).join('')}</select>`;
  const pref = (k, v) => { try { if (v === undefined) return localStorage.getItem('dw.p.' + k) || ''; localStorage.setItem('dw.p.' + k, v); } catch (e) { return ''; } };

  /* ================= Phòng phát âm ================= */
  routes.pron = tab => {
    crumbs([['Phát âm']]);
    const tabs = [['sounds', 'Âm & IPA'], ['pairs', 'Cặp tối thiểu'], ['alpha', 'Bảng chữ cái'], ['stress', 'Trọng âm & ngữ điệu'], ['twist', 'Câu líu lưỡi'], ['free', 'Tự kiểm tra']];
    const cur = tabs.find(t => t[0] === tab) ? tab : 'sounds';
    view.innerHTML = `<span class="eyebrow">Standardaussprache · Duden</span><h1 style="margin-top:10px">Phòng phát âm</h1>
      <p class="muted">Nghe giọng bản ngữ, xem IPA, rồi bấm 🎤 để được chấm điểm. Mẹo được viết riêng cho người Việt.</p>
      <div class="tabs">${tabs.map(([k, t]) => `<button data-t="${k}" class="${k === cur ? 'active' : ''}">${t}</button>`).join('')}</div><div id="pb"></div>`;
    $$('[data-t]').forEach(b => b.onclick = () => { history.replaceState(null, '', '#/pron/' + b.dataset.t); route(); });
    const pb = $('#pb');
    if (cur === 'sounds') {
      pb.innerHTML = PRON.groups.map(g => `<div class="card"><h2>${esc(g.title)}</h2><div class="md muted">${md(g.intro)}</div>
        <div class="sound-grid">${g.sounds.map(s => `<div class="sound"><div class="row between"><span class="sym">[${esc(s.sym)}]</span><span class="pill">${esc(s.label)}</span></div>
          <div class="small" style="margin-top:6px">${esc(s.tip)}</div>
          <div class="words">${s.words.map(([w, ipa, vi]) => `<button data-say="${esc(w)}" title="[${esc(ipa)}] ${esc(vi)}">${esc(w)}</button><button data-pron="${esc(w)}" data-vi="[${esc(ipa)}] ${esc(vi)}" title="Luyện nói">🎤</button>`).join('')}</div>
          <div class="small ipa" style="margin-top:6px">${s.words.map(([w, ipa]) => `${esc(w)} [${esc(ipa)}]`).join(' · ')}</div></div>`).join('')}</div></div>`).join('');
    }
    if (cur === 'pairs') {
      pb.innerHTML = `<div class="card"><h2>🎧 Thử thách nghe</h2><p class="muted">Máy đọc một trong hai từ – bạn chọn từ nghe được.</p>
        <div id="pq" style="text-align:center"></div></div>` +
        PRON.pairs.map(p => `<div class="card"><div class="row between"><h3 style="margin:0">${esc(p.title)}</h3><span class="small muted">${esc(p.tip)}</span></div>
          <div class="grid g3" style="margin-top:10px">${p.pairs.map(([a, b]) => `<div class="pair"><button class="btn sm" data-say="${esc(a)}">🔊 ${esc(a)}</button><button class="btn sm" data-say="${esc(b)}">🔊 ${esc(b)}</button></div>`).join('')}</div></div>`).join('');
      let right = 0, total = 0;
      const next = () => {
        const g = pick(PRON.pairs), pr = pick(g.pairs), target = pick(pr);
        $('#pq').innerHTML = `<div class="small muted">${esc(g.title)} · Đúng ${right}/${total}</div><button class="btn lg" id="pqPlay" style="margin:12px">🔊 Nghe</button>
          <div class="row" style="justify-content:center">${shuffle(pr).map(w => `<button class="btn lg" data-ans="${esc(w)}">${esc(w)}</button>`).join('')}</div><div id="pqFb" style="margin-top:10px"></div>`;
        const play = () => Speech.speak(target).catch(e => toast(e.message));
        $('#pqPlay').onclick = play; play();
        $$('[data-ans]').forEach(b => b.onclick = () => {
          if ($('#pqFb').innerHTML) return;
          total++; const ok = b.dataset.ans === target; if (ok) { right++; addXp(2); } beep(ok);
          b.classList.add(ok ? 'ok' : 'bad');
          $('#pqFb').innerHTML = `<div class="feedback ${ok ? 'ok' : 'bad'}">${ok ? '✓ Đúng!' : '✗ Từ được đọc là: <b>' + esc(target) + '</b>'} <button class="btn sm" id="pqNext">Tiếp →</button></div>`;
          $('#pqNext').onclick = next;
        });
      };
      next();
    }
    if (cur === 'alpha') {
      pb.innerHTML = `<div class="card"><h2>Bảng chữ cái (das Alphabet)</h2><div class="muted md">${md('Bấm vào chữ để nghe tên chữ cái. Dùng khi đánh vần tên, địa chỉ: {{Wie schreibt man das?}}')}</div>
        <div class="letters">${PRON.alphabet.map(([l, ipa, say]) => `<button class="letter" data-say="${esc(say || l)}"><b>${l}</b><span class="ipa">[${esc(ipa)}]</span></button>`).join('')}</div></div>
        <div class="card"><h3>Luyện đánh vần</h3><div class="row"><input class="input" id="spIn" placeholder="Gõ tên của bạn, vd. Nguyen" style="max-width:300px"><button class="btn primary" id="spGo">Đánh vần</button></div><div id="spOut" style="margin-top:10px"></div></div>`;
      $('#spGo').onclick = () => {
        const map = Object.fromEntries(PRON.alphabet.map(([l, ipa, say]) => [l, say || l]));
        const letters = [...$('#spIn').value.toUpperCase()].filter(c => map[c] || c === 'ẞ');
        if (!letters.length) return;
        const txt = letters.map(c => map[c] || 'Eszett').join(', ');
        $('#spOut').innerHTML = `<div class="row">${sayBtns(txt)}<b>${letters.join(' – ')}</b></div>`;
        Speech.speak(txt, { slow: true }).catch(() => {});
      };
    }
    if (cur === 'stress') pb.innerHTML = `<div class="card md">${md(PRON.stress)}</div>`;
    if (cur === 'twist') {
      pb.innerHTML = PRON.twisters.map(([t, why], i) => `<div class="card"><div class="row between"><b style="font-size:1.1rem">${esc(t)}</b><span class="pill">${esc(why)}</span></div><div id="tw${i}" style="margin-top:12px"></div></div>`).join('');
      PRON.twisters.forEach(([t], i) => pronWidget($('#tw' + i), t));
    }
    if (cur === 'free') {
      pb.innerHTML = `<div class="card"><h2>Tự kiểm tra phát âm</h2><p class="muted">Gõ hoặc dán bất kỳ câu tiếng Đức nào: nghe giọng chuẩn rồi đọc theo để được chấm.</p>
        <textarea class="input" id="frT" placeholder="z. B. Ich möchte einen Termin vereinbaren.">Ich möchte gern ein Brötchen und einen Kaffee, bitte.</textarea>${umlautBar()}
        <button class="btn primary" id="frGo" style="margin-top:10px">Luyện câu này</button><div id="frW" style="margin-top:14px"></div></div>`;
      const go = () => { const t = $('#frT').value.trim(); if (t) pronWidget($('#frW'), t); };
      $('#frGo').onclick = go; go();
    }
  };

  /* ================= Từ vựng & bộ từ ================= */
  routes.vocab = tab => {
    crumbs([['Từ vựng']]);
    const cur = tab === 'decks' ? 'decks' : 'all';
    view.innerHTML = `<h1>Từ vựng</h1><div class="tabs"><button data-t="all" class="${cur === 'all' ? 'active' : ''}">Tất cả từ (${C.vocab.size})</button><button data-t="decks" class="${cur === 'decks' ? 'active' : ''}">Bộ từ vựng (${C.decks.size})</button></div><div id="vb"></div>`;
    $$('[data-t]').forEach(b => b.onclick = () => { history.replaceState(null, '', '#/vocab/' + b.dataset.t); route(); });
    const vb = $('#vb');
    if (cur === 'decks') {
      const decks = [...C.decks.values()].sort((a, b) => (a.level || '').localeCompare(b.level || '') || (a.title || '').localeCompare(b.title || ''));
      vb.innerHTML = decks.length ? `<div class="grid g3">${decks.map(d => {
        const inS = (d.cards || []).filter(v => S().cards[cardKey(v)]).length;
        return `<a class="card hover unit-card" href="#/deck/${encodeURIComponent(d.id)}"><span class="num">${esc(d.level || '')} · ${(d.cards || []).length} từ</span><h3>${esc(d.title)}</h3><div class="progress" style="margin-top:auto"><i style="width:${inS / Math.max(1, (d.cards || []).length) * 100}%"></i></div><span class="small muted">${inS} từ đang ôn</span></a>`;
      }).join('')}</div>` : '<div class="card empty">Chưa có bộ từ vựng nào. Các bộ từ (Goethe-Wortliste theo chủ đề) sẽ được thêm khi Claude kiểm duyệt xong nội dung từ ChatGPT & Gemini.</div>';
      return;
    }
    vb.innerHTML = `<div class="row" style="margin-bottom:12px"><input class="input" id="vq" placeholder="Tìm từ tiếng Đức hoặc tiếng Việt…" style="max-width:340px">${lvSelect('vl', pref('vl'))}
      <select class="input" id="vp" style="width:auto"><option value="">Mọi từ loại</option>${['noun', 'verb', 'adj', 'adv', 'prep', 'phrase'].map(p => `<option>${p}</option>`).join('')}</select>
      <label class="row small"><input type="checkbox" id="vs"> Chỉ từ đang ôn</label></div><div class="small muted" id="vc"></div><div class="vocab-list" id="vlist" style="margin-top:8px"></div>`;
    const fold = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
    const draw = () => {
      const q = fold($('#vq').value.trim()), lv = $('#vl').value, p = $('#vp').value, onlyS = $('#vs').checked;
      pref('vl', lv);
      const list = [...C.vocab.values()].filter(v => (!lv || v.level === lv) && (!p || v.pos === p) && (!onlyS || S().cards[cardKey(v)]) && (!q || fold(v.de).includes(q) || fold(v.vi).includes(q)));
      $('#vc').textContent = `${list.length} từ${list.length > 150 ? ' (hiển thị 150 đầu tiên)' : ''}`;
      $('#vlist').innerHTML = list.slice(0, 150).map(vocabItem).join('') || '<div class="empty">Không tìm thấy.</div>';
    };
    ['vq', 'vl', 'vp', 'vs'].forEach(id => $('#' + id).addEventListener(id === 'vq' ? 'input' : 'change', draw));
    draw();
  };
  routes.deck = id => {
    const d = C.decks.get(id);
    if (!d) return routes.vocab('decks');
    crumbs([['Từ vựng', '#/vocab/decks'], [d.title]]);
    view.innerHTML = `<div class="card"><span class="eyebrow">${esc(d.level || '')} · ${(d.cards || []).length} từ</span><h1 style="margin-top:10px">${esc(d.title)}</h1>
      <div class="row"><button class="btn primary" id="dAdd">＋ Thêm cả bộ vào ôn tập</button><button class="btn" id="dQuiz">✍️ Kiểm tra nhanh</button><a class="btn" href="#/review">↻ Ôn tập</a></div></div>
      <div class="vocab-list" style="margin-top:14px">${(d.cards || []).map(vocabItem).join('')}</div>`;
    $('#dAdd').onclick = () => { const n = addCards(d.cards || []); toast(n ? `Đã thêm ${n} từ` : 'Đã có đủ trong ôn tập'); route(); };
    $('#dQuiz').onclick = () => {
      const cards = shuffle(d.cards || []).slice(0, 15);
      const items = cards.map(v => {
        const r = Math.random();
        if (v.article && r < 0.35) return { type: 'article', word: v.de, answer: v.article, vi: v.vi };
        if (r < 0.7) { const opts = shuffle([v, ...shuffle((d.cards || []).filter(x => x !== v)).slice(0, 3)]); return { type: 'mcq', q: `„${(v.article ? v.article + ' ' : '') + v.de}“ nghĩa là gì?`, options: opts.map(o => o.vi), answer: opts.indexOf(v) }; }
        return { type: 'translate', vi: v.vi, answers: [(v.article ? v.article + ' ' : '') + v.de] };
      });
      runSession({ items, back: '#/deck/' + encodeURIComponent(d.id), title: d.title });
    };
  };

  /* ================= der · die · das ================= */
  routes.articles = () => {
    crumbs([['der · die · das']]);
    const lv = pref('al');
    const pool = [...C.vocab.values()].filter(v => v.article && (!lv || v.level === lv));
    const st = S().articleStats;
    view.innerHTML = `<div class="row between"><div><h1 style="margin:0">der · die · das</h1><p class="muted">Màu: <b class="art-der">der</b> xanh dương · <b class="art-die">die</b> đỏ · <b class="art-das">das</b> xanh lá. Phím tắt: <span class="kbd">1</span> <span class="kbd">2</span> <span class="kbd">3</span></p></div>${lvSelect('al', lv)}</div>
      <div class="grid g2"><div class="card" id="ab" style="text-align:center"></div>
      <div class="card"><h3>Quy tắc nhận biết giống</h3><ul class="small">${ART_RULES.map(([, a, t]) => `<li><b class="art-${a}">${a}</b>: ${esc(t)}</li>`).join('')}
        <li><b class="art-der">der</b>: ngày, tháng, mùa, hướng, phần lớn đồ uống có cồn (der Wein – ngoại lệ das Bier).</li>
        <li><b class="art-das">das</b>: động từ nguyên mẫu dùng như danh từ (das Essen, das Lernen), màu sắc, phần lớn kim loại.</li>
        <li>Từ ghép: giống theo <b>thành tố cuối</b> (die Haustür ← die Tür).</li></ul>
        <p class="small muted">Tổng: đúng ${st.right}/${st.total}${st.total ? ` (${Math.round(st.right / st.total * 100)}%)` : ''}</p></div></div>`;
    $('#al').onchange = e => { pref('al', e.target.value); route(); };
    if (!pool.length) { $('#ab').innerHTML = '<div class="empty">Chưa có danh từ cho trình độ này.</div>'; return; }
    let streakN = 0, v, answered;
    const next = () => {
      v = pick(pool); answered = false;
      $('#ab').innerHTML = `<div class="small muted">Chuỗi đúng: ${streakN} 🔥</div><div class="big-de" style="font-size:2.2rem;margin:20px 0 4px">${esc(v.de)}</div><div class="muted">${esc(v.vi)}</div>
        <div class="grid g3" style="margin-top:20px">${['der', 'die', 'das'].map((a, i) => `<button class="btn lg art-${a}" data-a="${a}" style="font-size:1.25rem">${a}<span class="kbd" style="margin-left:6px">${i + 1}</span></button>`).join('')}</div><div id="afb" style="margin-top:14px"></div>`;
      $$('[data-a]').forEach(b => b.onclick = () => answer(b.dataset.a));
    };
    const answer = a => {
      if (answered) return next();
      answered = true;
      const ok = a === v.article;
      st.total++; if (ok) { st.right++; streakN++; addXp(1); } else streakN = 0;
      App.S().articleStats = st; Store.save(); beep(ok);
      $('#afb').innerHTML = `<div class="feedback ${ok ? 'ok' : 'bad'}"><div class="row" style="justify-content:center"><b style="font-size:1.2rem">${nounLabel(v)}${plural(v)}</b>${sayBtn(v.article + ' ' + v.de)}</div>
        <div class="fb-body small">${esc(articleHint(v.de, v.article))}</div><button class="btn sm" style="margin-top:8px" id="aNext">Tiếp → <span class="kbd">Enter</span></button></div>`;
      $('#aNext').onclick = next;
      Speech.speak(v.article + ' ' + v.de).catch(() => {});
    };
    App.keyHandler = e => { if (['1', '2', '3'].includes(e.key) && !answered) answer(['der', 'die', 'das'][+e.key - 1]); else if (e.key === 'Enter' && answered) next(); };
    next();
  };

  /* ================= Chia động từ ================= */
  const AUX = { haben: ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'], sein: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'] };
  function verbPool() {
    const out = new Map();
    for (const v of VERBS.list) out.set(v.display, { inf: v.display, vi: v.vi, level: v.level, forms: t => [0, 1, 2, 3, 4, 5].map(p => VERBS.conj(v, t, p)), tenses: ['praes', 'praet', 'perf'] });
    for (const v of C.verbs) {
      const aux = /sein/.test(v.aux || '') && !/haben/.test(v.aux || '') ? 'sein' : 'haben';
      const alt = s => String(s || '').split('|').map(x => x.trim()).filter(Boolean);
      out.set(v.inf, {
        inf: v.inf, vi: v.vi, level: v.level, ex: v.example, exVi: v.exampleVi, rektion: v.rektion,
        tenses: ['praes', 'praet', 'perf', ...(v.konj2 ? ['konj2'] : []), ...(v.imperativ ? ['imp'] : [])],
        forms: t => {
          if (t === 'praes') return v.praesens.map(alt);
          if (t === 'praet') return (v.praeteritum || []).map(alt);
          if (t === 'konj2') return (v.konj2 || []).map(alt);
          if (t === 'imp') return [[], alt(v.imperativ[0]), [], [], alt(v.imperativ[1]), alt(v.imperativ[2])];
          return AUX[aux].map(a => alt(v.partizip).map(p => a + ' ' + p));
        },
      });
    }
    return [...out.values()];
  }
  const TN = { praes: 'Präsens', praet: 'Präteritum', perf: 'Perfekt', konj2: 'Konjunktiv II', imp: 'Imperativ' };
  const PERS_IMP = ['', 'du', '', '', 'ihr', 'Sie'];
  function verbTable(v) {
    return `<div style="overflow-x:auto"><table class="md" style="display:table"><tr><th></th>${v.tenses.map(t => `<th>${TN[t]}</th>`).join('')}</tr>
      ${VERBS.PERSONS.map((p, i) => `<tr><td><b>${p}</b></td>${v.tenses.map(t => { const f = v.forms(t)[i] || []; return `<td>${f.length ? `<span class="say" style="font-weight:500" data-say="${esc((t === 'imp' ? '' : p.split('/')[0] + ' ') + f[0])}">${esc(f.join(' / '))}</span>` : '—'}</td>`; }).join('')}</tr>`).join('')}</table></div>`;
  }
  routes.verbs = () => {
    crumbs([['Chia động từ']]);
    const pool = verbPool();
    const tensesSel = (pref('vt') || 'praes,praet,perf').split(',');
    view.innerHTML = `<h1>Chia động từ</h1><p class="muted">${pool.length} động từ. Chọn thì muốn luyện rồi gõ dạng chia đúng.</p>
      <div class="card"><div class="row">${Object.entries(TN).map(([k, t]) => `<label class="row small"><input type="checkbox" data-tn="${k}" ${tensesSel.includes(k) ? 'checked' : ''}> ${t}</label>`).join('')}${lvSelect('vlv', pref('vlv'))}</div></div>
      <div class="grid g2"><div class="card" id="vq"></div><div class="card"><h3>Tra bảng chia</h3><input class="input" list="vlist" id="vlook" placeholder="Gõ động từ, vd. fahren"><datalist id="vlist">${pool.map(v => `<option value="${esc(v.inf)}">`).join('')}</datalist><div id="vtab" style="margin-top:10px"></div></div></div>`;
    $$('[data-tn]').forEach(c => c.onchange = () => { pref('vt', $$('[data-tn]').filter(x => x.checked).map(x => x.dataset.tn).join(',') || 'praes'); route(); });
    $('#vlv').onchange = e => { pref('vlv', e.target.value); route(); };
    $('#vlook').oninput = e => { const v = pool.find(x => x.inf.toLowerCase() === e.target.value.trim().toLowerCase()); $('#vtab').innerHTML = v ? `<b>${esc(v.inf)}</b> – ${esc(v.vi)}${v.rektion ? ` <span class="pill">${esc(v.rektion)}</span>` : ''}${verbTable(v)}${v.ex ? `<p class="small">${sayBtn(v.ex)} ${esc(v.ex)}<br><span class="muted">${esc(v.exVi || '')}</span></p>` : ''}` : ''; };
    const lv = pref('vlv');
    const qpool = pool.filter(v => !lv || v.level === lv);
    let streakN = 0, cur, done;
    const next = () => {
      done = false;
      for (let k = 0; k < 50; k++) {
        const v = pick(qpool), ts = tensesSel.filter(t => v.tenses.includes(t));
        if (!ts.length) continue;
        const t = pick(ts), forms = v.forms(t);
        const persons = [0, 1, 2, 3, 4, 5].filter(p => (forms[p] || []).length);
        if (!persons.length) continue;
        const p = pick(persons);
        cur = { v, t, p, ans: forms[p] };
        break;
      }
      if (!cur) { $('#vq').innerHTML = '<div class="empty">Không có động từ phù hợp.</div>'; return; }
      const { v, t, p } = cur;
      $('#vq').innerHTML = `<div class="small muted">Chuỗi đúng: ${streakN} 🔥</div><div class="label-up" style="margin-top:10px">${TN[t]}</div>
        <div class="big-de">${esc(v.inf)} <span class="muted small" style="font-weight:400">(${esc(v.vi)})</span></div>
        <div class="row" style="margin-top:14px;font-size:1.2rem"><b>${t === 'imp' ? PERS_IMP[p] + ':' : VERBS.PERSONS[p]}</b><input class="input" id="vin" style="max-width:280px" autocomplete="off" spellcheck="false" placeholder="${t === 'perf' ? 'vd. habe gemacht' : ''}"></div>${umlautBar()}
        <div class="row" style="margin-top:10px"><button class="btn primary" id="vchk">Kiểm tra</button><button class="btn ghost" id="vskip">Bỏ qua</button></div><div id="vfb" style="margin-top:10px"></div>`;
      const inp = $('#vin'); setTimeout(() => inp.focus(), 30);
      $('#vchk').onclick = check; $('#vskip').onclick = next;
      inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); done ? next() : check(); } };
    };
    const check = () => {
      if (done) return next();
      done = true;
      const val = $('#vin').value.trim().replace(/\s+/g, ' ').replace(/!$/, '').toLowerCase();
      const ok = cur.ans.some(a => a.toLowerCase().replace(/!$/, '') === val);
      if (ok) { streakN++; addXp(2); } else streakN = 0;
      beep(ok);
      const say = cur.t === 'imp' ? cur.ans[0] : VERBS.PERSONS[cur.p].split('/')[0] + ' ' + cur.ans[0];
      $('#vfb').innerHTML = `<div class="feedback ${ok ? 'ok' : 'bad'}"><b>${ok ? '✓ Richtig!' : '✗ Đáp án: ' + esc(cur.ans.join(' / '))}</b> ${sayBtn(say)}<div class="fb-body">${verbTable(cur.v)}</div></div>`;
      $('#vchk').textContent = 'Tiếp →';
      Speech.speak(say).catch(() => {});
    };
    next();
  };

  /* ================= Kho câu cho nghe/nói ================= */
  function sentencePool(lv) {
    const out = new Map();
    const add = (de, vi, level) => { if (de && de.split(' ').length >= 2 && de.length < 220 && !out.has(de)) out.set(de, { de, vi, level }); };
    for (const { lesson: l, unit: u } of C.lessons.values()) {
      if (lv && u.level !== lv) continue;
      (l.dialogue || []).forEach(d => add(d.de, d.vi, u.level));
      (l.vocab || []).forEach(v => add(v.example, v.exampleVi, u.level));
      (l.exercises || []).forEach(x => (x.type === 'listen' || x.type === 'speak') && add(x.de, x.vi, u.level));
    }
    for (const d of C.decks.values()) if (!lv || d.level === lv) (d.cards || []).forEach(v => add(v.example, v.exampleVi, d.level));
    return [...out.values()];
  }

  routes.listen = () => {
    crumbs([['Nghe – chép chính tả']]);
    const lv = pref('ll');
    const pool = sentencePool(lv);
    view.innerHTML = `<div class="row between"><div><h1 style="margin:0">Nghe – chép chính tả</h1><p class="muted">Nghe câu do giọng bản ngữ đọc và gõ lại chính xác. ${pool.length} câu.</p></div>${lvSelect('ll', lv)}</div><div class="card" id="lb" style="max-width:720px"></div>`;
    $('#ll').onchange = e => { pref('ll', e.target.value); route(); };
    if (!pool.length) { $('#lb').innerHTML = '<div class="empty">Chưa có câu cho trình độ này.</div>'; return; }
    let right = 0, total = 0, s, done;
    const next = () => {
      s = pick(pool); done = false;
      $('#lb').innerHTML = `<div class="small muted">Đúng ${right}/${total}</div><div class="row" style="margin:14px 0">${sayBtn(s.de)}${sayBtn(s.de, true)}<span class="pill lv">${s.level}</span></div>
        <textarea class="input" id="lin" rows="2" placeholder="Gõ những gì bạn nghe được…" spellcheck="false"></textarea>${umlautBar()}
        <div class="row" style="margin-top:10px"><button class="btn primary" id="lchk">Kiểm tra</button><button class="btn ghost" id="lskip">Câu khác</button></div><div id="lfb" style="margin-top:10px"></div>`;
      setTimeout(() => { Speech.speak(s.de).catch(() => {}); $('#lin').focus(); }, 200);
      $('#lchk').onclick = check; $('#lskip').onclick = next;
      $('#lin').onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); done ? next() : check(); } };
    };
    const check = () => {
      if (done) return next();
      done = true; total++;
      const g = gradeFree($('#lin').value, [s.de]);
      if (g.ok) { right++; addXp(5); }
      beep(g.ok);
      $('#lfb').innerHTML = `<div class="feedback ${g.ok ? 'ok' : 'bad'}"><b>${g.ok ? '✓ Chính xác!' : '✗ So sánh:'}</b><div class="fb-body">${diffHtml(g.best)}<div class="small muted" style="margin-top:4px">${esc(s.vi || '')}</div></div></div>`;
      $('#lchk').textContent = 'Tiếp →';
    };
    next();
  };

  routes.shadow = () => {
    crumbs([['Shadowing']]);
    const lv = pref('sl');
    const pool = sentencePool(lv);
    view.innerHTML = `<div class="row between"><div><h1 style="margin:0">Shadowing</h1><p class="muted">Nghe → nói đuổi theo ngay, bắt chước nhịp điệu và ngữ điệu. Phương pháp luyện nói hiệu quả nhất.</p></div>
      <div class="row">${lvSelect('sl', lv)}<label class="row small"><input type="checkbox" id="shHide" ${pref('sh') === '1' ? 'checked' : ''}> Ẩn chữ (khó hơn)</label></div></div><div class="card" id="sb" style="max-width:760px"></div>`;
    $('#sl').onchange = e => { pref('sl', e.target.value); route(); };
    $('#shHide').onchange = e => { pref('sh', e.target.checked ? '1' : '0'); route(); };
    if (!pool.length) { $('#sb').innerHTML = '<div class="empty">Chưa có câu cho trình độ này.</div>'; return; }
    const hide = pref('sh') === '1';
    const next = () => {
      const s = pick(pool);
      $('#sb').innerHTML = `<span class="pill lv">${s.level}</span><div class="big-de" style="margin:12px 0 4px;${hide ? 'filter:blur(7px)' : ''}" id="shT">${esc(s.de)}</div><div class="muted">${esc(s.vi || '')}</div>
        <ol class="small muted"><li>Nghe mẫu 2–3 lần (nút 🐢 để nghe chậm).</li><li>Bấm 🎤 và nói theo, cố giữ cùng tốc độ và ngữ điệu.</li><li>Nghe lại giọng mình và so sánh.</li></ol>
        <div id="shW"></div><div class="row" style="margin-top:14px"><button class="btn" id="shShow">${hide ? 'Hiện chữ' : ''}</button><button class="btn primary" id="shNext">Câu tiếp →</button></div>`;
      if (!hide) $('#shShow').remove(); else $('#shShow').onclick = () => { $('#shT').style.filter = ''; };
      pronWidget($('#shW'), s.de, r => r.score >= 70 && addXp(5));
      $('#shNext').onclick = next;
      Speech.speak(s.de).catch(() => {});
    };
    next();
  };

  /* ================= Gia sư AI ================= */
  routes.tutor = () => {
    crumbs([['Gia sư AI']]);
    const mode = pref('tm') || 'talk', level = pref('tl') || 'A1';
    const key = 'dw.chat.' + mode;
    let hist = []; try { hist = JSON.parse(sessionStorage.getItem(key) || '[]'); } catch (e) { /* */ }
    const scen = ['', 'Im Café: etwas bestellen', 'Beim Arzt: Termin und Beschwerden', 'Wohnungsbesichtigung', 'Vorstellungsgespräch', 'Am Bahnhof: Fahrkarte kaufen', 'Smalltalk mit Nachbarn', 'Diskussion: Homeoffice – pro und contra', 'Reklamation im Geschäft'];
    view.innerHTML = `<h1>Gia sư AI ✦</h1>
      ${AI.ready() ? '' : `<div class="notice warn" style="margin-bottom:14px">Cần API key để dùng gia sư AI. Lấy key Gemini miễn phí tại aistudio.google.com rồi dán vào <a href="#/settings">Cài đặt</a>.</div>`}
      <div class="card"><div class="row between"><div class="tabs" style="margin:0">${[['talk', '🗣 Hội thoại'], ['write', '🖊 Chấm bài viết'], ['ask', '❓ Hỏi ngữ pháp']].map(([k, t]) => `<button data-m="${k}" class="${k === mode ? 'active' : ''}">${t}</button>`).join('')}</div>
        <div class="row">${lvSelect('tl', level, false)}<button class="btn sm" id="tClear">Cuộc mới</button></div></div>
        ${mode === 'talk' ? `<div class="row" style="margin-top:10px"><select class="input" id="tScen" style="max-width:360px">${scen.map(s => `<option value="${esc(s)}" ${s === pref('ts') ? 'selected' : ''}>${s || 'Chủ đề tự do'}</option>`).join('')}</select><label class="row small"><input type="checkbox" id="tVoice" ${pref('tv') !== '0' ? 'checked' : ''}> Tự đọc câu trả lời</label></div>` : ''}
        <div class="chat" id="chat" style="margin-top:12px"></div>
        <div class="chat-input"><textarea class="input" id="tIn" placeholder="${mode === 'talk' ? 'Viết hoặc bấm 🎤 để nói tiếng Đức…' : mode === 'write' ? 'Dán đề bài (nếu có) và bài viết tiếng Đức của bạn…' : 'Hỏi bất cứ điều gì về tiếng Đức (bằng tiếng Việt)…'}"></textarea>
          ${mode === 'talk' && Speech.sttSupported ? '<button class="mic-btn" id="tMic" style="width:48px;height:48px;font-size:1.1rem" title="Nói">🎤</button>' : ''}<button class="btn primary" id="tSend">Gửi</button></div>${umlautBar()}</div>`;
    $$('[data-m]').forEach(b => b.onclick = () => { pref('tm', b.dataset.m); route(); });
    $('#tl').onchange = e => { pref('tl', e.target.value); };
    $('#tClear').onclick = () => { sessionStorage.removeItem(key); route(); };
    if ($('#tScen')) { $('#tScen').onchange = e => { pref('ts', e.target.value); sessionStorage.removeItem(key); route(); }; $('#tVoice').onchange = e => pref('tv', e.target.checked ? '1' : '0'); }
    const germanPart = t => t.split('\n').filter(l => !/^\s*(✏️|🇻🇳)/.test(l)).join(' ').replace(/[*_#>`]/g, '').trim();
    const draw = () => {
      $('#chat').innerHTML = hist.length ? hist.map(m => m.role === 'user' ? `<div class="msg user">${esc(m.content)}</div>` : `<div class="msg bot md">${md(m.content)}${mode === 'talk' ? `<div>${sayBtns(germanPart(m.content))}</div>` : ''}</div>`).join('')
        : `<div class="empty">${mode === 'talk' ? 'Bắt đầu bằng một câu chào, ví dụ: „Hallo! Ich heiße Minh.“' : mode === 'write' ? 'Dán bài viết – AI chấm theo tiêu chí Goethe, sửa lỗi chi tiết và gợi ý nâng cấp.' : 'Ví dụ: „Khi nào dùng Dativ?“, „Phân biệt wenn và als“.'}</div>`;
      $('#chat').scrollTop = 1e9;
    };
    draw();
    const send = async () => {
      const t = $('#tIn').value.trim(); if (!t) return;
      hist.push({ role: 'user', content: t }); $('#tIn').value = ''; draw();
      $('#chat').insertAdjacentHTML('beforeend', '<div class="msg bot muted" id="typing">…</div>'); $('#chat').scrollTop = 1e9;
      const lv = $('#tl').value;
      const sys = mode === 'talk' ? AI.SYSTEM.talk(lv, pref('ts')) : mode === 'write' ? AI.SYSTEM.write(lv) : AI.SYSTEM.ask(lv);
      try {
        const r = await AI.chat(hist.slice(-20), sys);
        hist.push({ role: 'assistant', content: r });
        sessionStorage.setItem(key, JSON.stringify(hist)); addXp(3);
        draw();
        if (mode === 'talk' && pref('tv') !== '0') Speech.speak(germanPart(r)).catch(() => {});
      } catch (e) { const ty = $('#typing'); if (ty) ty.outerHTML = `<div class="notice bad">${esc(e.message)}</div>`; hist.pop(); }
    };
    $('#tSend').onclick = send;
    $('#tIn').onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey && mode !== 'write') { e.preventDefault(); send(); } };
    const mic = $('#tMic');
    if (mic) mic.onclick = async () => {
      mic.classList.add('rec');
      const h = Speech.listen(t => { $('#tIn').value = t; });
      try { const alts = await h.promise; $('#tIn').value = alts[0].transcript; send(); } catch (e) { toast(e.message); } finally { mic.classList.remove('rec'); }
    };
  };

  /* ================= Cẩm nang ngữ pháp ================= */
  routes.grammar = id => {
    if (id && C.grammar.has(id)) {
      const g = C.grammar.get(id);
      crumbs([['Ngữ pháp', '#/grammar'], [g.title]]);
      view.innerHTML = `<div class="row between" style="align-items:flex-start"><div><span class="eyebrow">${esc(g.level)}${g.topic ? ' · ' + esc(g.topic) : ''}</span><h1 style="margin:10px 0 2px">${esc(g.title)}</h1><div class="muted">${esc(g.titleVi || '')}</div></div>
        ${(g.exercises || []).length ? `<button class="btn primary lg" id="gPr">✍️ Luyện ${(g.exercises || []).length} bài</button>` : ''}</div>
        <div class="card md" style="margin-top:16px">${md(g.body || '')}</div>
        ${(g.mistakes || []).length ? `<div class="card"><h3>⚠️ Lỗi người Việt hay mắc</h3><ul>${g.mistakes.map(m => `<li>${inl(m)}</li>`).join('')}</ul></div>` : ''}
        ${(g.related || []).length ? `<div class="card"><h3>Liên quan</h3><div class="row">${g.related.filter(r => C.grammar.has(r)).map(r => `<a class="btn sm" href="#/grammar/${encodeURIComponent(r)}">${esc(C.grammar.get(r).title)}</a>`).join('')}</div></div>` : ''}`;
      const b = $('#gPr'); if (b) b.onclick = () => runSession({ items: g.exercises, back: '#/grammar/' + encodeURIComponent(g.id), title: g.title });
      return;
    }
    crumbs([['Ngữ pháp']]);
    const all = [...C.grammar.values()];
    view.innerHTML = `<span class="eyebrow">Grammatik</span><h1 style="margin-top:10px">Cẩm nang ngữ pháp</h1><p class="muted">Tra cứu toàn bộ ngữ pháp A1 → C1 với bảng, ví dụ bấm nghe được và bài luyện riêng.</p>
      <input class="input" id="gq" placeholder="Tìm chủ điểm (vd. Dativ, Passiv, Konjunktiv)…" style="max-width:420px;margin-bottom:14px"><div id="gl"></div>`;
    const draw = () => {
      const q = $('#gq').value.trim().toLowerCase();
      $('#gl').innerHTML = all.length ? LV.map(lv => {
        const xs = all.filter(g => g.level === lv && (!q || (g.title + ' ' + (g.titleVi || '') + ' ' + (g.topic || '')).toLowerCase().includes(q))).sort((a, b) => (a.order || 0) - (b.order || 0));
        return xs.length ? `<div class="level-block"><div class="level-head"><span class="level-badge lv-${lv}">${lv}</span><h2 style="margin:0">${esc(CURRICULUM.levels[lv].name)}</h2></div>
          <div class="grid g3">${xs.map(g => `<a class="card hover unit-card" style="min-height:110px" href="#/grammar/${encodeURIComponent(g.id)}"><span class="num">${esc(g.topic || 'Ngữ pháp')}</span><h3>${esc(g.title)}</h3><span class="small muted">${esc(g.titleVi || '')}</span></a>`).join('')}</div></div>` : '';
      }).join('') : '<div class="card empty">Cẩm nang ngữ pháp đang được ChatGPT & Gemini soạn, Claude kiểm duyệt trước khi đưa lên.</div>';
    };
    $('#gq').oninput = draw; draw();
  };

  /* ================= Thư viện bài đọc ================= */
  routes.library = id => {
    if (id && C.readings.has(id)) {
      const r = C.readings.get(id);
      crumbs([['Thư viện đọc', '#/library'], [r.title]]);
      view.innerHTML = `<span class="eyebrow">${esc(r.level)}${r.genre ? ' · ' + esc(r.genre) : ''}</span><div id="rb" style="margin-top:12px"></div>`;
      renderReading($('#rb'), r);
      return;
    }
    crumbs([['Thư viện đọc']]);
    const all = [...C.readings.values()];
    const lv = pref('rl');
    view.innerHTML = `<div class="row between"><div><span class="eyebrow">Lesen</span><h1 style="margin:10px 0 2px">Thư viện bài đọc</h1><p class="muted">Bài đọc phân cấp: bấm từng câu để nghe, xem từ khó, trả lời câu hỏi.</p></div>${lvSelect('rl', lv)}</div>
      ${all.length ? `<div class="grid g3">${all.filter(r => !lv || r.level === lv).map(r => `<a class="card hover unit-card" href="#/library/${encodeURIComponent(r.id)}"><span class="num">${esc(r.level)} · ${esc(r.genre || 'Text')} · ${(String(r.text || '').match(/\S+/g) || []).length} từ</span><h3>${esc(r.title)}</h3><span class="small muted">${esc(r.titleVi || '')}</span></a>`).join('')}</div>` : '<div class="card empty">Thư viện đang được bổ sung.</div>'}`;
    $('#rl').onchange = e => { pref('rl', e.target.value); route(); };
  };

  /* ================= Đề thi thử ================= */
  routes.exams = () => {
    crumbs([['Thi thử']]);
    const all = [...C.exams.values()].sort((a, b) => a.level.localeCompare(b.level));
    view.innerHTML = `<span class="eyebrow">Prüfungstraining</span><h1 style="margin-top:10px">Đề thi thử</h1><p class="muted">Mô phỏng cấu trúc Goethe-Zertifikat: Lesen · Hören · Schreiben · Sprechen.</p>
      ${all.length ? `<div class="grid g3">${all.map(e => `<a class="card hover unit-card" href="#/exam/${encodeURIComponent(e.id)}"><span class="num">${esc(e.level)} · ${e.minutes || '?'} phút</span><h3>${esc(e.title)}</h3><span class="small muted">${(e.sections || []).map(s => esc(s.title)).join(' · ')}</span></a>`).join('')}</div>` : '<div class="card empty">Đề thi thử đang được soạn và kiểm duyệt.</div>'}`;
  };
  routes.exam = id => {
    const e = C.exams.get(id);
    if (!e) return routes.exams();
    crumbs([['Thi thử', '#/exams'], [e.title]]);
    const objective = s => (s.exercises || []).filter(x => x.type !== 'speak');
    view.innerHTML = `<span class="eyebrow">${esc(e.level)} · ${e.minutes || '?'} phút</span><h1 style="margin-top:10px">${esc(e.title)}</h1>
      ${e.intro ? `<div class="card md">${md(e.intro)}</div>` : ''}
      ${(e.sections || []).map((s, i) => `<div class="card"><div class="row between"><h2 style="margin:0">${esc(s.title)}</h2>${objective(s).length ? `<button class="btn primary" data-sec="${i}">Làm phần này (${objective(s).length} câu)</button>` : ''}</div>
        ${s.instructions ? `<div class="md muted">${md(s.instructions)}</div>` : ''}<div id="task${i}"></div></div>`).join('')}`;
    (e.sections || []).forEach((s, i) => {
      if (s.task) {
        const host = $('#task' + i);
        if (/sprech/i.test(s.skill || s.title)) host.innerHTML = `<div class="notice">${md(s.task)}</div>${s.sample ? `<details style="margin-top:8px"><summary>Bài nói mẫu</summary><p>${sayBtn(s.sample)} ${esc(s.sample)}</p></details>` : ''}<p class="small muted">Luyện phần nói với <a href="#/tutor">Gia sư AI</a> (chế độ Hội thoại).</p>`;
        else renderWriting(host, { task: s.task, sample: s.sample, minWords: s.minWords }, e.level);
      }
    });
    $$('[data-sec]').forEach(b => b.onclick = () => {
      const s = e.sections[+b.dataset.sec];
      const items = objective(s).map(x => ({ ...x, _ctx: [s.text ? s.text : '', x.context || ''].filter(Boolean).join('\n\n') || undefined, _audio: x.audio || s.audio }));
      runSession({ items, back: '#/exam/' + encodeURIComponent(e.id), title: `${e.title} · ${s.title}` });
    });
  };

  App.start();
})();
