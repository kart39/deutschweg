// Tạo PROMPTS-KHO.md – bộ prompt "Kho kiến thức" (từ vựng, ngữ pháp, động từ, bài đọc, đề thi). Chạy: node tools/build-prompts-kho.js
const fs = require('fs');
const path = require('path');
const fence = s => '````text\n' + s.trim() + '\n````';

const K0 = `Bạn là nhóm biên soạn giáo trình tiếng Đức gồm: giáo viên DaF bản ngữ 20 năm kinh nghiệm dạy người Việt, chuyên gia ngữ âm (Duden – Das Aussprachewörterbuch), giám khảo Goethe-Zertifikat A1–C2 và biên tập viên từ điển (Duden, DWDS). Trong cuộc trò chuyện này bạn xây dựng KHO KIẾN THỨC cho ứng dụng học tiếng Đức A1 → C1 dành cho người Việt. Dữ liệu được nạp tự động vào ứng dụng, nên phải ĐÚNG TUYỆT ĐỐI và ĐÚNG ĐỊNH DẠNG JSON.

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
5. ĐỊNH DẠNG TRẢ LỜI: dòng đầu là nhãn  === <id> (phần x/y) ===  rồi đến JSON hợp lệ. Không viết gì khác. Không rút gọn ("…", "tương tự"). Nếu quá dài: chia phần, mỗi phần là JSON hoàn chỉnh cùng id (ứng dụng tự gộp).
6. Khi tôi gõ "tiếp": làm phần/mục tiếp theo của nhiệm vụ hiện tại, không hỏi lại. "làm lại <id>": soạn lại mục đó. "từ <id>": tiếp tục từ mục đó.
7. Soạn DỒI DÀO (gấp 1,5–2 lần mức tối thiểu); một biên tập viên sẽ chọn lọc. Độ chính xác luôn đặt trước số lượng.
8. Nội dung phải là SÁNG TÁC MỚI của bạn. Không chép nguyên văn sách, báo, đề thi chính thức (Goethe, telc, TestDaF) hay bất kỳ tài liệu có bản quyền nào – chỉ mô phỏng định dạng.

Nếu đã hiểu, chỉ trả lời: "Sẵn sàng – hãy giao nhiệm vụ."`;

