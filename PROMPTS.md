# Prompt tạo nội dung DeutschWeg (A1 → C1)

## Cách làm
**Cả ChatGPT (Sol 6.2) và Gemini (Argon 4) làm CÙNG nội dung.** Claude so sánh hai bản, chọn phần hay nhất của mỗi bên, sửa lỗi rồi ghép thành bản cuối đưa vào web.

1. Ở **cả hai** AI: dán **PROMPT 0 – THIẾT LẬP** (bạn đã làm bước này).
2. Ở **cả hai** AI: dán **PROMPT 1 – TOÀN BỘ UNIT** bên dưới. AI sẽ bắt đầu làm unit đầu tiên (a1-u02).
3. Từ đó bạn chỉ cần gõ **`tiếp`** — mỗi lần AI trả về 1 unit (hoặc 1 phần), dòng đầu có nhãn `=== a1-u02 (phần 1/1) ===`.
4. Gửi kết quả cho Claude theo từng unit, ghi rõ của ai:
   `a1-u02 – ChatGPT:` (dán) … `a1-u02 – Gemini:` (dán). Đính kèm file cũng được (`a1-u02.chatgpt.json`, `a1-u02.gemini.json`). Gửi vài unit một lần cũng được.
5. Lệnh hữu ích trong lúc làm:
   - `làm lại a1-u03` — soạn lại một unit (khi Claude báo bản đó lỗi nhiều).
   - `từ b1-u01` — tiếp tục từ một unit cụ thể.
6. Khi cuộc trò chuyện quá dài (AI bắt đầu làm sơ sài hoặc chậm): mở cuộc trò chuyện mới → dán PROMPT 0 → dán PROMPT 1 → gõ `từ <id unit kế tiếp>`.

> Unit **a1-u01** đã có sẵn trong web (Claude soạn), không cần làm.

---

## PROMPT 0 – THIẾT LẬP (dán đầu mỗi cuộc trò chuyện)
````text
Bạn là giáo viên tiếng Đức (DaF/DaZ) bản ngữ, có 20 năm kinh nghiệm dạy người Việt và luyện thi Goethe-Zertifikat, đồng thời là chuyên gia ngữ âm (Standardaussprache theo Duden – Das Aussprachewörterbuch). Trong cuộc trò chuyện này, bạn sẽ soạn NỘI DUNG HỌC cho từng unit của giáo trình tiếng Đức A1 → C1 dành cho người Việt tự học. Nội dung sẽ được nạp tự động vào một ứng dụng web, nên phải ĐÚNG TUYỆT ĐỐI và ĐÚNG ĐỊNH DẠNG.

Mỗi lần tôi gửi tin nhắn bắt đầu bằng "UNIT", kèm: id, trình độ, thứ tự, chủ đề, tình huống, trọng tâm ngữ pháp, số lesson. Bạn trả về JSON của unit đó theo các quy tắc dưới đây. Chia trọng tâm ngữ pháp hợp lý qua các lesson (mỗi lesson một điểm chính); lesson cuối có phần ôn tập tổng hợp. id lesson = <id unit>-l1, -l2, …

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

Nếu đã hiểu, chỉ trả lời: "Sẵn sàng – hãy gửi UNIT đầu tiên." rồi chờ tôi.
````

---

## PROMPT 1 – TOÀN BỘ UNIT (dán ngay sau PROMPT 0, ở cả hai AI)
````text
NHIỆM VỤ TỔNG: soạn LẦN LƯỢT toàn bộ 57 unit dưới đây, đúng thứ tự, theo đúng mọi quy tắc và cấu trúc JSON tôi đã đưa ở tin nhắn thiết lập.

CÁCH LÀM VIỆC:
1. Mỗi câu trả lời chỉ làm MỘT unit (hoặc một phần của unit nếu quá dài). Không gộp 2 unit vào một câu trả lời.
2. Dòng ĐẦU TIÊN của mỗi câu trả lời ghi nhãn dạng:  === a1-u02 (phần 1/1) ===   (nếu chia phần thì ghi phần 1/2, 2/2…). Ngay sau đó là JSON, không viết gì thêm.
3. Khi tôi gõ "tiếp", bạn làm phần/unit tiếp theo trong danh sách. Không hỏi lại, không tóm tắt, không xin xác nhận.
4. Nếu tôi gõ "làm lại <id>" thì soạn lại unit đó. Nếu tôi gõ "từ <id>" thì tiếp tục từ unit đó.
5. Soạn DỒI DÀO gấp 1,5–2 lần mức tối thiểu trong bảng số lượng (một biên tập viên sẽ chọn lọc), nhưng độ chính xác luôn đặt lên trước.
6. Giữ chất lượng như nhau từ unit đầu đến unit cuối: unit sau KHÔNG được ngắn hơn hay sơ sài hơn unit đầu. Từ vựng không lặp lại các unit trước trừ khi ôn tập có chủ đích.
7. Tiến độ ngữ pháp phải liền mạch: không dùng cấu trúc chưa học ở unit trước trong bài tập (trừ bài đọc/hội thoại có chú thích).

