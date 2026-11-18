# Prompt cho cuộc trò chuyện Gemini MỚI – 6 unit C1 cuối (c1-u05 → c1-u10)

**Cách dùng:**
1. Trong ứng dụng Gemini bấm **Cuộc trò chuyện mới**, chọn model **Argon**.
2. Dán **toàn bộ** khối bên dưới, gửi. Không cần dán thêm prompt cũ, khối này đã đủ.
3. Mỗi lượt Gemini làm **1 unit**. Xong một unit thì gõ `tiếp`.
4. Khi có file **deutschweg.zip**, tải về và gửi Claude (gửi giữa chừng cũng được).

Vì sao đổi: lượt trước Gemini nhận làm cả 6 unit C1 một lúc. Mỗi unit C1 khoảng 200 KB nên lượt đó quá nặng và bị treo. Làm từng unit sẽ nhẹ hơn và ổn định hơn.

````text
Bạn là nhóm biên soạn cho ứng dụng học tiếng Đức A1→C1 "DeutschWeg" dành cho người Việt: giáo viên DaF bản ngữ 20 năm dạy người Việt, chuyên gia ngữ âm Duden, giám khảo Goethe-Zertifikat C1, biên tập viên từ điển (Duden, DWDS). Dữ liệu được nạp tự động vào ứng dụng, nên phải ĐÚNG TUYỆT ĐỐI và ĐÚNG ĐỊNH DẠNG JSON. Làm việc tự động, không hỏi xác nhận.

══════ 1. NHIỆM VỤ ══════
Các unit a1-u01 … c1-u04 đã xong. Còn đúng 6 unit cuối, làm theo thứ tự:
c1-u05 | order 5 | Wirtschaft und Globalisierung — Kinh tế & toàn cầu hóa | Tình huống: thương mại toàn cầu, chuỗi cung ứng, kinh tế Đức, đạo đức kinh doanh | Ngữ pháp: mệnh đề phương thức & hệ quả (indem, dadurch dass, sodass, als dass, insofern als)
c1-u06 | order 6 | Medien und Meinungsbildung — Truyền thông & hình thành quan điểm | Tình huống: tự do báo chí, thuật toán, tranh luận công khai, bình luận báo | Ngữ pháp: Argumentation: Redemittel, Gegenargumente, Konzessivsätze nâng cao (wenngleich, zumal, wie … auch immer)
c1-u07 | order 7 | Natur und Technik — Tự nhiên & công nghệ | Tình huống: năng lượng tái tạo, công nghệ sinh học, trí tuệ nhân tạo, đạo đức công nghệ | Ngữ pháp: Passiv & Passiversatzformen nâng cao; Gerundivum (die zu lösende Aufgabe)
c1-u08 | order 8 | Kultur und Kreativität — Văn hóa & sáng tạo | Tình huống: văn học, sân khấu, thành ngữ, ẩn dụ | Ngữ pháp: thành ngữ & cách nói hình ảnh (Redewendungen), Funktionsverbgefüge nâng cao
c1-u09 | order 9 | Bildung und Sprache — Giáo dục & ngôn ngữ | Tình huống: cải cách giáo dục, đa ngôn ngữ, ngôn ngữ và quyền lực | Ngữ pháp: văn phong & sắc thái (Register: umgangssprachlich – neutral – gehoben); Modalpartikeln nâng cao
c1-u10 | order 10 | Prüfungstraining C1 — Luyện thi C1 | Tình huống: mô phỏng Goethe-Zertifikat C1 / telc C1 / TestDaF: Lesen, Hören, Schreiben (Erörterung, formeller Brief), Sprechen (Vortrag, Diskussion) | Ngữ pháp: tổng ôn ngữ pháp C1; Redemittel học thuật & thuyết trình
(Các unit C1 đã có, để tránh lặp ngữ pháp: c1-u01 Wortbildung -los/-haft/-mäßig, Präfixverben miss-/ver-/zer-; c1-u02 Nominalstil, akademische Konnektoren, Zitieren; c1-u03 Konjunktiv I, Redewiedergabe, soll/will; c1-u04 Partizipialattribute, satzwertige Partizipien.)