/* ---------- K1: bộ từ vựng ---------- */
const DECKS = {
  A1: ['Ich und meine Familie', 'Wohnen und Möbel', 'Essen und Trinken', 'Einkaufen, Kleidung und Farben', 'Tagesablauf, Uhrzeit und Wochentage', 'Freizeit, Hobbys und Sport', 'Schule, Kurs und Arbeit', 'Stadt, Verkehr und Wege', 'Körper und Gesundheit', 'Reisen, Wetter, Monate und Jahreszeiten', 'Die 120 wichtigsten Verben A1', 'Adjektive, Adverbien und kleine Wörter A1'],
  A2: ['Persönliche Beziehungen und Gefühle', 'Wohnungssuche und Haushalt', 'Kochen, Restaurant und Lebensmittel', 'Mode und Aussehen', 'Beruf, Bewerbung und Arbeitsplatz', 'Medien, Telefon und Internet', 'Gesund leben und Arzt', 'Urlaub, Hotel und Bahn', 'Feste, Feiern und Geschenke', 'Natur, Tiere und Umwelt', 'Ämter, Bank und Post', 'Schule und Ausbildung', 'Verben mit Präpositionen A2', 'Adjektive und Gegensätze A2'],
  B1: ['Lebenslauf und Lebensstationen', 'Arbeitswelt und Kollegen', 'Bildung, Ausbildung und Studium', 'Konsum, Werbung und Reklamation', 'Gesundheitssystem und Ernährung', 'Kunst, Kultur und Medien', 'Technik und Digitalisierung', 'Familie, Partnerschaft und Generationen', 'Umwelt, Klima und Energie', 'Mobilität und Verkehr', 'Politik, Staat und Gesellschaft', 'Geld, Bank und Versicherungen', 'Verben mit Präpositionen B1', 'Konnektoren und Redemittel B1 (Meinung, Zustimmung, Widerspruch)'],
  B2: ['Glück, Werte und Lebensqualität', 'Arbeitswelt im Wandel', 'Wissenschaft und Forschung', 'Sprache und Kommunikation', 'Wirtschaft, Handel und Konsum', 'Psyche, Stress und Wohlbefinden', 'Medien und Journalismus', 'Nachhaltigkeit und Klimapolitik', 'Literatur, Kunst und Kritik', 'Migration, Integration und Identität', 'Recht, Justiz und Politik', 'Nomen-Verb-Verbindungen B2', 'Redemittel B2: Argumentieren, Diskutieren, Präsentieren', 'Verben, Nomen und Adjektive mit Präpositionen B2'],
  C1: ['Persönlichkeit und Psychologie', 'Wissenschaftssprache und akademisches Schreiben', 'Führung, Management und Unternehmenskultur', 'Demografie und sozialer Wandel', 'Globalisierung und Weltwirtschaft', 'Meinungsbildung, Öffentlichkeit und Medienethik', 'Technikethik, KI und Biotechnologie', 'Redewendungen und Sprichwörter C1', 'Funktionsverbgefüge und gehobene Kollokationen C1', 'Synonyme mit feinen Bedeutungsunterschieden C1', 'Register: umgangssprachlich – neutral – gehoben', 'Konnektoren und Textverknüpfung C1'],
};
const deckId = (lv, i) => `deck-${lv.toLowerCase()}-${String(i + 1).padStart(2, '0')}`;
const K1 = `NHIỆM VỤ: BỘ TỪ VỰNG (flashcard) theo trình độ, bao phủ toàn bộ Goethe-Wortliste A1–B1 và từ vựng B2–C1 thông dụng.
Làm lần lượt từng bộ trong danh sách dưới (mỗi câu trả lời 1 bộ). Mỗi bộ 70–100 mục (có thể chia phần), không trùng với các bộ trước, sắp theo mức độ thông dụng. Bộ ghi "Redewendungen/Redemittel/Kollokationen" thì "pos": "phrase" và giải thích nghĩa bóng + ngữ cảnh dùng trong "vi".

Cấu trúc JSON mỗi bộ:
{ "type": "deck", "id": "<id>", "level": "<A1…C1>", "title": "<tên bộ tiếng Đức> – <tên tiếng Việt>", "cards": [ <mục từ vựng theo quy tắc 2> ] }

DANH SÁCH (id | trình độ | chủ đề):
${Object.entries(DECKS).map(([lv, ts]) => ts.map((t, i) => `${deckId(lv, i)} | ${lv} | ${t}`).join('\n')).join('\n')}

Bắt đầu với ${deckId('A1', 0)}.`;

