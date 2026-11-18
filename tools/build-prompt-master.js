// Tạo PROMPT-TONG.md – MỘT prompt duy nhất giao toàn bộ công việc (giáo trình + kho kiến thức) cho mỗi AI.
// Chạy: node tools/build-prompt-master.js [id đã xong, phân tách bằng dấu phẩy]
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = { window: {}, console };
vm.createContext(ctx);
for (const f of ['js/curriculum.js', 'js/prompts.js']) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8') + '\nthis.CURRICULUM = typeof CURRICULUM !== "undefined" ? CURRICULUM : this.CURRICULUM; this.PROMPTS = typeof PROMPTS !== "undefined" ? PROMPTS : this.PROMPTS;', ctx);
const { CURRICULUM, PROMPTS } = ctx;
const K = require('./build-prompts-kho.js');

const done = new Set(['a1-u01', ...(process.argv[2] || 'a1-u02,a1-u03').split(',').filter(Boolean)]);
const units = CURRICULUM.units.filter(u => !done.has(u.id));

// Lấy phần quy tắc + cấu trúc từ prompt thiết lập giáo trình (bỏ câu "Nếu đã hiểu…")
const setup = PROMPTS.setup().replace(/\n*Nếu đã hiểu[\s\S]*$/, '').replace(/^[\s\S]*?(# SỐ LƯỢNG)/, '$1');
// Lấy phần mô tả + cấu trúc của từng nhiệm vụ kho (bỏ dòng "Bắt đầu với…")
const task = s => s.replace(/\n*Bắt đầu[^\n]*$/, '').trim();
const k0rules = K.K0.replace(/^[\s\S]*?(QUY TẮC CHUNG)/, '$1').replace(/\n*5\. ĐỊNH DẠNG TRẢ LỜI[\s\S]*?(?=\n7\.)/, '').replace(/\n*Nếu đã hiểu[\s\S]*$/, '');

const unitList = units.map(u => `${u.id} | ${u.level} | ${u.title} — ${u.titleVi} | Tình huống: ${u.topics} | Ngữ pháp: ${u.grammar} | ${u.lessons} lesson`).join('\n');
const nDecks = Object.values(K.DECKS).flat().length, nGr = Object.values(K.GR).flat().length, nRd = Object.values(K.RD).reduce((a, [n]) => a + n, 0);

const P = `# NHIỆM VỤ TỔNG: XÂY TOÀN BỘ NỘI DUNG CHO ỨNG DỤNG HỌC TIẾNG ĐỨC A1 → C1 (cho người Việt)

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
${k0rules.trim()}

## C. GIÁO TRÌNH CHÍNH – UNIT (thư mục units/)
${setup.trim()}

## D. KHO KIẾN THỨC
### D1. Bộ từ vựng (thư mục decks/)
${task(K.K1).replace(/\n*DANH SÁCH[\s\S]*$/, '')}

### D2. Cẩm nang ngữ pháp (thư mục grammar/)
${task(K.K2).replace(/\n*DANH SÁCH[\s\S]*$/, '')}

### D3. Cơ sở dữ liệu động từ (thư mục verbs/)
${task(K.K3)}

### D4. Thư viện bài đọc (thư mục readings/)
${task(K.K4).replace(/^NHIỆM VỤ:[^\n]*\nLàm lần lượt[^\n]*\n/, '')}

### D5. Đề thi thử (thư mục exams/)
${task(K.K5).replace(/\nLàm lần lượt[^\n]*\n/, '\n')}

## E. DANH SÁCH CÔNG VIỆC (làm đúng thứ tự)
Đã có sẵn, KHÔNG làm: ${[...done].join(', ')}.

### E1. ${units.length} unit giáo trình (id | trình độ | chủ đề | tình huống | ngữ pháp | số lesson)
${unitList}

### E2. 20 gói động từ: verbs-01 … verbs-20

### E3. ${nGr} chủ điểm ngữ pháp (id | trình độ | chủ điểm)
${Object.entries(K.GR).map(([lv, ts]) => ts.map((t, i) => `${K.grId(lv, i)} | ${lv} | ${t}`).join('\n')).join('\n')}

### E4. ${nDecks} bộ từ vựng (id | trình độ | chủ đề)
${Object.entries(K.DECKS).map(([lv, ts]) => ts.map((t, i) => `${K.deckId(lv, i)} | ${lv} | ${t}`).join('\n')).join('\n')}

### E5. ${nRd} bài đọc: ${Object.entries(K.RD).map(([lv, [n]]) => `rd-${lv.toLowerCase()}-01 … rd-${lv.toLowerCase()}-${String(n).padStart(2, '0')}`).join(', ')}

### E6. 10 đề thi thử: ex-a1-1, ex-a1-2, ex-a2-1, ex-a2-2, ex-b1-1, ex-b1-2, ex-b2-1, ex-b2-2, ex-c1-1, ex-c1-2

## F. BẮT ĐẦU NGAY
Bắt đầu với ${units[0].id}, làm liên tục theo danh sách. Không trả lời gì khác trước khi bắt đầu.`;

const md = `# PROMPT TỔNG – giao toàn bộ việc một lần

**Cách dùng (cho cả ChatGPT và Gemini):**
1. Mở **cuộc trò chuyện mới**, dán **toàn bộ** khối prompt bên dưới, gửi. Không cần PROMPT 0 nữa.
2. AI tự làm liên tục, mỗi mục một file JSON, định kỳ đóng gói **deutschweg.zip**.
3. Khi AI dừng vì hết lượt: gõ **\`tiếp\`**. Muốn lấy file ngay: gõ **\`zip\`**.
4. Gửi Claude file **deutschweg.zip** của mỗi AI (đổi tên thành \`chatgpt.zip\`, \`gemini.zip\` cho dễ phân biệt) – gửi bất cứ lúc nào, gửi nhiều lần cũng được. Claude so sánh, chọn bản tốt hơn cho từng mục, sửa lỗi và đưa lên web.
5. Nếu AI không tạo được file mà in JSON ra chat: cứ chép cả đoạn gửi Claude như trước.
6. Khi cuộc trò chuyện quá dài, AI bắt đầu làm sơ sài: mở cuộc mới → dán lại prompt này → gõ \`từ <id tiếp theo>\` (xem trong TIEN-DO.md).

Khối lượng: ${units.length} unit · 20 gói động từ (500 động từ) · ${nGr} chủ điểm ngữ pháp · ${nDecks} bộ từ vựng · ${nRd} bài đọc · 10 đề thi.

\`\`\`\`text
${P}
\`\`\`\`
`;
fs.writeFileSync(path.join(root, 'PROMPT-TONG.md'), md);
console.log('PROMPT-TONG.md:', P.length, 'ký tự prompt ·', units.length, 'unit, bắt đầu từ', units[0].id);
