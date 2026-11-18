/* Gia sư AI – gọi trực tiếp Gemini hoặc OpenAI bằng API key của bạn (lưu cục bộ trên máy) */
const AI = (() => {
  const DEFAULT_MODEL = { gemini: 'gemini-3.8-flash', openai: 'gpt-4.1-mini' };
  const cfg = () => {
    const s = Store.s.settings;
    return { provider: s.aiProvider || 'gemini', key: s.aiKey, model: s.aiModel || DEFAULT_MODEL[s.aiProvider || 'gemini'] };
  };
  const ready = () => !!Store.s.settings.aiKey;

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
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(c.model)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': c.key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
      }),
    });
    const j = await r.json();
    if (!r.ok) {
      const msg = (j.error && j.error.message) || 'Gemini lỗi ' + r.status;
      // Model bị ngừng: Google thường gợi ý model thay thế ("…use models/gemini-x-flash…") → tự chuyển và thử lại một lần
      const sug = !retried && /no longer available|not found|deprecated|not supported/i.test(msg) && msg.match(/models\/([\w.-]+)/g);
      const next = sug && sug.map(s => s.slice(7)).find(m => m !== c.model);
      if (next) {
        Store.s.settings.aiModel = next; Store.save();
        if (window.App) App.toast('Đã tự chuyển sang model ' + next);
        return chat(messages, system, true);
      }
      throw new Error(msg);
    }
    const parts = j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts;
    if (!parts) throw new Error('Gemini không trả lời (có thể bị bộ lọc an toàn chặn).');
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

  return { chat, ready, SYSTEM, DEFAULT_MODEL };
})();