/* ---------- K2: cẩm nang ngữ pháp ---------- */
const GR = {
  A1: ['Präsens: regelmäßige Verben & Personalpronomen', 'sein, haben, werden im Präsens', 'Satzbau: Verb an Position 2, W-Fragen, Ja/Nein-Fragen', 'Bestimmter & unbestimmter Artikel, Genus', 'Pluralbildung der Nomen', 'Negation: nicht und kein', 'Akkusativ: Artikel & Nomen', 'Possessivartikel (Nominativ & Akkusativ)', 'Modalverben: können, wollen, müssen, dürfen, sollen, möchten', 'Trennbare & untrennbare Verben', 'Imperativ (du, ihr, Sie)', 'Temporale Präpositionen: am, um, im, von … bis', 'Personalpronomen im Akkusativ', 'Konjunktionen: und, aber, oder, denn, sondern', 'Perfekt: Grundlagen', 'Zahlen, Uhrzeit, Datum'],
  A2: ['Perfekt: haben oder sein, Partizip II vollständig', 'Präteritum von sein, haben & Modalverben', 'Dativ: Artikel, Nomen, Personalpronomen', 'Verben mit Dativ & mit Dativ + Akkusativ', 'Wechselpräpositionen (Wo? / Wohin?)', 'Lokale Präpositionen: in, an, auf, zu, nach, aus, von, bei', 'Nebensätze mit weil, dass, wenn, ob', 'Indirekte Fragen', 'Adjektivdeklination (bestimmter, unbestimmter, Nullartikel)', 'Komparativ & Superlativ', 'Reflexive Verben', 'Verben mit Präpositionen, wo(r)- & da(r)-', 'Konjunktiv II: Höflichkeit & Ratschläge (würde, hätte, wäre, könnte)', 'Relativsätze im Nominativ & Akkusativ', 'als oder wenn?', 'Konjunktionaladverbien: deshalb, trotzdem, dann, danach'],
  B1: ['Präteritum aller Verben', 'Plusquamperfekt', 'Relativsätze: alle Kasus, mit Präposition, wo/was', 'Infinitiv mit zu', 'Finalsätze: um … zu / damit', 'Passiv: Präsens, Präteritum, Perfekt, mit Modalverben', 'Konjunktiv II der Vergangenheit, irreale Bedingungen & Wünsche', 'Genitiv & Präpositionen mit Genitiv', 'Futur I & Vermutungen', 'n-Deklination', 'Zweiteilige Konnektoren', 'Temporale Nebensätze: während, bevor, nachdem, seitdem, bis, sobald', 'Partizip I & II als Adjektiv', 'Konzessiv: obwohl, trotzdem, trotz', 'Wortstellung im Mittelfeld (TeKaMoLo, Dativ vor Akkusativ)', 'Verben mit festen Präpositionen (B1-Liste)'],
  B2: ['Nomen-Verb-Verbindungen', 'Passiversatzformen: sich lassen, -bar, sein + zu, man', 'Zustandspassiv vs. Vorgangspassiv', 'Nominalisierung & Verbalisierung', 'Konjunktiv I & indirekte Rede', 'Erweiterte Partizipialattribute', 'Subjektive Bedeutung der Modalverben', 'Adversative & konzessive Konnektoren', 'Konditionalsätze: falls, sofern, vorausgesetzt dass, uneingeleitete Bedingungssätze', 'Irreale Vergleichssätze: als ob, als wenn, als', 'Modalpartikeln', 'Präpositionen mit Genitiv (gehoben)', 'Funktionsverbgefüge', 'Kausale & konsekutive Satzverbindungen'],
  C1: ['Wortbildung: Präfixe, Suffixe, Komposita', 'Nominalstil vs. Verbalstil', 'Redewiedergabe & redeeinleitende Verben', 'Partizipialkonstruktionen & satzwertige Partizipien', 'Gerundivum (zu + Partizip I)', 'Modalsätze: indem, dadurch dass, ohne dass, anstatt dass', 'Konsekutivsätze: sodass, so … dass, zu …, als dass', 'Erweiterte Konzessivsätze: wenngleich, zumal, wie … auch immer', 'Textkohärenz: Konnektoren, Pronominalisierung, Thema-Rhema', 'Register & Stilebenen', 'Korrelate: es, da(r)- + Nebensatz', 'Negation: Feinheiten & Stellung von nicht', 'Idiomatik & feste Wendungen'],
};
const grId = (lv, i) => `gr-${lv.toLowerCase()}-${String(i + 1).padStart(2, '0')}`;
const K2 = `NHIỆM VỤ: CẨM NANG NGỮ PHÁP A1 → C1 (tra cứu + luyện tập), viết cho người Việt.
Làm lần lượt từng chủ điểm dưới đây, mỗi câu trả lời 1 chủ điểm.

Yêu cầu nội dung "body" (Markdown tiếng Việt, ví dụ trong {{ }}):
## Tổng quan (dùng khi nào, ý nghĩa) · ## Cấu tạo / quy tắc (bảng biến cách/chia ĐẦY ĐỦ) · ## Ví dụ (≥ 12 câu tự nhiên kèm dịch) · ## Ngoại lệ & lưu ý · ## So sánh (với cấu trúc dễ nhầm, với tiếng Việt/Anh) · ## Mẹo ghi nhớ.
"mistakes": ≥ 5 lỗi người Việt hay mắc (ghi câu sai ✗ → câu đúng ✓ + lý do). "exercises": ≥ 15 bài, đủ các loại mcq, gap, order, translate, listen, speak, match. "related": id các chủ điểm liên quan trong danh sách.

Cấu trúc JSON:
{ "type": "grammar", "id": "<id>", "level": "<A1…C1>", "order": <số thứ tự trong trình độ>, "topic": "<nhóm: Verben | Nomen & Artikel | Satzbau | Präpositionen | Adjektive | Konnektoren | Passiv | Konjunktiv | Wortbildung | Stil>", "title": "<tên tiếng Đức>", "titleVi": "<tên tiếng Việt>", "body": "…", "mistakes": ["…"], "related": ["gr-…"], "exercises": [ … ] }

DANH SÁCH (id | trình độ | chủ điểm):
${Object.entries(GR).map(([lv, ts]) => ts.map((t, i) => `${grId(lv, i)} | ${lv} | ${t}`).join('\n')).join('\n')}

Bắt đầu với ${grId('A1', 0)}.`;

