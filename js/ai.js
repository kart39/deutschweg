/* Gia sư AI – gọi trực tiếp Gemini hoặc OpenAI bằng API key của bạn (lưu cục bộ trên máy) */
const AI = (() => {
  const DEFAULT_MODEL = { gemini: 'gemini-3.8-flash', openai: 'gpt-4.1-mini' };
  const cfg = () => {
    const s = Store.s.settings;
    return { provider: s.aiProvider || 'gemini', key: s.aiKey, model: s.aiModel || DEFAULT_MODEL[s.aiProvider || 'gemini'] };
  };
  const ready = () => !!Store.s.settings.aiKey;
  const geminiReady = () => !!Store.s.settings.aiKey && (Store.s.settings.aiProvider || 'gemini') === 'gemini';
  const DEFAULT_TTS = 'gemini-2.5-flash-preview-tts';

  /** Gọi Gemini generateContent. Nếu model bị ngừng và Google gợi ý model mới → tự lưu vào settings[settingKey] và thử lại 1 lần. */
  async function gemini(model, body, settingKey, retried) {
    const key = Store.s.settings.aiKey;
    if (!key) throw new Error('Chưa có API key Gemini (Cài đặt → Gia sư AI).');
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key }, body: JSON.stringify(body),
    });
    const j = await r.json();
    if (!r.ok) {
      const msg = (j.error && j.error.message) || 'Gemini lỗi ' + r.status;
      const sug = !retried && /no longer available|not found|deprecated|not supported/i.test(msg) && msg.match(/models\/([\w.-]+)/g);
      const next = sug && sug.map(s => s.slice(7)).find(m => m !== model);
      if (next) {
        Store.s.settings[settingKey] = next; Store.save();
        if (window.App) App.toast('Đã tự chuyển sang model ' + next);
        return gemini(next, body, settingKey, true);
      }
      throw new Error(msg);
    }
    const parts = j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts;
    if (!parts) throw new Error('Gemini không trả lời (có thể bị bộ lọc an toàn chặn).');
    return parts;
  }

  /** Đọc văn bản tiếng Đức bằng Gemini TTS → { data: base64 PCM, mimeType } */
  async function tts(text, voice) {
    const s = Store.s.settings;
    const parts = await gemini(s.ttsModel || DEFAULT_TTS, {
      contents: [{ parts: [{ text: `Say clearly in standard German (Hochdeutsch), with natural intonation: ${text}` }] }],
      generationConfig: { responseModalities: ['AUDIO'], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice || 'Kore' } } } },
    }, 'ttsModel');
    const audio = parts.find(p => p.inlineData && p.inlineData.data);
    if (!audio) throw new Error('Gemini không trả về âm thanh (model TTS có thể đã đổi tên – xem Cài đặt).');
    return audio.inlineData;
  }

  /** Chấm phát âm: gửi file WAV + câu mẫu → JSON điểm từng từ, nhận xét tiếng Việt */
  async function assess(wavBase64, reference) {
    const prompt = `Du bist Experte für deutsche Standardaussprache (Duden) und Aussprachetrainer für vietnamesische Lernende.
Die Audioaufnahme enthält einen Lernenden, der diesen Referenzsatz vorliest: "${reference}"
Bewerte streng aber fair: Vokallänge, Umlaute (ä ö ü), ich-/ach-Laut, R-Laute, Auslautverhärtung, Wortakzent, ausgelassene oder hinzugefügte Laute, Satzmelodie.
Antworte NUR mit JSON in genau diesem Format:
{"score": <0-100 Gesamtnote>, "heard": "<was du tatsächlich gehört hast>", "words": [{"word": "<Wort aus dem Referenzsatz>", "score": <0-100>, "issue": "<kurzer Fehlerhinweis auf Vietnamesisch, leer wenn korrekt>"}], "tips_vi": "<1–3 konkrete Tipps auf Vietnamesisch>"}
Jedes Wort des Referenzsatzes genau einmal in "words", in Reihenfolge. Wenn die Aufnahme leer oder unverständlich ist: score 0 und erkläre es in tips_vi.`;
    const parts = await gemini(cfg().model, {
      contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: 'audio/wav', data: wavBase64 } }] }],
      generationConfig: { responseMimeType: 'application/json', temperature: 0.2 },
    }, 'aiModel');
    const txt = parts.map(p => p.text || '').join('');
    try { return JSON.parse(txt.replace(/^```(?:json)?|```$/g, '').trim()); }
    catch (e) { throw new Error('Gemini trả kết quả chấm không hợp lệ – thử lại.'); }
  }

  /** messages: [{role:'user'|'assistant', content}] */
  async function chat(messages, system, retried) {
    const c = cfg();
    if (!c.key) throw new Error('Chưa có API key. Vào Cài đặt → Gia sư AI để nhập key Gemini hoặc OpenAI.');
    if (c.provider === 'openai') {
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + c.key },
        body: JSON.stringify({ model: c.model, messages: [{ role: 'system', content: system }, ...messages] }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error((j.error && j.error.message) || 'OpenAI lỗi ' + r.status);
      return j.choices[0].message.content;
    }
    const parts = await gemini(c.model, {
      systemInstruction: { parts: [{ text: system }] },
      contents: messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
    }, 'aiModel');
    return parts.map(p => p.text || '').join('');
  }

  const SYSTEM = {
    talk: (level, scenario) => `Du bist „Lena“, eine freundliche muttersprachliche Deutschlehrerin aus Deutschland. Du führst ein Gespräch mit einem vietnamesischen Lernenden auf Niveau ${level} (GER/CEFR).
Regeln:
- Antworte IMMER zuerst auf Deutsch, angepasst an Niveau ${level} (A1/A2: sehr kurze, einfache Sätze; B1/B2: natürlich; C1: anspruchsvoll, idiomatisch).
- Halte deine Antwort kurz (1–4 Sätze) und stelle am Ende eine Frage, damit das Gespräch weitergeht.
- Wenn der Lernende Fehler macht, füge danach eine Zeile hinzu, die mit "✏️" beginnt: korrigierte Version + sehr kurze Erklärung auf Vietnamesisch.
- Füge zum Schluss eine Zeile hinzu, die mit "🇻🇳" beginnt: vietnamesische Übersetzung deiner deutschen Antwort.
${scenario ? 'Rollenspiel-Situation: ' + scenario : 'Thema: frei, alltagsnah.'}`,
    write: level => `Bạn là giám khảo chấm thi viết tiếng Đức (chuẩn Goethe-Zertifikat ${level}). Người học là người Việt.
Hãy chấm bài viết theo cấu trúc sau (trình bày bằng tiếng Việt, ví dụ bằng tiếng Đức):
1. **Điểm ước tính**: x/100 và nhận xét trình độ thực tế (A1–C1).
2. **Bản đã sửa**: toàn bộ bài đã sửa, giữ ý người viết.
3. **Lỗi chi tiết**: bảng gồm cột Lỗi | Sửa | Giải thích (ngữ pháp/chính tả/từ vựng/văn phong).
4. **Nâng cấp**: 3–5 cụm từ/cấu trúc hay hơn phù hợp trình độ ${level}.
5. **Bài mẫu ngắn** cùng đề (nếu có đề).`,
    ask: level => `Bạn là giáo viên tiếng Đức giàu kinh nghiệm dạy người Việt. Giải thích bằng tiếng Việt, rõ ràng, có ví dụ tiếng Đức (kèm dịch) phù hợp trình độ ${level}. Khi đưa ví dụ tiếng Đức hãy đặt trong {{ }} để học viên bấm nghe được, ví dụ {{Ich gehe nach Hause.}}. Nếu có ngoại lệ quan trọng thì nêu ra. Ngắn gọn, dùng bảng khi so sánh.`,
    check: () => `Bạn là giáo viên tiếng Đức. Học viên người Việt dịch một câu. Đánh giá bản dịch của họ có ĐÚNG ngữ pháp và ĐÚNG nghĩa không. Trả lời ngắn bằng tiếng Việt: dòng đầu là "✅ ĐÚNG" hoặc "❌ CHƯA ĐÚNG", sau đó 1–3 câu giải thích và bản sửa nếu cần.`,
  };

  return { chat, tts, assess, ready, geminiReady, SYSTEM, DEFAULT_MODEL, DEFAULT_TTS };
})();