DANH SÁCH UNIT (id | trình độ | chủ đề | tình huống | ngữ pháp | số lesson):
a1-u02 | A1 | Familie und Freunde — Gia đình & bạn bè | Tình huống: thành viên gia đình, tuổi, nghề nghiệp đơn giản, tình trạng hôn nhân, số 20–100 | Ngữ pháp: haben; mạo từ sở hữu mein/dein/sein/ihr (Nominativ); câu hỏi Ja/Nein | 3 lesson
a1-u03 | A1 | Essen und Trinken — Ăn uống & đi chợ | Tình huống: đồ ăn, đồ uống, đi siêu thị, giá cả, đơn vị (Kilo, Gramm, Flasche), ở quán cà phê | Ngữ pháp: mạo từ xác định/không xác định (der/die/das, ein/eine); Akkusativ (einen, keinen); kein vs. nicht; möchten, mögen | 3 lesson
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

Bắt đầu ngay với unit đầu tiên: a1-u02.
````

---

## Dự phòng: tin nhắn riêng từng unit
Chỉ dùng khi muốn yêu cầu riêng một unit ở cuộc trò chuyện mới (sau PROMPT 0).

### A1 – Mới bắt đầu

#### a1-u02 · Familie und Freunde (Gia đình & bạn bè)
````text
UNIT
- id: a1-u02
- Trình độ: A1
- Thứ tự: 2
- Chủ đề: Familie und Freunde — Gia đình & bạn bè
- Tình huống / từ vựng: thành viên gia đình, tuổi, nghề nghiệp đơn giản, tình trạng hôn nhân, số 20–100
- Trọng tâm ngữ pháp: haben; mạo từ sở hữu mein/dein/sein/ihr (Nominativ); câu hỏi Ja/Nein
- Số lesson: 3 (a1-u02-l1, a1-u02-l2, a1-u02-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a1-u03 · Essen und Trinken (Ăn uống & đi chợ)
````text
UNIT
- id: a1-u03
- Trình độ: A1
- Thứ tự: 3
- Chủ đề: Essen und Trinken — Ăn uống & đi chợ
- Tình huống / từ vựng: đồ ăn, đồ uống, đi siêu thị, giá cả, đơn vị (Kilo, Gramm, Flasche), ở quán cà phê
- Trọng tâm ngữ pháp: mạo từ xác định/không xác định (der/die/das, ein/eine); Akkusativ (einen, keinen); kein vs. nicht; möchten, mögen
- Số lesson: 3 (a1-u03-l1, a1-u03-l2, a1-u03-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a1-u04 · Meine Wohnung (Nhà ở)
````text
UNIT
- id: a1-u04
- Trình độ: A1
- Thứ tự: 4
- Chủ đề: Meine Wohnung — Nhà ở
- Tình huống / từ vựng: phòng, đồ đạc, mô tả căn hộ, màu sắc, quảng cáo thuê nhà
- Trọng tâm ngữ pháp: số nhiều của danh từ; tính từ làm vị ngữ (Die Wohnung ist groß); phủ định nicht/kein; es gibt
- Số lesson: 3 (a1-u04-l1, a1-u04-l2, a1-u04-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a1-u05 · Mein Alltag (Một ngày của tôi)
````text
UNIT
- id: a1-u05
- Trình độ: A1
- Thứ tự: 5
- Chủ đề: Mein Alltag — Một ngày của tôi
- Tình huống / từ vựng: thói quen hằng ngày, giờ giấc (chính thức & thân mật), ngày trong tuần, buổi trong ngày
- Trọng tâm ngữ pháp: động từ tách (aufstehen, einkaufen, anrufen); giới từ thời gian am/um/von…bis; đảo ngữ khi trạng từ đứng đầu
- Số lesson: 3 (a1-u05-l1, a1-u05-l2, a1-u05-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a1-u06 · Freizeit und Hobbys (Thời gian rảnh & sở thích)
````text
UNIT
- id: a1-u06
- Trình độ: A1
- Thứ tự: 6
- Chủ đề: Freizeit und Hobbys — Thời gian rảnh & sở thích
- Tình huống / từ vựng: sở thích, thể thao, hẹn gặp, đồng ý/từ chối lời mời, mùa
- Trọng tâm ngữ pháp: gern/lieber/am liebsten; động từ khuyết thiếu können, wollen; đại từ nhân xưng Akkusativ (mich, dich …)
- Số lesson: 3 (a1-u06-l1, a1-u06-l2, a1-u06-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a1-u07 · Lernen und Arbeiten (Học tập & công việc)
````text
UNIT
- id: a1-u07
- Trình độ: A1
- Thứ tự: 7
- Chủ đề: Lernen und Arbeiten — Học tập & công việc
- Tình huống / từ vựng: nghề nghiệp, nơi làm việc, đồ dùng văn phòng, khóa học, lịch hẹn
- Trọng tâm ngữ pháp: müssen, dürfen; mạo từ sở hữu Akkusativ; giới từ bei, in, für
- Số lesson: 3 (a1-u07-l1, a1-u07-l2, a1-u07-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a1-u08 · In der Stadt (Trong thành phố)
````text
UNIT
- id: a1-u08
- Trình độ: A1
- Thứ tự: 8
- Chủ đề: In der Stadt — Trong thành phố
- Tình huống / từ vựng: địa điểm, phương tiện giao thông, hỏi và chỉ đường
- Trọng tâm ngữ pháp: giới từ + Dativ (mit, zu, bei, nach, von, aus); in/an/auf + Dativ (Wo?); câu mệnh lệnh (Imperativ)
- Số lesson: 3 (a1-u08-l1, a1-u08-l2, a1-u08-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a1-u09 · Gesundheit (Sức khỏe)
````text
UNIT
- id: a1-u09
- Trình độ: A1
- Thứ tự: 9
- Chủ đề: Gesundheit — Sức khỏe
- Tình huống / từ vựng: bộ phận cơ thể, bệnh thường gặp, đi khám bác sĩ, hẹn lịch
- Trọng tâm ngữ pháp: Imperativ (du/ihr/Sie); sollen; mạo từ sở hữu (tổng hợp)
- Số lesson: 3 (a1-u09-l1, a1-u09-l2, a1-u09-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a1-u10 · Kleidung und Einkaufen (Quần áo & mua sắm)
````text
UNIT
- id: a1-u10
- Trình độ: A1
- Thứ tự: 10
- Chủ đề: Kleidung und Einkaufen — Quần áo & mua sắm
- Tình huống / từ vựng: quần áo, kích cỡ, màu sắc, hỏi giá, khen/chê, đổi hàng
- Trọng tâm ngữ pháp: welcher/dieser; tính từ đơn giản (Das Hemd ist zu groß); so … wie / so viel
- Số lesson: 3 (a1-u10-l1, a1-u10-l2, a1-u10-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a1-u11 · Reisen und Verkehr (Du lịch & đi lại)
````text
UNIT
- id: a1-u11
- Trình độ: A1
- Thứ tự: 11
- Chủ đề: Reisen und Verkehr — Du lịch & đi lại
- Tình huống / từ vựng: kỳ nghỉ, vé tàu, khách sạn, kể lại chuyến đi đơn giản
- Trọng tâm ngữ pháp: Perfekt với haben và sein; Partizip II (gemacht, gefahren …)
- Số lesson: 3 (a1-u11-l1, a1-u11-l2, a1-u11-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a1-u12 · Feste und Wetter (Lễ hội & thời tiết)
````text
UNIT
- id: a1-u12
- Trình độ: A1
- Thứ tự: 12
- Chủ đề: Feste und Wetter — Lễ hội & thời tiết
- Tình huống / từ vựng: thời tiết, các tháng, ngày tháng, sinh nhật, lễ hội ở Đức
- Trọng tâm ngữ pháp: số thứ tự & ngày tháng (am ersten Mai); Präteritum của sein & haben (war, hatte)
- Số lesson: 3 (a1-u12-l1, a1-u12-l2, a1-u12-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

### A2 – Sơ cấp

#### a2-u01 · Kindheit und Erinnerungen (Tuổi thơ & kỷ niệm)
````text
UNIT
- id: a2-u01
- Trình độ: A2
- Thứ tự: 1
- Chủ đề: Kindheit und Erinnerungen — Tuổi thơ & kỷ niệm
- Tình huống / từ vựng: kể về tuổi thơ, trường học xưa, kỷ niệm gia đình
- Trọng tâm ngữ pháp: ôn Perfekt; Präteritum của động từ khuyết thiếu (konnte, musste, wollte, durfte)
- Số lesson: 3 (a2-u01-l1, a2-u01-l2, a2-u01-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a2-u02 · Beruf und Bewerbung (Nghề nghiệp & xin việc)
````text
UNIT
- id: a2-u02
- Trình độ: A2
- Thứ tự: 2
- Chủ đề: Beruf und Bewerbung — Nghề nghiệp & xin việc
- Tình huống / từ vựng: mô tả công việc, quảng cáo tuyển dụng, CV, gọi điện hỏi việc
- Trọng tâm ngữ pháp: mệnh đề phụ với weil và dass; động từ đứng cuối câu phụ
- Số lesson: 3 (a2-u02-l1, a2-u02-l2, a2-u02-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a2-u03 · Wohnungssuche und Umzug (Tìm nhà & chuyển nhà)
````text
UNIT
- id: a2-u03
- Trình độ: A2
- Thứ tự: 3
- Chủ đề: Wohnungssuche und Umzug — Tìm nhà & chuyển nhà
- Tình huống / từ vựng: tìm nhà, hợp đồng thuê, chuyển nhà, sắp xếp đồ đạc, hàng xóm
- Trọng tâm ngữ pháp: giới từ hai cách (Wechselpräpositionen); stellen/stehen, legen/liegen, hängen
- Số lesson: 3 (a2-u03-l1, a2-u03-l2, a2-u03-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a2-u04 · Essen gehen und Kochen (Nấu ăn & đi nhà hàng)
````text
UNIT
- id: a2-u04
- Trình độ: A2
- Thứ tự: 4
- Chủ đề: Essen gehen und Kochen — Nấu ăn & đi nhà hàng
- Tình huống / từ vựng: công thức nấu ăn, gọi món, phàn nàn ở nhà hàng, ẩm thực Đức – Việt
- Trọng tâm ngữ pháp: đuôi tính từ sau mạo từ xác định (der gute Wein); câu mệnh lệnh trong công thức
- Số lesson: 3 (a2-u04-l1, a2-u04-l2, a2-u04-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a2-u05 · Mode und Aussehen (Thời trang & ngoại hình)
````text
UNIT
- id: a2-u05
- Trình độ: A2
- Thứ tự: 5
- Chủ đề: Mode und Aussehen — Thời trang & ngoại hình
- Tình huống / từ vựng: miêu tả ngoại hình, tính cách, thời trang, mua sắm online
- Trọng tâm ngữ pháp: đuôi tính từ sau mạo từ không xác định; so sánh hơn & so sánh nhất
- Số lesson: 3 (a2-u05-l1, a2-u05-l2, a2-u05-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a2-u06 · Medien und Kommunikation (Truyền thông & giao tiếp)
````text
UNIT
- id: a2-u06
- Trình độ: A2
- Thứ tự: 6
- Chủ đề: Medien und Kommunikation — Truyền thông & giao tiếp
- Tình huống / từ vựng: điện thoại, mạng xã hội, email, internet
- Trọng tâm ngữ pháp: mệnh đề với wenn và ob; câu hỏi gián tiếp (Können Sie mir sagen, wo …?)
- Số lesson: 3 (a2-u06-l1, a2-u06-l2, a2-u06-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a2-u07 · Gesund leben (Sống khỏe)
````text
UNIT
- id: a2-u07
- Trình độ: A2
- Thứ tự: 7
- Chủ đề: Gesund leben — Sống khỏe
- Tình huống / từ vựng: thể thao, dinh dưỡng, thói quen tốt/xấu, lời khuyên
- Trọng tâm ngữ pháp: động từ phản thân (sich freuen, sich waschen); đại từ phản thân Akkusativ & Dativ
- Số lesson: 3 (a2-u07-l1, a2-u07-l2, a2-u07-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a2-u08 · Urlaub und Reisen (Kỳ nghỉ & du lịch)
````text
UNIT
- id: a2-u08
- Trình độ: A2
- Thứ tự: 8
- Chủ đề: Urlaub und Reisen — Kỳ nghỉ & du lịch
- Tình huống / từ vựng: lên kế hoạch du lịch, đặt phòng, phàn nàn, viết bưu thiếp
- Trọng tâm ngữ pháp: giới từ chỉ nơi chốn & hướng (nach/in/zu/an/auf; aus/von); Wohin? Wo? Woher?
- Số lesson: 3 (a2-u08-l1, a2-u08-l2, a2-u08-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a2-u09 · Feste und Geschenke (Lễ hội & quà tặng)
````text
UNIT
- id: a2-u09
- Trình độ: A2
- Thứ tự: 9
- Chủ đề: Feste und Geschenke — Lễ hội & quà tặng
- Tình huống / từ vựng: lễ hội, mời & cảm ơn, tặng quà, chúc mừng
- Trọng tâm ngữ pháp: động từ với Dativ & Akkusativ (jemandem etwas schenken); đại từ Dativ; vị trí tân ngữ
- Số lesson: 3 (a2-u09-l1, a2-u09-l2, a2-u09-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a2-u10 · Natur und Umwelt (Thiên nhiên & môi trường)
````text
UNIT
- id: a2-u10
- Trình độ: A2
- Thứ tự: 10
- Chủ đề: Natur und Umwelt — Thiên nhiên & môi trường
- Tình huống / từ vựng: thời tiết khắc nghiệt, phân loại rác, bảo vệ môi trường, động vật
- Trọng tâm ngữ pháp: Konjunktiv II: würde, hätte, wäre, könnte (lời khuyên, ước muốn lịch sự)
- Số lesson: 3 (a2-u10-l1, a2-u10-l2, a2-u10-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a2-u11 · Ämter und Dienstleistungen (Cơ quan & dịch vụ)
````text
UNIT
- id: a2-u11
- Trình độ: A2
- Thứ tự: 11
- Chủ đề: Ämter und Dienstleistungen — Cơ quan & dịch vụ
- Tình huống / từ vựng: đăng ký cư trú, ngân hàng, bưu điện, điền đơn, trình báo
- Trọng tâm ngữ pháp: động từ đi với giới từ (warten auf, sich kümmern um); wo(r)- / da(r)-; deshalb, trotzdem
- Số lesson: 3 (a2-u11-l1, a2-u11-l2, a2-u11-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### a2-u12 · Gefühle und Beziehungen (Cảm xúc & các mối quan hệ)
````text
UNIT
- id: a2-u12
- Trình độ: A2
- Thứ tự: 12
- Chủ đề: Gefühle und Beziehungen — Cảm xúc & các mối quan hệ
- Tình huống / từ vựng: cảm xúc, tình bạn, tình yêu, giải quyết mâu thuẫn
- Trọng tâm ngữ pháp: mệnh đề quan hệ (Nominativ & Akkusativ); als/wenn (quá khứ)
- Số lesson: 3 (a2-u12-l1, a2-u12-l2, a2-u12-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

### B1 – Trung cấp

#### b1-u01 · Lebensstationen (Những chặng đường đời)
````text
UNIT
- id: b1-u01
- Trình độ: B1
- Thứ tự: 1
- Chủ đề: Lebensstationen — Những chặng đường đời
- Tình huống / từ vựng: tiểu sử, những bước ngoặt cuộc đời, di cư
- Trọng tâm ngữ pháp: Präteritum (động từ mạnh/yếu/hỗn hợp); Plusquamperfekt; nachdem
- Số lesson: 3 (b1-u01-l1, b1-u01-l2, b1-u01-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b1-u02 · Arbeitswelt (Thế giới công việc)
````text
UNIT
- id: b1-u02
- Trình độ: B1
- Thứ tự: 2
- Chủ đề: Arbeitswelt — Thế giới công việc
- Tình huống / từ vựng: phỏng vấn xin việc, đồng nghiệp, cân bằng công việc – cuộc sống, email công việc
- Trọng tâm ngữ pháp: mệnh đề quan hệ mọi cách (kể cả Dativ, Genitiv, có giới từ); Relativpronomen wo/was
- Số lesson: 3 (b1-u02-l1, b1-u02-l2, b1-u02-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b1-u03 · Schule und Weiterbildung (Giáo dục & học tập)
````text
UNIT
- id: b1-u03
- Trình độ: B1
- Thứ tự: 3
- Chủ đề: Schule und Weiterbildung — Giáo dục & học tập
- Tình huống / từ vựng: hệ thống giáo dục Đức, học nghề (Ausbildung), đại học, học suốt đời
- Trọng tâm ngữ pháp: Infinitiv mit zu; um … zu / damit; ohne … zu, statt … zu
- Số lesson: 3 (b1-u03-l1, b1-u03-l2, b1-u03-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b1-u04 · Konsum und Werbung (Tiêu dùng & quảng cáo)
````text
UNIT
- id: b1-u04
- Trình độ: B1
- Thứ tự: 4
- Chủ đề: Konsum und Werbung — Tiêu dùng & quảng cáo
- Tình huống / từ vựng: mua sắm, quảng cáo, khiếu nại, quyền lợi người tiêu dùng
- Trọng tâm ngữ pháp: Passiv (Präsens, Präteritum, Perfekt, với động từ khuyết thiếu)
- Số lesson: 3 (b1-u04-l1, b1-u04-l2, b1-u04-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b1-u05 · Gesundheit und Ernährung (Sức khỏe & dinh dưỡng)
````text
UNIT
- id: b1-u05
- Trình độ: B1
- Thứ tự: 5
- Chủ đề: Gesundheit und Ernährung — Sức khỏe & dinh dưỡng
- Tình huống / từ vựng: thói quen ăn uống, hệ thống y tế, bảo hiểm, phòng bệnh
- Trọng tâm ngữ pháp: Konjunktiv II quá khứ (hätte … gemacht, wäre … gegangen); câu điều kiện không có thật; irreale Wünsche
- Số lesson: 3 (b1-u05-l1, b1-u05-l2, b1-u05-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b1-u06 · Kunst und Kultur (Nghệ thuật & văn hóa)
````text
UNIT
- id: b1-u06
- Trình độ: B1
- Thứ tự: 6
- Chủ đề: Kunst und Kultur — Nghệ thuật & văn hóa
- Tình huống / từ vựng: âm nhạc, phim, bảo tàng, văn hóa vùng miền nước Đức
- Trọng tâm ngữ pháp: Genitiv; giới từ đi với Genitiv (wegen, trotz, während, statt, innerhalb)
- Số lesson: 3 (b1-u06-l1, b1-u06-l2, b1-u06-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b1-u07 · Medien und Technik (Truyền thông & công nghệ)
````text
UNIT
- id: b1-u07
- Trình độ: B1
- Thứ tự: 7
- Chủ đề: Medien und Technik — Truyền thông & công nghệ
- Tình huống / từ vựng: điện thoại thông minh, AI, tin tức, an toàn mạng
- Trọng tâm ngữ pháp: Futur I; phỏng đoán (werden + wohl); n-Deklination
- Số lesson: 3 (b1-u07-l1, b1-u07-l2, b1-u07-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b1-u08 · Miteinander leben (Chung sống)
````text
UNIT
- id: b1-u08
- Trình độ: B1
- Thứ tự: 8
- Chủ đề: Miteinander leben — Chung sống
- Tình huống / từ vựng: gia đình hiện đại, hàng xóm, hôn nhân, các thế hệ
- Trọng tâm ngữ pháp: liên từ hai vế: sowohl … als auch, weder … noch, entweder … oder, zwar … aber, nicht nur … sondern auch, je … desto
- Số lesson: 3 (b1-u08-l1, b1-u08-l2, b1-u08-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b1-u09 · Umwelt und Zukunft (Môi trường & tương lai)
````text
UNIT
- id: b1-u09
- Trình độ: B1
- Thứ tự: 9
- Chủ đề: Umwelt und Zukunft — Môi trường & tương lai
- Tình huống / từ vựng: biến đổi khí hậu, năng lượng, đô thị tương lai, lối sống bền vững
- Trọng tâm ngữ pháp: mệnh đề thời gian: während, bevor, seitdem, bis, sobald, solange
- Số lesson: 3 (b1-u09-l1, b1-u09-l2, b1-u09-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b1-u10 · Reisen und Mobilität (Du lịch & di chuyển)
````text
UNIT
- id: b1-u10
- Trình độ: B1
- Thứ tự: 10
- Chủ đề: Reisen und Mobilität — Du lịch & di chuyển
- Tình huống / từ vựng: phương tiện, du lịch bền vững, sự cố trên đường, báo cáo du lịch
- Trọng tâm ngữ pháp: đuôi tính từ không mạo từ; Partizip I & II làm tính từ
- Số lesson: 3 (b1-u10-l1, b1-u10-l2, b1-u10-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b1-u11 · Politik und Gesellschaft (Chính trị & xã hội)
````text
UNIT
- id: b1-u11
- Trình độ: B1
- Thứ tự: 11
- Chủ đề: Politik und Gesellschaft — Chính trị & xã hội
- Tình huống / từ vựng: nhà nước Đức, bầu cử, tình nguyện, hội nhập
- Trọng tâm ngữ pháp: động từ/tính từ/danh từ đi với giới từ; trotzdem/obwohl; Konnektoren nâng cao
- Số lesson: 3 (b1-u11-l1, b1-u11-l2, b1-u11-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b1-u12 · Prüfungstraining B1 (Luyện thi B1)
````text
UNIT
- id: b1-u12
- Trình độ: B1
- Thứ tự: 12
- Chủ đề: Prüfungstraining B1 — Luyện thi B1
- Tình huống / từ vựng: mô phỏng Goethe-Zertifikat B1: Lesen, Hören, Schreiben (E-Mail, Forumsbeitrag), Sprechen (gemeinsam etwas planen, Präsentation)
- Trọng tâm ngữ pháp: tổng ôn ngữ pháp B1; Redemittel trình bày ý kiến
- Số lesson: 3 (b1-u12-l1, b1-u12-l2, b1-u12-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

### B2 – Trung cao cấp

#### b2-u01 · Glück und Lebensqualität (Hạnh phúc & chất lượng sống)
````text
UNIT
- id: b2-u01
- Trình độ: B2
- Thứ tự: 1
- Chủ đề: Glück und Lebensqualität — Hạnh phúc & chất lượng sống
- Tình huống / từ vựng: hạnh phúc, giá trị sống, tâm lý tích cực
- Trọng tâm ngữ pháp: Nomen-Verb-Verbindungen (in Frage kommen, eine Entscheidung treffen …)
- Số lesson: 3 (b2-u01-l1, b2-u01-l2, b2-u01-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b2-u02 · Arbeitswelt im Wandel (Thế giới việc làm thay đổi)
````text
UNIT
- id: b2-u02
- Trình độ: B2
- Thứ tự: 2
- Chủ đề: Arbeitswelt im Wandel — Thế giới việc làm thay đổi
- Tình huống / từ vựng: làm việc từ xa, tự động hóa, khởi nghiệp, thương lượng lương
- Trọng tâm ngữ pháp: thay thế bị động: sich lassen, -bar/-lich, sein + zu, man; Zustandspassiv
- Số lesson: 3 (b2-u02-l1, b2-u02-l2, b2-u02-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b2-u03 · Wissenschaft und Forschung (Khoa học & nghiên cứu)
````text
UNIT
- id: b2-u03
- Trình độ: B2
- Thứ tự: 3
- Chủ đề: Wissenschaft und Forschung — Khoa học & nghiên cứu
- Tình huống / từ vựng: phát minh, nghiên cứu, đạo đức khoa học, thống kê & biểu đồ
- Trọng tâm ngữ pháp: danh từ hóa & động từ hóa (Nominalisierung/Verbalisierung); mô tả biểu đồ
- Số lesson: 3 (b2-u03-l1, b2-u03-l2, b2-u03-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b2-u04 · Sprache und Kommunikation (Ngôn ngữ & giao tiếp)
````text
UNIT
- id: b2-u04
- Trình độ: B2
- Thứ tự: 4
- Chủ đề: Sprache und Kommunikation — Ngôn ngữ & giao tiếp
- Tình huống / từ vựng: đa ngôn ngữ, phương ngữ, giao tiếp liên văn hóa, ngôn ngữ cơ thể
- Trọng tâm ngữ pháp: Konjunktiv I – câu tường thuật gián tiếp (indirekte Rede)
- Số lesson: 3 (b2-u04-l1, b2-u04-l2, b2-u04-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b2-u05 · Wirtschaft und Konsum (Kinh tế & tiêu dùng)
````text
UNIT
- id: b2-u05
- Trình độ: B2
- Thứ tự: 5
- Chủ đề: Wirtschaft und Konsum — Kinh tế & tiêu dùng
- Tình huống / từ vựng: kinh tế chia sẻ, thương mại điện tử, tiêu dùng có trách nhiệm
- Trọng tâm ngữ pháp: Partizipialattribute mở rộng (die von vielen Kunden gekauften Produkte)
- Số lesson: 3 (b2-u05-l1, b2-u05-l2, b2-u05-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b2-u06 · Körper und Psyche (Thể chất & tinh thần)
````text
UNIT
- id: b2-u06
- Trình độ: B2
- Thứ tự: 6
- Chủ đề: Körper und Psyche — Thể chất & tinh thần
- Tình huống / từ vựng: stress, burnout, giấc ngủ, sức khỏe tinh thần
- Trọng tâm ngữ pháp: động từ khuyết thiếu chủ quan (soll, will, muss, dürfte, kann – phỏng đoán/tin đồn)
- Số lesson: 3 (b2-u06-l1, b2-u06-l2, b2-u06-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b2-u07 · Medienwelt (Thế giới truyền thông)
````text
UNIT
- id: b2-u07
- Trình độ: B2
- Thứ tự: 7
- Chủ đề: Medienwelt — Thế giới truyền thông
- Tình huống / từ vựng: tin giả, báo chí, mạng xã hội, quảng cáo ẩn
- Trọng tâm ngữ pháp: liên từ nhượng bộ & đối lập: obwohl, trotzdem, dennoch, während, wohingegen, allerdings
- Số lesson: 3 (b2-u07-l1, b2-u07-l2, b2-u07-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b2-u08 · Umwelt und Nachhaltigkeit (Môi trường & phát triển bền vững)
````text
UNIT
- id: b2-u08
- Trình độ: B2
- Thứ tự: 8
- Chủ đề: Umwelt und Nachhaltigkeit — Môi trường & phát triển bền vững
- Tình huống / từ vựng: tiêu dùng bền vững, chính sách khí hậu, tranh luận
- Trọng tâm ngữ pháp: câu điều kiện: falls, sofern, vorausgesetzt dass; als ob/als wenn (irreale Vergleiche)
- Số lesson: 3 (b2-u08-l1, b2-u08-l2, b2-u08-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b2-u09 · Literatur und Kunst (Văn học & nghệ thuật)
````text
UNIT
- id: b2-u09
- Trình độ: B2
- Thứ tự: 9
- Chủ đề: Literatur und Kunst — Văn học & nghệ thuật
- Tình huống / từ vựng: tác giả Đức, phân tích truyện ngắn, phê bình nghệ thuật
- Trọng tâm ngữ pháp: giới từ đi với Genitiv nâng cao (aufgrund, infolge, angesichts, hinsichtlich, mithilfe)
- Số lesson: 3 (b2-u09-l1, b2-u09-l2, b2-u09-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b2-u10 · Migration und Gesellschaft (Di cư & xã hội)
````text
UNIT
- id: b2-u10
- Trình độ: B2
- Thứ tự: 10
- Chủ đề: Migration und Gesellschaft — Di cư & xã hội
- Tình huống / từ vựng: hội nhập, bản sắc, đa văn hóa, chính sách nhập cư
- Trọng tâm ngữ pháp: Modalpartikeln (doch, ja, mal, eben, halt, eigentlich, wohl)
- Số lesson: 3 (b2-u10-l1, b2-u10-l2, b2-u10-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b2-u11 · Recht und Politik (Pháp luật & chính trị)
````text
UNIT
- id: b2-u11
- Trình độ: B2
- Thứ tự: 11
- Chủ đề: Recht und Politik — Pháp luật & chính trị
- Tình huống / từ vựng: quyền công dân, hệ thống pháp luật, tranh luận chính trị
- Trọng tâm ngữ pháp: Funktionsverbgefüge; Passiv mit Modalverben im Perfekt; Passiversatz
- Số lesson: 3 (b2-u11-l1, b2-u11-l2, b2-u11-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### b2-u12 · Prüfungstraining B2 (Luyện thi B2)
````text
UNIT
- id: b2-u12
- Trình độ: B2
- Thứ tự: 12
- Chủ đề: Prüfungstraining B2 — Luyện thi B2
- Tình huống / từ vựng: mô phỏng Goethe-Zertifikat B2: Lesen, Hören, Schreiben (Forumsbeitrag, formelle Nachricht), Sprechen (Vortrag, Diskussion)
- Trọng tâm ngữ pháp: tổng ôn ngữ pháp B2; Redemittel lập luận & thảo luận
- Số lesson: 3 (b2-u12-l1, b2-u12-l2, b2-u12-l3)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

### C1 – Cao cấp

#### c1-u01 · Persönlichkeit und Identität (Tính cách & bản sắc)
````text
UNIT
- id: c1-u01
- Trình độ: C1
- Thứ tự: 1
- Chủ đề: Persönlichkeit und Identität — Tính cách & bản sắc
- Tình huống / từ vựng: tâm lý học tính cách, bản sắc văn hóa, tự nhận thức
- Trọng tâm ngữ pháp: cấu tạo từ nâng cao (tiền tố/hậu tố: -los, -haft, -mäßig, miss-, ver-, zer-)
- Số lesson: 4 (c1-u01-l1, c1-u01-l2, c1-u01-l3, c1-u01-l4)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### c1-u02 · Wissenschaftliches Arbeiten (Viết học thuật)
````text
UNIT
- id: c1-u02
- Trình độ: C1
- Thứ tự: 2
- Chủ đề: Wissenschaftliches Arbeiten — Viết học thuật
- Tình huống / từ vựng: cấu trúc bài luận, trích dẫn, tóm tắt, trình bày nghiên cứu
- Trọng tâm ngữ pháp: Nominalstil vs. Verbalstil; liên kết văn bản (Textkohärenz, Konnektoren học thuật)
- Số lesson: 4 (c1-u02-l1, c1-u02-l2, c1-u02-l3, c1-u02-l4)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### c1-u03 · Führung und Arbeitswelt (Lãnh đạo & môi trường làm việc)
````text
UNIT
- id: c1-u03
- Trình độ: C1
- Thứ tự: 3
- Chủ đề: Führung und Arbeitswelt — Lãnh đạo & môi trường làm việc
- Tình huống / từ vựng: phong cách lãnh đạo, văn hóa doanh nghiệp, đàm phán, thuyết trình
- Trọng tâm ngữ pháp: Redewiedergabe nâng cao (Konjunktiv I/II, Redeeinleitende Verben: behaupten, betonen, einräumen)
- Số lesson: 4 (c1-u03-l1, c1-u03-l2, c1-u03-l3, c1-u03-l4)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### c1-u04 · Gesellschaft im Wandel (Xã hội biến đổi)
````text
UNIT
- id: c1-u04
- Trình độ: C1
- Thứ tự: 4
- Chủ đề: Gesellschaft im Wandel — Xã hội biến đổi
- Tình huống / từ vựng: già hóa dân số, số hóa, bất bình đẳng, đô thị hóa
- Trọng tâm ngữ pháp: cấu trúc phân từ (Partizipialkonstruktionen), satzwertige Partizipien
- Số lesson: 4 (c1-u04-l1, c1-u04-l2, c1-u04-l3, c1-u04-l4)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### c1-u05 · Wirtschaft und Globalisierung (Kinh tế & toàn cầu hóa)
````text
UNIT
- id: c1-u05
- Trình độ: C1
- Thứ tự: 5
- Chủ đề: Wirtschaft und Globalisierung — Kinh tế & toàn cầu hóa
- Tình huống / từ vựng: thương mại toàn cầu, chuỗi cung ứng, kinh tế Đức, đạo đức kinh doanh
- Trọng tâm ngữ pháp: mệnh đề phương thức & hệ quả (indem, dadurch dass, sodass, als dass, insofern als)
- Số lesson: 4 (c1-u05-l1, c1-u05-l2, c1-u05-l3, c1-u05-l4)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### c1-u06 · Medien und Meinungsbildung (Truyền thông & hình thành quan điểm)
````text
UNIT
- id: c1-u06
- Trình độ: C1
- Thứ tự: 6
- Chủ đề: Medien und Meinungsbildung — Truyền thông & hình thành quan điểm
- Tình huống / từ vựng: tự do báo chí, thuật toán, tranh luận công khai, bình luận báo
- Trọng tâm ngữ pháp: Argumentation: Redemittel, Gegenargumente, Konzessivsätze nâng cao (wenngleich, zumal, wie … auch immer)
- Số lesson: 4 (c1-u06-l1, c1-u06-l2, c1-u06-l3, c1-u06-l4)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### c1-u07 · Natur und Technik (Tự nhiên & công nghệ)
````text
UNIT
- id: c1-u07
- Trình độ: C1
- Thứ tự: 7
- Chủ đề: Natur und Technik — Tự nhiên & công nghệ
- Tình huống / từ vựng: năng lượng tái tạo, công nghệ sinh học, trí tuệ nhân tạo, đạo đức công nghệ
- Trọng tâm ngữ pháp: Passiv & Passiversatzformen nâng cao; Gerundivum (die zu lösende Aufgabe)
- Số lesson: 4 (c1-u07-l1, c1-u07-l2, c1-u07-l3, c1-u07-l4)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### c1-u08 · Kultur und Kreativität (Văn hóa & sáng tạo)
````text
UNIT
- id: c1-u08
- Trình độ: C1
- Thứ tự: 8
- Chủ đề: Kultur und Kreativität — Văn hóa & sáng tạo
- Tình huống / từ vựng: văn học, sân khấu, thành ngữ, ẩn dụ
- Trọng tâm ngữ pháp: thành ngữ & cách nói hình ảnh (Redewendungen), Funktionsverbgefüge nâng cao
- Số lesson: 4 (c1-u08-l1, c1-u08-l2, c1-u08-l3, c1-u08-l4)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### c1-u09 · Bildung und Sprache (Giáo dục & ngôn ngữ)
````text
UNIT
- id: c1-u09
- Trình độ: C1
- Thứ tự: 9
- Chủ đề: Bildung und Sprache — Giáo dục & ngôn ngữ
- Tình huống / từ vựng: cải cách giáo dục, đa ngôn ngữ, ngôn ngữ và quyền lực
- Trọng tâm ngữ pháp: văn phong & sắc thái (Register: umgangssprachlich – neutral – gehoben); Modalpartikeln nâng cao
- Số lesson: 4 (c1-u09-l1, c1-u09-l2, c1-u09-l3, c1-u09-l4)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

#### c1-u10 · Prüfungstraining C1 (Luyện thi C1)
````text
UNIT
- id: c1-u10
- Trình độ: C1
- Thứ tự: 10
- Chủ đề: Prüfungstraining C1 — Luyện thi C1
- Tình huống / từ vựng: mô phỏng Goethe-Zertifikat C1 / telc C1 / TestDaF: Lesen, Hören, Schreiben (Erörterung, formeller Brief), Sprechen (Vortrag, Diskussion)
- Trọng tâm ngữ pháp: tổng ôn ngữ pháp C1; Redemittel học thuật & thuyết trình
- Số lesson: 4 (c1-u10-l1, c1-u10-l2, c1-u10-l3, c1-u10-l4)
Nhắc lại: CHỈ trả về JSON hợp lệ, đầy đủ, đúng mọi quy tắc đã nêu ở đầu cuộc trò chuyện.
````

---

## (Tuỳ chọn) PROMPT SỬA JSON LỖI
Dùng khi AI trả JSON bị cắt cụt/hỏng và gõ "tiếp" không cứu được.
````text
Đoạn JSON dưới đây bị lỗi cú pháp hoặc bị cắt cụt. Hãy sửa để thành JSON hợp lệ, GIỮ NGUYÊN toàn bộ nội dung đã có, hoàn thiện phần bị cắt (nếu bị cắt giữa chừng thì bỏ phần tử dở dang cuối cùng và đóng ngoặc đúng). Chỉ trả về JSON, không giải thích.

<<<DÁN JSON LỖI VÀO ĐÂY>>>
````
