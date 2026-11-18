# PROMPT TỔNG – giao toàn bộ việc một lần

**Cách dùng (cho cả ChatGPT và Gemini):**
1. Mở **cuộc trò chuyện mới**, dán **toàn bộ** khối prompt bên dưới, gửi. Không cần PROMPT 0 nữa.
2. AI tự làm liên tục, mỗi mục một file JSON, định kỳ đóng gói **deutschweg.zip**.
3. Khi AI dừng vì hết lượt: gõ **`tiếp`**. Muốn lấy file ngay: gõ **`zip`**.
4. Gửi Claude file **deutschweg.zip** của mỗi AI (đổi tên thành `chatgpt.zip`, `gemini.zip` cho dễ phân biệt) – gửi bất cứ lúc nào, gửi nhiều lần cũng được. Claude so sánh, chọn bản tốt hơn cho từng mục, sửa lỗi và đưa lên web.
5. Nếu AI không tạo được file mà in JSON ra chat: cứ chép cả đoạn gửi Claude như trước.
6. Khi cuộc trò chuyện quá dài, AI bắt đầu làm sơ sài: mở cuộc mới → dán lại prompt này → gõ `từ <id tiếp theo>` (xem trong TIEN-DO.md).

Khối lượng: 55 unit · 20 gói động từ (500 động từ) · 75 chủ điểm ngữ pháp · 66 bộ từ vựng · 60 bài đọc · 10 đề thi.

````text
# NHIỆM VỤ TỔNG: XÂY TOÀN BỘ NỘI DUNG CHO ỨNG DỤNG HỌC TIẾNG ĐỨC A1 → C1 (cho người Việt)

Bạn là cả một nhóm biên soạn: giáo viên DaF bản ngữ 20 năm dạy người Việt, chuyên gia ngữ âm (Duden – Das Aussprachewörterbuch), giám khảo Goethe-Zertifikat A1–C2, biên tập viên từ điển (Duden, DWDS). Bạn làm TOÀN BỘ công việc dưới đây một mạch, tự động, không dừng lại hỏi. Dữ liệu được nạp tự động vào ứng dụng, nên phải ĐÚNG TUYỆT ĐỐI và ĐÚNG ĐỊNH DẠNG JSON. Một biên tập viên khác sẽ so sánh kết quả của bạn với một AI khác và chọn bản tốt hơn – hãy làm thật xuất sắc.

## A. CÁCH LÀM VIỆC (quan trọng nhất)
1. LÀM LIÊN TỤC từ mục đầu đến mục cuối của DANH SÁCH CÔNG VIỆC (phần E). Không hỏi xác nhận, không tóm tắt giữa chừng, không dừng sau mỗi mục.
2. MỖI MỤC = MỘT FILE JSON riêng, tên file = id + ".json", đặt trong thư mục theo loại:
   units/  decks/  grammar/  verbs/  readings/  exams/
3. Nếu bạn có công cụ tạo file / chạy code (Python, canvas, sandbox…):
   - Ghi từng file vào thư mục "deutschweg/" theo cấu trúc trên.
   - Dùng code KIỂM TRA mỗi file: JSON hợp lệ; mcq có đúng 1 đáp án và "answer" nằm trong phạm vi; số "___" bằng số phần tử "answers"; "words" của order ghép lại được đúng "answer"; danh từ có article der/die/das; IPA không có / / [ ]. Sửa trước khi chuyển mục.
   - Sau mỗi nhóm khoảng 5 mục, đóng gói TOÀN BỘ thư mục thành "deutschweg.zip" (ghi đè bản cũ) và cung cấp link tải, để không mất dữ liệu nếu bị ngắt.
   - Cập nhật file "deutschweg/TIEN-DO.md": danh sách id đã xong, id đang làm, id còn lại.
4. Nếu KHÔNG có công cụ tạo file: in ra lần lượt từng mục, mỗi mục bắt đầu bằng dòng nhãn  === <id> (phần x/y) ===  rồi đến JSON, không viết gì khác.
5. Khi chạm giới hạn độ dài/thời gian của một lượt trả lời: dừng ở ranh giới giữa hai file (không cắt giữa JSON), ghi rõ dòng cuối "ĐÃ XONG ĐẾN: <id> · TIẾP THEO: <id>". Khi tôi gõ "tiếp", làm tiếp từ mục tiếp theo, giữ nguyên chất lượng.
6. Lệnh của tôi: "tiếp" = làm tiếp · "làm lại <id>" = soạn lại mục đó · "từ <id>" = nhảy tới mục đó · "zip" = đóng gói ngay những gì đã có.
7. CHẤT LƯỢNG ĐỀU từ mục đầu đến mục cuối: mục thứ 300 phải kỹ như mục thứ 1. Soạn DỒI DÀO (gấp 1,5–2 lần mức tối thiểu) nhưng độ chính xác luôn đặt trước số lượng.
8. Nội dung là SÁNG TÁC MỚI. Không chép nguyên văn sách, báo, đề thi chính thức (Goethe, telc, TestDaF) hay tài liệu có bản quyền. Không chèn đường link vào nội dung.

## B. QUY TẮC CHUNG CHO MỌI LOẠI NỘI DUNG
QUY TẮC CHUNG (áp dụng cho mọi nhiệm vụ trong cuộc trò chuyện này):
1. Tiếng Đức chuẩn Hochdeutsch, chính tả mới, tự nhiên như người bản ngữ viết. Mức độ khó đúng trình độ CEFR được yêu cầu.
2. Mục từ vựng dùng cấu trúc:
   { "de": "Bahnhof", "article": "der", "plural": "Bahnhöfe", "pos": "noun", "ipa": "ˈbaːnˌhoːf", "vi": "nhà ga", "example": "Der Bahnhof ist nicht weit.", "exampleVi": "Nhà ga không xa." }
   - Danh từ: "article" der/die/das bắt buộc; "de" KHÔNG kèm mạo từ; "plural" KHÔNG kèm mạo từ, "–" nếu không có số nhiều.
   - Động từ: thêm "forms": "er-Form Präsens, Präteritum, Perfekt" (vd "fährt, fuhr, ist gefahren"), ghi cách/giới từ đi kèm trong "vi" (vd "chờ (auf + Akk)").
   - "pos" ∈ noun, verb, adj, adv, prep, conj, pron, num, phrase, other. Danh từ không dùng thì "article": null, "plural": null.
   - IPA theo Duden, KHÔNG có / / hay [ ]; có ˈ (ˌ cho trọng âm phụ); dùng ʁ (r phụ âm), ɐ (-er cuối), ɐ̯ (r sau nguyên âm dài, vd Tür = tyːɐ̯), aɪ̯ aʊ̯ ɔʏ̯, n̩ l̩, ç và x, ɡ (không dùng g Latin), vô thanh hoá cuối từ (Tag = taːk).
