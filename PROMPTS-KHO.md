# Prompt KHO KIẾN THỨC – DeutschWeg

Đây là đợt việc thứ 2 cho ChatGPT (Sol 6.2) và Gemini (Argon 4): xây kho kiến thức khổng lồ ngoài giáo trình chính. Web đã có sẵn trang cho từng loại: **Từ vựng → Bộ từ vựng**, **Ngữ pháp**, **Chia động từ**, **Thư viện đọc**, **Thi thử**.

## Cách làm
- Mỗi nhiệm vụ (K1…K5) làm trong **một cuộc trò chuyện riêng**, ở **cả hai AI** (để Claude so sánh và chọn).
- Mở cuộc trò chuyện mới → dán **K0** → dán **một** nhiệm vụ K1…K5 → sau đó chỉ gõ **`tiếp`**.
- Có thể chạy song song nhiều cuộc trò chuyện (vd. một tab làm K1, tab khác làm K2) để nhanh hơn.
- Gửi kết quả cho Claude ghi rõ của ai: `deck-a1-01 – ChatGPT:` … `deck-a1-01 – Gemini:` … (dán hoặc đính kèm file).
- Khi AI bắt đầu làm sơ sài: cuộc trò chuyện mới → K0 → nhiệm vụ → `từ <id kế tiếp>`.

| Nhiệm vụ | Nội dung | Khối lượng |
|---|---|---|
| K1 | Bộ từ vựng theo chủ đề A1→C1 | 66 bộ × 70–100 từ |
| K2 | Cẩm nang ngữ pháp | 75 chủ điểm, mỗi chủ điểm ≥ 15 bài tập |
| K3 | Cơ sở dữ liệu động từ | 500 động từ, 20 gói |
| K4 | Thư viện bài đọc | 60 bài có dịch, từ khó, câu hỏi |
| K5 | Đề thi thử kiểu Goethe | 10 đề (2 đề/trình độ) |

Thứ tự ưu tiên nếu bạn bận: **K3 → K2 → K1 → K4 → K5**.

---

## K0 – THIẾT LẬP KHO (dán đầu mỗi cuộc trò chuyện)
````text
Bạn là nhóm biên soạn giáo trình tiếng Đức gồm: giáo viên DaF bản ngữ 20 năm kinh nghiệm dạy người Việt, chuyên gia ngữ âm (Duden – Das Aussprachewörterbuch), giám khảo Goethe-Zertifikat A1–C2 và biên tập viên từ điển (Duden, DWDS). Trong cuộc trò chuyện này bạn xây dựng KHO KIẾN THỨC cho ứng dụng học tiếng Đức A1 → C1 dành cho người Việt. Dữ liệu được nạp tự động vào ứng dụng, nên phải ĐÚNG TUYỆT ĐỐI và ĐÚNG ĐỊNH DẠNG JSON.

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

Nếu đã hiểu, chỉ trả lời: "Sẵn sàng – hãy giao nhiệm vụ."
````

---

## K1 – BỘ TỪ VỰNG
````text
NHIỆM VỤ: BỘ TỪ VỰNG (flashcard) theo trình độ, bao phủ toàn bộ Goethe-Wortliste A1–B1 và từ vựng B2–C1 thông dụng.
Làm lần lượt từng bộ trong danh sách dưới (mỗi câu trả lời 1 bộ). Mỗi bộ 70–100 mục (có thể chia phần), không trùng với các bộ trước, sắp theo mức độ thông dụng. Bộ ghi "Redewendungen/Redemittel/Kollokationen" thì "pos": "phrase" và giải thích nghĩa bóng + ngữ cảnh dùng trong "vi".

Cấu trúc JSON mỗi bộ:
{ "type": "deck", "id": "<id>", "level": "<A1…C1>", "title": "<tên bộ tiếng Đức> – <tên tiếng Việt>", "cards": [ <mục từ vựng theo quy tắc 2> ] }

DANH SÁCH (id | trình độ | chủ đề):
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

Bắt đầu với deck-a1-01.
````

---

## K2 – CẨM NANG NGỮ PHÁP
````text
NHIỆM VỤ: CẨM NANG NGỮ PHÁP A1 → C1 (tra cứu + luyện tập), viết cho người Việt.
Làm lần lượt từng chủ điểm dưới đây, mỗi câu trả lời 1 chủ điểm.

