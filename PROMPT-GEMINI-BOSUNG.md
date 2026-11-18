# Prompt bổ sung – từ nay chỉ dùng Gemini

**Cách dùng:**
- **Cuộc trò chuyện Gemini đang chạy:** dán khối dưới đây vào, gửi. Gemini sẽ làm tiếp từ **b2-u02** theo yêu cầu mới.
- **Cuộc trò chuyện mới:** dán `PROMPT-TONG.md` trước, rồi dán khối này ngay sau.

Vì sao cần: khi chỉ còn một AI, Claude không còn bản thứ hai để đối chiếu chéo và dựng bài "Ôn tập & mở rộng". Khối này yêu cầu Gemini tự làm bài thứ 4, soạn dày hơn (trước đây Gemini cho ít từ vựng, bài tập và bài đọc ngắn hơn ChatGPT) và tự kiểm tra kỹ hơn.

````text
CẬP NHẬT YÊU CẦU (áp dụng cho mọi unit từ giờ, ưu tiên cao hơn các con số trước đó):

1. TIẾN ĐỘ: các unit đến hết b2-u01 đã có đủ. Làm tiếp từ b2-u02 đến c1-u10, rồi mới sang phần kho kiến thức (verbs → grammar → decks → readings → exams).

2. MỖI UNIT CÓ 4 LESSON (id …-l1 đến …-l4):
   - l1, l2, l3: ba bài chính như trước, mỗi bài một điểm ngữ pháp trọng tâm.
   - l4: "title": "Wiederholung und Vertiefung", "titleVi": "Ôn tập & mở rộng" –
     • theory: tổng hợp toàn unit theo CÁCH GIẢI THÍCH KHÁC (bảng so sánh, sơ đồ quy tắc, lỗi người Việt hay mắc), ≥ 12 ví dụ {{ }};
     • vocab: ≥ 20 từ MỞ RỘNG cùng chủ đề, KHÔNG trùng l1–l3 (collocation, từ đồng nghĩa, cụm cố định);
     • dialogue: ≥ 14 câu, tình huống thực tế dùng lại mọi điểm ngữ pháp của unit;
     • reading: 1 bài đọc dài nhất unit (độ dài theo trình độ ở mục 3) + 5–6 câu hỏi;
     • writing: 1 đề tổng hợp kiểu Goethe;
     • exercises: ≥ 35 bài trộn mọi điểm ngữ pháp và từ vựng của unit, đủ 7 loại.

3. SỐ LƯỢNG TỐI THIỂU MỖI LESSON (l1–l3):
   | Trình độ | vocab | exercises | dialogue | reading mỗi lesson |
   |---|---|---|---|---|
   | B2 | 28 | 26 | 14 câu | 350–450 từ, 5 câu hỏi |
   | C1 | 30 | 26 | 14 câu | 450–600 từ, 6 câu hỏi |
   Mỗi lesson phải có reading và writing. Không được ngắn hơn các unit trước.

4. TỰ KIỂM TRA KỸ TRƯỚC KHI GHI MỖI FILE (không còn AI thứ hai đối chiếu):
   - Giống danh từ: tra từng danh từ theo Duden. Danh từ hay dùng ở số nhiều vẫn ghi mạo từ của DẠNG SỐ ÍT (das Möbel → die Möbel; der Grad; das Porto, Portos). Từ ghép lấy giống của thành tố cuối.
   - Khi Duden có nhiều dạng (số nhiều, phát âm), ghi dạng chuẩn đứng đầu trong Duden và nêu dạng còn lại trong "vi".
   - Động từ: kiểm tra lại "forms" (er-Form, Präteritum, haben/sein ở Perfekt), cách đi kèm (+Dat/+Akk), giới từ cố định.
   - Đuôi tính từ, Konjunktiv I/II, Passiv, Partizipialattribute: kiểm tra từng câu ví dụ và từng đáp án.
   - mcq: đúng 1 đáp án đúng; gap: số ___ = số answers; order: words ghép đúng answer; match: mỗi cặp là mảng ["Đức", "Việt"].
   - Tên người Việt trong câu tiếng Đức viết KHÔNG dấu (Nguyen, Hai Phong) để giọng đọc tiếng Đức phát âm trôi chảy.

5. Giữ nguyên cách làm việc: mỗi unit một file units/<id>.json, cập nhật TIEN-DO.md, đóng gói deutschweg.zip định kỳ, gặp giới hạn thì dừng ở ranh giới file. Bắt đầu ngay với b2-u02.
````