3. Văn bản tiếng Việt: chính xác, tự nhiên. Trong mọi trường lý thuyết/giải thích dạng Markdown, đặt MỌI ví dụ tiếng Đức trong {{ }} để ứng dụng đọc được (vd {{Ich gehe nach Hause.}}).
4. Bài tập dùng các loại sau (giống hệt giáo trình chính):
   {"type":"mcq","q":"…","options":["…","…","…","…"],"answer":<chỉ số 0-based>,"explain":"…"}   – chỉ 1 đáp án đúng
   {"type":"gap","text":"Ich ___ müde.","answers":["bin"],"hint":"sein","vi":"…","explain":"…"}   – mỗi ___ một phần tử answers; nhiều đáp án chấp nhận: "a|b"
   {"type":"order","words":["…"],"answer":"Câu đúng.","answers":["mọi trật tự đúng"],"vi":"…"}   – words không có dấu câu cuối
   {"type":"translate","vi":"…","answers":["2–4 bản dịch đúng"]}
   {"type":"listen","de":"…","vi":"…"}   {"type":"speak","de":"…","vi":"…"}
   {"type":"match","pairs":[["…","…"], …]}   – 4–6 cặp, không trùng vế
7. Soạn DỒI DÀO (gấp 1,5–2 lần mức tối thiểu); một biên tập viên sẽ chọn lọc. Độ chính xác luôn đặt trước số lượng.
8. Nội dung phải là SÁNG TÁC MỚI của bạn. Không chép nguyên văn sách, báo, đề thi chính thức (Goethe, telc, TestDaF) hay bất kỳ tài liệu có bản quyền nào – chỉ mô phỏng định dạng.

## C. GIÁO TRÌNH CHÍNH – UNIT (thư mục units/)
# SỐ LƯỢNG CHO MỖI LESSON THEO TRÌNH ĐỘ
| Trình độ | vocab | dialogue (câu) | exercises | reading | writing |
|---|---|---|---|---|---|
| A1 | 14–18 | 6–10 | 14–16 | không bắt buộc (nếu có: 60–100 từ, 3 câu hỏi) | 20–40 từ (vd. điền form, tin nhắn ngắn) |
| A2 | 16–20 | 8–12 | 15–18 | 120–180 từ, 3–4 câu hỏi | 40–60 từ (tin nhắn, email ngắn) |
| B1 | 18–22 | 10–14 | 16–20 | 220–320 từ, 4–5 câu hỏi | 80–100 từ (email, bài forum bày tỏ ý kiến) |
| B2 | 20–25 (ưu tiên collocation, Nomen-Verb-Verbindungen) | 10–14 (thảo luận, tranh luận) | 18–22 | 350–450 từ (văn bản báo chí), 5 câu hỏi | 150–200 từ (bài nghị luận/forum, thư trang trọng) |
| C1 | 20–25 (thành ngữ, collocation, từ học thuật, từ đồng nghĩa phân biệt sắc thái) | 10–14 (thảo luận học thuật/công việc) | 18–22 | 450–600 từ (văn bản học thuật/báo chí chuyên sâu), 5–6 câu hỏi | 230–300 từ (Erörterung, thư trang trọng, tóm tắt) |
- Các con số trên là mức TỐI THIỂU. Hãy soạn DỒI DÀO hơn (gấp 1,5–2 lần: nhiều từ vựng, nhiều ví dụ, nhiều bài tập đa dạng, lý thuyết đầy đủ kèm ngoại lệ và lỗi thường gặp) — một biên tập viên sẽ chọn lọc phần tốt nhất, nên dư còn hơn thiếu. Nhưng CHẤT LƯỢNG và ĐỘ CHÍNH XÁC luôn đặt trước số lượng.
- exercises PHẢI có đủ các loại: mcq (≥3), gap (≥3), order (≥2), translate (≥2), listen (≥2), speak (≥2), match (1, gồm 4–6 cặp).
- dialogue: 2 người (speaker "A"/"B"), tự nhiên như người Đức nói thật.
- theory: viết bằng tiếng Việt; A1–A2 ngắn gọn nhiều bảng & ví dụ; B1 trở lên đầy đủ, có ngoại lệ và sắc thái.

