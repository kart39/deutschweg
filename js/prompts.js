/* Mẫu prompt để tạo nội dung bằng ChatGPT / Gemini. Kết quả là JSON → dán vào trang "Nội dung & Prompt". */
const PROMPTS = (() => {
  const SPEC = {
    A1: { vocab: '14–18', dialog: '6–10', ex: '14–16', reading: 'không bắt buộc (nếu có: 60–100 từ, 3 câu hỏi)', writing: '20–40 từ (vd. điền form, tin nhắn ngắn)', theory: 'rất ngắn gọn, nhiều bảng chia và ví dụ' },
    A2: { vocab: '16–20', dialog: '8–12', ex: '15–18', reading: '120–180 từ, 3–4 câu hỏi', writing: '40–60 từ (tin nhắn, email ngắn)', theory: 'ngắn gọn, có bảng, so sánh với lỗi người Việt hay mắc' },
    B1: { vocab: '18–22', dialog: '10–14', ex: '16–20', reading: '220–320 từ, 4–5 câu hỏi', writing: '80–100 từ (email, bài forum bày tỏ ý kiến)', theory: 'đầy đủ, có bảng, ngoại lệ quan trọng' },
    B2: { vocab: '20–25 (ưu tiên collocation, Nomen-Verb-Verbindungen)', dialog: '10–14 (thảo luận, tranh luận)', ex: '18–22', reading: '350–450 từ (văn bản báo chí), 5 câu hỏi', writing: '150–200 từ (bài nghị luận/forum, thư trang trọng)', theory: 'chuyên sâu, có bảng, sắc thái nghĩa' },
    C1: { vocab: '20–25 (thành ngữ, collocation, từ học thuật, từ đồng nghĩa phân biệt sắc thái)', dialog: '10–14 (thảo luận học thuật/công việc)', ex: '18–22', reading: '450–600 từ (văn bản học thuật/báo chí chuyên sâu), 5–6 câu hỏi', writing: '230–300 từ (Erörterung, thư trang trọng, tóm tắt)', theory: 'chuyên sâu, văn phong, sắc thái, so sánh cấu trúc tương đương' },
  };

  const SCHEMA = `{
  "type": "unit",
  "id": "<MÃ UNIT>",
  "level": "<TRÌNH ĐỘ>",
  "order": <SỐ THỨ TỰ>,
  "title": "Tiêu đề tiếng Đức",
  "titleVi": "Tiêu đề tiếng Việt",
  "goals": ["Mục tiêu 1 (tiếng Việt)", "Mục tiêu 2"],
  "lessons": [
    {
      "id": "<MÃ UNIT>-l1",
      "title": "Tiêu đề bài học (tiếng Đức)",
      "titleVi": "Tiêu đề tiếng Việt",
      "theory": "Lý thuyết bằng TIẾNG VIỆT, định dạng Markdown (## tiêu đề, **đậm**, bảng | a | b |, danh sách -, > mẹo). MỌI ví dụ tiếng Đức đặt trong {{ }} để bấm nghe được, vd: {{Ich heiße Anna.}} (Tôi tên là Anna.)",
      "vocab": [
        { "de": "Tisch", "article": "der", "plural": "Tische", "pos": "noun", "ipa": "tɪʃ", "vi": "cái bàn", "example": "Der Tisch ist neu.", "exampleVi": "Cái bàn mới." },
        { "de": "gehen", "article": null, "plural": null, "pos": "verb", "forms": "geht, ging, ist gegangen", "ipa": "ˈɡeːən", "vi": "đi", "example": "Ich gehe nach Hause.", "exampleVi": "Tôi đi về nhà." },
        { "de": "schön", "article": null, "plural": null, "pos": "adj", "ipa": "ʃøːn", "vi": "đẹp", "example": "Das Wetter ist schön.", "exampleVi": "Thời tiết đẹp." }
      ],
      "dialogue": [
        { "speaker": "A", "name": "Anna", "de": "Hallo! Wie heißt du?", "vi": "Xin chào! Bạn tên là gì?" },
        { "speaker": "B", "name": "Minh", "de": "Ich heiße Minh.", "vi": "Mình tên là Minh." }
      ],
      "reading": { "title": "Tiêu đề bài đọc", "text": "Văn bản tiếng Đức (đoạn văn cách nhau bằng \\n\\n)", "vi": "Bản dịch tiếng Việt", "questions": [ { "q": "Câu hỏi (tiếng Đức hoặc Việt)", "options": ["A", "B", "C"], "answer": 0 } ] },
      "writing": { "task": "Đề bài viết (tiếng Đức + dịch tiếng Việt)", "minWords": 40, "sample": "Bài mẫu tiếng Đức" },
      "exercises": [
        { "type": "mcq", "q": "Câu hỏi", "options": ["đáp án 0", "đáp án 1", "đáp án 2", "đáp án 3"], "answer": 1, "explain": "Giải thích bằng tiếng Việt" },
        { "type": "gap", "text": "Ich ___ aus Vietnam.", "answers": ["komme"], "hint": "kommen", "vi": "Tôi đến từ Việt Nam.", "explain": "..." },
        { "type": "order", "words": ["Ich", "heiße", "Minh"], "answer": "Ich heiße Minh.", "answers": ["Ich heiße Minh."], "vi": "Tôi tên là Minh." },
        { "type": "translate", "vi": "Tôi sống ở Berlin.", "answers": ["Ich wohne in Berlin.", "Ich lebe in Berlin."] },
        { "type": "listen", "de": "Woher kommst du?", "vi": "Bạn đến từ đâu?" },
        { "type": "speak", "de": "Ich komme aus Vietnam.", "vi": "Tôi đến từ Việt Nam." },
        { "type": "match", "pairs": [["der Tisch", "cái bàn"], ["die Lampe", "cái đèn"], ["das Bett", "cái giường"], ["der Stuhl", "cái ghế"]] }
      ]
    }
  ]
}`;

  function unit(u) {
    const s = SPEC[u.level];
    return `Bạn là giáo viên tiếng Đức (DaF/DaZ) bản ngữ, có 20 năm kinh nghiệm dạy người Việt và luyện thi Goethe-Zertifikat, đồng thời là chuyên gia ngữ âm (Standardaussprache theo Duden – Das Aussprachewörterbuch). Hãy soạn NỘI DUNG HỌC hoàn chỉnh cho MỘT unit trong giáo trình tiếng Đức A1 → C1 dành cho người Việt tự học.

# THÔNG TIN UNIT
- Mã unit (id): ${u.id}
- Trình độ: ${u.level} (CEFR / Goethe-Zertifikat ${u.level})
- Thứ tự: ${u.order}
- Chủ đề: ${u.title} — ${u.titleVi}
- Tình huống / từ vựng: ${u.topics}
- Trọng tâm ngữ pháp: ${u.grammar}
- Số bài học (lessons): ${u.lessons}  →  id lần lượt: ${Array.from({ length: u.lessons }, (_, i) => `${u.id}-l${i + 1}`).join(', ')}
- Chia trọng tâm ngữ pháp hợp lý qua các lesson (mỗi lesson một điểm chính), lesson cuối có phần ôn tập tổng hợp.

# SỐ LƯỢNG CHO MỖI LESSON (trình độ ${u.level})
- vocab: ${s.vocab} mục
- dialogue: ${s.dialog} câu, tự nhiên như người Đức nói thật (2 người, speaker "A"/"B")
- exercises: ${s.ex} bài, PHẢI có đủ các loại: mcq (≥3), gap (≥3), order (≥2), translate (≥2), listen (≥2), speak (≥2), match (1, gồm 4–6 cặp)
- reading: ${s.reading}
- writing: ${s.writing}
- theory: ${s.theory}

# YÊU CẦU CHÍNH XÁC (BẮT BUỘC – kiểm tra lại từng mục trước khi trả lời)
1. Tiếng Đức chuẩn Hochdeutsch, chính tả mới (neue Rechtschreibung, ß/ss đúng), từ vựng đúng trình độ ${u.level} (ưu tiên Goethe-Wortliste ${u.level}).
2. Danh từ: "article" bắt buộc đúng (der/die/das), "de" chỉ ghi danh từ KHÔNG kèm mạo từ, "plural" ghi dạng số nhiều KHÔNG kèm mạo từ (vd "Tische"); nếu chỉ dùng số ít ghi "–"; nếu chỉ có số nhiều thì article "die" và ghi chú trong "vi". Danh từ viết hoa chữ cái đầu.
3. Động từ: "forms" = "er-Form Präsens, Präteritum, Perfekt" (vd "fährt, fuhr, ist gefahren"); động từ tách ghi rõ (vd "steht auf, stand auf, ist aufgestanden"); thêm thông tin cách (+ Akk / + Dat) hoặc giới từ đi kèm trong "vi" nếu cần.
4. "pos" chỉ dùng: noun, verb, adj, adv, prep, conj, pron, num, phrase, other.
5. IPA ("ipa"): theo Duden, KHÔNG có dấu / / hay [ ], có dấu trọng âm ˈ (và ˌ cho trọng âm phụ ở từ ghép); dùng ʁ cho r phụ âm, ɐ cho -er cuối, ɐ̯ cho r sau nguyên âm dài (Tür = tyːɐ̯), aɪ̯ aʊ̯ ɔʏ̯ cho nguyên âm đôi, n̩ l̩ cho âm tiết hoá (haben = ˈhaːbn̩), ç và x cho hai âm ch, ghi vô thanh hoá cuối từ (Tag = taːk), ʔ chỉ ghi trong từ (beachten = bəˈʔaxtn̩). Với cụm từ/"phrase" ghi IPA cả cụm.
6. Bản dịch tiếng Việt tự nhiên, chính xác; nếu từ có nhiều nghĩa, ghi nghĩa dùng trong bài.
7. Bài tập:
   - mcq: "answer" là CHỈ SỐ (0-based) của đáp án đúng; chỉ có DUY NHẤT 1 đáp án đúng; xáo trộn vị trí đáp án đúng.
   - gap: mỗi "___" (3 dấu gạch dưới) ứng với 1 phần tử trong "answers"; nếu chấp nhận nhiều đáp án cho 1 chỗ trống thì ngăn cách bằng "|" (vd "bin|war"); "hint" gợi ý (vd nguyên mẫu động từ).
   - order: "words" là các từ của câu đúng (đã xáo trộn), KHÔNG chứa dấu câu cuối; "answer" là câu đúng có dấu câu; "answers" liệt kê MỌI trật tự đúng ngữ pháp có thể ghép từ đúng các từ đó (vd đảo trạng từ lên đầu).
   - translate: dịch Việt → Đức, "answers" liệt kê 2–4 bản dịch đúng phổ biến.
   - listen / speak: câu tiếng Đức tự nhiên, độ dài phù hợp trình độ (A1: 3–7 từ; C1: 12–25 từ).
   - "explain": giải thích ngắn bằng tiếng Việt vì sao đúng/sai (bắt buộc với mcq và gap).
8. Lý thuyết viết cho người Việt: giải thích dễ hiểu, so sánh với tiếng Việt/Anh khi có ích, chỉ ra lỗi người Việt hay mắc (phát âm, trật tự từ, giống danh từ…), có bảng chia/biến cách đầy đủ. Mọi câu/từ tiếng Đức trong lý thuyết đặt trong {{ }}.
9. Nội dung văn hoá chính xác về Đức/Áo/Thuỵ Sĩ, cập nhật hiện nay.

# ĐỊNH DẠNG ĐẦU RA
- CHỈ trả về MỘT đối tượng JSON hợp lệ (dấu nháy kép, không có dấu phẩy thừa, không comment, không giải thích thêm trước hay sau).
- Đúng cấu trúc mẫu dưới đây (field nào không có thì bỏ đi; "reading", "writing" có thể bỏ ở A1).
- KHÔNG được rút gọn kiểu "..." hay "tương tự như trên". Viết đầy đủ mọi phần tử.
- Nếu nội dung quá dài cho một câu trả lời: chỉ trả về JSON chứa các lesson đầu tiên (giữ nguyên "type", "id", "level", "order", "title" của unit). Tôi sẽ nhắn "tiếp" và bạn trả về một JSON unit MỚI cùng id unit, chỉ chứa các lesson còn lại. (Ứng dụng sẽ tự gộp.)

# CẤU TRÚC JSON MẪU
${SCHEMA.replace(/<MÃ UNIT>/g, u.id).replace('<TRÌNH ĐỘ>', u.level).replace('<SỐ THỨ TỰ>', u.order)}`;
  }

  function review(level) {
    return `Bạn là biên tập viên kiêm kiểm định viên giáo trình tiếng Đức (người bản ngữ, chuyên gia ngữ âm theo Duden – Das Aussprachewörterbuch, giám khảo Goethe-Zertifikat). Dưới đây là JSON nội dung bài học ${level ? 'trình độ ' + level + ' ' : ''}do một AI khác soạn cho người Việt. Hãy KIỂM TRA KỸ TỪNG PHẦN TỬ và SỬA mọi lỗi:

1. Mạo từ (article), số nhiều (plural), viết hoa danh từ, chính tả (ß/ss, umlaut).
2. IPA theo Duden: ʁ / ɐ / ɐ̯, nguyên âm dài–ngắn (ː), nguyên âm đôi aɪ̯ aʊ̯ ɔʏ̯, ç / x, vô thanh hoá cuối từ, vị trí trọng âm ˈ. Không có dấu / / [ ].
3. Chia động từ, "forms" (er-Form, Präteritum, Perfekt với haben/sein đúng), cách (Akk/Dat), giới từ đi kèm.
4. Ngữ pháp & tính tự nhiên của mọi câu tiếng Đức (ví dụ, hội thoại, bài đọc, bài mẫu).
5. Bản dịch tiếng Việt: đúng nghĩa, tự nhiên.
6. Bài tập: mcq chỉ có đúng 1 đáp án đúng và "answer" trỏ đúng chỉ số; gap: số "___" bằng số phần tử "answers", liệt kê đủ biến thể chấp nhận được (ngăn bằng "|"); order: "words" ghép lại được đúng "answer", "answers" có đủ các trật tự đúng; translate: bổ sung bản dịch đúng còn thiếu.
7. Lý thuyết: không có thông tin sai, ví dụ tiếng Đức nằm trong {{ }}, phù hợp trình độ.
8. Độ khó phù hợp CEFR ${level || ''}.

ĐẦU RA: CHỈ trả về JSON ĐÃ SỬA HOÀN CHỈNH (giữ nguyên cấu trúc, giữ nguyên mọi id), viết đầy đủ không rút gọn, và thêm ở cấp gốc một trường:
"_review": { "changes": ["liệt kê ngắn từng chỗ đã sửa"], "confidence": "high|medium|low" }
Không viết gì ngoài JSON.

JSON CẦN KIỂM TRA:
<<<DÁN JSON VÀO ĐÂY>>>`;
  }

  function deck(level, topic, n) {
    return `Bạn là giáo viên tiếng Đức bản ngữ, chuyên gia từ vựng và ngữ âm (Duden). Hãy tạo một BỘ TỪ VỰNG để học bằng flashcard cho người Việt.
- Trình độ: ${level} (ưu tiên Goethe-Wortliste ${level})
- Chủ đề: ${topic}
- Số lượng: ${n} mục, không trùng lặp, sắp theo mức độ thông dụng.

Yêu cầu: danh từ có "article" đúng và "plural" (không kèm mạo từ, "–" nếu không có); động từ có "forms" ("er-Form, Präteritum, Perfekt"); IPA theo Duden (không có / / [ ], có ˈ, dùng ʁ ɐ ɐ̯ aɪ̯ aʊ̯ ɔʏ̯ ç x n̩); câu ví dụ tự nhiên đúng trình độ + dịch tiếng Việt; "pos" ∈ noun, verb, adj, adv, prep, conj, pron, num, phrase, other.

CHỈ trả về JSON hợp lệ, không giải thích, không rút gọn:
{
  "type": "deck",
  "id": "deck-${level.toLowerCase()}-${topic.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 30) || 'chu-de'}",
  "level": "${level}",
  "title": "${topic}",
  "cards": [
    { "de": "Bahnhof", "article": "der", "plural": "Bahnhöfe", "pos": "noun", "ipa": "ˈbaːnˌhoːf", "vi": "nhà ga", "example": "Der Bahnhof ist nicht weit.", "exampleVi": "Nhà ga không xa." }
  ]
}`;
  }

  const fixJson = `Đoạn JSON dưới đây bị lỗi cú pháp hoặc bị cắt cụt. Hãy sửa để thành JSON hợp lệ, GIỮ NGUYÊN toàn bộ nội dung đã có, hoàn thiện phần bị cắt (nếu bị cắt giữa chừng thì bỏ phần tử dở dang cuối cùng và đóng ngoặc đúng). Chỉ trả về JSON, không giải thích.

<<<DÁN JSON LỖI VÀO ĐÂY>>>`;

  // Quy trình gọn: dán SETUP 1 lần cho mỗi cuộc trò chuyện, sau đó chỉ gửi tin nhắn ngắn cho từng unit.
  function setup() {
    const full = unit({ id: 'a1-u00', level: 'A1', order: 0, title: 'X', titleVi: 'X', topics: 'X', grammar: 'X', lessons: 3 });
    const rules = full.slice(full.indexOf('# YÊU CẦU CHÍNH XÁC'))
      .replace(/a1-u00/g, '<id unit>').replace(/"level": "A1"/, '"level": "<trình độ>"').replace(/"order": 0/, '"order": <thứ tự>')
      .replace(/trình độ A1/g, 'trình độ của unit').replace(/Goethe-Wortliste A1/g, 'Goethe-Wortliste của trình độ đó');
    const table = Object.entries(SPEC).map(([lv, s]) => `| ${lv} | ${s.vocab} | ${s.dialog} | ${s.ex} | ${s.reading} | ${s.writing} |`).join('\n');
    return `Bạn là giáo viên tiếng Đức (DaF/DaZ) bản ngữ, có 20 năm kinh nghiệm dạy người Việt và luyện thi Goethe-Zertifikat, đồng thời là chuyên gia ngữ âm (Standardaussprache theo Duden – Das Aussprachewörterbuch). Trong cuộc trò chuyện này, bạn sẽ soạn NỘI DUNG HỌC cho từng unit của giáo trình tiếng Đức A1 → C1 dành cho người Việt tự học. Nội dung sẽ được nạp tự động vào một ứng dụng web, nên phải ĐÚNG TUYỆT ĐỐI và ĐÚNG ĐỊNH DẠNG.

Mỗi lần tôi gửi tin nhắn bắt đầu bằng "UNIT", kèm: id, trình độ, thứ tự, chủ đề, tình huống, trọng tâm ngữ pháp, số lesson. Bạn trả về JSON của unit đó theo các quy tắc dưới đây. Chia trọng tâm ngữ pháp hợp lý qua các lesson (mỗi lesson một điểm chính); lesson cuối có phần ôn tập tổng hợp. id lesson = <id unit>-l1, -l2, …

# SỐ LƯỢNG CHO MỖI LESSON THEO TRÌNH ĐỘ
| Trình độ | vocab | dialogue (câu) | exercises | reading | writing |
|---|---|---|---|---|---|
${table}
- Các con số trên là mức TỐI THIỂU. Hãy soạn DỒI DÀO hơn (gấp 1,5–2 lần: nhiều từ vựng, nhiều ví dụ, nhiều bài tập đa dạng, lý thuyết đầy đủ kèm ngoại lệ và lỗi thường gặp) — một biên tập viên sẽ chọn lọc phần tốt nhất, nên dư còn hơn thiếu. Nhưng CHẤT LƯỢNG và ĐỘ CHÍNH XÁC luôn đặt trước số lượng.
- exercises PHẢI có đủ các loại: mcq (≥3), gap (≥3), order (≥2), translate (≥2), listen (≥2), speak (≥2), match (1, gồm 4–6 cặp).
- dialogue: 2 người (speaker "A"/"B"), tự nhiên như người Đức nói thật.
- theory: viết bằng tiếng Việt; A1–A2 ngắn gọn nhiều bảng & ví dụ; B1 trở lên đầy đủ, có ngoại lệ và sắc thái.

${rules}

Nếu đã hiểu, chỉ trả lời: "Sẵn sàng – hãy gửi UNIT đầu tiên." rồi chờ tôi.`;
  }

  function unitShort(u) {
    return `UNIT
- id: ${u.id}
- Trình độ: ${u.level}
- Thứ tự: ${u.order}
- Chủ đề: ${u.title} — ${u.titleVi}
- Tình huống / từ vựng: ${u.topics}
- Trọng tâm ngữ pháp: ${u.grammar}
- Số lesson: ${u.lessons} (${Array.from({ length: u.lessons }, (_, i) => `${u.id}-l${i + 1}`).join(', ')})
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.`;
  }

  // Một prompt chứa toàn bộ danh sách unit: AI làm lần lượt, người dùng chỉ gõ "tiếp".
  function allUnits(units) {
    const list = units.map(u => `${u.id} | ${u.level} | ${u.title} — ${u.titleVi} | Tình huống: ${u.topics} | Ngữ pháp: ${u.grammar} | ${u.lessons} lesson`).join('\n');
    return `NHIỆM VỤ TỔNG: soạn LẦN LƯỢT toàn bộ ${units.length} unit dưới đây, đúng thứ tự, theo đúng mọi quy tắc và cấu trúc JSON tôi đã đưa ở tin nhắn thiết lập.

CÁCH LÀM VIỆC:
1. Mỗi câu trả lời chỉ làm MỘT unit (hoặc một phần của unit nếu quá dài). Không gộp 2 unit vào một câu trả lời.
2. Dòng ĐẦU TIÊN của mỗi câu trả lời ghi nhãn dạng:  === a1-u02 (phần 1/1) ===   (nếu chia phần thì ghi phần 1/2, 2/2…). Ngay sau đó là JSON, không viết gì thêm.
3. Khi tôi gõ "tiếp", bạn làm phần/unit tiếp theo trong danh sách. Không hỏi lại, không tóm tắt, không xin xác nhận.
4. Nếu tôi gõ "làm lại <id>" thì soạn lại unit đó. Nếu tôi gõ "từ <id>" thì tiếp tục từ unit đó.
5. Soạn DỒI DÀO gấp 1,5–2 lần mức tối thiểu trong bảng số lượng (một biên tập viên sẽ chọn lọc), nhưng độ chính xác luôn đặt lên trước.
6. Giữ chất lượng như nhau từ unit đầu đến unit cuối: unit sau KHÔNG được ngắn hơn hay sơ sài hơn unit đầu. Từ vựng không lặp lại các unit trước trừ khi ôn tập có chủ đích.
7. Tiến độ ngữ pháp phải liền mạch: không dùng cấu trúc chưa học ở unit trước trong bài tập (trừ bài đọc/hội thoại có chú thích).

DANH SÁCH UNIT (id | trình độ | chủ đề | tình huống | ngữ pháp | số lesson):
${list}

Bắt đầu ngay với unit đầu tiên: ${units[0].id}.`;
  }

  return { unit, review, deck, fixJson, setup, unitShort, allUnits, SPEC };
})();
