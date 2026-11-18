# DeutschWeg – Học tiếng Đức A1 → C1

## Chạy web
```
node server.js
```
Mở http://localhost:5173 bằng **Microsoft Edge** (giọng đọc tiếng Đức Natural miễn phí tốt nhất) hoặc Chrome. Mở trực tiếp `index.html` cũng chạy được.

## Đưa lên mạng (Cloudflare Pages, giống hoccungkart)
Repo GitHub để **Private**. Trên Cloudflare → Workers & Pages → Create → Pages → Connect to Git → chọn repo này:
- Build command: `node tools/build-site.js`
- Build output directory: `dist`

`tools/build-site.js` chỉ đưa file web công khai vào `dist/` (không có `tools/`, prompt, `inbox/`) và tự dừng nếu phát hiện chuỗi giống API key. File `_headers` bật các header bảo mật (CSP, chống nhúng iframe, chỉ cho phép micro).
API key Gemini/OpenAI/Azure **không bao giờ** nằm trong mã nguồn – mỗi người tự nhập trong Cài đặt, lưu ở trình duyệt của họ.

## Tính năng
- Lộ trình 58 unit theo CEFR/Goethe (A1 → C1): lý thuyết, từ vựng (IPA, mạo từ tô màu), hội thoại 2 giọng, đọc hiểu, bài viết chấm bằng AI.
- 8 dạng bài tập: trắc nghiệm, điền từ, sắp xếp câu, dịch, nghe–chép, luyện nói có chấm điểm, nối cặp, mạo từ. Câu sai được hỏi lại.
- Ôn tập từ vựng bằng FSRS-5 (thuật toán lặp lại ngắt quãng hiện đại nhất), 2 chế độ Đức→Việt / Việt→Đức.
- Phòng phát âm: IPA Duden, umlaut, nguyên âm dài–ngắn, ich/ach-Laut, cặp tối thiểu + thử thách nghe, bảng chữ cái, trọng âm & ngữ điệu, câu líu lưỡi, mẹo riêng cho người Việt.
- Chấm phát âm: nhận dạng giọng nói (miễn phí, Chrome/Edge) hoặc **Azure Pronunciation Assessment** (chấm từng âm vị).
- Giọng đọc: giọng neural của trình duyệt hoặc **Azure Neural TTS** (Katja, Conrad, Seraphina…).
- Luyện der/die/das có quy tắc gợi ý, chia động từ (Präsens/Präteritum/Perfekt/Konjunktiv II/Imperativ), nghe–chép chính tả, shadowing.
- Gia sư AI (Gemini/OpenAI): hội thoại nhập vai bằng giọng nói, chấm bài viết theo Goethe, hỏi ngữ pháp.
- Kho kiến thức: bộ từ vựng, cẩm nang ngữ pháp, thư viện đọc, đề thi thử.
- XP, chuỗi ngày, mục tiêu ngày, bản đồ hoạt động, giao diện sáng/tối, dùng offline (PWA), sao lưu tiến độ.

## Quy trình nội dung
1. `PROMPTS.md` (giáo trình) và `PROMPTS-KHO.md` (kho kiến thức) → dán vào cả ChatGPT và Gemini.
2. Gửi cả hai bản cho Claude → Claude so sánh, chọn, sửa (`inbox/edit-*.js` ghi lại mọi thay đổi).
3. `node tools/add-content.js add inbox/<id>.final.json` → nội dung vào `data/` và hiện trên web.

Công cụ: `tools/add-content.js check|add`, `tools/dump.js` (xem gọn nội dung), `tools/normalize.js` (chuẩn hoá IPA & tên riêng), `tools/build-prompts*.js` (tạo file prompt).