/* ---------- K3: động từ ---------- */
const K3 = `NHIỆM VỤ: CƠ SỞ DỮ LIỆU ĐỘNG TỪ – 500 động từ tiếng Đức thông dụng nhất (A1 → C1), chia đầy đủ.
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

Bắt đầu với verbs-01.`;

/* ---------- K4: thư viện bài đọc ---------- */
const RD = { A1: [12, '80–150 từ', 'tin nhắn, email, thông báo, quảng cáo, thực đơn, mô tả người/nhà'], A2: [12, '150–250 từ', 'email, blog, bài báo ngắn, thông báo, truyện ngắn đơn giản'], B1: [12, '250–400 từ', 'bài báo, bài forum, phỏng vấn, truyện, văn bản thông tin'], B2: [12, '400–600 từ', 'bài báo, bình luận, văn bản khoa học phổ thông, truyện ngắn'], C1: [12, '600–900 từ', 'bài luận, văn bản học thuật, xã luận, phân tích, văn học'] };
const K4 = `NHIỆM VỤ: THƯ VIỆN BÀI ĐỌC phân cấp (đọc hiểu + nghe, vì ứng dụng đọc to từng câu).
Làm lần lượt: ${Object.entries(RD).map(([lv, [n]]) => `rd-${lv.toLowerCase()}-01 … rd-${lv.toLowerCase()}-${String(n).padStart(2, '0')}`).join(', ')}. Mỗi câu trả lời 2 bài (A1–B1) hoặc 1 bài (B2–C1).

Theo trình độ:
${Object.entries(RD).map(([lv, [n, len, g]]) => `- ${lv}: ${n} bài, mỗi bài ${len}; thể loại: ${g}.`).join('\n')}
Chủ đề đa dạng, gắn với cuộc sống ở Đức/Áo/Thuỵ Sĩ, cập nhật hiện nay; một vài bài liên hệ Việt Nam. Văn phong tự nhiên, mỗi bài một giọng văn khác.

Cấu trúc:
{ "type": "reading", "id": "rd-b1-01", "level": "B1", "genre": "Zeitungsartikel", "title": "<tiêu đề Đức>", "titleVi": "<tiêu đề Việt>",
  "text": "<văn bản; đoạn cách nhau bằng \\n\\n>", "vi": "<bản dịch tiếng Việt đầy đủ>",
  "glossary": [ <10–25 mục từ vựng khó theo quy tắc 2> ],
  "questions": [ { "q": "<câu hỏi>", "options": ["…", "…", "…"], "answer": <chỉ số> } ] }
Câu hỏi: 5–8 câu, kiểu Goethe (richtig/falsch, a/b/c, ý chính, suy luận); chỉ 1 đáp án đúng.

Bắt đầu với rd-a1-01 và rd-a1-02.`;

/* ---------- K5: đề thi thử ---------- */
const K5 = `NHIỆM VỤ: ĐỀ THI THỬ mô phỏng định dạng Goethe-Zertifikat (SÁNG TÁC MỚI hoàn toàn, không chép đề chính thức).
Làm lần lượt: ex-a1-1, ex-a1-2, ex-a2-1, ex-a2-2, ex-b1-1, ex-b1-2, ex-b2-1, ex-b2-2, ex-c1-1, ex-c1-2. Mỗi đề có thể chia nhiều phần trả lời (phần 1/3: Lesen, 2/3: Hören, 3/3: Schreiben + Sprechen).

Cấu trúc:
{ "type": "exam", "id": "ex-b1-1", "level": "B1", "title": "Modelltest B1 – Satz 1", "minutes": 190, "intro": "<giới thiệu cấu trúc đề, thang điểm, mẹo làm bài – tiếng Việt>",
  "sections": [
    { "title": "Lesen – Teil 1", "skill": "lesen", "instructions": "<hướng dẫn bằng tiếng Đức + dịch Việt>", "text": "<văn bản đọc>", "exercises": [ <mcq / gap … với "explain" tiếng Việt> ] },
    { "title": "Hören – Teil 1", "skill": "hoeren", "instructions": "…", "audio": "<KỊCH BẢN bài nghe – ứng dụng sẽ đọc to, KHÔNG hiển thị>", "exercises": [ { "type": "mcq", …, "audio": "<kịch bản riêng cho câu này nếu mỗi câu một đoạn nghe>" } ] },
    { "title": "Schreiben – Teil 1", "skill": "schreiben", "task": "<đề bài đầy đủ>", "minWords": 80, "sample": "<bài mẫu đạt điểm cao>" },
    { "title": "Sprechen – Teil 1", "skill": "sprechen", "task": "<đề nói + gợi ý>", "sample": "<bài nói mẫu>" } ] }

Yêu cầu: số phần (Teil), số câu, độ dài văn bản và thời gian sát với cấu trúc thật của từng trình độ (Goethe A1 Start Deutsch 1, A2, B1, B2, C1 bản hiện hành). Kịch bản nghe tự nhiên (hội thoại, thông báo, phỏng vấn, radio). Mọi câu hỏi có đúng 1 đáp án và có "explain" chỉ ra chỗ trong văn bản/bài nghe chứa đáp án.

Bắt đầu với ex-a1-1.`;