Yêu cầu nội dung "body" (Markdown tiếng Việt, ví dụ trong {{ }}):
## Tổng quan (dùng khi nào, ý nghĩa) · ## Cấu tạo / quy tắc (bảng biến cách/chia ĐẦY ĐỦ) · ## Ví dụ (≥ 12 câu tự nhiên kèm dịch) · ## Ngoại lệ & lưu ý · ## So sánh (với cấu trúc dễ nhầm, với tiếng Việt/Anh) · ## Mẹo ghi nhớ.
"mistakes": ≥ 5 lỗi người Việt hay mắc (ghi câu sai ✗ → câu đúng ✓ + lý do). "exercises": ≥ 15 bài, đủ các loại mcq, gap, order, translate, listen, speak, match. "related": id các chủ điểm liên quan trong danh sách.

Cấu trúc JSON:
{ "type": "grammar", "id": "<id>", "level": "<A1…C1>", "order": <số thứ tự trong trình độ>, "topic": "<nhóm: Verben | Nomen & Artikel | Satzbau | Präpositionen | Adjektive | Konnektoren | Passiv | Konjunktiv | Wortbildung | Stil>", "title": "<tên tiếng Đức>", "titleVi": "<tên tiếng Việt>", "body": "…", "mistakes": ["…"], "related": ["gr-…"], "exercises": [ … ] }

DANH SÁCH (id | trình độ | chủ điểm):
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

Bắt đầu với gr-a1-01.
````

---

## K3 – CƠ SỞ DỮ LIỆU ĐỘNG TỪ
````text
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

Bắt đầu với verbs-01.
````

---

## K4 – THƯ VIỆN BÀI ĐỌC
````text
NHIỆM VỤ: THƯ VIỆN BÀI ĐỌC phân cấp (đọc hiểu + nghe, vì ứng dụng đọc to từng câu).
Làm lần lượt: rd-a1-01 … rd-a1-12, rd-a2-01 … rd-a2-12, rd-b1-01 … rd-b1-12, rd-b2-01 … rd-b2-12, rd-c1-01 … rd-c1-12. Mỗi câu trả lời 2 bài (A1–B1) hoặc 1 bài (B2–C1).

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

Bắt đầu với rd-a1-01 và rd-a1-02.
````

---

## K5 – ĐỀ THI THỬ
````text
NHIỆM VỤ: ĐỀ THI THỬ mô phỏng định dạng Goethe-Zertifikat (SÁNG TÁC MỚI hoàn toàn, không chép đề chính thức).
Làm lần lượt: ex-a1-1, ex-a1-2, ex-a2-1, ex-a2-2, ex-b1-1, ex-b1-2, ex-b2-1, ex-b2-2, ex-c1-1, ex-c1-2. Mỗi đề có thể chia nhiều phần trả lời (phần 1/3: Lesen, 2/3: Hören, 3/3: Schreiben + Sprechen).

Cấu trúc:
{ "type": "exam", "id": "ex-b1-1", "level": "B1", "title": "Modelltest B1 – Satz 1", "minutes": 190, "intro": "<giới thiệu cấu trúc đề, thang điểm, mẹo làm bài – tiếng Việt>",
  "sections": [
    { "title": "Lesen – Teil 1", "skill": "lesen", "instructions": "<hướng dẫn bằng tiếng Đức + dịch Việt>", "text": "<văn bản đọc>", "exercises": [ <mcq / gap … với "explain" tiếng Việt> ] },
    { "title": "Hören – Teil 1", "skill": "hoeren", "instructions": "…", "audio": "<KỊCH BẢN bài nghe – ứng dụng sẽ đọc to, KHÔNG hiển thị>", "exercises": [ { "type": "mcq", …, "audio": "<kịch bản riêng cho câu này nếu mỗi câu một đoạn nghe>" } ] },
    { "title": "Schreiben – Teil 1", "skill": "schreiben", "task": "<đề bài đầy đủ>", "minWords": 80, "sample": "<bài mẫu đạt điểm cao>" },
    { "title": "Sprechen – Teil 1", "skill": "sprechen", "task": "<đề nói + gợi ý>", "sample": "<bài nói mẫu>" } ] }

Yêu cầu: số phần (Teil), số câu, độ dài văn bản và thời gian sát với cấu trúc thật của từng trình độ (Goethe A1 Start Deutsch 1, A2, B1, B2, C1 bản hiện hành). Kịch bản nghe tự nhiên (hội thoại, thông báo, phỏng vấn, radio). Mọi câu hỏi có đúng 1 đáp án và có "explain" chỉ ra chỗ trong văn bản/bài nghe chứa đáp án.

Bắt đầu với ex-a1-1.
````
