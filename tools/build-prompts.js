// Tạo PROMPTS.md từ js/curriculum.js + js/prompts.js.  Chạy: node tools/build-prompts.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = { window: {}, console };
vm.createContext(ctx);
for (const f of ['js/curriculum.js', 'js/prompts.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8') + '\nthis.CURRICULUM = typeof CURRICULUM !== "undefined" ? CURRICULUM : this.CURRICULUM; this.PROMPTS = typeof PROMPTS !== "undefined" ? PROMPTS : this.PROMPTS;', ctx);
}
const { CURRICULUM, PROMPTS } = ctx;
const fence = s => '````text\n' + s + '\n````';
const done = new Set(['a1-u01']);
const todo = CURRICULUM.units.filter(u => !done.has(u.id));

let md = `# Prompt tạo nội dung DeutschWeg (A1 → C1)

## Cách làm
**Cả ChatGPT (Sol 6.2) và Gemini (Argon 4) làm CÙNG nội dung.** Claude so sánh hai bản, chọn phần hay nhất của mỗi bên, sửa lỗi rồi ghép thành bản cuối đưa vào web.

1. Ở **cả hai** AI: dán **PROMPT 0 – THIẾT LẬP** (bạn đã làm bước này).
2. Ở **cả hai** AI: dán **PROMPT 1 – TOÀN BỘ UNIT** bên dưới. AI sẽ bắt đầu làm unit đầu tiên (${todo[0].id}).
3. Từ đó bạn chỉ cần gõ **\`tiếp\`** — mỗi lần AI trả về 1 unit (hoặc 1 phần), dòng đầu có nhãn \`=== a1-u02 (phần 1/1) ===\`.
4. Gửi kết quả cho Claude theo từng unit, ghi rõ của ai:
   \`a1-u02 – ChatGPT:\` (dán) … \`a1-u02 – Gemini:\` (dán). Đính kèm file cũng được (\`a1-u02.chatgpt.json\`, \`a1-u02.gemini.json\`). Gửi vài unit một lần cũng được.
5. Lệnh hữu ích trong lúc làm:
   - \`làm lại a1-u03\` — soạn lại một unit (khi Claude báo bản đó lỗi nhiều).
   - \`từ b1-u01\` — tiếp tục từ một unit cụ thể.
6. Khi cuộc trò chuyện quá dài (AI bắt đầu làm sơ sài hoặc chậm): mở cuộc trò chuyện mới → dán PROMPT 0 → dán PROMPT 1 → gõ \`từ <id unit kế tiếp>\`.

> Unit **a1-u01** đã có sẵn trong web (Claude soạn), không cần làm.

---

## PROMPT 0 – THIẾT LẬP (dán đầu mỗi cuộc trò chuyện)
${fence(PROMPTS.setup())}

---

## PROMPT 1 – TOÀN BỘ UNIT (dán ngay sau PROMPT 0, ở cả hai AI)
${fence(PROMPTS.allUnits(todo))}

---

## Dự phòng: tin nhắn riêng từng unit
Chỉ dùng khi muốn yêu cầu riêng một unit ở cuộc trò chuyện mới (sau PROMPT 0).
`;
for (const lv of CURRICULUM.levelKeys) {
  md += `\n### ${CURRICULUM.levels[lv].name}\n`;
  for (const u of todo.filter(x => x.level === lv)) md += `\n#### ${u.id} · ${u.title} (${u.titleVi})\n${fence(PROMPTS.unitShort(u))}\n`;
}
md += `
---

## (Tuỳ chọn) PROMPT SỬA JSON LỖI
Dùng khi AI trả JSON bị cắt cụt/hỏng và gõ "tiếp" không cứu được.
${fence(PROMPTS.fixJson)}
`;
fs.writeFileSync(path.join(root, 'PROMPTS.md'), md);
console.log('PROMPTS.md:', md.length, 'ký tự,', todo.length, 'unit');
