/* Khung chương trình A1 → C1 (bám theo CEFR & Goethe-Zertifikat). Nội dung chi tiết từng unit
   được tạo bằng prompt (ChatGPT/Gemini) rồi nhập vào trang "Nội dung & Prompt". */
const CURRICULUM = (() => {
  const L = {
    A1: { name: 'A1 – Mới bắt đầu', desc: 'Giới thiệu bản thân, câu đơn giản, giao tiếp cơ bản hằng ngày.', lessons: 3 },
    A2: { name: 'A2 – Sơ cấp', desc: 'Kể chuyện quá khứ, mô tả, giao tiếp trong tình huống quen thuộc.', lessons: 3 },
    B1: { name: 'B1 – Trung cấp', desc: 'Tự lập trong cuộc sống ở Đức, bày tỏ ý kiến, viết thư/email.', lessons: 3 },
    B2: { name: 'B2 – Trung cao cấp', desc: 'Thảo luận chuyên sâu, đọc báo, văn bản trừu tượng, lập luận.', lessons: 3 },
    C1: { name: 'C1 – Cao cấp', desc: 'Dùng tiếng Đức linh hoạt trong học thuật & công việc, văn phong tinh tế.', lessons: 4 },
  };
  // [Tiêu đề tiếng Đức, Tiêu đề tiếng Việt, Chủ đề/tình huống, Trọng tâm ngữ pháp]
  const U = {
    A1: [
      ['Hallo! Ich bin …', 'Chào hỏi & giới thiệu', 'chào hỏi, tạm biệt, tên, quê quán, nơi ở, ngôn ngữ, bảng chữ cái, đánh vần, số 0–20', 'đại từ nhân xưng; chia sein, heißen, kommen, wohnen, sprechen; câu hỏi W-Fragen; vị trí động từ số 2'],
      ['Familie und Freunde', 'Gia đình & bạn bè', 'thành viên gia đình, tuổi, nghề nghiệp đơn giản, tình trạng hôn nhân, số 20–100', 'haben; mạo từ sở hữu mein/dein/sein/ihr (Nominativ); câu hỏi Ja/Nein'],
      ['Essen und Trinken', 'Ăn uống & đi chợ', 'đồ ăn, đồ uống, đi siêu thị, giá cả, đơn vị (Kilo, Gramm, Flasche), ở quán cà phê', 'mạo từ xác định/không xác định (der/die/das, ein/eine); Akkusativ (einen, keinen); kein vs. nicht; möchten, mögen'],
      ['Meine Wohnung', 'Nhà ở', 'phòng, đồ đạc, mô tả căn hộ, màu sắc, quảng cáo thuê nhà', 'số nhiều của danh từ; tính từ làm vị ngữ (Die Wohnung ist groß); phủ định nicht/kein; es gibt'],
      ['Mein Alltag', 'Một ngày của tôi', 'thói quen hằng ngày, giờ giấc (chính thức & thân mật), ngày trong tuần, buổi trong ngày', 'động từ tách (aufstehen, einkaufen, anrufen); giới từ thời gian am/um/von…bis; đảo ngữ khi trạng từ đứng đầu'],
      ['Freizeit und Hobbys', 'Thời gian rảnh & sở thích', 'sở thích, thể thao, hẹn gặp, đồng ý/từ chối lời mời, mùa', 'gern/lieber/am liebsten; động từ khuyết thiếu können, wollen; đại từ nhân xưng Akkusativ (mich, dich …)'],
      ['Lernen und Arbeiten', 'Học tập & công việc', 'nghề nghiệp, nơi làm việc, đồ dùng văn phòng, khóa học, lịch hẹn', 'müssen, dürfen; mạo từ sở hữu Akkusativ; giới từ bei, in, für'],
      ['In der Stadt', 'Trong thành phố', 'địa điểm, phương tiện giao thông, hỏi và chỉ đường', 'giới từ + Dativ (mit, zu, bei, nach, von, aus); in/an/auf + Dativ (Wo?); câu mệnh lệnh (Imperativ)'],
      ['Gesundheit', 'Sức khỏe', 'bộ phận cơ thể, bệnh thường gặp, đi khám bác sĩ, hẹn lịch', 'Imperativ (du/ihr/Sie); sollen; mạo từ sở hữu (tổng hợp)'],
      ['Kleidung und Einkaufen', 'Quần áo & mua sắm', 'quần áo, kích cỡ, màu sắc, hỏi giá, khen/chê, đổi hàng', 'welcher/dieser; tính từ đơn giản (Das Hemd ist zu groß); so … wie / so viel'],
      ['Reisen und Verkehr', 'Du lịch & đi lại', 'kỳ nghỉ, vé tàu, khách sạn, kể lại chuyến đi đơn giản', 'Perfekt với haben và sein; Partizip II (gemacht, gefahren …)'],
      ['Feste und Wetter', 'Lễ hội & thời tiết', 'thời tiết, các tháng, ngày tháng, sinh nhật, lễ hội ở Đức', 'số thứ tự & ngày tháng (am ersten Mai); Präteritum của sein & haben (war, hatte)'],
    ],
    A2: [
      ['Kindheit und Erinnerungen', 'Tuổi thơ & kỷ niệm', 'kể về tuổi thơ, trường học xưa, kỷ niệm gia đình', 'ôn Perfekt; Präteritum của động từ khuyết thiếu (konnte, musste, wollte, durfte)'],
      ['Beruf und Bewerbung', 'Nghề nghiệp & xin việc', 'mô tả công việc, quảng cáo tuyển dụng, CV, gọi điện hỏi việc', 'mệnh đề phụ với weil và dass; động từ đứng cuối câu phụ'],
      ['Wohnungssuche und Umzug', 'Tìm nhà & chuyển nhà', 'tìm nhà, hợp đồng thuê, chuyển nhà, sắp xếp đồ đạc, hàng xóm', 'giới từ hai cách (Wechselpräpositionen); stellen/stehen, legen/liegen, hängen'],
      ['Essen gehen und Kochen', 'Nấu ăn & đi nhà hàng', 'công thức nấu ăn, gọi món, phàn nàn ở nhà hàng, ẩm thực Đức – Việt', 'đuôi tính từ sau mạo từ xác định (der gute Wein); câu mệnh lệnh trong công thức'],
      ['Mode und Aussehen', 'Thời trang & ngoại hình', 'miêu tả ngoại hình, tính cách, thời trang, mua sắm online', 'đuôi tính từ sau mạo từ không xác định; so sánh hơn & so sánh nhất'],
      ['Medien und Kommunikation', 'Truyền thông & giao tiếp', 'điện thoại, mạng xã hội, email, internet', 'mệnh đề với wenn và ob; câu hỏi gián tiếp (Können Sie mir sagen, wo …?)'],
      ['Gesund leben', 'Sống khỏe', 'thể thao, dinh dưỡng, thói quen tốt/xấu, lời khuyên', 'động từ phản thân (sich freuen, sich waschen); đại từ phản thân Akkusativ & Dativ'],
      ['Urlaub und Reisen', 'Kỳ nghỉ & du lịch', 'lên kế hoạch du lịch, đặt phòng, phàn nàn, viết bưu thiếp', 'giới từ chỉ nơi chốn & hướng (nach/in/zu/an/auf; aus/von); Wohin? Wo? Woher?'],
      ['Feste und Geschenke', 'Lễ hội & quà tặng', 'lễ hội, mời & cảm ơn, tặng quà, chúc mừng', 'động từ với Dativ & Akkusativ (jemandem etwas schenken); đại từ Dativ; vị trí tân ngữ'],
      ['Natur und Umwelt', 'Thiên nhiên & môi trường', 'thời tiết khắc nghiệt, phân loại rác, bảo vệ môi trường, động vật', 'Konjunktiv II: würde, hätte, wäre, könnte (lời khuyên, ước muốn lịch sự)'],
      ['Ämter und Dienstleistungen', 'Cơ quan & dịch vụ', 'đăng ký cư trú, ngân hàng, bưu điện, điền đơn, trình báo', 'động từ đi với giới từ (warten auf, sich kümmern um); wo(r)- / da(r)-; deshalb, trotzdem'],
      ['Gefühle und Beziehungen', 'Cảm xúc & các mối quan hệ', 'cảm xúc, tình bạn, tình yêu, giải quyết mâu thuẫn', 'mệnh đề quan hệ (Nominativ & Akkusativ); als/wenn (quá khứ)'],
    ],
    B1: [
      ['Lebensstationen', 'Những chặng đường đời', 'tiểu sử, những bước ngoặt cuộc đời, di cư', 'Präteritum (động từ mạnh/yếu/hỗn hợp); Plusquamperfekt; nachdem'],
      ['Arbeitswelt', 'Thế giới công việc', 'phỏng vấn xin việc, đồng nghiệp, cân bằng công việc – cuộc sống, email công việc', 'mệnh đề quan hệ mọi cách (kể cả Dativ, Genitiv, có giới từ); Relativpronomen wo/was'],
      ['Schule und Weiterbildung', 'Giáo dục & học tập', 'hệ thống giáo dục Đức, học nghề (Ausbildung), đại học, học suốt đời', 'Infinitiv mit zu; um … zu / damit; ohne … zu, statt … zu'],
      ['Konsum und Werbung', 'Tiêu dùng & quảng cáo', 'mua sắm, quảng cáo, khiếu nại, quyền lợi người tiêu dùng', 'Passiv (Präsens, Präteritum, Perfekt, với động từ khuyết thiếu)'],
      ['Gesundheit und Ernährung', 'Sức khỏe & dinh dưỡng', 'thói quen ăn uống, hệ thống y tế, bảo hiểm, phòng bệnh', 'Konjunktiv II quá khứ (hätte … gemacht, wäre … gegangen); câu điều kiện không có thật; irreale Wünsche'],
      ['Kunst und Kultur', 'Nghệ thuật & văn hóa', 'âm nhạc, phim, bảo tàng, văn hóa vùng miền nước Đức', 'Genitiv; giới từ đi với Genitiv (wegen, trotz, während, statt, innerhalb)'],
      ['Medien und Technik', 'Truyền thông & công nghệ', 'điện thoại thông minh, AI, tin tức, an toàn mạng', 'Futur I; phỏng đoán (werden + wohl); n-Deklination'],
      ['Miteinander leben', 'Chung sống', 'gia đình hiện đại, hàng xóm, hôn nhân, các thế hệ', 'liên từ hai vế: sowohl … als auch, weder … noch, entweder … oder, zwar … aber, nicht nur … sondern auch, je … desto'],
      ['Umwelt und Zukunft', 'Môi trường & tương lai', 'biến đổi khí hậu, năng lượng, đô thị tương lai, lối sống bền vững', 'mệnh đề thời gian: während, bevor, seitdem, bis, sobald, solange'],
      ['Reisen und Mobilität', 'Du lịch & di chuyển', 'phương tiện, du lịch bền vững, sự cố trên đường, báo cáo du lịch', 'đuôi tính từ không mạo từ; Partizip I & II làm tính từ'],
      ['Politik und Gesellschaft', 'Chính trị & xã hội', 'nhà nước Đức, bầu cử, tình nguyện, hội nhập', 'động từ/tính từ/danh từ đi với giới từ; trotzdem/obwohl; Konnektoren nâng cao'],
      ['Prüfungstraining B1', 'Luyện thi B1', 'mô phỏng Goethe-Zertifikat B1: Lesen, Hören, Schreiben (E-Mail, Forumsbeitrag), Sprechen (gemeinsam etwas planen, Präsentation)', 'tổng ôn ngữ pháp B1; Redemittel trình bày ý kiến'],
    ],
    B2: [
      ['Glück und Lebensqualität', 'Hạnh phúc & chất lượng sống', 'hạnh phúc, giá trị sống, tâm lý tích cực', 'Nomen-Verb-Verbindungen (in Frage kommen, eine Entscheidung treffen …)'],
      ['Arbeitswelt im Wandel', 'Thế giới việc làm thay đổi', 'làm việc từ xa, tự động hóa, khởi nghiệp, thương lượng lương', 'thay thế bị động: sich lassen, -bar/-lich, sein + zu, man; Zustandspassiv'],
      ['Wissenschaft und Forschung', 'Khoa học & nghiên cứu', 'phát minh, nghiên cứu, đạo đức khoa học, thống kê & biểu đồ', 'danh từ hóa & động từ hóa (Nominalisierung/Verbalisierung); mô tả biểu đồ'],
      ['Sprache und Kommunikation', 'Ngôn ngữ & giao tiếp', 'đa ngôn ngữ, phương ngữ, giao tiếp liên văn hóa, ngôn ngữ cơ thể', 'Konjunktiv I – câu tường thuật gián tiếp (indirekte Rede)'],
      ['Wirtschaft und Konsum', 'Kinh tế & tiêu dùng', 'kinh tế chia sẻ, thương mại điện tử, tiêu dùng có trách nhiệm', 'Partizipialattribute mở rộng (die von vielen Kunden gekauften Produkte)'],
      ['Körper und Psyche', 'Thể chất & tinh thần', 'stress, burnout, giấc ngủ, sức khỏe tinh thần', 'động từ khuyết thiếu chủ quan (soll, will, muss, dürfte, kann – phỏng đoán/tin đồn)'],
      ['Medienwelt', 'Thế giới truyền thông', 'tin giả, báo chí, mạng xã hội, quảng cáo ẩn', 'liên từ nhượng bộ & đối lập: obwohl, trotzdem, dennoch, während, wohingegen, allerdings'],
      ['Umwelt und Nachhaltigkeit', 'Môi trường & phát triển bền vững', 'tiêu dùng bền vững, chính sách khí hậu, tranh luận', 'câu điều kiện: falls, sofern, vorausgesetzt dass; als ob/als wenn (irreale Vergleiche)'],
      ['Literatur und Kunst', 'Văn học & nghệ thuật', 'tác giả Đức, phân tích truyện ngắn, phê bình nghệ thuật', 'giới từ đi với Genitiv nâng cao (aufgrund, infolge, angesichts, hinsichtlich, mithilfe)'],
      ['Migration und Gesellschaft', 'Di cư & xã hội', 'hội nhập, bản sắc, đa văn hóa, chính sách nhập cư', 'Modalpartikeln (doch, ja, mal, eben, halt, eigentlich, wohl)'],
      ['Recht und Politik', 'Pháp luật & chính trị', 'quyền công dân, hệ thống pháp luật, tranh luận chính trị', 'Funktionsverbgefüge; Passiv mit Modalverben im Perfekt; Passiversatz'],
      ['Prüfungstraining B2', 'Luyện thi B2', 'mô phỏng Goethe-Zertifikat B2: Lesen, Hören, Schreiben (Forumsbeitrag, formelle Nachricht), Sprechen (Vortrag, Diskussion)', 'tổng ôn ngữ pháp B2; Redemittel lập luận & thảo luận'],
    ],
    C1: [
      ['Persönlichkeit und Identität', 'Tính cách & bản sắc', 'tâm lý học tính cách, bản sắc văn hóa, tự nhận thức', 'cấu tạo từ nâng cao (tiền tố/hậu tố: -los, -haft, -mäßig, miss-, ver-, zer-)'],
      ['Wissenschaftliches Arbeiten', 'Viết học thuật', 'cấu trúc bài luận, trích dẫn, tóm tắt, trình bày nghiên cứu', 'Nominalstil vs. Verbalstil; liên kết văn bản (Textkohärenz, Konnektoren học thuật)'],
      ['Führung und Arbeitswelt', 'Lãnh đạo & môi trường làm việc', 'phong cách lãnh đạo, văn hóa doanh nghiệp, đàm phán, thuyết trình', 'Redewiedergabe nâng cao (Konjunktiv I/II, Redeeinleitende Verben: behaupten, betonen, einräumen)'],
      ['Gesellschaft im Wandel', 'Xã hội biến đổi', 'già hóa dân số, số hóa, bất bình đẳng, đô thị hóa', 'cấu trúc phân từ (Partizipialkonstruktionen), satzwertige Partizipien'],
      ['Wirtschaft und Globalisierung', 'Kinh tế & toàn cầu hóa', 'thương mại toàn cầu, chuỗi cung ứng, kinh tế Đức, đạo đức kinh doanh', 'mệnh đề phương thức & hệ quả (indem, dadurch dass, sodass, als dass, insofern als)'],
      ['Medien und Meinungsbildung', 'Truyền thông & hình thành quan điểm', 'tự do báo chí, thuật toán, tranh luận công khai, bình luận báo', 'Argumentation: Redemittel, Gegenargumente, Konzessivsätze nâng cao (wenngleich, zumal, wie … auch immer)'],
      ['Natur und Technik', 'Tự nhiên & công nghệ', 'năng lượng tái tạo, công nghệ sinh học, trí tuệ nhân tạo, đạo đức công nghệ', 'Passiv & Passiversatzformen nâng cao; Gerundivum (die zu lösende Aufgabe)'],
      ['Kultur und Kreativität', 'Văn hóa & sáng tạo', 'văn học, sân khấu, thành ngữ, ẩn dụ', 'thành ngữ & cách nói hình ảnh (Redewendungen), Funktionsverbgefüge nâng cao'],
      ['Bildung und Sprache', 'Giáo dục & ngôn ngữ', 'cải cách giáo dục, đa ngôn ngữ, ngôn ngữ và quyền lực', 'văn phong & sắc thái (Register: umgangssprachlich – neutral – gehoben); Modalpartikeln nâng cao'],
      ['Prüfungstraining C1', 'Luyện thi C1', 'mô phỏng Goethe-Zertifikat C1 / telc C1 / TestDaF: Lesen, Hören, Schreiben (Erörterung, formeller Brief), Sprechen (Vortrag, Diskussion)', 'tổng ôn ngữ pháp C1; Redemittel học thuật & thuyết trình'],
    ],
  };
  const units = [];
  for (const lv of Object.keys(U)) {
    U[lv].forEach((u, i) => {
      const order = i + 1;
      units.push({ id: `${lv.toLowerCase()}-u${String(order).padStart(2, '0')}`, level: lv, order, title: u[0], titleVi: u[1], topics: u[2], grammar: u[3], lessons: L[lv].lessons });
    });
  }
  return { levels: L, levelKeys: Object.keys(L), units, byId: id => units.find(u => u.id === id) };
})();
