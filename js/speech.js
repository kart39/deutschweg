/* Phát âm (TTS), nhận dạng giọng nói (STT), ghi âm và chấm điểm phát âm */
const Speech = (() => {
  const S = () => Store.s.settings;
  let voices = [];
  const audioMem = new Map();
  let currentAudio = null;

  /* ---------- Giọng đọc trình duyệt ---------- */
  function loadVoices() {
    if (!('speechSynthesis' in window)) return [];
    voices = speechSynthesis.getVoices().filter(v => /^de([-_]|$)/i.test(v.lang));
    voices.sort((a, b) => scoreVoice(b) - scoreVoice(a));
    return voices;
  }
  function scoreVoice(v) {
    let s = 0;
    const n = v.name;
    if (/de[-_]DE/i.test(v.lang)) s += 10;
    if (/Natural|Neural/i.test(n)) s += 70;          // Edge: Microsoft … Online (Natural)
    else if (/Online/i.test(n)) s += 50;
    if (/Google/i.test(n)) s += 35;                    // Chrome: Google Deutsch
    if (/Premium|Enhanced|Siri/i.test(n)) s += 55;     // macOS/iOS giọng chất lượng cao
    if (/Seraphina|Katja|Conrad|Florian|Amala|Killian|Anna|Petra|Markus/i.test(n)) s += 3;
    return s;
  }
  if ('speechSynthesis' in window) {
    loadVoices();
    speechSynthesis.onvoiceschanged = () => { loadVoices(); document.dispatchEvent(new Event('voiceschanged')); };
  }
  function pickVoice(alt) {
    const name = alt ? S().voiceB : S().voice;
    let v = voices.find(x => x.name === name);
    if (!v) v = alt ? (voices[1] || voices[0]) : voices[0];
    return v || null;
  }

  function stop() {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
  }

  function speakBrowser(text, rate, alt) {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) return reject(new Error('Trình duyệt không hỗ trợ đọc văn bản'));
      if (!voices.length) loadVoices();
      const u = new SpeechSynthesisUtterance(text);
      const v = pickVoice(alt);
      if (v) u.voice = v;
      u.lang = v ? v.lang : 'de-DE';
      u.rate = rate;
      u.onend = () => resolve();
      u.onerror = e => (e.error === 'interrupted' || e.error === 'canceled') ? resolve() : reject(new Error(e.error));
      speechSynthesis.speak(u);
    });
  }

  /* ---------- Azure Neural TTS (tuỳ chọn, chất lượng cao nhất) ---------- */
  const xmlEsc = t => t.replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
  async function azureBlob(text, rate, alt) {
    const st = S();
    const voice = alt ? (st.azureVoiceB || st.azureVoice) : st.azureVoice;
    const key = voice + '|' + rate + '|' + text;
    let blob = audioMem.get(key);
    if (!blob) blob = await DB.get('audio', key);
    if (!blob) {
      const pct = Math.round((rate - 1) * 100);
      const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="de-DE"><voice name="${voice}"><prosody rate="${pct >= 0 ? '+' : ''}${pct}%">${xmlEsc(text)}</prosody></voice></speak>`;
      const r = await fetch(`https://${st.azureRegion}.tts.speech.microsoft.com/cognitiveservices/v1`, {
        method: 'POST',
        headers: { 'Ocp-Apim-Subscription-Key': st.azureKey, 'Content-Type': 'application/ssml+xml', 'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3' },
        body: ssml,
      });
      if (!r.ok) throw new Error('Azure TTS lỗi ' + r.status);
      blob = await r.blob();
      DB.put('audio', blob, key).catch(() => {});
    }
    audioMem.set(key, blob);
    return blob;
  }
  /* ---------- Gemini TTS (dùng chung key Gemini của Gia sư AI) ---------- */
  function pcmToWav(b64, mime) {
    const rate = +((/rate=(\d+)/.exec(mime || '') || [])[1] || 24000);
    const bin = atob(b64);
    const buf = new ArrayBuffer(44 + bin.length);
    const v = new DataView(buf);
    const str = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    str(0, 'RIFF'); v.setUint32(4, 36 + bin.length, true); str(8, 'WAVE'); str(12, 'fmt ');
    v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, rate, true);
    v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); str(36, 'data'); v.setUint32(40, bin.length, true);
    const u8 = new Uint8Array(buf, 44);
    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    return new Blob([buf], { type: 'audio/wav' });
  }
  async function geminiBlob(text, alt) {
    const st = S();
    const voice = alt ? (st.geminiVoiceB || 'Puck') : (st.geminiVoice || 'Kore');
    const key = 'gem|' + voice + '|' + text;
    let blob = audioMem.get(key) || await DB.get('audio', key);
    if (!blob) {
      const a = await AI.tts(text, voice);
      blob = /wav|mpeg|mp3|ogg/.test(a.mimeType || '') ? new Blob([Uint8Array.from(atob(a.data), c => c.charCodeAt(0))], { type: a.mimeType }) : pcmToWav(a.data, a.mimeType);
      DB.put('audio', blob, key).catch(() => {});
    }
    audioMem.set(key, blob);
    return blob;
  }
  // Dùng Gemini khi người dùng chọn, hoặc tự động khi trình duyệt không có giọng tiếng Đức nào (tránh đọc tiếng Đức bằng giọng Anh)
  const noGermanVoice = () => S().ttsEngine === 'browser' && 'speechSynthesis' in window && !voices.length && speechSynthesis.getVoices().length > 0;
  const geminiTtsReady = () => AI.geminiReady() && (S().ttsEngine === 'gemini' || noGermanVoice());
  let warned = false;

  function playBlob(blob, rate = 1) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(blob);
      const a = new Audio(url);
      a.playbackRate = rate;
      a.preservesPitch = true;
      currentAudio = a;
      a.onended = () => { URL.revokeObjectURL(url); resolve(); };
      a.onpause = () => resolve();
      a.onerror = () => reject(new Error('Không phát được âm thanh'));
      a.play().catch(reject);
    });
  }

  const azureReady = () => S().ttsEngine === 'azure' && S().azureKey && S().azureRegion;

  /** Đọc một câu tiếng Đức. opts: { slow, alt (giọng thứ 2), rate } */
  async function speak(text, opts = {}) {
    // bỏ ký hiệu Markdown (**đậm**, *nghiêng*, `mã`) để máy không đọc to dấu * hay `
    text = String(text || '').replace(/[*_`]+/g, '').replace(/\s+/g, ' ').trim();
    if (!text) return;
    stop();
    const rate = opts.rate || (opts.slow ? S().slowRate : S().rate);
    if (geminiTtsReady()) {
      // Gemini đọc ở tốc độ tự nhiên; nút "chậm" chỉnh tốc độ phát (giữ cao độ) → mỗi câu chỉ gọi API một lần
      try { return await playBlob(await geminiBlob(text, opts.alt), opts.slow ? Math.max(0.5, S().slowRate / 0.95) : Math.max(0.6, S().rate / 0.95)); }
      catch (e) { console.warn(e); if (window.App && !warned) { warned = true; App.toast('Gemini TTS lỗi: ' + e.message.slice(0, 80) + ' → dùng giọng trình duyệt'); } }
    }
    if (azureReady()) {
      try { return await playBlob(await azureBlob(text, rate, opts.alt)); }
      catch (e) { console.warn(e); if (window.App) App.toast('Azure lỗi – chuyển sang giọng trình duyệt'); }
    }
    return speakBrowser(text, rate, opts.alt);
  }

  /* ---------- Nhận dạng giọng nói (Chrome / Edge) ---------- */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const sttSupported = !!SR;

  function listen(onInterim) {
    let rec, settled = false;
    const promise = new Promise((resolve, reject) => {
      if (!SR) return reject(new Error('Trình duyệt này không hỗ trợ nhận dạng giọng nói. Hãy dùng Chrome hoặc Edge.'));
      rec = new SR();
      rec.lang = 'de-DE';
      rec.interimResults = true;
      rec.maxAlternatives = 5;
      rec.continuous = false;
      let finals = null;
      rec.onresult = e => {
        const res = e.results[e.results.length - 1];
        if (res.isFinal) {
          finals = [];
          for (let i = 0; i < res.length; i++) finals.push({ transcript: res[i].transcript.trim(), confidence: res[i].confidence });
        } else if (onInterim) onInterim(res[0].transcript);
      };
      rec.onerror = e => { if (!settled) { settled = true; reject(new Error(e.error === 'not-allowed' ? 'Bạn chưa cho phép dùng micro.' : e.error === 'no-speech' ? 'Không nghe thấy giọng nói. Thử lại nhé.' : 'Lỗi nhận dạng: ' + e.error)); } };
      rec.onend = () => { if (!settled) { settled = true; finals ? resolve(finals) : reject(new Error('Không nghe thấy giọng nói. Thử lại nhé.')); } };
      rec.start();
    });
    return { promise, stop: () => rec && rec.stop() };
  }

  /* ---------- Ghi âm ---------- */
  async function record() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    const mr = new MediaRecorder(stream);
    const chunks = [];
    mr.ondataavailable = e => e.data.size && chunks.push(e.data);
    mr.start();
    return {
      stop: () => new Promise(resolve => {
        mr.onstop = () => { stream.getTracks().forEach(t => t.stop()); resolve(new Blob(chunks, { type: mr.mimeType || 'audio/webm' })); };
        if (mr.state !== 'inactive') mr.stop(); else mr.onstop();
      }),
    };
  }

  async function toWav16k(blob) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const audio = await ctx.decodeAudioData(await blob.arrayBuffer());
    ctx.close();
    const off = new OfflineAudioContext(1, Math.ceil(audio.duration * 16000), 16000);
    const src = off.createBufferSource();
    src.buffer = audio; src.connect(off.destination); src.start();
    const data = (await off.startRendering()).getChannelData(0);
    const buf = new ArrayBuffer(44 + data.length * 2);
    const v = new DataView(buf);
    const str = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    str(0, 'RIFF'); v.setUint32(4, 36 + data.length * 2, true); str(8, 'WAVE'); str(12, 'fmt ');
    v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, 16000, true);
    v.setUint32(28, 32000, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); str(36, 'data'); v.setUint32(40, data.length * 2, true);
    for (let i = 0; i < data.length; i++) { const x = Math.max(-1, Math.min(1, data[i])); v.setInt16(44 + i * 2, x < 0 ? x * 0x8000 : x * 0x7fff, true); }
    return new Blob([buf], { type: 'audio/wav' });
  }

  /* ---------- Azure Pronunciation Assessment (chấm đến từng âm vị) ---------- */
  async function azureAssess(blob, reference) {
    const st = S();
    const wav = await toWav16k(blob);
    const cfg = { ReferenceText: reference, GradingSystem: 'HundredMark', Granularity: 'Phoneme', Dimension: 'Comprehensive', EnableMiscue: true };
    const header = btoa(unescape(encodeURIComponent(JSON.stringify(cfg))));
    const r = await fetch(`https://${st.azureRegion}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=de-DE&format=detailed`, {
      method: 'POST',
      headers: { 'Ocp-Apim-Subscription-Key': st.azureKey, 'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000', 'Pronunciation-Assessment': header, Accept: 'application/json' },
      body: wav,
    });
    if (!r.ok) throw new Error('Azure chấm điểm lỗi ' + r.status);
    const j = await r.json();
    const nb = j.NBest && j.NBest[0];
    if (!nb) throw new Error('Không nghe rõ – hãy nói lại to và rõ hơn.');
    const pa = nb.PronunciationAssessment || nb;
    const words = (nb.Words || []).map(w => {
      const a = w.PronunciationAssessment || w;
      return { word: w.Word, score: Math.round(a.AccuracyScore ?? 0), error: a.ErrorType || 'None',
        phonemes: (w.Phonemes || []).map(p => ({ p: p.Phoneme, score: Math.round((p.PronunciationAssessment || p).AccuracyScore ?? 0) })) };
    });
    return { engine: 'azure', score: Math.round(pa.PronScore ?? pa.AccuracyScore ?? 0), accuracy: Math.round(pa.AccuracyScore ?? 0),
      fluency: Math.round(pa.FluencyScore ?? 0), completeness: Math.round(pa.CompletenessScore ?? 0), heard: nb.Display || j.DisplayText || '', words };
  }

  /* ---------- Chấm phát âm bằng Gemini (nghe file ghi âm, chấm từng từ) ---------- */
  async function geminiAssess(blob, reference) {
    const wav = await toWav16k(blob);
    const b64 = await new Promise((res, rej) => { const fr = new FileReader(); fr.onload = () => res(String(fr.result).split(',')[1]); fr.onerror = rej; fr.readAsDataURL(wav); });
    const j = await AI.assess(b64, reference);
    return {
      engine: 'gemini', score: Math.max(0, Math.min(100, Math.round(+j.score || 0))), heard: j.heard || '', tips: j.tips_vi || '',
      words: (j.words || []).map(w => ({ word: w.word, score: Math.round(+w.score || 0), issue: w.issue || '' })),
    };
  }

  /* ---------- So khớp văn bản (dùng cho STT miễn phí & chấm câu gõ) ---------- */
  const NUM = { 0: 'null', 1: 'eins', 2: 'zwei', 3: 'drei', 4: 'vier', 5: 'fünf', 6: 'sechs', 7: 'sieben', 8: 'acht', 9: 'neun', 10: 'zehn', 11: 'elf', 12: 'zwölf', 13: 'dreizehn', 14: 'vierzehn', 15: 'fünfzehn', 16: 'sechzehn', 17: 'siebzehn', 18: 'achtzehn', 19: 'neunzehn', 20: 'zwanzig' };
  function tokens(s) {
    return String(s).toLowerCase()
      .replace(/[„“”"«»‚‘’'.,!?;:()\[\]…–—\-/]/g, ' ')
      .split(/\s+/).filter(Boolean)
      .map(w => /^\d+$/.test(w) && NUM[w] ? NUM[w] : w);
  }
  function lev(a, b) {
    if (a === b) return 0;
    const m = a.length, n = b.length;
    if (!m) return n; if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, i) => i);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[n];
  }
  const fold = w => w.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
  function wordMatch(ref, hyp) {
    if (ref === hyp) return 2;
    if (fold(ref) === fold(hyp)) return 1;             // gõ ae/oe/ue/ss thay vì umlaut
    if (ref.length > 4 && lev(ref, hyp) <= 1) return 1; // lỗi chính tả nhỏ
    return 0;
  }
  /** Căn chỉnh từ (LCS có trọng số). Trả về danh sách {w, st: ok|close|miss} theo câu mẫu + từ thừa */
  function align(refText, hypText) {
    const R = tokens(refText), H = tokens(hypText);
    const m = R.length, n = H.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
      const s = wordMatch(R[i - 1], H[j - 1]);
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1], s ? dp[i - 1][j - 1] + s : -1);
    }
    const out = [], extra = [];
    let i = m, j = n;
    while (i > 0 && j > 0) {
      const s = wordMatch(R[i - 1], H[j - 1]);
      if (s && dp[i][j] === dp[i - 1][j - 1] + s) { out.unshift({ w: R[i - 1], st: s === 2 ? 'ok' : 'close', got: H[j - 1] }); i--; j--; }
      else if (dp[i - 1][j] >= dp[i][j - 1]) { out.unshift({ w: R[i - 1], st: 'miss' }); i--; }
      else { extra.unshift(H[j - 1]); j--; }
    }
    while (i > 0) { out.unshift({ w: R[i - 1], st: 'miss' }); i--; }
    while (j > 0) { extra.unshift(H[j - 1]); j--; }
    const ok = out.filter(x => x.st === 'ok').length, close = out.filter(x => x.st === 'close').length;
    const score = m ? Math.max(0, Math.round(((ok + close * 0.75) / m) * 100 - extra.length * 5)) : 0;
    return { words: out, extra, score, ok, close, total: m };
  }

  return {
    speak, stop, listen, record, azureAssess, geminiAssess, align, tokens, lev, fold, loadVoices, pcmToWav,
    get voices() { return voices; },
    get sttSupported() { return sttSupported; },
    azureReady, scoreVoice,
  };
})();