const md = `# Prompt KHO KIẾN THỨC – DeutschWeg

Đây là đợt việc thứ 2 cho ChatGPT (Sol 6.2) và Gemini (Argon 4): xây kho kiến thức khổng lồ ngoài giáo trình chính. Web đã có sẵn trang cho từng loại: **Từ vựng → Bộ từ vựng**, **Ngữ pháp**, **Chia động từ**, **Thư viện đọc**, **Thi thử**.

## Cách làm
- Mỗi nhiệm vụ (K1…K5) làm trong **một cuộc trò chuyện riêng**, ở **cả hai AI** (để Claude so sánh và chọn).
- Mở cuộc trò chuyện mới → dán **K0** → dán **một** nhiệm vụ K1…K5 → sau đó chỉ gõ **\`tiếp\`**.
- Có thể chạy song song nhiều cuộc trò chuyện (vd. một tab làm K1, tab khác làm K2) để nhanh hơn.
- Gửi kết quả cho Claude ghi rõ của ai: \`deck-a1-01 – ChatGPT:\` … \`deck-a1-01 – Gemini:\` … (dán hoặc đính kèm file).
- Khi AI bắt đầu làm sơ sài: cuộc trò chuyện mới → K0 → nhiệm vụ → \`từ <id kế tiếp>\`.

| Nhiệm vụ | Nội dung | Khối lượng |
|---|---|---|
| K1 | Bộ từ vựng theo chủ đề A1→C1 | ${Object.values(DECKS).flat().length} bộ × 70–100 từ |
| K2 | Cẩm nang ngữ pháp | ${Object.values(GR).flat().length} chủ điểm, mỗi chủ điểm ≥ 15 bài tập |
| K3 | Cơ sở dữ liệu động từ | 500 động từ, 20 gói |
| K4 | Thư viện bài đọc | ${Object.values(RD).reduce((a, [n]) => a + n, 0)} bài có dịch, từ khó, câu hỏi |
| K5 | Đề thi thử kiểu Goethe | 10 đề (2 đề/trình độ) |

Thứ tự ưu tiên nếu bạn bận: **K3 → K2 → K1 → K4 → K5**.

---

## K0 – THIẾT LẬP KHO (dán đầu mỗi cuộc trò chuyện)
${fence(K0)}

---

## K1 – BỘ TỪ VỰNG
${fence(K1)}

---

## K2 – CẨM NANG NGỮ PHÁP
${fence(K2)}

---

## K3 – CƠ SỞ DỮ LIỆU ĐỘNG TỪ
${fence(K3)}

---

## K4 – THƯ VIỆN BÀI ĐỌC
${fence(K4)}

---

## K5 – ĐỀ THI THỬ
${fence(K5)}
`;
module.exports = { K0, K1, K2, K3, K4, K5, DECKS, GR, RD, deckId, grId };
if (require.main === module) {
  fs.writeFileSync(path.join(__dirname, '..', 'PROMPTS-KHO.md'), md);
  console.log('PROMPTS-KHO.md:', md.length, 'ký tự ·', Object.values(DECKS).flat().length, 'bộ từ ·', Object.values(GR).flat().length, 'chủ điểm ngữ pháp');
}