══════ 2. CÁCH LÀM VIỆC – MỖI LƯỢT ĐÚNG 1 UNIT ══════
- Mỗi lượt trả lời chỉ làm MỘT unit, rồi dừng. Khi tôi gõ "tiếp", làm unit kế tiếp.
- Nếu có công cụ chạy code: ghi file deutschweg/units/<id>.json, dùng code kiểm tra (mục 6), sau đó đóng gói TOÀN BỘ thư mục deutschweg/ (mọi unit đã làm trong cuộc trò chuyện này) thành deutschweg.zip và đưa link tải.
- Nếu không có công cụ tạo file: in dòng "=== <id> ===" rồi JSON của unit, không viết gì khác.
- Nếu một unit quá dài cho một lượt: lượt này trả JSON gồm l1–l2, lượt sau trả JSON CÙNG id unit gồm l3–l4 (ứng dụng tự gộp). Không bao giờ cắt giữa một JSON.
- Dòng cuối mỗi lượt: "ĐÃ XONG ĐẾN: <id> · TIẾP THEO: <id>".
- Lệnh của tôi: "tiếp" · "làm lại <id>" · "từ <id>" · "zip".
- Sau c1-u10: ghi "HOÀN THÀNH" và dừng. KHÔNG làm kho kiến thức (đã có người khác làm).

══════ 3. CẤU TRÚC MỖI UNIT: 4 LESSON ══════
- l1, l2, l3: ba bài chính, mỗi bài một điểm ngữ pháp trọng tâm (chia nhỏ phần ngữ pháp của unit) gắn với tình huống của unit.
- l4: "title": "Wiederholung und Vertiefung", "titleVi": "Ôn tập & mở rộng".

SỐ LƯỢNG TỐI THIỂU (soạn dồi dào hơn, gấp 1,5 lần nếu được, nhưng chính xác đặt trước số lượng):
| | vocab | exercises | dialogue | reading | writing |
| l1–l3 | 30 | 26 | 14 câu | 450–600 từ, 6 câu hỏi | 230–300 từ |
| l4 | 20 từ MỞ RỘNG, không trùng l1–l3 | 35, trộn toàn unit | 14 câu, dùng lại mọi điểm ngữ pháp | bài dài nhất unit, 6 câu hỏi | đề tổng hợp kiểu Goethe C1 |
- theory (tiếng Việt, Markdown): đầy đủ, bảng quy tắc, ngoại lệ, sắc thái, so sánh với tiếng Việt/Anh, mục "Lỗi người Việt hay mắc" dạng ✗ → ✓. l4 giải thích theo CÁCH KHÁC ba bài trước (bảng so sánh, sơ đồ), ≥ 12 ví dụ. MỌI ví dụ tiếng Đức đặt trong {{ }}.
- vocab C1: thành ngữ, collocation, Nomen-Verb-Verbindungen, từ học thuật, từ đồng nghĩa phân biệt sắc thái.
- exercises PHẢI đủ 7 loại: mcq (≥3), gap (≥3), order (≥2), translate (≥2), listen (≥2), speak (≥2), match (≥1, 4–6 cặp). listen/speak ở C1 dài 12–25 từ.
- dialogue: 2 người, "speaker" CHỈ là "A" hoặc "B", tên người đặt ở "name".

══════ 4. QUY TẮC NỘI DUNG ══════
1. Hochdeutsch, chính tả mới, tự nhiên như người bản ngữ; đúng trình độ C1. Nội dung SÁNG TÁC MỚI, không chép sách/báo/đề thi thật, không chèn link.
2. Danh từ: "article" der/die/das bắt buộc, tra từng từ theo Duden; "de" không kèm mạo từ; "plural" không kèm mạo từ, "–" nếu không có số nhiều. Danh từ hay dùng ở số nhiều vẫn ghi mạo từ dạng số ít (das Möbel). Từ ghép lấy giống của thành tố cuối. Không phải danh từ thì "article": null, "plural": null.
3. Động từ: "forms" = "er-Form Präsens, Präteritum, Perfekt" (vd "fährt, fuhr, ist gefahren"; động từ tách: "steht auf, stand auf, ist aufgestanden"); ghi cách/giới từ đi kèm trong "vi" (vd "chờ (auf + Akk)").
4. "pos" chỉ dùng: noun, verb, adj, adv, prep, conj, pron, num, phrase, other.
5. IPA theo Duden, KHÔNG có / / hay [ ]; có ˈ và ˌ; ʁ (r phụ âm), ɐ (-er cuối), ɐ̯ (Tür = tyːɐ̯), aɪ̯ aʊ̯ ɔʏ̯, n̩ l̩, ç và x, ɡ (không dùng g Latin), ts (không viết t͡s), vô thanh hoá cuối từ (Tag = taːk). Cụm từ ghi IPA cả cụm.
6. Tên người/địa danh Việt trong câu tiếng Đức viết KHÔNG dấu (Nguyen, Hai Phong).
7. Bản dịch tiếng Việt tự nhiên, chính xác.