# YÊU CẦU CHÍNH XÁC (BẮT BUỘC – kiểm tra lại từng mục trước khi trả lời)
1. Tiếng Đức chuẩn Hochdeutsch, chính tả mới (neue Rechtschreibung, ß/ss đúng), từ vựng đúng trình độ của unit (ưu tiên Goethe-Wortliste của trình độ đó).
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
{
  "type": "unit",
  "id": "<id unit>",
  "level": "<trình độ>",
  "order": <thứ tự>,
  "title": "Tiêu đề tiếng Đức",
  "titleVi": "Tiêu đề tiếng Việt",
  "goals": ["Mục tiêu 1 (tiếng Việt)", "Mục tiêu 2"],
  "lessons": [
    {
      "id": "<id unit>-l1",
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
      "reading": { "title": "Tiêu đề bài đọc", "text": "Văn bản tiếng Đức (đoạn văn cách nhau bằng \n\n)", "vi": "Bản dịch tiếng Việt", "questions": [ { "q": "Câu hỏi (tiếng Đức hoặc Việt)", "options": ["A", "B", "C"], "answer": 0 } ] },
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
}

## D. KHO KIẾN THỨC
### D1. Bộ từ vựng (thư mục decks/)
NHIỆM VỤ: BỘ TỪ VỰNG (flashcard) theo trình độ, bao phủ toàn bộ Goethe-Wortliste A1–B1 và từ vựng B2–C1 thông dụng.
Làm lần lượt từng bộ trong danh sách dưới (mỗi câu trả lời 1 bộ). Mỗi bộ 70–100 mục (có thể chia phần), không trùng với các bộ trước, sắp theo mức độ thông dụng. Bộ ghi "Redewendungen/Redemittel/Kollokationen" thì "pos": "phrase" và giải thích nghĩa bóng + ngữ cảnh dùng trong "vi".

Cấu trúc JSON mỗi bộ:
{ "type": "deck", "id": "<id>", "level": "<A1…C1>", "title": "<tên bộ tiếng Đức> – <tên tiếng Việt>", "cards": [ <mục từ vựng theo quy tắc 2> ] }

### D2. Cẩm nang ngữ pháp (thư mục grammar/)
NHIỆM VỤ: CẨM NANG NGỮ PHÁP A1 → C1 (tra cứu + luyện tập), viết cho người Việt.
Làm lần lượt từng chủ điểm dưới đây, mỗi câu trả lời 1 chủ điểm.

Yêu cầu nội dung "body" (Markdown tiếng Việt, ví dụ trong {{ }}):
## Tổng quan (dùng khi nào, ý nghĩa) · ## Cấu tạo / quy tắc (bảng biến cách/chia ĐẦY ĐỦ) · ## Ví dụ (≥ 12 câu tự nhiên kèm dịch) · ## Ngoại lệ & lưu ý · ## So sánh (với cấu trúc dễ nhầm, với tiếng Việt/Anh) · ## Mẹo ghi nhớ.
"mistakes": ≥ 5 lỗi người Việt hay mắc (ghi câu sai ✗ → câu đúng ✓ + lý do). "exercises": ≥ 15 bài, đủ các loại mcq, gap, order, translate, listen, speak, match. "related": id các chủ điểm liên quan trong danh sách.

Cấu trúc JSON:
{ "type": "grammar", "id": "<id>", "level": "<A1…C1>", "order": <số thứ tự trong trình độ>, "topic": "<nhóm: Verben | Nomen & Artikel | Satzbau | Präpositionen | Adjektive | Konnektoren | Passiv | Konjunktiv | Wortbildung | Stil>", "title": "<tên tiếng Đức>", "titleVi": "<tên tiếng Việt>", "body": "…", "mistakes": ["…"], "related": ["gr-…"], "exercises": [ … ] }

### D3. Cơ sở dữ liệu động từ (thư mục verbs/)
NHIỆM VỤ: CƠ SỞ DỮ LIỆU ĐỘNG TỪ – 500 động từ tiếng Đức thông dụng nhất (A1 → C1), chia đầy đủ.
Bước 1 (ngầm): tự lập danh sách 500 động từ theo tần suất sử dụng, gồm động từ mạnh/yếu/hỗn hợp, tách được, phản thân. Không trùng lặp.
Bước 2: trả về theo gói 25 động từ: verbs-01 (25 động từ thông dụng nhất) … verbs-20. Mỗi câu trả lời 1 gói.

Cấu trúc mỗi gói:
{ "type": "verbs", "id": "verbs-01", "verbs": [
  { "inf": "aufstehen", "vi": "thức dậy, đứng dậy", "level": "A1", "aux": "sein",
    "praesens": ["stehe auf", "stehst auf", "steht auf", "stehen auf", "steht auf", "stehen auf"],
    "praeteritum": ["stand auf", "standest auf", "stand auf", "standen auf", "standet auf", "standen auf"],
    "partizip": "aufgestanden",
    "konj2": ["stünde auf|würde aufstehen", "stündest auf|würdest aufstehen", "stünde auf|würde aufstehen", "stünden auf|würden aufstehen", "stündet auf|würdet aufstehen", "stünden auf|würden aufstehen"],
    "imperativ": ["steh auf!|stehe auf!", "steht auf!", "stehen Sie auf!"],
    "rektion": "", "reflexive": false,
    "example": "Ich stehe jeden Tag um sechs Uhr auf.", "exampleVi": "Mỗi ngày tôi dậy lúc sáu giờ." } ] }

Quy tắc:
- 6 ngôi theo thứ tự: ich, du, er/sie/es, wir, ihr, sie/Sie. Động từ tách: ghi cả tiền tố như ví dụ.
- Nhiều dạng đúng thì ngăn bằng "|" (vd "aßest|aßt"). konj2: với động từ mạnh ít dùng dạng gốc, ghi dạng würde trước.
- "aux": "haben", "sein" hoặc "haben|sein" (ghi rõ khi nào dùng cái nào trong "vi").
- "rektion": cách/giới từ đi kèm (vd "+ Dat", "auf + Akk", "sich + Akk"). Động từ phản thân: "inf" ghi "sich freuen", praesens ghi "freue mich", … và "reflexive": true.
- "level": trình độ Goethe mà động từ xuất hiện lần đầu.
Kiểm tra từng dạng chia hai lần trước khi trả lời – đây là dữ liệu để chấm điểm học viên.

### D4. Thư viện bài đọc (thư mục readings/)

Theo trình độ:
- A1: 12 bài, mỗi bài 80–150 từ; thể loại: tin nhắn, email, thông báo, quảng cáo, thực đơn, mô tả người/nhà.
- A2: 12 bài, mỗi bài 150–250 từ; thể loại: email, blog, bài báo ngắn, thông báo, truyện ngắn đơn giản.
- B1: 12 bài, mỗi bài 250–400 từ; thể loại: bài báo, bài forum, phỏng vấn, truyện, văn bản thông tin.
- B2: 12 bài, mỗi bài 400–600 từ; thể loại: bài báo, bình luận, văn bản khoa học phổ thông, truyện ngắn.
- C1: 12 bài, mỗi bài 600–900 từ; thể loại: bài luận, văn bản học thuật, xã luận, phân tích, văn học.
Chủ đề đa dạng, gắn với cuộc sống ở Đức/Áo/Thuỵ Sĩ, cập nhật hiện nay; một vài bài liên hệ Việt Nam. Văn phong tự nhiên, mỗi bài một giọng văn khác.

Cấu trúc:
{ "type": "reading", "id": "rd-b1-01", "level": "B1", "genre": "Zeitungsartikel", "title": "<tiêu đề Đức>", "titleVi": "<tiêu đề Việt>",
  "text": "<văn bản; đoạn cách nhau bằng \n\n>", "vi": "<bản dịch tiếng Việt đầy đủ>",
  "glossary": [ <10–25 mục từ vựng khó theo quy tắc 2> ],
  "questions": [ { "q": "<câu hỏi>", "options": ["…", "…", "…"], "answer": <chỉ số> } ] }
Câu hỏi: 5–8 câu, kiểu Goethe (richtig/falsch, a/b/c, ý chính, suy luận); chỉ 1 đáp án đúng.

### D5. Đề thi thử (thư mục exams/)
NHIỆM VỤ: ĐỀ THI THỬ mô phỏng định dạng Goethe-Zertifikat (SÁNG TÁC MỚI hoàn toàn, không chép đề chính thức).

Cấu trúc:
{ "type": "exam", "id": "ex-b1-1", "level": "B1", "title": "Modelltest B1 – Satz 1", "minutes": 190, "intro": "<giới thiệu cấu trúc đề, thang điểm, mẹo làm bài – tiếng Việt>",
  "sections": [
    { "title": "Lesen – Teil 1", "skill": "lesen", "instructions": "<hướng dẫn bằng tiếng Đức + dịch Việt>", "text": "<văn bản đọc>", "exercises": [ <mcq / gap … với "explain" tiếng Việt> ] },
    { "title": "Hören – Teil 1", "skill": "hoeren", "instructions": "…", "audio": "<KỊCH BẢN bài nghe – ứng dụng sẽ đọc to, KHÔNG hiển thị>", "exercises": [ { "type": "mcq", …, "audio": "<kịch bản riêng cho câu này nếu mỗi câu một đoạn nghe>" } ] },
    { "title": "Schreiben – Teil 1", "skill": "schreiben", "task": "<đề bài đầy đủ>", "minWords": 80, "sample": "<bài mẫu đạt điểm cao>" },
    { "title": "Sprechen – Teil 1", "skill": "sprechen", "task": "<đề nói + gợi ý>", "sample": "<bài nói mẫu>" } ] }

Yêu cầu: số phần (Teil), số câu, độ dài văn bản và thời gian sát với cấu trúc thật của từng trình độ (Goethe A1 Start Deutsch 1, A2, B1, B2, C1 bản hiện hành). Kịch bản nghe tự nhiên (hội thoại, thông báo, phỏng vấn, radio). Mọi câu hỏi có đúng 1 đáp án và có "explain" chỉ ra chỗ trong văn bản/bài nghe chứa đáp án.

## E. DANH SÁCH CÔNG VIỆC (làm đúng thứ tự)
Đã có sẵn, KHÔNG làm: a1-u01, a1-u02, a1-u03.

### E1. 55 unit giáo trình (id | trình độ | chủ đề | tình huống | ngữ pháp | số lesson)
a1-u04 | A1 | Meine Wohnung — Nhà ở | Tình huống: phòng, đồ đạc, mô tả căn hộ, màu sắc, quảng cáo thuê nhà | Ngữ pháp: số nhiều của danh từ; tính từ làm vị ngữ (Die Wohnung ist groß); phủ định nicht/kein; es gibt | 3 lesson
a1-u05 | A1 | Mein Alltag — Một ngày của tôi | Tình huống: thói quen hằng ngày, giờ giấc (chính thức & thân mật), ngày trong tuần, buổi trong ngày | Ngữ pháp: động từ tách (aufstehen, einkaufen, anrufen); giới từ thời gian am/um/von…bis; đảo ngữ khi trạng từ đứng đầu | 3 lesson
a1-u06 | A1 | Freizeit und Hobbys — Thời gian rảnh & sở thích | Tình huống: sở thích, thể thao, hẹn gặp, đồng ý/từ chối lời mời, mùa | Ngữ pháp: gern/lieber/am liebsten; động từ khuyết thiếu können, wollen; đại từ nhân xưng Akkusativ (mich, dich …) | 3 lesson
a1-u07 | A1 | Lernen und Arbeiten — Học tập & công việc | Tình huống: nghề nghiệp, nơi làm việc, đồ dùng văn phòng, khóa học, lịch hẹn | Ngữ pháp: müssen, dürfen; mạo từ sở hữu Akkusativ; giới từ bei, in, für | 3 lesson
a1-u08 | A1 | In der Stadt — Trong thành phố | Tình huống: địa điểm, phương tiện giao thông, hỏi và chỉ đường | Ngữ pháp: giới từ + Dativ (mit, zu, bei, nach, von, aus); in/an/auf + Dativ (Wo?); câu mệnh lệnh (Imperativ) | 3 lesson
a1-u09 | A1 | Gesundheit — Sức khỏe | Tình huống: bộ phận cơ thể, bệnh thường gặp, đi khám bác sĩ, hẹn lịch | Ngữ pháp: Imperativ (du/ihr/Sie); sollen; mạo từ sở hữu (tổng hợp) | 3 lesson
a1-u10 | A1 | Kleidung und Einkaufen — Quần áo & mua sắm | Tình huống: quần áo, kích cỡ, màu sắc, hỏi giá, khen/chê, đổi hàng | Ngữ pháp: welcher/dieser; tính từ đơn giản (Das Hemd ist zu groß); so … wie / so viel | 3 lesson
a1-u11 | A1 | Reisen und Verkehr — Du lịch & đi lại | Tình huống: kỳ nghỉ, vé tàu, khách sạn, kể lại chuyến đi đơn giản | Ngữ pháp: Perfekt với haben và sein; Partizip II (gemacht, gefahren …) | 3 lesson
a1-u12 | A1 | Feste und Wetter — Lễ hội & thời tiết | Tình huống: thời tiết, các tháng, ngày tháng, sinh nhật, lễ hội ở Đức | Ngữ pháp: số thứ tự & ngày tháng (am ersten Mai); Präteritum của sein & haben (war, hatte) | 3 lesson
a2-u01 | A2 | Kindheit und Erinnerungen — Tuổi thơ & kỷ niệm | Tình huống: kể về tuổi thơ, trường học xưa, kỷ niệm gia đình | Ngữ pháp: ôn Perfekt; Präteritum của động từ khuyết thiếu (konnte, musste, wollte, durfte) | 3 lesson
a2-u02 | A2 | Beruf und Bewerbung — Nghề nghiệp & xin việc | Tình huống: mô tả công việc, quảng cáo tuyển dụng, CV, gọi điện hỏi việc | Ngữ pháp: mệnh đề phụ với weil và dass; động từ đứng cuối câu phụ | 3 lesson
a2-u03 | A2 | Wohnungssuche und Umzug — Tìm nhà & chuyển nhà | Tình huống: tìm nhà, hợp đồng thuê, chuyển nhà, sắp xếp đồ đạc, hàng xóm | Ngữ pháp: giới từ hai cách (Wechselpräpositionen); stellen/stehen, legen/liegen, hängen | 3 lesson
a2-u04 | A2 | Essen gehen und Kochen — Nấu ăn & đi nhà hàng | Tình huống: công thức nấu ăn, gọi món, phàn nàn ở nhà hàng, ẩm thực Đức – Việt | Ngữ pháp: đuôi tính từ sau mạo từ xác định (der gute Wein); câu mệnh lệnh trong công thức | 3 lesson
a2-u05 | A2 | Mode und Aussehen — Thời trang & ngoại hình | Tình huống: miêu tả ngoại hình, tính cách, thời trang, mua sắm online | Ngữ pháp: đuôi tính từ sau mạo từ không xác định; so sánh hơn & so sánh nhất | 3 lesson
a2-u06 | A2 | Medien und Kommunikation — Truyền thông & giao tiếp | Tình huống: điện thoại, mạng xã hội, email, internet | Ngữ pháp: mệnh đề với wenn và ob; câu hỏi gián tiếp (Können Sie mir sagen, wo …?) | 3 lesson
a2-u07 | A2 | Gesund leben — Sống khỏe | Tình huống: thể thao, dinh dưỡng, thói quen tốt/xấu, lời khuyên | Ngữ pháp: động từ phản thân (sich freuen, sich waschen); đại từ phản thân Akkusativ & Dativ | 3 lesson
a2-u08 | A2 | Urlaub und Reisen — Kỳ nghỉ & du lịch | Tình huống: lên kế hoạch du lịch, đặt phòng, phàn nàn, viết bưu thiếp | Ngữ pháp: giới từ chỉ nơi chốn & hướng (nach/in/zu/an/auf; aus/von); Wohin? Wo? Woher? | 3 lesson
a2-u09 | A2 | Feste und Geschenke — Lễ hội & quà tặng | Tình huống: lễ hội, mời & cảm ơn, tặng quà, chúc mừng | Ngữ pháp: động từ với Dativ & Akkusativ (jemandem etwas schenken); đại từ Dativ; vị trí tân ngữ | 3 lesson
a2-u10 | A2 | Natur und Umwelt — Thiên nhiên & môi trường | Tình huống: thời tiết khắc nghiệt, phân loại rác, bảo vệ môi trường, động vật | Ngữ pháp: Konjunktiv II: würde, hätte, wäre, könnte (lời khuyên, ước muốn lịch sự) | 3 lesson
a2-u11 | A2 | Ämter und Dienstleistungen — Cơ quan & dịch vụ | Tình huống: đăng ký cư trú, ngân hàng, bưu điện, điền đơn, trình báo | Ngữ pháp: động từ đi với giới từ (warten auf, sich kümmern um); wo(r)- / da(r)-; deshalb, trotzdem | 3 lesson
a2-u12 | A2 | Gefühle und Beziehungen — Cảm xúc & các mối quan hệ | Tình huống: cảm xúc, tình bạn, tình yêu, giải quyết mâu thuẫn | Ngữ pháp: mệnh đề quan hệ (Nominativ & Akkusativ); als/wenn (quá khứ) | 3 lesson
b1-u01 | B1 | Lebensstationen — Những chặng đường đời | Tình huống: tiểu sử, những bước ngoặt cuộc đời, di cư | Ngữ pháp: Präteritum (động từ mạnh/yếu/hỗn hợp); Plusquamperfekt; nachdem | 3 lesson
b1-u02 | B1 | Arbeitswelt — Thế giới công việc | Tình huống: phỏng vấn xin việc, đồng nghiệp, cân bằng công việc – cuộc sống, email công việc | Ngữ pháp: mệnh đề quan hệ mọi cách (kể cả Dativ, Genitiv, có giới từ); Relativpronomen wo/was | 3 lesson
b1-u03 | B1 | Schule und Weiterbildung — Giáo dục & học tập | Tình huống: hệ thống giáo dục Đức, học nghề (Ausbildung), đại học, học suốt đời | Ngữ pháp: Infinitiv mit zu; um … zu / damit; ohne … zu, statt … zu | 3 lesson
b1-u04 | B1 | Konsum und Werbung — Tiêu dùng & quảng cáo | Tình huống: mua sắm, quảng cáo, khiếu nại, quyền lợi người tiêu dùng | Ngữ pháp: Passiv (Präsens, Präteritum, Perfekt, với động từ khuyết thiếu) | 3 lesson
b1-u05 | B1 | Gesundheit und Ernährung — Sức khỏe & dinh dưỡng | Tình huống: thói quen ăn uống, hệ thống y tế, bảo hiểm, phòng bệnh | Ngữ pháp: Konjunktiv II quá khứ (hätte … gemacht, wäre … gegangen); câu điều kiện không có thật; irreale Wünsche | 3 lesson
b1-u06 | B1 | Kunst und Kultur — Nghệ thuật & văn hóa | Tình huống: âm nhạc, phim, bảo tàng, văn hóa vùng miền nước Đức | Ngữ pháp: Genitiv; giới từ đi với Genitiv (wegen, trotz, während, statt, innerhalb) | 3 lesson
b1-u07 | B1 | Medien und Technik — Truyền thông & công nghệ | Tình huống: điện thoại thông minh, AI, tin tức, an toàn mạng | Ngữ pháp: Futur I; phỏng đoán (werden + wohl); n-Deklination | 3 lesson
b1-u08 | B1 | Miteinander leben — Chung sống | Tình huống: gia đình hiện đại, hàng xóm, hôn nhân, các thế hệ | Ngữ pháp: liên từ hai vế: sowohl … als auch, weder … noch, entweder … oder, zwar … aber, nicht nur … sondern auch, je … desto | 3 lesson
b1-u09 | B1 | Umwelt und Zukunft — Môi trường & tương lai | Tình huống: biến đổi khí hậu, năng lượng, đô thị tương lai, lối sống bền vững | Ngữ pháp: mệnh đề thời gian: während, bevor, seitdem, bis, sobald, solange | 3 lesson
b1-u10 | B1 | Reisen und Mobilität — Du lịch & di chuyển | Tình huống: phương tiện, du lịch bền vững, sự cố trên đường, báo cáo du lịch | Ngữ pháp: đuôi tính từ không mạo từ; Partizip I & II làm tính từ | 3 lesson
b1-u11 | B1 | Politik und Gesellschaft — Chính trị & xã hội | Tình huống: nhà nước Đức, bầu cử, tình nguyện, hội nhập | Ngữ pháp: động từ/tính từ/danh từ đi với giới từ; trotzdem/obwohl; Konnektoren nâng cao | 3 lesson
b1-u12 | B1 | Prüfungstraining B1 — Luyện thi B1 | Tình huống: mô phỏng Goethe-Zertifikat B1: Lesen, Hören, Schreiben (E-Mail, Forumsbeitrag), Sprechen (gemeinsam etwas planen, Präsentation) | Ngữ pháp: tổng ôn ngữ pháp B1; Redemittel trình bày ý kiến | 3 lesson
b2-u01 | B2 | Glück und Lebensqualität — Hạnh phúc & chất lượng sống | Tình huống: hạnh phúc, giá trị sống, tâm lý tích cực | Ngữ pháp: Nomen-Verb-Verbindungen (in Frage kommen, eine Entscheidung treffen …) | 3 lesson
b2-u02 | B2 | Arbeitswelt im Wandel — Thế giới việc làm thay đổi | Tình huống: làm việc từ xa, tự động hóa, khởi nghiệp, thương lượng lương | Ngữ pháp: thay thế bị động: sich lassen, -bar/-lich, sein + zu, man; Zustandspassiv | 3 lesson
b2-u03 | B2 | Wissenschaft und Forschung — Khoa học & nghiên cứu | Tình huống: phát minh, nghiên cứu, đạo đức khoa học, thống kê & biểu đồ | Ngữ pháp: danh từ hóa & động từ hóa (Nominalisierung/Verbalisierung); mô tả biểu đồ | 3 lesson
b2-u04 | B2 | Sprache und Kommunikation — Ngôn ngữ & giao tiếp | Tình huống: đa ngôn ngữ, phương ngữ, giao tiếp liên văn hóa, ngôn ngữ cơ thể | Ngữ pháp: Konjunktiv I – câu tường thuật gián tiếp (indirekte Rede) | 3 lesson
b2-u05 | B2 | Wirtschaft und Konsum — Kinh tế & tiêu dùng | Tình huống: kinh tế chia sẻ, thương mại điện tử, tiêu dùng có trách nhiệm | Ngữ pháp: Partizipialattribute mở rộng (die von vielen Kunden gekauften Produkte) | 3 lesson
b2-u06 | B2 | Körper und Psyche — Thể chất & tinh thần | Tình huống: stress, burnout, giấc ngủ, sức khỏe tinh thần | Ngữ pháp: động từ khuyết thiếu chủ quan (soll, will, muss, dürfte, kann – phỏng đoán/tin đồn) | 3 lesson
b2-u07 | B2 | Medienwelt — Thế giới truyền thông | Tình huống: tin giả, báo chí, mạng xã hội, quảng cáo ẩn | Ngữ pháp: liên từ nhượng bộ & đối lập: obwohl, trotzdem, dennoch, während, wohingegen, allerdings | 3 lesson
b2-u08 | B2 | Umwelt und Nachhaltigkeit — Môi trường & phát triển bền vững | Tình huống: tiêu dùng bền vững, chính sách khí hậu, tranh luận | Ngữ pháp: câu điều kiện: falls, sofern, vorausgesetzt dass; als ob/als wenn (irreale Vergleiche) | 3 lesson
b2-u09 | B2 | Literatur und Kunst — Văn học & nghệ thuật | Tình huống: tác giả Đức, phân tích truyện ngắn, phê bình nghệ thuật | Ngữ pháp: giới từ đi với Genitiv nâng cao (aufgrund, infolge, angesichts, hinsichtlich, mithilfe) | 3 lesson
b2-u10 | B2 | Migration und Gesellschaft — Di cư & xã hội | Tình huống: hội nhập, bản sắc, đa văn hóa, chính sách nhập cư | Ngữ pháp: Modalpartikeln (doch, ja, mal, eben, halt, eigentlich, wohl) | 3 lesson
b2-u11 | B2 | Recht und Politik — Pháp luật & chính trị | Tình huống: quyền công dân, hệ thống pháp luật, tranh luận chính trị | Ngữ pháp: Funktionsverbgefüge; Passiv mit Modalverben im Perfekt; Passiversatz | 3 lesson
b2-u12 | B2 | Prüfungstraining B2 — Luyện thi B2 | Tình huống: mô phỏng Goethe-Zertifikat B2: Lesen, Hören, Schreiben (Forumsbeitrag, formelle Nachricht), Sprechen (Vortrag, Diskussion) | Ngữ pháp: tổng ôn ngữ pháp B2; Redemittel lập luận & thảo luận | 3 lesson
c1-u01 | C1 | Persönlichkeit und Identität — Tính cách & bản sắc | Tình huống: tâm lý học tính cách, bản sắc văn hóa, tự nhận thức | Ngữ pháp: cấu tạo từ nâng cao (tiền tố/hậu tố: -los, -haft, -mäßig, miss-, ver-, zer-) | 4 lesson
c1-u02 | C1 | Wissenschaftliches Arbeiten — Viết học thuật | Tình huống: cấu trúc bài luận, trích dẫn, tóm tắt, trình bày nghiên cứu | Ngữ pháp: Nominalstil vs. Verbalstil; liên kết văn bản (Textkohärenz, Konnektoren học thuật) | 4 lesson
c1-u03 | C1 | Führung und Arbeitswelt — Lãnh đạo & môi trường làm việc | Tình huống: phong cách lãnh đạo, văn hóa doanh nghiệp, đàm phán, thuyết trình | Ngữ pháp: Redewiedergabe nâng cao (Konjunktiv I/II, Redeeinleitende Verben: behaupten, betonen, einräumen) | 4 lesson
c1-u04 | C1 | Gesellschaft im Wandel — Xã hội biến đổi | Tình huống: già hóa dân số, số hóa, bất bình đẳng, đô thị hóa | Ngữ pháp: cấu trúc phân từ (Partizipialkonstruktionen), satzwertige Partizipien | 4 lesson
c1-u05 | C1 | Wirtschaft und Globalisierung — Kinh tế & toàn cầu hóa | Tình huống: thương mại toàn cầu, chuỗi cung ứng, kinh tế Đức, đạo đức kinh doanh | Ngữ pháp: mệnh đề phương thức & hệ quả (indem, dadurch dass, sodass, als dass, insofern als) | 4 lesson
c1-u06 | C1 | Medien und Meinungsbildung — Truyền thông & hình thành quan điểm | Tình huống: tự do báo chí, thuật toán, tranh luận công khai, bình luận báo | Ngữ pháp: Argumentation: Redemittel, Gegenargumente, Konzessivsätze nâng cao (wenngleich, zumal, wie … auch immer) | 4 lesson
c1-u07 | C1 | Natur und Technik — Tự nhiên & công nghệ | Tình huống: năng lượng tái tạo, công nghệ sinh học, trí tuệ nhân tạo, đạo đức công nghệ | Ngữ pháp: Passiv & Passiversatzformen nâng cao; Gerundivum (die zu lösende Aufgabe) | 4 lesson
c1-u08 | C1 | Kultur und Kreativität — Văn hóa & sáng tạo | Tình huống: văn học, sân khấu, thành ngữ, ẩn dụ | Ngữ pháp: thành ngữ & cách nói hình ảnh (Redewendungen), Funktionsverbgefüge nâng cao | 4 lesson
c1-u09 | C1 | Bildung und Sprache — Giáo dục & ngôn ngữ | Tình huống: cải cách giáo dục, đa ngôn ngữ, ngôn ngữ và quyền lực | Ngữ pháp: văn phong & sắc thái (Register: umgangssprachlich – neutral – gehoben); Modalpartikeln nâng cao | 4 lesson
c1-u10 | C1 | Prüfungstraining C1 — Luyện thi C1 | Tình huống: mô phỏng Goethe-Zertifikat C1 / telc C1 / TestDaF: Lesen, Hören, Schreiben (Erörterung, formeller Brief), Sprechen (Vortrag, Diskussion) | Ngữ pháp: tổng ôn ngữ pháp C1; Redemittel học thuật & thuyết trình | 4 lesson

### E2. 20 gói động từ: verbs-01 … verbs-20

### E3. 75 chủ điểm ngữ pháp (id | trình độ | chủ điểm)
gr-a1-01 | A1 | Präsens: regelmäßige Verben & Personalpronomen
gr-a1-02 | A1 | sein, haben, werden im Präsens
gr-a1-03 | A1 | Satzbau: Verb an Position 2, W-Fragen, Ja/Nein-Fragen
gr-a1-04 | A1 | Bestimmter & unbestimmter Artikel, Genus
gr-a1-05 | A1 | Pluralbildung der Nomen
gr-a1-06 | A1 | Negation: nicht und kein
gr-a1-07 | A1 | Akkusativ: Artikel & Nomen
gr-a1-08 | A1 | Possessivartikel (Nominativ & Akkusativ)
gr-a1-09 | A1 | Modalverben: können, wollen, müssen, dürfen, sollen, möchten
gr-a1-10 | A1 | Trennbare & untrennbare Verben
gr-a1-11 | A1 | Imperativ (du, ihr, Sie)
gr-a1-12 | A1 | Temporale Präpositionen: am, um, im, von … bis
gr-a1-13 | A1 | Personalpronomen im Akkusativ
gr-a1-14 | A1 | Konjunktionen: und, aber, oder, denn, sondern
gr-a1-15 | A1 | Perfekt: Grundlagen
gr-a1-16 | A1 | Zahlen, Uhrzeit, Datum
gr-a2-01 | A2 | Perfekt: haben oder sein, Partizip II vollständig
gr-a2-02 | A2 | Präteritum von sein, haben & Modalverben
gr-a2-03 | A2 | Dativ: Artikel, Nomen, Personalpronomen
gr-a2-04 | A2 | Verben mit Dativ & mit Dativ + Akkusativ
gr-a2-05 | A2 | Wechselpräpositionen (Wo? / Wohin?)
gr-a2-06 | A2 | Lokale Präpositionen: in, an, auf, zu, nach, aus, von, bei
gr-a2-07 | A2 | Nebensätze mit weil, dass, wenn, ob
gr-a2-08 | A2 | Indirekte Fragen
gr-a2-09 | A2 | Adjektivdeklination (bestimmter, unbestimmter, Nullartikel)
gr-a2-10 | A2 | Komparativ & Superlativ
gr-a2-11 | A2 | Reflexive Verben
gr-a2-12 | A2 | Verben mit Präpositionen, wo(r)- & da(r)-
gr-a2-13 | A2 | Konjunktiv II: Höflichkeit & Ratschläge (würde, hätte, wäre, könnte)
gr-a2-14 | A2 | Relativsätze im Nominativ & Akkusativ
gr-a2-15 | A2 | als oder wenn?
gr-a2-16 | A2 | Konjunktionaladverbien: deshalb, trotzdem, dann, danach
gr-b1-01 | B1 | Präteritum aller Verben
gr-b1-02 | B1 | Plusquamperfekt
gr-b1-03 | B1 | Relativsätze: alle Kasus, mit Präposition, wo/was
gr-b1-04 | B1 | Infinitiv mit zu
gr-b1-05 | B1 | Finalsätze: um … zu / damit
gr-b1-06 | B1 | Passiv: Präsens, Präteritum, Perfekt, mit Modalverben
gr-b1-07 | B1 | Konjunktiv II der Vergangenheit, irreale Bedingungen & Wünsche
gr-b1-08 | B1 | Genitiv & Präpositionen mit Genitiv
gr-b1-09 | B1 | Futur I & Vermutungen
gr-b1-10 | B1 | n-Deklination
gr-b1-11 | B1 | Zweiteilige Konnektoren
gr-b1-12 | B1 | Temporale Nebensätze: während, bevor, nachdem, seitdem, bis, sobald
gr-b1-13 | B1 | Partizip I & II als Adjektiv
gr-b1-14 | B1 | Konzessiv: obwohl, trotzdem, trotz
gr-b1-15 | B1 | Wortstellung im Mittelfeld (TeKaMoLo, Dativ vor Akkusativ)
gr-b1-16 | B1 | Verben mit festen Präpositionen (B1-Liste)
gr-b2-01 | B2 | Nomen-Verb-Verbindungen
gr-b2-02 | B2 | Passiversatzformen: sich lassen, -bar, sein + zu, man
gr-b2-03 | B2 | Zustandspassiv vs. Vorgangspassiv
gr-b2-04 | B2 | Nominalisierung & Verbalisierung
gr-b2-05 | B2 | Konjunktiv I & indirekte Rede
gr-b2-06 | B2 | Erweiterte Partizipialattribute
gr-b2-07 | B2 | Subjektive Bedeutung der Modalverben
gr-b2-08 | B2 | Adversative & konzessive Konnektoren
gr-b2-09 | B2 | Konditionalsätze: falls, sofern, vorausgesetzt dass, uneingeleitete Bedingungssätze
gr-b2-10 | B2 | Irreale Vergleichssätze: als ob, als wenn, als
gr-b2-11 | B2 | Modalpartikeln
gr-b2-12 | B2 | Präpositionen mit Genitiv (gehoben)
gr-b2-13 | B2 | Funktionsverbgefüge
gr-b2-14 | B2 | Kausale & konsekutive Satzverbindungen
gr-c1-01 | C1 | Wortbildung: Präfixe, Suffixe, Komposita
gr-c1-02 | C1 | Nominalstil vs. Verbalstil
gr-c1-03 | C1 | Redewiedergabe & redeeinleitende Verben
gr-c1-04 | C1 | Partizipialkonstruktionen & satzwertige Partizipien
gr-c1-05 | C1 | Gerundivum (zu + Partizip I)
gr-c1-06 | C1 | Modalsätze: indem, dadurch dass, ohne dass, anstatt dass
gr-c1-07 | C1 | Konsekutivsätze: sodass, so … dass, zu …, als dass
gr-c1-08 | C1 | Erweiterte Konzessivsätze: wenngleich, zumal, wie … auch immer
gr-c1-09 | C1 | Textkohärenz: Konnektoren, Pronominalisierung, Thema-Rhema
gr-c1-10 | C1 | Register & Stilebenen
gr-c1-11 | C1 | Korrelate: es, da(r)- + Nebensatz
gr-c1-12 | C1 | Negation: Feinheiten & Stellung von nicht
gr-c1-13 | C1 | Idiomatik & feste Wendungen

### E4. 66 bộ từ vựng (id | trình độ | chủ đề)
deck-a1-01 | A1 | Ich und meine Familie
deck-a1-02 | A1 | Wohnen und Möbel
deck-a1-03 | A1 | Essen und Trinken
deck-a1-04 | A1 | Einkaufen, Kleidung und Farben
deck-a1-05 | A1 | Tagesablauf, Uhrzeit und Wochentage
deck-a1-06 | A1 | Freizeit, Hobbys und Sport
deck-a1-07 | A1 | Schule, Kurs und Arbeit
deck-a1-08 | A1 | Stadt, Verkehr und Wege
deck-a1-09 | A1 | Körper und Gesundheit
deck-a1-10 | A1 | Reisen, Wetter, Monate und Jahreszeiten
deck-a1-11 | A1 | Die 120 wichtigsten Verben A1
deck-a1-12 | A1 | Adjektive, Adverbien und kleine Wörter A1
deck-a2-01 | A2 | Persönliche Beziehungen und Gefühle
deck-a2-02 | A2 | Wohnungssuche und Haushalt
deck-a2-03 | A2 | Kochen, Restaurant und Lebensmittel
deck-a2-04 | A2 | Mode und Aussehen
deck-a2-05 | A2 | Beruf, Bewerbung und Arbeitsplatz
deck-a2-06 | A2 | Medien, Telefon und Internet
deck-a2-07 | A2 | Gesund leben und Arzt
deck-a2-08 | A2 | Urlaub, Hotel und Bahn
deck-a2-09 | A2 | Feste, Feiern und Geschenke
deck-a2-10 | A2 | Natur, Tiere und Umwelt
deck-a2-11 | A2 | Ämter, Bank und Post
deck-a2-12 | A2 | Schule und Ausbildung
deck-a2-13 | A2 | Verben mit Präpositionen A2
deck-a2-14 | A2 | Adjektive und Gegensätze A2
deck-b1-01 | B1 | Lebenslauf und Lebensstationen
deck-b1-02 | B1 | Arbeitswelt und Kollegen
deck-b1-03 | B1 | Bildung, Ausbildung und Studium
deck-b1-04 | B1 | Konsum, Werbung und Reklamation
deck-b1-05 | B1 | Gesundheitssystem und Ernährung
deck-b1-06 | B1 | Kunst, Kultur und Medien
deck-b1-07 | B1 | Technik und Digitalisierung
deck-b1-08 | B1 | Familie, Partnerschaft und Generationen
deck-b1-09 | B1 | Umwelt, Klima und Energie
deck-b1-10 | B1 | Mobilität und Verkehr
deck-b1-11 | B1 | Politik, Staat und Gesellschaft
deck-b1-12 | B1 | Geld, Bank und Versicherungen
deck-b1-13 | B1 | Verben mit Präpositionen B1
deck-b1-14 | B1 | Konnektoren und Redemittel B1 (Meinung, Zustimmung, Widerspruch)
deck-b2-01 | B2 | Glück, Werte und Lebensqualität
deck-b2-02 | B2 | Arbeitswelt im Wandel
deck-b2-03 | B2 | Wissenschaft und Forschung
deck-b2-04 | B2 | Sprache und Kommunikation
deck-b2-05 | B2 | Wirtschaft, Handel und Konsum
deck-b2-06 | B2 | Psyche, Stress und Wohlbefinden
deck-b2-07 | B2 | Medien und Journalismus
deck-b2-08 | B2 | Nachhaltigkeit und Klimapolitik
deck-b2-09 | B2 | Literatur, Kunst und Kritik
deck-b2-10 | B2 | Migration, Integration und Identität
deck-b2-11 | B2 | Recht, Justiz und Politik
deck-b2-12 | B2 | Nomen-Verb-Verbindungen B2
deck-b2-13 | B2 | Redemittel B2: Argumentieren, Diskutieren, Präsentieren
deck-b2-14 | B2 | Verben, Nomen und Adjektive mit Präpositionen B2
deck-c1-01 | C1 | Persönlichkeit und Psychologie
deck-c1-02 | C1 | Wissenschaftssprache und akademisches Schreiben
deck-c1-03 | C1 | Führung, Management und Unternehmenskultur
deck-c1-04 | C1 | Demografie und sozialer Wandel
deck-c1-05 | C1 | Globalisierung und Weltwirtschaft
deck-c1-06 | C1 | Meinungsbildung, Öffentlichkeit und Medienethik
deck-c1-07 | C1 | Technikethik, KI und Biotechnologie
deck-c1-08 | C1 | Redewendungen und Sprichwörter C1
deck-c1-09 | C1 | Funktionsverbgefüge und gehobene Kollokationen C1
deck-c1-10 | C1 | Synonyme mit feinen Bedeutungsunterschieden C1
deck-c1-11 | C1 | Register: umgangssprachlich – neutral – gehoben
deck-c1-12 | C1 | Konnektoren und Textverknüpfung C1

### E5. 60 bài đọc: rd-a1-01 … rd-a1-12, rd-a2-01 … rd-a2-12, rd-b1-01 … rd-b1-12, rd-b2-01 … rd-b2-12, rd-c1-01 … rd-c1-12

### E6. 10 đề thi thử: ex-a1-1, ex-a1-2, ex-a2-1, ex-a2-2, ex-b1-1, ex-b1-2, ex-b2-1, ex-b2-2, ex-c1-1, ex-c1-2

## F. BẮT ĐẦU NGAY
Bắt đầu với a1-u04, làm liên tục theo danh sách. Không trả lời gì khác trước khi bắt đầu.
````