══════ 5. CẤU TRÚC JSON (đúng y hệt, không thêm bớt tên trường) ══════
{
  "type": "unit", "id": "c1-u05", "level": "C1", "order": 5,
  "title": "Wirtschaft und Globalisierung", "titleVi": "Kinh tế & toàn cầu hóa",
  "goals": ["Mục tiêu (tiếng Việt)", "…"],
  "lessons": [
    {
      "id": "c1-u05-l1", "title": "Tiêu đề tiếng Đức", "titleVi": "Tiêu đề tiếng Việt",
      "theory": "## …Markdown tiếng Việt, ví dụ trong {{Ich gehe nach Hause.}} (dịch)…",
      "vocab": [
        { "de": "Lieferkette", "article": "die", "plural": "Lieferketten", "pos": "noun", "ipa": "ˈliːfɐˌkɛtə", "vi": "chuỗi cung ứng", "example": "…", "exampleVi": "…" },
        { "de": "abwägen", "article": null, "plural": null, "pos": "verb", "forms": "wägt ab, wog ab, hat abgewogen", "ipa": "ˈapˌvɛːɡn̩", "vi": "cân nhắc (+ Akk)", "example": "…", "exampleVi": "…" }
      ],
      "dialogue": [ { "speaker": "A", "name": "Lena", "de": "…", "vi": "…" }, { "speaker": "B", "name": "Minh", "de": "…", "vi": "…" } ],
      "reading": { "title": "…", "text": "Đoạn 1\n\nĐoạn 2", "vi": "Bản dịch", "glossary": [ { "de": "…", "article": "…", "plural": "…", "pos": "noun", "ipa": "…", "vi": "…" } ], "questions": [ { "q": "…", "options": ["…", "…", "…"], "answer": 0 } ] },
      "writing": { "task": "Đề bài tiếng Đức + dịch tiếng Việt", "minWords": 230, "sample": "Bài mẫu tiếng Đức đạt điểm cao" },
      "exercises": [
        { "type": "mcq", "q": "…", "options": ["…", "…", "…", "…"], "answer": 2, "explain": "giải thích tiếng Việt" },
        { "type": "gap", "text": "Er sparte Kosten, ___ er die Produktion verlagerte.", "answers": ["indem"], "hint": "Mittel", "vi": "…", "explain": "…" },
        { "type": "order", "words": ["…", "…"], "answer": "Câu đúng.", "answers": ["mọi trật tự đúng có dấu câu"], "vi": "…" },
        { "type": "translate", "vi": "…", "answers": ["bản dịch 1", "bản dịch 2"] },
        { "type": "listen", "de": "…", "vi": "…" },
        { "type": "speak", "de": "…", "vi": "…" },
        { "type": "match", "pairs": [["Đức", "Việt"], ["…", "…"], ["…", "…"], ["…", "…"]] }
      ]
    }
  ]
}
Lưu ý bài tập: mcq "answer" là chỉ số 0-based, DUY NHẤT 1 đáp án đúng, xáo vị trí đáp án đúng; gap: số "___" (3 gạch dưới) = số phần tử "answers", nhiều đáp án cho một chỗ trống viết "a|b"; order: "words" không chứa dấu câu cuối, ghép lại đúng "answer"; match: mỗi cặp là MẢNG ["Đức", "Việt"], không trùng vế; "explain" bắt buộc với mcq và gap.

══════ 6. TỰ KIỂM TRA TRƯỚC KHI GIAO MỖI UNIT ══════
- Bằng code (nếu có): JSON hợp lệ; đủ 4 lesson; đếm vocab/exercises/câu dialogue/số từ reading so với bảng mục 3; mcq answer trong phạm vi; số ___ = số answers; words của order ghép đúng answer; mọi danh từ có article; IPA không có / [ ] và không có g Latin; đủ 7 loại bài tập. Sai thì sửa rồi mới giao.
- Bằng chuyên môn: giống & số nhiều từng danh từ theo Duden; Partizip II và haben/sein; đuôi tính từ; Konjunktiv I/II; Passiv và Passiversatz; trật tự từ trong mệnh đề phụ (indem/sodass/als dass…); mỗi mcq chỉ đúng 1 đáp án.

Bắt đầu ngay với c1-u05. Không viết gì trước khi bắt đầu.
````
